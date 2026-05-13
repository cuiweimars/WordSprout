/**
 * Heart Words data — Science of Reading annotations for Dolch sight words.
 *
 * Each word is broken into parts:
 * - Decodable (isHeart: false) — the child can sound it out (shown green)
 * - Heart part  (isHeart: true)  — irregular spelling that must be memorised (shown red)
 *
 * Only words with clearly irregular spellings are listed.
 * Words not present in this map default to fully decodable (all green).
 */

export interface HeartWordPart {
  /** The substring of the word */
  text: string;
  /** true = red heart part (must memorise), false = green (decodable) */
  isHeart: boolean;
}

export interface HeartWordAnnotation {
  /** Slug matching the Dolch word entry */
  wordSlug: string;
  /** Ordered parts that concatenate to the full word */
  parts: HeartWordPart[];
  /** Brief note about why the heart part is irregular */
  explanation?: string;
}

// ── Pre-Primer ──────────────────────────────────────────────────────────
const prePrimer: HeartWordAnnotation[] = [
  {
    wordSlug: "the",
    parts: [
      { text: "th", isHeart: false },
      { text: "e", isHeart: true },
    ],
    explanation: '"e" makes an /uh/ sound (schwa), not /eh/',
  },
  {
    wordSlug: "said",
    parts: [
      { text: "s", isHeart: false },
      { text: "ai", isHeart: true },
      { text: "d", isHeart: false },
    ],
    explanation: '"ai" makes an /e/ sound here, not its usual long-a',
  },
  {
    wordSlug: "of",
    parts: [
      { text: "o", isHeart: true },
      { text: "f", isHeart: true },
    ],
    explanation: '"o" says /uh/ and "f" says /v/ — both are irregular',
  },
  {
    wordSlug: "was",
    parts: [
      { text: "w", isHeart: false },
      { text: "a", isHeart: true },
      { text: "s", isHeart: false },
    ],
    explanation: '"a" says /uh/ (schwa), not /a/ as in "cat"',
  },
  {
    wordSlug: "to",
    parts: [
      { text: "t", isHeart: false },
      { text: "o", isHeart: true },
    ],
    explanation: '"o" says /oo/, not its short or long sound',
  },
  {
    wordSlug: "you",
    parts: [
      { text: "y", isHeart: true },
      { text: "ou", isHeart: true },
    ],
    explanation: "Both parts are irregular — the whole word must be memorised",
  },
  {
    wordSlug: "they",
    parts: [
      { text: "th", isHeart: false },
      { text: "ey", isHeart: true },
    ],
    explanation: '"ey" makes the long-a sound /ay/',
  },
  {
    wordSlug: "come",
    parts: [
      { text: "c", isHeart: false },
      { text: "o", isHeart: true },
      { text: "me", isHeart: false },
    ],
    explanation: '"o" says /uh/ and the silent-e rule does not apply',
  },
  {
    wordSlug: "one",
    parts: [
      { text: "o", isHeart: true },
      { text: "ne", isHeart: false },
    ],
    explanation: '"o" says /wuh/ — the starting sound is irregular',
  },
];

// ── Primer ──────────────────────────────────────────────────────────────
const primer: HeartWordAnnotation[] = [
  {
    wordSlug: "have",
    parts: [
      { text: "h", isHeart: false },
      { text: "a", isHeart: false },
      { text: "ve", isHeart: true },
    ],
    explanation: 'The "ve" ending is irregular — the "e" is not silent',
  },
  {
    wordSlug: "there",
    parts: [
      { text: "th", isHeart: false },
      { text: "ere", isHeart: true },
    ],
    explanation: '"ere" makes the /air/ sound — irregular spelling',
  },
  {
    wordSlug: "are",
    parts: [
      { text: "a", isHeart: true },
      { text: "re", isHeart: false },
    ],
    explanation: '"a" says /ar/ — the "r-controlled a" pattern',
  },
  {
    wordSlug: "saw",
    parts: [
      { text: "s", isHeart: false },
      { text: "aw", isHeart: true },
    ],
    explanation: '"aw" makes the /aw/ sound — an uncommon pattern for early readers',
  },
];

// ── First Grade ─────────────────────────────────────────────────────────
const firstGrade: HeartWordAnnotation[] = [
  {
    wordSlug: "were",
    parts: [
      { text: "w", isHeart: false },
      { text: "ere", isHeart: true },
    ],
    explanation: '"ere" says /ur/ — irregular pronunciation',
  },
  {
    wordSlug: "could",
    parts: [
      { text: "c", isHeart: false },
      { text: "ou", isHeart: true },
      { text: "ld", isHeart: false },
    ],
    explanation: '"ou" says /oo/ — the "ould" pattern must be memorised',
  },
  {
    wordSlug: "any",
    parts: [
      { text: "a", isHeart: true },
      { text: "ny", isHeart: false },
    ],
    explanation: '"a" says /en/ — the short-e sound is unexpected',
  },
  {
    wordSlug: "says",
    parts: [
      { text: "s", isHeart: false },
      { text: "ay", isHeart: true },
      { text: "s", isHeart: false },
    ],
    explanation: '"ay" says /eh/ here, not its usual long-a sound',
  },
  {
    wordSlug: "give",
    parts: [
      { text: "g", isHeart: false },
      { text: "i", isHeart: false },
      { text: "ve", isHeart: true },
    ],
    explanation: 'The "ve" ending breaks the silent-e rule — "e" is not silent',
  },
  {
    wordSlug: "live",
    parts: [
      { text: "l", isHeart: false },
      { text: "i", isHeart: false },
      { text: "ve", isHeart: true },
    ],
    explanation: 'The "ve" ending breaks the silent-e rule',
  },
  {
    wordSlug: "some",
    parts: [
      { text: "s", isHeart: false },
      { text: "o", isHeart: true },
      { text: "me", isHeart: false },
    ],
    explanation: '"o" says /uh/ (schwa) — irregular for "o"',
  },
  {
    wordSlug: "once",
    parts: [
      { text: "o", isHeart: true },
      { text: "nce", isHeart: false },
    ],
    explanation: '"o" says /wuh/ — the starting sound is irregular',
  },
];

