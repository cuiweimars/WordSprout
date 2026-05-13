import Link from "next/link";
import { siteConfig } from "@/data/site-config";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-sprout-50 to-sun-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-sprout-800 mb-6">
            Help Your Child Master <span className="text-sprout-500">Sight Words</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Interactive flashcards, fun games, and printable worksheets — the free and easy way
            to build reading confidence in children ages 4-7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sight-words"
              className="bg-sprout-500 text-white font-heading font-bold px-8 py-4 rounded-full text-lg hover:bg-sprout-600 transition-colors shadow-lg shadow-sprout-200"
            >
              Start Learning Free
            </Link>
            <Link
              href="/flashcards/printable"
              className="bg-white text-sprout-700 font-heading font-bold px-8 py-4 rounded-full text-lg border-2 border-sprout-200 hover:border-sprout-400 transition-colors"
            >
              Print Flashcards
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-center text-gray-800 mb-12">
            How WordSprout Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Choose Words",
                desc: "Pick from Dolch or Fry sight word lists organized by grade level.",
                icon: "📚",
              },
              {
                step: "2",
                title: "Practice & Play",
                desc: "Learn with interactive flashcards and fun matching games.",
                icon: "🎮",
              },
              {
                step: "3",
                title: "Track Progress",
                desc: "See which words your child has mastered and what needs more practice.",
                icon: "📊",
              },
            ].map((item) => (
              <div key={item.step} className="text-center p-6 rounded-2xl bg-cream">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-heading font-bold text-xl mb-2 text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Word Lists Quick Access */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-center text-gray-800 mb-12">
            Popular Sight Word Lists
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <Link
              href="/sight-words/dolch"
              className="block p-6 bg-white rounded-2xl shadow-sm border border-sprout-100 hover:shadow-md hover:border-sprout-300 transition-all"
            >
              <h3 className="font-heading font-bold text-xl text-sprout-700 mb-2">
                Dolch Sight Words
              </h3>
              <p className="text-gray-600 text-sm">
                220 words across 5 grade levels (Pre-K through 3rd Grade). The most widely used sight word list in American schools.
              </p>
              <p className="text-sprout-500 font-medium text-sm mt-3">
                View all 220 words →
              </p>
            </Link>
            <Link
              href="/sight-words/fry"
              className="block p-6 bg-white rounded-2xl shadow-sm border border-sky-100 hover:shadow-md hover:border-sky-300 transition-all"
            >
              <h3 className="font-heading font-bold text-xl text-sky-600 mb-2">
                Fry Sight Words
              </h3>
              <p className="text-gray-600 text-sm">
                The first 300 Fry words cover about 67% of all reading material. Organized by frequency of use.
              </p>
              <p className="text-sky-500 font-medium text-sm mt-3">
                View all 300 words →
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-center text-gray-800 mb-12">
            Everything Your Child Needs
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🃏", title: "Interactive Flashcards", desc: "Digital flashcards with audio pronunciation and flip animation." },
              { icon: "🎮", title: "Fun Games", desc: "Word Match and Build the Word games to reinforce learning." },
              { icon: "🖨️", title: "Printable Resources", desc: "Download flashcards and worksheets customized for your child." },
              { icon: "📈", title: "Progress Tracking", desc: "Smart spaced repetition ensures words stick long-term." },
            ].map((f) => (
              <div key={f.title} className="p-5 rounded-xl bg-sprout-50">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-heading font-bold text-gray-800 mb-1">{f.title}</h3>
                <p className="text-gray-600 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-sprout-600 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">
            Ready to Help Your Child Read?
          </h2>
          <p className="text-sprout-100 text-lg mb-8">
            Join thousands of parents and teachers using WordSprout to make sight word learning fun and effective.
          </p>
          <Link
            href="/sight-words"
            className="inline-block bg-white text-sprout-700 font-heading font-bold px-8 py-4 rounded-full text-lg hover:bg-sprout-50 transition-colors"
          >
            Get Started for Free
          </Link>
        </div>
      </section>
    </div>
  );
}
