import roteiro from './intelligence-roteiro.js'
import dores from './intelligence-dores.js'

const pt = {
  hero: {
    rotulo: 'NeoGlass Intelligence · indústria do vidro', verProjeto: 'Ver o Intelligence em ação', etiqueta: 'Sua indústria, com IA integrada',
    titulo: { antes: 'Tecnologia de última geração para', destaque: 'a indústria do vidro.' },
    texto: 'Pergunte ao NeoGlass Intelligence. Veja onde a produção parou, quanto vendeu e o que falta entregar — com os números do seu sistema.',
  },
  diferenciais: {
    rotulo: 'Menos tempo procurando. Mais clareza para decidir.', titulo: 'A resposta que você precisa, na hora de decidir.',
    itens: [
      { nome: 'Encontre o gargalo', texto: 'Consulte as peças paradas e os setores que concentram trabalho. Vá direto ao ponto que precisa da sua atenção.' },
      { nome: 'Saiba como estão as vendas', texto: 'Consulte valores por período e compare o desempenho. Os números vêm do banco da sua empresa.' },
      { nome: 'Veja o que falta entregar', texto: 'Encontre os pedidos que aguardam entrega e acompanhe a expedição sem procurar em várias telas.' },
    ],
  },
  chamada: { rotulo: 'Conheça o Intelligence', titulo: 'Traga as perguntas que você faz todo dia.', texto: 'Em 20 minutos, veja como consultar sua operação e entenda o que o NeoGlass pode responder para a sua indústria.', passos: ['Você mostra o que precisa acompanhar', 'Nós demonstramos as consultas no sistema', 'Você avalia o que muda na sua rotina'] },
  demo: {
    tabs: ['Minha empresa agora', 'Como os dados são protegidos'],
    rotulo: 'Demonstração ilustrativa · dados de exemplo',
    play: 'Reproduzir', pause: 'Pausar', replay: 'Ver novamente',
    consultas: 'Sequência de consultas', pergunta: 'Você pergunta',
    fases: ['Produção', 'Vendas', 'Expedição'],
    perguntas: ['Onde está o gargalo da produção?', 'Quanto vendemos neste mês?', 'Quantos pedidos faltam entregar?'],
    respostas: [
      { valor: '18', unidade: 'peças na lapidação', detalhe: 'Setor com a maior fila nesta consulta.', origem: 'Fonte: produção' },
      { valor: 'R$ 86.400', unidade: 'em vendas no mês', detalhe: 'Valor dos pedidos no período consultado.', origem: 'Fonte: pedidos' },
      { valor: '6', unidade: 'pedidos a entregar', detalhe: 'Pedidos aguardando entrega nesta consulta.', origem: 'Fonte: expedição' },
    ],
    abertura: 'Sua fábrica tem as respostas.', fecho: 'Agora você sabe onde olhar.',
    resumoTitulo: 'Sua operação, em três respostas.',
    resumo: 'Produção, vendas e entregas. Consulte, entenda e decida.',
    nota: 'Sequência ilustrativa de três consultas existentes. Valores fictícios. Vendas não representam saldo de caixa.',
    seguranca: {
      titulo: 'A IA interpreta. O NeoGlass consulta.',
      subtitulo: 'O banco é acessado com as permissões do usuário. O resultado da consulta volta direto à tela.',
      externo: 'Provedor de IA · Google Gemini', modelo: 'Interpreta a pergunta', enviado: 'Pergunta + contexto da conversa', retorno: 'Instrução de consulta',
      limite: 'Dentro do NeoGlass', permissao: 'Permissões do usuário', banco: 'Banco da sua empresa', resultado: 'Resultado na sua tela', bloqueio: 'Resultados do banco não vão ao modelo neste fluxo',
      passos: ['A pergunta pode ser enviada à IA para identificar a consulta.', 'NeoGlass valida a consulta e as permissões de quem perguntou.', 'O banco retorna somente os registros permitidos para esse usuário.', 'Os números vão direto à sua tela, sem voltar ao modelo de IA.'],
      nota: 'A pergunta e o contexto podem conter informações que você digitou e ser enviados ao Gemini. O acesso aos registros da empresa respeita as permissões do usuário.',
    },
  },
}

