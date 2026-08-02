import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Camera, Maximize2, X, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CinematicSceneHero } from '../components/cinematic/CinematicSceneHero';

export const PhotographyPortfolio: React.FC = () => {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const galleryImages = [
    {
      id: 'img-1',
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
      title: 'Monolith & Light - Study 01',
      category: 'Architectural',
      location: 'Mexico City Brutalism',
    },
    {
      id: 'img-2',
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop',
      title: 'Humanity & Form - Portrait 04',
      category: 'Portraiture',
      location: 'Studio Session',
    },
    {
      id: 'img-3',
      url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop',
      title: 'Haute Couture Runway - Milan',
      category: 'Editorial',
      location: 'Fashion Week',
    },
    {
      id: 'img-4',
      url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
      title: 'Shadow & Stone - Mexico City',
      category: 'Fine Art',
      location: 'Architectural Vault',
    },
  ];

  return (
    <div className="min-h-screen bg-[#08080a] text-[#f4f3ef] pt-28 pb-24 px-6 max-w-7xl mx-auto selection:bg-[#c5a059] selection:text-[#08080a]">
      {/* STAGES 01-04: GALLERY-QUALITY STILL HERO & MUSEUM LABEL */}
      <CinematicSceneHero
        imageUrl="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop"
        imageAlt="Medium Format Architectural Photography"
        categoryBadge="WORLD 005 // EXHIBITION HALL"
        title="PHOTOGRAPHY"
        subtitle="Medium format analog and digital photography focusing on architectural geometry, portraiture, and high-fashion editorial campaigns."
        frameStyle="gallery"
        metadata={[
          { label: 'MEDIUM', value: 'Hasselblad H6D • 60MP Medium Format' },
          { label: 'CURATOR', value: 'Gerdy Abelard Studio' },
          { label: 'COLLECTION', value: '4 Selected Exhibits' },
        ]}
      />

      {/* STAGE 05: DISCOVERY - Gallery Grid */}
      <div className="space-y-8">
        <div className="flex items-center justify-between border-b border-[#22222c] pb-4">
          <h2 className="font-serif-display text-2xl text-[#f4f3ef] uppercase tracking-wider">
            Curated Exhibition Wall
          </h2>
          <span className="text-[10px] font-mono text-[#8a8a8a] uppercase tracking-widest">
            CLICK FRAME TO EXPAND
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {galleryImages.map((img, idx) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              onClick={() => setActiveImage(img.url)}
              className="group relative bg-[#0d0d10] border border-[#22222c] overflow-hidden cursor-pointer hover:border-[#c5a059] transition-all duration-500"
            >
              <div className="aspect-[4/3] overflow-hidden bg-[#08080a]">
                <img
                  src={img.url}
                  alt={img.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#c5a059] uppercase tracking-widest block">
                    {img.category} // {img.location}
                  </span>
                  <span className="font-serif-display text-lg text-[#f4f3ef] uppercase tracking-wide">
                    {img.title}
                  </span>
                </div>
                <Maximize2 className="w-4 h-4 text-[#c5a059] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div className="fixed inset-0 z-50 bg-[#08080a]/95 backdrop-blur-md flex items-center justify-center p-6">
          <button
            type="button"
            onClick={() => setActiveImage(null)}
            className="absolute top-8 right-8 text-[#f4f3ef] hover:text-[#c5a059] transition-colors p-2"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={activeImage}
            alt="Expanded view"
            referrerPolicy="no-referrer"
            className="max-w-full max-h-[85vh] object-contain border border-[#22222c] shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};

