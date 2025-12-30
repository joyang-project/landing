<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Home, Building2, CheckCircle2, ArrowRight, ShoppingCart } from 'lucide-vue-next'

type MainCategory = '가정용' | '업소용';
type SubCategory = 'stand' | 'ceiling';

interface Product {
  id: number;
  main: MainCategory;
  sub?: SubCategory;
  name: string;
  brand: string;
  features: string;
  image: string;
}

const products: Product[] = [
  { id: 1, main: '가정용', name: '가정용 벽걸이형', brand: '태스트', features: '냉방', image: '🏠' },
  { id: 2, main: '가정용', name: '프리미엄 2in1', brand: '태스트', features: '공기청정', image: '🏡' },
  { id: 3, main: '업소용', sub: 'stand', name: '대형', brand: '태스트', features: '스탠드', image: '🏢' },
  { id: 4, main: '업소용', sub: 'stand', name: '슬림형', brand: '태스트', features: '공간 절약', image: '🏬' },
  { id: 5, main: '업소용', sub: 'ceiling', name: '4Way', brand: '태스트', features: '고성능', image: '🏗️' },
  { id: 6, main: '업소용', sub: 'ceiling', name: '1Way', brand: '태스트', features: '공간 절약', image: '☁️' },
];

const contentMap = {
  residential: {
    title: '에어컨',
    desc: '주거 환경에 특화된 맞춤형 설계와 깔끔한 마감을 약속드립니다.',
    features: ['인테리어 조화', '저소음 시공', '에너지 최적화'],
    icon: Home
  },
  stand: {
    title: '스탠드형',
    desc: '식당, 카페 등 넓은 공간에 적합한 강력한 풍량 시스템입니다.',
    features: ['장거리 기류', '빠른 냉난방', '간편 유지보수'],
    icon: Building2
  },
  ceiling: {
    title: '천정형',
    desc: '천장 매립으로 공간 활용도를 높이고 균일한 바람을 전달합니다.',
    features: ['4way 기류제어', '공간 무제한 활용', '고급 인테리어'],
    icon: Building2
  }
};

const selectedMain = ref<MainCategory>('가정용');
const selectedSub = ref<SubCategory>('stand');
const isVisible = ref(false);

const currentContent = computed(() => {
  if (selectedMain.value === '가정용') return contentMap.residential;
  return contentMap[selectedSub.value];
});

const filteredProducts = computed(() => {
  return products.filter(p => {
    if (selectedMain.value === '가정용') return p.main === '가정용';
    return p.main === '업소용' && p.sub === selectedSub.value;
  });
});

onMounted(() => { isVisible.value = true; });
</script>

