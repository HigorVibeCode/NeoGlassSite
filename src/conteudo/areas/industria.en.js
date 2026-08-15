/**
 * Os textos da aba Indústria em inglês. As chaves são as mesmas de
 * `industria.pt.js`, na mesma ordem — o pt continua sendo a fonte.
 *
 * Não é tradução linha a linha: o leitor é dono de fábrica de vidro, e o
 * vocabulário é o dele (sheet, offcut, rack, square, tempering, cutting plan).
 * "Offcut" nunca vira "leftover" — leftover é comida.
 *
 * O título da abertura foi remontado, não traduzido: em português o destaque
 * cai em "é lucro", e em inglês a frase só fecha se o gradiente pegar
 * "is profit" — mesma função, palavra diferente.
 */
export default {
  // ── A abertura (FL. 01/06) ────────────────────────────────────────────
  hero: {
    rotulo: 'NeoGlass · flat glass processing',
    verOtimizacao: 'See the optimisation run',
    etiqueta: 'Inside the system',
    titulo: {
      antes: 'Before buying a new sheet, NeoGlass',
      destaque: 'searches the offcuts.',
    },
    /* A segunda metade dizia a margem pelo lado fraco — pela venda que não
       aconteceu ("without selling a square metre more"). Agora é a inversão do
       pt (vender mais × desperdiçar menos), que é a lógica com que o dono já
       decide. Em inglês falado de fábrica quem lucra "makes money", não
       "profits"; e os dois gerúndios ficam sem "by" dos dois lados para o
       contraste bater no mesmo ritmo do português. */
    texto: 'Cutting optimisation, offcuts, production, tracking and dispatch connected to the same order.',
    // Ponto decimal em vez de vírgula: o número é o mesmo, muda só a
    // convenção de leitura. A unidade (m²) fica, é padrão do setor também
    // em inglês.
    /* A terceira marca era "0 licença por posto". Saiu em 13/08 pelo mesmo
       motivo que as outras promessas sobre cobrança: a regra de usuários do
       sistema não está definida, e prometer o que a fatura não cumpre é a
       forma mais cara de perder a confiança que a página constrói. */
    marcas: [
      ['87.4%', 'yield on the cutting plan'],
      ['3.42 m²', 'of raw material saved'],
      ['0', 'spreadsheets to keep'],
    ],
  },

  // ── A demonstração do retalho (FL. 02/06) ─────────────────────────────
  demo: {
    rotulo: 'Demo · the rack before the sheet',
    /* O título repetia o hero ("look at what's already on the rack") e o texto
       gastava quatro frases explicando um botão. Agora o título é o resultado
       que ele VÊ acontecer, e o texto cabe em duas linhas: o resto ele descobre
       apertando, que é o motivo de existir uma demonstração. */
    titulo: 'Three sheets become two. Right in front of you.',
    texto:
      'A real 20-piece order, run by the same optimizer, right here in your browser. Hit the button and watch where the raw material stops being bought.',
    nota: 'The numbers in this section come from the demo — they are not a customer average.',
  },

  producao: {
    rotulo: 'Production',
    titulo: 'The raw material comes in once. The information follows the piece all the way.',
    etapas: ['Order', 'Optimisation', 'Cutting', 'Processing', 'Production', 'Dispatch'],
  },

  rastreio: {
    rotulo: 'Tracking',
    titulo: 'Know where every piece is without asking three people.',
    campos: [
      ['Code', 'P-184'],
      ['Order', '26-0431'],
      ['Stage', 'Tempering'],
      ['Owner', 'Bench 2'],
      ['Time', '14:22'],
      ['Destination', 'Load 118'],
    ],
  },

  financeiro: {
    rotulo: 'The order in money',
    titulo: 'Do not just look at revenue. Look at the margin per order.',
    linhas: [
      ['Revenue', 'what this order billed'],
      ['Raw material', 'the glass that went in'],
      ['Production', 'cutting, tempering, processing'],
      ['Costs', 'what left besides the glass'],
      ['Result', 'the margin of this order'],
    ],
  },

  faq: {
    rotulo: 'Common questions',
    titulo: 'Before you request the demo.',
    itens: [
      [
        'Does the demo use one of my orders?',
        'Yes. You bring a real order. We build it in the system and you leave with its cutting plan.',
      ],
      [
        'Are the optimisation numbers from customers?',
        'No. Yield and square metres saved come from the demo running in the browser. They are not a plant average.',
      ],
      [
        'Do I need to replace the cutting table?',
        'No. The plan comes out as DXF, CNI and FBT — or straight into Opty-Way and Perfect Cut.',
      ],
      [
        'Does this replace the production control I already have?',
        'The order starts carrying optimisation, cutting, tracking and dispatch. You stop asking in three places where the piece is.',
      ],
    ],
  },

  // ── O contraste em duas colunas (FL. 04/06) ───────────────────────────
  contraste: {
    rotulo: 'What changes on the shop floor',
    titulo: 'You see the difference on Monday.',
    hoje: 'Today, without a glass system',
    pares: [
      [
        'A good offcut goes on the rack and off the books',
        'Back into stock with size, colour and rack',
      ],
      [
        '“Where’s my order?” — someone walks down to the floor',
        'Stage, time and who has it, on screen',
      ],
      [
        'The price comes out of whatever the salesman remembers',
        'The price comes off the list; margin closes order by order',
      ],
      /* O lado direito dizia que o sistema acusa o fora de esquadro antes do
         corte. Essa checagem NÃO EXISTE no produto e saiu de vez: no lugar dela
         entram os formatos de saída, com os dois nomes de mesa que o comprador
         reconhece. Não reintroduzir a checagem em nenhuma redação. */
      [
        'The wrong size turns up with the glass already tempered',
        'It comes out as DXF, CNI and FBT — or straight into Opty-Way and Perfect Cut',
      ],
      /* G-code saiu junto: o sistema não gera G-code. O par ficou sendo sobre o
         retrabalho de CAD, que é onde a mesa para. */
      [
        'The plan is redrawn in CAD while the table sits there waiting',
        'The plan lands ready and goes straight to the table',
      ],
    ],
  },

  // ── A chamada final (FL. 06/06) ───────────────────────────────────────
  chamada: {
    rotulo: 'Request a demo',
    /* "We build it in front of you" vendia a velocidade da montagem. A promessa
       que pesa é a de saída: ele vai embora com o plano de corte do pedido dele
       na mão, depois de quarenta minutos. */
    titulo: 'Bring one of your own orders. You leave with its cutting plan.',
    texto:
      'The walkthrough runs on the live system, not on slides. If it doesn’t add up for your operation, you have lost forty minutes and gained a diagnosis.',
    passos: [
      'You show us a real order of yours',
      'We build it in the system, live',
      'You watch the cutting plan come out at the end',
    ],
  },
}
