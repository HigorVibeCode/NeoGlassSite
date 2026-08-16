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
    linha: 'Das System der Glasfabrik.',
  },

  abertura: {
    verDemonstracao: 'Demo ansehen',
    whatsapp: 'Hallo! Ich komme über die NeoGlass-Website.',
  },

  caso: {
    titulo: 'Eine Scheibe. Ein Code.',
    codigo: 'VG-260918-03',
    pedido: '26-0918',
    peca: 'P3',
    vidro: 'Klar 6 mm · 1800 × 1100',
    estacoes: {
      pedidos: 'Aufträge',
      producao: 'Fertigung',
      corte: 'Zuschnitt',
      financeiro: 'Finanzen',
    },
    fases: ['Zuschnitt', 'Kanten', 'Vorspannen'],
    margem: '41,7%',
    margemRotulo: 'Marge',
    conferida: 'Scheibe geprüft',
  },

  visao: {
    titulo: 'Die Plattform geht weiter.',
    capacidades: {
      ia: 'Künstliche Intelligenz',
      automacao: 'Automatisierung',
      visao: 'Computer Vision',
      dados: 'Daten',
    },
  },

  nasceu: {
    titulo: 'Aus einer Glasfabrik, in die Welt.',
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