<template>
  <section class="max-w-7xl mx-auto px-4 py-4 md:py-10 bg-white text-slate-900">
    <header class="text-center mb-4 md:mb-10">
      <h2 class="text-2xl md:text-5xl font-black tracking-tighter mb-1 md:mb-3">
        최적화된 <span class="text-[#155dfc]">설치 솔루션</span>
      </h2>
      <p class="text-slate-500 text-[10px] md:text-lg font-medium tracking-tight">공간의 가치를 높이는 냉난방 설계</p>
    </header>

    <div class="flex flex-col md:flex-row gap-3 md:gap-6 items-start">
      
      <div class="w-full md:w-[22%] flex flex-col gap-2 md:gap-3 shrink-0">
        <div class="flex md:flex-col gap-2 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
          <button @click="selectedMain = '가정용'"
            class="flex-shrink-0 md:w-full flex items-center gap-3 px-4 py-2.5 md:px-5 md:py-4 rounded-xl md:rounded-[1.5rem] border-2 transition-all"
            :class="selectedMain === '가정용' ? 'border-[#155dfc] bg-blue-50/40 shadow-sm' : 'border-slate-100 bg-white'">
            <div class="p-1 md:p-2.5 rounded-lg md:rounded-xl transition-colors"
              :class="selectedMain === '가정용' ? 'bg-[#155dfc] text-white' : 'bg-slate-50 text-slate-400'">
              <Home class="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <span class="font-bold text-xs md:text-base">가정용</span>
          </button>

          <div class="flex-shrink-0 md:w-full rounded-xl md:rounded-[1.5rem] border-2 transition-all overflow-hidden"
            :class="selectedMain === '업소용' ? 'border-[#155dfc] bg-blue-50/40 shadow-sm' : 'border-slate-100 bg-white'">
            <button @click="selectedMain = '업소용'" class="w-full flex items-center gap-3 px-4 py-2.5 md:px-5 md:py-4 text-left font-bold">
              <div class="p-1 md:p-2.5 rounded-lg md:rounded-xl transition-colors"
                :class="selectedMain === '업소용' ? 'bg-[#155dfc] text-white' : 'bg-slate-50 text-slate-400'">
                <Building2 class="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <span class="font-bold text-xs md:text-base">업소용</span>
            </button>
            <div v-if="selectedMain === '업소용'" class="hidden md:block px-4 pb-4">
              <div class="bg-slate-200/50 p-1 rounded-xl flex w-full border border-slate-200/40">
                <button v-for="sub in (['stand', 'ceiling'] as SubCategory[])" :key="sub" @click.stop="selectedSub = sub"
                  class="flex-1 py-1.5 rounded-lg text-xs font-bold transition-all"
                  :class="selectedSub === sub ? 'bg-white text-[#155dfc] shadow-sm' : 'text-slate-500'">
                  {{ sub === 'stand' ? '스탠드' : '천정형' }}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div v-if="selectedMain === '업소용'" class="md:hidden flex gap-2 p-1 bg-slate-100 rounded-xl">
          <button v-for="sub in (['stand', 'ceiling'] as SubCategory[])" :key="sub" @click="selectedSub = sub"
            class="flex-1 py-1.5 rounded-lg text-xs font-bold transition-all"
            :class="selectedSub === sub ? 'bg-white text-[#155dfc] shadow-sm' : 'text-slate-500'">
            {{ sub === 'stand' ? '스탠드형' : '천정형' }}
          </button>
        </div>
      </div>

      <div class="w-full md:w-[78%] space-y-3 md:space-y-4">
        
        <div :key="`info-${selectedMain}-${selectedSub}`"
          class="relative bg-slate-900 border border-slate-100 rounded-[1.5rem] md:rounded-[2rem] shadow-lg overflow-hidden flex flex-col md:flex-row md:bg-white min-h-[280px] md:min-h-[380px] animate-in fade-in zoom-in-95">
          
          <div class="absolute inset-0 z-0 overflow-hidden shrink-0 md:relative md:w-[38%] lg:w-[32%]">
            <div class="w-full h-full bg-slate-800 md:bg-slate-50 flex items-center justify-center">
               <component :is="currentContent.icon" class="w-20 h-20 text-white/10 md:text-slate-200" />
            </div>
            <div class="absolute inset-0 bg-black/60 md:hidden"></div>
          </div>

          <div class="relative z-10 p-5 md:p-8 lg:p-10 flex-1 flex flex-col justify-center">
            <div class="space-y-4 md:space-y-6">
              <div class="space-y-1.5 md:space-y-3">
                <span class="inline-block px-2.5 py-0.5 rounded-full text-[8px] md:text-[10px] font-bold uppercase border tracking-widest bg-white/10 text-white border-white/20 md:bg-blue-50 md:text-[#155dfc] md:border-blue-100/50">
                  {{ selectedMain }}
                </span>
                <h3 class="text-xl md:text-3xl lg:text-4xl font-black tracking-tight text-white md:text-slate-900 leading-tight">
                  {{ currentContent.title }}
                </h3>
                <p class="text-white/80 md:text-slate-500 text-[11px] md:text-base lg:text-lg leading-snug md:leading-relaxed font-medium">
                  {{ currentContent.desc }}
                </p>
              </div>
              
              <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-x-2 gap-y-1.5 md:gap-4 border-t border-white/10 md:border-0 pt-3 md:pt-0">
                <div v-for="feature in currentContent.features" :key="feature" class="flex items-center gap-2 md:gap-3">
                  <CheckCircle2 class="w-3.5 h-3.5 md:w-5 md:h-5 text-green-400 md:text-green-500 flex-shrink-0" />
                  <span class="text-[10px] md:text-base font-bold text-white md:text-slate-700 tracking-tight">{{ feature }}</span>
                </div>
              </div>

              <button class="w-full flex items-center justify-center gap-2 px-5 py-3.5 md:py-5 bg-[#155dfc] text-white rounded-xl md:rounded-[1.25rem] text-sm md:text-lg font-bold hover:bg-blue-600 transition-all shadow-xl shadow-blue-500/10 active:scale-95 group">
                지금 바로 상담하기
                <ArrowRight class="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        <div :key="`list-${selectedMain}-${selectedSub}`"
          class="bg-slate-50/80 border border-slate-100 rounded-[1.25rem] md:rounded-[1.5rem] p-4 md:p-6 animate-in fade-in slide-in-from-bottom-4">
          <h4 class="text-xs md:text-lg font-bold flex items-center gap-2 mb-3 md:mb-5 text-slate-800 tracking-tight">
            <ShoppingCart class="w-3.5 md:w-5 md:h-5 text-[#155dfc]" /> 
            추천 제품
          </h4>
          
          <div class="flex md:grid md:grid-cols-3 gap-2 md:gap-3 overflow-x-auto md:overflow-visible pb-1 no-scrollbar items-stretch">
            <div v-for="product in filteredProducts" :key="product.id" 
              class="flex-shrink-0 w-[190px] md:w-full flex items-center gap-3 p-3 md:p-4 rounded-xl md:rounded-2xl border border-white bg-white shadow-sm hover:shadow-md transition-all group">
              <div class="w-9 h-9 md:w-14 md:h-14 bg-slate-50 rounded-lg flex items-center justify-center text-lg md:text-3xl shrink-0 group-hover:scale-110 transition-transform">
                {{ product.image }}
              </div>
              <div class="flex-1 min-w-0">
                <span class="inline-block px-1 py-0.5 bg-slate-100 text-slate-500 text-[7px] md:text-[9px] font-black rounded mb-0.5">{{ product.brand }}</span>
                <div class="font-bold text-slate-900 truncate text-[11px] md:text-base tracking-tight group-hover:text-[#155dfc] transition-colors">{{ product.name }}</div>
                <div class="text-[9px] md:text-[11px] text-slate-400 truncate font-medium">{{ product.features }}</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

.animate-in { animation-duration: 0.6s; animation-fill-mode: forwards; }
@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes zoom-in-95 { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
@keyframes slide-in-bottom { 
  from { transform: translateY(15px); opacity: 0; } 
  to { transform: translateY(0); opacity: 1; } 
}

.fade-in { animation-name: fade-in; }
.zoom-in-95 { animation-name: zoom-in-95; }
.slide-in-from-bottom-4 { animation-name: slide-in-bottom; }
</style>