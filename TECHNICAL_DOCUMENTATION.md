# GERDYABELARD.COM — Technical Documentation & System Specification

**Version:** 1.0.0 (Production Architecture & Ecosystem Specification)  
**Platform Identity:** GERDY ABELARD — Aesthetic Director  
**Primary Domain:** `gerdyabelard.com`  

---

## 1. System Overview & Final Architecture

GERDYABELARD.COM is built as a multi-page web application and digital headquarters for **Gerdy Abelard** (Aesthetic Director, Filmmaker, Commercial Photographer, Author, and Tech Builder).

The platform unifies five core creative and business pillars:
1. **I DIRECT.** — Film directing, moving image, narrative cinema, and commercial video.
2. **I CREATE.** — Medium format photography, architectural photo essays, and haute couture campaigns.
3. **I WRITE.** — Screenplays, formats, and literary works (*The Snake, Pearls & Pigs*, *Viscous*, *The Architecture of Attention*).
4. **I BUILD.** — Technology ventures, platforms (*OVERHAULTRAIN.COM*, *COMVIEWMEDIA*), and cross-continental trade (*ROCE DE LIBERTAD*).
5. **AESTHETIC GOVERNANCE.** — Direct strategic commissions, client archives, availability, and booking intake.

### Technology Stack
- **Frontend Framework:** React 19 + TypeScript + Vite
- **Routing Engine:** React Router DOM (v7) — Strict multi-page client routing (No single-page scroll monolith)
- **Styling & Design System:** Tailwind CSS v4 + Restrained Architectural Dark Palette (`#08080a` base)
- **Database Layer:** Supabase PostgreSQL (12 relational tables with Row Level Security)
- **Authentication:** Supabase Auth (JWT & Role-Based Profiles)
- **Icons & Motion:** Lucide React + Motion/React
- **Hosting & Infrastructure:** Cloudflare (DNS, Edge SSL, CDN, DDoS Protection) + Cloud Run / Node.js
- **Domain Management:** Namecheap Registrar

---

## 2. Implemented Route Map

The application enforces a strict multi-page architecture. Every route corresponds to an isolated page component module:

| Route Path | Page Component | Category | Description |
| :--- | :--- | :--- | :--- |
| `/` | `Home.tsx` | Core | Cinematic flagship portal & overarching manifesto |
| `/work` | `WorkArchive.tsx` | Portfolio | Cross-disciplinary index with category & search filters |
| `/work/:slug` | `ProjectDetail.tsx` | Portfolio | Deep-dive case study with video embeds and technical specs |
| `/film` | `FilmPortfolio.tsx` | Portfolio | Moving image, narrative filmography, and director statement |
| `/photography` | `PhotographyPortfolio.tsx` | Portfolio | Medium format stills gallery with interactive lightbox |
| `/creative-direction` | `CreativeDirectionPage.tsx` | Portfolio | Brand strategy, campaign orchestration, and case studies |
| `/clients` | `ClientArchive.tsx` | Business | Roster of luxury, publishing, and tech clients |
| `/ip` | `OriginalIPPage.tsx` | Intellectual Property | Screenplays, original TV formats, and script previews |
| `/writing` | `WritingAndBooksPage.tsx` | Intellectual Property | Literary essays and monographs with modal reader |
| `/ventures` | `VentureEcosystemPage.tsx` | Business | COMVIEWMEDIA, OVERHAULTRAIN, and ROCE DE LIBERTAD |
| `/about` | `AboutPage.tsx` | Core | Biography, four pillars, and primary location zones |
| `/inquire` | `InquiryPage.tsx` | Business | Direct client intake form integrated with Supabase DB |
| `/blueprint` | `ArchitectureBlueprint.tsx` | System | Interactive technical blueprint inspector |
| `/book` | `SystemShellPlaceholder` | System | Interactive booking system (Phase 5 module) |
| `/admin/*` | `SystemShellPlaceholder` | System | 9 Protected studio management routes (Phase 6 module) |

---

## 3. Component Hierarchy

```
/src
├── /components
│   ├── /navigation
│   │   ├── GlobalHeader.tsx      # Fixed top navigation lockup & mobile drawer
│   │   └── GlobalFooter.tsx      # Multi-column navigational footer & studio portal link
│   └── /common
│       └── ArchitectureBlueprint.tsx # Interactive system architecture viewer
├── /pages
│   ├── Home.tsx                  # Cinematic entry portal
│   ├── WorkArchive.tsx           # Category & search filtered portfolio index
│   ├── ProjectDetail.tsx         # Individual project case study & gallery
│   ├── FilmPortfolio.tsx         # Directorial filmography & video reel player
│   ├── PhotographyPortfolio.tsx  # Photography gallery & lightbox modal
│   ├── CreativeDirectionPage.tsx # Brand strategy case studies & methodology
│   ├── ClientArchive.tsx         # Brand roster & strategic relationship index
│   ├── OriginalIPPage.tsx        # Screenplays & TV formats (The Snake, Pearls & Pigs, Viscous)
│   ├── WritingAndBooksPage.tsx   # Literary essays & interactive reader modal
│   ├── VentureEcosystemPage.tsx  # Business ventures & platform links
│   ├── AboutPage.tsx             # Biography & global studio presence
│   └── InquiryPage.tsx           # Direct client intake & database dispatch
├── /data
│   └── mockData.ts               # Local fallback data matching database types
├── /lib
│   ├── supabase.ts               # Supabase client singleton & configuration check
│   └── tokens.ts                 # Global design system constants
├── /router
│   ├── AppRouter.tsx             # Master router switch & layout wrapper
│   └── routes.config.ts          # Route definition registry
└── /types
    └── database.ts               # Supabase PostgreSQL typed schema definitions
```

