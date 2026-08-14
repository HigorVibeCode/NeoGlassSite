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
  hero: {
    rotulo: 'NeoGlass · para a vidraçaria',
    etiqueta: 'Uma tela do app, ao vivo',
    // O título é montado no componente: `antes` sai normal e `destaque` sai no
    // gradiente da marca. Separado porque a palavra que merece o gradiente não
    // é a mesma em todo idioma — em pt é a promessa, em de é a condição.
    titulo: {
      antes: 'Se profissionalizar',
      destaque: 'sem complicar nada.',
    },
    texto:
      'Você mede na obra, o cliente vê o preço na hora e assina na tela. Sem planilha, sem caderno, sem curso.',
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
    titulo: 'A mesma gente, com muito mais eficiência.',
    hoje: 'Hoje, no caderno e no WhatsApp',
    // O lado esquerdo é a chave da lista: nenhum par pode começar igual.
    pares: [
      [
        'O orçamento sai no caderno e some até segunda',
        'Sai do celular com foto do vão e assinatura',
      ],
      [
        'O cliente liga três vezes perguntando se ficou pronto',
        'Ele acompanha o pedido por um link, sem ligar',
      ],
      [
        'A sobra encosta atrás da bancada e vira lixo',
        'Volta ao estoque com medida — e entra no próximo corte',
      ],
      /* O lado direito dizia "O sistema acusa o fora de esquadro antes de
         cortar" — a mesma checagem inventada que já tinha saído da aba da
         indústria, e que eu deixei viva aqui. Trocado pelo que o sistema faz
         de fato: a medida tirada na obra é a que desce para o corte, sem
         ninguém redigitar no meio. */
      [
        'A medida some entre o caderno da obra e o pedido da fábrica',
        'A medida que você tirou é a que a fábrica corta — a mesma, sem redigitar',
      ],
      [
        'No fim do mês ninguém sabe qual serviço deu lucro',
        'A margem de cada serviço fica na tela',
      ],
    ],
  },

  // ── O preço ───────────────────────────────────────────────────────────
  preco: {
    rotulo: 'Plano Vidraçaria · o que custa e o que não custa',
    /* "cabe numa janela" era trocadilho que exigia o parágrafo abaixo para
       fazer sentido — trocadilho que precisa de explicação não é trocadilho.
       Esta diz a mesma coisa e já entrega a comparação. */
    titulo: 'Um serviço por mês paga o ano inteiro.',
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
