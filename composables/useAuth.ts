import { defineStore } from 'pinia';
import { useCookie } from '#app';

interface UserEntitlements {
  activeProducts: string[];
  trials: Record<string, { remaining?: number }>;
  timeTrials?: Record<string, any>;
}

interface User {
  name: string;
  email: string;
  jwt?: string;
  entitlements?: UserEntitlements;
}

export const useAuth = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const authToken = useCookie('auth_token');
  const isInitialized = ref(false);

  // Function to parse Zephr entitlements
  function parseZephrEntitlements(): UserEntitlements {
    const zephrData = window.Zephr?.accessDetails || {};
    return {
      activeProducts: zephrData.activeProducts || [],
      trials: zephrData.trials || {},
      timeTrials: zephrData.timeTrials || {},
    };
  }

  // Function to update entitlements
  function updateEntitlements() {
    if (user.value) {
      user.value.entitlements = parseZephrEntitlements();
      console.log('Updated user entitlements:', user.value.entitlements);
    }
  }

  // Function to log the user in
  const login = (name: string, email: string, jwt: string) => {
    user.value = { 
      name, 
      email, 
      jwt,
      entitlements: parseZephrEntitlements()
    };
    authToken.value = jwt;
    console.log('User logged in with entitlements:', user.value);
  };

  // Function to log out the user
  const logout = () => {
    user.value = null;
    authToken.value = null;
    if (window.zephrBrowser) {
      window.zephrBrowser.run({ jwt: '', debug: true });
    }
    console.log('User logged out and Zephr reset.');
  };

  // Check product access
  const hasAccess = (productId: string): boolean => {
    if (!user.value?.entitlements) return false;
    
    const { activeProducts, trials, timeTrials } = user.value.entitlements;
    
    return (
      activeProducts.includes(productId) ||
      !!trials[productId] ||
      !!timeTrials?.[productId]
    );
  };

  // Initialize auth state
  const initialize = () => {
    if (isInitialized.value) return;
    
    if (process.client) {
      // Rehydrate user state if the cookie exists
      if (authToken.value) {
        console.log('Existing JWT detected—setting user as authenticated.');
        login('Explorer', 'unknown@example.com', authToken.value);
      }

      // Listen for Zephr form success
      document.addEventListener('zephr.formSuccess', () => {
        console.log('Zephr form submitted successfully.');
        if (authToken.value) {
          login('User', 'user@example.com', authToken.value);
        }
      });

      // Listen for Zephr decisions to update entitlements
      document.addEventListener('zephr.browserDecisionsFinished', () => {
        updateEntitlements();
      });
    }

    isInitialized.value = true;
  };

  // Initialize on store creation
  initialize();

  return { 
    user, 
    login, 
    logout,
    hasAccess,
    updateEntitlements,
    initialize
  };
});