<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-vue-next'

interface CaseItem {
  id: string | number
  title: string
  service_type: string
  image_url: string
  location_tag: string
  description?: string
}

const emit = defineEmits<{
  (e: 'select-case', item: CaseItem): void
}>()

const config = useRuntimeConfig()
const apiBase = config.public.apiBase

const { data: cases } = await useFetch<CaseItem[]>(`${apiBase}/construction-cases`, {
  key: 'construction-cases-list'
})

const carouselRef = ref<HTMLElement | null>(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(true)
const isMobile = ref(false)
const timers = ref<ReturnType<typeof setTimeout>[]>([])

const getImageUrl = (url: string) => {
  if (!url) return ''
  if (url.startsWith('http')) return url
  return `${apiBase}${url}`
}

const updateSize = () => {
  if (import.meta.client) isMobile.value = window.innerWidth < 768
}

const checkScroll = () => {
  const el = carouselRef.value
  if (!el) return
  canScrollLeft.value = el.scrollLeft > 10
  const scrollEnd = el.scrollWidth - el.clientWidth
  const dummyWidth = isMobile.value ? (window.innerWidth * 0.22) : 200 
  canScrollRight.value = el.scrollLeft < (scrollEnd - dummyWidth - 10)
}

const scroll = (direction: 'left' | 'right') => {
  const el = carouselRef.value
  if (!el) return
  const offset = isMobile.value ? window.innerWidth * 0.82 : 508
  const move = direction === 'left' ? -offset : offset
  el.scrollBy({ left: move, behavior: 'smooth' })
}

onMounted(async () => {
  updateSize()
  window.addEventListener('resize', updateSize)
  await nextTick()
  checkScroll()
  const t = setTimeout(checkScroll, 500)
  timers.value.push(t)
})

onUnmounted(() => {
  if (import.meta.client) window.removeEventListener('resize', updateSize)
  timers.value.forEach(t => clearTimeout(t))
})

const leftPadding = 'max(1.25rem, calc((100vw - 1236px) / 2 + 1.25rem))'
const desktopPadding = 'max(3rem, calc((100vw - 1236px) / 2 + 3rem))'
</script>

<template>
  <section class="pb-16 md:pb-24 bg-white overflow-hidden" aria-labelledby="case-study-title">
    <div class="max-w-[1236px] mx-auto px-5 md:px-12 mb-10 flex items-end justify-between relative z-30">
      <div class="space-y-3">
        <h2 id="case-study-title" class="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 leading-tight">
          신뢰로 증명하는 <span class="text-[#155dfc]">시공 사례</span>
        </h2>
        <p class="text-slate-600 font-medium text-base md:text-lg tracking-tight">카드를 클릭하여 상세 이미지를 확인해보세요</p>
      </div>

      <div class="hidden md:flex gap-3">
        <button 
          @click="scroll('left')" 
          :disabled="!canScrollLeft" 
          class="p-4 rounded-full border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-20 transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#155dfc]"
        >
          <ChevronLeft class="w-6 h-6" />
        </button>
        <button 
          @click="scroll('right')" 
          :disabled="!canScrollRight" 
          class="p-4 rounded-full border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-20 transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#155dfc]"
        >
          <ChevronRight class="w-6 h-6" />
        </button>
      </div>
    </div>

    <div class="relative overflow-visible -mt-10 z-10">
      <div 
        ref="carouselRef" 
        @scroll="checkScroll" 
        class="flex gap-4 md:gap-7 overflow-x-auto snap-x snap-mandatory scrollbar-hide pt-10 pb-10 overflow-visible"
        :style="{ paddingLeft: isMobile ? leftPadding : desktopPadding, scrollPaddingLeft: isMobile ? leftPadding : desktopPadding }"
      >
        <button 
          v-for="(item, index) in cases" 
          :key="item.id" 
          @click="emit('select-case', item)"
          type="button"
          class="flex-shrink-0 w-[78vw] md:w-[480px] aspect-[4/5] md:aspect-[3/4] rounded-[2.5rem] relative overflow-hidden snap-start cursor-pointer bg-slate-100 transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_20px_50px_rgba(21,93,252,0.2)] hover:z-20 group text-left"
        >
          <NuxtImg 
            :src="getImageUrl(item.image_url)"
            :alt="`${item.title} 설치 완료 현장`"
            format="webp"
            quality="80"
            width="480"
            height="640"
            class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            :loading="index <= 1 ? 'eager' : 'lazy'" 
          />

          <div class="absolute inset-0 bg-black/40 transition-opacity duration-500 group-hover:opacity-10"></div>
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

          <div class="absolute top-8 left-8 right-8 z-10 transition-all duration-500 group-hover:opacity-0 group-hover:-translate-y-8">
            <span class="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest border border-white/20 mb-3">
              {{ item.service_type }}
            </span>
            <h3 class="text-2xl md:text-3xl font-bold text-white leading-tight drop-shadow-md">
              {{ item.title }}
            </h3>
            <p class="text-white/70 text-sm mt-2 font-medium">{{ item.location_tag }}</p>
          </div>

          <div class="absolute bottom-8 right-8 w-14 h-14 rounded-full bg-[#155dfc] flex items-center justify-center text-white shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
             <ArrowUpRight class="w-7 h-7" />
          </div>
        </button>
        
        <div class="flex-shrink-0" :style="{ width: isMobile ? `calc(100vw - 78vw - ${leftPadding})` : `calc(100vw - 480px - ${desktopPadding})` }" aria-hidden="true"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; width: 0 !important; height: 0 !important; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
button { will-change: transform; }
</style>