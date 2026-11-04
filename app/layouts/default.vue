<template>
  <div>
    <a href="#conteudo" class="skip-link">Pular para o conteúdo</a>
    <SiteHeader />
    <main id="conteudo">
      <slot />
    </main>
    <SiteFooter />
    <WhatsAppFloat />
  </div>
</template>
