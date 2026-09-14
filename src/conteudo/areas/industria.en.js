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
  projeto: {
    rotulo: 'See the technology at work',
    titulo: 'From a sentence to a project. Watch it happen.',
    texto: 'This demonstration simulates the design of an opening. AI prepares a draft; a person chooses, checks and confirms the project before it moves on.',
  },
  diferenciais: {
    rotulo: 'Technology built for glass',
    titulo: 'More than running the factory. Change how an order begins.',
    itens: [
      { nome: 'Voice or text becomes a draft', texto: 'Describe a piece or opening as you would to your team. NeoGlass organises measurements and details for review; AI does not replace checking.' },
      { nome: 'A project you can see', texto: '2D drawings, 3D views and cutting geometry make the order visible before it reaches the table. Changes start from the project, not a loose spreadsheet.' },
      { nome: 'Files for the machine', texto: 'Plans and contours can be exported in production formats. The .g and .cni engines have been validated on real cutting tables; your team stays in control of release.' },
    ],
  },

  laco: {
    modulo: 'NeoGlass Optimization',
    rotulo: 'The offcut becomes stock',
    etiqueta: 'Offcut',
    codigo: 'Code',
    medida: 'Size',
    prateleira: 'Shelf',
    feito: 'Registered',
  },

  reconhecimento: {
    titulo: 'The good offcut is your quietest loss.',
    texto: 'Every order leaves a piece of glass that still works. It leans against the rack, nobody logs it, and next week you buy a new sheet for a cut that was already there.',
    destaque: 'Glass that is left over and slips out of control is a sheet paid for twice.',
  },

  resultado: {
    titulo: 'Less glass. Less waste. Less spreadsheet.',
    itens: [
      { nome: 'Less glass bought', texto: 'Before opening a new sheet, the system looks in the offcuts. Every offcut used is a sheet that never made it onto the bill.' },
      { nome: 'Nothing becomes forgotten waste', texto: 'The offcut leaves the cut already with a code, its size and a rack address. It exists in stock without anyone logging it.' },
      { nome: 'One system', texto: 'The optimizer, the stock and the label are the same thing. Nothing is exported, nothing is retyped — that is why the offcut is never lost.' },
    ],
  },
  percurso: {
    titulo: 'The same order continues through delivery.',
    texto: 'Cutting savings are only part of it. Orders, production and dispatch work from the same information.',
    etapas: [
      { nome: 'Order', texto: 'Measurements, price and lead time stay together from the start.' },
      { nome: 'Cutting', texto: 'The plan considers available sheets and offcuts.' },
      { nome: 'Production', texto: 'The team follows the stage of each lite.' },
      { nome: 'Dispatch', texto: 'Checks and delivery remain linked to the order.' },
    ],
    nota: 'Illustrative preview of NeoGlass areas. Select a screen to view the module.',
  },
  // ── A abertura (FL. 01/06) ────────────────────────────────────────────
  hero: {
    rotulo: 'NeoGlass · platform for the glass industry',
    verProjeto: 'See the technology in action',
    etiqueta: 'Technology built for glass',
    titulo: {
      antes: 'Next-generation technology for',
      destaque: 'the glass industry.',
    },
    /* A segunda metade dizia a margem pelo lado fraco — pela venda que não
       aconteceu ("without selling a square metre more"). Agora é a inversão do
       pt (vender mais × desperdiçar menos), que é a lógica com que o dono já
       decide. Em inglês falado de fábrica quem lucra "makes money", não
       "profits"; e os dois gerúndios ficam sem "by" dos dois lados para o
       contraste bater no mesmo ritmo do português. */
    texto: 'AI, parametric design, optimisation and production connected in one platform built for the reality of your factory.',
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
    rotulo: 'The value shows up in cutting, too',
    acao: 'Run the demonstration',
    /* O título repetia o hero ("look at what's already on the rack") e o texto
       gastava quatro frases explicando um botão. Agora o título é o resultado
       que ele VÊ acontecer, e o texto cabe em duas linhas: o resto ele descobre
       apertando, que é o motivo de existir uma demonstração. */
    titulo: 'Before opening a new sheet, look at what you already have.',
    texto:
      'A real 20-piece order, run by the same optimizer, right here in your browser. Hit the button and watch where the raw material stops being bought.',
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
    rotulo: 'Book the walkthrough',
    /* "We build it in front of you" vendia a velocidade da montagem. A promessa
       que pesa é a de saída: ele vai embora com o plano de corte do pedido dele
       na mão, depois de vinte minutos. */
    titulo: 'Bring a real order. Watch NeoGlass work on it.',
    texto:
      'The walkthrough runs on the live system, not on slides. If it doesn’t add up for your operation, you have lost twenty minutes and gained a diagnosis.',
    passos: [
      'You show us a real order of yours',
      'We build it in the system, live',
      'You see the project and cutting plan on screen',
    ],
  },
}
