import React from 'react';
import { motion } from 'motion/react';
import { MOCK_CLIENTS } from '../data/mockData';
import { Building2, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CinematicSceneHero } from '../components/cinematic/CinematicSceneHero';

export const ClientArchive: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#08080a] text-[#f4f3ef] pt-28 pb-24 px-6 max-w-7xl mx-auto selection:bg-[#c5a059] selection:text-[#08080a]">
      {/* STAGES 01-04: HERO VISUAL & TYPOGRAPHY REVEAL */}
      <CinematicSceneHero
        imageUrl="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop"
        imageAlt="Strategic Collaborations & International Institutions"
        categoryBadge="WORLD 008 // INSTITUTIONAL ROSTER"
        title="CLIENT ARCHIVE"
        subtitle="A curated record of international luxury houses, publishing institutions, and technology enterprises advised by Gerdy Abelard."
        frameStyle="gallery"
        metadata={[
          { label: 'ADVISORY', value: 'Strategic C-Suite & Creative Direction' },
          { label: 'INSTITUTIONS', value: `${MOCK_CLIENTS.length} Advisory Partners` },
        ]}
      />

      {/* Roster Grid */}
      <div className="space-y-8 mb-16">
        <div className="flex items-center justify-between border-b border-[#22222c] pb-4">
          <h2 className="font-serif-display text-2xl text-[#f4f3ef] uppercase tracking-wider">
            Active Strategic Relationships
          </h2>
          <span className="text-[10px] font-mono text-[#8a8a8a] uppercase tracking-widest">
            {MOCK_CLIENTS.length} INSTITUTIONS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MOCK_CLIENTS.map((client, idx) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-[#0d0d10] border border-[#22222c] p-8 space-y-4 hover:border-[#c5a059] transition-all duration-500"
            >
              <div className="flex items-center justify-between border-b border-[#22222c] pb-4">
                <h3 className="font-serif-display text-2xl text-[#f4f3ef] uppercase tracking-wide">{client.company_name}</h3>
                <span className="text-[10px] font-mono text-[#c5a059] uppercase px-2.5 py-1 bg-[#121218] border border-[#22222c]">
                  {client.industry}
                </span>
              </div>
              <p className="text-xs text-[#a1a1aa] font-sans-ui leading-relaxed font-light">{client.notes}</p>
              <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-[#8a8a8a]">
                <span>Status: Active Strategic Relationship</span>
                <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Commission Inquiry Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-[#0d0d10] border border-[#22222c] p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-4 shadow-xl"
      >
        <h2 className="font-serif-display text-2xl sm:text-3xl text-[#f4f3ef] uppercase tracking-wide">Become a Commission Partner</h2>
        <p className="text-xs sm:text-sm text-[#a1a1aa] font-sans-ui font-light leading-relaxed">
          Selective advisory and creative direction retainers are open for international institutions.
        </p>
        <div className="pt-2">
          <Link
            to="/inquire"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#f4f3ef] text-[#08080a] font-sans-ui text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#c5a059] transition-all shadow-md"
          >
            <span>Submit Strategic Inquiry</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

