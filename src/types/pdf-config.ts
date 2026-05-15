import type { WordListType } from "./word";

export interface PdfConfig {
  listType: WordListType;
  level: string;
  wordCount: number;
  shuffle: boolean;
}

export type WorksheetType = "tracing" | "fill-blank" | "word-matching" | "word-search";
