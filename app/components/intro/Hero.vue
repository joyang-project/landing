<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'

const currentMenu = useState<string>('currentMenu')
const heroRef = ref<HTMLElement | null>(null)
const heroVisible = ref(false)

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    const entry = entries[0]
    if (entry && entry.isIntersecting) {
      heroVisible.value = true
      observer.unobserve(entry.target)
    }
  }, { threshold: 0.1 })
  
  if (heroRef.value) observer.observe(heroRef.value)
})
</script>

<template>
  <section ref="heroRef" class="relative min-h-[65vh] md:min-h-[700px] flex items-center overflow-hidden w-full md:-mt-16 lg:-mt-20">
    <div class="absolute inset-0 z-0 overflow-hidden">
      <NuxtImg 
        src="/images/hero-bg.png" 
        format="webp"
        quality="80"
        alt="조양냉난방시스템 메인 배경"
        fetchpriority="high"
        class="w-full h-full object-cover transition-transform duration-[3000ms] ease-out"
        :class="heroVisible ? 'scale-100' : 'scale-110'"
      />
      <div class="absolute inset-0 bg-black/50 md:bg-transparent md:bg-gradient-to-r md:from-black/90 md:via-black/60 md:to-transparent"></div>
    </div>

    <div class="relative z-10 max-w-[1236px] mx-auto px-5 md:px-12 w-full pt-20 md:pt-24">
      <div class="space-y-6 md:space-y-8 max-w-3xl transition-all duration-1000 w-full" 
           :class="heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'">
        
        <div class="space-y-4 md:space-y-6">
          <h2 class="text-[2.5rem] md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tighter text-white drop-shadow-md">
            공간의 가치를 바꾸는<br />
            <span class="text-[#4b89ff]">조양냉난방시스템</span>
          </h2>
          <p class="text-base md:text-xl text-slate-100 leading-relaxed font-semibold max-w-xl drop-shadow-lg">
            합리적인 가격으로 최고의 전문가들과 함께<br class="hidden md:block" />
            더 쾌적한 환경을 직접 경험해 보세요.
          </p>
        </div>

        <div class="flex flex-col md:flex-row gap-3 md:gap-4 pt-2">
          <a href="tel:010-3294-3286" 
             title="전화 상담 연결"
             class="flex items-center justify-center px-8 py-4 bg-white text-[#1d1d1f] rounded-2xl font-bold text-lg hover:bg-[#155dfc] hover:text-white transition-all shadow-xl active:scale-95 w-full md:w-auto">
            바로 무료 상담하기
          </a>
          
          <button @click="currentMenu = 'types'" 
                  aria-label="설치 가능한 시스템 에어컨 유형 보기"
                  class="flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/30 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all group w-full md:w-auto">
            설치 유형 보기 
            <ArrowRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>