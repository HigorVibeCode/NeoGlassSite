export default {
  etiqueta: 'NeoGlass',
  /* O título é uma frase só com o miolo em gradiente. Por isso vem
     partido em três: cada idioma escolhe onde o verde entra. */
  titulo: { antes: 'Mehr', destaque: 'Geld und Verlässlichkeit', depois: 'für alle, die mit Glas arbeiten.' },
  descricao: 'Software für Angebote, Projekte, Zuschnitt und Produktion im Glasgewerbe.',
  /* A frase da marca desceu do topo: virou legenda discreta do título. */
  pergunta: 'Was ist Ihr Betrieb?',
  portas: [
    { id: 'vidracaria', rotulo: 'Ich habe eine Glaserei', texto: 'Offerten, Projekte und Montage' },
    { id: 'industria', rotulo: 'Ich habe eine Fabrik', texto: 'Produktion, Zuschnitt und Veredelung' },
  ],
  painel: 'Ein Blick ins System',
  duvida: 'Ich habe noch Fragen',
  lembrete: {
    vidracaria: 'Sie sehen die Version für Glasereien.',
    industria: 'Sie sehen die Version für Glasfabriken.',
    trocar: 'Wechseln',
  },
}
