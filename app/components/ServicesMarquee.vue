<script setup lang="ts">
import { services } from '#shared/services'
const items = [...services, ...services]
</script>

<template>
  <div class="marquee" aria-label="Tratamentos oferecidos">
    <div class="marquee__track">
      <NuxtLink
        v-for="(s, i) in items"
        :key="`${s.slug}-${i}`"
        :to="`/tratamentos/${s.slug}`"
        class="marquee__item"
        :tabindex="i >= services.length ? -1 : 0"
        :aria-hidden="i >= services.length ? 'true' : undefined"
      >
        <AppIcon :name="s.icon" size="22" />
        {{ s.name }}
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.marquee {
  position: relative;
  overflow: hidden;
  padding: 22px 0;
  background: var(--navy-900);
  width: 106%;
  margin-left: -3%;
  transform: rotate(-1.2deg);
  box-shadow: 0 20px 40px -20px rgb(6 18 56 / 0.5);
}
.marquee__track {
  display: flex;
  width: max-content;
  gap: 12px;
  animation: marquee 38s linear infinite;
}
.marquee:hover .marquee__track {
  animation-play-state: paused;
}
.marquee__item {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 10px 22px;
  border-radius: 999px;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--white);
  white-space: nowrap;
  transition:
    background-color 0.25s,
    color 0.25s;
}
.marquee__item svg {
  color: var(--sky-300);
}
.marquee__item:hover {
  background: var(--blue-600);
}
.marquee__item:hover svg {
  color: var(--white);
}
</style>
