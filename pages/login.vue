<template>
    <div class="min-h-screen flex flex-col items-center justify-center bg-slate-100 py-8">
      <div class="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        <h1 class="text-2xl font-bold text-center text-emerald-900">Welcome Back 🦎</h1>
        <p class="text-sm text-center text-gray-600 mb-4">
          Log in to access exclusive content and personalized updates.
        </p>
  
        <!-- Zephr form injection placeholder -->
        <div id="zephr-login-form" class="mt-6">
          <p class="text-center text-sm text-gray-500">Loading personalized login form...</p>
        </div>
  
        <p class="mt-4 text-sm text-center text-gray-600">
          Need help? <a href="/help" class="text-emerald-600 hover:underline">Contact support</a>.
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  const openHelpModal = () => {
    alert('Help content would be shown here.');
  };
  </script>
  
  <style scoped>
  #zephr-login-form {
    min-height: 120px;
    border-radius: 6px;
    border: 1px dashed #cbd5e1;
    animation: pulse 1.5s infinite;
  }
  </style>
  