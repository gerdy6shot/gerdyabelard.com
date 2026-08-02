import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Film, Camera, Compass, Sparkles, Cpu, BookOpen } from 'lucide-react';

export const DisciplinesScene: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const disciplines = [
    {
      title: 'Film & Cinema',
      tag: '01 // DIRECTING',
      path: '/film',
      image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2000&auto=format&fit=crop',
      desc: 'Large-format commercial films, feature cinema, and runway motion direction crafted with high-contrast light and spatial movement.',
      deliverables: ['Commercial Directing', 'Feature Screenplays', 'Post-Production Supervision', 'Cinematography Direction'],
      icon: Film,
    },
    {
      title: 'Commercial Photography',
      tag: '02 // PHOTOGRAPHY',
      path: '/photography',
      image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=2000&auto=format&fit=crop',
      desc: 'Editorial portraiture, architectural photo essays, and luxury fashion lookbooks executed with medium-format precision.',
      deliverables: ['High-Fashion Lookbooks', 'Architectural Photo Essays', 'Editorial Campaigns', 'High-Res Color Grading'],
      icon: Camera,
    },
    {
      title: 'Creative Direction',
      tag: '03 // AESTHETIC OS',
      path: '/creative-direction',
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=2000&auto=format&fit=crop',
      desc: 'End-to-end visual identity architecture, brand aesthetic guidelines, and executive creative orchestration.',
      deliverables: ['Brand Visual Systems', 'Creative Direction Briefs', 'Exhibition Design', 'Identity Playbooks'],
      icon: Compass,
    },
    {
      title: 'Brand Strategy',
      tag: '04 // POSITIONING',
      path: '/ventures',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2000&auto=format&fit=crop',
      desc: 'Strategic brand positioning, market entry narratives, and luxury consumer experience blueprints.',
      deliverables: ['Executive Positioning', 'Venture Frameworks', 'Narrative Architecture', 'Market Go-To-Plans'],
      icon: Sparkles,
    },
    {
      title: 'Technology Platforms',
      tag: '05 // ENGINEERING',
      path: '/ventures',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2000&auto=format&fit=crop',
      desc: 'Proprietary AI pipelines, performance operating systems, and high-performance digital infrastructure.',
      deliverables: ['OVERHAULTRAIN / OS', 'AI Workflow Automation', 'System Architectures', 'Digital Ecosystems'],
      icon: Cpu,
    },
    {
      title: 'Literature & Screenwriting',
      tag: '06 // ORIGINAL IP',
      path: '/ip',
      image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=2000&auto=format&fit=crop',
      desc: 'Original screenplays, monographs, and literary works including The Snake, Pearls & Pigs and Viscous.',
      deliverables: ['Original Screenplays', 'Published Monographs', 'Literary IP Optioning', 'Worldbuilding Bibles'],
      icon: BookOpen,
    },
  ];

  const current = disciplines[activeIdx];

  return (
    <section className="py-28 px-6 sm:px-12 max-w-7xl mx-auto space-y-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#22222c] pb-6">
        <div className="space-y-2">
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#c5a059] uppercase block">
            // SCENE 004 — CREATIVE DISCIPLINES
          </span>
          <h2 className="font-serif-display text-3xl sm:text-5xl text-[#f4f3ef] uppercase tracking-[0.08em]">
            Directorial Categories
          </h2>
        </div>
        <p className="text-xs font-mono text-[#8a8a8a] max-w-md uppercase leading-relaxed">
          Select a category to inspect specific production frameworks and deliverables.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Category Selection List */}
        <div className="lg:col-span-5 space-y-2">
          {disciplines.map((item, idx) => {
            const isActive = activeIdx === idx;
            const Icon = item.icon;

            return (
              <button
                key={item.title}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`w-full p-5 text-left border transition-all duration-300 flex items-center justify-between ${
                  isActive
                    ? 'bg-[#14141c] border-[#c5a059] text-[#f4f3ef] shadow-xl'
                    : 'bg-[#0c0c0f] border-[#22222c] text-[#8a8a8a] hover:border-[#c5a059]/40 hover:text-[#f4f3ef]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-[#c5a059]' : 'text-[#8a8a8a]'}`} />
                  <div>
                    <span className="text-[9px] font-mono text-[#c5a059] block uppercase tracking-widest">
                      {item.tag}
                    </span>
                    <span className="font-serif-display text-lg uppercase tracking-wider">
                      {item.title}
                    </span>
                  </div>
                </div>
                <ArrowUpRight
                  className={`w-4 h-4 transition-transform ${
                    isActive ? 'text-[#c5a059] translate-x-1' : 'opacity-0'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Right Active Preview Stage */}
        <div className="lg:col-span-7 bg-[#0c0c0f] border border-[#22222c] p-8 sm:p-10 space-y-8 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.title}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-[#121218] border border-[#22222c]">
                <img
                  src={current.image}
                  alt={current.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter grayscale contrast-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0f] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 px-3 py-1 bg-[#08080a]/90 backdrop-blur-md border border-[#22222c]">
                  <span className="text-[10px] font-mono text-[#c5a059] uppercase tracking-widest">
                    ACTIVE CATEGORY // {current.tag}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-serif-display text-3xl text-[#f4f3ef] uppercase tracking-wider">
                  {current.title}
                </h3>
                <p className="text-xs text-[#a1a1aa] font-sans-ui font-light leading-relaxed">
                  {current.desc}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#1f1f28]">
                <span className="text-[10px] font-mono text-[#8a8a8a] uppercase tracking-widest block">
                  Core Deliverables:
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono text-[#d4d4d8]">
                  {current.deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#c5a059]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#1f1f28]">
                <Link
                  to={current.path}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#c5a059] text-[#08080a] text-xs font-mono uppercase tracking-[0.2em] font-bold hover:bg-[#f4f3ef] transition-all"
                >
                  <span>Inspect Category Archive</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
