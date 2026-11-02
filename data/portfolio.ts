export const portfolio = {
  name: "Abhay Mall",
  email: "abhaymall9305@gmail.com",
  phone: "+91 93057 55915",
  github: "https://github.com/AbhayMall",
  linkedin: "https://www.linkedin.com/in/abhay-mall-922884291/",
  university: "Chandigarh University",
  location: "Mohali, India",
  headline: "Building reliable backends and thoughtful digital experiences.",
  intro:
    "I’m a Computer Science student interested in backend engineering, APIs, and practical full-stack software. I like understanding how a system behaves end to end, then making its data flow and failure cases easier to reason about.",
  projects: [
    {
      number: "01",
      name: "PlaceMate AI",
      category: "Campus placement platform",
      summary:
        "A campus recruitment platform for students, recruiters, and placement officers, covering job applications, resume analysis, interview scheduling, and TPO workflows.",
      stack: ["React", "Node.js", "Express", "MongoDB", "FastAPI", "JWT"],
      flow: ["Student / recruiter", "REST API", "FastAPI analysis", "MongoDB"],
      details:
        "The platform provides role-based dashboards and versioned REST APIs for placement workflows. HttpOnly JWT sessions, ownership-scoped MongoDB access, and FastAPI heuristics support secure operations and resume matching. A local synthetic-data benchmark measured an offer-history query optimization; it has not been deployed.",
      challenge:
        "Supporting student, recruiter, and TPO workflows while keeping access tied to each user’s role and records.",
      liveUrl: "https://placemateai-abhaymall9305-web.onrender.com/",
    },
    {
      number: "02",
      name: "Papertrail RAG Document Assistant",
      category: "Document question answering",
      summary:
        "A document chatbot that answers questions across PDF, DOCX, CSV, Markdown, and text files with source and PDF page citations.",
      stack: ["Python", "Streamlit", "OpenAI embeddings", "FAISS", "GPT-4o mini"],
      flow: ["Upload", "Chunk", "FAISS search", "Cited answer"],
      details:
        "Parses uploaded files, recursively chunks text, indexes OpenAI embeddings in FAISS, and retrieves the top five passages for GPT-4o mini. Supports conversational follow-ups and source/page citations. The Streamlit app is hosted on Render Free; users enter their own API key per session.",
      challenge:
        "Keeping answers traceable to relevant passages in the documents provided by each user.",
      githubUrl: "https://github.com/AbhayMall/papertrail-rag",
      liveUrl: "https://papertrail-rag.onrender.com",
    },
    {
      number: "03",
      name: "RateGuard Distributed Rate Limiter",
      category: "Backend reliability",
      summary:
        "A Node.js API gateway with configurable token-bucket policies, atomic Redis state, fail-closed enforcement, and a telemetry dashboard.",
      stack: ["Node.js", "Express", "Redis", "Lua", "React"],
      flow: ["API request", "Gateway", "Redis Lua", "Allow / reject"],
      details:
        "Atomic Redis Lua operations coordinate shared request quotas across gateway instances. Policies can return HTTP 429 when limits are exceeded; the free public demo uses one gateway and a read-only dashboard. A displayed run recorded 4.24 ms gateway p95 latency; that observation is not a before/after benchmark.",
      challenge:
        "Keeping quota decisions consistent when concurrent requests reach separate gateway workers.",
      githubUrl: "https://github.com/AbhayMall/distributed-rate-limiter",
      liveUrl: "https://rateguard-dashboard.onrender.com",
    },
  ],
  skills: [
    { title: "Backend & APIs", items: "Node.js · Express · FastAPI · REST APIs · JWT · HTTP-only sessions · Authentication · Authorization · Validation" },
    { title: "Databases & caching", items: "MongoDB · MySQL · Redis · SQL · Mongoose · Schema design · Indexing · Shared cache" },
    { title: "Languages", items: "C · C++ · Java · Python · JavaScript" },
    { title: "AI & document retrieval", items: "RAG · OpenAI embeddings · FAISS · LangChain · LLM APIs · Prompt engineering · Source citations" },
    { title: "Frontend", items: "React · HTML · CSS · Streamlit" },
    { title: "CS foundations", items: "Data structures · Algorithms · OOP · DBMS · Operating systems · Computer networks · Multithreading" },
    { title: "Development tools", items: "Git · GitHub · Postman · VS Code · npm · Docker basics · Python type hints · Async programming · API testing" },
  ],
  milestones: [
    { date: "2025", title: "Tekathon — first place", detail: "Smart Education category · Chandigarh University" },
    { date: "2025", title: "700+ coding problems", detail: "Including 450+ LeetCode problems · rating 1594 (resume figure)" },
    { date: "2023–present", title: "B.E. Computer Science & Engineering", detail: "Chandigarh University · CGPA 8.27/10" },
    { date: "2021 / 2019", title: "School education", detail: "Class 12: 7.79/10 · Class 10: 9.11/10" },
  ],
  certifications: ["NPTEL Cloud Computing", "Full-Stack Development: Angular & Spring Boot"],
} as const;
