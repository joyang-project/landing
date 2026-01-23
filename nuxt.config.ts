// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },

  image: {
    domains: ['jo-yang.com'],
    format: ['webp', 'avif', 'png'],
    ipx: {
      maxAge: 31536000
    },
    quality: 80,
  },

  features: {
    inlineStyles: true
  },

  css: [
    '@/assets/css/main.css'
  ],

  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', '@nuxt/image', '@vueuse/nuxt'],

  shadcn: {
    prefix: '',
    componentDir: '@/components/ui'
  },

  app: {
    head: {
      titleTemplate: '조양냉난방시스템 | %s',
      title: '대구 에어컨 설치·이전 전문',
      htmlAttrs: {
        lang: 'ko',
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { 
          name: 'description', 
          content: '대구 시스템 에어컨 시공 전문 조양냉난방시스템. 가정용·업소용 에어컨 설치, 냉난방기 이전 설치, 중고 에어컨 매입까지 최적의 솔루션을 제공합니다.' 
        },
        { 
          name: 'keywords', 
          content: '대구 에어컨, 대구 에어컨 설치, 대구 에어컨 냉난방, 대구 이전 설치, 대구 냉난방, 대구 에어컨 중고, 대구 시스템 에어컨' 
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: '조양냉난방시스템' },
        { property: 'og:title', content: '조양냉난방시스템 | 대구 에어컨 설치·이전 전문' },
        { property: 'og:description', content: '대구 전지역 에어컨 및 냉난방기 설치 전문. 합리적인 비용으로 완벽한 시공을 약속드립니다.' },
        { property: 'og:url', content: 'https://jo-yang.com' },
        { property: 'og:image', content: 'https://jo-yang.com/images/og-image.jpg' },
      ],
      link: [
        { rel: 'canonical', href: 'https://jo-yang.com' },
        {
          rel: 'preload',
          href: '/fonts/SUIT-Bold.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: 'anonymous'
        },
        {
          rel: 'preload',
          href: '/fonts/SUIT-Medium.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: 'anonymous'
        },
        {
          rel: 'preload',
          href: '/fonts/SUIT-Regular.woff2',
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
    compressPublicAssets: {
      gzip: true,
      brotli: true
    },
    routeRules: {
      '/images/**': { headers: { 'Cache-Control': 'public, max-age=31536000, immutable' } },
      '/logo.svg': { headers: { 'Cache-Control': 'public, max-age=31536000, immutable' } },
      '/fonts/**': { headers: { 'Cache-Control': 'public, max-age=31536000, immutable' } },
      '/_nuxt/**': { headers: { 'Cache-Control': 'public, max-age=31536000, immutable' } },
      '/_ipx/**': { headers: { 'Cache-Control': 'public, max-age=31536000, immutable' } },
    }
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:4000'
    }
  }
})