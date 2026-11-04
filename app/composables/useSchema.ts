import { clinic, team, type Faq } from '#shared/clinic'
import { services, type Service } from '#shared/services'

const DAY_URIS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export function useSiteUrl() {
  return useRuntimeConfig().public.siteUrl as string
}

export function clinicSchema(siteUrl: string) {
  const id = `${siteUrl}/#clinica`
  return {
    '@type': ['Dentist', 'MedicalClinic', 'LocalBusiness'],
    '@id': id,
    name: clinic.name,
    alternateName: clinic.alternateNames,
    description: clinic.description,
    url: `${siteUrl}/`,
    logo: `${siteUrl}/icon-512.png`,
    image: `${siteUrl}/og-image.png`,
    telephone: [`+${clinic.whatsapp}`, clinic.phone],
    priceRange: '$$',
    currenciesAccepted: 'BRL',
    address: {
      '@type': 'PostalAddress',
      streetAddress: clinic.address.street,
      addressLocality: clinic.address.city,
      addressRegion: clinic.address.state,
      postalCode: clinic.address.postalCode,
      addressCountry: clinic.address.country
    },
    geo: { '@type': 'GeoCoordinates', latitude: clinic.geo.lat, longitude: clinic.geo.lng },
    hasMap: clinic.mapsCid,
    areaServed: [
      { '@type': 'City', name: 'Balneário Barra do Sul' },
      { '@type': 'City', name: 'Araquari' },
      { '@type': 'City', name: 'São Francisco do Sul' }
    ],
    openingHoursSpecification: clinic.hours
      .filter((h) => h.open)
      .map((h) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: h.days.map((d) => `https://schema.org/${DAY_URIS[d]}`),
        opens: h.open,
        closes: h.close
      })),
    sameAs: [clinic.instagram, clinic.mapsCid],
    medicalSpecialty: 'Dentistry',
    availableService: services.map((s) => ({
      '@type': 'MedicalProcedure',
      name: s.name,
      url: `${siteUrl}/tratamentos/${s.slug}`
    })),
    employee: team.map((m) => ({ '@id': `${siteUrl}/#${slugify(m.name)}` })),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: `+${clinic.whatsapp}`,
      contactType: 'customer service',
      availableLanguage: 'Portuguese',
      areaServed: 'BR'
    }
  }
}

export function teamSchema(siteUrl: string) {
  return team.map((m) => ({
    '@type': 'Person',
    '@id': `${siteUrl}/#${slugify(m.name)}`,
    name: m.name,
    jobTitle: m.role,
    knowsAbout: m.areas,
    worksFor: { '@id': `${siteUrl}/#clinica` },
    ...(m.cro ? { identifier: m.cro } : {})
  }))
}

export function websiteSchema(siteUrl: string) {
  return {
    '@type': 'WebSite',
    '@id': `${siteUrl}/#site`,
    url: `${siteUrl}/`,
    name: clinic.name,
    inLanguage: 'pt-BR',
    publisher: { '@id': `${siteUrl}/#clinica` }
  }
}

export function faqSchema(faq: Faq[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  }
}

export function serviceSchema(siteUrl: string, s: Service) {
  return {
    '@type': 'MedicalWebPage',
    '@id': `${siteUrl}/tratamentos/${s.slug}#pagina`,
    url: `${siteUrl}/tratamentos/${s.slug}`,
    name: s.seoTitle,
    description: s.seoDescription,
    inLanguage: 'pt-BR',
    isPartOf: { '@id': `${siteUrl}/#site` },
    about: {
      '@type': 'MedicalProcedure',
      name: s.name,
      description: s.intro.join(' ')
    },
    provider: { '@id': `${siteUrl}/#clinica` }
  }
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url
    }))
  }
}

export function useJsonLd(graph: Record<string, unknown>[]) {
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
      }
    ]
  })
}

export function slugify(str: string) {
  return str
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
