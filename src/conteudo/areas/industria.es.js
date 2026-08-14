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
    verOtimizacao: 'Ver la optimización funcionando',
    etiqueta: 'El sistema por dentro',
    titulo: {
      antes: 'Antes de cortar plancha nueva, el sistema',
      destaque: 'busca en los retales.',
    },
    // "ganancia" e não "beneficio": as duas se entendem dos dois lados do
    // Atlântico, mas ganancia é a que o dono de fábrica usa falando.
    /* A segunda metade dizia a margem pela venda que não aconteceu ("sin
       vender un metro cuadrado más"). Entrou a inversão do pt (vender mais ×
       desperdiçar menos). "Gana" repetido dos dois lados do travessão segura o
       ritmo da oposição; "desperdiciando" e não "tirando" porque é a palavra
       que o dono usa para o vidro que se perde. Mantém o "tú" do resto do
       arquivo. */
    texto: 'Solo va a plancha nueva lo que no cupo en ningún retal.',
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
    rotulo: 'Demostración · el caballete antes que la plancha',
    /* O título repetia a abertura com outras palavras, e o texto gastava
       quatro frases explicando um botão. Agora o título é o resultado que ele
       vai VER acontecer, e o texto cabe em duas linhas — o resto ele descobre
       apertando, que é para isso que existe a demonstração. */
    titulo: 'Tres planchas se quedan en dos. Delante de ti.',
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
    titulo: 'Trae un pedido tuyo. Te vas con su plan de corte.',
    texto:
      'La presentación es con el sistema abierto, no con diapositivas. Si al final no te encaja en la operación, has perdido cuarenta minutos y te llevas un diagnóstico.',
    passos: [
      'Nos enseñas un pedido tuyo, real',
      'Lo montamos en el sistema, en vivo',
      'Ves salir el plan de corte al final',
    ],
  },
}
