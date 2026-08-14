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
    industria: {
      nome: 'Industria',
      titulo: 'NeoGlass · Software para la industria del vidrio plano',
      descricao:
        'Del presupuesto tomado en obra al plan de corte que entra en la mesa. Optimización de plancha con aprovechamiento de recortes y trazabilidad de cada pieza.',
      ogTitulo: 'NeoGlass · Software para la industria del vidrio plano',
      ogDescricao:
        'Del presupuesto en obra al plan de corte que entra en la mesa. Aprovecha cada recorte.',
    },
    vidracaria: {
      nome: 'Cristalería',
      titulo: 'NeoGlass para cristalerías · del presupuesto a la entrega',
      descricao:
        'Presupuesto cerrado en obra, pedido seguido desde el corte hasta la entrega y cada recorte en su lugar. Sin hojas de cálculo, sin cuaderno y sin curso.',
      ogTitulo: 'NeoGlass para cristalerías · el presupuesto sale antes de que vuelvas al taller',
      ogDescricao:
        'Mide el hueco, monta el presupuesto desde el teléfono y envía el PDF con tu marca. Precio fijo, sin cuota de implantación.',
    },
    plataforma: {
      nome: 'Plataforma',
      titulo: 'La plataforma NeoGlass · lo que resuelve cada mes',
      descricao:
        'Los módulos que ya están en marcha, la IA por dentro, la app en el bolsillo del cristalero y lo que viene después. Sin cambiar de sistema a mitad de camino.',
      ogTitulo: 'La plataforma NeoGlass, por dentro',
      ogDescricao:
        'Del presupuesto a la factura sin cambiar de sistema: los módulos que ya están en marcha y lo que viene después.',
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
    verDemoCurto: 'Ver demo',
    verDemo: 'Ver el sistema funcionando',
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
}
