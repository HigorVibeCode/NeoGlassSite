/**
 * Os textos da aba Plataforma, em português — a fonte que as outras três
 * versões seguem, chave por chave, na mesma ordem.
 *
 * Cobre três arquivos: a página (`paginas/Plataforma.jsx`), a abertura
 * (`components/Abertura.jsx`) e o formulário (`components/Formulario.jsx`).
 * Abertura e Formulário são componentes compartilhados pelas três abas, mas o
 * texto que está escrito DENTRO deles pertence a esta área — por isso as
 * chaves `abertura` e `formulario` moram aqui e não num módulo à parte.
 */
export default {
  // ── O alto da página ──────────────────────────────────────────────────
  // O título é uma frase só, partida em duas: `destaque` é a parte que vai
  // dentro do <span className="marca">, com o gradiente da marca. O JSX é
  // montado no componente — aqui fica texto puro, que é o que se traduz.
  hero: {
    rotulo: 'A plataforma · por dentro',
    etiqueta: 'O sistema por dentro',
    titulo: {
      antes: 'Um pedido. Do orçamento à nota.',
      destaque: 'Sem trocar de sistema.',
    },
    texto:
      'Cada etapa trabalha com a mesma informação, do primeiro contato à entrega.',
    // O primeiro número acompanha o tamanho da lista de módulos: eram oito
    // antes de a checagem do pedido sair, são sete agora.
    marcas: [
      ['7', 'módulos, um pedido só'],
      ['4', 'formatos de saída para a mesa'],
      ['0', 'planilha entre uma etapa e outra'],
    ],
  },

  // ── O que está escrito dentro da Abertura ─────────────────────────────
  // Só o que é fixo no componente. Rótulo, texto e marcas continuam chegando
  // por prop, porque cada aba manda os seus.
  abertura: {
    verDemonstracao: 'Ver demonstração',
    whatsapp: 'Olá! Vim pelo site do NeoGlass.',
  },


  /* ── 02 · O que construímos ────────────────────────────────────────────
     Os nomes NÃO são invenção de vitrine: são exatamente os rótulos que o
     módulo tem dentro do sistema, copiados de `src/i18n/<idioma>.js` da
     plataforma. Quem ler esta página e depois abrir o NeoGlass encontra as
     mesmas palavras no mesmo lugar — que é o mínimo que uma seção chamada
     "o que construímos" tem de garantir. */
  construimos: {
    rotulo: 'O que construímos',
    titulo: 'O que já está construído.',
    ambientes: {
      admin: 'Admin',
      pedidos: 'Pedidos',
      producao: 'Produção',
      design: 'Design',
      financeiro: 'Financeiro',
    },
  },

  // ── O que ela devolve no mês ──────────────────────────────────────────
  devolve: {
    rotulo: 'O que ela devolve no mês',
    titulo: 'O ganho não está numa tela. Está no que deixa de acontecer.',
    itens: [
      [
        'A chapa que não abriu',
        'Todo retalho reservado é vidro que já foi pago uma vez. Enquanto ele não tem medida, cor e endereço de cavalete, ninguém consegue vendê-lo de novo — e ele vira lixo caro.',
      ],
      [
        'O telefone que não tocou',
        'Quando o cliente enxerga a fase do pedido, ele para de ligar. E quando ele para de ligar, alguém dentro da fábrica para de descer até a produção para descobrir a resposta.',
      ],
      [
        'O vidro que não voltou',
        'Vão fora de esquadro, espessura que não aguenta o peso, ferragem que não existe para aquela medida: tudo isso é barato de corrigir antes da mesa e caro depois da têmpera.',
      ],
      [
        'A margem que apareceu',
        'Não a do mês — a de cada pedido. Matéria-prima, produção e receita fecham na mesma tela, então dá para saber qual tipo de serviço vale a pena repetir.',
      ],
    ],
  },

  // ── Índice dos módulos ────────────────────────────────────────────────
  /* O módulo 'Checagem do pedido' saiu daqui: essa ferramenta não existe no
     sistema — era a mesma invenção que já tinha sido tirada do cartão da
     abertura (ver CartaoIA.jsx). Com ela fora, a lista tem sete módulos, os
     números foram corridos de 01 a 07 e o título deixou de dizer oito. */
  modulos: {
    rotulo: 'Índice dos módulos',
    titulo: 'Sete módulos. Todos abertos na mesma fábrica, todo dia.',
    selo: 'em produção',
    lista: [
      ['01', 'Orçamento e proposta', 'Feed com foto da obra, medida e assinatura na tela do cliente'],
      ['02', 'Simulação com IA', 'O vidro no ambiente do cliente antes de a peça existir'],
      ['03', 'Otimização de corte', 'Plano com retalho primeiro; saída em DXF, G-code, ASC e CNI+FBT'],
      ['04', 'Estoque e retalhos', 'Cada sobra com medida, cor, espessura e endereço de cavalete'],
      ['05', 'Produção e rastreio', 'Etiqueta e código por peça, com fase, hora e responsável'],
      ['06', 'Expedição e entrega', 'Leitura na saída, carga conferida peça a peça'],
      ['07', 'Financeiro por pedido', 'Nota, recebimento e margem real do pedido, não do mês'],
    ],
  },

  // ── Onde ele abre ─────────────────────────────────────────────────────
  // O primeiro item de cada linha ('celular', 'tablet', 'navegador') é a
  // chave do desenho em <Tela tipo=...>. Não é texto: fica igual nos quatro
  // idiomas.
  aparelhos: {
    rotulo: 'Onde ele abre',
    titulo: 'O mesmo pedido, do bolso do vidraceiro à mesa de corte.',
    lista: [
      ['celular', 'Na obra', 'Mede, fotografa, orça e colhe a assinatura — de pé, na casa do cliente.'],
      ['tablet', 'Na bancada', 'A ordem de produção e a etiqueta da peça, onde o vidro está sendo cortado.'],
      ['navegador', 'No escritório', 'O plano de corte, a fila da mesa e o fechamento do pedido.'],
    ],
  },

  // ── O que vem a seguir ────────────────────────────────────────────────
  /* "Modo obra sem internet" e "Painel do cliente" saíram desta lista em
     13/08: os dois já funcionam. Anunciar como futuro o que já está pronto é
     o oposto do que esta seção existe para fazer — ela vende confiança
     justamente por admitir buraco, e some com o efeito se listar coisa
     entregue.
     O calendário do split payment vem da regulamentação da reforma: 2026 é
     preparação e teste, e a fase B2B está prevista para 2027 — por isso o
     texto diz "prevista", e não uma data cravada. Este item é brasileiro e
     só existe nesta versão: en, es e de trazem no lugar dele a nota fiscal
     eletrônica no formato de cada país. */
  adiante: {
    rotulo: 'O que vem a seguir',
    titulo: 'O que ainda não está pronto — e a gente prefere dizer.',
    selo: 'a caminho',
    itens: [
      [
        'Simulação com IA mais fiel',
        'A imagem gerada no ambiente do cliente ainda não bate 100% com a peça que sai da fábrica. Encurtar essa distância é o trabalho de agora.',
      ],
      [
        'Nota fiscal no modelo da reforma',
        'Emissão com CBS e IBS e o recebimento com split payment — em preparação antes de a fase B2B começar, prevista para 2027.',
      ],
      [
        'Mais saídas de máquina',
        'Cada mesa de corte fala um dialeto; a lista cresce conforme a fábrica pede.',
      ],
    ],
  },

  // ── A chamada do fim da página ────────────────────────────────────────
  chamada: {
    rotulo: 'Agendar a apresentação',
    titulo: 'A melhor demonstração é o seu próprio pedido.',
    texto:
      'Quarenta minutos, sistema aberto, sem slide. Você escolhe o módulo que mais te interessa e a gente começa por ele.',
    passos: [
      'Você diz onde dói mais hoje',
      'A gente abre o módulo que resolve aquilo',
      'Você vê o pedido inteiro atravessar o sistema',
    ],
  },

  // ── O formulário dentro da chamada ────────────────────────────────────
  formulario: {
    rotulo: 'Agendar apresentação',
    titulo: 'Deixe o contato, eu retorno.',
    nome: 'Seu nome',
    empresa: 'Empresa',
    whatsapp: 'WhatsApp com DDD',
    perfis: [
      'Indústria de vidro (mesa de corte e forno)',
      'Vidraçaria',
      'Distribuidora / vidraçaria com corte',
      'Outro',
    ],
    enviando: 'Enviando…',
    botao: 'Quero ver funcionando',
    erro: 'Não deu para enviar agora. Chame no WhatsApp que eu respondo direto.',
    nota: 'Sem cadastro, sem lista de e-mail. O contato é usado só para marcar a apresentação.',
    // Vai preenchida no WhatsApp quando não há banco configurado — o leitor
    // é o dono da empresa, do outro lado, então os rótulos são traduzidos.
    mensagem: (d) =>
      `Olá! Quero ver o NeoGlass.\n\nNome: ${d.nome}\nEmpresa: ${d.empresa}\nPerfil: ${d.perfil}`,
    sucesso: {
      titulo: 'Recebido.',
      texto:
        'Eu retorno no WhatsApp para combinar o horário. Se preferir adiantar, o número está aqui embaixo.',
      botao: 'Falar agora no WhatsApp',
      whatsapp: 'Olá! Acabei de preencher o formulário no site do NeoGlass.',
    },
  },
}
