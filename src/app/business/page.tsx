// app/business/page.tsx
import Link from "next/link";

export default function BusinessPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900 px-6 md:px-24 py-16">
      <header className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
          Professional Overview
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          I help companies and teams design, build, and optimize scalable
          digital experiences. With a blend of technical depth, product
          thinking, and business strategy, I bring efficiency and clarity to
          modern development.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/cv"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-semibold transition"
          >
            View CV
          </Link>
          <a
            href="/Isaac_Hirsch_Software_Engineer_Resume.pdf"
            download
            className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-5 py-2 rounded-full text-sm font-semibold transition"
          >
            Download CV
          </a>
        </div>
      </header>

      <section className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Frontend Excellence
          </h2>
          <p className="text-gray-700">
            I specialize in creating accessible, high-performance UIs using
            React, Tailwind, Next.js, and component-driven design. I think in
            systems, design with reuse in mind, and ship pixel-perfect outcomes.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Backend Fluency
          </h2>
          <p className="text-gray-700">
            I build scalable APIs, data pipelines, and logic integrations using
            Node, Firebase, Supabase, and cloud-native tooling. I write clean,
            secure code designed for long-term maintainability.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Product & Strategy
          </h2>
          <p className="text-gray-700">
            My work aligns with real business goals. From marketing automation
            to revenue-generating dashboards, I bring an understanding of what
            drives ROI and how to deliver on it through UX and data.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Reliable Collaboration
          </h2>
          <p className="text-gray-700">
            Cross-functional, async, fast-moving, or legacy—I've worked in them
            all. I’m known for shipping on time, asking smart questions, and
            mentoring with empathy.
          </p>
        </div>
      </section>
    </main>
  );
}
