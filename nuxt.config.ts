export default defineNuxtConfig({
  modules: [
    '@nuxthub/core',
    '@nuxt/eslint',
    '@nuxt/content',
    '@nuxthq/studio',
  ],

  // Enable devtools
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      helloText: 'Hello from the Edge 👋',
    },
  },

  future: { compatibilityVersion: 4 },
  compatibilityDate: '2024-07-30',

  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
      },
    },
  },

  hub: {},

  content: {
    // Markdown settings for Nuxt Content
    markdown: {
      remarkPlugins: ['remark-math'],
      rehypePlugins: ['rehype-highlight'],
    },
  },

    // Enable Nuxt Studio preview URL (if required)
    studio: {
      enabled: true,  // Automatically enable studio mode
    },

  nitro: {
    routeRules: {
      '/protected/**': { headers: { 'cache-control': 'no-cache' } },
    },
  },
});
