import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { GlobalHeader } from '../navigation/GlobalHeader';
import { GlobalFooter } from '../navigation/GlobalFooter';
import { FilmGrain } from '../cinematic/FilmGrain';
import { SceneTransition } from '../cinematic/SceneTransition';
import { AudioManager } from '../../audio/AudioManager';
import { SceneAudio } from '../../audio/SceneAudio';

export const CinematicShell: React.FC = () => {
  const location = useLocation();
  const isOpeningTitle = location.pathname === '/';
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) {
    return <Outlet />;
  }

  if (isOpeningTitle) {
    return (
      <AudioManager>
        <SceneAudio />
        <div className="w-full h-full bg-[#08080a] text-[#f5f5f5] relative">
          <FilmGrain opacity={0.06} />
          <SceneTransition>
            <Outlet />
          </SceneTransition>
        </div>
      </AudioManager>
    );
  }

  return (
    <AudioManager>
      <SceneAudio />
      <div className="flex flex-col min-h-screen bg-[#08080a] text-[#f5f5f5] selection:bg-[#c5a059] selection:text-[#08080a] relative">
        <FilmGrain opacity={0.05} />
        <GlobalHeader />
        <main className="flex-grow">
          <SceneTransition>
            <Outlet />
          </SceneTransition>
        </main>
        <GlobalFooter />
      </div>
    </AudioManager>
  );
};


