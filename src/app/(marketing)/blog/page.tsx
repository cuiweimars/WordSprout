import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — Tips & Resources for Sight Word Learning",
  description:
    "Expert tips, research-backed strategies, and printable resources for parents and teachers helping children master sight words.",
};

const posts = [
  {
    slug: "what-are-sight-words",
    title: "What Are Sight Words and Why Do They Matter?",
    excerpt:
      "Sight words are the most frequently used words in children's books. Because many can't be sounded out phonetically, kids need to recognize them instantly — by sight.",
    category: "Basics",
    date: "2026-05-10",
    readTime: "4 min",
  },
  {
    slug: "dolch-vs-fry-word-lists",
    title: "Dolch vs. Fry: Which Sight Word List Should You Use?",
    excerpt:
      "Both lists cover high-frequency words, but they differ in scope and organization. Here's how to pick the right one for your child or students.",
    category: "Teaching Tips",
    date: "2026-05-05",
    readTime: "6 min",
  },
  {
    slug: "5-fun-ways-to-practice-sight-words",
    title: "5 Fun Ways to Practice Sight Words at Home",
    excerpt:
      "Turn practice into play with these simple, screen-free activities that make sight word repetition feel like a game instead of homework.",
    category: "Activities",
    date: "2026-04-28",
    readTime: "5 min",
  },
  {
    slug: "how-flashcards-help-early-readers",
    title: "How Flashcards Help Early Readers (When Used Right)",
    excerpt:
      "Flashcards are a classic tool, but there's a science to using them effectively. Learn the best techniques for sight word flashcard practice.",
    category: "Teaching Tips",
    date: "2026-04-20",
    readTime: "5 min",
  },
  {
    slug: "kindergarten-sight-words-checklist",
    title: "Kindergarten Sight Words: A Complete Checklist for Parents",
    excerpt:
      "Wondering which words your kindergartener should know? Use this printable checklist to track progress through the 52 Dolch kindergarten words.",
    category: "Printables",
    date: "2026-04-15",
    readTime: "3 min",
  },
  {
    slug: "spaced-repetition-for-kids",
    title: "Spaced Repetition for Kids: The Science Behind WordSprout",
    excerpt:
      "We use a kid-friendly spaced repetition system to ensure words stick long-term. Here's how the algorithm adapts to your child's learning pace.",
    category: "Behind the Scenes",
    date: "2026-04-10",
    readTime: "7 min",
  },
];

const categoryColors: Record<string, string> = {
  Basics: "bg-sky-100 text-sky-700",
  "Teaching Tips": "bg-sprout-100 text-sprout-700",
  Activities: "bg-amber-100 text-amber-700",
  Printables: "bg-purple-100 text-purple-700",
  "Behind the Scenes": "bg-gray-100 text-gray-700",
};

export default function BlogPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-sprout-50 to-sun-50 py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-sprout-800 mb-4">
            Blog
          </h1>
          <p className="text-lg text-gray-600">
            Tips, strategies, and resources for helping young readers master sight words.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group rounded-2xl border border-gray-100 bg-white overflow-hidden hover:shadow-md hover:border-sprout-200 transition-all"
              >
                <div className="h-40 bg-gradient-to-br from-sprout-100 to-sprout-50 flex items-center justify-center">
                  <span className="text-5xl opacity-60 group-hover:scale-110 transition-transform">
                    {post.category === "Basics"
                      ? "📖"
                      : post.category === "Teaching Tips"
                        ? "💡"
                        : post.category === "Activities"
                          ? "🎨"
                          : post.category === "Printables"
                            ? "🖨️"
                            : "⚙️"}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        categoryColors[post.category] ?? "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-400">{post.readTime}</span>
                  </div>
                  <h2 className="font-heading font-bold text-gray-800 mb-2 leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-600 line-clamp-3">{post.excerpt}</p>
                  <p className="text-sprout-500 text-sm font-medium mt-3">
                    Read more →
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-cream">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold text-gray-800 mb-4">
            Get Teaching Tips in Your Inbox
          </h2>
          <p className="text-gray-600 mb-6">
            Weekly sight word activities, printable resources, and early literacy research — delivered free.
          </p>
          <form className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="you@example.com"
              required
              className="flex-1 px-4 py-3 rounded-full border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-sprout-300 focus:border-sprout-400"
            />
            <button
              type="submit"
              className="bg-sprout-500 text-white font-heading font-bold px-6 py-3 rounded-full hover:bg-sprout-600 transition-colors text-sm"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
