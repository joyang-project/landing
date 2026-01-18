<script setup>
useSeoMeta({
  title: '조양냉난방시스템',
  ogTitle: '조양냉난방시스템 | 가정용·업소용 시스템 에어컨 전문 시공 업체',
  description: '합리적인 가격, 최고의 전문가가 시공하는 가정용·업소용 시스템 에어컨 전문 시공 업체입니다.',
  ogDescription: '신뢰로 증명하는 시공 사례와 무료 견적 상담을 확인해보세요.',
  ogType: 'website',
  ogUrl: 'https://jo-yang.com',
  // ogImage: '/images/', // 미리보기 이미지
  // twitterCard: 'summary_large_image', // 트위터 카드
})

useHead({
  htmlAttrs: {
    lang: 'ko',
  },
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'canonical', href: 'https://jo-yang.com' }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-background flex flex-col">
    <LayoutGnb />

    <div class="flex-1">
      <NuxtPage />
    </div>

    <LayoutFooter />
  </div>
</template>