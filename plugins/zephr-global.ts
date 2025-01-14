export default defineNuxtPlugin((nuxtApp) => {
  if (!process.client) return; // Ensure client-side only

  const loadZephrScript = async () => {
    return new Promise<void>((resolve, reject) => {
      if (document.getElementById('zephr-script')) {
        resolve(); // Script already loaded
        return;
      }

      const zephrScript = document.createElement('script');
      zephrScript.id = 'zephr-script';
      zephrScript.src = 'https://assets.zephr.com/zephr-browser/1.9.1/zephr-browser.umd.js';
      zephrScript.async = true;

      zephrScript.onload = () => {
        console.log('Zephr Browser script loaded.');
        resolve();
      };

      zephrScript.onerror = () => {
        console.error('Failed to load Zephr script.');
        reject('Zephr script load failed');
      };

      document.head.appendChild(zephrScript);
    });
  };

  const waitForZephr = async () => {
    await loadZephrScript();
    let retries = 5;
    while (retries > 0 && !window.Zephr) {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Retry every 500ms
      retries--;
    }

    if (window.Zephr) {
      console.log('Zephr initialized.');
      window.Zephr.run(); // Run after script is loaded
    } else {
      console.error('Zephr failed to initialize.');
    }
  };

  nuxtApp.hook('app:mounted', () => {
    waitForZephr(); // Ensure script runs after app is mounted
  });
});
