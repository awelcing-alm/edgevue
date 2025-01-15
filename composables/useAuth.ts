import { defineStore } from 'pinia';
import { ref } from 'vue';

interface AuthUser {
  name: string;
  email: string;
  jwt?: string; // Include JWT
}

export const useAuth = defineStore('auth', () => {
  const user = ref<AuthUser | null>(null); // User can be null initially

  const login = (name: string, email: string, jwt: string) => {
    user.value = { name, email, jwt }; // Set JWT during login
  };

  const logout = () => {
    user.value = null; // Clear user data on logout
  };

  return {
    user,
    login,
    logout,
  };
});
