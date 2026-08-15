export default {
  rotulo: 'CREATE ACCOUNT',
  subtitulo: (dias) => `${dias} days free. No credit card.`,
  titulo: { antes: 'Create your account and', destaque: 'start using it.' },

  formulario: {
    titulo: 'Create my account',
    campos: {
      nome: { rotulo: 'Your name', exemplo: 'Alex' },
      empresa: { rotulo: 'Company name', exemplo: 'Clearline Glass' },
      email: { rotulo: 'Email', exemplo: 'you@yourcompany.com', dica: 'This is where the invitation goes.' },
      whatsapp: { rotulo: 'Phone', exemplo: '+1 555 000 0000', opcional: 'optional' },
    },
    enviar: () => 'Create my free account',
    rapido: 'Takes less than a minute.',
    enviando: 'Creating your account…',
    saida: 'Send my details by email',
    aviso: 'No credit card. No setup fee. Nothing to install.',
    erros: {
      nome: 'Your name is missing.',
      empresa: 'The company name is missing.',
      email: 'Check the email — something looks off.',
      rede: 'The connection dropped halfway. Try again.',
      geral: 'We could not finish right now. Send us your details by email and we will create the account by hand.',
    },
  },

  pronto: {
    rotulo: 'DONE',
    titulo: 'Check your inbox.',
    texto: (email) =>
      `The invitation went to ${email}. Click it to set your password and log in — the account is already up, with the whole system unlocked.`,
    dica: 'Nothing after two minutes? Check the spam folder. If it is not there, write to us and we will let you in by hand.',
    contato: 'Write to us',
  },

}
