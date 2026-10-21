import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return <main className="not-found"><div><p className="eyebrow">404 · PAGE NOT FOUND</p><h1>This route doesn’t exist.</h1><p>Head back to the portfolio and explore the projects from there.</p><Link className="button button-dark" href="/"><ArrowLeft size={15} /> Back to home</Link></div></main>;
}
