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

const isModalOpen = ref(false);
const isAnalyticsEnabled = ref(false);

// Check if Google Analytics cookie is set
function getAnalyticsCookie() {
  if (process.client) {
    return document.cookie.includes('ga_cookie=true');
  }
  return false;
}

// Initialize analytics enabled state on client side
onMounted(() => {
  isAnalyticsEnabled.value = getAnalyticsCookie();
});

// Open the cookie settings modal
function openManageModal() {
  isModalOpen.value = true;
}

// Close the modal
function closeModal() {
  isModalOpen.value = false;
}

// Toggle the analytics cookie
function toggleAnalyticsCookie() {
  if (process.client) {
    if (isAnalyticsEnabled.value) {
      document.cookie = 'ga_cookie=true; path=/; max-age=31536000';
    } else {
      document.cookie = 'ga_cookie=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    }
  }
}

// Save preferences and close the modal
function savePreferences() {
  closeModal();
}

// Expose methods to parent components
defineExpose({
  openManageModal
});
</script>