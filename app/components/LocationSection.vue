<script setup lang="ts">
import { clinic, fmtHour } from '#shared/clinic'

// O iframe do Maps só carrega quando a seção chega perto da tela
const wrap = ref<HTMLElement | null>(null)
const showMap = ref(false)
onMounted(() => {
  if (!wrap.value) return
  const io = new IntersectionObserver(
    ([e]) => {
      if (e?.isIntersecting) {
        showMap.value = true
        io.disconnect()
      }
    },
    { rootMargin: '400px' }
  )
  io.observe(wrap.value)
})
</script>

<template>
  <section id="localizacao" class="section location" aria-labelledby="location-title">
    <div class="container location__grid">
      <div class="location__info">
        <p v-reveal class="eyebrow">Como chegar</p>
        <h2 id="location-title" v-reveal="80" class="h2">No Centro, na Av. Amândio Cabral</h2>

        <ul class="location__cards">
          <li v-reveal="140" class="info">
            <span class="info__icon"><AppIcon name="pin" /></span>
            <div>
              <h3>Endereço</h3>
              <address>
                {{ clinic.address.street }}<br />
                {{ clinic.address.district }}, {{ clinic.address.city }} - {{ clinic.address.state }}<br />
                CEP {{ clinic.address.postalCode }}
              </address>
            </div>
          </li>
          <li v-reveal="200" class="info">
            <span class="info__icon"><AppIcon name="clock" /></span>
            <div>
              <h3>Horário</h3>
              <ul class="info__hours">
                <li v-for="h in clinic.hours" :key="h.label">
                  <span>{{ h.label }}</span>
                  <strong>{{ h.open ? `${fmtHour(h.open)} às ${fmtHour(h.close!)}` : 'Fechado' }}</strong>
                </li>
              </ul>
              <OpenStatus class="info__status" />
            </div>
          </li>
          <li v-reveal="260" class="info">
            <span class="info__icon"><AppIcon name="phone" /></span>
            <div>
              <h3>Contato</h3>
              <p>
                <a :href="whatsappLink()" target="_blank" rel="noopener" @click="trackLead('localizacao_texto')">WhatsApp {{ clinic.whatsappDisplay }}</a><br />
                <a :href="`tel:${clinic.phone}`">Fixo {{ clinic.phoneDisplay }}</a>
              </p>
            </div>
          </li>
        </ul>

        <div v-reveal="320" class="location__ctas">
          <a :href="clinic.directionsUrl" target="_blank" rel="noopener" class="btn btn--primary">
            <AppIcon name="car" /> Abrir no Google Maps
          </a>
          <a :href="clinic.wazeUrl" target="_blank" rel="noopener" class="btn btn--ghost">Ir pelo Waze</a>
        </div>
      </div>

      <div ref="wrap" v-reveal:scale="120" class="location__map">
        <svg class="location__art" viewBox="0 0 600 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <rect width="600" height="500" fill="#dcf0fd" />
          <path d="M-20 380 C 120 330, 220 420, 360 360 S 560 300, 640 330 L 640 520 L -20 520 Z" fill="#bfe3fb" />
          <path d="M-20 420 C 140 380, 260 460, 400 410 S 580 360, 640 380" fill="none" stroke="#8fcdf7" stroke-width="2" />
          <g fill="none" stroke="#fff" stroke-linecap="round">
            <path d="M-20 210 L 640 250" stroke-width="22" />
            <path d="M300 -20 L 270 520" stroke-width="14" />
            <path d="M80 -20 L 140 340" stroke-width="10" />
            <path d="M480 -20 L 520 330" stroke-width="10" />
            <path d="M-20 90 L 640 120" stroke-width="8" />
          </g>
          <g fill="#eef7fe" stroke="#bfe3fb">
            <rect x="160" y="130" width="90" height="60" rx="8" />
            <rect x="330" y="140" width="120" height="70" rx="8" />
            <rect x="170" y="260" width="80" height="70" rx="8" />
            <rect x="330" y="270" width="110" height="50" rx="8" />
          </g>
          <text x="318" y="226" transform="rotate(3.4 318 226)" font-family="DM Sans Variable, sans-serif" font-size="12" font-weight="600" fill="#3a4a6b">Av. Amândio Cabral</text>
          <circle cx="292" cy="230" r="40" fill="#1560d6" opacity=".15" />
          <path d="M292 236s-22-19-22-35a22 22 0 0 1 44 0c0 16-22 35-22 35Z" fill="#1560d6" />
          <circle cx="292" cy="201" r="8" fill="#fff" />
        </svg>
        <iframe
          v-if="showMap"
          :src="clinic.mapEmbed"
          title="Mapa da Ideal Dent Odontologia em Balneário Barra do Sul"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          allowfullscreen
        />
        <a :href="clinic.mapsCid" target="_blank" rel="noopener" class="location__pin">
          <BrandMark class="location__pin-mark" />
          <span>
            <strong>Ideal Dent Odontologia</strong>
            <small>4,9 ★ · {{ clinic.rating.count }} avaliações</small>
          </span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.location__grid {
  display: grid;
  grid-template-columns: 1fr 1.15fr;
  gap: clamp(40px, 5vw, 72px);
  align-items: stretch;
}
.location__cards {
  list-style: none;
  margin: 36px 0 0;
  padding: 0;
  display: grid;
  gap: 14px;
}
.info {
  display: flex;
  gap: 18px;
  padding: 20px 22px;
  border-radius: var(--radius);
  background: var(--sky-50);
  transition:
    transform 0.4s var(--ease-spring),
    background-color 0.3s;
}
.info:hover {
  transform: translateX(6px);
  background: var(--sky-100);
}
.info__icon {
  display: grid;
  place-items: center;
  flex: none;
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: var(--white);
  color: var(--blue-600);
  box-shadow: var(--shadow-sm);
}
.info h3 {
  font-size: 1rem;
  font-weight: 800;
  margin-bottom: 4px;
}
.info address,
.info p {
  font-style: normal;
  color: var(--ink-soft);
}
.info a {
  color: var(--blue-700);
  font-weight: 600;
}
.info a:hover {
  text-decoration: underline;
}
.info__hours {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 2px;
  color: var(--ink-soft);
}
.info__hours li {
  display: flex;
  gap: 12px;
  justify-content: space-between;
  min-width: 240px;
}
.info__hours strong {
  color: var(--navy-900);
}
.info__status {
  margin-top: 8px;
}
.location__ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}
.location__map {
  position: relative;
  min-height: 480px;
  border-radius: var(--radius-xl);
  overflow: hidden;
  background: var(--sky-100);
  box-shadow: var(--shadow-lg);
}
.location__map iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
  filter: saturate(1.1);
}
.location__art {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.location__pin {
  position: absolute;
  left: 18px;
  bottom: 18px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 18px 12px 12px;
  border-radius: 18px;
  background: var(--white);
  box-shadow: var(--shadow-lg);
  transition: transform 0.4s var(--ease-spring);
}
.location__pin:hover {
  transform: translateY(-4px);
}
.location__pin-mark {
  width: 42px;
  height: 42px;
}
.location__pin strong {
  display: block;
  font-family: var(--font-display);
  font-size: 0.95rem;
  color: var(--navy-900);
}
.location__pin small {
  color: var(--ink-mute);
}
@media (max-width: 960px) {
  .location__grid {
    grid-template-columns: 1fr;
  }
  .location__map {
    min-height: 380px;
  }
}
@media (max-width: 420px) {
  .info__hours li {
    min-width: 0;
  }
}
</style>
