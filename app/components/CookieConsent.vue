<template>
  <div>
    <div v-if="!consentGiven" class="fixed bottom-0 left-0 w-full bg-white shadow-lg p-4 z-50">
      <div class="container mx-auto flex justify-between items-center gap-4">
        <div>
          <p class="text-gray-800 font-medium">We use cookies to enhance your experience.</p>
          <p class="text-sm text-gray-600">
            Necessary cookies are required for the website to work (like Zephr and Blaize), while marketing cookies
            help us analyze traffic and improve the experience.
          </p>
        </div>
        <div class="flex gap-2">
          <button @click="acceptNecessaryOnly" class="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg">
            Necessary Only
          </button>
          <button @click="acceptAll" class="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-lg">
            Accept All
          </button>
        </div>
      </div>
    </div>

    <div v-if="showManageModal" class="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg max-w-md">
        <h2 class="text-lg font-bold">Manage Cookie Preferences</h2>
        <p class="text-sm text-gray-600 mb-4">You can update your preferences below:</p>
        <div class="flex gap-2">
          <button @click="acceptNecessaryOnly" class="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg">
            Necessary Only
          </button>
          <button @click="acceptAll" class="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-lg">
            Accept All
          </button>
        </div>
        <button @click="closeManageModal" class="mt-4 text-sm text-gray-600">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const consentGiven = ref(false);
const showManageModal = ref(false);

onMounted(() => {
  const consent = localStorage.getItem('cookieConsent');
  if (consent) applyConsent(JSON.parse(consent));
});

function acceptNecessaryOnly() {
  saveConsent({ marketing: false });
}

function acceptAll() {
  saveConsent({ marketing: true });
}

function saveConsent(consent) {
  localStorage.setItem('cookieConsent', JSON.stringify(consent));
  applyConsent(consent);
}

function applyConsent(consent) {
  consentGiven.value = true;
  loadZephrScripts();
  if (consent.marketing) loadGA4();
}

function loadZephrScripts() {
  const script = document.createElement('script');
  script.src = '/zephr/zephr-browser.umd.js'; // Ensure it's proxied correctly
  script.async = true;
  document.head.appendChild(script);

  script.onload = () => {
    window.zephrBrowser?.run({ jwt: 'YOUR_JWT_TOKEN', customData: { 'article-type': 'premium' } });
  };
}

function loadGA4() {
  if (!window.gtag) {
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-HDP4C20H65';
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
  }
  window.gtag?.('js', new Date());
  window.gtag?.('config', 'G-HDP4C20H65');
}

function openManageModal() {
  showManageModal.value = true;
}

function closeManageModal() {
  showManageModal.value = false;
}
</script>
