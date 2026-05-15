import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sight Word Worksheets — Free Printable",
  description:
    "Free printable sight word worksheets for Pre-K through 3rd Grade. Includes tracing, fill-in-the-blank, and matching activities.",
};

const worksheetTypes = [
  {
    title: "Tracing Worksheets",
    description: "Practice writing sight words with guided tracing lines. Great for building fine motor skills.",
    icon: "✏️",
    href: "/worksheets/tracing",
    color: "sprout" as const,
  },
  {
    title: "Fill-in-the-Blank",
    description: "Complete sentences by filling in the missing sight word. Builds reading comprehension.",
    icon: "📝",
    href: "/worksheets/fill-blank",
    color: "sky" as const,
  },
  {
    title: "Word Matching",
    description: "Match each sight word to its example sentence. Builds word recognition and reading comprehension.",
    icon: "🔗",
    href: "/worksheets/word-matching",
    color: "berry" as const,
  },
  {
    title: "Word Search",
    description: "Find hidden sight words in a fun letter grid puzzle. Great for visual word recognition.",
    icon: "🔍",
    href: "/worksheets/word-search",
    color: "sun" as const,
  },
];

const colorMap = {
  sprout: { bg: "bg-sprout-50", border: "border-sprout-200", text: "text-sprout-700" },
  sky: { bg: "bg-sky-50", border: "border-sky-200", text: "text-sky-700" },
  berry: { bg: "bg-berry-50", border: "border-berry-200", text: "text-berry-700" },
  sun: { bg: "bg-sun-50", border: "border-sun-200", text: "text-sun-700" },
};

export default function WorksheetsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="font-heading text-4xl font-bold text-gray-800 mb-4">
        Sight Word Worksheets
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Free printable worksheets to help your child practice sight words through tracing,
        fill-in-the-blank, and matching activities.
      </p>

      {/* Worksheet Types */}
      <div className="grid sm:grid-cols-2 gap-6 mb-10">
        {worksheetTypes.map((type) => {
          const colors = colorMap[type.color];
          const content = (
            <>
              <div className="text-3xl mb-3">{type.icon}</div>
              <h2 className={`font-heading text-xl font-bold ${colors.text} mb-2`}>
                {type.title}
                {!type.href && (
                  <span className="ml-2 text-xs font-normal bg-gray-200 text-gray-500 px-2 py-0.5 rounded-full">
                    Soon
                  </span>
                )}
              </h2>
              <p className="text-gray-600 text-sm">{type.description}</p>
            </>
          );

          if (type.href) {
            return (
              <Link
                key={type.title}
                href={type.href}
                className={`${colors.bg} rounded-2xl p-6 border ${colors.border} hover:shadow-md transition-all block`}
              >
                {content}
              </Link>
            );
          }

          return (
            <div
              key={type.title}
              className={`${colors.bg} rounded-2xl p-6 border ${colors.border} opacity-70`}
            >
              {content}
            </div>
          );
        })}
      </div>

      {/* All worksheets are currently free */}
      <div className="bg-gradient-to-r from-sprout-50 to-sky-50 rounded-2xl p-6 border border-sprout-200 text-center">
        <p className="font-heading font-bold text-sprout-700 text-lg mb-2">
          All Worksheets Are Free
        </p>
        <p className="text-gray-600 text-sm">
          Generate unlimited worksheets, flashcards, and more — completely free while we&apos;re in beta.
        </p>
      </div>
    </div>
  );
}
