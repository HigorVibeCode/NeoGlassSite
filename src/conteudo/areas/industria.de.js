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
    /* O título dizia de novo o que o hero já diz duas telas acima ("erst am
       Gestell nachsehen"). Agora ele mostra o RESULTADO que o leitor vai ver
       acontecer, e o texto cabe em duas frases: o resto ele descobre
       apertando. "Vor Ihren Augen" é o "na sua frente" — em alemão o lugar
       natural dessa expressão é no fim. */
    titulo: 'Aus drei Tafeln werden zwei. Vor Ihren Augen.',
    texto:
      'Ein echter Auftrag mit 20 Teilen, gerechnet vom echten Optimierer, hier in Ihrem Browser. Drücken Sie auf Optimieren und sehen Sie, welches Glas Sie nicht kaufen.',
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
      /* Aqui estava "Das System meldet den fehlenden Winkel vor dem Schnitt":
         essa checagem de esquadro NÃO existe no produto e não pode voltar em
         nenhuma forma. No lugar dela entram os formatos, que existem. Nomes de
         programa (Opty-Way, Perfect Cut) não se traduzem. */
      [
        'Das falsche Maß fällt auf, wenn das Glas schon ESG ist',
        'Ausgabe als DXF, CNI und FBT — oder direkt an Opty-Way und Perfect Cut',
      ],
      // G-Code saiu junto com os outros formatos: não existe no sistema.
      [
        'Der Plan wird im CAD neu gezeichnet, der Tisch wartet',
        'Der Plan entsteht fertig und geht direkt an den Tisch',
      ],
    ],
  },

  // ── A chamada final (FL. 06/06) ───────────────────────────────────────
  chamada: {
    rotulo: 'Vorführung vereinbaren',
    /* A promessa forte não é montar rápido, é ele SAIR com o plano de corte do
       pedido dele. Em alemão a segunda frase fica melhor com o objeto na
       frente ("Den Schnittplan dazu…") do que com o sujeito. */
    titulo: 'Bringen Sie einen eigenen Auftrag mit. Den Schnittplan dazu nehmen Sie mit.',
    texto:
      'Die Vorführung läuft am offenen System, nicht auf Folien. Wenn es am Ende nicht zu Ihrem Betrieb passt, haben Sie vierzig Minuten verloren und eine Analyse gewonnen.',
    passos: [
      'Sie zeigen uns einen echten Auftrag von sich',
      'Wir legen ihn live im System an',
      'Sie sehen am Ende den Schnittplan herauskommen',
    ],
  },
}
