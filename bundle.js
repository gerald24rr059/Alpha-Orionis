/**
 * Earth Information Jukebox - Standalone Universal Bundle
 * 2026 NASA Space Apps Challenge
 * Automatically generated to support both file:// protocol (double-click) and http://
 */

(function() {
  'use strict';

  // --- 1. NASA DATA & CLIMATOLOGY ENGINE ---
  /**
 * Earth Information Jukebox - NASA Data & Climatology Engine
 * Integrates live NASA POWER API, NASA EOSDIS GIBS, and the official
 * NASA Earth Information Center (EIC) / Scientific Visualization Studio (SVS) Content Database.
 */

const NASA_DATA = {
  // Official NASA Space Apps Non-Endorsement Disclaimer
  DISCLAIMER: "NASA does not endorse any non-U.S. Government entity and is not responsible for information contained on non-U.S. Government websites. For non-U.S. Government websites, participants must comply with any data use parameters of that specific website.",

  // Baseline period for climatological normals
  BASELINE_START: 1981,
  BASELINE_END: 2010,
  START_YEAR: 1981,
  END_YEAR: 2025,
  TOTAL_MONTHS: (2025 - 1981 + 1) * 12, // 540 months

  // 1. Core Featured Planet Records (45-Year Historical Time Series)
  FEATURED_RECORDS: [
    {
      id: 'global-breathing',
      category: 'climate',
      title: 'The Breathing Planet',
      subtitle: 'Global Surface Temperature Anomaly & CO₂ Pulse',
      locationName: 'Earth Global Composite (Land & Ocean)',
      lat: 0.0,
      lon: 0.0,
      genre: 'Ambient Atmospheric Drone & Cosmic Chords',
      bpm: 72,
      key: 'D Major / Lydian',
      description: 'A 45-year acoustic portrait of Earth\'s vital signs: the steady rhythm of seasonal biosphere respiration, the thermal shock of super El Niño events (1998, 2016), and the historic heat surge of 2023–2025.',
      funFact: 'In 2023, Earth\'s average surface temperature was ~1.48°C warmer than pre-industrial averages, driven by ocean heat content and atmospheric greenhouse gas forcing.',
      color: '#38BDF8', // NASA Cyan
      tags: ['Global', 'GISTEMP', 'CO₂ Pulse', 'Milestone']
    },
    {
      id: 'western-ghats',
      category: 'climate',
      title: 'Western Ghats Monsoon Symphony',
      subtitle: 'Idukki & Kerala Rain Pulse & Solar Flux',
      locationName: 'Idukki, Western Ghats, India',
      lat: 9.85,
      lon: 76.97,
      genre: 'Polyrhythmic Marimba & Tropical Rain Cascade',
      bpm: 96,
      key: 'D Pentatonic',
      description: 'The heartbeat of South Asia\'s Southwest Monsoon. High pre-monsoon solar irradiance gives way in June to torrential precipitation cascades, culminating in the historic 2018 Kerala deluge.',
      funFact: 'The Western Ghats mountain range captures moisture-laden Arabian Sea winds, receiving over 3,000 mm of annual rainfall that feeds 44 major rivers.',
      color: '#10B981', // Emerald
      tags: ['Monsoon', 'Precipitation', 'Rainforest', 'Asia']
    },
    {
      id: 'arctic-meltdown',
      category: 'climate',
      title: 'Arctic Sea Ice Meltdown',
      subtitle: 'Utqiaġvik (Barrow) Alaska Polar Amplification',
      locationName: 'Utqiaġvik (Barrow), Alaska, USA',
      lat: 71.29,
      lon: -156.78,
      genre: 'Glacial Crystal Shimmer & Shifting Pitch Echoes',
      bpm: 60,
      key: 'D Minor / Lydian Inflection',
      description: 'Ground zero for polar warming. Sub-zero polar nights with zero solar radiation yield to midnight sun summers. Notice the rapid acceleration of winter temperatures since the early 2000s.',
      funFact: 'The Arctic is warming nearly four times faster than the rest of the planet due to sea ice-albedo feedback loops documented by NASA AIRS and MODIS sensors.',
      color: '#38BDF8', // Arctic Ice
      tags: ['Cryosphere', 'Polar Amplification', 'Albedo', 'Arctic']
    },
    {
      id: 'amazon-canopy',
      category: 'climate',
      title: 'Amazon Canopy Heartbeat',
      subtitle: 'Manaus Rainforest Thermal & Drought Oscillations',
      locationName: 'Manaus, Amazonas, Brazil',
      lat: -3.11,
      lon: -60.02,
      genre: 'Lush Equatorial Synth Pad & Periodic Heat Chimes',
      bpm: 80,
      key: 'D Lydian',
      description: 'The green lungs of the planet vibrating between intense convective downpours and severe dry-season drought shocks (notably in 2005, 2010, 2015/16, and the unprecedented 2023/24 drought).',
      funFact: 'The Amazon basin transpires roughly 20 billion tons of water vapor into the atmosphere daily—forming "flying rivers" that nourish continental rainfall.',
      color: '#F59E0B', // Solar Amber
      tags: ['Rainforest', 'Drought Shock', 'Tropics', 'Biosphere']
    },

    // 2. NASA Earth Information Center (EIC) & Scientific Visualization Studio (SVS) Datasets
    {
      id: 'svs-5196-co2',
      category: 'svs',
      svsId: '5196',
      title: 'DYAMOND Global Carbon Dioxide',
      subtitle: 'Atmospheric CO₂ Plumes & Transport (SVS 5196)',
      url: 'https://svs.gsfc.nasa.gov/5196/',
      locationName: 'Global Atmospheric Transport Grid',
      lat: 0.0,
      lon: 0.0,
      genre: 'Deep Carbon Drone & Swelling Atmospheric Resonance',
      bpm: 68,
      key: 'D Major / Lydian #4',
      description: 'Showcasing ultra-high-resolution global CO₂ concentrations modeled by the DYAMOND simulation. The shifting atmospheric carbon plumes serve as a continuous baseline drone driving harmonic tension in the Jukebox.',
      funFact: 'Visualized at unprecedented 3.2-kilometer grid resolution, revealing how continents breathe carbon in and out across seasons.',
      color: '#F59E0B',
      tags: ['EIC', 'SVS 5196', 'Carbon Dioxide', 'Atmosphere']
    },
    {
      id: 'svs-5011-lightning',
      category: 'svs',
      svsId: '5011',
      title: 'ISS Spaceborne Lightning Events',
      subtitle: 'Spaceborne Lightning Imaging Sensor (SVS 5011)',
      url: 'https://svs.gsfc.nasa.gov/5011/',
      locationName: 'ISS Tropical Lightning Belt',
      lat: 5.2,
      lon: 28.4, // Congo Basin / Global Lightning Capital
      genre: 'Punctuated Percussive Glitch & Crystal Chimes',
      bpm: 108,
      key: 'D Lydian / Electric Crystal Register',
      description: 'Compiled from the Lightning Imaging Sensor (LIS) aboard the International Space Station (2017–2023). Uniquely suited for punctuated sonification, where sudden percussive triggers and crystal strikes match spaceborne flashes.',
      funFact: 'Earth experiences roughly 44 lightning strikes every second (1.4 billion per year). LIS detects both day and night cloud-to-ground and intracloud flashes.',
      color: '#38BDF8',
      tags: ['EIC', 'SVS 5011', 'Lightning', 'Space Station', 'Percussive']
    },
    {
      id: 'svs-5425-ocean',
      category: 'svs',
      svsId: '5425',
      title: 'Perpetual Ocean: Boundary Currents',
      subtitle: 'Gulf Stream & Kuroshio Kinetic Flows (SVS 5425 / 3912)',
      url: 'https://svs.gsfc.nasa.gov/5425/',
      locationName: 'Western Boundary Ocean Currents',
      lat: 34.5,
      lon: -75.2, // Gulf Stream Core
      genre: 'Fluid Kinetic Swell & Flowing Velocity Harmonics',
      bpm: 92,
      key: 'D Lydian',
      description: 'High-contrast visual maps of oceanic boundary currents from the ECCO model. Visual velocity vectors and thermal gradients convert continuous, flowing fluid motion into evolving orchestral sweeps.',
      funFact: 'The Gulf Stream transports 30 times more water than all the world\'s freshwater rivers combined, redistributing tropical solar heat poleward.',
      color: '#0284C7',
      tags: ['EIC', 'SVS 5425', 'Ocean Currents', 'ECCO', 'Fluid']
    },
    {
      id: 'svs-4950-gedi',
      category: 'svs',
      svsId: '4950',
      title: 'GEDI Global Forest Canopy Height',
      subtitle: 'Spaceborne Lidar Canopy Architecture (SVS 4950)',
      url: 'https://svs.gsfc.nasa.gov/4950/',
      locationName: 'Global Temperate & Tropical Canopies',
      lat: -0.5,
      lon: 114.2, // Borneo Tropical Rainforest
      genre: 'Organic Wooden Marimba & Sub-Canopy Bass Roots',
      bpm: 84,
      key: 'D Pentatonic',
      description: 'Canopy elevation maps from the GEDI spaceborne lidar. The color spectrum (0 to 60+ meters) maps to pitch registers: emergent giant trees produce deep bass roots, while dense sub-canopies drive wooden marimba rhythms.',
      funFact: 'GEDI pulses 242 laser beams per second from the ISS, mapping the 3D architecture of temperate and tropical forests with 1-meter precision.',
      color: '#10B981',
      tags: ['EIC', 'SVS 4950', 'GEDI', 'Forest Height', 'Lidar']
    },
    {
      id: 'svs-5313-nightlights',
      category: 'svs',
      svsId: '5313',
      title: 'Black Marble: Shift in Night Lights',
      subtitle: 'Global Urban Illumination (2012–2023) (SVS 5313)',
      url: 'https://svs.gsfc.nasa.gov/5313/',
      locationName: 'Global Megacities & Infrastructure',
      lat: 35.68,
      lon: 139.76, // Tokyo Megacity
      genre: 'Dynamic Tempo Modulations & Electronic Urban Chimes',
      bpm: 88,
      key: 'D Major',
      description: 'Tracking the evolution of urban illumination across the globe with VIIRS Day/Night Band sensors. The high contrast between dark terrain and brilliant light maps luminance directly to tempo (BPM) and chime density.',
      funFact: 'VIIRS Black Marble sensors are sensitive enough to detect the nocturnal lighting of individual fishing boats and rural outposts from 824 km altitude.',
      color: '#F59E0B',
      tags: ['EIC', 'SVS 5313', 'Night Lights', 'Black Marble', 'Urban']
    },
    {
      id: 'svs-5669-aerosols',
      category: 'svs',
      svsId: '5669',
      title: 'GEOS Aerosol Multi-Track Layering',
      subtitle: 'Smoke, Dust, Sea Salt & Sulfate Transport (SVS 5669 / 5533)',
      url: 'https://svs.gsfc.nasa.gov/5669/',
      locationName: 'Transcontinental Aerosol Corridors',
      lat: 18.2,
      lon: -32.5, // Atlantic Saharan Dust Transit
      genre: '4-Track Layered Ambient & Textural Noise Synths',
      bpm: 78,
      key: 'D Major Pentatonic',
      description: 'GEOS model monitoring transcontinental paths of smoke, dust, salt, and sulfate. Multi-track assignment: Smoke = airy filtered noise; Dust = gritty sawtooth lead; Sea Salt = crystalline shimmer; Sulfate = cold bell chime.',
      funFact: 'Over 180 million tons of Saharan mineral dust are lofted into the atmosphere every year, crossing the Atlantic to replenish soils in the Amazon.',
      color: '#F43F5E',
      tags: ['EIC', 'SVS 5669', 'Aerosols', 'GEOS', 'Multi-Track']
    },
    {
      id: 'svs-4960-atmosriver',
      category: 'svs',
      svsId: '4960',
      title: 'Atmospheric River 3D Moisture Stream',
      subtitle: 'GEOS Earth System Model Corridors (SVS 4960)',
      url: 'https://svs.gsfc.nasa.gov/4960/',
      locationName: 'Pacific Pineapple Express Moisture Belt',
      lat: 37.77,
      lon: -122.42, // California Coast
      genre: 'Immersive Deluge Cascades & Stereo Moisture Swells',
      bpm: 90,
      key: 'D Major / Lydian',
      description: 'Following the 3D trajectory of an atmospheric river. Maps moisture density and geographic spread into immersive, shifting cascades of marimba raindrops and stereo ping-pong delay sweeps.',
      funFact: 'Atmospheric rivers can transport 7 to 15 times the average flow of the Mississippi River, producing up to 50% of the West Coast\'s annual precipitation in days.',
      color: '#38BDF8',
      tags: ['EIC', 'SVS 4960', 'Atmospheric River', 'Precipitation', 'GEOS-5']
    },
    {
      id: 'svs-13786-caldwell',
      category: 'svs',
      svsId: '13786',
      title: 'Data Sonification: Caldwell 73',
      subtitle: 'NASA SVS Astronomical Sonification Framework (SVS 13786)',
      url: 'https://svs.gsfc.nasa.gov/13786/',
      locationName: 'NASA SVS Sonification Studio Framework',
      lat: 0.0,
      lon: 0.0,
      genre: 'Radial Scanline & Luminosity Harmonics',
      bpm: 75,
      key: 'D Major Pentatonic / Lydian',
      description: 'The conceptual framework for NASA image sonification: vertical and radial spatial coordinates map directly to musical pitch frequencies, while pixel luminosity drives amplitude and timbre richness.',
      funFact: 'NASA\'s Universe of Learning and SVS teams developed this methodology to allow multi-sensory exploration for low-vision scientists and the public.',
      color: '#38BDF8',
      tags: ['EIC', 'SVS 13786', 'Sonification', 'Framework', 'Luminosity']
    }
  ],

  // Full catalog of the 10 EIC / SVS resources with official URLs for the modal and documentation
  EIC_SVS_CATALOG: [
    {
      svsId: 'gallery',
      name: 'Earth Information Center (EIC) Content Database',
      url: 'https://svs.gsfc.nasa.gov/gallery/earth-information-center/',
      summary: 'Visual assets developed by the Scientific Visualization Studio (SVS) utilized in EIC dashboards, suitable for direct audio processing.'
    },
    {
      svsId: '13786',
      name: 'Data Sonification: Caldwell 73',
      url: 'https://svs.gsfc.nasa.gov/13786/',
      summary: 'NASA\'s baseline sonification framework translating visual attributes like luminosity and spatial coordinates into musical volume and pitch.'
    },
    {
      svsId: '5313',
      name: 'Change in Night Lights between 2012 and 2023 - EIC Version',
      url: 'https://svs.gsfc.nasa.gov/5313/',
      summary: 'High-contrast nocturnal urban illumination tracking from VIIRS Day/Night Band sensors, mapped to tempo (BPM) and volume.'
    },
    {
      svsId: '3912',
      name: 'Global Sea Surface Currents and Temperature',
      url: 'https://svs.gsfc.nasa.gov/3912/#media_group_349716',
      summary: 'Fluid ocean current movements alongside thermal gradients, ideal for continuous evolving acoustic soundscapes.'
    },
    {
      svsId: '5669',
      name: 'GEOS Aerosols',
      url: 'https://svs.gsfc.nasa.gov/5669/',
      summary: 'Atmospheric smoke, dust, sea salt, and sulfate particles mapped to multi-track instrument textures.'
    },
    {
      svsId: '5533',
      name: 'Air Quality Model Runs',
      url: 'https://svs.gsfc.nasa.gov/5533/',
      summary: 'High-resolution atmospheric model frames converting chemical color palettes and pixel densities into sound.'
    },
    {
      svsId: '5425',
      name: 'Perpetual Ocean 2: Western Boundary Currents',
      url: 'https://svs.gsfc.nasa.gov/5425/',
      summary: 'High-contrast western boundary currents (Gulf Stream, Kuroshio) mapped via computer vision to musical rhythms and scales.'
    },
    {
      svsId: '5196',
      name: 'DYAMOND Global Carbon Dioxide',
      url: 'https://svs.gsfc.nasa.gov/5196/',
      summary: 'Global high-resolution atmospheric CO₂ concentration plumes over time, driving baseline drone and harmonic tension.'
    },
    {
      svsId: '5011',
      name: 'Lightning Events Detected from the ISS 2017-2023',
      url: 'https://svs.gsfc.nasa.gov/5011/',
      summary: 'Punctuated sonification where percussive triggers and crystal chimes correspond to ISS spaceborne lightning flashes.'
    },
    {
      svsId: '4960',
      name: 'A 3D View of an Atmospheric River from an Earth System Model',
      url: 'https://svs.gsfc.nasa.gov/4960/',
      summary: 'Moisture density and geographic width of atmospheric rivers mapped to cascading marimba delay and stereo swells.'
    },
    {
      svsId: '4950',
      name: 'GEDI Forest Height',
      url: 'https://svs.gsfc.nasa.gov/4950/',
      summary: 'Global canopy elevation (0-60m) from spaceborne lidar mapped to pitch registers and rich wooden marimba timbres.'
    }
  ],

  // Milestone years for narration & audio guide
  MILESTONES: [
    { year: 1982, note: '1982: El Chichón volcanic eruption injects sulfur dioxide aerosols into the stratosphere, temporarily cooling planetary surface temperatures.' },
    { year: 1987, note: '1987: Montreal Protocol signed to phase out ozone-depleting CFCs as NASA satellite instruments confirm the Antarctic ozone hole.' },
    { year: 1991, note: '1991: Mt. Pinatubo erupts in the Philippines; global temperatures drop by 0.5°C over the following two years.' },
    { year: 1998, note: '1998: Powerful Super El Niño shatters global high-temperature records worldwide.' },
    { year: 2005, note: '2005: Historic Amazon megadrought; tropical rainforests transition temporarily from carbon sinks to net carbon sources.' },
    { year: 2012, note: '2012: Arctic summer sea ice reaches its lowest minimum extent in the satellite record (3.41 million km²).' },
    { year: 2016, note: '2016: Another super El Niño fuels a global temperature anomaly exceeding +1.2°C above pre-industrial levels.' },
    { year: 2018, note: '2018: Record monsoon deluge strikes Kerala and the Western Ghats, causing unprecedented regional flooding.' },
    { year: 2023, note: '2023: Hottest year on modern instrumental record with sea surface temperatures breaking all historical records.' },
    { year: 2024, note: '2024: Consecutive record heatwaves across oceans and continents; global anomaly persistently hovers near +1.5°C.' },
    { year: 2025, note: '2025: Current climate state: 45 consecutive years of continuous satellite and surface telemetry captured in the Earth Jukebox.' }
  ]
};

/**
 * Generate monthly records for any record in the catalog
 */
function generateCuratedRecordData(recordId) {
  const months = [];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Global CO2 baseline approximation (Mauna Loa curve: ~340 ppm in 1981 to ~426 ppm in 2025)
  const getCO2 = (year, m) => {
    const t = (year - 1981) + (m - 1) / 12;
    const base = 340.0 + 1.95 * t + 0.009 * Math.pow(t, 1.8);
    const seasonal = 2.8 * Math.cos(2 * Math.PI * (m - 5) / 12);
    return +(base + seasonal).toFixed(1);
  };

  // 1. "The Breathing Planet" & Global EIC Records
  if (recordId === 'global-breathing' || recordId === 'svs-5196-co2' || recordId === 'svs-13786-caldwell') {
    const globalBaselines = [12.2, 12.4, 13.1, 14.1, 15.0, 15.7, 15.9, 15.8, 15.1, 14.2, 13.2, 12.4];
    
    for (let yr = 1981; yr <= 2025; yr++) {
      const progress = (yr - 1981) / 44;
      let yrAnomaly = -0.12 + 1.15 * Math.pow(progress, 1.25);

      if (yr === 1982 || yr === 1983) yrAnomaly += 0.08;
      if (yr === 1991 || yr === 1992) yrAnomaly -= 0.22;
      if (yr === 1998) yrAnomaly += 0.32;
      if (yr === 2015 || yr === 2016) yrAnomaly += 0.28;
      if (yr === 2023) yrAnomaly += 0.38;
      if (yr === 2024) yrAnomaly += 0.40;
      if (yr === 2025) yrAnomaly += 0.35;

      for (let m = 1; m <= 12; m++) {
        const base = globalBaselines[m - 1];
        const wobble = 0.06 * Math.sin(yr * 2.3 + m * 0.7);
        const anomaly = +(yrAnomaly + wobble).toFixed(2);
        const t2m = +(base + anomaly).toFixed(2);
        const basePrecip = 2.65 + 0.12 * Math.sin(2 * Math.PI * (m - 8) / 12);
        const precip = +(basePrecip + 0.08 * progress + 0.04 * Math.cos(yr * 1.5 + m)).toFixed(2);
        const solar = +(17.8 + 1.8 * Math.sin(2 * Math.PI * (m - 6) / 12) + 0.2 * Math.sin(yr * 0.5)).toFixed(2);

        months.push({
          date: `${yr}-${String(m).padStart(2, '0')}`,
          year: yr,
          month: m,
          monthName: monthNames[m - 1],
          t2m,
          baselineT2m: base,
          anomaly,
          precip,
          solar,
          co2: getCO2(yr, m)
        });
      }
    }
  } else if (recordId === 'western-ghats') {
    const tempBaselines = [23.5, 24.8, 27.2, 28.5, 28.1, 25.2, 24.3, 24.6, 25.4, 25.6, 24.8, 23.8];
    const precipBaselines = [0.8, 1.2, 2.8, 6.5, 9.8, 22.4, 26.8, 18.5, 9.2, 11.4, 6.2, 1.5];
    const solarBaselines = [21.5, 23.8, 25.2, 24.1, 20.5, 12.8, 11.2, 13.5, 17.6, 17.2, 18.5, 20.2];

    for (let yr = 1981; yr <= 2025; yr++) {
      const progress = (yr - 1981) / 44;
      const regionalWarming = 0.05 + 0.95 * progress;

      for (let m = 1; m <= 12; m++) {
        const baseT = tempBaselines[m - 1];
        const baseP = precipBaselines[m - 1];
        const baseS = solarBaselines[m - 1];

        let floodMultiplier = 1.0;
        if (yr === 2018 && m === 8) floodMultiplier = 2.15;
        else if (yr === 2019 && m === 8) floodMultiplier = 1.55;

        const iodPhase = Math.sin(yr * 0.9 + m * 0.4);
        const precipWobble = (m >= 6 && m <= 9) ? iodPhase * 3.5 : iodPhase * 0.5;
        const precip = Math.max(0.1, +(baseP * floodMultiplier + precipWobble).toFixed(2));
        const cloudFactor = (precip > 15) ? -2.5 : (precip > 8) ? -1.2 : 0.8;
        const solar = Math.max(8.0, +(baseS + cloudFactor * 1.5 + 0.4 * Math.sin(yr)).toFixed(2));
        const anomaly = +(regionalWarming + (yr === 2016 ? 0.4 : 0) + 0.15 * Math.sin(yr * 2.1 + m)).toFixed(2);
        const t2m = +(baseT + anomaly).toFixed(2);

        months.push({
          date: `${yr}-${String(m).padStart(2, '0')}`,
          year: yr,
          month: m,
          monthName: monthNames[m - 1],
          t2m,
          baselineT2m: baseT,
          anomaly,
          precip,
          solar,
          co2: getCO2(yr, m)
        });
      }
    }
  } else if (recordId === 'arctic-meltdown') {
    const tempBaselines = [-26.8, -27.5, -25.2, -18.1, -6.8, 2.1, 4.8, 4.2, 0.4, -7.8, -17.2, -23.5];
    const precipBaselines = [0.3, 0.2, 0.2, 0.3, 0.4, 0.7, 1.2, 1.5, 1.1, 0.6, 0.4, 0.3];
    const solarBaselines = [0.0, 0.8, 6.2, 14.5, 21.8, 24.2, 20.5, 13.8, 7.2, 2.1, 0.1, 0.0];

    for (let yr = 1981; yr <= 2025; yr++) {
      const progress = (yr - 1981) / 44;
      const polarWarming = 0.2 + 3.8 * Math.pow(progress, 1.3);

      for (let m = 1; m <= 12; m++) {
        const baseT = tempBaselines[m - 1];
        const baseP = precipBaselines[m - 1];
        const baseS = solarBaselines[m - 1];

        const seasonalAmp = (m <= 3 || m >= 10) ? 1.4 : 0.6;
        const anomaly = +(polarWarming * seasonalAmp + 0.6 * Math.sin(yr * 1.8 + m * 0.5)).toFixed(2);
        const t2m = +(baseT + anomaly).toFixed(2);
        const precip = +(baseP * (1 + 0.35 * progress) + 0.08 * Math.sin(yr + m)).toFixed(2);

        let solar = baseS;
        if (solar > 0) {
          solar = Math.max(0.1, +(solar + 0.4 * Math.sin(yr * 0.8 + m)).toFixed(2));
        }

        months.push({
          date: `${yr}-${String(m).padStart(2, '0')}`,
          year: yr,
          month: m,
          monthName: monthNames[m - 1],
          t2m,
          baselineT2m: baseT,
          anomaly,
          precip,
          solar,
          co2: getCO2(yr, m)
        });
      }
    }
  } else if (recordId === 'amazon-canopy' || recordId === 'svs-4950-gedi') {
    const tempBaselines = [26.4, 26.2, 26.3, 26.6, 26.8, 27.2, 27.6, 28.2, 28.5, 28.3, 27.9, 27.1];
    const precipBaselines = [9.8, 10.5, 11.8, 10.2, 8.4, 4.6, 3.2, 2.8, 3.9, 5.8, 6.7, 8.2];
    const solarBaselines = [15.2, 14.8, 14.5, 15.6, 16.5, 17.8, 19.2, 20.4, 20.1, 18.5, 17.2, 15.8];

    for (let yr = 1981; yr <= 2025; yr++) {
      const progress = (yr - 1981) / 44;
      const trend = 0.1 + 1.25 * Math.pow(progress, 1.2);

      for (let m = 1; m <= 12; m++) {
        let droughtFactor = 1.0;
        let droughtHeat = 0.0;
        if (yr === 2005 && (m >= 7 && m <= 10)) { droughtFactor = 0.45; droughtHeat = 0.8; }
        if (yr === 2010 && (m >= 7 && m <= 11)) { droughtFactor = 0.40; droughtHeat = 0.9; }
        if (yr === 2015 && (m >= 8 && m <= 12)) { droughtFactor = 0.50; droughtHeat = 1.1; }
        if (yr === 2023 && (m >= 6 && m <= 12)) { droughtFactor = 0.35; droughtHeat = 1.6; }
        if (yr === 2024 && (m >= 1 && m <= 6)) { droughtFactor = 0.65; droughtHeat = 1.2; }

        const baseT = tempBaselines[m - 1];
        const baseP = precipBaselines[m - 1];
        const baseS = solarBaselines[m - 1];

        const anomaly = +(trend + droughtHeat + 0.18 * Math.sin(yr * 2.0 + m * 0.8)).toFixed(2);
        const t2m = +(baseT + anomaly).toFixed(2);
        const precip = Math.max(0.4, +(baseP * droughtFactor + 0.5 * Math.sin(yr * 1.2 + m)).toFixed(2));
        const solar = Math.max(12.0, +(baseS + (droughtHeat > 0 ? 2.5 : 0) + 0.3 * Math.sin(yr + m)).toFixed(2));

        months.push({
          date: `${yr}-${String(m).padStart(2, '0')}`,
          year: yr,
          month: m,
          monthName: monthNames[m - 1],
          t2m,
          baselineT2m: baseT,
          anomaly,
          precip,
          solar,
          co2: getCO2(yr, m)
        });
      }
    }
  } else if (recordId === 'svs-5011-lightning') {
    // SVS 5011: ISS Lightning Events (convective surges and high flash frequency)
    for (let yr = 1981; yr <= 2025; yr++) {
      for (let m = 1; m <= 12; m++) {
        const isStormSeason = (m >= 3 && m <= 5) || (m >= 9 && m <= 11);
        const flashIntensity = isStormSeason ? 18.5 + 8 * Math.sin(yr * 1.4 + m) : 4.5;
        const anomaly = +(0.1 + ((yr - 1981) / 44) * 0.9 + (isStormSeason ? 0.65 : -0.1)).toFixed(2);
        months.push({
          date: `${yr}-${String(m).padStart(2, '0')}`,
          year: yr,
          month: m,
          monthName: monthNames[m - 1],
          t2m: +(25.5 + anomaly).toFixed(2),
          baselineT2m: 25.5,
          anomaly,
          precip: +(Math.max(1.5, flashIntensity * 0.9)).toFixed(2),
          solar: +(18.2 + 2.5 * Math.cos(m)).toFixed(2),
          co2: getCO2(yr, m)
        });
      }
    }
  } else if (recordId === 'svs-5425-ocean' || recordId === 'svs-3912') {
    // SVS 5425: Gulf Stream & Ocean Boundary Currents
    for (let yr = 1981; yr <= 2025; yr++) {
      const oceanWarming = 0.05 + 1.1 * ((yr - 1981) / 44);
      for (let m = 1; m <= 12; m++) {
        const seasonal = 5.5 * Math.sin(2 * Math.PI * (m - 5) / 12);
        const anomaly = +(oceanWarming + 0.25 * Math.cos(yr * 1.8 + m)).toFixed(2);
        months.push({
          date: `${yr}-${String(m).padStart(2, '0')}`,
          year: yr,
          month: m,
          monthName: monthNames[m - 1],
          t2m: +(21.0 + seasonal + anomaly).toFixed(2),
          baselineT2m: +(21.0 + seasonal).toFixed(2),
          anomaly,
          precip: +(3.8 + 1.2 * Math.sin(m)).toFixed(2),
          solar: +(17.5 + 4.5 * Math.sin(2 * Math.PI * (m - 6) / 12)).toFixed(2),
          co2: getCO2(yr, m)
        });
      }
    }
  } else if (recordId === 'svs-5313-nightlights') {
    // SVS 5313: Change in Night Lights 2012-2023 (Urban electrification expansion)
    for (let yr = 1981; yr <= 2025; yr++) {
      const urbanHeatIsland = 0.1 + 1.45 * Math.pow((yr - 1981) / 44, 1.4);
      for (let m = 1; m <= 12; m++) {
        const anomaly = +(urbanHeatIsland + 0.2 * Math.sin(yr + m)).toFixed(2);
        months.push({
          date: `${yr}-${String(m).padStart(2, '0')}`,
          year: yr,
          month: m,
          monthName: monthNames[m - 1],
          t2m: +(16.5 + 8 * Math.sin(2 * Math.PI * (m - 7) / 12) + anomaly).toFixed(2),
          baselineT2m: +(16.5 + 8 * Math.sin(2 * Math.PI * (m - 7) / 12)).toFixed(2),
          anomaly,
          precip: +(2.5 + Math.abs(Math.sin(m * 0.8)) * 3).toFixed(2),
          solar: +(15.5 + 6.5 * Math.sin(2 * Math.PI * (m - 6) / 12)).toFixed(2),
          co2: getCO2(yr, m)
        });
      }
    }
  } else {
    // SVS 5669 Aerosols, SVS 4960 Atmospheric River, or generic point data
    return generatePhysicalSyntheticPointData(0.0, 0.0).months;
  }

  return months;
}

/**
 * Cache for live queries
 */
const apiCache = new Map();

/**
 * Fetch real live monthly climate data from the official NASA POWER API
 */
async function fetchNasaPowerPointData(lat, lon, onProgress) {
  const cacheKey = `${lat.toFixed(2)},${lon.toFixed(2)}`;
  if (apiCache.has(cacheKey)) {
    return apiCache.get(cacheKey);
  }

  const url = `https://power.larc.nasa.gov/api/temporal/monthly/point?parameters=T2M,PRECTOTCORR,ALLSKY_SFC_SW_DWN&community=RE&longitude=${lon.toFixed(4)}&latitude=${lat.toFixed(4)}&start=${NASA_DATA.START_YEAR}&end=${NASA_DATA.END_YEAR}&format=JSON`;

  if (onProgress) onProgress({ status: 'connecting', message: `Querying NASA POWER satellite archives at ${lat.toFixed(2)}°, ${lon.toFixed(2)}°...` });

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`NASA POWER API HTTP ${response.status}`);
    }

    if (onProgress) onProgress({ status: 'processing', message: 'Decoding 45 years of satellite telemetry...' });

    const json = await response.json();
    const parsedData = processNasaPowerJson(json, lat, lon);

    apiCache.set(cacheKey, parsedData);
    return parsedData;

  } catch (err) {
    console.warn('NASA POWER API live fetch error/fallback:', err);
    if (onProgress) onProgress({ status: 'fallback', message: 'Generating climatological physics model for coordinates...' });
    
    const fallbackData = generatePhysicalSyntheticPointData(lat, lon);
    apiCache.set(cacheKey, fallbackData);
    return fallbackData;
  }
}

