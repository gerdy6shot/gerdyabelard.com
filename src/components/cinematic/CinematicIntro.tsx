import React, { useState } from 'react';
import { AmbientScene } from './AmbientScene';
import { InteractiveDepth } from './InteractiveDepth';
import { TypographyReveal } from './TypographyReveal';
import { SceneTransition } from './SceneTransition';

interface CinematicIntroProps {
  onEnterScene?: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onEnterScene }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleEnter = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsTransitioning(false);
      if (onEnterScene) {
        onEnterScene();
      } else {
        const nextScene = document.getElementById('scene-002-gallery');
        if (nextScene) {
          nextScene.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 900);
  };

  return (
    <>
      <AmbientScene>
        <InteractiveDepth depthScale={12}>
          <TypographyReveal onEnterClick={handleEnter} />
        </InteractiveDepth>
      </AmbientScene>

      <SceneTransition isActive={isTransitioning} />
    </>
  );
};