// ── Second Grade ────────────────────────────────────────────────────────
const secondGrade: HeartWordAnnotation[] = [
  {
    wordSlug: "would",
    parts: [
      { text: "w", isHeart: false },
      { text: "ou", isHeart: true },
      { text: "ld", isHeart: false },
    ],
    explanation: '"ou" says /oo/ — the "ould" pattern must be memorised',
  },
  {
    wordSlug: "very",
    parts: [
      { text: "v", isHeart: false },
      { text: "e", isHeart: true },
      { text: "ry", isHeart: false },
    ],
    explanation: 'The first "e" says /eh/ but is short and easy to miss',
  },
  {
    wordSlug: "because",
    parts: [
      { text: "b", isHeart: false },
      { text: "e", isHeart: true },
      { text: "c", isHeart: false },
      { text: "au", isHeart: true },
      { text: "se", isHeart: false },
    ],
    explanation: '"e" is a schwa and "au" says /ah/ — two tricky parts',
  },
  {
    wordSlug: "been",
    parts: [
      { text: "b", isHeart: false },
      { text: "ee", isHeart: true },
      { text: "n", isHeart: false },
    ],
    explanation: '"ee" says /ih/ (short-i) in common speech, not long-e',
  },
  {
    wordSlug: "does",
    parts: [
      { text: "d", isHeart: false },
      { text: "oe", isHeart: true },
      { text: "s", isHeart: false },
    ],
    explanation: '"oe" says /uh/ — completely irregular spelling',
  },
  {
    wordSlug: "their",
    parts: [
      { text: "th", isHeart: false },
      { text: "ei", isHeart: true },
      { text: "r", isHeart: false },
    ],
    explanation: '"ei" says /air/ — irregular "ei" pattern',
  },
  {
    wordSlug: "buy",
    parts: [
      { text: "b", isHeart: false },
      { text: "uy", isHeart: true },
    ],
    explanation: '"uy" makes the long-i sound — irregular "u" usage',
  },
  {
    wordSlug: "right",
    parts: [
      { text: "r", isHeart: false },
      { text: "igh", isHeart: true },
      { text: "t", isHeart: false },
    ],
    explanation: '"igh" is a trigraph that makes the long-i sound',
  },
];

// ── Third Grade ─────────────────────────────────────────────────────────
const thirdGrade: HeartWordAnnotation[] = [
  {
    wordSlug: "eight",
    parts: [
      { text: "eigh", isHeart: true },
      { text: "t", isHeart: false },
    ],
    explanation: '"eigh" is a four-letter pattern that makes the long-a sound',
  },
  {
    wordSlug: "laugh",
    parts: [
      { text: "l", isHeart: false },
      { text: "au", isHeart: true },
      { text: "gh", isHeart: true },
    ],
    explanation: '"au" says /ah/ and "gh" says /f/ — both are irregular',
  },
  {
    wordSlug: "shall",
    parts: [
      { text: "sh", isHeart: false },
      { text: "a", isHeart: false },
      { text: "ll", isHeart: false },
    ],
    // Actually decodable — remove annotation. Keeping for reference.
    explanation: undefined,
  },
  {
    wordSlug: "together",
    parts: [
      { text: "to", isHeart: false },
      { text: "ge", isHeart: true },
      { text: "ther", isHeart: false },
    ],
    explanation: '"ge" says /geh/ with a soft-g, which is tricky for early readers',
  },
  {
    wordSlug: "warm",
    parts: [
      { text: "w", isHeart: false },
      { text: "ar", isHeart: true },
      { text: "m", isHeart: false },
    ],
    explanation: '"ar" says /or/ here, not its usual /ar/ as in "car"',
  },
];

// ── Aggregate & lookup ──────────────────────────────────────────────────

const allAnnotations: HeartWordAnnotation[] = [
  ...prePrimer,
  ...primer,
  ...firstGrade,
  ...secondGrade,
  ...thirdGrade,
];

/**
 * Fast lookup map: word slug → annotation.
 * Built once at module load time.
 */
const annotationMap = new Map<string, HeartWordAnnotation>(
  allAnnotations
    .filter((a) => a.parts.some((p) => p.isHeart)) // only keep entries that actually have heart parts
    .map((a) => [a.wordSlug, a])
);

/**
 * Returns the Heart Word annotation for a given Dolch word slug,
 * or `undefined` if the word is fully decodable (no annotation needed).
 */
export function getHeartWordAnnotation(
  wordSlug: string
): HeartWordAnnotation | undefined {
  return annotationMap.get(wordSlug);
}

/**
 * Returns true if the given word has at least one heart part.
 */
export function isHeartWord(wordSlug: string): boolean {
  return annotationMap.has(wordSlug);
}

/**
 * Returns all heart word annotations (for iteration / bulk use).
 */
export function getAllHeartWordAnnotations(): HeartWordAnnotation[] {
  return Array.from(annotationMap.values());
}
