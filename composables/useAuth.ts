import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuth = defineStore('auth', () => {
  const user = ref<{ name: string; email: string; jwt?: string } | null>(null);

  // Login method
  function login(name: string, email: string, jwt: string) {
    user.value = { name, email, jwt };
    localStorage.setItem('authToken', jwt); // Cache the JWT for session persistence
  }

  // Logout method
  function logout() {
    user.value = null;
    localStorage.removeItem('authToken');
  }

  // Fetch User Profile (New method)
  async function fetchUserProfile() {
    const jwt = localStorage.getItem('authToken');
    if (!jwt) return;

    // Simulate a profile fetch (replace with real API call if necessary)
    const response = await new Promise((resolve) =>
      setTimeout(() => resolve({ name: 'Lizard King', email: 'king@scales.com', jwt }), 500)
    );

    if (response) {
      user.value = response as { name: string; email: string; jwt: string };
    }
  }

  return { user, login, logout, fetchUserProfile };
});
