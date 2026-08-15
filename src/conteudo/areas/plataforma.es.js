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
    verSistema: 'Ver el sistema funcionando',
    texto:
      'Cada etapa trabaja con la misma información, del primer contacto a la entrega.',
    marcas: [
      ['1', 'pedido atraviesa todo'],
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
    rotulo: 'Lo que trabaja sobre el pedido',
    titulo: 'Todo trabaja sobre el mismo pedido.',
    texto: 'Siete partes del sistema. Ninguna pide que vuelvas a escribir lo que ya entró.',
    selo: 'en producción',
    lista: [
      ['01', 'Presupuesto y propuesta', 'Registras la obra y el cliente sin empezar de cero.'],
      ['02', 'Simulación con IA', 'El vidrio en el ambiente del cliente antes de que la pieza exista.'],
      ['03', 'Optimización de corte', 'Encuentra recortes antes de consumir plancha nueva.'],
      ['04', 'Stock y recortes', 'Usa un recorte antes de comprar otra plancha.'],
      ['05', 'Producción y trazabilidad', 'Sabe dónde está cada pieza sin preguntar a tres personas.'],
      ['06', 'Expedición y entrega', 'Sigue lo que salió, lo que está en marcha y lo que falta.'],
      ['07', 'Finanzas por pedido', 'Mira el margen de este pedido, no solo la facturación del mes.'],
    ],
  },

  // Os tipos ('celular', 'tablet', 'navegador') são chave de desenho, não
  // texto: ficam iguais nos quatro idiomas.
  aparelhos: {
    rotulo: 'Dónde se abre',
    titulo: 'El mismo pedido, del bolsillo del cristalero a la mesa de corte.',
    texto: 'La misma información, en sitios distintos.',
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
    rotulo: 'Lo que está llegando',
    titulo: 'Lo que está llegando.',
    grupos: [
      {
        selo: 'En desarrollo',
        itens: [
          [
            'Simulación con IA más fiel',
            'La imagen generada en el ambiente del cliente todavía no coincide al 100% con la pieza que sale de fábrica. Acortar esa distancia es el trabajo de ahora.',
          ],
          [
            'Más salidas de máquina',
            'Cada mesa de corte habla su propio dialecto; la lista crece según lo que va pidiendo la fábrica.',
          ],
        ],
      },
      {
        selo: 'Planificado',
        itens: [
          [
            'Factura electrónica',
            'Cada país está fijando su propio formato de factura electrónica. Estamos preparando la emisión para que salga en el formato que exija el suyo. En preparación, sin fecha que podamos prometer.',
          ],
        ],
      },
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
