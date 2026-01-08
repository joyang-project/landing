<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Phone,
  Info,
  LayoutGrid,
  Image,
  Coins
} from 'lucide-vue-next'

const currentMenu = useState<string>('currentMenu', () => 'intro')

const navItems = [
  { id: 'intro', label: '소개', icon: Info },
  { id: 'types', label: '설치 유형', icon: LayoutGrid },
  // { id: 'example', label: '시공 사례', icon: Image },
  { id: 'price', label: '가격', icon: Coins },
]
</script>

<template>
  <nav
    class="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md antialiased tracking-tight"
    aria-label="상단 글로벌 내비게이션 바"
  >
    <div class="mx-auto max-w-[1236px] px-4 md:px-12 flex h-[60px] md:h-21 items-center justify-between">
      <div class="flex items-center gap-6 md:gap-12">
        <NuxtLink to="/" class="flex-shrink-0 transition-opacity">
          <NuxtImg
            src="/logo.svg"
            alt="조양냉난방시스템"
            priority
            placeholder
            :modifiers="{ format: 'original' }" 
            class="h-9 w-auto md:h-12"
          />
        </NuxtLink>

        <Tabs v-model="currentMenu" class="hidden md:block">
          <TabsList class="bg-muted/50 h-11">
            <TabsTrigger 
              v-for="item in navItems" 
              :key="item.id"
              :value="item.id"
              class="px-8 text-[14px] font-semibold transition-all
                     data-[state=active]:text-[#155dfc] data-[state=active]:shadow-none"
            >
              {{ item.label }}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div class="flex items-center gap-3">
        <Button 
          as-child
          class="hidden md:flex items-center justify-center gap-2.5 bg-[#FEE500] hover:bg-[#f2da00] text-[#3C1E1E] border-none font-bold rounded-full px-6 h-11 shadow-sm transition-all"
        >
          <a href="https://pf.kakao.com/_xxxx" target="_blank" class="flex items-center leading-none">
            <IconKakao class="h-5 w-5 translate-y-[0.5px]" />
            <span class="pt-[1px]">카카오로 실시간 문의하기</span>
          </a>
        </Button>

        <Button 
          as-child 
          variant="outline"
          class="md:hidden border-[#155dfc] text-[#155dfc] hover:bg-[#155dfc] hover:text-white font-bold rounded-full h-10 px-4 active:scale-95 transition-all bg-transparent shadow-none border-2"
        >
          <a href="tel:010-3294-3286" class="flex items-center gap-2 leading-none">
            <Phone class="h-4 w-4 fill-current translate-y-[0.5px]" />
            <span class="pt-[1px]">빠른 전화 상담</span>
          </a>
        </Button>
      </div>
    </div>
  </nav>

  <nav
    class="fixed bottom-0 left-0 z-50 w-full border-t bg-background/95 backdrop-blur-lg md:hidden"
    aria-label="모바일 하단 메뉴"
  >
    <div class="grid h-16 grid-flow-col auto-cols-fr pb-safe">
      <button 
        v-for="item in navItems"
        :key="item.id"
        @click="currentMenu = item.id"
        class="relative flex flex-col items-center justify-center gap-1 transition-colors"
        :class="currentMenu === item.id ? 'text-[#155dfc]' : 'text-muted-foreground'"
        :aria-pressed="currentMenu === item.id"
      >
        <component 
          :is="item.icon" 
          class="h-5 w-5 transition-transform" 
          :class="{ 'scale-110': currentMenu === item.id }"
          :stroke-width="currentMenu === item.id ? 2.5 : 2" 
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