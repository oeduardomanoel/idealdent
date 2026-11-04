// Diretiva v-reveal: anima o elemento quando ele entra na tela.
// Uso: v-reveal  |  v-reveal="150" (atraso em ms)  |  v-reveal:left  |  v-reveal:scale="200"
import type { DirectiveBinding } from 'vue'

export default defineNuxtPlugin((nuxtApp) => {
  let observer: IntersectionObserver | null = null

  const getObserver = () => {
    if (observer) return observer
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer?.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    )
    return observer
  }

  nuxtApp.vueApp.directive('reveal', {
    getSSRProps(binding: DirectiveBinding) {
      return {
        class: `reveal reveal--${binding.arg || 'up'}`,
        style: binding.value ? `--reveal-delay:${binding.value}ms` : undefined
      }
    },
    mounted(el: HTMLElement, binding: DirectiveBinding) {
      el.classList.add('reveal', `reveal--${binding.arg || 'up'}`)
      if (binding.value) el.style.setProperty('--reveal-delay', `${binding.value}ms`)
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        el.classList.add('is-visible')
        return
      }
      getObserver().observe(el)
    },
    unmounted(el: HTMLElement) {
      observer?.unobserve(el)
    }
  })
})
