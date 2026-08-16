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
  },

  abertura: {
    verDemonstracao: 'Ver demonstração',
    whatsapp: 'Olá! Vim pelo site do NeoGlass.',
  },

  // ── 02 · Um vidro. Um código. ─────────────────────────────────────────
  caso: {
    titulo: 'Um vidro. Um código.',
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

  // ── 04 · A plataforma continua ────────────────────────────────────────
  visao: {
    titulo: 'A plataforma continua.',
    capacidades: {
      ia: 'Inteligência artificial',
      automacao: 'Automação',
      visao: 'Visão computacional',
      dados: 'Dados',
    },
  },

  // ── 04 · Dentro de uma fábrica ────────────────────────────────────────
  nasceu: {
    titulo: 'Nasceu dentro da fábrica. Não de um escritório.',
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
