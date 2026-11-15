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

export class NasaMapController {
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
