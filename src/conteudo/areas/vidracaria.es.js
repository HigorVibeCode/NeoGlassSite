/**
 * A aba da vidraçaria em espanhol neutro — serve Espanha e América Latina. As
 * chaves acompanham `vidracaria.pt.js` uma a uma, na mesma ordem.
 *
 * Português e espanhol são próximos demais: traduzir palavra por palavra dá
 * frase que parece certa e soa estrangeira justamente para quem é do ramo. O
 * vocabulário é o de quem trabalha com vidro em espanhol — hueco, plancha,
 * recorte (nunca "retal" nem "retazo"), escuadra, plan de corte, holgura.
 * Trata-se o leitor por "tú", e "celular/móvil" vira "teléfono".
 *
 * DUAS DIFERENÇAS DE CONTEÚDO, de propósito:
 *   · `preco.texto` e `preco.caixaTitulo` recebem os mesmos argumentos do
 *     português e NÃO os usam. O total da demonstração (R$ 1.169) é um número
 *     em real, tirado de preço de m² e ferragem do Brasil. Convertido não é
 *     verdade, e a conta de "quantos meses" fica errada em euro. Aqui a caixa
 *     manda comparar com o retrabalho do próprio leitor;
 *   · nada sobre cobrança por usuário — a regra não está definida.
 */
