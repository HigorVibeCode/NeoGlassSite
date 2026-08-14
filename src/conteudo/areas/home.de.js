export default {
  etiqueta: 'Software für Flachglas',
  titulo: { antes: 'Glas, das Sie nicht kaufen,', destaque: 'ist Gewinn.' },
  texto:
    'Angebot, Schnittplan, Reststückverwaltung und Produktion in einem System. Wählen Sie Ihren Einstieg:',
  portas: [
    {
      id: 'vidracaria',
      rotulo: 'Ich habe eine Glaserei',
      texto: 'Ich messe die Öffnung, schicke das Angebot, kaufe die Tafel und montiere.',
      marcas: ['Angebot als PDF vor Ort', 'Fester Monatspreis', '14 Tage kostenlos'],
      acao: 'Was sich für mich ändert',
    },
    {
      id: 'industria',
      rotulo: 'Ich habe eine Glasfabrik',
      texto: 'Ich schneide Tafeln, veredle sie und liefere an andere Betriebe.',
      marcas: ['Optimierung mit Reststücken', 'Teileverfolgung', 'Vorführung mit Ihrem Auftrag'],
      acao: 'Was sich für mich ändert',
    },
  ],
  painel: 'Ein Blick ins System',
  duvida: 'Ich weiß nicht, was auf mich zutrifft',
  lembrete: {
    vidracaria: 'Sie sehen die Version für Glasereien.',
    industria: 'Sie sehen die Version für Glasfabriken.',
    trocar: 'Wechseln',
  },
}
