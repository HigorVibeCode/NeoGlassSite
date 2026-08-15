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
    verSistema: 'See the system running',
    texto:
      'Every step works from the same information, from first contact to delivery.',
    marcas: [
      ['1', 'order runs through everything'],
      ['4', 'output formats for the table'],
      ['0', 'spreadsheets between one step and the next'],
    ],
  },

  abertura: {
    verDemonstracao: 'See a demo',
    whatsapp: 'Hi! I came from the NeoGlass site.',
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
    rotulo: 'What works on the order',
    titulo: 'Everything works on the same order.',
    texto: 'Seven parts of the system. None of them asks you to retype what already went in.',
    selo: 'in production',
    lista: [
      ['01', 'Quote and proposal', 'You record the job and the customer without starting from scratch.'],
      ['02', 'AI simulation', 'The glass in the customer’s room before the piece exists.'],
      ['03', 'Cutting optimization', 'Finds offcuts before consuming a new sheet.'],
      ['04', 'Stock and offcuts', 'Use an offcut before buying another sheet.'],
      ['05', 'Production and tracking', 'Know where every piece is without asking three people.'],
      ['06', 'Dispatch and delivery', 'See what left, what is in progress and what is still missing.'],
      ['07', 'Finance per order', 'See this order’s margin, not just the month’s revenue.'],
    ],
  },

  // Os tipos ('celular', 'tablet', 'navegador') são chave de desenho, não
  // texto: ficam iguais nos quatro idiomas.
  aparelhos: {
    rotulo: 'Where it opens',
    titulo: 'The same order, from the glazier’s pocket to the cutting table.',
    texto: 'The same information, in different places.',
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
    rotulo: 'What is coming',
    titulo: 'What is coming.',
    grupos: [
      {
        selo: 'In development',
        itens: [
          [
            'AI simulation closer to the real thing',
            'The image we generate in the customer’s room still does not match the piece that leaves the plant 100%. Closing that gap is the work of right now.',
          ],
          [
            'More machine outputs',
            'Every cutting table speaks its own dialect; the list grows as the plants ask for them.',
          ],
        ],
      },
      {
        selo: 'Planned',
        itens: [
          [
            'Electronic invoicing',
            'Invoice formats are being rewritten market by market. We are preparing the issuing side so the invoice goes out in the format your country asks for. In preparation — no date we can promise yet.',
          ],
        ],
      },
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
