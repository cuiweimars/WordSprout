import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_POOLER_URL!;

const client = postgres(connectionString, {
  prepare: false, // Required for Supavisor transaction mode
  ssl: "require",
});

export const db = drizzle(client, { schema });
