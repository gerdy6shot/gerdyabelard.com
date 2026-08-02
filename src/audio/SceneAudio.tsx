import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useAudioSystem } from './AudioManager';

export const SceneAudio: React.FC = () => {
  const location = useLocation();
  const { playCutSound, setSceneAtmosphere } = useAudioSystem();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Trigger subtle film cut / shutter sound on route transitions
    playCutSound();

    // Map route path to scene audio profile
    const path = location.pathname;
    if (path.startsWith('/archive') || path.startsWith('/work')) {
      setSceneAtmosphere('archive');
    } else if (path.startsWith('/projects/')) {
      setSceneAtmosphere('project');
    } else if (path.startsWith('/comviewmedia')) {
      setSceneAtmosphere('studio');
    } else {
      setSceneAtmosphere('default');
    }
  }, [location.pathname, playCutSound, setSceneAtmosphere]);

  return null;
};
