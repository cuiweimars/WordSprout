-- Performance indexes for production

-- Words: queried by listId and slug
CREATE INDEX IF NOT EXISTS idx_words_list_id ON words (list_id);
CREATE INDEX IF NOT EXISTS idx_words_slug ON words (slug);

-- Accounts: auth lookup
CREATE INDEX IF NOT EXISTS idx_accounts_user_id ON accounts (user_id);

-- Sessions: auth lookup
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions (user_id);

-- Students: filtered by parent
CREATE INDEX IF NOT EXISTS idx_students_parent_id ON students (parent_id);

-- Learning progress: filtered by student and word
CREATE INDEX IF NOT EXISTS idx_learning_progress_student_id ON learning_progress (student_id);
CREATE INDEX IF NOT EXISTS idx_learning_progress_word_id ON learning_progress (word_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_learning_progress_student_word ON learning_progress (student_id, word_id);

-- Game sessions: filtered by student
CREATE INDEX IF NOT EXISTS idx_game_sessions_student_id ON game_sessions (student_id);

-- Print jobs: filtered by user
CREATE INDEX IF NOT EXISTS idx_print_jobs_user_id ON print_jobs (user_id);

-- Users: Stripe customer lookup (unique constraint already exists, but explicit index)
CREATE INDEX IF NOT EXISTS idx_users_stripe_customer_id ON users (stripe_customer_id);

-- Contact submissions: recent queries
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions (created_at);
