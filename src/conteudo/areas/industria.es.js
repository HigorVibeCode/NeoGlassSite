/**
 * Os textos da aba Indústria em espanhol neutro (serve Espanha e América
 * Latina). As chaves são as mesmas de `industria.pt.js`, na mesma ordem.
 *
 * Português e espanhol são próximos demais: traduzir palavra por palavra
 * produz frase que parece certa e soa estrangeira justo para quem é do ramo.
 * Vocabulário do setor: plancha, recorte (nunca "retal" nem "retazo"),
 * caballete, escuadra, plan de corte, templado. Trata-se o leitor por "tú",
 * como no resto do site.
 *
 * O destaque do título mudou de lugar: em português o gradiente pega "é
 * lucro"; em espanhol a frase fecha em "es ganancia", que é onde ele cai.
 */
export default {
  projeto: {
    rotulo: 'Mira la tecnología en acción',
    titulo: 'De una frase al proyecto. Míralo suceder.',
    texto: 'Esta demostración simula el diseño de un hueco. La IA prepara un borrador; una persona elige, revisa y confirma el proyecto antes de continuar.',
  },
  diferenciais: {
    rotulo: 'Tecnología aplicada al vidrio',
    titulo: 'No solo gestionar la fábrica. Cambiar cómo nace el pedido.',
    itens: [
      { nome: 'Voz o texto se convierten en borrador', texto: 'Describe una pieza o un hueco como hablarías con tu equipo. NeoGlass ordena medidas y datos para su revisión; la IA no sustituye la comprobación.' },
      { nome: 'Un proyecto que se puede ver', texto: 'El dibujo 2D, la vista 3D y la geometría de corte muestran el pedido antes de llegar a la mesa. Los cambios parten del proyecto, no de una hoja de cálculo.' },
      { nome: 'Archivos para la máquina', texto: 'El plan y el contorno pueden exportarse en formatos de producción. Los motores .g y .cni se validaron en mesas reales; tu equipo controla la liberación.' },
    ],
  },

  laco: {
    modulo: 'NeoGlass Optimización',
    rotulo: 'El retal se vuelve stock',
    etiqueta: 'Retal',
    codigo: 'Código',
    medida: 'Medida',
    prateleira: 'Estante',
    feito: 'Registrado',
  },

  reconhecimento: {
    titulo: 'El buen retal es tu pérdida más silenciosa.',
    texto: 'Cada pedido deja un trozo de vidrio que todavía sirve. Se apoya en el caballete, nadie lo registra, y a la semana siguiente compras una plancha nueva para un corte que ya estaba ahí.',
    destaque: 'El vidrio que sobra y se escapa del control es una plancha pagada dos veces.',
  },

  resultado: {
    titulo: 'Menos plancha. Menos rotura. Menos planilla.',
    itens: [
      { nome: 'Menos plancha comprada', texto: 'Antes de abrir vidrio nuevo, el sistema busca en los retales. Cada retal aprovechado es una plancha que no entró en la cuenta.' },
      { nome: 'Nada se vuelve rotura olvidada', texto: 'El retal sale del corte ya con código, medida y dirección de caballete. Existe en el stock sin que nadie lo registre.' },
      { nome: 'Un solo sistema', texto: 'El optimizador, el stock y la etiqueta son lo mismo. Nada se exporta, nada se reescribe — por eso el retal no se pierde.' },
    ],
  },
  percurso: {
    titulo: 'El mismo pedido sigue hasta la entrega.',
    texto: 'El ahorro en el corte es solo una parte. Pedidos, producción y expedición comparten la misma información.',
    etapas: [
      { nome: 'Pedido', texto: 'Medidas, precio y plazo permanecen juntos desde el inicio.' },
      { nome: 'Corte', texto: 'El plan considera las planchas y los recortes disponibles.' },
      { nome: 'Producción', texto: 'El equipo sigue la fase de cada pieza.' },
      { nome: 'Expedición', texto: 'La comprobación y la entrega siguen vinculadas al pedido.' },
    ],
    nota: 'Vista ilustrativa de las áreas de NeoGlass. Elige una pantalla para ver el módulo.',
  },
  // ── A abertura (FL. 01/06) ────────────────────────────────────────────
  hero: {
    rotulo: 'NeoGlass · plataforma para la industria del vidrio',
    verProjeto: 'Ver la tecnología en acción',
    etiqueta: 'Tecnología aplicada al vidrio',
    titulo: {
      antes: 'Tecnología de última generación para',
      destaque: 'la industria del vidrio.',
    },
    // "ganancia" e não "beneficio": as duas se entendem dos dois lados do
    // Atlântico, mas ganancia é a que o dono de fábrica usa falando.
    /* A segunda metade dizia a margem pela venda que não aconteceu ("sin
       vender un metro cuadrado más"). Entrou a inversão do pt (vender mais ×
       desperdiçar menos). "Gana" repetido dos dois lados do travessão segura o
       ritmo da oposição; "desperdiciando" e não "tirando" porque é a palavra
       que o dono usa para o vidro que se perde. Mantém o "tú" do resto do
       arquivo. */
    texto: 'IA, diseño paramétrico, optimización y producción conectados en una plataforma creada para la realidad de tu fábrica.',
    /* A terceira marca era "0 licença por posto". Saiu em 13/08 pelo mesmo
       motivo que as outras promessas sobre cobrança: a regra de usuários do
       sistema não está definida, e prometer o que a fatura não cumpre é a
       forma mais cara de perder a confiança que a página constrói. */
    marcas: [
      ['87,4%', 'de aprovechamiento en el plan de corte'],
      ['3,42 m²', 'de materia prima ahorrada'],
      ['0', 'hojas de cálculo que mantener'],
    ],
  },

  // ── A demonstração do retalho (FL. 02/06) ─────────────────────────────
  demo: {
    rotulo: 'El valor también se ve en el corte',
    acao: 'Ejecutar la demostración',
    /* O título repetia a abertura com outras palavras, e o texto gastava
       quatro frases explicando um botão. Agora o título é o resultado que ele
       vai VER acontecer, e o texto cabe em duas linhas — o resto ele descobre
       apertando, que é para isso que existe a demonstração. */
    titulo: 'Antes de abrir una plancha nueva, mira lo que ya tienes.',
    texto:
      'Un pedido real de 20 piezas, con el optimizador de verdad funcionando aquí, en tu navegador. Pulsa y mira dónde dejas de comprar materia prima.',
  },

  // ── O contraste em duas colunas (FL. 04/06) ───────────────────────────
  contraste: {
    rotulo: 'Lo que cambia en la planta',
    titulo: 'La diferencia se nota el lunes.',
    hoje: 'Hoy, sin sistema de vidrio',
    pares: [
      [
        'El recorte bueno se apoya en el caballete y desaparece del control',
        'Vuelve al stock con medida, color y caballete',
      ],
      [
        '«¿Dónde está mi pedido?» — alguien baja a la planta',
        'Fase, hora y responsable en pantalla',
      ],
      [
        'El precio sale de la experiencia del vendedor',
        'El precio sale de la tarifa; el margen cierra pedido a pedido',
      ],
      /* O lado direito destes dois pares foi refeito em 13/08. Caíram, e não
         voltam: a checagem do fora de escuadra antes de cortar (o sistema não
         faz isso) e o G-code (não existe na saída). No lugar entraram os
         formatos que a mesa realmente lê e os dois otimizadores do mercado. */
      [
        'La medida equivocada aparece con el vidrio ya templado',
        'Sale en DXF, CNI y FBT — o directo a Opty-Way y Perfect Cut',
      ],
      [
        'Hay que redibujar el plan en el CAD, con la mesa parada esperando',
        'El plan nace listo y entra directo en la mesa',
      ],
    ],
  },

  // ── A chamada final (FL. 06/06) ───────────────────────────────────────
  chamada: {
    rotulo: 'Agendar la presentación',
    /* "Lo montamos delante de ti" soava a truque de vendedor. A promessa forte
       é ele sair de lá com o plano de corte do pedido DELE na mão. */
    titulo: 'Trae un pedido real. Mira cómo trabaja NeoGlass.',
    texto:
      'La presentación es con el sistema abierto, no con diapositivas. Si al final no te encaja en la operación, has perdido veinte minutos y te llevas un diagnóstico.',
    passos: [
      'Nos enseñas un pedido tuyo, real',
      'Lo montamos en el sistema, en vivo',
      'Ves el proyecto y el plan de corte en pantalla',
    ],
  },
}
