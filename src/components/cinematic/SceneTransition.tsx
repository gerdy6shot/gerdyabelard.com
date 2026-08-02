import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { useAudioSystem } from '../../audio/AudioManager';

interface SceneTransitionProps {
  children: React.ReactNode;
}

type TransitionLevel = 'title' | 'project' | 'world';

const getTransitionLevel = (pathname: string): TransitionLevel => {
  if (pathname === '/') return 'title';
  if (pathname.startsWith('/work/') || pathname.startsWith('/projects/')) return 'project';
  return 'world';
};

export const SceneTransition: React.FC<SceneTransitionProps> = ({ children }) => {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const level = getTransitionLevel(location.pathname);
  const { playCutSound } = useAudioSystem();

  const [isBlackFrameActive, setIsBlackFrameActive] = useState(false);
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    if (prevPathRef.current !== location.pathname) {
      prevPathRef.current = location.pathname;
    }
  }, [location.pathname]);

  const handleExitComplete = () => {
    // CAMERA SHUTTER EVENT: Trigger mechanical shutter click & sub-thump audio
    playCutSound();

    // BLACK FRAME / FILM CUT MOMENT: Screen briefly becomes a dark projection surface (180ms)
    setIsBlackFrameActive(true);
    setTimeout(() => {
      setIsBlackFrameActive(false);
    }, 180);
  };

  // Motion variants according to directive:
  // Scene Exit: 450-480ms duration with opacity reduction, subtle scale change, and cinematic fade.
  // New Scene Arrival: Hero image enters first, followed by typography and interaction layers.
  const variants = {
    title: {
      initial: { opacity: 0, scaleY: 0.005, scaleX: 0.8, filter: 'brightness(3) blur(6px)' },
      animate: { opacity: 1, scaleY: 1, scaleX: 1, filter: 'brightness(1) blur(0px)' },
      exit: { opacity: 0, scaleY: 0.005, scaleX: 1, filter: 'brightness(2.5) blur(2px)' },
      transitionAnimate: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
      transitionExit: { duration: 0.45, ease: [0.7, 0, 0.84, 0] },
    },
    world: {
      initial: { opacity: 0, scale: 1.015, y: 12, filter: 'blur(4px)' },
      animate: { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' },
      exit: { opacity: 0, scale: 0.985, y: -6, filter: 'blur(3px)' },
      transitionAnimate: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
      transitionExit: { duration: 0.48, ease: [0.7, 0, 0.84, 0] },
    },
    project: {
      initial: { opacity: 0, scale: 0.982, y: 16, filter: 'blur(3px)' },
      animate: { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' },
      exit: { opacity: 0, scale: 1.008, y: -6, filter: 'blur(2px)' },
      transitionAnimate: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
      transitionExit: { duration: 0.45, ease: [0.7, 0, 0.84, 0] },
    },
  };

  const currentVariant = variants[level];

  if (shouldReduceMotion) {
    return (
      <AnimatePresence mode="wait" initial={false} onExitComplete={handleExitComplete}>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.3 } }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          className="w-full min-h-screen relative"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <div className="relative w-full min-h-screen">
      {/* BLACK FRAME / FILM CUT PROJECTION SURFACE OVERLAY */}
      <AnimatePresence>
        {isBlackFrameActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.08 }}
            className="fixed inset-0 bg-[#040406] z-[9999] pointer-events-none flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-2 font-mono text-[9px] uppercase tracking-[0.35em] text-[#333342]">
              <div className="w-1.5 h-1.5 bg-[#c5a059] rounded-full animate-ping" />
              <span>FRAME CAPTURE // FILM CUT</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait" initial={false} onExitComplete={handleExitComplete}>
        <motion.div
          key={location.pathname}
          initial={currentVariant.initial}
          animate={{
            ...currentVariant.animate,
            transition: currentVariant.transitionAnimate,
          }}
          exit={{
            ...currentVariant.exit,
            transition: currentVariant.transitionExit,
          }}
          className="w-full min-h-screen relative"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};



