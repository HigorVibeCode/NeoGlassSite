/**
 * Os textos do site em português — e a forma que os outros três idiomas
 * seguem. Este arquivo é a fonte: quando uma frase muda aqui, ela muda nos
 * outros, e `npm run idiomas` avisa o que ficou para trás.
 *
 * A árvore é aninhada, e não uma lista plana de chaves, porque a copy deste
 * site é estruturada — pares de contraste, listas de módulos, cenas do filme.
 * Chave plana ('industria.contraste.par3.antes') seria mais fácil de gerar e
 * muito mais difícil de reler daqui a seis meses.
 */
export default {
  // ── O que o Google e o WhatsApp leem ──────────────────────────────────
  paginas: {
    home: {
      nome: 'Início',
      titulo: 'NeoGlass · Software para quem trabalha com vidro',
      descricao:
        'Orçamentos, projetos, otimização de corte e produção para vidraçarias e indústrias do vidro.',
      ogTitulo: 'NeoGlass · Software para quem trabalha com vidro',
      ogDescricao: 'Orçamentos, projetos, otimização de corte e produção para vidraçarias e indústrias do vidro.',
    },
    industria: {
      nome: 'Indústria',
      titulo: 'NeoGlass Intelligence · IA integrada à indústria do vidro',
      descricao:
        'Consulte produção, vendas e expedição com o NeoGlass Intelligence. IA integrada para encontrar respostas nos dados da sua indústria do vidro.',
      ogTitulo: 'NeoGlass · tecnologia de última geração para a indústria do vidro',
      ogDescricao:
        'Pergunte sobre produção, vendas e entregas. O Intelligence busca as respostas nos dados da sua empresa, respeitando suas permissões.',
    },
    vidracaria: {
      nome: 'Vidraçaria',
      titulo: 'Software para vidraçaria: orçamentos e projetos | NeoGlass',
      descricao:
        'Faça orçamentos e projetos pelo celular, gere PDF com sua marca e acompanhe cada serviço no NeoGlass.',
      ogTitulo: 'Software para vidraçaria: orçamentos e projetos',
      ogDescricao:
        'Meça o vão, faça o orçamento no celular e envie o PDF com a sua marca.',
    },
    plataforma: {
      nome: 'Plataforma',
      titulo: 'Plataforma NeoGlass · Tecnologia criada dentro da fábrica de vidro',
      descricao:
        'Um sistema só, do orçamento à entrega. Criado dentro da fábrica para conectar corte, produção, expedição e gestão.',
      ogTitulo: 'Temos orgulho do que construímos.',
      ogDescricao: 'Uma plataforma criada dentro da fábrica de vidro. Um sistema só, do orçamento à entrega.',
    },
    partner: {
      nome: 'Partner',
      titulo: 'NeoGlass Partner · Parceria comercial para o setor do vidro',
      descricao: 'Conheça o programa NeoGlass Partner: indique vidraçarias e indústrias do vidro, acompanhe oportunidades e veja o modelo de comissões de referência no Brasil.',
      ogTitulo: 'NeoGlass Partner · Indique o NeoGlass. Ganhe com cada contratação.',
      ogDescricao: 'Uma parceria comercial para quem tem relacionamento com empresas do setor do vidro.',
    },
    comecar: {
      nome: 'Começar',
      titulo: 'Criar conta no NeoGlass · 14 dias grátis, sem cartão',
      descricao:
        'Crie sua conta e use o NeoGlass por 14 dias sem cartão de crédito. Orçamento, plano de corte, retalho e produção para vidraçaria.',
      ogTitulo: 'Comece pelo próximo orçamento que entrar',
      ogDescricao: '14 dias grátis, sem cartão. O convite chega no seu e-mail em instantes.',
    },
    baixar: {
      nome: 'Instalar',
      titulo: 'Instalar o NeoGlass · no celular, no tablet e no computador',
      descricao:
        'Instale o NeoGlass como app no iPhone, Android ou PC. É um PWA: sem loja, sem arquivo para baixar. O mesmo sistema, num ícone na sua tela.',
      ogTitulo: 'O NeoGlass num ícone na sua tela',
      ogDescricao: 'Instale no celular, no tablet ou no computador. Mesmo sistema, mesma conta, sem loja.',
    },
  },

  // ── O topo, o rodapé e os botões que aparecem em toda página ──────────
  chrome: {
    inicio: 'NeoGlass — início',
    publicos: 'Públicos',
    entrar: 'Entrar',
    preco: 'Preço',
    agendarCurto: 'Agendar 20 min',
    agendarLongo: 'Agendar demonstração de 20 min',
    comecarCurto: 'Começar',
    comecarGratis: (dias) => `Começar grátis · ${dias} dias`,
    comecarAgora: 'Começar agora',
    queroComecar: 'Quero começar',
    falarWhatsapp: 'Falar no WhatsApp',
    rodapeTexto:
      'neoglass.online · sistema modular para a indústria do vidro plano e para a vidraçaria',
    paraQuem: 'Para quem',
    contato: 'Contato',
    horarios: 'seg a sex, 14h–20h · sáb, 8h–17h (horário de Brasília)',
    idioma: 'Idioma',
    // Cabeçalho da coluna da direita na tabela de contraste. Mora aqui, e não
    // no módulo de uma área, porque a tabela aparece na indústria e na
    // vidraçaria com a mesma frase — repeti-la em cada área seria criar duas
    // fontes para o mesmo texto. Ver Contraste.jsx.
    comNeoGlass: 'Com o NeoGlass',
  },

  agenda: {
    semScript: 'A agenda não carregou aqui — a rede ou uma extensão bloqueou.',
    abrirFora: 'Abrir a agenda',
    carregando: 'Carregando os horários…',
    falarWhatsapp: 'Não encontrou horário? Fale comigo no WhatsApp.',
  },

  // ── As mensagens prontas do WhatsApp ──────────────────────────────────
  whatsapp: {
    demonstracao: 'Olá! Vim pelo site do NeoGlass e quero ver uma demonstração.',
    comecar: 'Olá! Quero começar a usar o NeoGlass na minha vidraçaria.',
  },

  // ── De onde vem (aparece nas três páginas) ────────────────────────────
  origem: {
    rotulo: 'De onde vem',
    /* A segunda metade já foi "e isso muda o que ele pergunta" (abstrata) e
       "não numa reunião sobre fábricas de vidro" (boa, mas fala do que NÃO é).
       Esta fala de quem fez — que é o argumento mais forte e o único que um
       concorrente não copia. */
    titulo: 'Nasceu dentro de uma fábrica de vidro, escrito por quem tem décadas no ramo.',
    fatos: [
      [
        'Desenvolvido na Suíça',
        'onde entregar vidro fora do prazo ou fora do esquadro simplesmente não é uma opção',
      ],
      [
        'Escrito dentro da fábrica',
        'nenhuma tela nasceu de reunião: todas nasceram de um prejuízo que já aconteceu',
      ],
      [
        'Em produção, não em protótipo',
        'tem fábrica cortando e entregando com ele hoje, enquanto você lê esta página',
      ],
    ],
  },

  // O mesmo pedido atravessando a operação — a peça central do
  // posicionamento. Ver components/Fluxo.jsx.
  fluxo: {
    rotulo: 'O pedido, de ponta a ponta',
    titulo: 'Ninguém redigita o mesmo pedido duas vezes.',
    texto: 'O pedido entra uma vez e acompanha a empresa inteira. Cada etapa trabalha com a mesma informação — a que o vidraceiro digitou na obra.',
    estadoRotulo: 'Onde ele está agora',
    pedido: { numero: '26-0918', cliente: 'Marcos Ribeiro', vidro: 'Incolor 6 mm temperado · 4 peças' },
    etapas: [
      { nome: 'Orçamento', estado: 'Proposta enviada ao cliente', detalhe: 'A medida da obra virou preço, PDF e prazo. Nada foi digitado de novo.' },
      { nome: 'Aprovação', estado: 'Autorizado pelo cliente', detalhe: 'A aprovação congela valor e prazo, e libera o pedido para a fábrica.' },
      { nome: 'Produção', estado: 'Na mesa de corte', detalhe: 'O plano de corte saiu do mesmo pedido, já com os retalhos considerados.' },
      { nome: 'Expedição', estado: 'Separado para entrega', detalhe: 'As peças foram conferidas contra o pedido, não contra um papel avulso.' },
      { nome: 'Financeiro', estado: 'Margem apurada', detalhe: 'Receita, matéria-prima e produção deste pedido, no mesmo lugar.' },
    ],
    nota: 'O número do pedido é o mesmo nas cinco etapas. É essa a diferença entre um sistema e um monte de ferramentas que não se falam.',
  },
}
