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
    /* As três anteriores mediam a INSTALAÇÃO, que é problema de quem já
       comprou — não de quem está decidindo. Estas medem o dia dele: quanto
       leva um orçamento, quantas vezes ele reescreve a mesma medida e onde o
       serviço fecha. "4 min" e "1×" ficam como estão nos quatro idiomas. */
    marcas: [
      ['4 min', 'de la medida al PDF firmado'],
      ['1×', 'tecleas la medida — una sola vez'],
      ['en obra', 'el trabajo se cierra antes de que te vayas'],
    ],
    linhaPreco: (preco) => `${preco} al mes. Sin cuota de implantación y sin permanencia.`,
  },

  // ── A demonstração do orçamento ───────────────────────────────────────
  demo: {
    rotulo: 'Demostración · del hueco al PDF, en 3 toques',
    /* O título carrega a seção sozinho — o parágrafo de apoio saiu. A promessa
       é o PRESUPUESTO EM PDF já pronto, ainda na obra: por isso a frase termina
       no documento, e não na assinatura. O tempo é medido pelo metro e não por
       um cronômetro inventado — "antes de que guardes el metro" é a unidade que
       o cristalero usa para dizer "fue rápido", e ele mesmo faz a conta. É a
       mesma imagem da linha das 08:40, de propósito. Tratamento por "tú", como
       no resto do arquivo. */
    titulo: 'Mide el hueco. El presupuesto en PDF sale antes de que guardes el metro.',
  },

  // ── Um dia do vidraceiro ──────────────────────────────────────────────
  dia: {
    rotulo: 'Un día, de principio a fin',
    titulo: 'Nada nuevo en tu día. Solo el retrabajo que sale de él.',
    horas: [
      /* As quatro descrições eram lista de funcionalidade: cada uma contava o
         que o SISTEMA faz. Reescritas para dizer o que o cristalero DEIXA de
         fazer naquela hora — que é o que ele reconhece do próprio dia. */
      [
        '08:40',
        'En obra',
        'Mides, haces la foto y eliges. El cliente firma en tu pantalla antes de que guardes el metro.',
      ],
      [
        '11:20',
        'En el taller',
        'El pedido entró con las holguras ya descontadas. Nadie llamó para confirmar el espesor.',
      ],
      [
        '15:00',
        'En el banco',
        'Cada pieza con su etiqueta. Y el recorte ya está en el stock, peleando por el siguiente trabajo.',
      ],
      [
        'viernes',
        'Al final de la semana',
        'Sabes qué trabajos dejaron margen y cuáles solo dejaron trabajo. Sin abrir una hoja de cálculo.',
      ],
    ],
  },

  // ── O antes e o depois ────────────────────────────────────────────────
  contraste: {
    rotulo: 'Lo que cambia en tu semana',
    /* "sin el retrabajo" descrevia a falta de um problema. Esta diz o que a
       semana passa a ter — e "la misma gente" derruba de saída a objeção de
       que profissionalizar obriga a contratar alguém. "Entregando más y
       rehaciendo menos" listava dois efeitos e gastava o título nisso; a lista
       de pares logo abaixo já mostra os dois, um por linha. O título agora só
       nomeia o ganho e deixa a prova para a lista. */
    titulo: 'La misma gente de siempre, con mucha más eficiencia.',
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
        'La medida se pierde entre la libreta de obra y el pedido de fábrica',
        'La medida que tomaste es la que corta la fábrica — la misma, sin volver a teclear',
      ],
      [
        'A fin de mes nadie sabe qué trabajo dejó dinero',
        'El margen de cada trabajo está en la pantalla',
      ],
    ],
  },

  // ── O preço ───────────────────────────────────────────────────────────
  preco: {
    rotulo: 'Plan Cristalería · lo que cuesta y lo que no',
    titulo: 'Un trabajo al mes paga el año entero.',
    /* `valor` chega e não é usado: ver o cabeçalho do arquivo. A versão antiga
       mandava "ten ese trabajo en la cabeza mientras lees el número de abajo"
       — tarefa para o leitor. Agora a frase já fecha a conta por ele, que era
       o ponto, e continua sem citar cifra nenhuma. */
    texto: () =>
      'El presupuesto que acabas de ver salir era una ventana corriente: vidrio, herrajes e instalación, de las que entran cualquier martes. Una al mes y el sistema queda pagado de sobra.',
    /* O nome do plano, dito por extenso e curto: o selo tem cerca de 120px.
       Antes dizia só "NeoGlass para cristalerías" e o visitante não tinha como
       saber se aquele número valia para a fábrica também. São produtos e
       vendas diferentes — a indústria é consultiva e não tem preço no site. */
    cota: 'Plan Cristalería',
    soParaVidracaria:
      'Este es el plan de la cristalería. La industria es otro producto, con precio cerrado caso a caso — está en la pestaña Industria.',
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
    /* "Empieza por el próximo presupuesto" já propunha um passo pequeno, mas
       não respondia o motivo real de ninguém testar: o vidraceiro presume que
       trocar de sistema significa passar cliente, tabela e histórico a limpo
       ANTES de ver a primeira tela. A primeira frase agora tira esse peso, e
       só depois vem o convite. Tratamento por "tú", como no resto do arquivo. */
    titulo: 'No migres nada. Haz aquí solo el próximo presupuesto.',
    // A frase do meio muda com `diasTeste` da config, e a emenda com o resto do
    // parágrafo é diferente em cada idioma — por isso o `if` mora aqui dentro.
    texto: (dias) =>
      `Ningún cliente que dar de alta, ningún histórico que importar: pones tu precio por m² y el próximo presupuesto que te entre ya sale de aquí. ${
        dias > 0
          ? `Son ${dias} días sin tarjeta y sin compromiso.`
          : 'Sin permanencia: si no te sirve, te vas.'
      } Y si prefieres que lo montemos juntos, nos escribes por WhatsApp.`,
    /* Os três passos agora carregam o QUANDO: quem lê "hoy" no primeiro e "en
       la próxima obra" no segundo entende que dá para testar sem parar a
       semana. */
    passos: [
      'Hoy: creas la cuenta y pones tu precio por m²',
      'En la próxima obra: mides y montas el presupuesto en el teléfono',
      'El cliente firma en la pantalla — y lo comparas con tu forma de hoy',
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
