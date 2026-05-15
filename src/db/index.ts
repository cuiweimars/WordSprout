import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { createClient } from "@supabase/supabase-js";
import * as schema from "./schema";

// Use the Supabase Pooler URL (IPv4 reachable) over the direct URL (IPv6-only).
const connectionString =
  process.env.DATABASE_POOLER_URL || process.env.DATABASE_URL;

const client = postgres(connectionString!, {
  ssl: "require",
  // Supabase pooler uses session mode — keep prepared statements off.
  prepare: false,
});

export const db = drizzle(client, { schema });

// Supabase REST API client — used for auth and operations where REST is more convenient.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let wsModule: any;
try {
  wsModule = require("ws");
} catch {
  // ws not available (browser/Edge runtime)
}

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: { autoRefreshToken: false, persistSession: false },
    realtime: wsModule ? { transport: wsModule } : undefined,
  },
);
