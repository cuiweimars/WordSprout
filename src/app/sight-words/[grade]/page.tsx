import { Metadata } from "next";
import Link from "next/link";
import { grades, getGradeBySlug } from "@/data/grades";
import { dolchGrades } from "@/data/dolch-words";

export function generateStaticParams() {
  return grades.map((g) => ({ grade: g.slug }));
}

export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ grade: string }>;
}): Promise<Metadata> {
  const { grade } = await params;
  const g = getGradeBySlug(grade);
  if (!g) return {};
  return {
    title: `${g.name} Sight Words — Free List, Flashcards & Worksheets`,
    description: `Free ${g.name} sight word list with flashcards, printable worksheets, and interactive games. ${g.description}`,
  };
}

export default async function GradePage({
  params,
}: {
  params: Promise<{ grade: string }>;
}) {
  const { grade } = await params;
  const g = getGradeBySlug(grade);
  if (!g) return null;

  const dolchGrade = dolchGrades.find((dg) => dg.slug === g.dolchLevel);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="font-heading text-4xl font-bold text-gray-800 mb-4">
        {g.name} Sight Words
      </h1>
      <p className="text-lg text-gray-600 mb-2">Ages {g.ageRange}</p>
      <p className="text-gray-600 mb-8">{g.description}</p>

      {dolchGrade && (
        <div className="bg-white rounded-2xl border p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-xl font-bold text-gray-800">
              {dolchGrade.name} Word List ({dolchGrade.words.length} words)
            </h2>
            <Link
              href={`/sight-words/dolch/${dolchGrade.slug}`}
              className="text-sprout-500 font-medium text-sm hover:text-sprout-600"
            >
              View Full List →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {dolchGrade.words.map((w) => (
              <Link
                key={w.slug}
                href={`/sight-words/word/${w.slug}`}
                className="flex items-center justify-center p-3 bg-sprout-50 rounded-xl border border-sprout-100 hover:bg-sprout-100 transition-colors"
              >
                <span className="font-display font-bold text-sprout-700">{w.text}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-3 gap-4">
        <Link
          href="/flashcards"
          className="flex items-center gap-3 p-5 rounded-xl bg-sprout-50 border hover:bg-sprout-100 transition-colors"
        >
          <span className="text-3xl">🃏</span>
          <div>
            <p className="font-heading font-bold text-sprout-700">Flashcards</p>
            <p className="text-sm text-gray-600">Practice {g.name} words</p>
          </div>
        </Link>
        <Link
          href="/games"
          className="flex items-center gap-3 p-5 rounded-xl bg-berry-50 border hover:bg-berry-100 transition-colors"
        >
          <span className="text-3xl">🎮</span>
          <div>
            <p className="font-heading font-bold text-berry-600">Games</p>
            <p className="text-sm text-gray-600">Learn through play</p>
          </div>
        </Link>
        <Link
          href="/worksheets"
          className="flex items-center gap-3 p-5 rounded-xl bg-sky-50 border hover:bg-sky-100 transition-colors"
        >
          <span className="text-3xl">🖨️</span>
          <div>
            <p className="font-heading font-bold text-sky-600">Worksheets</p>
            <p className="text-sm text-gray-600">Print and practice</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
