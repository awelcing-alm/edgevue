<template>
  <div class="min-h-screen bg-emerald-50">
    <header class="border-b bg-emerald-800 text-emerald-50">
      <nav class="container mx-auto px-4 py-6 flex justify-between items-center">
        <div class="flex items-center gap-8">
          <NuxtLink to="/" class="text-2xl font-bold flex items-center gap-2">
            <span class="text-3xl">🦎</span>
            Newts' News
          </NuxtLink>
          <NuxtLink to="/stats" class="hover:text-emerald-200 transition">Statistics</NuxtLink>
        </div>
        <button @click="openRegistration" class="bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded-lg">
          Register
        </button>
      </nav>
    </header>
    <main class="container mx-auto px-4 py-8">
      <NuxtPage />
    </main>
    <footer class="bg-gray-100 py-4 text-center">
      <p class="text-sm">
        <a href="#" @click.prevent="openCookieSettings" class="text-emerald-600 underline">Manage Cookies</a>
      </p>
    </footer>
    <CookieConsent />
  </div>
</template>

<script setup>
import CookieConsent from '~/components/CookieConsent.vue';

function openCookieSettings() {
  const cookieConsentComponent = document.querySelector('cookie-consent');
  cookieConsentComponent?.__vueParentComponent.ctx.openManageModal();
}
</script>
