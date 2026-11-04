<script setup lang="ts">
import { clinic } from '#shared/clinic'

const scrolled = ref(false)
const open = ref(false)
const route = useRoute()

const nav = [
  { label: 'Tratamentos', to: '/#tratamentos' },
  { label: 'Equipe', to: '/#equipe' },
  { label: 'Avaliações', to: '/#avaliacoes' },
  { label: 'Dúvidas', to: '/#duvidas' },
  { label: 'Como chegar', to: '/#localizacao' }
]

const onScroll = () => {
  scrolled.value = window.scrollY > 24
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

watch(() => route.fullPath, () => (open.value = false))
watch(open, (v) => {
  if (import.meta.client) document.documentElement.style.overflow = v ? 'hidden' : ''
})
</script>

<template>
  <header class="header" :class="{ 'is-scrolled': scrolled || route.path !== '/', 'is-open': open }">
    <div class="container header__inner">
      <NuxtLink to="/" class="header__logo" aria-label="Ideal Dent Odontologia, página inicial">
        <BrandLogo compact />
      </NuxtLink>

      <nav class="header__nav" aria-label="Principal">
        <NuxtLink v-for="item in nav" :key="item.to" :to="item.to" class="header__link">{{ item.label }}</NuxtLink>
      </nav>

      <div class="header__actions">
        <a :href="`tel:${clinic.phone}`" class="header__phone">
          <AppIcon name="phone" size="18" />
          <span>{{ clinic.phoneDisplay }}</span>
        </a>
        <a
          :href="whatsappLink()"
          target="_blank"
          rel="noopener"
          class="btn btn--wa btn--sm header__cta"
          @click="trackLead('header')"
        >
          <AppIcon name="whatsapp" />
          <span>Agendar</span>
        </a>
        <button
          class="header__burger"
          type="button"
          :aria-expanded="open"
          aria-controls="menu-mobile"
          :aria-label="open ? 'Fechar menu' : 'Abrir menu'"
          @click="open = !open"
        >
          <AppIcon :name="open ? 'close' : 'menu'" size="26" />
        </button>
      </div>
    </div>

    <div id="menu-mobile" class="mobile" :aria-hidden="!open">
      <nav class="mobile__nav" aria-label="Menu mobile">
        <NuxtLink
          v-for="(item, i) in nav"
          :key="item.to"
          :to="item.to"
          class="mobile__link"
          :style="{ '--i': i }"
          :tabindex="open ? 0 : -1"
        >
          {{ item.label }}
          <AppIcon name="arrow" size="22" />
        </NuxtLink>
      </nav>
      <div class="mobile__foot">
        <a :href="whatsappLink()" target="_blank" rel="noopener" class="btn btn--wa btn--block" :tabindex="open ? 0 : -1" @click="trackLead('menu_mobile')">
          <AppIcon name="whatsapp" /> Chamar no WhatsApp
        </a>
        <a :href="`tel:${clinic.phone}`" class="btn btn--ghost btn--block" :tabindex="open ? 0 : -1">
          <AppIcon name="phone" /> {{ clinic.phoneDisplay }}
        </a>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  inset: 0 0 auto;
  z-index: 100;
  transition:
    background-color 0.35s,
    box-shadow 0.35s,
    backdrop-filter 0.35s;
}
.header.is-scrolled,
.header.is-open {
  background: rgb(255 255 255 / 0.86);
  backdrop-filter: saturate(1.6) blur(16px);
  -webkit-backdrop-filter: saturate(1.6) blur(16px);
  box-shadow: 0 1px 0 var(--line), 0 10px 30px -18px rgb(10 30 77 / 0.3);
}
.header__inner {
  display: flex;
  align-items: center;
  gap: 24px;
  height: var(--header-h);
  transition: height 0.35s var(--ease-out);
}
.is-scrolled .header__inner {
  height: 66px;
}
.header__logo {
  flex: none;
}
.header__nav {
  display: flex;
  gap: 4px;
  margin-inline: auto;
}
.header__link {
  position: relative;
  padding: 8px 14px;
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--ink-soft);
  border-radius: 999px;
  transition:
    color 0.2s,
    background-color 0.2s;
}
.header__link::after {
  content: '';
  position: absolute;
  left: 14px;
  right: 14px;
  bottom: 4px;
  height: 2px;
  border-radius: 2px;
  background: var(--blue-600);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.35s var(--ease-out);
}
.header__link:hover {
  color: var(--navy-900);
}
.header__link:hover::after {
  transform: scaleX(1);
}
.header__actions {
  display: flex;
  align-items: center;
  gap: 14px;
  flex: none;
}
.header__phone {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--navy-900);
  transition: color 0.2s;
}
.header__phone:hover {
  color: var(--blue-600);
}
.header__burger {
  display: none;
  width: 46px;
  height: 46px;
  place-items: center;
  border: 0;
  border-radius: 14px;
  background: var(--sky-50);
  color: var(--navy-900);
  cursor: pointer;
}

.mobile {
  display: none;
}

@media (max-width: 1080px) {
  .header__phone span {
    display: none;
  }
}
@media (max-width: 920px) {
  .header__nav,
  .header__phone {
    display: none;
  }
  .header__actions {
    margin-left: auto;
  }
  .header__burger {
    display: grid;
  }
  .mobile {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: fixed;
    inset: 66px 0 0;
    padding: 24px var(--gutter) calc(24px + env(safe-area-inset-bottom));
    background: var(--white);
    visibility: hidden;
    opacity: 0;
    transform: translateY(-12px);
    transition:
      opacity 0.3s,
      transform 0.4s var(--ease-out),
      visibility 0s 0.4s;
  }
  .is-open .mobile {
    visibility: visible;
    opacity: 1;
    transform: none;
    transition:
      opacity 0.3s,
      transform 0.4s var(--ease-out);
  }
  .mobile__link {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18px 0;
    border-bottom: 1px solid var(--line);
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 1.6rem;
    letter-spacing: -0.02em;
    color: var(--navy-900);
    opacity: 0;
    transform: translateX(-16px);
    transition:
      opacity 0.4s,
      transform 0.5s var(--ease-out);
  }
  .is-open .mobile__link {
    opacity: 1;
    transform: none;
    transition-delay: calc(var(--i) * 50ms + 80ms);
  }
  .mobile__link svg {
    color: var(--blue-600);
  }
  .mobile__foot {
    display: grid;
    gap: 12px;
  }
}
@media (max-width: 420px) {
  .header__cta span {
    display: none;
  }
  .header__cta {
    width: 46px;
    padding: 0;
  }
}
</style>
