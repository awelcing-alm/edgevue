<template>
  <nav class="nav-container">
    <div class="nav-content">
      <div class="logo">
        <NuxtLink to="/">🦎 Wildlife News</NuxtLink>
      </div>
      <div class="nav-links">
        <NuxtLink class="nav-link" to="/category/lizards">Lizards</NuxtLink>
        <NuxtLink class="nav-link" to="/category/snakes">Snakes</NuxtLink>
        <NuxtLink class="nav-link" to="/category/salamanders">Salamanders</NuxtLink>
      </div>

      <!-- Register / Sign In Button -->
      <div class="flex items-center">
        <button
          class="bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded-lg text-white font-semibold register-button"
          @click="openRegistration"
        >
          {{ isSignedIn ? 'Sign Out' : 'Register / Sign In' }}
        </button>
      </div>
    </div>

    <!-- Registration Modal -->
    <RegistrationModal v-if="showModal" @close="closeRegistration" />
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // For detecting the current route
import RegistrationModal from '~/components/RegistrationModal.vue'; // Import modal

// State to track signed-in status
const isSignedIn = ref(false); // Change this logic as needed when integrating auth

// Modal control
const showModal = ref(false);

// Functions to open and close the modal
function openRegistration() {
  showModal.value = true;
}

function closeRegistration() {
  showModal.value = false;
}
</script>

<style scoped>
/* Navigation Container */
.nav-container {
  background-color: #1a202c; /* Dark gray background */
  border-bottom: 2px solid #2d3748; /* Slight separation */
  padding: 0.5rem 1.5rem;
  position: sticky;
  top: 0;
  z-index: 50;
}

/* Flexbox Layout */
.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

/* Logo Styling */
.logo a {
  font-size: 1.5rem;
  font-weight: bold;
  color: #edf2f7; /* Light text */
  text-decoration: none;
}

.logo a:hover {
  color: #63b3ed; /* Light blue hover */
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
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease-in-out;
}

.nav-link:hover {
  color: #63b3ed; /* Blue hover effect */
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
    font-size: 1.25rem;
  }
}
</style>
