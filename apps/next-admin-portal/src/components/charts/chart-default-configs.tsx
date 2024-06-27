'use client';

import { useEffect } from 'react';
import Chart from 'chart.js/auto';

import { getCssVar } from '@/utils/css.util';

// Default
Chart.defaults.responsive = true;
Chart.defaults.maintainAspectRatio = false;
Chart.defaults.font.family = 'Arial';
Chart.defaults.font.size = 14;
// Layout
Chart.defaults.layout.padding = 0;
// Legend
Chart.defaults.plugins.legend.display = false;
// Point
Chart.defaults.elements.point.radius = 0;
//Line
Chart.defaults.elements.line.tension = 0.3;
Chart.defaults.elements.line.borderWidth = 4;

Chart.defaults.elements.line.borderCapStyle = 'round';
// Bar
Chart.defaults.elements.bar.borderWidth = 0;
Chart.defaults.elements.bar.borderRadius = 10;
Chart.defaults.elements.bar.borderSkipped = false;
Chart.defaults.datasets.bar.maxBarThickness = 10;
// Arc
Chart.defaults.elements.arc.borderWidth = 4;
// Doughnut
Chart.defaults.datasets.doughnut.borderWidth = 0;
Chart.defaults.datasets.doughnut.offset = [40, 0];
Chart.defaults.datasets.doughnut.borderRadius = 15;
Chart.overrides.doughnut.cutout = '90%';
// Tooltips
Chart.defaults.plugins.tooltip.mode = 'index';
Chart.defaults.plugins.tooltip.intersect = false;
// yAxis
Chart.defaults.scales.linear.beginAtZero = true;
Chart.defaults.scales.linear.ticks.padding = 10;
Chart.defaults.scales.linear.ticks.stepSize = 10;
Chart.defaults.scales.linear.border = {
  ...Chart.defaults.scales.linear.border,
  ...{ display: false, dash: [2, 1] }
};
Chart.defaults.scales.linear.grid = {
  ...Chart.defaults.scales.linear.grid,
  ...{ drawTicks: false }
};
// xAxis
Chart.defaults.scales.category.ticks.padding = 10;
Chart.defaults.scales.category.border = {
  ...Chart.defaults.scales.category.border,
  ...{ display: false }
};
Chart.defaults.scales.category.grid = {
  ...Chart.defaults.scales.category.grid,
  ...{ display: false, drawTicks: false, drawOnChartArea: false }
};

const ChartDefaultConfigs = () => {
  useEffect(() => {
    const primaryColor = getCssVar('--primary').replaceAll(' ', ',');
    const textColor = getCssVar('--foreground').replaceAll(' ', ',');

    Chart.defaults.datasets.doughnut.backgroundColor = `hsl(${primaryColor})`;
    Chart.defaults.elements.line.borderColor = `hsl(${primaryColor})`;
    Chart.defaults.elements.bar.backgroundColor = `hsl(${primaryColor})`;
    Chart.defaults.color = `hsl(${textColor})`;
  });

  return null;
};

export default ChartDefaultConfigs;
