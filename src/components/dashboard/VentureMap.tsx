import React from 'react';
import { GlassPanel } from '../GlassPanel';
import { Sparkles, Film, Dumbbell, Compass, ExternalLink } from 'lucide-react';

export const VentureMap: React.FC = () => {
  const ventures = [
    {
      code: '01',
      name: 'COMVIEWMEDIA',
      category: 'FILM & PHOTOGRAPHY',
      desc: 'Cinematic commercial video production, photography campaigns, and high-end editorial storytelling.',
      status: 'ACTIVE PRODUCTION',
      icon: Film,
      link: 'https://comviewmedia.com',
    },
    {
      code: '02',
      name: 'OVERHAULTRAIN',
      category: 'PERFORMANCE OS & AI',
      desc: 'High-performance physical optimization, biomechanics research, and fitness software architecture.',
      status: 'ACTIVE SYSTEM',
      icon: Dumbbell,
      link: '#',
    },
    {
      code: '03',
      name: 'ROCE DE LIBERTAD',
      category: 'HUMANITARIAN IP & SPIRITS',
      desc: 'Ultra-premium artisanal agave spirit brand supporting freedom, culture, and humanitarian projects.',
      status: 'IN DEVELOPMENT',
      icon: Compass,
      link: '#',
    },
  ];

  return (
    <GlassPanel className="p-6 sm:p-8 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-[#22222c]">
        <div className="space-y-1">
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#c5a059] uppercase block">
            // VENTURE ARCHITECTURE
          </span>
          <h2 className="font-serif-display text-xl text-[#f4f3ef] uppercase tracking-[0.1em] flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#c5a059]" />
            Gerdy Abelard Business Ecosystem
          </h2>
        </div>
        <span className="text-[10px] font-mono text-[#8a8a8a] uppercase tracking-widest border border-[#22222c] px-2.5 py-1 bg-[#0a0a0d]">
          STRATEGIC MAP
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {ventures.map((venture) => {
          const Icon = venture.icon;
          return (
            <div
              key={venture.name}
              className="p-6 bg-[#0c0c0f] border border-[#22222c] hover:border-[#c5a059]/50 transition-all group flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#c5a059] tracking-widest">
                    //{venture.code}
                  </span>
                  <Icon className="w-4 h-4 text-[#8a8a8a] group-hover:text-[#c5a059] transition-colors" />
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif-display text-lg text-[#f4f3ef] uppercase tracking-wider group-hover:text-[#c5a059] transition-colors">
                    {venture.name}
                  </h3>
                  <div className="text-[9px] font-mono text-[#a1a1aa] uppercase tracking-widest">
                    {venture.category}
                  </div>
                </div>

                <p className="text-xs text-[#8a8a8a] leading-relaxed font-sans-ui font-light">
                  {venture.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-[#1c1c24] flex items-center justify-between text-[9px] font-mono">
                <span className="text-[#c5a059] uppercase tracking-wider">{venture.status}</span>
                <a
                  href={venture.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#8a8a8a] group-hover:text-[#f4f3ef] transition-colors flex items-center gap-1"
                >
                  <span>EXPLORE</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </GlassPanel>
  );
};
