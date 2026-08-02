import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface DepthImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  grayscale?: boolean;
}

export const DepthImage: React.FC<DepthImageProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = 'aspect-[16/9]',
  grayscale = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [6, -6]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-6, 6]), { stiffness: 200, damping: 25 });
  const scale = useSpring(isHovered ? 1.03 : 1, { stiffness: 200, damping: 20 });
  const innerTranslateX = useSpring(useTransform(mouseX, [0, 1], [-12, 12]), { stiffness: 150, damping: 20 });
  const innerTranslateY = useSpring(useTransform(mouseY, [0, 1], [-12, 12]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden cursor-pointer perspective-1000 ${aspectRatio} ${className}`}
      style={{ perspective: '1200px' }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: 'preserve-3d',
        }}
        className="w-full h-full relative transition-shadow duration-500"
      >
        <motion.img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          style={{
            x: innerTranslateX,
            y: innerTranslateY,
            scale: 1.08,
          }}
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${
            grayscale ? 'filter grayscale contrast-125 group-hover:grayscale-0' : ''
          }`}
        />
        
        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-transparent to-[#08080a]/40 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-vignette opacity-60 pointer-events-none" />
      </motion.div>
    </div>
  );
};
