const fs = require('fs');
const path = require('path');

// Read files
let nasaData = fs.readFileSync(path.join(__dirname, 'js/nasa-data.js'), 'utf8');
let audioEngine = fs.readFileSync(path.join(__dirname, 'js/audio-engine.js'), 'utf8');
let vinylPlayer = fs.readFileSync(path.join(__dirname, 'js/vinyl-player.js'), 'utf8');
let mapController = fs.readFileSync(path.join(__dirname, 'js/map-controller.js'), 'utf8');
let timelineChart = fs.readFileSync(path.join(__dirname, 'js/timeline-chart.js'), 'utf8');
let app = fs.readFileSync(path.join(__dirname, 'js/app.js'), 'utf8');

// Strip ES module exports & imports
nasaData = nasaData.replace(/export const NASA_DATA/g, 'const NASA_DATA');
nasaData = nasaData.replace(/export function generateCuratedRecordData/g, 'function generateCuratedRecordData');
nasaData = nasaData.replace(/export async function fetchNasaPowerPointData/g, 'async function fetchNasaPowerPointData');
nasaData = nasaData.replace(/export function generatePhysicalSyntheticPointData/g, 'function generatePhysicalSyntheticPointData');

audioEngine = audioEngine.replace(/export class ClimateAudioEngine/g, 'class ClimateAudioEngine');
vinylPlayer = vinylPlayer.replace(/export class EarthVinylPlayer/g, 'class EarthVinylPlayer');
mapController = mapController.replace(/export class NasaMapController/g, 'class NasaMapController');
timelineChart = timelineChart.replace(/export class TimelineChart/g, 'class TimelineChart');

// Remove import statements from app.js
app = app.replace(/import\s+.*?from\s+['"].*?['"];?\n?/g, '');

const bundle = `/**
 * Earth Information Jukebox - Standalone Universal Bundle
 * 2026 NASA Space Apps Challenge
 * Automatically generated to support both file:// protocol (double-click) and http://
 */

(function() {
  'use strict';

  // --- 1. NASA DATA & CLIMATOLOGY ENGINE ---
  ${nasaData}

  // --- 2. STUDIO-GRADE SONIFICATION ENGINE ---
  ${audioEngine}

  // --- 3. TACTILE SPINNING EARTH-VINYL PLAYER ---
  ${vinylPlayer}

  // --- 4. NASA GIBS SATELLITE MAP CONTROLLER ---
  ${mapController}

  // --- 5. 45-YEAR CLIMATE TIMELINE CHART ---
  ${timelineChart}

  // --- 6. MASTER JUKEBOX ORCHESTRATOR ---
  ${app}

})();
`;

fs.writeFileSync(path.join(__dirname, 'js/bundle.js'), bundle, 'utf8');
console.log('Successfully generated js/bundle.js! Length:', bundle.length);
