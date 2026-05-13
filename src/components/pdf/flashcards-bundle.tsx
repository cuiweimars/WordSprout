"use client";

import { FlashcardDocument } from "./documents/flashcard-document";
import { PdfDownloadButton } from "./pdf-download-button";

interface WordData {
  text: string;
  exampleSentence: string;
}

interface FlashcardsBundleProps {
  words: WordData[];
  title: string;
  fileName: string;
}

export default function FlashcardsBundle({ words, title, fileName }: FlashcardsBundleProps) {
  return (
    <PdfDownloadButton
      document={<FlashcardDocument words={words} title={title} />}
      fileName={fileName}
      label="Download Flashcards PDF"
    />
  );
}
