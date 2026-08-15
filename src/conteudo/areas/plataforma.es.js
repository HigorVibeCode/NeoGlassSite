/**
 * La pestaña Plataforma en español — español neutro. El pt.js del área
 * sigue siendo la fuente: el mismo árbol, las mismas claves, el mismo orden.
 *
 * Esta página presenta NeoGlass — y sostiene la frase de apertura. Casi no
 * hay párrafo: lo que hay que entender está en el objeto, en la animación
 * y en el vídeo.
 */
export default {
  hero: {
    rotulo: 'La plataforma',
    titulo: {
      antes: 'Estamos',
      destaque: 'orgullosos de lo que construimos.',
    },
    linha: 'El sistema de la fábrica de vidrio.',
  },

  abertura: {
    verDemonstracao: 'Ver demostración',
    whatsapp: '¡Hola! Vengo desde la web de NeoGlass.',
  },

  caso: {
    titulo: 'Un vidrio. Un código.',
    codigo: 'VG-260918-03',
    pedido: '26-0918',
    peca: 'P3',
    vidro: 'Incoloro 6 mm · 1800 × 1100',
    estacoes: {
      pedidos: 'Pedidos',
      producao: 'Producción',
      corte: 'Corte',
      financeiro: 'Finanzas',
    },
    fases: ['Corte', 'Canteado', 'Templado'],
    margem: '41,7%',
    margemRotulo: 'Margen',
    conferida: 'Pieza comprobada',
  },

  visao: {
    titulo: 'La plataforma sigue.',
    capacidades: {
      ia: 'Inteligencia artificial',
      automacao: 'Automatización',
      visao: 'Visión computacional',
      dados: 'Datos',
    },
  },

  nasceu: {
    titulo: 'Dentro de una fábrica de vidrio.',
  },

  chamada: {
    titulo: 'Ver NeoGlass abierto.',
    texto: 'Cuarenta minutos, el sistema abierto, sin diapositivas.',
    botao: 'Elegir el horario',
  },

  formulario: {
    rotulo: 'Agendar presentación',
    titulo: 'Deje el contacto y le respondo.',
    nome: 'Su nombre',
    empresa: 'Empresa',
    whatsapp: 'WhatsApp con prefijo del país',
    perfis: [
      'Industria del vidrio (mesa de corte y horno)',
      'Cristalería',
      'Distribuidora / cristalería con corte',
      'Otro',
    ],
    enviando: 'Enviando…',
    botao: 'Quiero verlo funcionando',
    erro: 'No se pudo enviar ahora. Escríbame por WhatsApp y le respondo directo.',
    nota: 'Sin registro, sin lista de correo. El contacto se usa solo para concertar la presentación.',
    mensagem: (d) =>
      `¡Hola! Quiero ver NeoGlass.\n\nNombre: ${d.nome}\nEmpresa: ${d.empresa}\nPerfil: ${d.perfil}`,
    sucesso: {
      titulo: 'Recibido.',
      texto:
        'Le escribo por WhatsApp para acordar la hora. Si prefiere adelantar, el número está aquí abajo.',
      botao: 'Hablar ahora por WhatsApp',
      whatsapp: '¡Hola! Acabo de rellenar el formulario en la web de NeoGlass.',
    },
  },
}
