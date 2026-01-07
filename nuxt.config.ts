// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  features: {
    inlineStyles: true
  },
  css: [
    '@/assets/css/main.css'
  ],
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', '@nuxt/image'],
  shadcn: {
    /**
     * Prefix for all the imported component.
     * @default "Ui"
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * Will respect the Nuxt aliases.
     * @link https://nuxt.com/docs/api/nuxt-config#alias
     * @default "@/components/ui"
     */
    componentDir: '@/components/ui'
  },
    app: {
    head: {
      title: '조양냉난방시스템',
      htmlAttrs: {
        lang: 'ko',
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
  },
})