import { Metadata } from "next";
import Link from "next/link";
import { fryGroups, getFryGroup } from "@/data/fry-words";

export function generateStaticParams() {
  return fryGroups.map((g) => ({ group: g.slug }));
}

export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ group: string }>;
}): Promise<Metadata> {
  const { group } = await params;
  const g = getFryGroup(group);
  if (!g) return {};
  return {
    title: `Fry ${g.name} — ${g.words.length} Sight Word List`,
    description: `Free Fry ${g.name} sight word list. Includes flashcards, worksheets, and interactive games for practice.`,
  };
}

export default async function FryGroupPage({
  params,
}: {
  params: Promise<{ group: string }>;
}) {
  const { group } = await params;
  const g = getFryGroup(group);
  if (!g) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <nav className="text-sm text-gray-500 mb-6">
        <ol className="flex items-center gap-2">
          <li><Link href="/" className="hover:text-sky-600">Home</Link></li>
          <li>/</li>
          <li><Link href="/sight-words" className="hover:text-sky-600">Sight Words</Link></li>
          <li>/</li>
          <li><Link href="/sight-words/fry" className="hover:text-sky-600">Fry</Link></li>
          <li>/</li>
          <li className="text-gray-800 font-medium">{g.name}</li>
        </ol>
      </nav>

      <h1 className="font-heading text-4xl font-bold text-gray-800 mb-4">
        Fry {g.name}
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        {g.words.length} sight words ranked by frequency. Click any word to practice with flashcards and games.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 mb-8">
        {g.words.map((w, i) => (
          <Link
            key={w.slug}
            href={`/sight-words/word/${w.slug}`}
            className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border hover:border-sky-300 hover:bg-sky-50 transition-all"
          >
            <span className="font-display font-bold text-xl text-sky-600">
              {w.text}
            </span>
            <span className="text-xs text-gray-400 mt-1">#{i + 1}</span>
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap gap-4">
        <Link
          href="/flashcards"
          className="bg-sky-500 text-white font-medium px-6 py-3 rounded-full hover:bg-sky-600 transition-colors"
        >
          Practice with Flashcards
        </Link>
        <Link
          href="/games"
          className="bg-white text-sky-600 font-medium px-6 py-3 rounded-full border-2 border-sky-200 hover:border-sky-400 transition-colors"
        >
          Play Sight Word Games
        </Link>
      </div>
    </div>
  );
}
