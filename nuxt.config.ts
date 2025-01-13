// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Nuxt modules
  modules: ['@nuxthub/core', '@nuxt/eslint', '@nuxt/content', '@nuxtjs/tailwindcss', '@nuxthq/studio'],

  // Devtools and environment configuration
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      helloText: 'Hello from the Edge 👋', // Public environment variable
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
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  // Nitro configuration (correct usage of `routeRules`)
  nitro: {
    routeRules: {
      '/protected/**': { headers: { 'cache-control': 'no-cache' } }, // Ensure secure cache rules
    },
  },
});