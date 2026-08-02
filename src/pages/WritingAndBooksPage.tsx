import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MOCK_WRITING } from '../data/mockData';
import { BookOpen, FileText, ArrowUpRight, X } from 'lucide-react';
import { CinematicSceneHero } from '../components/cinematic/CinematicSceneHero';

export const WritingAndBooksPage: React.FC = () => {
  const [selectedEssay, setSelectedEssay] = useState<any | null>(null);

  return (
    <div className="min-h-screen bg-[#08080a] text-[#f4f3ef] pt-28 pb-24 px-6 max-w-7xl mx-auto selection:bg-[#c5a059] selection:text-[#08080a]">
      {/* STAGES 01-04: BOOK COVER / MANUSCRIPT HERO */}
      <CinematicSceneHero
        imageUrl="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1600&auto=format&fit=crop"
        imageAlt="Manuscript and Literary Monographs"
        categoryBadge="WORLD 007 // LITERARY ARCHIVE"
        title="WRITING & BOOKS"
        subtitle="Theoretical monographs, architectural treatises, screenplays, and critical observations on cinema, focus, and visual authority by Gerdy Abelard."
        frameStyle="gallery"
        metadata={[
          { label: 'PUBLISHING', value: 'COMVIEWMEDIA PRESS' },
          { label: 'AUTHOR', value: 'Gerdy Abelard' },
          { label: 'PUBLICATIONS', value: `${MOCK_WRITING.length} Volumes` },
        ]}
      />

      {/* STAGE 05: DISCOVERY - Published Works Grid */}
      <div className="space-y-8 mb-16">
        <div className="flex items-center justify-between border-b border-[#22222c] pb-4">
          <h2 className="font-serif-display text-2xl text-[#f4f3ef] uppercase tracking-wider">
            Published Treatises & Screenplays
          </h2>
          <span className="text-[10px] font-mono text-[#8a8a8a] uppercase tracking-widest">
            {MOCK_WRITING.length} VOLUMES
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MOCK_WRITING.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-[#0d0d10] border border-[#22222c] p-8 space-y-4 flex flex-col justify-between hover:border-[#c5a059] transition-all duration-500"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono text-xs text-[#8a8a8a]">
                  <span className="uppercase text-[#c5a059]">{item.format}</span>
                  <span>{item.publication_date}</span>
                </div>
                <h3 className="font-serif-display text-2xl text-[#f4f3ef] uppercase tracking-wide">{item.title}</h3>
                <p className="text-xs text-[#a1a1aa] leading-relaxed font-light font-sans-ui">{item.summary}</p>
              </div>

              <div className="pt-4 border-t border-[#1c1c24]">
                <button
                  type="button"
                  onClick={() => setSelectedEssay(item)}
                  className="text-xs font-mono uppercase tracking-widest text-[#c5a059] hover:underline inline-flex items-center gap-1.5"
                >
                  <span>Read Treatise Preview</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Reader Modal */}
      {selectedEssay && (
        <div className="fixed inset-0 z-50 bg-[#08080a]/95 backdrop-blur-md flex items-center justify-center p-6 overflow-y-auto">
          <div className="bg-[#0d0d10] border border-[#22222c] max-w-3xl w-full p-8 relative my-8 shadow-2xl">
            <button
              type="button"
              onClick={() => setSelectedEssay(null)}
              className="absolute top-6 right-6 text-[#a1a1aa] hover:text-[#f4f3ef] p-1 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <span className="text-[10px] font-mono text-[#c5a059] uppercase tracking-widest block mb-2">
              {selectedEssay.format} • {selectedEssay.publication_date}
            </span>

            <h2 className="font-serif-display text-3xl text-[#f4f3ef] uppercase tracking-wide mb-6">{selectedEssay.title}</h2>

            <div className="prose prose-invert max-w-none text-xs text-[#a1a1aa] font-sans-ui leading-relaxed whitespace-pre-line space-y-4 border-t border-[#22222c] pt-6 font-light">
              {selectedEssay.content_markdown}
            </div>

            <div className="mt-8 pt-6 border-t border-[#22222c] flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedEssay(null)}
                className="px-6 py-2.5 bg-[#121218] border border-[#22222c] text-[#f4f3ef] text-xs font-mono uppercase tracking-widest hover:border-[#c5a059] hover:text-[#c5a059] transition-all"
              >
                Close Reader
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

