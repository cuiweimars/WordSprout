import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  // Lightweight health check for Supabase heartbeat
  // Prevents Supabase free tier from pausing after 7 days of inactivity
  return NextResponse.json({ status: "ok", timestamp: new Date().toISOString() });
}
