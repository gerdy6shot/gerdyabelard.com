/**
 * GERDYABELARD.COM - Database Schema Definitions (Supabase)
 * Fully typed interfaces for multi-page ecosystem, portfolio, client management, and booking system.
 */

// ==============================================================================
// DIRECTOR ARCHIVE SUPABASE DATABASE SCHEMAS
// ==============================================================================

export type ArchiveCategory =
  | 'Film'
  | 'Music Video'
  | 'Commercial'
  | 'Documentary'
  | 'Photography'
  | 'Original IP'
  | 'Creative Direction';

export type ArchiveStatus = 'draft' | 'published' | 'archived';

export interface DbArchiveProject {
  id: string;
  title: string;
  slug: string;
  category: ArchiveCategory;
  year: number;
  client?: string | null;
  short_description?: string | null;
  featured: boolean;
  cover_image?: string | null;
  hero_image?: string | null;
  status: ArchiveStatus;
  created_at: string;
  updated_at: string;
}

export interface DbArchiveProjectRole {
  id: string;
  project_id: string;
  role_name: string;
  person_name: string;
  display_order: number;
  created_at: string;
}

export type ArchiveMediaType = 'hero' | 'still' | 'behind_the_scenes' | 'video' | 'poster';

export interface DbArchiveProjectMedia {
  id: string;
  project_id: string;
  media_type: ArchiveMediaType;
  media_url: string;
  caption?: string | null;
  display_order: number;
  created_at: string;
}

export type ArchiveDocumentType = 'treatment' | 'script' | 'production_notes' | 'press_kit';

export interface DbArchiveProjectDocument {
  id: string;
  project_id: string;
  document_type: ArchiveDocumentType;
  file_url: string;
  title: string;
  created_at: string;
}

export interface ArchiveProjectWithRelations extends DbArchiveProject {
  roles: DbArchiveProjectRole[];
  media: DbArchiveProjectMedia[];
  documents: DbArchiveProjectDocument[];
}

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: 'admin' | 'client' | 'collaborator';
  avatar_url?: string;
  created_at: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: 'film' | 'photography' | 'creative-direction' | 'original-ip' | 'brand-strategy';
  subtitle: string;
  client_id?: string;
  summary: string;
  description: string;
  hero_image_url: string;
  featured_video_url?: string;
  full_video_url?: string;
  release_year: number;
  roles: string[];
  tags: string[];
  is_published: boolean;
  is_featured: boolean;
  display_order: number;
  created_at: string;

  // Director's Vault & Archive Attributes
  credits_breakdown?: {
    directed_by?: string;
    written_by?: string;
    treatment_by?: string;
    produced_by?: string;
    creative_direction?: string;
    production_company?: string;
    cinematography?: string;
    lead_cast?: string[];
  };
  treatment?: {
    concept: string;
    emotional_direction: string;
    visual_language: string;
    references: string[];
    themes: string[];
    characters?: string[];
    environments?: string[];
  };
  production_details?: {
    locations: string[];
    wardrobe: string;
    cinematography_approach: string;
    camera_specs?: string;
  };
  behind_the_scenes?: Array<{
    url: string;
    caption: string;
  }>;
  gallery_stills?: Array<{
    url: string;
    caption: string;
  }>;
  director_notes?: string[];
}

export interface ProjectMedia {
  id: string;
  project_id: string;
  media_type: 'image' | 'video' | 'audio' | 'document';
  url: string;
  caption?: string;
  aspect_ratio?: string;
  display_order: number;
  is_hero: boolean;
}

export interface IntellectualProperty {
  id: string;
  title: string;
  slug: string;
  type: 'screenplay' | 'book' | 'original-format' | 'concept';
  tagline: string;
  logline: string;
  synopsis: string;
  status: 'in-development' | 'optioned' | 'published' | 'completed';
  cover_image_url?: string;
  excerpt?: string;
  is_featured: boolean;
  created_at: string;
}

export interface WritingProject {
  id: string;
  title: string;
  slug: string;
  format: 'essay' | 'book' | 'article' | 'manifesto' | 'monograph';
  publication_date?: string;
  summary: string;
  content_markdown?: string;
  external_url?: string;
  is_published: boolean;
}

export interface Venture {
  id: string;
  name: string;
  slug: string;
  headline: string;
  description: string;
  role: string;
  url?: string;
  logo_url?: string;
  hero_image_url?: string;
  status: 'active' | 'incubating' | 'strategic-partner';
  highlights: string[];
  display_order: number;
}

export interface Client {
  id: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone?: string;
  industry?: string;
  status: 'prospect' | 'active' | 'archived';
  notes?: string;
  created_at: string;
}

export interface Service {
  id: string;
  title: string;
  code: string;
  category: 'direction' | 'photography' | 'consulting' | 'keynote';
  description: string;
  base_rate?: number;
  rate_structure: 'day-rate' | 'project-based' | 'retainer';
  deliverables: string[];
  is_active: boolean;
}

export interface AvailabilityRule {
  id: string;
  day_of_week: number; // 0-6
  start_time: string; // HH:mm
  end_time: string; // HH:mm
  is_blocked: boolean;
  location_zone: string; // e.g., "Los Angeles", "Mexico City", "International Travel"
}

export interface AvailabilityException {
  id: string;
  date: string; // YYYY-MM-DD
  reason: string;
  is_blocked: boolean;
  override_location?: string;
}

export interface Inquiry {
  id: string;
  sender_name: string;
  sender_email: string;
  company_or_brand?: string;
  project_type: string;
  estimated_budget_range?: string;
  target_timeline?: string;
  message: string;
  status: 'new' | 'reviewed' | 'converted' | 'archived';
  created_at: string;
}

export interface Booking {
  id: string;
  client_id: string;
  service_id: string;
  inquiry_id?: string;
  title: string;
  start_date: string;
  end_date: string;
  status: 'pending' | 'confirmed' | 'contracted' | 'completed' | 'cancelled';
  total_amount?: number;
  deposit_paid: boolean;
  notes?: string;
  created_at: string;
}
