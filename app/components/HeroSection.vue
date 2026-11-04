<script setup lang="ts">
import { clinic } from '#shared/clinic'

const panel = ref<HTMLElement | null>(null)

// Parallax leve seguindo o mouse (só desktop, respeita reduced motion)
let raf = 0
const onMove = (e: PointerEvent) => {
  if (!panel.value || e.pointerType !== 'mouse') return
  const r = panel.value.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width - 0.5
  const y = (e.clientY - r.top) / r.height - 0.5
  cancelAnimationFrame(raf)
  raf = requestAnimationFrame(() => {
    panel.value?.style.setProperty('--mx', x.toFixed(3))
    panel.value?.style.setProperty('--my', y.toFixed(3))
  })
}
const onLeave = () => {
  panel.value?.style.setProperty('--mx', '0')
  panel.value?.style.setProperty('--my', '0')
}
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  panel.value?.addEventListener('pointermove', onMove)
  panel.value?.addEventListener('pointerleave', onLeave)
})
onBeforeUnmount(() => {
  panel.value?.removeEventListener('pointermove', onMove)
  panel.value?.removeEventListener('pointerleave', onLeave)
})
</script>

<template>
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero__bg" aria-hidden="true" />
    <div class="container hero__grid">
      <div class="hero__copy">
        <h1 id="hero-title" class="hero__title">
          <span v-reveal class="eyebrow hero__kicker">Dentista em Balneário Barra do Sul · SC</span>
          <span v-reveal="80" class="hero__headline">
            Cuidar do sorriso perto de casa e <span class="tarja">sem medo</span> da cadeira do dentista
          </span>
        </h1>
        <p v-reveal="160" class="lead hero__lead">
          Aparelho, facetas, canal, implante e limpeza com a Dra. Marcela Guimarães e o Dr. Jhuan Prado. Manda uma
          mensagem no WhatsApp e a equipe te passa o primeiro horário livre.
        </p>
        <div v-reveal="240" class="hero__ctas">
          <a :href="whatsappLink()" target="_blank" rel="noopener" class="btn btn--wa" @click="trackLead('hero')">
            <AppIcon name="whatsapp" />
            Agendar pelo WhatsApp
          </a>
          <NuxtLink to="/#tratamentos" class="btn btn--ghost">
            Ver tratamentos
            <AppIcon name="arrow" />
          </NuxtLink>
        </div>
        <div v-reveal="320" class="hero__proof">
          <a :href="clinic.mapsCid" target="_blank" rel="noopener" class="hero__rating">
            <span class="hero__stars" aria-hidden="true">
              <AppIcon v-for="i in 5" :key="i" name="star" size="16" />
            </span>
            <strong>{{ clinic.rating.value.toFixed(1).replace('.', ',') }}</strong>
            <span>{{ clinic.rating.count }} avaliações no Google</span>
          </a>
          <OpenStatus />
        </div>
      </div>

      <div ref="panel" v-reveal:scale="120" class="hero__panel">
        <div class="hero__panel-bg" aria-hidden="true">
          <WaveLines class="hero__waves" />
          <div class="hero__pattern" />
        </div>

        <div class="layer layer--tooth" aria-hidden="true">
          <svg class="hero__tooth" viewBox="0 0 64 64">
            <defs>
              <linearGradient id="hero-tooth" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stop-color="#ffffff" />
                <stop offset="1" stop-color="#dcf0fd" />
              </linearGradient>
            </defs>
            <path
              d="M22.4 11.5c-6.2 0-10.4 4.4-10.4 11.1 0 4.4 1.5 7.7 3.1 11.5 1.8 4.5 2 9.3 2.9 13.3.7 3.4 2.2 5.3 4 5.3 2.4 0 3.3-3.1 4-6.8.7-3.4 1.7-6.6 6-6.6s5.3 3.2 6 6.6c.7 3.7 1.6 6.8 4 6.8 1.8 0 3.3-1.9 4-5.3.9-4 1.1-8.8 2.9-13.3 1.6-3.8 3.1-7.1 3.1-11.5 0-6.7-4.2-11.1-10.4-11.1-4 0-6.2 1.8-9.6 1.8s-5.6-1.8-9.6-1.8Z"
              fill="url(#hero-tooth)"
            />
            <path
              d="M15.5 27.5c4.2-3.6 8.6-3.6 12.6-1.3 4.4 2.5 8.6 2.6 13 .2 2.6-1.4 4.8-1.6 7.4-.6"
              fill="none"
              stroke="#1560d6"
              stroke-width="2.6"
              stroke-linecap="round"
            />
            <path
              d="M17 32.4c3.6-2.4 7.4-2.3 11-.4 3.8 2 7.6 2 11.4.1 2.4-1.2 4.6-1.4 7-.6"
              fill="none"
              stroke="#0a1e4d"
              stroke-width="1.2"
              stroke-linecap="round"
            />
          </svg>
          <div class="hero__wordmark">
            <span><b>Ideal</b>Dent</span>
            <small>Odontologia</small>
          </div>
        </div>

        <!-- Card "Lembrete", referência ao post da clínica -->
        <div class="layer layer--a card card--note" aria-hidden="true">
          <span class="card__icon"><AppIcon name="tooth" size="20" /></span>
          <div>
            <strong>Lembrete</strong>
            <p>Não esqueça de escovar os dentes!</p>
          </div>
          <span class="card__ok">OK</span>
        </div>

        <div class="layer layer--b card card--rating">
          <div class="card__rating-top">
            <strong>4,9</strong>
            <span class="card__stars" aria-hidden="true"><AppIcon v-for="i in 5" :key="i" name="star" size="14" /></span>
          </div>
          <p class="card__quote">“sem dor, sem traumas!”</p>
          <span class="card__meta">Fernanda, no Google</span>
        </div>

        <div class="layer layer--c chip" aria-hidden="true">
          <AppIcon name="aligner" size="18" /> Aparelho transparente
        </div>
        <div class="layer layer--d chip chip--navy" aria-hidden="true">
          <AppIcon name="root" size="18" /> Tratamento de canal
        </div>

        <div class="layer layer--e bubble" aria-hidden="true">
          <span>Oi! Quero marcar uma avaliação</span>
          <small>
            agora
            <AppIcon name="check" size="14" />
          </small>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  padding-top: calc(var(--header-h) + clamp(32px, 6vw, 72px));
  padding-bottom: clamp(56px, 8vw, 96px);
  overflow: hidden;
}
.hero__bg {
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    radial-gradient(700px 420px at 8% 20%, var(--sky-100), transparent 70%),
    linear-gradient(180deg, var(--sky-50) 0%, var(--white) 85%);
}
.hero__grid {
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  gap: clamp(32px, 5vw, 72px);
  align-items: center;
}
.hero__title {
  font-size: clamp(2.2rem, 4.4vw, 3.6rem);
  font-weight: 800;
  line-height: 1.1;
}
.hero__kicker,
.hero__headline {
  display: block;
}
.hero__kicker {
  display: flex;
  line-height: 1.4;
  letter-spacing: 0.16em;
}
.hero__title .tarja {
  white-space: nowrap;
}
.hero__lead {
  max-width: 560px;
}
.hero__ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 32px;
}
.hero__proof {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 14px 28px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid var(--line);
}
.hero__rating {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  color: var(--ink-soft);
  transition: color 0.2s;
}
.hero__rating:hover {
  color: var(--blue-600);
}
.hero__rating strong {
  font-family: var(--font-display);
  font-size: 1.15rem;
  color: var(--navy-900);
}
.hero__stars,
.card__stars {
  display: inline-flex;
  color: #f5b301;
}

