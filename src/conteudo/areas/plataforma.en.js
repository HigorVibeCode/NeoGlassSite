/**
 * The Platform tab in English. The area's pt.js remains the source: same
 * tree, same keys, same order.
 *
 * This page presents NeoGlass — and grounds the opening line. Almost no
 * paragraph: what the visitor needs to understand is in the object, the
 * animation and the film.
 */
export default {
  hero: {
    rotulo: 'The platform',
    titulo: {
      antes: 'We are',
      destaque: 'proud of what we built.',
    },
    linha: 'We come from the plant. Not from an office.',
  },

  abertura: {
    verDemonstracao: 'See a demo',
    whatsapp: 'Hi! I came from the NeoGlass site.',
  },

  lugar: {
    titulo: 'We do not build technology to imagine how a plant works.',
    linha: 'We build it because we know where it needs to get better.',
  },

  proposito: {
    titulo: 'NeoGlass was not built just to look modern.',
    linha: 'It was built to deliver results.',
  },

  caso: {
    titulo: 'Every lite is born with a unique code.',
    linha: 'The information is born once.',
    codigo: 'VG-260918-03',
    peca: 'P3',
    vidro: 'Clear 6 mm · 1800 × 1100',
    largura: '1800',
    altura: '1100',
    estacoes: {
      vao: 'Opening',
      otimizacao: 'Nesting',
      expedicao: 'Dispatch',
      financeiro: 'Finance',
    },
    carga: 'Load 118',
    boleto: 'Slip',
    margem: '41.7%',
    conferida: 'Checked',
  },

  inteligencia: {
    titulo: 'Less spectacle.',
    linha: 'More usefulness.',
    texto:
      'AI exists to cut steps, automate tasks, make analysis easier, help with projects, generate previews, support reports and speed up decisions.',
    nao: 'Not to replace people.',
    sim: 'To empower people.',
  },

  dados: {
    titulo: 'When the operation generates data,',
    linha: 'the data starts generating decisions.',
    texto: 'There is a huge difference between managing by intuition and managing by information.',
    fecho: 'What gets measured gets improved.',
  },

  continuidade: {
    titulo: 'Modern technology',
    linha: 'without giving up continuity.',
    camadas:
      'NeoGlass was built with layers of security, access control, information isolation and mechanisms for operational continuity.',
    nuvem:
      'At the same time, its cloud-based architecture allows remote access, synchronization and constant updates.',
  },

  visao: {
    titulo: {
      antes: 'The platform',
      destaque: 'keeps going.',
    },
    capacidades: {
      ia: 'Artificial intelligence',
      automacao: 'Automation',
      visao: 'Computer vision',
      dados: 'Data',
    },
  },

  futuro: {
    titulo: 'We are taking part in building',
    linha: 'the future of the glass industry.',
  },

  mundo: {
    titulo: 'We built it for the world.',
  },

  chamada: {
    titulo: 'See NeoGlass open.',
    texto: 'Forty minutes, the system open, no slides.',
    botao: 'Pick a time',
  },

  formulario: {
    rotulo: 'Book a walkthrough',
    titulo: 'Leave your contact, I will get back to you.',
    nome: 'Your name',
    empresa: 'Company',
    whatsapp: 'WhatsApp with country code',
    perfis: [
      'Glass plant (cutting table and furnace)',
      'Glass shop',
      'Distributor / glass shop with cutting',
      'Other',
    ],
    enviando: 'Sending…',
    botao: 'Show me it running',
    erro: 'That did not go through just now. Message us on WhatsApp and I will answer you directly.',
    nota: 'No account, no mailing list. Your contact is only used to set up the walkthrough.',
    mensagem: (d) =>
      `Hi! I would like to see NeoGlass.\n\nName: ${d.nome}\nCompany: ${d.empresa}\nProfile: ${d.perfil}`,
    sucesso: {
      titulo: 'Got it.',
      texto:
        'I will come back on WhatsApp to set a time. If you would rather get ahead, the number is right below.',
      botao: 'Talk on WhatsApp now',
      whatsapp: 'Hi! I have just filled in the form on the NeoGlass site.',
    },
  },
}