export default {
  // ── A abertura ────────────────────────────────────────────────────────
  hero: {
    rotulo: 'NeoGlass · para la cristalería',
    etiqueta: 'Una pantalla de la app, en vivo',
    titulo: {
      antes: 'Profesionalizarte',
      destaque: 'sin complicarte nada.',
    },
    texto:
      'Mides en obra, el cliente ve el precio al momento y firma en la pantalla. Sin hojas de cálculo, sin cuaderno y sin curso.',
    marcas: [
      ['Una tarde', 'para estar funcionando de verdad'],
      ['0', 'hojas de cálculo que mantener'],
      ['1', 'app — obra, banco y oficina'],
    ],
    linhaPreco: (preco) => `${preco} al mes. Sin cuota de implantación y sin permanencia.`,
  },

  // ── A demonstração do orçamento ───────────────────────────────────────
  demo: {
    rotulo: 'Demostración · del hueco al PDF, en 3 toques',
    titulo: 'Mide el hueco. El presupuesto sale antes de que vuelvas al taller.',
    texto:
      'Hay un hueco de ventana ya medido esperándote. Pulsa el botón y míralo: la ventana se monta sobre la medida, el presupuesto se rellena solo y el PDF sale con tu marca. Al final, la propia página te dice cuántos segundos tardó.',
  },

  // ── Um dia do vidraceiro ──────────────────────────────────────────────
  dia: {
    rotulo: 'Un día, de principio a fin',
    titulo: 'Nada nuevo en tu día. Solo el retrabajo que sale de él.',
    horas: [
      [
        '08:40',
        'En obra',
        'Mides el hueco desde el teléfono, haces la foto y eliges espesor y color. El precio se monta con tu tarifa y el cliente firma allí mismo, en la pantalla.',
      ],
      [
        '11:20',
        'En el taller',
        'El pedido llega con las medidas de corte ya descontadas las holguras. Nadie vuelve a teclear nada, nadie llama para confirmar el espesor.',
      ],
      [
        '15:00',
        'En el banco',
        'Cada pieza sale etiquetada. Lo que sobra de la plancha vuelve al stock con su medida — y entra a competir por el siguiente trabajo en vez de quedarse apoyado en la pared.',
      ],
      [
        'viernes',
        'Al final de la semana',
        'Ves qué trabajos dejaron margen y cuáles solo dejaron trabajo. Un número, no una hoja de cálculo.',
      ],
    ],
  },

  // ── O antes e o depois ────────────────────────────────────────────────
  contraste: {
    rotulo: 'Lo que cambia en tu semana',
    titulo: 'El mismo equipo, sin el retrabajo.',
    hoje: 'Hoy, en el cuaderno y en WhatsApp',
    pares: [
      [
        'El presupuesto se apunta en el cuaderno y desaparece hasta el lunes',
        'Sale del teléfono con foto del hueco y firma',
      ],
      [
        'El cliente llama tres veces para saber si ya está',
        'Sigue su pedido por un enlace, sin llamar',
      ],
      [
        'El recorte acaba detrás del banco y se convierte en basura',
        'Vuelve al stock con su medida — y entra en el siguiente corte',
      ],
      [
        'La medida equivocada aparece solo a la hora de instalar',
        'El sistema avisa del fuera de escuadra antes de cortar',
      ],
      [
        'A fin de mes nadie sabe qué trabajo dejó dinero',
        'El margen de cada trabajo está en la pantalla',
      ],
    ],
  },

  // ── O preço ───────────────────────────────────────────────────────────
  preco: {
    rotulo: 'Precio · sin letra pequeña',
    titulo: 'Un solo número, y sigue siendo ese.',
    // `valor` chega e não é usado: ver o cabeçalho do arquivo.
    texto: () =>
      'El presupuesto que acabas de ver montarse era una ventana de salón: vidrio, herrajes e instalación, el trabajo que entra cualquier martes. Ten ese trabajo en la cabeza mientras lees el número de abajo.',
    cota: 'NeoGlass para cristalerías',
    porMes: '/mes',
    fixo: 'Precio fijo, el día que firmas y dentro de un año.',
    semTaxa:
      'Sin cuota de implantación y sin cobro por presupuesto hecho — hoy ya sabes lo que vas a pagar en el mes doce.',
    naoCobramos: [
      ['Implantación', 'nada por empezar a usarlo'],
      ['Por presupuesto', 'haz los que quieras'],
      ['Permanencia', 'cancelas cuando quieras'],
    ],
    semCartao: (dias) =>
      `Sin tarjeta. Al final de los ${dias} días decides — y si no decides, no se cobra nada.`,
    tudoIncluido: 'Está todo incluido',
    incluso: [
      'Presupuesto en obra desde el teléfono, con foto y firma',
      'Lista de corte con las holguras ya descontadas, directa a producción',
      'Stock de recortes con medida, color y ubicación',
      'Seguimiento del pedido, del corte a la entrega',
      'PDF con tu marca, tu plazo y tu validez',
      'El margen de cada trabajo a fin de mes',
      'Soporte por WhatsApp, con gente que conoce el vidrio',
    ],
    // Em euro a comparação com o total da demonstração não existe: a caixa
    // manda comparar com o que o leitor teve de cortar duas vezes no mês
    // passado — número que ele tem e que ninguém precisa converter.
    caixaTitulo: () =>
      'Suma lo que tuviste que cortar dos veces el mes pasado. Ese es el número con el que hay que comparar esto.',
    caixaTexto:
      'Y la optimización de corte viene incluida. Comprada aparte, es una segunda cuota mensual — y casi siempre con alta antes de que cortes el primer vidrio.',
    extras: [
      ['Los datos son tuyos', 'exportas todo cuando quieras, sin pedir permiso'],
      ['Te vas cuando quieras', 'cancelación desde la pantalla, sin llamar a nadie'],
    ],
  },

  // ── A chamada de quem já tem preço na tela ────────────────────────────
  chamada: {
    rotulo: 'Empezar',
    titulo: 'Empieza por el próximo presupuesto que te entre.',
    texto: (dias) =>
      `Creas la cuenta, cargas tu tarifa y montas el primer presupuesto hoy mismo. ${
        dias > 0
          ? `Son ${dias} días sin tarjeta y sin compromiso.`
          : 'Sin permanencia: si no te sirve, te vas.'
      } Y si prefieres que lo montemos juntos, nos escribes por WhatsApp.`,
    passos: [
      'Creas la cuenta y pones tu precio por m²',
      'Montas el próximo presupuesto en la app, en obra',
      'El cliente firma y el pedido nace correcto',
    ],
  },

  // ── A chamada de enquanto não há preço publicado ──────────────────────
  chamadaDemo: {
    rotulo: 'Agendar la presentación',
    titulo: 'Trae un presupuesto tuyo. Lo montamos juntos.',
    texto:
      'Son cuarenta minutos con el sistema abierto. Mides un trabajo de verdad, lo montamos delante de ti y decides si eso cabe en tu día.',
    passos: [
      'Traes un trabajo que tengas en marcha',
      'Montamos el presupuesto en la app, en directo',
      'Ves cómo el pedido llega listo a producción',
    ],
  },
}
