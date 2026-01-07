<script setup lang="ts">
const currentMenu = useState<string>('currentMenu')

watch(currentMenu, () => {
  if (import.meta.client) {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    })
  }
})
</script>

<template>
  <main class="w-full py-0 md:pb-10 pb-4 md:pb-10 min-h-[80vh] overflow-x-hidden">
    <Transition name="fade" mode="out-in">
      <div :key="currentMenu" class="content-wrapper">
        <section v-if="currentMenu === 'intro'" class="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <SectionIntro />
        </section>

        <section v-else-if="currentMenu === 'types'" class="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <SectionTypes />
        </section>
      </div>
    </Transition>
  </main>
</template>

<style scoped>
.content-wrapper {
  width: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.animate-in {
  animation-fill-mode: both;
}
</style>