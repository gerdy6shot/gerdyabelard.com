import React from 'react';
import { motion } from 'motion/react';
import { MOCK_PROJECTS } from '../data/mockData';
import { Sparkles, ArrowUpRight, Compass, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CinematicSceneHero } from '../components/cinematic/CinematicSceneHero';

export const CreativeDirectionPage: React.FC = () => {
  const cdProjects = MOCK_PROJECTS.filter((p) => p.category === 'creative-direction');

  return (
    <div className="min-h-screen bg-[#08080a] text-[#f4f3ef] pt-28 pb-24 px-6 max-w-7xl mx-auto selection:bg-[#c5a059] selection:text-[#08080a]">
      {/* STAGES 01-04: CREATIVE DIRECTION HERO */}
      <CinematicSceneHero
        imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1600&auto=format&fit=crop"
        imageAlt="Aesthetic Orchestration and Creative Direction"
        categoryBadge="WORLD 003 // AESTHETIC DIRECTION"
        title="CREATIVE DIRECTION"
        subtitle="Translating complex luxury, architectural, and technology brands into authoritative visual languages and immersive consumer environments."
        frameStyle="gallery"
        metadata={[
          { label: 'DIRECTOR', value: 'Gerdy Abelard' },
          { label: 'DISCIPLINE', value: 'Aesthetic Strategy & Identity' },
          { label: 'CASES', value: `${cdProjects.length} Key Commissions` },
        ]}
      />

      {/* Editorial Methodology Quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="border-l border-[#c5a059] pl-6 my-16 space-y-4 max-w-3xl"
      >
        <span className="font-mono text-xs text-[#c5a059] tracking-widest uppercase block">
          // Directorial Philosophy
        </span>
        <p className="font-serif-display text-xl sm:text-3xl text-[#f4f3ef] leading-snug">
          "Aesthetic direction is not branding. It is the synthesis of cinematography, spatial atmosphere, and narrative poise into an unassailable visual identity."
        </p>
      </motion.div>

      {/* STAGE 05: DISCOVERY - Case Studies */}
      <div className="space-y-12">
        <div className="flex items-center justify-between border-b border-[#22222c] pb-4">
          <h2 className="font-serif-display text-2xl text-[#f4f3ef] uppercase tracking-wider">
            Case Studies & Key Commissions
          </h2>
          <span className="text-[10px] font-mono text-[#8a8a8a] uppercase tracking-widest">
            {cdProjects.length} SELECTED PROJECTS
          </span>
        </div>

        {cdProjects.map((proj, idx) => (
          <motion.div
            key={proj.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: idx * 0.1 }}
            className="bg-[#0d0d10] border border-[#22222c] p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center hover:border-[#c5a059] transition-all duration-500"
          >
            <div className="space-y-4">
              <span className="text-[10px] font-mono text-[#c5a059] uppercase tracking-widest block">
                {proj.roles.join(' • ')}
              </span>
              <h3 className="font-serif-display text-3xl sm:text-4xl text-[#f4f3ef] uppercase tracking-wide">{proj.title}</h3>
              <p className="font-serif-display text-base text-[#c5a059] italic font-light">"{proj.subtitle}"</p>
              <p className="text-xs sm:text-sm text-[#a1a1aa] font-sans-ui leading-relaxed font-light">{proj.description}</p>
              <div className="pt-2">
                <Link
                  to={`/work/${proj.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#121218] border border-[#22222c] text-[#f4f3ef] text-xs font-mono uppercase tracking-widest hover:border-[#c5a059] hover:text-[#c5a059] transition-all"
                >
                  <span>Explore Case Study</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="aspect-[16/10] bg-[#08080a] border border-[#22222c] overflow-hidden">
              <img
                src={proj.hero_image_url}
                alt={proj.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

