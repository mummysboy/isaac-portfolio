"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BusinessPage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <main
      className={`min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900 px-6 md:px-24 py-16 transition-opacity duration-1000 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
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
            href="/Isaac_Hirsch_Software_Engineer_Resume.pdf"
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

      <section className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto mb-20">
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
            AWS, Supabase, and cloud-native tooling. I write clean,
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
            Cross-functional, async, fast-moving, or legacy—I'm always happy to dive
            in. I’m known for shipping on time, asking smart questions, and
            breaking builds.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-3 text-center">
          Favorite Resources
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Here are some of the top sites I follow for emerging tech, AI, and
          digital innovation trends.
        </p>
        <ul className="space-y-4 text-gray-700">
          <li>
            <a
              href="https://stratechery.com/"
              className="text-blue-600 hover:underline"
              target="_blank"
            >
              Stratechery by Ben Thompson
            </a>{" "}
            – Deep analysis on tech strategy.
          </li>
          <li>
            <a
              href="https://www.sequoiacap.com/stories/"
              className="text-blue-600 hover:underline"
              target="_blank"
            >
              Sequoia Capital: Stories
            </a>{" "}
            – Strategic breakdown of AI evolution.
          </li>
          <li>
            <a
              href="https://a16z.com/"
              className="text-blue-600 hover:underline"
              target="_blank"
            >
              Andreessen Horowitz (a16z)
            </a>{" "}
            – Insightful writing on startups and AI.
          </li>
          <li>
            <a
              href="https://www.stateof.ai/"
              className="text-blue-600 hover:underline"
              target="_blank"
            >
              State of AI Report
            </a>{" "}
            – Comprehensive annual review of AI trends.
          </li>
          <li>
            <a
              href="https://www.ben-evans.com/"
              className="text-blue-600 hover:underline"
              target="_blank"
            >
              Benedict Evans
            </a>{" "}
            – Market analysis and macro-tech trends.
          </li>
          <li>
            <a
              href="https://www.latent.space/"
              className="text-blue-600 hover:underline"
              target="_blank"
            >
              Latent Space
            </a>{" "}
            – AI engineering and infrastructure blog and podcast.
          </li>
          <li>
            <a
              href="https://every.to/chain-of-thought"
              className="text-blue-600 hover:underline"
              target="_blank"
            >
              Chain of Thought
            </a>{" "}
            – Essays on reasoning and AI by Dan Shipper.
          </li>
          <li>
            <a
              href="https://blog.google/technology/ai/"
              className="text-blue-600 hover:underline"
              target="_blank"
            >
              Google AI Blog
            </a>{" "}
            – Official updates and research from Google’s AI division.
          </li>
          <li>
            <a
              href="https://openai.com/news/"
              className="text-blue-600 hover:underline"
              target="_blank"
            >
              OpenAI Newsroom
            </a>{" "}
            – Official announcements, research updates, and product releases
            from OpenAI.
          </li>
        </ul>
      </section>

      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-3 text-center">
          Favorite Books
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Books that have shaped how I approach software, systems, and creative
          thinking.
        </p>
        <ul className="space-y-4 text-gray-700">
          <li>
            <a
              href="https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/"
              className="text-blue-600 hover:underline"
              target="_blank"
            >
              The Pragmatic Programmer
            </a>{" "}
            – Essential practices for software craftsmen.
          </li>
          <li>
            <a
              href="https://www.amazon.com/s?k=the+nvidia+way&hvadid=713789360849&hvdev=c&hvexpln=67&hvlocphy=9198693&hvnetw=g&hvocijid=15899464868562285346--&hvqmt=e&hvrand=15899464868562285346&hvtargid=kwd-2363804305089&hydadcr=21873_13324215&mcid=663804c7c41a35699bd9e0685fb7b22d&tag=googhydr-20&ref=pd_sl_7ft8v37d1k_e_p67"
              className="text-blue-600 hover:underline"
              target="_blank"
            >
              The NVIDIA Way
            </a>{" "}
            – How to innovate and lead in tech.
          </li>
          <li>
            <a
              href="https://dataintensive.net/"
              className="text-blue-600 hover:underline"
              target="_blank"
            >
              Designing Data-Intensive Applications
            </a>{" "}
            – Building systems that scale.
          </li>
          <li>
            <a
              href="https://basecamp.com/shapeup"
              className="text-blue-600 hover:underline"
              target="_blank"
            >
              Shape Up
            </a>{" "}
            – Basecamp’s product strategy and development methodology.
          </li>
          <li>
            <a
              href="https://www.amazon.com/Coming-Wave-Technology-Power-Intelligence/dp/059329807X"
              className="text-blue-600 hover:underline"
              target="_blank"
            >
              The Coming Wave by Mustafa Suleyman
            </a>{" "}
            – On AI, power, and containment challenges in the future.
          </li>
        </ul>
      </section>

      <section className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-3 text-center">
          Favorite Podcasts
        </h2>
        <p className="text-center text-gray-600 mb-6">
          For weekly insights and deep dives into the world of AI and emerging
          software trends:
        </p>
        <ul className="space-y-4 text-gray-700">
          <li>
            <a
              href="https://www.latent.space/podcast"
              className="text-blue-600 hover:underline"
              target="_blank"
            >
              Latent Space Podcast
            </a>{" "}
            – Conversations with AI engineers and thought leaders at the cutting
            edge.
          </li>
          <li>
            <a
              href="https://www.se-radio.net/"
              className="text-blue-600 hover:underline"
              target="_blank"
            >
              Software Engineering Radio
            </a>{" "}
            – Interviews with expert engineers on software architecture,
            practices, and leadership.
          </li>
        </ul>
      </section>
    </main>
  );
}
