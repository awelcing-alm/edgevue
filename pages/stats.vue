<template>
  <NuxtLayout name="default">
    <template #default>
      <div v-if="!isLoading" class="max-w-6xl mx-auto">
        <template v-if="hasAccess">
          <h1 class="text-4xl font-bold mb-8 text-emerald-900">
            Population Statistics
          </h1>
          <div id="stats" class="grid gap-8">
            <ClientOnly>
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
            </ClientOnly>
          </div>
        </template>
        <template v-else>
          <div class="bg-red-100 text-red-700 p-8 rounded-lg shadow-lg">
            <h2 class="text-2xl font-bold">Access Denied</h2>
            <p class="mt-4">
              You do not have permission to view this content. Please contact support
              or upgrade your account.
            </p>
          </div>
        </template>
      </div>
      <p v-else class="text-gray-500">Loading...</p>
    </template>
  </NuxtLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
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

// Chart.js setup
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

// State variables
const isLoading = ref(true);
const hasAccess = ref(false);

const chartData = { /* Chart data */ };
const trendData = { /* Trend data */ };
const chartOptions = { /* Chart options */ };

// Check Zephr decision
function handleZephrDecision() {
  const accessDetails = window.Zephr?.accessDetails;
  const activeProducts = accessDetails?.activeProducts || [];
  const requiredProduct = 'population-stats-access'; // Replace with your actual product ID

  hasAccess.value = activeProducts.includes(requiredProduct);
  isLoading.value = false;
}

onMounted(() => {
  if (typeof window === 'undefined') return;

  document.addEventListener('zephr.browserDecisionsFinished', handleZephrDecision);

  if (window.Zephr?.accessDetails) {
    handleZephrDecision();
  } else if (window.zephrBrowser?.run) {
    window.zephrBrowser.run({ debug: true });
  }
});
</script>

<style scoped>
#stats {
  border-style: dotted;
}
</style>
