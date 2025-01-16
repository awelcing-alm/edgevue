<template>
  <div class="sign-in-container">
    <!-- Sign In / Register -->
    <button
      v-if="!isAuthenticated"
      @click="redirectToAuth"
      class="auth-button"
    >
      Sign In / Register
    </button>

    <!-- Sign Out -->
    <button
      v-else
      @click="signOut"
      class="auth-button sign-out"
    >
      Sign Out
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const isAuthenticated = ref(false);
const router = useRouter();

function checkAuthStatus() {
  const accessDetails = window.Zephr?.accessDetails;
  isAuthenticated.value = accessDetails?.authenticated ?? false;
}

function redirectToAuth() {
  router.push('/auth'); // Redirect to the authentication page
}

async function signOut() {
  try {
    // Trigger sign-out API endpoint
    const response = await fetch('/blaize/logout', {
      method: 'POST',
      credentials: 'include', // Include cookies in the request
    });

    if (!response.ok) {
      console.error('Failed to log out:', response.statusText);
      return;
    }

    // Update the authentication status
    isAuthenticated.value = false;
    console.log('User logged out successfully');
  } catch (error) {
    console.error('Error during logout:', error);
  }
}

onMounted(() => {
  if (typeof window === 'undefined') return;

  // Check authentication status on load
  checkAuthStatus();

  // Update status dynamically when Zephr decisions finish
  document.addEventListener('zephr.browserDecisionsFinished', checkAuthStatus);
});
</script>

<style scoped>
.sign-in-container {
  display: flex;
  align-items: center; /* Vertically aligns the button with nav text */
  justify-content: center;
}

.auth-button {
  background-color: #fdae61;
  color: white;
  font-weight: bold;
  padding: 0.3rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem; /* Matches the font size of nav text */
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, transform 0.2s;
}

.auth-button:hover {
  background-color: #fb923c;
  transform: scale(1.05);
}

.auth-button.sign-out {
  background-color: #34d399;
}

.auth-button.sign-out:hover {
  background-color: #10b981;
}
</style>
