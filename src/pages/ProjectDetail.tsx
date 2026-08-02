import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ArrowUpRight,
  Play,
  Film,
  Camera,
  FileText,
  Clapperboard,
  Compass,
  Download,
  Share2,
  Sparkles,
  Layers,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { MOCK_PROJECTS } from '../data/mockData';
import {
  DbArchiveProject,
  DbArchiveProjectRole,
  DbArchiveProjectMedia,
  DbArchiveProjectDocument,
} from '../types/database';
import { PageReveal } from '../components/cinematic/PageReveal';

export const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();

  const [project, setProject] = useState<DbArchiveProject | null>(null);
  const [roles, setRoles] = useState<DbArchiveProjectRole[]>([]);
  const [media, setMedia] = useState<DbArchiveProjectMedia[]>([]);
  const [documents, setDocuments] = useState<DbArchiveProjectDocument[]>([]);
  const [loading, setLoading] = useState(true);

  // Determine active sub-tab from path segment
  const pathParts = location.pathname.split('/');
  const lastPart = pathParts[pathParts.length - 1];

  let activeTab = 'overview';
  if (['treatment', 'film', 'production', 'bts', 'notes', 'documents'].includes(lastPart)) {
    activeTab = lastPart;
  }

  useEffect(() => {
    const fetchProjectDetails = async () => {
      setLoading(true);
      try {
        if (supabase && slug) {
          const { data: projData, error: projErr } = await supabase
            .from('projects')
            .select('*')
            .eq('slug', slug)
            .single();

          if (!projErr && projData) {
            setProject(projData as DbArchiveProject);

            // Fetch relations
            const [rolesRes, mediaRes, docsRes] = await Promise.all([
              supabase.from('project_roles').select('*').eq('project_id', projData.id).order('display_order'),
              supabase.from('project_media').select('*').eq('project_id', projData.id).order('display_order'),
              supabase.from('project_documents').select('*').eq('project_id', projData.id),
            ]);

            if (rolesRes.data) setRoles(rolesRes.data as DbArchiveProjectRole[]);
            if (mediaRes.data) setMedia(mediaRes.data as DbArchiveProjectMedia[]);
            if (docsRes.data) setDocuments(docsRes.data as DbArchiveProjectDocument[]);

            setLoading(false);
            return;
          }
        }

        // Fallback to MOCK_PROJECTS
        const mockP = MOCK_PROJECTS.find((p) => p.slug === slug) || MOCK_PROJECTS[0];
        setProject({
          id: mockP.id,
          title: mockP.title,
          slug: mockP.slug,
          category: (mockP.category as any) || 'Film',
          year: mockP.release_year,
          client: mockP.client_id || 'GERDY ABELARD STUDIO',
          short_description: mockP.description,
          featured: mockP.is_featured,
          cover_image: mockP.hero_image_url,
          hero_image: mockP.hero_image_url,
          status: 'published',
          created_at: mockP.created_at,
          updated_at: mockP.created_at,
        });

        // Mock roles & media
        const mockRoles: DbArchiveProjectRole[] = [
          { id: '1', project_id: mockP.id, role_name: 'Directed by', person_name: 'GERDY ABELARD', display_order: 1, created_at: '' },
          { id: '2', project_id: mockP.id, role_name: 'Written by', person_name: 'GERDY ABELARD', display_order: 2, created_at: '' },
          { id: '3', project_id: mockP.id, role_name: 'Treatment by', person_name: 'GERDY ABELARD', display_order: 3, created_at: '' },
          { id: '4', project_id: mockP.id, role_name: 'Produced by', person_name: 'GERDY ABELARD STUDIO', display_order: 4, created_at: '' },
          { id: '5', project_id: mockP.id, role_name: 'Creative Direction', person_name: 'GERDY ABELARD STUDIO', display_order: 5, created_at: '' },
          { id: '6', project_id: mockP.id, role_name: 'Production Company', person_name: 'COMVIEWMEDIA CINEMA', display_order: 6, created_at: '' },
        ];
        setRoles(mockRoles);

        const mockMedia: DbArchiveProjectMedia[] = (mockP.behind_the_scenes || []).map((bts, idx) => ({
          id: `m-${idx}`,
          project_id: mockP.id,
          media_type: 'behind_the_scenes',
          media_url: bts.url,
          caption: bts.caption,
          display_order: idx + 1,
          created_at: '',
        }));
        setMedia(mockMedia);
      } catch (err) {
        console.error('Error fetching project detail:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [slug]);

  if (loading || !project) {
    return (
      <div className="min-h-screen bg-[#08080a] text-[#f5f5f5] pt-32 pb-32 flex flex-col items-center justify-center font-mono text-xs text-[#8a8a8a] space-y-4">
        <div className="w-8 h-8 border-2 border-[#c5a059] border-t-transparent rounded-full animate-spin" />
        <div>OPENING CINEMATIC ARCHIVE ENTRY...</div>
      </div>
    );
  }

  // Get matching mock project for deep treatment data if available
  const mockRef = MOCK_PROJECTS.find((p) => p.slug === slug) || MOCK_PROJECTS[0];

  const treatment = mockRef.treatment || {
    concept: 'Architectural investigation into physical permanence, urban isolation, and time.',
    emotional_direction: 'High-tension stillness, contemplative restraint, brutalist geometry.',
    visual_language: 'Panavision 35mm anamorphic glass, shadow geometry, Kodak Double-X stock.',
    references: ['Andrei Tarkovsky - Stalker', 'Tadao Ando Brutalism', 'Michelangelo Antonioni'],
    themes: ['Architectural Isolation', 'Memory and Structure', 'Temporal Decay'],
    characters: ['The Observer', 'The Archivist'],
    environments: ['Brutalist Vaults', 'Monolith Structures'],
  };

  const production = mockRef.production_details || {
    locations: ['Tokyo', 'Mexico City', 'Milan'],
    wardrobe: 'Architectural silhouettes, raw silk, custom tailored minimalist garments',
    cinematography_approach: 'Panavision 35mm Anamorphic with Kodak Double-X stock',
    camera_specs: 'ARRIFLEX 435 35mm Motion Picture Camera with Prime Lenses',
  };

  const notes = mockRef.director_notes || [
    'We permitted every camera hold to rest 12 seconds longer than conventional narrative editing.',
    'The concrete structure is not a backdrop; it functions as the principal antagonist.',
    'Atmospheric room tone was recorded live on location to preserve subterranean silence.',
  ];

  const basePath = `/projects/${project.slug}`;

  return (
    <div className="min-h-screen bg-[#08080a] text-[#f5f5f5] pt-28 pb-32 selection:bg-[#c5a059] selection:text-[#08080a]">
      {/* Top Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-6 mb-8 flex items-center justify-between border-b border-[#1c1c24] pb-4">
        <Link
          to="/archive"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#8a8a8a] hover:text-[#c5a059] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Director Archive</span>
        </Link>
        <span className="text-[10px] font-mono text-[#8a8a8a] uppercase tracking-[0.3em]">
          ENTRY // RELEASE {project.year}
        </span>
      </div>

      {/* Main Project Title Header */}
      <PageReveal className="max-w-7xl mx-auto px-6 mb-12 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#22222c] pb-8">
          <div className="space-y-3">
            <span className="text-[10px] font-mono tracking-[0.35em] text-[#c5a059] uppercase block">
              // {project.category}
            </span>
            <h1 className="font-serif-display text-4xl sm:text-7xl lg:text-8xl text-[#ffffff] uppercase tracking-[0.08em] font-normal leading-none">
              {project.title}
            </h1>
          </div>

          <div className="flex flex-col gap-2 font-mono text-xs text-[#8a8a8a] uppercase tracking-widest text-left lg:text-right">
            <div>YEAR: {project.year}</div>
            <div>CLIENT: {project.client || 'GERDY ABELARD STUDIO'}</div>
          </div>
        </div>

        {/* Master Director Credits Breakdown Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 p-6 bg-[#0d0d10] border border-[#22222c] font-mono text-[10px] uppercase tracking-wider">
          {roles.map((role, idx) => (
            <div key={idx} className="space-y-1">
              <span className="text-[#8a8a8a] block text-[9px]">{role.role_name}</span>
              <span className="text-[#f5f5f5] font-semibold block truncate">{role.person_name}</span>
            </div>
          ))}
        </div>
      </PageReveal>

      {/* Director Lens Sub-Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-6 mb-12 border-b border-[#22222c]">
        <div className="flex items-center gap-6 overflow-x-auto pb-4 scrollbar-none font-mono text-xs uppercase tracking-[0.25em]">
          <Link
            to={basePath}
            className={`transition-colors whitespace-nowrap pb-2 border-b-2 ${
              activeTab === 'overview'
                ? 'border-[#c5a059] text-[#c5a059]'
                : 'border-transparent text-[#8a8a8a] hover:text-[#f5f5f5]'
            }`}
          >
            OVERVIEW
          </Link>
          <Link
            to={`${basePath}/treatment`}
            className={`transition-colors whitespace-nowrap pb-2 border-b-2 ${
              activeTab === 'treatment'
                ? 'border-[#c5a059] text-[#c5a059]'
                : 'border-transparent text-[#8a8a8a] hover:text-[#f5f5f5]'
            }`}
          >
            CONCEPT / TREATMENT
          </Link>
          <Link
            to={`${basePath}/film`}
            className={`transition-colors whitespace-nowrap pb-2 border-b-2 ${
              activeTab === 'film'
                ? 'border-[#c5a059] text-[#c5a059]'
                : 'border-transparent text-[#8a8a8a] hover:text-[#f5f5f5]'
            }`}
          >
            FINAL FILM
          </Link>
          <Link
            to={`${basePath}/production`}
            className={`transition-colors whitespace-nowrap pb-2 border-b-2 ${
              activeTab === 'production'
                ? 'border-[#c5a059] text-[#c5a059]'
                : 'border-transparent text-[#8a8a8a] hover:text-[#f5f5f5]'
            }`}
          >
            PRODUCTION SPECS
          </Link>
          <Link
            to={`${basePath}/bts`}
            className={`transition-colors whitespace-nowrap pb-2 border-b-2 ${
              activeTab === 'bts'
                ? 'border-[#c5a059] text-[#c5a059]'
                : 'border-transparent text-[#8a8a8a] hover:text-[#f5f5f5]'
            }`}
          >
            BEHIND THE SCENES ({media.length})
          </Link>
          <Link
            to={`${basePath}/notes`}
            className={`transition-colors whitespace-nowrap pb-2 border-b-2 ${
              activeTab === 'notes'
                ? 'border-[#c5a059] text-[#c5a059]'
                : 'border-transparent text-[#8a8a8a] hover:text-[#f5f5f5]'
            }`}
          >
            DIRECTOR NOTES
          </Link>
        </div>
      </div>

      {/* Dynamic View Content */}
      <div className="max-w-7xl mx-auto px-6">
        <AnimatePresence mode="wait">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-16"
            >
              {/* Full-Bleed Opening Image Frame */}
              <div className="relative aspect-[21/9] sm:aspect-[21/9] bg-[#0d0d10] border border-[#22222c] overflow-hidden group">
                <img
                  src={project.hero_image || project.cover_image || ''}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter contrast-125 brightness-90 group-hover:scale-102 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-transparent to-transparent opacity-80" />
              </div>

              {/* Narrative Summary */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-6">
                  <span className="text-[10px] font-mono tracking-[0.3em] text-[#c5a059] uppercase block">
                    // CREATIVE ARCHIVE SUMMARY
                  </span>
                  <p className="text-base sm:text-lg text-[#d1d5db] font-sans-ui font-light leading-relaxed whitespace-pre-line">
                    {project.short_description}
                  </p>
                </div>

                <div className="p-6 bg-[#0d0d10] border border-[#22222c] space-y-6 font-mono text-xs">
                  <span className="text-[#c5a059] uppercase tracking-widest block border-b border-[#22222c] pb-3">
                    ARCHIVE RECORD SPECS
                  </span>
                  <div>
                    <span className="text-[#8a8a8a] block text-[10px] uppercase mb-1">CLIENT / SPONSOR</span>
                    <span className="text-[#f5f5f5]">{project.client || 'GERDY ABELARD STUDIO'}</span>
                  </div>
                  <div>
                    <span className="text-[#8a8a8a] block text-[10px] uppercase mb-1">RELEASE YEAR</span>
                    <span className="text-[#f5f5f5]">{project.year}</span>
                  </div>
                  <div>
                    <span className="text-[#8a8a8a] block text-[10px] uppercase mb-1">CATEGORY</span>
                    <span className="text-[#c5a059]">{project.category}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: TREATMENT & CONCEPT */}
          {activeTab === 'treatment' && (
            <motion.div
              key="treatment"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-12"
            >
              <div className="p-8 bg-[#0d0d10] border border-[#22222c] space-y-8">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono tracking-[0.3em] text-[#c5a059] uppercase block">
                    DIRECTOR TREATMENT DOCUMENT // CONFIDENTIAL
                  </span>
                  <h2 className="font-serif-display text-3xl sm:text-4xl text-[#f5f5f5] uppercase tracking-wide">
                    Original Concept & Visual Language
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-[#22222c]">
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-[#c5a059] uppercase tracking-widest block">CORE CONCEPT</span>
                    <p className="text-sm text-[#d1d5db] font-light leading-relaxed">{treatment.concept}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-[#c5a059] uppercase tracking-widest block">EMOTIONAL DIRECTION</span>
                    <p className="text-sm text-[#d1d5db] font-light leading-relaxed">{treatment.emotional_direction}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-[#c5a059] uppercase tracking-widest block">VISUAL LANGUAGE</span>
                    <p className="text-sm text-[#d1d5db] font-light leading-relaxed">{treatment.visual_language}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-[#c5a059] uppercase tracking-widest block">CINEMATIC REFERENCES</span>
                    <ul className="space-y-1 text-xs text-[#a1a1aa] font-mono">
                      {treatment.references.map((ref) => (
                        <li key={ref}>• {ref}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {treatment.themes && (
                  <div className="pt-6 border-t border-[#22222c] space-y-3">
                    <span className="text-xs font-mono text-[#c5a059] uppercase tracking-widest block">EXPLORED THEMES</span>
                    <div className="flex flex-wrap gap-2">
                      {treatment.themes.map((theme) => (
                        <span key={theme} className="px-3 py-1 bg-[#181820] border border-[#22222c] text-xs font-mono text-[#f5f5f5]">
                          {theme}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* TAB 3: FINAL FILM */}
          {activeTab === 'film' && (
            <motion.div
              key="film"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="relative aspect-[16/9] bg-[#0d0d10] border border-[#22222c] overflow-hidden flex items-center justify-center">
                <div className="text-center space-y-4 p-8">
                  <Clapperboard className="w-12 h-12 text-[#c5a059] mx-auto" />
                  <span className="font-mono text-xs uppercase tracking-widest text-[#a1a1aa] block">
                    ARCHIVAL SCREENING PRINT // PRIVATE EXHIBITION
                  </span>
                  <p className="text-sm text-[#8a8a8a] max-w-md mx-auto">
                    Full cinematic master print reserved for studio screening requests.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: PRODUCTION & SPECS */}
          {activeTab === 'production' && (
            <motion.div
              key="production"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-8 bg-[#0d0d10] border border-[#22222c] space-y-8"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-mono tracking-[0.3em] text-[#c5a059] uppercase block">
                  TECHNICAL PRODUCTION SPECIFICATIONS
                </span>
                <h2 className="font-serif-display text-3xl sm:text-4xl text-[#f5f5f5] uppercase tracking-wide">
                  Camera, Lenses & On-Set Execution
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-[#22222c] font-mono text-xs">
                <div className="space-y-2">
                  <span className="text-[#c5a059] uppercase tracking-widest block">LOCATIONS</span>
                  <div className="text-[#d1d5db]">{production.locations.join(' • ')}</div>
                </div>
                <div className="space-y-2">
                  <span className="text-[#c5a059] uppercase tracking-widest block">CINEMATOGRAPHY APPROACH</span>
                  <div className="text-[#d1d5db]">{production.cinematography_approach}</div>
                </div>
                {production.camera_specs && (
                  <div className="space-y-2">
                    <span className="text-[#c5a059] uppercase tracking-widest block">CAMERA & GLASS</span>
                    <div className="text-[#d1d5db]">{production.camera_specs}</div>
                  </div>
                )}
                <div className="space-y-2">
                  <span className="text-[#c5a059] uppercase tracking-widest block">WARDROBE & STYLING</span>
                  <div className="text-[#d1d5db]">{production.wardrobe}</div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 5: BEHIND THE SCENES */}
          {activeTab === 'bts' && (
            <motion.div
              key="bts"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {media.length > 0 ? (
                media.map((item, idx) => (
                  <div key={idx} className="space-y-3 bg-[#0d0d10] p-4 border border-[#22222c]">
                    <div className="aspect-[4/3] bg-[#08080a] border border-[#22222c] overflow-hidden">
                      <img
                        src={item.media_url}
                        alt={item.caption || 'BTS Still'}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover filter grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                      />
                    </div>
                    {item.caption && (
                      <p className="font-mono text-xs text-[#a1a1aa] leading-relaxed">
                        [FRAME {idx + 1}] {item.caption}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <div className="col-span-2 py-12 text-center border border-dashed border-[#22222c] font-mono text-xs text-[#8a8a8a]">
                  NO BEHIND-THE-SCENES STILLS ATTACHED TO THIS ENTRY YET.
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 6: DIRECTOR NOTES */}
          {activeTab === 'notes' && (
            <motion.div
              key="notes"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-8 bg-[#0d0d10] border border-[#22222c] space-y-6"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-mono tracking-[0.3em] text-[#c5a059] uppercase block">
                  PERSONAL DIRECTOR JOURNAL EXCERPTS
                </span>
                <h2 className="font-serif-display text-3xl sm:text-4xl text-[#f5f5f5] uppercase tracking-wide">
                  Director's Log & Pacing Directives
                </h2>
              </div>

              <div className="space-y-4 pt-6 border-t border-[#22222c]">
                {notes.map((note, idx) => (
                  <div key={idx} className="p-6 bg-[#08080a] border border-[#22222c] font-serif-display text-lg text-[#f5f5f5] italic leading-relaxed">
                    "{note}"
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
