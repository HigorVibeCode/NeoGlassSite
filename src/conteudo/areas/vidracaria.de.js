/**
 * A aba da vidraçaria em alemão — para DACH (Alemanha, Áustria, Suíça). As
 * chaves acompanham `vidracaria.pt.js` uma a uma, na mesma ordem.
 *
 * Não é tradução: é recriação. O leitor é um Glasermeister cético, e o
 * vocabulário é o dele — Öffnung, Tafel, Restglas, Schnittplan, ESG, Luft,
 * Verschnittoptimierung, Gestell. Trata-se por "Sie", como no resto do site.
 *
 * Comprimento: palavra alemã é longa e os rótulos curtos moram em espaço
 * apertado. `porMes` ('/Monat') e os títulos de `naoCobramos` e `extras` foram
 * escolhidos pelo tamanho — daí 'Laufzeit' em vez de 'Vertragsbindung'.
 *
 * DUAS DIFERENÇAS DE CONTEÚDO, de propósito:
 *   · `preco.texto` e `preco.caixaTitulo` recebem os mesmos argumentos do
 *     português e NÃO os usam. O total da demonstração (R$ 1.169) é um número
 *     em real, tirado de preço de m² e ferragem do Brasil. Convertido não é
 *     verdade, e a conta de "quantos meses" fica errada em euro. Aqui a caixa
 *     manda comparar com o retrabalho do próprio leitor;
 *   · nada sobre cobrança por usuário — a regra não está definida.
 *
 * Nenhum texto visível deste arquivo escreve o símbolo do euro (só este
 * comentário escreve, para explicar). O preço chega pronto de
 * `precoVidracaria('de')`, que devolve '79 €' com o símbolo DEPOIS do número,
 * como se escreve em alemão — `linhaPreco` só encaixa o que recebe.
 */
