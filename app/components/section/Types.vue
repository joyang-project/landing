<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Home, Building2, ArrowRight, ShoppingCart, Calculator } from 'lucide-vue-next'

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
  { id: 1, main: '가정용', name: '가정용 벽걸이형', brand: '삼성/LG', image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?q=80&w=800&auto=format&fit=crop' },
  { id: 2, main: '가정용', name: '프리미엄 2in1', brand: '삼성/LG', image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?q=80&w=800&auto=format&fit=crop' },
  { id: 3, main: '업소용', sub: 'stand', name: '대형 스탠드', brand: '캐리어', image: 'https://images.unsplash.com/photo-1590756254933-2873d72a83b6?q=80&w=800&auto=format&fit=crop' },
  { id: 4, main: '업소용', sub: 'stand', name: '슬림형 스탠드', brand: '캐리어', image: 'https://images.unsplash.com/photo-1614633833026-07205c9d4e0e?q=80&w=800&auto=format&fit=crop' },
  { id: 5, main: '업소용', sub: 'ceiling', name: '시스템 4Way', brand: 'LG/삼성', image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?q=80&w=800&auto=format&fit=crop' },
  { id: 6, main: '업소용', sub: 'ceiling', name: '시스템 1Way', brand: 'LG/삼성', image: 'https://images.unsplash.com/photo-1565151443435-08e709088647?q=80&w=800&auto=format&fit=crop' },
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
  <section class="max-w-[1236px] mx-auto px-5 py-8 md:py-16 bg-white text-slate-900">
    <header class="mb-12 md:mb-20 text-center md:text-left">
      <div class="inline-block px-4 py-1.5 mb-4 rounded-full bg-blue-50 text-[#155dfc] text-xs md:text-sm font-bold tracking-wider uppercase">
        설치 유형
      </div>
      <h2 class="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-6 uppercase">
        최적화된 <span class="text-[#155dfc]">설치 솔루션</span>
      </h2>
      <p class="text-slate-500 text-lg md:text-xl font-medium tracking-tight">공간의 가치를 높이는 냉난방 설계</p>
    </header>

    <div class="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
      
      <div class="w-full lg:w-[260px] flex flex-col gap-3 md:gap-4 shrink-0">
        <div class="flex lg:flex-col gap-2 overflow-x-auto pb-1 lg:pb-0 no-scrollbar">
          <button @click="selectedMain = '가정용'"
            class="flex-shrink-0 lg:w-full flex items-center gap-3 px-5 py-3 md:px-6 md:py-5 rounded-xl md:rounded-[1.5rem] border-2 transition-all"
            :class="selectedMain === '가정용' ? 'border-[#155dfc] bg-blue-50/40 shadow-sm' : 'border-slate-100 bg-white hover:border-slate-200'">
            <div class="p-1.5 md:p-3 rounded-lg md:rounded-xl transition-colors"
              :class="selectedMain === '가정용' ? 'bg-[#155dfc] text-white' : 'bg-slate-50 text-slate-400'">
              <Home class="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <span class="font-bold text-sm md:text-lg">가정용</span>
          </button>

          <div class="flex-shrink-0 lg:w-full rounded-xl md:rounded-[1.5rem] border-2 transition-all overflow-hidden"
            :class="selectedMain === '업소용' ? 'border-[#155dfc] bg-blue-50/40 shadow-sm' : 'border-slate-100 bg-white hover:border-slate-200'">
            <button @click="selectedMain = '업소용'" class="w-full flex items-center gap-3 px-5 py-3 md:px-6 md:py-5 text-left font-bold">
              <div class="p-1.5 md:p-3 rounded-lg md:rounded-xl transition-colors"
                :class="selectedMain === '업소용' ? 'bg-[#155dfc] text-white' : 'bg-slate-50 text-slate-400'">
                <Building2 class="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <span class="font-bold text-sm md:text-lg">업소용</span>
            </button>
            
            <div v-if="selectedMain === '업소용'" class="hidden lg:block px-5 pb-5">
              <div class="bg-slate-200/50 p-1.5 rounded-xl flex w-full border border-slate-200/40 font-bold">
                <button v-for="sub in (['stand', 'ceiling'] as SubCategory[])" :key="sub" @click.stop="selectedSub = sub"
                  class="flex-1 py-2 rounded-lg text-sm transition-all"
                  :class="selectedSub === sub ? 'bg-white text-[#155dfc] shadow-sm' : 'text-slate-500'">
                  {{ sub === 'stand' ? '스탠드' : '천정형' }}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div v-if="selectedMain === '업소용'" class="lg:hidden flex gap-2 p-1.5 bg-slate-100 rounded-xl">
          <button v-for="sub in (['stand', 'ceiling'] as SubCategory[])" :key="sub" @click="selectedSub = sub"
            class="flex-1 py-2 rounded-lg text-sm font-bold transition-all"
            :class="selectedSub === sub ? 'bg-white text-[#155dfc] shadow-sm' : 'text-slate-500'">
            {{ sub === 'stand' ? '스탠드형' : '천정형' }}
          </button>
        </div>
      </div>

      <div class="flex-1 w-full space-y-6">
        
        <div :key="`info-${selectedMain}-${selectedSub}`"
          class="relative bg-slate-900 rounded-[2rem] md:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[300px] md:min-h-[400px] animate-in fade-in zoom-in-95 group">
          
          <div class="absolute inset-0 z-0 overflow-hidden shrink-0 md:relative md:w-[35%] lg:w-[30%]">
            <div class="w-full h-full bg-slate-800 flex items-center justify-center transition-transform duration-700 group-hover:scale-110">
               <component :is="currentContent.icon" class="w-24 h-24 md:w-32 md:h-32 text-white/10" />
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent md:hidden"></div>
          </div>

          <div class="relative z-10 p-8 md:p-12 lg:p-16 flex-1 flex flex-col justify-center">
            <div class="space-y-6 md:space-y-10 text-white">
              <div class="space-y-3 md:space-y-5">
                <span class="inline-block px-4 py-1.5 rounded-full text-[10px] md:text-xs font-black uppercase border tracking-widest bg-white/10 border-white/20">
                  {{ selectedMain }}
                  <template v-if="selectedMain === '업소용'">
                    <span class="mx-1 opacity-50">|</span>
                    {{ selectedSub === 'stand' ? '스탠드형' : '천정형' }}
                  </template>
                </span>
                <h3 class="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                  {{ currentContent.title }}
                </h3>
                <p class="text-slate-400 text-sm md:text-xl leading-relaxed font-medium max-w-xl">
                  {{ currentContent.desc }}
                </p>
              </div>

              <div class="pt-4">
                <a href="tel:010-3294-3286" class="flex md:inline-flex items-center justify-center gap-3 w-full md:w-auto px-8 py-5 bg-[#155dfc] text-white rounded-2xl text-lg md:text-xl font-black hover:bg-blue-600 transition-all shadow-xl active:scale-95 group/btn">
                  지금 바로 상담하기
                  <ArrowRight class="w-5 h-5 md:w-6 md:h-6 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
          <Calculator class="absolute -right-12 -bottom-12 w-64 h-64 text-white/[0.03] -rotate-12 pointer-events-none" />
        </div>

        <div :key="`list-${selectedMain}-${selectedSub}`"
          class="bg-slate-50/50 border border-slate-100 rounded-[2rem] p-6 md:p-10 animate-in fade-in slide-in-from-bottom-4">
          <h4 class="text-base md:text-xl font-black flex items-center gap-2.5 mb-8 text-slate-900 tracking-tight">
            <ShoppingCart class="w-5 h-5 md:w-6 md:h-6 text-[#155dfc]" /> 
            추천 라인업
          </h4>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="product in filteredProducts" :key="product.id" 
              class="group flex flex-col bg-white rounded-[1.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              
              <div class="relative aspect-square overflow-hidden bg-slate-200">
                <img 
                  :src="product.image" 
                  :alt="product.name" 
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div class="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>

              <div class="p-6 text-center">
                <h5 class="font-black text-lg md:text-xl text-slate-900 leading-tight group-hover:text-[#155dfc] transition-colors">
                  {{ product.name }}
                </h5>
                <p class="mt-2 text-slate-400 text-sm font-medium">상세 모델 상담 가능</p>
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

.animate-in { animation-duration: 0.8s; animation-fill-mode: forwards; }
@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes zoom-in-95 { from { transform: scale(0.98); opacity: 0; } to { transform: scale(1); opacity: 1; } }
@keyframes slide-in-bottom { 
  from { transform: translateY(20px); opacity: 0; } 
  to { transform: translateY(0); opacity: 1; } 
}

.fade-in { animation-name: fade-in; }
.zoom-in-95 { animation-name: zoom-in-95; }
.slide-in-from-bottom-4 { animation-name: slide-in-bottom; }

.tracking-tight { letter-spacing: -0.02em; }
</style>