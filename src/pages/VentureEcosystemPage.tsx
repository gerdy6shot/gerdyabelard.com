import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Compass, Layers, Sparkles, Globe, Cpu, Sprout, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CinematicSceneHero } from '../components/cinematic/CinematicSceneHero';

export const VentureEcosystemPage: React.FC = () => {
  const currentWorlds = [
    {
      id: 'comviewmedia',
      name: 'COMVIEWMEDIA',
      role: 'CREATIVE STUDIO & UMBRELLA MEDIA HOUSE',
      headline: 'Narrative Cinema, Medium Format Stills & Visual Worldbuilding',
      description:
        'The foundational creative studio for narrative films, commercial direction, photography, and original intellectual property created and directed by Gerdy Abelard.',
      link: '/archive',
      linkText: 'EXPLORE ARCHIVE & FILM',
      heroImage: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1600&auto=format&fit=crop',
      pillars: ['Narrative Motion Pictures', 'Medium Format Stills', 'Brand Strategy & Creative Direction', 'Original IP Publishing'],
    },
    {
      id: 'overhaultrain',
      name: 'OVERHAULTRAIN',
      role: 'HUMAN PERFORMANCE PLATFORM',
      headline: 'Athletic Intelligence, Physical Optimization & Tactical Training Protocols',
      description:
        'A specialized human performance and physical optimization platform engineering protocols for elite athletic training and holistic physical readiness.',
      url: 'https://overhaultrain.com',
      linkText: 'ACCESS PLATFORM',
      heroImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1600&auto=format&fit=crop',
      pillars: ['High-Performance Conditioning', 'Tactile Training Protocols', 'Human Kinetics Research', 'Athletic Mindset Engineering'],
    },
  ];

  const researchDisciplines = [
    {
      code: 'DISCIPLINE 01',
      title: 'Agricultural Systems & Sustainable Cultivation',
      description: 'Research into high-yield, closed-loop agrarian technology and ecological land management protocols.',
      icon: Sprout,
    },
    {
      code: 'DISCIPLINE 02',
      title: 'Natural Resource Intelligence & Supply Chain',
      description: 'Strategic frameworks mapping cross-continental material flows, sustainable extraction, and distribution resilience.',
      icon: Globe,
    },
    {
      code: 'DISCIPLINE 03',
      title: 'Advanced Nutrition & Human Performance Research',
      description: 'Bio-nutritional formulations and metabolic optimization studies designed for demanding physiological environments.',
      icon: Cpu,
    },
    {
      code: 'DISCIPLINE 04',
      title: 'Material Innovation & Tactile Design',
      description: 'Synthesizing novel textile composites, architectural scale modeling, and enduring material craftsmanship.',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="min-h-screen bg-[#08080a] text-[#f4f3ef] pt-28 pb-32 px-6 max-w-7xl mx-auto selection:bg-[#c5a059] selection:text-[#08080a]">
      {/* STAGES 01-04: ATMOSPHERIC ECOSYSTEM HERO */}
      <CinematicSceneHero
        imageUrl="https://images.unsplash.com/photo-1579632652768-6cb9dcf85912?q=80&w=1600&auto=format&fit=crop"
        imageAlt="Creative and Research Ecosystem Atmosphere"
        categoryBadge="WORLD 006 // CREATIVE & RESEARCH ECOSYSTEM"
        title="VENTURES"
        subtitle="COMVIEWMEDIA serves as the primary creative engine. Around it exists an interconnected ecosystem of performance platforms and interdisciplinary research laboratories."
        frameStyle="gallery"
        metadata={[
          { label: 'FOUNDATION', value: 'GERDY ABELARD' },
          { label: 'HOUSE', value: 'COMVIEWMEDIA' },
          { label: 'ENTITIES', value: '2 Active Worlds • 4 Disciplines' },
        ]}
      />

      {/* SECTION 1: CURRENT WORLDS (ACTIVE PUBLIC PLATFORMS) */}
      <div className="space-y-16 mb-24">
        <div className="flex items-center justify-between border-b border-[#1c1c24] pb-4">
          <span className="text-[10px] font-mono text-[#c5a059] uppercase tracking-[0.3em] flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            CURRENT WORLDS // ACTIVE PUBLIC PLATFORMS
          </span>
          <span className="text-[10px] font-mono text-[#8a8a8a] uppercase">01 / 02</span>
        </div>

        <div className="space-y-20">
          {currentWorlds.map((world, idx) => (
            <motion.div
              key={world.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="bg-[#0d0d10] border border-[#22222c] overflow-hidden hover:border-[#c5a059] transition-all duration-500"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-8 sm:p-12">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-[#c5a059] uppercase tracking-[0.25em] block">
                      {world.role}
                    </span>
                    <h2 className="font-serif-display text-3xl sm:text-5xl text-[#ffffff] uppercase tracking-wide">
                      {world.name}
                    </h2>
                  </div>

                  <p className="font-serif-display text-lg text-[#c5a059] italic font-light">
                    "{world.headline}"
                  </p>

                  <p className="text-xs sm:text-sm text-[#a1a1aa] font-sans-ui font-light leading-relaxed">
                    {world.description}
                  </p>

                  <div className="space-y-3 pt-2">
                    <span className="text-[10px] font-mono text-[#8a8a8a] uppercase tracking-widest block">
                      DOMAINS OF EXECUTION
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {world.pillars.map((pillar, pIdx) => (
                        <div
                          key={pIdx}
                          className="flex items-center gap-2 text-xs text-[#d1d5db] font-mono bg-[#121218] px-3 py-2 border border-[#1c1c24]"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
                          <span>{pillar}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    {world.link ? (
                      <Link
                        to={world.link}
                        className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#f4f3ef] text-[#08080a] text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#c5a059] transition-all shadow-lg"
                      >
                        <span>{world.linkText}</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    ) : (
                      <a
                        href={world.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#f4f3ef] text-[#08080a] text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#c5a059] transition-all shadow-lg"
                      >
                        <span>{world.linkText}</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="relative aspect-[16/10] bg-[#121218] border border-[#22222c] overflow-hidden">
                  <img
                    src={world.heroImage}
                    alt={world.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* SECTION 2: AREAS OF EXPLORATION (R&D DISCIPLINES) */}
      <div className="space-y-12 pt-12 border-t border-[#22222c]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1c1c24] pb-4">
          <div>
            <span className="text-[10px] font-mono text-[#c5a059] uppercase tracking-[0.3em] block mb-1">
              AREAS OF EXPLORATION // RESEARCH & DEVELOPMENT
            </span>
            <h3 className="font-serif-display text-2xl sm:text-3xl text-[#ffffff] uppercase tracking-wide">
              DISCIPLINES & FUTURE INITIATIVES
            </h3>
          </div>
          <span className="text-[10px] font-mono text-[#8a8a8a] uppercase">02 / 02</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {researchDisciplines.map((disc, idx) => {
            const IconComponent = disc.icon;
            return (
              <motion.div
                key={disc.code}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-[#0d0d10] border border-[#22222c] p-8 space-y-4 hover:border-[#c5a059]/50 transition-colors"
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-[#c5a059] uppercase tracking-widest">
                  <span>{disc.code}</span>
                  <IconComponent className="w-4 h-4 text-[#c5a059]" />
                </div>

                <h4 className="font-serif-display text-xl text-[#f4f3ef] uppercase tracking-wide">
                  {disc.title}
                </h4>

                <p className="text-xs text-[#a1a1aa] font-sans-ui font-light leading-relaxed">
                  {disc.description}
                </p>

                <div className="pt-2 text-[9px] font-mono text-[#8a8a8a] uppercase tracking-widest">
                  CONFIDENTIAL RESEARCH & INTEGRATION
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};


