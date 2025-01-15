export default defineNuxtPlugin(() => {
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
    loadZephrScript().then(() => {
      if (!window.zephrBrowser) {
        console.warn('Zephr browser is not loaded.');
        return;
      }

      document.addEventListener('zephr.dataLayerReady', () => {
        console.log('Zephr data layer ready.');

        // Register custom event listener for registration success
        document.addEventListener('lzregister-success', () => {
          console.log('Registration successful! Redirecting...');
          window.location.href = '/'; // Redirect to home page
        });
      });
    });
  }
});
