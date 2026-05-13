export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function learningResourceSchema(word: string) {
  return {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: `Sight Word "${word}"`,
    educationalLevel: "PreK-3rd Grade",
    learningResourceType: "Flashcard",
    educationalSubject: "Reading",
    audience: {
      "@type": "PeopleAudience",
      suggestedMinAge: 4,
      suggestedMaxAge: 7,
    },
    isAccessibleForFree: true,
  };
}

export function breadcrumbSchema(
  items: { name: string; href: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.href,
    })),
  };
}
