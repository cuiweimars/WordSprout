"use client";

import { useState, useEffect } from "react";
import { getListLevels } from "@/lib/pdf-helpers";
import { cn } from "@/lib/utils";
import type { PdfConfig } from "@/types/pdf-config";

interface PdfConfigPanelProps {
  onGenerate: (config: PdfConfig) => void;
  defaultList?: "dolch" | "fry";
  defaultLevel?: string;
}

export function PdfConfigPanel({
  onGenerate,
  defaultList = "dolch",
  defaultLevel = "pre-primer",
}: PdfConfigPanelProps) {
  const [listType, setListType] = useState<"dolch" | "fry">(defaultList);
  const [level, setLevel] = useState(defaultLevel);
  const [wordCount, setWordCount] = useState(20);
  const [shuffle, setShuffle] = useState(false);

  const levels = getListLevels(listType);
  const selectedLevel = levels.find((l) => l.slug === level);
  const maxWords = selectedLevel?.count ?? 20;

  useEffect(() => {
    const newLevels = getListLevels(listType);
    if (newLevels.length > 0 && !newLevels.find((l) => l.slug === level)) {
      setLevel(newLevels[0].slug);
    }
  }, [listType, level]);

  useEffect(() => {
    if (wordCount > maxWords) {
      setWordCount(maxWords);
    }
  }, [maxWords, wordCount]);

  const handleGenerate = () => {
    onGenerate({ listType, level, wordCount, shuffle });
  };

  return (
    <div className="bg-white rounded-2xl border p-6 sm:p-8">
      {/* List type selector */}
      <div className="mb-6">
        <h3 className="font-heading font-bold text-gray-700 mb-3">Word List</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setListType("dolch")}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors",
              listType === "dolch"
                ? "bg-sprout-500 text-white"
                : "bg-sprout-50 text-sprout-700 hover:bg-sprout-100"
            )}
          >
            Dolch (220 words)
          </button>
          <button
            onClick={() => setListType("fry")}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors",
              listType === "fry"
                ? "bg-sky-500 text-white"
                : "bg-sky-50 text-sky-700 hover:bg-sky-100"
            )}
          >
            Fry (100 words)
          </button>
        </div>
      </div>

      {/* Grade/group selector */}
      <div className="mb-6">
        <h3 className="font-heading font-bold text-gray-700 mb-3">Grade Level</h3>
        <div className="flex flex-wrap gap-2">
          {levels.map((l) => (
            <button
              key={l.slug}
              onClick={() => setLevel(l.slug)}
              className={cn(
                "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                level === l.slug
                  ? listType === "dolch"
                    ? "bg-sprout-500 text-white"
                    : "bg-sky-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              {l.name} ({l.count})
            </button>
          ))}
        </div>
      </div>

      {/* Word count */}
      <div className="mb-6">
        <h3 className="font-heading font-bold text-gray-700 mb-3">
          Number of Words: <span className="text-sprout-600">{wordCount}</span>
        </h3>
        <input
          type="range"
          min={1}
          max={maxWords}
          value={wordCount}
          onChange={(e) => setWordCount(parseInt(e.target.value))}
          className="w-full accent-sprout-500"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>1</span>
          <span>{maxWords}</span>
        </div>
      </div>

      {/* Shuffle toggle */}
      <div className="mb-6 flex items-center gap-3">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={shuffle}
            onChange={(e) => setShuffle(e.target.checked)}
            className="w-4 h-4 accent-sprout-500 rounded"
          />
          <span className="text-sm text-gray-600">Shuffle words randomly</span>
        </label>
      </div>

      {/* Generate button */}
      <button
        onClick={handleGenerate}
        className="bg-sprout-500 text-white font-heading font-bold px-8 py-3 rounded-full hover:bg-sprout-600 transition-colors"
      >
        Generate PDF
      </button>
    </div>
  );
}