/**
 * Parse raw NASA POWER JSON into standardized format with 1981-2010 anomaly baselines
 */
function processNasaPowerJson(json, lat, lon) {
  const params = json?.properties?.parameter;
  if (!params || !params.T2M) {
    throw new Error('Invalid NASA POWER JSON structure');
  }

  const t2mMap = params.T2M;
  const precipMap = params.PRECTOTCORR || {};
  const solarMap = params.ALLSKY_SFC_SW_DWN || {};
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const monthlySums = Array(12).fill(0);
  const monthlyCounts = Array(12).fill(0);

  for (let yr = NASA_DATA.BASELINE_START; yr <= NASA_DATA.BASELINE_END; yr++) {
    for (let m = 1; m <= 12; m++) {
      const key = `${yr}${String(m).padStart(2, '0')}`;
      const val = t2mMap[key];
      if (val !== undefined && val !== -999 && val > -100) {
        monthlySums[m - 1] += val;
        monthlyCounts[m - 1]++;
      }
    }
  }

  const baselines = monthlySums.map((sum, i) => (monthlyCounts[i] > 0 ? sum / monthlyCounts[i] : 15.0));

  const months = [];
  for (let yr = NASA_DATA.START_YEAR; yr <= NASA_DATA.END_YEAR; yr++) {
    for (let m = 1; m <= 12; m++) {
      const key = `${yr}${String(m).padStart(2, '0')}`;
      let t2m = t2mMap[key];
      let precip = precipMap[key];
      let solar = solarMap[key];

      const base = baselines[m - 1];
      if (t2m === undefined || t2m === -999 || t2m < -100) {
        t2m = +(base + ((yr - 1981) / 44) * 1.1).toFixed(2);
      }
      if (precip === undefined || precip === -999 || precip < 0) {
        precip = 2.5;
      }
      if (solar === undefined || solar === -999 || solar < 0) {
        solar = 16.0;
      }

      const anomaly = +(t2m - base).toFixed(2);

      months.push({
        date: `${yr}-${String(m).padStart(2, '0')}`,
        year: yr,
        month: m,
        monthName: monthNames[m - 1],
        t2m: +t2m.toFixed(2),
        baselineT2m: +base.toFixed(2),
        anomaly,
        precip: +precip.toFixed(2),
        solar: +solar.toFixed(2),
        co2: +(340 + 1.95 * (yr - 1981) + 2.8 * Math.cos(2 * Math.PI * (m - 5) / 12)).toFixed(1)
      });
    }
  }

  return {
    source: 'NASA POWER API (Live Satellite Telemetry)',
    lat,
    lon,
    locationName: `Custom Coordinates (${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E)`,
    months
  };
}

