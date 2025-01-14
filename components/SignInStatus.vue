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
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const isSignedIn = ref(false);
  const router = useRouter();
  
  function checkSignInStatus() {
    const cookies = document.cookie.split('; ').reduce((acc: Record<string, string>, cookie) => {
      const parts = cookie.split('=');
      const key = parts[0] ?? ''; // Provide a default empty string if key is undefined
      const value = parts[1] ?? ''; // Provide a default value for safety
      if (key) {
        acc[key] = value;
      }
      return acc;
    }, {});
    isSignedIn.value = !!cookies['zephr_session_id']; // True if the Zephr session cookie exists
  }
  
  function goToRegister() {
    router.push('/Register'); // Redirect to register/sign-in page
  }
  
  function signOut() {
    document.cookie = 'zephr_session_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    isSignedIn.value = false;
  }
  
  checkSignInStatus(); // Run on component load
  </script>
  
  <style scoped>
  button {
    cursor: pointer;
    text-transform: uppercase;
  }
  </style>
  