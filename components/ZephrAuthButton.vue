<template>
  <button class="nav-link register-button" @click="handleAuthAction">
    {{ buttonLabel }}
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Track user authentication state
const isAuthenticated = ref(false);
const buttonLabel = ref('Register / Sign In'); // Default button label

// Function to handle button actions based on authentication state
const handleAuthAction = () => {
  if (isAuthenticated.value) {
    logOut(); // Log out if authenticated
  } else {
    openRegistration(); // Open registration if unauthenticated
  }
};

const openRegistration = () => {
  window.zephrBrowser?.login(); // Zephr's built-in login functionality
};

const logOut = () => {
  window.zephrBrowser?.logout(); // Zephr's built-in logout functionality
  console.log('User logged out');
  isAuthenticated.value = false;
  buttonLabel.value = 'Register / Sign In';
};

onMounted(() => {
  // Listen for Zephr user state updates
  const zephrUserUpdateHandler = (event) => {
    isAuthenticated.value = event.detail?.isAuthenticated || false;
    buttonLabel.value = isAuthenticated.value ? 'Log Out' : 'Register / Sign In';
    console.log('Zephr user state updated:', isAuthenticated.value);
  };

  window.addEventListener('zephrUserUpdate', zephrUserUpdateHandler);

  // Run an initial check when the component mounts
  if (window.zephrBrowser) {
    window.zephrBrowser.run({
      customData: { 'content-type': 'check-auth' },
      onSuccess: () => {
        isAuthenticated.value = true;
        buttonLabel.value = 'Log Out';
        console.log('User authenticated on initial check');
      },
      onFailure: () => {
        isAuthenticated.value = false;
        buttonLabel.value = 'Register / Sign In';
        console.warn('User not authenticated on initial check');
      },
    });
  } else {
    console.error('Zephr library is not loaded');
  }

  // Clean up the event listener when component is unmounted
  onUnmounted(() => {
    window.removeEventListener('zephrUserUpdate', zephrUserUpdateHandler);
  });
});
</script>

<style scoped>
.register-button {
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  padding: 0.5rem 1rem;
  background-color: transparent;
  border: none;
  transition: color 0.3s ease-in-out;
}

.register-button:hover {
  color: #63b3ed; /* Light blue hover */
}
</style>
