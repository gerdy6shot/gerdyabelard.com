import React, { useState } from 'react';
import { motion } from 'motion/react';

interface CameraMotionProps {
  children: React.ReactNode;
  mode?: 'slow-zoom' | 'parallax' | 'subtle-drift';
  intensity?: number;
  className?: string;
}

export const CameraMotion: React.FC<CameraMotionProps> = ({
  children,
  mode = 'slow-zoom',
  intensity = 1.03,
  className = '',
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (mode !== 'parallax') return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / (width / 2);
    const y = (e.clientY - top - height / 2) / (height / 2);
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  if (mode === 'parallax') {
    return (
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`overflow-hidden perspective-1000 ${className}`}
      >
        <motion.div
          animate={{
            rotateY: mousePos.x * 2.5,
            rotateX: -mousePos.y * 2.5,
            scale: 1.01,
          }}
          transition={{ type: 'spring', stiffness: 100, damping: 30, mass: 1 }}
          className="w-full h-full transform-gpu"
        >
          {children}
        </motion.div>
      </div>
    );
  }

  if (mode === 'subtle-drift') {
    return (
      <div className={`overflow-hidden ${className}`}>
        <motion.div
          animate={{
            scale: [1, intensity, 1],
            x: [0, 6, -6, 0],
            y: [0, -4, 4, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
          className="w-full h-full"
        >
          {children}
        </motion.div>
      </div>
    );
  }

  // Default: slow-zoom
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        animate={{
          scale: [1, intensity],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
};
