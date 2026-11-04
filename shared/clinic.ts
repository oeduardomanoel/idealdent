// Fonte única de dados da clínica. Site, schema.org, sitemap e llms.txt leem daqui.
// Dados levantados do Google Maps, CNPJ e Instagram @ideal_dramarcela (nov/2026).

export const clinic = {
  name: 'Ideal Dent Odontologia',
  shortName: 'Ideal Dent',
  // Nomes usados no Instagram e após o rebrand. Ajudam buscadores e IAs a ligar as entidades.
  alternateNames: [
    'Odontologia Ideal',
    'Clínica Dra. Marcela Guimarães',
    'Odontologia Dra. Marcela Guimarães',
    'IdealDent Odontologia'
  ],
  description:
    'Clínica odontológica no Centro de Balneário Barra do Sul (SC). Aparelho transparente, aparelho ortodôntico, facetas, tratamento de canal, implantes, gengivite, limpeza e restaurações, com a Dra. Marcela Guimarães e o Dr. Jhuan Prado.',
  whatsapp: '5547991291617',
  whatsappDisplay: '(47) 99129-1617',
  phone: '+554734483924',
  phoneDisplay: '(47) 3448-3924',
  instagram: 'https://www.instagram.com/ideal_dramarcela/',
  instagramHandle: '@ideal_dramarcela',
  cnpj: '61.118.190/0001-30',
  address: {
    street: 'Av. Amândio Cabral, 447, Sala 01',
    district: 'Centro',
    city: 'Balneário Barra do Sul',
    state: 'SC',
    postalCode: '89247-000',
    country: 'BR'
  },
  geo: { lat: -26.4590934, lng: -48.6072763 },
  mapsUrl:
    'https://www.google.com/maps/place/Ideal+dent+Odontologia/@-26.4590934,-48.6072763,17z/data=!4m6!3m5!1s0x94d93139116421e5:0x11f51902e0b3897d!8m2!3d-26.4590934!4d-48.6072763!16s%2Fg%2F11rttytk_d',
  mapsCid: 'https://maps.google.com/?cid=1293967968089377149',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-26.4590934,-48.6072763',
  wazeUrl: 'https://waze.com/ul?ll=-26.4590934,-48.6072763&navigate=yes',
  mapEmbed:
    'https://www.google.com/maps?q=Ideal+dent+Odontologia,+Av.+Am%C3%A2ndio+Cabral,+447,+Balne%C3%A1rio+Barra+do+Sul+-+SC&ll=-26.4590934,-48.6072763&z=16&output=embed',
  // dayIdx: 0 = domingo ... 6 = sábado
  hours: [
    { label: 'Segunda a sexta', days: [1, 2, 3, 4, 5], open: '09:00', close: '19:00' },
    { label: 'Sábado', days: [6], open: '09:00', close: '12:00' },
    { label: 'Domingo', days: [0], open: null, close: null }
  ],
  rating: { value: 4.9, count: 14, source: 'Google' },
  responsible: { name: 'Dra. Marcela Guimarães', cro: 'CRO/SC 11536' }
} as const

export const fullAddress = `${clinic.address.street}, ${clinic.address.district}, ${clinic.address.city} - ${clinic.address.state}, ${clinic.address.postalCode}`

export interface TeamMember {
  name: string
  role: string
  cro?: string
  areas: string[]
  bio: string
  quote?: { text: string; source: string }
  // Coloque a foto em /public/images e informe o caminho aqui, ex: '/images/dra-marcela.webp'
  photo?: string
  initials: string
}

export const team: TeamMember[] = [
  {
    name: 'Dra. Marcela Guimarães',
    role: 'Cirurgiã-dentista',
    cro: 'CRO/SC 11536',
    areas: ['Ortodontia', 'Aparelho transparente', 'Implantes'],
    bio: 'A Dra. Marcela cuida da ortodontia, do aparelho fixo ao transparente, e dos implantes. Quando a clínica passou a levar o nome dela, o recado para os pacientes foi este:',
    quote: {
      text: 'Mudamos o nome, mas seguimos com a essência do cuidado, da confiança, da dedicação e amor pela odontologia.',
      source: 'Instagram @ideal_dramarcela'
    },
    initials: 'MG'
  },
  {
    name: 'Dr. Jhuan Prado',
    role: 'Cirurgião-dentista',
    // TODO: informar o CRO do Dr. Jhuan antes de publicar (exigência do CFO para publicidade).
    areas: ['Tratamento de canal', 'Clínica geral'],
    bio: 'Nas avaliações do Google, os pacientes citam o Dr. Jhuan pelo nome. Uns chegaram com dor de dente, outros com medo de sentar na cadeira, e contam que saíram aliviados.',
    quote: {
      text: 'Dr. Jhuan, super atencioso comigo, fez todo procedimento, sai do consultório aliviado…',
      source: 'Adilson Andrade da Silva, no Google'
    },
    initials: 'JP'
  }
]

