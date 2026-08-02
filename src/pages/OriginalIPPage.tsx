import React from 'react';
import { motion } from 'motion/react';
import { MOCK_IP } from '../data/mockData';
import { Sparkles, Film, FileText, ArrowUpRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CinematicSceneHero } from '../components/cinematic/CinematicSceneHero';

export const OriginalIPPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#08080a] text-[#f4f3ef] pt-28 pb-24 px-6 max-w-7xl mx-auto selection:bg-[#c5a059] selection:text-[#08080a]">
      {/* STAGES 01-04: HERO VISUAL & TYPOGRAPHY REVEAL */}
      <CinematicSceneHero
        imageUrl="https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1600&auto=format&fit=crop"
        imageAlt="Original Intellectual Property & Dramatic Screenplays"
        categoryBadge="WORLD 007 // NARRATIVE INTELLECTUAL PROPERTY"
        title="ORIGINAL IP"
        subtitle="Proprietary dramatic feature screenplays, series formats, and speculative narratives created and authored by Gerdy Abelard."
        frameStyle="gallery"
        metadata={[
          { label: 'AUTHOR', value: 'Gerdy Abelard' },
          { label: 'CATALOGUE', value: `${MOCK_IP.length} Original Screenplays & Formats` },
          { label: 'RIGHTS', value: 'COMVIEWMEDIA CINEMA' },
        ]}
      />

      {/* IP Catalog */}
      <div className="space-y-16">
        <div className="flex items-center justify-between border-b border-[#22222c] pb-4">
          <h2 className="font-serif-display text-2xl text-[#f4f3ef] uppercase tracking-wider">
            Screenplays & Formats Catalogue
          </h2>
          <span className="text-[10px] font-mono text-[#8a8a8a] uppercase tracking-widest">
            {MOCK_IP.length} TITLES
          </span>
        </div>

        {MOCK_IP.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: idx * 0.15 }}
            className="bg-[#0d0d10] border border-[#22222c] p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center hover:border-[#c5a059] transition-all duration-500"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono text-[#c5a059] uppercase tracking-widest px-3 py-1 bg-[#121218] border border-[#22222c]">
                  {item.type}
                </span>
                <span className="text-[10px] font-mono text-[#8a8a8a] uppercase tracking-widest">
                  Status: {item.status}
                </span>
              </div>

              <h2 className="font-serif-display text-3xl sm:text-5xl text-[#f4f3ef] uppercase tracking-[0.05em]">
                {item.title}
              </h2>

              <p className="font-serif-display text-lg text-[#c5a059] italic font-light">
                "{item.tagline}"
              </p>

              <div>
                <span className="text-[10px] font-mono text-[#8a8a8a] uppercase tracking-widest block mb-1">
                  Logline
                </span>
                <p className="text-xs sm:text-sm text-[#a1a1aa] font-sans-ui leading-relaxed font-light">
                  {item.logline}
                </p>
              </div>

              <div className="p-5 bg-[#08080a] border border-[#22222c] space-y-2">
                <span className="text-[10px] font-mono text-[#c5a059] uppercase tracking-widest block">
                  Script Excerpt Preview
                </span>
                <p className="font-mono text-xs text-[#d1d5db] whitespace-pre-line leading-relaxed">
                  {item.excerpt}
                </p>
              </div>

              <div className="pt-2">
                <Link
                  to="/inquire"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#f4f3ef] text-[#08080a] text-xs font-sans-ui uppercase tracking-[0.2em] font-semibold hover:bg-[#c5a059] transition-all shadow-md"
                >
                  <span>Inquire IP Option / Licensing</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="relative aspect-[4/3] bg-[#08080a] border border-[#22222c] overflow-hidden group">
              <img
                src={item.cover_image_url}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter contrast-125 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-transparent to-transparent opacity-80" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

