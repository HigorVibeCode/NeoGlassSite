export default {
  rotulo: 'KONTO ERSTELLEN',
  subtitulo: (dias) => `${dias} Tage kostenlos. Ohne Kreditkarte.`,
  titulo: { antes: 'Erstellen Sie Ihr Konto', destaque: 'und legen Sie los.' },

  formulario: {
    titulo: 'Konto erstellen',
    campos: {
      nome: { rotulo: 'Ihr Name', exemplo: 'Max Mustermann' },
      empresa: { rotulo: 'Name der Glaserei', exemplo: 'Flash Glas' },
      email: { rotulo: 'E-Mail', exemplo: 'max.mustermann@gmail.com' },
      telefone: { rotulo: 'Telefon', exemplo: '+49 151 1234567', opcional: 'optional' },
      senha: { rotulo: 'Passwort', exemplo: 'mindestens 8 Zeichen', mostrar: 'zeigen', ocultar: 'verbergen' },
      senha2: { rotulo: 'Passwort bestätigen', exemplo: 'Passwort wiederholen' },
    },

    // Quem indicou. Com link vira selo (o nome vem do servidor);
    // sem link, um campo opcional para quem recebeu o código na conversa.
    indicacao: {
      rotulo: 'Empfehlungscode',
      exemplo: 'z. B. maxmustermann',
      selo: (nome) => `Empfohlen von ${nome}`,
      remover: 'nicht empfohlen',
    },
    enviar: () => 'Kostenloses Konto erstellen',
    rapido: 'Dauert weniger als eine Minute.',
    enviando: 'Konto wird erstellt…',
    entrando: 'Sie werden angemeldet…',
    saida: 'Meine Daten per E-Mail senden',
    aviso: 'Keine Kreditkarte. Keine Einrichtungsgebühr. Keine Installation.',
    erros: {
      nome: 'Ihr Name fehlt.',
      empresa: 'Der Name der Glaserei fehlt.',
      email: 'Prüfen Sie die E-Mail — da fehlt etwas.',
      senha: 'Das Passwort braucht mindestens 8 Zeichen.',
      senha2: 'Die beiden Passwörter stimmen nicht überein.',
      rede: 'Die Verbindung ist abgebrochen. Versuchen Sie es erneut.',
      geral: 'Wir konnten es gerade nicht abschließen. Senden Sie uns Ihre Daten per E-Mail, dann legen wir das Konto von Hand an.',
    },
  },

  pronto: {
    rotulo: 'FERTIG',
    titulo: 'Ihr Konto steht.',
    texto: 'Melden Sie sich unter app.neoglass.online mit Ihrer E-Mail und dem soeben erstellten Passwort an — das gesamte System ist bereits freigeschaltet.',
    entrar: 'Zum System',
  },
}