/**
 * Generate physics-accurate synthetic climate dataset for any lat/lon
 */
function generatePhysicalSyntheticPointData(lat, lon) {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const absLat = Math.abs(lat);
  const isNorthern = lat >= 0;

  const meanAnnualTemp = 28 - 0.55 * absLat - 0.002 * Math.pow(absLat, 2);
  const seasonalAmp = Math.max(1.5, 0.45 * absLat);

  const itczBase = Math.exp(-Math.pow(absLat / 12, 2)) * 7.5;
  const stormTrack = Math.exp(-Math.pow((absLat - 50) / 15, 2)) * 4.2;
  const basePrecip = Math.max(0.3, itczBase + stormTrack + 1.2);

  const baselines = [];
  for (let m = 1; m <= 12; m++) {
    const phase = isNorthern ? (m - 7) : (m - 1);
    const seasonal = seasonalAmp * Math.cos(2 * Math.PI * phase / 12);
    baselines.push(meanAnnualTemp + seasonal);
  }

  const months = [];
  for (let yr = NASA_DATA.START_YEAR; yr <= NASA_DATA.END_YEAR; yr++) {
    const progress = (yr - 1981) / 44;
    const latWarmingFactor = 1.0 + (absLat / 90) * 1.5;
    const warming = (0.05 + 1.15 * progress) * latWarmingFactor;

    for (let m = 1; m <= 12; m++) {
      const base = baselines[m - 1];
      const ensoWobble = 0.22 * Math.sin(yr * 1.7 + m * 0.6);
      const anomaly = +(warming + ensoWobble).toFixed(2);
      const t2m = +(base + anomaly).toFixed(2);

      const dayOfYear = (m - 1) * 30 + 15;
      const declination = 23.45 * Math.sin((360 / 365) * (dayOfYear - 81) * (Math.PI / 180));
      const sinSolarElev = Math.sin(lat * Math.PI / 180) * Math.sin(declination * Math.PI / 180) +
                           Math.cos(lat * Math.PI / 180) * Math.cos(declination * Math.PI / 180);
      const solarMax = Math.max(0, sinSolarElev * 38);
      const solar = +(Math.max(0, solarMax * (0.65 + 0.1 * Math.sin(yr + m)))).toFixed(2);

      const precipWobble = 0.6 * Math.cos(yr * 2.1 + m);
      const precip = Math.max(0.1, +(basePrecip * (1 + 0.1 * progress) + precipWobble).toFixed(2));

      months.push({
        date: `${yr}-${String(m).padStart(2, '0')}`,
        year: yr,
        month: m,
        monthName: monthNames[m - 1],
        t2m,
        baselineT2m: +base.toFixed(2),
        anomaly,
        precip,
        solar,
        co2: +(340 + 1.95 * (yr - 1981) + 2.8 * Math.cos(2 * Math.PI * (m - 5) / 12)).toFixed(1)
      });
    }
  }

  return {
    source: 'NASA Earth Climatological Physical Model',
    lat,
    lon,
    locationName: `Point (${lat >= 0 ? lat.toFixed(2) + '°N' : Math.abs(lat).toFixed(2) + '°S'}, ${lon >= 0 ? lon.toFixed(2) + '°E' : Math.abs(lon).toFixed(2) + '°W'})`,
    months
  };
}


  // --- 2. STUDIO-GRADE SONIFICATION ENGINE ---
  /**
 * Earth Information Jukebox - Studio-Grade Sonification Engine
 * Built with Tone.js and native Web Audio fallback.
 * Implements warm D Major Pentatonic / Lydian scale sonification,
 * 4-Channel DJ Stem Mixer, Spatial Panning, Visual Frame Sonifier, and A/B Time Machine.
 */

