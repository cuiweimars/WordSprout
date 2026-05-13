import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { dolchWords, getDolchWordBySlug } from "@/data/dolch-words";
import { fryWords, getFryWordBySlug } from "@/data/fry-words";
import { WordCard } from "@/components/words/word-card";
import { WordAudioButton } from "@/components/words/word-audio-button";
import { HeartWord } from "@/components/words/heart-word";
import { isHeartWord } from "@/data/heart-words";
import { JsonLd, learningResourceSchema, breadcrumbSchema } from "@/components/seo/json-ld";
import { siteConfig } from "@/data/site-config";

const allWords = [...dolchWords, ...fryWords];

export function generateStaticParams() {
  return allWords.map((w) => ({ word: w.slug }));
}

export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ word: string }>;
}): Promise<Metadata> {
  const { word: wordSlug } = await params;
  const word =
    getDolchWordBySlug(wordSlug) ?? getFryWordBySlug(wordSlug);
  if (!word) return {};

  return {
    title: `Sight Word "${word.text}" — Free Flashcards & Worksheets`,
    description: `Learn the sight word "${word.text}" with free interactive flashcards, pronunciation audio, printable worksheets, and fun games. Perfect for PreK-3rd grade.`,
    openGraph: {
      title: `Sight Word "${word.text}" | ${siteConfig.name}`,
      description: `Learn "${word.text}" with interactive flashcards, games, and printable worksheets.`,
    },
  };
}

