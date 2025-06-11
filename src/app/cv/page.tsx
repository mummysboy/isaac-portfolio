"use client";
import { useState } from "react";

export default function CVPage() {
  const [showMore, setShowMore] = useState(false);

  return (
    <main className="min-h-screen bg-white text-black p-4 md:p-8">
      <header className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold">My CV</h1>
        <a
          href="/isaac_hirsch_cv.pdf"
          className="text-blue-600 underline"
          download
        >
          Download PDF
        </a>
      </header>

      <section className="mb-12 space-y-6">
        <div>
          <h2 className="text-2xl font-semibold">
            Right Image LLC – Owner (2022–Present)
          </h2>
          <p>
            Created and optimized front-end marketing websites focused on
            performance-driven design. Applied user behavior data to iterate
            quickly and enhance UX across verticals.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">
            Tris – Software Engineer, UI/UX (2021–Current)
          </h2>
          <p>
            Developed scalable adtech platform UIs handling billions of monthly
            events. Consolidated reporting tools and designed interactive
            dashboards with React and modern CSS.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">
            Monetize Lab – Software Engineer (2021)
          </h2>
          <p>
            Led front-end development for high-revenue React pages. Built
            publisher dashboards and trained teams on data integration tools to
            improve user insights and conversion paths.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">
            MishMish PlaySchool – Owner (2014–2021)
          </h2>
          <p>
            Introduced process automation and designed internal tools for team
            onboarding and tracking. Applied technical leadership in a
            non-technical environment to improve performance.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold">Technical Projects</h2>
        <ul className="list-disc ml-6">
          <li>
            <strong>Rugby Sites & Tools:</strong> Survey forms, donation
            platforms, and event sites
          </li>
          <li>
            <strong>QRewards App:</strong> QR-based loyalty system with
            real-time updates
          </li>
          <li>
            <strong>Hired App:</strong> Job-matching app with intuitive Swift UI
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold">Skills</h2>
        <p>
          <strong>Languages:</strong> JavaScript, React, Swift, Python,
          HTML/CSS, SQL, C/C++
        </p>
        <p>
          <strong>Tools:</strong> Git, Firebase, AWS, Docker, CI/CD, REST APIs,
          Postman
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Education</h2>
        <p>
          Santa Barbara City College – Certificate in International Business
          (GPA: 3.7)
        </p>
        <p>
          Courses in finance, logistics, economics, and international law &
          marketing
        </p>
      </section>
    </main>
  );
}