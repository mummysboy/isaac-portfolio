"use client";
import { useState, useEffect } from "react";

export default function ExploreMusicPage() {
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
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
          Explore Music
        </h1>
      </header>

      <section className="max-w-5xl mx-auto text-center">
        <p className="text-xl text-gray-600">More Content Coming soon</p>
      </section>
    </main>
  );
}
