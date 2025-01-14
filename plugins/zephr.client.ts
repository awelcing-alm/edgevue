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
    loadZephrScript()
      .then(() => {
        if (!window.zephrBrowser) {
          console.warn('Zephr browser is not loaded.');
          return;
        }

        // Provide a JWT as required by the type definition
        const jwtToken = 'your-valid-jwt-here'; // Replace with real JWT or fetch dynamically if needed

        window.zephrBrowser.run({
          jwt: jwtToken, // JWT is required according to the type definition
          customData: {}, // Optional field, leave empty or add user-specific data if needed
        });
      })
      .catch((error) => {
        console.error('Error loading Zephr script:', error);
      });
  }
});
