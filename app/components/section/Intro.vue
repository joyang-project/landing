<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { 
  ShieldCheck, Zap, PenTool, ArrowRight, 
  ChevronLeft, ChevronRight, ArrowUpRight 
} from 'lucide-vue-next'

const currentMenu = useState<string>('currentMenu')

const scrollProgress = ref(0)
const handleScroll = () => {
  const scrollTop = window.scrollY
  scrollProgress.value = Math.min(scrollTop / 400, 1)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const strengths = [
  { title: '신뢰할 수 있는 시공', desc: '수년간의 현장 경험과 자격증을 보유한 전문 팀이 규격에 맞는 안전한 설비를 약속드립니다.', icon: ShieldCheck },
  { title: '세심한 서비스', desc: '상담부터 설치까지 전문 팀이 가장 신속하게 대응하여 불편을 최소화합니다.', icon: Zap },
  { title: '맞춤형 설계 컨설팅', desc: '공간의 특성과 용도를 고려하여 가장 효율적인 냉난방 시스템을 제안합니다.', icon: PenTool }
]

const heroRef = ref<HTMLElement | null>(null)
const strengthsRef = ref<HTMLElement | null>(null)
const heroVisible = ref(false)
const strengthsVisible = ref(false)

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.target === heroRef.value && entry.isIntersecting) heroVisible.value = true
      if (entry.target === strengthsRef.value && entry.isIntersecting) strengthsVisible.value = true
    })
  }, { threshold: 0.1 })

  if (heroRef.value) observer.observe(heroRef.value)
  if (strengthsRef.value) observer.observe(strengthsRef.value)
})

