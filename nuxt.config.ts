// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Nuxt modules
  modules: ['@nuxthub/core', '@nuxt/eslint', '@nuxt/content', '@nuxtjs/tailwindcss', '@nuxthq/studio'],

  // Devtools and environment configuration
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      gaId: 'G-VPV9PFJ3E4', // Google Analytics 4 ID
      zephrJwt: 'YOUR_ZEPHR_JWT_TOKEN', // Zephr JWT
    },
  },
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2024-07-30',

  content: {
    documentDriven: true,
    highlight: { theme: 'github-light' },
  },

  // Hub configuration
  hub: {},

  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
      },
    },
  },

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
      script: [
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=G-VPV9PFJ3E4',
          async: true,
        },
        {
          children: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VPV9PFJ3E4');
          `,
          type: 'text/javascript',
        },
      ],
    },
  },

  // Nitro configuration (correct usage of `routeRules`)
  nitro: {
    routeRules: {
      '/protected/**': { headers: { 'cache-control': 'no-cache' } }, // Ensure secure cache rules
    },
  },
});
