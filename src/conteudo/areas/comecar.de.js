export default {
  rotulo: 'KONTO ERSTELLEN',
  etiqueta: (dias) => `${dias} Tage · ohne Karte`,
  titulo: { antes: 'Fangen Sie mit dem nächsten', destaque: 'Angebot an, das hereinkommt.' },
  texto:
    'Vier Felder ausfüllen, und die Einladung liegt in Ihrem Postfach. Wir fragen zum Ausprobieren nicht nach einer Karte — weder jetzt noch mittendrin.',
  passos: [
    'Füllen Sie die vier Felder nebenan aus',
    'Die Einladung kommt in wenigen Augenblicken',
    'Sie melden sich an und erstellen das erste Angebot',
  ],

  formulario: {
    titulo: 'Mein Konto erstellen',
    campos: {
      nome: { rotulo: 'Ihr Name', exemplo: 'Alex' },
      empresa: { rotulo: 'Name der Glaserei', exemplo: 'Glaserei Berger' },
      email: { rotulo: 'E-Mail', exemplo: 'sie@ihreglaserei.de', dica: 'Dorthin geht die Einladung.' },
      whatsapp: { rotulo: 'Telefon', exemplo: '+49 170 0000000', opcional: 'optional' },
    },
    enviar: (dias) => `Kostenlos starten · ${dias} Tage`,
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

  depois: {
    titulo: (dias) => `Und nach den ${dias} Tagen?`,
    texto: (preco) =>
      `Vor dem Ende kommt eine E-Mail mit dem Link, um eine Zahlungsart zu hinterlegen. Hinterlegen Sie keine, pausiert das Konto einfach — nichts wird abgebucht, nichts wird zur Schuld. Hinterlegen Sie eine, sind es ${preco} im Monat für das ganze Unternehmen, mit so vielen Nutzern, wie Sie möchten.`,
  },
}
