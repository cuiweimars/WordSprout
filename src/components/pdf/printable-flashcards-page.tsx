"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { PdfConfigPanel } from "./pdf-config-panel";
import { getWordsForConfig } from "@/lib/pdf-helpers";
import type { PdfConfig } from "@/types/pdf-config";

const FlashcardPdfBundle = dynamic(
  () => import("./flashcards-bundle"),
  { ssr: false }
);

export function PrintableFlashcardsPage() {
  const [config, setConfig] = useState<PdfConfig | null>(null);
  const [ready, setReady] = useState(false);

  if (!config || !ready) {
    return (
      <PdfConfigPanel
        onGenerate={(c) => {
          setConfig(c);
          setReady(true);
        }}
        defaultList="dolch"
        defaultLevel="pre-primer"
      />
    );
  }

  const words = getWordsForConfig(config);
  const title = `${config.listType === "dolch" ? "Dolch" : "Fry"} Flashcards`;

  return (
    <div>
      <div className="bg-sprout-50 rounded-xl p-4 mb-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          <span className="font-bold text-sprout-700">{words.length} words</span> from{" "}
          {config.listType === "dolch" ? "Dolch" : "Fry"} — {config.level.replace(/-/g, " ")}
          {config.shuffle && " (shuffled)"}
        </div>
        <button
          onClick={() => {
            setConfig(null);
            setReady(false);
          }}
          className="text-sm text-sprout-600 hover:text-sprout-800 underline"
        >
          Change settings
        </button>
      </div>

      <div className="bg-white rounded-2xl border p-8 text-center">
        <p className="text-gray-600 mb-6">
          Your flashcard PDF is ready. It includes {words.length} cards (front + back) formatted for
          double-sided printing. Cut along the dashed lines.
        </p>
        <div className="text-5xl mb-4">🖨️</div>
        <FlashcardPdfBundle
          words={words}
          title={title}
          fileName={`wordsprout-flashcards-${config.level}.pdf`}
        />
      </div>
    </div>
  );
}
