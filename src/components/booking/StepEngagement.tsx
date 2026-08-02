import React from 'react';
import { motion } from 'motion/react';
import { Film, Camera, Compass, Sparkles, Cpu, Mic, Users, ArrowRight, Layers } from 'lucide-react';

export interface EngagementOption {
  id: string;
  title: string;
  category: string;
  description: string;
  deliverables: string[];
  icon: React.ElementType;
  tag: string;
}

export const ENGAGEMENT_OPTIONS: EngagementOption[] = [
  {
    id: 'film-production',
    title: 'Film & Commercial Production',
    category: 'COMVIEWMEDIA',
    description: 'Cinematic commercial video production, brand films, moving image campaigns, and full-spectrum directorial storytelling.',
    deliverables: ['Director Treatment', 'Cinematography & Crew', 'Post-Production & Color', 'Master 4K Cinema Delivery'],
    icon: Film,
    tag: 'CINEMATIC IP',
  },
  {
    id: 'commercial-photography',
    title: 'Commercial Photography',
    category: 'PHOTOGRAPHY',
    description: 'High-fashion lookbooks, editorial portraiture, brand imagery campaigns, and architectural photography.',
    deliverables: ['Creative Concepting', 'On-Location / Studio Shoot', 'High-Res Color Grading', 'Commercial Licensing'],
    icon: Camera,
    tag: 'EDITORIAL',
  },
  {
    id: 'creative-direction',
    title: 'Creative Direction',
    category: 'AESTHETIC OS',
    description: 'End-to-end visual identity orchestration, brand aesthetic direction, and campaign concept execution.',
    deliverables: ['Brand Visual System', 'Campaign Style Guide', 'Art Direction', 'Production Supervision'],
    icon: Compass,
    tag: 'EXECUTIVE',
  },
  {
    id: 'brand-strategy',
    title: 'Brand Strategy',
    category: 'VENTURE OS',
    description: 'Strategic market positioning, brand narrative architecture, and venture ecosystem growth consulting.',
    deliverables: ['Positioning Framework', 'Narrative Blueprint', 'Audience Architecture', 'Market Go-To-Plan'],
    icon: Sparkles,
    tag: 'STRATEGIC',
  },
  {
    id: 'ai-tech-consulting',
    title: 'AI & Technology Consulting',
    category: 'OVERHAULTRAIN / OS',
    description: 'Architectural consulting for performance OS, bespoke AI model pipelines, and high-performance digital infrastructure.',
    deliverables: ['System Architecture Audit', 'Custom AI Pipeline', 'Workflow Automation', 'Technical Roadmap'],
    icon: Cpu,
    tag: 'ENGINEERING',
  },
  {
    id: 'speaking-advisory',
    title: 'Speaking / Advisory',
    category: 'EXECUTIVE DIRECTIVE',
    description: 'Keynotes, executive panels, and strategic advisory sessions on film, technology, and brand architecture.',
    deliverables: ['Keynote Presentation', 'Q&A / Workshop', 'Executive Briefing', 'Strategic Session Notes'],
    icon: Mic,
    tag: 'KEYNOTE',
  },
  {
    id: 'partnership-inquiry',
    title: 'Partnership Inquiry',
    category: 'GLOBAL ECOSYSTEM',
    description: 'Co-venture opportunities, brand equity collaborations, artisanal spirits IP, and joint media productions.',
    deliverables: ['Venture Evaluation', 'Co-Brand Proposal', 'IP Optioning Agreement', 'Executive Summit'],
    icon: Users,
    tag: 'VENTURE',
  },
  {
    id: 'other-commission',
    title: 'Custom Commission',
    category: 'SPECIAL PROJECTS',
    description: 'Bespoke artistic requests, private gallery archive commissions, or custom strategic briefs.',
    deliverables: ['Custom Scope Brief', 'Tailored Milestones', 'Dedicated Studio Time', 'Direct Access'],
    icon: Layers,
    tag: 'BESPOKE',
  },
];

interface StepEngagementProps {
  selectedId: string;
  onSelect: (option: EngagementOption) => void;
}

export const StepEngagement: React.FC<StepEngagementProps> = ({ selectedId, onSelect }) => {
  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center sm:text-left">
        <span className="text-[10px] font-mono tracking-[0.3em] text-[#c5a059] uppercase block">
          // STEP 01 — SELECT CREATIVE ENGAGEMENT
        </span>
        <h2 className="font-serif-display text-2xl sm:text-4xl text-[#f4f3ef] uppercase tracking-[0.08em]">
          Define Your Objective
        </h2>
        <p className="text-xs font-mono text-[#8a8a8a] max-w-2xl leading-relaxed uppercase">
          Select the strategic domain for your commission. Each pathway activates tailored parameters within Studio OS.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
        {ENGAGEMENT_OPTIONS.map((option, idx) => {
          const Icon = option.icon;
          const isSelected = selectedId === option.id;

          return (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              onClick={() => onSelect(option)}
              className={`group cursor-pointer p-6 sm:p-7 bg-[#0c0c0f] border transition-all duration-300 relative overflow-hidden flex flex-col justify-between space-y-6 ${
                isSelected
                  ? 'border-[#c5a059] bg-[#14141c] shadow-2xl shadow-[#c5a059]/10'
                  : 'border-[#22222c] hover:border-[#c5a059]/50 hover:bg-[#101015]'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono tracking-[0.25em] text-[#c5a059] bg-[#c5a059]/10 border border-[#c5a059]/20 px-2.5 py-0.5 uppercase">
                    {option.tag}
                  </span>
                  <div
                    className={`p-2.5 transition-colors ${
                      isSelected
                        ? 'bg-[#c5a059] text-[#08080a]'
                        : 'bg-[#15151c] text-[#8a8a8a] group-hover:text-[#c5a059] group-hover:bg-[#1b1b24]'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-[9px] font-mono text-[#8a8a8a] uppercase tracking-widest">
                    {option.category}
                  </div>
                  <h3 className="font-serif-display text-xl text-[#f4f3ef] uppercase tracking-wider group-hover:text-[#c5a059] transition-colors">
                    {option.title}
                  </h3>
                </div>

                <p className="text-xs text-[#a1a1aa] leading-relaxed font-sans-ui font-light">
                  {option.description}
                </p>

                <div className="pt-3 border-t border-[#1c1c24] space-y-1.5">
                  <span className="text-[9px] font-mono text-[#8a8a8a] uppercase tracking-widest block">
                    Key Deliverables:
                  </span>
                  <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono text-[#d4d4d8]">
                    {option.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-1.5 truncate">
                        <span className="w-1 h-1 bg-[#c5a059]" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#1f1f28] text-[10px] font-mono">
                <span
                  className={`uppercase tracking-widest transition-colors ${
                    isSelected ? 'text-[#c5a059]' : 'text-[#8a8a8a] group-hover:text-[#f4f3ef]'
                  }`}
                >
                  {isSelected ? 'SELECTED ENGAGEMENT' : 'CLICK TO SELECT'}
                </span>
                <ArrowRight
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isSelected
                      ? 'translate-x-1 text-[#c5a059]'
                      : 'text-[#8a8a8a] group-hover:translate-x-1 group-hover:text-[#c5a059]'
                  }`}
                />
              </div>

              {isSelected && (
                <div className="absolute top-0 right-0 w-2 h-full bg-[#c5a059]" />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
