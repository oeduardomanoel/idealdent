<script setup lang="ts">
import { services } from '#shared/services'

const props = withDefaults(defineProps<{ preset?: string }>(), { preset: '' })

const name = ref('')
const treatment = ref(props.preset)
const period = ref('')

const periods = ['De manhã', 'À tarde', 'No fim da tarde', 'Sábado de manhã']

const message = computed(() => {
  const parts = ['Olá! Vim pelo site da Ideal Dent.']
  if (name.value.trim()) parts.push(`Meu nome é ${name.value.trim()}.`)
  parts.push(
    treatment.value
      ? `Quero agendar uma avaliação para ${treatment.value.toLowerCase()}.`
      : 'Quero agendar uma avaliação.'
  )
  if (period.value) parts.push(`Prefiro horário ${period.value.toLowerCase()}.`)
  return parts.join(' ')
})

const submit = () => {
  trackLead('formulario', { treatment: treatment.value || 'nao_informado' })
  window.open(whatsappLink(message.value), '_blank', 'noopener')
}
</script>

<template>
  <section class="section cta" aria-labelledby="cta-title">
    <div class="container">
      <div v-reveal:scale class="cta__box bg-blue">
        <WaveLines class="cta__waves" />
        <div class="cta__copy">
          <h2 id="cta-title" class="h2">Faz tempo que você adia essa consulta?</h2>
          <p class="cta__lead">
            Preenche aqui e a mensagem já vai pronta pro WhatsApp da clínica. A equipe responde com os horários livres.
          </p>
          <ul class="cta__checks">
            <li><AppIcon name="check" size="18" /> Atendimento de segunda a sábado</li>
            <li><AppIcon name="check" size="18" /> Orçamento antes de começar</li>
            <li><AppIcon name="check" size="18" /> No Centro de Balneário Barra do Sul</li>
          </ul>
        </div>

        <form class="cta__form" @submit.prevent="submit">
          <label class="field">
            <span>Seu nome</span>
            <input v-model="name" type="text" name="nome" autocomplete="given-name" placeholder="Como podemos te chamar?" />
          </label>
          <label class="field">
            <span>O que você procura?</span>
            <select v-model="treatment" name="tratamento">
              <option value="">Ainda não sei, quero uma avaliação</option>
              <option v-for="s in services" :key="s.slug" :value="s.name">{{ s.name }}</option>
            </select>
          </label>
          <fieldset class="field">
            <legend>Melhor horário</legend>
            <div class="chips">
              <label v-for="p in periods" :key="p" class="chip-opt">
                <input v-model="period" type="radio" name="periodo" :value="p" />
                <span>{{ p }}</span>
              </label>
            </div>
          </fieldset>
          <button type="submit" class="btn btn--wa btn--block">
            <AppIcon name="whatsapp" />
            Enviar pelo WhatsApp
          </button>
          <p class="cta__note">Abre o WhatsApp com a mensagem pronta. Nada é enviado sem você confirmar.</p>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta__box {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(32px, 5vw, 64px);
  padding: clamp(32px, 6vw, 72px);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}
.cta__waves {
  position: absolute;
  inset: 20% -10% auto;
  width: 120%;
  height: 80%;
  opacity: 0.18;
  pointer-events: none;
}
.cta__copy,
.cta__form {
  position: relative;
}
.cta__lead {
  margin-top: 18px;
  font-size: 1.15rem;
  color: var(--sky-100);
}
.cta__checks {
  list-style: none;
  margin: 28px 0 0;
  padding: 0;
  display: grid;
  gap: 10px;
}
.cta__checks li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
}
.cta__checks svg {
  flex: none;
  padding: 3px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--wa);
  color: #06341b;
}
.cta__form {
  display: grid;
  gap: 16px;
  padding: 28px;
  border-radius: var(--radius-lg);
  background: var(--white);
  color: var(--ink);
  box-shadow: var(--shadow-lg);
}
.field {
  display: grid;
  gap: 8px;
  margin: 0;
  padding: 0;
  border: 0;
}
.field > span,
.field legend {
  padding: 0;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.88rem;
  color: var(--navy-900);
}
.field legend {
  margin-bottom: 8px;
}
.field input,
.field select {
  width: 100%;
  min-height: 52px;
  padding: 0 16px;
  border: 0;
  border-radius: 14px;
  background: var(--sky-50);
  box-shadow: inset 0 0 0 1.5px var(--line);
  font-size: 1rem;
  transition:
    box-shadow 0.25s,
    background-color 0.25s;
  appearance: none;
}
.field select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%231560d6' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  padding-right: 44px;
}
.field input:hover,
.field select:hover {
  box-shadow: inset 0 0 0 1.5px var(--sky-300);
}
.field input:focus,
.field select:focus {
  outline: none;
  background-color: var(--white);
  box-shadow: inset 0 0 0 2px var(--blue-600), 0 0 0 4px rgb(21 96 214 / 0.12);
}
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.chip-opt input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}
.chip-opt span {
  display: inline-block;
  padding: 9px 14px;
  border-radius: 999px;
  background: var(--sky-50);
  box-shadow: inset 0 0 0 1.5px var(--line);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--ink-soft);
  cursor: pointer;
  transition:
    background-color 0.2s,
    color 0.2s,
    box-shadow 0.2s,
    transform 0.3s var(--ease-spring);
}
.chip-opt span:hover {
  box-shadow: inset 0 0 0 1.5px var(--blue-400);
  transform: translateY(-1px);
}
.chip-opt input:checked + span {
  background: var(--blue-600);
  color: var(--white);
  box-shadow: none;
}
.chip-opt input:focus-visible + span {
  outline: 3px solid var(--blue-400);
  outline-offset: 2px;
}
.cta__note {
  font-size: 0.8rem;
  color: var(--ink-mute);
  text-align: center;
}
@media (max-width: 900px) {
  .cta__box {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 480px) {
  .cta__form {
    padding: 20px;
  }
}
</style>
