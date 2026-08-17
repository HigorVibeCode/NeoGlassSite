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
    linha: 'Venimos de la fábrica. No de un despacho.',
  },

  abertura: {
    verDemonstracao: 'Ver demostración',
    whatsapp: '¡Hola! Vengo desde la web de NeoGlass.',
  },

  lugar: {
    titulo: 'No creamos tecnología para imaginar cómo funciona una fábrica.',
    linha: 'La creamos porque sabemos dónde tiene que mejorar.',
  },

  proposito: {
    titulo: 'NeoGlass no se creó solo para parecer moderno.',
    linha: 'Se creó para generar resultado.',
  },

  caso: {
    titulo: 'Cada vidrio nace con un código único.',
    linha: 'La información nace una vez.',
    codigo: 'VG-260918-03',
    peca: 'P3',
    vidro: 'Incoloro 6 mm · 1800 × 1100',
    largura: '1800',
    altura: '1100',
    estacoes: {
      vao: 'Hueco',
      otimizacao: 'Optimización',
      expedicao: 'Expedición',
      financeiro: 'Finanzas',
    },
    carga: 'Carga 118',
    boleto: 'Boleto',
    margem: '41,7%',
    conferida: 'Comprobada',
  },

  inteligencia: {
    titulo: 'Menos espectáculo.',
    linha: 'Más utilidad.',
    texto:
      'La IA existe para reducir etapas, automatizar tareas, facilitar análisis, ayudar en proyectos, generar previsualizaciones, apoyar informes y acelerar decisiones.',
    nao: 'No para sustituir a las personas.',
    sim: 'Para potenciar a las personas.',
  },

  dados: {
    titulo: 'Cuando la operación genera datos,',
    linha: 'los datos empiezan a generar decisiones.',
    texto: 'Existe una diferencia enorme entre administrar por intuición y administrar por información.',
    fecho: 'Quien mide, mejora.',
  },

  continuidade: {
    titulo: 'Tecnología moderna',
    linha: 'sin renunciar a la continuidad.',
    camadas:
      'NeoGlass fue desarrollado con capas de seguridad, control de acceso, aislamiento de la información y mecanismos de continuidad operativa.',
    nuvem:
      'Al mismo tiempo, su arquitectura basada en la nube permite acceso remoto, sincronización y actualizaciones constantes.',
  },

  visao: {
    titulo: {
      antes: 'La plataforma',
      destaque: 'sigue.',
    },
    capacidades: {
      ia: 'Inteligencia artificial',
      automacao: 'Automatización',
      visao: 'Visión computacional',
      dados: 'Datos',
    },
  },

  futuro: {
    titulo: 'Estamos participando en la construcción',
    linha: 'del futuro de la industria del vidrio.',
  },

  mundo: {
    titulo: 'Construimos para el mundo.',
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
