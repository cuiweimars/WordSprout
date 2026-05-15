-- Run this in Supabase SQL Editor (Dashboard > SQL Editor)
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar(100) NOT NULL,
  email varchar(255) NOT NULL,
  subject varchar(255) NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Allow anonymous inserts (contact form is public)
ALTER TABLE contact_submissions ENABLE row level security;

CREATE POLICY "Allow anonymous inserts" ON contact_submissions
  FOR INSERT TO anon WITH CHECK (true);
