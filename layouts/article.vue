<template>
  <div class="min-h-screen bg-gradient-to-b from-emerald-50 to-desertSand">
    <!-- Top Navigation -->
    <TopNav />

    <main class="container mx-auto px-4 py-12">
      <h1 class="text-center text-4xl font-extrabold text-iguanaGreen mb-6 drop-shadow-md">
        🦎 Read on, Fellow Lizard Enthusiast!
      </h1>
      <div class="rounded-lg bg-white shadow-lg p-6 ring-1 ring-gray-200 hover:ring-geckoOrange transition">
        <slot /> <!-- Slot to render the article content -->
      </div>
    </main>

    <footer class="bg-white py-8 text-center border-t border-gray-300 mt-8 shadow-inner">
      <p class="text-base">
        Need more information? Manage your
        <a
          href="#"
          @click.prevent="openCookieSettings"
          class="text-geckoOrange underline hover:text-orange-600"
        >
          Cookie Preferences
        </a>.
      </p>
      <p class="mt-4 text-sm text-gray-500">
        🦎 Copyright © 2025 - Lizard Lounge
      </p>
    </footer>
  </div>
</template>

<script setup>
import TopNav from '~/components/TopNav.vue'; // Import TopNav component for navigation

// Vue ref for modal visibility
const showCookieModal = ref(false);

function openCookieSettings() {
  // Use Vue 3 reactivity for modal control instead of document.querySelector
  showCookieModal.value = true;
}
</script>

<style scoped>
body {
  background-color: #ecfdf5; /* Ensure the body matches the app background color */
}

header {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

footer {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
