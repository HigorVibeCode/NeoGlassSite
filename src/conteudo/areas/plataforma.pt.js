/**
 * Os textos da aba Plataforma, em português — a fonte que as outras três
 * versões seguem, chave por chave, na mesma ordem.
 *
 * Esta página não vende o NeoGlass. Ela o apresenta — e lastreia a frase
 * da abertura. Quase não há parágrafo: o que a pessoa precisa entender está
 * no objeto, na animação e no vídeo. O texto só nomeia o que já está à vista.
 *
 * Cobre a página (`paginas/Plataforma.jsx`) e o formulário compartilhado
 * (`components/Formulario.jsx`). A chave `abertura` continua aqui porque o
 * componente `Abertura` lê deste módulo nas outras abas.
 */
export default {
  // ── 01 · Orgulho ──────────────────────────────────────────────────────
  hero: {
    rotulo: 'A plataforma',
    titulo: {
      antes: 'Temos',
      destaque: 'orgulho do que construímos.',
    },
    linha: 'Viemos da fábrica. Não de um escritório.',
  },

  abertura: {
    verDemonstracao: 'Ver demonstração',
    whatsapp: 'Olá! Vim pelo site do NeoGlass.',
  },

  // ── 02 · O lugar ──────────────────────────────────────────────────────
  lugar: {
    titulo: 'Não criamos tecnologia para imaginar como uma fábrica funciona.',
    linha: 'Criamos tecnologia porque sabemos onde ela precisa melhorar.',
  },

  // ── 03 · O propósito ──────────────────────────────────────────────────
  proposito: {
    titulo: 'O NeoGlass não foi criado apenas para parecer moderno.',
    linha: 'Foi criado para gerar resultado.',
  },

  // ── 04 · Cada vidro nasce com um código ───────────────────────────────
  caso: {
    titulo: 'Cada vidro nasce com um código único.',
    linha: 'A informação nasce uma vez.',
    codigo: 'VG-260918-03',
    peca: 'P3',
    vidro: 'Incolor 6 mm · 1800 × 1100',
    largura: '1800',
    altura: '1100',
    estacoes: {
      vao: 'Vão',
      otimizacao: 'Otimização',
      expedicao: 'Expedição',
      financeiro: 'Financeiro',
    },
    carga: 'Carga 118',
    boleto: 'Boleto',
    margem: '41,7%',
    conferida: 'Conferida',
  },

  // ── 05 · Inteligência ─────────────────────────────────────────────────
  inteligencia: {
    titulo: 'Menos espetáculo.',
    linha: 'Mais utilidade.',
    texto:
      'IA existe para reduzir etapas, automatizar tarefas, facilitar análises, auxiliar projetos, gerar pré-visualizações, apoiar relatórios e acelerar decisões.',
    nao: 'Não para substituir pessoas.',
    sim: 'Para potencializar pessoas.',
  },

  // ── 06 · Dados ────────────────────────────────────────────────────────
  dados: {
    titulo: 'Quando a operação gera dados,',
    linha: 'os dados começam a gerar decisões.',
    texto: 'Existe uma diferença enorme entre administrar pela intuição e administrar pela informação.',
    fecho: 'Quem mede, melhora.',
  },

  // ── 07 · Continuidade ─────────────────────────────────────────────────
  continuidade: {
    titulo: 'Tecnologia moderna',
    linha: 'sem abrir mão da continuidade.',
    camadas:
      'O NeoGlass foi desenvolvido com camadas de segurança, controle de acesso, isolamento das informações e mecanismos de continuidade operacional.',
    nuvem:
      'Ao mesmo tempo, sua arquitetura baseada em nuvem permite acesso remoto, sincronização e atualizações constantes.',
  },

  // ── 08 · A plataforma continua ────────────────────────────────────────
  visao: {
    titulo: {
      antes: 'A plataforma',
      destaque: 'continua.',
    },
    capacidades: {
      ia: 'Inteligência artificial',
      automacao: 'Automação',
      visao: 'Visão computacional',
      dados: 'Dados',
    },
  },

  // ── 09 · O futuro ─────────────────────────────────────────────────────
  futuro: {
    titulo: 'Estamos participando da construção',
    linha: 'do futuro da indústria do vidro.',
  },

  // ── 10 · O mundo ──────────────────────────────────────────────────────
  mundo: {
    titulo: 'Construímos para o mundo.',
  },

  chamada: {
    titulo: 'Ver o NeoGlass aberto.',
    texto: 'Quarenta minutos, sistema aberto, sem slide.',
    botao: 'Escolher o horário',
  },

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
