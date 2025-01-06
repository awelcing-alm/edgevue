export default {
    async fetch(request, env) {
      const url = new URL(request.url);
  
      // Proxy requests starting with "/zephr"
      if (url.pathname.startsWith('/zephr')) {
        url.hostname = 'https://alm-dev-nuxt-edge-demo-live.zephrcf.com/'; // Replace with Zephr CDN
        return fetch(url.toString(), request);
      }
  
      // Let all other requests go to your Nuxt app
      return env.ASSETS.fetch(request);
    },
  };
  