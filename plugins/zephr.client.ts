import type { Pinia } from 'pinia'; // Use type-only import
import { useAuth } from '@/composables/useAuth'; // Import the composable

export default defineNuxtPlugin((nuxtApp) => {
  const loadZephrScript = () => {
    return new Promise((resolve, reject) => {
      if (document.getElementById('zephr-script')) {
        resolve('Zephr script already loaded.');
        return;
      }

      const zephrScript = document.createElement('script');
      zephrScript.id = 'zephr-script';
      zephrScript.src = 'https://assets.zephr.com/zephr-browser/1.9.1/zephr-browser.umd.js';
      zephrScript.async = true;

      zephrScript.onload = () => {
        console.log('Zephr Browser loaded.');
        resolve(window.zephrBrowser || {});
      };

      zephrScript.onerror = () => reject('Failed to load Zephr Browser script.');
      document.head.appendChild(zephrScript);
    });
  };

  if (process.client) {
    loadZephrScript()
      .then(() => {
        if (!window.zephrBrowser) {
          console.warn('Zephr browser is not loaded.');
          return;
        }

        const pinia = nuxtApp.$pinia as Pinia; // Explicitly cast to Pinia
        const auth = useAuth(pinia);
        const jwtToken = auth.jwt ?? '';

        window.zephrBrowser.run({
          jwt: jwtToken,
          debug: true, // Enable debug mode
        });
      })
      .catch((error) => {
        console.error('Error loading Zephr script:', error);
      });
  }
});
