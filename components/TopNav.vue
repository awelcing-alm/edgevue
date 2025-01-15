<template>
  <nav class="nav-container">
    <div class="nav-content">
      <!-- Logo Section -->
      <div class="logo">
        <NuxtLink to="/" class="logo-link">
          🦎 NEWTS' NEWS
        </NuxtLink>
      </div>

      <!-- Navigation Links -->
      <div class="nav-links">
        <NuxtLink class="nav-link" to="/category/lizards" :class="{ active: isActive('/category/lizards') }">LIZARDS</NuxtLink>
        <NuxtLink class="nav-link" to="/category/snakes" :class="{ active: isActive('/category/snakes') }">SNAKES</NuxtLink>
        <NuxtLink class="nav-link" to="/category/salamanders" :class="{ active: isActive('/category/salamanders') }">SALAMANDERS</NuxtLink>
      </div>

      <!-- User State: Auth Links -->
      <div class="auth-links">
        <div v-if="isAuthenticated" class="flex items-center gap-4">
          <span class="welcome-text">Welcome, {{ auth.user?.name || 'Explorer' }}!</span>
          <NuxtLink class="nav-link" to="/account">MY ACCOUNT</NuxtLink>
          <button @click="logout" class="nav-link logout-button">LOGOUT</button>
        </div>
        <div v-else class="flex items-center gap-4">
          <NuxtLink class="nav-link register-button" to="/register">REGISTER</NuxtLink>
          <NuxtLink class="nav-link" to="/login">LOGIN</NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth';
import { useRoute } from 'vue-router'; // To highlight active links

const auth = useAuth();
const route = useRoute();
const isAuthenticated = computed(() => !!auth.user?.jwt);

// Utility to check if the current route matches
const isActive = (path: string): boolean => route.path.startsWith(path);

function logout() {
  auth.logout();
  window.location.href = '/'; // Redirect after logout
}
</script>

<style scoped>
/* Navigation Container */
.nav-container {
  background-color: #1a202c;
  padding: 1rem 2rem;
  border-bottom: 2px solid #2d3748;
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
.logo-link {
  font-size: 1.75rem;
  font-weight: bold;
  text-transform: uppercase;
  color: #edf2f7;
  text-decoration: none;
}

.logo-link:hover {
  color: #63b3ed;
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
  color: #63b3ed; /* Hover effect */
}

.nav-link.active {
  color: #90cdf4; /* Active link color */
  border-bottom: 2px solid #90cdf4;
}

/* Register Button */
.register-button {
  background-color: #fdae61;
  color: white;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: background-color 0.3s ease-in-out, transform 0.2s;
}

.register-button:hover {
  background-color: #fb923c;
  transform: scale(1.05);
}

.logout-button {
  color: #f87171;
  font-weight: bold;
}

.logout-button:hover {
  color: #fb7185;
}

/* Welcome Text */
.welcome-text {
  color: #f1f5f9;
  font-size: 0.9rem;
  font-weight: 500;
}

/* Responsive Menu for Small Screens */
@media (max-width: 768px) {
  .nav-links {
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }

  .logo-link {
    font-size: 1.5rem;
  }
}
</style>
