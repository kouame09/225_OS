-- ============================================================
-- Site Settings Table
-- ============================================================
-- Stores boolean feature flags that can be toggled by admins
-- to control visibility/features across the platform.
-- ============================================================

CREATE TABLE IF NOT EXISTS public.site_settings (
  key TEXT PRIMARY KEY,
  value BOOLEAN NOT NULL DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Insert default settings
INSERT INTO public.site_settings (key, value)
VALUES 
  ('show_opensource_day', true),
  ('maintenance_mode', false)
ON CONFLICT (key) DO NOTHING;

-- ============================================================
-- Row Level Security (RLS)
-- ============================================================

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Anyone can READ settings (needed for Navbar and App to check)
CREATE POLICY "Anyone can read site settings"
  ON public.site_settings
  FOR SELECT
  USING (true);

-- Only authenticated users can UPDATE settings
CREATE POLICY "Authenticated users can update site settings"
  ON public.site_settings
  FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Only authenticated users can INSERT settings
CREATE POLICY "Authenticated users can insert site settings"
  ON public.site_settings
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');
