<script setup lang="ts">
import { homeFaq } from '#shared/clinic'

const siteUrl = useSiteUrl()

const title = 'Dentista em Balneário Barra do Sul · Ideal Dent Odontologia'
const description =
  'Dentista no Centro de Balneário Barra do Sul (SC). Aparelho transparente, aparelho fixo, facetas, canal, implante e limpeza com a Dra. Marcela Guimarães. 4,9 no Google. Agende pelo WhatsApp.'

useHead({ title: 'Dentista em Balneário Barra do Sul' })
useSeoMeta({
  description,
  ogTitle: title,
  ogDescription: description,
  twitterTitle: title,
  twitterDescription: description
})

useJsonLd([
  clinicSchema(siteUrl),
  websiteSchema(siteUrl),
  ...teamSchema(siteUrl),
  { ...faqSchema(homeFaq), '@id': `${siteUrl}/#faq` }
])
</script>

<template>
  <div>
    <HeroSection />
    <ServicesMarquee />
    <EmpathySection />
    <ServicesGrid />
    <StepsSection />
    <TeamSection />
    <ReviewsSection />

    <section id="duvidas" class="section faq-section" aria-labelledby="faq-title">
      <div class="container faq-section__grid">
        <div class="faq-section__head">
          <p v-reveal class="eyebrow">Dúvidas frequentes</p>
          <h2 id="faq-title" v-reveal="80" class="h2">Antes de marcar, talvez você queira saber</h2>
          <p v-reveal="160" class="lead">Não achou sua pergunta? Manda no WhatsApp que a equipe responde.</p>
          <a v-reveal="220" :href="whatsappLink('Olá! Tenho uma dúvida antes de marcar a consulta.')" target="_blank" rel="noopener" class="link-arrow faq-section__link" @click="trackLead('faq')">
            Perguntar no WhatsApp <AppIcon name="arrow" />
          </a>
        </div>
        <FaqList :items="homeFaq" />
      </div>
    </section>

    <LocationSection />
    <CtaSection />
  </div>
</template>

<style scoped>
.faq-section {
  background: linear-gradient(180deg, var(--white), var(--sky-50));
}
.faq-section__grid {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: clamp(40px, 6vw, 80px);
  align-items: start;
}
.faq-section__head {
  position: sticky;
  top: calc(var(--header-h) + 40px);
}
.faq-section__link {
  margin-top: 24px;
}
@media (max-width: 960px) {
  .faq-section__grid {
    grid-template-columns: 1fr;
  }
  .faq-section__head {
    position: static;
  }
}
</style>
