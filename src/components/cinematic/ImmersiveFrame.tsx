import React, { useRef, useState } from 'react';
import { motion, useSpring, useTransform } from 'motion/react';
import { useNavigate } from 'react-router-dom';

interface ImmersiveFrameProps {
  id: string;
  slug: string;
  title: string;
  category: string;
  year: number | string;
  role: string;
  client?: string;
  imageUrl: string;
  index: number;
}

export const ImmersiveFrame: React.FC<ImmersiveFrameProps> = ({
  slug,
  title,
  category,
  year,
  role,
  client = 'GERDY ABELARD STUDIO',
  imageUrl,
  index,
}) => {
  const navigate = useNavigate();
  const frameRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  const rotateX = useSpring((mousePos.y - 0.5) * -8, { stiffness: 100, damping: 20 });
  const rotateY = useSpring((mousePos.x - 0.5) * 8, { stiffness: 100, damping: 20 });
  const scale = useSpring(isHovered ? 1.02 : 1, { stiffness: 120, damping: 20 });

  const handleClick = () => {
    navigate(`/work/${slug}`);
  };

  return (
    <div
      ref={frameRef}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: 0.5, y: 0.5 });
      }}
      onMouseMove={handleMouseMove}
      className="relative w-full h-[85vh] sm:h-[90vh] bg-[#08080a] cursor-pointer overflow-hidden select-none group border-b border-[#181820]"
      style={{ perspective: '1200px' }}
    >
      {/* 3D Depth Layer for Cinema Frame */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: 'preserve-3d',
        }}
        className="w-full h-full relative"
      >
        {/* Full-Bleed Cinematic Masterwork Still */}
        <img
          src={imageUrl}
          alt={title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover filter contrast-125 brightness-90 group-hover:brightness-100 transition-all duration-1000"
        />

        {/* Deep Shadows & Vignette Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-transparent to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-700" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_30%,_#08080a_95%)] pointer-events-none" />

        {/* Minimal Frame Index Code */}
        <div className="absolute top-8 left-8 sm:top-12 sm:left-12 font-mono text-[10px] tracking-[0.35em] text-[#8a8a8a] uppercase z-20">
          FRAME // 00{index + 1}
        </div>

        {/* Pure Minimal Metadata Overlay - No introductions or copy */}
        <div className="absolute bottom-8 left-8 right-8 sm:bottom-12 sm:left-12 sm:right-12 z-20 flex flex-col md:flex-row md:items-end justify-between gap-6 pointer-events-none">
          <div className="space-y-2">
            <h2 className="font-serif-display text-3xl sm:text-5xl lg:text-7xl text-[#f5f5f5] uppercase tracking-[0.1em] font-normal leading-none group-hover:text-white transition-colors duration-500">
              {title}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#c5a059] uppercase tracking-[0.25em]">
              <span>{category}</span>
              <span className="text-[#333342]">•</span>
              <span>{year}</span>
            </div>
          </div>

          <div className="font-mono text-[10px] sm:text-xs text-[#8a8a8a] uppercase tracking-[0.25em] space-y-1 text-left md:text-right">
            <div>ROLE: {role}</div>
            <div>CLIENT: {client}</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
