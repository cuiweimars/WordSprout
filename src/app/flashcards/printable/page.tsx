import { Metadata } from "next";
import Link from "next/link";
import { PrintableFlashcardsPage } from "@/components/pdf/printable-flashcards-page";

export const metadata: Metadata = {
  title: "Printable Sight Word Flashcards — Free PDF Download",
  description:
    "Generate and print custom sight word flashcards for Dolch and Fry word lists. Free double-sided flashcards for Pre-K through 3rd Grade.",
};

export default function PrintableFlashcardsRoute() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2">
          <li><Link href="/" className="hover:text-sprout-600">Home</Link></li>
          <li>/</li>
          <li><Link href="/flashcards" className="hover:text-sprout-600">Flashcards</Link></li>
          <li>/</li>
          <li className="text-gray-800 font-medium">Printable</li>
        </ol>
      </nav>

      <h1 className="font-heading text-4xl font-bold text-gray-800 mb-4">
        Printable Flashcards
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Create custom flashcard PDFs. Print double-sided, cut along the dashed lines, and start practicing.
      </p>

      <PrintableFlashcardsPage />
    </div>
  );
}
