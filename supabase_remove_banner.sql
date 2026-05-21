-- ============================================================
-- Migration: Remove banner_url column from profiles table
-- Run this in your Supabase SQL Editor
-- ============================================================

ALTER TABLE public.profiles DROP COLUMN IF EXISTS banner_url;
