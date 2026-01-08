<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { 
  ShieldCheck, Zap, PenTool, ArrowRight, 
  ChevronLeft, ChevronRight, X, ArrowUpRight 
} from 'lucide-vue-next'

const currentMenu = useState<string>('currentMenu')

const isMobile = ref(false)
const updateSize = () => {
  if (typeof window !== 'undefined') {
    isMobile.value = window.innerWidth < 768
  }
}

const heroRef = ref<HTMLElement | null>(null)
const strengthsRef = ref<HTMLElement | null>(null)
const heroVisible = ref(false)
const strengthsVisible = ref(false)

const selectedCase = ref<any>(null)

const openModal = (item: any) => {
  selectedCase.value = item
}

const closeModal = () => {
  selectedCase.value = null
}

watch(selectedCase, (newVal) => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = newVal ? 'hidden' : ''
  }
})

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && selectedCase.value) {
    closeModal()
  }
}

onMounted(() => {
  updateSize()
  window.addEventListener('resize', updateSize)
  window.addEventListener('keydown', handleKeydown)
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.target === heroRef.value && entry.isIntersecting) heroVisible.value = true
      if (entry.target === strengthsRef.value && entry.isIntersecting) strengthsVisible.value = true
    })
  }, { threshold: 0.1 })

  if (heroRef.value) observer.observe(heroRef.value)
  if (strengthsRef.value) observer.observe(strengthsRef.value)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateSize)
  window.removeEventListener('keydown', handleKeydown)
})

const strengths = [
  { title: '신뢰할 수 있는 시공', desc: '수년간의 현장 경험과 자격증을 보유한 전문 팀이 규격에 맞는 안전한 설비를 약속드립니다.', icon: ShieldCheck },
  { title: '세심한 서비스', desc: '상담부터 설치까지 전문 팀이 가장 신속하게 대응하여 불편을 최소화합니다.', icon: Zap },
  { title: '맞춤형 설계 컨설팅', desc: '공간의 특성과 용도를 고려하여 가장 효율적인 냉난방 시스템을 제안합니다.', icon: PenTool },
  { title: '안심할 수 있는 A/S', desc: '설치가 끝이 아닌 유지관리를 통해 안정적인 서비스를 제공합니다.', icon: PenTool }
]

