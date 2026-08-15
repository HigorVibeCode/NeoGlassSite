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
  /* A frase que o Higor elegeu. Ela saiu do título quando a abertura
     passou a carregar o posicionamento, e ganhou bloco próprio aqui —
     é o primeiro argumento da página, logo antes da demonstração. */
  memoria: {
    titulo: 'Jedes Angebot, das Sie verschickt haben, bleibt gespeichert.',
    texto: 'Sie öffnen es und sehen, was vereinbart wurde, wann und zu welchem Preis.',
  },

  hero: {
    rotulo: 'NeoGlass · für die Glaserei',
    verOrcamento: 'Das Angebot entstehen sehen',
    verSistema: 'Das System in Aktion sehen',
    etiqueta: 'Ein Blick in die App',
    // O gradiente cai na condição ('ohne dass es kompliziert wird'), que é o
    // que este leitor duvida — em alemão a promessa sozinha não convence.
    titulo: {
      antes: 'Sie messen.',
      destaque: 'NeoGlass macht den Rest.',
    },
    texto: 'Vom Aufmaß auf der Baustelle bis zum Angebot, vom Auftrag bis zur Lieferung — ohne dass unterwegs Informationen verloren gehen.',
    /* As três antigas mediam a INSTALAÇÃO ("1 Nachmittag", "0 Excel", "1
       App") — problema de quem já comprou. Estas medem o dia dele.
       Comprimento: a legenda tem ~28 caracteres antes de quebrar em três
       linhas no celular, e alemão estoura isso com facilidade. Por isso:
       · 'vom Maß bis zur Unterschrift' (28, no limite) em vez de 'vom Maß zum
         unterschriebenen PDF' (32) — o PDF já está na demo logo abaixo;
       · 'Abschluss, bevor Sie gehen' (26) em vez de 'der Auftrag ist
         unterschrieben, bevor Sie gehen'. "Abschluss" é a palavra de venda
         alemã para fechar o serviço, e cabe. */
    marcas: [
      ['4 Min.', 'vom Maß bis zur Unterschrift'],
      ['1×', 'tippen Sie das Maß ein'],
      ['vor Ort', 'Abschluss, bevor Sie gehen'],
    ],
    linhaPreco: (preco) => `${preco} pro Monat. Keine Einrichtungsgebühr, keine Laufzeit.`,
  },

  // ── A demonstração do orçamento ───────────────────────────────────────
  demo: {
    rotulo: 'Demo · von der Öffnung zum PDF, in 3 Schritten',
    /* O título carrega a seção sozinho — o parágrafo de apoio saiu. A promessa
       é o ANGEBOT EM PDF já pronto, ainda na obra: por isso a frase termina no
       documento, e não na assinatura. O tempo é medido pelo Bandmaß e não por
       um cronômetro inventado — o Glaser faz a conta sozinho. É a mesma imagem
       da linha das 08:40, de propósito.
       Comprimento: este h2 é grande e tem `max-w-[20ch]` — acima de ~70
       caracteres vira quatro linhas. Esta tem 68, e é por isso que o objeto do
       primeiro verbo ficou de fora: 'Messen Sie die Öffnung' levaria a frase a
       80, e 'von der Öffnung zum PDF' já está no rótulo logo acima. */
    titulo: 'Messen Sie. Das PDF-Angebot ist da, bevor Sie das Bandmaß einpacken.',
    texto:
      'Foto, Maße und Wandtyp. Das System macht aus dem Besuch ein Angebot, ohne dass Sie alles neu tippen.',
    micro: 'Weniger tippen. Weniger Fehler. Weniger Zeit zwischen Baustelle und Angebot.',
  },

  // ── Um dia do vidraceiro ──────────────────────────────────────────────
  dia: {
    rotulo: 'Ein Tag, von morgens bis abends',
    titulo: 'Nichts Neues in Ihrem Tag. Nur die Nacharbeit, die daraus verschwindet.',
    horas: [
      /* As quatro descrições listavam o que o SISTEMA faz. Agora dizem o que o
         Glaser deixa de fazer naquele horário — é o que ele reconhece do
         próprio dia. Comprimento: os cartões são estreitos e alemão estoura
         fácil; teto de ~110 caracteres por descrição, e nenhuma passa de 100.
         Por isso duas frases curtas em vez de uma longa com subordinada. */
      [
        '08:40',
        'Auf der Baustelle',
        'Sie messen, fotografieren, wählen aus. Der Kunde unterschreibt, bevor Sie das Bandmaß einpacken.',
      ],
      [
        '11:20',
        'In der Werkstatt',
        'Der Auftrag kam mit abgezogener Luft an. Niemand hat wegen der Dicke angerufen.',
      ],
      [
        '15:00',
        'An der Werkbank',
        'Jede Scheibe hat ihr Etikett. Das Restglas liegt im Lager und bewirbt sich um den nächsten Auftrag.',
      ],
      [
        'Freitag',
        'Zum Wochenschluss',
        'Sie wissen, welcher Auftrag Marge gebracht hat und welcher nur Arbeit. Ohne Tabelle zu öffnen.',
      ],
    ],
  },

  // ── O antes e o depois ────────────────────────────────────────────────
  contraste: {
    rotulo: 'Was sich in Ihrer Woche ändert',
    /* "ohne die Nacharbeit" só descrevia a falta de um problema. Esta diz o que
       a semana passa a ter, e "dieselbe Mannschaft" já mata a objeção de que
       profissionalizar exige contratar alguém. "mehr geht raus, weniger kommt
       zurück" listava dois efeitos e gastava o título nisso; a lista de pares
       logo abaixo já mostra os dois, um por linha. O título agora só nomeia o
       ganho e deixa a prova para a lista — e de quebra cai de 57 para 42
       caracteres, dentro do teto deste h2. */
    titulo: 'Was heute verstreut ist, wohnt künftig im selben Auftrag.',
    hoje: 'Heute, verstreut',
    pares: [
      ['Das Maß bleibt im Handy', 'Der Auftrag ist erfasst'],
      ['Das Angebot geht über WhatsApp', 'Das Angebot bleibt gespeichert'],
      ['Das PDF geht zwischen Chats verloren', 'Der Auftrag ist zentral'],
      ['Die Fertigung läuft über Nachrichten', 'Die Fertigung ist verbunden'],
      ['Das Restglas hat keine Kontrolle', 'Die Lieferung wird verfolgt'],
      ['Niemand sieht die Marge des Auftrags', 'Die Marge ist sichtbar'],
    ],
  },

  resultados: {
    rotulo: 'Was der Auftrag trägt',
    titulo: 'Jeder Schritt arbeitet mit dem, was schon vereinbart war.',
    itens: [
      ['Angebot', 'Sie erfassen Baustelle und Kunden, ohne bei null anzufangen.'],
      ['Entwurf', 'Machen Sie aus dem Maß ein schnelleres Angebot.'],
      ['Auftrag', 'Alles Vereinbarte bleibt an diesem Job hängen.'],
      ['Fertigung', 'Der Auftrag geht an die, die ihn produzieren müssen.'],
      ['Lieferung', 'Sehen Sie, was raus ist, was läuft und was fehlt.'],
      ['Marge', 'Sehen Sie, was jeder Auftrag wirklich gebracht hat.'],
    ],
  },

  // ── O preço ───────────────────────────────────────────────────────────
  preco: {
    rotulo: 'Glaserei-Paket · was es kostet und was nicht',
    /* Este h2 é grande: acima de ~42 caracteres ele vira quatro linhas. Daí a
       forma curta — 'Ein Auftrag im Monat deckt das ganze Jahr.' bate os 42 no
       fio, e sem 'ganze' a frase diz o mesmo em 36. */
    titulo: 'Ein Auftrag kann mehrere Monate System bezahlen.',
    /* `valor` chega e não é usado: ver o cabeçalho do arquivo. A versão antiga
       terminava em "Behalten Sie diesen Auftrag im Kopf" — tarefa para o
       leitor. Agora a própria frase fecha a conta, que era o ponto. */
    texto: () =>
      'Das Angebot, das sich oben von selbst gerechnet hat, war ein Wohnzimmerfenster: Glas, Beschlag und Montage — der Auftrag, der bei Ihnen an jedem Dienstag reinkommt. Einer davon im Monat, und das System ist bezahlt, mit Abstand.',
    /* O nome do pacote, dito por extenso, num selo de ~120 px em maiúscula:
       'NeoGlass für Glasereien' (23) não cabe. 'Glaserei-Paket' são 14
       caracteres, é composto alemão normal e diz o mesmo — o nome do produto
       já está três vezes na mesma tela. */
    cota: 'Glaserei-Paket',
    // A separação entre os dois produtos, ao lado do número: sem ela um dono
    // de fábrica lê o preço da vidraçaria e acha que é o do sistema inteiro.
    // 'Industrie' é o nome da aba em alemão (ver `paginas.industria.nome`).
    soParaVidracaria:
      'Das hier ist das Glaserei-Paket. Die Industrie ist ein anderes Produkt, dort wird der Preis im Einzelfall gemacht — siehe Reiter Industrie.',
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

  faq: {
    rotulo: 'Häufige Fragen',
    titulo: 'Was den Klick meistens aufhält.',
    itens: [
      [
        'Was passiert nach den 14 Tagen?',
        'Es wird nichts von allein abgebucht. Wenn Sie weitermachen wollen, buchen Sie. Wenn Sie nicht entscheiden, wird daraus keine Rechnung.',
      ],
      [
        'Muss ich etwas installieren?',
        'Nein. Das System läuft im Browser und auf dem Handy. Keine App zum Laden, kein Techniker im Laden.',
      ],
      [
        'Geht das auf dem Handy?',
        'Ja. Baustelle, Foto der Öffnung und Angebot sind für das Handy gebaut.',
      ],
      [
        'Kann ich so viele Angebote machen, wie ich will?',
        'Ja. Es gibt keine Gebühr pro Angebot. Der Monatspreis ändert sich nicht mit der Menge.',
      ],
      [
        'Gehören die Daten mir?',
        'Ja. Sie exportieren alles, wann Sie wollen, ohne nachzufragen.',
      ],
      [
        'Kann ich jederzeit kündigen?',
        'Ja. Keine Laufzeit, kein Anruf — die Kündigung läuft über die Maske.',
      ],
      [
        'Rechnet NeoGlass den Preis automatisch?',
        'Es baut das Angebot aus Ihrer Liste. Quadratmeterpreis und Beschlag bleiben Ihre.',
      ],
      [
        'Ersetzt NeoGlass meine heutige Auftragssteuerung?',
        'Es bündelt Angebot, Auftrag, Fertigung und Lieferung in einem Fluss. Sie hören auf, dieselbe Information in Werkzeugen zu verstreuen, die nicht miteinander sprechen.',
      ],
    ],
  },

  // ── A chamada de quem já tem preço na tela ────────────────────────────
  chamada: {
    rotulo: 'Loslegen',
    /* "Fangen Sie mit dem nächsten Angebot an" já propunha um passo pequeno,
       mas não respondia o motivo real de ninguém testar: o Glasermeister
       presume que trocar de sistema significa passar cliente, tabela e
       histórico a limpo ANTES de ver a primeira tela. A primeira frase agora
       tira esse peso, e só depois vem o convite. */
    titulo: 'Migrieren Sie nichts. Rechnen Sie nur das nächste Angebot hier.',
    // A frase do meio muda com `diasTeste` da config, e a emenda com o resto do
    // parágrafo é diferente em cada idioma — por isso o `if` mora aqui dentro.
    texto: (dias) =>
      `Keine Kunden anzulegen, keine Historie zu importieren: Sie hinterlegen Ihren Preis pro m², und das nächste Angebot, das reinkommt, entsteht schon hier. ${
        dias > 0
          ? `${dias} Tage lang ohne Karte und ohne Verpflichtung.`
          : 'Keine Laufzeit: Wenn es nicht passt, gehen Sie.'
      } Wenn wir es zusammen aufsetzen sollen, schreiben Sie uns per WhatsApp.`,
    /* Os três passos agora carregam o QUANDO. Eles moram em cartões estreitos:
       cada linha fica em ~60 caracteres, senão quebra feio em alemão — daí
       'Heute:' e 'Beim nächsten Auftrag:' curtos, no infinitivo. */
    passos: [
      'Heute: Konto anlegen und Preis pro m² eintragen',
      'Beim nächsten Auftrag: am Handy messen und rechnen',
      'Der Kunde unterschreibt — Sie vergleichen mit Ihrem Alltag',
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
