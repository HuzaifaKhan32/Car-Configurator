/**
 * Synthesizes an authentic twin-turbo flat-6 engine rev sound using Web Audio API
 */
export function playPorscheEngineRev() {
  if (typeof window === 'undefined') return;

  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    // 1. Deep rumble oscillator (fundamental tone)
    const osc1 = ctx.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(65, now);
    osc1.frequency.exponentialRampToValueAtTime(280, now + 0.35);
    osc1.frequency.exponentialRampToValueAtTime(190, now + 0.6);
    osc1.frequency.exponentialRampToValueAtTime(80, now + 1.1);

    // 2. Harmonic flat-6 oscillator
    const osc2 = ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(130, now);
    osc2.frequency.exponentialRampToValueAtTime(560, now + 0.35);
    osc2.frequency.exponentialRampToValueAtTime(380, now + 0.6);
    osc2.frequency.exponentialRampToValueAtTime(160, now + 1.1);

    // Filter to give exhaust resonance
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(300, now);
    filter.frequency.exponentialRampToValueAtTime(1400, now + 0.35);
    filter.frequency.exponentialRampToValueAtTime(450, now + 1.1);
    filter.Q.value = 4.5;

    // Gain envelope
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.35, now + 0.15);
    gain.gain.linearRampToValueAtTime(0.28, now + 0.5);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.15);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 1.2);
    osc2.stop(now + 1.2);
  } catch {
    // Audio context may be restricted by autoplay policy before user gesture
  }
}
