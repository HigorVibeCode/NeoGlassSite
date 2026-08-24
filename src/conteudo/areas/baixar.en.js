/**
 * The install page — English. See baixar.pt.js: what installs is the SYSTEM
 * (app.neoglass.online), not the marketing site, so there's no one-tap install
 * button here. The page opens the app and shows how to keep it as an icon, the
 * real way for each device.
 */
export default {
  rotulo: 'INSTALL',
  titulo: { antes: 'Put NeoGlass', destaque: 'on your screen.' },
  subtitulo:
    'NeoGlass runs in the browser — and you can keep it as an app, with an icon on your screen, full-screen and loading faster. Open the system and follow the steps for your device.',

  abrirInstalar: 'Open NeoGlass',
  abrirNota: 'Opens app.neoglass.online in a new tab — that’s where the system lives.',

  abrir: 'Open NeoGlass',
  jaInstalado: 'Already installed on this device.',

  comoTitulo: 'Once it’s open, keep it as an app:',
  passos: {
    ios: [
      'Tap the Share button in the Safari bar.',
      'Choose “Add to Home Screen”.',
      'Confirm with “Add” — the icon appears on your screen.',
    ],
    android: [
      'In Chrome, tap the ⋮ menu (top right).',
      'Choose “Install app” or “Add to Home screen”.',
      'Confirm — the icon appears on your screen.',
    ],
    desktop: [
      'In Chrome or Edge, click the install icon in the address bar.',
      'Or open the ⋮ menu and choose “Install NeoGlass”.',
      'Confirm — the app opens in its own window.',
    ],
  },
  iosNota:
    'Only works through Safari. If you opened this from another browser or inside an app, tap the three dots and choose “Open in Safari”.',

  motivos: [
    { nome: 'Opens like an app', texto: 'An icon on your screen, full-screen, with no browser bar in the way.' },
    { nome: 'Always up to date', texto: 'Nothing to download again. The newest version arrives on its own.' },
    { nome: 'Loads fast', texto: 'Keeps the essentials on the device and opens even on a weak connection on site.' },
  ],

  mesmaConta:
    'It’s the same account. Installing creates nothing new — it’s the same NeoGlass, the same login, in an icon on your screen.',
}
