/**
 * Os textos da aba Indústria em alemão (DACH). As chaves são as mesmas de
 * `industria.pt.js`, na mesma ordem.
 *
 * Não é tradução, é recriação: o leitor é Glasermeister ou Betriebsleiter,
 * cético, e lê frase curta com verbo concreto. Vocabulário do setor — Tafel,
 * Restglas, Gestell, Winkel, Schnittplan, ESG. Trata-se por "Sie", como no
 * resto do site.
 *
 * Aqui o destaque do título se afasta mais do português: em alemão o verbo
 * fecha a frase, então o gradiente cai em "ist Gewinn." e a oração relativa
 * ("Glas, das Sie nicht kaufen") fica inteira do lado de fora. Era exatamente
 * para isso que o título veio partido em duas chaves.
 */
export default {
  // ── A abertura (FL. 01/06) ────────────────────────────────────────────
  hero: {
    rotulo: 'NeoGlass · Flachglasindustrie',
    etiqueta: 'Eine Maske aus dem System, live',
    titulo: {
      antes: 'Glas, das Sie nicht kaufen,',
      destaque: 'ist Gewinn.',
    },
    texto:
      'Die Optimierung schaut erst auf Ihr Gestell, bevor sie eine neue Tafel anschneidet. Das ist Marge, die hereinkommt, ohne dass Sie einen Quadratmeter mehr verkaufen.',
    // Vírgula decimal como em português — em alemão é a mesma convenção.
    /* A terceira marca era "0 licença por posto". Saiu em 13/08 pelo mesmo
       motivo que as outras promessas sobre cobrança: a regra de usuários do
       sistema não está definida, e prometer o que a fatura não cumpre é a
       forma mais cara de perder a confiança que a página constrói. */
    marcas: [
      ['87,4%', 'Ausnutzung im Schnittplan'],
      ['3,42 m²', 'Glas, das nicht gekauft wurde'],
      ['0', 'Tabellen zu pflegen'],
    ],
  },

  // ── A demonstração do retalho (FL. 02/06) ─────────────────────────────
  demo: {
    rotulo: 'Demo · erst das Gestell, dann die Tafel',
    titulo: 'Bevor Sie neues Glas anschneiden: sehen Sie nach, was schon am Gestell steht.',
    texto:
      'Drei Klicks, ein echter Auftrag mit 20 Teilen. Sie klicken auf Optimieren, der Plan entsteht — und genau dann meldet das System, dass am Gestell Restglas liegt, das passt. Zweiter Klick, und Sie sehen die Rechnung. Das läuft alles hier im Browser, mit einem echten Optimierer.',
  },

  // ── O contraste em duas colunas (FL. 04/06) ───────────────────────────
  contraste: {
    rotulo: 'Was sich in der Halle ändert',
    titulo: 'Den Unterschied sehen Sie am Montag.',
    hoje: 'Heute, ohne Glassoftware',
    pares: [
      [
        'Gutes Restglas lehnt am Gestell und fällt aus dem Bestand',
        'Zurück in den Bestand — mit Maß, Farbe und Gestell',
      ],
      [
        '„Wo ist mein Auftrag?“ — jemand läuft in die Halle',
        'Phase, Uhrzeit und Verantwortlicher am Bildschirm',
      ],
      [
        'Der Preis hängt an der Erfahrung des Verkäufers',
        'Der Preis kommt aus der Preisliste, die Marge steht pro Auftrag',
      ],
      [
        'Das falsche Maß fällt auf, wenn das Glas schon ESG ist',
        'Das System meldet den fehlenden Winkel vor dem Schnitt',
      ],
      [
        'Der Plan wird im CAD neu gezeichnet, der Tisch steht still',
        'Ausgabe als DXF, G-Code, ASC oder CNI+FBT',
      ],
    ],
  },

  // ── A chamada final (FL. 06/06) ───────────────────────────────────────
  chamada: {
    rotulo: 'Vorführung vereinbaren',
    titulo: 'Bringen Sie einen eigenen Auftrag mit. Wir bauen ihn vor Ihren Augen.',
    texto:
      'Die Vorführung läuft am offenen System, nicht auf Folien. Wenn es am Ende nicht zu Ihrem Betrieb passt, haben Sie vierzig Minuten verloren und eine Analyse gewonnen.',
    passos: [
      'Sie zeigen uns einen echten Auftrag von sich',
      'Wir legen ihn live im System an',
      'Sie sehen am Ende den Schnittplan herauskommen',
    ],
  },
}
