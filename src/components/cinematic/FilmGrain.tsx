import React, { useEffect, useState } from 'react';

interface FilmGrainProps {
  opacity?: number;
}

export const FilmGrain: React.FC<FilmGrainProps> = ({ opacity = 0.05 }) => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  if (reducedMotion) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[999] overflow-hidden select-none"
      aria-hidden="true"
      style={{ opacity }}
    >
      <svg className="h-full w-full opacity-60">
        <filter id="cinematic-film-grain-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect
          width="100%"
          height="100%"
          filter="url(#cinematic-film-grain-filter)"
          className="animate-grain"
        />
      </svg>
      <style>{`
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-1%, -1%); }
          30% { transform: translate(1%, -2%); }
          50% { transform: translate(-1%, 2%); }
          70% { transform: translate(2%, 1%); }
          90% { transform: translate(-2%, 1%); }
        }
        .animate-grain {
          animation: grain 0.8s steps(6) infinite;
        }
      `}</style>
    </div>
  );
};
