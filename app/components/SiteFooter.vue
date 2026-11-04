<script setup lang="ts">
import { clinic, fullAddress, fmtHour } from '#shared/clinic'
import { services } from '#shared/services'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer bg-blue">
    <WaveLines class="footer__waves" />
    <div class="container footer__grid">
      <div class="footer__brand">
        <BrandLogo light />
        <p class="footer__about">
          Clínica odontológica no Centro de Balneário Barra do Sul. Agora também com o nome da Dra. Marcela Guimarães.
        </p>
        <div class="footer__social">
          <a :href="clinic.instagram" target="_blank" rel="noopener" aria-label="Instagram da Ideal Dent">
            <AppIcon name="instagram" />
          </a>
          <a :href="whatsappLink()" target="_blank" rel="noopener" aria-label="WhatsApp da Ideal Dent" @click="trackLead('footer_icone')">
            <AppIcon name="whatsapp" />
          </a>
          <a :href="clinic.mapsCid" target="_blank" rel="noopener" aria-label="Ideal Dent no Google Maps">
            <AppIcon name="pin" />
          </a>
        </div>
      </div>

      <div>
        <h2 class="footer__title">Tratamentos</h2>
        <ul class="footer__list">
          <li v-for="s in services" :key="s.slug">
            <NuxtLink :to="`/tratamentos/${s.slug}`">{{ s.name }}</NuxtLink>
          </li>
        </ul>
      </div>

      <div>
        <h2 class="footer__title">Contato</h2>
        <ul class="footer__list">
          <li>
            <a :href="whatsappLink()" target="_blank" rel="noopener" @click="trackLead('footer')">WhatsApp {{ clinic.whatsappDisplay }}</a>
          </li>
          <li><a :href="`tel:${clinic.phone}`">Fixo {{ clinic.phoneDisplay }}</a></li>
          <li>
            <a :href="clinic.instagram" target="_blank" rel="noopener">{{ clinic.instagramHandle }}</a>
          </li>
        </ul>
      </div>

      <div>
        <h2 class="footer__title">Endereço e horário</h2>
        <address class="footer__address">{{ fullAddress }}</address>
        <ul class="footer__hours">
          <li v-for="h in clinic.hours" :key="h.label">
            <span>{{ h.label }}</span>
            <span>{{ h.open ? `${fmtHour(h.open)} às ${fmtHour(h.close!)}` : 'Fechado' }}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="container footer__bottom">
      <p>
        © {{ year }} {{ clinic.name }} · CNPJ {{ clinic.cnpj }}
      </p>
      <p>Responsável técnica: {{ clinic.responsible.name }} · {{ clinic.responsible.cro }}</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  overflow: hidden;
  padding-top: clamp(64px, 8vw, 96px);
  padding-bottom: calc(28px + env(safe-area-inset-bottom));
}
.footer__waves {
  position: absolute;
  inset: auto 0 0;
  height: 60%;
  opacity: 0.18;
  pointer-events: none;
}
.footer__grid {
  position: relative;
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1.3fr;
  gap: 40px;
}
.footer__about {
  margin-top: 18px;
  max-width: 320px;
  color: var(--sky-100);
  font-size: 0.96rem;
}
.footer__social {
  display: flex;
  gap: 10px;
  margin-top: 22px;
}
.footer__social a {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: rgb(255 255 255 / 0.1);
  box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.15);
  transition:
    background-color 0.25s,
    transform 0.35s var(--ease-spring);
}
.footer__social a:hover {
  background: rgb(255 255 255 / 0.22);
  transform: translateY(-3px);
}
.footer__title {
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--sky-200);
  margin-bottom: 18px;
}
.footer__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 10px;
}
.footer__list a {
  color: var(--white);
  opacity: 0.88;
  font-size: 0.96rem;
  background: linear-gradient(currentColor, currentColor) 0 100% / 0 1px no-repeat;
  transition:
    opacity 0.2s,
    background-size 0.35s var(--ease-out);
}
.footer__list a:hover {
  opacity: 1;
  background-size: 100% 1px;
}
.footer__address {
  font-style: normal;
  font-size: 0.96rem;
  color: var(--white);
  opacity: 0.9;
}
.footer__hours {
  list-style: none;
  margin: 16px 0 0;
  padding: 0;
  display: grid;
  gap: 6px;
  font-size: 0.92rem;
}
.footer__hours li {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding-bottom: 6px;
  border-bottom: 1px dashed rgb(255 255 255 / 0.18);
  color: var(--sky-100);
}
.footer__bottom {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px 24px;
  margin-top: 56px;
  padding-top: 24px;
  border-top: 1px solid rgb(255 255 255 / 0.15);
  font-size: 0.85rem;
  color: var(--sky-200);
}
@media (max-width: 960px) {
  .footer__grid {
    grid-template-columns: 1fr 1fr;
  }
  .footer__brand {
    grid-column: 1 / -1;
  }
}
@media (max-width: 560px) {
  .footer__grid {
    grid-template-columns: 1fr;
  }
}
</style>
