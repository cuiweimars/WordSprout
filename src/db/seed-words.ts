// Seed word lists into the database.
// Run: npx tsx src/db/seed-words.ts

import { dolchGrades } from "../data/dolch-words";
import { fryGroups } from "../data/fry-words";

require("dotenv").config({ path: ".env.local" });

import postgres from "postgres";

const sql = postgres(process.env.DATABASE_POOLER_URL!, {
  ssl: "require",
  prepare: false,
  connect_timeout: 15,
});

async function seed() {
  console.log("Seeding word lists and words...\n");

  // ─── Dolch Lists ──────────────────────────────
  for (const grade of dolchGrades) {
    const [list] = await sql`
      INSERT INTO word_lists (name, slug, type, grade_level, word_count, sort_order)
      VALUES (${grade.name}, ${"dolch-" + grade.slug}, 'dolch', ${grade.slug}, ${grade.words.length}, 0)
      ON CONFLICT (slug) DO UPDATE SET word_count = ${grade.words.length}
      RETURNING id
    `;

    console.log(`  Dolch ${grade.name}: ${grade.words.length} words`);

    for (const w of grade.words) {
      await sql`
        INSERT INTO words (text, slug, list_id, example_sentence, difficulty, frequency_rank)
        VALUES (${w.text}, ${"dolch-" + w.slug}, ${list.id}, ${w.exampleSentence ?? null}, ${w.difficulty ?? 1}, ${w.frequencyRank ?? null})
        ON CONFLICT DO NOTHING
      `;
    }
  }

  // ─── Fry Lists ──────────────────────────────
  for (const group of fryGroups) {
    const [list] = await sql`
      INSERT INTO word_lists (name, slug, type, grade_level, word_count, sort_order)
      VALUES (${group.name}, ${"fry-" + group.slug}, 'fry', ${group.slug}, ${group.words.length}, 1)
      ON CONFLICT (slug) DO UPDATE SET word_count = ${group.words.length}
      RETURNING id
    `;

    console.log(`  Fry ${group.name}: ${group.words.length} words`);

    for (const w of group.words) {
      await sql`
        INSERT INTO words (text, slug, list_id, example_sentence, difficulty, frequency_rank)
        VALUES (${w.text}, ${"fry-" + w.slug}, ${list.id}, ${w.exampleSentence ?? null}, ${w.difficulty ?? 1}, ${w.frequencyRank ?? null})
        ON CONFLICT DO NOTHING
      `;
    }
  }

  // ─── Summary ──────────────────────────────
  const [lists] = await sql`SELECT count(*) as cnt FROM word_lists`;
  const [words] = await sql`SELECT count(*) as cnt FROM words`;
  console.log(`\nDone! ${lists.cnt} word lists, ${words.cnt} words inserted.`);

  await sql.end();
}

seed().catch((e) => {
  console.error("Seed failed:", e);
  sql.end();
  process.exit(1);
});
