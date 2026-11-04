<script setup lang="ts">
const config = useRuntimeConfig()
const route = useRoute()
const siteUrl = config.public.siteUrl as string
const gtagId = config.public.gtagId as string

useHead({
  titleTemplate: (t) => (t ? `${t} · Ideal Dent Odontologia` : 'Ideal Dent Odontologia · Dentista em Balneário Barra do Sul'),
  link: [{ rel: 'canonical', href: computed(() => `${siteUrl}${route.path === '/' ? '/' : route.path}`) }],
  noscript: [{ innerHTML: '<style>.reveal{opacity:1!important;transform:none!important;filter:none!important}</style>' }],
  script: gtagId
    ? [
        { src: `https://www.googletagmanager.com/gtag/js?id=${gtagId}`, async: true },
        {
          innerHTML: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gtagId}');`
        }
      ]
    : []
})

useSeoMeta({
  ogSiteName: 'Ideal Dent Odontologia',
  ogLocale: 'pt_BR',
  ogType: 'website',
  ogImage: `${siteUrl}/og-image.png`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'Ideal Dent Odontologia, dentista em Balneário Barra do Sul',
  ogUrl: computed(() => `${siteUrl}${route.path}`),
  twitterCard: 'summary_large_image',
  twitterImage: `${siteUrl}/og-image.png`
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
