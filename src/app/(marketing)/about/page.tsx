import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — Our Mission to Help Kids Read",
  description:
    "WordSprout was built by parents and teachers who believe every child deserves a fun, free way to master sight words and build reading confidence.",
};

const values = [
  {
    icon: "🎯",
    title: "Learning First",
    desc: "Every feature is designed around how children ages 4-7 actually learn — through repetition, play, and encouragement.",
  },
  {
    icon: "🆓",
    title: "Free Core Access",
    desc: "The most essential sight word tools are free, forever. No credit card required, no trial limits on core content.",
  },
  {
    icon: "👨‍👩‍👧",
    title: "Parent-Friendly",
    desc: "No ads, no inappropriate content, no complicated setup. Just open the site and start learning together.",
  },
  {
    icon: "🏫",
    title: "Teacher-Approved",
    desc: "Aligned with Common Core standards and used by educators in classrooms across the country.",
  },
];

const milestones = [
  { year: "2025", event: "WordSprout launches with Dolch & Fry word lists" },
  { year: "2025", event: "First 6 interactive games go live" },
  { year: "2026", event: "Progress tracking & spaced repetition system" },
  { year: "2026", event: "Teacher dashboard with class management" },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-sprout-50 to-sun-50 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-sprout-800 mb-6">
            Helping Every Child <span className="text-sprout-500">Bloom</span> Into a Reader
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            WordSprout was created with one simple goal: make sight word practice so fun that
            kids actually <em>want</em> to do it. We combine proven teaching methods with playful
            design so parents and teachers can help young readers thrive.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Over 60% of American fourth graders read below grade level. We believe early sight
              word mastery is one of the most effective ways to change that trajectory. By making
              high-quality practice tools free and accessible, we aim to give every family and
              classroom the resources they need.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-center text-gray-800 mb-12">
            What We Stand For
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="text-3xl mb-3">{v.icon}</div>
                <h3 className="font-heading font-bold text-gray-800 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-600">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-center text-gray-800 mb-12">
            Our Journey
          </h2>
          <div className="space-y-6">
            {milestones.map((m) => (
              <div key={m.year + m.event} className="flex gap-4 items-start">
                <span className="shrink-0 w-16 font-heading font-bold text-sprout-600 text-right">
                  {m.year}
                </span>
                <div className="w-px bg-sprout-300 self-stretch" />
                <p className="text-gray-700">{m.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-sprout-600 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">
            Want to Help Us Grow?
          </h2>
          <p className="text-sprout-100 text-lg mb-8">
            Whether you're a parent, teacher, or education advocate — we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-sprout-700 font-heading font-bold px-8 py-4 rounded-full text-lg hover:bg-sprout-50 transition-colors"
            >
              Get in Touch
            </Link>
            <Link
              href="/sight-words"
              className="border-2 border-white text-white font-heading font-bold px-8 py-4 rounded-full text-lg hover:bg-white/10 transition-colors"
            >
              Start Learning
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
