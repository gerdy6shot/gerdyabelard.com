import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useAudioSystem } from '../audio/AudioManager';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { playCutSound } = useAudioSystem();
  const [isPoweringOff, setIsPoweringOff] = useState(false);
  const [tvStage, setTvStage] = useState<'normal' | 'collapse-v' | 'collapse-h' | 'black'>('normal');

  const handleEnterScene = () => {
    if (isPoweringOff) return;
    setIsPoweringOff(true);
    playCutSound();

    // Television Power-Off Sequence:
    // 1. Collapse vertical (200ms)
    setTvStage('collapse-v');
    
    setTimeout(() => {
      // 2. Collapse horizontal to pinpoint center dot (200ms)
      setTvStage('collapse-h');
    }, 220);

    setTimeout(() => {
      // 3. Black frame & signal interruption (200ms)
      setTvStage('black');
    }, 450);

    setTimeout(() => {
      // 4. Navigate to Work scene
      navigate('/work');
    }, 700);
  };

  return (
    <div 
      className="relative w-screen h-screen bg-[#000000] flex items-center justify-center overflow-hidden select-none cursor-pointer"
      onClick={handleEnterScene}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleEnterScene();
        }
      }}
      aria-label="GERDY ABELARD Title Sequence"
    >
      {/* Archival Analog Film Grain Texture */}
      <div 
        className="absolute inset-0 pointer-events-none z-10 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' h='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Feature Film Title Center Stage — Signature Director Lockup (Anthony Mandler Style) */}
      <main className="hero-container relative z-20">
        <h1 className="sr-only">GERDY ABELARD</h1>
        
        <motion.div 
          className="wordmark-wrapper"
          animate={
            tvStage === 'collapse-v'
              ? { scaleY: 0.003, scaleX: 1.05, filter: 'brightness(3) contrast(2)' }
              : tvStage === 'collapse-h'
              ? { scaleY: 0.003, scaleX: 0, filter: 'brightness(5)' }
              : tvStage === 'black'
              ? { opacity: 0 }
              : { scaleY: 1, scaleX: 1, filter: 'brightness(1)' }
          }
          transition={{ duration: 0.22, ease: [0.77, 0, 0.175, 1] }}
        >
          {/* GERDY */}
          <motion.span
            initial={{ opacity: 0, filter: 'blur(20px)', y: 12 }}
            animate={
              isPoweringOff
                ? { opacity: 1 }
                : { opacity: 1, filter: 'blur(0px)', y: 0 }
            }
            transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="word-gerdy"
          >
            GERDY
          </motion.span>
          
          {/* ABELARD */}
          <motion.span
            initial={{ opacity: 0, filter: 'blur(20px)', y: 18 }}
            animate={
              isPoweringOff
                ? { opacity: 1 }
                : { opacity: 1, filter: 'blur(0px)', y: 0 }
            }
            transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            className="word-abelard"
          >
            ABELARD
          </motion.span>
        </motion.div>
      </main>

      {/* CRT Television Power-Off Scanline & Signal Interruption Overlay */}
      <AnimatePresence>
        {isPoweringOff && (
          <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
            {/* White scanline line when collapsing */}
            {tvStage === 'collapse-v' && (
              <motion.div 
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                className="w-full h-[2px] bg-[#ffffff] shadow-[0_0_20px_#ffffff,0_0_40px_#ffffff]"
              />
            )}
            
            {/* White pinpoint dot when collapsing horizontally */}
            {tvStage === 'collapse-h' && (
              <motion.div 
                initial={{ opacity: 1, scale: 1 }}
                animate={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.18 }}
                className="w-3 h-3 rounded-full bg-[#ffffff] shadow-[0_0_30px_#ffffff,0_0_60px_#ffffff]"
              />
            )}

            {/* Signal interruption static flash */}
            {tvStage === 'black' && (
              <motion.div 
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="absolute inset-0 bg-[#ffffff]/10 backdrop-invert"
              />
            )}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