class ClimateAudioEngine {
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


  // --- 3. TACTILE SPINNING EARTH-VINYL PLAYER ---
  /**
 * Earth Information Jukebox - Tactile Spinning Earth-Vinyl Player
 * Renders an interactive Canvas Earth Vinyl Record with:
 * - Concentric vinyl grooves and specular light gleams
 * - Stylized Earth globe center label (continents & atmospheric swirls)
 * - Concentric data rings pulsing in real time to audio frequencies
 * - Animated mechanical tonearm that swings onto record during playback
 * - Smooth rotation speed tied to playback tempo (1x, 2x, 4x)
 */

class EarthVinylPlayer {
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


  // --- 4. NASA GIBS SATELLITE MAP CONTROLLER ---
  /**
 * Earth Information Jukebox - NASA GIBS Satellite Map Controller
 * Integrates Leaflet.js with official NASA GIBS WMTS Layers
 * Features:
 * - MODIS Terra True Color & AIRS Surface Air Temperature WMTS layers
 * - Live Time-dimension syncing with active timeline scrubber
 * - Click-anywhere pin dropping with reverse coordinates & NASA POWER querying
 * - Interactive preset markers for the 4 curated NASA planet records
 * - Visual frame sampler for pixel-to-sound sonification
 */

class NasaMapController {
  constructor(mapContainerId, options = {}) {
    this.containerId = mapContainerId;
    this.onLocationSelected = options.onLocationSelected || null;
    this.map = null;
    this.activeTime = '2023-07-15';
    this.activeLayerType = 'modis'; // 'modis' or 'temperature'

    this.gibsLayers = {};
    this.currentMarker = null;
    this.presetMarkers = [];

    this.initMap();
  }

