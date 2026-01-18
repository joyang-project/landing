<script setup lang="ts">
import { X, ArrowRight } from 'lucide-vue-next'

interface CaseItem {
  id: number
  title: string
  category: string
  img: string
  desc: string
}

const props = defineProps<{
  selectedCase: CaseItem | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

watch(() => props.selectedCase, (newVal) => {
  if (import.meta.client) {
    document.body.style.overflow = newVal ? 'hidden' : ''
  }
})

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') emit('close')
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>

<template>
  <Teleport to="body">
    <Transition 
      enter-active-class="transition duration-300 ease-out" 
      enter-from-class="opacity-0" 
      enter-to-class="opacity-100" 
      leave-active-class="transition duration-200 ease-in" 
      leave-from-class="opacity-100" 
      leave-to-class="opacity-0"
    >
      <div 
        v-if="selectedCase" 
        class="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8" 
        role="dialog" 
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div 
          @click="emit('close')" 
          class="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
          aria-hidden="true"
        ></div>

        <div class="relative w-full max-w-5xl bg-black rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10 flex flex-col md:flex-row max-h-[90vh]">
          
          <button 
            @click="emit('close')" 
            aria-label="닫기"
            class="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-white hover:text-black transition-all border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <X class="w-6 h-6" aria-hidden="true" />
          </button>

          <div class="flex-1 relative bg-[#1a1a1a] flex items-center justify-center overflow-hidden h-[40vh] md:h-auto">
            <NuxtImg 
              :src="selectedCase.img" 
              :alt="selectedCase.title || '시공 사례 상세 이미지'" 
              format="webp"
              quality="90"
              class="w-full h-full object-cover"
              loading="eager" 
            />
            </div>

          <div class="w-full md:w-[320px] lg:w-[400px] flex-shrink-0 bg-white p-8 flex flex-col justify-center relative">
            <div class="space-y-6">
              <div>
                <span class="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-widest mb-3">
                  {{ selectedCase.category }}
                </span>
                <h3 id="modal-title" class="text-3xl font-black text-slate-900 leading-tight">
                  {{ selectedCase.title || selectedCase.category + ' 시공 사례' }}
                </h3>
              </div>
              
              <div class="w-10 h-1 bg-[#155dfc]" aria-hidden="true"></div>
              
              <p class="text-slate-700 font-medium leading-relaxed">
                {{ selectedCase.desc || '고객의 니즈를 정확히 파악하여 최적의 냉난방 시스템을 설계하고 시공했습니다.' }}
              </p>

              <div class="pt-4 border-t border-slate-100">
                <button 
                  title="전화 또는 온라인 상담 신청 페이지로 이동"
                  class="w-full py-4 rounded-xl bg-slate-900 text-white font-bold hover:bg-[#155dfc] transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
                >
                  상담 신청하기
                  <ArrowRight class="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>