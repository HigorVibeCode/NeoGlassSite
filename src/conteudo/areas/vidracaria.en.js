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
  hero: {
    rotulo: 'NeoGlass · for the glass shop',
    etiqueta: 'A live screen from the app',
    titulo: {
      antes: 'Go professional',
      destaque: 'without complicating a thing.',
    },
    texto:
      'You measure on site, the customer sees the price there and then, and signs on your screen. No spreadsheet, no notebook, no training week.',
    /* As três anteriores mediam a INSTALAÇÃO ("one afternoon", "0
       spreadsheets", "1 app"), que é o problema de quem já comprou — não de
       quem está decidindo. Estas medem o dia dele: quanto tempo leva um
       orçamento, quantas vezes ele reescreve a mesma medida, e onde o serviço
       fecha. "4 min" e "1×" funcionam nos quatro idiomas; só o terceiro rótulo
       vira palavra ("on site"). */
    marcas: [
      ['4 min', 'from the measurement to a signed PDF'],
      ['1×', 'you type the size — once, and that is it'],
      ['on site', 'the job is closed before you drive off'],
    ],
    linhaPreco: (preco) => `${preco} a month. No setup fee, no lock-in.`,
  },

  // ── A demonstração do orçamento ───────────────────────────────────────
  demo: {
    rotulo: 'Demo · from opening to PDF, in 3 taps',
    titulo: 'Measure the opening. The quote is done before you drive back.',
    texto:
      'There is a window opening already measured, waiting for you. Press the button and watch: the window builds itself over the measurement, the quote fills in on its own and the PDF comes out with your logo on it. At the end, the page tells you how many seconds that took.',
  },

  // ── Um dia do vidraceiro ──────────────────────────────────────────────
  dia: {
    rotulo: 'One day, start to finish',
    titulo: 'Nothing new in your day. Just the rework taken out of it.',
    horas: [
      [
        '08:40',
        'On site',
        'You measure the opening on your phone, take the photo, pick thickness and colour. The price builds from your own rate card and the customer signs right there, on the screen.',
      ],
      [
        '11:20',
        'In the workshop',
        'The order arrives with the cutting sizes already net of clearance. Nobody retypes anything, nobody calls to check the thickness.',
      ],
      [
        '15:00',
        'At the bench',
        'Every piece comes off labelled. What is left of the sheet goes back into stock with its size — and gets put up for the next job instead of leaning against the wall.',
      ],
      [
        'Friday',
        'End of the week',
        'You see which jobs carried a margin and which only carried work. One number, not a spreadsheet.',
      ],
    ],
  },

  // ── O antes e o depois ────────────────────────────────────────────────
  contraste: {
    rotulo: 'What changes in your week',
    titulo: 'Same crew. Without the rework.',
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
    rotulo: 'Glass Shop Plan · pricing with no small print',
    titulo: 'One number, and it stays that number.',
    // `valor` chega e não é usado: ver o cabeçalho do arquivo. O parâmetro fica
    // na assinatura para as quatro versões terem a mesma forma.
    texto: () =>
      'The quote you just watched build itself was one living-room window — glass, hardware and fitting, the job you would take on any Tuesday. Keep that job in your head while you read the number below.',
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
    titulo: 'Start with the next quote that comes in.',
    texto: (dias) =>
      `You open the account, load your own rate card and build the first quote today. ${
        dias > 0
          ? `That is ${dias} days with no card and no commitment.`
          : 'No lock-in: if it does not suit you, you leave.'
      } If you would rather we set it up together, just message us on WhatsApp.`,
    passos: [
      'You open the account and enter your own price per m²',
      'Build the next quote in the app, on site',
      'The customer signs and the order starts out right',
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
