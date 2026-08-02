import React from 'react';
import { motion, MotionValue } from 'motion/react';

interface AmbientSceneProps {
  mouseX?: MotionValue<number>;
  mouseY?: MotionValue<number>;
  children?: React.ReactNode;
}

export const AmbientScene: React.FC<AmbientSceneProps> = ({ children }) => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#08080a] flex items-center justify-center select-none">
      {/* Archival Grain & Atmosphere Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-10 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' h='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_20%,_#08080a_95%)] pointer-events-none z-10" />

      {/* Subtle Lens Flare Glow */}
      <motion.div 
        animate={{
          opacity: [0.15, 0.25, 0.15],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c5a059]/10 rounded-full blur-[140px] pointer-events-none"
      />

      {children}
    </div>
  );
};
