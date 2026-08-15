/**
 * A aba da vidraçaria em inglês. As chaves acompanham `vidracaria.pt.js` uma a
 * uma, na mesma ordem — quando uma frase muda lá, muda aqui.
 *
 * Não é tradução: é a mesma ideia dita por quem trabalha com vidro em inglês.
 * Vocabulário do setor — opening, lite, offcut (nunca "leftover"), rack,
 * square, cutting plan, clearance.
 *
 * DUAS DIFERENÇAS DE CONTEÚDO, de propósito:
 *   · `preco.texto` e `preco.caixaTitulo` recebem os mesmos argumentos do
 *     português e NÃO os usam. O total da demonstração (R$ 1.169) é um número
 *     em real: sai de preço de m² e ferragem do Brasil. Convertido não é
 *     verdade, e a conta de "quantos meses" fica errada em dólar. Aqui a caixa
 *     manda o leitor comparar com o retrabalho dele, que é número que ele tem;
 *   · nada sobre cobrança por usuário — a regra não está definida.
 */
export default {
  // ── A abertura ────────────────────────────────────────────────────────
  /* A frase que o Higor elegeu. Ela saiu do título quando a abertura
     passou a carregar o posicionamento, e ganhou bloco próprio aqui —
     é o primeiro argumento da página, logo antes da demonstração. */
  reconhecimento: {
    rotulo: 'Recognition',
    titulo: 'Everything in its place. Less to remember.',
    texto: 'You know what was agreed, what needs doing and what is happening.',
    destaque: 'Every quote you sent stays saved — you open it and see when it was and for how much.',
  },

  prova: {
    rotulo: 'The proof',
    titulo: 'Standardised projects in under a minute.',
    texto: 'You pick the type of part and the measurements. The project comes out finished, to standard, for the customer to see before any glass is cut.',
    legendas: ['The project in 3D, for the customer to rotate on screen', 'Hardware on and off in the same drawing', 'The same project becomes a quote and an order'],
  },

  resultado: {
    rotulo: 'The result',
    titulo: 'More order. More certainty. More control.',
    itens: [
      { nome: 'More order', texto: 'Every job with its measurement, its price and its date.' },
      { nome: 'More certainty', texto: 'What was agreed stays written down and does not get lost.' },
      { nome: 'More control', texto: 'You see what is still open without asking anyone.' },
    ],
  },

  memoria: {
    titulo: 'Every quote you sent stays saved.',
    texto: 'You open it and see what was agreed, when, and for how much.',
  },

  hero: {
    rotulo: 'NeoGlass · for the glass shop',
    etiqueta: 'See how it works',
    verOrcamento: 'See how it works',
    titulo: { antes: 'Your glass shop gets professional', destaque: 'without complicating anything.' },
    texto: 'You measure. NeoGlass handles the rest.',
  },

  // ── A demonstração do orçamento ───────────────────────────────────────
  demo: {
    rotulo: 'Demo · from opening to PDF, in 3 taps',
    /* O título carrega a seção sozinho — o parágrafo de apoio saiu. A promessa
       é a PROPOSTA EM PDF já pronta, ainda na obra: por isso a frase termina no
       documento, e não na assinatura. O tempo é medido pela trena e não por um
       cronômetro inventado — "before you put the tape away" é a unidade que o
       vidraceiro usa para dizer "foi rápido", e ele mesmo faz a conta. É a
       mesma imagem da linha das 08:40, de propósito. */
    titulo: 'Measure the opening. The PDF quote is ready before you put the tape away.',
  },

  // ── Um dia do vidraceiro ──────────────────────────────────────────────
  dia: {
    rotulo: 'One day, start to finish',
    titulo: 'Nothing new in your day. Just the rework taken out of it.',
    horas: [
      /* As quatro descrições eram listas de funcionalidade em ordem
         cronológica — cada uma explicava o que o SISTEMA faz. Reescritas para
         dizer o que o vidraceiro deixa de fazer naquele horário, que é o que
         ele reconhece do próprio dia. */
      [
        '08:40',
        'On site',
        'You measure, you photograph, you pick the spec. The customer signs on your screen before you put the tape away.',
      ],
      [
        '11:20',
        'In the workshop',
        'The order arrived with the clearances already taken off. Nobody called to check the thickness.',
      ],
      [
        '15:00',
        'At the bench',
        'Every piece labelled. And the offcut is already in stock, up for the next job.',
      ],
      [
        'Friday',
        'End of the week',
        'You know which jobs carried a margin and which only carried work. No spreadsheet to open.',
      ],
    ],
  },

  // ── O antes e o depois ────────────────────────────────────────────────
  contraste: {
    rotulo: 'What changes in your week',
    /* "Without the rework" descrevia a ausência de um problema. Esta diz o que
       a semana passa a ter — e "the same crew" mata na largada a objeção de
       que profissionalizar exige contratar alguém. "Delivering more and redoing
       less" listava dois efeitos e gastava o título nisso; a lista de pares
       logo abaixo já mostra os dois, um por linha. O título agora só nomeia o
       ganho, e deixa a prova para a lista. */
    titulo: 'The same crew, working far more efficiently.',
    hoje: 'Today, on the notepad and WhatsApp',
    pares: [
      [
        'The quote goes in a notebook and is gone by Monday',
        'It leaves your phone with a photo of the opening and a signature',
      ],
      [
        'The customer calls three times asking if it is ready',
        'He follows the order through a link, without calling',
      ],
      [
        'The offcut ends up behind the bench and turns into scrap',
        'It goes back into stock with its size — and into the next cutting plan',
      ],
      [
        'The size gets lost between the site notebook and the plant order',
        'The size you took is the size the plant cuts — the same one, never retyped',
      ],
      [
        'At the end of the month nobody knows which job made money',
        'The margin on every job is on the screen',
      ],
    ],
  },

  // ── O preço ───────────────────────────────────────────────────────────
  preco: {
    rotulo: 'Glass Shop Plan · what it costs and what it does not',
    /* "One number, and it stays that number" era o trocadilho da janela em
       outra forma: dizia do preço, não do que ele compra. Esta já entrega a
       comparação — um serviço contra doze meses. */
    titulo: 'One job a month pays for the whole year.',
    // `valor` chega e não é usado: ver o cabeçalho do arquivo. O parâmetro fica
    // na assinatura para as quatro versões terem a mesma forma.
    // "Keep that job in your head while you read the number below" pedia uma
    // tarefa ao leitor. Agora a frase já faz a conta por ele — que era o ponto.
    texto: () =>
      'The quote you just watched build itself was one living-room window — glass, hardware and fitting, the job you would take on any Tuesday. One of those a month, and the system is paid for with room to spare.',
    /* O nome do plano, no selo ao lado do número. Antes dizia "NeoGlass for
       glass shops" e estourava a pílula de ~120 px em caixa alta; e o visitante
       não tinha como saber se aquele preço valia para a fábrica também. São
       produtos e vendas diferentes: a indústria é consultiva e não tem preço
       em lugar nenhum do site. Máximo de ~18 caracteres aqui. */
    cota: 'Glass Shop Plan',
    // A aba da indústria chama-se "Industry" em inglês (ver paginas.industria
    // .nome em en.js) — o nome citado aqui tem que ser o mesmo do menu.
    soParaVidracaria:
      'This is the glass shop plan. A processing plant is a different product, priced case by case — see the Industry tab.',
    porMes: '/month',
    fixo: 'A flat price, the day you sign and a year from now.',
    semTaxa:
      'No setup fee and nothing charged per quote — you already know today what you will be paying in month twelve.',
    naoCobramos: [
      ['Setup', 'nothing to pay to get going'],
      ['Per quote', 'write as many as you like'],
      ['Lock-in', 'cancel whenever you want'],
    ],
    semCartao: (dias) =>
      `No card. At the end of the ${dias} days you decide — and if you decide nothing, nothing is charged.`,
    tudoIncluido: 'It is all in there',
    incluso: [
      'Quoting on site from your phone, with photo and signature',
      'Cutting list with the clearances already taken off, straight to production',
      'Offcut stock with size, colour and rack address',
      'Order tracking, from the cut to the delivery',
      'PDF with your logo, your lead time and your validity date',
      'The margin on every job at the end of the month',
      'WhatsApp support, from people who know glass',
    ],
    // A caixa do português compara a mensalidade com o total da demonstração em
    // real. Em dólar essa conta não existe, então a caixa faz o leitor comparar
    // com um número que é dele: o que ele cortou duas vezes no mês passado.
    caixaTitulo: () => 'Add up what you had to cut twice last month. That is the number to hold this against.',
    caixaTexto:
      'And the cutting optimization comes with it. Bought on its own, it is a second monthly bill — and nearly always a joining fee before you cut the first lite.',
    extras: [
      ['Your data is yours', 'export the lot whenever, without asking'],
      ['Leave when you like', 'cancel from the screen, no phone call to anyone'],
    ],
  },

  // ── A chamada de quem já tem preço na tela ────────────────────────────
  chamada: {
    rotulo: 'Getting started',
    /* "Start with the next quote that comes in" já propunha um passo pequeno,
       mas não respondia o motivo real de ninguém testar: o vidraceiro presume
       que trocar de sistema significa passar cliente, tabela e histórico a
       limpo ANTES de ver a primeira tela. A primeira frase agora tira esse
       peso, e só depois vem o convite. */
    titulo: 'Migrate nothing. Just run your next quote here.',
    // A frase do meio muda com `diasTeste` da config, e a emenda com o resto do
    // parágrafo é diferente em cada idioma — por isso o `if` mora aqui dentro.
    texto: (dias) =>
      `No customers to set up, no history to import: you enter your own price per m² and the next quote that comes in already goes out from here. ${
        dias > 0
          ? `That is ${dias} days with no card and no commitment.`
          : 'No lock-in: if it does not suit you, you leave.'
      } If you would rather we set it up together, just message us on WhatsApp.`,
    /* Os três passos agora carregam o QUANDO: quem lê "today" no primeiro e
       "on the next job" no segundo entende que dá para testar sem parar a
       semana. */
    passos: [
      'Today: open the account and enter your price per m²',
      'On the next job: measure and build the quote on your phone',
      'The customer signs on screen — and you compare it with how you work today',
    ],
  },

  // ── A chamada de enquanto não há preço publicado ──────────────────────
  chamadaDemo: {
    rotulo: 'Book the walkthrough',
    titulo: 'Bring one of your own quotes. We build it together.',
    texto:
      'Forty minutes with the system open. You measure a real job, we build it in front of you, and you decide whether it fits into your day.',
    passos: [
      'You bring a job you have open right now',
      'We build the quote in the app, live',
      'You watch the order land ready in production',
    ],
  },
}
