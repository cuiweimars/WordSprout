import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  real,
  timestamp,
  jsonb,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";

// ─── Enums ───────────────────────────────────────────────

export const subscriptionTierEnum = pgEnum("subscription_tier", [
  "free",
  "pro",
  "teacher",
]);
export const wordStatusEnum = pgEnum("word_status", [
  "new",
  "learning",
  "reviewing",
  "mastered",
]);
export const userRoleEnum = pgEnum("user_role", ["parent", "teacher"]);
export const wordListTypeEnum = pgEnum("word_list_type", [
  "dolch",
  "fry",
  "custom",
]);
export const gameTypeEnum = pgEnum("game_type", [
  "word_match",
  "build_word",
]);
export const printJobTypeEnum = pgEnum("print_job_type", [
  "flashcards",
  "worksheet",
]);

// ─── Word Data ───────────────────────────────────────────

export const wordLists = pgTable("word_lists", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  type: wordListTypeEnum("type").notNull(),
  gradeLevel: varchar("grade_level", { length: 20 }),
  description: text("description"),
  wordCount: integer("word_count").notNull().default(0),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const words = pgTable("words", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  text: varchar("text", { length: 50 }).notNull(),
  slug: varchar("slug", { length: 50 }).notNull(),
  listId: uuid("list_id").references(() => wordLists.id),
  audioUrl: text("audio_url"),
  exampleSentence: text("example_sentence"),
  difficulty: integer("difficulty").notNull().default(1),
  frequencyRank: integer("frequency_rank"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ─── User & Auth ─────────────────────────────────────────

export const users = pgTable("users", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash"),
  name: varchar("name", { length: 100 }),
  emailVerified: timestamp("email_verified", { withTimezone: true }),
  image: text("image"),
  role: userRoleEnum("role").default("parent"),
  subscriptionTier: subscriptionTierEnum("subscription_tier")
    .default("free")
    .notNull(),
  stripeCustomerId: varchar("stripe_customer_id", { length: 255 }).unique(),
  stripeSubscriptionId: varchar("stripe_subscription_id", {
    length: 255,
  }).unique(),
  stripePriceId: varchar("stripe_price_id", { length: 255 }),
  stripeCurrentPeriodEnd: timestamp("stripe_current_period_end", {
    withTimezone: true,
  }),
  printCreditsUsed: integer("print_credits_used").default(0).notNull(),
  printCreditsResetAt: timestamp("print_credits_reset_at", {
    withTimezone: true,
  }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const accounts = pgTable("accounts", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  type: varchar("type", { length: 255 }).notNull(),
  provider: varchar("provider", { length: 255 }).notNull(),
  providerAccountId: varchar("provider_account_id", {
    length: 255,
  }).notNull(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: integer("expires_at"),
  token_type: varchar("token_type", { length: 255 }),
  scope: text("scope"),
  id_token: text("id_token"),
  session_state: text("session_state"),
});

export const sessions = pgTable("sessions", {
  sessionToken: varchar("session_token", { length: 255 })
    .notNull()
    .unique()
    .primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  expires: timestamp("expires", { withTimezone: true }).notNull(),
});

export const verificationTokens = pgTable("verification_tokens", {
  identifier: varchar("identifier", { length: 255 }).notNull(),
  token: varchar("token", { length: 255 }).notNull().unique(),
  expires: timestamp("expires", { withTimezone: true }).notNull(),
});

// ─── Students ────────────────────────────────────────────

export const students = pgTable("students", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  parentId: uuid("parent_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  gradeLevel: varchar("grade_level", { length: 20 }),
  avatar: varchar("avatar", { length: 50 }),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ─── Learning Progress (SRS Core) ────────────────────────

export const learningProgress = pgTable("learning_progress", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  studentId: uuid("student_id")
    .references(() => students.id, { onDelete: "cascade" })
    .notNull(),
  wordId: uuid("word_id")
    .references(() => words.id, { onDelete: "cascade" })
    .notNull(),
  status: wordStatusEnum("status").default("new").notNull(),
  correctCount: integer("correct_count").default(0).notNull(),
  incorrectCount: integer("incorrect_count").default(0).notNull(),
  consecutiveCorrect: integer("consecutive_correct").default(0).notNull(),
  lastReviewedAt: timestamp("last_reviewed_at", { withTimezone: true }),
  nextReviewAt: timestamp("next_review_at", { withTimezone: true }),
  easeFactor: real("ease_factor").default(2.5).notNull(),
  intervalDays: integer("interval_days").default(1).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ─── Game Sessions ───────────────────────────────────────

export const gameSessions = pgTable("game_sessions", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  studentId: uuid("student_id")
    .references(() => students.id, { onDelete: "cascade" })
    .notNull(),
  gameType: gameTypeEnum("game_type").notNull(),
  wordListId: uuid("word_list_id").references(() => wordLists.id),
  wordsPracticed: text("words_practiced").array(),
  score: integer("score"),
  maxScore: integer("max_score"),
  durationSeconds: integer("duration_seconds"),
  completedAt: timestamp("completed_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ─── Print Jobs ──────────────────────────────────────────

export const printJobs = pgTable("print_jobs", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  studentId: uuid("student_id").references(() => students.id, {
    onDelete: "set null",
  }),
  type: printJobTypeEnum("type").notNull(),
  config: jsonb("config"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
