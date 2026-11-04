<script setup lang="ts">
const points = [
  {
    icon: 'heart',
    title: 'Atenção de verdade',
    text: '“Super atencioso comigo”, escreveu o Adilson. A Marileia usou a mesma palavra.',
    source: 'Avaliações no Google'
  },
  {
    icon: 'shield',
    title: 'Sem dor, sem trauma',
    text: 'Quem chegou com medo ou com dor conta que saiu aliviado.',
    source: 'Fernanda e Adilson'
  },
  {
    icon: 'wallet',
    title: 'Preço que cabe',
    text: '“Ótimo preço, ótimo profissional.” Faça o orçamento e compare.',
    source: 'Paciente no Google'
  }
]
</script>

<template>
  <section class="section empathy" aria-labelledby="empathy-title">
    <div class="container empathy__grid">
      <div>
        <p v-reveal class="eyebrow">Medo de dentista</p>
        <h2 id="empathy-title" v-reveal="80" class="h2">
          Odeia ir ao dentista? <span class="text-blue">A Fernanda também odiava.</span>
        </h2>
        <figure v-reveal="160" class="empathy__quote">
          <svg class="empathy__marks" viewBox="0 0 48 36" aria-hidden="true">
            <path
              d="M0 36V22C0 9.8 6.3 2.4 18.8 0l2 5.2C13.6 7.4 10.4 11.6 10 18h9v18H0Zm27 0V22C27 9.8 33.3 2.4 45.8 0l2 5.2C40.6 7.4 37.4 11.6 37 18h9v18H27Z"
              fill="currentColor"
            />
          </svg>
          <blockquote>
            Eu não suporto ir ao dentista, mas fui, me surpreendi, o dr que me atendeu me trouxe uma paz, que no final deu
            tudo certo e meu problema foi resolvido, <mark>sem dor, sem traumas!</mark>
          </blockquote>
          <figcaption>Fernanda Andrade · avaliação no Google</figcaption>
        </figure>
      </div>

      <div class="empathy__side">
        <p v-reveal="120" class="empathy__intro">
          Ela não foi a única. Quem passou pela clínica escreve sobre as mesmas coisas:
        </p>
        <ul class="empathy__list">
          <li v-for="(p, i) in points" :key="p.title" v-reveal:right="180 + i * 110" class="empathy__item">
            <span class="empathy__icon"><AppIcon :name="p.icon" size="26" /></span>
            <div>
              <h3>{{ p.title }}</h3>
              <p>{{ p.text }}</p>
              <small>{{ p.source }}</small>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.empathy__grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: clamp(40px, 6vw, 96px);
  align-items: center;
}
.empathy__quote {
  position: relative;
  margin: 40px 0 0;
  padding: 36px 32px 28px;
  border-radius: var(--radius-lg);
  background: var(--sky-50);
  box-shadow: inset 0 0 0 1px var(--sky-100);
}
.empathy__marks {
  position: absolute;
  top: -18px;
  left: 28px;
  width: 52px;
  color: var(--blue-600);
}
.empathy__quote blockquote {
  margin: 0;
  font-size: clamp(1.1rem, 1.8vw, 1.3rem);
  line-height: 1.55;
  color: var(--navy-900);
}
.empathy__quote mark {
  background: linear-gradient(transparent 55%, var(--sky-200) 55%);
  color: inherit;
  font-weight: 700;
}
.empathy__quote figcaption {
  margin-top: 16px;
  font-size: 0.9rem;
  color: var(--ink-mute);
}
.empathy__intro {
  font-size: 1.15rem;
  color: var(--ink-soft);
  margin-bottom: 20px;
}
.empathy__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 14px;
}
.empathy__item {
  display: flex;
  gap: 18px;
  padding: 22px;
  border-radius: var(--radius);
  background: var(--white);
  box-shadow: var(--shadow-sm), inset 0 0 0 1px var(--line);
  transition:
    transform 0.4s var(--ease-spring),
    box-shadow 0.4s var(--ease-out);
}
.empathy__item:hover {
  transform: translateX(6px);
  box-shadow: var(--shadow), inset 0 0 0 1px var(--sky-200);
}
.empathy__icon {
  display: grid;
  place-items: center;
  flex: none;
  width: 54px;
  height: 54px;
  border-radius: 16px;
  background: linear-gradient(145deg, var(--blue-500), var(--blue-700));
  color: var(--white);
  box-shadow: var(--shadow-blue);
  transition: transform 0.4s var(--ease-spring);
}
.empathy__item:hover .empathy__icon {
  transform: rotate(-8deg) scale(1.06);
}
.empathy__item h3 {
  font-size: 1.15rem;
  font-weight: 700;
}
.empathy__item p {
  margin-top: 4px;
  color: var(--ink-soft);
}
.empathy__item small {
  display: block;
  margin-top: 6px;
  font-size: 0.8rem;
  color: var(--ink-mute);
}
@media (max-width: 960px) {
  .empathy__grid {
    grid-template-columns: 1fr;
  }
}
</style>
