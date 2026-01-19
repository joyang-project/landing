// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  image: {
    domains: ['jo-yang.com'],
    format: ['webp', 'avif', 'png'],
  },

  features: {
    inlineStyles: true
  },

  css: [
    '@/assets/css/main.css'
  ],

  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', '@nuxt/image'],

  shadcn: {
    prefix: '',
    componentDir: '@/components/ui'
  },

  app: {
    head: {
      title: '조양냉난방시스템',
      htmlAttrs: {
        lang: 'ko',
      },
      meta: [
        { name: 'description', content: '시스템 에어컨 시공 전문 조양냉난방시스템 - 가정용, 업소용 최적의 솔루션' }
      ],
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        {
          rel: 'preload',
          href: '/fonts/SUIT-Bold.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: 'anonymous'
        },
        {
          rel: 'preload',
          as: 'image',
          href: '/images/hero-bg.webp',
          fetchpriority: 'high'
        }
      ]
    },
  },

  nitro: {
    compressPublicAssets: true,
    routeRules: {
      '/images/**': { headers: { 'Cache-Control': 'public, max-age=31536000, immutable' } },
      '/fonts/**': { headers: { 'Cache-Control': 'public, max-age=31536000, immutable' } },
      '/_nuxt/**': { headers: { 'Cache-Control': 'public, max-age=31536000, immutable' } },
    }
  }
})