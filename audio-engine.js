/**
 * Earth Information Jukebox - Studio-Grade Sonification Engine
 * Built with Tone.js and native Web Audio fallback.
 * Implements warm D Major Pentatonic / Lydian scale sonification,
 * 4-Channel DJ Stem Mixer, Spatial Panning, Visual Frame Sonifier, and A/B Time Machine.
 */

export class ClimateAudioEngine {
  constructor() {
    this.isInitialized = false;
    this.isPlaying = false;
    this.tempoSpeed = 1; // 1x, 2x, 4x
    this.masterVolume = 0.85;

    // Stem settings: volume (0-1), muted (bool), solo (bool)
    this.stems = {
      temp: { name: 'Surface Temperature', vol: 0.85, muted: false, solo: false, level: 0 },
      precip: { name: 'Precipitation', vol: 0.80, muted: false, solo: false, level: 0 },
      solar: { name: 'Solar Insolation', vol: 0.75, muted: false, solo: false, level: 0 },
      alert: { name: 'Extreme Anomaly', vol: 0.90, muted: false, solo: false, level: 0 }
    };

    // Modes
    this.eyesClosedMode = false;
    this.pixelSonifierMode = false;
    this.abTimeMachineMode = false;
    this.abActivePhase = 'A'; // 'A' (1985) or 'B' (2025)

    // Musical Scale: D Major Pentatonic / Lydian (D, E, F#, G#, A, B, C#)
    // Evocative documentary soundscape, never harsh
    this.notes = {
      bass: ['D2', 'F#2', 'A2', 'B2', 'D3'],
      lead: ['D3', 'E3', 'F#3', 'G#3', 'A3', 'B3', 'C#4', 'D4', 'E4', 'F#4', 'G#4', 'A4', 'B4', 'C#5', 'D5'],
      marimba: ['D4', 'F#4', 'A4', 'B4', 'C#5', 'D5', 'E5', 'F#5', 'A5'],
      padChords: [
        ['D3', 'F#3', 'A3', 'C#4', 'E4'], // Dmaj9 (Warm Earth base)
        ['G3', 'B3', 'D4', 'F#4', 'A4'],  // Gmaj9 (Ocean expanse)
        ['B2', 'D3', 'F#3', 'A3', 'C#4'], // Bm9 (Deep Cryosphere)
        ['E3', 'G#3', 'B3', 'D4', 'F#4']  // E9 / D Lydian color
      ],
      bellNotes: ['A5', 'C#6', 'D6', 'E6', 'F#6', 'A6']
    };

    // Tone.js nodes
    this.tone = null;
    this.nodes = {};
    this.analysers = {};

    // Native Web Audio fallback if Tone.js is unavailable
    this.audioCtx = null;
    this.nativeNodes = {};
  }

