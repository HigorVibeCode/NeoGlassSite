export default {
  rotulo: 'CREAR CUENTA',
  etiqueta: (dias) => `${dias} días · sin tarjeta`,
  titulo: { antes: 'Empieza por el próximo', destaque: 'presupuesto que entre.' },
  texto:
    'Rellenas cuatro campos y la invitación llega a tu correo. No pedimos tarjeta para probar — ni ahora, ni a mitad de camino.',
  passos: [
    'Rellena los cuatro campos de al lado',
    'La invitación llega a tu correo en instantes',
    'Entras y montas el primer presupuesto',
  ],

  formulario: {
    titulo: 'Crear mi cuenta',
    campos: {
      nome: { rotulo: 'Tu nombre', exemplo: 'Álex' },
      empresa: { rotulo: 'Nombre de la cristalería', exemplo: 'Cristalería Solano' },
      email: { rotulo: 'Correo', exemplo: 'tu@tucristaleria.es', dica: 'Ahí es donde llega la invitación.' },
      whatsapp: { rotulo: 'WhatsApp', exemplo: '+34 600 000 000', opcional: 'opcional' },
    },
    enviar: (dias) => `Empezar gratis · ${dias} días`,
    enviando: 'Creando tu cuenta…',
    aviso: 'Sin tarjeta de crédito. Sin cuota de implantación. Sin instalación.',
    erros: {
      nome: 'Falta tu nombre.',
      empresa: 'Falta el nombre de la cristalería.',
      email: 'Revisa el correo — parece que falta algo.',
      rede: 'La conexión falló a mitad de camino. Inténtalo de nuevo.',
      geral: 'No hemos podido terminar ahora. Escríbenos por WhatsApp y lo resolvemos al momento.',
    },
  },

  pronto: {
    rotulo: 'LISTO',
    titulo: 'Revisa tu correo.',
    texto: (email) =>
      `La invitación fue a ${email}. Haz clic para crear tu contraseña y entrar — la cuenta ya está en pie, con el sistema entero abierto.`,
    dica: '¿No llegó en dos minutos? Mira en la carpeta de spam. Si no está, escríbenos y te damos acceso a mano.',
    whatsapp: 'Escribir por WhatsApp',
  },

  depois: {
    titulo: (dias) => `¿Y después de los ${dias} días?`,
    texto: (preco) =>
      `Recibes un aviso por correo antes de que acabe, con el enlace para poner la forma de pago. Si no la pones, la cuenta simplemente se pausa — no se cobra nada, nada se convierte en deuda. Si la pones, son ${preco} al mes por la empresa entera, con los usuarios que quieras.`,
  },
}
