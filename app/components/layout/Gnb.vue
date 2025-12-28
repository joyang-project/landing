<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Info, LayoutGrid } from 'lucide-vue-next'

const currentMenu = useState<string>('currentMenu', () => 'intro')

const navItems = [
  { id: 'intro', label: '소개', icon: Info },
  { id: 'types', label: '설치 유형', icon: LayoutGrid },
]
</script>

<template>
  <nav class="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md antialiased tracking-tight">
    <div class="mx-auto max-w-[1236px] px-4 md:px-12 flex h-[60px] md:h-21 items-center justify-between">
      <div class="flex items-center gap-6 md:gap-12">
        <NuxtLink to="/" class="flex-shrink-0 transition-opacity hover:opacity-80">
          <NuxtImg
            src="/image/logo.svg"
            alt="조양냉난방시스템"
            class="shrink-0 object-contain h-[36px] w-auto md:h-[56px] md:w-[108px]"
          />
        </NuxtLink>

        <Tabs v-model="currentMenu" class="hidden md:block">
          <TabsList class="bg-muted/50 h-11">
            <TabsTrigger 
              v-for="item in navItems" 
              :key="item.id"
              :value="item.id" 
              class="px-8 text-[14px] font-semibold data-[state=active]:shadow-sm transition-all"
            >
              {{ item.label }}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  </nav>

  <nav class="fixed bottom-0 left-0 z-50 w-full border-t bg-background/95 backdrop-blur-lg md:hidden">
    <div class="grid h-16 grid-cols-2 pb-safe">
      <button 
        v-for="item in navItems"
        :key="item.id"
        @click="currentMenu = item.id"
        class="relative flex flex-col items-center justify-center gap-1 transition-colors"
        :class="currentMenu === item.id ? 'text-foreground' : 'text-muted-foreground'"
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
          class="absolute bottom-1 h-1 w-8 rounded-full bg-primary" 
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