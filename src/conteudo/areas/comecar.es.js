export default {
  rotulo: 'CREAR CUENTA',
  subtitulo: (dias) => `${dias} días gratis. Sin tarjeta de crédito.`,
  titulo: { antes: 'Crea tu cuenta y', destaque: 'empieza a usarlo.' },

  formulario: {
    titulo: 'Crear mi cuenta',
    campos: {
      nome: { rotulo: 'Tu nombre', exemplo: 'Álex' },
      empresa: { rotulo: 'Nombre de la cristalería', exemplo: 'Cristalería Solano' },
      email: { rotulo: 'Correo', exemplo: 'tu@tucristaleria.es', dica: 'Ahí es donde llega la invitación.' },
      whatsapp: { rotulo: 'WhatsApp', exemplo: '+34 600 000 000', opcional: 'opcional' },
    },
    enviar: () => 'Crear mi cuenta gratis',
    rapido: 'Tarda menos de 1 minuto.',
    enviando: 'Creando tu cuenta…',
    saida: 'Enviar mis datos por correo',
    aviso: 'Sin tarjeta de crédito. Sin cuota de implantación. Sin instalación.',
    erros: {
      nome: 'Falta tu nombre.',
      empresa: 'Falta el nombre de la cristalería.',
      email: 'Revisa el correo — parece que falta algo.',
      rede: 'La conexión falló a mitad de camino. Inténtalo de nuevo.',
      geral: 'No hemos podido terminar ahora. Envíanos tus datos por correo y creamos la cuenta a mano.',
    },
  },

  pronto: {
    rotulo: 'LISTO',
    titulo: 'Revisa tu correo.',
    texto: (email) =>
      `La invitación fue a ${email}. Haz clic para crear tu contraseña y entrar — la cuenta ya está en pie, con el sistema entero abierto.`,
    dica: '¿No llegó en dos minutos? Mira en la carpeta de spam. Si no está, escríbenos y te damos acceso a mano.',
    contato: 'Escribirnos',
  },

}