const en = {
  hero: { rotulo: 'NeoGlass Intelligence · glass industry', verProjeto: 'See Intelligence in action', etiqueta: 'Your factory, with integrated AI', titulo: { antes: 'Next-generation technology for', destaque: 'the glass industry.' }, texto: 'Ask NeoGlass Intelligence. See where production has stalled, how much you sold and what still needs delivery — using numbers from your system.' },
  diferenciais: { rotulo: 'Less searching. Clearer decisions.', titulo: 'The answer you need when it is time to decide.', itens: [
    { nome: 'Find the bottleneck', texto: 'Check stalled pieces and the departments with the largest queues. Go straight to the area that needs attention.' },
    { nome: 'Understand sales', texto: 'Query sales by period and compare performance. Numbers come from your company database.' },
    { nome: 'See what needs delivery', texto: 'Find orders waiting for delivery and follow dispatch without searching through multiple screens.' },
  ] },
  chamada: { rotulo: 'Meet Intelligence', titulo: 'Bring the questions you ask every day.', texto: 'In 20 minutes, see how to query your operation and learn what NeoGlass can answer for your factory.', passos: ['Show us what you need to track', 'We demonstrate queries in the system', 'You assess the impact on your daily work'] },
  demo: {
    tabs: ['My business now', 'How data is protected'], rotulo: 'Illustrative demonstration · sample data', play: 'Play', pause: 'Pause', replay: 'Replay', consultas: 'Query sequence', pergunta: 'You ask', fases: ['Production', 'Sales', 'Dispatch'], perguntas: ['Where is the production bottleneck?', 'How much did we sell this month?', 'How many orders still need delivery?'],
    respostas: [
      { valor: '18', unidade: 'pieces at edging', detalhe: 'Department with the largest queue in this query.', origem: 'Source: production' },
      { valor: 'R$86,400', unidade: 'in sales this month', detalhe: 'Order value for the selected period.', origem: 'Source: orders' },
      { valor: '6', unidade: 'orders to deliver', detalhe: 'Orders awaiting delivery in this query.', origem: 'Source: dispatch' },
    ], abertura: 'Your factory has the answers.', fecho: 'Now you know where to look.', resumoTitulo: 'Your operation in three answers.', resumo: 'Production, sales and deliveries. Query, understand and decide.', nota: 'Illustrative sequence of three existing queries. Fictional figures in BRL. Sales do not represent cash balance.',
    seguranca: { titulo: 'AI interprets. NeoGlass queries.', subtitulo: 'Database access uses the user’s permissions. Query results return directly to the screen.', externo: 'AI provider · Google Gemini', modelo: 'Interprets the question', enviado: 'Question + conversation context', retorno: 'Query instruction', limite: 'Inside NeoGlass', permissao: 'User permissions', banco: 'Your company database', resultado: 'Results on your screen', bloqueio: 'Database results are not sent to the model in this flow', passos: ['The question may be sent to AI to identify the query.', 'NeoGlass validates the query and the user’s permissions.', 'The database returns only records available to that user.', 'Numbers go directly to your screen without returning to the AI model.'], nota: 'Company isolation and access control. Questions and context can contain information you typed and may be sent to Gemini. This is not fully local processing or a sandbox guarantee.' },
  },
}
const es = {
  hero: { rotulo: 'NeoGlass Intelligence · industria del vidrio', verProjeto: 'Ver Intelligence en acción', etiqueta: 'Tu industria, con IA integrada', titulo: { antes: 'Tecnología de última generación para', destaque: 'la industria del vidrio.' }, texto: 'Pregunta a NeoGlass Intelligence. Mira dónde se detuvo la producción, cuánto vendiste y qué falta entregar, con los números de tu sistema.' },
  diferenciais: { rotulo: 'Menos búsquedas. Más claridad para decidir.', titulo: 'La respuesta que necesitas cuando toca decidir.', itens: [
    { nome: 'Encuentra el cuello de botella', texto: 'Consulta las piezas paradas y los sectores que acumulan trabajo. Ve directamente al punto que necesita atención.' },
    { nome: 'Conoce tus ventas', texto: 'Consulta valores por período y compara resultados. Los números vienen de la base de datos de tu empresa.' },
    { nome: 'Mira qué falta entregar', texto: 'Encuentra los pedidos pendientes de entrega y sigue la expedición sin buscar en varias pantallas.' },
  ] },
  chamada: { rotulo: 'Conoce Intelligence', titulo: 'Trae las preguntas que haces cada día.', texto: 'En 20 minutos, descubre cómo consultar tu operación y qué puede responder NeoGlass para tu industria.', passos: ['Muestras lo que necesitas seguir', 'Demostramos las consultas en el sistema', 'Evalúas qué cambia en tu rutina'] },
  demo: {
    tabs: ['Mi empresa ahora', 'Cómo se protegen los datos'], rotulo: 'Demostración ilustrativa · datos de ejemplo', play: 'Reproducir', pause: 'Pausar', replay: 'Ver de nuevo', consultas: 'Secuencia de consultas', pergunta: 'Tú preguntas', fases: ['Producción', 'Ventas', 'Expedición'], perguntas: ['¿Dónde está el cuello de botella?', '¿Cuánto vendimos este mes?', '¿Cuántos pedidos faltan por entregar?'],
    respostas: [
      { valor: '18', unidade: 'piezas en canteado', detalhe: 'Sector con la mayor cola en esta consulta.', origem: 'Fuente: producción' },
      { valor: 'R$ 86.400', unidade: 'en ventas del mes', detalhe: 'Valor de los pedidos del período consultado.', origem: 'Fuente: pedidos' },
      { valor: '6', unidade: 'pedidos por entregar', detalhe: 'Pedidos pendientes de entrega en esta consulta.', origem: 'Fuente: expedición' },
    ], abertura: 'Tu fábrica tiene las respuestas.', fecho: 'Ahora sabes dónde mirar.', resumoTitulo: 'Tu operación, en tres respuestas.', resumo: 'Producción, ventas y entregas. Consulta, entiende y decide.', nota: 'Secuencia ilustrativa de tres consultas existentes. Cifras ficticias en BRL. Ventas no equivale a saldo de caja.',
    seguranca: { titulo: 'La IA interpreta. NeoGlass consulta.', subtitulo: 'El acceso a la base de datos usa los permisos del usuario. El resultado vuelve directamente a la pantalla.', externo: 'Proveedor de IA · Google Gemini', modelo: 'Interpreta la pregunta', enviado: 'Pregunta + contexto de la conversación', retorno: 'Instrucción de consulta', limite: 'Dentro de NeoGlass', permissao: 'Permisos del usuario', banco: 'Base de datos de tu empresa', resultado: 'Resultado en tu pantalla', bloqueio: 'Los resultados de la base no van al modelo en este flujo', passos: ['La pregunta puede enviarse a la IA para identificar la consulta.', 'NeoGlass valida la consulta y los permisos de quien pregunta.', 'La base devuelve solo los registros permitidos para ese usuario.', 'Los números van directamente a tu pantalla, sin volver al modelo de IA.'], nota: 'Aislamiento por empresa y control de acceso. La pregunta y el contexto pueden contener información que escribiste y enviarse a Gemini. No es procesamiento totalmente local ni una garantía de sandbox.' },
  },
}
const de = {
  hero: { rotulo: 'NeoGlass Intelligence · Glasindustrie', verProjeto: 'Intelligence in Aktion sehen', etiqueta: 'Ihre Fabrik mit integrierter KI', titulo: { antes: 'Technologie der neuesten Generation für', destaque: 'die Glasindustrie.' }, texto: 'Fragen Sie NeoGlass Intelligence. Sehen Sie, wo die Produktion stockt, wie viel Sie verkauft haben und was noch geliefert werden muss – mit Zahlen aus Ihrem System.' },
  diferenciais: { rotulo: 'Weniger suchen. Klarer entscheiden.', titulo: 'Die passende Antwort, wenn eine Entscheidung ansteht.', itens: [
    { nome: 'Engpässe finden', texto: 'Prüfen Sie wartende Teile und Abteilungen mit großen Rückständen. Gehen Sie direkt zum Punkt, der Aufmerksamkeit braucht.' },
    { nome: 'Verkäufe verstehen', texto: 'Fragen Sie Werte je Zeitraum ab und vergleichen Sie die Entwicklung. Die Zahlen stammen aus Ihrer Firmendatenbank.' },
    { nome: 'Offene Lieferungen sehen', texto: 'Finden Sie Aufträge vor der Auslieferung und verfolgen Sie den Versand ohne lange Suche in verschiedenen Ansichten.' },
  ] },
  chamada: { rotulo: 'Intelligence kennenlernen', titulo: 'Bringen Sie Ihre täglichen Fragen mit.', texto: 'Sehen Sie in 20 Minuten, wie Sie Ihren Betrieb abfragen und welche Antworten NeoGlass für Ihre Fabrik bietet.', passos: ['Sie zeigen, was Sie verfolgen möchten', 'Wir führen die Abfragen vor', 'Sie bewerten den Nutzen für Ihren Alltag'] },
  demo: {
    tabs: ['Mein Betrieb jetzt', 'So werden Daten geschützt'], rotulo: 'Illustrative Vorführung · Beispieldaten', play: 'Abspielen', pause: 'Pause', replay: 'Erneut ansehen', consultas: 'Abfragesequenz', pergunta: 'Ihre Frage', fases: ['Produktion', 'Verkäufe', 'Versand'], perguntas: ['Wo liegt der Produktionsengpass?', 'Wie viel haben wir diesen Monat verkauft?', 'Wie viele Aufträge sind noch zu liefern?'],
    respostas: [
      { valor: '18', unidade: 'Teile im Kantenschliff', detalhe: 'Abteilung mit der längsten Warteschlange dieser Abfrage.', origem: 'Quelle: Produktion' },
      { valor: 'R$ 86.400', unidade: 'Verkaufswert im Monat', detalhe: 'Auftragswert im abgefragten Zeitraum.', origem: 'Quelle: Aufträge' },
      { valor: '6', unidade: 'offene Lieferaufträge', detalhe: 'Aufträge vor Auslieferung in dieser Abfrage.', origem: 'Quelle: Versand' },
    ], abertura: 'Ihre Fabrik hat die Antworten.', fecho: 'Jetzt wissen Sie, wo Sie ansetzen.', resumoTitulo: 'Ihr Betrieb in drei Antworten.', resumo: 'Produktion, Verkäufe und Lieferungen. Fragen, verstehen und entscheiden.', nota: 'Illustrative Folge von drei vorhandenen Abfragen. Fiktive Werte in BRL. Verkaufswert ist kein Kassenbestand.',
    seguranca: { titulo: 'Die KI interpretiert. NeoGlass fragt ab.', subtitulo: 'Der Datenbankzugriff nutzt die Rechte des Benutzers. Ergebnisse gehen direkt an den Bildschirm.', externo: 'KI-Anbieter · Google Gemini', modelo: 'Interpretiert die Frage', enviado: 'Frage + Gesprächskontext', retorno: 'Abfrageanweisung', limite: 'Innerhalb von NeoGlass', permissao: 'Benutzerrechte', banco: 'Ihre Firmendatenbank', resultado: 'Ergebnis auf Ihrem Bildschirm', bloqueio: 'Datenbankergebnisse gehen in diesem Ablauf nicht an das Modell', passos: ['Die Frage kann zur Auswahl der Abfrage an die KI gehen.', 'NeoGlass prüft die Abfrage und die Rechte des Benutzers.', 'Die Datenbank liefert nur für diesen Benutzer freigegebene Datensätze.', 'Die Zahlen gehen direkt an Ihren Bildschirm, nicht zurück an das KI-Modell.'], nota: 'Mandantentrennung und Zugriffskontrolle. Fragen und Kontext können eingegebene Informationen enthalten und an Gemini gesendet werden. Das ist weder rein lokale Verarbeitung noch eine Sandbox-Garantie.' },
  },
}