const carouselRef = ref<HTMLElement | null>(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(true)

const cases = [
  { id: 1, title: '수성 범어 더블유', category: '가정용', img: '/images/example/01.jpg', desc: '고급 주상복합 맞춤형 시스템 에어컨 시공' },
  { id: 2, title: '동성로 스파크 상가', category: '업소용', img: '/images/example/02.jpg', desc: '대형 상업 시설 중앙 냉난방 시스템 구축' },
  { id: 3, title: '대구 삼성 창조캠퍼스', category: '업소용', img: '/images/example/03.jpg', desc: '창의적 업무 공간을 위한 쾌적한 환경 조성' },
  { id: 4, title: '만촌동 단독주택 단지', category: '가정용', img: '/images/example/04.jpg', desc: '주거 공간의 인테리어를 해치지 않는 깔끔한 마감' },
  { id: 5, title: '대봉동 웨딩거리 카페', category: '업소용', img: '/images/example/05.jpg', desc: '감성적인 인테리어와 조화를 이루는 디자인 시공' },
  { id: 6, title: '월성동 월드메르디앙', category: '가정용', img: '/images/example/06.jpg', desc: '오래된 아파트 시스템 에어컨 교체 및 배관 작업' },
  { id: 7, title: '삼덕동 플래그십 스토어', category: '업소용', img: '/images/example/07.jpg', desc: '브랜드 가치를 높이는 쾌적한 쇼핑 환경 제공' },
  { id: 8, title: '팔공산 전원주택 마을', category: '가정용', img: '/images/example/08.jpg', desc: '전원주택 특성에 맞춘 효율적인 냉난방 설계' },
]

const checkScroll = () => {
  if (!carouselRef.value) return
  const el = carouselRef.value
  canScrollLeft.value = el.scrollLeft > 10
  const scrollEnd = el.scrollWidth - el.clientWidth
  const dummyWidth = isMobile.value ? (window.innerWidth * 0.22) : 200 
  canScrollRight.value = el.scrollLeft < (scrollEnd - dummyWidth - 10)
}

const scroll = (direction: 'left' | 'right') => {
  if (!carouselRef.value) return
  const el = carouselRef.value
  const offset = isMobile.value ? window.innerWidth * 0.82 : 508
  const move = direction === 'left' ? -offset : offset
  el.scrollBy({ left: move, behavior: 'smooth' })
  setTimeout(checkScroll, 500)
}

const leftPadding = 'max(1.25rem, calc((100vw - 1236px) / 2 + 1.25rem))'
const desktopPadding = 'max(3rem, calc((100vw - 1236px) / 2 + 3rem))'
</script>

<template>
  <div class="bg-white overflow-x-hidden pt-0 mt-0">
    <section ref="heroRef" class="relative min-h-[65vh] md:min-h-[700px] flex items-center overflow-hidden w-full md:-mt-16 lg:-mt-20">
      <div 
        class="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-[3000ms] ease-out"
        :class="heroVisible ? 'scale-100' : 'scale-110'"
        style="background-image: url('/images/hero-bg.png');" 
      >
        <div class="absolute inset-0 bg-black/50 md:bg-transparent md:bg-gradient-to-r md:from-black/90 md:via-black/60 md:to-transparent"></div>
      </div>

      <div class="relative z-10 max-w-[1236px] mx-auto px-5 md:px-12 w-full pt-20 md:pt-24">
        <div class="space-y-6 md:space-y-8 max-w-3xl transition-all duration-1000 w-full" :class="heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'">
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
          <div class="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2">
            <button class="px-8 py-4 bg-[#155dfc] text-white rounded-2xl font-bold text-lg hover:bg-blue-600 transition-all shadow-xl active:scale-95">
              지금 바로 무료 상담하기
            </button>
            <button @click="currentMenu = 'types'" class="flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/30 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all group">
              설치 유형 보기 
              <ArrowRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
      
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce md:block hidden">
        <div class="w-1 h-12 bg-gradient-to-b from-white/50 to-transparent rounded-full"></div>
      </div>
    </section>

    <div class="max-w-[1236px] mx-auto px-5 md:px-12 py-12 md:py-20">
      <section ref="strengthsRef" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div v-for="(item, idx) in strengths" :key="idx" 
          class="group p-6 md:p-8 rounded-[2.5rem] border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-[#155dfc] transition-all duration-700 shadow-sm"
          :style="{ transitionDelay: `${idx * 150}ms`, transform: strengthsVisible ? 'translateY(0)' : 'translateY(40px)', opacity: strengthsVisible ? 1 : 0 }">
          
          <div class="flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0 mb-4 md:mb-6">
            <div class="flex-shrink-0 w-12 h-12 rounded-2xl bg-white text-[#155dfc] flex items-center justify-center shadow-sm group-hover:bg-[#155dfc] group-hover:text-white transition-all duration-500">
              <component :is="item.icon" class="w-6 h-6" />
            </div>
            <h3 class="text-xl font-bold tracking-tight text-slate-900 md:mt-6">{{ item.title }}</h3>
          </div>
          <p class="text-slate-500 leading-relaxed text-sm md:text-base font-medium">{{ item.desc }}</p>
        </div>
      </section>
    </div>

    <section class="pb-16 md:pb-24 bg-white overflow-visible">
      <div class="max-w-[1236px] mx-auto px-5 md:px-12 mb-10 flex items-end justify-between">
        <div class="space-y-3">
          <h2 class="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 leading-tight">
            신뢰로 증명하는 <span class="text-[#155dfc]">시공 사례</span>
          </h2>
          <p class="text-slate-500 font-medium text-base md:text-lg tracking-tight">카드를 클릭하여 상세 이미지를 확인해보세요</p>
        </div>
        <div class="hidden md:flex gap-3">
          <button @click="scroll('left')" :disabled="!canScrollLeft" class="p-4 rounded-full border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-20 transition-all shadow-sm">
            <ChevronLeft class="w-6 h-6" />
          </button>
          <button @click="scroll('right')" :disabled="!canScrollRight" class="p-4 rounded-full border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-20 transition-all shadow-sm">
            <ChevronRight class="w-6 h-6" />
          </button>
        </div>
      </div>

      <div class="relative group/main overflow-visible -mt-10">
        <div class="md:hidden absolute inset-y-0 left-0 z-20 flex items-center pl-2 pointer-events-none">
          <button v-if="canScrollLeft" @click="scroll('left')" class="p-3 rounded-full bg-white/80 backdrop-blur-md shadow-lg pointer-events-auto border border-white active:scale-90 transition-all">
            <ChevronLeft class="w-5 h-5 text-slate-900" />
          </button>
        </div>
        <div class="md:hidden absolute inset-y-0 right-0 z-20 flex items-center pr-2 pointer-events-none">
          <button v-if="canScrollRight" @click="scroll('right')" class="p-3 rounded-full bg-white/80 backdrop-blur-md shadow-lg pointer-events-auto border border-white active:scale-90 transition-all">
            <ChevronRight class="w-5 h-5 text-slate-900" />
          </button>
        </div>

        <div ref="carouselRef" @scroll="checkScroll" 
          class="flex gap-4 md:gap-7 overflow-x-auto snap-x snap-mandatory scrollbar-hide pt-10 pb-10 overflow-visible"
          :style="{ 
            paddingLeft: isMobile ? leftPadding : desktopPadding,
            scrollPaddingLeft: isMobile ? leftPadding : desktopPadding
          }">
          <div v-for="item in cases" :key="item.id"
            @click="openModal(item)"
            class="flex-shrink-0 w-[78vw] md:w-[480px] aspect-[4/5] md:aspect-[3/4] rounded-[2.5rem] relative overflow-hidden snap-start cursor-pointer bg-slate-100 transition-all duration-500 hover:-translate-y-4 hover:scale-[1.02] hover:shadow-2xl hover:z-10 group"
          >
            <div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" :style="{ backgroundImage: `url(${item.img})` }"></div>
            
            <div class="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/40"></div>
            
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div class="absolute top-8 left-8 right-8 z-10">
              <span class="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest border border-white/20 mb-3">{{ item.category }}</span>
              <h3 class="text-2xl md:text-3xl font-bold text-white leading-tight drop-shadow-sm">{{ item.title }}</h3>
            </div>
            
            <div class="absolute bottom-8 right-8 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
               <ArrowUpRight class="w-6 h-6" />
            </div>
          </div>
          <div class="flex-shrink-0" :style="{ width: isMobile ? `calc(100vw - 78vw - ${leftPadding})` : `calc(100vw - 480px - ${desktopPadding})` }"></div>
        </div>
      </div>
    </section>

    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="selectedCase" class="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          
          <div @click="closeModal" class="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"></div>

          <div class="relative w-full max-w-5xl bg-black rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10 flex flex-col md:flex-row max-h-[90vh]">
            
            <button @click="closeModal" class="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-white hover:text-black transition-all border border-white/10">
              <X class="w-6 h-6" />
            </button>

            <div class="flex-1 relative bg-[#1a1a1a] flex items-center justify-center overflow-hidden h-[50vh] md:h-auto">
              <img :src="selectedCase.img" :alt="selectedCase.title" class="w-full h-full object-cover" />
            </div>

            <div class="w-full md:w-[320px] lg:w-[400px] flex-shrink-0 bg-white p-8 flex flex-col justify-center relative">
               <div class="space-y-6">
                  <div>
                    <span class="inline-block px-3 py-1 rounded-full bg-blue-50 text-[#155dfc] text-xs font-bold uppercase tracking-widest mb-3">
                      {{ selectedCase.category }}
                    </span>
                    <h3 id="modal-title" class="text-3xl font-black text-slate-900 leading-tight">
                      {{ selectedCase.title }}
                    </h3>
                  </div>
                  
                  <div class="w-10 h-1 bg-[#155dfc]"></div>

                  <p class="text-slate-600 font-medium leading-relaxed">
                    {{ selectedCase.desc || '고객의 니즈를 정확히 파악하여 최적의 냉난방 시스템을 설계하고 시공했습니다.' }}
                  </p>

                  <div class="pt-4 border-t border-slate-100">
                    <button class="w-full py-4 rounded-xl bg-slate-900 text-white font-bold hover:bg-[#155dfc] transition-colors flex items-center justify-center gap-2">
                       상담 신청하기
                       <ArrowRight class="w-4 h-4" />
                    </button>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
.tracking-tighter { letter-spacing: -0.05em; }
</style>