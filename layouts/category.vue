<template>
    <div class="min-h-screen bg-emerald-50">
      <!-- Top Navigation -->
      <TopNav />
  
      <main class="container mx-auto px-4 py-12">
        <div class="max-w-6xl mx-auto">
          <div class="bg-gradient-to-r from-emerald-800 to-emerald-900 text-emerald-50 p-8 rounded-lg mb-8">
            <h1 class="text-4xl font-bold mb-4 capitalize">
              <slot name="category-title">Category Articles</slot>
            </h1>
            <p class="text-xl text-emerald-100">
              <slot name="category-description">Explore our collection of articles.</slot>
            </p>
          </div>
  
          <!-- Main Content -->
          <slot />
        </div>
      </main>
  
      <footer class="bg-gray-100 py-6 text-center border-t border-gray-200">
        <p class="text-sm">
          <a href="#" @click.prevent="openCookieSettings" class="text-emerald-600 underline hover:text-emerald-700">
            Manage Cookies
          </a>
        </p>
      </footer>
  
      <CookieConsent />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import TopNav from '~/components/TopNav.vue';
  
  function openCookieSettings() {
    const cookieConsentComponent = document.querySelector('cookie-consent');
    cookieConsentComponent?.__vueParentComponent.ctx.openManageModal();
  }
  </script>