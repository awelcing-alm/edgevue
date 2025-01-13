<script setup lang="ts">
import { ref, onMounted } from 'vue';

const isLoggedIn = ref(false);

onMounted(() => {
  checkLoginState();
});

// Check the Zephr login state (e.g., using a cookie or JWT validation)
function checkLoginState() {
  const jwt = getZephrJwt(); // Replace with actual JWT retrieval logic
  isLoggedIn.value = jwt !== null;
}

// Handle registration or sign-in
function register() {
  if (window.zephrBrowser?.showRegistration) {
    window.zephrBrowser.showRegistration(); // Only call if defined
  } else {
    console.error("Zephr 'showRegistration' is not available.");
  }
}

// Handle logout
function logout() {
  // Clear Zephr-related cookies and JWT
  clearZephrJwt();
  isLoggedIn.value = false;

  // Optionally reload the page to refresh state
  location.reload();
}

function getZephrJwt() {
  return document.cookie.split('; ').find((row) => row.startsWith('blaize_jwt='))?.split('=')[1] || null;
}

function clearZephrJwt() {
  document.cookie = 'blaize_jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}
</script>
