// app/personal/family/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function FamilyPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 👀 Oh hey there, code explorer. Looking for secrets?
    // Sorry, this isn't Fort Knox — just soft gatekeeping.
    // But you're clever... consider this your official Isaac Easter egg.
    const access = sessionStorage.getItem("authorized");

    if (access === "true") {
      setAuthorized(true);
      setTimeout(() => setMounted(true), 50);
    } else {
      // 🕵️‍♂️ You thought you could just sneak in? Back to the keypad, hacker!
      router.push("/personal");
    }
  }, [router]);

  if (!authorized) return null;

  return (
    <main
      className={`min-h-screen bg-gradient-to-b from-pink-50 to-yellow-50 text-gray-900 px-6 md:px-24 py-16 transition-opacity duration-1000 ease-in-out ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
    >
      <header className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-rose-700 mb-4">
          Family & Personal Life
        </h1>
        <p className="text-lg md:text-xl text-rose-500 max-w-3xl mx-auto">
          A window into my personal world—where roots run deep, values matter,
          and meaningful moments are everything.
        </p>
      </header>

      <section className="space-y-20 max-w-5xl mx-auto">
        <div className="md:flex md:items-center gap-8">
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold text-rose-600 mb-3">
              Core Values
            </h2>
            <p className="text-gray-700">
              My personal life is built around integrity, curiosity, resilience,
              and community. I value deep connections, long walks, and asking
              good questions.
            </p>
          </div>
        </div>

        <div className="md:flex md:flex-row-reverse md:items-center gap-8">
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold text-rose-600 mb-3">
              Family Ties
            </h2>
            <p className="text-gray-700">
              From home-cooked Shabbat dinners to late-night sibling banter,
              family keeps me grounded. I believe in showing up, staying kind,
              and being reliable.
            </p>
          </div>
        </div>

        <div className="md:flex md:items-center gap-8">
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold text-rose-600 mb-3">
              Life Outside Work
            </h2>
            <p className="text-gray-700">
              Whether it's a sunrise jog, reading philosophy, or getting way too
              into a board game, my non-work life recharges me to lead and
              create better.
            </p>
          </div>
        </div>

        <div className="md:flex md:flex-row-reverse md:items-center gap-8">
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold text-rose-600 mb-3">
              Traditions & Travels
            </h2>
            <p className="text-gray-700">
              I’ve lived between continents, celebrated under stars, and sat at
              unfamiliar tables. I carry stories with me—and always have space
              for more.
            </p>
          </div>
        </div>
      </section>

      <footer className="text-center text-sm text-gray-600 mt-20">
        <Link href="/" className="underline hover:text-rose-600">
          Back to Home
        </Link>
      </footer>
    </main>
  );
}
