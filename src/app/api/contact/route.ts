import { NextResponse } from "next/server";
import { supabase } from "@/db";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 },
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 },
      );
    }

    const trimmedName = String(name).trim().slice(0, 100);
    const trimmedSubject = String(subject).trim().slice(0, 200);
    const trimmedMessage = String(message).trim().slice(0, 5000);

    if (!trimmedName || !trimmedSubject || !trimmedMessage) {
      return NextResponse.json(
        { error: "Fields must not be empty after trimming." },
        { status: 400 },
      );
    }

    const { error } = await supabase.from("contact_submissions").insert({
      name: trimmedName,
      email: email.trim().toLowerCase(),
      subject: trimmedSubject,
      message: trimmedMessage,
    });

    if (error) {
      console.error("Failed to save contact submission:", error.message);
      return NextResponse.json(
        { error: "Failed to submit. Please try again later." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
