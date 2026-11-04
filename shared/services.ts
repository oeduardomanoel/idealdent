import type { Faq } from './clinic'

export type IconName =
  | 'aligner'
  | 'braces'
  | 'sparkle'
  | 'root'
  | 'implant'
  | 'gum'
  | 'brush'
  | 'tooth'

export interface Service {
  slug: string
  name: string
  icon: IconName
  short: string
  h1: string
  seoTitle: string
  seoDescription: string
  intro: string[]
  signsTitle: string
  signs: string[]
  steps: { title: string; text: string }[]
  faq: Faq[]
  keywords: string[]
}

export const services: Service[] = [
  {
    slug: 'aparelho-transparente',
    name: 'Aparelho transparente',
    icon: 'aligner',
    short: 'Placas transparentes e removíveis que alinham os dentes por etapas. Quase ninguém percebe.',
    h1: 'Aparelho transparente em Balneário Barra do Sul',
    seoTitle: 'Aparelho transparente (alinhadores) em Balneário Barra do Sul',
    seoDescription:
      'Alinhe os dentes com placas transparentes e removíveis. Avaliação com a Dra. Marcela Guimarães na Ideal Dent, Centro de Balneário Barra do Sul. Agende pelo WhatsApp.',
    intro: [
      'O aparelho transparente usa uma sequência de placas feitas sob medida para a sua boca. Cada placa move os dentes um pouco, até eles chegarem na posição planejada.',
      'Você tira a placa para comer e escovar os dentes, e ela quase não aparece em foto, reunião ou conversa.'
    ],
    signsTitle: 'Costuma ser indicado para',
    signs: [
      'Dentes tortos ou apinhados',
      'Espaços entre os dentes',
      'Alguns tipos de problema de mordida',
      'Quem já usou aparelho e os dentes voltaram a entortar',
      'Quem quer discrição durante o tratamento'
    ],
    steps: [
      { title: 'Avaliação', text: 'A Dra. Marcela examina dentes, gengiva e mordida e diz se o seu caso funciona com alinhadores.' },
      { title: 'Planejamento', text: 'O movimento de cada dente é planejado antes de começar, e você vê a previsão do resultado.' },
      { title: 'Uso das placas', text: 'Cada placa é usada por um período e depois trocada pela próxima da sequência.' },
      { title: 'Contenção', text: 'No final, uma contenção segura os dentes no lugar novo.' }
    ],
    faq: [
      { q: 'Quanto tempo dura o tratamento com aparelho transparente?', a: 'Depende de cada caso. A previsão sai depois da avaliação e do planejamento.' },
      { q: 'Preciso usar a placa o dia inteiro?', a: 'Sim. Em geral a recomendação é de 20 a 22 horas por dia, tirando só para comer e escovar os dentes.' },
      { q: 'Aparelho transparente serve para todo mundo?', a: 'Não. Alguns movimentos dão mais resultado com aparelho fixo. A dentista avalia e indica o melhor caminho para você.' }
    ],
    keywords: ['aparelho transparente', 'alinhadores', 'alinhador invisível', 'ortodontia estética']
  },
  {
    slug: 'aparelho-ortodontico',
    name: 'Aparelho ortodôntico',
    icon: 'braces',
    short: 'O aparelho fixo de braquetes e fio, para alinhar os dentes e acertar a mordida.',
    h1: 'Aparelho ortodôntico em Balneário Barra do Sul',
    seoTitle: 'Aparelho ortodôntico fixo em Balneário Barra do Sul',
    seoDescription:
      'Aparelho ortodôntico fixo para crianças, adolescentes e adultos. Alinhamento dos dentes e correção da mordida na Ideal Dent, em Balneário Barra do Sul (SC).',
    intro: [
      'O aparelho fixo, com braquetes colados nos dentes e um fio que passa por eles, é um dos jeitos mais usados de alinhar o sorriso e corrigir a mordida.',
      'Ele é ajustado nas consultas de manutenção, e a cada ajuste os dentes avançam mais um pouco na direção certa.'
    ],
    signsTitle: 'Quando vale procurar',
    signs: [
      'Dentes tortos, encavalados ou com espaço',
      'Mordida cruzada, aberta ou muito profunda',
      'Dificuldade para mastigar ou dor na articulação da mandíbula',
      'Criança com dentes nascendo fora do lugar'
    ],
    steps: [
      { title: 'Avaliação', text: 'Exame clínico e, quando necessário, radiografias para planejar o tratamento.' },
      { title: 'Instalação', text: 'Os braquetes são colados nos dentes e o fio é encaixado. Não precisa de anestesia.' },
      { title: 'Manutenções', text: 'Consultas periódicas para ajustar o fio e acompanhar a evolução.' },
      { title: 'Contenção', text: 'Depois de tirar o aparelho, a contenção mantém os dentes alinhados.' }
    ],
    faq: [
      { q: 'Aparelho ortodôntico dói?', a: 'Nos primeiros dias depois de instalar ou ajustar, é comum os dentes ficarem sensíveis. Esse incômodo passa em pouco tempo.' },
      { q: 'De quanto em quanto tempo é a manutenção do aparelho?', a: 'Em geral, uma vez por mês. A dentista define o intervalo ideal para o seu caso.' },
      { q: 'Adulto pode usar aparelho?', a: 'Pode. Não existe idade máxima, desde que gengiva e osso estejam saudáveis.' }
    ],
    keywords: ['aparelho ortodôntico', 'aparelho fixo', 'ortodontia', 'ortodontista Balneário Barra do Sul']
  },
  {
    slug: 'facetas-dentarias',
    name: 'Facetas dentárias',
    icon: 'sparkle',
    short: 'Camadas finas coladas na frente dos dentes para mudar cor, formato e tamanho.',
    h1: 'Facetas dentárias em Balneário Barra do Sul',
    seoTitle: 'Facetas dentárias em Balneário Barra do Sul',
    seoDescription:
      'Facetas para corrigir cor, formato, manchas e dentes desgastados. Planejamento do sorriso na Ideal Dent Odontologia, Centro de Balneário Barra do Sul.',
    intro: [
      'Facetas são camadas finas de material estético coladas na frente dos dentes. Elas mudam cor, formato e tamanho e disfarçam manchas, desgastes e pequenos desalinhamentos.',
      'Podem ser feitas em resina composta ou em cerâmica. Qual usar depende do seu caso e do resultado que você procura, e isso é decidido na avaliação.'
    ],
    signsTitle: 'Resolvem bem',
    signs: [
      'Dentes manchados que não clareiam',
      'Dentes pequenos, curtos ou com formato irregular',
      'Pontas lascadas ou desgastadas',
      'Pequenos espaços entre os dentes da frente'
    ],
    steps: [
      { title: 'Avaliação', text: 'A dentista olha dentes, gengiva e mordida para saber se faceta é a melhor opção.' },
      { title: 'Planejamento do sorriso', text: 'Formato e cor são pensados para combinar com o seu rosto.' },
      { title: 'Preparo e aplicação', text: 'As facetas são aplicadas e ajustadas uma a uma.' },
      { title: 'Revisões', text: 'Polimento e acompanhamento para elas durarem mais.' }
    ],
    faq: [
      { q: 'Precisa desgastar o dente para colocar faceta?', a: 'Depende da técnica e do material. Em muitos casos de resina, o desgaste é mínimo ou nenhum. A dentista explica na avaliação.' },
      { q: 'Quanto tempo dura uma faceta?', a: 'Com boa higiene e revisões, duram anos. As de resina pedem polimento e manutenção com mais frequência que as de cerâmica.' },
      { q: 'Faceta fica com cara de dente falso?', a: 'O planejamento leva em conta o formato do rosto, o tom da pele e o sorriso de cada pessoa justamente para o resultado ficar natural.' }
    ],
    keywords: ['facetas dentárias', 'facetas de resina', 'lentes de contato dental', 'estética dental']
  },
  {
    slug: 'tratamento-de-canal',
    name: 'Tratamento de canal',
    icon: 'root',
    short: 'Tira a infecção de dentro do dente, acaba com a dor e salva o dente.',
    h1: 'Tratamento de canal em Balneário Barra do Sul',
    seoTitle: 'Tratamento de canal (endodontia) em Balneário Barra do Sul',
    seoDescription:
      'Dor de dente forte? O tratamento de canal elimina a infecção e salva o dente. Atendimento com o Dr. Jhuan Prado na Ideal Dent, Balneário Barra do Sul.',
    intro: [
      'Quando a cárie ou uma pancada chega no nervo do dente, aparece aquela dor que não deixa dormir. O tratamento de canal limpa a parte de dentro do dente, tira a infecção e evita que ele precise ser arrancado.',
      'É feito com anestesia. Nas avaliações do Google, quem fez canal com o Dr. Jhuan conta que chegou com muita dor e saiu aliviado.'
    ],
    signsTitle: 'Sinais de que pode ser canal',
    signs: [
      'Dor forte, latejante ou que acorda você à noite',
      'Dor ao mastigar ou ao encostar no dente',
      'Sensibilidade ao quente ou ao frio que demora para passar',
      'Inchaço ou bolinha na gengiva',
      'Dente escurecendo'
    ],
    steps: [
      { title: 'Diagnóstico', text: 'Exame e radiografia para confirmar se o nervo foi atingido.' },
      { title: 'Anestesia', text: 'O dente é anestesiado antes de qualquer procedimento.' },
      { title: 'Limpeza dos canais', text: 'A parte infectada é removida e os canais são limpos e preenchidos.' },
      { title: 'Restauração', text: 'O dente é fechado e, se precisar, recebe uma coroa para ficar mais forte.' }
    ],
    faq: [
      { q: 'Tratamento de canal dói?', a: 'O procedimento é feito com anestesia. O que costuma doer é o dente infeccionado antes do tratamento.' },
      { q: 'Quantas sessões leva um tratamento de canal?', a: 'Pode ser feito em uma ou mais sessões, dependendo do dente e do tamanho da infecção.' },
      { q: 'Depois do canal preciso colocar coroa?', a: 'Muitas vezes sim, porque o dente tratado fica mais frágil. O dentista indica a melhor restauração para o seu caso.' }
    ],
    keywords: ['tratamento de canal', 'endodontia', 'dor de dente', 'dentista urgência Barra do Sul']
  },
  {
    slug: 'implante-dentario',
    name: 'Implante dentário',
    icon: 'implant',
    short: 'Repõe o dente perdido com um pino de titânio e uma coroa com cara de dente natural.',
    h1: 'Implante dentário em Balneário Barra do Sul',
    seoTitle: 'Implante dentário em Balneário Barra do Sul',
    seoDescription:
      'Perdeu um dente? O implante dentário devolve a mastigação e o sorriso. Avaliação com a Dra. Marcela Guimarães na Ideal Dent, Balneário Barra do Sul (SC).',
    intro: [
      'O implante é um pino de titânio colocado no osso, no lugar da raiz do dente perdido. Depois que ele se integra ao osso, recebe uma coroa que fica com aparência e função de dente natural.',
      'Ele não depende dos dentes vizinhos, que não precisam ser desgastados como numa ponte fixa.'
    ],
    signsTitle: 'Para quem é',
    signs: [
      'Quem perdeu um ou mais dentes',
      'Quem usa prótese móvel que machuca ou fica solta',
      'Quem evita sorrir por causa de um espaço vazio',
      'Quem tem dificuldade para mastigar'
    ],
    steps: [
      { title: 'Avaliação', text: 'Exame da boca e de imagem para ver a quantidade e a qualidade do osso.' },
      { title: 'Cirurgia', text: 'O implante é colocado com anestesia local.' },
      { title: 'Integração', text: 'Um período de espera para o implante se firmar no osso.' },
      { title: 'Coroa', text: 'A coroa definitiva é feita e instalada sobre o implante.' }
    ],
    faq: [
      { q: 'Qualquer pessoa pode fazer implante dentário?', a: 'É preciso avaliar o osso e a saúde geral. Diabetes descontrolada e cigarro, por exemplo, pedem cuidado extra.' },
      { q: 'Quanto tempo leva do implante até o dente pronto?', a: 'Costuma levar alguns meses, que é o tempo do implante se integrar ao osso. Em alguns casos dá para usar um dente provisório nesse período.' },
      { q: 'A cirurgia de implante dói?', a: 'É feita com anestesia local. Nos dias seguintes pode haver inchaço e desconforto, controlados com a medicação indicada.' }
    ],
    keywords: ['implante dentário', 'implantodontia', 'dente perdido', 'prótese sobre implante']
  },
  {
    slug: 'gengivite',
    name: 'Tratamento de gengivite',
    icon: 'gum',
    short: 'Gengiva que sangra não é normal. Tratada cedo, a gengivite some.',
    h1: 'Tratamento de gengivite em Balneário Barra do Sul',
    seoTitle: 'Gengivite: sintomas e tratamento em Balneário Barra do Sul',
    seoDescription:
      'Gengiva sangrando, inchada ou com mau hálito? Veja os sintomas da gengivite e como tratar. Atendimento na Ideal Dent Odontologia, Balneário Barra do Sul.',
    intro: [
      'Gengiva que sangra na escovação não é normal. É o sinal mais comum da gengivite, uma inflamação causada pela placa bacteriana que se acumula perto da gengiva.',
      'Tratada cedo, ela some. Deixada de lado, pode evoluir para periodontite, que destrói o osso que segura o dente e faz ele amolecer.'
    ],
    signsTitle: 'Sintomas da gengivite',
    signs: [
      'Sangramento ao escovar ou passar fio dental',
      'Gengiva vermelha, inchada ou sensível',
      'Mau hálito que não passa',
      'Gengiva se afastando do dente'
    ],
    steps: [
      { title: 'Avaliação', text: 'Exame da gengiva para medir a inflamação e ver se já existe perda de osso.' },
      { title: 'Limpeza profissional', text: 'Remoção da placa e do tártaro, inclusive abaixo da gengiva quando necessário.' },
      { title: 'Cuidado em casa', text: 'Orientação de escovação e fio dental para o seu caso.' },
      { title: 'Retorno', text: 'Consulta para conferir se a gengiva voltou ao normal.' }
    ],
    faq: [
      { q: 'Gengivite tem cura?', a: 'Tem. Com limpeza profissional e higiene correta em casa, a gengiva volta ao normal.' },
      { q: 'Devo parar de escovar onde a gengiva sangra?', a: 'Não. O sangramento melhora justamente com escovação e fio dental bem feitos.' },
      { q: 'Gengivite pode fazer o dente cair?', a: 'A gengivite não, mas se ela evoluir para periodontite, pode. Por isso vale tratar no começo.' }
    ],
    keywords: ['gengivite', 'gengiva sangrando', 'periodontia', 'mau hálito']
  },
  {
    slug: 'limpeza-dental',
    name: 'Limpeza e prevenção',
    icon: 'brush',
    short: 'Remove o tártaro que a escova não alcança e pega problemas ainda pequenos.',
    h1: 'Limpeza dental em Balneário Barra do Sul',
    seoTitle: 'Limpeza dental e prevenção em Balneário Barra do Sul',
    seoDescription:
      'Limpeza dental profissional, remoção de tártaro e check-up. Previna cárie e problemas de gengiva na Ideal Dent Odontologia, Centro de Balneário Barra do Sul.',
    intro: [
      'A limpeza no consultório tira o tártaro que a escova e o fio não conseguem remover. É também a hora de achar cárie e problema de gengiva enquanto ainda são pequenos.',
      'Resolver no começo costuma ser mais simples, mais rápido e mais barato do que tratar depois.'
    ],
    signsTitle: 'O que entra na consulta',
    signs: [
      'Remoção de tártaro e placa',
      'Polimento dos dentes',
      'Avaliação de cáries e da gengiva',
      'Orientação de escovação e fio dental'
    ],
    steps: [
      { title: 'Exame', text: 'Avaliação de dentes, gengiva e restaurações antigas.' },
      { title: 'Limpeza', text: 'Remoção do tártaro e da placa acumulada.' },
      { title: 'Polimento', text: 'Dentes lisos acumulam menos placa e manchas.' },
      { title: 'Plano de cuidado', text: 'Você sai sabendo quando voltar e o que observar em casa.' }
    ],
    faq: [
      { q: 'De quanto em quanto tempo devo fazer limpeza no dentista?', a: 'Em geral, a cada seis meses. Quem tem tendência a tártaro ou problema de gengiva pode precisar de intervalos menores.' },
      { q: 'Quando trocar a escova de dentes?', a: 'A cada três meses, ou antes disso se as cerdas estiverem abertas.' },
      { q: 'A limpeza deixa os dentes mais brancos?', a: 'Ela tira manchas superficiais de café, chá e cigarro, mas não muda a cor natural do dente. Para isso existem outros tratamentos, que a dentista pode indicar.' }
    ],
    keywords: ['limpeza dental', 'tártaro', 'profilaxia', 'check-up odontológico']
  },
  {
    slug: 'dente-quebrado',
    name: 'Dente quebrado e restaurações',
    icon: 'tooth',
    short: 'Dente lascado, restauração que caiu ou cárie aparecendo. Quanto antes, mais simples.',
    h1: 'Dente quebrado e restaurações em Balneário Barra do Sul',
    seoTitle: 'Dente quebrado e restauração em Balneário Barra do Sul',
    seoDescription:
      'Quebrou um dente ou caiu uma restauração? Reconstrução com resina na cor do dente na Ideal Dent, Balneário Barra do Sul. Chame no WhatsApp (47) 99129-1617.',
    intro: [
      'Dente da frente lascado, restauração que soltou, cárie começando a aparecer. Quanto antes você resolve, mais simples costuma ser o tratamento.',
      'Na maioria dos casos dá para reconstruir o dente com resina na cor dele, e ninguém percebe a diferença.'
    ],
    signsTitle: 'Quando procurar',
    signs: [
      'Dente lascado ou quebrado depois de pancada ou mordida',
      'Restauração que caiu ou ficou com buraco',
      'Comida prendendo sempre no mesmo lugar',
      'Mancha escura ou buraco no dente'
    ],
    steps: [
      { title: 'Mensagem', text: 'Manda no WhatsApp o que aconteceu e, se puder, uma foto.' },
      { title: 'Avaliação', text: 'O dentista vê o tamanho do dano e se o nervo foi atingido.' },
      { title: 'Reconstrução', text: 'O dente é restaurado com resina na cor natural.' },
      { title: 'Ajuste final', text: 'Mordida conferida e polimento para ficar liso e natural.' }
    ],
    faq: [
      { q: 'Quebrei um dente. O que eu faço agora?', a: 'Se achar o pedaço, guarde num pote com leite ou soro. Evite mastigar daquele lado e chame a clínica no WhatsApp contando o que aconteceu.' },
      { q: 'Restauração branca dura quanto tempo?', a: 'Dura anos com boa higiene e revisões. O desgaste depende da mordida e de hábitos como ranger os dentes.' },
      { q: 'Dente quebrado sempre precisa de canal?', a: 'Não. Só quando a quebra atinge o nervo. A maioria dos casos se resolve com restauração.' }
    ],
    keywords: ['dente quebrado', 'restauração dentária', 'resina', 'dentista urgência']
  }
]

export const getService = (slug: string) => services.find((s) => s.slug === slug)
