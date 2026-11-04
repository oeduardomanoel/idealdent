<script setup lang="ts">
import { clinic, reviews } from '#shared/clinic'

const counter = ref<HTMLElement | null>(null)
const display = ref(clinic.rating.value.toFixed(1).replace('.', ','))

onMounted(() => {
  if (!counter.value || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  display.value = '0,0'
  const io = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const dur = 1400
      const tick = (t: number) => {
        const k = Math.min(1, (t - start) / dur)
        const eased = 1 - Math.pow(1 - k, 3)
        display.value = (clinic.rating.value * eased).toFixed(1).replace('.', ',')
        if (k < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    },
    { threshold: 0.4 }
  )
  io.observe(counter.value)
})
</script>

<template>
  <section id="avaliacoes" class="section bg-blue reviews" aria-labelledby="reviews-title">
    <WaveLines class="reviews__waves" />
    <div class="container reviews__grid">
      <div class="reviews__summary">
        <p v-reveal class="eyebrow reviews__eyebrow">Avaliações</p>
        <h2 id="reviews-title" v-reveal="80" class="h2">Quem já sentou na cadeira conta como foi</h2>
        <div ref="counter" v-reveal="160" class="reviews__score">
          <span class="reviews__number">{{ display }}</span>
          <div>
            <span class="reviews__stars" aria-hidden="true"><AppIcon v-for="i in 5" :key="i" name="star" size="22" /></span>
            <p>{{ clinic.rating.count }} avaliações no Google</p>
          </div>
        </div>
        <a v-reveal="220" :href="clinic.mapsCid" target="_blank" rel="noopener" class="btn btn--white">
          Ver no Google
          <AppIcon name="arrow-up-right" />
        </a>
      </div>

      <ul class="reviews__list">
        <li v-for="(r, i) in reviews" :key="i" v-reveal="(i % 2) * 120" class="review" :class="{ 'review--short': r.text.length < 90 }">
          <svg class="review__mark" viewBox="0 0 48 36" aria-hidden="true">
            <path d="M0 36V22C0 9.8 6.3 2.4 18.8 0l2 5.2C13.6 7.4 10.4 11.6 10 18h9v18H0Zm27 0V22C27 9.8 33.3 2.4 45.8 0l2 5.2C40.6 7.4 37.4 11.6 37 18h9v18H27Z" fill="currentColor" />
          </svg>
          <blockquote>{{ r.text }}</blockquote>
          <footer>
            <span class="review__avatar" aria-hidden="true">{{ r.author.charAt(0) }}</span>
            <span>
              <strong>{{ r.author }}</strong>
              <small>{{ r.badge ? `${r.badge} · ` : '' }}Google</small>
            </span>
          </footer>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.reviews {
  overflow: hidden;
}
.reviews__waves {
  position: absolute;
  inset: 10% -10% auto;
  width: 120%;
  height: 70%;
  opacity: 0.14;
  pointer-events: none;
}
.reviews__grid {
  position: relative;
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: clamp(40px, 6vw, 80px);
  align-items: start;
}
.reviews__summary {
  position: sticky;
  top: calc(var(--header-h) + 40px);
}
.reviews__eyebrow {
  color: var(--sky-300);
}
.reviews__score {
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 36px 0;
}
.reviews__number {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(4.5rem, 9vw, 7rem);
  line-height: 0.9;
  letter-spacing: -0.05em;
  font-variant-numeric: tabular-nums;
}
.review__mark {
  width: 28px;
  color: var(--sky-300);
  transition: color 0.4s;
}
.review:hover .review__mark {
  color: var(--blue-600);
}
.reviews__stars {
  display: inline-flex;
  gap: 2px;
  color: var(--sun);
}
.reviews__score p {
  margin-top: 6px;
  color: var(--sky-100);
}
.reviews__list {
  list-style: none;
  margin: 0;
  padding: 0;
  columns: 2;
  column-gap: 18px;
}
.review {
  break-inside: avoid;
  margin-bottom: 18px;
  padding: 24px;
  border-radius: var(--radius-lg);
  background: rgb(255 255 255 / 0.08);
  box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.16);
  backdrop-filter: blur(6px);
  transition:
    transform 0.5s var(--ease-spring),
    background-color 0.4s,
    box-shadow 0.4s;
}
.review:hover {
  transform: translateY(-6px) rotate(-0.6deg);
  background: var(--white);
  box-shadow: var(--shadow-lg);
}
.review blockquote {
  margin: 12px 0 0;
  color: var(--white);
  line-height: 1.6;
  transition: color 0.4s;
}
.review--short blockquote {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.15rem;
  line-height: 1.35;
}
.review:hover blockquote {
  color: var(--navy-900);
}
.review footer {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 18px;
}
.review__avatar {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: var(--sky-200);
  color: var(--navy-900);
  font-family: var(--font-display);
  font-weight: 800;
}
.review strong {
  display: block;
  font-size: 0.92rem;
  transition: color 0.4s;
}
.review small {
  font-size: 0.78rem;
  color: var(--sky-200);
  transition: color 0.4s;
}
.review:hover strong {
  color: var(--navy-900);
}
.review:hover small {
  color: var(--ink-mute);
}
@media (max-width: 960px) {
  .reviews__grid {
    grid-template-columns: 1fr;
  }
  .reviews__summary {
    position: static;
  }
}
@media (max-width: 620px) {
  .reviews__list {
    columns: 1;
  }
}
</style>
