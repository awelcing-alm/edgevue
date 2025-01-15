<template>
  <div class="app-container">
    <!-- Global Loader -->
    <div v-if="isLoading" class="fixed inset-0 flex items-center justify-center bg-white z-50">
      <p class="text-geckoOrange text-lg font-semibold">Loading your experience...</p>
    </div>
    <NuxtPage v-show="!isLoading" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuth } from '~/composables/useAuth';

const auth = useAuth();
const isLoading = ref(true);

// Add explicit type for jwtToken
function runZephr(jwtToken: string | undefined) {
  if (window.zephrBrowser) {
    console.log(`%c[Zephr] Running Zephr with JWT: ${jwtToken || 'Anonymous User'}`, 'color: #4ade80;');
    window.zephrBrowser.run({
      jwt: jwtToken || '',
      debug: true,
    });

    // Add event listener for decisions
    document.addEventListener('zephr.browserDecisionsFinished', () => {
      console.log('%c[Zephr] Browser decisions processed.', 'color: #22c55e; font-weight: bold;');
      isLoading.value = false; // Hide loader when decisions are finished
    });
  } else {
    console.warn('%c[Zephr] Zephr Browser object not found.', 'color: #fbbf24; font-weight: bold;');
    isLoading.value = false;
  }
}

onMounted(() => {
  console.log('%c[App Mounted] Initializing Zephr and Checking Auth State...', 'color: #4ade80; font-weight: bold;');

  if (typeof window !== 'undefined') {
    if (!document.getElementById('zephr-script')) {
      console.log('%c[Zephr] Injecting Zephr script...', 'color: #60a5fa; font-weight: bold;');
      const zephrScript = document.createElement('script');
      zephrScript.id = 'zephr-script';
      zephrScript.src = 'https://assets.zephr.com/zephr-browser/1.9.1/zephr-browser.umd.js';
      zephrScript.async = true;

      zephrScript.onload = () => {
        console.log('%c[Zephr] Zephr Browser Script Loaded.', 'color: #10b981; font-weight: bold;');
        runZephr(auth.user?.jwt);
      };

      zephrScript.onerror = () => {
        console.error('%c[Zephr] Failed to load Zephr Browser script.', 'color: #f87171; font-weight: bold;');
        isLoading.value = false;
      };

      document.head.appendChild(zephrScript);
    } else {
      console.log('%c[Zephr] Script already loaded. Running Zephr...', 'color: #60a5fa; font-weight: bold;');
      runZephr(auth.user?.jwt);
    }
  }
});
</script>

<style scoped>
.app-container {
  min-height: 100vh;
}

.fixed {
  background-color: rgba(255, 255, 255, 0.9);
}

.text-geckoOrange {
  color: #fdae61;
}
</style>
