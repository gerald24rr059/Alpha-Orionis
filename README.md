# 🪐 The Earth Information Jukebox
### *2026 NASA Space Apps Challenge Single-Page Web Application*

> **"45 Years of Earth Information Center (EIC) Telemetry & Scientific Visualization Studio (SVS) Datasets Harmonized into Sound"**

---

## ⚠️ Official NASA Non-Endorsement Disclaimer & Data Notice

> **NASA Non-Endorsement Notice:**
> NASA does not endorse any non-U.S. Government entity and is not responsible for information contained on non-U.S. Government websites. For non-U.S. Government websites, participants must comply with any data use parameters of that specific website.

---

## 🌟 Executive Overview
**The Earth Information Jukebox** is an accessible, retro-futuristic single-page web application engineered for the **2026 NASA Space Apps Challenge: "The Earth Information Jukebox"**. It translates over four decades (1981–2025) of continuous NASA satellite observations, Earth Information Center (EIC) dashboards, and NASA Scientific Visualization Studio (SVS) models into an evocative, documentary-grade acoustic journey.

By pairing tactile, vintage jukebox physical interactions—including an interactive **spinning Earth-vinyl turntable with audio-reactive glowing data rings and an animated tonearm**—with real NASA Earth Science APIs, the application empowers users to *hear* planetary warming, tropical monsoon pulses, spaceborne lightning strikes, ocean current dynamics, and polar cryosphere retreats.

---

## 🎨 Visual Design & Retro-Futuristic NASA Aesthetic
- **Deep Orbital Theme:** Built on a deep orbital background (`#060913`) enhanced with subtle animated starfields and nebula dust.
- **Frosted Glassmorphism:** Translucent control panels (`rgba(15, 23, 42, 0.72)`) with `backdrop-filter: blur(16px)` and illuminated borders in NASA Cyan (`#38BDF8`), Solar Amber (`#F59E0B`), Emerald (`#10B981`), and Coral Alert (`#F43F5E`).
- **Tactile Spinning Earth-Vinyl Player:**
  - High-precision 60fps HTML5 Canvas turntable rotating proportionally to playback tempo (33 RPM / 1x, 45 RPM / 2x, 78 RPM / 4x).
  - Concentric sound grooves with dynamic specular sheen and illuminated concentric data rings pulsing to real-time Web Audio frequency waveforms.
  - Realistic mechanical tonearm that smoothly pivots onto the record when playing and lifts to rest position when paused.
  - Visual electrical discharge arcs on the vinyl face triggered during International Space Station (ISS) lightning events.
- **Interactive UI Architecture:**
  - **Zero-Friction Onboarding:** 3-Step Quick-Start banner guide (dismissible, state persisted).
  - **Record Category Tabs:** Filter smoothly between *All Planet Tracks*, *45-Year Climate Telemetry*, and *NASA EIC / SVS Visual Studio*.
  - **Telemetry HUD:** 4 Glassmorphic KPI cards tracking Time, Surface Temperature, Precipitation, Solar Flux, and Atmospheric CO₂.
  - **Live "What You Are Hearing" Decoder Pill:** Real-time natural language status translation explaining active instrument layers in plain English.

---

## 🛰️ NASA Earth Information Center (EIC) & SVS Dataset Architecture

The Earth Information Jukebox integrates the full suite of **11 official NASA EIC and Scientific Visualization Studio (SVS) resources** alongside the NASA POWER and GIBS satellite pipelines:

