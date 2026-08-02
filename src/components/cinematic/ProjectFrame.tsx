import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Film, Sparkles } from 'lucide-react';
import { DepthImage } from './DepthImage';

export interface ProjectFrameProps {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  year: number | string;
  role: string;
  client?: string;
  imageUrl: string;
  index: number;
}

export const ProjectFrame: React.FC<ProjectFrameProps> = ({
  slug,
  title,
  subtitle,
  category,
  year,
  role,
  client = 'GERDY ABELARD STUDIO',
  imageUrl,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group bg-[#0c0c0f] border border-[#22222c] overflow-hidden hover:border-[#c5a059] transition-all duration-500"
    >
      <Link to={`/work/${slug}`} className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        <div className="lg:col-span-7 relative bg-[#121218]">
          <DepthImage
            src={imageUrl}
            alt={title}
            aspectRatio="aspect-[16/10]"
            grayscale={true}
          />
          <div className="absolute top-4 left-4 bg-[#08080a]/90 backdrop-blur-md px-3 py-1 border border-[#22222c] z-10">
            <span className="text-[10px] font-mono tracking-[0.2em] text-[#c5a059] uppercase">
              EXHIBIT 0{index + 1} // {category}
            </span>
          </div>
        </div>

        <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#8a8a8a] border-b border-[#1f1f28] pb-3">
              <span>{year}</span>
              <span className="text-[#c5a059]">{client}</span>
            </div>

            <h3 className="font-serif-display text-2xl sm:text-4xl text-[#f4f3ef] uppercase tracking-wider group-hover:text-[#c5a059] transition-colors leading-tight">
              {title}
            </h3>

            <p className="text-xs text-[#a1a1aa] font-sans-ui font-light leading-relaxed">
              {subtitle}
            </p>

            <div className="pt-2 text-[10px] font-mono text-[#8a8a8a] uppercase tracking-widest">
              Role: <span className="text-[#f4f3ef]">{role}</span>
            </div>
          </div>

          <div className="pt-6 border-t border-[#1f1f28] flex items-center justify-between text-xs font-mono text-[#c5a059] uppercase tracking-widest">
            <span>View Film Frame</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
