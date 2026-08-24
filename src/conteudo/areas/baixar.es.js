/**
 * La página de instalar — español. Ver baixar.pt.js: lo que se instala es el
 * SISTEMA (app.neoglass.online), no el sitio, así que aquí no hay botón de
 * instalar de un toque. La página abre el app y enseña a dejarlo como icono,
 * por el camino real de cada dispositivo.
 */
export default {
  rotulo: 'INSTALAR',
  titulo: { antes: 'Lleva NeoGlass', destaque: 'a tu pantalla.' },
  subtitulo:
    'NeoGlass funciona en el navegador — y puedes dejarlo como app, con icono en la pantalla, a pantalla completa y cargando más rápido. Abre el sistema y sigue los pasos de tu dispositivo.',

  abrirInstalar: 'Abrir NeoGlass',
  abrirNota: 'Abre app.neoglass.online en una pestaña nueva — ahí vive el sistema.',

  abrir: 'Abrir NeoGlass',
  jaInstalado: 'Ya está instalado en este dispositivo.',

  comoTitulo: 'Una vez abierto, déjalo como app:',
  passos: {
    ios: [
      'Toca el botón Compartir, en la barra de Safari.',
      'Elige “Añadir a pantalla de inicio”.',
      'Confirma en “Añadir” — el icono aparece en tu pantalla.',
    ],
    android: [
      'En Chrome, toca el menú ⋮ (arriba a la derecha).',
      'Elige “Instalar app” o “Añadir a pantalla de inicio”.',
      'Confirma — el icono aparece en tu pantalla.',
    ],
    desktop: [
      'En Chrome o Edge, toca el icono de instalar en la barra de direcciones.',
      'O abre el menú ⋮ y elige “Instalar NeoGlass”.',
      'Confirma — el app abre en su propia ventana.',
    ],
  },
  iosNota:
    'Solo funciona por Safari. Si lo abriste desde otro navegador o dentro de una app, toca los tres puntos y elige “Abrir en Safari”.',

  motivos: [
    { nome: 'Abre como app', texto: 'Un icono en la pantalla, a pantalla completa, sin la barra del navegador en medio.' },
    { nome: 'Siempre actualizado', texto: 'Nada que descargar de nuevo. La versión más nueva entra sola.' },
    { nome: 'Carga rápido', texto: 'Guarda lo esencial en el dispositivo y abre incluso con mala conexión en la obra.' },
  ],

  mesmaConta:
    'Es la misma cuenta. Instalar no crea nada nuevo — es el mismo NeoGlass, con el mismo acceso, en un icono en tu pantalla.',
}
