<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Home, Building2, ArrowRight, ShoppingCart } from 'lucide-vue-next'

type MainCategory = '가정용' | '업소용';
type SubCategory = 'stand' | 'ceiling';

interface Product {
  id: number;
  main: MainCategory;
  sub?: SubCategory;
  name: string;
  brand: string;
  image: string;
}

const products: Product[] = [
  { id: 1, main: '가정용', name: '가정용 벽걸이형', brand: '테스트', image: '🏠' },
  { id: 2, main: '가정용', name: '프리미엄 2in1', brand: '테스트', image: '🏡' },
  { id: 3, main: '업소용', sub: 'stand', name: '대형', brand: '테스트', image: '🏢' },
  { id: 4, main: '업소용', sub: 'stand', name: '슬림형', brand: '테스트', image: '🏬' },
  { id: 5, main: '업소용', sub: 'ceiling', name: '4Way', brand: '테스트', image: '🏗️' },
  { id: 6, main: '업소용', sub: 'ceiling', name: '1Way', brand: '테스트', image: '☁️' },
];

const contentMap = {
  residential: {
    title: '에어컨',
    desc: '주거 환경에 특화된 맞춤형 설계와 깔끔한 마감을 약속드립니다.',
    icon: Home
  },
  stand: {
    title: '스탠드형',
    desc: '식당, 카페 등 넓은 공간에 적합한 강력한 풍량 시스템입니다.',
    icon: Building2
  },
  ceiling: {
    title: '천정형',
    desc: '천장 매립으로 공간 활용도를 높이고 균일한 바람을 전달합니다.',
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
  <section class="max-w-7xl mx-auto px-4 py-6 md:py-12 bg-white text-slate-900">
    <header class="text-left mb-6 md:mb-12">
      <h2 class="text-3xl md:text-6xl font-black tracking-tighter mb-2 md:mb-4">
        최적화된 <span class="text-[#155dfc]">설치 솔루션</span>
      </h2>
      <p class="text-slate-500 text-sm md:text-xl font-medium tracking-tight">공간의 가치를 높이는 냉난방 설계</p>
    </header>

    <div class="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
      
      <div class="w-full md:w-[22%] flex flex-col gap-2 md:gap-4 shrink-0">
        <div class="flex md:flex-col gap-2 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
          <button @click="selectedMain = '가정용'"
            class="flex-shrink-0 md:w-full flex items-center gap-3 px-5 py-3 md:px-6 md:py-5 rounded-xl md:rounded-[1.5rem] border-2 transition-all"
            :class="selectedMain === '가정용' ? 'border-[#155dfc] bg-blue-50/40 shadow-sm' : 'border-slate-100 bg-white'">
            <div class="p-1.5 md:p-3 rounded-lg md:rounded-xl transition-colors"
              :class="selectedMain === '가정용' ? 'bg-[#155dfc] text-white' : 'bg-slate-50 text-slate-400'">
              <Home class="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <span class="font-bold text-sm md:text-lg">가정용</span>
          </button>

          <div class="flex-shrink-0 md:w-full rounded-xl md:rounded-[1.5rem] border-2 transition-all overflow-hidden"
            :class="selectedMain === '업소용' ? 'border-[#155dfc] bg-blue-50/40 shadow-sm' : 'border-slate-100 bg-white'">
            <button @click="selectedMain = '업소용'" class="w-full flex items-center gap-3 px-5 py-3 md:px-6 md:py-5 text-left font-bold">
              <div class="p-1.5 md:p-3 rounded-lg md:rounded-xl transition-colors"
                :class="selectedMain === '업소용' ? 'bg-[#155dfc] text-white' : 'bg-slate-50 text-slate-400'">
                <Building2 class="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <span class="font-bold text-sm md:text-lg">업소용</span>
            </button>
            <div v-if="selectedMain === '업소용'" class="hidden md:block px-5 pb-5">
              <div class="bg-slate-200/50 p-1.5 rounded-xl flex w-full border border-slate-200/40">
                <button v-for="sub in (['stand', 'ceiling'] as SubCategory[])" :key="sub" @click.stop="selectedSub = sub"
                  class="flex-1 py-2 rounded-lg text-sm font-bold transition-all"
                  :class="selectedSub === sub ? 'bg-white text-[#155dfc] shadow-sm' : 'text-slate-500'">
                  {{ sub === 'stand' ? '스탠드' : '천정형' }}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div v-if="selectedMain === '업소용'" class="md:hidden flex gap-2 p-1.5 bg-slate-100 rounded-xl">
          <button v-for="sub in (['stand', 'ceiling'] as SubCategory[])" :key="sub" @click="selectedSub = sub"
            class="flex-1 py-2 rounded-lg text-sm font-bold transition-all"
            :class="selectedSub === sub ? 'bg-white text-[#155dfc] shadow-sm' : 'text-slate-500'">
            {{ sub === 'stand' ? '스탠드형' : '천정형' }}
          </button>
        </div>
      </div>

      <div class="w-full md:w-[78%] space-y-4 md:space-y-6">
        
        <div :key="`info-${selectedMain}-${selectedSub}`"
          class="relative bg-slate-900 border border-slate-100 rounded-[1.5rem] md:rounded-[2.5rem] shadow-lg overflow-hidden flex flex-col md:flex-row md:bg-white min-h-[250px] md:min-h-[340px] animate-in fade-in zoom-in-95">
          
          <div class="absolute inset-0 z-0 overflow-hidden shrink-0 md:relative md:w-[40%] lg:w-[35%]">
            <div class="w-full h-full bg-slate-800 md:bg-slate-50 flex items-center justify-center">
               <component :is="currentContent.icon" class="w-24 h-24 md:w-32 md:h-32 text-white/10 md:text-slate-200" />
            </div>
            <div class="absolute inset-0 bg-black/60 md:hidden"></div>
          </div>

          <div class="relative z-10 p-6 md:p-10 lg:p-12 flex-1 flex flex-col justify-center">
            <div class="space-y-6 md:space-y-10">
              <div class="space-y-3 md:space-y-5">
                <span class="inline-block px-3 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase border tracking-widest bg-white/10 text-white border-white/20 md:bg-blue-50 md:text-[#155dfc] md:border-blue-100/50">
                  {{ selectedMain }}
                </span>
                <h3 class="text-2xl md:text-5xl font-black tracking-tight text-white md:text-slate-900 leading-tight">
                  {{ currentContent.title }}
                </h3>
                <p class="text-white/80 md:text-slate-500 text-sm md:text-xl leading-snug md:leading-relaxed font-medium">
                  {{ currentContent.desc }}
                </p>
              </div>

              <div class="pt-2 md:pt-4">
                <button class="w-full flex items-center justify-center gap-2.5 px-6 py-4 md:py-5 bg-[#155dfc] text-white rounded-xl md:rounded-[1.5rem] text-base md:text-xl font-bold hover:bg-blue-600 transition-all shadow-xl shadow-blue-500/10 active:scale-95 group">
                  지금 바로 상담하기
                  <ArrowRight class="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div :key="`list-${selectedMain}-${selectedSub}`"
          class="bg-slate-50/80 border border-slate-100 rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-8 animate-in fade-in slide-in-from-bottom-4">
          <h4 class="text-sm md:text-xl font-bold flex items-center gap-2.5 mb-4 md:mb-6 text-slate-800 tracking-tight">
            <ShoppingCart class="w-4 h-4 md:w-6 md:h-6 text-[#155dfc]" /> 
            추천 제품
          </h4>
          
          <div class="flex md:grid md:grid-cols-3 gap-3 md:gap-4 overflow-x-auto md:overflow-visible pb-2 no-scrollbar items-stretch">
            <div v-for="product in filteredProducts" :key="product.id" 
              class="flex-shrink-0 w-[200px] md:w-full flex items-center gap-3.5 p-3.5 md:p-5 rounded-2xl md:rounded-[1.25rem] border border-white bg-white shadow-sm hover:shadow-md transition-all group">
              <div class="w-10 h-10 md:w-16 md:h-16 bg-slate-50 rounded-xl flex items-center justify-center text-xl md:text-4xl shrink-0 group-hover:scale-110 transition-transform">
                {{ product.image }}
              </div>
              <div class="flex-1 min-w-0">
                <span class="inline-block px-1.5 py-0.5 bg-slate-100 text-slate-500 text-[9px] md:text-[10px] font-black rounded mb-1">{{ product.brand }}</span>
                <div class="font-bold text-slate-900 truncate text-sm md:text-lg tracking-tight group-hover:text-[#155dfc] transition-colors">{{ product.name }}</div>
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