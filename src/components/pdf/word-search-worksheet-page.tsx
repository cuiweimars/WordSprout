"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { PdfConfigPanel } from "./pdf-config-panel";
import { getWordsForConfig } from "@/lib/pdf-helpers";
import type { PdfConfig } from "@/types/pdf-config";

const WordSearchPdfBundle = dynamic(
  () => import("./word-search-bundle"),
  { ssr: false },
);

export function WordSearchWorksheetPage() {
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
      <div className="bg-sun-50 rounded-xl p-4 mb-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          <span className="font-bold text-sun-600">{words.length} words</span> — {gradeName}
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
          Word search puzzle with {words.length} hidden sight words. Find and circle each word —
          they can go in any direction! Up to 10 words per puzzle page.
        </p>
        <div className="text-5xl mb-4">🔍</div>
        <WordSearchPdfBundle
          words={words}
          title={`Word Search — ${gradeName}`}
          gradeName={gradeName}
          fileName={`wordsprout-word-search-${config.level}.pdf`}
        />
      </div>
    </div>
  );
}
