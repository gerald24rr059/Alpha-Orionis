/**
 * Earth Information Jukebox - Chart.js 45-Year Climate Timeline
 * Renders interactive dual-axis multi-series timeline with:
 * - Dynamic synchronized vertical scrubber cursor
 * - Color-coded anomaly fills (Cyan cool -> Amber/Coral warm)
 * - Click-to-scrub interaction
 * - Tooltip with climate metrics and CO2 concentration
 */

export class TimelineChart {
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