const carouselRef = ref<HTMLElement | null>(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(true)

const cases = [
  { id: 1, title: '이미지 1', category: '가정용', img: '🏠', color: 'bg-blue-50' },
  { id: 2, title: '이미지 2', category: '업소용', img: '☕', color: 'bg-orange-50' },
  { id: 3, title: '이미지 3', category: '업소용', img: '💻', color: 'bg-slate-50' },
  { id: 4, title: '이미지 4', category: '가정용', img: '🏡', color: 'bg-green-50' },
  { id: 5, title: '이미지 5', category: '업소용', img: '🍽️', color: 'bg-red-50' },
]

const checkScroll = () => {
  if (!carouselRef.value) return
  const el = carouselRef.value
  
  const isMobile = window.innerWidth < 768
  const cardWidth = isMobile ? window.innerWidth * 0.85 : 480
  const gap = isMobile ? 16 : 28
  const step = cardWidth + gap

  canScrollLeft.value = el.scrollLeft > 10

  const currentIndex = Math.floor((el.scrollLeft + 10) / step)
  
  canScrollRight.value = currentIndex < cases.length - 1
}

const scroll = (direction: 'left' | 'right') => {
  if (!carouselRef.value) return
  const el = carouselRef.value
  
  const isMobile = window.innerWidth < 768
  const cardWidth = isMobile ? window.innerWidth * 0.85 : 480
  const gap = isMobile ? 16 : 28
  const step = cardWidth + gap

  const currentIndex = Math.round(el.scrollLeft / step)
  const newIndex = direction === 'left' ? currentIndex - 1 : currentIndex + 1

  if (newIndex >= 0 && newIndex < cases.length) {
    el.scrollTo({
      left: newIndex * step,
      behavior: 'smooth'
    })
  }
}
</script>

<template>
  <div class="space-y-12 md:space-y-24 py-0 md:py-8 bg-white overflow-x-hidden">
    
    <div class="max-w-[1236px] mx-auto px-4 md:px-12 mb-4">
      <section ref="heroRef" class="relative flex flex-col-reverse md:flex-row items-center justify-between min-h-[70vh] md:min-h-[550px] pt-0 gap-4 md:gap-0">
        <div class="space-y-5 md:space-y-8 max-w-2xl transition-all duration-1000 w-full z-10" :class="heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'">
          <div class="space-y-3 md:space-y-4">
            <h2 class="text-3xl md:text-5xl lg:text-7xl font-black leading-[1.15] tracking-tighter text-slate-900 text-left">공간의 가치를 바꾸는<br /><span class="text-[#155dfc]">조양냉난방시스템</span></h2>
            <p class="text-sm md:text-xl text-slate-500 leading-relaxed font-medium text-left">합리적인 가격으로 최고의 전문가들과 함께<br class="hidden md:block" />더 쾌적한 환경을 직접 경험해 보세요.</p>
          </div>
          <div class="flex flex-col sm:flex-row gap-2.5 md:gap-4 relative z-20">
            <button class="flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4 bg-[#155dfc] text-white rounded-xl md:rounded-2xl font-bold text-sm md:text-lg hover:bg-blue-600 transition-all shadow-lg active:scale-95 group">지금 바로 무료 상담하기</button>
            <button @click="currentMenu = 'types'" class="flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4 bg-white text-slate-600 border border-slate-200 rounded-xl md:rounded-2xl font-bold text-sm md:text-lg hover:bg-slate-50 transition-all active:scale-95 group">설치 유형 보기 <ArrowRight class="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" /></button>
          </div>
        </div>
        <div class="flex justify-center w-full md:w-auto overflow-visible relative"><AirConditioner :active="heroVisible" :progress="scrollProgress" /></div>
      </section>
    </div>

    <div class="max-w-[1236px] mx-auto px-4 mb-4 md:px-12">
      <section ref="strengthsRef" class="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-0">
        <div v-for="(item, idx) in strengths" :key="idx" class="group p-6 md:p-8 rounded-[2rem] border border-slate-100 bg-white hover:border-[#155dfc] transition-all duration-1000 shadow-sm transform" :style="{ transitionDelay: `${idx * 150}ms`, transform: strengthsVisible ? 'translateY(0)' : 'translateY(40px)', opacity: strengthsVisible ? 1 : 0 }">
          <div class="w-11 h-11 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-blue-50 text-[#155dfc] flex items-center justify-center mb-6 group-hover:bg-[#155dfc] group-hover:text-white transition-all duration-500"><component :is="item.icon" class="w-5 h-5 md:w-6 md:h-6" /></div>
          <h3 class="text-lg md:text-xl font-bold mb-3 tracking-tight text-slate-900 text-left">{{ item.title }}</h3>
          <p class="text-slate-500 leading-relaxed text-xs md:text-base font-medium text-left">{{ item.desc }}</p>
        </div>
      </section>
    </div>

    <section class="pt-8 md:pt-24 bg-white group/section">
      <div class="max-w-[1236px] mx-auto px-4 md:px-12 mb-10 flex items-end justify-between">
        <div class="space-y-3">
          <h2 class="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 leading-tight text-left">
            신뢰로 증명하는 <span class="text-[#155dfc]">시공 사례</span>
          </h2>
          <p class="text-slate-500 font-medium text-sm md:text-lg tracking-tight text-left">실제 시공 현장을 확인해보세요</p>
        </div>
        <div class="hidden md:flex gap-3 opacity-0 group-hover/section:opacity-100 transition-all duration-300">
          <button @click="scroll('left')" :disabled="!canScrollLeft" class="p-4 rounded-full border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-20 shadow-sm transition-all"><ChevronLeft class="w-6 h-6" /></button>
          <button @click="scroll('right')" :disabled="!canScrollRight" class="p-4 rounded-full border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-20 shadow-sm transition-all"><ChevronRight class="w-6 h-6" /></button>
        </div>
      </div>

      <div class="carousel-container relative">
        <div 
          ref="carouselRef"
          @scroll="checkScroll"
          class="carousel-track"
        >
          <div 
            v-for="item in cases" 
            :key="item.id"
            class="carousel-item"
            :class="item.color"
          >
            <div class="absolute inset-0 flex items-center justify-center text-8xl md:text-9xl group-hover:scale-110 transition-transform duration-700">{{ item.img }}</div>
            <div class="absolute top-8 left-8 right-8 z-10 text-left">
              <span class="inline-block px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md text-[#155dfc] text-xs font-bold uppercase tracking-widest mb-3 border border-white/20">{{ item.category }}</span>
              <h3 class="text-2xl md:text-3xl font-bold text-slate-900 leading-tight tracking-tight">{{ item.title }}</h3>
            </div>
            <div class="absolute bottom-8 right-8 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <div class="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center border border-slate-100"><ArrowUpRight class="w-6 h-6 text-[#155dfc]" /></div>
            </div>
          </div>
          <div class="virtual-spacer flex-shrink-0"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.tracking-tighter { letter-spacing: -0.05em; }

.carousel-track {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-bottom: 60px;
  padding-left: 1rem;
  scroll-padding-left: 1rem;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.carousel-track::-webkit-scrollbar { display: none; }

.carousel-item {
  flex-shrink: 0;
  width: 85vw;
  aspect-ratio: 4/5;
  border-radius: 2.5rem;
  position: relative;
  overflow: hidden;
  scroll-snap-align: start;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.virtual-spacer {
  width: calc(100vw - 85vw - 1rem);
}

@media (min-width: 768px) {
  .carousel-track {
    gap: 28px;
    padding-left: calc((100vw - 1236px) / 2 + 48px);
    scroll-padding-left: calc((100vw - 1236px) / 2 + 48px);
  }
  .carousel-item {
    width: 480px;
    aspect-ratio: 3/4;
  }
  .virtual-spacer {
    width: calc(100vw - 480px - ((100vw - 1236px) / 2 + 48px));
  }
}

.carousel-item:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.08);
}
</style>