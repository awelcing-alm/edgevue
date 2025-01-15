<template>
  <div class="app-container">
    <NuxtPage /> <!-- Always render the NuxtPage -->
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuth } from '~/composables/useAuth';

const auth = useAuth();

onMounted(() => {
  console.log('%c[App Mounted] Initializing Zephr...', 'color: #4ade80; font-weight: bold;');

  if (typeof window !== 'undefined') {
    const existingScript = document.getElementById('zephr-script');

    if (!existingScript) {
      const zephrScript = document.createElement('script');
      zephrScript.id = 'zephr-script';
      zephrScript.src = 'https://assets.zephr.com/zephr-browser/1.9.1/zephr-browser.umd.js';
      zephrScript.async = true;

      zephrScript.onload = () => {
        console.log('%c[Zephr] Script Loaded. Running Zephr...', 'color: #10b981; font-weight: bold;');
        window.zephrBrowser?.run({
          jwt: auth.user?.jwt || '',
          debug: true,
        });
      };

      zephrScript.onerror = () => {
        console.error('%c[Zephr] Failed to load Zephr Browser script.', 'color: #f87171; font-weight: bold;');
      };

      document.head.appendChild(zephrScript);
    } else {
      console.log('%c[Zephr] Script already loaded. Running Zephr...', 'color: #60a5fa; font-weight: bold;');
      window.zephrBrowser?.run({ jwt: auth.user?.jwt || '', debug: true });
    }
  }
});
</script>

<style scoped>
.app-container {
  min-height: 100vh;
}
</style>
