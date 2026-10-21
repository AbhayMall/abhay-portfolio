# Abhay Mall — portfolio

A restrained, responsive portfolio for Abhay Mall, built with Next.js App Router, TypeScript, and CSS design tokens. The site defaults to the visitor’s system theme and provides a remembered light/dark toggle. Project content is maintained in `data/portfolio.ts`.

## Local development

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The portfolio, navigation, resume download, and theme toggle work without environment variables. The contact form needs server-side email and rate-limit credentials; direct email is always available.

## Contact form

The form uses Resend and Upstash Redis. Add `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, and `NEXT_PUBLIC_SITE_URL` in your deployment environment. Resend must authorize the sender address. The route fails closed if services are missing and offers a prefilled email draft as a fallback.

## Deploy to Vercel

Import this repository, keep the Next.js framework preset, configure the six environment variables above, and redeploy. Set `NEXT_PUBLIC_SITE_URL` to the deployed URL without a trailing slash.

## Updating content

Edit `data/portfolio.ts`. The resume is served from `public/Abhay-Mall-Resume.pdf`.
