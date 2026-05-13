"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { PdfConfigPanel } from "./pdf-config-panel";
import { getWordsForConfig } from "@/lib/pdf-helpers";
import type { PdfConfig } from "@/types/pdf-config";

const FillBlankPdfBundle = dynamic(
  () => import("./fill-blank-bundle"),
  { ssr: false }
);

export function FillBlankWorksheetPage() {
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
      <div className="bg-sky-50 rounded-xl p-4 mb-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          <span className="font-bold text-sky-700">{words.length} words</span> — {gradeName}
        </div>
        <button
          onClick={() => { setConfig(null); setReady(false); }}
          className="text-sm text-sky-600 hover:text-sky-800 underline"
        >
          Change settings
        </button>
      </div>

      <div className="bg-white rounded-2xl border p-8 text-center">
        <p className="text-gray-600 mb-6">
          Fill-in-the-blank worksheet with {words.length} sentences. Each page includes a word bank
          for reference. Great for reading comprehension practice.
        </p>
        <div className="text-5xl mb-4">📝</div>
        <FillBlankPdfBundle
          words={words}
          title={`Fill-in-the-Blank — ${gradeName}`}
          gradeName={gradeName}
          fileName={`wordsprout-fill-blank-${config.level}.pdf`}
          label="Download Fill-in-the-Blank Worksheet"
        />
      </div>
    </div>
  );
}
