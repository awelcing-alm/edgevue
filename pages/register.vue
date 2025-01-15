<template>
  <div class="min-h-screen bg-gradient-to-b from-emerald-50 to-desertSand flex flex-col">
    <!-- Top Navigation -->
    <TopNav />

    <!-- Registration Form Section -->
    <main class="flex flex-col items-center justify-center flex-grow p-8">
      <div class="max-w-lg w-full bg-white shadow-lg rounded-lg p-8 space-y-4">
        <h1 class="text-3xl font-extrabold text-center text-iguanaGreen mb-2">🦎 Join the Scaly Side!</h1>
        <p class="text-center text-gray-600">Become part of the ultimate lizard-lover’s community.</p>

        <!-- Placeholder for Zephr form -->
        <div id="zephr-form-placeholder" class="my-6 border-t border-gray-200 pt-4">
          <p class="text-center text-sm text-gray-500 animate-pulse">Loading personalized registration form...</p>
        </div>

        <p class="text-sm text-center text-gray-600">
          We use cookies to personalize your experience and track outcomes.
          <button
            class="underline text-geckoOrange hover:text-orange-600 ml-1"
            @click.prevent="openCookieSettings"
          >
            Got it!
          </button>
        </p>
      </div>
    </main>

    <!-- Footer Section -->
    <footer class="bg-white py-8 text-center border-t border-gray-300 shadow-inner">
      <p class="text-sm text-gray-500">🦎 Copyright © 2025 - ALM</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import TopNav from '~/components/TopNav.vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Open Cookie Settings Modal
const openCookieSettings = () => {
  const cookieElement = document.querySelector('cookie-consent') as HTMLElement | null;
  if (cookieElement && '__vueParentComponent' in cookieElement) {
    (cookieElement as any).__vueParentComponent?.ctx?.openManageModal();
  } else {
    console.warn("Cookie consent element not found or doesn't support modal.");
  }
};

// Run Zephr Form on Mount
onMounted(() => {
  if (typeof window === 'undefined') return;

  if (window.zephrBrowser?.run) {
    console.log('Running Zephr form in placeholder...');
    window.zephrBrowser.run({
      jwt: '', // Optional: pass a valid JWT token if needed
      debug: true,
    });
  }

  // Listen for Zephr success event and redirect to homepage
  document.addEventListener('zephr.formSuccess', () => {
    console.log('Registration successful, redirecting...');
    router.push('/'); // Redirect to the homepage after registration
  });
});
</script>

<style scoped>
/* General Layout Styling */
body {
  background-color: #ecfdf5;
}

/* Zephr Form Placeholder Styling */
#zephr-form-placeholder {
  min-height: 120px; /* Placeholder space until Zephr form loads */
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%,
  100% {
    background-color: rgba(0, 0, 0, 0.05);
  }
  50% {
    background-color: rgba(0, 0, 0, 0.1);
  }
}

/* Text Styles */
.text-iguanaGreen {
  color: #85d296; /* Custom green */
}

.text-geckoOrange {
  color: #fdae61; /* Custom orange */
}
</style>
