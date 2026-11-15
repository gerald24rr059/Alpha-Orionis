/**
 * Earth Information Jukebox - Master Application Orchestrator
 * Connects UI, NASA Data Engine, Tone.js Audio Engine,
 * Leaflet GIBS Satellite Map, Chart.js Timeline, and Tactile Vinyl Hero.
 */

import { NASA_DATA, generateCuratedRecordData, fetchNasaPowerPointData } from './nasa-data.js';
import { ClimateAudioEngine } from './audio-engine.js';
import { EarthVinylPlayer } from './vinyl-player.js';
import { NasaMapController } from './map-controller.js';
import { TimelineChart } from './timeline-chart.js';

class EarthJukeboxApp {
  constructor() {
    // State
    this.currentRecord = NASA_DATA.FEATURED_RECORDS[0]; // "The Breathing Planet"
    this.dataset = [];
    this.currentIndex = 0; // 0 to 539
    this.isPlaying = false;
    this.tempoSpeed = 1; // 1x, 2x, 4x
    this.playbackTimer = null;
    this.isLooping = true;

    // Special Modes
    this.abTimeMachine = false;
    this.abPhase = 'A'; // 'A' (1985) or 'B' (2025)
    this.abStepCount = 0;
    this.eyesClosedActive = false;
    this.pixelSonifierActive = false;
    this.caldwellScanlineRunning = false;
    this.caldwellScanX = 0;
    this.activeSvsDatasetId = '5196';

    // Subsystems
    this.audioEngine = new ClimateAudioEngine();
    this.vinylPlayer = null;
    this.mapController = null;
    this.timelineChart = null;

    // Speech synthesis for museum audio guide
    this.synth = window.speechSynthesis || null;
    this.lastSpokenYear = null;

    // DOM Elements Cache
    this.cacheDom();
    this.init();
  }

  cacheDom() {
    this.dom = {
      // Banners & Modals
      quickStartBanner: document.getElementById('quick-start-banner'),
      dismissBannerBtn: document.getElementById('dismiss-banner-btn'),
      methodologyBtn: document.getElementById('methodology-btn'),
      methodologyModal: document.getElementById('methodology-modal'),
      closeMethodologyBtn: document.getElementById('close-methodology-btn'),
      disclaimerBtn: document.getElementById('disclaimer-btn'),
      disclaimerModal: document.getElementById('disclaimer-modal'),
      closeDisclaimerBtn: document.getElementById('close-disclaimer-btn'),
      svsStudioBtn: document.getElementById('svs-studio-btn'),
      svsStudioModal: document.getElementById('svs-studio-modal'),
      closeSvsBtn: document.getElementById('close-svs-btn'),
      keyboardBtn: document.getElementById('keyboard-btn'),
      keyboardModal: document.getElementById('keyboard-modal'),
      closeKeyboardBtn: document.getElementById('close-keyboard-btn'),
      eyesClosedOverlay: document.getElementById('eyes-closed-overlay'),
      exitEyesClosedBtn: document.getElementById('exit-eyes-closed-btn'),
      eyesClosedYear: document.getElementById('eyes-closed-year'),
      eyesClosedSubtitle: document.getElementById('eyes-closed-subtitle'),

      // NASA EIC SVS Studio Elements
      svsDatasetSelect: document.getElementById('svs-dataset-select'),
      toggleScanlineBtn: document.getElementById('toggle-scanline-btn'),
      triggerLightningBtn: document.getElementById('trigger-lightning-btn'),
      svsCanvas: document.getElementById('svs-visualizer-canvas'),
      caldwellScanline: document.getElementById('caldwell-scanline'),
      svsReadoutPitch: document.getElementById('svs-readout-pitch'),
      svsReadoutLum: document.getElementById('svs-readout-lum'),
      svsReadoutTimbre: document.getElementById('svs-readout-timbre'),
      svsExternalLink: document.getElementById('svs-external-link'),
      recordTabBtns: document.querySelectorAll('.record-tab-btn'),

      // Vinyl Player Hero
      vinylCanvas: document.getElementById('earth-vinyl-canvas'),
      tonearm: document.getElementById('turntable-tonearm'),
      nowPlayingRecordTitle: document.getElementById('now-playing-record-title'),
      nowPlayingSubtitle: document.getElementById('now-playing-subtitle'),
      nowPlayingGenre: document.getElementById('now-playing-genre'),
      vinylStatusBadge: document.getElementById('vinyl-status-badge'),
      speedBtns: document.querySelectorAll('.speed-btn'),

      // Transport Controls
      playPauseBtn: document.getElementById('play-pause-btn'),
      playIcon: document.getElementById('play-icon'),
      pauseIcon: document.getElementById('pause-icon'),
      prevDecadeBtn: document.getElementById('prev-decade-btn'),
      nextDecadeBtn: document.getElementById('next-decade-btn'),
      timelineScrubber: document.getElementById('timeline-scrubber'),
      scrubberCurrentTime: document.getElementById('scrubber-current-time'),
      loopToggleBtn: document.getElementById('loop-toggle-btn'),

      // Special Mode Toggles
      abModeToggle: document.getElementById('ab-mode-toggle'),
      abPhaseIndicator: document.getElementById('ab-phase-indicator'),
      eyesClosedToggle: document.getElementById('eyes-closed-toggle'),
      pixelSonifierToggle: document.getElementById('pixel-sonifier-toggle'),

      // 4-Channel DJ Stem Mixer
      stemMixer: document.getElementById('stem-mixer'),
      volSliders: document.querySelectorAll('.stem-fader'),
      muteBtns: document.querySelectorAll('.stem-mute-btn'),
      soloBtns: document.querySelectorAll('.stem-solo-btn'),
      vuMeters: {
        temp: document.getElementById('vu-meter-temp'),
        precip: document.getElementById('vu-meter-precip'),
        solar: document.getElementById('vu-meter-solar'),
        alert: document.getElementById('vu-meter-alert')
      },

      // Telemetry HUD KPI Cards
      hudTime: document.getElementById('hud-time-val'),
      hudTimeBadge: document.getElementById('hud-time-badge'),
      hudTemp: document.getElementById('hud-temp-val'),
      hudTempAnomaly: document.getElementById('hud-temp-anomaly'),
      hudTempBadge: document.getElementById('hud-temp-badge'),
      hudPrecip: document.getElementById('hud-precip-val'),
      hudPrecipBadge: document.getElementById('hud-precip-badge'),
      hudSolar: document.getElementById('hud-solar-val'),
      hudSolarBadge: document.getElementById('hud-solar-badge'),
      hudCo2: document.getElementById('hud-co2-val'),

      // "What You Are Hearing" Decoder Pill
      decoderPill: document.getElementById('hearing-decoder-pill'),
      decoderText: document.getElementById('decoder-text'),
      decoderWave: document.getElementById('decoder-wave-bar'),

      // Record Selector & Lifetime Soundtrack
      recordCardsContainer: document.getElementById('featured-records-container'),
      birthYearInput: document.getElementById('birth-year-input'),
      lifetimeSoundtrackBtn: document.getElementById('generate-lifetime-btn'),
      lifetimeDeltaBadge: document.getElementById('lifetime-delta-badge'),
      lifetimeDeltaText: document.getElementById('lifetime-delta-text'),

      // Satellite Map & Timeline Chart
      mapLayerSelect: document.getElementById('map-layer-select'),
      customCoordBtn: document.getElementById('custom-coord-btn'),
      coordInputModal: document.getElementById('coord-input-modal'),
      submitCoordsBtn: document.getElementById('submit-coords-btn'),
      closeCoordBtn: document.getElementById('close-coord-btn'),
      inputLat: document.getElementById('input-lat'),
      inputLon: document.getElementById('input-lon'),
      chartCanvas: document.getElementById('timeline-chart-canvas'),
      toastContainer: document.getElementById('toast-container')
    };
  }

