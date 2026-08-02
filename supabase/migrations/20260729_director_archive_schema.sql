-- ==============================================================================
-- GERDY ABELARD STUDIO — DIRECTOR'S ARCHIVE SCHEMA MIGRATION
-- Database: PostgreSQL / Supabase
-- Description: Core relational schema for Director Archive projects, roles,
--              media objects, and treatment documents with Row Level Security.
-- ==============================================================================

-- 1. EXTENSIONS & SETUP
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL CHECK (
    category IN ('Film', 'Music Video', 'Commercial', 'Documentary', 'Photography', 'Original IP', 'Creative Direction')
  ),
  year INTEGER NOT NULL,
  client TEXT,
  short_description TEXT,
  featured BOOLEAN DEFAULT false,
  cover_image TEXT,
  hero_image TEXT,
  status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for fast lookup by slug & category
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_category ON public.projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);

-- 3. PROJECT ROLES TABLE (Multi-Credit Authorship)
CREATE TABLE IF NOT EXISTS public.project_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  role_name TEXT NOT NULL,
  person_name TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_project_roles_project ON public.project_roles(project_id);

-- 4. PROJECT MEDIA TABLE (Cinematic Stills, BTS, Video Prints, Posters)
CREATE TABLE IF NOT EXISTS public.project_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  media_type TEXT NOT NULL CHECK (
    media_type IN ('hero', 'still', 'behind_the_scenes', 'video', 'poster')
  ),
  media_url TEXT NOT NULL,
  caption TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_project_media_project ON public.project_media(project_id);

-- 5. PROJECT DOCUMENTS TABLE (Treatments, Screenplays, Production Notes, Press Kits)
CREATE TABLE IF NOT EXISTS public.project_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL CHECK (
    document_type IN ('treatment', 'script', 'production_notes', 'press_kit')
  ),
  file_url TEXT NOT NULL,
  title TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_project_documents_project ON public.project_documents(project_id);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_documents ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- 1. PUBLIC READ ACCESS (Published Content Only)
-- ------------------------------------------------------------------------------

-- Projects: Anyone can read published projects
CREATE POLICY "Allow public read access for published projects"
  ON public.projects
  FOR SELECT
  USING (status = 'published');

-- Roles: Anyone can read roles belonging to published projects
CREATE POLICY "Allow public read access for project roles"
  ON public.project_roles
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE public.projects.id = public.project_roles.project_id
        AND public.projects.status = 'published'
    )
  );

-- Media: Anyone can read media belonging to published projects
CREATE POLICY "Allow public read access for project media"
  ON public.project_media
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE public.projects.id = public.project_media.project_id
        AND public.projects.status = 'published'
    )
  );

-- Documents: Anyone can read documents belonging to published projects
CREATE POLICY "Allow public read access for project documents"
  ON public.project_documents
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE public.projects.id = public.project_documents.project_id
        AND public.projects.status = 'published'
    )
  );

-- ------------------------------------------------------------------------------
-- 2. ADMIN FULL ACCESS (Authenticated Studio Users)
-- ------------------------------------------------------------------------------

-- Projects Admin Policy
CREATE POLICY "Allow admin full access on projects"
  ON public.projects
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Roles Admin Policy
CREATE POLICY "Allow admin full access on project_roles"
  ON public.project_roles
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Media Admin Policy
CREATE POLICY "Allow admin full access on project_media"
  ON public.project_media
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Documents Admin Policy
CREATE POLICY "Allow admin full access on project_documents"
  ON public.project_documents
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
