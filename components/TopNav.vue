<template>
  <nav class="nav-container">
    <div class="nav-content">
      <!-- Logo -->
      <div class="logo">
        <NuxtLink to="/" class="text-2xl font-bold tracking-wider text-emerald-50">
          🦎 NEWTS' NEWS
        </NuxtLink>
      </div>

      <!-- Navigation Links -->
      <div class="nav-links">
        <NuxtLink class="nav-link" to="/category/lizards">LIZARDS</NuxtLink>
        <NuxtLink class="nav-link" to="/category/snakes">SNAKES</NuxtLink>
        <NuxtLink class="nav-link" to="/category/salamanders">SALAMANDERS</NuxtLink>

        <!-- Dynamic User Actions -->
        <div v-if="isAuthenticated">
          <NuxtLink class="nav-link" to="/account">MY ACCOUNT</NuxtLink>
          <button @click="logout" class="nav-link">LOGOUT</button>
        </div>
        <div v-else>
          <NuxtLink class="nav-link" to="/login">LOGIN</NuxtLink>
          <NuxtLink class="nav-link register-button" to="/register">REGISTER</NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'; // Import auth composable for state management
const auth = useAuth();

const isAuthenticated = computed(() => !!auth.user?.jwt); // Double-bang ensures it's a boolean

function logout() {
  auth.logout(); // Call logout method from composable
  window.location.href = '/'; // Redirect to homepage after logout
}
</script>

<style scoped>
.nav-container {
  background-color: #1a202c;
  padding: 0.5rem 1.5rem;
  border-bottom: 2px solid #2d3748;
  position: sticky;
  top: 0;
  z-index: 50;
}
</style>
