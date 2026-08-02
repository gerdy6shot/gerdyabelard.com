import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Globe, Shield, Sparkles, Cpu } from 'lucide-react';
import { MOCK_VENTURES } from '../../data/mockData';

export const VenturesScene: React.FC = () => {
  return (
    <section className="py-28 px-6 sm:px-12 bg-[#0c0c0f] border-t border-[#22222c] relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#22222c]">
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#c5a059] uppercase block">
              // SCENE 005 — PROPRIETARY VENTURE ECOSYSTEM
            </span>
            <h2 className="font-serif-display text-3xl sm:text-5xl text-[#f4f3ef] uppercase tracking-[0.08em]">
              Connected Worlds
            </h2>
          </div>
          <p className="text-xs font-mono text-[#8a8a8a] max-w-md uppercase leading-relaxed">
            Proprietary technology platforms, studio systems, and international commerce ventures founded and led by Gerdy Abelard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_VENTURES.map((venture, idx) => (
            <motion.div
              key={venture.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-[#121218] border border-[#22222c] p-8 flex flex-col justify-between space-y-8 hover:border-[#c5a059] transition-all group relative overflow-hidden"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#1f1f28]">
                  <span className="text-[9px] font-mono text-[#c5a059] tracking-widest uppercase bg-[#c5a059]/10 px-2.5 py-0.5 border border-[#c5a059]/20">
                    {venture.role}
                  </span>
                  <span className="text-[10px] font-mono text-[#8a8a8a] uppercase">
                    {venture.status}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif-display text-2xl text-[#f4f3ef] uppercase tracking-wider group-hover:text-[#c5a059] transition-colors">
                    {venture.name}
                  </h3>
                  <p className="text-xs text-[#a1a1aa] font-sans-ui font-light leading-relaxed">
                    {venture.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-[#1f1f28] flex items-center justify-between text-xs font-mono text-[#c5a059] uppercase tracking-widest">
                <span>Inspect Enterprise</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
              </div>

              <div className="absolute top-0 right-0 w-1.5 h-full bg-[#c5a059] opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>

        <div className="pt-4 text-center">
          <Link
            to="/ventures"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#121218] border border-[#22222c] text-[#f4f3ef] text-xs font-mono uppercase tracking-[0.2em] hover:border-[#c5a059] hover:text-[#c5a059] transition-all"
          >
            <span>Explore Complete Venture Portfolio</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