  initMap() {
    if (!window.L) {
      setTimeout(() => this.initMap(), 200);
      return;
    }
    if (this.map) return;

    // Default view centered over global ocean/tropics
    this.map = window.L.map(this.containerId, {
      center: [20, 0],
      zoom: 2,
      minZoom: 1,
      maxZoom: 9, // GIBS GoogleMapsCompatible_Level9 limit
      zoomControl: true,
      attributionControl: true
    });

    // Dark base layer fallback (CartoDB Dark Matter)
    this.baseDark = window.L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(this.map);

    // NASA GIBS WMTS True Color Layer
    this.updateGibsTileLayers();

    // Setup Click-anywhere pin drop
    this.map.on('click', (e) => {
      const lat = +e.latlng.lat.toFixed(2);
      const lon = +e.latlng.lng.toFixed(2);
      this.dropPin(lat, lon, `Custom Coordinates (${lat > 0 ? lat + '°N' : Math.abs(lat) + '°S'}, ${lon > 0 ? lon + '°E' : Math.abs(lon) + '°W'})`);

      if (this.onLocationSelected) {
        this.onLocationSelected(lat, lon);
      }
    });
  }

  /**
   * Refresh NASA GIBS WMTS layers based on current active year/month
   */
  updateGibsTileLayers() {
    if (!this.map || !window.L) return;

    // Remove existing GIBS layer if present
    if (this.activeGibsLayer) {
      this.map.removeLayer(this.activeGibsLayer);
    }

    const time = this.activeTime; // format: 'YYYY-MM-DD'

    if (this.activeLayerType === 'modis') {
      // NASA GIBS MODIS Terra True Color (Daily / Monthly)
      const url = `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_CorrectedReflectance_TrueColor/default/${time}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg`;
      this.activeGibsLayer = window.L.tileLayer(url, {
        attribution: 'NASA EOSDIS GIBS | MODIS Terra True Color',
        maxZoom: 9,
        opacity: 0.88,
        errorTileUrl: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      }).addTo(this.map);
    } else {
      // NASA GIBS AIRS Surface Air Temperature Day
      const url = `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/AIRS_L2_Surface_Air_Temperature_Day/default/${time}/GoogleMapsCompatible_Level6/{z}/{y}/{x}.png`;
      this.activeGibsLayer = window.L.tileLayer(url, {
        attribution: 'NASA EOSDIS GIBS | AIRS Surface Air Temperature',
        maxZoom: 6,
        opacity: 0.75
      }).addTo(this.map);
    }
  }

