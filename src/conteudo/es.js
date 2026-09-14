/**
 * Os textos do site em espanhol — espanhol neutro, que serve tanto a Espanha
 * quanto a América Latina. A estrutura é a mesma do pt.js, que continua sendo a
 * fonte: quando uma frase muda lá, ela muda aqui, e `npm run idiomas` avisa o
 * que ficou para trás.
 *
 * Isto não é tradução ao pé da letra. Português e espanhol são próximos demais:
 * traduzir palavra por palavra produz frase que parece certa e soa estrangeira
 * justamente para quem é do ramo. Cada frase foi reescrita com o vocabulário de
 * quem trabalha com vidro em espanhol — plancha, recorte, hueco, escuadra,
 * plan de corte, templado, expedición.
 *
 * Duas decisões de vocabulário valem para o arquivo inteiro:
 *   · retalho é sempre "recorte" (e nunca "retal", que é de Espanha, nem
 *     "retazo", que é da América Latina) — é a palavra que os dois lados
 *     entendem sem tropeçar;
 *   · trata-se o leitor por "tú", e evitam-se palavras que denunciam região
 *     ("móvil"/"celular" viram "teléfono", "coste"/"costo" viram "cuota").
 */
export default {
  // ── O que o Google e o WhatsApp leem ──────────────────────────────────
  paginas: {
    home: {
      nome: 'Inicio',
      titulo: 'NeoGlass · Software para quienes trabajan con vidrio',
      descricao:
        'Presupuestos, proyectos, optimización de corte y producción para cristalerías e industrias del vidrio.',
      ogTitulo: 'NeoGlass · Software para quienes trabajan con vidrio',
      ogDescricao: 'Presupuestos, proyectos, optimización de corte y producción para cristalerías e industrias del vidrio.',
    },
    industria: {
      nome: 'Industria',
      titulo: 'NeoGlass Intelligence · IA integrada en la industria del vidrio',
      descricao:
        'Consulta producción, ventas y expedición con NeoGlass Intelligence. IA integrada para encontrar respuestas en los datos de tu industria del vidrio.',
      ogTitulo: 'NeoGlass · tecnología de última generación para la industria del vidrio',
      ogDescricao:
        'Pregunta sobre producción, ventas y entregas. Intelligence busca respuestas en los datos de tu empresa respetando tus permisos.',
    },
    vidracaria: {
      nome: 'Cristalería',
      titulo: 'Software para cristalerías: presupuestos y proyectos | NeoGlass',
      descricao:
        'Crea presupuestos y proyectos desde el teléfono, envía un PDF con tu marca y sigue cada trabajo en NeoGlass.',
      ogTitulo: 'Software para cristalerías: presupuestos y proyectos',
      ogDescricao:
        'Mide el hueco, crea el presupuesto desde el teléfono y envía el PDF con tu marca.',
    },
    plataforma: {
      nome: 'Plataforma',
      titulo: 'Plataforma NeoGlass · Tecnología creada dentro de la fábrica de vidrio',
      descricao:
        'Un solo sistema, del presupuesto a la entrega. Creado dentro de la fábrica para conectar corte, producción, expedición y gestión.',
      ogTitulo: 'Estamos orgullosos de lo que construimos.',
      ogDescricao: 'Una plataforma creada dentro de la fábrica de vidrio. Un solo sistema, del presupuesto a la entrega.',
    },
    partner: {
      nome: 'Partner',
      titulo: 'NeoGlass Partner · Colaboración comercial para el sector del vidrio',
      descricao: 'Conoce NeoGlass Partner: recomienda cristalerías e industrias del vidrio, sigue oportunidades y consulta el modelo de comisiones de referencia en Brasil.',
      ogTitulo: 'NeoGlass Partner · Recomienda NeoGlass. Gana con cada contratación.',
      ogDescricao: 'Una colaboración comercial para quienes conocen empresas del sector del vidrio.',
    },
    comecar: {
      nome: 'Empezar',
      titulo: 'Crear cuenta en NeoGlass · 14 días gratis, sin tarjeta',
      descricao:
        'Crea tu cuenta y usa NeoGlass 14 días sin tarjeta de crédito. Presupuesto, plan de corte, retales y producción para cristalerías.',
      ogTitulo: 'Empieza por el próximo presupuesto que entre',
      ogDescricao: '14 días gratis, sin tarjeta. La invitación llega a tu correo en instantes.',
    },
    baixar: {
      nome: 'Instalar',
      titulo: 'Instalar NeoGlass · en el móvil, la tablet y el ordenador',
      descricao:
        'Instala NeoGlass como app en iPhone, Android o PC. Es una PWA: sin tienda, sin archivo que descargar. El mismo sistema, en un icono en tu pantalla.',
      ogTitulo: 'NeoGlass en un icono en tu pantalla',
      ogDescricao: 'Instálalo en el móvil, la tablet o el ordenador. Mismo sistema, misma cuenta, sin tienda.',
    },
  },

  // ── O topo, o rodapé e os botões que aparecem em toda página ──────────
  chrome: {
    inicio: 'NeoGlass — inicio',
    // "Públicos" existe em espanhol, mas num menu soa a apresentação de
    // agência. Quem é do setor lê "Sectores" e sabe na hora que ali estão
    // fábrica e cristalería.
    publicos: 'Sectores',
    entrar: 'Entrar',
    preco: 'Precio',
    agendarCurto: 'Agendar 20 min',
    agendarLongo: 'Agendar demostración de 20 min',
    comecarCurto: 'Empezar',
    comecarGratis: (dias) => `Empezar gratis · ${dias} días`,
    comecarAgora: 'Empezar ahora',
    queroComecar: 'Quiero empezar',
    falarWhatsapp: 'Hablar por WhatsApp',
    rodapeTexto:
      'neoglass.online · sistema modular para la industria del vidrio plano y para la cristalería',
    paraQuem: 'Para quién',
    contato: 'Contacto',
    // O atendimento continua sendo brasileiro. Quem lê isto está em Madri ou em
    // Bogotá, então o fuso vem escrito por extenso e com o deslocamento (GMT-3)
    // do lado, para o leitor conseguir converter sem ter que procurar.
    horarios: 'lun a vie, 14:00–20:00 · sáb, 8:00–17:00 (hora de Brasilia, GMT-3)',
    idioma: 'Idioma',
    // Cabeçalho da coluna da direita na tabela de contraste — a mesma frase
    // na indústria e na cristalería, por isso fica no tronco comum e não nos
    // módulos de área. Ver Contraste.jsx.
    comNeoGlass: 'Con NeoGlass',
  },

  agenda: {
    semScript: 'La agenda no cargó aquí — la red o una extensión la bloqueó.',
    abrirFora: 'Abrir la agenda',
    carregando: 'Cargando los horarios…',
    falarWhatsapp: '¿No encuentras horario? Escríbeme por WhatsApp.',
  },

  // ── As mensagens prontas do WhatsApp ──────────────────────────────────
  whatsapp: {
    demonstracao: '¡Hola! Vengo desde la web de NeoGlass y quiero ver una demostración.',
    comecar: '¡Hola! Quiero empezar a usar NeoGlass en mi cristalería.',
  },

  // ── De onde vem (aparece nas três páginas) ────────────────────────────
  origem: {
    rotulo: 'De dónde viene',
    /* A segunda metade falava do que o sistema NÃO é. Esta fala de quem o fez,
       que é o argumento mais forte e o único que um concorrente não copia. */
    titulo: 'Nació dentro de una fábrica de vidrio, escrito por quien lleva décadas en el sector.',
    fatos: [
      [
        'Desarrollado en Suiza',
        'donde entregar vidrio fuera de plazo o fuera de escuadra sencillamente no es una opción',
      ],
      [
        'Escrito dentro de la fábrica',
        'ninguna pantalla salió de una reunión: todas salieron de una pérdida que ya había ocurrido',
      ],
      [
        'En producción, no en prototipo',
        'hoy hay fábricas cortando y entregando con él, mientras lees esta página',
      ],
    ],
  },

  // O mesmo pedido atravessando a operação — a peça central do
  // posicionamento. Ver components/Fluxo.jsx.
  fluxo: {
    rotulo: 'El pedido, de punta a punta',
    titulo: 'Nadie reescribe el mismo pedido dos veces.',
    texto: 'El pedido se registra una vez y acompaña a toda la empresa. Cada etapa trabaja con la misma información — la que se tomó en la obra.',
    estadoRotulo: 'Dónde está ahora',
    pedido: { numero: '26-0918', cliente: 'Marcos Ribeiro', vidro: 'Incoloro 6 mm templado · 4 piezas' },
    etapas: [
      { nome: 'Presupuesto', estado: 'Propuesta enviada al cliente', detalhe: 'La medida de la obra se convirtió en precio, PDF y plazo. Nada se escribió de nuevo.' },
      { nome: 'Aprobación', estado: 'Autorizado por el cliente', detalhe: 'La aprobación congela importe y plazo, y libera el pedido a la fábrica.' },
      { nome: 'Producción', estado: 'En la mesa de corte', detalhe: 'El plan de corte salió del mismo pedido, con los retales ya considerados.' },
      { nome: 'Expedición', estado: 'Preparado para la entrega', detalhe: 'Las piezas se comprobaron contra el pedido, no contra un papel suelto.' },
      { nome: 'Finanzas', estado: 'Margen calculado', detalhe: 'Ingresos, materia prima y producción de este pedido, en el mismo lugar.' },
    ],
    nota: 'El número del pedido es el mismo en las cinco etapas. Esa es la diferencia entre un sistema y un montón de herramientas que no se hablan.',
  },
}
