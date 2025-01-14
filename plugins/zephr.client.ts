export default defineNuxtPlugin(() => {
  if (process.client) {
    // Load the Zephr browser library if it hasn't been loaded already
    if (!window.zephrBrowser) {
      const zephrScript = document.createElement('script');
      zephrScript.src = 'https://assets.zephr.com/zephr-browser/1.9.1/zephr-browser.umd.js';
      zephrScript.async = true;
      document.head.appendChild(zephrScript);

      zephrScript.onload = () => {
        console.log('Zephr Browser loaded.');
      };
    }
  }
});