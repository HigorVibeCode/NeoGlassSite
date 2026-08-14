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
    industria: {
      nome: 'Industry',
      // Título começa pelo que o dono de fábrica procura no Google, não pela
      // marca: ninguém busca "NeoGlass" antes de saber que ele existe.
      titulo: 'Flat glass processing software · NeoGlass',
      descricao:
        'From the quote you write on site to the cutting plan that reaches the table. Sheet optimization that puts every offcut back to work, piece tracked to the rack.',
      ogTitulo: 'Software for flat glass processing · NeoGlass',
      ogDescricao:
        'From the quote on site to the cutting plan on the table. Every offcut back in play.',
    },
    vidracaria: {
      nome: 'Glass shops',
      titulo: 'Glass shop software · Professional from the first quote',
      descricao:
        'Quote closed on site, every order followed from cut to delivery, offcuts back on the right rack. No spreadsheet, no notebook, no week of training.',
      // O og é a frase que aparece quando alguém manda o link no WhatsApp —
      // vale ser mais falada e menos "de busca" que o título da aba.
      ogTitulo: 'NeoGlass for glass shops · the quote is done before you drive back',
      ogDescricao:
        'Measure the opening, build the quote on your phone, send the PDF with your own logo. Flat price, no setup fee.',
    },
    plataforma: {
      nome: 'Platform',
      titulo: 'The NeoGlass platform · What it does for your month',
      descricao:
        'The modules already running on real shop floors, the AI under the hood, the app in the glazier’s pocket and what lands next. Built in Switzerland.',
      ogTitulo: 'Inside the NeoGlass platform',
      ogDescricao:
        'From quote to invoice without switching systems: the modules already running and what lands next.',
    },
  },

  // ── O topo, o rodapé e os botões que aparecem em toda página ──────────
  chrome: {
    inicio: 'NeoGlass — home',
    publicos: "Who it's for",
    entrar: 'Log in',
    preco: 'Pricing',
    verDemoCurto: 'See a demo',
    verDemo: 'See the system running',
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
}
