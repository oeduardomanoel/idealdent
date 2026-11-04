<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
useHead({ title: props.error.statusCode === 404 ? 'Página não encontrada' : 'Algo deu errado' })
useSeoMeta({ robots: 'noindex, follow' })
</script>

<template>
  <NuxtLayout>
    <section class="err">
      <div class="container err__inner">
        <BrandMark class="err__mark" />
        <p class="eyebrow">Erro {{ error.statusCode }}</p>
        <h1 class="h2">{{ error.statusCode === 404 ? 'Essa página não existe mais' : 'Algo deu errado por aqui' }}</h1>
        <p class="lead">Mas o WhatsApp da clínica continua funcionando, e a página inicial também.</p>
        <div class="err__ctas">
          <button type="button" class="btn btn--primary" @click="clearError({ redirect: '/' })">Voltar ao início</button>
          <a :href="whatsappLink()" target="_blank" rel="noopener" class="btn btn--wa"><AppIcon name="whatsapp" /> WhatsApp</a>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>

<style scoped>
.err {
  min-height: 80vh;
  display: grid;
  place-items: center;
  padding: calc(var(--header-h) + 48px) 0 80px;
  background: linear-gradient(180deg, var(--sky-50), var(--white));
  text-align: center;
}
.err__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.err__mark {
  width: 88px;
  margin-bottom: 24px;
  animation: float 5s ease-in-out infinite;
}
.err__ctas {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 32px;
}
</style>
