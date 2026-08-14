export default {
  rotulo: 'CREATE ACCOUNT',
  etiqueta: (dias) => `${dias} days · no card`,
  titulo: { antes: 'Start with the next', destaque: 'quote that comes in.' },
  texto:
    'Four fields, and the invitation lands in your inbox. We do not ask for a card to try it — not now, not halfway through.',
  passos: [
    'Fill in the four fields on the right',
    'The invitation reaches your inbox in moments',
    'You log in and build your first quote',
  ],

  formulario: {
    titulo: 'Create my account',
    campos: {
      nome: { rotulo: 'Your name', exemplo: 'Alex' },
      empresa: { rotulo: 'Company name', exemplo: 'Clearline Glass' },
      email: { rotulo: 'Email', exemplo: 'you@yourcompany.com', dica: 'This is where the invitation goes.' },
      whatsapp: { rotulo: 'Phone', exemplo: '+1 555 000 0000', opcional: 'optional' },
    },
    enviar: (dias) => `Start free · ${dias} days`,
    enviando: 'Creating your account…',
    saida: 'Message us on WhatsApp',
    aviso: 'No credit card. No setup fee. Nothing to install.',
    erros: {
      nome: 'Your name is missing.',
      empresa: 'The company name is missing.',
      email: 'Check the email — something looks off.',
      rede: 'The connection dropped halfway. Try again.',
      geral: 'We could not finish right now. Message us on WhatsApp and we will sort it out on the spot.',
    },
  },

  pronto: {
    rotulo: 'DONE',
    titulo: 'Check your inbox.',
    texto: (email) =>
      `The invitation went to ${email}. Click it to set your password and log in — the account is already up, with the whole system unlocked.`,
    dica: 'Nothing after two minutes? Check the spam folder. If it is not there, message us and we will let you in by hand.',
    whatsapp: 'Message us on WhatsApp',
  },

  depois: {
    titulo: (dias) => `And after the ${dias} days?`,
    texto: (preco) =>
      `You get an email before it ends, with a link to add a payment method. If you do not add one, the account simply pauses — nothing is charged, nothing turns into a debt. If you do, it is ${preco} a month for the whole company, with as many users as you like.`,
  },
}
