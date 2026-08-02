import React from 'react';
import { motion } from 'motion/react';

export const PhilosophyScene: React.FC = () => {
  const pillars = [
    { title: 'STORIES', desc: 'Narratives engineered for emotional resonance and cultural permanence.' },
    { title: 'SYSTEMS', desc: 'Repeatable creative algorithms and technology architectures that scale vision.' },
    { title: 'BRANDS', desc: 'Aesthetic identity structures that command executive authority and luxury status.' },
    { title: 'WORLDS', desc: 'Cross-platform intellectual property ecosystems spanning cinema, literature, and technology.' },
  ];

  return (
    <section className="py-28 px-6 sm:px-12 bg-[#0c0c0f] border-y border-[#22222c] relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#22222c]">
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#c5a059] uppercase block">
              // SCENE 003 — CREATIVE PHILOSOPHY
            </span>
            <h2 className="font-serif-display text-3xl sm:text-5xl text-[#f4f3ef] uppercase tracking-[0.08em]">
              Architectural Imperatives
            </h2>
          </div>
          <p className="text-xs font-mono text-[#8a8a8a] max-w-md uppercase leading-relaxed">
            Four fundamental vectors governing every directorial engagement and venture commission.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="p-8 bg-[#121218] border border-[#22222c] hover:border-[#c5a059]/60 transition-all space-y-6 relative group"
            >
              <div className="text-[10px] font-mono text-[#c5a059] uppercase tracking-widest">
                PILLAR 0{idx + 1}
              </div>

              <h3 className="font-serif-display text-4xl sm:text-5xl text-[#f4f3ef] uppercase tracking-widest group-hover:text-[#c5a059] transition-colors">
                {pillar.title}
              </h3>

              <p className="text-xs text-[#a1a1aa] font-sans-ui font-light leading-relaxed">
                {pillar.desc}
              </p>

              <div className="w-8 h-[1px] bg-[#c5a059]/40 group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
