import React, { useState } from 'react';
import { PUBLIC_ROUTES, ADMIN_ROUTES } from '../../router/routes.config';
import { 
  Layers, 
  FolderTree, 
  MapPin, 
  Database, 
  Key, 
  Palette, 
  Type, 
  Activity, 
  Box, 
  Monitor, 
  ShieldCheck, 
  Ban, 
  Sparkles,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export const ArchitectureBlueprint: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'routes' | 'tech' | 'database' | 'design' | 'security' | 'unbuilt'>('tech');

  return (
    <div className="min-h-screen bg-[#08080a] text-[#f4f3ef] pt-28 pb-20 px-6 max-w-7xl mx-auto">
      {/* Hero Banner */}
      <div className="mb-16 border-b border-[#22222c] pb-12">
        <div className="flex items-center gap-3 text-[#c5a059] text-xs font-mono uppercase tracking-[0.25em] mb-4">
          <Sparkles className="w-4 h-4" />
          <span>GERDYABELARD.COM — PHASE 1 ARCHITECTURE FOUNDATION</span>
        </div>
        <h1 className="font-serif-display text-4xl sm:text-6xl tracking-[0.1em] text-[#f4f3ef] mb-6 font-normal uppercase">
          Master Architecture & Blueprint
        </h1>
        <p className="text-[#a1a1aa] font-sans-ui text-base sm:text-lg max-w-3xl leading-relaxed font-light">
          A scalable, multi-page digital headquarters for Gerdy Abelard — Aesthetic Director. 
          Establishing technical, database, visual, and routing structures across Film, Photography, Original IP, Writing, and Ventures.
        </p>

        {/* Core Statements */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-[#1a1a22]">
          <div>
            <span className="text-[10px] tracking-[0.25em] text-[#63636e] uppercase block font-mono">Statement 01</span>
            <span className="font-serif-display text-xl text-[#f4f3ef] tracking-wider">I DIRECT.</span>
          </div>
          <div>
            <span className="text-[10px] tracking-[0.25em] text-[#63636e] uppercase block font-mono">Statement 02</span>
            <span className="font-serif-display text-xl text-[#f4f3ef] tracking-wider">I CREATE.</span>
          </div>
          <div>
            <span className="text-[10px] tracking-[0.25em] text-[#63636e] uppercase block font-mono">Statement 03</span>
            <span className="font-serif-display text-xl text-[#f4f3ef] tracking-wider">I WRITE.</span>
          </div>
          <div>
            <span className="text-[10px] tracking-[0.25em] text-[#63636e] uppercase block font-mono">Statement 04</span>
            <span className="font-serif-display text-xl text-[#f4f3ef] tracking-wider">I BUILD.</span>
          </div>
        </div>
      </div>

      {/* Blueprint Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-12 border-b border-[#22222c] pb-4">
        {[
          { id: 'tech', label: '1. Tech & Folders', icon: FolderTree },
          { id: 'routes', label: '2. Route Map', icon: MapPin },
          { id: 'database', label: '3. Supabase Schema', icon: Database },
          { id: 'design', label: '4. Design Tokens & Motion', icon: Palette },
          { id: 'security', label: '5. Security & Edge', icon: ShieldCheck },
          { id: 'unbuilt', label: '6. Intentionally Unbuilt', icon: Ban },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-3 text-xs uppercase tracking-[0.15em] border transition-all ${
                isActive
                  ? 'border-[#c5a059] bg-[#15151a] text-[#c5a059]'
                  : 'border-[#22222c] bg-[#0d0d11] text-[#a1a1aa] hover:border-[#333342] hover:text-[#f4f3ef]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: TECH & FOLDERS */}
      {activeTab === 'tech' && (
        <div className="space-y-12">
          {/* Tech Architecture Overview */}
          <section className="bg-[#101014] border border-[#22222c] p-8">
            <h2 className="font-serif-display text-2xl tracking-[0.1em] text-[#f4f3ef] mb-6 flex items-center gap-3">
              <Layers className="w-5 h-5 text-[#c5a059]" />
              Recommended Production Stack Architecture
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-[#15151a] p-6 border border-[#22222c]">
                <span className="text-[10px] text-[#c5a059] font-mono tracking-widest uppercase">Frontend Engine</span>
                <h3 className="font-serif-display text-lg text-[#f4f3ef] mt-1 mb-2">React 19 + TypeScript + Vite</h3>
                <p className="text-xs text-[#a1a1aa] leading-relaxed">
                  Single Page Application with strict type safety, modular client routing, dynamic chunk loading, and custom motion canvas layers.
                </p>
              </div>

              <div className="bg-[#15151a] p-6 border border-[#22222c]">
                <span className="text-[10px] text-[#c5a059] font-mono tracking-widest uppercase">Database & Auth</span>
                <h3 className="font-serif-display text-lg text-[#f4f3ef] mt-1 mb-2">Supabase PostgreSQL</h3>
                <p className="text-xs text-[#a1a1aa] leading-relaxed">
                  Relational storage for projects, clients, inquiries, availability rules, and custom bookings with Row Level Security (RLS) enforcement.
                </p>
              </div>

              <div className="bg-[#15151a] p-6 border border-[#22222c]">
                <span className="text-[10px] text-[#c5a059] font-mono tracking-widest uppercase">Infrastructure & Edge</span>
                <h3 className="font-serif-display text-lg text-[#f4f3ef] mt-1 mb-2">Cloudflare + Namecheap</h3>
                <p className="text-xs text-[#a1a1aa] leading-relaxed">
                  Global DNS management, edge caching for high-res cinema stills, DDoS protection, and SSL termination at gerdyabelard.com.
                </p>
              </div>
            </div>
          </section>

          {/* Directory Hierarchy */}
          <section className="bg-[#101014] border border-[#22222c] p-8">
            <h2 className="font-serif-display text-2xl tracking-[0.1em] text-[#f4f3ef] mb-6 flex items-center gap-3">
              <FolderTree className="w-5 h-5 text-[#c5a059]" />
              Standardized Multi-Page Folder Hierarchy
            </h2>
            <pre className="bg-[#08080a] p-6 border border-[#22222c] text-xs font-mono text-[#a1a1aa] leading-relaxed overflow-x-auto">
{`/src
├── /assets             # Static artwork, logos, and high-res cinema stills
├── /components         # Reusable UI components
│   ├── /common         # Architecture Blueprint, Modals, Buttons, Dividers
│   ├── /navigation     # GlobalHeader, GlobalFooter, MobileDrawer, RouteTransitions
│   ├── /media          # ProgressiveImage, VideoPlayerModal, Canvas3DLayer
│   └── /forms          # InquireForm, BookingCalendar, ContactControls
├── /pages              # Individual, isolated Page Views (built incrementally)
│   ├── Home.tsx                # Phase 2: Cinematic Flagship Entry
│   ├── WorkArchive.tsx         # Phase 3: All Creative Work Index
│   ├── ProjectDetail.tsx       # Phase 3: Film/Photo Case Studies
│   ├── FilmPortfolio.tsx       # Phase 3: Film Directing Works
│   ├── PhotographyPortfolio.tsx# Phase 3: Editorial & Commercial Photo
│   ├── CreativeDirection.tsx   # Phase 3: Visual & Brand Strategy
│   ├── OriginalIP.tsx          # Phase 4: Screenplays, Formats, Books
│   ├── WritingAndBooks.tsx     # Phase 4: Literary Essays & Monographs
│   ├── VentureEcosystem.tsx    # Phase 4: COMVIEWMEDIA, OVERHAULTRAIN, ROCE DE LIBERTAD
│   ├── About.tsx               # Phase 2: Biography & Manifesto
│   ├── InquiryPage.tsx         # Phase 5: Client Strategic Intake
│   ├── BookingPage.tsx         # Phase 5: Client Booking System
│   └── /admin                  # Phase 6: Protected Administrative Portal
│       ├── AdminDashboard.tsx
│       ├── AdminCalendar.tsx
│       ├── AdminBookings.tsx
│       └── AdminProjectsCMS.tsx
├── /lib                # Core utility singletons
│   ├── supabase.ts     # Supabase client initializer
│   ├── tokens.ts       # Design system token definitions
│   └── motion.ts       # Framer motion variants and easing curves
├── /router             # Routing map and guard definitions
│   ├── AppRouter.tsx   # React Router tree
│   └── routes.config.ts# Route metadata registry
└── /types              # Global TypeScript interfaces
    ├── database.ts     # Supabase DB tables & row types
    └── design.ts       # UI theme & layout interfaces`}
            </pre>
          </section>
        </div>
      )}

      {/* TAB 2: ROUTE MAP */}
      {activeTab === 'routes' && (
        <div className="space-y-12">
          {/* Public Routes */}
          <section className="bg-[#101014] border border-[#22222c] p-8">
            <h2 className="font-serif-display text-2xl tracking-[0.1em] text-[#f4f3ef] mb-2">
              Public Route Architecture ({PUBLIC_ROUTES.length} Routes)
            </h2>
            <p className="text-xs text-[#a1a1aa] mb-6 font-sans-ui">
              True multi-page application routing structure. Each route operates as an independent component module.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PUBLIC_ROUTES.map((route) => (
                <div key={route.path} className="bg-[#15151a] p-5 border border-[#22222c] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-sm text-[#c5a059]">{route.path}</span>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-[#22222c] text-[#a1a1aa]">
                        Phase {route.phase}
                      </span>
                    </div>
                    <h3 className="font-serif-display text-base text-[#f4f3ef] mb-1">{route.label}</h3>
                    <p className="text-xs text-[#a1a1aa] leading-relaxed">{route.description}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#22222c] flex items-center justify-between text-[10px] text-[#63636e] uppercase tracking-wider font-mono">
                    <span>Category: {route.category}</span>
                    <span className="text-[#c5a059]">Isolated Route</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Admin Protected Routes */}
          <section className="bg-[#101014] border border-[#22222c] p-8">
            <h2 className="font-serif-display text-2xl tracking-[0.1em] text-[#f4f3ef] mb-2 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#c5a059]" />
              Protected Administrative System Routes ({ADMIN_ROUTES.length} Routes)
            </h2>
            <p className="text-xs text-[#a1a1aa] mb-6 font-sans-ui">
              Restricted studio management environment protected by Supabase Auth and Row Level Security.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {ADMIN_ROUTES.map((route) => (
                <div key={route.path} className="bg-[#15151a] p-4 border border-[#22222c]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs text-[#c5a059]">{route.path}</span>
                    <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 bg-[#22222c] text-[#a1a1aa]">
                      Protected
                    </span>
                  </div>
                  <h3 className="font-serif-display text-sm text-[#f4f3ef] mb-1">{route.label}</h3>
                  <p className="text-[11px] text-[#a1a1aa] leading-relaxed">{route.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* TAB 3: DATABASE SCHEMA */}
      {activeTab === 'database' && (
        <div className="space-y-12">
          <section className="bg-[#101014] border border-[#22222c] p-8">
            <h2 className="font-serif-display text-2xl tracking-[0.1em] text-[#f4f3ef] mb-4 flex items-center gap-3">
              <Database className="w-5 h-5 text-[#c5a059]" />
              Supabase PostgreSQL Schema Architecture
            </h2>
            <p className="text-xs text-[#a1a1aa] mb-8 leading-relaxed max-w-3xl">
              The platform database is structured into 12 core relational tables. Built to support multi-disciplinary work archives, strategic client rosters, availability rules, and automated booking workflows.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  table: 'profiles',
                  desc: 'User identity profiles linked directly to Supabase Auth UUIDs',
                  fields: ['id (uuid)', 'email (text)', 'full_name (text)', 'role (enum)', 'created_at']
                },
                {
                  table: 'projects',
                  desc: 'Master portfolio index spanning Film, Photography, and Creative Direction',
                  fields: ['id (uuid)', 'title', 'slug', 'category', 'hero_image_url', 'is_published', 'display_order']
                },
                {
                  table: 'project_media',
                  desc: 'High-res stills, film stills, video embeds, and campaign assets',
                  fields: ['id', 'project_id (fk)', 'media_type', 'url', 'caption', 'aspect_ratio', 'display_order']
                },
                {
                  table: 'intellectual_property',
                  desc: 'Original IP archive including screenplays, original formats, and books',
                  fields: ['id', 'title', 'slug', 'type (screenplay/book)', 'logline', 'synopsis', 'status']
                },
                {
                  table: 'writing_projects',
                  desc: 'Literary essays, monographs, and published books',
                  fields: ['id', 'title', 'slug', 'format', 'publication_date', 'summary', 'content_markdown']
                },
                {
                  table: 'ventures',
                  desc: 'Venture ecosystem (COMVIEWMEDIA, OVERHAULTRAIN, ROCE DE LIBERTAD)',
                  fields: ['id', 'name', 'slug', 'headline', 'description', 'role', 'status', 'url']
                },
                {
                  table: 'clients',
                  desc: 'Client relationship directory and historic collaboration log',
                  fields: ['id', 'company_name', 'contact_name', 'email', 'industry', 'status']
                },
                {
                  table: 'services',
                  desc: 'Aesthetic Direction, Commercial Photography, Strategy, and Keynote offerings',
                  fields: ['id', 'title', 'code', 'category', 'description', 'base_rate', 'rate_structure']
                },
                {
                  table: 'availability_rules',
                  desc: 'Global availability hours and travel location zones',
                  fields: ['id', 'day_of_week', 'start_time', 'end_time', 'location_zone', 'is_blocked']
                },
                {
                  table: 'bookings',
                  desc: 'Client booking instances, deposit status, and project timeline sync',
                  fields: ['id', 'client_id (fk)', 'service_id (fk)', 'start_date', 'end_date', 'status', 'total_amount']
                },
              ].map((item) => (
                <div key={item.table} className="bg-[#15151a] p-6 border border-[#22222c]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm text-[#c5a059] font-semibold">
                      table: {item.table}
                    </span>
                    <span className="text-[10px] font-mono text-[#63636e] uppercase">PostgreSQL</span>
                  </div>
                  <p className="text-xs text-[#a1a1aa] mb-4">{item.desc}</p>
                  <div className="bg-[#08080a] p-3 border border-[#22222c]">
                    <span className="text-[10px] text-[#63636e] uppercase tracking-wider block mb-1 font-mono">
                      Key Columns
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.fields.map((f) => (
                        <span key={f} className="text-[10px] font-mono text-[#d1d5db] bg-[#1a1a22] px-2 py-0.5">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* TAB 4: DESIGN TOKENS & MOTION */}
      {activeTab === 'design' && (
        <div className="space-y-12">
          {/* Color Tokens */}
          <section className="bg-[#101014] border border-[#22222c] p-8">
            <h2 className="font-serif-display text-2xl tracking-[0.1em] text-[#f4f3ef] mb-6 flex items-center gap-3">
              <Palette className="w-5 h-5 text-[#c5a059]" />
              Restrained Architectural Palette
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Deep Black', hex: '#08080a', role: 'Main Background' },
                { name: 'Surface Black', hex: '#101014', role: 'Containers & Cards' },
                { name: 'Charcoal Border', hex: '#22222c', role: 'Subtle Hairlines' },
                { name: 'Warm Ivory', hex: '#f4f3ef', role: 'Primary Typography' },
                { name: 'Muted Graphite', hex: '#a1a1aa', role: 'Secondary Body Text' },
                { name: 'Subtle Bronze', hex: '#c5a059', role: 'Accent Highlights' },
                { name: 'Muted Champagne', hex: '#e5d3b3', role: 'Hover & Highlights' },
                { name: 'Warm Silver', hex: '#d1d5db', role: 'Metadata Tags' },
              ].map((c) => (
                <div key={c.name} className="bg-[#15151a] p-4 border border-[#22222c]">
                  <div 
                    className="w-full h-12 mb-3 border border-[#333342]" 
                    style={{ backgroundColor: c.hex }} 
                  />
                  <div className="font-serif-display text-sm text-[#f4f3ef]">{c.name}</div>
                  <div className="font-mono text-[10px] text-[#c5a059]">{c.hex}</div>
                  <div className="text-[10px] text-[#63636e] mt-1">{c.role}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Typography */}
          <section className="bg-[#101014] border border-[#22222c] p-8">
            <h2 className="font-serif-display text-2xl tracking-[0.1em] text-[#f4f3ef] mb-6 flex items-center gap-3">
              <Type className="w-5 h-5 text-[#c5a059]" />
              Dual-Family Typography System
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#15151a] p-6 border border-[#22222c]">
                <span className="text-[10px] text-[#c5a059] font-mono tracking-widest uppercase">Display Serif</span>
                <h3 className="font-serif-display text-2xl text-[#f4f3ef] my-3 font-normal">
                  Cinzel / Playfair Display
                </h3>
                <p className="text-xs text-[#a1a1aa] leading-relaxed mb-4">
                  High contrast, cinematic, literary, and architectural. Used strictly for major titles, project names, original IP, and editorial statements.
                </p>
                <div className="p-4 bg-[#08080a] border border-[#22222c] font-serif-display text-lg tracking-[0.15em] text-[#f4f3ef]">
                  THE SNAKE, PEARLS & PIGS
                </div>
              </div>

              <div className="bg-[#15151a] p-6 border border-[#22222c]">
                <span className="text-[10px] text-[#c5a059] font-mono tracking-widest uppercase">Interface Sans</span>
                <h3 className="font-sans-ui text-2xl text-[#f4f3ef] my-3 font-medium">
                  Plus Jakarta Sans / Inter
                </h3>
                <p className="text-xs text-[#a1a1aa] leading-relaxed mb-4">
                  Precise, clean, and highly legible. Used for navigation, dates, project metadata, booking interfaces, and administrative tables.
                </p>
                <div className="p-4 bg-[#08080a] border border-[#22222c] font-sans-ui text-xs tracking-[0.1em] text-[#a1a1aa] uppercase">
                  DIRECTOR OF PHOTOGRAPHY — LOS ANGELES / MEXICO CITY
                </div>
              </div>
            </div>
          </section>

          {/* Motion & 3D */}
          <section className="bg-[#101014] border border-[#22222c] p-8">
            <h2 className="font-serif-display text-2xl tracking-[0.1em] text-[#f4f3ef] mb-6 flex items-center gap-3">
              <Activity className="w-5 h-5 text-[#c5a059]" />
              Cinematic Motion Principles & 3D Spatial Canvas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#15151a] p-6 border border-[#22222c]">
                <h3 className="font-serif-display text-base text-[#f4f3ef] mb-2">Slow Image Reveals</h3>
                <p className="text-xs text-[#a1a1aa] leading-relaxed">
                  2.4-second cubic-bezier reveals mimicking slow camera shutters and analog lens focus transitions.
                </p>
              </div>

              <div className="bg-[#15151a] p-6 border border-[#22222c]">
                <h3 className="font-serif-display text-base text-[#f4f3ef] mb-2">Depth Parallax</h3>
                <p className="text-xs text-[#a1a1aa] leading-relaxed">
                  Layered foreground text and midground visuals moving at subtle camera-like velocity ratios.
                </p>
              </div>

              <div className="bg-[#15151a] p-6 border border-[#22222c]">
                <h3 className="font-serif-display text-base text-[#f4f3ef] mb-2">Spatial Archive (3D Canvas)</h3>
                <p className="text-xs text-[#a1a1aa] leading-relaxed">
                  Architectural WebGL canvas layers giving the physical feeling of navigating a gallery space.
                </p>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* TAB 5: SECURITY & EDGE */}
      {activeTab === 'security' && (
        <div className="space-y-12">
          <section className="bg-[#101014] border border-[#22222c] p-8">
            <h2 className="font-serif-display text-2xl tracking-[0.1em] text-[#f4f3ef] mb-6 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#c5a059]" />
              Security Architecture & Row Level Security (RLS)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#15151a] p-6 border border-[#22222c]">
                <h3 className="font-serif-display text-lg text-[#f4f3ef] mb-3">Supabase RLS Policy Design</h3>
                <ul className="space-y-3 text-xs text-[#a1a1aa] list-disc list-inside leading-relaxed">
                  <li><strong className="text-[#f4f3ef]">Public Reading:</strong> Unauthenticated users can strictly SELECT published projects, IP summaries, public writing, and active service listings.</li>
                  <li><strong className="text-[#f4f3ef]">Inquiry Intake:</strong> Public users can INSERT new inquiries without reading existing inbox records.</li>
                  <li><strong className="text-[#f4f3ef]">Admin Exclusive:</strong> Full CRUD operations across bookings, client records, and availability exceptions are strictly restricted to auth.uid() matching admin profiles.</li>
                </ul>
              </div>

              <div className="bg-[#15151a] p-6 border border-[#22222c]">
                <h3 className="font-serif-display text-lg text-[#f4f3ef] mb-3">Cloudflare & Domain Infrastructure</h3>
                <ul className="space-y-3 text-xs text-[#a1a1aa] list-disc list-inside leading-relaxed">
                  <li><strong className="text-[#f4f3ef]">Domain:</strong> Registered and managed at Namecheap, pointed to Cloudflare DNS.</li>
                  <li><strong className="text-[#f4f3ef]">Edge Services:</strong> SSL termination, HTTP/3 protocol, DDoS mitigation, and edge header security.</li>
                  <li><strong className="text-[#f4f3ef]">Environment Secrets:</strong> API keys and database credentials strictly isolated in environment variables.</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* TAB 6: UNBUILT INTENTIONALLY */}
      {activeTab === 'unbuilt' && (
        <div className="space-y-12">
          <section className="bg-[#101014] border border-[#c5a059]/40 p-8">
            <h2 className="font-serif-display text-2xl tracking-[0.1em] text-[#f4f3ef] mb-4 flex items-center gap-3">
              <Ban className="w-5 h-5 text-[#c5a059]" />
              Phase 1 Discipline: Intentionally Unbuilt Items
            </h2>
            <p className="text-xs text-[#a1a1aa] mb-8 leading-relaxed max-w-3xl">
              Per strict architectural guidelines for Phase 1, the following features have been intentionally NOT built yet. They will be systematically created as individual, dedicated page components in subsequent development phases.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: 'Homepage (/ route)', phase: 'Phase 2', note: 'Will be built as its own isolated cinematic flagship route.' },
                { title: 'Complete Booking System', phase: 'Phase 5', note: 'Interactive availability, service calculator, and calendar selection.' },
                { title: 'Admin Management Dashboard', phase: 'Phase 6', note: 'Protected client CRM, availability overrides, and CMS controls.' },
                { title: 'Project Case Study Pages', phase: 'Phase 3', note: 'Individual /work/[slug] cinematic gallery templates.' },
                { title: 'Original IP Scripts & Excerpts', phase: 'Phase 4', note: 'Dedicated reader experience for The Snake, Pearls & Pigs, and Viscous.' },
                { title: 'Full Single-Page Monolith', phase: 'PERMANENTLY EXCLUDED', note: 'The app will NEVER be one giant scrolling single page.' },
              ].map((item) => (
                <div key={item.title} className="bg-[#15151a] p-5 border border-[#22222c] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-serif-display text-base text-[#f4f3ef]">{item.title}</h3>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-[#22222c] text-[#c5a059]">
                        {item.phase}
                      </span>
                    </div>
                    <p className="text-xs text-[#a1a1aa]">{item.note}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#22222c] flex items-center gap-2 text-[10px] text-[#63636e] uppercase font-mono">
                    <span>Status: Pending Approval & Phase 2 Signal</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
