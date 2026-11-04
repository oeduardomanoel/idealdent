// URL pública do site. Na Vercel, defina NUXT_PUBLIC_SITE_URL com o domínio final.
// Sem ela, usa o domínio de produção que a Vercel injeta no build.
const siteUrl = (
  process.env.NUXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '') ||
  'http://localhost:3000'
).replace(/\/$/, '')

export default defineNuxtConfig({
  compatibilityDate: '2026-11-01',
  devtools: { enabled: false },

  css: [
    '@fontsource-variable/montserrat/index.css',
    '@fontsource-variable/dm-sans/index.css',
    '~/assets/css/main.css'
  ],

  runtimeConfig: {
    public: {
      siteUrl,
      // ID do Google Analytics 4 ou Google Ads (opcional). Ex.: G-XXXXXXX
      gtagId: process.env.NUXT_PUBLIC_GTAG_ID || ''
    }
  },

  app: {
    head: {
      htmlAttrs: { lang: 'pt-BR' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
      meta: [
        { name: 'theme-color', content: '#0D47B5' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'geo.region', content: 'BR-SC' },
        { name: 'geo.placename', content: 'Balneário Barra do Sul' },
        { name: 'geo.position', content: '-26.4590934;-48.6072763' },
        { name: 'ICBM', content: '-26.4590934, -48.6072763' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'alternate', type: 'text/plain', title: 'llms.txt', href: '/llms.txt' }
      ]
    }
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/sitemap.xml', '/robots.txt', '/llms.txt', '/llms-full.txt']
    },
    compressPublicAssets: true
  },

  routeRules: {
    '/**': { prerender: true }
  },

  features: {
    inlineStyles: true
  }
})
