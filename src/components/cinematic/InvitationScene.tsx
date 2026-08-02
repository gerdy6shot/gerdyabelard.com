import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles, Calendar, Send } from 'lucide-react';

export const InvitationScene: React.FC = () => {
  return (
    <section className="py-32 px-6 sm:px-12 bg-[#08080a] border-t border-[#22222c] text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#c5a059]/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-3xl mx-auto space-y-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#c5a059] uppercase block">
            // SCENE 006 — INITIATE CREATIVE PARTNERSHIP
          </span>

          <h2 className="font-serif-display text-4xl sm:text-6xl text-[#f4f3ef] uppercase tracking-[0.08em] leading-tight">
            Enter The Studio
          </h2>

          <p className="text-xs sm:text-sm text-[#a1a1aa] font-sans-ui font-light leading-relaxed max-w-xl mx-auto">
            Available for large-format film directing, commercial photography campaigns, brand aesthetic direction, and strategic venture commissions globally.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-2"
        >
          <Link
            to="/book"
            className="w-full sm:w-auto px-10 py-5 bg-[#c5a059] text-[#08080a] text-xs font-mono uppercase tracking-[0.2em] font-bold hover:bg-[#f4f3ef] transition-all flex items-center justify-center gap-3 shadow-2xl"
          >
            <Calendar className="w-4 h-4 text-[#08080a]" />
            <span>Book Commission & Consult</span>
          </Link>

          <Link
            to="/inquire"
            className="w-full sm:w-auto px-10 py-5 bg-[#121218] border border-[#22222c] text-[#f4f3ef] text-xs font-mono uppercase tracking-[0.2em] hover:border-[#c5a059] hover:text-[#c5a059] transition-all flex items-center justify-center gap-3"
          >
            <Send className="w-4 h-4 text-[#c5a059]" />
            <span>Submit Intake Brief</span>
          </Link>
        </motion.div>

        <div className="pt-8 border-t border-[#1f1f28] flex items-center justify-between text-[10px] font-mono text-[#8a8a8a] uppercase tracking-widest">
          <span>DIRECTING // PHOTOGRAPHY // VENTURES</span>
          <span>book@gerdyabelard.com</span>
        </div>
      </div>
    </section>
  );
};
