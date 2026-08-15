/**
 * Os textos das duas demonstrações e do cartão da abertura em inglês. As
 * chaves são as mesmas de `demos.pt.js`, na mesma ordem — o pt continua sendo
 * a fonte.
 *
 * O vocabulário é o do vidraceiro de língua inglesa: sheet, offcut, rack,
 * square, tempered, cutting plan. "Offcut" nunca vira "leftover" nem "scrap":
 * scrap é o que vai para o caçamba, offcut é o que ainda vale dinheiro — e a
 * demonstração inteira existe para provar exatamente essa diferença.
 *
 * Rótulo de botão foi escolhido pelo comprimento: a barra de ação é estreita
 * no celular e o rótulo mais longo daqui tem 24 caracteres.
 */
export default {
  // ── A demonstração da indústria: chapa, cavalete e a chapa não aberta ──
  retalho: {
    baloes: {
      pronto: 'This is your rack. Six offcuts, each with a code and a location.',
      otimizando: 'The system looks here first — two of them fit this order.',
      plano: 'Without the rack, this order would open these new sheets. Follow the orange part.',
      realocando: 'The orange part is leaving the new sheet and moving into the offcut.',
      economia: 'The orange part fitted the offcut. This sheet was never bought.',
    },
    barra: {
      titulo: 'Cutting optimization',
      pedido: 'Order 26-0431 · 8 mm clear',
      passo: (n, total) => `Step ${n} of ${total}`,
    },

    // O desenho: o rótulo de cada chapa e o que o leitor de tela ouve.
    desenho: {
      chapa: 'Sheet',
      retalho: 'Offcut',
      aria: (tipo, id, pecas) => `${tipo} ${id} with ${pecas} parts`,
      chapaNova: 'New sheet · the one you pay for',
      cavalete: 'On the rack · offcuts from other orders',
      plano: (chapas) => `The plan · ${chapas} new sheets`,
      chapaN: (n) => `Sheet ${n}`,
      retalhoN: (n) => `Offcut ${n}`,
      cavaletePrimeiro: (pecas) => `Rack first · ${pecas} parts`,
      entaoChapaNova: (novas, antes) => `Only then new sheet · ${novas} instead of ${antes}`,
      naoAberta: (n) => `Sheet ${n} · never used`,
    },

    // Os cinco formatos do pedido de exemplo.
    pecas: {
      portaBox: 'Shower door',
      fixoLateral: 'Fixed side panel',
      prateleira: 'Shelf',
      espelho: 'Bathroom mirror',
      tampo: 'Table top',
    },

    pronto: {
      selo: 'The order that came in',
      titulo: (pecas, formatos) => `${pecas} parts, ${formatos} sizes`,
      texto:
        'An ordinary Tuesday order. There is nothing for you to fill in — hit the button and watch what the system does on its own.',
    },

    otimizando: {
      selo: 'Optimizing',
      titulo: 'Building the cutting plan…',
      linhas: {
        lendo: (pecas) => `Reading ${pecas} parts off the order`,
        respeitando: 'Holding thickness, colour and grain',
        testando: 'Testing fits and turning parts',
        ordenando: 'Sorting into cutting table sequence',
      },
    },

    plano: {
      selo: 'Plan ready',
      titulo: (chapas, aproveitamento) => `${chapas} sheets · ${aproveitamento} yield`,
      texto: 'That is already a good plan. Every optimizer on the market stops here.',
      achou: 'Raw material sitting on the rack',
      servem: (retalhos) => `${retalhos} offcuts fit this order.`,
      jaPago: 'already paid for',
      parados:
        'They have been leaning on the wall since another order. As long as nobody uses them, they are money standing still.',
    },

    /* A tela do estoque de retalhos — a fase nova.
       Ela responde a objeção que o dono de fábrica não diz em voz alta: "sobra
       boa eu já tenho; o que me falta é saber o que é e onde está". Por isso o
       texto gira em torno de código, endereço e cadastro automático — a
       economia fica para a tela seguinte. */
    /* A tela do cavalete. A primeira versão era uma tabela de seis linhas —
       correta e ilegível. Virou desenho, e sobrou pouco texto de propósito. */
    catalogo: {
      selo: 'Your rack today · 6 offcuts on file',
      cavalete: 'Rack',
      legendaServe: 'fit this order',
      legendaEspera: 'waiting for the right order',
      painel: {
        selo: 'The rack under control',
        titulo: (n) => `${n} offcuts the system knows`,
        frase:
          'Intelligence that stores leftovers: the software works out today\u2019s cut already thinking about how the offcuts get used on the orders that follow.',
        pontos: [
          ['Every offcut becomes a part with a code', 'RT-0412, not "that big sheet behind the shower door".'],
          ['With an address on the rack', 'Whoever fetches it finds it on the first trip.'],
          ['Nobody keys anything in', 'The record is written at the end of the run that left the offcut.'],
        ],
      },
    },

    realocando: {
      selo: 'Re-nesting',
      titulo: 'Rack first, new sheet after…',
      linhas: {
        medindo: (retalhos) => `Measuring the ${retalhos} offcuts on the rack`,
        movendo: (pecas) => `Moving ${pecas} parts into them`,
        refazendo: 'Rebuilding the plan for the new sheets',
        baixa: 'Booking the used offcuts out of stock',
      },
    },

    economia: {
      selo: 'What you are not going to spend',
      titulo: '1 whole sheet',
      subtitulo: 'that never gets used',
      dinheiro: {
        selo: 'The sheet you never bought',
        texto: (n) => (n === 1 ? 'One sheet less on this order.' : `${n} sheets less on this order.`),
        origem: (p) => `Based on a reference sheet at ${p}. The real figure moves with thickness, colour and region — the number is yours to set.`,
      },
      placar: {
        m2: (m2) => `${m2} m²`,
        m2Texto: 'of raw material back in play',
        pecas: (noCavalete, total) => `${noCavalete} of ${total}`,
        pecasTexto: 'parts came off the rack',
        aproveitamento: (antes, depois) => `${antes} → ${depois}`,
        aproveitamentoTexto: 'yield on the sheets used',
        retalhos: (retalhos) => `${retalhos} offcuts`,
        retalhosTexto: 'gone from the wall',
      },
      // O destaque é uma palavra só, em gradiente, no meio da frase — por isso
      // ela vem partida em três e não como uma frase inteira.
      pergunta: {
        antes: 'That was',
        destaque: 'one',
        depois: 'order. How many does your plant close in a week?',
      },
      sozinho:
        'In the system this second button does not even exist: it checks the rack on its own, before every plan. Nobody has to remember, and nobody has to feel like it.',
    },

    // Um rótulo por fase da máquina de estados.
    botoes: {
      otimizar: 'Optimize the cut',
      otimizando: 'Optimizing…',
      realocando: 'Re-nesting…',
      verEstoque: 'See the offcut stock',
      usarRetalhos: (retalhos) => `Use the ${retalhos} offcuts`,
      agendar: 'Do this with my order',
      denovo: 'Run it again',
    },

    nota: {
      padrao: 'A real order, run as a simulation. Nothing is sent anywhere.',
      economia: 'Arithmetic from a real optimizer, running inside your browser.',
    },
  },

  // ── A demonstração da vidraçaria: do vão medido ao PDF na mão ──────────
  orcamento: {
    ficha: {
      rotulo: 'Job sheet',
      titulo: 'Filling itself in',
      vao: 'Opening',
      peca: 'Item',
      folhas: 'Leaves',
      esperando: 'to be set',
      nota: 'Every answer becomes data on the spot. Nobody retypes it later — not in the office, not in the factory.',
    },
    escolhas: {
      tipo: { rotulo: 'What goes in this opening?', opcoes: ['Door', 'Window', 'Enclosure'] },
      folhas: { rotulo: 'How many leaves?', opcoes: ['2 leaves', '3 leaves', '4 leaves'] },
    },
    baloes: {
      vao: 'A bare opening on site. Every job starts right here.',
      medindo: 'The measurement is typed once. It is the opening, not the glass.',
      tipo: 'The system asks what goes there. One tap, no typing.',
      folhas: 'And how many leaves. The price changes here, and it already knows.',
      orcamento: 'Part by part, with hardware and labour. Nothing was retyped.',
      gerando: 'The PDF comes out with your logo, ready for the customer to sign.',
      pdf: 'This reaches the customer before you leave the site.',
    },
    barra: {
      titulo: 'NeoGlass on the phone · on site',
      cliente: (nome) => `Customer ${nome}`,
      passo: (n, total) => `Step ${n} of ${total}`,
    },

    obra: {
      vao: 'Living room window',
      parede: 'masonry',
    },

    desenho: {
      aria: 'The opening measured on site',
      janela: '2 sliding leaves · 6 mm',
      medindo: 'noting the diagonals…',
      vaoVazio: 'The opening, still bare',
      vaoMedido: 'Opening measured on site',
      montando: 'Fitting the window to the opening',
      janelaDoVao: 'The window for this opening',
      pdfGerado: 'PDF ready',
      prontoCliente: 'Ready for the customer',
      oOrcamento: 'The quote you just put together',
    },

    // As quatro linhas do orçamento. O valor de cada uma chega formatado.
    itens: {
      vidro: {
        nome: 'Tempered glass, 6 mm clear',
        detalhe: (medida, m2) => `2 leaves · ${medida} mm · ${m2} m²`,
      },
      kit: {
        // "Sliding kit" era o nome da caixa de ferragem, não o do produto que
        // o cliente comprou. A linha do orçamento diz a janela, como na tabela
        // de preços de qualquer vidraçaria.
        nome: 'Sliding window, 2 leaves',
        detalhe: 'top and bottom track, rollers, latch',
      },
      perfil: {
        nome: 'Profile, gasket and trim',
        detalhe: 'sealing and finishing the opening',
      },
      instalacao: {
        nome: 'Fitting and sealing',
        detalhe: 'labour, 1 day · travel',
      },
    },

    documento: {
      empresa: 'Your Glass Shop',
      marca: 'your name, your phone number',
      orcamento: 'Quote',
      cliente: 'Customer',
      servico: 'Job',
      servicoValor: (vao, medida) => `${vao} · ${medida}`,
      total: 'Total',
      validade: 'Valid for 10 days · 7 working days from approval',
      assinatura: 'customer signature',
    },

    vao: {
      selo: 'What you did on site',
      titulo: (vao, medida) => `${vao} · ${medida}`,
      // "Thirty seconds with the phone in your hand" era número inventado: o
      // site não mede isso em lugar nenhum. Saiu, e no lugar entrou a divisão
      // de trabalho, que é verificável — ele dá três coisas, o resto é do
      // sistema.
      texto:
        'A photo, two measurements and the type of wall. That is all the system asks of you — the rest it puts together on its own.',
      ficha: {
        vao: 'Opening',
        parede: 'Wall',
        esquadro: 'Diagonals',
        esquadroValor: '1,947 and 1,951 mm',
        foto: 'Photo',
        fotoValor: '2 images attached',
      },
      chamada: 'Now hit the button. You will not type another thing.',
    },

    montando: {
      selo: 'Fitting',
      titulo: 'Fitting the window to your measurement…',
      linhas: {
        folhas: 'Picking 2 sliding leaves for this opening',
        folga: (folga, sobreposicao) =>
          `Taking off ${folga} mm clearance and ${sobreposicao} mm overlap`,
        somando: 'Adding track, rollers, latch and sealing',
        precos: 'Pulling the prices from your own list',
      },
    },

    lista: {
      selo: (numero) => `Quote ${numero}`,
      titulo: 'Done, and you typed nothing.',
      total: 'Total for the customer',
      rodape: (m2, itens) =>
        `${m2} m² of glass, ${itens} lines, not one sum done in your head. The prices come from your list — these here are only an example.`,
    },

    pdf: {
      selo: 'Document ready',
      titulo: 'With your name on it, not ours.',
      texto:
        'Logo, phone number, validity, lead time and the signature line. This is the piece of paper that makes the customer see a company instead of a handshake — and it came out on its own.',
      linhas: {
        logo: 'Your logo and your details in the header',
        prazo: 'Validity and lead time in writing',
        assinatura: 'Signature on screen or on paper',
        via: 'A copy filed with the order, for good',
      },
    },

    enviar: {
      selo: 'That simple',
      toques: '3 taps',
      // O cronômetro só entra quando o visitante levou menos de 90 segundos.
      segundos: (segundos) => ` and ${segundos} seconds`,
      semTempo: ', zero typing',
      textoTempo:
        'That is what it took you just now, from opening to finished quote. On site it is the same road — with the customer watching.',
      textoSemTempo:
        'From the opening to the finished quote you did not type a single measurement. On site it is the same road — with the customer watching.',
      escolha: 'Pick how it goes out',
      canais: {
        whatsapp: 'WhatsApp',
        email: 'E-mail',
        pdf: 'Download PDF',
      },
      aprovar: 'And when he approves it, the order goes into production with the cutting sizes.',
      ninguem:
        'Nobody retypes it, nobody calls to confirm the thickness, and the offcut left over from that sheet goes back into your stock with its size on it.',
    },

    preco: {
      selo: 'What it costs',
      porMes: '/month',
      /* Aqui dizia que o preço era por vidraçaria e não por pessoa, e logo
         abaixo "sem custo por usuário". O dono do projeto avisou em 13/08 que
         a regra de cobrança por usuário NÃO está definida, então as duas eram
         promessa que a fatura não cumpre. No lugar entrou o que é verdade e
         vende igual: o preço não muda com o tempo. Volta a falar de usuário no
         dia em que a regra existir. */
      porVidracaria: 'One price, today and a year from now.',
      // O valor chega pronto de `config.js` — a moeda muda com o idioma.
      conta: (valor) => `The quote you just put together came to ${valor}.`,
      contaEnfase: 'That was one window.',
      pagaMeses: (meses) => `That one job alone pays for ${meses} months of the system.`,
      naoCobramos: {
        implantacao: 'No setup fee',
        orcamento: 'No charge per quote',
        fidelidade: 'No lock-in',
      },
      teste: (dias) =>
        `${dias} days free, no card. Put together this week’s quotes and decide afterwards — decide nothing and nothing is charged.`,
      semTeste: 'No lock-in: if it does not fit your day, you cancel from the screen itself.',
    },

    whatsapp: {
      titulo: (numero, vao, medida) => `Quote ${numero} — ${vao} ${medida}`,
      item: (nome, valor) => `• ${nome}: ${valor}`,
      total: (valor) => `Total: ${valor}`,
      rodape: 'Put together in the demo on the NeoGlass site.',
    },

    // Um rótulo por fase, na ordem em que o visitante os aperta.
    botoes: {
      usarVao: 'Use this opening',
      montando: 'Fitting…',
      gerando: 'Making the PDF…',
      gerarPdf: 'Make the customer PDF',
      enviar: 'Send it to the customer',
      naObra: 'I want this on my jobs',
      incluido: 'See everything included',
      denovo: 'run it again',
      zap: 'Send this quote to my WhatsApp',
    },

    nota: {
      padrao: 'Example figures. In the system they come from your own price list.',
      preco:
        'This is the price, not a range. It is the quote above that is an example.',
    },
  },

  // ── O cartão que troca de face na abertura ─────────────────────────────
  /* ── The project wizard, being used ─────────────────────────────────── */
  projeto: {
    tocar: 'See how it works',
    denovo: 'Play again',
    pronto: 'Project done. Under a minute.',
    titulo: 'Add opening',
    continuar: 'Continue',
    cancelar: 'Cancel',
    passos: {
      canvas: {
        titulo: 'Create 2D Project',
        voltar: 'Back',
        botoes: ['Import DXF', 'Library', 'Export DXF', 'Save project'],
        vazio: 'No glass yet',
        vazioDica: 'Tap «Add glass» to start.',
      },
      montando: 'Building the project…',
      vao: {
        rotulo: 'Step 1 — What kind of opening?',
        opcoes: ['Recess · floor to ceiling', 'Recess · between two walls', 'One wall only', 'Free-standing'],
      },
      medida: { rotulo: 'Step 2 — What are the measurements?', largura: 'Opening width', altura: 'Opening height' },
      tipo: {
        rotulo: 'Step 3 — What goes in it?',
        opcoes: [
          ['Shower screen', 'Sliding · Hinged · Pivot'],
          ['Door', 'Sliding · Hinged · Pivot'],
          ['Window', 'Sliding · Hinged · Pivot · Awning'],
          ['Fixed panel', 'Fixed'],
        ],
      },
      folhas: {
        rotulo: 'Step 5 — Model',
        opcoes: [
          ['Sliding window · 2 panels', '1 fixed + 1 sliding'],
          ['Sliding window · 3 panels', '2 fixed + 1 sliding'],
          ['Sliding window · 4 panels', '2 fixed + 2 sliding · open from centre'],
        ],
      },
      montagem: {
        rotulo: 'Test the opening',
        sub: 'Sliding window · 4 panels',
      },
    },
  },

  cartao: {
    ia: 'AI',
    otimizacao: {
      selo: 'Cutting optimization',
      plano: 'Plan 26-0431 · 8 mm clear',
      resumo: '7 parts · 1 offcut',
    },
    expedicao: {
      selo: 'Dispatch · load 118',
      peca: 'Part P5 scanned on the way out',
      medida: '600 × 1150 · 10 mm · tempered',
      conferidas: '5 of 7 checked',
    },
    fechamento: {
      selo: 'Order closed',
      // O valor em reais é escrito no componente: aqui só entra a palavra.
      receita: (valor) => `26-0431 · revenue ${valor}`,
      materia: 'Material',
      producao: 'Production and overhead',
      margem: 'Margin on this order',
    },
  },
}
