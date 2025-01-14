<template>
    <div>
      <!-- Sign In / Join Today -->
      <button
        v-if="!isSignedIn"
        @click="goToRegister"
        class="bg-yellow-400 text-black font-semibold py-2 px-4 rounded-lg hover:bg-yellow-500 transition"
      >
        Join Today / Sign In
      </button>
  
      <!-- Hello / Sign Out -->
      <button
        v-else
        @click="signOut"
        class="bg-emerald-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-emerald-700 transition"
      >
        Hello! (Sign Out)
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
  import { useRouter } from 'vue-router';
  
  const isSignedIn = ref(false);
  const router = useRouter();
  
  function checkSignInStatus() {
    if (process.client && typeof document !== 'undefined') {
      const cookies = document.cookie
        .split('; ')
        .reduce((acc: Record<string, string>, cookie) => {
          const parts = cookie.split('=');
          const key = parts[0] ?? ''; // Default to empty string if undefined
          const value = parts[1] ?? '';
          if (key) {
            acc[key] = value;
          }
          return acc;
        }, {});
      isSignedIn.value = !!cookies['zephr_session_id']; // True if the Zephr session cookie exists
    }
  }
  
  function goToRegister() {
    router.push('/Register'); // Redirect to register/sign-in page
  }
  
  function signOut() {
    document.cookie = 'zephr_session_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    isSignedIn.value = false;
    triggerZephrRecheck(); // Re-run Zephr to update UI after sign-out
  }
  
  function triggerZephrRecheck() {
    if (window.Zephr && window.Zephr.run) {
      console.log('Re-checking Zephr outcomes after logout...');
      window.Zephr.run();
    }
  }
  
  onMounted(() => {
    checkSignInStatus();
  });
  </script>
  
  ---
  
  #### **2. Updated `zephr.client.ts` Plugin**
  
  - Ensure Zephr is loaded and attached properly after login events.
  - Handle any potential race conditions where the script loads late.
  
  ```ts
  export default defineNuxtPlugin(() => {
    const loadZephrScript = () => {
      return new Promise((resolve, reject) => {
        if (document.getElementById('zephr-script')) {
          resolve('Zephr script already loaded.');
          return;
        }
  
        const zephrScript = document.createElement('script');
        zephrScript.id = 'zephr-script';
        zephrScript.src = 'https://assets.zephr.com/zephr-browser/1.9.1/zephr-browser.umd.js';
        zephrScript.async = true;
  
        zephrScript.onload = () => {
          console.log('Zephr Browser loaded.');
          resolve(window.Zephr || {});
        };
  
        zephrScript.onerror = () => reject('Failed to load Zephr Browser script.');
        document.head.appendChild(zephrScript);
      });
    };
  
    if (process.client) {
      loadZephrScript()
        .then(() => {
          if (!window.Zephr) {
            console.warn('Zephr browser is not loaded.');
            return;
          }
  
          window.Zephr.run({
            jwt: '', // Provide JWT if required
            customData: { initialLoad: true },
          });
        })
        .catch((error) => {
          console.error('Error loading Zephr script:', error);
        });
    }
  });
  