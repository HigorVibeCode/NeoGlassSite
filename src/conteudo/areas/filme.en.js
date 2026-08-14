/**
 * O filme de rolagem, em inglês. Mesmas chaves e mesma ordem de `filme.pt.js`.
 *
 * O inglês é mais curto que o português quase sempre, então aqui o aperto de
 * largura nos SVG não morde. Vocabulário de chão de fábrica: sheet/lite,
 * offcut, rack, opening, square, tempering, cutting plan, hardware, dispatch.
 *
 * Números, medidas, códigos, datas e nomes próprios ficam como no português.
 */
export default {
  // ── O cabeçalho da seção, em volta do palco ───────────────────────────
  secao: {
    aria: 'One order moving through the system',
    rotulo: 'One order, six stages · plays by itself',
    // SH. de sheet, a numeração de prancha
    folha: 'SH. 03/06',
    /* Era "from the phone on site to the margin on screen" — dois lugares e
       nenhum verbo. O que o filme mostra é um pedido só atravessando a empresa
       inteira sem ninguém redigitar nada. */
    titulo: 'One order, from the site to the invoice. Nobody retypes a thing.',
  },

  // ── A narração das seis cenas ─────────────────────────────────────────
  cenas: [
    {
      etapa: 'Quote',
      titulo: 'Photo on site, quote done.',
      sub: 'Every visit, every measurement, every change the customer asks for lands on the timeline. Photos stack into a carousel — today’s version in front, the older ones right behind it.',
      medidor: (n) => `Entries on this quote · ${n}/4`,
    },
    {
      etapa: 'Approval',
      /* "He approves it before it exists" era enigma: o leitor precisa parar
         para entender quem é "he" e o que não existe. Numa cena de quatro
         segundos, enigma é tempo perdido. */
      titulo: 'The customer sees the glass on his own wall.',
      sub: 'The AI fits the glass into the photo of the customer’s own room. He sees the door where it will stand, on his own wall, before a single lite is cut.',
      medidor: (n) => `Checking the order · ${n}/4`,
    },
    {
      etapa: 'Cutting',
      /* "Cut it right" é o mínimo que se espera de qualquer sistema, então não
         é promessa. O que impressiona é a sobra sair do chão e virar
         matéria-prima com endereço. */
      titulo: 'The offcut comes off the floor and goes into stock.',
      sub: 'The cutting plan comes out ready for the table. And the piece left over goes back on the rack with its size, its color and its address, to compete for the next optimization.',
      medidor: (p) => `Yield · ${p}%`,
      medidorFim: 'Offcut reserved · rack A-03',
    },
    {
      etapa: 'Production',
      titulo: 'Every piece has an address.',
      sub: 'Each piece leaves with a label and a code. It moves through the stages on screen, and delivery is signed off by scanning that code — not by the memory of whoever carried it.',
      medidor: (n) => `Pieces checked at dispatch · ${n}/5`,
    },
    {
      etapa: 'Money',
      titulo: 'At the end, you know what’s left.',
      sub: 'Invoice issued, payment slip out and the order closed: raw material, production and running costs down to the real margin on that order — not the monthly average.',
      medidor: (p) => `Margin on this order · ${p}%`,
    },
    {
      etapa: 'Any screen',
      titulo: 'It opens wherever you are.',
      sub: 'The office on a desktop, the foreman on a tablet next to the table, the salesman on a phone out on site. Same order, same minute — and nothing to install.',
      medidor: (n) => `Screens open at once · ${n}/3`,
    },
  ],

  // ── Os rótulos dentro dos SVG ─────────────────────────────────────────
  telas: {
    feed: {
      aria: 'The quote as a feed, on the salesman’s phone',
      titulo: 'Quote 26-0431',
      situacao: 'In progress',
      cliente: 'Marina Duarte',
      endereco: 'Apt. 142 · Aurora Bldg',
      abas: ['Feed', 'Items', 'Proposal'],
      versoes: (n) => `${n} versions`,
      posts: [
        {
          nome: 'Marcos Ribeiro',
          papel: 'sales',
          hora: 'Tue 09:20',
          legenda: 'Living room opening · 1180 × 2100 mm',
        },
        {
          nome: 'Marina Duarte',
          papel: 'customer',
          hora: 'Tue 15:44',
          rotulo: 'Note',
          texto: 'I’d rather have sliding, not hinged.',
        },
        {
          nome: 'Ana Silveira',
          papel: 'office',
          hora: 'Wed 08:05',
          legenda: 'Black hardware · exposed roller',
        },
        {
          nome: 'Marcos Ribeiro',
          papel: 'sales',
          hora: 'Wed 11:38',
          rotulo: 'Size change',
          texto: '1180 → 1175 mm wide',
        },
      ],
    },

    ambiente: {
      abas: ['Before', 'After'],
    },
    antes: {
      aria: 'The customer’s room today, without the glass',
      selo: 'SITE PHOTO',
    },
    simulacao: {
      aria: 'The same room with the glass fitted by the AI',
      montando: 'FITTING THE GLASS',
      pronto: 'AI GENERATED',
      aprovar: 'Approve design',
      item: 'Sliding door',
      especificacao: '10 mm clear · 1175 × 2100',
    },
    checagem: {
      aria: 'The AI checks the order before production',
      titulo: 'Order check',
      sub: '26-0431 · before it drops to the shop floor',
      pilula: 'AI · active',
      itens: [
        { titulo: 'Thickness', valor: '10 mm · 1175 opening' },
        { titulo: 'Hardware', valor: '100 kg roller · 42 kg leaf' },
        { titulo: 'Square', valor: '4 mm at the head · confirm' },
        { titulo: 'Lead time', valor: 'tempering fits in 5 days' },
      ],
      pendencia: '1 item open before release',
      pendenciaSub: 'confirm the square with the installer',
    },

    plano: {
      aria: 'Cutting plan for one 3210 × 2250 sheet: seven pieces and one offcut',
      retalho: 'OFFCUT',
      retalhoReservado: 'OFFCUT RESERVED',
      especificacao: '8 mm · clear',
      cavalete: 'RACK A-03',
    },

    sistema: {
      url: 'neoglass.online/otimizacao',
      titulo: 'Optimization',
      pedido: '26-0431 · 8 mm clear',
      exportar: 'Export',
      gerarArquivos: 'Generate files',
      gerar: 'Generate',
      rodape: {
        aproveitamento: 'Yield',
        pecas: 'Pieces',
        retalho: 'Offcut',
      },
    },
    aparelhos: {
      navegador: 'The cutting plan open on a desktop',
      tablet: 'The cutting plan open on a tablet',
      celular: 'The cutting plan open on a phone',
    },

    producao: {
      aria: 'Production board with the pieces by stage',
      titulo: 'Production board',
      sub: '12 open orders · 38 pieces in progress',
      aoVivo: 'live',
      fases: ['Cutting', 'Edging', 'Tempering', 'Dispatch'],
      especificacao: '10 mm clear',
      transito: 'out of tempering',
    },
    etiqueta: {
      aria: 'The piece label, with its code',
      cabecalho: 'NEOGLASS · LABEL',
      especificacao: '10 mm clear · tempered',
      pedido: 'Order 26-0431',
      cliente: 'Marina Duarte · Apt. 142',
    },
    expedicao: {
      aria: 'Dispatch signs off the load by scanning the code',
      titulo: 'Dispatch',
      sub: 'Load 118 · leaves 14:20',
      conferidas: 'CHECKED',
      item: (p) => `Piece ${p} · checked`,
      parcial: 'Part delivery · 5 of 7 pieces',
    },

    nota: {
      aria: 'The invoice issued by the system',
      sub: 'series 1 · order 26-0431',
      cliente: 'Marina Duarte · CPF 000.000.000-00',
      autorizada: 'Cleared',
      itensRotulo: 'ITEMS',
      itens: ['Sliding door 10 mm', 'Roller kit 100 kg'],
      tributos: 'TAXES · NEW MODEL',
      total: 'Invoice total',
      protocolo: 'protocol 135260004871234 · 04/08 14:31',
      danfe: 'DANFE e-mailed to the customer',
    },
    recebimento: {
      aria: 'The payment slip issued and the money expected',
      titulo: 'Payment',
      emAberto: 'Open',
      boleto: 'Slip 26-0431/1',
      vencimento: 'due 12/09 · single payment',
    },
    margem: {
      aria: 'The order closed, with the real margin',
      titulo: 'Order closed',
      sub: '26-0431 · delivered 04/08',
      fechado: 'Closed',
      custos: ['Raw material', 'Production', 'Running costs'],
      custoTotal: 'Total cost',
      venda: 'Sale',
      rotulo: 'MARGIN ON THIS ORDER',
    },

    vitrine: {
      aria: {
        plano: 'Optimized cutting plan',
        margem: 'The order closed out',
        feed: 'Quote as a timeline',
      },
      pecasCortadas: '7 pieces cut',
      umRetalho: '1 offcut',
      receita: 'REVENUE',
      entrega: 'Invoice issued · slip out · delivered in 5 days',
      pedidoCliente: '26-0431 · Marina Duarte',
      clienteCurto: 'Marina Duarte · Apt. 142',
      versoesFoto: '3 versions of this photo',
    },
  },
}
