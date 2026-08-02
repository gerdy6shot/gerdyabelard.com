import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'motion/react';

interface InteractiveDepthProps {
  children: React.ReactNode;
  className?: string;
  depthScale?: number;
}

export const InteractiveDepth: React.FC<InteractiveDepthProps> = ({
  children,
  className = '',
  depthScale = 15,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const rotateX = useSpring((mousePos.y - 0.5) * -depthScale, { stiffness: 120, damping: 20 });
  const rotateY = useSpring((mousePos.x - 0.5) * depthScale, { stiffness: 120, damping: 20 });
  const translateX = useSpring((mousePos.x - 0.5) * (depthScale * 0.8), { stiffness: 100, damping: 22 });
  const translateY = useSpring((mousePos.y - 0.5) * (depthScale * 0.8), { stiffness: 100, damping: 22 });

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full perspective-1000 ${className}`}
      style={{ perspective: '1200px' }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          x: translateX,
          y: translateY,
          transformStyle: 'preserve-3d',
        }}
        className="w-full h-full flex flex-col items-center justify-center"
      >
        {children}
      </motion.div>
    </div>
  );
};
