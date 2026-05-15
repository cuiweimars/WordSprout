"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { PdfConfigPanel } from "./pdf-config-panel";
import { getWordsForConfig } from "@/lib/pdf-helpers";
import type { PdfConfig } from "@/types/pdf-config";

const WordMatchingPdfBundle = dynamic(
  () => import("./word-matching-bundle"),
  { ssr: false },
);

export function WordMatchingWorksheetPage() {
  const [config, setConfig] = useState<PdfConfig | null>(null);
  const [ready, setReady] = useState(false);

  if (!config || !ready) {
    return (
      <PdfConfigPanel
        onGenerate={(c) => {
          setConfig(c);
          setReady(true);
        }}
      />
    );
  }

  const words = getWordsForConfig(config);
  const gradeName = `${config.listType === "dolch" ? "Dolch" : "Fry"} ${config.level.replace(/-/g, " ")}`;

  return (
    <div>
      <div className="bg-berry-50 rounded-xl p-4 mb-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          <span className="font-bold text-berry-500">{words.length} words</span> — {gradeName}
        </div>
        <button
          onClick={() => { setConfig(null); setReady(false); }}
          className="text-sm text-sprout-600 hover:text-sprout-800 underline"
        >
          Change settings
        </button>
      </div>

      <div className="bg-white rounded-2xl border p-8 text-center">
        <p className="text-gray-600 mb-6">
          Word matching worksheet with {words.length} sight words. Draw a line from each word
          to its matching sentence. Answer key included at the bottom.
        </p>
        <div className="text-5xl mb-4">🔗</div>
        <WordMatchingPdfBundle
          words={words}
          title={`Word Matching — ${gradeName}`}
          gradeName={gradeName}
          fileName={`wordsprout-word-matching-${config.level}.pdf`}
        />
      </div>
    </div>
  );
}
