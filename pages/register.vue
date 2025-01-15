<template>
    <div class="min-h-screen bg-emerald-50 flex flex-col items-center justify-center p-8">
      <div class="max-w-lg w-full bg-white shadow-lg rounded-lg p-8 space-y-4">
        <h1 class="text-2xl font-bold text-center text-emerald-900">🦎 Join the Scaly Side!</h1>
        <p class="text-center text-gray-600">Become part of the ultimate lizard-lover’s community.</p>
  
        <!-- Placeholder for Zephr form -->
        <div id="zephr-form-placeholder" class="my-6 border-t border-gray-200 pt-4">
          <p class="text-center text-sm text-gray-500">Loading personalized registration form...</p>
        </div>
  
        <p class="text-sm text-center text-gray-600">
          We use cookies to personalize your experience and track outcomes.
          <button
            class="underline text-emerald-600 hover:text-emerald-800 ml-1"
            @click.prevent="openCookieSettings"
          >
            Got it!
          </button>
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  const openCookieSettings = () => {
    document.querySelector('cookie-consent')?.__vueParentComponent?.ctx?.openManageModal();
  };
  </script>
  
  <style scoped>
  #zephr-form-placeholder {
    min-height: 120px; /* Placeholder space until Zephr form loads */
    animation: pulse 1.5s infinite;
  }
  
  @keyframes pulse {
    0%, 100% {
      background-color: rgba(0, 0, 0, 0.05);
    }
    50% {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
  </style>
  