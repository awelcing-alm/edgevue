// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss'
  ],
  content: {
    // Enable content writing in Nuxt Studio
    documentDriven: true,
    highlight: {
      theme: 'github-light'
    }
  }
})