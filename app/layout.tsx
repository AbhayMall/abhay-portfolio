import type { Metadata, Viewport } from "next";
import { portfolio } from "@/data/portfolio";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

export const metadata: Metadata = {
  title: "Abhay Mall | Software Engineer & Backend Developer",
  description:
    "Abhay Mall is a Computer Science student focused on backend engineering, full-stack applications, APIs, and practical AI systems.",
  ...(siteUrl ? { metadataBase: new URL(siteUrl), alternates: { canonical: "/" } } : {}),
  openGraph: {
    title: "Abhay Mall | Software Engineer & Backend Developer",
    description: "Backend engineering, full-stack projects, and practical AI applications.",
    type: "website",
    ...(siteUrl ? { url: siteUrl, images: ["/og-card.svg"] } : {}),
  },
  twitter: { card: "summary_large_image", title: "Abhay Mall | Software Engineer", description: "Backend engineering and full-stack projects." },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = { themeColor: "#f6f7f5", colorScheme: "light dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: portfolio.name,
    email: portfolio.email,
    url: siteUrl,
    sameAs: [portfolio.github, portfolio.linkedin],
    jobTitle: "Software Engineer · Backend & Full-Stack Developer",
    alumniOf: { "@type": "CollegeOrUniversity", name: portfolio.university },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: `try{const t=localStorage.getItem('abhay-theme');if(t)document.documentElement.dataset.theme=t;else if(matchMedia('(prefers-color-scheme: dark)').matches)document.documentElement.dataset.theme='dark'}catch{}` }} />
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      </body>
    </html>
  );
}