| # | Official NASA Resource | SVS / Catalog ID | Official NASA Link | Sonification & Conceptual Mapping Framework |
|---|---|---|---|---|
| **1** | **Earth Information Center (EIC) Content Database** | EIC Gallery | [svs.gsfc.nasa.gov/gallery/earth-information-center](https://svs.gsfc.nasa.gov/gallery/earth-information-center/) | High-resolution visual assets and dashboards developed by SVS for EIC; served as source imagery and baseline profiles for audio sonification. |
| **2** | **Data Sonification: Caldwell 73** | SVS 13786 | [svs.gsfc.nasa.gov/13786](https://svs.gsfc.nasa.gov/13786/) | Foundational conceptual framework: vertical spatial coordinates ($Y$) map to musical pitch, while pixel luminosity maps directly to volume and resonant filter cutoff. |
| **3** | **Change in Night Lights (2012–2023) - EIC Version** | SVS 5313 | [svs.gsfc.nasa.gov/5313](https://svs.gsfc.nasa.gov/5313/) | High-contrast VIIRS Day/Night Band urban illumination maps light density to playback tempo (BPM) and granular electronic chimes. |
| **4** | **Global Sea Surface Currents and Temperature** | SVS 3912 | [svs.gsfc.nasa.gov/3912/#media_group_349716](https://svs.gsfc.nasa.gov/3912/#media_group_349716) | Fluid movement of ocean currents and shifting thermal gradients convert continuous flowing motion into evolving orchestral sweeps. |
| **5** | **GEOS Aerosols** | SVS 5669 | [svs.gsfc.nasa.gov/5669](https://svs.gsfc.nasa.gov/5669/) | Atmospheric aerosol paths separated into a 4-track audio matrix: Smoke (airy filtered noise), Dust (gritty sawtooth), Sea Salt (shimmer), and Sulfate (cold bell). |
| **6** | **Air Quality Model Runs** | SVS 5533 | [svs.gsfc.nasa.gov/5533](https://svs.gsfc.nasa.gov/5533/) | Atmospheric chemistry frames algorithmically convert color palettes and particulate pixel densities into dynamic sound profiles. |
| **7** | **Perpetual Ocean 2: Western Boundary Currents** | SVS 5425 | [svs.gsfc.nasa.gov/5425](https://svs.gsfc.nasa.gov/5425/) | High-contrast ECCO oceanic boundary current maps process fluid velocity vectors to drive harmonic Lydian chord progressions. |
| **8** | **DYAMOND Global Carbon Dioxide** | SVS 5196 | [svs.gsfc.nasa.gov/5196](https://svs.gsfc.nasa.gov/5196/) | 3.2-kilometer global CO₂ simulation drives the interactive audio synthesis as an ambient sub-bass drone modulated by atmospheric carbon concentrations. |
| **9** | **Lightning Events Detected from ISS (2017–2023)** | SVS 5011 | [svs.gsfc.nasa.gov/5011](https://svs.gsfc.nasa.gov/5011/) | Spaceborne Lightning Imaging Sensor (LIS) compilation drives **punctuated sonification**, triggering sharp percussive transients and crystal chimes synced to space lightning flashes. |
| **10** | **3D View of an Atmospheric River** | SVS 4960 | [svs.gsfc.nasa.gov/4960](https://svs.gsfc.nasa.gov/4960/) | 3D moisture filament corridors map water vapor transport density to immersive marimba cascades and stereo ping-pong delay sweeps. |
| **11** | **GEDI Forest Canopy Height** | SVS 4950 | [svs.gsfc.nasa.gov/4950](https://svs.gsfc.nasa.gov/4950/) | Spaceborne lidar elevation spectrum (0 to 60+ meters) maps to pitch and timbre: emergent giant canopies trigger deep bass, while dense foliage drives acoustic marimba tones. |

---

## 🔭 Live NASA Satellite & Planetary APIs

### 1. Live NASA POWER Point Data API
Whenever a user clicks any point on the interactive 3D satellite map or enters custom coordinates:
```http
https://power.larc.nasa.gov/api/temporal/monthly/point?parameters=T2M,PRECTOTCORR,ALLSKY_SFC_SW_DWN&community=RE&longitude={lon}&latitude={lat}&start=1981&end=2025&format=JSON
```
- **`T2M` (°C):** MERRA-2 and AIRS monthly mean surface air temperature.
- **`PRECTOTCORR` (mm/day):** GPCP precipitation rate.
- **`ALLSKY_SFC_SW_DWN` (MJ/m²/day):** CERES all-sky solar insolation.
- **GISTEMP Baseline Normal:** Computes thirty-year monthly normals (1981–2010) to accurately calculate temperature anomalies for all 540 months.
- **Automatic Fallback:** Seamless physical climate model fallback if offline or rate-limited.

### 2. NASA GIBS Satellite Imagery Layer (Leaflet.js)
Direct integration with **NASA EOSDIS Global Imagery Browse Services (GIBS)** via WMTS tile layers:
- `MODIS_Terra_CorrectedReflectance_TrueColor`
- `AIRS_L2_Surface_Air_Temperature_Day`
Tile time dimensions synchronize dynamically with the active playback month/year (`YYYY-MM-DD`).

---

## 🎹 Studio-Grade Sonification Engine (Tone.js & Web Audio API)

### Harmonic Scale & Instrument Matrix
Rather than harsh, abrasive beeps, all telemetry is mapped to a warm **D Major Pentatonic / Lydian scale (D, E, F#, G#, A, B, C#)** treated with stereo ping-pong delay and lush hall reverb:
- **Stem 1: Surface Temperature (`T2M`) → Analog Synth Lead:** Higher temperatures glide smoothly up in pitch while opening a resonant lowpass filter (400 Hz to 4,200 Hz).
- **Stem 2: Precipitation (`PRECTOTCORR`) → Acoustic Marimba / Raindrop Arpeggios:** Rainfall rate governs note density, stereo shimmer, and raindrop cascade speed.
- **Stem 3: Solar Insolation (`ALLSKY_SFC_SW_DWN`) → Lush Cosmic Pad:** Radiative flux modulates harmonic chord richness (Dmaj9, Gmaj9, Bm9) and atmospheric swell.
- **Stem 4: Extreme Anomaly Alert → Crystal Bell Chime:** Sparkly chime triggers whenever temperature anomaly crosses `+1.5°C` or historic precipitation spikes occur.

### Special Modes & Interactive Studios
1. **NASA EIC SVS Visual Studio & Caldwell 73 Radar Scanline:**
   - Full interactive modal inspecting and sonifying the official NASA SVS visual datasets.
   - Animated radar scanline traversing pixel columns to map spatial coordinates and luminosity directly to audio frequencies and volume in real-time.
   - Interactive ISS Lightning Event trigger button firing spaceborne flash sonification and turntable electrical discharge arcs.
2. **1985 vs. 2025 "A/B Time Machine":**
   - Seamless comparison mode playing an 8-second musical loop of 1985 baseline climate immediately followed by an 8-second loop of 2025 reality.
3. **Visual Frame Pixel-to-Sound Mode:**
   - Samples RGB color and brightness values across the active NASA GIBS satellite frame canvas and maps them to harmonic oscillator frequencies.
4. **"Your Climate Lifetime Soundtrack" Builder:**
   - Users input their Birth Year (1981–2025) and location to generate a personalized soundtrack showing exactly how Earth warmed during their lifetime.

---

## ♿ Accessibility & Museum Audio Guide
- **"Eyes-Closed Museum Audio Sanctuary" Mode:**
  - Spatial temporal panning: Historical decades (1980s) pan gently to the **left stereo channel**, modern decades (2020s) pan to the **right stereo channel**.
  - High-contrast visual focus view with large typography.
  - Soft speech synthesis (`window.speechSynthesis`) narrating milestone climate years and extreme anomalies.
- **Full Keyboard Navigation:**
  - `Space`: Play / Pause
  - `←` / `→`: Scrub month by month
  - `Shift` + `←` / `→`: Jump 1 year backward / forward
  - `1`, `2`, `3`, `4`: Mute / Unmute Stem channels
  - `A`: Toggle 1985 vs 2025 A/B Time Machine
  - `E`: Toggle Eyes-Closed Audio Sanctuary
  - `Esc`: Close modals and overlays
- **WCAG AAA Compliance:** High-contrast text (> 12:1 ratio), visible focus rings, and full ARIA live regions for screen reader support.

---

## 🚀 Quick Start Instructions

This project is completely self-contained and requires **zero build steps or package installations**:

1. **Direct Browser Launch:**
   Double-click `index.html` or open it directly in any modern browser (Chrome, Edge, Firefox, Safari). The standalone `js/bundle.js` ensures that all scripts, data, and audio nodes run cleanly even under the `file://` protocol without CORS restrictions.

2. **Or with a Local Static Server:**
   ```bash
   # Using Python 3:
   python -m http.server 8000
   # Open http://localhost:8000
   ```
   ```bash
   # Using Node.js npx:
   npx serve .
   ```

---

## 🏛️ Acknowledgments & Official Citations
- **NASA Scientific Visualization Studio (SVS):** [svs.gsfc.nasa.gov](https://svs.gsfc.nasa.gov/)
- **NASA Earth Information Center (EIC):** [earth.gov](https://earth.gov/)
- **NASA Prediction Of Worldwide Energy Resources (POWER):** [power.larc.nasa.gov](https://power.larc.nasa.gov/)
- **NASA Global Imagery Browse Services (GIBS):** [gibs.earthdata.nasa.gov](https://gibs.earthdata.nasa.gov/)
- **NASA Goddard Institute for Space Studies (GISTEMP v4):** [data.giss.nasa.gov/gistemp](https://data.giss.nasa.gov/gistemp/)
- **Tone.js Web Audio Framework:** [tonejs.github.io](https://tonejs.github.io/)
- **Leaflet.js Mapping Library:** [leafletjs.com](https://leafletjs.com/)
- **Chart.js Visualization Library:** [chartjs.org](https://chartjs.org/)
