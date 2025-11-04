"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function ExploreRugbyPage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const gratitudeSections = [
    {
      title: "Youth Coaches",
      names: ["Tim Hoffman", "Francis Leaupepe", "Kurt Dulka", "Tom Bateman"],
    },
    {
      title: "Men's Club Coaches",
      names: ["Kevin Battle", "Mike MacDonald", "Tiaan Bazandi", "Lance Mason"],
    },
    {
      title: "National Team Coaches",
      names: ["Ranaan Pen", "Kevin Musikanth", "Nimi Kaplan"],
    },
    {
      title: "Rugby & Life Mentors",
      names: ["Greg (Judge) Smales", "Tim Ahern", "Doug Lynch"],
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
          I would like to start by thanking the people who shaped my rugby
          journey and instilled values that transcend the sport
        </p>
      </header>

      <div className="mb-16 max-w-5xl mx-auto">
        <div className="rounded-lg overflow-hidden shadow-lg">
          <Image
            src="/NYAC_09272025-_174-1024x740.jpg"
            alt="Rugby"
            width={1024}
            height={740}
            className="object-cover w-full h-auto rounded-lg"
            priority
          />
        </div>
      </div>

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

      <section className="max-w-5xl mx-auto text-center">
        <p className="text-xl text-gray-600">More Content Coming soon</p>
      </section>
    </main>
  );
}