---

## 4. Supabase Database Schema

The platform database is structured into 12 core relational tables defined in `/src/types/database.ts`:

1. **`profiles`**: User identities (`id`, `email`, `full_name`, `role`, `avatar_url`, `created_at`).
2. **`projects`**: Portfolio projects (`id`, `title`, `slug`, `category`, `subtitle`, `summary`, `description`, `hero_image_url`, `featured_video_url`, `release_year`, `roles`, `tags`, `is_published`, `is_featured`, `display_order`).
3. **`project_media`**: High-res stills & media assets (`id`, `project_id`, `media_type`, `url`, `caption`, `aspect_ratio`, `display_order`, `is_hero`).
4. **`intellectual_property`**: Original IP scripts & formats (`id`, `title`, `slug`, `type`, `tagline`, `logline`, `synopsis`, `status`, `cover_image_url`, `excerpt`, `is_featured`).
5. **`writing_projects`**: Essays & books (`id`, `title`, `slug`, `format`, `publication_date`, `summary`, `content_markdown`, `external_url`, `is_published`).
6. **`ventures`**: Venture platforms (`id`, `name`, `slug`, `headline`, `description`, `role`, `url`, `logo_url`, `hero_image_url`, `status`, `highlights`, `display_order`).
7. **`clients`**: Client relationship directory (`id`, `company_name`, `contact_name`, `email`, `phone`, `industry`, `status`, `notes`, `created_at`).
8. **`services`**: Offering catalog (`id`, `title`, `code`, `category`, `description`, `base_rate`, `rate_structure`, `deliverables`, `is_active`).
9. **`availability_rules`**: Weekly availability hours & location zones (`id`, `day_of_week`, `start_time`, `end_time`, `is_blocked`, `location_zone`).
10. **`availability_exceptions`**: Override dates & travel blocks (`id`, `date`, `reason`, `is_blocked`, `override_location`).
11. **`inquiries`**: Public intake messages (`id`, `sender_name`, `sender_email`, `company_or_brand`, `project_type`, `estimated_budget_range`, `target_timeline`, `message`, `status`, `created_at`).
12. **`bookings`**: Client bookings (`id`, `client_id`, `service_id`, `inquiry_id`, `title`, `start_date`, `end_date`, `status`, `total_amount`, `deposit_paid`, `notes`).

---

## 5. Security & Row Level Security (RLS) Policies

To ensure data integrity and prevent unauthorized access, Supabase Row Level Security (RLS) policies are designed as follows:

```sql
-- 1. Projects, IP, Writing, Ventures, Services (Public Read-Only)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Published Projects" ON projects 
  FOR SELECT USING (is_published = true);

-- Admin CRUD Access
CREATE POLICY "Admin All Access Projects" ON projects 
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- 2. Inquiries (Public Insert Only)
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Anonymous Inquiry Submission" ON inquiries 
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin Read & Manage Inquiries" ON inquiries 
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- 3. Bookings & Clients (Admin Exclusive)
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin Full Control Bookings" ON bookings 
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
```

---

## 6. Authentication & User Permission Flow

1. **Public Visitors**: Unauthenticated access to all public routes (`/`, `/work`, `/film`, `/photography`, `/creative-direction`, `/clients`, `/ip`, `/writing`, `/ventures`, `/about`, `/inquire`).
2. **Clients**: Authenticated access via email link or OAuth to view specific booking statuses and contract details.
3. **Studio Admin (`role = 'admin'`)**: Authenticated access to `/admin/*` protected routes, equipped with JWT validation to manage projects, review inquiries, set availability exceptions, and process client bookings.

---

## 7. Booking & Availability Logic

- **Availability Engine**: Evaluates `availability_rules` (e.g., Monday–Friday 09:00–18:00 in Los Angeles / Mexico City) against `availability_exceptions` (e.g., location overrides, film shoot travel blocks).
- **Booking Flow**:
  1. Client selects service category (Film Directing, Commercial Photography, Brand Advisory).
  2. Client submits target dates and project requirements via `/inquire` or `/book`.
  3. System creates a `pending` booking in the database and dispatches intake notifications.
  4. Admin reviews scope, approves dates, sets deposit amount, and converts booking to `confirmed`.

---

## 8. Environment Variables & Third-Party Integration

| Variable Name | Environment | Purpose |
| :--- | :--- | :--- |
| `VITE_SUPABASE_URL` | Client Public | Supabase API Endpoint |
| `VITE_SUPABASE_ANON_KEY` | Client Public | Supabase Anonymous Public Key |
| `GEMINI_API_KEY` | Server Secret | Optional Gemini AI assistance key |
| `APP_URL` | Server Environment | Canonical deployment URL |
| `VITE_SITE_TITLE` | Client Public | Browser title configuration |
| `VITE_SITE_URL` | Client Public | SEO canonical domain URL (`https://gerdyabelard.com`) |

---

## 9. Deployment, Backup & Disaster Recovery

- **Production Build:** `npm run build` compiles static assets to `/dist` via Vite & esbuild.
- **Edge CDN & DNS:** Namecheap DNS points to Cloudflare edge proxies enforcing SSL, HTTP/3, and DDoS defense.
- **Database Backups:** Daily automated Point-In-Time Recovery (PITR) enabled on Supabase PostgreSQL.
- **Source Control:** Git repository maintained with atomic commits per development phase.
