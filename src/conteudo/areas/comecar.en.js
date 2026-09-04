export default {
  rotulo: 'CREATE ACCOUNT',
  subtitulo: (dias) => `${dias} days free. No credit card.`,
  titulo: { antes: 'Create your account and', destaque: 'start using it.' },

  formulario: {
    titulo: 'Create my account',
    campos: {
      nome: { rotulo: 'Your name', exemplo: 'John Smith' },
      empresa: { rotulo: 'Company name', exemplo: 'Flash Glass' },
      email: { rotulo: 'Email', exemplo: 'john.smith@gmail.com' },
      telefone: { rotulo: 'Phone', exemplo: '+1 555 123 4567', opcional: 'optional' },
      pais: { rotulo: 'Country', opcoes: [['us', 'United States'], ['ch', 'Switzerland'], ['de', 'Germany'], ['at', 'Austria'], ['br', 'Brazil'], ['pt', 'Portugal'], ['es', 'Spain']] },
      senha: { rotulo: 'Password', exemplo: 'at least 8 characters', mostrar: 'show', ocultar: 'hide' },
      senha2: { rotulo: 'Confirm password', exemplo: 'repeat the password' },
    },

    // Quem indicou. Com link vira selo (o nome vem do servidor);
    // sem link, um campo opcional para quem recebeu o código na conversa.
    indicacao: {
      rotulo: 'Referral code',
      exemplo: 'e.g. johnsmith',
      selo: (nome) => `Referred by ${nome}`,
      remover: 'not referred',
    },
    enviar: () => 'Create my free account',
    rapido: 'Takes less than a minute.',
    enviando: 'Creating your account…',
    entrando: 'Signing you in…',
    entrar: 'Sign in',
    esqueci: 'Forgot password',
    saida: 'Send my details by email',
    aviso: 'No credit card. No setup fee. No installation.',
    erros: {
      nome: 'Your name is missing.',
      empresa: 'The company name is missing.',
      email: 'Check the email — something seems off.',
      senha: 'The password needs at least 8 characters.',
      senha2: 'The two passwords do not match.',
      rede: 'The connection dropped halfway. Try again.',
      jaExiste: 'This email already has an account. Sign in with the password you created — or request a new one.',
      muitasTentativas: 'Too many attempts in a row. Wait a few minutes and try again.',
      geral: 'We could not finish just now. Send your details by email and we will set the account up by hand.',
    },
  },

  pronto: {
    rotulo: 'DONE',
    titulo: 'Your account is ready.',
    texto: 'Sign in at app.neoglass.online with your email and the password you just created — the whole system is already unlocked.',
    entrar: 'Go to the system',
  },
}
