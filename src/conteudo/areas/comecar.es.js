export default {
  rotulo: 'CREAR CUENTA',
  subtitulo: (dias) => `${dias} días gratis. Sin tarjeta de crédito.`,
  titulo: { antes: 'Crea tu cuenta y', destaque: 'empieza a usarlo.' },

  formulario: {
    titulo: 'Crear mi cuenta',
    campos: {
      nome: { rotulo: 'Tu nombre', exemplo: 'Juan García' },
      empresa: { rotulo: 'Nombre de la vidriería', exemplo: 'Flash Vidrios' },
      email: { rotulo: 'Correo', exemplo: 'juan.garcia@gmail.com' },
      telefone: { rotulo: 'Teléfono', exemplo: '+34 600 123 456', opcional: 'opcional' },
      pais: { rotulo: 'País', opcoes: [['es', 'España'], ['ch', 'Suiza'], ['de', 'Alemania'], ['at', 'Austria'], ['br', 'Brasil'], ['pt', 'Portugal'], ['us', 'Estados Unidos']] },
      senha: { rotulo: 'Contraseña', exemplo: 'mínimo 8 caracteres', mostrar: 'mostrar', ocultar: 'ocultar' },
      senha2: { rotulo: 'Confirmar contraseña', exemplo: 'repite la contraseña' },
    },

    // Quem indicou. Com link vira selo (o nome vem do servidor);
    // sem link, um campo opcional para quem recebeu o código na conversa.
    indicacao: {
      rotulo: 'Código de recomendación',
      exemplo: 'ej.: juangarcia',
      selo: (nome) => `Recomendado por ${nome}`,
      remover: 'no fui recomendado',
    },
    enviar: () => 'Crear mi cuenta gratis',
    rapido: 'Lleva menos de 1 minuto.',
    enviando: 'Creando tu cuenta…',
    entrando: 'Entrando…',
    entrar: 'Entrar',
    esqueci: 'Olvidé la contraseña',
    saida: 'Enviar mis datos por correo',
    aviso: 'Sin tarjeta. Sin coste de implantación. Sin instalación.',
    erros: {
      nome: 'Falta tu nombre.',
      empresa: 'Falta el nombre de la vidriería.',
      email: 'Revisa el correo — parece que falta algo.',
      senha: 'La contraseña necesita al menos 8 caracteres.',
      senha2: 'Las dos contraseñas no coinciden.',
      rede: 'La conexión falló a mitad de camino. Inténtalo de nuevo.',
      jaExiste: 'Este correo ya tiene una cuenta. Entra con la contraseña que creaste — o pide una nueva.',
      muitasTentativas: 'Demasiados intentos seguidos. Espera unos minutos y vuelve a intentarlo.',
      geral: 'No pudimos terminar ahora. Envía tus datos por correo y creamos la cuenta a mano.',
    },
  },

  pronto: {
    rotulo: 'LISTO',
    titulo: 'Tu cuenta está lista.',
    texto: 'Entra en app.neoglass.online con tu correo y la contraseña que acabas de crear — el sistema entero ya está desbloqueado.',
    entrar: 'Entrar al sistema',
  },
}