/* ---------- painel ---------- */
.hero__panel {
  --mx: 0;
  --my: 0;
  position: relative;
  aspect-ratio: 1 / 1.02;
  border-radius: var(--radius-xl);
  isolation: isolate;
  box-shadow: var(--shadow-lg);
}
.hero__panel-bg {
  position: absolute;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  border-radius: inherit;
  background:
    radial-gradient(60% 50% at 70% 20%, rgb(143 205 247 / 0.8), transparent 70%),
    radial-gradient(70% 60% at 20% 100%, var(--navy-800), transparent 70%),
    linear-gradient(150deg, var(--blue-500), var(--blue-700) 55%, var(--navy-800));
}
.hero__waves {
  position: absolute;
  inset: 30% -10% auto;
  height: 60%;
  width: 120%;
  opacity: 0.28;
}
.hero__pattern {
  position: absolute;
  inset: 0;
  opacity: 0.09;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='72' height='72' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='1'%3E%3Cpath d='M7.6 3.2c-2.7 0-4.6 2-4.6 5 0 2 .7 3.5 1.4 5.2.8 2 .9 4.2 1.3 6 .3 1.6 1 2.4 1.8 2.4 1.1 0 1.5-1.4 1.8-3.1.3-1.5.8-3 2.7-3s2.4 1.5 2.7 3c.3 1.7.7 3.1 1.8 3.1.8 0 1.5-.8 1.8-2.4.4-1.8.5-4 1.3-6 .7-1.7 1.4-3.2 1.4-5.2 0-3-1.9-5-4.6-5-1.8 0-2.8.8-4.4.8s-2.6-.8-4.4-.8Z' transform='scale(.6) translate(8 8)'/%3E%3C/svg%3E");
  background-size: 72px 72px;
  mask-image: radial-gradient(circle at 50% 40%, #000 30%, transparent 75%);
}

.layer {
  position: absolute;
  transition: transform 0.6s var(--ease-out);
}
.layer--tooth {
  inset: 14% 18% 16%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: translate3d(calc(var(--mx) * -18px), calc(var(--my) * -18px), 0);
}
.hero__tooth {
  width: 72%;
  filter: drop-shadow(0 30px 40px rgb(6 18 56 / 0.45));
  animation: float 6s ease-in-out infinite;
}
.hero__wordmark {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4%;
  color: var(--white);
  font-family: var(--font-display);
  line-height: 1;
}
.hero__wordmark span {
  font-weight: 800;
  font-size: clamp(1.4rem, 2.6vw, 2.1rem);
  letter-spacing: -0.03em;
  color: var(--sky-200);
}
.hero__wordmark b {
  color: var(--white);
}
.hero__wordmark small {
  margin-top: 6px;
  font-size: clamp(0.55rem, 0.9vw, 0.72rem);
  font-weight: 600;
  letter-spacing: 0.5em;
  text-transform: uppercase;
  color: var(--sky-200);
}

.card {
  background: rgb(255 255 255 / 0.96);
  border-radius: var(--radius);
  box-shadow: var(--shadow-lg);
  color: var(--ink);
}
.card--note {
  top: 7%;
  left: -6%;
  display: flex;
  align-items: center;
  gap: 12px;
  width: min(300px, 62%);
  padding: 14px 16px;
  transform: translate3d(calc(var(--mx) * 26px), calc(var(--my) * 26px), 0);
}
.card--note strong {
  font-family: var(--font-display);
  font-size: 0.9rem;
  color: var(--blue-600);
}
.card--note p {
  font-size: 0.84rem;
  line-height: 1.35;
  color: var(--ink-soft);
}
.card__icon {
  display: grid;
  place-items: center;
  flex: none;
  width: 38px;
  height: 38px;
  border-radius: 12px;
  background: var(--sky-100);
  color: var(--blue-600);
}
.card__ok {
  margin-left: auto;
  padding: 6px 10px;
  border-radius: 8px;
  background: var(--sky-50);
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 0.75rem;
  color: var(--blue-700);
}
.card--rating {
  left: -8%;
  bottom: 12%;
  width: min(220px, 48%);
  padding: 16px 18px;
  transform: translate3d(calc(var(--mx) * 34px), calc(var(--my) * 34px), 0) rotate(-3deg);
}
.card__rating-top {
  display: flex;
  align-items: center;
  gap: 10px;
}
.card__rating-top strong {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 2rem;
  line-height: 1;
  color: var(--navy-900);
}
.card__quote {
  margin-top: 8px;
  font-size: 0.92rem;
  font-style: italic;
  color: var(--ink-soft);
}
.card__meta {
  font-size: 0.76rem;
  color: var(--ink-mute);
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 999px;
  background: var(--white);
  color: var(--blue-700);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.85rem;
  white-space: nowrap;
  box-shadow: var(--shadow);
}
.chip--navy {
  background: var(--navy-900);
  color: var(--white);
}
.layer--c {
  top: 30%;
  right: -5%;
  --rot: 4deg;
  transform: translate3d(calc(var(--mx) * 40px), calc(var(--my) * 40px), 0) rotate(4deg);
}
.layer--d {
  top: 47%;
  right: 4%;
  transform: translate3d(calc(var(--mx) * 22px), calc(var(--my) * 22px), 0) rotate(-3deg);
}
.bubble {
  right: -4%;
  bottom: 6%;
  display: flex;
  flex-direction: column;
  gap: 2px;
  max-width: 240px;
  padding: 12px 14px 8px;
  border-radius: 18px 18px 4px 18px;
  background: #dcf8c6;
  color: #0b2a14;
  font-size: 0.9rem;
  font-weight: 500;
  box-shadow: var(--shadow-lg);
  transform: translate3d(calc(var(--mx) * 30px), calc(var(--my) * 30px), 0);
}
.bubble small {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  align-self: flex-end;
  font-size: 0.7rem;
  color: #4f7d5c;
}
.bubble small svg {
  color: #34b7f1;
}

/* Animação ligada ao scroll: o painel inclina e o dente sobe enquanto a página desce */
@supports (animation-timeline: scroll()) {
  @media (prefers-reduced-motion: no-preference) {
    .hero__panel-bg {
      animation: hero-tilt linear both;
      animation-timeline: scroll(root);
      animation-range: 0 70vh;
    }
    .hero__wordmark {
      animation: hero-rise linear both;
      animation-timeline: scroll(root);
      animation-range: 0 60vh;
    }
  }
}
@keyframes hero-tilt {
  to {
    transform: scale(0.96) rotate(-1.5deg);
    border-radius: 56px;
  }
}
@keyframes hero-rise {
  to {
    transform: translateY(-30px);
    opacity: 0.2;
  }
}

@media (max-width: 960px) {
  .hero__grid {
    grid-template-columns: 1fr;
  }
  .hero__panel {
    max-width: 520px;
    width: 100%;
    margin-inline: auto;
  }
}
@media (max-width: 560px) {
  .hero__title .tarja {
    white-space: normal;
  }
  .hero__ctas .btn {
    flex: 1 1 100%;
  }
  .hero__panel {
    width: calc(100% - 24px);
  }
  .card--note,
  .layer--d,
  .bubble {
    display: none;
  }
  .hero__panel {
    aspect-ratio: 1 / 0.95;
  }
  .card--rating {
    left: -3%;
    bottom: 6%;
    width: 46%;
    padding: 12px 14px;
  }
  .card__rating-top strong {
    font-size: 1.5rem;
  }
  .layer--c {
    top: 8%;
  }
  .layer--c {
    right: -3%;
  }
  .bubble {
    right: -3%;
    max-width: 200px;
    font-size: 0.82rem;
  }
  .chip {
    font-size: 0.75rem;
    padding: 8px 12px;
  }
}
</style>
