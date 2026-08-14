/**
 * A aba Plataforma em espanhol — espanhol neutro, que serve Espanha e América
 * Latina. Mesma árvore do pt.js da área, chave por chave.
 *
 * Vocabulário do setor: plancha, recorte (nunca "retal" nem "retazo"),
 * caballete, cristalería, hueco, escuadra, templado, plan de corte.
 * O leitor é el dueño del taller: tratamiento de usted, frase corta.
 */
export default {
  hero: {
    rotulo: 'La plataforma · por dentro',
    etiqueta: 'El sistema por dentro',
    titulo: {
      antes: 'Un pedido. Del presupuesto a la factura.',
      destaque: 'Sin cambiar de sistema.',
    },
    texto:
      'Cada etapa trabaja con la misma información, del primer contacto a la entrega.',
    marcas: [
      ['7', 'módulos, un solo pedido'],
      ['4', 'formatos de salida para la mesa'],
      ['0', 'hojas de cálculo entre una etapa y otra'],
    ],
  },

  abertura: {
    verDemonstracao: 'Ver demostración',
    whatsapp: '¡Hola! Vengo desde la web de NeoGlass.',
  },

  devolve: {
    rotulo: 'Lo que devuelve cada mes',
    titulo: 'La ganancia no está en una pantalla. Está en lo que deja de pasar.',
    itens: [
      [
        'La plancha que no hizo falta abrir',
        'Cada recorte guardado es vidrio que ya se pagó una vez. Mientras no tenga medida, color y dirección de caballete, nadie puede volver a venderlo — y acaba siendo basura cara.',
      ],
      [
        'El teléfono que no sonó',
        'Cuando el cliente ve en qué fase está su pedido, deja de llamar. Y cuando deja de llamar, nadie dentro de la fábrica tiene que bajar a producción a buscar la respuesta.',
      ],
      [
        'El vidrio que no volvió',
        'Hueco fuera de escuadra, espesor que no aguanta el peso, herrajes que no existen para esa medida: todo eso es barato de corregir antes de la mesa y caro después del templado.',
      ],
      [
        'El margen que apareció',
        'No el del mes — el de cada pedido. Materia prima, producción e ingresos cierran en la misma pantalla, así se sabe qué tipo de trabajo vale la pena repetir.',
      ],
    ],
  },

  /* O módulo 'Checagem do pedido' saiu da lista nos quatro idiomas: a
     ferramenta não existe no sistema. Os números foram corridos de 01 a 07 e
     o título deixou de dizer oito. */
  modulos: {
    rotulo: 'Índice de módulos',
    titulo: 'Siete módulos. Todos abiertos en la misma fábrica, todos los días.',
    selo: 'en producción',
    lista: [
      ['01', 'Presupuesto y propuesta', 'Feed con foto de la obra, medida y firma en la pantalla del cliente'],
      ['02', 'Simulación con IA', 'El vidrio en el ambiente del cliente antes de que la pieza exista'],
      ['03', 'Optimización de corte', 'El plan usa primero los recortes; salida en DXF, G-code, ASC y CNI+FBT'],
      ['04', 'Stock y recortes', 'Cada recorte con medida, color, espesor y dirección de caballete'],
      ['05', 'Producción y trazabilidad', 'Etiqueta y código por pieza, con fase, hora y responsable'],
      ['06', 'Expedición y entrega', 'Lectura a la salida, carga comprobada pieza a pieza'],
      ['07', 'Finanzas por pedido', 'Factura, cobro y margen real del pedido, no del mes'],
    ],
  },

  // Os tipos ('celular', 'tablet', 'navegador') são chave de desenho, não
  // texto: ficam iguais nos quatro idiomas.
  aparelhos: {
    rotulo: 'Dónde se abre',
    titulo: 'El mismo pedido, del bolsillo del cristalero a la mesa de corte.',
    lista: [
      ['celular', 'En la obra', 'Mide, fotografía, presupuesta y recoge la firma — de pie, en casa del cliente.'],
      ['tablet', 'En el banco', 'La orden de producción y la etiqueta de la pieza, donde se está cortando el vidrio.'],
      ['navegador', 'En la oficina', 'El plan de corte, la cola de la mesa y el cierre del pedido.'],
    ],
  },

  /* O item brasileiro da reforma tributária (CBS, IBS, split payment) não faz
     sentido para este leitor. No lugar dele vai a factura electrónica no
     formato de cada país — sem prazo e sem citar norma, porque nem o prazo
     nem a norma são nossos de prometer. */
  adiante: {
    rotulo: 'Lo que viene después',
    titulo: 'Lo que todavía no está listo — y preferimos decirlo.',
    selo: 'en camino',
    itens: [
      [
        'Simulación con IA más fiel',
        'La imagen generada en el ambiente del cliente todavía no coincide al 100% con la pieza que sale de fábrica. Acortar esa distancia es el trabajo de ahora.',
      ],
      [
        'Factura electrónica',
        'Cada país está fijando su propio formato de factura electrónica. Estamos preparando la emisión para que salga en el formato que exija el suyo. En preparación, sin fecha que podamos prometer.',
      ],
      [
        'Más salidas de máquina',
        'Cada mesa de corte habla su propio dialecto; la lista crece según lo que va pidiendo la fábrica.',
      ],
    ],
  },

  chamada: {
    rotulo: 'Agendar la presentación',
    titulo: 'La mejor demostración es un pedido suyo.',
    texto:
      'Cuarenta minutos, el sistema abierto, sin diapositivas. Usted elige el módulo que más le interesa y empezamos por ahí.',
    passos: [
      'Usted nos dice dónde duele más hoy',
      'Abrimos el módulo que resuelve justo eso',
      'Ve el pedido entero atravesar el sistema',
    ],
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
