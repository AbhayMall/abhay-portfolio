"use client";

import { ArrowDown, ArrowRight, Check, Menu, Moon, Sun, X } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

const navItems = ["About", "Skills", "Projects", "Journey", "Contact"];

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const [dark, setDark] = useState(false);
  useEffect(() => setDark(document.documentElement.dataset.theme === "dark"), []);
  function toggle() {
    const next = !dark;
    document.documentElement.dataset.theme = next ? "dark" : "light";
    localStorage.setItem("abhay-theme", next ? "dark" : "light");
    setDark(next);
  }
  return <button className={`theme-toggle${compact ? " theme-toggle-compact" : ""}`} type="button" onClick={toggle} aria-label={`Switch to ${dark ? "light" : "dark"} mode`} title={`Switch to ${dark ? "light" : "dark"} mode`}>{dark ? <Sun size={16} /> : <Moon size={16} />}{!compact && <span>{dark ? "Light" : "Dark"}</span>}</button>;
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  useEffect(() => {
    const ids = ["home", ...navItems.map((item) => item.toLowerCase())];
    const sections = ids.map((id) => document.getElementById(id)).filter((element): element is HTMLElement => element !== null);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: "-24% 0px -60% 0px", threshold: [0, 0.1, 0.35] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);
  return <header className="site-header"><div className="page-wrap header-inner"><a className="brand" href="#home" aria-label="Abhay Mall, home"><span className="monogram">AM</span><span>Abhay Mall<small>Software Engineer</small></span></a><nav className={open ? "nav nav-open" : "nav"} aria-label="Main navigation">{navItems.map((item) => { const id = item.toLowerCase(); return <a key={item} href={`#${id}`} aria-current={active === id ? "location" : undefined} onClick={() => setOpen(false)}>{item}</a>; })}</nav><div className="header-actions"><ThemeToggle /><a className="header-resume" href="/Abhay-Mall-Resume.pdf" download>Resume <ArrowDown size={14} /></a><button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Close navigation menu" : "Open navigation menu"}>{open ? <X size={20} /> : <Menu size={20} />}</button></div></div></header>;
}

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [emailDraft, setEmailDraft] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setMessage("");
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    const draftBody = `Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`;
    setEmailDraft(`mailto:abhaymall9305@gmail.com?subject=${encodeURIComponent(String(values.subject || "Portfolio contact"))}&body=${encodeURIComponent(draftBody)}`);
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "The message could not be sent. Please try email instead.");
      setStatus("success");
      setMessage("Thanks — your message was accepted. I’ll be in touch.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "The message could not be sent. Please try email instead.");
    }
  }
  return <form className="contact-form" onSubmit={submit}>
    <div className="form-heading"><span>WRITE A NOTE</span><ArrowRight size={16} aria-hidden="true" /></div>
    <div className="field-row"><label>Name<input name="name" required minLength={2} maxLength={80} autoComplete="name" placeholder="Your name" /></label><label>Email<input name="email" required type="email" maxLength={254} autoComplete="email" placeholder="you@example.com" /></label></div>
    <label>Subject<input name="subject" required minLength={3} maxLength={120} placeholder="What would you like to discuss?" /></label>
    <label>Message<textarea name="message" required minLength={10} maxLength={4000} rows={4} placeholder="A little context helps me get back to you." /></label>
    <label className="honeypot" aria-hidden="true">Company website<input name="company" tabIndex={-1} autoComplete="off" /></label>
    <div className="form-bottom"><button className="button button-dark" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : status === "success" ? "Sent" : "Send message"}{status === "success" ? <Check size={15} /> : <ArrowRight size={15} />}</button><div className={`form-status form-status-${status}`} role="status" aria-live="polite">{message}{status === "error" && emailDraft && <> <a className="email-fallback" href={emailDraft}>Open a prefilled email</a></>}</div></div>
    <p className="form-note">Your details are used only to reply to your message.</p>
  </form>;
}
