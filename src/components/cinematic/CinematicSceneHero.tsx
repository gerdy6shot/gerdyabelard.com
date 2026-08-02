import React from 'react';
import { motion } from 'motion/react';

interface CinematicSceneHeroProps {
  /**
   * The single dominant visual URL (film frame, portrait, editorial still, book cover)
   */
  imageUrl: string;
  imageAlt: string;
  /**
   * Category / World identifier badge (e.g. "WORLD 004 // CINEMA", "MUSEUM EXHIBIT")
   */
  categoryBadge?: string;
  /**
   * Primary title (e.g. "FILM", "PHOTOGRAPHY", "ARCHIVE", "WRITING", "VENTURES")
   */
  title: string;
  /**
   * Optional subtitle or directorial statement
   */
  subtitle?: string;
  /**
   * Optional secondary metadata lines (e.g. "INDEX // 24 MASTERWORKS", "FORMAT: 35MM ANAMORPHIC")
   */
  metadata?: Array<{ label: string; value: string }>;
  /**
   * Aspect ratio framing: 'film' (21/9 wide cinematic letterbox), 'gallery' (16/10), 'book' (3/4 vertical cover), 'full' (fullscreen)
   */
  frameStyle?: 'film' | 'gallery' | 'book' | 'full';
  /**
   * Custom children to render below secondary info or inside the hero composition
   */
  children?: React.ReactNode;
}

export const CinematicSceneHero: React.FC<CinematicSceneHeroProps> = ({
  imageUrl,
  imageAlt,
  categoryBadge,
  title,
  subtitle,
  metadata,
  frameStyle = 'gallery',
  children,
}) => {
  const getAspectClass = () => {
    switch (frameStyle) {
      case 'film':
        return 'aspect-[21/9] sm:aspect-[21/8]';
      case 'book':
        return 'aspect-[3/4] max-w-md mx-auto';
      case 'full':
        return 'min-h-[75vh] sm:min-h-[85vh]';
      case 'gallery':
      default:
        return 'aspect-[16/9] sm:aspect-[21/9]';
    }
  };

  return (
    <div className="relative w-full mb-16 sm:mb-20">
      {/* STAGE 01 & 02: THE HERO VISUAL */}
      <motion.div
        initial={{ opacity: 0, scale: 1.03, filter: 'blur(8px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className={`relative w-full ${getAspectClass()} bg-[#060608] border border-[#22222c] overflow-hidden group`}
      >
        <img
          src={imageUrl}
          alt={imageAlt}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover filter grayscale contrast-125 brightness-90 group-hover:scale-103 transition-transform duration-1000 ease-out"
        />

        {/* Cinematic Film Letterbox Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/30 to-black/40 pointer-events-none" />

        {/* STAGE 03: TYPOGRAPHY REVEAL - Appears over the image like a film title card */}
        <div className="absolute inset-0 p-6 sm:p-12 flex flex-col justify-between z-10 pointer-events-none">
          {/* Top Badge */}
          {categoryBadge && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] animate-pulse" />
              <span className="text-[10px] font-mono tracking-[0.35em] text-[#c5a059] uppercase bg-[#08080a]/80 backdrop-blur-md px-3 py-1 border border-[#22222c]">
                {categoryBadge}
              </span>
            </motion.div>
          )}

          {/* Bottom Title & Subtitle */}
          <div className="space-y-3 max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.1, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif-display text-4xl sm:text-6xl lg:text-7xl text-[#f4f3ef] tracking-[0.12em] uppercase font-normal leading-none drop-shadow-lg"
            >
              {title}
            </motion.h1>

            {/* STAGE 04: SECONDARY INFORMATION REVEAL */}
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
                className="text-xs sm:text-sm text-[#d1d5db] font-sans-ui font-light leading-relaxed max-w-xl drop-shadow"
              >
                {subtitle}
              </motion.p>
            )}

            {metadata && metadata.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.15 }}
                className="flex flex-wrap items-center gap-4 text-[10px] font-mono text-[#a1a1aa] uppercase tracking-widest pt-2"
              >
                {metadata.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-[#08080a]/75 backdrop-blur-md px-2.5 py-1 border border-[#22222c]">
                    <span className="text-[#c5a059]">{item.label}:</span>
                    <span>{item.value}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Optional Children Below Hero */}
      {children}
    </div>
  );
};
