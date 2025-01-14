<template>
    <div class="bg-gradient-to-br from-emerald-800 to-emerald-900 text-emerald-50 p-8 rounded-lg mb-8">
      <h1 class="text-4xl font-bold mb-4">{{ title }}</h1>
      <p class="text-xl text-emerald-100">{{ description }}</p>
      <div v-if="date" class="mt-4 text-emerald-200">
        {{ new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    title: String,
    description: String,
    date: String
  });
  </script>