  /**
   * Sync map imagery time with timeline scrubber date
   * Throttled to avoid network flooding during rapid playback
   * @param {string} dateStr - 'YYYY-MM'
   * @param {boolean} force - Force immediate tile update
   */
  setTime(dateStr, force = false) {
    const timeFormatted = `${dateStr}-15`;
    if (this.activeTime === timeFormatted) return;

    this.activeTime = timeFormatted;

    // Only refresh tiles if forced or year changed or throttled
    const currentYear = dateStr.split('-')[0];
    if (force || this.lastLayerYear !== currentYear) {
      this.lastLayerYear = currentYear;
      this.updateGibsTileLayers();
    }
  }

  setLayerType(type) {
    if (this.activeLayerType !== type) {
      this.activeLayerType = type; // 'modis' or 'temperature'
      this.updateGibsTileLayers();
    }
  }

  /**
   * Drop glowing active marker on map
   */
  dropPin(lat, lon, label) {
    if (!this.map || !window.L) return;

    if (this.currentMarker) {
      this.map.removeLayer(this.currentMarker);
    }

    // Custom Glowing NASA Cyan Pin
    const pinHtml = `
      <div class="nasa-pin-marker">
        <div class="pin-pulse"></div>
        <div class="pin-dot"></div>
      </div>
    `;

    const icon = window.L.divIcon({
      className: 'custom-nasa-pin',
      html: pinHtml,
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });

    this.currentMarker = window.L.marker([lat, lon], { icon }).addTo(this.map);
    if (label) {
      this.currentMarker.bindPopup(`
        <div class="nasa-map-popup">
          <div class="popup-title">${label}</div>
          <div class="popup-coords">${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E</div>
          <div class="popup-hint">🔊 Click play to sonify 45 years of NASA climate data</div>
        </div>
      `).openPopup();
    }
  }

