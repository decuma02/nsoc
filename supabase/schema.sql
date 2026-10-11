-- ============================================================
-- NSoC '26 (Winter Edition) — Supabase PostgreSQL Schema
-- Run in: Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- Enable UUID extension (already on by default in Supabase)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- 1. PROFILES
--    Automatically created/synced from auth.users on first login.
--    Stores track selection and public contributor data.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id              UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Identity (from OAuth provider metadata)
  display_name    TEXT,
  avatar_url      TEXT,
  github_username TEXT UNIQUE,
  email           TEXT,

  -- NSoC-specific
  track           TEXT CHECK (track IN ('Contributor', 'Project Kernel', 'Campus Ambassador')) DEFAULT 'Contributor',
  college         TEXT,
  city            TEXT,
  bio             TEXT,
  points          INTEGER NOT NULL DEFAULT 0,
  pr_count        INTEGER NOT NULL DEFAULT 0,

  -- Verification & status
  is_verified     BOOLEAN NOT NULL DEFAULT FALSE,
  is_banned       BOOLEAN NOT NULL DEFAULT FALSE
);

-- Auto-update timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- 2. REGISTRATIONS
--    Explicit track registration submitted via the RegisterModal.
--    A user can only have ONE active registration.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.registrations (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  user_id         UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  track           TEXT NOT NULL CHECK (track IN ('Contributor', 'Project Kernel', 'Campus Ambassador')),

  -- Extra info collected at registration time
  college         TEXT,
  city            TEXT,
  github_profile  TEXT,
  experience_level TEXT CHECK (experience_level IN ('Beginner', 'Intermediate', 'Advanced')),
  tech_stack      TEXT[],          -- e.g. ['TypeScript', 'Rust', 'Python']
  motivation      TEXT,            -- short "why I want to join" note

  status          TEXT NOT NULL DEFAULT 'Pending'
                    CHECK (status IN ('Pending', 'Approved', 'Rejected', 'Waitlisted')),

  UNIQUE (user_id)                 -- one registration per user
);