  /**
   * Unlock and initialize Web Audio context upon first user gesture
   */
  async init() {
    if (this.isInitialized) return true;

    if (window.Tone) {
      try {
        this.tone = window.Tone;
        await this.tone.start();
        this.setupToneGraph();
        this.isInitialized = true;
        return true;
      } catch (toneErr) {
        console.warn('Tone.js startup failed, falling back to Native Web Audio:', toneErr);
      }
    }

    try {
      this.setupNativeWebAudio();
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        await this.audioCtx.resume();
      }
      this.isInitialized = true;
      return true;
    } catch (e) {
      console.error('Native Web Audio fallback failed:', e);
      return false;
    }
  }

  /**
   * Build Tone.js DSP graph with 4 stems, filters, spatial panning, delay, and reverb
   */
  setupToneGraph() {
    const Tone = this.tone;

    // Master bus
    this.masterLimiter = new Tone.Limiter(-1).toDestination();
    this.masterReverb = new Tone.Reverb({ decay: 2.8, wet: 0.35 }).connect(this.masterLimiter);
    this.masterReverb.generate();

    // Stereo Panner for "Eyes-Closed Museum Audio Guide" (left = past 1980s, right = present 2020s)
    this.temporalPanner = new Tone.Panner(0).connect(this.masterReverb);

    // Stem 1: Surface Temperature (Lead Analog Synth with LP filter glide)
    this.tempFilter = new Tone.Filter({ frequency: 800, type: 'lowpass', rolloff: -24 });
    this.tempGain = new Tone.Gain(this.stems.temp.vol).connect(this.temporalPanner);
    this.tempFilter.connect(this.tempGain);
    this.tempSynth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'sawtooth8' },
      envelope: { attack: 0.08, decay: 0.3, sustain: 0.6, release: 0.8 }
    }).connect(this.tempFilter);
    this.tempSynth.set({ portamento: 0.06 });

    // Stem 2: Precipitation (Acoustic Marimba with Ping-Pong stereo delay)
    this.precipDelay = new Tone.PingPongDelay({ delayTime: '8n', feedback: 0.25, wet: 0.3 });
    this.precipGain = new Tone.Gain(this.stems.precip.vol).connect(this.temporalPanner);
    this.precipDelay.connect(this.precipGain);
    this.precipGainDirect = new Tone.Gain(1).connect(this.temporalPanner);
    this.precipSynth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'sine' },
      envelope: { attack: 0.005, decay: 0.22, sustain: 0.05, release: 0.4 }
    });
    this.precipSynth.connect(this.precipDelay);
    this.precipSynth.connect(this.precipGainDirect);

    // Stem 3: Solar Insolation (Lush Cosmic Pad with Chorus)
    this.solarChorus = new Tone.Chorus({ frequency: 1.5, delayTime: 3.5, depth: 0.7, wet: 0.4 }).start();
    this.solarFilter = new Tone.Filter({ frequency: 1200, type: 'lowpass' });
    this.solarGain = new Tone.Gain(this.stems.solar.vol).connect(this.temporalPanner);
    this.solarFilter.connect(this.solarChorus);
    this.solarChorus.connect(this.solarGain);
    this.solarSynth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'triangle' },
      envelope: { attack: 0.5, decay: 0.8, sustain: 0.8, release: 1.5 }
    }).connect(this.solarFilter);

    // Stem 4: Extreme Climate Anomaly (Crystal Bell Chime)
    this.alertGain = new Tone.Gain(this.stems.alert.vol).connect(this.temporalPanner);
    this.alertSynth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'sine' },
      envelope: { attack: 0.01, decay: 1.2, sustain: 0.1, release: 2.0 }
    }).connect(this.alertGain);

    // Visual Frame Sonifier Synth (harmonic oscillators for satellite frame pixels)
    this.pixelGain = new Tone.Gain(0.5).connect(this.temporalPanner);
    this.pixelSynth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'sine' },
      envelope: { attack: 0.2, decay: 0.4, sustain: 0.4, release: 0.6 }
    }).connect(this.pixelGain);

    // Individual Stem Meters for Live VU Meters
    this.meters = {
      temp: new Tone.Meter(),
      precip: new Tone.Meter(),
      solar: new Tone.Meter(),
      alert: new Tone.Meter()
    };
    this.tempGain.connect(this.meters.temp);
    this.precipGain.connect(this.meters.precip);
    this.solarGain.connect(this.meters.solar);
    this.alertGain.connect(this.meters.alert);

    // Master Waveform FFT Analyser for vinyl reactive rings & HUD
    this.masterAnalyser = new Tone.Analyser('waveform', 64);
    this.temporalPanner.connect(this.masterAnalyser);
  }

  /**
   * Native Web Audio fallback graph (guarantees audio works anywhere without external library)
   */
  setupNativeWebAudio() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioCtx = new AudioContext();

    this.nativeMasterGain = this.audioCtx.createGain();
    this.nativeMasterGain.gain.value = this.masterVolume;
    this.nativeMasterGain.connect(this.audioCtx.destination);

    // Panner
    if (this.audioCtx.createStereoPanner) {
      this.nativePanner = this.audioCtx.createStereoPanner();
      this.nativePanner.pan.value = 0;
      this.nativePanner.connect(this.nativeMasterGain);
    } else {
      this.nativePanner = this.nativeMasterGain;
    }

    // Master Analyser
    this.nativeAnalyser = this.audioCtx.createAnalyser();
    this.nativeAnalyser.fftSize = 64;
    this.nativePanner.connect(this.nativeAnalyser);
  }

  /**
   * Sonify one chronological month data point
   * @param {Object} dataPoint - { date, year, month, t2m, anomaly, precip, solar, co2 }
   */
  sonifyDataPoint(dataPoint) {
    if (!this.isInitialized || !dataPoint) return;

    const { year, t2m, anomaly, precip, solar } = dataPoint;

    // Check Solo/Mute logic
    const hasSolo = Object.values(this.stems).some(s => s.solo);
    const isStemAudible = (stemKey) => {
      const stem = this.stems[stemKey];
      if (stem.muted) return false;
      if (hasSolo) return stem.solo;
      return true;
    };

    // Spatial Panning for "Eyes-Closed Museum Audio Guide"
    // 1981 = -0.85 (Hard Left / Vintage Past) -> 2025 = +0.85 (Hard Right / Accelerating Present)
    if (this.eyesClosedMode) {
      const panVal = ((year - 1981) / 44) * 1.7 - 0.85;
      this.setSpatialPan(Math.max(-0.95, Math.min(0.95, panVal)));
    } else {
      this.setSpatialPan(0);
    }

    if (this.tone) {
      this.sonifyWithTone(dataPoint, isStemAudible);
    } else if (this.audioCtx) {
      this.sonifyWithNative(dataPoint, isStemAudible);
    }
  }

  /**
   * High-fidelity Tone.js sonification routine
   */
  sonifyWithTone(dataPoint, isStemAudible) {
    const Tone = this.tone;
    const now = Tone.now();
    const { t2m, anomaly, precip, solar } = dataPoint;

    // --- Stem 1: Temperature -> Analog Synth Lead ---
    if (isStemAudible('temp')) {
      // Map temperature range (-30°C to +35°C) to scale index
      const normalizedTemp = Math.max(0, Math.min(1, (t2m + 25) / 60));
      const noteIndex = Math.floor(normalizedTemp * (this.notes.lead.length - 1));
      const leadNote = this.notes.lead[noteIndex] || 'A3';

      // Lowpass Filter cutoff opens with warming temperature and anomaly
      const cutoff = Math.max(400, Math.min(4200, 700 + (t2m + 10) * 55 + anomaly * 450));
      this.tempFilter.frequency.rampTo(cutoff, 0.12, now);

      this.tempSynth.triggerAttackRelease(leadNote, '8n', now, 0.45 + normalizedTemp * 0.35);
    }

    // --- Stem 2: Precipitation -> Marimba & Raindrop Arpeggios ---
    if (isStemAudible('precip') && precip > 0.4) {
      // High precipitation triggers multi-note cascading drops
      const dropCount = precip > 18 ? 4 : precip > 10 ? 3 : precip > 4 ? 2 : 1;
      const stepDuration = 0.08 / this.tempoSpeed;

      for (let i = 0; i < dropCount; i++) {
        // Higher rainfall selects randomly from higher marimba notes
        const mIndex = Math.floor(Math.min(this.notes.marimba.length - 1, (precip / 28) * this.notes.marimba.length + Math.random() * 2));
        const note = this.notes.marimba[mIndex] || 'F#4';
        const delay = now + i * stepDuration;
        const velocity = Math.min(0.85, 0.3 + (precip / 30) * 0.5);

        this.precipSynth.triggerAttackRelease(note, '16n', delay, velocity);
      }
    }

    // --- Stem 3: Solar Insolation -> Lush Cosmic Pad ---
    if (isStemAudible('solar') && solar > 2.0) {
      // Solar intensity cycles harmonic chords and filter brightness
      const chordIndex = Math.floor((solar / 30) * this.notes.padChords.length) % this.notes.padChords.length;
      const chord = this.notes.padChords[chordIndex];
      const padCutoff = Math.max(600, Math.min(2800, 600 + solar * 75));

      this.solarFilter.frequency.rampTo(padCutoff, 0.25, now);
      // Gentle chord pulse
      this.solarSynth.triggerAttackRelease(chord, '4n', now, 0.3 + Math.min(0.4, solar / 60));
    }

    // --- Stem 4: Extreme Anomaly -> Crystal Bell Chime ---
    // Fires when temp anomaly is severe (> +1.4°C) or historic precipitation spike (> 22 mm/day)
    if (isStemAudible('alert') && (anomaly >= 1.35 || precip >= 22)) {
      const bellNote = anomaly >= 1.6 ? 'F#6' : anomaly >= 1.4 ? 'D6' : 'A5';
      this.alertSynth.triggerAttackRelease(bellNote, '2n', now, 0.7);
    }
  }

  /**
   * Native Web Audio fallback sonification
   */
  sonifyWithNative(dataPoint, isStemAudible) {
    if (!this.audioCtx) return;
    const now = this.audioCtx.currentTime;
    const { t2m, anomaly, precip, solar } = dataPoint;

    // Pitch conversion helper
    const noteToFreq = (note) => {
      const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
      const match = note.match(/([A-G]#?)(\d)/);
      if (!match) return 440;
      const [, name, oct] = match;
      const semitone = notes.indexOf(name);
      return 440 * Math.pow(2, (semitone - 9) / 12 + (parseInt(oct) - 4));
    };

    // Stem 1: Temperature synth
    if (isStemAudible('temp')) {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const filter = this.audioCtx.createBiquadFilter();

      const normalizedTemp = Math.max(0, Math.min(1, (t2m + 25) / 60));
      const note = this.notes.lead[Math.floor(normalizedTemp * (this.notes.lead.length - 1))] || 'D4';
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(noteToFreq(note), now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600 + (t2m + 10) * 50, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.25 * this.stems.temp.vol, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.nativePanner);

      osc.start(now);
      osc.stop(now + 0.4);
    }

    // Stem 2: Precipitation
    if (isStemAudible('precip') && precip > 0.5) {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(noteToFreq('F#5'), now);

      gain.gain.setValueAtTime(0.2 * this.stems.precip.vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(this.nativePanner);
      osc.start(now);
      osc.stop(now + 0.2);
    }

    // Stem 4: Alert Chime
    if (isStemAudible('alert') && (anomaly >= 1.4 || precip >= 22)) {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(noteToFreq('D6'), now);

      gain.gain.setValueAtTime(0.35 * this.stems.alert.vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

      osc.connect(gain);
      gain.connect(this.nativePanner);
      osc.start(now);
      osc.stop(now + 0.85);
    }
  }

  /**
   * Visual Frame Pixel-to-Sound Sonifier:
   * Analyzes an image canvas or satellite frame (RGB values) and maps colors to harmonic tones
   */
  sonifyImageFrame(canvas) {
    if (!this.isInitialized || !canvas) return;

    try {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = canvas.width || 256;
      const height = canvas.height || 256;
      const imgData = ctx.getImageData(0, 0, width, height).data;

      // Sample a 5x5 grid across the satellite frame
      let totalR = 0, totalG = 0, totalB = 0, count = 0;
      for (let y = 0; y < height; y += Math.floor(height / 5)) {
        for (let x = 0; x < width; x += Math.floor(width / 5)) {
          const idx = (y * width + x) * 4;
          totalR += imgData[idx];
          totalG += imgData[idx + 1];
          totalB += imgData[idx + 2];
          count++;
        }
      }

      const avgR = totalR / count; // Cloud/Ice/Warm reflectance
      const avgG = totalG / count; // Vegetation / Land
      const avgB = totalB / count; // Ocean / Atmospheric scattering
      const brightness = (avgR + avgG + avgB) / 3;

      if (this.tone) {
        const now = this.tone.now();
        // Ocean (Blue) -> Resonant Root Drone
        const blueNote = avgB > 120 ? 'D3' : 'A2';
        // Vegetation (Green) -> Mid Harmonic
        const greenNote = avgG > 100 ? 'F#4' : 'D4';
        // Cloud / Glacial Albedo (White / High Brightness) -> High Shimmer
        const whiteNote = brightness > 150 ? 'C#5' : 'A4';

        this.pixelSynth.triggerAttackRelease([blueNote, greenNote, whiteNote], '8n', now, 0.4);
      }
    } catch (e) {
      // Handle tainted canvas CORS restrictions gracefully
      console.warn('Canvas pixel sonification warning:', e);
    }
  }

  /**
   * NASA SVS 5011: Punctuated Spaceborne Lightning Strike Trigger
   * Simulates high-energy optical lightning flashes detected by the ISS LIS sensor
   */
  triggerLightningFlash() {
    if (!this.isInitialized) return;

    if (this.onLightningTrigger) {
      try { this.onLightningTrigger(); } catch (e) {}
    }

    if (this.tone) {
      try {
        const now = this.tone.now();
        // High crystal snap
        this.alertSynth.triggerAttackRelease('A6', '16n', now, 0.95);
        this.alertSynth.triggerAttackRelease('E6', '8n', now + 0.04, 0.85);
      } catch (e) {}
    } else if (this.audioCtx) {
      try {
        const now = this.audioCtx.currentTime;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1760, now); // A6
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.12);

        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

        osc.connect(gain);
        gain.connect(this.nativePanner || this.audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.16);
      } catch (e) {}
    }
  }

  /**
   * NASA SVS 13786: Caldwell 73 Sonification Mathematical Framework
   * Maps vertical Y coordinates to scale pitch and pixel luminosity to volume/filter cutoff
   * @param {Array<{y: number, r: number, g: number, b: number, lum: number}>} samples
   * @param {number} totalHeight
   */
  sonifyCaldwellScanline(samples, totalHeight = 256) {
    if (!this.isInitialized || !samples || samples.length === 0) return;

    if (this.tone) {
      const now = this.tone.now();
      samples.forEach((sample, i) => {
        if (sample.lum < 25) return; // filter background space darkness

        // 1. Spatial Y Coordinate -> Musical Pitch (higher Y = higher pitch)
        const normalizedY = Math.max(0, Math.min(1, 1 - (sample.y / totalHeight)));
        const noteIdx = Math.floor(normalizedY * (this.notes.lead.length - 1));
        const note = this.notes.lead[noteIdx] || 'A4';

        // 2. Luminosity -> Volume & Filter Cutoff
        const volume = Math.min(0.85, (sample.lum / 255) * 0.7 + 0.1);
        const delayOffset = now + (i * 0.035);

        // 3. Color spectrum mapping (NASA EIC Multi-Track Framework):
        if (sample.r > sample.g + 20 && sample.r > sample.b + 20) {
          // Warm Dust / Fire Smoke (GEOS Aerosols SVS 5669) -> Analog Lead
          this.tempSynth.triggerAttackRelease(note, '16n', delayOffset, volume);
        } else if (sample.g > sample.r + 15 && sample.g > sample.b) {
          // GEDI Forest Canopy (SVS 4950) -> Organic Wooden Marimba
          const mIdx = Math.floor(normalizedY * (this.notes.marimba.length - 1));
          this.precipSynth.triggerAttackRelease(this.notes.marimba[mIdx] || 'D4', '16n', delayOffset, volume);
        } else if (sample.b > sample.r + 20) {
          // Ocean Boundary Currents (SVS 5425) / Moisture (SVS 4960) -> Fluid Cosmic Pad
          this.solarSynth.triggerAttackRelease([note], '8n', delayOffset, volume * 0.6);
        } else if (sample.lum > 220) {
          // Brilliant Flash / Night Light Peak (SVS 5011 / 5313) -> Crystal Chime
          this.alertSynth.triggerAttackRelease('D6', '16n', delayOffset, volume * 0.9);
        }
      });
    }
  }

  /**
   * Set Stereo Spatial Pan (-1 = full left, 0 = center, +1 = full right)
   */
  setSpatialPan(value) {
    const clamped = Math.max(-1, Math.min(1, value));
    if (this.tone && this.temporalPanner) {
      this.temporalPanner.pan.rampTo(clamped, 0.1);
    } else if (this.nativePanner && this.nativePanner.pan) {
      this.nativePanner.pan.setValueAtTime(clamped, this.audioCtx.currentTime);
    }
  }

  /**
   * Stem controls: Volume, Mute, Solo
   */
  setStemVolume(stemKey, volume) {
    if (!this.stems[stemKey]) return;
    this.stems[stemKey].vol = Math.max(0, Math.min(1, volume));

    if (this.tone) {
      const gainNode = this[`${stemKey}Gain`];
      if (gainNode) {
        gainNode.gain.rampTo(this.stems[stemKey].vol, 0.05);
      }
    }
  }

  toggleStemMute(stemKey) {
    if (!this.stems[stemKey]) return false;
    this.stems[stemKey].muted = !this.stems[stemKey].muted;
    return this.stems[stemKey].muted;
  }

  toggleStemSolo(stemKey) {
    if (!this.stems[stemKey]) return false;
    this.stems[stemKey].solo = !this.stems[stemKey].solo;
    return this.stems[stemKey].solo;
  }

  setTempoSpeed(multiplier) {
    this.tempoSpeed = multiplier; // 1x, 2x, 4x
  }

  /**
   * Read live VU meter levels (returns array of 0-1 values for each stem)
   */
  getLiveStemLevels() {
    if (!this.tone || !this.meters) {
      return { temp: 0.2, precip: 0.15, solar: 0.3, alert: 0.05 };
    }

    const calcLevel = (meter) => {
      if (!meter) return 0;
      const db = meter.getValue();
      if (db === -Infinity || isNaN(db)) return 0;
      // Convert dB (-60 to 0) to 0.0 - 1.0 linear meter
      return Math.max(0, Math.min(1, (db + 50) / 50));
    };

    return {
      temp: calcLevel(this.meters.temp),
      precip: calcLevel(this.meters.precip),
      solar: calcLevel(this.meters.solar),
      alert: calcLevel(this.meters.alert)
    };
  }

  /**
   * Get Waveform data array for vinyl audio-reactive rings & oscilloscopes
   */
  getWaveformData() {
    if (this.tone && this.masterAnalyser) {
      return this.masterAnalyser.getValue();
    }
    if (this.nativeAnalyser) {
      const data = new Float32Array(this.nativeAnalyser.fftSize);
      this.nativeAnalyser.getFloatTimeDomainData(data);
      return data;
    }
    return new Float32Array(32).fill(0);
  }

  /**
   * Play tactile vinyl scratch / needle drop sound
   */
  playNeedleDropEffect() {
    try {
      if (this.tone) {
        const noise = new this.tone.NoiseSynth({
          noise: { type: 'pink' },
          envelope: { attack: 0.005, decay: 0.12, sustain: 0 }
        }).toDestination();
        noise.triggerAttackRelease('16n');
      }
    } catch (e) {
      // Audio cue fallback
    }
  }
}
