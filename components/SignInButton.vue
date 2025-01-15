<template>
    <NuxtLink to="/auth" class="sign-in-button">
      SIGN IN
    </NuxtLink>
  </template>
  
  <script setup lang="ts">
  // No additional logic needed for a simple redirect button.
  </script>
  
  <style scoped>
  .sign-in-button {
    background-color: #fdae61;
    color: white;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    transition: background-color 0.3s ease-in-out, transform 0.2s;
  }
  
  .sign-in-button:hover {
    background-color: #fb923c;
    transform: scale(1.05);
  }
  </style>
  