export default {
  // ── A abertura ────────────────────────────────────────────────────────
  hero: {
    rotulo: 'NeoGlass · für die Glaserei',
    etiqueta: 'Ein Blick in die App, live',
    // O gradiente cai na condição ('ohne dass es kompliziert wird'), que é o
    // que este leitor duvida — em alemão a promessa sozinha não convence.
    titulo: {
      antes: 'Professioneller arbeiten —',
      destaque: 'ohne dass es kompliziert wird.',
    },
    texto:
      'Sie messen auf der Baustelle, der Kunde sieht den Preis sofort und unterschreibt auf dem Display. Ohne Excel, ohne Kladde, ohne Schulung.',
    marcas: [
      ['1 Nachmittag', 'und Sie arbeiten wirklich damit'],
      ['0', 'Excel-Tabellen zu pflegen'],
      ['1', 'App — Baustelle, Werkbank, Büro'],
    ],
    linhaPreco: (preco) => `${preco} pro Monat. Keine Einrichtungsgebühr, keine Laufzeit.`,
  },

  // ── A demonstração do orçamento ───────────────────────────────────────
  demo: {
    rotulo: 'Demo · von der Öffnung zum PDF, in 3 Schritten',
    titulo: 'Öffnung messen. Das Angebot steht, bevor Sie zurück im Betrieb sind.',
    texto:
      'Eine Fensteröffnung ist bereits aufgemessen und wartet auf Sie. Auf den Knopf drücken und zusehen: Das Fenster baut sich über dem Maß auf, das Angebot füllt sich von selbst und das PDF kommt mit Ihrem Logo heraus. Am Ende sagt Ihnen die Seite, wie viele Sekunden das gedauert hat.',
  },

  // ── Um dia do vidraceiro ──────────────────────────────────────────────
  dia: {
    rotulo: 'Ein Tag, von morgens bis abends',
    titulo: 'Nichts Neues in Ihrem Tag. Nur die Nacharbeit, die daraus verschwindet.',
    horas: [
      [
        '08:40',
        'Auf der Baustelle',
        'Sie messen die Öffnung am Handy, machen das Foto, wählen Dicke und Farbe. Der Preis rechnet sich mit Ihrer eigenen Preisliste, und der Kunde unterschreibt direkt auf dem Display.',
      ],
      [
        '11:20',
        'In der Werkstatt',
        'Der Auftrag kommt mit Schnittmaßen an, bei denen die Luft schon abgezogen ist. Niemand tippt etwas ab, niemand ruft wegen der Dicke an.',
      ],
      [
        '15:00',
        'An der Werkbank',
        'Jede Scheibe geht etikettiert raus. Was von der Tafel übrig bleibt, kommt mit Maß als Restglas zurück ins Lager — und bewirbt sich um den nächsten Auftrag, statt an der Wand zu lehnen.',
      ],
      [
        'Freitag',
        'Zum Wochenschluss',
        'Sie sehen, welche Aufträge Marge gebracht haben und welche nur Arbeit. Eine Zahl, keine Tabelle.',
      ],
    ],
  },

  // ── O antes e o depois ────────────────────────────────────────────────
  contraste: {
    rotulo: 'Was sich in Ihrer Woche ändert',
    titulo: 'Dieselbe Mannschaft, ohne die Nacharbeit.',
    hoje: 'Heute, in Kladde und WhatsApp',
    pares: [
      [
        'Das Angebot landet in der Kladde und ist bis Montag verschwunden',
        'Es geht vom Handy raus, mit Foto der Öffnung und Unterschrift',
      ],
      [
        'Der Kunde ruft dreimal an und fragt, ob es fertig ist',
        'Er verfolgt den Auftrag über einen Link, ohne anzurufen',
      ],
      [
        'Das Reststück landet hinter der Werkbank und wird zu Bruch',
        'Es kommt mit Maß zurück ins Lager — und in den nächsten Schnittplan',
      ],
      [
        'Das falsche Maß fällt erst bei der Montage auf',
        'Das System meldet den fehlenden Winkel, bevor geschnitten wird',
      ],
      [
        'Am Monatsende weiß niemand, welcher Auftrag Geld gebracht hat',
        'Die Marge jedes Auftrags steht auf dem Bildschirm',
      ],
    ],
  },

  // ── O preço ───────────────────────────────────────────────────────────
  preco: {
    rotulo: 'Preis · ohne Kleingedrucktes',
    titulo: 'Eine Zahl — und sie bleibt diese Zahl.',
    // `valor` chega e não é usado: ver o cabeçalho do arquivo.
    texto: () =>
      'Das Angebot, das sich oben von selbst gerechnet hat, war ein Wohnzimmerfenster: Glas, Beschlag und Montage — der Auftrag, der an jedem Dienstag reinkommt. Behalten Sie diesen Auftrag im Kopf, während Sie die Zahl darunter lesen.',
    cota: 'NeoGlass für Glasereien',
    porMes: '/Monat',
    fixo: 'Fester Preis — heute und in einem Jahr.',
    semTaxa:
      'Keine Einrichtungsgebühr und keine Abrechnung pro Angebot — Sie wissen heute, was Sie im zwölften Monat zahlen.',
    naoCobramos: [
      ['Einrichtung', 'nichts, um loszulegen'],
      ['Pro Angebot', 'so viele, wie Sie wollen'],
      ['Laufzeit', 'jederzeit kündbar'],
    ],
    semCartao: (dias) =>
      `Ohne Karte. Nach ${dias} Tagen entscheiden Sie — und wenn Sie nichts entscheiden, wird nichts abgebucht.`,
    tudoIncluido: 'Alles inbegriffen',
    incluso: [
      'Angebot auf der Baustelle am Handy, mit Foto und Unterschrift',
      'Schnittliste mit bereits abgezogener Luft, direkt in die Fertigung',
      'Restglaslager mit Maß, Farbe und Gestellplatz',
      'Auftragsverfolgung, vom Schnitt bis zum Versand',
      'PDF mit Ihrem Logo, Ihrer Lieferzeit und Ihrer Bindefrist',
      'Die Marge jedes Auftrags am Monatsende',
      'WhatsApp-Support von Leuten, die Glas kennen',
    ],
    // Em euro a comparação com o total da demonstração não existe: a caixa
    // manda comparar com o que o leitor teve de cortar duas vezes no mês
    // passado — número que ele tem e que ninguém precisa converter.
    caixaTitulo: () =>
      'Rechnen Sie zusammen, was Sie letzten Monat zweimal schneiden mussten. Das ist die Zahl, gegen die Sie das hier halten.',
    caixaTexto:
      'Und die Verschnittoptimierung ist dabei. Separat gekauft, ist sie eine zweite Monatsrechnung — fast immer mit Aufnahmegebühr, bevor Sie die erste Scheibe schneiden.',
    extras: [
      ['Ihre Daten', 'jederzeit exportieren, ohne zu fragen'],
      ['Jederzeit kündbar', 'Kündigung im System, ohne Anruf'],
    ],
  },

  // ── A chamada de quem já tem preço na tela ────────────────────────────
  chamada: {
    rotulo: 'Loslegen',
    titulo: 'Fangen Sie mit dem nächsten Angebot an, das reinkommt.',
    texto: (dias) =>
      `Sie legen das Konto an, hinterlegen Ihre Preisliste und rechnen das erste Angebot noch heute. ${
        dias > 0
          ? `${dias} Tage lang ohne Karte und ohne Verpflichtung.`
          : 'Keine Laufzeit: Wenn es nicht passt, gehen Sie.'
      } Wenn wir es zusammen aufsetzen sollen, schreiben Sie uns per WhatsApp.`,
    passos: [
      'Konto anlegen und Ihren Preis pro m² eintragen',
      'Das nächste Angebot in der App rechnen, auf der Baustelle',
      'Der Kunde unterschreibt, der Auftrag entsteht fehlerfrei',
    ],
  },

  // ── A chamada de enquanto não há preço publicado ──────────────────────
  chamadaDemo: {
    rotulo: 'Vorführung vereinbaren',
    titulo: 'Bringen Sie ein eigenes Angebot mit. Wir rechnen es gemeinsam.',
    texto:
      'Vierzig Minuten mit offenem System. Sie messen einen echten Auftrag, wir rechnen ihn vor Ihren Augen, und Sie entscheiden, ob das in Ihren Tag passt.',
    passos: [
      'Sie bringen einen laufenden Auftrag mit',
      'Wir rechnen das Angebot live in der App',
      'Sie sehen, wie der Auftrag fertig in der Fertigung ankommt',
    ],
  },
}
