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
        <div v-if="auth.user">
          <span class="text-geckoOrange font-semibold">Welcome, {{ auth.user.name || 'Explorer' }}!</span>
          <button @click="logout" class="nav-link text-red-400 hover:text-red-300">LOGOUT</button>
        </div>
        <div v-else>
          <NuxtLink class="nav-link register-button" to="/auth">LOGIN / REGISTER</NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAuth } from '~/composables/useAuth';

const auth = useAuth();

const logout = () => {
  auth.logout(); // Clear user session
  window.location.href = '/'; // Redirect to homepage after logout
};
</script>

<style scoped>
.nav-container {
  background-color: #1a202c; /* Dark background */
  padding: 0.5rem 1.5rem;
  border-bottom: 2px solid #2d3748; /* Separation */
  position: sticky;
  top: 0;
  z-index: 50;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.nav-link {
  color: #edf2f7;
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: 500;
  transition: color 0.3s ease-in-out;
  text-decoration: none;
}

.nav-link:hover {
  color: #63b3ed; /* Blue hover effect */
}

.register-button {
  font-weight: bold;
  background-color: #fdae61;
  padding: 0.5rem 1rem;
  border-radius: 8px;
}

.register-button:hover {
  background-color: #ff9e42;
}
</style>
