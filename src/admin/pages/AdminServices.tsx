import React from 'react';
import { motion } from 'motion/react';
import { PageTitle } from '../../components/PageTitle';
import { GlassPanel } from '../../components/GlassPanel';
import { Briefcase, Film, Camera, Compass, Plus } from 'lucide-react';

export const AdminServices: React.FC = () => {
  const services = [
    {
      title: 'Commercial Film Production',
      category: 'COMVIEWMEDIA',
      rate: 'Custom Retainer / Day Rate',
      desc: 'Cinematic storytelling, brand films, moving image campaigns, and complete post-production orchestration.',
      icon: Film,
    },
    {
      title: 'High-Fashion & Commercial Photography',
      category: 'PHOTOGRAPHY',
      rate: 'Day Rate + Licensing',
      desc: 'Campaign photography, lookbooks, editorial portraiture, and gallery archive licensing.',
      icon: Camera,
    },
    {
      title: 'Brand Architecture & Strategic Consulting',
      category: 'STRATEGY',
      rate: 'Executive Advisory',
      desc: 'Strategic direction, venture identity, positioning, and high-impact creative orchestration.',
      icon: Compass,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 pb-12"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#22222c]">
        <PageTitle
          eyebrow="STUDIO OS // SERVICES"
          title="SERVICES"
          subtitle="Manage creative offerings..."
        />
        <button className="px-4 py-2.5 bg-[#f4f3ef] text-[#08080a] text-xs font-mono uppercase tracking-[0.2em] font-semibold hover:bg-[#c5a059] transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          <span>Add Service</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((s) => {
          const Icon = s.icon;
          return (
            <GlassPanel key={s.title} className="p-6 space-y-4">
              <div className="flex items-center justify-between text-[#c5a059]">
                <span className="text-[10px] font-mono uppercase tracking-widest bg-[#c5a059]/10 px-2 py-0.5 border border-[#c5a059]/30">
                  {s.category}
                </span>
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-serif-display text-lg text-[#f4f3ef] uppercase tracking-wider">
                {s.title}
              </h3>
              <p className="text-xs text-[#8a8a8a] leading-relaxed font-sans-ui font-light">
                {s.desc}
              </p>
              <div className="pt-4 border-t border-[#22222c] text-xs font-mono text-[#c5a059] uppercase tracking-wider">
                {s.rate}
              </div>
            </GlassPanel>
          );
        })}
      </div>
    </motion.div>
  );
};
