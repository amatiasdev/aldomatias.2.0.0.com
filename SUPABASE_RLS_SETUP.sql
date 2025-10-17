-- ================================================================
-- SUPABASE ROW LEVEL SECURITY (RLS) SETUP
-- Contact Messages Table Security Policies
-- ================================================================
-- Execute this SQL in your Supabase SQL Editor
-- Project Settings > SQL Editor > New Query > Paste and Run
-- ================================================================

-- Step 1: Enable Row Level Security on contact_messages table
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Step 2: DROP existing policies (if any) to start fresh
DROP POLICY IF EXISTS "Allow anonymous insert" ON contact_messages;
DROP POLICY IF EXISTS "Deny anonymous read" ON contact_messages;
DROP POLICY IF EXISTS "Deny anonymous update" ON contact_messages;
DROP POLICY IF EXISTS "Deny anonymous delete" ON contact_messages;
DROP POLICY IF EXISTS "Allow service role full access" ON contact_messages;

-- Step 3: Create Policy - Allow ONLY INSERT for anonymous users
CREATE POLICY "Allow anonymous insert"
ON contact_messages
FOR INSERT
TO anon
WITH CHECK (true);

-- Step 4: Create Policy - DENY all SELECT (read) for anonymous users
CREATE POLICY "Deny anonymous read"
ON contact_messages
FOR SELECT
TO anon
USING (false);

-- Step 5: Create Policy - DENY all UPDATE for anonymous users
CREATE POLICY "Deny anonymous update"
ON contact_messages
FOR UPDATE
TO anon
USING (false);

-- Step 6: Create Policy - DENY all DELETE for anonymous users
CREATE POLICY "Deny anonymous delete"
ON contact_messages
FOR DELETE
TO anon
USING (false);

-- Step 7: Create Policy - Allow FULL access for service_role (admin)
CREATE POLICY "Allow service role full access"
ON contact_messages
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- ================================================================
-- OPTIONAL: Add database constraints for data integrity
-- ================================================================

-- Add NOT NULL constraints
ALTER TABLE contact_messages
ALTER COLUMN name SET NOT NULL,
ALTER COLUMN email SET NOT NULL,
ALTER COLUMN message SET NOT NULL;

-- Add length constraints
ALTER TABLE contact_messages
ADD CONSTRAINT name_length CHECK (char_length(name) BETWEEN 1 AND 100),
ADD CONSTRAINT email_length CHECK (char_length(email) BETWEEN 5 AND 255),
ADD CONSTRAINT company_length CHECK (
  company IS NULL OR char_length(company) <= 100
),
ADD CONSTRAINT message_length CHECK (char_length(message) BETWEEN 10 AND 5000);

-- Add email format validation
ALTER TABLE contact_messages
ADD CONSTRAINT email_format CHECK (
  email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$'
);

-- ================================================================
-- CREATE INDEXES for better query performance
-- ================================================================

CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at
ON contact_messages(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_contact_messages_email
ON contact_messages(email);

-- ================================================================
-- VERIFICATION QUERIES (Run these to test)
-- ================================================================

-- Verify RLS is enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public' AND tablename = 'contact_messages';
-- Expected: rowsecurity = true

-- List all policies
SELECT * FROM pg_policies WHERE tablename = 'contact_messages';
-- Expected: 5 policies listed

-- ================================================================
-- NOTES:
-- 1. After running this, anonymous users (website visitors) can ONLY insert
-- 2. They CANNOT read, update, or delete any messages
-- 3. Only authenticated service_role can view/manage messages
-- 4. To view messages, use Supabase Dashboard or service_role key server-side
-- ================================================================
