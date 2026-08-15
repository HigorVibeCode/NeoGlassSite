/**
 * Os textos do site em alemão — a versão para DACH (Alemanha, Áustria, Suíça).
 * A estrutura acompanha `pt.js` chave por chave: quando uma frase muda lá, ela
 * muda aqui, e `npm run idiomas` avisa o que ficou para trás.
 *
 * Não é tradução: é recriação. O alemão do setor tem vocabulário próprio
 * (Tafel, Restglas, Schnittplan, Verschnittoptimierung, ESG) e o leitor daqui
 * é um Glasermeister cético — frase curta, verbo concreto, nenhuma promessa
 * que a gente não cumpra. Palavra composta alemã é longa, então os rótulos de
 * botão foram escolhidos pelo comprimento, não pela literalidade.
 */
export default {
  // ── O que o Google e o WhatsApp leem ──────────────────────────────────
  paginas: {
    home: {
      nome: 'Start',
      titulo: 'NeoGlass · Software für Glasereien und die Glasindustrie',
      descricao:
        'Angebot, Schnittplan, Reststückverwaltung und Produktion in einem System. Wählen Sie zwischen der Version für Glasereien und der für Glasfabriken.',
      ogTitulo: 'Glas, das Sie nicht kaufen, ist Gewinn',
      ogDescricao: 'Vom Angebot vor Ort bis zum Schnittplan am Tisch. Wählen Sie Ihren Einstieg.',
    },
    industria: {
      nome: 'Industrie',
      titulo: 'NeoGlass · Software für die Flachglasindustrie',
      descricao:
        'Vom Angebot auf der Baustelle bis zum Schnittplan am Schneidtisch. Verschnittoptimierung mit Restglas-Verwertung und Rückverfolgung jeder Scheibe.',
      ogTitulo: 'NeoGlass · Software für die Flachglasindustrie',
      ogDescricao:
        'Vom Angebot auf der Baustelle bis zum Schnittplan am Tisch. Jedes Reststück wird genutzt.',
    },
    vidracaria: {
      nome: 'Glaserei',
      titulo: 'NeoGlass für Glasereien · Profi ab dem ersten Angebot',
      descricao:
        'Angebot direkt beim Kunden, Auftrag verfolgt vom Schnitt bis zum Versand, Restglas dort, wo es hingehört. Ohne Excel, ohne Kladde, ohne Schulung.',
      ogTitulo: 'NeoGlass für Glasereien · Das Angebot steht, bevor Sie zurück im Betrieb sind',
      ogDescricao:
        'Öffnung messen, Angebot am Handy rechnen, PDF mit Ihrem Logo verschicken. Fester Preis, keine Einrichtungsgebühr.',
    },
    plataforma: {
      nome: 'Plattform',
      titulo: 'Die NeoGlass-Plattform · Das System der Glasfabrik',
      descricao:
        'Das System der Glasfabrik: ein Auftrag, die ganze Firma. Geschrieben in der Halle, heute im Einsatz.',
      ogTitulo: 'Die NeoGlass-Plattform',
      ogDescricao: 'Ein Auftrag. Die ganze Firma. Geschrieben in der Halle, heute im Einsatz.',
    },
    comecar: {
      nome: 'Starten',
      titulo: 'NeoGlass-Konto erstellen · 14 Tage kostenlos, ohne Karte',
      descricao:
        'Konto erstellen und NeoGlass 14 Tage ohne Kreditkarte nutzen. Angebot, Schnittplan, Reststücke und Produktion für Glasereien.',
      ogTitulo: 'Fangen Sie mit dem nächsten Angebot an',
      ogDescricao: '14 Tage kostenlos, ohne Karte. Die Einladung kommt in wenigen Augenblicken.',
    },
  },

  // ── O topo, o rodapé e os botões que aparecem em toda página ──────────
  // Atenção ao comprimento: `entrar`, `preco`, `verDemoCurto` e `comecarCurto`
  // moram em botões estreitos e no topo apertado do celular — máximo 12
  // caracteres. Por isso 'Login' e 'Demo' em vez de 'Anmelden' e
  // 'Demo ansehen': no DACH ambos já são palavras correntes no setor.
  chrome: {
    inicio: 'NeoGlass — Startseite',
    publicos: 'Branchen',
    entrar: 'Login',
    preco: 'Preise',
    verDemoCurto: 'Demo',
    verDemo: 'Das System in Aktion sehen',
    comecarCurto: 'Starten',
    comecarGratis: (dias) => `Gratis starten · ${dias} Tage`,
    comecarAgora: 'Jetzt starten',
    queroComecar: 'Ich will loslegen',
    falarWhatsapp: 'Per WhatsApp schreiben',
    rodapeTexto:
      'neoglass.online · modulares System für die Flachglasindustrie und das Glaserhandwerk',
    paraQuem: 'Für wen',
    contato: 'Kontakt',
    // O atendimento é brasileiro: o horário fica em hora de Brasília, com a
    // dica de que em DACH isso cai no fim da tarde e à noite.
    horarios: 'Mo–Fr 14–20 Uhr, Sa 8–17 Uhr (Ortszeit Brasília, UTC−3) · bei uns später Abend',
    idioma: 'Sprache',
    // Cabeçalho da coluna da direita na tabela de contraste — a mesma frase
    // na indústria e na Glaserei, por isso fica no tronco comum e não nos
    // módulos de área. Ver Contraste.jsx.
    comNeoGlass: 'Mit NeoGlass',
  },

  agenda: {
    semScript: 'Der Kalender konnte hier nicht laden — Netz oder Erweiterung hat ihn blockiert.',
    abrirFora: 'Kalender öffnen',
    carregando: 'Termine werden geladen…',
  },

  // ── As mensagens prontas do WhatsApp ──────────────────────────────────
  whatsapp: {
    demonstracao: 'Hallo! Ich komme über die NeoGlass-Website und möchte eine Demo sehen.',
    comecar: 'Hallo! Ich möchte NeoGlass in meiner Glaserei einsetzen.',
  },

  // ── De onde vem (aparece nas três páginas) ────────────────────────────
  // Regra fixa do projeto: 'In der Schweiz entwickelt' fica só em palavras.
  // Nada de cruz suíça, brasão ou qualquer símbolo nacional — é a lei de
  // Swissness, e vale para texto, ícone e imagem.
  origem: {
    rotulo: 'Woher es kommt',
    /* A segunda metade falava do que o sistema NÃO é ("nicht in einer
       Besprechung"). Agora fala de quem o escreveu, que é o argumento que
       nenhum concorrente copia. "Jahrzehnte im Glas" é como o setor fala de
       si mesmo em alemão — mais curto e mais do ramo que "in der Branche". */
    titulo: 'Entstanden in einer Glasfabrik, geschrieben von Leuten mit Jahrzehnten im Glas.',
    fatos: [
      [
        'In der Schweiz entwickelt',
        'wo Glas, das zu spät kommt oder nicht im Winkel ist, schlicht keine Option ist',
      ],
      [
        'In der Halle geschrieben',
        'keine Maske entstand am Konferenztisch: jede entstand aus einem Schaden, der schon passiert war',
      ],
      [
        'Im Einsatz, nicht im Prototyp',
        'Betriebe schneiden und liefern heute damit, während Sie diese Seite lesen',
      ],
    ],
  },

  // O mesmo pedido atravessando a operação — a peça central do
  // posicionamento. Ver components/Fluxo.jsx.
  fluxo: {
    rotulo: 'Der Auftrag, von Anfang bis Ende',
    titulo: 'Niemand tippt denselben Auftrag zweimal.',
    texto: 'Der Auftrag wird einmal erfasst und begleitet den ganzen Betrieb. Jeder Schritt arbeitet mit denselben Daten — denen von der Baustelle.',
    estadoRotulo: 'Wo er gerade steht',
    pedido: { numero: '26-0918', cliente: 'Marcos Ribeiro', vidro: 'Klar 6 mm ESG · 4 Teile' },
    etapas: [
      { nome: 'Angebot', estado: 'Angebot an den Kunden verschickt', detalhe: 'Aus dem Aufmaß wurden Preis, PDF und Termin. Nichts wurde neu getippt.' },
      { nome: 'Freigabe', estado: 'Vom Kunden freigegeben', detalhe: 'Die Freigabe fixiert Preis und Termin und gibt den Auftrag in die Fertigung.' },
      { nome: 'Produktion', estado: 'Am Schneidtisch', detalhe: 'Der Schnittplan kam aus demselben Auftrag, Reststücke bereits berücksichtigt.' },
      { nome: 'Versand', estado: 'Für die Lieferung kommissioniert', detalhe: 'Die Teile wurden gegen den Auftrag geprüft, nicht gegen einen losen Zettel.' },
      { nome: 'Finanzen', estado: 'Marge ermittelt', detalhe: 'Erlös, Material und Fertigung dieses Auftrags an einer Stelle.' },
    ],
    nota: 'Die Auftragsnummer ist in allen fünf Schritten dieselbe. Das ist der Unterschied zwischen einem System und einem Haufen Werkzeuge, die nicht miteinander sprechen.',
  },
}