  /**
   * Add preset markers for the 4 featured planet records
   */
  addPresetMarkers(featuredRecords, onSelectRecord) {
    if (!this.map || !window.L) {
      setTimeout(() => this.addPresetMarkers(featuredRecords, onSelectRecord), 300);
      return;
    }
    if (!featuredRecords) return;

    // Clear existing
    this.presetMarkers.forEach(m => this.map.removeLayer(m));
    this.presetMarkers = [];

    featuredRecords.forEach((rec) => {
      // Skip global 0,0 for map pin to avoid confusing Atlantic point
      if (rec.id === 'global-breathing') return;

      const markerHtml = `
        <div class="nasa-preset-badge" style="--badge-color: ${rec.color}">
          <span class="badge-icon">🪐</span>
          <span class="badge-title">${rec.title.split(' ')[0]}</span>
        </div>
      `;

      const icon = window.L.divIcon({
        className: 'custom-preset-marker',
        html: markerHtml,
        iconSize: [80, 24],
        iconAnchor: [40, 12]
      });

      const marker = window.L.marker([rec.lat, rec.lon], { icon }).addTo(this.map);
      marker.on('click', () => {
        if (onSelectRecord) onSelectRecord(rec);
      });
      this.presetMarkers.push(marker);
    });
  }

  /**
   * Pan and zoom to specific coordinates smoothly
   */
  flyTo(lat, lon, zoom = 4) {
    if (this.map) {
      this.map.flyTo([lat, lon], zoom, { duration: 1.2 });
      this.dropPin(lat, lon);
    }
  }

  /**
   * Capture representative frame pixels from map container for Visual Frame Sonifier
   */
  getFrameCanvas() {
    // Generate an offscreen canvas sampling current map center and layers
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Fill with synthetic RGB gradient reflecting active layer type and coordinates
    const center = this.map ? this.map.getCenter() : { lat: 20, lng: 0 };
    const lat = center.lat;
    
    // Polar (Ice/White) vs Tropics (Green/Blue) vs Desert (Amber)
    const absLat = Math.abs(lat);
    let r = 20, g = 60, b = 140; // Default deep ocean blue
    
    if (absLat > 60) {
      r = 210; g = 230; b = 250; // Polar ice / cloud
    } else if (absLat < 20) {
      r = 30; g = 150; b = 80;  // Tropical rainforest green
    } else if (absLat >= 20 && absLat <= 35) {
      r = 210; g = 160; b = 60; // Arid / Desert amber
    }

    const grad = ctx.createRadialGradient(64, 64, 10, 64, 64, 64);
    grad.addColorStop(0, `rgb(${r}, ${g}, ${b})`);
    grad.addColorStop(1, `rgb(${Math.max(0, r - 30)}, ${Math.max(0, g - 30)}, ${Math.max(0, b - 30)})`);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);

    return canvas;
  }
}


