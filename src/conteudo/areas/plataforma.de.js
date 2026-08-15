/**
 * A aba Plataforma em alemão — a versão para DACH (Alemanha, Áustria, Suíça).
 * Mesma árvore do pt.js da área, chave por chave.
 *
 * Não é tradução: é recriação. O vocabulário é o do ramo (Tafel, Restglas,
 * Schnittplan, Verschnittoptimierung, ESG, Gestell, Beschlag) e quem lê é um
 * Glasermeister cético — frase curta, verbo concreto, nenhuma promessa que a
 * gente não cumpra. Palavra composta alemã é longa: onde o português cabia em
 * 12 caracteres, o alemão também tem que caber (`selo` dos módulos e do que
 * vem a seguir moram em etiquetas estreitas).
 */
export default {
  hero: {
    rotulo: 'Die Plattform · von innen',
    etiqueta: 'Ein Blick ins System',
    titulo: {
      antes: 'Ein Auftrag. Vom Angebot bis zur Rechnung.',
      destaque: 'Ohne Systemwechsel.',
    },
    verSistema: 'Das System in Aktion sehen',
    texto:
      'Jeder Schritt arbeitet mit denselben Daten, vom ersten Kontakt bis zur Lieferung.',
    marcas: [
      ['1', 'Auftrag geht durch alles'],
      ['4', 'Ausgabeformate für den Tisch'],
      ['0', 'Excel-Listen zwischen den Schritten'],
    ],
  },

  abertura: {
    verDemonstracao: 'Demo ansehen',
    whatsapp: 'Hallo! Ich komme über die NeoGlass-Website.',
  },

  devolve: {
    rotulo: 'Was es im Monat einbringt',
    titulo: 'Der Gewinn steckt nicht in einer Maske. Er steckt in dem, was nicht mehr passiert.',
    itens: [
      [
        'Die Tafel, die ganz geblieben ist',
        'Jedes Restglas im Gestell ist Glas, das schon einmal bezahlt wurde. Solange es kein Maß, keine Farbe und keinen Gestellplatz hat, kann es niemand ein zweites Mal verkaufen — dann wird daraus teurer Abfall.',
      ],
      [
        'Das Telefon, das stumm blieb',
        'Wer sieht, in welcher Phase sein Auftrag steckt, ruft nicht an. Und wenn er nicht anruft, muss auch niemand mehr in die Halle laufen, um die Antwort zu holen.',
      ],
      [
        'Das Glas, das nicht zurückkam',
        'Öffnung nicht im Winkel, Dicke trägt das Gewicht nicht, Beschlag gibt es in diesem Maß gar nicht: vor dem Schneidtisch billig zu korrigieren, nach dem Vorspannen teuer.',
      ],
      [
        'Die Marge, die sichtbar wird',
        'Nicht die des Monats — die jedes einzelnen Auftrags. Material, Fertigung und Erlös stehen auf derselben Maske, also wissen Sie, welche Art von Auftrag sich lohnt.',
      ],
    ],
  },

  /* O módulo 'Checagem do pedido' saiu da lista nos quatro idiomas: a
     ferramenta não existe no sistema. Os números foram corridos de 01 a 07 e
     o título deixou de dizer oito. */
  modulos: {
    rotulo: 'Was am Auftrag arbeitet',
    titulo: 'Alles arbeitet am selben Auftrag.',
    texto: 'Sieben Teile des Systems. Keines verlangt, dass Sie neu tippen, was schon drin ist.',
    selo: 'im Einsatz',
    lista: [
      ['01', 'Angebot und Auftrag', 'Sie erfassen Baustelle und Kunden, ohne bei null anzufangen.'],
      ['02', 'KI-Simulation', 'Das Glas im Raum des Kunden, bevor die Scheibe existiert.'],
      ['03', 'Verschnittoptimierung', 'Findet Restglas, bevor eine neue Tafel verbraucht wird.'],
      ['04', 'Lager und Restglas', 'Nutzen Sie ein Reststück, bevor Sie eine neue Tafel kaufen.'],
      ['05', 'Fertigung und Rückverfolgung', 'Wissen Sie, wo jede Scheibe ist, ohne drei Leute zu fragen.'],
      ['06', 'Versand und Lieferung', 'Sehen Sie, was raus ist, was läuft und was fehlt.'],
      ['07', 'Zahlen je Auftrag', 'Sehen Sie die Marge dieses Auftrags, nicht nur den Monatsumsatz.'],
    ],
  },

  // Os tipos ('celular', 'tablet', 'navegador') são chave de desenho, não
  // texto: ficam iguais nos quatro idiomas.
  aparelhos: {
    rotulo: 'Wo es läuft',
    titulo: 'Derselbe Auftrag, von der Hosentasche des Glasers bis zum Schneidtisch.',
    texto: 'Dieselben Daten, an verschiedenen Orten.',
    lista: [
      ['celular', 'Auf der Baustelle', 'Messen, fotografieren, kalkulieren und unterschreiben lassen — im Stehen, beim Kunden.'],
      ['tablet', 'An der Werkbank', 'Fertigungsauftrag und Etikett der Scheibe dort, wo das Glas geschnitten wird.'],
      ['navegador', 'Im Büro', 'Schnittplan, Warteschlange am Tisch und Abschluss des Auftrags.'],
    ],
  },

  /* O item brasileiro da reforma tributária (CBS, IBS, split payment) não diz
     nada a quem lê em alemão. No lugar dele vai a E-Rechnung no formato que
     cada país exige — sem prazo e sem citar norma, porque nem o prazo nem a
     norma são nossos de prometer. */
  adiante: {
    rotulo: 'Was kommt',
    titulo: 'Was kommt.',
    grupos: [
      {
        selo: 'In Arbeit',
        itens: [
          [
            'KI-Simulation näher am Ergebnis',
            'Das Bild im Raum des Kunden trifft die Scheibe, die aus der Fertigung kommt, noch nicht zu 100 %. Diesen Abstand zu verkleinern ist die Arbeit von jetzt.',
          ],
          [
            'Mehr Maschinenformate',
            'Jeder Schneidtisch spricht seinen eigenen Dialekt; die Liste wächst, wie die Betriebe es verlangen.',
          ],
        ],
      },
      {
        selo: 'Geplant',
        itens: [
          [
            'E-Rechnung',
            'Die Formate für die elektronische Rechnung werden gerade Land für Land festgelegt. Wir bereiten die Ausgabe so vor, dass die Rechnung im geforderten Format rausgeht. In Vorbereitung — ein Datum versprechen wir noch nicht.',
          ],
        ],
      },
    ],
  },

  chamada: {
    rotulo: 'Vorführung vereinbaren',
    titulo: 'Die beste Vorführung ist Ihr eigener Auftrag.',
    texto:
      'Vierzig Minuten, System offen, keine Folien. Sie wählen das Modul, das Sie am meisten interessiert, und dort fangen wir an.',
    passos: [
      'Sie sagen, wo es heute am meisten weh tut',
      'Wir öffnen das Modul, das genau das löst',
      'Sie sehen einen ganzen Auftrag durch das System laufen',
    ],
  },

  formulario: {
    rotulo: 'Vorführung buchen',
    titulo: 'Kontakt hinterlassen, ich melde mich.',
    nome: 'Ihr Name',
    empresa: 'Firma',
    whatsapp: 'WhatsApp mit Vorwahl',
    perfis: [
      'Glasindustrie (Schneidtisch und Ofen)',
      'Glaserei',
      'Großhandel / Glaserei mit Zuschnitt',
      'Sonstiges',
    ],
    enviando: 'Wird gesendet…',
    botao: 'Zeigen Sie es mir',
    erro: 'Das Senden hat gerade nicht geklappt. Schreiben Sie mir per WhatsApp, ich antworte direkt.',
    nota: 'Kein Konto, kein Newsletter. Ihre Daten dienen nur der Terminabsprache.',
    mensagem: (d) =>
      `Hallo! Ich möchte NeoGlass sehen.\n\nName: ${d.nome}\nFirma: ${d.empresa}\nProfil: ${d.perfil}`,
    sucesso: {
      titulo: 'Angekommen.',
      texto:
        'Ich melde mich per WhatsApp, um den Termin abzustimmen. Wenn es schneller gehen soll: die Nummer steht direkt darunter.',
      botao: 'Jetzt per WhatsApp schreiben',
      whatsapp: 'Hallo! Ich habe gerade das Formular auf der NeoGlass-Website ausgefüllt.',
    },
  },
}
