import React from 'react';
import { GlassPanel } from '../GlassPanel';
import { Layers, Film, Camera, Compass, Sparkles, CheckCircle2 } from 'lucide-react';

export const PipelinePanel: React.FC = () => {
  const projects = [
    {
      code: '01',
      title: 'FEATURE NARRATIVE FILM',
      division: 'COMVIEWMEDIA',
      phase: 'PRE-PRODUCTION',
      progress: 65,
      icon: Film,
    },
    {
      code: '02',
      title: 'GLOBAL COMMERCIAL CAMPAIGN',
      division: 'PHOTOGRAPHY & DIRECTION',
      phase: 'PRODUCTION QUEUE',
      progress: 40,
      icon: Camera,
    },
    {
      code: '03',
      title: 'BRAND OS ARCHITECTURE',
      division: 'STRATEGY CONSULTING',
      phase: 'ACTIVE ARCHITECTURE',
      progress: 85,
      icon: Compass,
    },
  ];

  return (
    <GlassPanel className="p-6 sm:p-8 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-[#22222c]">
        <div className="space-y-1">
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#c5a059] uppercase block">
            // PRODUCTION PIPELINE
          </span>
          <h2 className="font-serif-display text-xl text-[#f4f3ef] uppercase tracking-[0.1em] flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#c5a059]" />
            Creative Pipeline & Active IP
          </h2>
        </div>
        <span className="text-[10px] font-mono text-[#8a8a8a] uppercase tracking-widest border border-[#22222c] px-2.5 py-1 bg-[#0a0a0d]">
          ACTIVE PRODUCTIONS
        </span>
      </div>

      <div className="space-y-4">
        {projects.map((proj) => {
          const Icon = proj.icon;
          return (
            <div
              key={proj.title}
              className="p-4 bg-[#0d0d11] border border-[#22222c] space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-[#c5a059]">//{proj.code}</span>
                  <div>
                    <h3 className="font-serif-display text-sm text-[#f4f3ef] uppercase tracking-wider">
                      {proj.title}
                    </h3>
                    <p className="text-[9px] font-mono text-[#8a8a8a] uppercase">{proj.division}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 text-[9px] font-mono text-[#c5a059] bg-[#c5a059]/10 border border-[#c5a059]/30 uppercase">
                    {proj.phase}
                  </span>
                  <span className="text-xs font-mono text-[#f4f3ef]">{proj.progress}%</span>
                </div>
              </div>

              {/* Minimalist Progress Bar */}
              <div className="w-full bg-[#181820] h-1.5 rounded-none overflow-hidden border border-[#22222c]">
                <div
                  className="bg-gradient-to-r from-[#c5a059] to-[#e6ca90] h-full transition-all duration-500"
                  style={{ width: `${proj.progress}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </GlassPanel>
  );
};
