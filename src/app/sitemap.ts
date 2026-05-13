import { MetadataRoute } from "next";
import { dolchWords } from "@/data/dolch-words";
import { fryWords } from "@/data/fry-words";
import { dolchGrades } from "@/data/dolch-words";
import { fryGroups } from "@/data/fry-words";
import { grades } from "@/data/grades";
import { siteConfig } from "@/data/site-config";

const baseUrl = siteConfig.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${baseUrl}/sight-words`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/sight-words/dolch`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/sight-words/fry`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/flashcards`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/worksheets`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/games`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/games/word-match`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/games/build-the-word`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/pricing`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.6 },
  ];

  const dolchGradePages = dolchGrades.map((g) => ({
    url: `${baseUrl}/sight-words/dolch/${g.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const fryGroupPages = fryGroups.map((g) => ({
    url: `${baseUrl}/sight-words/fry/${g.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const gradePages = grades.map((g) => ({
    url: `${baseUrl}/sight-words/${g.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const allWords = [...dolchWords, ...fryWords];
  const wordPages = allWords.map((w) => ({
    url: `${baseUrl}/sight-words/word/${w.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...dolchGradePages, ...fryGroupPages, ...gradePages, ...wordPages];
}
