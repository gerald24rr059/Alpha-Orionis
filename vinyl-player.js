/**
 * Earth Information Jukebox - Tactile Spinning Earth-Vinyl Player
 * Renders an interactive Canvas Earth Vinyl Record with:
 * - Concentric vinyl grooves and specular light gleams
 * - Stylized Earth globe center label (continents & atmospheric swirls)
 * - Concentric data rings pulsing in real time to audio frequencies
 * - Animated mechanical tonearm that swings onto record during playback
 * - Smooth rotation speed tied to playback tempo (1x, 2x, 4x)
 */

export class EarthVinylPlayer {
  constructor(canvasElement, tonearmElement, options = {}) {
    this.canvas = canvasElement;
    this.ctx = this.canvas.getContext('2d');
    this.tonearm = tonearmElement;

    this.isPlaying = false;
    this.rotationAngle = 0; // in radians
    this.speedMultiplier = 1; // 1x = 33 RPM, 2x = 45 RPM, 4x = 78 RPM
    this.audioEngine = options.audioEngine || null;

    // Record visuals
    this.recordColor = '#38BDF8'; // NASA Cyan accent
    this.recordTitle = 'The Breathing Planet';
    this.currentDataPoint = null;
    this.lightningFlashAlpha = 0;

    // Listen for ISS Spaceborne Lightning triggers
    if (this.audioEngine) {
      this.audioEngine.onLightningTrigger = () => this.flashLightning();
    }

    // Retina display scaling
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    // Start 60fps render loop
    this.lastTimestamp = performance.now();
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);

