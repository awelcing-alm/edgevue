import { defineStore } from 'pinia';
import { useCookie } from '#app';

export const useAuth = defineStore('auth', () => {
  const user = ref<{ name: string; email: string; jwt?: string } | null>(null);
  const authToken = useCookie('auth_token'); // Persistent cookie for JWT

  // Function to log the user in (when Zephr form submission succeeds)
  const login = (name: string, email: string, jwt: string) => {
    user.value = { name, email, jwt };
    authToken.value = jwt; // Store the JWT for reactivity
    console.log('User logged in:', user.value);
  };

  // Function to log out the user
  const logout = () => {
    user.value = null;
    authToken.value = null; // Clear JWT cookie
    if (window.zephrBrowser) {
      window.zephrBrowser.run({ jwt: '', debug: true }); // Reset Zephr session for anonymous users
    }
    console.log('User logged out and Zephr reset.');
  };

  // Handle Zephr events directly
  if (process.client) {
    onMounted(() => {
      // Listen for Zephr form success to automatically log the user in
      document.addEventListener('zephr.formSuccess', () => {
        console.log('Zephr form submitted successfully.');
        login('User', 'user@example.com', authToken.value || ''); // Placeholder name/email for demo
      });

      // Rehydrate user state if the cookie exists
      if (authToken.value) {
        console.log('Existing JWT detected—setting user as authenticated.');
        user.value = { name: 'Explorer', email: 'unknown@example.com', jwt: authToken.value };
      }
    });
  }

  return { user, login, logout };
});
