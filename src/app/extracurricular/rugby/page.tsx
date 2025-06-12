"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ExploreRugbyPage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const gratitudeSections = [
    {
      title: "Youth Coaches",
      names: ["Tim Hoffman", "Francis Leaupepe", "Kurt Dulka"],
    },
    {
      title: "Men's Club Coaches",
      names: ["Kevin Battle", "Mike MacDonald"],
    },
    {
      title: "National Team Coaches",
      names: ["Ranaan Pen", "Kevin Musikanth"],
    },
    {
      title: "Rugby & Life Mentors",
      names: ["Greg (Judge) Smales", "Tim Ahern", "Doug Lynch"],
    },
  ];

  const memories = [
    {
      title: "First National Team Cap",
      preview:
        "Representing my country for the first time was a surreal and humbling experience...",
      link: "/extracurricular/rugby/first-cap",
    },
    {
      title: "Winning the NorCal Championship",
      preview:
        "With the Santa Barbara Rugby Academy, this victory represented months of grit...",
      link: "/extracurricular/rugby/norcal-championship",
    },
    {
      title: "Touring with the U.S. Development Squad",
      preview:
        "Playing internationally and learning from top-tier talent was both a challenge...",
      link: "/extracurricular/rugby/dev-squad-tour",
    },
  ];

  return (
    <main
      className={`min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900 px-6 md:px-24 py-16 transition-opacity duration-1000 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
          Explore Rugby
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          First and foremost, I would like to thank the people who shaped my
          rugby journey and instilled values that transcend the sport.
        </p>
      </header>

      <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 max-w-5xl mx-auto mb-24">
        {gratitudeSections.map((section) => (
          <div
            key={section.title}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-bold text-blue-700 mb-4 border-b border-blue-200 pb-1">
              {section.title}
            </h2>
            <ul className="space-y-2">
              {section.names.map((name) => (
                <li
                  key={name}
                  className="bg-gray-100 rounded-md px-4 py-2 text-gray-800 shadow-sm"
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="max-w-5xl mx-auto space-y-20">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Highlighted Memories
        </h2>
        {memories.map((memory, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center gap-8 ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                {memory.title}
              </h3>
              <p className="text-gray-700 mb-4">{memory.preview}</p>
              <Link
                href={memory.link}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-semibold transition"
              >
                Read More
              </Link>
            </div>
            <div className="flex-1 h-48 md:h-64 bg-gray-200 rounded-lg w-full" />
          </div>
        ))}
      </section>
    </main>
  );
}
