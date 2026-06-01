<div align="center">
  <img width="1200" height="475" alt="225 Open Source Banner" src="./public/Brand/banner-github.png" />

  # 225 Open Source

  **The #1 Open Source Community Platform for Côte d'Ivoire**

  [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
  [![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue.svg)](https://www.typescriptlang.org/)
  [![Supabase](https://img.shields.io/badge/Supabase-2.39.7-green.svg)](https://supabase.com/)

  [Live Demo](https://225os.com) • [Report Bug](https://github.com/princekouame/225_OS/issues) • [Request Feature](https://github.com/princekouame/225_OS/issues)
</div>

---

## About The Project

**225 Open Source** is a centralized platform that showcases open source projects developed by developers in Côte d'Ivoire. While GitHub is the world's largest open source platform, it lacks a crucial feature: **filtering projects by country**. That's where we come in.

### The Problem We Solve

- **No Country Filter on GitHub**: Impossible to easily discover open source projects created by Ivorian developers
- **Limited Visibility**: Ivorian talents remain hidden in the global ocean of open source projects
- **Fragmented Collaboration**: Difficult for Ivorian developers to find and collaborate with each other

### Our Solution

- **Smart Centralization**: We aggregate Ivorian open source projects from GitHub
- **Country Filtering**: Instant access to all open source projects created in Côte d'Ivoire
- **Unified Community**: A central space to discover, contribute, and collaborate with local talents

---

## Recent Updates

### v2.1.0 — May 2026

#### Public Pages & Navigation
- **Public article page**: Shared articles display without header/footer for unauthenticated users, with a "Join the community" CTA at the bottom
- **Back links**: "Back" buttons visible on all public detail pages (Pitch, Product, Project, Article) for visitors
- **Extended public access**: `/explore`, `/articles`, `/launchpad`, `/pitchhub` accessible without authentication

#### Search
- **Generic SearchModal**: Reusable component with `type` prop (`'article'` | `'pitch'`) — each page indexes only its own content
- **Redesigned search bars**: Full width below the header on Articles and PitchHub, side by side with the filter on PitchHub desktop
- **Explicit placeholders**: Descriptive text with truncation on mobile to prevent line wrapping
- **Cover images**: Article search results display their cover image

#### Dashboard & Admin
- **Clean design**: Shadows (`shadow-sm`) removed from stat cards, tables, and admin containers — kept light borders
- **Scrollable article list**: Horizontal scroll on mobile in article management to prevent content condensation
- **Preview modal**: Category and reading time stacked on mobile, side by side on desktop

#### Mobile UX
- **Stacked buttons**: Search and publish stack vertically on mobile (Articles, PitchHub)
- **Scrollable categories**: Category pills with forced horizontal scroll on mobile
- **Improved responsive**: Layout adjustments on all detail pages and forms

#### Fixes
- **AuthModal**: Fixed infinite spinner bug after successful login
- **Articles**: Correct display of author name and avatar (removed nonexistent `username` column)
- **Avatar upload**: Fixed RLS Storage violation with `userId/filename` path
- **Edit Profile**: Removed password change section, simplified avatar UI
- **Profile page**: Integrated `ProfileArticles` and `ProfilePitches` components, removed banner

---

## Features

- **Project Discovery**: Browse and search open source projects from Ivorian developers
- **225 Launchpad**: Discover and vote for the best local products, SaaS and apps
- **PitchHub**: Share your startup ideas and find co-founders, investors, or technical leads
- **Articles & DevBlog**: Tutorials, tips, experience reports, and tech news shared by the community
- **Open Source Day 2026**: Dedicated page for the annual Ivorian open source event
- **Contextual Search**: Search modals by content type (articles, pitches, projects, products)
- **Immersive Public Pages**: Detail pages without header/footer for visitors with engagement CTAs
- **Talents Showcase**: Discover and connect with Ivorian developers and their expertise
- **Announcement System**: Stay updated with community events and promos
- **Donation System**: Support the platform and local open source initiatives
- **Smart Filtering**: Filter projects by technology, category, and popularity
- **User Profiles**: Showcase your projects, skills, and social links
- **Markdown Editor**: Write articles with live preview and draft/published management
- **Dark Mode**: Beautiful UI with light and dark themes (GitHub style)
- **Dynamic Admin Control**: Maintenance mode and Open Source Day visibility controlled from the dashboard
- **Secure Authentication**: Powered by Supabase with email and GitHub OAuth
- **Responsive Design**: Optimized for desktop, tablet, and mobile

---

## 📚 Table of Contents

1. [Global Architecture Overview](#1-global-architecture-overview)
2. [Tech Stack](#2-tech-stack)
3. [Database Structure](#3-database-structure)
4. [Authentication & Security](#4-authentication--security)
5. [Detailed Data Flows](#5-detailed-data-flows)
6. [Frontend Architecture](#6-frontend-architecture)
7. [Use Case Walkthroughs](#7-use-case-walkthroughs)
8. [Configuration & Deployment](#8-configuration--deployment)
9. [About The Project](#9-about-the-project)
10. [Features](#10-features)
11. [Getting Started](#11-getting-started)
12. [Contributing](#12-contributing)
13. [License](#13-license)

---

## 1. Global Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          225 OS ARCHITECTURE                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐                │
│  │   Desktop    │     │   Mobile     │     │   Tablet     │                │
│  │   (Browser)  │◄────┤   (Browser)  │◄────┤   (Browser)  │                │
│  └──────┬───────┘     └──────┬───────┘     └──────┬───────┘                │
│         │                    │                    │                        │
│         └────────────────────┼────────────────────┘                        │
│                              │                                              │
│                              ▼                                              │
│  ┌─────────────────────────────────────────────────────────────────┐       │
│  │                     VERCEL (Hosting)                              │       │
│  │  ┌─────────────────────────────────────────────────────────┐   │       │
│  │  │              React SPA (Vite Build)                       │   │       │
│  │  │  ┌─────────┐  ┌─────────┐  ┌──────────┐  ┌─────────────┐  │   │       │
│  │  │  │  Pages  │  │Components│ │ Services │  │  Contexts   │  │   │       │
│  │  │  │  (22)   │  │  (25+)   │  │   (6)    │  │    (3)      │  │   │       │
│  │  │  │         │  │         │  │          │  │             │  │   │       │
│  │  │  │ Home    │  │ Navbar  │  │ project  │  │ AuthContext │  │   │       │
│  │  │  │ Explore │  │ Footer  │  │ launchpad│  │ ThemeContext│  │   │       │
│  │  │  │ Launchpad│ │ Cards   │  │ pitch    │  │ NotifContext│  │   │       │
│  │  │  │ PitchHub│  │ Modals  │  │ profile  │  └─────────────┘  │   │       │
│  │  │  │ Profile │  │ Layout  │  │ github   │                   │   │       │
│  │  │  │ Dashboard│ │         │  │ announce │                   │   │       │
│  │  │  └─────────┘  └─────────┘  └──────────┘                   │   │       │
│  │  └─────────────────────────────────────────────────────────┘   │       │
│  │                                                                 │       │
│  │  ┌─────────────────────────────────────────────────────────┐   │       │
│  │  │                 React Router DOM 6.x                      │   │       │
│  │  │  • 22 routes (public + protected + admin)               │   │       │
│  │  │  • SPA navigation with ScrollToTop                      │   │       │
│  │  │  • Maintenance mode toggle                              │   │       │
│  │  └─────────────────────────────────────────────────────────┘   │       │
│  └────────────────────────────────┬────────────────────────────────┘       │
│                                   │                                          │
│                                   ▼                                          │
│  ┌─────────────────────────────────────────────────────────────────┐       │
│  │                     SUPABASE (BaaS)                               │       │
│  │  ┌─────────────────────────────────────────────────────────┐   │       │
│  │  │              PostgreSQL Database                          │   │       │
│  │  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │   │       │
│  │  │  │ profiles │  │ projects │  │ products │  │  pitches │  │   │       │
│  │  │  │──────────│  │──────────│  │──────────│  │──────────│  │   │       │
│  │  │  │ id (PK)  │  │ id (PK)  │  │ id (PK)  │  │ id (PK)  │  │   │       │
│  │  │  │ username │  │ name     │  │ name     │  │ project_ │  │   │       │
│  │  │  │ full_name│  │ author   │  │ tagline  │  │ name     │  │   │       │
│  │  │  │ avatar_  │  │ repo_url │  │ url      │  │ problem  │  │   │       │
│  │  │  │ url      │  │ stacks[] │  │ image_url│  │ pitch    │  │   │       │
│  │  │  │ bio      │  │ stars    │  │ maker_id │  │ need     │  │   │       │
│  │  │  │ headline │  │ forks    │  │ slug     │  │ email    │  │   │       │
│  │  │  │ location │  │ language │  │          │  │ slug     │  │   │       │
│  │  │  │ socials  │  │ slug     │  │          │  │          │  │   │       │
│  │  │  │ is_      │  │ user_id  │  │          │  │          │  │   │       │
│  │  │  │ approved │  │          │  │          │  │          │  │   │       │
│  │  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │   │       │
│  │  │                                                           │   │       │
│  │  │  ┌──────────────┐  ┌──────────────┐                      │   │       │
│  │  │  │product_votes │  │announcements │                      │   │       │
│  │  │  │──────────────│  │──────────────│                      │   │       │
│  │  │  │ product_id   │  │ title        │                      │   │       │
│  │  │  │ user_id      │  │ description  │                      │   │       │
│  │  │  │              │  │ type         │                      │   │       │
│  │  │  │              │  │ is_active    │                      │   │       │
│  │  │  │              │  │ order_index  │                      │   │       │
│  │  │  └──────────────┘  └──────────────┘                      │   │       │
│  │  └─────────────────────────────────────────────────────────┘   │       │
│  │                                                                 │       │
│  │  ┌─────────────────────────────────────────────────────────┐   │       │
│  │  │              Supabase Storage                             │   │       │
│  │  │  • launchpad-images/ (product screenshots)               │   │       │
│  │  │  • profiles/ (avatars & banners)                         │   │       │
│  │  └─────────────────────────────────────────────────────────┘   │       │
│  │                                                                 │       │
│  │  ┌─────────────────────────────────────────────────────────┐   │       │
│  │  │              Auth (GoTrue)                                │   │       │
│  │  │  • JWT Token-based authentication                       │   │       │
│  │  │  • Email/password & OAuth (GitHub)                        │   │       │
│  │  │  • Auto-profile creation on signup                      │   │       │
│  │  │  • Admin approval system (is_approved flag)              │   │       │
│  │  └─────────────────────────────────────────────────────────┘   │       │
│  └─────────────────────────────────────────────────────────────────┘       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Architecture Highlights

- **Frontend**: React 18 + TypeScript + Vite (fast build times)
- **Backend-as-a-Service**: Supabase (PostgreSQL + Auth + Storage)
- **Authentication**: JWT tokens with auto-refresh + approval verification
- **Security**: Row Level Security (RLS) at the database level
- **UI**: Tailwind CSS v4 (PostCSS plugin)
- **Icons**: Lucide React
- **Routing**: React Router DOM 6 (22 routes)
- **Deployment**: Vercel (SPA rewrites)

---

## 2. Tech Stack

### Frontend
| Technology | Version | Role |
|------------|---------|------|
| React | 18.2.0 | UI Framework |
| TypeScript | 5.8.2 | Static typing |
| Vite | 6.2.0 | Build tool & Dev server |
| React Router DOM | 6.22.3 | Client-side routing (22 routes) |
| Tailwind CSS | 4.1.18 | CSS framework (PostCSS plugin) |
| Lucide React | 0.344.0 | Icons |

### Backend & Infrastructure
| Technology | Role |
|------------|------|
| Supabase | BaaS (Backend-as-a-Service) |
| PostgreSQL | Relational database |
| GoTrue | Authentication service |
| PostgREST | Auto-generated REST API |
| Supabase Storage | Image storage (products, profiles) |
| Vercel | Hosting & CDN |

### Development Tools
| Tool | Role |
|------|------|
| PostCSS | CSS transformation |
| Autoprefixer | Automatic CSS prefixes |
| TypeScript | Compilation and type checking |

---

## 3. Database Structure

### Entity-Relationship Diagram (ERD)

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                           DATABASE SCHEMA - 225 OS                               │
├──────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│  ┌──────────────────┐         ┌──────────────────┐                              │
│  │   auth.users     │         │    profiles      │                              │
│  │  (Supabase Auth) │◄────────┤  (Extension)     │                              │
│  ├──────────────────┤   1:1   ├──────────────────┤                              │
│  │ id (UUID) PK     │         │ id (UUID) PK/FK  │                              │
│  │ email            │         │ username         │                              │
│  │ encrypted_       │         │ full_name        │                              │
│  │ password         │         │ avatar_url       │                              │
│  │ user_metadata    │         │ banner_url       │                              │
│  └────────┬─────────┘         │ headline         │                              │
│           │                   │ bio              │                              │
│           │ 1:N               │ location         │                              │
│           ▼                   │ website          │                              │
│  ┌──────────────────┐         │ github           │                              │
│  │    projects      │         │ linkedin         │                              │
│  ├──────────────────┤         │ twitter          │                              │
│  │ id (UUID) PK     │         │ facebook         │                              │
│  │ user_id (FK) ────┼─────────┤ is_approved      │                              │
│  │ name             │         │ created_at       │                              │
│  │ author           │         └──────────────────┘                              │
│  │ description      │                                                         │
│  │ repo_url         │                                                         │
│  │ stacks (TEXT[])  │                                                         │
│  │ stars            │                                                         │
│  │ forks            │                                                         │
│  │ language         │                                                         │
│  │ updated_at       │                                                         │
│  │ image_url        │                                                         │
│  │ slug             │                                                         │
│  └──────────────────┘                                                         │
│                                                                                  │
│  ┌──────────────────┐         ┌──────────────────┐                           │
│  │    products      │         │  product_votes   │                           │
│  ├──────────────────┤         ├──────────────────┤                           │
│  │ id (UUID) PK     │         │ product_id (FK)  │                           │
│  │ maker_id (FK) ───┼─────────┤ user_id (FK)     │                           │
│  │ name             │ 1:N     └──────────────────┘                           │
│  │ tagline          │                                                          │
│  │ description      │                                                          │
│  │ url              │                                                          │
│  │ image_url        │                                                          │
│  │ slug             │                                                          │
│  │ contact_email    │                                                          │
│  │ app_store_url    │                                                          │
│  │ play_store_url   │                                                          │
│  │ created_at       │                                                          │
│  └──────────────────┘                                                         │
│                                                                                  │
│  ┌──────────────────┐         ┌──────────────────┐                           │
│  │     pitches      │         │  announcements   │                           │
│  ├──────────────────┤         ├──────────────────┤                           │
│  │ id (UUID) PK     │         │ id (UUID/INT) PK │                           │
│  │ user_id (FK)     │         │ title            │                           │
│  │ project_name     │         │ description      │                           │
│  │ problem          │         │ date             │                           │
│  │ pitch            │         │ location         │                           │
│  │ need             │         │ learn_more_url   │                           │
│  │ email            │         │ register_url     │                           │
│  │ location         │         │ order_index      │                           │
│  │ link             │         │ type (event/promo)│                          │
│  │ slug             │         │ tag              │                           │
│  │ created_at       │         │ image_url        │                           │
│  └──────────────────┘         │ is_active        │                           │
│                               │ created_at       │                           │
│                               └──────────────────┘                           │
│                                                                                  │
└──────────────────────────────────────────────────────────────────────────────────┘
```

### Table Descriptions

#### 1. `profiles` (User Profile Extension)
```sql
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  username TEXT,
  full_name TEXT,
  avatar_url TEXT,
  banner_url TEXT,
  headline TEXT,
  bio TEXT,
  location TEXT,
  website TEXT,
  github TEXT,
  linkedin TEXT,
  twitter TEXT,
  facebook TEXT,
  is_approved BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);
```
**Role**: Stores user profile information. Auto-created on first login. The `is_approved` flag allows admins to disable accounts.

#### 2. `projects` (Open Source Projects)
```sql
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  author TEXT,
  description TEXT,
  repo_url TEXT,
  stacks TEXT[],                     -- Array of technologies
  stars INTEGER DEFAULT 0,
  forks INTEGER DEFAULT 0,
  language TEXT,
  updated_at TIMESTAMPTZ,
  image_url TEXT,
  slug TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now()
);
```
**Role**: Contains GitHub projects submitted by users. Metadata (stars, forks, language) is auto-synced via the GitHub API.

#### 3. `products` (Launchpad Products)
```sql
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  maker_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  url TEXT,
  image_url TEXT,
  slug TEXT UNIQUE,
  contact_email TEXT,
  app_store_url TEXT,
  play_store_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```
**Role**: Stores SaaS/app products submitted to the Launchpad (ProductHunt-style).

#### 4. `product_votes` (Launchpad Votes)
```sql
CREATE TABLE public.product_votes (
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, user_id)
);
```
**Role**: Junction table for the community voting system. One vote per user per product.

#### 5. `pitches` (Startup Ideas - PitchHub)
```sql
CREATE TABLE public.pitches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  project_name TEXT NOT NULL,
  problem TEXT,
  pitch TEXT,
  need TEXT,                         -- Co-founder, Investor, etc.
  email TEXT,
  location TEXT,
  link TEXT,
  slug TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now()
);
```
**Role**: Stores startup ideas shared in PitchHub for matchmaking.

#### 6. `articles` (Technical Articles)
```sql
CREATE TABLE public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,                    -- Markdown content
  tags TEXT[],                              -- Array of tags
  status TEXT CHECK (status IN ('draft', 'published')) DEFAULT 'published',
  slug TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```
**Role**: Stores technical articles written by users. Supports draft/published status and Markdown content.

#### 7. `announcements` (Announcements)
```sql
CREATE TABLE public.announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  date TEXT,
  location TEXT,
  learn_more_url TEXT,
  register_url TEXT,
  order_index INTEGER DEFAULT 0,
  type TEXT CHECK (type IN ('event', 'promo')),
  tag TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);
```
**Role**: Admin-managed announcements (events, promos). Two types: `event` and `promo`.

#### 8. `site_settings` (Site Settings)
```sql
CREATE TABLE public.site_settings (
  key TEXT PRIMARY KEY,
  value BOOLEAN NOT NULL DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT now()
);
```
**Role**: Stores dynamic site settings controlled from the admin dashboard.

| Key | Default | Description |
|-----|---------|-------------|
| `show_opensource_day` | `true` | Shows/hides the Open Source Day tab in navigation |
| `maintenance_mode` | `false` | Enables/disables maintenance mode for the entire site |

**How it works**: The app loads these settings on startup and refreshes them every 30 seconds. The maintenance toggle lets you put the site in maintenance mode without modifying code.

### Supabase Storage Buckets

| Bucket | Usage | Limit |
|--------|-------|-------|
| `launchpad-images` | Product screenshots/logos | 2MB per file |
| `profiles` | User avatars and banners | 500KB avatar, 1MB banner |

---

## 4. Authentication & Security

### Authentication Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         AUTHENTICATION FLOW                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────┐          ┌──────────────────┐          ┌──────────────┐  │
│  │    User      │          │   AuthContext    │          │  Supabase    │  │
│  │   (Browser)  │          │   (React)        │          │   Auth       │  │
│  └──────┬───────┘          └────────┬─────────┘          └──────┬───────┘  │
│         │                           │                          │          │
│         │  1. Login/Signup          │                          │          │
│         │──────────────────────────►│                          │          │
│         │                           │  2. Auth Request         │          │
│         │                           │─────────────────────────►│          │
│         │                           │                          │          │
│         │                           │  3. JWT Token + Session  │          │
│         │                           │◄─────────────────────────│          │
│         │                           │                          │          │
│         │                           │  4. Check Profile        │          │
│         │                           │────┐                     │          │
│         │                           │    │ SELECT is_approved  │          │
│         │                           │◄───┘ FROM profiles       │          │
│         │                           │                          │          │
│         │                           │  5a. If !approved        │          │
│         │                           │     → signOut + warning  │          │
│         │                           │                          │          │
│         │                           │  5b. If no profile       │          │
│         │                           │     → INSERT profile     │          │
│         │                           │                          │          │
│         │  6. App State Updated     │                          │          │
│         │◄──────────────────────────│                          │          │
│         │                           │                          │          │
│         │  7. subscribe()           │                          │          │
│         │     onAuthStateChange     │                          │          │
│         │──────────────────────────►│                          │          │
│         │                           │                          │          │
└─────────┴───────────────────────────┴──────────────────────────┴──────────┘
```

### Security Features

#### Row Level Security (RLS)

Supabase uses PostgreSQL RLS to secure data access:

| Table | Operation | Who | Condition |
|-------|-----------|-----|-----------|
| **profiles** | SELECT | Public | `is_approved = true` |
| | INSERT/UPDATE | Owner | `auth.uid() = id` |
| **projects** | SELECT | Public | `true` |
| | INSERT/UPDATE/DELETE | Owner | `auth.uid() = user_id` |
| **products** | SELECT | Public | `true` |
| | INSERT/UPDATE/DELETE | Maker | `auth.uid() = maker_id` |
| **product_votes** | INSERT/DELETE | Authenticated | `auth.uid() = user_id` |
| **pitches** | SELECT | Public | `true` |
| | INSERT/UPDATE/DELETE | Owner | `auth.uid() = user_id` |
| **articles** | SELECT | Public | `status = 'published'` |
| | INSERT/UPDATE/DELETE | Owner | `auth.uid() = user_id` |
| **announcements** | SELECT | Public | `is_active = true` |
| | ALL | Admin | Email = `princekouame7@gmail.com` |
| **site_settings** | SELECT | Public | `true` |
| | INSERT/UPDATE | Authenticated | `auth.role() = 'authenticated'` |

#### Route Protection

| Route Type | Examples | Protection |
|------------|----------|------------|
| **Public** | Home, Launchpad, PitchHub, Profile | None |
| **Authenticated** | Explore, Dashboard, AddProject, SubmitProduct | `user !== null` |
| **Admin** | AdminAnnouncements | Email = `princekouame7@gmail.com` |

#### Token Management

```typescript
// src/utils/supabaseUtils.ts
// Robust token getter with localStorage fallback
export const getAuthToken = async (): Promise<string | null> => {
  // 1. Try via Supabase client
  // 2. Fallback: parse localStorage (sb-*-auth-token)
  // 3. Return null if all fails
};
```

#### Security Timeout

Authentication implements timeouts to prevent infinite loading:
- **Init session**: 1 second max
- **Sign out**: 1 second max + manual localStorage cleanup
- **Image upload**: 15 seconds with AbortController

---

## 5. Detailed Data Flows

### 5.1 Adding a GitHub Project (Add Project)

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                         ADD PROJECT FLOW                                         │
├──────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│  AddProject.tsx                                                                  │
│       │                                                                          │
│       ▼                                                                          │
│  ┌─────────────────────────────────────────┐                                    │
│  │ 1. User paste GitHub repo URL           │                                    │
│  │    e.g. https://github.com/user/repo    │                                    │
│  └────────┬────────────────────────────────┘                                    │
│           │                                                                      │
│           ▼                                                                      │
│  ┌─────────────────────────────────────────┐                                    │
│  │ 2. githubService.extractRepoInfo(url)   │                                    │
│  │    → { owner: 'user', repo: 'repo' }    │                                    │
│  └────────┬────────────────────────────────┘                                    │
│           │                                                                      │
│           ▼                                                                      │
│  ┌─────────────────────────────────────────┐                                    │
│  │ 3. githubService.fetchGithubMetadata()  │                                    │
│  │                                         │                                    │
│  │    GET https://api.github.com/repos/    │                                    │
│  │        {owner}/{repo}                   │                                    │
│  │                                         │                                    │
│  │    Returns:                             │                                    │
│  │    ├─ name, owner.login                 │                                    │
│  │    ├─ description                       │                                    │
│  │    ├─ stargazers_count, forks_count     │                                    │
│  │    ├─ language, updated_at              │                                    │
│  │    └─ html_url, owner.avatar_url        │                                    │
│  └────────┬────────────────────────────────┘                                    │
│           │                                                                      │
│           ▼                                                                      │
│  ┌─────────────────────────────────────────┐                                    │
│  │ 4. Form auto-filled with GitHub data    │                                    │
│  │    User adds:                           │                                    │
│  │    ├─ Tech stack tags (select/custom)   │                                    │
│  │    └─ Review/edit description           │                                    │
│  └────────┬────────────────────────────────┘                                    │
│           │                                                                      │
│           ▼                                                                      │
│  ┌─────────────────────────────────────────┐                                    │
│  │ 5. projectService.addProject()          │                                    │
│  │                                         │                                    │
│  │    ├─ slugify(name) → unique slug       │                                    │
│  │    ├─ POST /rest/v1/projects            │                                    │
│  │    ├─ Headers: apikey + Bearer token    │                                    │
│  │    └─ Body: all project fields          │                                    │
│  └────────┬────────────────────────────────┘                                    │
│           │                                                                      │
│           ▼                                                                      │
│  ┌─────────────────────────────────────────┐                                    │
│  │ 6. Redirect to /explore or /dashboard   │                                    │
│  │    Toast notification: "Project added!" │                                    │
│  └───────────────────────────────────────────┘                                    │
│                                                                                  │
└──────────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Voting on a Launchpad Product

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                         VOTE FLOW (Optimistic UI)                                │
├──────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│  ProductCard.tsx                                                                 │
│       │                                                                          │
│       ▼                                                                          │
│  ┌─────────────────────────────────────────┐                                    │
│  │ 1. User clicks "Upvote" button          │                                    │
│  └────────┬────────────────────────────────┘                                    │
│           │                                                                      │
│           ▼                                                                      │
│  ┌─────────────────────────────────────────┐                                    │
│  │ 2. Optimistic UI update                 │                                    │
│  │    ├─ votes_count++ (immediate)         │                                    │
│  │    ├─ has_voted = true                  │                                    │
│  │    └─ Button style changes (filled)     │                                    │
│  └────────┬────────────────────────────────┘                                    │
│           │                                                                      │
│           ▼                                                                      │
│  ┌─────────────────────────────────────────┐                                    │
│  │ 3. launchpadService.toggleVote()        │                                    │
│  │                                         │                                    │
│  │    if (isCurrentlyVoted):               │                                    │
│  │      DELETE /rest/v1/product_votes      │                                    │
│  │        ?product_id=eq.{id}              │                                    │
│  │        &user_id=eq.{userId}             │                                    │
│  │    else:                                │                                    │
│  │      POST /rest/v1/product_votes        │                                    │
│  │        Body: { product_id, user_id }    │                                    │
│  └────────┬────────────────────────────────┘                                    │
│           │                                                                      │
│           ▼                                                                      │
│  ┌─────────────────────────────────────────┐                                    │
│  │ 4. Success: Keep optimistic state       │                                    │
│  │    Error: Rollback UI to previous state │                                    │
│  │    Toast notification on error          │                                    │
│  └───────────────────────────────────────────┘                                    │
│                                                                                  │
└──────────────────────────────────────────────────────────────────────────────────┘
```

### 5.3 GitHub Stats Sync

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                         GITHUB SYNC FLOW                                         │
├──────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│  ProjectDetails.tsx (on mount)                                                   │
│       │                                                                          │
│       ▼                                                                          │
│  ┌─────────────────────────────────────────┐                                    │
│  │ 1. Fetch project from DB                │                                    │
│  │    getProjectBySlug(slug)               │                                    │
│  └────────┬────────────────────────────────┘                                    │
│           │                                                                      │
│           ▼                                                                      │
│  ┌─────────────────────────────────────────┐                                    │
│  │ 2. Background sync (non-blocking)       │                                    │
│  │    projectService.syncProjectStats()    │                                    │
│  └────────┬────────────────────────────────┘                                    │
│           │                                                                      │
│           ▼                                                                      │
│  ┌─────────────────────────────────────────┐                                    │
│  │ 3. fetchGithubMetadata(repo_url)        │                                    │
│  │    → { stars, forks, updated_at }       │                                    │
│  └────────┬────────────────────────────────┘                                    │
│           │                                                                      │
│           ▼                                                                      │
│  ┌─────────────────────────────────────────┐                                    │
│  │ 4. Compare with local values            │                                    │
│  │    if (stars !== local.stars ||         │                                    │
│  │        forks !== local.forks) {         │                                    │
│  │                                         │                                    │
│  │      PATCH /rest/v1/projects            │                                    │
│  │        ?id=eq.{id}                      │                                    │
│  │        Body: { stars, forks,            │                                    │
│  │                updated_at }             │                                    │
│  │    }                                    │                                    │
│  └────────┬────────────────────────────────┘                                    │
│           │                                                                      │
│           ▼                                                                      │
│  ┌─────────────────────────────────────────┐                                    │
│  │ 5. DB updated silently                  │                                    │
│  │    User sees fresh stats on next visit  │                                    │
│  │    Errors are logged, not shown to user │                                    │
│  └───────────────────────────────────────────┘                                    │
│                                                                                  │
└──────────────────────────────────────────────────────────────────────────────────┘
```

### 5.4 Dashboard - Stats Aggregation

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                         DASHBOARD STATS FLOW                                     │
├──────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│  Dashboard.tsx                                                                   │
│       │                                                                          │
│       ▼                                                                          │
│  ┌─────────────────────────────────────────┐                                    │
│  │ 1. useEffect on mount                   │                                    │
│  │    if (user) fetch all user data        │                                    │
│  └────────┬────────────────────────────────┘                                    │
│           │                                                                      │
│           ▼                                                                      │
│  ┌─────────────────────────────────────────┐                                    │
│  │ 2. Parallel fetches:                    │                                    │
│  │    ├─ getUserProjects(userId)           │                                    │
│  │    ├─ getUserLaunchpadProducts(userId)  │                                    │
│  └────────┬────────────────────────────────┘                                    │
│           │                                                                      │
│           ▼                                                                      │
│  ┌─────────────────────────────────────────┐                                    │
│  │ 3. Compute aggregated stats:            │                                    │
│  │    ├─ totalProjects = projects.length   │                                    │
│  │    ├─ totalProducts = products.length   │                                    │
│  │    ├─ totalStars = sum(p.stars)         │                                    │
│  │    ├─ totalForks = sum(p.forks)         │                                    │
│  │    └─ totalVotes = sum(p.votes_count)   │                                    │
│  └────────┬────────────────────────────────┘                                    │
│           │                                                                      │
│           ▼                                                                      │
│  ┌─────────────────────────────────────────┐                                    │
│  │ 4. Render:                              │                                    │
│  │    ├─ Stats cards (5 metrics)           │                                    │
│  │    ├─ Paginated projects list           │                                    │
│  │    ├─ Quick action buttons              │                                    │
│  │    └─ WhatsApp community banner         │                                    │
│  └───────────────────────────────────────────┘                                    │
│                                                                                  │
└──────────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Frontend Architecture

### Folder Structure

```
225_OS/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Layout.tsx           # Shell with conditional Nav/Footer
│   │   ├── Navbar.tsx           # Main navigation (desktop + mobile)
│   │   ├── Footer.tsx           # Footer with links
│   │   ├── AuthModal.tsx        # Login/Signup/Forgot password modal
│   │   ├── SearchModal.tsx      # Generic search modal (type: article/pitch)
│   │   ├── SearchModalPublic.tsx # Project search modal (public)
│   │   ├── ProjectCard.tsx      # GitHub project card
│   │   ├── Badge.tsx            # Technology badge
│   │   ├── Pagination.tsx       # Pagination controls
│   │   ├── Toast.tsx            # Individual notification
│   │   ├── ToastContainer.tsx   # Notification manager
│   │   ├── ConfirmModal.tsx     # Confirmation dialog
│   │   ├── ScrollToTop.tsx      # Reset scroll on navigate
│   │   ├── MarkdownEditor.tsx   # Markdown editor with preview
│   │   ├── AnnouncementManager.tsx # Admin CRUD announcements
│   │   ├── Launchpad/
│   │   │   ├── ProductCard.tsx      # Product card with vote
│   │   │   ├── ProductGrid.tsx      # Product grid
│   │   │   └── ProductSearchModal.tsx # Launchpad search
│   │   └── Profile/
│   │       ├── ProfileHeader.tsx    # Banner, avatar, socials
│   │       ├── ProfileAbout.tsx     # Bio section
│   │       ├── ProfileProjects.tsx  # User projects
│   │       ├── ProfileLaunchpad.tsx # Launchpad products
│   │       ├── ProfileArticles.tsx  # User articles
│   │       ├── ProfilePitches.tsx   # User pitches
│   │       └── ProfileEditForm.tsx  # Edit form
│   │
│   ├── contexts/            # React Contexts (Global State)
│   │   ├── AuthContext.tsx        # Authentication state
│   │   ├── ThemeContext.tsx       # Dark/light mode
│   │   └── NotificationContext.tsx # Toast system
│   │
│   ├── lib/                 # Configuration
│   │   └── supabaseClient.ts      # Supabase client
│   │
│   ├── services/            # Business logic & API
│   │   ├── projectService.ts      # CRUD projects + GitHub sync
│   │   ├── launchpadService.ts    # CRUD products + votes + uploads
│   │   ├── pitchService.ts        # CRUD pitches
│   │   ├── profileService.ts      # CRUD profiles + image uploads
│   │   ├── githubService.ts       # GitHub API metadata fetching
│   │   └── announcementService.ts # CRUD announcements
│   │
│   ├── pages/               # Pages (Routes)
│   │   ├── Home.tsx               # Landing page
│   │   ├── Explore.tsx            # Browse projects (public)
│   │   ├── Launchpad.tsx          # Product showcase (trending/new)
│   │   ├── PitchHub.tsx           # Startup ideas hub
│   │   ├── Articles.tsx           # Browse articles (public)
│   │   ├── MyArticles.tsx         # Manage my articles (CRUD + Markdown)
│   │   ├── ArticleDetails.tsx     # Article detail page
│   │   ├── OpenSourceDay.tsx      # Annual event page
│   │   ├── Dashboard.tsx          # User dashboard with stats
│   │   ├── Profile.tsx            # Public user profile
│   │   ├── AddProject.tsx         # Add GitHub project form
│   │   ├── EditProject.tsx        # Edit project form
│   │   ├── SubmitProduct.tsx      # Submit/edit Launchpad product
│   │   ├── SubmitPitch.tsx        # Submit/edit pitch
│   │   ├── ProductPage.tsx        # Product detail page
│   │   ├── PitchDetails.tsx       # Pitch detail page
│   │   ├── ProjectDetails.tsx     # Project detail page
│   │   ├── EditProfile.tsx        # Edit user profile
│   │   ├── AdminAnnouncements.tsx # Admin announcement management
│   │   ├── Why225OpenSource.tsx   # Mission/vision page
│   │   ├── PrivacyPolicy.tsx      # Privacy policy
│   │   ├── Contact.tsx            # Contact page
│   │   ├── Donation.tsx           # Donation page (Genius)
│   │   ├── ResetPassword.tsx      # Password reset
│   │   └── MaintenancePage.tsx    # Maintenance mode page
│   │
│   ├── utils/               # Utilities
│   │   ├── supabaseUtils.ts       # Robust auth token getter
│   │   └── slugify.ts             # URL-safe slug generation
│   │
│   ├── types.ts             # TypeScript interfaces
│   ├── App.tsx              # Router & Providers
│   ├── config.ts            # App config (maintenance toggle)
│   ├── index.css            # Global styles (Tailwind)
│   └── index.tsx            # Entry point
│
├── public/                  # Static assets
│   ├── Brand/               # Banners & logos
│   ├── Contributors/        # Contributor headshots
│   └── Services/            # Payment QR codes & logos
│
├── .github/workflows/       # GitHub Actions
│   └── keep-supabase-alive.yml  # Cron to keep Supabase free tier alive
│
├── package.json
├── vite.config.ts
├── tsconfig.json
├── vercel.json
└── README.md
```

### Frontend Data Flow

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                      FRONTEND DATA FLOW                                          │
├──────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│  ┌─────────────────────────────────────────────────────────────────────────┐  │
│  │                           Contexts (Global State)                         │  │
│  │  ┌───────────────┐  ┌───────────────┐  ┌─────────────────────────────┐  │  │
│  │  │  AuthContext  │  │ ThemeContext  │  │  NotificationContext        │  │  │
│  │  │  ───────────  │  │ ───────────   │  │  ─────────────────          │  │  │
│  │  │  session      │  │ theme: dark/  │  │  addNotification()          │  │  │
│  │  │  user         │  │   light       │  │  notifications[]            │  │  │
│  │  │  loading      │  │ toggleTheme() │  │  Types: success/warning/    │  │  │
│  │  │  signOut()    │  │               │  │    error                    │  │  │
│  │  └───────┬───────┘  └───────┬───────┘  └─────────────────────────────┘  │  │
│  │          │                  │                                            │  │
│  │          └──────────────────┘                                            │  │
│  │                     │                                                    │  │
│  └─────────────────────┼────────────────────────────────────────────────────┘  │
│                        │                                                        │
│                        ▼                                                        │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                          Pages (React Components)                       │   │
│  │                                                                         │   │
│  │   Home        Explore      Launchpad     PitchHub     Dashboard        │   │
│  │      │           │             │            │             │             │   │
│  │      ▼           ▼             ▼            ▼             ▼             │   │
│  │   ┌──────┐   ┌──────┐     ┌────────┐   ┌───────┐   ┌────────┐         │   │
│  │   │Static│   │Project│    │Product │   │ Pitch │   │ Stats  │         │   │
│  │   │Content│  │Cards │    │Grid +  │   │ Cards │   │ Cards  │         │   │
│  │   │       │   │Filters│   │ Vote   │   │ Filter│   │ Project│         │   │
│  │   └──────┘   └──────┘     └────────┘   └───────┘   └────────┘         │   │
│  │                                                                         │   │
│  └──────────────────────────────┬────────────────────────────────────────┘   │
│                                   │                                             │
│                                   ▼                                             │
│  ┌─────────────────────────────────────────────────────────────────────────┐  │
│  │                         Data Layer (src/services/)                      │  │
│  │                                                                         │  │
│  │   ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐               │  │
│  │   │ project  │  │launchpad │  │  pitch   │  │ profile  │               │  │
│  │   │ Service  │  │ Service  │  │ Service  │  │ Service  │               │  │
│  │   └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘               │  │
│  │        │             │             │             │                      │  │
│  │        └─────────────┴─────────────┴─────────────┘                      │  │
│  │                              │                                        │  │
│  │                              ▼                                        │  │
│  │   ┌─────────────────────────────────────────────────────────────────┐  │  │
│  │   │              Supabase REST API (PostgREST)                      │  │  │
│  │   │  fetch(`${url}/rest/v1/projects?select=*&order=...`)            │  │  │
│  │   │  Headers: apikey + Authorization: Bearer <token>                │  │  │
│  │   └─────────────────────────────────────────────────────────────────┘  │  │
│  │                                                                         │  │
│  └─────────────────────────────────────────────────────────────────────────┘  │
│                                                                                  │
└──────────────────────────────────────────────────────────────────────────────────┘
```

### Routing (26 Routes)

| Path | Page | Auth | Description |
|------|------|------|-------------|
| `/` | Home | No | Landing page with hero, features, CTA |
| `/explore` | Explore | No | Browse projects with filters and search |
| `/launchpad` | Launchpad | No | Product showcase (Trending/New) |
| `/launchpad/submit` | SubmitProduct | Yes | Product submission form |
| `/launchpad/edit/:slug` | SubmitProduct | Yes | Edit existing product |
| `/launchpad/p/:slug` | ProductPage | No | Product detail page (immersive if not logged in) |
| `/pitchhub` | PitchHub | No | Browse startup ideas |
| `/pitchhub/submit` | SubmitPitch | Yes | Pitch submission form |
| `/pitchhub/edit/:slug` | SubmitPitch | Yes | Edit existing pitch |
| `/pitchhub/p/:slug` | PitchDetails | No | Pitch detail page (immersive if not logged in) |
| `/articles` | Articles | No | Browse technical articles |
| `/articles/:slug` | ArticleDetails | No | Article detail page (immersive if not logged in) |
| `/my-articles` | MyArticles | Yes | Manage my articles (CRUD + Markdown) |
| `/add` | AddProject | Yes | Add GitHub project |
| `/dashboard` | Dashboard | Yes | User dashboard |
| `/edit-profile` | EditProfile | Yes | Edit profile |
| `/edit/:slug` | EditProject | Yes | Edit project |
| `/profile/:id` | Profile | No | Public user profile |
| `/project/:slug` | ProjectDetails | No | Project detail (always immersive) |
| `/why` | Why225OpenSource | No | Mission and vision |
| `/privacy` | PrivacyPolicy | No | Privacy policy |
| `/contact` | Contact | No | Contact page |
| `/donate` | Donation | No | Donations (Genius) |
| `/reset-password` | ResetPassword | No | Password reset |
| `/admin/announcements` | AdminAnnouncements | Admin | Announcement management & site settings |
| `/opensource-day` | OpenSourceDay | No | Annual event page |

---

## 7. Use Case Walkthroughs

### 7.1 Registration and Login

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                        SIGNUP/LOGIN FLOW                                     │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  1. User clicks "Sign Up" in AuthModal                                       │
│                                                                              │
│  2. Fills: email, password                                                   │
│                                                                              │
│  3. supabase.auth.signUp({ email, password })                                │
│                                                                              │
│  4. Supabase Auth creates user in auth.users                                │
│                                                                              │
│  5. AuthContext detects SIGNED_IN event                                     │
│                                                                              │
│  6. checkUserProfile(user.id) called:                                       │
│     ├─ SELECT is_approved FROM profiles WHERE id = user.id                  │
│     ├─ If profile exists && !is_approved → signOut + warning                │
│     └─ If no profile → INSERT profile (is_approved: true)                   │
│                                                                              │
│  7. User is now authenticated and approved by default                       │
│                                                                              │
│  GitHub OAuth Flow:                                                          │
│  1. User clicks "Continue with GitHub"                                      │
│  2. Redirect to GitHub OAuth consent screen                                 │
│  3. GitHub redirects back with code                                         │
│  4. Supabase exchanges code for session                                     │
│  5. Same profile check logic as above                                       │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### 7.2 Submitting a GitHub Project

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                        ADD PROJECT FLOW                                      │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  1. Authenticated user visits /add                                           │
│                                                                              │
│  2. Pastes GitHub repo URL                                                   │
│     e.g. https://github.com/user/my-project                                  │
│                                                                              │
│  3. githubService.extractRepoInfo(url) parses:                               │
│     ├─ owner: 'user'                                                         │
│     └─ repo: 'my-project'                                                    │
│                                                                              │
│  4. githubService.fetchGithubMetadata(url) calls:                            │
│     GET https://api.github.com/repos/user/my-project                         │
│                                                                              │
│  5. Auto-fills form with:                                                    │
│     ├─ Name: my-project                                                      │
│     ├─ Author: user                                                          │
│     ├─ Description: (from GitHub)                                            │
│     ├─ Stars: 42                                                             │
│     ├─ Forks: 7                                                              │
│     ├─ Language: TypeScript                                                  │
│     └─ Image: og:image from repo                                             │
│                                                                              │
│  6. User adds tech stack tags:                                               │
│     ├─ Select from suggested list (React, Python, etc.)                      │
│     └─ Or type custom tag + Enter                                            │
│                                                                              │
│  7. Submits form → projectService.addProject():                              │
│     ├─ slugify(name) → 'my-project'                                          │
│     ├─ POST /rest/v1/projects                                                │
│     └─ Body: { name, author, description, repo_url, stacks,                  │
│                stars, forks, language, updated_at, image_url,                │
│                slug, user_id }                                               │
│                                                                              │
│  8. Redirect to /explore with success toast                                  │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### 7.3 Voting on a Launchpad Product

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                        VOTING FLOW                                           │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  1. User visits /launchpad                                                   │
│                                                                              │
│  2. Sees product cards with upvote buttons                                   │
│                                                                              │
│  3. Clicks upvote → Optimistic UI update:                                    │
│     ├─ votes_count++ immediately                                             │
│     ├─ Button fills with color                                               │
│     └─ Product may reorder in Trending tab                                   │
│                                                                              │
│  4. Background: launchpadService.toggleVote():                               │
│     ├─ If already voted → DELETE from product_votes                          │
│     └─ If not voted → INSERT into product_votes                              │
│                                                                              │
│  5. On error → Rollback UI + error toast                                     │
│                                                                              │
│  Products are sorted by:                                                     │
│  ├─ Trending tab: votes_count DESC                                           │
│  └─ New tab: created_at DESC                                                 │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### 7.4 PitchHub - Sharing Ideas

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                        PITCH SUBMISSION FLOW                                 │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  1. Authenticated user visits /pitchhub/submit                               │
│                                                                              │
│  2. Fills form:                                                              │
│     ├─ Project Name (required)                                               │
│     ├─ Problem being solved (300 chars max)                                  │
│     ├─ The Pitch (500 chars max)                                             │
│     ├─ Need type (dropdown):                                                 │
│     │   Co-founder, Latefounder, Investor, Technical Lead,                   │
│     │   Mentor/Advice, Partner, Buyer                                        │
│     ├─ Contact email                                                         │
│     ├─ Location                                                              │
│     └─ Optional link                                                         │
│                                                                              │
│  3. Submits → pitchService.addPitch():                                       │
│     ├─ slugify(project_name)                                                 │
│     └─ POST /rest/v1/pitches                                                 │
│                                                                              │
│  4. Pitch appears in /pitchhub list                                          │
│                                                                              │
│  5. Other users can:                                                         │
│     ├─ Filter by need type                                                   │
│     ├─ Search by text                                                        │
│     └─ Click to view details and contact via email                           │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### 7.5 User Profiles

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                        PROFILE FLOW                                          │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Public Profile (/profile/:id):                                              │
│  1. Anyone can visit a user's profile                                        │
│  2. Displays:                                                                │
│     ├─ Banner image + Avatar                                                 │
│     ├─ Full name, username, headline                                         │
│     ├─ Bio, location, website                                                │
│     ├─ Social links (GitHub, LinkedIn, Twitter, Facebook)                    │
│     ├─ User's GitHub projects                                                │
│     └─ User's Launchpad products                                             │
│                                                                              │
│  Edit Profile (/edit-profile):                                               │
│  1. Authenticated user visits /edit-profile                                  │
│  2. Loads current profile data                                               │
│  3. Can upload:                                                              │
│     ├─ Avatar (500KB max) → Supabase Storage: profiles/                      │
│     └─ Banner (1MB max) → Supabase Storage: profiles/                        │
│  4. Updates all fields → profileService.updateProfile()                      │
│     └─ Upsert: INSERT ... ON CONFLICT (id) DO UPDATE                        │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## 8. Configuration & Deployment

### Environment Variables

Create a `.env.local` file at the project root:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Installation

```bash
# 1. Clone the project
git clone https://github.com/kouame09/225_OS
cd 225_OS

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# 4. Run in development mode
npm run dev

# 5. Build for production
npm run build
```

### Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Create tables in Dashboard > SQL Editor:
   - `profiles`, `projects`, `products`, `product_votes`, `pitches`, `announcements`, `site_settings`
3. Enable Email and GitHub OAuth authentication in Auth > Providers
4. Create Storage buckets:
   - `launchpad-images` (public, 2MB max)
   - `profiles` (public, 1MB max)
5. Configure RLS policies for each table
6. Configure redirect URLs:
   - Site URL: `http://localhost:3000` (dev) or `https://225os.com` (prod)
   - Additional Redirect URLs: for password reset and OAuth

### Vercel Configuration

The `vercel.json` file configures SPA rewrites:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Maintenance Mode (Dynamic)

Maintenance mode is now dynamically controlled from the admin dashboard, no code changes needed:

1. Log in as admin (`princekouame7@gmail.com`)
2. Go to `/admin/announcements`
3. Use the **Mode Maintenance** toggle:
   - **Enabled** → All visitors see the maintenance page
   - **Disabled** → The site is accessible normally

The change is automatically detected by the application every 30 seconds via polling on the `site_settings` table.

### Site Settings (Admin Dashboard)

The admin dashboard (`/admin/announcements`) controls:

| Setting | Description | Impact |
|---------|-------------|--------|
| **Maintenance Mode** | Enables/disables site access | All visitors see the maintenance page |
| **Open Source Day** | Shows/hides the tab in navigation | The link disappears from navbar and the page redirects to home |

### npm Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (port 3000) |
| `npm run build` | Production build in `dist/` |
| `npm run preview` | Preview production build |

---

## 9. About The Project

**225 Open Source** is a centralized platform showcasing open source projects built by developers in Côte d'Ivoire. While GitHub is the world's largest open source platform, it lacks a crucial feature: **filtering projects by country**. That's where we come in.

### The Problem We Solve

- **No Country Filter on GitHub**: Impossible to easily discover open source projects created by Ivorian developers
- **Limited Visibility**: Ivorian talents remain hidden in the global ocean of open source projects
- **Fragmented Collaboration**: Difficult for Ivorian developers to find each other and collaborate

### Our Solution

- **Smart Centralization**: We aggregate Ivorian open source projects from GitHub
- **Country Filtering**: Instant access to all open source projects created in Côte d'Ivoire
- **Unified Community**: A central space to discover, contribute, and collaborate with local talents

---

## 10. Features

- **Project Discovery**: Browse and search open source projects from Ivorian developers
- **225 Launchpad**: Discover and vote for the best local products, SaaS and apps
- **PitchHub**: Share your startup ideas and find co-founders, investors, or technical leads
- **Open Source Day 2026**: Dedicated page for the annual Ivorian open source event
- **Global Search**: Advanced real-time search for projects and talents
- **Talents Showcase**: Discover and connect with Ivorian developers and their expertise
- **Announcement System**: Stay updated with community events and promos
- **Donation System**: Support the platform and local open source initiatives
- **Smart Filtering**: Filter projects by technology, category, and popularity
- **User Profiles**: Showcase your projects, skills, and social links
- **Dark Mode**: Beautiful UI with light and dark themes
- **Secure Authentication**: Powered by Supabase with email and GitHub OAuth
- **Responsive Design**: Optimized for desktop, tablet, and mobile

---

## 11. Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Supabase Account** (for backend services)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kouame09/225_OS
   cd 225_OS
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy the `.env.example` file to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

   Then update `.env.local` with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to `http://localhost:3000`

---

## 12. Contributing

We welcome contributions from the Ivorian tech community! Here's how you can help:

1. **Fork the Project**
2. **Create your Feature Branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your Changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the Branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style
- Write clear commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

---

## 13. License

Distributed under the MIT License. See `LICENSE` for more information.

---

## Acknowledgments

- All Ivorian developers contributing to open source
- The Supabase teams for their amazing platform
- The React and Vite communities
- Everyone supporting the African tech ecosystem

---

## Our Mission

> "To make Côte d'Ivoire a recognized hub of open-source innovation, proving that African developers are not just participants in the global tech ecosystem—we are leaders, creators, and pioneers."

---

## Author & Principal Developer

- **Prince Kouamé**
- Website: [princekouame.com](https://www.princekouame.com)
- Email: [hello@princekouame.com](mailto:hello@princekouame.com)
- LinkedIn: [Prince Kouamé](https://linkedin.com/in/princekouame)

---

**Version**: 2.1.0
**Last Updated**: May 21, 2026
**Maintained by**: 225 Open Source Team

---

*This documentation is maintained with each major version of the project.*
