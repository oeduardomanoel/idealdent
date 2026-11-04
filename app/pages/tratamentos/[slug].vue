<script setup lang="ts">
import { clinic } from '#shared/clinic'
import { getService, services } from '#shared/services'

const route = useRoute()
const service = getService(String(route.params.slug))
if (!service) {
  throw createError({ statusCode: 404, statusMessage: 'Tratamento não encontrado', fatal: true })
}
const s = service!
const siteUrl = useSiteUrl()
const others = services.filter((x) => x.slug !== s.slug).slice(0, 3)
const msg = serviceMessage(s.name)

useHead({ title: s.seoTitle, titleTemplate: '%s · Ideal Dent' })
useSeoMeta({
  description: s.seoDescription,
  ogTitle: s.seoTitle,
  ogDescription: s.seoDescription,
  twitterTitle: s.seoTitle,
  twitterDescription: s.seoDescription
})

useJsonLd([
  serviceSchema(siteUrl, s),
  clinicSchema(siteUrl),
  faqSchema(s.faq),
  breadcrumbSchema([
    { name: 'Início', url: `${siteUrl}/` },
    { name: 'Tratamentos', url: `${siteUrl}/#tratamentos` },
    { name: s.name, url: `${siteUrl}/tratamentos/${s.slug}` }
  ])
])
</script>

<template>
  <div>
    <section class="svc-hero">
      <WaveLines class="svc-hero__waves" />
      <div class="container svc-hero__grid">
        <div>
          <nav class="crumbs" aria-label="Você está em">
            <NuxtLink to="/">Início</NuxtLink>
            <span aria-hidden="true">/</span>
            <NuxtLink to="/#tratamentos">Tratamentos</NuxtLink>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{{ s.name }}</span>
          </nav>
          <h1 v-reveal class="svc-hero__title">{{ s.h1 }}</h1>
          <p v-for="(p, i) in s.intro" :key="i" v-reveal="80 + i * 80" class="svc-hero__lead">{{ p }}</p>
          <div v-reveal="240" class="svc-hero__ctas">
            <a :href="whatsappLink(msg)" target="_blank" rel="noopener" class="btn btn--wa" @click="trackLead(`servico_${s.slug}`)">
              <AppIcon name="whatsapp" /> Agendar avaliação
            </a>
            <a :href="`tel:${clinic.phone}`" class="btn btn--white">
              <AppIcon name="phone" /> {{ clinic.phoneDisplay }}
            </a>
          </div>
        </div>
        <div v-reveal:scale="160" class="svc-hero__badge" aria-hidden="true">
          <span class="svc-hero__icon"><AppIcon :name="s.icon" size="88" /></span>
          <span class="svc-hero__ring" />
          <span class="svc-hero__ring svc-hero__ring--2" />
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container svc-body">
        <div v-reveal class="svc-card">
          <h2 class="svc-card__title">{{ s.signsTitle }}</h2>
          <ul class="svc-signs">
            <li v-for="sign in s.signs" :key="sign">
              <AppIcon name="check" size="18" />
              <span>{{ sign }}</span>
            </li>
          </ul>
        </div>

        <div>
          <h2 v-reveal class="svc-steps__title">Como funciona</h2>
          <ol class="svc-steps">
            <li v-for="(st, i) in s.steps" :key="st.title" v-reveal="i * 90">
              <span class="svc-steps__n">{{ i + 1 }}</span>
              <div>
                <h3>{{ st.title }}</h3>
                <p>{{ st.text }}</p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>

    <section class="section bg-sky">
      <div class="container svc-faq">
        <div>
          <p v-reveal class="eyebrow">Dúvidas sobre {{ s.name.toLowerCase() }}</p>
          <h2 v-reveal="80" class="h2">Perguntas frequentes</h2>
          <p v-reveal="140" class="lead">
            Cada caso é diferente. As respostas abaixo valem como orientação geral, e a avaliação no consultório é que define
            o seu tratamento.
          </p>
        </div>
        <FaqList :items="s.faq" />
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h2 v-reveal class="h2 svc-more__title">Outros tratamentos</h2>
        <ul class="svc-more">
          <li v-for="(o, i) in others" :key="o.slug" v-reveal="i * 100">
            <NuxtLink :to="`/tratamentos/${o.slug}`" class="svc-more__card">
              <AppIcon :name="o.icon" size="28" />
              <span>
                <strong>{{ o.name }}</strong>
                <small>{{ o.short }}</small>
              </span>
              <AppIcon name="arrow" size="20" class="svc-more__arrow" />
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>

    <CtaSection :preset="s.name" />
  </div>
</template>

