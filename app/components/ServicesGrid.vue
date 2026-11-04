<script setup lang="ts">
import { services } from '#shared/services'

// Spotlight que segue o cursor dentro do card
const onMove = (e: PointerEvent) => {
  const el = e.currentTarget as HTMLElement
  const r = el.getBoundingClientRect()
  el.style.setProperty('--x', `${e.clientX - r.left}px`)
  el.style.setProperty('--y', `${e.clientY - r.top}px`)
}
</script>

<template>
  <section id="tratamentos" class="section bg-sky services" aria-labelledby="services-title">
    <div class="container">
      <div class="section-head services__head">
        <div>
          <p v-reveal class="eyebrow">Tratamentos</p>
          <h2 id="services-title" v-reveal="80" class="h2">
            Do aparelho ao implante, <span class="tarja">aqui mesmo</span> na Barra do Sul
          </h2>
        </div>
        <p v-reveal="160" class="lead">
          A clínica atende várias áreas da odontologia no mesmo consultório. Toque num tratamento para ver como funciona.
        </p>
      </div>

      <ul class="services__grid">
        <li v-for="(s, i) in services" :key="s.slug" v-reveal="(i % 4) * 90">
          <NuxtLink :to="`/tratamentos/${s.slug}`" class="svc" @pointermove="onMove">
            <span class="svc__num">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="svc__icon"><AppIcon :name="s.icon" size="30" /></span>
            <h3 class="svc__title">{{ s.name }}</h3>
            <p class="svc__text">{{ s.short }}</p>
            <span class="svc__more">
              Saiba mais
              <AppIcon name="arrow" size="18" />
            </span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.services__head {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 24px 48px;
  align-items: end;
  max-width: none;
}
.services__head .lead {
  margin-top: 0;
}
.services__grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}
.services__grid > li {
  display: flex;
}
.svc {
  --x: 50%;
  --y: 50%;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 300px;
  padding: 28px 24px 24px;
  border-radius: var(--radius-lg);
  background: var(--white);
  box-shadow: var(--shadow-sm), inset 0 0 0 1px var(--line);
  overflow: hidden;
  isolation: isolate;
  transition:
    transform 0.5s var(--ease-spring),
    box-shadow 0.5s var(--ease-out),
    color 0.4s;
}
.svc::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    radial-gradient(260px circle at var(--x) var(--y), rgb(143 205 247 / 0.55), transparent 60%),
    linear-gradient(155deg, var(--blue-600), var(--navy-800));
  opacity: 0;
  transition: opacity 0.45s var(--ease-out);
}
.svc:hover,
.svc:focus-visible {
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg);
  color: var(--white);
}
.svc:hover::before,
.svc:focus-visible::before {
  opacity: 1;
}
.svc__num {
  position: absolute;
  top: 22px;
  right: 24px;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 0.85rem;
  color: var(--ink-mute);
  transition: color 0.4s;
}
.svc__icon {
  display: grid;
  place-items: center;
  width: 62px;
  height: 62px;
  border-radius: 20px;
  background: var(--sky-50);
  color: var(--blue-600);
  box-shadow: inset 0 0 0 1px var(--sky-100);
  transition:
    transform 0.5s var(--ease-spring),
    background-color 0.4s,
    color 0.4s;
}
.svc__title {
  margin-top: 26px;
  font-size: 1.22rem;
  font-weight: 800;
  transition: color 0.4s;
}
.svc__text {
  margin-top: 10px;
  font-size: 0.96rem;
  line-height: 1.55;
  color: var(--ink-soft);
  transition: color 0.4s;
}
.svc__more {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: auto;
  padding-top: 22px;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.92rem;
  color: var(--blue-600);
  transition: color 0.4s;
}
.svc__more svg {
  transition: transform 0.4s var(--ease-spring);
}
.svc:hover .svc__icon {
  transform: rotate(-10deg) scale(1.08);
  background: rgb(255 255 255 / 0.16);
  color: var(--white);
}
.svc:hover .svc__title,
.svc:hover .svc__num {
  color: var(--white);
}
.svc:hover .svc__text {
  color: var(--sky-100);
}
.svc:hover .svc__more {
  color: var(--white);
}
.svc:hover .svc__more svg {
  transform: translateX(6px);
}

@media (max-width: 1080px) {
  .services__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 820px) {
  .services__head {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 560px) {
  .services__grid {
    grid-template-columns: 1fr;
  }
  .svc {
    min-height: 0;
  }
}
</style>