CREATE TRIGGER registrations_updated_at
  BEFORE UPDATE ON public.registrations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- 3. PROJECTS (submitted by Project Kernels)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.projects (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  admin_id        UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,

  name            TEXT NOT NULL,
  description     TEXT,
  repo_url        TEXT NOT NULL,
  website_url     TEXT,
  tech_stack      TEXT[],
  tags            TEXT[],          -- e.g. ['AI', 'Web', 'CLI', 'Mobile']
  difficulty      TEXT CHECK (difficulty IN ('Beginner Friendly', 'Intermediate', 'Advanced')),
  open_issues     INTEGER DEFAULT 0,

  status          TEXT NOT NULL DEFAULT 'Pending'
                    CHECK (status IN ('Pending', 'Approved', 'Rejected', 'Archived')),
  is_featured     BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TRIGGER projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- 4. CONTRIBUTIONS (pull requests / merged work)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.contributions (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  contributor_id  UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  project_id      UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,

  pr_url          TEXT NOT NULL,
  pr_title        TEXT,
  pr_number       INTEGER,
  gh_pr_id        BIGINT,          -- GitHub PR ID for dedup
  issue_url       TEXT,

  points_awarded  INTEGER NOT NULL DEFAULT 0,
  difficulty      TEXT CHECK (difficulty IN ('Easy', 'Medium', 'Hard', 'Critical')),

  status          TEXT NOT NULL DEFAULT 'Open'
                    CHECK (status IN ('Open', 'Under Review', 'Merged', 'Rejected', 'Duplicate')),
  reviewed_by     UUID REFERENCES public.profiles(id),
  reviewer_note   TEXT,

  UNIQUE (gh_pr_id)                -- prevent duplicate PR submissions
);

CREATE TRIGGER contributions_updated_at
  BEFORE UPDATE ON public.contributions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- 5. LEADERBOARD VIEW (computed from contributions)
--    A materialised view for fast leaderboard queries.
-- ============================================================
CREATE MATERIALIZED VIEW IF NOT EXISTS public.leaderboard AS
  SELECT
    p.id,
    p.display_name,
    p.avatar_url,
    p.github_username,
    p.track,
    p.college,
    COALESCE(SUM(c.points_awarded) FILTER (WHERE c.status = 'Merged'), 0) AS total_points,
    COUNT(c.id) FILTER (WHERE c.status = 'Merged')                         AS merged_prs,
    RANK() OVER (ORDER BY COALESCE(SUM(c.points_awarded) FILTER (WHERE c.status = 'Merged'), 0) DESC) AS rank
  FROM public.profiles p
  LEFT JOIN public.contributions c ON c.contributor_id = p.id
  WHERE p.track = 'Contributor'
    AND p.is_banned = FALSE
  GROUP BY p.id
WITH DATA;

-- Unique index required for REFRESH CONCURRENTLY later
CREATE UNIQUE INDEX IF NOT EXISTS leaderboard_id_idx ON public.leaderboard (id);

-- ============================================================
-- 6. INQUIRY FORMS
--    Captures sponsor and community partner inquiries
--    submitted via the InquiryModal.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.inquiries (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  type            TEXT NOT NULL CHECK (type IN ('sponsor', 'partner')),
  org_name        TEXT NOT NULL,
  contact_email   TEXT NOT NULL,
  tier            TEXT,            -- e.g. 'Title Sponsor', 'Gold', 'Tech Community'
  note            TEXT,
  website_url     TEXT,

  -- Admin workflow
  status          TEXT NOT NULL DEFAULT 'New'
                    CHECK (status IN ('New', 'In Review', 'Approved', 'Rejected', 'Archived')),
  reviewed_by     UUID REFERENCES public.profiles(id),
  admin_note      TEXT
);

-- ============================================================
-- 7. ANNOUNCEMENTS (admin broadcasts)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.announcements (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  title           TEXT NOT NULL,
  body            TEXT NOT NULL,
  type            TEXT DEFAULT 'info'
                    CHECK (type IN ('info', 'warning', 'milestone', 'winner')),
  is_published    BOOLEAN NOT NULL DEFAULT FALSE,
  published_at    TIMESTAMPTZ,
  author_id       UUID REFERENCES public.profiles(id)
);

CREATE TRIGGER announcements_updated_at
  BEFORE UPDATE ON public.announcements
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- 8. ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT USING (TRUE);
CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Registrations
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own registration"
  ON public.registrations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own registration"
  ON public.registrations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own registration"
  ON public.registrations FOR UPDATE USING (auth.uid() = user_id);

-- Projects
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Approved projects are public"
  ON public.projects FOR SELECT USING (status = 'Approved' OR auth.uid() = admin_id);
CREATE POLICY "Kernels can insert their projects"
  ON public.projects FOR INSERT WITH CHECK (auth.uid() = admin_id);
CREATE POLICY "Kernels can update their projects"
  ON public.projects FOR UPDATE USING (auth.uid() = admin_id);

-- Contributions
ALTER TABLE public.contributions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Merged contributions are public"
  ON public.contributions FOR SELECT USING (status = 'Merged' OR auth.uid() = contributor_id);
CREATE POLICY "Contributors can insert contributions"
  ON public.contributions FOR INSERT WITH CHECK (auth.uid() = contributor_id);
CREATE POLICY "Contributors can update their contributions"
  ON public.contributions FOR UPDATE USING (auth.uid() = contributor_id);

-- Inquiries: insert-only for public, no SELECT (admin reads via service role)
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit an inquiry"
  ON public.inquiries FOR INSERT WITH CHECK (TRUE);

-- Announcements
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published announcements are viewable"
  ON public.announcements FOR SELECT USING (is_published = TRUE);

-- ============================================================
-- 9. AUTO-CREATE PROFILE ON USER SIGN-UP
--    Supabase trigger: when auth.users gets a new row,
--    automatically insert into public.profiles.
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, avatar_url, github_username, email)
  VALUES (
    NEW.id,
    COALESCE(
      NEW.raw_user_meta_data ->> 'full_name',
      NEW.raw_user_meta_data ->> 'name',
      split_part(NEW.email, '@', 1)
    ),
    NEW.raw_user_meta_data ->> 'avatar_url',
    COALESCE(
      NEW.raw_user_meta_data ->> 'user_name',
      NEW.raw_user_meta_data ->> 'preferred_username'
    ),
    NEW.email
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- 10. GRANTS & ROLES (Ensures PostgREST API access)
-- ============================================================
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON TABLE public.profiles TO anon, authenticated;
GRANT ALL ON TABLE public.registrations TO anon, authenticated;
GRANT ALL ON TABLE public.projects TO anon, authenticated;
GRANT ALL ON TABLE public.contributions TO anon, authenticated;
GRANT ALL ON TABLE public.inquiries TO anon, authenticated;
GRANT ALL ON TABLE public.announcements TO anon, authenticated;
GRANT SELECT ON public.leaderboard TO anon, authenticated;

-- ============================================================
-- DONE.
-- Tables:  profiles | registrations | projects | contributions
--          inquiries | announcements
-- Views:   leaderboard (materialised)
-- ============================================================
