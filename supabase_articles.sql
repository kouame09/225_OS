-- ============================================================
-- Articles Table
-- ============================================================
-- Stores tech articles authored by community members.
-- Renders clean Markdown bodies, category selection, cover images,
-- and tags arrays.
-- ============================================================

CREATE TABLE IF NOT EXISTS public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  image_url TEXT,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}'::TEXT[],
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published'))
);

-- ============================================================
-- Indexes
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_articles_status ON public.articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_user_id ON public.articles(user_id);
CREATE INDEX IF NOT EXISTS idx_articles_created_at ON public.articles(created_at DESC);

-- ============================================================
-- Row Level Security (RLS)
-- ============================================================

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- 1. Anyone can read published articles
CREATE POLICY "Anyone can read published articles" ON public.articles
  FOR SELECT USING (status = 'published');

-- 2. Authors can read their own articles (including drafts)
CREATE POLICY "Authors can read their own articles" ON public.articles
  FOR SELECT USING (auth.uid() = user_id);

-- 3. Authenticated users can insert their own articles
CREATE POLICY "Users can insert their own articles" ON public.articles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 4. Users can update their own articles
CREATE POLICY "Users can update their own articles" ON public.articles
  FOR UPDATE USING (auth.uid() = user_id);

-- 5. Users can delete their own articles
CREATE POLICY "Users can delete their own articles" ON public.articles
  FOR DELETE USING (auth.uid() = user_id);