for (const [idioma, texto] of Object.entries({ pt, en, es, de })) {
  const d = dores[idioma]
  texto.hero.texto = d.heroTexto
  texto.diferenciais.itens = d.diferenciais
  Object.assign(texto.demo, { fases:d.fases, perguntas:d.perguntas, respostas:d.respostas, nota:d.nota })
  texto.demo.animacao = { ...roteiro[idioma], consultando:d.consultando, conclusoes:d.conclusoes, fluxo:d.fluxo,
    protecao:[roteiro[idioma].protecao[0], ...d.fluxo],
  }
  const fecho = {
    pt:['Os dados consultados da sua empresa não são enviados à IA.','O Gemini interpreta a pergunta e o contexto digitado. O resultado da consulta fica no NeoGlass.'],
    en:['Your retrieved company data is not sent to AI.','Gemini interprets your question and typed context. Query results stay in NeoGlass.'],
    es:['Los datos consultados de tu empresa no se envían a la IA.','Gemini interpreta la pregunta y el contexto escrito. El resultado de la consulta queda en NeoGlass.'],
    de:['Die abgefragten Firmendaten werden nicht an die KI gesendet.','Gemini interpretiert Ihre Frage und den eingegebenen Kontext. Das Abfrageergebnis bleibt in NeoGlass.'],
  }[idioma]
  texto.demo.animacao.visual = {...roteiro[idioma].visual,naoEnvia:fecho[0],limite:fecho[1]}
}

export default { pt, en, es, de }
