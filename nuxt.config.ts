// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Nuxt modules
  modules: [
    '@nuxthub/core',
    '@nuxt/eslint',
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxthq/studio',
  ],

  // Enable component and auto-imports globally
  components: true,
  imports: {
    autoImport: true, // Auto-import Vue, composables, and runtime APIs
  },

  // Devtools and runtime configuration
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      gaId: 'G-HDP4C20H65', // Google Analytics 4 ID
      zephrJwt: process.env.ZEPHR_JWT || '', // Zephr JWT from .env
    },
  },

  // Content module configuration
  content: {
    documentDriven: true,
    highlight: { theme: 'github-light' },
  },

  // Nitro configuration for caching and headers
  nitro: {
    routeRules: {
      '/protected/**': { headers: { 'cache-control': 'no-cache' } }, // Secure cache rules
    },
  },

  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
      },
    },
  },

  // Tailwind CSS configuration (extend colors and typography)
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
  },

  // Application meta and headers
  app: {
    head: {
      title: "Newts' News",
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Lizards, Snakes, and Salamanders oh my!' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      script: [
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=G-HDP4C20H65',
          async: true,
        },
        {
          children: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HDP4C20H65');
          `,
          type: 'text/javascript',
        },
      ],
    },
  },

  // TypeScript configurations
  typescript: {
    tsConfig: {
      compilerOptions: {
        types: ['@types/node'],
      },
    },
  },

  // Enable compatibility with Nuxt 4
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-07-30',
});
