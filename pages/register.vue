<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-radial from-geckoOrange via-desertSand to-white py-10">
      <div class="bg-white rounded-lg shadow-lg p-10 w-full max-w-md">
        <img src="/images/bearded-dragon.svg" class="w-32 mx-auto mb-6" />
        <h2 class="text-2xl font-bold text-center mb-4">Join Our Scaly Community!</h2>
        <form @submit.prevent="onSubmit">
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium">Name</label>
            <input
              type="text"
              id="name"
              v-model="name"
              placeholder="Cool Lizard Enthusiast"
              class="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:ring-iguanaGreen"
              required
            />
          </div>
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium">Email</label>
            <input
              type="email"
              id="email"
              v-model="email"
              class="mt-1 w-full border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              class="mt-1 w-full border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <button
            type="submit"
            class="w-full py-3 bg-geckoOrange text-white font-semibold rounded-md hover:bg-orange-400"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useAuth } from '@/composables/useAuth';
  const auth = useAuth();
  const email = ref('');
  const password = ref('');
  const name = ref('');
  
  async function onSubmit() {
    await auth.login(email.value, password.value);
  }
  </script>
  