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
    industria: {
      nome: 'Indústria',
      titulo: 'NeoGlass · Software para a indústria do vidro plano',
      descricao:
        'Do orçamento tirado na obra ao plano de corte que entra na mesa. Otimização de chapa com reaproveitamento de retalho e rastreio de peça.',
      ogTitulo: 'NeoGlass · Software para a indústria do vidro plano',
      ogDescricao:
        'Do orçamento na obra ao plano de corte que entra na mesa. Aproveite cada retalho.',
    },
    vidracaria: {
      nome: 'Vidraçaria',
      titulo: 'NeoGlass para vidraçaria · Profissional desde o primeiro orçamento',
      descricao:
        'Orçamento fechado na obra, pedido acompanhado do corte à entrega e retalho no lugar certo. Sem planilha, sem caderno, sem curso.',
      ogTitulo: 'NeoGlass para vidraçaria · o orçamento sai antes de você voltar para a loja',
      ogDescricao:
        'Meça o vão, monte o orçamento no celular e mande o PDF com a sua marca. Preço fixo, sem taxa de implantação.',
    },
    plataforma: {
      nome: 'Plataforma',
      titulo: 'A plataforma NeoGlass · O que ela faz pelo seu mês',
      descricao:
        'Os módulos que já rodam, a IA por dentro, o app no bolso do vidraceiro e o que vem a seguir.',
      ogTitulo: 'A plataforma NeoGlass, por dentro',
      ogDescricao:
        'Do orçamento à nota, sem trocar de sistema: os módulos que já rodam e o que vem a seguir.',
    },
  },

  // ── O topo, o rodapé e os botões que aparecem em toda página ──────────
  chrome: {
    inicio: 'NeoGlass — início',
    publicos: 'Públicos',
    entrar: 'Entrar',
    preco: 'Preço',
    verDemoCurto: 'Ver demo',
    verDemo: 'Ver o sistema funcionando',
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
}
