export const siteConfig = {
  name: "WordSprout",
  description:
    "Help your child master sight words with interactive flashcards, fun games, and printable worksheets. Free for PreK-3rd grade.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.sightwordskid.org",
  ogImage: "/images/og-default.png",
  links: {
    twitter: "https://twitter.com/wordsprout",
    pinterest: "https://pinterest.com/wordsprout",
    tpt: "https://www.teacherspayteachers.com/Store/WordSprout",
  },
  pricing: {
    pro: {
      monthly: 4.99,
      annual: 39.99,
    },
    teacher: {
      monthly: 9.99,
      annual: 79.99,
    },
  },
} as const;
