<template>
  <div class="relative flex justify-center items-center h-[180px] w-full md:h-[300px]">
    <div 
      class="relative w-[320px] h-[85px] bg-white border-4 border-slate-100 rounded-lg shadow-xl z-10 flex flex-col justify-between p-2 transition-transform duration-500 ease-out preserve-3d"
      :style="{ transform: active ? 'rotateX(-8deg)' : 'rotateX(0deg)' }"
    >
      <div class="w-full h-1 bg-slate-50 rounded-full"></div>
      
      <div class="flex justify-between items-end px-1">
        <div class="flex items-center gap-1.5 mb-1 ml-1">
          <div 
            v-if="active"
            class="w-2 h-2 bg-[#155dfc] rounded-full opacity-60 animate-pulse"
          ></div>
        </div>
        <div class="w-16 h-1.5 bg-slate-100 rounded-full mb-1"></div>
      </div>
      
      <div 
        class="absolute left-[4%] right-[4%] -bottom-2 h-3.5 bg-white border-x border-b border-slate-200 rounded-b-xl shadow-sm origin-top transition-transform duration-700 ease-in-out"
        :style="{ 
          transform: active ? 'rotateX(75deg)' : 'rotateX(0deg)',
          zIndex: -1 
        }"
      ></div>
    </div>

    <div 
      class="absolute top-[60%] left-0 right-0 h-[180px] pointer-events-none transition-opacity duration-1000"
      :class="active ? 'opacity-100' : 'opacity-0'"
    >
      <div 
        v-for="n in 5" :key="n" 
        :class="`wind-line line-${n}`"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  active: boolean;
}
defineProps<Props>();
</script>

<style scoped>
.preserve-3d {
  transform-style: preserve-3d;
  perspective: 1000px;
  animation: floating 4s ease-in-out infinite;
}

.wind-line {
  position: absolute;
  background: linear-gradient(to bottom, rgba(21, 93, 252, 0.3), transparent);
  width: 2.5px;
  border-radius: 9999px;
  opacity: 0;
  animation: wind-flow 1.2s infinite ease-in;
}

@keyframes wind-flow {
  0% { transform: translateY(0) scaleY(0); opacity: 0; }
  20% { opacity: 0.6; transform: translateY(10px) scaleY(1.3); }
  100% { transform: translateY(130px) scaleY(0.3); opacity: 0; }
}

.line-1 { left: 25%; height: 40px; animation-delay: 0s; }
.line-2 { left: 38%; height: 60px; animation-delay: 0.4s; }
.line-3 { left: 50%; height: 50px; animation-delay: 0.8s; }
.line-4 { left: 62%; height: 45px; animation-delay: 0.2s; }
.line-5 { left: 75%; height: 55px; animation-delay: 0.6s; }

@keyframes floating {
  0%, 100% { transform: translateY(0) rotateX(var(--tw-rotate-x, -8deg)); }
  50% { transform: translateY(-6px) rotateX(var(--tw-rotate-x, -8deg)); }
}
</style>