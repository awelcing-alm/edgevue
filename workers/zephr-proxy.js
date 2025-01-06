export default {
    async fetch(request) {
      const url = new URL(request.url);
  
      // Proxy only requests that start with `/zephr`
      if (url.pathname.startsWith('/zephr')) {
        url.hostname = 'alm-dev-nuxt-edge-demo-live.zephrcf.com'; // Replace with your Zephr domain
      }
  
      return fetch(url.toString(), request);
    },
  };
  