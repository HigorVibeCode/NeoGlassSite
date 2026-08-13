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
  // ── A abertura (FL. 01/06) ────────────────────────────────────────────
  hero: {
    rotulo: 'NeoGlass · industria del vidrio plano',
    etiqueta: 'Una pantalla del sistema, en vivo',
    titulo: {
      antes: 'El vidrio que no compras',
      destaque: 'es ganancia.',
    },
    // "ganancia" e não "beneficio": as duas se entendem dos dois lados do
    // Atlântico, mas ganancia é a que o dono de fábrica usa falando.
    texto:
      'La optimización busca en tu caballete antes de abrir plancha nueva. Es margen que entra sin vender un metro cuadrado más.',
    /* A terceira marca era "0 licença por posto". Saiu em 13/08 pelo mesmo
       motivo que as outras promessas sobre cobrança: a regra de usuários do
       sistema não está definida, e prometer o que a fatura não cumpre é a
       forma mais cara de perder a confiança que a página constrói. */
    marcas: [
      ['87,4%', 'de aprovechamiento en el plan'],
      ['3,42 m²', 'de vidrio que no se compró'],
      ['0', 'hojas de cálculo que mantener'],
    ],
  },

  // ── A demonstração do retalho (FL. 02/06) ─────────────────────────────
  demo: {
    rotulo: 'Demostración · el caballete antes que la plancha',
    titulo: 'Antes de abrir vidrio nuevo, mira lo que ya está apoyado.',
    texto:
      'Tres clics, un pedido real de 20 piezas. Pulsas optimizar, nace el plan — y ahí el sistema avisa de que encontró en el caballete un recorte que sirve. Pulsa el segundo botón y mira la cuenta. Todo corre aquí, en tu navegador, con un optimizador de verdad.',
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
      [
        'La medida equivocada aparece con el vidrio ya templado',
        'El sistema avisa del fuera de escuadra antes de cortar',
      ],
      [
        'El plan se vuelve a dibujar en el CAD, con la mesa parada',
        'Sale en DXF, G-code, ASC o CNI+FBT',
      ],
    ],
  },

  // ── A chamada final (FL. 06/06) ───────────────────────────────────────
  chamada: {
    rotulo: 'Agendar la presentación',
    titulo: 'Trae un pedido tuyo. Lo montamos delante de ti.',
    texto:
      'La presentación es con el sistema abierto, no con diapositivas. Si al final no te encaja en la operación, has perdido cuarenta minutos y te llevas un diagnóstico.',
    passos: [
      'Nos enseñas un pedido tuyo, real',
      'Lo montamos en el sistema, en vivo',
      'Ves salir el plan de corte al final',
    ],
  },
}
