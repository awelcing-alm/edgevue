<template>
  <div class="min-h-screen bg-emerald-50">
    <TopNav />
    <main class="container mx-auto px-4 py-12">
      <slot /> <!-- Page content slot -->
    </main>
    <footer class="bg-gray-100 py-6 text-center border-t border-gray-200">
      <p class="text-sm">
        <a href="#" @click.prevent="openCookieSettings" class="text-emerald-600 underline hover:text-emerald-700">
          Manage Cookies
        </a>
      </p>
    </footer>
  </div>
</template>

<script setup>
import TopNav from '~/components/TopNav.vue';

function openCookieSettings() {
  const cookieConsentComponent = document.querySelector('cookie-consent');
  cookieConsentComponent?.__vueParentComponent.ctx.openManageModal();
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
</style>
