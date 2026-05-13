export type DolchGrade =
  | "pre-primer"
  | "primer"
  | "first-grade"
  | "second-grade"
  | "third-grade";

export type FryGroup = "first-100" | "second-100" | "third-100";

export type WordListType = "dolch" | "fry";

export interface Word {
  text: string;
  slug: string;
  listType: WordListType;
  grade?: DolchGrade;
  fryGroup?: FryGroup;
  difficulty: number;
  frequencyRank: number;
  exampleSentence: string;
}

export interface WordList {
  name: string;
  slug: string;
  type: WordListType;
  gradeLevel?: string;
  wordCount: number;
  description: string;
}