export interface Review {
  author: string
  text: string
  badge?: string
}

// Avaliações públicas do Google Maps, transcritas sem edição.
export const reviews: Review[] = [
  {
    author: 'Fernanda Andrade',
    text: 'Eu não suporto ir ao dentista, mas fui, me surpreendi, o dr que me atendeu me trouxe uma paz, que no final deu tudo certo e meu problema foi resolvido, sem dor, sem traumas! Amei o trabalho do dr, nome do que me atendeu e Jhuan!'
  },
  {
    author: 'Adilson Andrade da Silva',
    text: 'Cheguei com muita dor de dente, Dr. Jhuan, super atencioso comigo, fez todo procedimento, sai do consultório aliviado, e até hoje, após o tratamento de canal, nunca mais tive dor, super indico Dr. Jhuan Prado, profissional comprometido na área que atua!!!'
  },
  {
    author: 'Marileia dos Santos Zoz',
    badge: 'Local Guide',
    text: 'Faz tempo que estive na clínica, quebrei um dente, era véspera de Natal, esse profissional me atendeu, e ainda paguei depois, não tinha dinheiro, e era um dente da frente. Fez um ótimo trabalho, atencioso, ótimo atendimento.'
  },
  { author: 'Paciente no Google', text: 'O valor bem acessível façam o orçamento nessa clínica vale a pena.' },
  { author: 'Paciente no Google', text: 'Só o procurem, ótimo preço, ótimo profissional.' },
  { author: 'Paciente no Google', text: 'Muito bom atendimento e profissionais competentes!' }
]

export interface Faq {
  q: string
  a: string
}

export const homeFaq: Faq[] = [
  {
    q: 'Onde fica a Ideal Dent Odontologia?',
    a: 'Na Av. Amândio Cabral, 447, Sala 01, no Centro de Balneário Barra do Sul (SC), CEP 89247-000.'
  },
  {
    q: 'Qual o horário de atendimento?',
    a: 'De segunda a sexta, das 9h às 19h. Aos sábados, das 9h ao meio-dia. Domingo a clínica fica fechada.'
  },
  {
    q: 'Como marco uma consulta?',
    a: 'Pelo WhatsApp (47) 99129-1617 ou pelo telefone fixo (47) 3448-3924. Conta o que você precisa e a equipe passa os horários disponíveis.'
  },
  {
    q: 'Ideal Dent, Odontologia Ideal e Clínica Dra. Marcela Guimarães são a mesma clínica?',
    a: 'Sim. A clínica anunciou no Instagram @ideal_dramarcela que passou a levar o nome da Dra. Marcela Guimarães. Endereço, WhatsApp e equipe continuam os mesmos.'
  },
  {
    q: 'Quebrei um dente. Consigo atendimento rápido?',
    a: 'Manda mensagem no WhatsApp contando o que aconteceu, de preferência com uma foto. A equipe confere a agenda e informa o primeiro horário livre. Se achar o pedaço do dente, guarde num pote com leite ou soro.'
  },
  {
    q: 'Quanto custa o tratamento?',
    a: 'Depende do caso, por isso o valor sai depois da avaliação. Nas avaliações do Google, os pacientes costumam comentar que o preço é acessível.'
  },
  {
    q: 'Quais tratamentos a clínica faz?',
    a: 'Aparelho transparente, aparelho ortodôntico fixo, facetas dentárias, tratamento de canal, implante dentário, tratamento de gengivite, limpeza e prevenção, restaurações e conserto de dente quebrado.'
  },
  {
    q: 'Tenho muito medo de dentista. E agora?',
    a: 'Fala isso logo na primeira mensagem. Muita gente que chega com medo conta depois, nas avaliações, que foi atendida com calma e saiu sem dor.'
  }
]

// '09:00' -> '9h', '12:30' -> '12h30'
export const fmtHour = (t: string) => {
  const [h, m] = t.split(':')
  return `${Number(h)}h${m === '00' ? '' : m}`
}