<style scoped>
.svc-hero {
  position: relative;
  overflow: hidden;
  padding: calc(var(--header-h) + 56px) 0 clamp(56px, 8vw, 96px);
  background:
    radial-gradient(900px 500px at 90% 0%, rgb(79 163 240 / 0.6), transparent 60%),
    linear-gradient(160deg, var(--blue-600), var(--blue-700) 50%, var(--navy-800));
  color: var(--white);
}
.svc-hero__waves {
  position: absolute;
  inset: 30% -10% auto;
  width: 120%;
  height: 70%;
  opacity: 0.18;
  pointer-events: none;
}
.svc-hero__grid {
  position: relative;
  display: grid;
  grid-template-columns: 1.4fr 0.6fr;
  gap: 48px;
  align-items: center;
}
.crumbs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
  font-size: 0.88rem;
  color: var(--sky-200);
}
.crumbs a:hover {
  color: var(--white);
  text-decoration: underline;
}
.crumbs [aria-current] {
  color: var(--white);
  font-weight: 600;
}
.svc-hero__title {
  font-size: clamp(2.2rem, 5vw, 3.8rem);
  font-weight: 800;
  color: var(--white);
}
.svc-hero__lead {
  max-width: 640px;
  margin-top: 18px;
  font-size: 1.15rem;
  color: var(--sky-100);
}
.svc-hero__ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 32px;
}
.svc-hero__badge {
  position: relative;
  justify-self: center;
  display: grid;
  place-items: center;
  width: min(280px, 60vw);
  aspect-ratio: 1;
}
.svc-hero__icon {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 62%;
  aspect-ratio: 1;
  border-radius: 36%;
  background: var(--white);
  color: var(--blue-600);
  box-shadow: var(--shadow-lg);
  animation: float 6s ease-in-out infinite;
}
.svc-hero__ring {
  position: absolute;
  inset: 4%;
  border-radius: 50%;
  border: 1.5px dashed rgb(255 255 255 / 0.4);
  animation: spin 30s linear infinite;
}
.svc-hero__ring--2 {
  inset: -10%;
  border-style: solid;
  border-color: rgb(255 255 255 / 0.12);
  animation-duration: 50s;
  animation-direction: reverse;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.svc-body {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: clamp(32px, 5vw, 72px);
  align-items: start;
}
.svc-card {
  position: sticky;
  top: calc(var(--header-h) + 32px);
  padding: 32px;
  border-radius: var(--radius-xl);
  background: var(--sky-50);
  box-shadow: inset 0 0 0 1px var(--sky-100);
}
.svc-card__title,
.svc-steps__title {
  font-size: 1.6rem;
  font-weight: 800;
  margin-bottom: 20px;
}
.svc-signs {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
}
.svc-signs li {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  color: var(--ink);
}
.svc-signs svg {
  flex: none;
  margin-top: 3px;
  padding: 3px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--blue-600);
  color: var(--white);
}
.svc-steps {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 14px;
}
.svc-steps li {
  display: flex;
  gap: 18px;
  padding: 22px 24px;
  border-radius: var(--radius-lg);
  background: var(--white);
  box-shadow: inset 0 0 0 1px var(--line);
  transition:
    transform 0.45s var(--ease-spring),
    box-shadow 0.4s;
}
.svc-steps li:hover {
  transform: translateX(6px);
  box-shadow: var(--shadow), inset 0 0 0 1px var(--sky-200);
}
.svc-steps__n {
  display: grid;
  place-items: center;
  flex: none;
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: linear-gradient(145deg, var(--blue-500), var(--blue-700));
  color: var(--white);
  font-family: var(--font-display);
  font-weight: 800;
}
.svc-steps h3 {
  font-size: 1.15rem;
  font-weight: 800;
}
.svc-steps p {
  margin-top: 4px;
  color: var(--ink-soft);
}
.svc-faq {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: clamp(32px, 5vw, 72px);
  align-items: start;
}
.svc-more__title {
  font-size: clamp(1.8rem, 3.4vw, 2.4rem);
  margin-bottom: 28px;
}
.svc-more {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.svc-more__card {
  display: flex;
  align-items: center;
  gap: 16px;
  height: 100%;
  padding: 22px;
  border-radius: var(--radius-lg);
  box-shadow: inset 0 0 0 1px var(--line);
  color: var(--blue-600);
  transition:
    transform 0.45s var(--ease-spring),
    box-shadow 0.4s,
    background-color 0.4s;
}
.svc-more__card:hover {
  transform: translateY(-4px);
  background: var(--sky-50);
  box-shadow: var(--shadow), inset 0 0 0 1px var(--sky-200);
}
.svc-more__card strong {
  display: block;
  font-family: var(--font-display);
  color: var(--navy-900);
}
.svc-more__card small {
  display: block;
  margin-top: 4px;
  font-size: 0.86rem;
  line-height: 1.45;
  color: var(--ink-soft);
}
.svc-more__arrow {
  flex: none;
  margin-left: auto;
  transition: transform 0.35s var(--ease-spring);
}
.svc-more__card:hover .svc-more__arrow {
  transform: translateX(5px);
}
@media (max-width: 960px) {
  .svc-hero__grid,
  .svc-body,
  .svc-faq {
    grid-template-columns: 1fr;
  }
  .svc-hero__badge {
    display: none;
  }
  .svc-card {
    position: static;
  }
  .svc-more {
    grid-template-columns: 1fr;
  }
}
</style>
