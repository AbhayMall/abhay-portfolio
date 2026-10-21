import { ArrowDown, ArrowDownRight, ArrowUpRight, Braces, Database, Mail, MapPin, Server, ShieldCheck } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { ContactForm, SiteHeader, ThemeToggle } from "@/components/site-controls";
import { GitHubIcon, LinkedInIcon } from "@/components/social-icons";

function SectionLabel({ children, index }: { children: React.ReactNode; index: string }) {
  return <div className="section-label"><span>{index}</span><span>{children}</span></div>;
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader />
      <main id="main">
        <section className="hero page-wrap" id="home" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" />Computer Science · Chandigarh University</p>
            <h1 id="hero-title">Building reliable backends and <span>thoughtful digital experiences.</span></h1>
            <p className="hero-intro">{portfolio.intro}</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#projects">Explore selected work <ArrowDownRight size={16} aria-hidden="true" /></a>
              <a className="button button-outline" href="/Abhay-Mall-Resume.pdf" download>Download resume <ArrowDown size={15} aria-hidden="true" /></a>
            </div>
            <div className="hero-links">
              <a href={portfolio.github} target="_blank" rel="noreferrer"><GitHubIcon size={16} /> GitHub <ArrowUpRight size={13} aria-hidden="true" /></a>
              <a href={portfolio.linkedin} target="_blank" rel="noreferrer"><LinkedInIcon size={16} /> LinkedIn <ArrowUpRight size={13} aria-hidden="true" /></a>
              <a href="#contact"><Mail size={16} aria-hidden="true" /> Let’s connect</a>
            </div>
          </div>
          <div className="hero-visual" aria-label="Illustration of a request moving through a backend service to persistent data">
            <div className="visual-topline"><span>REQUEST PATH</span><span>01 — 04</span></div>
            <div className="architecture">
              <div className="arch-node arch-client"><span className="node-icon"><Braces size={18} /></span><span>Client<small>incoming request</small></span></div>
              <div className="arch-connector"><span /></div>
              <div className="arch-node arch-api"><span className="node-icon"><Server size={18} /></span><span>API layer<small>validate · route</small></span></div>
              <div className="arch-branch"><span /><i /><b /></div>
              <div className="arch-node arch-service"><span className="node-icon"><ShieldCheck size={18} /></span><span>Service<small>business logic</small></span></div>
              <div className="arch-connector arch-connector-short"><span /></div>
              <div className="arch-node arch-data"><span className="node-icon"><Database size={18} /></span><span>Data store<small>persist · retrieve</small></span></div>
            </div>
            <div className="visual-caption"><span className="tiny-pulse" />A clear path from request to response</div>
            <span className="visual-index">SYSTEMS / 001</span>
          </div>
          <a className="scroll-note" href="#about"><span>SCROLL TO EXPLORE</span><span className="scroll-line" /></a>
        </section>

        <section className="section page-wrap" id="about">
          <SectionLabel index="01">A little about me</SectionLabel>
          <div className="about-grid">
            <div><h2>Thoughtful software starts with <em>clear thinking.</em></h2><p className="body-copy">I’m an aspiring software engineer who enjoys understanding how applications work beneath the interface: how APIs are shaped, data is organized, and different parts of a system fit together. I’m especially drawn to backend development, problem-solving, and useful AI applications.</p><p className="principle">“Good software should be reliable, understandable, and maintainable.”</p></div>
            <aside className="profile-card" aria-label="Profile details">
              <div className="profile-row"><span>Studying</span><strong>B.E. Computer Science & Engineering</strong></div>
              <div className="profile-row"><span>University</span><strong>{portfolio.university}</strong></div>
              <div className="profile-row"><span>Based in</span><strong><MapPin size={14} aria-hidden="true" /> {portfolio.location}</strong></div>
              <div className="profile-row"><span>Interests</span><strong>Backend systems · DSA · AI applications</strong></div>
            </aside>
          </div>
        </section>

        <section className="section section-soft" id="skills"><div className="page-wrap">
          <SectionLabel index="02">Tools & foundations</SectionLabel>
          <div className="section-heading"><h2>A practical <em>engineering toolkit.</em></h2><p>Grouped by the work I use them for. No proficiency scores — just the technologies and concepts reflected in my projects and studies.</p></div>
          <div className="skill-grid">{portfolio.skills.map((group, i) => <article className="skill-card" key={group.title}><span className="skill-index">0{i + 1}</span><h3>{group.title}</h3><p>{group.items}</p></article>)}</div>
        </div></section>

        <section className="section page-wrap" id="projects">
          <SectionLabel index="03">Selected projects</SectionLabel>
          <div className="section-heading"><h2>Built to solve <em>real problems.</em></h2><p>Three projects across backend services, retrieval systems, and distributed request control. The diagrams are explanatory, not live product demos.</p></div>
          <div className="project-grid">{portfolio.projects.map((project) => <article className="project-card" key={project.number}>
            <div className={`project-visual project-visual-${project.number}`} aria-hidden="true">
              <div className="project-visual-head"><span>{project.category}</span><span>{project.number}</span></div>
              <div className="flow-line">{project.flow.map((node, i) => <span className="flow-step" key={node}><b>{node}</b>{i < project.flow.length - 1 && <i />}</span>)}</div>
              <span className="diagram-note">SYSTEM OVERVIEW</span>
            </div>
            <div className="project-content"><div className="project-meta"><span>{project.number}</span><span>{project.category}</span></div><h3>{project.name}</h3><p>{project.summary}</p><div className="tag-list">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <details className="project-details"><summary>Read the engineering notes <ArrowDownRight size={15} aria-hidden="true" /></summary><div className="details-body"><h4>Implementation</h4><p>{project.details}</p><h4>Problem to solve</h4><p>{project.challenge}</p></div></details>
              <div className="project-links"><span>View GitHub profile</span><a href={portfolio.github} target="_blank" rel="noreferrer" aria-label="Visit Abhay’s GitHub profile"><GitHubIcon size={16} /><ArrowUpRight size={13} /></a></div>
            </div>
          </article>)}</div>
        </section>

        <section className="section section-ink" id="engineering"><div className="page-wrap">
          <SectionLabel index="04">How I think about engineering</SectionLabel>
          <div className="engineering-grid"><div><h2>Make the system easier to <em>understand.</em></h2><p className="body-copy">I’m interested in the decisions that make software easier to trust: clear API boundaries, predictable data flows, and behavior that remains understandable when requests arrive concurrently or an answer depends on the right context.</p></div><div className="engineering-notes"><article><span>01</span><div><h3>API design & reliability</h3><p>Validation, authorization, error handling, and consistent interfaces.</p></div></article><article><span>02</span><div><h3>Problem-solving</h3><p>Data structures and algorithms as tools for precise reasoning.</p></div></article><article><span>03</span><div><h3>Practical AI</h3><p>Retrieval and context selection for more grounded document answers.</p></div></article></div></div>
        </div></section>

        <section className="section page-wrap" id="journey">
          <SectionLabel index="05">Milestones & education</SectionLabel>
          <div className="journey-grid"><div><h2>Learning through <em>building.</em></h2><p className="body-copy">A few milestones from my studies, problem-solving practice, and project work.</p><ul className="cert-list">{portfolio.certifications.map((cert) => <li key={cert}><span className="cert-mark">✓</span>{cert}</li>)}</ul></div><div className="timeline">{portfolio.milestones.map((item) => <article className="timeline-item" key={item.title}><span className="timeline-date">{item.date}</span><div><h3>{item.title}</h3><p>{item.detail}</p></div></article>)}</div></div>
        </section>

        <section className="contact-section" id="contact"><div className="page-wrap contact-wrap">
          <SectionLabel index="06">Contact</SectionLabel>
          <div className="contact-grid"><div><p className="eyebrow">Have a role or project in mind?</p><h2>Let’s start a <em>conversation.</em></h2><p className="body-copy">I’m open to conversations about software engineering opportunities, backend development, and the work behind a good system.</p><a className="email-link" href={`mailto:${portfolio.email}`}>{portfolio.email}<ArrowUpRight size={17} aria-hidden="true" /></a><div className="contact-details"><a href={`tel:${portfolio.phone.replaceAll(" ", "")}`}>{portfolio.phone}</a><span>·</span><span>{portfolio.location}</span></div><a className="button button-outline resume-contact" href="/Abhay-Mall-Resume.pdf" download>Download resume <ArrowDown size={15} /></a></div>
            <div className="form-panel"><ContactForm /></div></div>
        </div></section>
      </main>
      <footer className="site-footer"><div className="page-wrap footer-inner"><a className="footer-brand" href="#home"><span className="monogram">AM</span><span>Abhay Mall<small>Software Engineer · Backend & Full-Stack</small></span></a><div className="footer-links"><a href={portfolio.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={13} /></a><a href={portfolio.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={13} /></a><a href={`mailto:${portfolio.email}`}>Email <ArrowUpRight size={13} /></a><ThemeToggle compact /></div><p className="copyright">© {new Date().getFullYear()} Abhay Mall · Designed and built with care.</p></div></footer>
    </>
  );
}
