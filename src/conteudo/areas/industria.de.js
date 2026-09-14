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
  projeto: {
    rotulo: 'Technologie in Aktion',
    titulo: 'Vom Satz zum Projekt. Sehen Sie selbst.',
    texto: 'Diese Vorführung zeigt die Planung einer Öffnung. Die KI bereitet einen Entwurf vor; ein Mensch wählt, prüft und bestätigt das Projekt.',
  },
  diferenciais: {
    rotulo: 'Technologie für Glas',
    titulo: 'Mehr als Fabrikverwaltung. Ein neuer Anfang für jeden Auftrag.',
    itens: [
      { nome: 'Sprache oder Text wird zum Entwurf', texto: 'Beschreiben Sie ein Glasteil oder eine Öffnung wie gegenüber Ihrem Team. NeoGlass ordnet Maße und Angaben zur Prüfung. Die KI ersetzt keine Kontrolle.' },
      { nome: 'Ein Projekt, das man sehen kann', texto: '2D-Zeichnung, 3D-Ansicht und Schnittgeometrie zeigen den Auftrag vor dem Zuschnitt. Änderungen beginnen am Projekt statt in einer separaten Tabelle.' },
      { nome: 'Dateien für die Maschine', texto: 'Pläne und Konturen lassen sich in Produktionsformaten ausgeben. Die .g- und .cni-Motoren wurden an echten Tischen geprüft; Ihr Team gibt die Fertigung frei.' },
    ],
  },

  laco: {
    modulo: 'NeoGlass Optimierung',
    rotulo: 'Der Rest wird zum Bestand',
    etiqueta: 'Reststück',
    codigo: 'Code',
    medida: 'Mass',
    prateleira: 'Regal',
    feito: 'Erfasst',
  },

  reconhecimento: {
    titulo: 'Das gute Reststück ist Ihr leisester Verlust.',
    texto: 'Jeder Auftrag lässt ein Stück Glas übrig, das noch taugt. Es lehnt am Gestell, niemand erfasst es, und in der nächsten Woche kaufen Sie eine neue Tafel für einen Zuschnitt, der schon da war.',
    destaque: 'Glas, das übrig bleibt und aus der Kontrolle rutscht, ist eine zweimal bezahlte Tafel.',
  },

  resultado: {
    titulo: 'Weniger Tafel. Weniger Bruch. Weniger Tabelle.',
    itens: [
      { nome: 'Weniger Tafel gekauft', texto: 'Bevor eine neue Tafel geöffnet wird, sucht das System im Rest. Jedes genutzte Reststück ist eine Tafel, die nicht auf die Rechnung kam.' },
      { nome: 'Nichts wird vergessener Bruch', texto: 'Das Reststück verlässt den Zuschnitt schon mit Code, Mass und Regaladresse. Es ist im Bestand, ohne dass jemand es erfasst.' },
      { nome: 'Ein einziges System', texto: 'Der Optimierer, der Bestand und das Etikett sind dasselbe. Nichts wird exportiert, nichts neu getippt — deshalb geht das Reststück nicht verloren.' },
    ],
  },
  percurso: {
    titulo: 'Derselbe Auftrag läuft bis zur Lieferung weiter.',
    texto: 'Die Einsparung beim Zuschnitt ist nur ein Teil. Auftrag, Produktion und Versand arbeiten mit denselben Informationen.',
    etapas: [
      { nome: 'Auftrag', texto: 'Masse, Preis und Termin bleiben von Anfang an zusammen.' },
      { nome: 'Zuschnitt', texto: 'Der Plan berücksichtigt vorhandene Tafeln und Reststücke.' },
      { nome: 'Produktion', texto: 'Das Team verfolgt den Status jeder Scheibe.' },
      { nome: 'Versand', texto: 'Kontrolle und Lieferung bleiben mit dem Auftrag verknüpft.' },
    ],
    nota: 'Illustrative Vorschau der NeoGlass-Bereiche. Wählen Sie eine Ansicht aus.',
  },
  // ── A abertura (FL. 01/06) ────────────────────────────────────────────
  hero: {
    rotulo: 'NeoGlass · Plattform für die Glasindustrie',
    verProjeto: 'Technologie in Aktion sehen',
    etiqueta: 'Technologie für Glas',
    titulo: {
      antes: 'Technologie der neuesten Generation für',
      destaque: 'die Glasindustrie.',
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
    texto: 'KI, parametrische Planung, Optimierung und Produktion verbunden in einer Plattform für den Alltag Ihrer Fabrik.',
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
    rotulo: 'Der Nutzen zeigt sich auch beim Zuschnitt',
    acao: 'Vorführung starten',
    /* O título dizia de novo o que o hero já diz duas telas acima ("erst am
       Gestell nachsehen"). Agora ele mostra o RESULTADO que o leitor vai ver
       acontecer, e o texto cabe em duas frases: o resto ele descobre
       apertando. "Vor Ihren Augen" é o "na sua frente" — em alemão o lugar
       natural dessa expressão é no fim. */
    titulo: 'Bevor Sie eine neue Tafel öffnen: Was ist schon vorhanden?',
    texto:
      'Ein echter Auftrag mit 20 Teilen, gerechnet vom echten Optimierer, hier in Ihrem Browser. Drücken Sie auf Optimieren und sehen Sie, welches Rohglas Sie nicht kaufen.',
  },

  // ── O contraste em duas colunas (FL. 04/06) ───────────────────────────
  contraste: {
    rotulo: 'Was sich in der Halle ändert',
    titulo: 'Den Unterschied sehen Sie am Montag.',
    hoje: 'Heute, ohne Glassoftware',
    pares: [
      [
        'Gutes Restglas lehnt am Gestell und fällt aus dem Bestand',
        'Zurück in den Bestand — mit Mass, Farbe und Gestell',
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
        'Das falsche Mass fällt auf, wenn das Glas schon ESG ist',
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
    titulo: 'Bringen Sie einen echten Auftrag mit. Sehen Sie NeoGlass daran arbeiten.',
    texto:
      'Die Vorführung läuft am offenen System, nicht auf Folien. Wenn es am Ende nicht zu Ihrem Betrieb passt, haben Sie zwanzig Minuten verloren und eine Analyse gewonnen.',
    passos: [
      'Sie zeigen uns einen echten Auftrag von sich',
      'Wir legen ihn live im System an',
      'Sie sehen Projekt und Schnittplan auf dem Bildschirm',
    ],
  },
}
