/**
 * A aba Plataforma em inglês. O pt.js da área continua sendo a fonte: mesma
 * árvore, mesmas chaves, mesma ordem.
 *
 * Não é tradução linha a linha — é a mesma ideia dita por quem trabalha com
 * vidro em inglês: sheet/lite, offcut (nunca "leftover"), rack, opening,
 * square, tempering, cutting plan.
 */
export default {
  hero: {
    rotulo: 'The platform · from the inside',
    etiqueta: 'Inside the system',
    titulo: {
      antes: 'One order. From quote to invoice.',
      destaque: 'Without switching systems.',
    },
    texto:
      'Every step works from the same information, from first contact to delivery.',
    marcas: [
      ['7', 'modules, one single order'],
      ['4', 'output formats for the table'],
      ['0', 'spreadsheets between one step and the next'],
    ],
  },

  abertura: {
    verDemonstracao: 'See a demo',
    whatsapp: 'Hi! I came from the NeoGlass site.',
  },


  /* ── 02 · What we built ────────────────────────────────────────────────
     The names are the module labels from inside the system, copied from the
     platform's own `src/i18n/en.js`. Whoever reads this page and then opens
     NeoGlass finds the same words in the same place. */
  construimos: {
    rotulo: 'What we built',
    titulo: 'What is already built.',
    ambientes: {
      admin: 'Admin',
      pedidos: 'Orders',
      producao: 'Production',
      design: 'Design',
      financeiro: 'Finance',
    },
  },

  devolve: {
    rotulo: 'What it gives back each month',
    titulo: 'The gain is not on a screen. It is in what stops happening.',
    itens: [
      [
        'The sheet you did not have to open',
        'Every offcut on a rack is glass you have already paid for once. Until it has a size, a colour and a rack address, nobody can sell it again — and it turns into expensive waste.',
      ],
      [
        'The phone that did not ring',
        'When the customer can see what stage his order is at, he stops calling. And when he stops calling, nobody inside the plant has to walk down to the floor to find the answer.',
      ],
      [
        'The glass that did not come back',
        'An opening out of square, a thickness that will not carry the weight, hardware that does not exist in that size: all of it is cheap to fix before the table and expensive to fix after tempering.',
      ],
      [
        'The margin you can finally see',
        'Not the month’s — each order’s. Raw material, production and revenue close on the same screen, so you know which kind of job is worth taking again.',
      ],
    ],
  },

  /* O módulo 'Checagem do pedido' saiu da lista nos quatro idiomas: a
     ferramenta não existe no sistema. Os números foram corridos de 01 a 07 e
     o título deixou de dizer oito. */
  modulos: {
    rotulo: 'Module index',
    titulo: 'Seven modules. All of them open in the same plant, every day.',
    selo: 'in production',
    lista: [
      ['01', 'Quote and proposal', 'Feed with a site photo, the measurements and a signature on the customer’s screen'],
      ['02', 'AI simulation', 'The glass in the customer’s room before the piece exists'],
      ['03', 'Cutting optimization', 'Offcuts go into the plan first; output in DXF, G-code, ASC and CNI+FBT'],
      ['04', 'Stock and offcuts', 'Every offcut with its size, colour, thickness and rack address'],
      ['05', 'Production and tracking', 'A label and a code on every piece, with stage, time and who handled it'],
      ['06', 'Dispatch and delivery', 'Scanned on the way out, the load checked piece by piece'],
      ['07', 'Finance per order', 'Invoice, payment and the real margin of that order, not of the month'],
    ],
  },

  // Os tipos ('celular', 'tablet', 'navegador') são chave de desenho, não
  // texto: ficam iguais nos quatro idiomas.
  aparelhos: {
    rotulo: 'Where it opens',
    titulo: 'The same order, from the glazier’s pocket to the cutting table.',
    lista: [
      ['celular', 'On site', 'Measure, photograph, price it and take the signature — on your feet, in the customer’s hallway.'],
      ['tablet', 'At the bench', 'The production order and the piece label, right where the glass is being cut.'],
      ['navegador', 'In the office', 'The cutting plan, the queue at the table and closing the order.'],
    ],
  },

  /* O item brasileiro da reforma tributária (CBS, IBS, split payment) não
     existe fora do Brasil e não diria nada a este leitor. No lugar dele vai a
     nota eletrônica no formato que cada país está fechando — sem prazo e sem
     citar norma, porque nem o prazo nem a norma são nossos de prometer. */
  adiante: {
    rotulo: 'What comes next',
    titulo: 'What is not ready yet — and we would rather say so.',
    selo: 'on the way',
    itens: [
      [
        'AI simulation closer to the real thing',
        'The image we generate in the customer’s room still does not match the piece that leaves the plant 100%. Closing that gap is the work of right now.',
      ],
      [
        'Electronic invoicing',
        'Invoice formats are being rewritten market by market. We are preparing the issuing side so the invoice goes out in the format your country asks for. In preparation — no date we can promise yet.',
      ],
      [
        'More machine outputs',
        'Every cutting table speaks its own dialect; the list grows as the plants ask for them.',
      ],
    ],
  },

  chamada: {
    rotulo: 'Book the walkthrough',
    titulo: 'The best demo is an order of your own.',
    texto:
      'Forty minutes, the system open, no slides. You pick the module that matters most to you and we start there.',
    passos: [
      'You tell us where it hurts most today',
      'We open the module that deals with exactly that',
      'You watch a whole order cross the system',
    ],
  },

  formulario: {
    rotulo: 'Book a walkthrough',
    titulo: 'Leave your contact, I will get back to you.',
    nome: 'Your name',
    empresa: 'Company',
    whatsapp: 'WhatsApp with country code',
    perfis: [
      'Glass plant (cutting table and furnace)',
      'Glass shop',
      'Distributor / glass shop with cutting',
      'Other',
    ],
    enviando: 'Sending…',
    botao: 'Show me it running',
    erro: 'That did not go through just now. Message us on WhatsApp and I will answer you directly.',
    nota: 'No account, no mailing list. Your contact is only used to set up the walkthrough.',
    mensagem: (d) =>
      `Hi! I would like to see NeoGlass.\n\nName: ${d.nome}\nCompany: ${d.empresa}\nProfile: ${d.perfil}`,
    sucesso: {
      titulo: 'Got it.',
      texto:
        'I will come back on WhatsApp to set a time. If you would rather get ahead, the number is right below.',
      botao: 'Talk on WhatsApp now',
      whatsapp: 'Hi! I have just filled in the form on the NeoGlass site.',
    },
  },
}
