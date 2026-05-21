-- ============================================================
-- Migration: Add status column to articles table
-- Run this in your Supabase SQL Editor if the table already exists
-- ============================================================

-- Add status column with default 'published'
ALTER TABLE public.articles
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'published'
  CHECK (status IN ('draft', 'published'));

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_articles_status ON public.articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_user_id ON public.articles(user_id);
CREATE INDEX IF NOT EXISTS idx_articles_created_at ON public.articles(created_at DESC);

-- Update RLS policies for draft visibility
DROP POLICY IF EXISTS "Anyone can read articles" ON public.articles;

CREATE POLICY "Anyone can read published articles" ON public.articles
  FOR SELECT USING (status = 'published');

CREATE POLICY "Authors can read their own articles" ON public.articles
  FOR SELECT USING (auth.uid() = user_id);
