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
      name: "Full-Stack Job Application Platform",
      category: "Full-stack application",
      summary:
        "A MERN platform for publishing roles, discovering opportunities, and managing applications for candidates and recruiters.",
      stack: ["MongoDB", "Express", "React", "Node.js", "JWT"],
      flow: ["Candidate", "REST API", "Role checks", "MongoDB"],
      details:
        "JWT authentication and role-based authorization protect candidate and recruiter workflows. The API uses schema-aware data models, request validation, shared middleware, and centralized error handling across CRUD operations.",
      challenge:
        "Keeping each role’s actions separate while allowing both sides to work with the same job and application records.",
    },
    {
      number: "02",
      name: "Document Intelligence RAG Assistant",
      category: "Retrieval-augmented generation",
      summary:
        "A document question-answering assistant that retrieves relevant passages before asking a language model to form a response.",
      stack: ["Python", "FastAPI", "LangChain", "FAISS", "Gemini API"],
      flow: ["Upload", "Chunk", "Embed", "Retrieve", "Answer"],
      details:
        "The processing flow splits uploaded documents into chunks, creates embeddings, and stores them in FAISS. At question time, similarity search supplies relevant context to the generation step through FastAPI endpoints.",
      challenge:
        "Making answers grounded in the uploaded material by retrieving useful context before generation.",
    },
    {
      number: "03",
      name: "Distributed Rate Limiter",
      category: "Systems programming",
      summary:
        "A C++17 token-bucket rate limiter that uses Redis to coordinate request limits across server instances.",
      stack: ["C++17", "Redis", "Multithreading", "Token bucket"],
      flow: ["Request", "Limiter", "Redis state", "Allow / reject"],
      details:
        "The design separates rate-limit decisions from request handling. Shared Redis state, atomic operations, and key expiration keep the bucket state consistent across concurrent workers.",
      challenge:
        "Maintaining a single shared view of available tokens while requests arrive concurrently from different workers.",
    },
  ],
  skills: [
    { title: "Backend", items: "Node.js · Express · FastAPI · REST APIs · JWT · Authentication" },
    { title: "Data", items: "MongoDB · MySQL · Redis · SQL · Schema design · Indexing" },
    { title: "Languages", items: "C · C++ · Java · Python · JavaScript" },
    { title: "AI applications", items: "RAG · Embeddings · FAISS · LangChain · LLM APIs" },
    { title: "Frontend", items: "React · HTML · CSS" },
    { title: "Foundations & tools", items: "DSA · OOP · DBMS · Git · Postman · Docker basics" },
  ],
  milestones: [
    { date: "2025", title: "Tekathon — first place", detail: "Smart Education category · Chandigarh University" },
    { date: "2025", title: "700+ coding problems", detail: "Including 450+ LeetCode problems · rating 1594 (resume figure)" },
    { date: "2023–present", title: "B.E. Computer Science & Engineering", detail: "Chandigarh University · CGPA 8.27/10" },
    { date: "2021 / 2019", title: "School education", detail: "Class 12: 7.79/10 · Class 10: 9.11/10" },
  ],
  certifications: ["NPTEL Cloud Computing", "Full-Stack Development: Angular & Spring Boot"],
} as const;
