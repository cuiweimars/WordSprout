export interface Grade {
  slug: string;
  name: string;
  ageRange: string;
  dolchLevel: string;
  description: string;
}

export const grades: Grade[] = [
  {
    slug: "pre-k",
    name: "Pre-K",
    ageRange: "4-5",
    dolchLevel: "pre-primer",
    description:
      "Perfect for children just starting their reading journey. These 40 basic sight words lay the foundation for early literacy.",
  },
  {
    slug: "kindergarten",
    name: "Kindergarten",
    ageRange: "5-6",
    dolchLevel: "primer",
    description:
      "Build reading confidence with 52 essential sight words that kindergarteners encounter in everyday books.",
  },
  {
    slug: "first-grade",
    name: "1st Grade",
    ageRange: "6-7",
    dolchLevel: "first-grade",
    description:
      "Strengthen reading fluency with 41 sight words that first graders need to know by sight for reading success.",
  },
  {
    slug: "second-grade",
    name: "2nd Grade",
    ageRange: "7-8",
    dolchLevel: "second-grade",
    description:
      "Expand vocabulary with 46 sight words that help second graders read smoothly and with understanding.",
  },
  {
    slug: "third-grade",
    name: "3rd Grade",
    ageRange: "8-9",
    dolchLevel: "third-grade",
    description:
      "Master 41 advanced sight words that third graders need for reading comprehension and academic success.",
  },
];

export function getGradeBySlug(slug: string): Grade | undefined {
  return grades.find((g) => g.slug === slug);
}
