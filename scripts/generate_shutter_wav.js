import fs from 'fs';
import path from 'path';

const SAMPLE_RATE = 44100;
const DURATION = 1.0; // 1 second maximum
const TOTAL_SAMPLES = Math.floor(SAMPLE_RATE * DURATION);

const left = new Float32Array(TOTAL_SAMPLES);
const right = new Float32Array(TOTAL_SAMPLES);

// Seeded noise or pseudo-random
let seed = 12345;
function random() {
  seed = (seed * 9301 + 49297) % 233280;
  return seed / 233280 * 2 - 1;
}

// Lowpass filter state
let lpL = 0, lpR = 0;

for (let i = 0; i < TOTAL_SAMPLES; i++) {
  const t = i / SAMPLE_RATE; // in seconds

  // --- LAYER 1: MECHANICAL LEAF SHUTTER OPEN & CLOSE CLICKS (0ms & 26ms) ---
  let shutterSnap = 0;
  // Opening leaf click (t = 0.002s)
  if (t >= 0.001 && t < 0.035) {
    const dt = t - 0.001;
    const env = Math.exp(-dt * 220); // rapid decay
    const metallicClick = Math.sin(2 * Math.PI * 2800 * dt) * 0.4 + (random() * 0.6);
    shutterSnap += metallicClick * env * 0.35;
  }
  // Closing leaf click (t = 0.028s - 28ms later)
  if (t >= 0.026 && t < 0.065) {
    const dt = t - 0.026;
    const env = Math.exp(-dt * 180);
    const metallicClick = Math.sin(2 * Math.PI * 1900 * dt) * 0.5 + (random() * 0.5);
    shutterSnap += metallicClick * env * 0.30;
  }

  // --- LAYER 2: CAMERA BODY RESONANCE & MIRROR SLAP (Sub-Thump) ---
  let bodyResonance = 0;
  if (t >= 0.003 && t < 0.180) {
    const dt = t - 0.003;
    // Sub-frequency sweep: 90Hz down to 32Hz
    const freq = 32 + (90 - 32) * Math.exp(-dt * 40);
    const phase = 2 * Math.PI * freq * dt;
    const bodyEnv = Math.exp(-dt * 28);
    // Magnesium alloy housing ring at 180Hz
    const housingRing = Math.sin(2 * Math.PI * 180 * dt) * Math.exp(-dt * 60) * 0.2;
    bodyResonance = (Math.sin(phase) * 0.5 + housingRing) * bodyEnv;
  }

  // --- LAYER 3: MECHANICAL ESCAPEMENT & GEAR RATCHET (28ms - 110ms) ---
  let gearRatchet = 0;
  if (t >= 0.028 && t < 0.120) {
    const dt = t - 0.028;
    const env = Math.exp(-dt * 35);
    const ratchet = Math.sin(2 * Math.PI * 1200 * dt) * Math.sin(2 * Math.PI * 80 * dt);
    gearRatchet = ratchet * env * 0.08;
  }

  // --- LAYER 4: ANALOG FILM TEXTURE / GRAIN (0 - 650ms) ---
  let filmGrain = 0;
  if (t < 0.65) {
    const rawNoise = random();
    // One-pole lowpass filter around 1800Hz for warm analog character
    lpL = lpL + 0.15 * (rawNoise - lpL);
    const grainEnv = Math.exp(-t * 4.5); // smooth fade
    filmGrain = lpL * grainEnv * 0.025;
  }

  // --- LAYER 5: DEEP STUDIO ATMOSPHERE & SUB PRESENCE (0 - 900ms) ---
  let studioAtmosphere = 0;
  if (t < 0.90) {
    const subSine = Math.sin(2 * Math.PI * 40 * t);
    // Smooth fade in & lingering tail
    const subEnv = Math.sin(Math.PI * (t / 0.90)) * Math.exp(-t * 1.8);
    studioAtmosphere = subSine * subEnv * 0.06;
  }

  // COMBINE LAYERS
  const mono = shutterSnap + bodyResonance * 0.45 + gearRatchet + filmGrain + studioAtmosphere;

  // Subtle stereo spread for realistic spatial presence in dark studio
  left[i] = mono * 0.95 + (shutterSnap * 0.1);
  right[i] = mono * 0.95 - (shutterSnap * 0.1);
}

// Normalize to peak -1dB to avoid clipping and guarantee dynamic range
let maxAmp = 0;
for (let i = 0; i < TOTAL_SAMPLES; i++) {
  maxAmp = Math.max(maxAmp, Math.abs(left[i]), Math.abs(right[i]));
}
const normFactor = maxAmp > 0 ? (0.85 / maxAmp) : 1.0;

for (let i = 0; i < TOTAL_SAMPLES; i++) {
  left[i] *= normFactor;
  right[i] *= normFactor;
}

// CONVERT TO 16-BIT STEREO WAV BUFFER
function createWavBuffer(leftSamples, rightSamples, sampleRate) {
  const numChannels = 2;
  const bytesPerSample = 2;
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataSize = leftSamples.length * blockAlign;
  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);

  // fmt subchunk
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // Subchunk1Size
  buffer.writeUInt16LE(1, 20); // AudioFormat (1 = PCM)
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(16, 34); // BitsPerSample

  // data subchunk
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  let offset = 44;
  for (let i = 0; i < leftSamples.length; i++) {
    const sL = Math.max(-1, Math.min(1, leftSamples[i]));
    const sR = Math.max(-1, Math.min(1, rightSamples[i]));
    buffer.writeInt16LE(Math.floor(sL < 0 ? sL * 32768 : sL * 32767), offset);
    buffer.writeInt16LE(Math.floor(sR < 0 ? sR * 32768 : sR * 32767), offset + 2);
    offset += 4;
  }

  return buffer;
}

const wavBuffer = createWavBuffer(left, right, SAMPLE_RATE);
const dir = path.join(process.cwd(), 'public', 'sounds');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}
const outputPath = path.join(dir, 'camera_shutter.wav');
fs.writeFileSync(outputPath, wavBuffer);
console.log(`Generated WAV sound asset: ${outputPath} (${wavBuffer.length} bytes)`);
