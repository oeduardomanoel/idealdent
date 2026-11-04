import { clinic, fmtHour, fullAddress, homeFaq, reviews, team } from '#shared/clinic'
import { services } from '#shared/services'

const hoursText = () =>
  clinic.hours.map((h) => `${h.label}: ${h.open ? `${fmtHour(h.open)} às ${fmtHour(h.close!)}` : 'fechado'}`).join('; ')

// Gera o llms.txt (resumo) e o llms-full.txt (conteúdo completo) a partir dos mesmos dados do site
export function buildLlms(siteUrl: string, full = false) {
  const out: string[] = []
  out.push(`# ${clinic.name}`)
  out.push('')
  out.push(
    `> Clínica odontológica no Centro de Balneário Barra do Sul, Santa Catarina, Brasil. Também conhecida como ${clinic.alternateNames.join(', ')}. Atende com a Dra. Marcela Guimarães (${clinic.responsible.cro}) e o Dr. Jhuan Prado. Nota ${clinic.rating.value.toFixed(1).replace('.', ',')} no Google com ${clinic.rating.count} avaliações.`
  )
  out.push('')
  out.push('## Dados da clínica')
  out.push('')
  out.push(`- Endereço: ${fullAddress}`)
  out.push(`- Coordenadas: ${clinic.geo.lat}, ${clinic.geo.lng}`)
  out.push(`- Horário: ${hoursText()}`)
  out.push(`- WhatsApp: ${clinic.whatsappDisplay} (https://wa.me/${clinic.whatsapp})`)
  out.push(`- Telefone fixo: ${clinic.phoneDisplay}`)
  out.push(`- Instagram: ${clinic.instagram}`)
  out.push(`- Google Maps: ${clinic.mapsCid}`)
  out.push(`- Responsável técnica: ${clinic.responsible.name}, ${clinic.responsible.cro}`)
  out.push(`- CNPJ: ${clinic.cnpj}`)
  out.push('')
  out.push('## Tratamentos')
  out.push('')
  for (const s of services) out.push(`- [${s.name}](${siteUrl}/tratamentos/${s.slug}): ${s.short}`)
  out.push('')
  out.push('## Equipe')
  out.push('')
  for (const m of team) {
    out.push(`- ${m.name}, ${m.role.toLowerCase()}${m.cro ? ` (${m.cro})` : ''}. Áreas: ${m.areas.join(', ')}.`)
  }
  out.push('')

  if (!full) {
    out.push('## Páginas')
    out.push('')
    out.push(`- [Página inicial](${siteUrl}/): visão geral, avaliações, perguntas frequentes e como chegar`)
    out.push(`- [Conteúdo completo para LLMs](${siteUrl}/llms-full.txt)`)
    out.push(`- [Sitemap](${siteUrl}/sitemap.xml)`)
    out.push('')
    return out.join('\n')
  }

  out.push('## Perguntas frequentes')
  out.push('')
  for (const f of homeFaq) {
    out.push(`### ${f.q}`, '', f.a, '')
  }
  out.push('## O que dizem os pacientes (Google)')
  out.push('')
  for (const r of reviews) out.push(`- "${r.text}" (${r.author})`)
  out.push('')
  for (const s of services) {
    out.push(`## ${s.h1}`, '', `URL: ${siteUrl}/tratamentos/${s.slug}`, '')
    for (const p of s.intro) out.push(p, '')
    out.push(`${s.signsTitle}:`)
    for (const x of s.signs) out.push(`- ${x}`)
    out.push('', 'Como funciona:')
    s.steps.forEach((st, i) => out.push(`${i + 1}. ${st.title}: ${st.text}`))
    out.push('')
    for (const f of s.faq) out.push(`### ${f.q}`, '', f.a, '')
  }
  return out.join('\n')
}