export default async function WordDetailPage({
  params,
}: {
  params: Promise<{ word: string }>;
}) {
  const { word: wordSlug } = await params;
  const dolchWord = getDolchWordBySlug(wordSlug);
  const fryWord = getFryWordBySlug(wordSlug);
  const word = dolchWord ?? fryWord;
  if (!word) notFound();

  const relatedWords = allWords
    .filter((w) => w.slug !== word.slug)
    .slice(0, 8);

  const gradeLabel = dolchWord
    ? dolchWord.grade?.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : fryWord?.fryGroup?.replace("-", " ");

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <JsonLd data={learningResourceSchema(word.text)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: siteConfig.url },
          { name: "Sight Words", href: `${siteConfig.url}/sight-words` },
          { name: word.text, href: `${siteConfig.url}/sight-words/word/${word.slug}` },
        ])}
      />

      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2">
          <li><Link href="/" className="hover:text-sprout-600">Home</Link></li>
          <li>/</li>
          <li><Link href="/sight-words" className="hover:text-sprout-600">Sight Words</Link></li>
          <li>/</li>
          {dolchWord ? (
            <>
              <li><Link href="/sight-words/dolch" className="hover:text-sprout-600">Dolch</Link></li>
              <li>/</li>
              <li className="text-gray-800 font-medium">{word.text}</li>
            </>
          ) : (
            <>
              <li><Link href="/sight-words/fry" className="hover:text-sprout-600">Fry</Link></li>
              <li>/</li>
              <li className="text-gray-800 font-medium">{word.text}</li>
            </>
          )}
        </ol>
      </nav>

      {/* Main Card */}
      <div className="text-center mb-10">
        <h1 className="sr-only">Sight Word: {word.text}</h1>
        <div className="inline-flex flex-col items-center mb-4">
          <WordCard word={word.text} size="lg" />
          <div className="mt-4">
            <WordAudioButton wordSlug={word.slug} />
          </div>
        </div>
        <p className="text-sm text-gray-500 mb-2">
          {dolchWord ? "Dolch" : "Fry"} Sight Word
          {gradeLabel && ` · ${gradeLabel}`}
          {" · "}Difficulty: {"⭐".repeat(word.difficulty)}
        </p>
      </div>

      {/* Heart Word — How to Read */}
      {isHeartWord(word.slug) && (
        <div className="bg-berry-50 border border-berry-200 rounded-2xl p-6 mb-8 text-center">
          <p className="text-sm font-medium text-berry-600 mb-3 font-heading">
            How to read this word
          </p>
          <HeartWord word={word.text} wordSlug={word.slug} size="lg" />
          <p className="text-xs text-gray-400 mt-3">
            <span className="text-sprout-600 font-bold">Green</span> = sound it out
            {" "}&middot;{" "}
            <span className="text-rose-600 font-bold">Red heart</span> = learn by heart
          </p>
        </div>
      )}

      {/* Example Sentence */}
      <div className="bg-sun-50 border border-sun-200 rounded-2xl p-6 mb-8 text-center">
        <p className="text-sm font-medium text-sun-600 mb-2">Example Sentence</p>
        <p className="text-xl text-gray-800 font-heading">
          {word.exampleSentence}
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        <Link
          href="/learn/flashcards"
          className="flex items-center gap-3 p-4 rounded-xl bg-sprout-50 border border-sprout-200 hover:bg-sprout-100 transition-colors"
        >
          <span className="text-2xl">🃏</span>
          <div>
            <p className="font-heading font-bold text-sprout-700">Flashcards</p>
            <p className="text-sm text-gray-600">Practice with interactive cards</p>
          </div>
        </Link>
        <Link
          href="/games/word-match"
          className="flex items-center gap-3 p-4 rounded-xl bg-berry-50 border border-berry-200 hover:bg-berry-100 transition-colors"
        >
          <span className="text-2xl">🎮</span>
          <div>
            <p className="font-heading font-bold text-berry-600">Play Games</p>
            <p className="text-sm text-gray-600">Learn through fun activities</p>
          </div>
        </Link>
        <Link
          href="/worksheets"
          className="flex items-center gap-3 p-4 rounded-xl bg-sky-50 border border-sky-200 hover:bg-sky-100 transition-colors"
        >
          <span className="text-2xl">🖨️</span>
          <div>
            <p className="font-heading font-bold text-sky-600">Print</p>
            <p className="text-sm text-gray-600">Download worksheets</p>
          </div>
        </Link>
      </div>

      {/* FAQ */}
      <div className="mb-10">
        <h2 className="font-heading text-2xl font-bold text-gray-800 mb-4">
          About the word &ldquo;{word.text}&rdquo;
        </h2>
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-5 border">
            <h3 className="font-bold text-gray-800 mb-1">Is &ldquo;{word.text}&rdquo; a sight word?</h3>
            <p className="text-gray-600 text-sm">Yes, &ldquo;{word.text}&rdquo; is a {dolchWord ? "Dolch" : "Fry"} sight word{gradeLabel ? ` in the ${gradeLabel} list` : ""}. Sight words are high-frequency words that children should recognize instantly by sight.</p>
          </div>
          <div className="bg-white rounded-xl p-5 border">
            <h3 className="font-bold text-gray-800 mb-1">How do you teach &ldquo;{word.text}&rdquo;?</h3>
            <p className="text-gray-600 text-sm">Use flashcards with repetition, practice in context with example sentences like &ldquo;{word.exampleSentence}&rdquo;, and reinforce with games and printable worksheets.</p>
          </div>
          <div className="bg-white rounded-xl p-5 border">
            <h3 className="font-bold text-gray-800 mb-1">What grade level is &ldquo;{word.text}&rdquo;?</h3>
            <p className="text-gray-600 text-sm">&ldquo;{word.text}&rdquo; is typically taught in {gradeLabel || "early elementary"}. It is ranked #{word.frequencyRank} in its word group by frequency.</p>
          </div>
        </div>
      </div>

      {/* Related Words */}
      <div>
        <h2 className="font-heading text-2xl font-bold text-gray-800 mb-4">
          More Sight Words to Learn
        </h2>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
          {relatedWords.map((w) => (
            <Link
              key={w.slug}
              href={`/sight-words/word/${w.slug}`}
              className="flex items-center justify-center p-3 rounded-xl bg-white border hover:border-sprout-300 hover:bg-sprout-50 transition-colors"
            >
              <span className="font-display font-bold text-sprout-700 text-lg">
                {w.text}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
