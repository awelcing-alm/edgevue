<template>
  <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-8 max-w-md w-full shadow-lg">
      <h2 class="text-xl font-bold mb-4">Manage Cookies</h2>
      <p class="text-sm text-gray-600 mb-6">
        Customize your cookie preferences. Note that some cookies are necessary for site functionality.
      </p>

      <!-- Necessary Cookies -->
      <div class="mb-6">
        <h3 class="font-semibold text-gray-800">Necessary Cookies</h3>
        <p class="text-sm text-gray-600 mb-2">
          These cookies are essential for using the site. Removing them will log you out and restrict access to articles.
        </p>
        <label class="flex items-center">
          <input type="checkbox" disabled checked class="mr-2" />
          <span class="text-gray-700">Zephr Cookies (Required)</span>
        </label>
      </div>

      <!-- Marketing Cookies -->
      <div class="mb-6">
        <h3 class="font-semibold text-gray-800">Marketing Cookies</h3>
        <p class="text-sm text-gray-600 mb-2">
          Enable or disable Google Analytics for tracking site performance.
        </p>
        <label class="flex items-center">
          <input
            type="checkbox"
            v-model="isAnalyticsEnabled"
            @change="toggleAnalyticsCookie"
            class="mr-2"
          />
          <span class="text-gray-700">Google Analytics</span>
        </label>
      </div>

      <!-- Functional Cookies -->
      <div class="mb-6">
        <h3 class="font-semibold text-gray-800">Functional Cookies</h3>
        <p class="text-sm text-gray-600 mb-2">
          Enable features like remembering your preferences and settings.
        </p>
        <label class="flex items-center">
          <input
            type="checkbox"
            v-model="isFunctionalEnabled"
            @change="toggleFunctionalCookie"
            class="mr-2"
          />
          <span class="text-gray-700">Preferences & Settings</span>
        </label>
      </div>

      <!-- Actions -->
      <div class="flex justify-end">
        <button @click="closeModal" class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">
          Cancel
        </button>
        <button
          @click="savePreferences"
          class="ml-4 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
        >
          Save Preferences
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useCookie } from '#app';

const isModalOpen = ref(false);
const isAnalyticsEnabled = ref(true); // Set to true by default
const isFunctionalEnabled = ref(true); // Set to true by default

// Cookie management using Nuxt's useCookie composable
const analyticsCookie = useCookie('analytics_enabled', {
  maxAge: 60 * 60 * 24 * 365, // 1 year
  path: '/',
  default: () => 'true', // Set analytics enabled by default
});

const functionalCookie = useCookie('functional_enabled', {
  maxAge: 60 * 60 * 24 * 365, // 1 year
  path: '/',
  default: () => 'true', // Set functional enabled by default
});

// Initialize cookie states
onMounted(() => {
  isAnalyticsEnabled.value = analyticsCookie.value === 'true';
  isFunctionalEnabled.value = functionalCookie.value === 'true';
});

// Toggle analytics cookie
function toggleAnalyticsCookie() {
  analyticsCookie.value = isAnalyticsEnabled.value ? 'true' : 'false';
  if (!isAnalyticsEnabled.value) {
    // Remove Google Analytics cookies if disabled
    document.cookie = '_ga=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = '_ga_HDP4C20H65=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
}

// Toggle functional cookie
function toggleFunctionalCookie() {
  functionalCookie.value = isFunctionalEnabled.value ? 'true' : 'false';
}

// Open the cookie settings modal
function openManageModal() {
  isModalOpen.value = true;
}

// Close the modal
function closeModal() {
  isModalOpen.value = false;
}

// Save preferences and close the modal
function savePreferences() {
  toggleAnalyticsCookie();
  toggleFunctionalCookie();
  
  // Reload the page to apply cookie changes
  if (!isAnalyticsEnabled.value) {
    window.location.reload();
  } else {
    closeModal();
  }
}

// Expose methods to parent components
defineExpose({
  openManageModal
});
</script>