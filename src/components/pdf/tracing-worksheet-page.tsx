"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { PdfConfigPanel } from "./pdf-config-panel";
import { getWordsForConfig } from "@/lib/pdf-helpers";
import type { PdfConfig } from "@/types/pdf-config";

const TracingPdfBundle = dynamic(
  () => import("./tracing-bundle"),
  { ssr: false }
);

export function TracingWorksheetPage() {
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
      <div className="bg-sprout-50 rounded-xl p-4 mb-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          <span className="font-bold text-sprout-700">{words.length} words</span> — {gradeName}
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
          Tracing worksheet with {words.length} sight words. Each word has a bold reference and three
          tracing lines for handwriting practice.
        </p>
        <div className="text-5xl mb-4">✏️</div>
        <TracingPdfBundle
          words={words}
          title={`Tracing — ${gradeName}`}
          gradeName={gradeName}
          fileName={`wordsprout-tracing-${config.level}.pdf`}
        />
      </div>
    </div>
  );
}
