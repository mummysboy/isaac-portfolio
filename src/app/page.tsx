// app/page.tsx
"use client";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-pink-50 text-gray-900 p-6 md:p-12 font-sans">
      <header className="mb-20 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-800 drop-shadow">
          Isaac Hirsch
        </h1>
        <p className="text-xl md:text-2xl mt-4 text-gray-600 italic">
          Adaptive Engineer · Full-Stack Creator · Global Thinker
        </p>
      </header>

      <section className="max-w-5xl mx-auto space-y-20">
        {/* Business Section */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <Image
              src="/images/business.jpeg"
              alt="Business"
              width={600}
              height={400}
              className="rounded-xl shadow-md"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Business / Professional
            </h2>
            <p className="text-gray-700 mb-4">
              Explore my CV, engineering philosophy, and tech projects grounded
              in reliable, maintainable, and scalable development.
            </p>
            <Link
              href="/business"
              className="text-blue-700 font-semibold underline"
            >
              Go to section →
            </Link>
          </div>
        </div>

        {/* Private/Family Section */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-8">
          <div className="md:w-1/2">
            <Image
              src="/images/personal.jpeg"
              alt="Personal Life"
              width={600}
              height={400}
              className="rounded-xl shadow-md"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Private / Family
            </h2>
            <p className="text-gray-700 mb-4">
              A grounded, intentional life. Learn about my background, personal
              values, and what drives me beyond the screen.
            </p>
            <Link
              href="/personal"
              className="text-blue-700 font-semibold underline"
            >
              Go to section →
            </Link>
          </div>
        </div>

        {/* Extra Curricular Section */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <Image
              src="/images/extracurricular.jpeg"
              alt="Extra Curricular"
              width={600}
              height={400}
              className="rounded-xl shadow-md"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Extra Curricular
            </h2>
            <p className="text-gray-700 mb-4">
              Creative projects, sports, travel, and side-hustles — these keep
              me balanced and inspired.
            </p>
            <Link
              href="/extracurricular"
              className="text-blue-700 font-semibold underline"
            >
              Go to section →
            </Link>
          </div>
        </div>
      </section>

      <footer className="text-center text-sm text-gray-600 mt-20">
        © {new Date().getFullYear()} Isaac Hirsch ·{" "}
        <a
          href="mailto:isaachirsch@gmail.com"
          className="underline hover:text-blue-600"
        >
          isaachirsch@gmail.com
        </a>
      </footer>
    </main>
  );
}
