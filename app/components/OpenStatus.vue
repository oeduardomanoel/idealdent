<script setup lang="ts">
import { clinic, fmtHour as fmt } from '#shared/clinic'

withDefaults(defineProps<{ light?: boolean }>(), { light: false })

const status = ref<{ open: boolean; text: string } | null>(null)

const toMin = (t: string) => {
  const [h, m] = t.split(':').map(Number)
  return h! * 60 + m!
}

function compute() {
  // Sempre no fuso da clínica, independente de onde a pessoa abre o site
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Sao_Paulo',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).formatToParts(new Date())
  const wd = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(parts.find((p) => p.type === 'weekday')!.value)
  const now = (Number(parts.find((p) => p.type === 'hour')!.value) % 24) * 60 + Number(parts.find((p) => p.type === 'minute')!.value)

  const today = clinic.hours.find((h) => (h.days as readonly number[]).includes(wd))
  if (today?.open && today.close && now >= toMin(today.open) && now < toMin(today.close)) {
    return { open: true, text: `Aberto agora · fecha às ${fmt(today.close)}` }
  }
  // Próxima abertura
  for (let i = 0; i < 7; i++) {
    const d = (wd + i) % 7
    const h = clinic.hours.find((x) => (x.days as readonly number[]).includes(d))
    if (!h?.open) continue
    if (i === 0 && now >= toMin(h.open)) continue
    const when = i === 0 ? 'hoje' : i === 1 ? 'amanhã' : ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'][d]
    return { open: false, text: `Fechado · abre ${when} às ${fmt(h.open)}` }
  }
  return { open: false, text: 'Fechado agora' }
}

onMounted(() => {
  status.value = compute()
  const t = setInterval(() => (status.value = compute()), 60_000)
  onBeforeUnmount(() => clearInterval(t))
})
</script>

<template>
  <span class="status" :class="{ 'is-open': status?.open, 'status--light': light }" aria-live="polite">
    <span class="status__dot" aria-hidden="true" />
    <span>{{ status?.text ?? 'Seg a sex 9h–19h · Sáb 9h–12h' }}</span>
  </span>
</template>

<style scoped>
.status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--ink-soft);
}
.status--light {
  color: var(--sky-100);
}
.status__dot {
  position: relative;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #f0a43a;
}
.is-open .status__dot {
  background: var(--wa);
}
.is-open .status__dot::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: inherit;
  animation: pulse-ring 1.8s var(--ease-out) infinite;
}
</style>
