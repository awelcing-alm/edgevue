<template>
  <div class="app-container">
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth';
import { onMounted } from 'vue';

const auth = useAuth();

// Initialize Zephr and handle outcomes globally
onMounted(() => {
  console.log('%c[App] Zephr initialization started...', 'color: #38bdf8');

  if (typeof window === 'undefined') return;

  const handleZephrOutcome = () => {
    console.log('%c[Zephr] Outcomes received.', 'color: #4ade80; font-weight: bold;', window.Zephr?.outcomes);

    const outcomes = window.Zephr?.outcomes || {};
    const featureKeys = Object.keys(outcomes);

    // Check if there's an outcome related to article content
    featureKeys.forEach((key) => {
      const outcomeLabel = outcomes[key]?.outcomeLabel;
      if (outcomeLabel === 'allow') {
        console.log('%c[Zephr] Content allowed', 'color: #4ade80;');
      } else {
        console.warn(`[Zephr] Feature "${key}" restricted with outcome "${outcomeLabel}".`);
      }
    });
  };

  document.addEventListener('zephr.browserDecisionsFinished', handleZephrOutcome);

  if (window.zephrBrowser?.run) {
    window.zephrBrowser.run({
      jwt: auth.user?.jwt || '', // Send user JWT if authenticated
      debug: true,
    });
  } else {
    console.error('[Zephr] zephrBrowser.run is not available.');
  }
});
</script>
