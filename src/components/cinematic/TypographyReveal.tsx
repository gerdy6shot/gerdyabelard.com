import React from 'react';
import { motion } from 'motion/react';
import { useAudioSystem } from '../../audio/AudioManager';

interface TypographyRevealProps {
  onEnterClick?: () => void;
}

export const TypographyReveal: React.FC<TypographyRevealProps> = ({ onEnterClick }) => {
  const { playElectronicShutterSound } = useAudioSystem();

  const handleEnterClick = () => {
    playElectronicShutterSound();
    if (onEnterClick) {
      onEnterClick();
    }
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-8 z-20 overflow-hidden">
      {/* Hero Title Container */}
      <div className="hero-title-container my-auto flex flex-col items-center">
        {/* Scene Marker */}
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-[10px] sm:text-xs font-mono tracking-[0.4em] text-[#8a8a8a] uppercase block mb-6 select-none"
        >
          SCENE 001 // TITLE SEQUENCE
        </motion.span>

        {/* Feature Film Title Card Wordmark */}
        <h1 className="hero-title select-none">
          <motion.span
            className="first"
            initial={{ opacity: 0, filter: 'blur(12px)', y: 24 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          >
            GERDY
          </motion.span>
          <motion.span
            className="last"
            initial={{ opacity: 0, filter: 'blur(12px)', y: 24 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.56 }} // 160ms delay after GERDY
          >
            ABELARD
          </motion.span>
        </h1>

        {/* Enter Studio Trigger */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-12 sm:mt-16"
        >
          <button
            type="button"
            onClick={handleEnterClick}
            className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 bg-[#0a0a0d] border border-[#22222c] text-[#f5f5f5] text-[11px] sm:text-xs font-mono uppercase tracking-[0.3em] hover:border-[#c5a059] hover:text-[#c5a059] transition-all duration-500 shadow-2xl active:scale-95 cursor-pointer"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] animate-ping" />
            <span>ENTER THE STUDIO</span>
            <span className="text-[10px] text-[#8a8a8a] group-hover:text-[#c5a059] transition-colors ml-1">
              [SCENE 002]
            </span>
          </button>
        </motion.div>
      </div>

      {/* Hero Credit Line - Film Title Card Style */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.8 }}
        className="hero-credit select-none"
      >
        AESTHETIC DIRECTOR
      </motion.div>
    </div>
  );
};

