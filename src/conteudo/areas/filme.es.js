/**
 * O filme de rolagem, em espanhol neutro (serve Espanha e América Latina).
 * Mesmas chaves e mesma ordem de `filme.pt.js`.
 *
 * Vocabulário do ramo: plancha, recorte (nunca "retal" nem "retazo"),
 * caballete, cristalería, hueco, escuadra, templado, plan de corte, herrajes,
 * expedición. O espanhol é um pouco mais comprido que o português, então os
 * rótulos que ficam dentro dos SVG foram medidos um a um.
 *
 * Números, medidas, códigos, datas e nomes próprios ficam como no português.
 */
export default {
  // ── O cabeçalho da seção, em volta do palco ───────────────────────────
  secao: {
    aria: 'Un pedido atravesando el sistema',
    rotulo: 'Un pedido, seis etapas · se reproduce solo',
    // H. de hoja, la numeración de plano
    folha: 'H. 03/06',
    /* Antes eram dois lugares e nenhum verbo. O que o filme mostra é um pedido
       só atravessando a empresa inteira sem ninguém redigitar nada. "Nota" é
       nota fiscal: em espanhol, "factura". */
    titulo: 'Un solo pedido, de la obra a la factura. Sin que nadie vuelva a teclear nada.',
  },

  // ── A narração das seis cenas ─────────────────────────────────────────
  cenas: [
    {
      etapa: 'Presupuesto',
      titulo: 'Foto en la obra, presupuesto listo.',
      sub: 'Cada visita, cada medida y cada cambio del cliente entra en la línea de tiempo. Las fotos se vuelven carrusel — la versión de ahora delante, las anteriores justo detrás.',
      medidor: (n) => `Registros en el presupuesto · ${n}/4`,
    },
    {
      etapa: 'Aprobación',
      /* Era enigma: o leitor tinha de parar para entender quem aprova e o que
         não existe. Numa cena de quatro segundos, enigma é tempo perdido. */
      titulo: 'El cliente ve el vidrio en su propia pared.',
      sub: 'La IA monta el vidrio sobre la foto del ambiente del propio cliente. Ve la puerta en su sitio, en su pared, antes de cortar una sola pieza.',
      medidor: (n) => `Revisando el pedido · ${n}/4`,
    },
    {
      etapa: 'Corte',
      /* "Corta bien" é o mínimo que se espera de qualquer sistema — não é
         promessa. O que impressiona é a sobra sair do chão com endereço. */
      titulo: 'El recorte se levanta del suelo y entra en el stock.',
      sub: 'El plan de corte sale listo para la mesa. Y el trozo que sobró vuelve al caballete con medida, color y dirección, para pelear la próxima optimización.',
      medidor: (p) => `Aprovechamiento · ${p}%`,
      medidorFim: 'Recorte reservado · caballete A-03',
    },
    {
      etapa: 'Producción',
      titulo: 'La pieza tiene dirección.',
      sub: 'Cada pieza sale con etiqueta y código. Atraviesa las fases en pantalla, y la entrega se da leyendo el código — no por la memoria de quien la cargó.',
      medidor: (n) => `Piezas verificadas en la salida · ${n}/5`,
    },
    {
      etapa: 'Dinero',
      titulo: 'Al final sabes cuánto quedó.',
      sub: 'Factura emitida, recibo en la calle y el cierre del pedido: materia prima, producción y gastos hasta el margen real de ese pedido — no el promedio del mes.',
      medidor: (p) => `Margen de este pedido · ${p}%`,
    },
    {
      etapa: 'Cualquier pantalla',
      titulo: 'Se abre donde estés.',
      sub: 'La oficina en el ordenador, el encargado en la tablet junto a la mesa, el vendedor en el móvil en la obra. Mismo pedido, misma hora — y nada que instalar.',
      medidor: (n) => `Pantallas abiertas a la vez · ${n}/3`,
    },
  ],

  // ── Os rótulos dentro dos SVG ─────────────────────────────────────────
  telas: {
    feed: {
      aria: 'El presupuesto en feed, en el móvil del vendedor',
      titulo: 'Presupuesto 26-0431',
      situacao: 'En curso',
      cliente: 'Marina Duarte',
      endereco: 'Ap. 142 · Ed. Aurora',
      // "Ítems" tem 5 caracteres e cabe entre as abas fixas em 66 e 106
      abas: ['Feed', 'Ítems', 'Propuesta'],
      versoes: (n) => `${n} versiones`,
      posts: [
        {
          nome: 'Marcos Ribeiro',
          papel: 'vendedor',
          hora: 'mar 09:20',
          legenda: 'Hueco del salón · 1180 × 2100 mm',
        },
        {
          nome: 'Marina Duarte',
          papel: 'cliente',
          hora: 'mar 15:44',
          rotulo: 'Observación',
          texto: 'Prefiero corredera, no abatible.',
        },
        {
          nome: 'Ana Silveira',
          papel: 'oficina',
          hora: 'mié 08:05',
          legenda: 'Herrajes negros · rodamiento visto',
        },
        {
          nome: 'Marcos Ribeiro',
          papel: 'vendedor',
          hora: 'mié 11:38',
          rotulo: 'Cambio de medida',
          texto: '1180 → 1175 mm de ancho',
        },
      ],
    },

    ambiente: {
      abas: ['Antes', 'Después'],
    },
    antes: {
      aria: 'El ambiente del cliente hoy, sin el vidrio',
      selo: 'FOTO DE OBRA',
    },
    simulacao: {
      aria: 'El mismo ambiente con el vidrio montado por la IA',
      // sem o artigo: com os pontinhos, "MONTANDO EL VIDRIO..." raspa a pílula
      montando: 'MONTANDO VIDRIO',
      // "GENERADO POR IA" não cabe na pílula: 13 caracteres é o teto aqui
      pronto: 'CREADO CON IA',
      aprovar: 'Aprobar proyecto',
      item: 'Puerta corredera',
      especificacao: '10 mm incoloro · 1175 × 2100',
    },
    checagem: {
      aria: 'La IA revisa el pedido antes de la producción',
      titulo: 'Revisión del pedido',
      sub: '26-0431 · antes de bajar a la fábrica',
      pilula: 'IA · activo',
      itens: [
        { titulo: 'Espesor', valor: '10 mm · hueco de 1175' },
        { titulo: 'Herrajes', valor: 'rodamiento 100 kg · hoja 42 kg' },
        { titulo: 'Escuadra', valor: '4 mm arriba · confirmar' },
        { titulo: 'Plazo', valor: 'el templado cabe en 5 días' },
      ],
      pendencia: '1 pendiente antes de liberar',
      pendenciaSub: 'confirmar la escuadra con el instalador',
    },

    plano: {
      aria: 'Plan de corte de una plancha 3210 × 2250: siete piezas y un recorte',
      retalho: 'RECORTE',
      retalhoReservado: 'RECORTE RESERVADO',
      especificacao: '8 mm · incoloro',
      cavalete: 'CABALLETE A-03',
    },

    sistema: {
      url: 'neoglass.online/otimizacao',
      titulo: 'Optimización',
      pedido: '26-0431 · 8 mm incoloro',
      exportar: 'Exportar',
      gerarArquivos: 'Generar archivos',
      gerar: 'Generar',
      rodape: {
        aproveitamento: 'Aprovechamiento',
        pecas: 'Piezas',
        retalho: 'Recorte',
      },
    },
    aparelhos: {
      navegador: 'El plan de corte abierto en el ordenador',
      tablet: 'El plan de corte abierto en la tablet',
      celular: 'El plan de corte abierto en el móvil',
    },

    producao: {
      aria: 'Panel de producción con las piezas por fase',
      titulo: 'Panel de producción',
      sub: '12 pedidos abiertos · 38 piezas en fase',
      aoVivo: 'en vivo',
      fases: ['Corte', 'Pulido', 'Templado', 'Expedición'],
      especificacao: '10 mm incoloro',
      transito: 'sale de templado',
    },
    etiqueta: {
      aria: 'La etiqueta de la pieza, con su código',
      cabecalho: 'NEOGLASS · ETIQUETA',
      especificacao: '10 mm incoloro · templado',
      pedido: 'Pedido 26-0431',
      cliente: 'Marina Duarte · Ap. 142',
    },
    expedicao: {
      aria: 'Expedición confirma la entrega leyendo el código',
      titulo: 'Expedición',
      sub: 'Carga 118 · salida 14:20',
      conferidas: 'VERIFICADAS',
      item: (p) => `Pieza ${p} · verificada`,
      parcial: 'Entrega parcial · 5 de 7 piezas',
    },

    nota: {
      aria: 'La factura emitida por el sistema',
      sub: 'serie 1 · pedido 26-0431',
      cliente: 'Marina Duarte · CPF 000.000.000-00',
      autorizada: 'Autorizada',
      itensRotulo: 'ARTÍCULOS',
      itens: ['Puerta corredera 10 mm', 'Kit rodamiento 100 kg'],
      tributos: 'IMPUESTOS · MODELO NUEVO',
      total: 'Total de la factura',
      protocolo: 'protocolo 135260004871234 · 04/08 14:31',
      danfe: 'DANFE enviado por correo al cliente',
    },
    recebimento: {
      aria: 'El recibo emitido y el cobro previsto',
      titulo: 'Cobro',
      emAberto: 'Pendiente',
      boleto: 'Recibo 26-0431/1',
      vencimento: 'vence el 12/09 · 1 cuota',
    },
    margem: {
      aria: 'El cierre del pedido, con el margen real',
      titulo: 'Cierre del pedido',
      sub: '26-0431 · entregado el 04/08',
      fechado: 'Cerrado',
      custos: ['Materia prima', 'Producción', 'Gastos del pedido'],
      custoTotal: 'Coste total',
      venda: 'Venta',
      rotulo: 'MARGEN DE ESTE PEDIDO',
    },

    vitrine: {
      aria: {
        plano: 'Plan de corte optimizado',
        margem: 'Cierre financiero del pedido',
        feed: 'Presupuesto en línea de tiempo',
      },
      pecasCortadas: '7 piezas cortadas',
      umRetalho: '1 recorte',
      receita: 'INGRESOS',
      // a linha inteira tem 198 px a 7 px de fonte: até uns 45 caracteres
      entrega: 'Factura y recibo emitidos · entrega en 5 días',
      pedidoCliente: '26-0431 · Marina Duarte',
      clienteCurto: 'Marina Duarte · Ap. 142',
      versoesFoto: '3 versiones de esta foto',
    },
  },
}
