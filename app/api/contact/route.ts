import { NextRequest, NextResponse } from "next/server";
import { isIP } from "node:net";
import { z } from "zod";
import { portfolio } from "@/data/portfolio";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(254),
  subject: z.string().trim().min(3).max(120),
  message: z.string().trim().min(10).max(4000),
  company: z.string().max(200).optional().default(""),
});

function json(error: string, status: number) {
  return NextResponse.json({ error }, { status, headers: { "Cache-Control": "no-store" } });
}

async function rateLimit(ip: string) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) throw new Error("Rate limit storage is not configured");
  const script = "local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],ARGV[1]) end; return n";
  const response = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(["EVAL", script, 1, `portfolio:contact:${ip}`, 600]),
    cache: "no-store",
    signal: AbortSignal.timeout(8_000),
  });
  if (!response.ok) throw new Error("Rate limit storage rejected the request");
  const result = await response.json() as { result?: number | string };
  const count = Number(result.result);
  if (!Number.isFinite(count) || count < 1) throw new Error("Rate limit storage returned an invalid count");
  return Number.isFinite(count) && count > 0 && count <= 5;
}

export async function POST(request: NextRequest) {
  const maxBytes = 10_000;
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > maxBytes) return json("The message is too large.", 413);

  const origin = request.headers.get("origin");
  if (origin) {
    try { if (new URL(origin).host !== request.headers.get("host")) return json("Invalid request origin.", 403); }
    catch { return json("Invalid request origin.", 403); }
  }

  let input: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) return json("Please send a valid form submission.", 400);
    const chunks: Uint8Array[] = [];
    let totalBytes = 0;
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > maxBytes) {
        await reader.cancel();
        return json("The message is too large.", 413);
      }
      chunks.push(value);
    }
    const body = new Uint8Array(totalBytes);
    let offset = 0;
    for (const chunk of chunks) { body.set(chunk, offset); offset += chunk.byteLength; }
    input = JSON.parse(new TextDecoder().decode(body));
  } catch { return json("Please send a valid form submission.", 400); }
  const parsed = schema.safeParse(input);
  if (!parsed.success) return json("Check the form fields and try again.", 400);
  if (parsed.data.company) return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from || !process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return json("The contact form is not configured yet. Please use the email link instead.", 503);
  }

  const forwarded = (request.headers.get("x-vercel-forwarded-for") || request.headers.get("x-forwarded-for"))?.split(",")[0]?.trim();
  const ip = forwarded && isIP(forwarded) ? forwarded : "unknown";
  try {
    if (!(await rateLimit(ip))) return json("Too many messages. Please wait a while or use the email link.", 429);
  } catch {
    return json("The contact service is temporarily unavailable. Please use the email link instead.", 503);
  }

  const { name, email, subject, message } = parsed.data;
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [process.env.CONTACT_TO_EMAIL || portfolio.email],
        reply_to: email,
        subject: `Portfolio: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      console.error("Contact email provider rejected a message", {
        status: response.status,
        requestId: response.headers.get("x-resend-request-id"),
      });
      return json("Your message could not be delivered right now. Please try the email link instead.", 502);
    }
    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Contact email provider request failed", { errorName: error instanceof Error ? error.name : "UnknownError" });
    return json("Your message could not be delivered right now. Please try the email link instead.", 502);
  }
}
