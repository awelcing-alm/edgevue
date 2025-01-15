<template>
    <div class="min-h-screen bg-gradient-to-b from-iguanaGreen to-desertSand flex flex-col items-center justify-center py-10">
      <img src="/images/gecko-hero.png" alt="Gecko Hero" class="w-36 mb-4 animate-bounce" />
      <h1 class="text-4xl font-extrabold text-gray-800 drop-shadow-lg">
        Welcome Back, Lizard Friend!
      </h1>
      <form @submit.prevent="onSubmit" class="bg-white shadow-lg rounded-lg p-8 w-full max-w-md mt-6">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            v-model="email"
            id="email"
            placeholder="scales@example.com"
            class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-geckoOrange focus:border-geckoOrange"
            required
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            v-model="password"
            id="password"
            placeholder="********"
            class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-geckoOrange focus:border-geckoOrange"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full py-2 px-4 bg-geckoOrange text-white font-semibold rounded-lg shadow-lg hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-geckoOrange"
        >
          Log In
        </button>
      </form>
      <p class="mt-4 text-gray-600">
        Don’t have an account? <a href="/register" class="text-geckoOrange hover:underline">Register here</a>.
      </p>
    </div>
  </template>
  
  <script setup lang="ts">
import { useAuth } from '@/composables/useAuth'; // Correct import path
const auth = useAuth();
  const email = ref('');
  const password = ref('');
  
  async function onSubmit() {
    await auth.login(email.value, password.value);
  }
  </script>
  