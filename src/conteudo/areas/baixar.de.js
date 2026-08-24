/**
 * Die Installationsseite — Deutsch. Siehe baixar.pt.js: Installiert wird das
 * SYSTEM (app.neoglass.online), nicht die Website, also gibt es hier keinen
 * Ein-Tipp-Installations-Knopf. Die Seite öffnet die App und zeigt, wie man sie
 * als Symbol behält — auf dem echten Weg jedes Geräts.
 */
export default {
  rotulo: 'INSTALLIEREN',
  titulo: { antes: 'NeoGlass', destaque: 'auf Ihren Bildschirm.' },
  subtitulo:
    'NeoGlass läuft im Browser — und Sie können es als App behalten, mit Symbol auf dem Bildschirm, im Vollbild und schneller ladend. Öffnen Sie das System und folgen Sie den Schritten für Ihr Gerät.',

  abrirInstalar: 'NeoGlass öffnen',
  abrirNota: 'Öffnet app.neoglass.online in einem neuen Tab — dort lebt das System.',

  abrir: 'NeoGlass öffnen',
  jaInstalado: 'Auf diesem Gerät bereits installiert.',

  comoTitulo: 'Sobald es offen ist, als App behalten:',
  passos: {
    ios: [
      'Tippen Sie auf „Teilen“ in der Safari-Leiste.',
      'Wählen Sie „Zum Home-Bildschirm“.',
      'Bestätigen Sie mit „Hinzufügen“ — das Symbol erscheint auf Ihrem Bildschirm.',
    ],
    android: [
      'Tippen Sie in Chrome auf das Menü ⋮ (oben rechts).',
      'Wählen Sie „App installieren“ oder „Zum Startbildschirm“.',
      'Bestätigen — das Symbol erscheint auf Ihrem Bildschirm.',
    ],
    desktop: [
      'Klicken Sie in Chrome oder Edge auf das Installations-Symbol in der Adressleiste.',
      'Oder öffnen Sie das Menü ⋮ und wählen „NeoGlass installieren“.',
      'Bestätigen — die App öffnet in einem eigenen Fenster.',
    ],
  },
  iosNota:
    'Funktioniert nur über Safari. Wenn Sie dies aus einem anderen Browser oder in einer App geöffnet haben, tippen Sie auf die drei Punkte und wählen „In Safari öffnen“.',

  motivos: [
    { nome: 'Öffnet wie eine App', texto: 'Ein Symbol auf dem Bildschirm, im Vollbild, ohne Browserleiste im Weg.' },
    { nome: 'Immer aktuell', texto: 'Nichts erneut herunterzuladen. Die neueste Version kommt von allein.' },
    { nome: 'Lädt schnell', texto: 'Behält das Wesentliche auf dem Gerät und öffnet auch bei schlechtem Internet auf der Baustelle.' },
  ],

  mesmaConta:
    'Es ist dasselbe Konto. Die Installation schafft nichts Neues — es ist dasselbe NeoGlass, mit demselben Login, in einem Symbol auf Ihrem Bildschirm.',
}
