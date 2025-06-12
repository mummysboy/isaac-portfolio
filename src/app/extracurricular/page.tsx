"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function ExtracurricularPage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const sections = [
    {
      title: "Rugby",
      description:
        "From national team caps to local community matches, rugby has shaped my approach to discipline, leadership, and teamwork.",
      link: "/extracurricular/rugby",
      image: "/images/rugby.jpeg",
    },
    {
      title: "Travel",
      description:
        "Exploring diverse cultures and landscapes fuels my curiosity and broadens the way I think about global problems and local solutions.",
      link: "/extracurricular/travel",
      image: "/images/travel.jpeg",
    },
    {
      title: "Music",
      description:
        "Music is one of my most creative outlets—writing, producing, and even making songs with AI has become a way to experiment and express.",
      link: "/extracurricular/music",
      image: "/images/music.jpeg",
    },
  ];

  return (
    <main
      className={`min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900 px-6 md:px-24 py-16 transition-opacity duration-1000 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <header className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
          Life Beyond the Screen
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          My interests outside of software fuel the way I lead, create, and stay
          grounded. Here are a few passions that shape my worldview.
        </p>
      </header>

      <section className="space-y-24 max-w-5xl mx-auto">
        {sections.map((section, idx) => (
          <div
            key={section.title}
            className={`flex flex-col md:flex-row ${
              idx % 2 === 1 ? "md:flex-row-reverse" : ""
            } items-center gap-8`}
          >
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {section.title}
              </h2>
              <p className="text-gray-600 mb-4">{section.description}</p>
              <Link
                href={section.link}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold transition"
              >
                Explore {section.title}
              </Link>
            </div>
            <div className="flex-1">
              <div className="rounded-lg overflow-hidden shadow-md">
                <Image
                  src={section.image}
                  alt={`${section.title} image`}
                  width={800}
                  height={500}
                  className="object-cover w-full h-[500px] md:h-[500px] rounded-lg shadow-lg"
                  priority
                />
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
