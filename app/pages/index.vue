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
  <main class="mx-auto max-w-[1236px] px-4 md:px-12 py-6 md:py-10 min-h-[60vh]">
    <Transition name="fade" mode="out-in">
      <div :key="currentMenu">
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>