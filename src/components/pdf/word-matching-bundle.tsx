"use client";

import { WordMatchingDocument } from "./documents/word-matching-document";
import { PdfDownloadButton } from "./pdf-download-button";

interface WordData {
  text: string;
  exampleSentence: string;
}

interface WordMatchingBundleProps {
  words: WordData[];
  title: string;
  gradeName: string;
  fileName: string;
}

export default function WordMatchingBundle({ words, title, gradeName, fileName }: WordMatchingBundleProps) {
  return (
    <PdfDownloadButton
      document={<WordMatchingDocument words={words} title={title} gradeName={gradeName} />}
      fileName={fileName}
      label="Download Word Matching Worksheet"
    />
  );
}
