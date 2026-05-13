import { Metadata } from "next";
import Link from "next/link";
import { dolchGrades, getDolchGrade } from "@/data/dolch-words";

export function generateStaticParams() {
  return dolchGrades.map((g) => ({ grade: g.slug }));
}

export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ grade: string }>;
}): Promise<Metadata> {
  const { grade } = await params;
  const g = getDolchGrade(grade);
  if (!g) return {};
  return {
    title: `Dolch ${g.name} Sight Words — ${g.words.length} Word List`,
    description: `Free Dolch ${g.name} sight word list with ${g.words.length} words. Includes flashcards, worksheets, and interactive games.`,
  };
}

export default async function DolchGradePage({
  params,
}: {
  params: Promise<{ grade: string }>;
}) {
  const { grade } = await params;
  const g = getDolchGrade(grade);
  if (!g) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <nav className="text-sm text-gray-500 mb-6">
        <ol className="flex items-center gap-2">
          <li><Link href="/" className="hover:text-sprout-600">Home</Link></li>
          <li>/</li>
          <li><Link href="/sight-words" className="hover:text-sprout-600">Sight Words</Link></li>
          <li>/</li>
          <li><Link href="/sight-words/dolch" className="hover:text-sprout-600">Dolch</Link></li>
          <li>/</li>
          <li className="text-gray-800 font-medium">{g.name}</li>
        </ol>
      </nav>

      <h1 className="font-heading text-4xl font-bold text-gray-800 mb-4">
        Dolch {g.name} Sight Words
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        {g.words.length} sight words for the {g.name} level. Click any word to see
        flashcards, example sentences, and printable worksheets.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 mb-8">
        {g.words.map((w) => (
          <Link
            key={w.slug}
            href={`/sight-words/word/${w.slug}`}
            className="flex items-center justify-center p-4 bg-white rounded-xl border hover:border-sprout-300 hover:bg-sprout-50 transition-all"
          >
            <span className="font-display font-bold text-xl text-sprout-700">
              {w.text}
            </span>
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap gap-4">
        <Link
          href="/flashcards"
          className="bg-sprout-500 text-white font-medium px-6 py-3 rounded-full hover:bg-sprout-600 transition-colors"
        >
          Practice with Flashcards
        </Link>
        <Link
          href="/games"
          className="bg-white text-sprout-700 font-medium px-6 py-3 rounded-full border-2 border-sprout-200 hover:border-sprout-400 transition-colors"
        >
          Play Sight Word Games
        </Link>
      </div>
    </div>
  );
}