  init() {
    // 1. Bind Event Listeners & Keyboard Shortcuts FIRST to guarantee all buttons are active
    try {
      this.bindEvents();
    } catch (e) {
      console.error('Error binding events:', e);
    }

    // 2. Safe check quick-start banner state in localStorage
    try {
      if (window.localStorage && localStorage.getItem('nasa_jukebox_banner_dismissed') === 'true') {
        if (this.dom.quickStartBanner) this.dom.quickStartBanner.style.display = 'none';
      }
    } catch (e) {
      console.warn('localStorage access restricted:', e);
    }

    // 3. Render Record Selector Cards
    try {
      this.renderFeaturedRecordCards();
    } catch (e) {
      console.error('Error rendering record cards:', e);
    }

    // 4. Initialize Vinyl Player
    try {
      this.vinylPlayer = new EarthVinylPlayer(this.dom.vinylCanvas, this.dom.tonearm, {
        audioEngine: this.audioEngine
      });
    } catch (e) {
      console.error('Error initializing vinyl player:', e);
    }

    // 5. Initialize NASA Satellite Map
    try {
      this.mapController = new NasaMapController('nasa-satellite-map', {
        onLocationSelected: (lat, lon) => this.handleCustomMapClick(lat, lon)
      });
      this.mapController.addPresetMarkers(NASA_DATA.FEATURED_RECORDS, (rec) => this.selectRecord(rec));
    } catch (e) {
      console.error('Error initializing map controller:', e);
    }

    // 6. Initialize Chart.js Timeline
    try {
      this.timelineChart = new TimelineChart(this.dom.chartCanvas, {
        onScrub: (index) => this.jumpToMonth(index)
      });
    } catch (e) {
      console.error('Error initializing timeline chart:', e);
    }

    // 7. Load default dataset ("The Breathing Planet")
    try {
      this.selectRecord(this.currentRecord);
    } catch (e) {
      console.error('Error selecting initial record:', e);
    }

    // 8. Start continuous 60fps VU Meters & reactive loop
    try {
      this.startLiveMetersLoop();
    } catch (e) {
      console.error('Error starting live meters loop:', e);
    }
  }

