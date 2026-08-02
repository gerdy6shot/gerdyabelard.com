import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Grid, List, Sparkles, ArrowUpRight, Play, Film, Layers, ChevronRight, Eye, Clock, LayoutGrid, Image as ImageIcon } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { MOCK_PROJECTS } from '../data/mockData';
import { DbArchiveProject, ArchiveCategory } from '../types/database';
import { PageReveal } from '../components/cinematic/PageReveal';

import { CinematicSceneHero } from '../components/cinematic/CinematicSceneHero';

export const WorkArchive: React.FC = () => {
  const [projects, setProjects] = useState<DbArchiveProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'gallery' | 'timeline' | 'editorial' | 'contact-sheet'>('gallery');
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  // Fetch projects from Supabase with Mock Data Fallback
  useEffect(() => {
    const fetchArchive = async () => {
      setLoading(true);
      try {
        if (supabase) {
          const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('status', 'published')
            .order('year', { ascending: false });

          if (!error && data && data.length > 0) {
            setProjects(data as DbArchiveProject[]);
            setLoading(false);
            return;
          }
        }

        // Fallback to rich mock archive items
        const fallbackProjects: DbArchiveProject[] = MOCK_PROJECTS.map((p) => ({
          id: p.id,
          title: p.title,
          slug: p.slug,
          category: (p.category as ArchiveCategory) || 'Film',
          year: p.release_year,
          client: p.client_id || 'GERDY ABELARD STUDIO',
          short_description: p.description,
          featured: p.is_featured,
          cover_image: p.hero_image_url,
          hero_image: p.hero_image_url,
          status: 'published',
          created_at: p.created_at,
          updated_at: p.created_at,
        }));

        setProjects(fallbackProjects);
      } catch (err) {
        console.error('Error loading director archive:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArchive();
  }, []);

  const categories = [
    'ALL',
    'Film',
    'Music Video',
    'Commercial',
    'Documentary',
    'Photography',
    'Original IP',
    'Creative Direction',
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = selectedCategory === 'ALL' || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.client && project.client.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (project.short_description && project.short_description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredProject = projects.find((p) => p.featured) || projects[0];

  return (
    <div className="min-h-screen bg-[#08080a] text-[#f4f3ef] pt-28 pb-32 selection:bg-[#c5a059] selection:text-[#08080a]">
      {/* Archive Ambient Glow & Grid Backdrop */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#181820]/30 via-[#08080a] to-[#08080a] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-12">
        {/* STAGES 01-04: ARCHIVAL VAULT HERO */}
        <CinematicSceneHero
          imageUrl="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1600&auto=format&fit=crop"
          imageAlt="Archival Gallery Vault"
          categoryBadge="WORLD 002 // MASTERWORK ARCHIVE"
          title="ARCHIVE"
          subtitle="A permanent record of narrative films, commercial direction, visual worldbuilding, medium format photography, and theoretical treatises by Gerdy Abelard."
          frameStyle="gallery"
          metadata={[
            { label: 'CATALOGUE', value: `${filteredProjects.length} Masterworks` },
            { label: 'CURATOR', value: 'GERDY ABELARD' },
            { label: 'RANGE', value: '2019 — PRESENT' },
          ]}
        />

        {/* Featured Masterwork Hero Banner (If Available) */}
        {featuredProject && !searchQuery && selectedCategory === 'ALL' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative bg-[#0d0d10] border border-[#22222c] overflow-hidden group"
          >
            <Link to={`/projects/${featuredProject.slug}`} className="block">
              <div className="relative aspect-[21/9] sm:aspect-[21/8] bg-[#121218] overflow-hidden">
                <img
                  src={featuredProject.hero_image || featuredProject.cover_image || ''}
                  alt={featuredProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/40 to-transparent" />

                <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1 bg-[#08080a]/80 backdrop-blur-md border border-[#22222c]">
                  <Sparkles className="w-3 h-3 text-[#c5a059]" />
                  <span className="text-[10px] font-mono tracking-[0.25em] text-[#c5a059] uppercase">
                    FEATURED MASTERWORK
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                  <div className="space-y-2 max-w-2xl">
                    <span className="text-[10px] font-mono text-[#8a8a8a] tracking-[0.3em] uppercase block">
                      {featuredProject.category} // {featuredProject.year}
                    </span>
                    <h2 className="font-serif-display text-3xl sm:text-5xl text-[#ffffff] uppercase tracking-wide group-hover:text-[#c5a059] transition-colors">
                      {featuredProject.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#d1d5db] font-sans-ui font-light line-clamp-2">
                      {featuredProject.short_description}
                    </p>
                  </div>

                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#c5a059] text-[#08080a] font-mono text-xs uppercase tracking-widest font-semibold group-hover:bg-[#d5b069] transition-all">
                      <span>Enter Vault Entry</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Filter and View Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-[#0d0d10] p-4 sm:p-6 border border-[#22222c]">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 text-xs uppercase tracking-wider font-mono">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 border transition-all ${
                  selectedCategory === cat
                    ? 'border-[#c5a059] bg-[#181820] text-[#c5a059]'
                    : 'border-[#22222c] text-[#8a8a8a] hover:border-[#333342] hover:text-[#f4f3ef]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & Layout Selector */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 lg:w-72">
              <Search className="w-4 h-4 text-[#8a8a8a] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search vault works..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#121218] border border-[#22222c] pl-10 pr-4 py-2 text-xs text-[#f4f3ef] placeholder-[#63636e] font-mono focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            <div className="flex border border-[#22222c]">
              <button
                onClick={() => setViewMode('gallery')}
                className={`px-3 py-2 text-[10px] font-mono uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
                  viewMode === 'gallery' ? 'bg-[#181820] text-[#c5a059]' : 'text-[#63636e] hover:text-[#f4f3ef]'
                }`}
                title="Gallery Wall"
              >
                <Grid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Gallery Wall</span>
              </button>
              <button
                onClick={() => setViewMode('timeline')}
                className={`px-3 py-2 text-[10px] font-mono uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
                  viewMode === 'timeline' ? 'bg-[#181820] text-[#c5a059]' : 'text-[#63636e] hover:text-[#f4f3ef]'
                }`}
                title="Timeline Mode"
              >
                <Clock className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Timeline</span>
              </button>
              <button
                onClick={() => setViewMode('editorial')}
                className={`px-3 py-2 text-[10px] font-mono uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
                  viewMode === 'editorial' ? 'bg-[#181820] text-[#c5a059]' : 'text-[#63636e] hover:text-[#f4f3ef]'
                }`}
                title="Editorial Presentation"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Editorial</span>
              </button>
              <button
                onClick={() => setViewMode('contact-sheet')}
                className={`px-3 py-2 text-[10px] font-mono uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
                  viewMode === 'contact-sheet' ? 'bg-[#181820] text-[#c5a059]' : 'text-[#63636e] hover:text-[#f4f3ef]'
                }`}
                title="Film Contact Sheet"
              >
                <Film className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Contact Sheet</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Project Display */}
        {loading ? (
          <div className="py-24 text-center font-mono text-xs text-[#8a8a8a] space-y-3">
            <div className="w-6 h-6 border-2 border-[#c5a059] border-t-transparent rounded-full animate-spin mx-auto" />
            <div>OPENING DIRECTOR VAULT RECORDS...</div>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="p-16 text-center bg-[#0d0d10] border border-[#22222c] font-mono text-xs text-[#8a8a8a] space-y-2">
            <Layers className="w-8 h-8 text-[#555562] mx-auto" />
            <div>NO VAULT ENTRIES MATCH THE SPECIFIED CRITERIA.</div>
          </div>
        ) : viewMode === 'gallery' ? (
          /* GALLERY WALL MODE */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                <Link
                  to={`/projects/${project.slug}`}
                  onMouseEnter={() => setHoveredProjectId(project.id)}
                  onMouseLeave={() => setHoveredProjectId(null)}
                  className="group bg-[#0d0d10] border border-[#22222c] overflow-hidden transition-all duration-500 hover:border-[#c5a059] flex flex-col justify-between h-full"
                >
                  <div className="relative aspect-[16/10] bg-[#121218] overflow-hidden">
                    <img
                      src={project.hero_image || project.cover_image || ''}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                    <div className="absolute top-4 left-4 bg-[#08080a]/90 backdrop-blur-md px-3 py-1 border border-[#22222c]">
                      <span className="text-[10px] font-mono tracking-widest text-[#c5a059] uppercase">
                        {project.category}
                      </span>
                    </div>

                    <div className="absolute bottom-4 right-4 bg-[#08080a]/90 backdrop-blur-md px-2.5 py-1 border border-[#22222c] font-mono text-[10px] text-[#f4f3ef]">
                      {project.year}
                    </div>
                  </div>

                  <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[10px] font-mono text-[#8a8a8a] uppercase tracking-wider">
                        <span>CLIENT: {project.client || 'GERDY ABELARD STUDIO'}</span>
                      </div>
                      <h3 className="font-serif-display text-2xl text-[#f4f3ef] group-hover:text-[#c5a059] transition-colors uppercase tracking-wide">
                        {project.title}
                      </h3>
                      <p className="text-xs text-[#a1a1aa] leading-relaxed line-clamp-2 font-sans-ui font-light">
                        {project.short_description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#1c1c24] flex items-center justify-between font-mono text-xs text-[#8a8a8a]">
                      <span className="group-hover:text-[#f4f3ef] transition-colors">DIRECTOR FILE</span>
                      <ArrowUpRight className="w-4 h-4 text-[#c5a059] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : viewMode === 'timeline' ? (
          /* TIMELINE MODE */
          <div className="space-y-6 relative border-l border-[#22222c] pl-6 ml-4">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                className="relative group"
              >
                <div className="absolute -left-[31px] top-6 w-2.5 h-2.5 rounded-full bg-[#22222c] group-hover:bg-[#c5a059] transition-colors border-2 border-[#08080a]" />
                <Link
                  to={`/projects/${project.slug}`}
                  className="block bg-[#0d0d10] border border-[#22222c] p-6 hover:border-[#c5a059] transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono text-[#c5a059] uppercase tracking-widest">
                          {project.year} // {project.category}
                        </span>
                      </div>
                      <h3 className="font-serif-display text-xl text-[#f4f3ef] group-hover:text-[#c5a059] transition-colors uppercase">
                        {project.title}
                      </h3>
                      <p className="text-xs text-[#a1a1aa] font-sans-ui font-light max-w-xl line-clamp-1">
                        {project.short_description}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-mono text-[#8a8a8a] shrink-0">
                      <span className="text-[10px] uppercase">{project.client || 'STUDIO MASTER'}</span>
                      <ArrowUpRight className="w-4 h-4 text-[#c5a059]" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : viewMode === 'editorial' ? (
          /* EDITORIAL MODE */
          <div className="space-y-16">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <Link
                  to={`/projects/${project.slug}`}
                  className="group block bg-[#0d0d10] border border-[#22222c] overflow-hidden hover:border-[#c5a059] transition-all"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-8 sm:p-12">
                    <div className="relative aspect-[16/10] bg-[#121218] overflow-hidden border border-[#22222c]">
                      <img
                        src={project.hero_image || project.cover_image || ''}
                        alt={project.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      />
                    </div>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono text-[#c5a059] uppercase tracking-[0.3em] block">
                          CHAPTER {idx + 1} // {project.category} ({project.year})
                        </span>
                        <h2 className="font-serif-display text-3xl sm:text-5xl text-[#ffffff] uppercase tracking-wide group-hover:text-[#c5a059] transition-colors">
                          {project.title}
                        </h2>
                      </div>
                      <p className="text-sm text-[#d1d5db] font-sans-ui font-light leading-relaxed">
                        {project.short_description}
                      </p>
                      <div className="pt-4 border-t border-[#1c1c24] flex items-center justify-between font-mono text-xs text-[#c5a059]">
                        <span>ENTER EDITORIAL SCREENING &rarr;</span>
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          /* CONTACT SHEET MODE */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.02 }}
              >
                <Link
                  to={`/projects/${project.slug}`}
                  className="group block bg-[#0d0d10] border border-[#22222c] p-2 hover:border-[#c5a059] transition-all text-center space-y-2"
                >
                  <div className="aspect-[4/3] bg-[#121218] overflow-hidden border border-[#1a1a22]">
                    <img
                      src={project.hero_image || project.cover_image || ''}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[8px] font-mono text-[#c5a059] block tracking-widest">
                      FRAME {idx + 1}
                    </span>
                    <h4 className="font-serif-display text-xs text-[#f4f3ef] truncate group-hover:text-[#c5a059] transition-colors">
                      {project.title}
                    </h4>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
