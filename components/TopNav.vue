<template>
  <nav class="nav-container">
    <div class="nav-content">
      <!-- Logo Section -->
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

        <!-- Authentication Links -->
        <div v-if="auth.isAuthenticated" class="auth-links flex items-center gap-4">
          <span class="text-geckoOrange font-semibold">Welcome, {{ auth.user?.name || 'Explorer' }}!</span>
          <NuxtLink class="nav-link" to="/account">ACCOUNT</NuxtLink>
          <button @click="auth.logout" class="nav-link text-red-400 hover:text-red-300">LOGOUT</button>
        </div>
        <div v-else class="auth-links flex items-center gap-4">
          <NuxtLink class="nav-link register-button bg-geckoOrange text-white px-3 py-1 rounded-lg hover:bg-orange-500" to="/register">REGISTER</NuxtLink>
          <NuxtLink class="nav-link" to="/login">LOGIN</NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'; // Import auth composable
const auth = useAuth(); // Use the Pinia store for auth state
</script>

<style scoped>
/* Navigation Container */
.nav-container {
  background-color: #1a202c; /* Dark background */
  padding: 0.5rem 1.5rem;
  border-bottom: 2px solid #2d3748; /* Separation */
  position: sticky;
  top: 0;
  z-index: 50;
}

/* Navigation Content */
.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

/* Logo Styling */
.logo a {
  font-size: 1.75rem;
  font-weight: bold;
  text-transform: uppercase;
  color: #edf2f7; /* Light text */
}

.logo a:hover {
  color: #63b3ed; /* Hover effect */
}

/* Navigation Links */
.nav-links {
  display: flex;
  gap: 20px;
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

.nav-link.register-button {
  font-weight: bold;
  transition: background-color 0.3s ease-in-out, transform 0.2s;
}

.nav-link.register-button:hover {
  transform: scale(1.05);
}

.nav-link.active {
  color: #90cdf4; /* Active link color */
  border-bottom: 2px solid #90cdf4;
}

/* Responsive Menu for Small Screens */
@media (max-width: 768px) {
  .nav-links {
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }

  .logo a {
    font-size: 1.5rem;
  }
}
</style>
