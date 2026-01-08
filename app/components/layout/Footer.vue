<script setup lang="ts">
import { Phone, Mail, MessageCircle, PhoneCall } from 'lucide-vue-next'
</script>

<template>
  <footer class="bg-muted/30 border-t antialiased">
    <div class="mx-auto max-w-[1236px] px-5 md:px-12 py-12 md:py-20">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        
        <div class="order-1 md:order-2">
          <div class="space-y-6">
            <h4 class="font-black text-lg text-foreground flex items-center gap-2">
              <span class="w-1.5 h-6 bg-[#155dfc] rounded-full inline-block"></span>
              빠른 상담
            </h4>
            
            <ul class="space-y-4">
              <li class="flex items-start gap-4 group">
                <div class="mt-1 p-2 bg-blue-50 text-[#155dfc] rounded-full group-hover:bg-[#155dfc] group-hover:text-white transition-colors">
                  <PhoneCall class="w-5 h-5" />
                </div>
                <div>
                  <span class="block text-sm font-bold text-muted-foreground mb-0.5">휴대전화</span>
                  <a href="tel:010-3294-3286" class="text-2xl font-black text-slate-800 hover:text-[#155dfc] transition-colors tracking-tight">
                    010-3294-3286
                  </a>
                </div>
              </li>

              <li class="flex items-center gap-4 text-slate-600">
                <div class="p-2 bg-slate-100 rounded-full">
                  <Phone class="w-4 h-4" />
                </div>
                <span class="text-base font-medium">전화: 053-267-0914</span>
              </li>

              <li class="flex flex-col gap-3 pt-2">
                <div class="flex items-center gap-4 text-slate-600 hover:text-slate-900 transition-colors">
                  <div class="p-2 bg-slate-100 rounded-full">
                    <Mail class="w-4 h-4" />
                  </div>
                  <span class="text-base font-medium">이메일: hash3286@naver.com</span>
                </div>
                <div class="flex items-center gap-4 text-slate-600 hover:text-slate-900 transition-colors">
                  <div class="p-2 bg-slate-100 rounded-full">
                    <MessageCircle class="w-4 h-4" />
                  </div>
                  <span class="text-base font-medium">카카오톡 ID: hash3286</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="order-2 md:order-1 flex flex-col justify-between h-full">
          <div class="space-y-5">
            <div class="group flex items-center gap-0.75 flex-shrink-0 cursor-pointer">
              <NuxtImg
                src="/logo.svg"
                alt="조양냉난방시스템"
                fetchpriority="high"
                loading="eager"
                :modifiers="{ format: 'original' }"
                class="h-11 w-auto grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
              />
              <span class="font-black text-lg md:text-xl tracking-tighter text-gray-500 group-hover:text-[#1d1d1f] transition-colors duration-300">
                냉난방시스템
              </span>
            </div>
            
            <div class="space-y-3">
              <!-- <h4 class="font-bold text-base text-slate-900 tracking-tight">조양냉난방시스템</h4> -->
              <ul class="text-sm md:text-[15px] text-muted-foreground space-y-1.5 leading-relaxed font-medium">
                <li>사업자 등록번호: 248-24-00710</li>
                <li>대표자: 하세훈</li>
                <li>41727 대구광역시 서구 옥산로 24</li>
              </ul>
            </div>
          </div>

          <div class="mt-10 md:mt-0">
            <p class="text-sm text-muted-foreground/60 font-medium">
              © 2025 조양냉난방시스템. All rights reserved.
            </p>
          </div>
        </div>

      </div>
    </div>
    
    <div class="h-20 md:hidden"></div>
  </footer>
</template>