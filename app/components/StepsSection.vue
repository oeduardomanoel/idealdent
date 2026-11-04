<script setup lang="ts">
const steps = [
  {
    title: 'Você chama no WhatsApp',
    text: 'Conta o que está sentindo ou o que quer mudar no sorriso. Pode ser por texto, áudio ou foto, do jeito que for mais fácil.',
    icon: 'chat'
  },
  {
    title: 'Avaliação no consultório',
    text: 'O dentista examina, explica o que está acontecendo e responde as suas dúvidas com calma.',
    icon: 'tooth'
  },
  {
    title: 'Plano e orçamento antes de começar',
    text: 'Você recebe o que precisa ser feito, em que ordem e quanto custa. Só começa quando estiver tudo claro.',
    icon: 'wallet'
  },
  {
    title: 'Tratamento no seu horário',
    text: 'As sessões são marcadas de segunda a sexta até as 19h, ou no sábado de manhã.',
    icon: 'calendar'
  }
]

const root = ref<HTMLElement | null>(null)
const progress = ref(0)
const active = ref(0)

let raf = 0
const update = () => {
  if (!root.value) return
  const r = root.value.getBoundingClientRect()
  const vh = window.innerHeight
  const p = Math.min(1, Math.max(0, (vh * 0.6 - r.top) / r.height))
  progress.value = p
  active.value = Math.min(steps.length - 1, Math.floor(p * steps.length * 1.02))
}
const onScroll = () => {
  cancelAnimationFrame(raf)
  raf = requestAnimationFrame(update)
}
onMounted(() => {
  update()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})
</script>

<template>
  <section class="section steps" aria-labelledby="steps-title">
    <div class="container steps__grid">
      <div class="steps__sticky">
        <p v-reveal class="eyebrow">Primeira consulta</p>
        <h2 id="steps-title" v-reveal="80" class="h2">Como é marcar e começar o tratamento</h2>
        <p v-reveal="160" class="lead">
          Quatro passos, do primeiro “oi” até a cadeira. E tudo começa pelo celular.
        </p>
        <a
          v-reveal="240"
          :href="whatsappLink()"
          target="_blank"
          rel="noopener"
          class="btn btn--wa steps__cta"
          @click="trackLead('passos')"
        >
          <AppIcon name="whatsapp" />
          Dar o primeiro passo
        </a>
      </div>

      <div ref="root" class="steps__wrap" :style="{ '--p': progress }">
        <span class="steps__rail" aria-hidden="true"><span class="steps__fill" /></span>
        <ol class="steps__list">
        <li v-for="(s, i) in steps" :key="s.title" class="step" :class="{ 'is-active': i <= active }">
          <span class="step__dot" aria-hidden="true">
            <AppIcon :name="s.icon" size="24" />
          </span>
          <div class="step__body">
            <span class="step__num">Passo {{ i + 1 }}</span>
            <h3>{{ s.title }}</h3>
            <p>{{ s.text }}</p>
          </div>
        </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<style scoped>
.steps__grid {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: clamp(40px, 6vw, 96px);
  align-items: start;
}
.steps__sticky {
  position: sticky;
  top: calc(var(--header-h) + 40px);
}
.steps__cta {
  margin-top: 32px;
}
.steps__wrap {
  --p: 0;
  position: relative;
}
.steps__list {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 28px;
}
.steps__rail {
  position: absolute;
  top: 30px;
  bottom: 30px;
  left: 31px;
  width: 3px;
  border-radius: 3px;
  background: var(--line);
  overflow: hidden;
}
.steps__fill {
  position: absolute;
  inset: 0;
  background: linear-gradient(var(--blue-400), var(--blue-700));
  transform-origin: top;
  transform: scaleY(var(--p));
}
.step {
  position: relative;
  display: flex;
  gap: 24px;
  padding: 8px 0;
}
.step__dot {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  flex: none;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--white);
  color: var(--ink-mute);
  box-shadow: inset 0 0 0 2px var(--line);
  transition:
    background-color 0.5s,
    color 0.5s,
    box-shadow 0.5s,
    transform 0.6s var(--ease-spring);
}
.step.is-active .step__dot {
  background: var(--blue-600);
  color: var(--white);
  box-shadow: var(--shadow-blue);
  transform: scale(1.06);
}
.step__body {
  flex: 1;
  padding: 22px 26px;
  border-radius: var(--radius-lg);
  background: var(--white);
  box-shadow: inset 0 0 0 1px var(--line);
  opacity: 0.55;
  transform: translateY(10px);
  transition:
    opacity 0.6s var(--ease-out),
    transform 0.6s var(--ease-out),
    box-shadow 0.4s;
}
.step.is-active .step__body {
  opacity: 1;
  transform: none;
  box-shadow: var(--shadow), inset 0 0 0 1px var(--sky-100);
}
.step__body:hover {
  box-shadow: var(--shadow-lg), inset 0 0 0 1px var(--sky-200);
}
.step__num {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--blue-600);
}
.step h3 {
  margin-top: 6px;
  font-size: 1.3rem;
  font-weight: 800;
}
.step p {
  margin-top: 8px;
  color: var(--ink-soft);
}
@media (max-width: 960px) {
  .steps__grid {
    grid-template-columns: 1fr;
  }
  .steps__sticky {
    position: static;
  }
}
@media (max-width: 560px) {
  .step {
    gap: 14px;
  }
  .step__dot {
    width: 48px;
    height: 48px;
  }
  .steps__rail {
    left: 23px;
  }
  .step__body {
    padding: 18px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .step__body {
    opacity: 1;
    transform: none;
  }
}
</style>
