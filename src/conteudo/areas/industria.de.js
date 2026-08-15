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
    verOtimizacao: 'Die Optimierung in Aktion sehen',
    etiqueta: 'Ein Blick ins System',
    titulo: {
      antes: 'Bevor eine neue Tafel gekauft wird, sucht NeoGlass',
      destaque: 'in den Reststücken.',
    },
    /* A segunda metade dizia a margem pela venda que não aconteceu ("ohne dass
       Sie einen Quadratmeter mehr verkaufen"). Entrou a inversão do pt (vender
       mais × desperdiçar menos), na forma de ditado que o alemão tem e o
       português não: "verdient nicht, wer…, sondern wer…". Sai mais curto e
       soa como frase de chão de fábrica, não de folheto.
       O limite aqui é o comprimento: este é o texto de maior corpo da página e
       acima de ~150 caracteres o hero vira cinco linhas no celular. Por isso a
       primeira frase perdeu peso ("sucht" no lugar de "schaut auf", plural
       "neue Tafeln" no lugar de "eine neue Tafel") — 149 no total. Quem mexer
       aqui, conte os caracteres antes de dar por pronto. */
    texto: 'Verschnittoptimierung, Restglas, Fertigung, Rückverfolgung und Versand am selben Auftrag.',
    // Vírgula decimal como em português — em alemão é a mesma convenção.
    /* A terceira marca era "0 licença por posto". Saiu em 13/08 pelo mesmo
       motivo que as outras promessas sobre cobrança: a regra de usuários do
       sistema não está definida, e prometer o que a fatura não cumpre é a
       forma mais cara de perder a confiança que a página constrói. */
    marcas: [
      ['87,4%', 'Ausnutzung im Schnittplan'],
      ['3,42 m²', 'Rohglas eingespart'],
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
      'Ein echter Auftrag mit 20 Teilen, gerechnet vom echten Optimierer, hier in Ihrem Browser. Drücken Sie auf Optimieren und sehen Sie, welches Rohglas Sie nicht kaufen.',
    nota: 'Die Zahlen in diesem Abschnitt kommen aus der Demo — sie sind kein Kundendurchschnitt.',
  },

  producao: {
    rotulo: 'Die Fertigung',
    titulo: 'Das Rohglas kommt einmal rein. Die Information begleitet die Scheibe ganz.',
    etapas: ['Auftrag', 'Optimierung', 'Zuschnitt', 'Veredelung', 'Fertigung', 'Versand'],
  },

  rastreio: {
    rotulo: 'Rückverfolgung',
    titulo: 'Wissen Sie, wo jede Scheibe ist, ohne drei Leute zu fragen.',
    campos: [
      ['Code', 'P-184'],
      ['Auftrag', '26-0431'],
      ['Phase', 'Vorspannen'],
      ['Verantwortlich', 'Werkbank 2'],
      ['Uhrzeit', '14:22'],
      ['Ziel', 'Ladung 118'],
    ],
  },

  financeiro: {
    rotulo: 'Der Auftrag in Zahlen',
    titulo: 'Sehen Sie nicht nur den Umsatz. Sehen Sie die Marge je Auftrag.',
    linhas: [
      ['Erlös', 'was dieser Auftrag gebracht hat'],
      ['Rohglas', 'das Glas, das reinkam'],
      ['Fertigung', 'Zuschnitt, Vorspannen, Veredelung'],
      ['Kosten', 'was außer dem Glas rausging'],
      ['Ergebnis', 'die Marge dieses Auftrags'],
    ],
  },

  faq: {
    rotulo: 'Häufige Fragen',
    titulo: 'Bevor Sie die Vorführung anfragen.',
    itens: [
      [
        'Läuft die Vorführung mit einem Auftrag von mir?',
        'Ja. Sie bringen einen echten Auftrag. Wir bauen ihn im System und Sie gehen mit seinem Schnittplan.',
      ],
      [
        'Kommen die Optimierungszahlen von Kunden?',
        'Nein. Ausnutzung und eingesparte Quadratmeter kommen aus der Demo im Browser. Das ist kein Werkdurchschnitt.',
      ],
      [
        'Muss ich den Schneidtisch tauschen?',
        'Nein. Der Plan kommt als DXF, CNI und FBT — oder direkt in Opty-Way und Perfect Cut.',
      ],
      [
        'Ersetzt das meine heutige Fertigungssteuerung?',
        'Der Auftrag trägt künftig Optimierung, Zuschnitt, Rückverfolgung und Versand. Sie hören auf, an drei Stellen zu fragen, wo die Scheibe ist.',
      ],
    ],
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
    rotulo: 'Vorführung anfragen',
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
