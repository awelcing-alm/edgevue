<template>
    <NuxtLayout name="default">
      <template #default>
  <div class="max-w-6xl mx-auto">
    <h1 class="text-4xl font-bold mb-8 text-emerald-900">
      Population Statistics
    </h1>

    <ClientOnly>
    <div id="stats" class="grid gap-8">
      <!-- Population Distribution -->
      <div class="bg-white p-8 rounded-lg shadow-lg h-[400px]">
        <h2 class="text-2xl font-bold mb-6 text-emerald-800">
          Global Population Distribution
        </h2>
        <div class="h-[300px]">
          <ClientOnly>
            <Bar :data="chartData" :options="chartOptions" />
          </ClientOnly>
        </div>
      </div>

      <!-- Population Trends -->
      <div class="bg-white p-8 rounded-lg shadow-lg h-[400px]">
        <h2 class="text-2xl font-bold mb-6 text-emerald-800">
          Population Trends (Last 5 Years)
        </h2>
        <div class="h-[300px]">

            <Line :data="trendData" :options="chartOptions" />
        </div>
      </div>

      <!-- Key Statistics -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-emerald-800 text-emerald-50 p-6 rounded-lg">
          <h3 class="text-xl font-semibold mb-2">Lizard Species</h3>
          <p class="text-4xl font-bold">6,000+</p>
          <p class="text-emerald-200 mt-2">Known species worldwide</p>
        </div>
        <div class="bg-blue-800 text-blue-50 p-6 rounded-lg">
          <h3 class="text-xl font-semibold mb-2">Salamander Species</h3>
          <p class="text-4xl font-bold">750+</p>
          <p class="text-blue-200 mt-2">Known species worldwide</p>
        </div>
        <div class="bg-amber-700 text-amber-50 p-6 rounded-lg">
          <h3 class="text-xl font-semibold mb-2">Snake Species</h3>
          <p class="text-4xl font-bold">3,000+</p>
          <p class="text-amber-200 mt-2">Known species worldwide</p>
        </div>
      </div>
    </div>
  </ClientOnly>
  </div>
</template>
</NuxtLayout>
</template>

<script setup>
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
} from 'chart.js';

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

const chartData = {
  labels: ['Lizards', 'Salamanders', 'Snakes'],
  datasets: [
    {
      label: 'Number of Species',
      data: [6000, 750, 3000],
      backgroundColor: [
        'rgb(6, 95, 70)',
        'rgb(30, 64, 175)',
        'rgb(180, 83, 9)',
      ],
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

const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 2,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};
</script>
