/**
 * Os textos da aba da vidraçaria — a abertura, a demonstração, o dia do
 * vidraceiro, o contraste, o preço e as duas chamadas.
 *
 * Português é a fonte: quando uma frase muda aqui, ela muda nos outros três.
 *
 * Duas coisas nunca são escritas neste arquivo:
 *   · valor de dinheiro — o preço chega formatado por `precoVidracaria(idioma)`
 *     e entra por interpolação (`linhaPreco`, `preco.texto`, `preco.caixaTitulo`).
 *     Escrever "R$ 197" aqui seria escrever a moeda errada em três idiomas;
 *   · qualquer promessa sobre cobrança por usuário. A regra real de usuários
 *     não está definida, e enquanto não estiver esta aba não fala de usuário.
 */
export default {
  // ── A abertura ────────────────────────────────────────────────────────
  /* A frase que o Higor elegeu. Ela saiu do título quando a abertura
     passou a carregar o posicionamento, e ganhou bloco próprio aqui —
     é o primeiro argumento da página, logo antes da demonstração. */
  memoria: {
    titulo: 'Todo orçamento que você mandou fica salvo.',
    texto: 'Você abre e vê o que foi combinado, quando e por quanto.',
  },

  hero: {
    rotulo: 'NeoGlass · para a vidraçaria',
    verOrcamento: 'Ver o orçamento nascer',
    verSistema: 'Ver o sistema funcionando',
    etiqueta: 'O app por dentro',
    // O título é montado no componente: `antes` sai normal e `destaque` sai no
    // gradiente da marca. Separado porque a palavra que merece o gradiente não
    // é a mesma em todo idioma — em pt é a promessa, em de é a condição.
    titulo: {
      antes: 'Você mede.',
      destaque: 'A NeoGlass organiza o resto.',
    },
    texto: 'Da medida na obra ao orçamento, do pedido à entrega — sem perder informação no caminho.',
    /* As três anteriores mediam a INSTALAÇÃO ("1 tarde para rodar", "0
       planilha", "1 app"), que é o problema de quem já comprou — não de quem
       está decidindo. Estas medem o dia dele: quanto tempo leva um orçamento,
       quantas vezes ele reescreve a mesma medida, e onde o serviço é fechado. */
    marcas: [
      ['4 min', 'da medida ao PDF assinado'],
      ['1×', 'você digita a medida — uma vez só'],
      ['na obra', 'o serviço fecha antes de você sair'],
    ],
    // O preço chega pronto: em pt 'R$ 197', em de '79 €' com o símbolo depois.
    // Daí ser função e não frase escrita.
    linhaPreco: (preco) => `${preco} por mês. Sem taxa de implantação e sem fidelidade.`,
  },

  // ── A demonstração do orçamento ───────────────────────────────────────
  demo: {
    rotulo: 'Demonstração · do vão ao PDF, em 3 toques',
    /* O título carrega a seção sozinho: o parágrafo de apoio que ficava abaixo
       repetia o botão e prometia um cronômetro que ninguém pediu.
       "Guardar a trena" mede o tempo sem inventar número — é a unidade que o
       vidraceiro usa para dizer "foi rápido", e ele mesmo faz a conta. */
    titulo: 'Meça o vão. A proposta em PDF sai antes de você guardar a trena.',
    texto:
      'Foto, medidas e tipo de parede. O sistema transforma a visita em orçamento sem fazer você redigitar tudo.',
    micro: 'Menos digitação. Menos erro. Menos tempo entre a obra e o orçamento.',
  },

  // ── Um dia do vidraceiro ──────────────────────────────────────────────
  dia: {
    rotulo: 'Um dia, do começo ao fim',
    titulo: 'Nada de novo no seu dia. Só o retrabalho que sai dele.',
    // A hora é a chave da lista no componente: cada uma tem que ser única.
    // As horas em número não se traduzem; 'sexta' sim.
    horas: [
      /* As quatro descrições eram listas de funcionalidade em ordem
         cronológica — cada uma explicava o que o SISTEMA faz. Reescritas para
         dizer o que o vidraceiro deixa de fazer naquele horário, que é o que
         ele reconhece do próprio dia. */
      [
        '08:40',
        'Na obra',
        'Você mede, fotografa e escolhe. O cliente assina na sua tela antes de você guardar a trena.',
      ],
      [
        '11:20',
        'Na fábrica',
        'O pedido chegou com as folgas já descontadas. Ninguém ligou para confirmar espessura.',
      ],
      [
        '15:00',
        'Na bancada',
        'Cada peça com etiqueta. E a sobra já está no estoque, disputando o próximo serviço.',
      ],
      [
        'sexta',
        'No fim da semana',
        'Você sabe qual serviço deu margem e qual só deu trabalho. Sem abrir planilha.',
      ],
    ],
  },

  // ── O antes e o depois ────────────────────────────────────────────────
  contraste: {
    rotulo: 'O que muda na sua semana',
    /* "sem o retrabalho" descrevia a ausência de um problema. Esta diz o que
       a semana passa a ter — e "a mesma gente" mata na largada a objeção de
       que profissionalizar exige contratar alguém. */
    titulo: 'O que hoje fica espalhado passa a morar no mesmo pedido.',
    hoje: 'Hoje, espalhado',
    pares: [
      ['A medida fica no celular', 'A obra fica registrada'],
      ['O orçamento vai pelo WhatsApp', 'O orçamento fica salvo'],
      ['O PDF se perde entre conversas', 'O pedido fica centralizado'],
      ['A produção anda por mensagem', 'A produção fica conectada'],
      ['O retalho não tem controle', 'A entrega é acompanhada'],
      ['Ninguém vê a margem do serviço', 'A margem fica visível'],
    ],
  },

  resultados: {
    rotulo: 'O que o pedido carrega',
    titulo: 'Cada etapa trabalha com o que já foi combinado.',
    itens: [
      ['Orçamento', 'Você registra a obra e o cliente sem começar do zero.'],
      ['Projeto', 'Transforme a medida em uma proposta mais rápida.'],
      ['Pedido', 'Tudo que foi combinado permanece associado ao serviço.'],
      ['Produção', 'O pedido segue para quem precisa produzir.'],
      ['Entrega', 'Acompanhe o que saiu, o que está em andamento e o que falta.'],
      ['Margem', 'Veja quanto cada serviço realmente deixou.'],
    ],
  },

  // ── O preço ───────────────────────────────────────────────────────────
  preco: {
    rotulo: 'Plano Vidraçaria · o que custa e o que não custa',
    /* "cabe numa janela" era trocadilho que exigia o parágrafo abaixo para
       fazer sentido — trocadilho que precisa de explicação não é trocadilho.
       Esta diz a mesma coisa e já entrega a comparação. */
    titulo: 'Um serviço pode pagar vários meses do sistema.',
    // `valor` é o total da demonstração (R$ 1.169) já formatado em reais. Ele
    // só existe em real: a demonstração inteira é feita com preço de m² e
    // ferragem do Brasil. Por isso só o português cita o número — os outros
    // três idiomas recebem o mesmo argumento e não usam o parâmetro.
    texto: (valor) =>
      /* "Guarde esse número enquanto lê o de baixo" pedia uma tarefa ao
         leitor. Agora a frase já faz a conta por ele — que era o ponto. */
      `A janela que você acabou de orçar deu ${valor}. Uma por mês, e o sistema está pago com folga.`,
    /* O nome do plano, dito por extenso. Antes a seção só dizia "NeoGlass para
       vidraçaria" e o visitante não tinha como saber se aquele número valia
       para a fábrica também. São produtos e vendas diferentes: a indústria é
       consultiva e não tem preço em lugar nenhum do site. */
    cota: 'Plano Vidraçaria',
    soParaVidracaria:
      'Este é o plano da vidraçaria. A indústria é outro produto, com preço fechado caso a caso — veja a aba Indústria.',
    porMes: '/mês',
    fixo: 'Preço fixo, na hora de assinar e daqui a um ano.',
    semTaxa:
      'Sem taxa de implantação e sem cobrança por orçamento feito — você sabe hoje quanto vai pagar no décimo segundo mês.',
    // O que NÃO é cobrado. Não entra nada sobre usuário aqui: a regra de
    // cobrança por usuário não está definida e prometer é mentir.
    naoCobramos: [
      ['Implantação', 'nada para começar a usar'],
      ['Por orçamento', 'faça quantos quiser'],
      ['Fidelidade', 'cancela quando quiser'],
    ],
    semCartao: (dias) =>
      `Sem cartão. No fim dos ${dias} dias você decide — e se não decidir, nada é cobrado.`,
    tudoIncluido: 'Está tudo incluído',
    incluso: [
      'Orçamento na obra pelo celular, com foto e assinatura',
      'Lista de corte já com as folgas, direto para a produção',
      'Estoque de retalhos com medida, cor e endereço',
      'Acompanhamento do pedido, do corte à entrega',
      'PDF com a sua marca, o seu prazo e a sua validade',
      'Margem de cada serviço no fim do mês',
      'Suporte por WhatsApp, com gente que conhece vidro',
    ],
    // A conta é feita no componente, não escrita aqui: se o preço mudar, a
    // frase muda junto. Só vale em real — ver o comentário de `texto`.
    caixaTitulo: (valor, meses) => `Aquela janela de ${valor} paga ${meses} meses de sistema.`,
    caixaTexto:
      'E a otimização de corte vem junto. Comprada à parte, ela é uma segunda mensalidade — quase sempre com taxa de adesão antes de você cortar o primeiro vidro.',
    extras: [
      ['Os dados são seus', 'exporta tudo quando quiser, sem pedir'],
      ['Sai quando quiser', 'cancelamento pela tela, sem ligar para ninguém'],
    ],
  },

  faq: {
    rotulo: 'Perguntas frequentes',
    titulo: 'O que costuma travar o clique.',
    itens: [
      [
        'O que acontece depois dos 14 dias?',
        'Nada é cobrado sozinho. Se você quiser continuar, assina. Se não decidir, a conta simplesmente não vira cobrança.',
      ],
      [
        'Preciso instalar alguma coisa?',
        'Não. O sistema abre no navegador e no celular. Sem aplicativo para baixar e sem técnico na loja.',
      ],
      [
        'Funciona no celular?',
        'Sim. A obra, a foto do vão e o orçamento foram feitos para a tela do celular.',
      ],
      [
        'Posso usar para quantos orçamentos quiser?',
        'Sim. Não há cobrança por orçamento. O preço do mês não muda com o volume.',
      ],
      [
        'Meus dados são meus?',
        'Sim. Você exporta tudo quando quiser, sem pedir autorização.',
      ],
      [
        'Posso cancelar quando quiser?',
        'Sim. Sem fidelidade e sem ligar para ninguém — o cancelamento é pela tela.',
      ],
      [
        'A NeoGlass calcula o preço automaticamente?',
        'Ela monta o orçamento com a sua tabela. O preço do m² e da ferragem continua sendo o seu.',
      ],
      [
        'A NeoGlass substitui meu atual controle de pedidos?',
        'Ela concentra orçamento, pedido, produção e entrega no mesmo fluxo. Você para de espalhar a mesma informação em ferramentas que não se falam.',
      ],
    ],
  },

  // ── A chamada de quem já tem preço na tela ────────────────────────────
  chamada: {
    rotulo: 'Começar',
    /* "Comece pelo próximo orçamento que entrar" já era bom: propõe um passo
       pequeno em vez de uma decisão. Faltava matar o motivo real de ninguém
       testar — o vidraceiro presume que trocar de sistema significa passar
       cliente, tabela e histórico a limpo antes de ver a primeira tela. Não
       precisa. A primeira frase agora tira esse peso, e só depois vem o convite. */
    titulo: 'Não migre nada. Faça só o próximo orçamento aqui.',
    // A frase do meio muda com `diasTeste` da config, e a emenda com o resto do
    // parágrafo é diferente em cada idioma — por isso o `if` mora aqui dentro,
    // e não no componente.
    texto: (dias) =>
      `Nenhum cliente para cadastrar, nenhum histórico para importar: você põe o seu preço do m² e o próximo orçamento que entrar já sai daqui. ${
        dias > 0
          ? `São ${dias} dias sem cartão e sem compromisso.`
          : 'Sem fidelidade: se não servir, você sai.'
      } Se preferir que a gente monte o primeiro junto, chame no WhatsApp.`,
    /* Os três passos são o tamanho do compromisso, escritos em minutos: quem
       lê "hoje" no primeiro e "na próxima obra" no terceiro entende que dá para
       testar sem parar a semana. */
    passos: [
      'Hoje: cria a conta e põe o seu preço do m²',
      'Na próxima obra: mede e monta o orçamento no celular',
      'O cliente assina na tela — e você compara com o seu jeito de hoje',
    ],
  },

  // ── A chamada de enquanto não há preço publicado ──────────────────────
  chamadaDemo: {
    rotulo: 'Agendar a apresentação',
    titulo: 'Traga um orçamento seu. A gente monta junto.',
    texto:
      'São quarenta minutos com o sistema aberto. Você mede um serviço de verdade, a gente monta na sua frente e você decide se aquilo cabe no seu dia.',
    passos: [
      'Você traz um serviço que está em aberto',
      'A gente monta o orçamento no app, ao vivo',
      'Você vê o pedido chegar pronto na produção',
    ],
  },
}
