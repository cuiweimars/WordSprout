"use client";

import { WordSearchDocument } from "./documents/word-search-document";
import { PdfDownloadButton } from "./pdf-download-button";

interface WordData {
  text: string;
}

interface WordSearchBundleProps {
  words: WordData[];
  title: string;
  gradeName: string;
  fileName: string;
}

export default function WordSearchBundle({ words, title, gradeName, fileName }: WordSearchBundleProps) {
  return (
    <PdfDownloadButton
      document={<WordSearchDocument words={words} title={title} gradeName={gradeName} />}
      fileName={fileName}
      label="Download Word Search Worksheet"
    />
  );
}
