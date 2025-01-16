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

        <!-- Authentication Links -->
        <div class="auth-links">
          <SignInButton />
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth';
import SignInButton from '~/components/SignInStatus.vue';

const auth = useAuth();
const isAuthenticated = computed(() => !!auth.user?.jwt);
</script>

<style scoped>
/* Restore consistent branding and font sizes */
.nav-container {
  background-color: #1a202c;
  padding: 1rem 2rem;
  border-bottom: 2px solid #2d3748;
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
}

.nav-link:hover {
  color: #63b3ed;
}

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

.welcome-text {
  color: #f1f5f9;
  font-size: 0.9rem;
  font-weight: 500;
}

@media (max-width: 768px) {
  .nav-links {
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }
}
</style>
