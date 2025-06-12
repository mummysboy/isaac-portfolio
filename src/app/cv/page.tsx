"use client";
import { useState } from "react";

export default function CVPage() {
  const [showMore, setShowMore] = useState(false);

  return (
    <main className="min-h-screen bg-white text-black p-4 md:p-8">
      <header className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold">My CV</h1>
        <a
          href="/Isaac_Hirsch_Software_Engineer_Resume.pdf"
          className="text-blue-600 underline"
          download
        >
          Download PDF
        </a>
      </header>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold">Professional Summary</h2>
        <p>
          Resourceful and versatile Full-Stack Software Engineer with a strong
          foundation in backend development and a growing focus on AI
          integration. Experienced in building scalable, data-driven web
          applications with clean architecture and robust APIs. Passionate about
          crafting systems that are efficient, secure, and designed with the
          future in mind. Now seeking backend-focused roles where I can
          contribute to intelligent systems and scalable infrastructure.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold">Technical Skills</h2>
        <p>
          <strong>Languages:</strong> Python, JavaScript (Node.js, TypeScript),
          Java, Swift, SQL
        </p>
        <p>
          <strong>Frameworks:</strong> React, Next.js, Express, Flask, Django
        </p>
        <p>
          <strong>AI/ML:</strong> OpenAI API, Pinecone, Prompt Engineering, LLM
          RAG pipelines
        </p>
        <p>
          <strong>Databases:</strong> PostgreSQL, MongoDB, Firebase, Supabase
        </p>
        <p>
          <strong>DevOps & Tools:</strong> Docker, Git, GitHub Actions, Firebase
          Hosting, Vercel, AWS (basic)
        </p>
        <p>
          <strong>Other:</strong> REST APIs, WebSockets, OAuth, Session/Local
          Storage, Tailwind CSS
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold">Recent Projects</h2>
        <div>
          <h3 className="font-semibold">
            AI-Powered Job Matching Platform (Full-Stack Developer)
          </h3>
          <ul className="list-disc ml-6">
            <li>
              Designed a web-first job matching platform using React and
              Firebase, later extending to Android/iOS.
            </li>
            <li>
              Engineered a backend system for matching employers and job seekers
              using form data and availability.
            </li>
            <li>
              Integrated real-time updates and job tracking using Firebase Cloud
              Functions and Firestore.
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mt-4">
            AI Chatbot Knowledge Base (Backend + AI Lead)
          </h3>
          <ul className="list-disc ml-6">
            <li>
              Developed a Python-based RAG chatbot using Pinecone and Google
              Docs as dynamic content inputs.
            </li>
            <li>
              Engineered a backend to support modular knowledge updates, prompt
              tuning, and context chunking.
            </li>
            <li>
              Built a UI for document management and live chatbot testing.
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mt-4">
            Security Guard Booking App (Swift, Firebase, GPS)
          </h3>
          <ul className="list-disc ml-6">
            <li>
              Created an Uber-style security app with tiered roles for guards
              and clients.
            </li>
            <li>
              Built real-time GPS matching, scheduling logic, and role-based
              dashboards.
            </li>
            <li>
              Integrated modern UI with reusable SwiftUI components and
              state-driven flows.
            </li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold">Professional Experience</h2>
        <div>
          <h3 className="font-semibold">
            Freelance Full-Stack Developer (Self-Employed) | 2020–Present
          </h3>
          <ul className="list-disc ml-6">
            <li>
              Delivered tailored software solutions including web apps, mobile
              apps, and automation tools.
            </li>
            <li>
              Focused on backend logic, API design, AI feature integration, and
              performance optimization.
            </li>
            <li>
              Worked with diverse clients across tech, media, and startup
              industries.
            </li>
          </ul>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold">
            Affiliate Tech Engineer & Data Integration Consultant (Project-Based
            Roles)
          </h3>
          <ul className="list-disc ml-6">
            <li>
              Worked with platforms like MediaAlpha and FindAffi to extract and
              integrate affiliate data.
            </li>
            <li>
              Built Python scripts to handle scraping, API calls, and CSV data
              pipelines for revenue tracking.
            </li>
            <li>
              Developed dynamic offer pages and optimized user journeys via A/B
              tests and analytics hooks.
            </li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold">Education</h2>
        <p>International Business Certificate, Santa Barbara City College</p>
        <p>2011</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Interests</h2>
        <p>
          Artificial Intelligence – Scalable Systems – Behavioral UX – Rugby
          (Former National Player)
        </p>
      </section>
    </main>
  );
}
