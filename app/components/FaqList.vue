<script setup lang="ts">
import type { Faq } from '#shared/clinic'

const props = defineProps<{ items: Faq[] }>()
const open = ref<number | null>(0)
const uid = useId()
const toggle = (i: number) => (open.value = open.value === i ? null : i)
</script>

<template>
  <div class="faq">
    <div v-for="(f, i) in props.items" :key="f.q" v-reveal="Math.min(i, 5) * 60" class="faq__item" :class="{ 'is-open': open === i }">
      <h3>
        <button
          :id="`${uid}-q${i}`"
          type="button"
          class="faq__q"
          :aria-expanded="open === i"
          :aria-controls="`${uid}-a${i}`"
          @click="toggle(i)"
        >
          <span>{{ f.q }}</span>
          <span class="faq__icon" aria-hidden="true"><AppIcon name="plus" size="20" /></span>
        </button>
      </h3>
      <div :id="`${uid}-a${i}`" class="faq__a" role="region" :aria-labelledby="`${uid}-q${i}`">
        <div>
          <p>{{ f.a }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.faq {
  display: grid;
  gap: 12px;
}
.faq__item {
  border-radius: var(--radius);
  background: var(--white);
  box-shadow: inset 0 0 0 1px var(--line);
  transition:
    box-shadow 0.35s,
    background-color 0.35s;
}
.faq__item:hover {
  box-shadow: inset 0 0 0 1px var(--sky-200), var(--shadow-sm);
}
.faq__item.is-open {
  box-shadow: inset 0 0 0 2px var(--blue-600), var(--shadow);
}
.faq__item h3 {
  font-size: inherit;
}
.faq__q {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  width: 100%;
  padding: 22px 24px;
  border: 0;
  background: none;
  text-align: left;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.08rem;
  letter-spacing: -0.01em;
  color: var(--navy-900);
  cursor: pointer;
}
.faq__icon {
  display: grid;
  place-items: center;
  flex: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--sky-50);
  color: var(--blue-600);
  transition:
    transform 0.45s var(--ease-spring),
    background-color 0.3s,
    color 0.3s;
}
.faq__q:hover .faq__icon {
  background: var(--sky-100);
}
.is-open .faq__icon {
  transform: rotate(135deg);
  background: var(--blue-600);
  color: var(--white);
}
.faq__a {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.45s var(--ease-out);
}
.faq__a > div {
  overflow: hidden;
}
.is-open .faq__a {
  grid-template-rows: 1fr;
}
.faq__a p {
  padding: 0 24px 22px;
  color: var(--ink-soft);
}
</style>
