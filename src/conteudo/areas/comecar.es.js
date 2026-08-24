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
      senha: { rotulo: 'Contraseña', exemplo: 'mínimo 8 caracteres', mostrar: 'mostrar', ocultar: 'ocultar' },
      senha2: { rotulo: 'Confirmar contraseña', exemplo: 'repite la contraseña' },
    },
    enviar: () => 'Crear mi cuenta gratis',
    rapido: 'Lleva menos de 1 minuto.',
    enviando: 'Creando tu cuenta…',
    entrando: 'Entrando…',
    saida: 'Enviar mis datos por correo',
    aviso: 'Sin tarjeta. Sin coste de implantación. Sin instalación.',
    erros: {
      nome: 'Falta tu nombre.',
      empresa: 'Falta el nombre de la vidriería.',
      email: 'Revisa el correo — parece que falta algo.',
      senha: 'La contraseña necesita al menos 8 caracteres.',
      senha2: 'Las dos contraseñas no coinciden.',
      rede: 'La conexión falló a mitad de camino. Inténtalo de nuevo.',
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
