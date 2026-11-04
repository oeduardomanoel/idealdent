import { clinic } from '#shared/clinic'

type Gtag = (...args: unknown[]) => void

// Dispara evento de conversão se GA4/Ads/Meta estiverem instalados. Sem eles, não faz nada.
export function trackLead(label: string, extra: Record<string, unknown> = {}) {
  if (!import.meta.client) return
  const w = window as unknown as { gtag?: Gtag; fbq?: Gtag; dataLayer?: unknown[] }
  const payload = { event_category: 'lead', event_label: label, ...extra }
  w.gtag?.('event', 'generate_lead', payload)
  w.fbq?.('track', 'Contact', payload)
  w.dataLayer?.push({ event: 'whatsapp_click', ...payload })
}

export function whatsappLink(message?: string) {
  const text = message ?? 'Olá! Vim pelo site da Ideal Dent e quero agendar uma avaliação.'
  return `https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(text)}`
}

export function serviceMessage(serviceName: string) {
  return `Olá! Vim pelo site da Ideal Dent e quero saber mais sobre ${serviceName.toLowerCase()}. Pode me passar os horários disponíveis?`
}
