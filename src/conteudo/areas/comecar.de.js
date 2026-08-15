export default {
  rotulo: 'KONTO ERSTELLEN',
  subtitulo: (dias) => `${dias} Tage kostenlos. Ohne Kreditkarte.`,
  titulo: { antes: 'Erstellen Sie Ihr Konto', destaque: 'und legen Sie los.' },

  formulario: {
    titulo: 'Mein Konto erstellen',
    campos: {
      nome: { rotulo: 'Ihr Name', exemplo: 'Alex' },
      empresa: { rotulo: 'Name der Glaserei', exemplo: 'Glaserei Berger' },
      email: { rotulo: 'E-Mail', exemplo: 'sie@ihreglaserei.de', dica: 'Dorthin geht die Einladung.' },
      whatsapp: { rotulo: 'Telefon', exemplo: '+49 170 0000000', opcional: 'optional' },
    },
    enviar: () => 'Kostenloses Konto erstellen',
    rapido: 'Dauert weniger als eine Minute.',
    enviando: 'Ihr Konto wird erstellt…',
    saida: 'Meine Daten per E-Mail senden',
    aviso: 'Keine Kreditkarte. Keine Einrichtungsgebühr. Nichts zu installieren.',
    erros: {
      nome: 'Ihr Name fehlt.',
      empresa: 'Der Name der Glaserei fehlt.',
      email: 'Prüfen Sie die E-Mail — da fehlt etwas.',
      rede: 'Die Verbindung ist mittendrin abgebrochen. Bitte noch einmal.',
      geral: 'Wir konnten es gerade nicht abschließen. Senden Sie uns Ihre Daten per E-Mail — wir legen das Konto von Hand an.',
    },
  },

  pronto: {
    rotulo: 'FERTIG',
    titulo: 'Sehen Sie in Ihr Postfach.',
    texto: (email) =>
      `Die Einladung ging an ${email}. Ein Klick darauf, Passwort setzen, anmelden — das Konto steht bereits, mit dem gesamten System freigeschaltet.`,
    dica: 'Nach zwei Minuten nichts da? Schauen Sie in den Spam-Ordner. Wenn sie auch dort nicht liegt, schreiben Sie uns — wir schalten Sie von Hand frei.',
    contato: 'Schreiben Sie uns',
  },

}
