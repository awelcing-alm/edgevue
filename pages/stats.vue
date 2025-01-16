<script setup lang="ts">
import { Bar, Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  type ChartOptions,
} from 'chart.js';

// Register chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement
);

// Chart data
const chartData = {
  labels: ['Lizards', 'Salamanders', 'Snakes'],
  datasets: [
    {
      label: 'Number of Species',
      data: [6000, 750, 3000],
      backgroundColor: ['rgb(6, 95, 70)', 'rgb(30, 64, 175)', 'rgb(180, 83, 9)'],
      borderColor: ['rgb(4, 120, 87)', 'rgb(29, 78, 216)', 'rgb(217, 119, 6)'],
      borderWidth: 1,
    },
  ],
};

const trendData = {
  labels: ['2019', '2020', '2021', '2022', '2023'],
  datasets: [
    {
      label: 'Lizards',
      data: [5800, 5850, 5900, 5950, 6000],
      borderColor: 'rgb(6, 95, 70)',
      tension: 0.1,
    },
    {
      label: 'Salamanders',
      data: [700, 715, 725, 740, 750],
      borderColor: 'rgb(30, 64, 175)',
      tension: 0.1,
    },
    {
      label: 'Snakes',
      data: [2850, 2900, 2925, 2975, 3000],
      borderColor: 'rgb(180, 83, 9)',
      tension: 0.1,
    },
  ],
};

// Fix chart options by explicitly typing `legend.position`
const chartOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 2,
  plugins: {
    legend: {
      position: 'top', // Explicitly use a valid value
    },
  },
};

const trendOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 2,
  plugins: {
    legend: {
      position: 'top', // Explicitly use a valid value
    },
  },
};
</script>

<template>
  <NuxtLayout name="default">
    <div id="stats-page-content" class="max-w-6xl mx-auto py-12 px-6">
      <h1 class="text-4xl font-bold mb-8 text-emerald-900">
        Population Statistics
      </h1>
      <div class="grid gap-8">
        <!-- Population Distribution -->
        <div class="bg-white p-8 rounded-lg shadow-lg h-[400px]">
          <h2 class="text-2xl font-bold mb-6 text-emerald-800">
            Global Population Distribution
          </h2>
          <div class="h-[300px]">
            <Bar :data="chartData" :options="chartOptions" />
          </div>
        </div>
        <!-- Population Trends -->
        <div class="bg-white p-8 rounded-lg shadow-lg h-[400px]">
          <h2 class="text-2xl font-bold mb-6 text-emerald-800">
            Population Trends (Last 5 Years)
          </h2>
          <div class="h-[300px]">
            <Line :data="trendData" :options="trendOptions" />
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