    // Scratch interaction
    this.setupScratchInteraction();
  }

  resizeCanvas() {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.width = rect.width > 0 ? rect.width : 320;
    this.height = rect.height > 0 ? rect.height : 320;
    this.dpr = dpr;

    this.canvas.width = Math.round(this.width * dpr);
    this.canvas.height = Math.round(this.height * dpr);
  }

  setPlaying(playing) {
    this.isPlaying = playing;
    if (this.tonearm) {
      if (playing) {
        this.tonearm.classList.add('tonearm-playing');
      } else {
        this.tonearm.classList.remove('tonearm-playing');
      }
    }
  }

  setSpeed(multiplier) {
    this.speedMultiplier = multiplier;
  }

  setRecordInfo(title, color) {
    this.recordTitle = title;
    this.recordColor = color || '#38BDF8';
  }

  updateDataPoint(dp) {
    this.currentDataPoint = dp;
  }

  flashLightning() {
    this.lightningFlashAlpha = 0.95;
  }

  setupScratchInteraction() {
    let isDragging = false;
    let lastX = 0;

    const onStart = (e) => {
      isDragging = true;
      lastX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      if (this.audioEngine) this.audioEngine.playNeedleDropEffect();
    };

    const onMove = (e) => {
      if (!isDragging) return;
      const currentX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const deltaX = currentX - lastX;
      this.rotationAngle += (deltaX * 0.05);
      lastX = currentX;
    };

    const onEnd = () => {
      isDragging = false;
    };

    this.canvas.addEventListener('mousedown', onStart);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);

    this.canvas.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onEnd);
  }

  animate(now) {
    const dt = (now - this.lastTimestamp) / 1000;
    this.lastTimestamp = now;

    // Smooth rotation when playing (33.3 RPM base: ~3.49 rad/sec)
    if (this.isPlaying) {
      const baseRps = 2.4;
      this.rotationAngle += baseRps * this.speedMultiplier * dt;
      if (this.rotationAngle > Math.PI * 2000) {
        this.rotationAngle %= (Math.PI * 2);
      }
    }

    this.render();
    requestAnimationFrame(this.animate);
  }

  render() {
    const ctx = this.ctx;
    const dpr = this.dpr || 1;
    if (ctx.save) ctx.save();
    if (ctx.setTransform) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const w = this.width;
    const h = this.height;
    const centerX = w / 2;
    const centerY = h / 2;
    const maxRadius = Math.min(centerX, centerY) - 8;

    ctx.clearRect(0, 0, w, h);

    // 1. Turntable platter glow
    const platterGlow = ctx.createRadialGradient(centerX, centerY, maxRadius * 0.7, centerX, centerY, maxRadius + 6);
    platterGlow.addColorStop(0, 'rgba(15, 23, 42, 0)');
    platterGlow.addColorStop(0.85, 'rgba(56, 189, 248, 0.08)');
    platterGlow.addColorStop(1, 'rgba(56, 189, 248, 0.22)');
    ctx.fillStyle = platterGlow;
    ctx.beginPath();
    ctx.arc(centerX, centerY, maxRadius + 4, 0, Math.PI * 2);
    ctx.fill();

    // 2. Vinyl Record Outer Body (Deep Obsidian Jet Black)
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(this.rotationAngle);

    const vinylGrad = ctx.createRadialGradient(0, 0, maxRadius * 0.35, 0, 0, maxRadius);
    vinylGrad.addColorStop(0, '#111827');
    vinylGrad.addColorStop(0.7, '#080C14');
    vinylGrad.addColorStop(1, '#030712');
    ctx.fillStyle = vinylGrad;
    ctx.beginPath();
    ctx.arc(0, 0, maxRadius, 0, Math.PI * 2);
    ctx.fill();

    // Outer run-out bevel rim
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, maxRadius - 2, 0, Math.PI * 2);
    ctx.stroke();

    // 3. Concentric Vinyl Sound Grooves with Micro-Reflections
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    const grooveStart = maxRadius * 0.44;
    const grooveEnd = maxRadius * 0.94;
    const grooveStep = 4.2;

    for (let r = grooveStart; r < grooveEnd; r += grooveStep) {
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    // 4. Specular "Sheen" Light Flares (Classic vinyl light reflection wedges)
    const flareGrad = ctx.createLinearGradient(-maxRadius, -maxRadius, maxRadius, maxRadius);
    flareGrad.addColorStop(0, 'rgba(255, 255, 255, 0.08)');
    flareGrad.addColorStop(0.3, 'rgba(255, 255, 255, 0.01)');
    flareGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.14)');
    flareGrad.addColorStop(0.7, 'rgba(255, 255, 255, 0.01)');
    flareGrad.addColorStop(1, 'rgba(255, 255, 255, 0.08)');

    ctx.fillStyle = flareGrad;
    ctx.beginPath();
    ctx.arc(0, 0, maxRadius - 3, 0, Math.PI * 2);
    ctx.fill();

    // 5. Earth Globe Center Label
    const labelRadius = maxRadius * 0.40;
    
    // Deep Ocean Core
    const oceanGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, labelRadius);
    oceanGrad.addColorStop(0, '#0F172A');
    oceanGrad.addColorStop(0.65, '#0284C7');
    oceanGrad.addColorStop(1, '#0369A1');
    ctx.fillStyle = oceanGrad;
    ctx.beginPath();
    ctx.arc(0, 0, labelRadius, 0, Math.PI * 2);
    ctx.fill();

    // Earth Continents & Swirls (Stylized Geometric Landmasses)
    ctx.fillStyle = '#10B981'; // Emerald vegetation
    ctx.globalAlpha = 0.85;
    
    // Continent Shape 1 (Americas)
    ctx.beginPath();
    ctx.ellipse(-labelRadius * 0.35, -labelRadius * 0.1, labelRadius * 0.22, labelRadius * 0.42, 0.3, 0, Math.PI * 2);
    ctx.fill();

    // Continent Shape 2 (Eurasia / Africa)
    ctx.beginPath();
    ctx.ellipse(labelRadius * 0.32, -labelRadius * 0.2, labelRadius * 0.28, labelRadius * 0.38, -0.2, 0, Math.PI * 2);
    ctx.fill();

    // White Atmospheric Cloud Swirls
    ctx.fillStyle = '#FFFFFF';
    ctx.globalAlpha = 0.45;
    ctx.beginPath();
    ctx.arc(-labelRadius * 0.1, labelRadius * 0.2, labelRadius * 0.25, 0.2, Math.PI * 0.9);
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.stroke();

    ctx.globalAlpha = 1.0;

    // Center Spindle Hole
    ctx.fillStyle = '#0F172A';
    ctx.beginPath();
    ctx.arc(0, 0, labelRadius * 0.14, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#94A3B8';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.restore();

    // 6. Live Audio-Reactive Concentric Data Rings (Stationary or Pulsing)
    this.renderReactiveDataRings(centerX, centerY, maxRadius);

    // 7. ISS Spaceborne Lightning Electrical Discharge Arc (SVS 5011)
    if (this.lightningFlashAlpha > 0.02) {
      ctx.save();
      ctx.fillStyle = `rgba(255, 255, 255, ${this.lightningFlashAlpha * 0.35})`;
      ctx.beginPath();
      ctx.arc(centerX, centerY, maxRadius, 0, Math.PI * 2);
      ctx.fill();

      // Glowing lightning arc across the vinyl grooves
      ctx.strokeStyle = `rgba(56, 189, 248, ${this.lightningFlashAlpha})`;
      ctx.lineWidth = 3.5;
      ctx.shadowColor = '#38BDF8';
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.arc(centerX, centerY, maxRadius * 0.72, this.rotationAngle, this.rotationAngle + Math.PI * 1.2);
      ctx.stroke();

      ctx.restore();
      this.lightningFlashAlpha *= 0.85; // fast flash fade
    }

    ctx.restore();
  }

  /**
   * Draw glowing concentric rings modulated by audio waveform & climate anomaly
   */
  renderReactiveDataRings(cx, cy, maxRadius) {
    const ctx = this.ctx;
    let waveData = null;

    if (this.audioEngine) {
      waveData = this.audioEngine.getWaveformData();
    }

    const anomaly = this.currentDataPoint ? this.currentDataPoint.anomaly : 0;
    // Anomaly color: Cyan (cool) -> Amber -> Coral (severe heat)
    let ringColor = this.recordColor;
    if (anomaly >= 1.5) ringColor = '#F43F5E'; // Coral Alert
    else if (anomaly >= 1.0) ringColor = '#F59E0B'; // Solar Amber

    // Ring 1: Inner Data Ring
    const r1 = maxRadius * 0.46;
    let amp1 = 0;
    if (waveData && waveData.length > 0) {
      for (let i = 0; i < 8; i++) amp1 += Math.abs(waveData[i]);
      amp1 = (amp1 / 8) * 14;
    }

    ctx.strokeStyle = ringColor;
    ctx.lineWidth = 1.8;
    ctx.shadowColor = ringColor;
    ctx.shadowBlur = this.isPlaying ? 8 + amp1 * 2 : 2;
    ctx.beginPath();
    ctx.arc(cx, cy, r1 + (this.isPlaying ? amp1 * 0.8 : 0), 0, Math.PI * 2);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Ring 2: Mid Telemetry Ring (Dotted Pulse)
    const r2 = maxRadius * 0.72;
    ctx.save();
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
    ctx.lineWidth = 1.2;
    ctx.setLineDash([4, 6]);
    ctx.beginPath();
    ctx.arc(cx, cy, r2, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // Ring 3: Outer Horizon Ring
    if (this.isPlaying) {
      const r3 = maxRadius * 0.92;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, r3, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
}
