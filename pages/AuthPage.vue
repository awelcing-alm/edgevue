<template>
    <div class="min-h-screen bg-gradient-to-b from-emerald-50 to-desertSand flex flex-col">
      <!-- Top Navigation -->
      <TopNav />
  
      <main class="flex flex-col items-center justify-center flex-grow p-8">
        <div class="max-w-lg w-full bg-white shadow-lg rounded-lg p-8 space-y-4">
          <h1 class="text-3xl font-extrabold text-center text-iguanaGreen mb-4">
            🦎 Join or Sign In!
          </h1>
          <p class="text-center text-gray-600">
            Access exclusive articles, track your favorite reptiles, and become part of the community.
          </p>
  
          <!-- Placeholder for Zephr form -->
          <div id="zephr-form-placeholder" class="my-6 border-t border-gray-200 pt-4">
            <p class="text-center text-sm text-gray-500 animate-pulse">Loading form...</p>
          </div>
        </div>
      </main>
  
      <!-- Footer -->
      <footer class="bg-white py-8 text-center border-t border-gray-300 shadow-inner">
        <p class="text-sm text-gray-500">Copyright © 2025 - ALM</p>
      </footer>
    </div>
  </template>
  
  <script setup lang="ts">
  import TopNav from '~/components/TopNav.vue';
  import { onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuth } from '~/composables/useAuth';
  
  const auth = useAuth();
  const router = useRouter();
  
  onMounted(() => {
    if (typeof window === 'undefined') return;
  
    if (window.zephrBrowser?.run) {
      console.log('Running Zephr Auth form...');
      window.zephrBrowser.run({
        jwt: auth.user?.jwt || '', // Use the current JWT if available
        debug: true,
      });
    }
  
    // Handle form success and redirect to homepage
    document.addEventListener('zephr.formSuccess', () => {
      console.log('Form submission successful! Redirecting...');
      auth.fetchUserProfile(); // Update the auth store after login
      router.push('/');
    });
  });
  </script>
  
  <style scoped>
  /* Placeholder Styling */
  #zephr-form-placeholder {
    min-height: 120px;
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
  