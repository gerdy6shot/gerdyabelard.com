import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';

interface AudioContextType {
  isMuted: boolean;
  isInitialized: boolean;
  toggleAudio: () => void;
  playCutSound: () => void;
  playElectronicShutterSound: () => void;
  setSceneAtmosphere: (sceneKey: 'default' | 'archive' | 'project' | 'studio') => void;
}

const AudioSystemContext = createContext<AudioContextType>({
  isMuted: true,
  isInitialized: false,
  toggleAudio: () => {},
  playCutSound: () => {},
  playElectronicShutterSound: () => {},
  setSceneAtmosphere: () => {},
});

export const useAudioSystem = () => useContext(AudioSystemContext);

const STORAGE_KEY = 'gerdy_cinema_audio_active';

export const AudioManager: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted] = useState<boolean>(false); // Always active by default
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Web Audio Refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const ambientOsc1Ref = useRef<OscillatorNode | null>(null);
  const ambientOsc2Ref = useRef<OscillatorNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const sceneGainRef = useRef<GainNode | null>(null);
  const shutterBufferRef = useRef<AudioBuffer | null>(null);

  // Pre-fetch WAV shutter sample for ultra-crisp luxury audio playback
  const loadShutterSample = useCallback((ctx: AudioContext) => {
    if (shutterBufferRef.current) return;
    fetch('/sounds/camera_shutter.wav')
      .then((res) => res.arrayBuffer())
      .then((arrayBuffer) => ctx.decodeAudioData(arrayBuffer))
      .then((decodedBuffer) => {
        shutterBufferRef.current = decodedBuffer;
      })
      .catch(() => {
        // Fall back to synthesized Web Audio shutter DSP
      });
  }, []);

  // Initialize Web Audio Engine
  const initAudio = useCallback(() => {
    if (audioCtxRef.current) {
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume().catch(() => {});
      }
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      loadShutterSample(ctx);

      // Master Gain Node - Starts at atmosphere volume 0.08
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.08, ctx.currentTime);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // Filter Node for warm subterranean room hum
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, ctx.currentTime);
      filter.Q.setValueAtTime(1.5, ctx.currentTime);
      filter.connect(masterGain);
      filterRef.current = filter;

      // Scene Level Gain Node
      const sceneGain = ctx.createGain();
      sceneGain.gain.setValueAtTime(1.0, ctx.currentTime);
      sceneGain.connect(filter);
      sceneGainRef.current = sceneGain;

      // Primary Sub Ambient Sine (42 Hz)
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(42, ctx.currentTime);
      osc1.connect(sceneGain);
      osc1.start();
      ambientOsc1Ref.current = osc1;

      // Secondary Harmonic Sub (63 Hz)
      const osc2 = ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(63, ctx.currentTime);
      const osc2Gain = ctx.createGain();
      osc2Gain.gain.setValueAtTime(0.3, ctx.currentTime);
      osc2.connect(osc2Gain);
      osc2Gain.connect(sceneGain);
      osc2.start();
      ambientOsc2Ref.current = osc2;

      setIsInitialized(true);
    } catch (e) {
      console.warn('Web Audio API not supported or blocked:', e);
    }
  }, [loadShutterSample]);

  // Auto-start / auto-resume Web Audio Context on first user gesture anywhere in page
  useEffect(() => {
    const handleGesture = () => {
      if (!audioCtxRef.current) {
        initAudio();
      } else if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume().catch(() => {});
      }
    };

    window.addEventListener('click', handleGesture, { capture: true });
    window.addEventListener('pointerdown', handleGesture, { capture: true });
    window.addEventListener('keydown', handleGesture, { capture: true });
    window.addEventListener('touchstart', handleGesture, { capture: true });
    window.addEventListener('scroll', handleGesture, { capture: true, passive: true });

    return () => {
      window.removeEventListener('click', handleGesture, { capture: true });
      window.removeEventListener('pointerdown', handleGesture, { capture: true });
      window.removeEventListener('keydown', handleGesture, { capture: true });
      window.removeEventListener('touchstart', handleGesture, { capture: true });
      window.removeEventListener('scroll', handleGesture, { capture: true });
    };
  }, [initAudio]);

  // Listen globally for media play/pause/ended events to duck audio atmosphere when video plays
  useEffect(() => {
    const handlePlay = (e: Event) => {
      if (e.target instanceof HTMLVideoElement || e.target instanceof HTMLAudioElement) {
        setIsVideoPlaying(true);
      }
    };

    const handlePauseOrEnd = (e: Event) => {
      if (e.target instanceof HTMLVideoElement || e.target instanceof HTMLAudioElement) {
        setTimeout(() => {
          const videos = Array.from(document.querySelectorAll('video'));
          const playing = videos.some((v) => !v.paused && !v.ended && v.readyState > 1);
          setIsVideoPlaying(playing);
        }, 60);
      }
    };

    window.addEventListener('play', handlePlay, true);
    window.addEventListener('pause', handlePauseOrEnd, true);
    window.addEventListener('ended', handlePauseOrEnd, true);

    return () => {
      window.removeEventListener('play', handlePlay, true);
      window.removeEventListener('pause', handlePauseOrEnd, true);
      window.removeEventListener('ended', handlePauseOrEnd, true);
    };
  }, []);

  // Duck / Mute Atmosphere when Video is Playing
  useEffect(() => {
    if (!masterGainRef.current || !audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    const master = masterGainRef.current;

    if (isVideoPlaying) {
      // Fade atmosphere out smoothly when video is playing
      master.gain.setTargetAtTime(0, ctx.currentTime, 0.15);
    } else {
      // Restore atmosphere volume when no video is playing
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
      master.gain.setTargetAtTime(0.08, ctx.currentTime, 0.25);
    }
  }, [isVideoPlaying]);

  // Toggle Audio Master (Kept as compatibility stub, though UI controls are removed)
  const toggleAudio = useCallback(() => {
    if (!isInitialized) {
      initAudio();
    }
  }, [isInitialized, initAudio]);

  // Mechanical Camera Shutter / ARRI Film Gate Capture Sound Trigger
  const playCutSound = useCallback(() => {
    if (isMuted) return;
    if (!audioCtxRef.current) {
      initAudio();
    }
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    try {
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }

      // Route SFX directly to destination so it is NOT attenuated by the 0.08 ambient master gain
      const sfxBus = ctx.createGain();
      sfxBus.gain.setValueAtTime(0.85, ctx.currentTime);
      sfxBus.connect(ctx.destination);

      // If pre-rendered 1.0s luxury WAV audio buffer is available, play it
      if (shutterBufferRef.current) {
        const source = ctx.createBufferSource();
        source.buffer = shutterBufferRef.current;
        source.connect(sfxBus);
        source.start(ctx.currentTime);
        return;
      }

      // Fallback: Web Audio DSP Synthesizer
      const now = ctx.currentTime;

      // 1. Medium Format Mirror Slap / Heavy Camera Gate Sub Thump (Hasselblad / ARRI 35mm)
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(110, now);
      subOsc.frequency.exponentialRampToValueAtTime(32, now + 0.06);

      subGain.gain.setValueAtTime(0.6, now);
      subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);

      subOsc.connect(subGain);
      subGain.connect(sfxBus);
      subOsc.start(now);
      subOsc.stop(now + 0.075);

      // 2. High-Frequency Focal-Plane Shutter Curtain Snap
      const bufferSize = Math.floor(ctx.sampleRate * 0.05);
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.22));
      }

      const snapSource = ctx.createBufferSource();
      snapSource.buffer = noiseBuffer;

      const snapFilter = ctx.createBiquadFilter();
      snapFilter.type = 'bandpass';
      snapFilter.frequency.setValueAtTime(3200, now);
      snapFilter.Q.setValueAtTime(2.5, now);

      const snapGain = ctx.createGain();
      snapGain.gain.setValueAtTime(0.5, now);
      snapGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

      snapSource.connect(snapFilter);
      snapFilter.connect(snapGain);
      snapGain.connect(sfxBus);
      snapSource.start(now);
    } catch (err) {
      // Ignore transient audio error
    }
  }, [isMuted, initAudio]);

  // Modern Electronic Shutter Sound (High-Tech Cinema Frame Capture)
  const playElectronicShutterSound = useCallback(() => {
    if (isMuted) return;

    if (!audioCtxRef.current) {
      initAudio();
    }
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    try {
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }

      const now = ctx.currentTime;

      // High-volume SFX Bus directly to speaker destination (bypasses ambient 0.08 gain)
      const sfxBus = ctx.createGain();
      sfxBus.gain.setValueAtTime(0.95, now);
      sfxBus.connect(ctx.destination);

      // Play loaded WAV shutter sample if available
      if (shutterBufferRef.current) {
        const sampleSource = ctx.createBufferSource();
        sampleSource.buffer = shutterBufferRef.current;
        const sampleGain = ctx.createGain();
        sampleGain.gain.setValueAtTime(0.8, now);
        sampleSource.connect(sampleGain);
        sampleGain.connect(sfxBus);
        sampleSource.start(now);
      }

      // 1. Electronic Shutter Chirp Sweep (4800Hz -> 1200Hz sharp glide)
      const chirpOsc = ctx.createOscillator();
      const chirpGain = ctx.createGain();
      chirpOsc.type = 'sawtooth';
      chirpOsc.frequency.setValueAtTime(4800, now);
      chirpOsc.frequency.exponentialRampToValueAtTime(1200, now + 0.035);

      chirpGain.gain.setValueAtTime(0.55, now);
      chirpGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

      chirpOsc.connect(chirpGain);
      chirpGain.connect(sfxBus);
      chirpOsc.start(now);
      chirpOsc.stop(now + 0.045);

      // 2. High-Tech Frame Capture Lock Double-Beep
      const lockOsc = ctx.createOscillator();
      const lockGain = ctx.createGain();
      lockOsc.type = 'sine';
      lockOsc.frequency.setValueAtTime(2200, now + 0.005);
      lockOsc.frequency.exponentialRampToValueAtTime(3500, now + 0.025);

      lockGain.gain.setValueAtTime(0, now);
      lockGain.gain.setValueAtTime(0.4, now + 0.005);
      lockGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

      lockOsc.connect(lockGain);
      lockGain.connect(sfxBus);
      lockOsc.start(now + 0.005);
      lockOsc.stop(now + 0.05);

      // 3. Crisp High-Frequency Mechanical Transient Click
      const bufferSize = Math.floor(ctx.sampleRate * 0.035);
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.12));
      }

      const clickSource = ctx.createBufferSource();
      clickSource.buffer = noiseBuffer;

      const clickFilter = ctx.createBiquadFilter();
      clickFilter.type = 'highpass';
      clickFilter.frequency.setValueAtTime(3500, now);

      const clickGain = ctx.createGain();
      clickGain.gain.setValueAtTime(0.6, now);
      clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);

      clickSource.connect(clickFilter);
      clickFilter.connect(clickGain);
      clickGain.connect(sfxBus);
      clickSource.start(now);

      // 4. Low-Frequency Punchy Camera Mirror Body Thump (180Hz -> 42Hz)
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(180, now);
      subOsc.frequency.exponentialRampToValueAtTime(42, now + 0.06);

      subGain.gain.setValueAtTime(0.7, now);
      subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.065);

      subOsc.connect(subGain);
      subGain.connect(sfxBus);
      subOsc.start(now);
      subOsc.stop(now + 0.07);
    } catch (err) {
      // Ignore transient audio error
    }
  }, [isMuted, initAudio]);

  // Scene Atmosphere Modulation
  const setSceneAtmosphere = useCallback((sceneKey: 'default' | 'archive' | 'project' | 'studio') => {
    if (!filterRef.current || !audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    const filter = filterRef.current;

    switch (sceneKey) {
      case 'archive':
        filter.frequency.setTargetAtTime(180, ctx.currentTime, 0.5);
        break;
      case 'project':
        filter.frequency.setTargetAtTime(220, ctx.currentTime, 0.5);
        break;
      case 'studio':
        filter.frequency.setTargetAtTime(120, ctx.currentTime, 0.5);
        break;
      default:
        filter.frequency.setTargetAtTime(140, ctx.currentTime, 0.5);
        break;
    }
  }, []);

  return (
    <AudioSystemContext.Provider
      value={{
        isMuted,
        isInitialized,
        toggleAudio,
        playCutSound,
        playElectronicShutterSound,
        setSceneAtmosphere,
      }}
    >
      {children}
    </AudioSystemContext.Provider>
  );
};
