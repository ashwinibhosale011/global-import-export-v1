import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// Set NUXT_APP_BASE_URL (e.g. '/global-import-export-v1/') when deploying under a subpath such as GitHub Pages.
const baseURL = process.env.NUXT_APP_BASE_URL || '/'

export default defineNuxtConfig({
  compatibilityDate: '2026-07-15',
  ssr: true,
  devtools: { enabled: false },

  modules: [
    '@pinia/nuxt',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        config.plugins = config.plugins ?? []
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],

  build: {
    transpile: ['vuetify'],
  },

  vite: {
    vue: {
      template: { transformAssetUrls },
    },
  },

  css: ['~/assets/css/main.scss'],

  features: {
    // Vuetify handles its own styles; keep them in CSS files instead of inlining.
    inlineStyles: false,
  },

  app: {
    baseURL,
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Global India Import Export | Fresh Produce Exporters from India',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#0C2A4A' },
        {
          name: 'description',
          content:
            'Global India Import Export sources, grades, and ships premium Indian produce — onions, pomegranates, bananas, coconuts, ginger, and more — for buyers in 50+ countries. Request an export quote today.',
        },
        { property: 'og:title', content: 'Global India Import Export | Fresh Produce Exporters from India' },
        {
          property: 'og:description',
          content:
            'Premium Indian vegetables and fruits, sourced at origin and delivered export-ready. Offices in Pune, India and Ras Al Khaimah, UAE.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: `${baseURL}hero/vegetables.jpeg` },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: `${baseURL}logo.png` },
        { rel: 'apple-touch-icon', href: `${baseURL}logo.png` },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap',
        },
      ],
    },
  },
})
