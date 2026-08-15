/**
 * Os textos das duas demonstrações interativas e do cartão da abertura, em
 * português — a fonte das outras três versões.
 *
 * A árvore segue a máquina de estados de cada demonstração, e não a ordem em
 * que as frases aparecem no arquivo: cada fase (`pronto`, `otimizando`,
 * `plano`, `realocando`, `economia`) é um galho, e o rótulo do botão daquela
 * fase mora em `botoes` com o mesmo nome. Assim dá para ler a lista de botões
 * inteira de uma vez e ver se alguma fase ficou sem rótulo — que é o defeito
 * que só aparece quando o visitante chega naquela tela.
 *
 * Onde a frase carrega um número que vem do próprio sistema (quantas chapas,
 * quantas peças, quanto custa), a chave é função e recebe o valor já pronto.
 * Nenhuma chave daqui escreve símbolo de moeda: o valor chega formatado de
 * `config.js`, que sabe a moeda do idioma.
 *
 * Medidas, códigos de pedido e porcentagens ficam iguais nos quatro idiomas —
 * 3.210 × 2.250, 8 mm, 26-0431, 87,4% são o mesmo desenho em qualquer língua.
 */
export default {
  // ── A demonstração da indústria: chapa, cavalete e a chapa não aberta ──
  retalho: {
    baloes: {
      pronto: 'Este é o seu cavalete. Seis retalhos, cada um com código e endereço.',
      otimizando: 'O sistema procura aqui primeiro — dois servem para este pedido.',
      plano: 'Sem o cavalete, o pedido abriria estas chapas novas. Siga a peça laranja.',
      realocando: 'A peça laranja está saindo da chapa nova e indo para o retalho.',
      economia: 'A peça laranja coube no retalho. Esta chapa não foi comprada.',
    },
    barra: {
      titulo: 'Otimização de corte',
      pedido: 'Pedido 26-0431 · 8 mm incolor',
      passo: (n, total) => `Passo ${n} de ${total}`,
    },

    // O desenho: o rótulo de cada chapa e o que o leitor de tela ouve.
    desenho: {
      chapa: 'Chapa',
      retalho: 'Retalho',
      aria: (tipo, id, pecas) => `${tipo} ${id} com ${pecas} peças`,
      chapaNova: 'Chapa nova · a que você compra',
      cavalete: 'No cavalete · sobras de outros pedidos',
      plano: (chapas) => `O plano · ${chapas} chapas novas`,
      chapaN: (n) => `Chapa ${n}`,
      retalhoN: (n) => `Retalho ${n}`,
      cavaletePrimeiro: (pecas) => `Primeiro o cavalete · ${pecas} peças`,
      entaoChapaNova: (novas, antes) => `Só então chapa nova · ${novas} em vez de ${antes}`,
      /* "não aberta" é gíria de chão de fábrica: abrir uma chapa é começar a
         cortá-la. Quem é de dentro entende na hora, mas o site também é lido
         por sócio, contador e comprador — e para esses "não utilizada" diz a
         mesma coisa sem exigir tradução. Vale para os quatro idiomas. */
      naoAberta: (n) => `Chapa ${n} · não utilizada`,
    },

    // Os cinco formatos do pedido de exemplo. É um pedido de vidraçaria
    // comum de propósito: box, espelho e prateleira, nada exótico.
    pecas: {
      portaBox: 'Porta de box',
      fixoLateral: 'Fixo lateral',
      prateleira: 'Prateleira',
      espelho: 'Espelho de banheiro',
      tampo: 'Tampo de mesa',
    },

    pronto: {
      selo: 'O pedido que chegou',
      titulo: (pecas, formatos) => `${pecas} peças, ${formatos} formatos`,
      texto:
        'Um pedido comum de terça-feira. Você não precisa preencher nada — só apertar o botão e ver o que o sistema faz sozinho.',
    },

    otimizando: {
      selo: 'Otimizando',
      titulo: 'Montando o plano de corte…',
      linhas: {
        lendo: (pecas) => `Lendo ${pecas} peças do pedido`,
        respeitando: 'Respeitando espessura, cor e veio',
        testando: 'Testando encaixes e giro de peça',
        ordenando: 'Ordenando pela sequência da mesa',
      },
    },

    plano: {
      selo: 'Plano pronto',
      titulo: (chapas, aproveitamento) => `${chapas} chapas · ${aproveitamento} de aproveitamento`,
      texto: 'Este já é um bom plano. Qualquer otimizador do mercado para por aqui.',
      achou: 'Matéria-prima parada no cavalete',
      servem: (retalhos) => `${retalhos} retalhos servem para este pedido:`,
      // A pílula verde ao lado de cada medida. `medida` saiu de uso quando a
      // lista virou medida + área + carimbo — ver Retalho.jsx.
      jaPago: 'já pago',
      parados:
        'Eles estão encostados na parede desde outro pedido. Enquanto ninguém os usa, são prejuízo parado.',
    },

    /* A tela do estoque de retalhos — a fase nova.
       Ela existe para responder a objeção silenciosa do dono de fábrica: "sobra
       boa eu já tenho; o que eu não tenho é como saber o que é e onde está".
       Por isso o texto todo gira em torno de código, endereço e automatismo do
       cadastro, e não em torno de economia — a economia é a tela seguinte. */
    /* A tela do cavalete — a fase nova.
       A primeira versão era uma tabela de seis linhas com código, medida,
       posição e dias. Correta e ilegível: quem abre o site não está auditando
       estoque, está tentando entender numa olhada se aquilo serve para ele.
       Virou desenho. Sobrou pouco texto, e de propósito. */
    catalogo: {
      selo: 'Seu cavalete hoje · 6 peças catalogadas',
      // Prefixo do nível no desenho: sai como "Cavalete B".
      cavalete: 'Cavalete',
      legendaServe: 'servem para este pedido',
      legendaEspera: 'esperando o pedido certo',
      painel: {
        selo: 'O cavalete sob controle',
        titulo: (n) => `${n} sobras que o sistema conhece`,
        frase:
          'Inteligência que armazena sobras: o software calcula o corte atual já pensando em como aproveitar os retalhos nos pedidos seguintes.',
        pontos: [
          ['Cada sobra vira peça com código', 'RT-0412, e não "aquele vidro grande atrás do box".'],
          ['Com endereço no cavalete', 'Quem for buscar acha na primeira ida.'],
          ['Sem ninguém cadastrar nada', 'O registro nasce no fim da otimização que gerou a sobra.'],
        ],
      },
    },

    realocando: {
      selo: 'Realocando',
      titulo: 'Cavalete primeiro, chapa depois…',
      linhas: {
        medindo: (retalhos) => `Medindo os ${retalhos} retalhos do cavalete`,
        movendo: (pecas) => `Movendo ${pecas} peças para dentro deles`,
        refazendo: 'Refazendo o plano das chapas novas',
        baixa: 'Dando baixa nos retalhos usados',
      },
    },

    economia: {
      selo: 'O que você não vai gastar',
      titulo: '1 chapa inteira',
      subtitulo: 'que não vai ser utilizada',
      dinheiro: {
        selo: 'A chapa que você não comprou',
        texto: (n) => (n === 1 ? 'Uma chapa a menos neste pedido.' : `${n} chapas a menos neste pedido.`),
        origem: (p) => `Considerando chapa de referência a ${p}. O valor real muda com espessura, cor e região — o número é seu para ajustar.`,
      },
      placar: {
        m2: (m2) => `${m2} m²`,
        m2Texto: 'de matéria-prima que voltou a valer',
        pecas: (noCavalete, total) => `${noCavalete} de ${total}`,
        pecasTexto: 'peças saíram do cavalete',
        aproveitamento: (antes, depois) => `${antes} → ${depois}`,
        aproveitamentoTexto: 'de aproveitamento nas chapas utilizadas',
        retalhos: (retalhos) => `${retalhos} retalhos`,
        retalhosTexto: 'saíram da parede',
      },
      // O destaque é uma palavra só, em gradiente, no meio da frase — por isso
      // ela vem partida em três e não como uma frase inteira.
      pergunta: {
        antes: 'Isso foi',
        destaque: 'um',
        depois: 'pedido. Quantos a sua fábrica fecha por semana?',
      },
      sozinho:
        'No sistema esse segundo botão nem existe: ele olha o cavalete sozinho, antes de cada plano. Ninguém precisa lembrar, e ninguém precisa querer.',
    },

    // Um rótulo por fase da máquina de estados. Fase sem rótulo aqui é botão
    // em branco na tela do visitante.
    botoes: {
      otimizar: 'Otimizar corte',
      otimizando: 'Otimizando…',
      realocando: 'Realocando…',
      verEstoque: 'Ver o estoque de retalhos',
      usarRetalhos: (retalhos) => `Usar os ${retalhos} retalhos`,
      agendar: 'Fazer isso com um pedido meu',
      denovo: 'Rodar de novo',
    },

    nota: {
      padrao: 'Simulação com um pedido real. Nada é enviado para lugar nenhum.',
      economia: 'Conta feita por um otimizador de verdade, aqui dentro do seu navegador.',
    },
  },

  // ── A demonstração da vidraçaria: do vão medido ao PDF na mão ──────────
  orcamento: {
    ficha: {
      rotulo: 'Ficha do serviço',
      titulo: 'Preenchendo sozinha',
      vao: 'Vão',
      peca: 'Peça',
      folhas: 'Folhas',
      esperando: 'a definir',
      nota: 'Cada resposta vira dado na hora. Ninguém redigita nada depois — nem no escritório, nem na fábrica.',
    },
    escolhas: {
      tipo: { rotulo: 'Que peça vai neste vão?', opcoes: ['Porta', 'Janela', 'Box'] },
      folhas: { rotulo: 'De quantas folhas?', opcoes: ['2 folhas', '3 folhas', '4 folhas'] },
    },
    baloes: {
      vao: 'Um vão de obra, ainda sem nada. É por aqui que todo serviço começa.',
      medindo: 'A medida entra uma vez só. A cota é do vão, não do vidro.',
      tipo: 'O sistema pergunta o que vai ali. Um toque, sem digitar nada.',
      folhas: 'E de quantas folhas. O preço muda aqui, e ele já sabe disso.',
      montando: 'O vidro se monta dentro do vão, com folga e sobreposição calculadas.',
      orcamento: 'Peça a peça, com ferragem e mão de obra. Nada foi redigitado.',
      gerando: 'Saindo o PDF com a sua logo, pronto para o cliente assinar.',
      pdf: 'Isto chega no celular do cliente antes de você sair da obra.',
    },
    barra: {
      titulo: 'NeoGlass no celular · na obra',
      cliente: (nome) => `Cliente ${nome}`,
      passo: (n, total) => `Passo ${n} de ${total}`,
    },

    // O serviço de exemplo. `parede` entra numa ficha em letra minúscula.
    obra: {
      vao: 'Janela de sala',
      parede: 'alvenaria',
    },

    desenho: {
      aria: 'O vão medido na obra',
      janela: '2 folhas de correr · 6 mm',
      medindo: 'anotando as diagonais…',
      vaoVazio: 'O vão, ainda vazio',
      vaoMedido: 'Vão medido na obra',
      montando: 'Montando a janela no vão',
      janelaDoVao: 'A janela deste vão',
      pdfGerado: 'PDF gerado',
      prontoCliente: 'Pronto para o cliente',
      oOrcamento: 'O orçamento que você acabou de montar',
    },

    // As quatro linhas do orçamento. O valor de cada uma chega formatado.
    itens: {
      vidro: {
        nome: 'Vidro temperado 6 mm incolor',
        detalhe: (medida, m2) => `2 folhas · ${medida} mm · ${m2} m²`,
      },
      kit: {
        nome: 'Janela de correr 2 folhas',
        detalhe: 'trilho superior e inferior, roldanas, fecho',
      },
      perfil: {
        nome: 'Perfil, borracha e acabamento',
        detalhe: 'vedação e arremate do vão',
      },
      instalacao: {
        nome: 'Instalação e vedação',
        detalhe: 'mão de obra, 1 diária · deslocamento',
      },
    },

    // O papel que o cliente da vidraçaria recebe.
    documento: {
      empresa: 'Sua Vidraçaria',
      marca: 'a sua marca, o seu telefone',
      orcamento: 'Orçamento',
      cliente: 'Cliente',
      servico: 'Serviço',
      servicoValor: (vao, medida) => `${vao} · ${medida}`,
      total: 'Total',
      validade: 'Validade de 10 dias · prazo de 7 dias úteis após aprovação',
      assinatura: 'assinatura do cliente',
    },

    vao: {
      selo: 'O que você fez na obra',
      titulo: (vao, medida) => `${vao} · ${medida}`,
      texto:
        'Foto, duas medidas e o tipo de parede. É tudo o que o sistema pede — o resto ele monta sozinho.',
      /* A ficha dizia "Esquadro — conferido no ato", que é a checagem
         automática que não existe. Trocado pelas duas diagonais medidas: é o
         DADO que o vidraceiro anota na obra, não um veredito que o sistema
         emite. Os dois números diferem de 4 mm de propósito — quem é do ramo
         lê isso e entende sozinho que o vão está fora de esquadro. */
      ficha: {
        vao: 'Vão',
        parede: 'Parede',
        esquadro: 'Diagonais',
        esquadroValor: '1.947 e 1.951 mm',
        foto: 'Foto',
        fotoValor: '2 imagens anexadas',
      },
      chamada: 'Agora aperte o botão. Você não vai digitar mais nada.',
    },

    montando: {
      selo: 'Montando',
      titulo: 'Cabendo a janela na sua medida…',
      linhas: {
        folhas: 'Escolhendo 2 folhas de correr para este vão',
        folga: (folga, sobreposicao) =>
          `Descontando ${folga} mm de folga e ${sobreposicao} mm de sobreposição`,
        somando: 'Somando trilho, roldanas, fecho e vedação',
        precos: 'Puxando os preços da sua tabela',
      },
    },

    lista: {
      selo: (numero) => `Orçamento ${numero}`,
      titulo: 'Pronto, sem você digitar nada.',
      total: 'Total para o cliente',
      rodape: (m2, itens) =>
        `${m2} m² de vidro, ${itens} itens, nenhuma conta feita de cabeça. Os preços vêm da sua tabela — estes aqui são só exemplo.`,
    },

    pdf: {
      selo: 'Documento pronto',
      titulo: 'Com a sua marca, não com a nossa.',
      texto:
        'Logo, telefone, validade, prazo e a linha da assinatura. É este papel que faz o cliente enxergar empresa em vez de improviso — e ele saiu sozinho.',
      linhas: {
        logo: 'A sua logo e os seus dados no cabeçalho',
        prazo: 'Validade e prazo de entrega escritos',
        assinatura: 'Assinatura na tela ou no papel',
        via: 'Uma via arquivada no pedido, para sempre',
      },
    },

    enviar: {
      selo: 'Simples assim',
      toques: '3 toques',
      // O cronômetro só entra quando o visitante levou menos de 90 segundos;
      // acima disso a frase vira a versão sem tempo.
      segundos: (segundos) => ` e ${segundos} segundos`,
      semTempo: ', zero digitação',
      textoTempo:
        'Foi o tempo que você levou agora, do vão ao orçamento pronto. Na obra é o mesmo caminho — com o cliente olhando.',
      textoSemTempo:
        'Do vão ao orçamento pronto você não digitou uma medida sequer. Na obra é o mesmo caminho — com o cliente olhando.',
      escolha: 'Escolha por onde vai',
      canais: {
        whatsapp: 'WhatsApp',
        email: 'E-mail',
        pdf: 'Baixar PDF',
      },
      aprovar: 'E quando ele aprovar, o pedido já entra na produção com as medidas de corte.',
      ninguem:
        'Ninguém redigita, ninguém liga para confirmar espessura, e o retalho que sobrar dessa chapa já volta para o seu estoque com medida.',
    },

    preco: {
      selo: 'Quanto custa',
      porMes: '/mês',
      /* Aqui dizia que o preço era por vidraçaria e não por pessoa, e logo
         abaixo "sem custo por usuário". O dono do projeto avisou em 13/08 que
         a regra de cobrança por usuário NÃO está definida, então as duas eram
         promessa que a fatura não cumpre. No lugar entrou o que é verdade e
         vende igual: o preço não muda com o tempo. Volta a falar de usuário no
         dia em que a regra existir. */
      porVidracaria: 'Preço fixo, hoje e daqui a um ano.',
      // O valor chega pronto de `config.js` — a moeda muda com o idioma.
      conta: (valor) => `O orçamento que você acabou de montar foi de ${valor}.`,
      contaEnfase: 'Era uma janela.',
      pagaMeses: (meses) => `Esse serviço sozinho paga ${meses} meses de sistema.`,
      naoCobramos: {
        implantacao: 'Sem implantação',
        orcamento: 'Sem cobrança por orçamento',
        fidelidade: 'Sem fidelidade',
      },
      teste: (dias) =>
        `São ${dias} dias grátis, sem cartão. Você monta os orçamentos da semana e decide depois — se não decidir, nada é cobrado.`,
      semTeste: 'Sem fidelidade: se não servir para o seu dia, você cancela pela própria tela.',
    },

    // A mensagem que sai pronta no WhatsApp com o orçamento da demonstração.
    whatsapp: {
      titulo: (numero, vao, medida) => `Orçamento ${numero} — ${vao} ${medida}`,
      item: (nome, valor) => `• ${nome}: ${valor}`,
      total: (valor) => `Total: ${valor}`,
      rodape: 'Montado na demonstração do site do NeoGlass.',
    },

    // Um rótulo por fase, na ordem em que o visitante os aperta.
    botoes: {
      usarVao: 'Usar este vão',
      montando: 'Montando…',
      gerando: 'Gerando o PDF…',
      gerarPdf: 'Gerar PDF para o cliente',
      enviar: 'Enviar para o cliente',
      naObra: 'Quero isso na minha obra',
      incluido: 'Ver tudo o que está incluído',
      denovo: 'rodar de novo',
      zap: 'Receber este orçamento no meu WhatsApp',
    },

    nota: {
      padrao: 'Valores de exemplo. No sistema eles saem da sua tabela.',
      preco:
        'Este é o preço, não uma faixa. Os valores do orçamento acima é que são de exemplo.',
    },
  },

  // ── O cartão que troca de face na abertura ─────────────────────────────
  /* ── O assistente do projeto, sendo usado ──────────────────────────────
     As palavras são as do app de verdade, e é essa fidelidade que faz o
     vidraceiro reconhecer a tela. Nada aqui é frase de site. */
  projeto: {
    tocar: 'Ver como funciona',
    denovo: 'Ver de novo',
    pronto: 'Projeto pronto. Menos de um minuto.',
    titulo: 'Adicionar vão',
    continuar: 'Continuar',
    cancelar: 'Cancelar',
    passos: {
      vao: {
        rotulo: 'Passo 1 — Que tipo de vão?',
        opcoes: ['Nicho fechado · piso ao teto', 'Nicho · entre duas paredes', 'Uma parede só', 'Livre'],
      },
      medida: { rotulo: 'Passo 2 — Quais as medidas?', largura: 'Largura do vão', altura: 'Altura do vão' },
      tipo: {
        rotulo: 'Passo 3 — O que vai nesse vão?',
        opcoes: [
          ['Box', 'De correr · De abrir · pivotante'],
          ['Porta', 'De correr · De abrir · pivotante'],
          ['Janela', 'De correr · De abrir · pivotante · Maxim-ar'],
          ['Painel fixo', 'Fixo'],
        ],
      },
      folhas: {
        rotulo: 'Passo 5 — Modelo',
        opcoes: [
          ['Janela de correr · 2 folhas', '1 fixa + 1 móvel'],
          ['Janela de correr · 3 folhas', '2 fixas + 1 móvel'],
          ['Janela de correr · 4 folhas', '2 fixas + 2 móveis · abrem do centro'],
        ],
      },
      montagem: { rotulo: 'Testar abertura', sub: 'Janela de correr · 4 folhas', dica: 'Arraste para girar a câmera' },
    },
  },

  cartao: {
    ia: 'IA',
    otimizacao: {
      selo: 'Otimização de corte',
      plano: 'Plano 26-0431 · 8 mm incolor',
      resumo: '7 peças · 1 retalho',
    },
    expedicao: {
      selo: 'Expedição · carga 118',
      peca: 'Peça P5 lida na saída',
      medida: '600 × 1150 · 10 mm · têmpera',
      conferidas: '5 de 7 conferidas',
    },
    fechamento: {
      selo: 'Fechamento do pedido',
      // O valor em reais é escrito no componente: aqui só entra a palavra.
      receita: (valor) => `26-0431 · receita ${valor}`,
      materia: 'Matéria-prima',
      producao: 'Produção e gastos',
      margem: 'Margem deste pedido',
    },
  },
}
