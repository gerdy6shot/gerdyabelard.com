import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AmbientScene } from './AmbientScene';
import { InteractiveDepth } from './InteractiveDepth';
import { TypographyReveal } from './TypographyReveal';
import { SceneTransition } from './SceneTransition';

export const CinematicHero: React.FC = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleEnter = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsTransitioning(false);
      const nextScene = document.getElementById('scene-002-gallery');
      if (nextScene) {
        nextScene.scrollIntoView({ behavior: 'smooth' });
      }
    }, 900);
  };

  return (
    <section className="relative w-full h-screen bg-[#08080a] overflow-hidden">
      <AmbientScene>
        <InteractiveDepth depthScale={10}>
          <TypographyReveal onEnterClick={handleEnter} />
        </InteractiveDepth>
      </AmbientScene>

      <SceneTransition isActive={isTransitioning} />
    </section>
  );
};
