<template>
    <button @click="logout" class="sign-out-button">
      LOGOUT
    </button>
  </template>
  
  <script setup lang="ts">
  import { useAuth } from '~/composables/useAuth';
  
  const auth = useAuth();
  
  function logout() {
    auth.logout();
    if (window.zephrBrowser?.run) {
      window.zephrBrowser.run({ jwt: '' }); // Clear Zephr session
    }
    window.location.href = '/'; // Redirect to homepage after logout
  }
  </script>
  
  <style scoped>
  .sign-out-button {
    color: #f87171;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    border: 1px solid transparent;
    background-color: transparent;
    transition: color 0.3s ease-in-out, border-color 0.3s ease-in-out;
  }
  
  .sign-out-button:hover {
    color: #fb7185;
    border-color: #fb7185;
  }
  </style>
  