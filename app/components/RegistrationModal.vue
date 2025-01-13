<template>
    <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div class="bg-white rounded-lg shadow-lg w-full max-w-lg p-8 relative">
        <button class="absolute top-4 right-4 text-gray-600 hover:text-gray-800" @click="$emit('close')">✕</button>
        <h2 class="text-2xl font-bold mb-4 text-center text-emerald-800">Register to Access Content</h2>
        <div class="zephr-registration-placeholder w-full h-64 bg-gray-100 border border-dashed border-gray-300 rounded-lg flex justify-center items-center">
          <p class="text-gray-500">Registration content will appear here.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const show = ref(true); // Determines modal visibility (set to true for demonstration)
  
  const closeModal = () => {
    show.value = false; // Close modal
  };
  </script>
  
  <style scoped>
  .zephr-registration-placeholder {
    /* Style to help Zephr easily inject content */
    min-height: 200px;
    padding: 20px;
    text-align: center;
  }
  </style>
  