  /**
   * Bind all user interactions, transport buttons, keyboard controls
   */
  bindEvents() {
    // Quick-Start Banner Dismiss
    this.dom.dismissBannerBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      if (this.dom.quickStartBanner) this.dom.quickStartBanner.style.display = 'none';
      try {
        if (window.localStorage) localStorage.setItem('nasa_jukebox_banner_dismissed', 'true');
      } catch (err) {}
    });

    // Modals Open
    this.dom.methodologyBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      this.showModal('methodology');
    });
    this.dom.closeMethodologyBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      this.hideModal('methodology');
    });

    this.dom.disclaimerBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      this.showModal('disclaimer');
    });
    this.dom.closeDisclaimerBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      this.hideModal('disclaimer');
    });

    this.dom.svsStudioBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      this.showModal('svs');
      this.initSvsStudio();
    });
    this.dom.closeSvsBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      this.hideModal('svs');
    });

    this.dom.keyboardBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      this.showModal('keyboard');
    });
    this.dom.closeKeyboardBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      this.hideModal('keyboard');
    });

    // Custom Coordinate Input Modal
    this.dom.customCoordBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      this.showModal('coord');
    });
    this.dom.closeCoordBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      this.hideModal('coord');
    });

    // Close modals on clicking backdrop
    [this.dom.methodologyModal, this.dom.keyboardModal, this.dom.coordInputModal, this.dom.disclaimerModal, this.dom.svsStudioModal].forEach(modal => {
      modal?.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.style.display = 'none';
          if (modal === this.dom.svsStudioModal) this.stopCaldwellScanline();
        }
      });
    });

    // Record Category Filter Tabs (All / Climate / SVS Visual Studio)
    this.dom.recordTabBtns?.forEach(btn => {
      btn.addEventListener('click', () => {
        this.dom.recordTabBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        const tab = btn.dataset.tab || 'all';
        this.renderFeaturedRecordCards(tab);
      });
    });

    // SVS Studio Dataset Selector
    this.dom.svsDatasetSelect?.addEventListener('change', (e) => {
      this.activeSvsDatasetId = e.target.value;
      this.renderSvsVisualFrame(this.activeSvsDatasetId);
      if (this.dom.svsExternalLink) {
        this.dom.svsExternalLink.href = `https://svs.gsfc.nasa.gov/${this.activeSvsDatasetId}/`;
        this.dom.svsExternalLink.textContent = `NASA SVS Entry #${this.activeSvsDatasetId} ↗`;
      }
    });

    // Toggle Caldwell 73 Scanline
    this.dom.toggleScanlineBtn?.addEventListener('click', () => {
      this.toggleCaldwellScanline();
    });

    // Trigger ISS Spaceborne Lightning Flash (SVS 5011)
    this.dom.triggerLightningBtn?.addEventListener('click', () => {
      this.audioEngine.triggerLightningFlash();
      if (this.vinylPlayer) this.vinylPlayer.flashLightning();
      this.flashSvsCanvas();
      this.showToast('⚡ ISS Lightning Event Triggered! (SVS 5011)', 'info');
    });
    this.dom.submitCoordsBtn?.addEventListener('click', () => {
      const lat = parseFloat(this.dom.inputLat.value);
      const lon = parseFloat(this.dom.inputLon.value);
      if (!isNaN(lat) && !isNaN(lon) && lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180) {
        this.hideModal('coord');
        this.handleCustomMapClick(lat, lon);
      } else {
        this.showToast('Please enter valid coordinates (-90 to 90 lat, -180 to 180 lon).', 'error');
      }
    });

    // Eyes-Closed Mode Overlay Exit
    this.dom.exitEyesClosedBtn?.addEventListener('click', () => this.toggleEyesClosedMode(false));

    // Play / Pause Button
    this.dom.playPauseBtn?.addEventListener('click', () => this.togglePlayPause());

    // Timeline Scrubber Slider
    this.dom.timelineScrubber?.addEventListener('input', (e) => {
      const index = parseInt(e.target.value, 10);
      this.jumpToMonth(index, false);
    });

    // Speed Selector (1x, 2x, 4x)
    this.dom.speedBtns?.forEach(btn => {
      btn.addEventListener('click', () => {
        this.dom.speedBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const speed = parseInt(btn.dataset.speed, 10) || 1;
        this.setSpeed(speed);
      });
    });

    // Decade Jumps
    this.dom.prevDecadeBtn?.addEventListener('click', () => {
      const target = Math.max(0, this.currentIndex - 120); // jump back 10 years
      this.jumpToMonth(target);
    });
    this.dom.nextDecadeBtn?.addEventListener('click', () => {
      const target = Math.min(this.dataset.length - 1, this.currentIndex + 120);
      this.jumpToMonth(target);
    });

    // Loop Toggle
    this.dom.loopToggleBtn?.addEventListener('click', () => {
      this.isLooping = !this.isLooping;
      this.dom.loopToggleBtn.classList.toggle('active', this.isLooping);
      this.showToast(this.isLooping ? 'Loop Mode: Continuous' : 'Loop Mode: Off', 'info');
    });

    // Special Mode: 1985 vs 2025 A/B Time Machine
    this.dom.abModeToggle?.addEventListener('click', () => this.toggleABTimeMachine());

    // Special Mode: Eyes-Closed Museum Audio Guide
    this.dom.eyesClosedToggle?.addEventListener('click', () => this.toggleEyesClosedMode());

    // Special Mode: Visual Frame Sonifier
    this.dom.pixelSonifierToggle?.addEventListener('click', () => {
      this.pixelSonifierActive = !this.pixelSonifierActive;
      this.dom.pixelSonifierToggle.classList.toggle('active', this.pixelSonifierActive);
      this.showToast(this.pixelSonifierActive ? 'Visual Frame Sonifier: ON (sampling satellite pixels)' : 'Visual Frame Sonifier: OFF', 'info');
    });

    // Satellite Map Layer Select
    this.dom.mapLayerSelect?.addEventListener('change', (e) => {
      this.mapController.setLayerType(e.target.value);
    });

    // DJ Stem Mixer Controls
    this.dom.volSliders?.forEach(fader => {
      fader.addEventListener('input', (e) => {
        const stem = e.target.dataset.stem;
        const val = parseFloat(e.target.value);
        this.audioEngine.setStemVolume(stem, val);
      });
    });

    this.dom.muteBtns?.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const stem = btn.dataset.stem;
        const muted = this.audioEngine.toggleStemMute(stem);
        btn.classList.toggle('muted', muted);
      });
    });

    this.dom.soloBtns?.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const stem = btn.dataset.stem;
        const solo = this.audioEngine.toggleStemSolo(stem);
        btn.classList.toggle('solo', solo);
      });
    });

    // Lifetime Soundtrack Generator
    this.dom.lifetimeSoundtrackBtn?.addEventListener('click', () => this.generateLifetimeSoundtrack());

    // Keyboard Shortcuts
    window.addEventListener('keydown', (e) => this.handleKeyboardShortcut(e));

    // Audio context unlock on any user click
    const unlockAudio = () => {
      this.audioEngine.init();
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
    };
    window.addEventListener('click', unlockAudio, { once: true });
    window.addEventListener('touchstart', unlockAudio, { once: true });
  }

  /**
   * Render the featured planet records in the selector panel with optional category filter
   */
  renderFeaturedRecordCards(filterCategory = 'all') {
    if (!this.dom.recordCardsContainer) return;
    this.dom.recordCardsContainer.innerHTML = '';

    const records = NASA_DATA.FEATURED_RECORDS.filter(rec => {
      if (filterCategory === 'all') return true;
      if (filterCategory === 'climate') return rec.category === 'climate';
      if (filterCategory === 'svs') return rec.category === 'svs';
      return true;
    });

    records.forEach((rec) => {
      const card = document.createElement('div');
      const isCurrent = this.currentRecord && this.currentRecord.id === rec.id;
      card.className = `record-card ${isCurrent ? 'active' : ''}`;
      card.dataset.id = rec.id;
      card.tabIndex = 0;
      card.setAttribute('role', 'button');
      card.setAttribute('aria-pressed', isCurrent ? 'true' : 'false');
      card.setAttribute('aria-label', `Planet Record: ${rec.title}. ${rec.subtitle}`);
      if (card.style && card.style.setProperty) {
        card.style.setProperty('--card-accent', rec.color);
      } else if (card.style) {
        card.style['--card-accent'] = rec.color;
      }

      const svsBadge = rec.category === 'svs' ? `<span class="svs-badge">SVS ${rec.svsId || ''}</span>` : '';
      const externalLink = rec.url ? `<a href="${rec.url}" target="_blank" rel="noopener" class="record-external-link" onclick="event.stopPropagation()" aria-label="Open official NASA page for ${rec.title}">NASA SVS ↗</a>` : '';

      card.innerHTML = `
        <div class="record-card-header">
          <div class="record-vinyl-disc" style="border-color: ${rec.color}">
            <span class="disc-icon">${rec.category === 'svs' ? '🛰️' : '🪐'}</span>
          </div>
          <div class="record-card-meta">
            <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
              <h4 class="record-card-title">${rec.title}</h4>
              ${svsBadge}
            </div>
            <span class="record-card-genre">${rec.genre}</span>
          </div>
        </div>
        <p class="record-card-desc">${rec.description}</p>
        <div class="record-card-footer">
          <span class="record-loc-tag">📍 ${rec.locationName}</span>
          <div style="display:flex;gap:6px;align-items:center;">
            ${externalLink}
            <button class="select-record-btn" tabindex="-1" aria-label="Load ${rec.title}">Load Record</button>
          </div>
        </div>
      `;

      card.addEventListener('click', () => this.selectRecord(rec));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.selectRecord(rec);
        }
      });
      this.dom.recordCardsContainer.appendChild(card);
    });
  }

  /**
   * Select and load a curated planet record
   */
  selectRecord(record) {
    this.currentRecord = record;
    this.dataset = generateCuratedRecordData(record.id);

    // Update Vinyl Player visuals
    if (this.vinylPlayer) this.vinylPlayer.setRecordInfo(record.title, record.color);
    if (this.dom.nowPlayingRecordTitle) this.dom.nowPlayingRecordTitle.textContent = record.title;
    if (this.dom.nowPlayingSubtitle) this.dom.nowPlayingSubtitle.textContent = record.subtitle;
    if (this.dom.nowPlayingGenre) this.dom.nowPlayingGenre.textContent = `${record.genre} • ${record.key}`;

    // Highlight active card
    document.querySelectorAll('.record-card').forEach(c => {
      const isActive = c.dataset.id === record.id;
      c.classList.toggle('active', isActive);
      if (c.setAttribute) c.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    // Update Map position & Satellite layer
    if (this.mapController) {
      if (record.id !== 'global-breathing') {
        this.mapController.flyTo(record.lat, record.lon, 4);
      } else {
        this.mapController.flyTo(20, 0, 2);
      }
    }

    // Load into Chart.js Timeline
    if (this.timelineChart) this.timelineChart.loadData(this.dataset);

    // Update Scrubber Range Max
    if (this.dom.timelineScrubber) {
      this.dom.timelineScrubber.max = this.dataset.length - 1;
      this.dom.timelineScrubber.value = this.currentIndex;
    }

    // Update display for current month
    this.updateDisplay(this.currentIndex);
    this.showToast(`Loaded Record: "${record.title}"`, 'success');
  }

  /**
   * Query live NASA POWER API when user clicks anywhere on map
   */
  async handleCustomMapClick(lat, lon) {
    this.showToast(`Connecting to NASA POWER Satellite Archives for (${lat}°, ${lon}°)...`, 'info');

    const result = await fetchNasaPowerPointData(lat, lon, (prog) => {
      this.showToast(prog.message, 'info');
    });

    if (result && result.months && result.months.length > 0) {
      const customRecord = {
        id: `custom-${lat}-${lon}`,
        title: result.locationName,
        subtitle: `NASA POWER Monthly Telemetry (1981–2025)`,
        locationName: result.locationName,
        lat,
        lon,
        genre: 'Generative Latitudinal Soundscape',
        bpm: 80,
        key: 'D Pentatonic',
        description: `Direct satellite telemetry from NASA POWER for latitude ${lat}°, longitude ${lon}°.`,
        color: '#38BDF8'
      };

      this.currentRecord = customRecord;
      this.dataset = result.months;

      this.vinylPlayer.setRecordInfo(customRecord.title, customRecord.color);
      if (this.dom.nowPlayingRecordTitle) this.dom.nowPlayingRecordTitle.textContent = customRecord.title;
      if (this.dom.nowPlayingSubtitle) this.dom.nowPlayingSubtitle.textContent = customRecord.subtitle;
      if (this.dom.nowPlayingGenre) this.dom.nowPlayingGenre.textContent = customRecord.genre;

      this.timelineChart.loadData(this.dataset);
      this.updateDisplay(this.currentIndex);
      this.showToast(`Satellite data loaded successfully for (${lat}°, ${lon}°)`, 'success');
    }
  }

  /**
   * Toggle Play / Pause state
   */
  async togglePlayPause() {
    try {
      await this.audioEngine.init();
    } catch (e) {
      console.warn('Audio init error:', e);
    }

    this.isPlaying = !this.isPlaying;

    if (this.isPlaying) {
      this.startPlaybackLoop();
      if (this.vinylPlayer) this.vinylPlayer.setPlaying(true);
      if (this.dom.playIcon) this.dom.playIcon.style.display = 'none';
      if (this.dom.pauseIcon) this.dom.pauseIcon.style.display = 'inline-block';
      if (this.dom.vinylStatusBadge) {
        this.dom.vinylStatusBadge.textContent = 'NOW PLAYING';
        this.dom.vinylStatusBadge.classList.add('pulse');
      }
    } else {
      this.stopPlaybackLoop();
      if (this.vinylPlayer) this.vinylPlayer.setPlaying(false);
      if (this.dom.playIcon) this.dom.playIcon.style.display = 'inline-block';
      if (this.dom.pauseIcon) this.dom.pauseIcon.style.display = 'none';
      if (this.dom.vinylStatusBadge) {
        this.dom.vinylStatusBadge.textContent = 'PAUSED';
        this.dom.vinylStatusBadge.classList.remove('pulse');
      }
    }
  }

  /**
   * Main playback interval clock
   */
  startPlaybackLoop() {
    this.stopPlaybackLoop();

    // 1x base interval: 220ms per month
    // 2x interval: 110ms per month
    // 4x interval: 55ms per month
    const intervalMs = Math.floor(220 / this.tempoSpeed);

    this.playbackTimer = setInterval(() => {
      this.tick();
    }, intervalMs);
  }

  stopPlaybackLoop() {
    if (this.playbackTimer) {
      clearInterval(this.playbackTimer);
      this.playbackTimer = null;
    }
  }

  /**
   * Advance playback by 1 month and trigger sonification
   */
  tick() {
    if (!this.dataset || this.dataset.length === 0) return;

    // Handle 1985 vs 2025 A/B Time Machine Mode
    if (this.abTimeMachine) {
      this.handleABTimeMachineTick();
      return;
    }

    this.currentIndex++;

    if (this.currentIndex >= this.dataset.length) {
      if (this.isLooping) {
        this.currentIndex = 0;
      } else {
        this.togglePlayPause();
        return;
      }
    }

    this.processCurrentStep();
  }

  /**
   * 1985 vs 2025 A/B Time Machine Loop logic:
   * Plays 12 months of 1985 (Phase A), then seamlessly switches to 12 months of 2025 (Phase B)
   */
  handleABTimeMachineTick() {
    // 1985 starts at index (1985 - 1981) * 12 = 48
    // 2025 starts at index (2025 - 1981) * 12 = 528
    const base1985 = (1985 - 1981) * 12;
    const base2025 = (2025 - 1981) * 12;

    if (this.abPhase === 'A') {
      this.currentIndex = base1985 + (this.abStepCount % 12);
      this.abStepCount++;
      if (this.abStepCount >= 12) {
        this.abPhase = 'B';
        this.abStepCount = 0;
        this.updateABIndicator();
        this.showToast('Time Machine: Transitioning to 2025 Reality (+1.4°C Heat)', 'info');
      }
    } else {
      this.currentIndex = base2025 + (this.abStepCount % 12);
      this.abStepCount++;
      if (this.abStepCount >= 12) {
        this.abPhase = 'A';
        this.abStepCount = 0;
        this.updateABIndicator();
        this.showToast('Time Machine: Returning to 1985 Climate Baseline', 'info');
      }
    }

    this.processCurrentStep();
  }

  processCurrentStep() {
    const dataPoint = this.dataset[this.currentIndex];
    if (!dataPoint) return;

    // 1. Sonify the data point
    if (this.audioEngine) this.audioEngine.sonifyDataPoint(dataPoint);

    // 2. Visual Frame Sonifier (if enabled)
    if (this.pixelSonifierActive && this.currentIndex % 3 === 0 && this.mapController) {
      const frame = this.mapController.getFrameCanvas();
      if (frame && this.audioEngine) this.audioEngine.sonifyImageFrame(frame);
    }

    // 3. Eyes-Closed Museum Audio Narration
    if (this.eyesClosedActive) {
      this.handleMuseumSpeech(dataPoint);
    }

    // 4. Update UI displays
    this.updateDisplay(this.currentIndex);
  }

  /**
   * Update all Telemetry HUD KPI cards, decoder pill, map time, chart scrubber
   */
  updateDisplay(index) {
    const dp = this.dataset[index];
    if (!dp) return;

    // Scrubber update
    if (this.dom.timelineScrubber) this.dom.timelineScrubber.value = index;
    if (this.dom.scrubberCurrentTime) this.dom.scrubberCurrentTime.textContent = `${dp.monthName.toUpperCase()} ${dp.year}`;

    // Vinyl Player update
    if (this.vinylPlayer) this.vinylPlayer.updateDataPoint(dp);

    // Chart scrubber sync
    if (this.timelineChart) this.timelineChart.setPlaybackIndex(index);

    // NASA GIBS Map time sync (updates monthly)
    if (this.mapController) this.mapController.setTime(dp.date);

    // Telemetry HUD Cards
    if (this.dom.hudTime) this.dom.hudTime.textContent = `${dp.monthName.toUpperCase()} ${dp.year}`;
    if (this.dom.hudTimeBadge) this.dom.hudTimeBadge.textContent = `Month ${index + 1} / ${this.dataset.length}`;

    if (this.dom.hudTemp) this.dom.hudTemp.textContent = `${dp.t2m > 0 ? '+' : ''}${dp.t2m.toFixed(1)}°C`;
    if (this.dom.hudTempAnomaly) {
      const sign = dp.anomaly > 0 ? '+' : '';
      this.dom.hudTempAnomaly.textContent = `${sign}${dp.anomaly.toFixed(2)}°C vs 1981-2010`;
    }
    if (this.dom.hudTempBadge) {
      if (dp.anomaly >= 1.5) {
        this.dom.hudTempBadge.textContent = 'EXTREME WARMING';
        this.dom.hudTempBadge.className = 'kpi-badge badge-coral';
      } else if (dp.anomaly >= 1.0) {
        this.dom.hudTempBadge.textContent = 'ELEVATED HEAT';
        this.dom.hudTempBadge.className = 'kpi-badge badge-amber';
      } else {
        this.dom.hudTempBadge.textContent = 'BASELINE NORM';
        this.dom.hudTempBadge.className = 'kpi-badge badge-cyan';
      }
    }

    if (this.dom.hudPrecip) this.dom.hudPrecip.textContent = `${dp.precip.toFixed(1)} mm/d`;
    if (this.dom.hudPrecipBadge) {
      const monthlyTotal = Math.round(dp.precip * 30.4);
      this.dom.hudPrecipBadge.textContent = `~${monthlyTotal} mm/month`;
    }

    if (this.dom.hudSolar) this.dom.hudSolar.textContent = `${dp.solar.toFixed(1)} MJ/m²`;
    if (this.dom.hudSolarBadge) {
      this.dom.hudSolarBadge.textContent = dp.solar > 20 ? 'HIGH INSOLATION' : dp.solar < 8 ? 'LOW / WINTER' : 'MODERATE';
    }

    if (this.dom.hudCo2) this.dom.hudCo2.textContent = `${dp.co2} ppm`;

    // Live "What You Are Hearing" Decoder Pill
    this.updateHearingDecoder(dp);

    // Eyes-Closed Mode Overlay readout
    if (this.dom.eyesClosedYear) this.dom.eyesClosedYear.textContent = `${dp.year} ${dp.monthName}`;
  }

  /**
   * Real-time plain English translation for "What You Are Hearing" Decoder Pill
   */
  updateHearingDecoder(dp) {
    if (!this.dom.decoderText) return;

    let leadText = '';
    let rhythmText = '';
    let padText = '';
    let alertText = '';

    // Temp Lead Synth description
    if (dp.t2m < -10) leadText = 'Deep resonant bass synth';
    else if (dp.t2m < 15) leadText = 'Warm mid-register synth lead';
    else if (dp.t2m < 28) leadText = 'Bright soaring synth lead';
    else leadText = 'High-pitch saturated synth lead';

    // Precipitation Marimba description
    if (dp.precip > 18) rhythmText = 'Rapid cascading marimba drops (Deluge)';
    else if (dp.precip > 8) rhythmText = 'Polyrhythmic marimba raindrops (Heavy Rain)';
    else if (dp.precip > 2) rhythmText = 'Gentle marimba arpeggio (Light Rain)';
    else rhythmText = 'Subtle rhythmic pulse (Dry Period)';

    // Solar Pad
    if (dp.solar > 20) padText = 'Full lush cosmic pad swell';
    else padText = 'Soft ambient pad';

    // Anomaly Alert
    if (dp.anomaly >= 1.45) alertText = ' + 🔔 Crystal Alert Bell (Temp > +1.45°C)';

    const explanation = `🔊 ${leadText} (${dp.t2m}°C) + ${rhythmText} + ${padText}${alertText}`;
    this.dom.decoderText.textContent = explanation;
  }

  /**
   * Jump to specific month index from scrubber or chart click
   */
  jumpToMonth(index, sonifyImmediately = true) {
    this.currentIndex = Math.max(0, Math.min(this.dataset.length - 1, index));
    this.updateDisplay(this.currentIndex);
    if (sonifyImmediately && this.isPlaying) {
      this.audioEngine.sonifyDataPoint(this.dataset[this.currentIndex]);
    }
  }

  /**
   * Set playback speed (1x, 2x, 4x)
   */
  setSpeed(multiplier) {
    this.tempoSpeed = multiplier;
    this.audioEngine.setTempoSpeed(multiplier);
    this.vinylPlayer.setSpeed(multiplier);
    if (this.isPlaying) {
      this.startPlaybackLoop(); // restart timer with new interval
    }
  }

  /**
   * Toggle 1985 vs 2025 "A/B Time Machine"
   */
  toggleABTimeMachine() {
    this.abTimeMachine = !this.abTimeMachine;
    this.dom.abModeToggle?.classList.toggle('active', this.abTimeMachine);

    if (this.abTimeMachine) {
      this.abPhase = 'A';
      this.abStepCount = 0;
      this.dom.abPhaseIndicator.style.display = 'inline-flex';
      this.updateABIndicator();
      this.showToast('1985 vs 2025 Time Machine Activated: Hearing 8-sec 1985 baseline vs 2025 reality', 'info');
      if (!this.isPlaying) this.togglePlayPause();
    } else {
      this.dom.abPhaseIndicator.style.display = 'none';
      this.showToast('1985 vs 2025 Time Machine Deactivated', 'info');
    }
  }

  updateABIndicator() {
    if (!this.dom.abPhaseIndicator) return;
    if (this.abPhase === 'A') {
      this.dom.abPhaseIndicator.innerHTML = '<span class="ab-tag tag-a">A: 1985 BASELINE</span>';
    } else {
      this.dom.abPhaseIndicator.innerHTML = '<span class="ab-tag tag-b">B: 2025 REALITY (+1.4°C)</span>';
    }
  }

  /**
   * Toggle Eyes-Closed Museum Audio Guide Mode
   */
  toggleEyesClosedMode(force) {
    this.eyesClosedActive = force !== undefined ? force : !this.eyesClosedActive;
    this.audioEngine.eyesClosedMode = this.eyesClosedActive;
    this.dom.eyesClosedToggle?.classList.toggle('active', this.eyesClosedActive);

    if (this.dom.eyesClosedOverlay) {
      this.dom.eyesClosedOverlay.style.display = this.eyesClosedActive ? 'flex' : 'none';
    }

    if (this.eyesClosedActive) {
      this.showToast('Eyes-Closed Mode: Stereo temporal panning (Left=Past, Right=Present) + Soft Audio Narration', 'info');
      if (!this.isPlaying) this.togglePlayPause();
      this.speakNarration('Eyes-Closed Museum Audio Guide activated. Audio is spatialized from left for historical decades to right for the present.');
    } else {
      if (this.synth) this.synth.cancel();
      this.audioEngine.setSpatialPan(0);
    }
  }

  /**
   * Speech synthesis for milestone years and extreme events in museum guide mode
   */
  handleMuseumSpeech(dp) {
    if (!this.synth || this.synth.speaking) return;

    // Announce milestone years
    if (dp.month === 1 && dp.year !== this.lastSpokenYear) {
      this.lastSpokenYear = dp.year;
      const milestone = NASA_DATA.MILESTONES.find(m => m.year === dp.year);
      if (milestone) {
        this.speakNarration(milestone.note);
        if (this.dom.eyesClosedSubtitle) this.dom.eyesClosedSubtitle.textContent = milestone.note;
      } else if (dp.year % 5 === 0) {
        this.speakNarration(`Year ${dp.year}. Planetary temperature anomaly: ${dp.anomaly > 0 ? 'plus ' : ''}${dp.anomaly} degrees Celsius.`);
        if (this.dom.eyesClosedSubtitle) this.dom.eyesClosedSubtitle.textContent = `Year ${dp.year} • Anomaly: ${dp.anomaly > 0 ? '+' : ''}${dp.anomaly}°C`;
      }
    }
  }

  speakNarration(text) {
    if (!this.synth) return;
    try {
      this.synth.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.volume = 0.8;
      this.synth.speak(utterance);
    } catch (e) {
      // Speech fallback
    }
  }

  /**
   * Generate personalized "Your Climate Lifetime Soundtrack"
   */
  generateLifetimeSoundtrack() {
    const birthYear = parseInt(this.dom.birthYearInput.value, 10);
    if (isNaN(birthYear) || birthYear < 1981 || birthYear > 2025) {
      this.showToast('Please enter a birth year between 1981 and 2025.', 'error');
      return;
    }

    // Calculate warming delta from birth year to 2025
    const birthIndex = (birthYear - 1981) * 12;
    const nowIndex = this.dataset.length - 1;

    const birthPoint = this.dataset[birthIndex] || this.dataset[0];
    const nowPoint = this.dataset[nowIndex] || this.dataset[this.dataset.length - 1];

    const delta = +(nowPoint.anomaly - birthPoint.anomaly).toFixed(2);
    const deltaSign = delta > 0 ? '+' : '';

    this.dom.lifetimeDeltaBadge.style.display = 'inline-flex';
    this.dom.lifetimeDeltaText.textContent = `Earth has warmed ${deltaSign}${delta}°C since you were born in ${birthYear}.`;

    // Jump to birth year and start playback
    this.jumpToMonth(birthIndex);
    if (!this.isPlaying) this.togglePlayPause();

    this.showToast(`Playing your lifetime soundtrack from ${birthYear} to 2025 (${deltaSign}${delta}°C warming).`, 'success');
  }

  /**
   * Continuous 60fps loop updating DJ Stem live VU meters
   */
  startLiveMetersLoop() {
    const updateMeters = () => {
      if (this.isPlaying && this.audioEngine) {
        const levels = this.audioEngine.getLiveStemLevels();
        this.renderVuMeter(this.dom.vuMeters.temp, levels.temp);
        this.renderVuMeter(this.dom.vuMeters.precip, levels.precip);
        this.renderVuMeter(this.dom.vuMeters.solar, levels.solar);
        this.renderVuMeter(this.dom.vuMeters.alert, levels.alert);
      }
      requestAnimationFrame(updateMeters);
    };
    requestAnimationFrame(updateMeters);
  }

  renderVuMeter(meterElement, level) {
    if (!meterElement) return;
    const segments = meterElement.querySelectorAll('.vu-segment');
    const activeCount = Math.floor(level * segments.length);

    segments.forEach((seg, idx) => {
      seg.classList.toggle('active', idx < activeCount);
    });
  }

  /**
   * Keyboard shortcuts handling
   */
  handleKeyboardShortcut(e) {
    // Ignore keystrokes when typing into input fields
    if (['INPUT', 'SELECT', 'TEXTAREA'].includes(e.target.tagName)) return;

    switch (e.code) {
      case 'Space':
        e.preventDefault();
        this.togglePlayPause();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        this.jumpToMonth(this.currentIndex - (e.shiftKey ? 12 : 1));
        break;
      case 'ArrowRight':
        e.preventDefault();
        this.jumpToMonth(this.currentIndex + (e.shiftKey ? 12 : 1));
        break;
      case 'Digit1':
        this.audioEngine.toggleStemMute('temp');
        this.updateStemUi('temp');
        break;
      case 'Digit2':
        this.audioEngine.toggleStemMute('precip');
        this.updateStemUi('precip');
        break;
      case 'Digit3':
        this.audioEngine.toggleStemMute('solar');
        this.updateStemUi('solar');
        break;
      case 'Digit4':
        this.audioEngine.toggleStemMute('alert');
        this.updateStemUi('alert');
        break;
      case 'KeyA':
        this.toggleABTimeMachine();
        break;
      case 'KeyE':
        this.toggleEyesClosedMode();
        break;
      case 'Escape':
        this.hideModal('methodology');
        this.hideModal('keyboard');
        this.hideModal('coord');
        this.hideModal('disclaimer');
        this.hideModal('svs');
        this.toggleEyesClosedMode(false);
        break;
    }
  }

  updateStemUi(stemKey) {
    const btn = document.querySelector(`.stem-mute-btn[data-stem="${stemKey}"]`);
    if (btn) btn.classList.toggle('muted', this.audioEngine.stems[stemKey].muted);
  }

  // ==========================================
  // NASA EIC & SVS Visual Studio (Caldwell 73)
  // ==========================================

  initSvsStudio() {
    if (!this.activeSvsDatasetId) {
      this.activeSvsDatasetId = this.dom.svsDatasetSelect ? this.dom.svsDatasetSelect.value : '5196';
    }
    this.renderSvsVisualFrame(this.activeSvsDatasetId);
  }

  renderSvsVisualFrame(datasetId) {
    const canvas = this.dom.svsCanvas;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    // Render dataset-specific procedural visualization representing official NASA SVS frame
    switch (datasetId) {
      case '5196': { // DYAMOND Global CO2
        const bgGrad = ctx.createLinearGradient(0, 0, w, h);
        bgGrad.addColorStop(0, '#0a0d1a');
        bgGrad.addColorStop(1, '#1e1408');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, w, h);

        // CO2 concentration plumes (warm amber / red gradients across latitudes)
        for (let i = 0; i < 7; i++) {
          const y = 40 + i * 35;
          const grad = ctx.createLinearGradient(0, y, w, y);
          grad.addColorStop(0, 'rgba(245, 158, 11, 0.15)');
          grad.addColorStop(0.3 + (i * 0.08) % 0.4, 'rgba(244, 63, 94, 0.65)');
          grad.addColorStop(0.7 - (i * 0.05) % 0.3, 'rgba(245, 158, 11, 0.7)');
          grad.addColorStop(1, 'rgba(56, 189, 248, 0.2)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.moveTo(0, y + Math.sin(i) * 15);
          for (let x = 0; x <= w; x += 20) {
            const waveY = y + Math.sin((x / 60) + i) * 22 + Math.cos(x / 40) * 10;
            ctx.lineTo(x, waveY);
          }
          ctx.lineTo(w, y + 40);
          ctx.lineTo(0, y + 40);
          ctx.closePath();
          ctx.fill();
        }

        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.font = '13px JetBrains Mono, monospace';
        ctx.fillText('NASA SVS 5196: DYAMOND CO2 SIMULATION (3.2km Grid)', 15, 25);
        ctx.fillStyle = 'rgba(245, 158, 11, 0.9)';
        ctx.fillText('Max Concentration: ~426 ppm (Boreal Summer Plume)', 15, h - 15);
        break;
      }

      case '5011': { // ISS Spaceborne Lightning
        ctx.fillStyle = '#05070f';
        ctx.fillRect(0, 0, w, h);

        const earthGrad = ctx.createRadialGradient(w / 2, h * 1.3, 100, w / 2, h * 1.3, w * 0.9);
        earthGrad.addColorStop(0, 'rgba(14, 165, 233, 0.25)');
        earthGrad.addColorStop(0.8, 'rgba(6, 9, 19, 0.95)');
        earthGrad.addColorStop(1, '#05070f');
        ctx.fillStyle = earthGrad;
        ctx.fillRect(0, 0, w, h);

        const strikes = [
          { x: 120, y: 140, r: 45, intensity: 0.95 },
          { x: 280, y: 110, r: 60, intensity: 1.0 },
          { x: 440, y: 160, r: 50, intensity: 0.85 },
          { x: 210, y: 190, r: 35, intensity: 0.75 },
          { x: 530, y: 120, r: 40, intensity: 0.9 }
        ];

        strikes.forEach(s => {
          const lGrad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r);
          lGrad.addColorStop(0, `rgba(255, 255, 255, ${s.intensity})`);
          lGrad.addColorStop(0.2, `rgba(56, 189, 248, ${s.intensity * 0.8})`);
          lGrad.addColorStop(0.6, `rgba(147, 51, 234, ${s.intensity * 0.4})`);
          lGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = lGrad;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = `rgba(255, 255, 255, ${s.intensity * 0.9})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          let bx = s.x;
          let by = s.y;
          for (let step = 0; step < 5; step++) {
            bx += (Math.random() - 0.5) * 20;
            by += (Math.random() - 0.3) * 16;
            ctx.lineTo(bx, by);
          }
          ctx.stroke();
        });

        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.font = '13px JetBrains Mono, monospace';
        ctx.fillText('NASA SVS 5011: ISS LIGHTNING IMAGING SENSOR (LIS)', 15, 25);
        ctx.fillStyle = 'rgba(56, 189, 248, 0.9)';
        ctx.fillText('Flash Rate: ~44 events/sec worldwide | Punctuated Triggers Active', 15, h - 15);
        break;
      }

      case '5425': { // Perpetual Ocean
        const oceanBg = ctx.createLinearGradient(0, 0, 0, h);
        oceanBg.addColorStop(0, '#02182b');
        oceanBg.addColorStop(0.5, '#052b47');
        oceanBg.addColorStop(1, '#02131f');
        ctx.fillStyle = oceanBg;
        ctx.fillRect(0, 0, w, h);

        ctx.lineWidth = 2;
        for (let i = 0; i < 18; i++) {
          const cy = 30 + i * 14;
          const flowGrad = ctx.createLinearGradient(0, cy, w, cy);
          flowGrad.addColorStop(0, 'rgba(2, 132, 199, 0.3)');
          flowGrad.addColorStop(0.4, 'rgba(56, 189, 248, 0.85)');
          flowGrad.addColorStop(0.7, 'rgba(16, 185, 129, 0.7)');
          flowGrad.addColorStop(1, 'rgba(2, 132, 199, 0.3)');
          ctx.strokeStyle = flowGrad;

          ctx.beginPath();
          ctx.moveTo(0, cy);
          for (let x = 0; x <= w; x += 15) {
            const eddy = Math.sin((x / 50) + (i * 0.4)) * 18 + Math.cos(x / 80) * 12;
            ctx.lineTo(x, cy + eddy);
          }
          ctx.stroke();
        }

        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.font = '13px JetBrains Mono, monospace';
        ctx.fillText('NASA SVS 5425 / 3912: PERPETUAL OCEAN (ECCO Model)', 15, 25);
        ctx.fillStyle = 'rgba(16, 185, 129, 0.9)';
        ctx.fillText('Stream Velocity: ~2.5 m/s | Kinetic Harmonic Sweeps', 15, h - 15);
        break;
      }

      case '4950': { // GEDI Forest Canopy Height
        ctx.fillStyle = '#07150c';
        ctx.fillRect(0, 0, w, h);

        for (let x = 0; x < w; x += 8) {
          const heightNorm = 0.2 + 0.6 * (Math.sin(x / 35) * 0.5 + 0.5) + (Math.random() * 0.2);
          const barHeight = heightNorm * (h - 80);
          const barY = h - 35 - barHeight;

          const gGrad = ctx.createLinearGradient(0, barY, 0, h - 35);
          if (heightNorm > 0.7) {
            gGrad.addColorStop(0, 'rgba(245, 158, 11, 0.9)');
            gGrad.addColorStop(0.5, 'rgba(16, 185, 129, 0.8)');
          } else {
            gGrad.addColorStop(0, 'rgba(16, 185, 129, 0.8)');
            gGrad.addColorStop(0.7, 'rgba(5, 150, 105, 0.6)');
          }
          gGrad.addColorStop(1, 'rgba(6, 78, 59, 0.4)');

          ctx.fillStyle = gGrad;
          ctx.fillRect(x, barY, 6, barHeight);
        }

        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.font = '13px JetBrains Mono, monospace';
        ctx.fillText('NASA SVS 4950: GEDI GLOBAL FOREST CANOPY HEIGHT', 15, 25);
        ctx.fillStyle = 'rgba(16, 185, 129, 0.9)';
        ctx.fillText('Canopy Max: 62m (Emergent Rain Forest) | Pitch & Marimba Mapping', 15, h - 15);
        break;
      }

      case '5313': { // Night Lights (VIIRS Black Marble)
        ctx.fillStyle = '#03050a';
        ctx.fillRect(0, 0, w, h);

        const cities = [
          { x: 100, y: 110, r: 25, b: 0.95 },
          { x: 180, y: 140, r: 35, b: 0.9 },
          { x: 260, y: 90, r: 45, b: 1.0 },
          { x: 380, y: 160, r: 50, b: 0.85 },
          { x: 480, y: 120, r: 40, b: 0.95 },
          { x: 540, y: 150, r: 30, b: 0.8 }
        ];

        cities.forEach(c => {
          const nGrad = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.r);
          nGrad.addColorStop(0, `rgba(254, 240, 138, ${c.b})`);
          nGrad.addColorStop(0.3, `rgba(245, 158, 11, ${c.b * 0.7})`);
          nGrad.addColorStop(0.7, `rgba(180, 83, 9, ${c.b * 0.3})`);
          nGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = nGrad;
          ctx.beginPath();
          ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
          ctx.fill();
        });

        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.font = '13px JetBrains Mono, monospace';
        ctx.fillText('NASA SVS 5313: VIIRS BLACK MARBLE NIGHT LIGHTS (2012-2023)', 15, 25);
        ctx.fillStyle = 'rgba(245, 158, 11, 0.9)';
        ctx.fillText('Luminance Dynamic Range: 0-100 nW/cm²/sr | Tempo Modulations', 15, h - 15);
        break;
      }

      case '5669': { // GEOS Aerosols
        ctx.fillStyle = '#080d18';
        ctx.fillRect(0, 0, w, h);

        ctx.fillStyle = 'rgba(245, 158, 11, 0.45)';
        ctx.beginPath();
        ctx.ellipse(220, 130, 150, 40, 0.1, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgba(244, 63, 94, 0.4)';
        ctx.beginPath();
        ctx.ellipse(380, 110, 120, 35, -0.15, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgba(56, 189, 248, 0.35)';
        ctx.beginPath();
        ctx.ellipse(140, 180, 110, 30, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.font = '13px JetBrains Mono, monospace';
        ctx.fillText('NASA SVS 5669 / 5533: GEOS MULTI-TRACK AEROSOLS', 15, 25);
        ctx.fillStyle = 'rgba(244, 63, 94, 0.9)';
        ctx.fillText('Aerosol Optical Depth (AOD) > 0.8 | 4-Track Assigned Stems', 15, h - 15);
        break;
      }

      case '4960': { // Atmospheric River 3D
        ctx.fillStyle = '#03101c';
        ctx.fillRect(0, 0, w, h);

        const arGrad = ctx.createLinearGradient(0, h, w, 40);
        arGrad.addColorStop(0, 'rgba(2, 132, 199, 0.1)');
        arGrad.addColorStop(0.3, 'rgba(56, 189, 248, 0.5)');
        arGrad.addColorStop(0.6, 'rgba(255, 255, 255, 0.85)');
        arGrad.addColorStop(0.8, 'rgba(56, 189, 248, 0.6)');
        arGrad.addColorStop(1, 'rgba(2, 132, 199, 0.1)');

        ctx.fillStyle = arGrad;
        ctx.beginPath();
        ctx.moveTo(30, h - 20);
        ctx.bezierCurveTo(150, h * 0.7, 300, 120, w - 40, 50);
        ctx.bezierCurveTo(340, 70, 200, h * 0.85, 50, h);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.font = '13px JetBrains Mono, monospace';
        ctx.fillText('NASA SVS 4960: 3D ATMOSPHERIC RIVER MOISTURE STREAM', 15, 25);
        ctx.fillStyle = 'rgba(56, 189, 248, 0.9)';
        ctx.fillText('Integrated Vapor Transport (IVT) > 500 kg/m/s | Deluge Cascades', 15, h - 15);
        break;
      }

      case '13786': // Caldwell 73
      default: {
        ctx.fillStyle = '#030408';
        ctx.fillRect(0, 0, w, h);

        const nebula = ctx.createRadialGradient(w / 2, h / 2, 10, w / 2, h / 2, 140);
        nebula.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        nebula.addColorStop(0.2, 'rgba(56, 189, 248, 0.7)');
        nebula.addColorStop(0.5, 'rgba(147, 51, 234, 0.45)');
        nebula.addColorStop(0.8, 'rgba(244, 63, 94, 0.25)');
        nebula.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = nebula;
        ctx.beginPath();
        ctx.arc(w / 2, h / 2, 140, 0, Math.PI * 2);
        ctx.fill();

        for (let i = 0; i < 40; i++) {
          const sx = (Math.sin(i * 99) * 0.5 + 0.5) * w;
          const sy = (Math.cos(i * 33) * 0.5 + 0.5) * h;
          const sr = (i % 3 === 0) ? 2 : 1;
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.beginPath();
          ctx.arc(sx, sy, sr, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.font = '13px JetBrains Mono, monospace';
        ctx.fillText('NASA SVS 13786: CALDWELL 73 DATA SONIFICATION FRAMEWORK', 15, 25);
        ctx.fillStyle = 'rgba(56, 189, 248, 0.9)';
        ctx.fillText('Y-Axis: Musical Pitch | Luminance: Volume & Harmonic Filter', 15, h - 15);
        break;
      }
    }
  }

  toggleCaldwellScanline() {
    this.caldwellScanlineRunning = !this.caldwellScanlineRunning;
    if (this.dom.toggleScanlineBtn) {
      this.dom.toggleScanlineBtn.textContent = this.caldwellScanlineRunning ? '⏹ Stop Radar Scan' : '▶ Start Radar Scanline';
      this.dom.toggleScanlineBtn.classList.toggle('active', this.caldwellScanlineRunning);
    }
    if (this.dom.caldwellScanline) {
      this.dom.caldwellScanline.style.display = this.caldwellScanlineRunning ? 'block' : 'none';
    }

    if (this.caldwellScanlineRunning) {
      this.caldwellScanX = 0;
      this.runCaldwellScanLoop();
      this.showToast('Caldwell 73 Radar Scanline Active: Translating coordinates & luminosity to audio', 'info');
    }
  }

  stopCaldwellScanline() {
    this.caldwellScanlineRunning = false;
    if (this.dom.toggleScanlineBtn) {
      this.dom.toggleScanlineBtn.textContent = '▶ Start Radar Scanline';
      this.dom.toggleScanlineBtn.classList.remove('active');
    }
    if (this.dom.caldwellScanline) {
      this.dom.caldwellScanline.style.display = 'none';
    }
  }

  runCaldwellScanLoop() {
    if (!this.caldwellScanlineRunning) return;
    const canvas = this.dom.svsCanvas;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    this.caldwellScanX = (this.caldwellScanX + 3) % w;

    if (this.dom.caldwellScanline) {
      this.dom.caldwellScanline.style.left = `${(this.caldwellScanX / w) * 100}%`;
    }

    try {
      const imgData = ctx.getImageData(Math.floor(this.caldwellScanX), 0, 1, h);
      const data = imgData.data;
      const samples = [];
      let totalLum = 0;
      let totalR = 0, totalG = 0, totalB = 0;

      const step = Math.floor(h / 12);
      for (let i = 0; i < 12; i++) {
        const y = i * step;
        const offset = y * 4;
        const r = data[offset];
        const g = data[offset + 1];
        const b = data[offset + 2];
        const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        totalLum += lum;
        totalR += r;
        totalG += g;
        totalB += b;
        if (lum > 0.08) {
          samples.push({ y, r, g, b, lum });
        }
      }

      const avgLum = totalLum / 12;
      const primaryColor = totalR > totalG && totalR > totalB ? 'Warm Amber / CO2 Plume' :
                           totalG > totalR && totalG > totalB ? 'Emerald / GEDI Canopy' :
                           totalB > totalR && totalB > totalG ? 'Cyan / Ocean Currents' : 'White / Lightning Arc';

      if (this.dom.svsReadoutLum) this.dom.svsReadoutLum.textContent = `${Math.round(avgLum * 100)}%`;
      if (this.dom.svsReadoutTimbre) this.dom.svsReadoutTimbre.textContent = primaryColor;
      if (this.dom.svsReadoutPitch) {
        this.dom.svsReadoutPitch.textContent = samples.length > 0 ? `D3-A5 (${samples.length} Active Harmonic Nodes)` : 'Silent / Dark Void';
      }

      if (samples.length > 0 && this.audioEngine) {
        this.audioEngine.sonifyCaldwellScanline(samples, h);
      }
    } catch (e) {
      // safe fallback
    }

    requestAnimationFrame(() => this.runCaldwellScanLoop());
  }

  flashSvsCanvas() {
    const canvas = this.dom.svsCanvas;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = '#38BDF8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(w / 2, 0);
    let curX = w / 2;
    let curY = 0;
    while (curY < h) {
      curX += (Math.random() - 0.5) * 60;
      curY += Math.random() * 40;
      ctx.lineTo(curX, curY);
    }
    ctx.stroke();
    ctx.restore();

    setTimeout(() => {
      this.renderSvsVisualFrame(this.activeSvsDatasetId || '5011');
    }, 120);
  }

  showModal(name) {
    if (name === 'methodology' && this.dom.methodologyModal) this.dom.methodologyModal.style.display = 'flex';
    if (name === 'keyboard' && this.dom.keyboardModal) this.dom.keyboardModal.style.display = 'flex';
    if (name === 'coord' && this.dom.coordInputModal) this.dom.coordInputModal.style.display = 'flex';
    if (name === 'disclaimer' && this.dom.disclaimerModal) this.dom.disclaimerModal.style.display = 'flex';
    if (name === 'svs' && this.dom.svsStudioModal) this.dom.svsStudioModal.style.display = 'flex';
  }

  hideModal(name) {
    if (name === 'methodology' && this.dom.methodologyModal) this.dom.methodologyModal.style.display = 'none';
    if (name === 'keyboard' && this.dom.keyboardModal) this.dom.keyboardModal.style.display = 'none';
    if (name === 'coord' && this.dom.coordInputModal) this.dom.coordInputModal.style.display = 'none';
    if (name === 'disclaimer' && this.dom.disclaimerModal) this.dom.disclaimerModal.style.display = 'none';
    if (name === 'svs' && this.dom.svsStudioModal) {
      this.dom.svsStudioModal.style.display = 'none';
      this.stopCaldwellScanline();
    }
  }

  showToast(message, type = 'info') {
    if (!this.dom.toastContainer) return;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<span class="toast-dot"></span><span>${message}</span>`;
    this.dom.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => {
        if (toast.remove) toast.remove();
        else if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 400);
    }, 3800);
  }
}

// Instantiate immediately or on DOM load
function initJukeboxApp() {
  if (!window.jukeboxApp) {
    try {
      window.jukeboxApp = new EarthJukeboxApp();
    } catch (err) {
      console.error('Fatal initialization error:', err);
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initJukeboxApp);
} else {
  initJukeboxApp();
}
