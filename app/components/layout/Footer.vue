<template>
  <footer class="bg-muted/30 border-t antialiased">
    <div class="mx-auto max-w-[1236px] px-4 md:px-12 py-12 md:py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        <div class="space-y-6">
          <NuxtImg src="/image/logo.svg" class="h-10 w-auto grayscale opacity-70" />
          <p class="text-muted-foreground text-sm leading-relaxed max-w-xs">
            20년 경력의 냉난방 전문 엔지니어 그룹.<br />
            정직한 시공과 확실한 사후관리를 약속드립니다.
          </p>
          <div class="flex gap-4 text-muted-foreground">
            </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div class="space-y-4">
            <h4 class="font-bold text-sm uppercase tracking-wider text-foreground">Contact</h4>
            <ul class="space-y-2 text-sm text-muted-foreground">
              <li>Tel. 053-267-0914</li>
              <li>H.P. 010-3294-3286</li>
              <li>Email. hash3286@naver.com</li>
            </ul>
          </div>
          <div class="space-y-4">
            <h4 class="font-bold text-sm uppercase tracking-wider text-foreground">Company</h4>
            <ul class="space-y-2 text-sm text-muted-foreground font-light">
              <li>조양냉난방시스템</li>
              <li>대표자: 하세훈</li>
              <li>사업자번호: 000-00-00000</li>
              <li>주소: 대구광역시 서구 원대3가 1830-5</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between gap-4">
        <p class="text-xs text-muted-foreground">
          © 2025 조양냉난방시스템. All rights reserved.
        </p>
        <!-- <div class="flex gap-6">
          <a href="#" class="text-xs text-muted-foreground hover:text-foreground">이용약관</a>
          <a href="#" class="text-xs text-muted-foreground hover:text-foreground font-bold">개인정보처리방침</a>
        </div> -->
      </div>
    </div>
    
    <div class="h-16 md:hidden"></div>
  </footer>
</template>