<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="transform translate-y-full opacity-0"
    enter-to-class="transform translate-y-0 opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="transform translate-y-0 opacity-100"
    leave-to-class="transform translate-y-full opacity-0"
  >
    <div v-if="showBanner" class="fixed bottom-0 inset-x-0 pb-2 sm:pb-5 z-50">
      <div class="max-w-screen-xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="p-2 rounded-lg bg-emerald-600 shadow-lg sm:p-3">
          <div class="flex items-center justify-between flex-wrap">
            <div class="w-0 flex-1 flex items-center">
              <p class="ml-3 font-medium text-white truncate">
                <span class="inline">
                  We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
                </span>
              </p>
            </div>
            <div class="flex-shrink-0 w-full sm:w-auto mt-2 sm:mt-0 sm:ml-3">
              <div class="flex space-x-4">
                <button
                  @click="acceptAll"
                  class="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-emerald-600 bg-white hover:bg-emerald-50"
                >
                  Accept All
                </button>
                <button
                  @click="openSettings"
                  class="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-400"
                >
                  Manage Preferences
                </button>
                <button
                  @click="closeBanner"
                  class="flex items-center justify-center p-2 rounded-md text-white hover:bg-emerald-500"
                >
                  <span class="sr-only">Close</span>
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>

  <!-- Cookie Settings Modal -->
  <ManageCookies ref="cookieModal" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useCookie } from '#app';

const showBanner = ref(false);
const cookieModal = ref(null);

// Cookie management
const consentCookie = useCookie('cookie_consent', {
  maxAge: 60 * 60 * 24 * 365, // 1 year
  path: '/',
});

const analyticsCookie = useCookie('analytics_enabled', {
  maxAge: 60 * 60 * 24 * 365,
  path: '/',
});

const functionalCookie = useCookie('functional_enabled', {
  maxAge: 60 * 60 * 24 * 365,
  path: '/',
});

onMounted(() => {
  // Show banner if consent cookie is not set
  if (!consentCookie.value) {
    showBanner.value = true;
  }

  // Set default values for cookies if not already set
  if (!analyticsCookie.value) {
    analyticsCookie.value = 'true';
  }
  if (!functionalCookie.value) {
    functionalCookie.value = 'true';
  }
});

function acceptAll() {
  analyticsCookie.value = 'true';
  functionalCookie.value = 'true';
  consentCookie.value = 'accepted';
  showBanner.value = false;
  window.location.reload(); // Reload to enable analytics
}

function openSettings() {
  cookieModal.value?.openManageModal();
  showBanner.value = false;
}

function closeBanner() {
  showBanner.value = false;
  consentCookie.value = 'dismissed';
}
</script>