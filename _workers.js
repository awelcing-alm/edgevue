export default {
    async fetch(request, env) {
      const url = new URL(request.url);
  
      if (url.pathname.startsWith('/zephr')) {
        url.hostname = 'alm-dev-nuxt-edge-demo-live.zephrcf.com';
        url.protocol = 'https'; // Ensure the protocol is correct
  
        const newRequest = new Request(url.toString(), {
          method: request.method,
          headers: request.headers,
          body: request.body,
          redirect: 'follow',
        });
  
        const response = await fetch(newRequest);
        const newResponse = new Response(response.body, response);
        newResponse.headers.set('Access-Control-Allow-Origin', '*'); // Enable CORS
  
        return newResponse;
      }
  
      // Fallback to Nuxt app
      return env.ASSETS.fetch(request);
    },
  };
  