export default defineNuxtPlugin(() => {
  if (typeof window !== 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://assets.zephr.com/zephr-browser/1.9.1/zephr-browser.umd.js';
    script.id = 'zephr-script';
    script.onload = () => console.log('Zephr Browser loaded.');
    document.head.appendChild(script);
  }
});