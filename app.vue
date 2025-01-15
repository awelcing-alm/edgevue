<template>
  <div class="app-container">
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  console.log('%c[Zephr] Initializing...', 'color: #4ade80; font-weight: bold;');

  if (!document.getElementById('zephr-script')) {
    const script = document.createElement('script');
    script.id = 'zephr-script';
    script.src = 'https://assets.zephr.com/zephr-browser/1.9.1/zephr-browser.umd.js';
    script.async = true;

    script.onload = () => {
      console.log('%c[Zephr] Script loaded successfully.', 'color: #10b981;');
      if (window.zephrBrowser) {
        window.zephrBrowser.run({
          jwt: '', // Ensure the correct JWT or empty string for anonymous users.
          debug: true,
        });
      } else {
        console.error('%c[Zephr] zephrBrowser.run is not available!', 'color: #f87171;');
      }
    };

    script.onerror = () => console.error('%c[Zephr] Failed to load Zephr script.', 'color: #f87171;');
    document.head.appendChild(script);
  }
});
</script>
