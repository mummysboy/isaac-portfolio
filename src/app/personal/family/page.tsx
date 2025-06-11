// app/personal/family/page.tsx
import Link from "next/link";

export default function FamilyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-yellow-50 text-gray-900 px-6 md:px-24 py-16">
      <header className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-rose-700 mb-4">
          Family & Personal Life
        </h1>
        <p className="text-lg md:text-xl text-rose-500 max-w-3xl mx-auto">
          A window into my personal world—where roots run deep, values matter,
          and meaningful moments are everything.
        </p>
      </header>

      <section className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <div>
          <h2 className="text-2xl font-bold text-rose-600 mb-3">Core Values</h2>
          <p className="text-gray-700">
            My personal life is built around integrity, curiosity, resilience,
            and community. I value deep connections, long walks, and asking good
            questions.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-rose-600 mb-3">Family Ties</h2>
          <p className="text-gray-700">
            From home-cooked Shabbat dinners to late-night sibling banter,
            family keeps me grounded. I believe in showing up, staying kind, and
            being reliable.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-rose-600 mb-3">
            Life Outside Work
          </h2>
          <p className="text-gray-700">
            Whether it's a sunrise jog, reading philosophy, or getting way too
            into a board game, my non-work life recharges me to lead and create
            better.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-rose-600 mb-3">
            Traditions & Travels
          </h2>
          <p className="text-gray-700">
            I’ve lived between continents, celebrated under stars, and sat at
            unfamiliar tables. I carry stories with me—and always have space for
            more.
          </p>
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
