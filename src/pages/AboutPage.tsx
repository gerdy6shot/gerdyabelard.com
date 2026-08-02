import React from 'react';
import { motion } from 'motion/react';
import { Compass, Film, Camera, Sparkles, MapPin, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CinematicSceneHero } from '../components/cinematic/CinematicSceneHero';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#08080a] text-[#f4f3ef] pt-28 pb-24 px-6 max-w-7xl mx-auto selection:bg-[#c5a059] selection:text-[#08080a]">
      {/* STAGES 01-04: PORTRAIT / BIOGRAPHY HERO */}
      <CinematicSceneHero
        imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1600&auto=format&fit=crop"
        imageAlt="Gerdy Abelard Portrait"
        categoryBadge="WORLD 001 // DIRECTOR PROFILE"
        title="GERDY ABELARD"
        subtitle="Aesthetic Director, Film Director, Author, and Multidisciplinary Creator."
        frameStyle="gallery"
        metadata={[
          { label: 'ROLE', value: 'Aesthetic Director' },
          { label: 'BASE', value: 'LOS ANGELES • MEXICO CITY • MILAN' },
          { label: 'HOUSE', value: 'COMVIEWMEDIA' },
        ]}
      />

      {/* STAGE 05: DISCOVERY - Deep Biography */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 my-16">
        {/* Left Column - Portrait Artwork Detail */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="relative aspect-[3/4] bg-[#0d0d10] border border-[#22222c] overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop"
              alt="Gerdy Abelard Portrait Detail"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#08080a]/90 backdrop-blur-md border border-[#22222c]">
              <span className="text-[10px] font-mono text-[#c5a059] uppercase block tracking-widest">
                PRIMARY OPERATIONAL BASE
              </span>
              <span className="font-serif-display text-sm text-[#f4f3ef] uppercase tracking-wide">
                Los Angeles • Mexico City • International
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Deep Biography */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-2 space-y-8"
        >
          <div className="space-y-4">
            <h2 className="font-serif-display text-3xl sm:text-4xl text-[#f4f3ef] uppercase tracking-wide">
              Unified Creative Mind
            </h2>
            <p className="text-xs sm:text-sm text-[#a1a1aa] font-sans-ui font-light leading-relaxed">
              Gerdy Abelard is a multidisciplinary creator, filmmaker, commercial photographer, author, and technology builder. His work spans film directing, medium format photography, brand aesthetic direction, original screenplays, and human performance ventures.
            </p>
            <p className="text-xs sm:text-sm text-[#a1a1aa] font-sans-ui font-light leading-relaxed">
              Rather than operating in disconnected silos, Abelard views cinema, photography, written prose, and software engineering as different acoustic instruments performing under a single conductor.
            </p>
          </div>

          <div className="p-8 bg-[#0d0d10] border border-[#22222c] space-y-4">
            <span className="text-[10px] font-mono text-[#c5a059] uppercase tracking-widest block">
              DISCIPLINES & DOMAINS OF AUTHORITY
            </span>
            <div className="text-xs font-mono text-[#f4f3ef] space-y-2.5 border-l border-[#c5a059] pl-4">
              <p>CINEMA // Narrative & Commercial Directing (35mm Anamorphic)</p>
              <p>PHOTOGRAPHY // Medium Format Still Exhibition & Portraiture</p>
              <p>WRITING // Original Screenplays & Theoretical Monographs</p>
              <p>VENTURES // Platform Architecture, Performance & COMVIEWMEDIA</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif-display text-2xl text-[#f4f3ef] uppercase tracking-wide">
              COMVIEWMEDIA Ecosystem
            </h3>
            <p className="text-xs text-[#a1a1aa] font-sans-ui font-light leading-relaxed">
              Gerdy is the founder and director of COMVIEWMEDIA, the creative engine behind his film works and ventures including OVERHAULTRAIN, alongside ongoing research in human performance, sustainable systems, and material innovation.
            </p>
          </div>

          <div className="pt-4">
            <Link
              to="/inquire"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#f4f3ef] text-[#08080a] font-sans-ui text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#c5a059] transition-all shadow-lg"
            >
              <span>Direct Executive Contact</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

