<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { 
  Phone, Info, LayoutGrid, Coins, MessageCircle 
} from 'lucide-vue-next'

const currentMenu = useState<string>('currentMenu', () => 'intro')

const navItems = [
  { id: 'intro', label: '소개', icon: Info },
  { id: 'types', label: '설치 유형', icon: LayoutGrid },
  { id: 'price', label: '시공 가격', icon: Coins },
]

const isNavVisible = ref(true)
const lastScrollY = ref(0)

const handleScroll = () => {
  if (typeof window === 'undefined') return

  const currentScrollY = window.scrollY
  
  if (currentScrollY <= 0) {
    isNavVisible.value = true
    lastScrollY.value = currentScrollY
    return
  }

  if (Math.abs(currentScrollY - lastScrollY.value) > 10) {
      isNavVisible.value = currentScrollY < lastScrollY.value
      lastScrollY.value = currentScrollY
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav
    class="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md antialiased tracking-tight transition-transform duration-300 ease-in-out"
    :class="isNavVisible ? 'translate-y-0' : '-translate-y-full'"
    aria-label="상단 글로벌 내비게이션 바"
  >
    <div class="mx-auto max-w-[1236px] px-4 md:px-12 flex h-[60px] md:h-21 items-center justify-between">
      <div class="flex items-center gap-6 md:gap-12">
        <NuxtLink to="/" class="flex items-center gap-0.75 flex-shrink-0 transition-opacity hover:opacity-80">
          <img
            src="/logo.svg"
            alt="조양냉난방시스템"
            width="150" height="40"
            class="h-8 w-auto md:h-10"
          />
          <span class="font-black text-sm md:text-xl tracking-tighter text-slate-900">
            냉난방시스템
          </span>
        </NuxtLink>

        <div class="hidden lg:flex bg-muted/50 h-11 rounded-lg p-1 items-center">
            <button
              v-for="item in navItems"
              :key="item.id"
              @click="currentMenu = item.id"
              class="px-8 h-full rounded-md text-[14px] font-semibold transition-all duration-200"
              :class="currentMenu === item.id 
                ? 'bg-white text-[#155dfc] shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'"
              :aria-pressed="currentMenu === item.id"
            >
              {{ item.label }}
            </button>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <Button 
          as-child
          class="hidden md:flex items-center justify-center bg-[#FEE500] hover:bg-[#f2da00] text-[#3C1E1E] border-none font-bold rounded-full shadow-sm transition-all
                 md:px-5 md:h-10 md:text-sm
                 lg:px-6 lg:h-11 lg:text-base"
        >
          <a href="https://pf.kakao.com/_xxxx" target="_blank" rel="noopener noreferrer" class="flex items-center leading-none">
            <MessageCircle class="translate-y-[0.5px] w-4 h-4 lg:w-5 lg:h-5" aria-hidden="true" />
            <span class="pt-[1px] ml-2">카카오로 실시간 문의하기</span>
          </a>
        </Button>

        <Button 
          as-child 
          variant="outline"
          class="md:hidden border-[#155dfc] text-[#155dfc] hover:bg-[#155dfc] hover:text-white font-bold rounded-full h-10 px-4 active:scale-95 transition-all bg-transparent shadow-none border-2"
        >
          <a href="tel:010-3294-3286" class="flex items-center gap-2 leading-none">
            <Phone class="h-4 w-4 fill-current translate-y-[0.5px]" aria-hidden="true" />
            <span class="pt-[1px]">빠른 전화 상담</span>
          </a>
        </Button>
      </div>
    </div>
  </nav>

  <nav
    class="fixed bottom-0 left-0 z-50 w-full border-t bg-background/95 backdrop-blur-lg lg:hidden transition-transform duration-300 ease-in-out"
    :class="isNavVisible ? 'translate-y-0' : 'translate-y-full'"
    aria-label="모바일/태블릿 하단 메뉴"
  >
    <div class="grid h-16 grid-flow-col auto-cols-fr pb-safe w-full">
      <button 
        v-for="item in navItems"
        :key="item.id"
        @click="currentMenu = item.id"
        class="relative flex flex-col items-center justify-center gap-1 transition-colors hover:bg-muted/50"
        :class="currentMenu === item.id ? 'text-[#155dfc]' : 'text-slate-600'" 
        :aria-pressed="currentMenu === item.id"
      >
        <component 
          :is="item.icon" 
          class="h-5 w-5 transition-transform" 
          :class="{ 'scale-110': currentMenu === item.id }"
          :stroke-width="currentMenu === item.id ? 2.5 : 2" 
          aria-hidden="true" 
        />
        <span class="text-[11px] font-medium">{{ item.label }}</span>
        
        <div 
          v-if="currentMenu === item.id" 
          class="absolute bottom-1 h-0.5 w-6 rounded-full bg-[#155dfc]" 
        />
      </button>
    </div>
  </nav>
</template>

<style scoped>
.pb-safe {
  padding-bottom: env(safe-area-inset-bottom);
}
</style>