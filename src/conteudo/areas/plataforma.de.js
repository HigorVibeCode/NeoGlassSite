/**
 * Die Plattform-Seite auf Deutsch — DACH. Der pt.js des Bereichs bleibt
 * die Quelle: derselbe Baum, dieselben Schlüssel, dieselbe Reihenfolge.
 *
 * Die Seite stellt NeoGlass vor — und trägt den Satz der Eröffnung. Fast
 * kein Absatz: was man verstehen muss, steht im Gegenstand, der Animation
 * und dem Film.
 */
export default {
  hero: {
    rotulo: 'Die Plattform',
    titulo: {
      antes: 'Wir sind',
      destaque: 'stolz auf das, was wir gebaut haben.',
    },
    linha: 'Wir kommen aus der Fabrik. Nicht aus einem Büro.',
  },

  abertura: {
    verDemonstracao: 'Demo ansehen',
    whatsapp: 'Hallo! Ich komme über die NeoGlass-Website.',
  },

  lugar: {
    titulo: 'Wir entwickeln keine Technologie, um uns vorzustellen, wie eine Fabrik funktioniert.',
    linha: 'Wir entwickeln sie, weil wir wissen, wo sie besser werden muss.',
  },

  proposito: {
    titulo: 'NeoGlass wurde nicht nur geschaffen, um modern zu wirken.',
    linha: 'Es wurde geschaffen, um Ergebnis zu liefern.',
  },

  caso: {
    titulo: 'Jede Scheibe wird mit einem eigenen Code geboren.',
    linha: 'Die Information entsteht einmal.',
    codigo: 'VG-260918-03',
    peca: 'P3',
    vidro: 'Klar 6 mm · 1800 × 1100',
    largura: '1800',
    altura: '1100',
    estacoes: {
      vao: 'Öffnung',
      otimizacao: 'Optimierung',
      expedicao: 'Versand',
      financeiro: 'Finanzen',
    },
    carga: 'Ladung 118',
    boleto: 'Zahlschein',
    margem: '41,7%',
    conferida: 'Geprüft',
  },

  inteligencia: {
    titulo: 'Weniger Spektakel.',
    linha: 'Mehr Nutzen.',
    texto:
      'KI gibt es, um Schritte zu reduzieren, Aufgaben zu automatisieren, Analysen zu erleichtern, bei Projekten zu helfen, Vorschauen zu erzeugen, Berichte zu unterstützen und Entscheidungen zu beschleunigen.',
    nao: 'Nicht um Menschen zu ersetzen.',
    sim: 'Um Menschen zu stärken.',
  },

  dados: {
    titulo: 'Wenn der Betrieb Daten erzeugt,',
    linha: 'beginnen die Daten, Entscheidungen zu erzeugen.',
    texto: 'Es gibt einen enormen Unterschied zwischen Führen nach Intuition und Führen nach Information.',
    fecho: 'Wer misst, verbessert.',
  },

  continuidade: {
    titulo: 'Moderne Technologie',
    linha: 'ohne auf Kontinuität zu verzichten.',
    camadas:
      'NeoGlass wurde mit Sicherheitsschichten, Zugangskontrolle, Isolierung der Informationen und Mechanismen für die betriebliche Kontinuität entwickelt.',
    nuvem:
      'Zugleich ermöglicht die cloudbasierte Architektur Fernzugriff, Synchronisierung und ständige Aktualisierungen.',
  },

  visao: {
    titulo: {
      antes: 'Die Plattform',
      destaque: 'geht weiter.',
    },
    capacidades: {
      ia: 'Künstliche Intelligenz',
      automacao: 'Automatisierung',
      visao: 'Computer Vision',
      dados: 'Daten',
    },
  },

  futuro: {
    titulo: 'Wir beteiligen uns am Aufbau',
    linha: 'der Zukunft der Glasindustrie.',
  },

  mundo: {
    titulo: 'Wir bauten für die Welt.',
  },

  chamada: {
    titulo: 'NeoGlass geöffnet sehen.',
    texto: 'Vierzig Minuten, System offen, keine Folien.',
    botao: 'Zeit wählen',
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
