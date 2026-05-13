"use client";

import { TracingDocument } from "./documents/tracing-document";
import { PdfDownloadButton } from "./pdf-download-button";

interface WordData {
  text: string;
  exampleSentence: string;
}

interface TracingBundleProps {
  words: WordData[];
  title: string;
  gradeName: string;
  fileName: string;
}

export default function TracingBundle({ words, title, gradeName, fileName }: TracingBundleProps) {
  return (
    <PdfDownloadButton
      document={<TracingDocument words={words} title={title} gradeName={gradeName} />}
      fileName={fileName}
      label="Download Tracing Worksheet"
    />
  );
}
