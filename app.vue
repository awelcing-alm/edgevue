<template>
  <div class="app-container">
    <NuxtPage /> <!-- Always render the NuxtPage -->
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth';
import { onMounted } from 'vue';

const auth = useAuth();

onMounted(() => {
  if (typeof window === 'undefined') return;

  console.log('%c[Zephr] Initializing...', 'color: #4ade80; font-weight: bold;');
  if (window.zephrBrowser) {
    window.zephrBrowser.run({
      jwt: auth.user?.jwt || '', // Pass user’s JWT if available
      debug: true, // Enable debug logs for feature decisions
    });
  }

  // Global listener for feature decisions and successful form submissions
  document.addEventListener('zephr.browserDecisionsFinished', () => {
    console.log('%c[Zephr] Decisions processed.', 'color: #4ade80;');
  });

  document.addEventListener('zephr.formSuccess', () => {
    console.log('%c[Zephr] Form submission successful! Redirecting to homepage...', 'color: #10b981;');
    auth.login('User', 'user@example.com', auth.user?.jwt || '');
    window.location.href = '/'; // Redirect user to the homepage after login
  });
});
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
