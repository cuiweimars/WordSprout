import { dolchGrades } from "@/data/dolch-words";
import { fryGroups } from "@/data/fry-words";
import type { PdfConfig } from "@/types/pdf-config";

export function chunkArray<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

export function shuffleArray<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function createBlankedSentence(sentence: string, word: string): string {
  const regex = new RegExp(`\\b${escapeRegex(word)}\\b`, "gi");
  return sentence.replace(regex, "________");
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function getWordsForConfig(config: PdfConfig) {
  const { listType, level, wordCount, shuffle } = config;

  let words: { text: string; slug: string; exampleSentence: string }[] = [];

  if (listType === "dolch") {
    const grade = dolchGrades.find((g) => g.slug === level);
    if (grade) {
      words = grade.words.map((w) => ({
        text: w.text,
        slug: w.slug,
        exampleSentence: w.exampleSentence,
      }));
    }
  } else {
    const group = fryGroups.find((g) => g.slug === level);
    if (group) {
      words = group.words.map((w) => ({
        text: w.text,
        slug: w.slug,
        exampleSentence: w.exampleSentence,
      }));
    }
  }

  if (shuffle) {
    words = shuffleArray(words);
  }

  return words.slice(0, wordCount);
}

export function getListLevels(listType: "dolch" | "fry") {
  if (listType === "dolch") {
    return dolchGrades.map((g) => ({ slug: g.slug, name: `Dolch ${g.name}`, count: g.words.length }));
  }
  return fryGroups.map((g) => ({ slug: g.slug, name: `Fry ${g.name}`, count: g.words.length }));
}
