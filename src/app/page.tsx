// app/page.tsx
'use client';
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 text-gray-800 p-6 md:p-12 font-sans">
      <header className="mb-12 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900">Isaac Hirsch</h1>
        <p className="text-xl md:text-2xl mt-4 text-gray-600">Creative Technologist · Software Engineer · Strategic Builder</p>
      </header>

      <section className="mb-16 max-w-3xl mx-auto text-lg leading-relaxed">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Why Hire Me?</h2>
        <p className="mb-4">I bring together deep technical knowledge and sharp UX sensibilities to create software that not only works, but lasts. Whether it’s building scalable adtech platforms, leading front-end architecture, or launching AI-powered tools — I design solutions that are <strong>reliable, maintainable, and scalable</strong> from day one.</p>
        <p className="mb-6">Beyond the code, I’m a clear communicator, quick learner, and a dedicated contributor to team goals and culture. From international business strategy to producing children's music, my cross-disciplinary experiences shape the way I think, lead, and build.</p>
        <Link href="/cv" className="inline-block bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-full shadow transition-all duration-300">View My CV</Link>
      </section>

      <section className="mb-16 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Beyond the Resume</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
            <p><strong>Creative Producer:</strong> Wrote and released Spanish-language children’s music distributed via YouTube.</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
            <p><strong>Community Developer:</strong> Built digital infrastructure for rugby teams including e-commerce, scheduling, and fundraising platforms.</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
            <p><strong>World Explorer:</strong> Lived and worked across Israel, California, and more — adapting fast and building global perspective.</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
            <p><strong>Technical Storyteller:</strong> I help translate complex systems into clear ideas for users, stakeholders, and cross-functional teams.</p>
          </div>
        </div>
      </section>

      <footer className="text-center text-sm text-gray-500 mt-12">
        © {new Date().getFullYear()} Isaac Hirsch · <a href="mailto:isaachirsch@gmail.com" className="underline hover:text-gray-700">isaachirsch@gmail.com</a>
      </footer>
    </main>
  );
}