<template>
  <div class="space-y-20 py-10">
    <section class="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
      <div class="space-y-6 max-w-2xl">
        <h2 class="text-4xl md:text-6xl font-extrabold leading-[1.1] tracking-tighter text-foreground">
          Lorem, ipsum dolor<br />
          <span class="text-blue-600">sit amet consectetur adipisicing elit.</span>
        </h2>
        <p class="text-lg md:text-xl text-muted-foreground leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.<br class="hidden md:block" />
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
    </section>

    <section class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div v-for="(item, idx) in strengths" :key="idx" 
           class="group p-8 rounded-3xl border bg-card hover:border-blue-500 transition-all duration-300 shadow-sm">
        <div class="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
          <component :is="item.icon" class="w-6 h-6" />
        </div>
        <h3 class="text-xl font-bold mb-3">{{ item.title }}</h3>
        <p class="text-muted-foreground leading-relaxed">{{ item.desc }}</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ShieldCheck, Zap, PenTool } from 'lucide-vue-next'

const strengths = [
  { 
    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', 
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    icon: ShieldCheck 
  },
  { 
    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', 
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    icon: Zap 
  },
  { 
    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', 
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    icon: PenTool 
  }
]
</script>