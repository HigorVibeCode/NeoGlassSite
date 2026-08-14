/**
 * O filme de rolagem da página da indústria: seis cenas em que três chapas
 * atravessam a tela e se reorganizam, cada uma mostrando uma tela do sistema
 * desenhada em SVG.
 *
 * Duas famílias de texto, e elas têm regras diferentes:
 *
 *   cenas   a narração — título e frase de cada cena, mais o chip do medidor.
 *           Corre em HTML, quebra linha sozinho, aceita frase comprida.
 *   telas   os rótulos dentro dos SVG. `<text>` NÃO quebra linha: o que não
 *           couber na largura do desenho vaza por cima do resto. Por isso os
 *           rótulos dos outros idiomas foram escolhidos pelo comprimento, e
 *           cada aperto está comentado no arquivo do idioma.
 *
 * Números, medidas, códigos de pedido (26-0431), datas e nomes próprios não
 * são traduzidos e ficam iguais nos quatro idiomas — o pedido do filme é um
 * pedido brasileiro de verdade, com R$, CPF, NF-e e boleto.
 */
export default {
  // ── O cabeçalho da seção, em volta do palco ───────────────────────────
  secao: {
    aria: 'Um pedido atravessando o sistema',
    rotulo: 'Um pedido, seis etapas · toca sozinho',
    // numeração de prancha, como em folha de projeto
    folha: 'FL. 03/06',
    /* Era "do celular na obra até a margem na tela" — dois lugares e nenhum
       verbo, e "margem na tela" soa a relatório. O que este filme mostra é um
       pedido só atravessando a empresa inteira sem ser redigitado. */
    titulo: 'Um pedido só, da obra à nota. Sem ninguém redigitar nada.',
  },

  // ── A narração das seis cenas ─────────────────────────────────────────
  // `etapa` também é o rótulo da régua de etapas, numa coluna estreita que
  // corta o que sobrar: mantenha curto.
  cenas: [
    {
      etapa: 'Orçamento',
      titulo: 'Foto na obra, orçamento pronto.',
      sub: 'Cada visita, medida e mudança do cliente entra na linha do tempo. As fotos viram carrossel — a versão de agora na frente, as anteriores logo atrás.',
      medidor: (n) => `Registros no orçamento · ${n}/4`,
    },
    {
      etapa: 'Aprovação',
      /* "Ele aprova antes de existir" era enigma: o leitor precisa parar para
         entender quem é "ele" e o que não existe. Numa cena que passa em quatro
         segundos, enigma é tempo perdido. */
      titulo: 'O cliente vê o vidro na parede dele.',
      sub: 'A IA monta o vidro na foto do ambiente do próprio cliente. Ele vê a porta no lugar dela, na parede dele, antes de qualquer peça ser cortada.',
      medidor: (n) => `Conferindo o pedido · ${n}/4`,
    },
    {
      etapa: 'Corte',
      /* "Corta certo. Sobra vira estoque." estava telegráfico demais — "corta
         certo" é o mínimo que se espera de qualquer sistema, então não é
         promessa. O que impressiona é a sobra virar matéria-prima com endereço. */
      titulo: 'A sobra sai do chão e vira estoque.',
      sub: 'O plano sai pronto para a mesa. E o pedaço que restou volta ao cavalete com medida, cor e endereço, para disputar a próxima otimização.',
      medidor: (p) => `Aproveitamento · ${p}%`,
      // no fim da cena o chip troca de assunto: o retalho ganhou endereço
      medidorFim: 'Retalho reservado · cavalete A-03',
    },
    {
      etapa: 'Produção',
      titulo: 'A peça tem endereço.',
      sub: 'Cada peça sai com etiqueta e código. Ela atravessa as fases na tela, e a entrega é dada pela leitura do código — não pela memória de quem carregou.',
      medidor: (n) => `Peças conferidas na saída · ${n}/5`,
    },
    {
      etapa: 'Dinheiro',
      titulo: 'No fim, você sabe quanto sobrou.',
      sub: 'Nota emitida, boleto na rua e o fechamento do pedido: matéria-prima, produção e gastos até a margem real daquele pedido — não a média do mês.',
      medidor: (p) => `Margem deste pedido · ${p}%`,
    },
    {
      etapa: 'Em qualquer tela',
      titulo: 'Abre onde você estiver.',
      sub: 'Escritório no computador, encarregado no tablet ao lado da mesa, vendedor no celular na obra. Mesmo pedido, mesma hora — e nada para instalar.',
      medidor: (n) => `Telas abertas ao mesmo tempo · ${n}/3`,
    },
  ],

  // ── Os rótulos dentro dos SVG ─────────────────────────────────────────
  telas: {
    // cena 1 · o orçamento em feed, no celular do vendedor
    feed: {
      aria: 'O orçamento em feed, no celular do vendedor',
      titulo: 'Orçamento 26-0431',
      situacao: 'Em andamento',
      cliente: 'Marina Duarte',
      endereco: 'Ap. 142 · Ed. Aurora',
      // as três abas ficam em x fixo (20 / 66 / 106): a primeira tem até 7
      // caracteres e a segunda até 6, senão uma encosta na outra
      abas: ['Feed', 'Itens', 'Proposta'],
      versoes: (n) => `${n} versões`,
      posts: [
        {
          nome: 'Marcos Ribeiro',
          papel: 'vendedor',
          hora: 'ter 09:20',
          legenda: 'Vão da sala · 1180 × 2100 mm',
        },
        {
          nome: 'Marina Duarte',
          papel: 'cliente',
          hora: 'ter 15:44',
          rotulo: 'Observação',
          texto: 'Prefiro de correr, não de abrir.',
        },
        {
          nome: 'Ana Silveira',
          papel: 'escritório',
          hora: 'qua 08:05',
          legenda: 'Ferragem preta · roldana aparente',
        },
        {
          nome: 'Marcos Ribeiro',
          papel: 'vendedor',
          hora: 'qua 11:38',
          rotulo: 'Alteração de medida',
          texto: '1180 → 1175 mm de largura',
        },
      ],
    },

    // cena 2 · o ambiente do cliente, antes e depois
    ambiente: {
      // pílula de 58 px por aba: até 9 caracteres
      abas: ['Antes', 'Depois'],
    },
    antes: {
      aria: 'O ambiente do cliente hoje, sem o vidro',
      // dentro de uma pílula de 118 px: até 15 caracteres em caixa alta
      selo: 'FOTO DA OBRA',
    },
    simulacao: {
      aria: 'O mesmo ambiente com o vidro montado pela IA',
      // o componente acrescenta os pontinhos que piscam
      montando: 'MONTANDO O VIDRO',
      pronto: 'GERADO POR IA',
      aprovar: 'Aprovar projeto',
      item: 'Porta de correr',
      especificacao: '10 mm incolor · 1175 × 2100',
    },
    checagem: {
      aria: 'A IA confere o pedido antes da produção',
      titulo: 'Checagem do pedido',
      sub: '26-0431 · antes de descer para a fábrica',
      pilula: 'IA · ativo',
      itens: [
        { titulo: 'Espessura', valor: '10 mm · vão de 1175' },
        { titulo: 'Ferragem', valor: 'roldana 100 kg · folha 42 kg' },
        { titulo: 'Esquadro', valor: '4 mm no topo · confirmar' },
        { titulo: 'Prazo', valor: 'têmpera cabe em 5 dias' },
      ],
      pendencia: '1 pendência antes de liberar',
      pendenciaSub: 'confirmar o esquadro com o instalador',
    },

    // cena 3 · o plano de corte, no palco e dentro dos aparelhos
    plano: {
      aria: 'Plano de corte de uma chapa 3210 × 2250: sete peças e um retalho',
      // os dois cabem dentro do retângulo do retalho: até 17 caracteres
      retalho: 'RETALHO',
      retalhoReservado: 'RETALHO RESERVADO',
      especificacao: '8 mm · incolor',
      cavalete: 'CAVALETE A-03',
    },

    // cena 6 · a mesma tela do sistema em qualquer aparelho
    sistema: {
      // a rota é a mesma nos quatro idiomas: é endereço, não texto
      url: 'neoglass.online/otimizacao',
      titulo: 'Otimização',
      pedido: '26-0431 · 8 mm incolor',
      exportar: 'Exportar',
      gerarArquivos: 'Gerar arquivos',
      // no celular só cabe o verbo
      gerar: 'Gerar',
      rodape: {
        aproveitamento: 'Aproveitamento',
        pecas: 'Peças',
        retalho: 'Retalho',
      },
    },
    aparelhos: {
      navegador: 'O plano de corte aberto no computador',
      tablet: 'O plano de corte aberto no tablet',
      celular: 'O plano de corte aberto no celular',
    },

    // cena 4 · a peça atravessando a fábrica
    producao: {
      aria: 'Painel de produção com as peças por fase',
      titulo: 'Painel de produção',
      sub: '12 pedidos abertos · 38 peças em fase',
      aoVivo: 'ao vivo',
      // cabeçalho de coluna, 118 px de largura com o contador do lado direito:
      // até 12 caracteres
      fases: ['Corte', 'Lapidação', 'Têmpera', 'Expedição'],
      especificacao: '10 mm incolor',
      transito: 'saiu da têmpera',
    },
    etiqueta: {
      aria: 'A etiqueta da peça, com código de barras',
      cabecalho: 'NEOGLASS · ETIQUETA',
      especificacao: '10 mm incolor · têmpera',
      pedido: 'Pedido 26-0431',
      cliente: 'Marina Duarte · Ap. 142',
    },
    expedicao: {
      aria: 'A expedição confere a entrega lendo o código',
      titulo: 'Expedição',
      sub: 'Carga 118 · saída 14:20',
      conferidas: 'CONFERIDAS',
      item: (p) => `Peça ${p} · conferida`,
      parcial: 'Entrega parcial · 5 de 7 peças',
    },

    // cena 5 · o dinheiro
    nota: {
      aria: 'A nota fiscal emitida pelo sistema',
      sub: 'série 1 · pedido 26-0431',
      cliente: 'Marina Duarte · CPF 000.000.000-00',
      // dentro de uma pílula de 80 px: até 10 caracteres
      autorizada: 'Autorizada',
      itensRotulo: 'ITENS',
      itens: ['Porta de correr 10 mm', 'Kit roldana 100 kg'],
      tributos: 'TRIBUTOS · MODELO NOVO',
      total: 'Total da nota',
      protocolo: 'protocolo 135260004871234 · 04/08 14:31',
      danfe: 'DANFE enviado por e-mail ao cliente',
    },
    recebimento: {
      aria: 'O boleto emitido e o recebimento previsto',
      titulo: 'Recebimento',
      emAberto: 'Em aberto',
      boleto: 'Boleto 26-0431/1',
      vencimento: 'vence em 12/09 · 1 parcela',
    },
    margem: {
      aria: 'O fechamento do pedido, com a margem real',
      titulo: 'Fechamento do pedido',
      sub: '26-0431 · entregue em 04/08',
      // pílula de 86 px: até 12 caracteres
      fechado: 'Fechado',
      custos: ['Matéria-prima', 'Produção', 'Gastos do pedido'],
      custoTotal: 'Custo total',
      venda: 'Venda',
      rotulo: 'MARGEM DESTE PEDIDO',
    },

    // a vitrine da abertura: três telas do sistema, com os mesmos números
    vitrine: {
      aria: {
        plano: 'Plano de corte otimizado',
        margem: 'Fechamento financeiro do pedido',
        feed: 'Orçamento em linha do tempo',
      },
      pecasCortadas: '7 peças cortadas',
      umRetalho: '1 retalho',
      receita: 'RECEITA',
      entrega: 'Nota emitida · boleto na rua · entregue em 5 dias',
      pedidoCliente: '26-0431 · Marina Duarte',
      clienteCurto: 'Marina Duarte · Ap. 142',
      versoesFoto: '3 versões nesta foto',
    },
  },
}