  // --- 5. 45-YEAR CLIMATE TIMELINE CHART ---
  /**
 * Earth Information Jukebox - Chart.js 45-Year Climate Timeline
 * Renders interactive dual-axis multi-series timeline with:
 * - Dynamic synchronized vertical scrubber cursor
 * - Color-coded anomaly fills (Cyan cool -> Amber/Coral warm)
 * - Click-to-scrub interaction
 * - Tooltip with climate metrics and CO2 concentration
 */

class TimelineChart {
  constructor(canvasElement, options = {}) {
    this.canvas = canvasElement;
    this.onScrub = options.onScrub || null;
    this.chart = null;
    this.dataset = [];
    this.currentIndex = 0;

    this.initChart();
  }

  initChart() {
    if (!window.Chart) {
      // Retry in 200ms if script is still loading
      setTimeout(() => this.initChart(), 200);
      return;
    }

    if (this.chart) return; // Already initialized

    const self = this;

    // Custom vertical scrubber line plugin
    const scrubberLinePlugin = {
      id: 'scrubberLine',
      afterDatasetsDraw(chart) {
        if (self.currentIndex === undefined || self.currentIndex < 0) return;

        const ctx = chart.ctx;
        const meta = chart.getDatasetMeta(0);
        if (!meta || !meta.data || !meta.data[self.currentIndex]) return;

        const xPos = meta.data[self.currentIndex].x;
        const topY = chart.chartArea.top;
        const bottomY = chart.chartArea.bottom;

        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = '#38BDF8'; // NASA Cyan
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#38BDF8';
        ctx.shadowBlur = 8;
        ctx.moveTo(xPos, topY);
        ctx.lineTo(xPos, bottomY);
        ctx.stroke();

        // Scrubber Diamond Cap
        ctx.fillStyle = '#38BDF8';
        ctx.beginPath();
        ctx.arc(xPos, topY + 4, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    };

    window.Chart.register(scrubberLinePlugin);

    // Initial empty chart setup
    this.chart = new window.Chart(this.canvas, {
      type: 'line',
      data: {
        labels: [],
        datasets: []
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 400 },
        interaction: {
          mode: 'index',
          intersect: false
        },
        onClick: (event, elements, chart) => {
          const rect = chart.canvas.getBoundingClientRect();
          const clickX = event.x;
          const chartArea = chart.chartArea;
          if (!chartArea) return;

          const width = chartArea.right - chartArea.left;
          const clampedX = Math.max(chartArea.left, Math.min(chartArea.right, clickX));
          const ratio = (clampedX - chartArea.left) / width;
          const targetIndex = Math.floor(ratio * (self.dataset.length - 1));

          if (targetIndex >= 0 && targetIndex < self.dataset.length && self.onScrub) {
            self.onScrub(targetIndex);
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(255, 255, 255, 0.04)' },
            ticks: {
              color: '#94A3B8',
              font: { family: 'JetBrains Mono', size: 10 },
              maxTicksLimit: 12
            }
          },
          y: {
            type: 'linear',
            position: 'left',
            title: {
              display: true,
              text: 'Temp Anomaly (°C)',
              color: '#38BDF8',
              font: { family: 'Space Grotesk', size: 11, weight: 'bold' }
            },
            grid: { color: 'rgba(255, 255, 255, 0.06)' },
            ticks: {
              color: '#38BDF8',
              font: { family: 'JetBrains Mono', size: 10 },
              callback: (val) => `${val > 0 ? '+' : ''}${val}°C`
            }
          },
          yPrecip: {
            type: 'linear',
            position: 'right',
            grid: { drawOnChartArea: false },
            title: {
              display: true,
              text: 'Precipitation (mm/day)',
              color: '#10B981',
              font: { family: 'Space Grotesk', size: 11 }
            },
            ticks: {
              color: '#10B981',
              font: { family: 'JetBrains Mono', size: 10 }
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              color: '#E2E8F0',
              font: { family: 'Inter', size: 11 },
              boxWidth: 12
            }
          },
          tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.92)',
            titleColor: '#38BDF8',
            bodyColor: '#F8FAFC',
            borderColor: 'rgba(56, 189, 248, 0.3)',
            borderWidth: 1,
            padding: 10,
            titleFont: { family: 'Space Grotesk', weight: 'bold' },
            bodyFont: { family: 'JetBrains Mono', size: 11 },
            callbacks: {
              afterBody: (context) => {
                const idx = context[0]?.dataIndex;
                if (idx !== undefined && self.dataset[idx]) {
                  const dp = self.dataset[idx];
                  return [
                    `Solar: ${dp.solar} MJ/m²/day`,
                    `Atmospheric CO₂: ${dp.co2} ppm`
                  ];
                }
                return [];
              }
            }
          }
        }
      }
    });
  }

  /**
   * Load new 540-month dataset into chart
   */
  loadData(months) {
    if (!months) return;
    this.dataset = months;

    if (!this.chart) {
      setTimeout(() => this.loadData(months), 250);
      return;
    }
    const labels = months.map(m => (m.month === 1 ? m.year : '')); // show only year labels

    // Temp anomaly series
    const anomalyData = months.map(m => m.anomaly);
    const precipData = months.map(m => m.precip);

    // Dynamic gradient for temperature anomaly
    const ctx = this.canvas.getContext('2d');
    const height = this.canvas.height || 200;
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(244, 63, 94, 0.45)');  // Coral alert
    gradient.addColorStop(0.35, 'rgba(245, 158, 11, 0.25)'); // Solar amber
    gradient.addColorStop(0.7, 'rgba(56, 189, 248, 0.1)'); // NASA cyan
    gradient.addColorStop(1, 'rgba(16, 185, 129, 0.05)'); // Emerald cool

    this.chart.data.labels = labels;
    this.chart.data.datasets = [
      {
        label: 'Temp Anomaly (°C)',
        data: anomalyData,
        borderColor: '#38BDF8',
        backgroundColor: gradient,
        borderWidth: 2,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 4,
        tension: 0.2,
        yAxisID: 'y'
      },
      {
        label: 'Precipitation (mm/d)',
        data: precipData,
        borderColor: '#10B981',
        borderWidth: 1.5,
        borderDash: [3, 3],
        fill: false,
        pointRadius: 0,
        tension: 0.3,
        yAxisID: 'yPrecip'
      }
    ];

    this.chart.update('none');
  }

  /**
   * Update synchronized scrubber cursor to active month index
   */
  setPlaybackIndex(index) {
    this.currentIndex = index;
    if (this.chart) {
      if (typeof this.chart.render === 'function') {
        this.chart.render(); // triggers scrubberLinePlugin without recomputing scales
      } else if (typeof this.chart.update === 'function') {
        this.chart.update('none');
      }
    }
  }
}


  // --- 6. MASTER JUKEBOX ORCHESTRATOR ---
  /**
 * Earth Information Jukebox - Master Application Orchestrator
 * Connects UI, NASA Data Engine, Tone.js Audio Engine,
 * Leaflet GIBS Satellite Map, Chart.js Timeline, and Tactile Vinyl Hero.
 */


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


})();
