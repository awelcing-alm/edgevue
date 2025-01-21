<template>
  <div class="min-h-screen bg-emerald-50">
    <!-- Top Navigation -->
    <TopNav />

    <main class="container mx-auto px-4 py-12">
      <slot /> <!-- Slot to render page content -->
    </main>

    <footer class="bg-gray-100 py-6 text-center border-t border-gray-200">
      <p class="text-sm">
        <button @click="openManageCookies" class="text-emerald-600 underline hover:text-emerald-700">
          Manage Cookies
        </button>
      </p>
    </footer>

    <!-- Cookie Management Modal -->
    <ManageCookies ref="cookieModal" />
    
    <!-- Cookie Consent Banner -->
    <CookieConsent />
  </div>
</template>

<script setup>
import TopNav from '~/components/TopNav.vue';
import { ref } from 'vue';

const cookieModal = ref(null);

function openManageCookies() {
  cookieModal.value?.openManageModal();
}
</script>

<style scoped>
body {
  background-color: #ecfdf5;
}

header {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

footer {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.register-button {
  font-weight: 500;
  text-transform: uppercase;
}
</style>