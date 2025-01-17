<template>
  <NuxtLayout name="default">
    <template #default>
      <div class="relative bg-gradient-to-b from-emerald-50 to-desertSand">
        <div class="container mx-auto py-16">
          <!-- Loading State -->
          <div v-if="isLoading" class="text-center">
            <p class="text-gray-500">Loading population statistics...</p>
          </div>

          <!-- Access Denied -->
          <div v-else-if="!hasAccess" class="bg-red-100 text-red-700 p-8 rounded-lg shadow-lg">
            <h2 class="text-2xl font-bold">Access Denied</h2>
            <p class="mt-4">
              You do not have permission to view this content. Please contact support or upgrade your account.
            </p>
          </div>

          <!-- Stats Content -->
          <StatsContent v-else />
        </div>
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import StatsContent from '~/components/StatsContent.vue'; // Component for rendering the stats content

const isLoading = ref(true);
const hasAccess = ref(false);

function determineAccess() {
  const zephrAccessDetails = window.Zephr?.accessDetails;
  const activeProducts = zephrAccessDetails?.activeProducts || [];
  const requiredProduct = 'population-stats-access'; // Replace with your product identifier

  hasAccess.value = activeProducts.includes(requiredProduct);
  isLoading.value = false;
}

onMounted(() => {
  if (typeof window === 'undefined') return;

  // Handle Zephr decisions
  document.addEventListener('zephr.browserDecisionsFinished', determineAccess);

  if (window.Zephr?.accessDetails) {
    determineAccess();
  } else if (window.zephrBrowser?.run) {
    window.zephrBrowser.run({
      jwt: '', // Add JWT if needed
      debug: true,
    });
  }
});
</script>
