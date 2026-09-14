/**
 * Os textos do site em inglês. O pt.js continua sendo a fonte: quando uma frase
 * muda lá, ela muda aqui, e `npm run idiomas` avisa o que ficou para trás.
 *
 * Aqui não é tradução linha a linha — é a mesma ideia dita por quem trabalha
 * com vidro em inglês. Onde o português tem ritmo ou trocadilho, o inglês tem
 * o dele, que não é o mesmo. O vocabulário é o do setor: sheet/lite, offcut
 * (nunca "leftover"), rack, opening, square, tempering, cutting plan.
 *
 * A árvore é aninhada, e não uma lista plana de chaves, porque a copy deste
 * site é estruturada — pares de contraste, listas de módulos, cenas do filme.
 */
export default {
  // ── O que o Google e o WhatsApp leem ──────────────────────────────────
  paginas: {
    home: {
      nome: 'Home',
      titulo: 'NeoGlass · Software for everyone who works with glass',
      descricao:
        'Quotes, projects, cutting optimization and production for glass shops and flat glass factories.',
      ogTitulo: 'NeoGlass · Software for everyone who works with glass',
      ogDescricao: 'Quotes, projects, cutting optimization and production for glass shops and flat glass factories.',
    },
    industria: {
      nome: 'Industry',
      // Título começa pelo que o dono de fábrica procura no Google, não pela
      // marca: ninguém busca "NeoGlass" antes de saber que ele existe.
      titulo: 'NeoGlass Intelligence · Integrated AI for the glass industry',
      descricao:
        'Query production, sales and dispatch with NeoGlass Intelligence. Integrated AI to find answers in your glass factory’s data.',
      ogTitulo: 'NeoGlass · next-generation technology for the glass industry',
      ogDescricao:
        'Ask about production, sales and deliveries. Intelligence finds answers in your company data while respecting your permissions.',
    },
    vidracaria: {
      nome: 'Glass shops',
      titulo: 'Glass shop software: quotes and projects | NeoGlass',
      descricao:
        'Create quotes and projects on your phone, send a branded PDF and track every job in NeoGlass.',
      // O og é a frase que aparece quando alguém manda o link no WhatsApp —
      // vale ser mais falada e menos "de busca" que o título da aba.
      ogTitulo: 'Glass shop software: quotes and projects',
      ogDescricao:
        'Measure the opening, create the quote on your phone and send a branded PDF.',
    },
    plataforma: {
      nome: 'Platform',
      titulo: 'NeoGlass platform · Technology built inside a glass factory',
      descricao:
        'One system, from quote to delivery. Built inside the factory to connect cutting, production, dispatch and management.',
      ogTitulo: 'We are proud of what we built.',
      ogDescricao: 'A platform built inside a glass factory. One system, from quote to delivery.',
    },
    partner: {
      nome: 'Partner',
      titulo: 'NeoGlass Partner · Commercial partnership for the glass industry',
      descricao: 'Discover NeoGlass Partner: refer glass shops and manufacturers, track opportunities and learn about the reference commission model in Brazil.',
      ogTitulo: 'NeoGlass Partner · Recommend NeoGlass. Earn from every subscription.',
      ogDescricao: 'A commercial partnership for people connected to glass businesses.',
    },
    comecar: {
      nome: 'Start',
      titulo: 'Create your NeoGlass account · 14 days free, no card',
      descricao:
        'Create your account and use NeoGlass for 14 days with no credit card. Quoting, cut plans, offcuts and production for glass shops.',
      ogTitulo: 'Start with the next quote that comes in',
      ogDescricao: '14 days free, no card. The invitation reaches your inbox in moments.',
    },
    baixar: {
      nome: 'Install',
      titulo: 'Install NeoGlass · on phone, tablet and computer',
      descricao:
        'Install NeoGlass as an app on iPhone, Android or PC. It’s a PWA: no store, no file to download. The same system, in an icon on your screen.',
      ogTitulo: 'NeoGlass in an icon on your screen',
      ogDescricao: 'Install on phone, tablet or computer. Same system, same account, no store.',
    },
  },

  // ── O topo, o rodapé e os botões que aparecem em toda página ──────────
  chrome: {
    inicio: 'NeoGlass — home',
    publicos: "Who it's for",
    entrar: 'Log in',
    preco: 'Pricing',
    agendarCurto: 'Book 20 min',
    agendarLongo: 'Book a 20-minute walkthrough',
    comecarCurto: 'Get started',
    // Continua função porque o número de dias do teste vem da config, não do
    // texto — muda o plano, muda o botão sozinho.
    comecarGratis: (dias) => `Start free · ${dias} days`,
    comecarAgora: 'Start now',
    queroComecar: 'I want to start',
    falarWhatsapp: 'Talk to us on WhatsApp',
    rodapeTexto:
      'neoglass.online · modular software for flat glass processing and for the glass shop',
    paraQuem: 'Built for',
    contato: 'Contact',
    // Atendimento é brasileiro; quem lê em inglês precisa do fuso explícito.
    horarios: 'Mon–Fri, 2–8pm · Sat, 8am–5pm (BRT)',
    idioma: 'Language',
    // Cabeçalho da coluna da direita na tabela de contraste — a mesma frase
    // na indústria e na vidraçaria, por isso fica no tronco comum e não nos
    // módulos de área. Ver Contraste.jsx.
    comNeoGlass: 'With NeoGlass',
  },

  agenda: {
    semScript: 'The scheduler could not load here — the network or an extension blocked it.',
    abrirFora: 'Open the scheduler',
    carregando: 'Loading available times…',
    falarWhatsapp: 'No suitable time? Message me on WhatsApp.',
  },

  // ── As mensagens prontas do WhatsApp ──────────────────────────────────
  whatsapp: {
    demonstracao: 'Hi! I came from the NeoGlass site and I’d like to see a demo.',
    comecar: 'Hi! I want to start using NeoGlass in my glass shop.',
  },

  // ── De onde vem (aparece nas três páginas) ────────────────────────────
  origem: {
    rotulo: 'Where it came from',
    /* A segunda metade dizia o que o produto NÃO é ("not in a meeting about
       glass plant floors"). Esta fala de quem escreveu — o argumento mais forte
       e o único que um concorrente não copia. */
    titulo: 'Born inside a glass plant, written by people with decades in the trade.',
    fatos: [
      [
        // "Built in Switzerland" fica: é o diferencial que o comprador lembra.
        'Built in Switzerland',
        'where glass delivered late, or delivered out of square, is simply not an option',
      ],
      [
        'Written inside the plant',
        'no screen came out of a meeting: every one came out of a load that had to be cut twice',
      ],
      [
        'In production, not in prototype',
        'there are plants cutting and shipping with it today, while you read this page',
      ],
    ],
  },

  // O mesmo pedido atravessando a operação — a peça central do
  // posicionamento. Ver components/Fluxo.jsx.
  fluxo: {
    rotulo: 'The order, end to end',
    titulo: 'Nobody retypes the same order twice.',
    texto: 'The order is entered once and follows the whole company. Every step works from the same information — the one typed on site.',
    estadoRotulo: 'Where it is now',
    pedido: { numero: '26-0918', cliente: 'Marcos Ribeiro', vidro: 'Clear 6 mm toughened · 4 parts' },
    etapas: [
      { nome: 'Quote', estado: 'Proposal sent to the customer', detalhe: 'The site measurement became price, PDF and lead time. Nothing was typed again.' },
      { nome: 'Approval', estado: 'Approved by the customer', detalhe: 'Approval locks price and date, and releases the order to the factory.' },
      { nome: 'Production', estado: 'On the cutting table', detalhe: 'The cut plan came from the same order, offcuts already taken into account.' },
      { nome: 'Dispatch', estado: 'Picked for delivery', detalhe: 'Parts were checked against the order, not against a loose sheet of paper.' },
      { nome: 'Finance', estado: 'Margin calculated', detalhe: 'Revenue, raw material and production for this order, in one place.' },
    ],
    nota: 'The order number is the same across all five steps. That is the difference between a system and a pile of tools that do not talk to each other.',
  },
}
