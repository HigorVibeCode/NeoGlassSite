/**
 * Os textos das duas demonstrações e do cartão da abertura em alemão. As
 * chaves são as mesmas de `demos.pt.js`, na mesma ordem — o pt continua sendo
 * a fonte.
 *
 * Vocabulário de oficina: Tafel, Restglas/Reststück, Gestell, Schnittplan,
 * Verschnittoptimierung, ESG, Winkel, Luft. O leitor é Glasermeister e
 * desconfia de frase publicitária — verbo concreto, número na frente,
 * nenhuma promessa que o sistema não cumpra.
 *
 * ATENÇÃO ao comprimento dos rótulos de `botoes`: a barra de ação encosta no
 * rodapé do cartão e no celular ela é estreita. O teto é 22 caracteres e o
 * mais longo daqui tem 20 ('An den Kunden senden', 'Angebot per WhatsApp').
 * Onde o português cabe em 12 ('Otimizando…', 'Realocando…', 'Montando…'),
 * o alemão também cabe: 'Optimiert…', 'Ordnet um…', 'Montiert…'.
 */
export default {
  // ── A demonstração da indústria: chapa, cavalete e a chapa não aberta ──
  retalho: {
    barra: {
      titulo: 'Verschnittoptimierung',
      pedido: 'Auftrag 26-0431 · 8 mm klar',
      passo: (n, total) => `Schritt ${n} von ${total}`,
    },

    // O desenho: o rótulo de cada chapa e o que o leitor de tela ouve.
    desenho: {
      chapa: 'Tafel',
      retalho: 'Reststück',
      aria: (tipo, id, pecas) => `${tipo} ${id} mit ${pecas} Teilen`,
      chapaNova: 'Neue Tafel · die, die Sie kaufen',
      cavalete: 'Am Gestell · Reste aus anderen Aufträgen',
      plano: (chapas) => `Der Plan · ${chapas} neue Tafeln`,
      chapaN: (n) => `Tafel ${n}`,
      retalhoN: (n) => `Reststück ${n}`,
      cavaletePrimeiro: (pecas) => `Zuerst das Gestell · ${pecas} Teile`,
      entaoChapaNova: (novas, antes) => `Erst dann neue Tafel · ${novas} statt ${antes}`,
      naoAberta: (n) => `Tafel ${n} · nicht angebrochen`,
    },

    // Os cinco formatos do pedido de exemplo.
    pecas: {
      portaBox: 'Duschtür',
      fixoLateral: 'Seitenteil fest',
      prateleira: 'Glasboden',
      espelho: 'Badspiegel',
      tampo: 'Tischplatte',
    },

    pronto: {
      selo: 'Der Auftrag, der reinkam',
      titulo: (pecas, formatos) => `${pecas} Teile, ${formatos} Formate`,
      texto:
        'Ein ganz normaler Dienstagsauftrag. Sie müssen nichts eintragen — Knopf drücken und zusehen, was das System von allein macht.',
    },

    otimizando: {
      selo: 'Optimierung läuft',
      titulo: 'Der Schnittplan entsteht…',
      linhas: {
        lendo: (pecas) => `Liest ${pecas} Teile aus dem Auftrag`,
        respeitando: 'Achtet auf Dicke, Farbe und Struktur',
        testando: 'Probiert Verschachtelung und Drehung',
        ordenando: 'Sortiert nach Reihenfolge am Schneidtisch',
      },
    },

    plano: {
      selo: 'Plan steht',
      titulo: (chapas, aproveitamento) => `${chapas} Tafeln · ${aproveitamento} Ausnutzung`,
      texto: 'Das ist schon ein guter Plan. Jeder Optimierer am Markt hört hier auf.',
      achou: 'Das System hat am Gestell etwas gefunden',
      servem: (retalhos) => `${retalhos} Reststücke passen zu diesem Auftrag.`,
      medida: (medida) => `${medida} mm · Glas, das Sie längst bezahlt haben`,
      parados:
        'Sie lehnen seit einem anderen Auftrag an der Wand. Solange sie niemand nutzt, ist das totes Kapital.',
    },

    realocando: {
      selo: 'Wird umverteilt',
      titulo: 'Erst das Gestell, dann die Tafel…',
      linhas: {
        medindo: (retalhos) => `Misst die ${retalhos} Reststücke am Gestell`,
        movendo: (pecas) => `Legt ${pecas} Teile hinein`,
        refazendo: 'Baut den Plan der neuen Tafeln neu',
        baixa: 'Bucht die genutzten Reste aus',
      },
    },

    economia: {
      selo: 'Was Sie nicht ausgeben',
      titulo: '1 ganze Tafel',
      subtitulo: 'die nicht angebrochen wird',
      placar: {
        m2: (m2) => `${m2} m²`,
        m2Texto: 'bezahltes Glas, das wieder zählt',
        pecas: (noCavalete, total) => `${noCavalete} von ${total}`,
        pecasTexto: 'Teile kamen vom Gestell',
        aproveitamento: (antes, depois) => `${antes} → ${depois}`,
        aproveitamentoTexto: 'Ausnutzung auf der angebrochenen Tafel',
        retalhos: (retalhos) => `${retalhos} Reststücke`,
        retalhosTexto: 'sind von der Wand weg',
      },
      // O destaque é uma palavra só, em gradiente, no meio da frase — por isso
      // ela vem partida em três e não como uma frase inteira.
      pergunta: {
        antes: 'Das war',
        destaque: 'ein',
        depois: 'Auftrag. Wie viele macht Ihr Betrieb pro Woche?',
      },
      sozinho:
        'Im System gibt es diesen zweiten Knopf gar nicht: es schaut vor jedem Plan von allein aufs Gestell. Niemand muss daran denken, und niemand muss Lust dazu haben.',
    },

    // Um rótulo por fase da máquina de estados. Máximo 22 caracteres.
    botoes: {
      otimizar: 'Schnitt optimieren',
      otimizando: 'Optimiert…',
      realocando: 'Ordnet um…',
      usarRetalhos: (retalhos) => `${retalhos} Reststücke nutzen`,
      agendar: 'Mit meinem Auftrag',
      denovo: 'Neu starten',
    },

    nota: {
      padrao: 'Simulation mit einem echten Auftrag. Es wird nichts verschickt.',
      economia: 'Gerechnet von einem echten Optimierer, hier in Ihrem Browser.',
    },
  },

  // ── A demonstração da vidraçaria: do vão medido ao PDF na mão ──────────
  orcamento: {
    barra: {
      titulo: 'NeoGlass am Handy · auf der Baustelle',
      cliente: (nome) => `Kunde ${nome}`,
      passo: (n, total) => `Schritt ${n} von ${total}`,
    },

    obra: {
      vao: 'Wohnzimmerfenster',
      parede: 'Mauerwerk',
    },

    desenho: {
      aria: 'Die auf der Baustelle gemessene Öffnung',
      janela: '2 Schiebeflügel · 6 mm',
      medindo: 'Diagonalen notieren…',
      vaoMedido: 'Öffnung auf der Baustelle gemessen',
      montando: 'Fenster wird in die Öffnung gesetzt',
      janelaDoVao: 'Das Fenster für diese Öffnung',
      pdfGerado: 'PDF erstellt',
      prontoCliente: 'Fertig für den Kunden',
      oOrcamento: 'Das Angebot, das Sie gerade gebaut haben',
    },

    // As quatro linhas do orçamento. O valor de cada uma chega formatado.
    itens: {
      vidro: {
        nome: 'ESG 6 mm klar',
        detalhe: (medida, m2) => `2 Flügel · ${medida} mm · ${m2} m²`,
      },
      kit: {
        nome: 'Schiebebeschlag',
        detalhe: 'Laufschiene oben und unten, Rollen, Verschluss',
      },
      perfil: {
        nome: 'Profil, Dichtung und Abschluss',
        detalhe: 'Abdichtung und Anschluss der Öffnung',
      },
      instalacao: {
        nome: 'Montage und Abdichtung',
        detalhe: 'Arbeitszeit, 1 Tag · Anfahrt',
      },
    },

    documento: {
      empresa: 'Ihre Glaserei',
      marca: 'Ihr Logo, Ihre Telefonnummer',
      orcamento: 'Angebot',
      cliente: 'Kunde',
      servico: 'Leistung',
      servicoValor: (vao, medida) => `${vao} · ${medida}`,
      total: 'Gesamt',
      validade: 'Gültig 10 Tage · Lieferzeit 7 Werktage nach Freigabe',
      assinatura: 'Unterschrift des Kunden',
    },

    vao: {
      selo: 'Was Sie auf der Baustelle gemacht haben',
      titulo: (vao, medida) => `${vao} · ${medida}`,
      texto:
        'Ein Foto der Öffnung, zwei Maße, die Art der Wand. Dreißig Sekunden mit dem Handy in der Hand — mehr verlangt das System nicht von Ihnen.',
      ficha: {
        vao: 'Öffnung',
        parede: 'Wand',
        esquadro: 'Diagonalen',
        esquadroValor: '1.947 und 1.951 mm',
        foto: 'Foto',
        fotoValor: '2 Bilder angehängt',
      },
      chamada: 'Jetzt den Knopf drücken. Sie tippen nichts mehr.',
    },

    montando: {
      selo: 'Wird gebaut',
      titulo: 'Das Fenster passt sich Ihrem Maß an…',
      linhas: {
        folhas: 'Wählt 2 Schiebeflügel für diese Öffnung',
        folga: (folga, sobreposicao) =>
          `Zieht ${folga} mm Luft und ${sobreposicao} mm Überlappung ab`,
        somando: 'Rechnet Schiene, Rollen, Verschluss und Dichtung dazu',
        precos: 'Holt die Preise aus Ihrer Liste',
      },
    },

    lista: {
      selo: (numero) => `Angebot ${numero}`,
      titulo: 'Fertig, ohne dass Sie etwas getippt haben.',
      total: 'Gesamt für den Kunden',
      rodape: (m2, itens) =>
        `${m2} m² Glas, ${itens} Positionen, keine Rechnung im Kopf. Die Preise kommen aus Ihrer Liste — diese hier sind nur ein Beispiel.`,
    },

    pdf: {
      selo: 'Dokument fertig',
      titulo: 'Mit Ihrem Logo, nicht mit unserem.',
      texto:
        'Logo, Telefonnummer, Gültigkeit, Lieferzeit und die Zeile für die Unterschrift. Dieses Blatt lässt den Kunden einen Betrieb sehen und keine Handschlag-Lösung — und es kam von allein.',
      linhas: {
        logo: 'Ihr Logo und Ihre Daten im Briefkopf',
        prazo: 'Gültigkeit und Lieferzeit schriftlich',
        assinatura: 'Unterschrift am Bildschirm oder auf Papier',
        via: 'Eine Kopie bleibt für immer am Auftrag',
      },
    },

    enviar: {
      selo: 'So einfach',
      toques: '3 Klicks',
      // O cronômetro só entra quando o visitante levou menos de 90 segundos.
      segundos: (segundos) => ` und ${segundos} Sekunden`,
      semTempo: ', null Tipparbeit',
      textoTempo:
        'So lange haben Sie gerade gebraucht, von der Öffnung bis zum fertigen Angebot. Auf der Baustelle ist es derselbe Weg — mit dem Kunden daneben.',
      textoSemTempo:
        'Von der Öffnung bis zum fertigen Angebot haben Sie kein einziges Maß getippt. Auf der Baustelle ist es derselbe Weg — mit dem Kunden daneben.',
      escolha: 'Wählen Sie den Weg',
      canais: {
        whatsapp: 'WhatsApp',
        email: 'E-Mail',
        pdf: 'PDF laden',
      },
      aprovar: 'Und sobald er zusagt, geht der Auftrag mit den Schnittmaßen in die Produktion.',
      ninguem:
        'Niemand tippt es neu, niemand ruft wegen der Dicke an, und das Restglas aus dieser Tafel geht mit Maß zurück in Ihr Lager.',
    },

    preco: {
      selo: 'Was es kostet',
      porMes: '/Monat',
      /* Aqui dizia que o preço era por vidraçaria e não por pessoa, e logo
         abaixo "sem custo por usuário". O dono do projeto avisou em 13/08 que
         a regra de cobrança por usuário NÃO está definida, então as duas eram
         promessa que a fatura não cumpre. No lugar entrou o que é verdade e
         vende igual: o preço não muda com o tempo. Volta a falar de usuário no
         dia em que a regra existir. */
      porVidracaria: 'Fester Preis, heute wie in einem Jahr.',
      // O valor chega pronto de `config.js` — a moeda muda com o idioma.
      conta: (valor) => `Das Angebot, das Sie gerade gebaut haben, lag bei ${valor}.`,
      contaEnfase: 'Das war ein Fenster.',
      pagaMeses: (meses) => `Dieser eine Auftrag zahlt ${meses} Monate System.`,
      naoCobramos: {
        implantacao: 'Keine Einrichtung',
        orcamento: 'Keine Gebühr pro Angebot',
        fidelidade: 'Keine Laufzeit',
      },
      teste: (dias) =>
        `${dias} Tage gratis, ohne Karte. Sie bauen die Angebote der Woche und entscheiden danach — entscheiden Sie nichts, wird nichts berechnet.`,
      semTeste: 'Keine Laufzeit: Passt es nicht in Ihren Tag, kündigen Sie direkt am Bildschirm.',
    },

    whatsapp: {
      titulo: (numero, vao, medida) => `Angebot ${numero} — ${vao} ${medida}`,
      item: (nome, valor) => `• ${nome}: ${valor}`,
      total: (valor) => `Gesamt: ${valor}`,
      rodape: 'Gebaut in der Demo auf der NeoGlass-Website.',
    },

    // Um rótulo por fase, na ordem em que o visitante os aperta.
    botoes: {
      usarVao: 'Öffnung übernehmen',
      montando: 'Montiert…',
      gerando: 'PDF wird erstellt…',
      gerarPdf: 'PDF für den Kunden',
      enviar: 'An den Kunden senden',
      naObra: 'Das will ich auch',
      incluido: 'Was alles drin ist',
      denovo: 'nochmal starten',
      zap: 'Angebot per WhatsApp',
    },

    nota: {
      padrao: 'Beispielwerte. Im System kommen sie aus Ihrer eigenen Preisliste.',
      preco:
        'Das ist der Preis, keine Spanne. Beispiel sind die Werte im Angebot darüber.',
    },
  },

  // ── O cartão que troca de face na abertura ─────────────────────────────
  cartao: {
    ia: 'KI',
    otimizacao: {
      selo: 'Verschnittoptimierung',
      plano: 'Plan 26-0431 · 8 mm klar',
      resumo: '7 Teile · 1 Reststück',
    },
    expedicao: {
      selo: 'Versand · Ladung 118',
      peca: 'Scheibe P5 beim Ausgang gescannt',
      medida: '600 × 1150 · 10 mm · ESG',
      conferidas: '5 von 7 geprüft',
    },
    fechamento: {
      selo: 'Auftrag abgeschlossen',
      // O valor em reais é escrito no componente: aqui só entra a palavra.
      receita: (valor) => `26-0431 · Umsatz ${valor}`,
      materia: 'Material',
      producao: 'Produktion und Kosten',
      margem: 'Marge dieses Auftrags',
    },
  },
}
