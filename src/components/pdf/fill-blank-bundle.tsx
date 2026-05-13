"use client";

import { FillBlankDocument } from "./documents/fill-blank-document";
import { PdfDownloadButton } from "./pdf-download-button";

interface WordData {
  text: string;
  exampleSentence: string;
}

interface FillBlankBundleProps {
  words: WordData[];
  title: string;
  gradeName: string;
  fileName: string;
  label?: string;
}

export default function FillBlankBundle({ words, title, gradeName, fileName, label }: FillBlankBundleProps) {
  return (
    <PdfDownloadButton
      document={<FillBlankDocument words={words} title={title} gradeName={gradeName} />}
      fileName={fileName}
      label={label || "Download Worksheet"}
      className="bg-sky-500 hover:bg-sky-600"
    />
  );
}
