<script setup lang="ts">
const visible = ref(false)

const onScroll = () => {
  visible.value = window.scrollY > 500
}
onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <a
    :href="whatsappLink()"
    target="_blank"
    rel="noopener"
    class="wa-float"
    :class="{ 'is-visible': visible }"
    aria-label="Agendar consulta pelo WhatsApp"
    @click="trackLead('botao_flutuante')"
  >
    <span class="wa-float__ring" aria-hidden="true" />
    <AppIcon name="whatsapp" size="30" />
    <span class="wa-float__label">Agende pelo WhatsApp</span>
  </a>
</template>

<style scoped>
.wa-float {
  position: fixed;
  right: max(18px, env(safe-area-inset-right));
  bottom: max(18px, env(safe-area-inset-bottom));
  z-index: 90;
  display: flex;
  align-items: center;
  gap: 10px;
  height: 62px;
  padding: 0 16px;
  border-radius: 999px;
  background: var(--wa);
  color: #06341b;
  font-family: var(--font-display);
  font-weight: 700;
  box-shadow: 0 16px 34px -10px rgb(18 140 74 / 0.65);
  opacity: 0;
  transform: translateY(30px) scale(0.8);
  pointer-events: none;
  transition:
    opacity 0.4s,
    transform 0.5s var(--ease-spring),
    box-shadow 0.3s;
}
.wa-float.is-visible {
  opacity: 1;
  transform: none;
  pointer-events: auto;
}
.wa-float:hover {
  box-shadow: 0 22px 44px -10px rgb(18 140 74 / 0.8);
}
.wa-float__ring {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: var(--wa);
  z-index: -1;
  animation: pulse-ring 2.4s var(--ease-out) infinite;
}
.wa-float__label {
  max-width: 0;
  overflow: hidden;
  white-space: nowrap;
  transition: max-width 0.5s var(--ease-out);
}
.wa-float:hover .wa-float__label,
.wa-float:focus-visible .wa-float__label {
  max-width: 220px;
}
</style>
