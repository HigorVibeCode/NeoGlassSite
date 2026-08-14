/**
 * O filme de rolagem, em alemão. Mesmas chaves e mesma ordem de `filme.pt.js`.
 *
 * Aqui o comprimento é o problema central. Tudo que está em `telas` é `<text>`
 * dentro de SVG, e `<text>` não quebra linha: o rótulo que não couber sai por
 * cima do desenho. Onde a palavra alemã certa não coube na largura do
 * português, entrou a palavra curta — e cada uma dessas trocas está comentada
 * na linha, com a medida que a obrigou.
 *
 * Vocabulário: Tafel, Restglas, Gestell, Glaserei, Öffnung, Winkel, ESG,
 * Schnittplan, Verschnittoptimierung, Beschlag, Versand.
 *
 * Números, medidas, códigos, datas e nomes próprios ficam como no português.
 */
export default {
  // ── O cabeçalho da seção, em volta do palco ───────────────────────────
  secao: {
    aria: 'Ein Auftrag auf dem Weg durch das System',
    rotulo: 'Ein Auftrag, sechs Stationen · läuft von allein',
    // BL. de Blatt, a numeração de prancha
    folha: 'BL. 03/06',
    /* Os dois rótulos do botão de tocar/pausar do filme. O botão é pequeno, ao
       lado do carimbo da folha: teto de 10 caracteres. 'Abspielen' tem 9 e
       cabe, então fica — é a palavra que o alemão lê num controle de vídeo.
       'Pause' tem 5 e é a mesma palavra em alemão. */
    tocar: 'Abspielen',
    pausar: 'Pause',
    /* Era "vom Handy auf der Baustelle bis zur Marge auf dem Bildschirm" —
       dois lugares e nenhum verbo. O que o filme mostra é UM pedido
       atravessando a empresa sem ninguém redigitar nada. */
    titulo: 'Ein Auftrag, von der Baustelle bis zur Rechnung. Niemand tippt ihn ein zweites Mal.',
  },

  // ── A narração das seis cenas ─────────────────────────────────────────
  // `etapa` vai numa coluna estreita da régua de etapas: até 12 caracteres,
  // como no português. Por isso 'Jedes Gerät' e não 'Auf jedem Bildschirm'.
  cenas: [
    {
      etapa: 'Angebot',
      titulo: 'Foto auf der Baustelle, Angebot fertig.',
      sub: 'Jeder Besuch, jedes Maß, jede Änderung des Kunden landet im Verlauf. Aus den Fotos wird ein Karussell — die aktuelle Version vorn, die älteren direkt dahinter.',
      medidor: (n) => `Einträge im Angebot · ${n}/4`,
    },
    {
      etapa: 'Freigabe',
      // Era enigma ("Er gibt frei, bevor es das Glas gibt"): numa cena de
      // quatro segundos, quem precisa decifrar já perdeu a cena.
      titulo: 'Der Kunde sieht das Glas an seiner eigenen Wand.',
      sub: 'Die KI setzt das Glas in das Foto vom Raum des Kunden. Er sieht die Tür an ihrem Platz, an seiner eigenen Wand, bevor die erste Scheibe geschnitten ist.',
      medidor: (n) => `Auftrag wird geprüft · ${n}/4`,
    },
    {
      etapa: 'Zuschnitt',
      /* "Corta certo" é o mínimo que se espera, não é promessa. O que
         impressiona é a sobra virar matéria-prima com endereço. Na oficina
         alemã o retalho não fica no chão, fica encostado na parede ou no
         gestell — daí "an der Wand" e não "vom Boden". */
      titulo: 'Aus dem Restglas an der Wand wird Bestand.',
      sub: 'Der Schnittplan kommt fertig für den Tisch. Und das Reststück geht mit Maß, Farbe und Platznummer zurück aufs Gestell — bereit für die nächste Verschnittoptimierung.',
      medidor: (p) => `Ausnutzung · ${p}%`,
      medidorFim: 'Restglas belegt · Gestell A-03',
    },
    {
      etapa: 'Fertigung',
      titulo: 'Jede Scheibe hat eine Adresse.',
      sub: 'Jede Scheibe geht mit Etikett und Code raus. Sie läuft auf dem Bildschirm durch die Stationen, und geliefert ist sie erst, wenn der Code gescannt wurde — nicht, wenn sich jemand daran erinnert.',
      medidor: (n) => `Scheiben beim Versand geprüft · ${n}/5`,
    },
    {
      etapa: 'Geld',
      titulo: 'Am Ende wissen Sie, was übrig bleibt.',
      sub: 'Rechnung raus, Zahlschein unterwegs, Auftrag abgeschlossen: Rohmaterial, Fertigung und Nebenkosten bis zur echten Marge dieses Auftrags — nicht der Monatsschnitt.',
      medidor: (p) => `Marge dieses Auftrags · ${p}%`,
    },
    {
      etapa: 'Jedes Gerät',
      titulo: 'Es öffnet sich da, wo Sie gerade sind.',
      sub: 'Das Büro am Rechner, der Meister am Tablet neben dem Schneidtisch, der Verkäufer am Handy auf der Baustelle. Gleicher Auftrag, gleiche Minute — und nichts zu installieren.',
      medidor: (n) => `Bildschirme gleichzeitig · ${n}/3`,
    },
  ],

  // ── Os rótulos dentro dos SVG ─────────────────────────────────────────
  telas: {
    feed: {
      aria: 'Das Angebot als Verlauf, auf dem Handy des Verkäufers',
      titulo: 'Angebot 26-0431',
      situacao: 'In Arbeit',
      cliente: 'Marina Duarte',
      endereco: 'Whg. 142 · Haus Aurora',
      // as abas ficam em x fixo (20 / 66 / 106). A primeira tem até 7
      // caracteres e a segunda até 6: 'Verlauf' e 'Positionen' encostariam na
      // aba seguinte, então entraram 'Feed' (já usado assim em app alemão) e
      // 'Posten'.
      abas: ['Feed', 'Posten', 'Angebot'],
      versoes: (n) => `${n} Versionen`,
      posts: [
        {
          nome: 'Marcos Ribeiro',
          papel: 'Verkauf',
          hora: 'Di 09:20',
          // 'Öffnung Wohnzimmer · …' bateria no contador de versões à direita
          legenda: 'Wohnzimmer · 1180 × 2100 mm',
        },
        {
          nome: 'Marina Duarte',
          papel: 'Kunde',
          hora: 'Di 15:44',
          rotulo: 'Anmerkung',
          texto: 'Lieber Schiebetür statt Drehtür.',
        },
        {
          nome: 'Ana Silveira',
          papel: 'Büro',
          hora: 'Mi 08:05',
          legenda: 'Beschlag schwarz · Rolle sichtbar',
        },
        {
          nome: 'Marcos Ribeiro',
          papel: 'Verkauf',
          hora: 'Mi 11:38',
          rotulo: 'Maßänderung',
          texto: '1180 → 1175 mm Breite',
        },
      ],
    },

    ambiente: {
      // pílula de 58 px por aba: até 9 caracteres
      abas: ['Vorher', 'Nachher'],
    },
    antes: {
      aria: 'Der Raum des Kunden heute, ohne Glas',
      // 'BAUSTELLENFOTO' encostaria na borda da pílula de 118 px
      selo: 'FOTO VOR ORT',
    },
    simulacao: {
      aria: 'Derselbe Raum mit dem Glas, gesetzt von der KI',
      montando: 'GLAS WIRD GESETZT',
      pronto: 'KI-GENERIERT',
      // 'Projekt freigeben' quase toca a borda do botão de 126 px
      aprovar: 'Freigeben',
      item: 'Schiebetür',
      especificacao: '10 mm farblos · 1175 × 2100',
    },
    checagem: {
      aria: 'Die KI prüft den Auftrag vor der Fertigung',
      titulo: 'Auftragsprüfung',
      sub: '26-0431 · bevor er in die Fertigung geht',
      pilula: 'KI · aktiv',
      itens: [
        { titulo: 'Dicke', valor: '10 mm · Öffnung 1175' },
        { titulo: 'Beschlag', valor: 'Rolle 100 kg · Flügel 42 kg' },
        { titulo: 'Winkel', valor: '4 mm oben · prüfen' },
        // ESG em vez de Vorspannen: a linha de valor é estreita
        { titulo: 'Termin', valor: 'ESG passt in 5 Tage' },
      ],
      pendencia: '1 offener Punkt vor der Freigabe',
      pendenciaSub: 'Winkel mit dem Monteur abklären',
    },

    plano: {
      aria: 'Schnittplan einer Tafel 3210 × 2250: sieben Scheiben und ein Restglas',
      retalho: 'RESTGLAS',
      // 'RESTGLAS RESERVIERT' (19) não cabe no retângulo do resto: o teto é 17
      retalhoReservado: 'RESTGLAS BELEGT',
      especificacao: '8 mm · farblos',
      cavalete: 'GESTELL A-03',
    },

    sistema: {
      url: 'neoglass.online/otimizacao',
      // 'Verschnittoptimierung' é a palavra certa, mas são 21 caracteres num
      // cabeçalho que no celular tem largura de 11 — fica 'Optimierung'
      titulo: 'Optimierung',
      pedido: '26-0431 · 8 mm farblos',
      exportar: 'Export',
      gerarArquivos: 'Dateien erzeugen',
      gerar: 'Erzeugen',
      rodape: {
        aproveitamento: 'Ausnutzung',
        pecas: 'Scheiben',
        retalho: 'Restglas',
      },
    },
    aparelhos: {
      navegador: 'Der Schnittplan am Rechner',
      tablet: 'Der Schnittplan am Tablet',
      celular: 'Der Schnittplan am Handy',
    },

    producao: {
      aria: 'Produktionsübersicht mit den Scheiben nach Station',
      titulo: 'Produktionsübersicht',
      sub: '12 offene Aufträge · 38 Scheiben in Arbeit',
      aoVivo: 'live',
      // cabeçalho de coluna de 118 px com o contador à direita: até 12
      fases: ['Zuschnitt', 'Schleifen', 'Vorspannen', 'Versand'],
      especificacao: '10 mm farblos',
      // no cartão em trânsito só cabem 17 caracteres: ESG, não Vorspannen
      transito: 'aus dem ESG',
    },
    etiqueta: {
      aria: 'Das Etikett der Scheibe, mit Code',
      cabecalho: 'NEOGLASS · ETIKETT',
      especificacao: '10 mm farblos · ESG',
      pedido: 'Auftrag 26-0431',
      cliente: 'Marina Duarte · Whg. 142',
    },
    expedicao: {
      aria: 'Der Versand bestätigt die Lieferung per Code',
      titulo: 'Versand',
      sub: 'Ladung 118 · Abfahrt 14:20',
      conferidas: 'GEPRÜFT',
      item: (p) => `Scheibe ${p} · geprüft`,
      parcial: 'Teillieferung · 5 von 7 Scheiben',
    },

    nota: {
      aria: 'Die Rechnung, erzeugt vom System',
      sub: 'Serie 1 · Auftrag 26-0431',
      cliente: 'Marina Duarte · CPF 000.000.000-00',
      // 'Freigegeben' (11) sai da pílula de 80 px; 10 caracteres é o teto
      autorizada: 'Genehmigt',
      itensRotulo: 'POSITIONEN',
      itens: ['Schiebetür 10 mm', 'Rollenset 100 kg'],
      tributos: 'STEUERN · NEUES MODELL',
      total: 'Rechnungssumme',
      protocolo: 'Protokoll 135260004871234 · 04/08 14:31',
      danfe: 'DANFE per E-Mail an den Kunden',
    },
    recebimento: {
      aria: 'Der ausgestellte Zahlschein und der erwartete Eingang',
      titulo: 'Zahlungseingang',
      emAberto: 'Offen',
      boleto: 'Zahlschein 26-0431/1',
      vencimento: 'fällig 12/09 · 1 Rate',
    },
    margem: {
      aria: 'Der abgeschlossene Auftrag, mit der echten Marge',
      titulo: 'Auftragsabschluss',
      sub: '26-0431 · geliefert am 04/08',
      // 'Abgeschlossen' (13) não cabe na pílula de 86 px
      fechado: 'Erledigt',
      custos: ['Rohmaterial', 'Fertigung', 'Nebenkosten'],
      custoTotal: 'Gesamtkosten',
      venda: 'Verkauf',
      rotulo: 'MARGE DIESES AUFTRAGS',
    },

    vitrine: {
      aria: {
        plano: 'Optimierter Schnittplan',
        margem: 'Der Auftrag, finanziell abgeschlossen',
        feed: 'Angebot als Verlauf',
      },
      pecasCortadas: '7 Scheiben geschnitten',
      umRetalho: '1 Restglas',
      receita: 'UMSATZ',
      // a linha inteira tem 198 px a 7 px de fonte: até uns 45 caracteres
      entrega: 'Rechnung und Zahlschein raus · in 5 Tagen da',
      pedidoCliente: '26-0431 · Marina Duarte',
      clienteCurto: 'Marina Duarte · Whg. 142',
      versoesFoto: '3 Versionen dieses Fotos',
    },
  },
}
