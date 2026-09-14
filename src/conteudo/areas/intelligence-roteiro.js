const pt = {
  demo: 'Demonstração', convite: 'É só perguntar. Acompanhe as respostas.', titulo: 'Perguntou. Entendeu. Decidiu.',
  automatico: 'A apresentação continua', ponteSeguranca: 'E como seus dados são protegidos?', ponteEmpresa: 'Sua empresa. Respostas na hora.',
  escolha: 'Escolher consulta de exemplo', etapas: ['Você digita a pergunta.', 'O Intelligence consulta seu sistema.', 'A resposta aparece. Simples assim.'],
  pergunte: 'O que você quer saber?', semTelas: 'Sem procurar em menus. Pergunte do seu jeito.',
  consultando: ['Consultando a produção…', 'Consultando as vendas do mês…', 'Consultando as entregas…'], consultado: 'Consulta concluída',
  conclusoes: ['Você já sabe qual setor concentra a fila.', 'O total do mês, sem montar uma planilha.', 'Você já sabe quantos pedidos faltam entregar.'],
  enviar: 'Enviar a pergunta de exemplo', proxima: 'Faça outra pergunta…', final: 'Três perguntas. Sua operação mais clara.',
  protecaoConvite: 'Acompanhe uma consulta, do início ao fim.', protecaoTitulo: 'Para onde vão os seus dados?', mesmaPergunta: 'Vamos seguir esta pergunta.', acompanhe: 'Você vai ver o que sai e o que fica no NeoGlass.',
  caminho: 'O caminho desta consulta', suaTela: 'Sua tela', suaEmpresa: 'Sua empresa', etapasLabel: 'Explorar as etapas da proteção',
  protecao: [
    { rotulo: '01 · Você pergunta', titulo: 'Tudo começa com a sua pergunta.', texto: 'Quantos pedidos faltam entregar?' },
    { rotulo: '02 · Interpretação · Google Gemini', titulo: 'A IA recebe a pergunta.', texto: 'A pergunta e o contexto da conversa vão ao Gemini, que identifica qual consulta usar.' },
    { rotulo: '03 · Controle de acesso · NeoGlass', titulo: 'O NeoGlass confere seu acesso.', texto: 'Antes de consultar, o sistema valida a consulta e as permissões de quem perguntou.' },
    { rotulo: '04 · Banco de dados · NeoGlass', titulo: 'Agora, consulta a sua empresa.', texto: 'O banco retorna apenas os registros da empresa que o seu usuário tem permissão para ver.' },
    { rotulo: '05 · Resposta · Sua tela', titulo: 'Os números chegam até você.', texto: 'O resultado sai do banco e vai direto para a tela do NeoGlass.' },
    { rotulo: '06 · Resultado protegido neste fluxo', titulo: 'Esses números não voltam à IA.', texto: 'O Gemini interpreta a pergunta. O resultado desta consulta não é enviado ao modelo.' },
  ],
}
const en = {
  demo: 'Demo', convite: 'Just ask. Watch the answers appear.', titulo: 'Ask. Understand. Decide.', escolha: 'Choose a sample query',
  automatico: 'The presentation continues', ponteSeguranca: 'And how is your data protected?', ponteEmpresa: 'Your business. Answers when you need them.',
  etapas: ['You type a question.', 'Intelligence queries your system.', 'The answer appears. That simple.'], pergunte: 'What would you like to know?', semTelas: 'No searching through menus. Ask in your own words.',
  consultando: ['Checking production…', 'Checking this month’s sales…', 'Checking deliveries…'], consultado: 'Query complete', conclusoes: ['You know which department has the largest queue.', 'The monthly total without building a spreadsheet.', 'You know how many orders still need delivery.'],
  enviar: 'Send the sample question', proxima: 'Ask another question…', final: 'Three questions. A clearer view of your operation.',
  protecaoConvite: 'Follow one query from start to finish.', protecaoTitulo: 'Where does your data go?', mesmaPergunta: 'Let’s follow this question.', acompanhe: 'See what leaves and what stays in NeoGlass.', caminho: 'The path of this query', suaTela: 'Your screen', suaEmpresa: 'Your company', etapasLabel: 'Explore the protection steps',
  protecao: [
    { rotulo: '01 · You ask', titulo: 'It starts with your question.', texto: 'How many orders still need delivery?' },
    { rotulo: '02 · Interpretation · Google Gemini', titulo: 'AI receives the question.', texto: 'The question and conversation context go to Gemini to identify which query to use.' },
    { rotulo: '03 · Access control · NeoGlass', titulo: 'NeoGlass checks your access.', texto: 'Before querying, the system validates the query and the permissions of the person asking.' },
    { rotulo: '04 · Database · NeoGlass', titulo: 'It queries your company’s records.', texto: 'The database returns only company records your user has permission to see.' },
    { rotulo: '05 · Answer · Your screen', titulo: 'The numbers reach you.', texto: 'The result goes from the database directly to your NeoGlass screen.' },
    { rotulo: '06 · Protected results in this flow', titulo: 'These numbers do not go back to AI.', texto: 'Gemini interprets the question. The result of this query is not sent to the model.' },
  ],
}
const es = {
  demo: 'Demostración', convite: 'Solo pregunta. Mira cómo aparecen las respuestas.', titulo: 'Pregunta. Entiende. Decide.', escolha: 'Elegir consulta de ejemplo',
  automatico: 'La presentación continúa', ponteSeguranca: '¿Y cómo se protegen tus datos?', ponteEmpresa: 'Tu empresa. Respuestas al momento.',
  etapas: ['Escribes la pregunta.', 'Intelligence consulta tu sistema.', 'Aparece la respuesta. Así de simple.'], pergunte: '¿Qué quieres saber?', semTelas: 'Sin buscar en menús. Pregunta con tus palabras.',
  consultando: ['Consultando la producción…', 'Consultando las ventas del mes…', 'Consultando las entregas…'], consultado: 'Consulta completada', conclusoes: ['Ya sabes qué sector concentra la cola.', 'El total del mes, sin crear una hoja de cálculo.', 'Ya sabes cuántos pedidos faltan por entregar.'],
  enviar: 'Enviar la pregunta de ejemplo', proxima: 'Haz otra pregunta…', final: 'Tres preguntas. Tu operación más clara.',
  protecaoConvite: 'Sigue una consulta de principio a fin.', protecaoTitulo: '¿Adónde van tus datos?', mesmaPergunta: 'Sigamos esta pregunta.', acompanhe: 'Verás qué sale y qué queda en NeoGlass.', caminho: 'El camino de esta consulta', suaTela: 'Tu pantalla', suaEmpresa: 'Tu empresa', etapasLabel: 'Explorar los pasos de protección',
  protecao: [
    { rotulo: '01 · Preguntas', titulo: 'Todo empieza con tu pregunta.', texto: '¿Cuántos pedidos faltan por entregar?' },
    { rotulo: '02 · Interpretación · Google Gemini', titulo: 'La IA recibe la pregunta.', texto: 'La pregunta y el contexto de la conversación van a Gemini, que identifica la consulta a utilizar.' },
    { rotulo: '03 · Control de acceso · NeoGlass', titulo: 'NeoGlass comprueba tu acceso.', texto: 'Antes de consultar, el sistema valida la consulta y los permisos de quien pregunta.' },
    { rotulo: '04 · Base de datos · NeoGlass', titulo: 'Consulta los datos de tu empresa.', texto: 'La base devuelve solo los registros de la empresa que tu usuario tiene permiso para ver.' },
    { rotulo: '05 · Respuesta · Tu pantalla', titulo: 'Los números llegan a ti.', texto: 'El resultado sale de la base y va directamente a tu pantalla de NeoGlass.' },
    { rotulo: '06 · Resultado protegido en este flujo', titulo: 'Estos números no vuelven a la IA.', texto: 'Gemini interpreta la pregunta. El resultado de esta consulta no se envía al modelo.' },
  ],
}
const de = {
  demo: 'Vorführung', convite: 'Einfach fragen. Sehen Sie die Antworten.', titulo: 'Fragen. Verstehen. Entscheiden.', escolha: 'Beispielabfrage wählen',
  automatico: 'Die Präsentation geht weiter', ponteSeguranca: 'Und wie werden Ihre Daten geschützt?', ponteEmpresa: 'Ihr Betrieb. Antworten im richtigen Moment.',
  etapas: ['Sie tippen eine Frage.', 'Intelligence fragt Ihr System ab.', 'Die Antwort erscheint. So einfach.'], pergunte: 'Was möchten Sie wissen?', semTelas: 'Keine Menüsuche. Fragen Sie in Ihren Worten.',
  consultando: ['Produktion wird abgefragt…', 'Monatsverkäufe werden abgefragt…', 'Lieferungen werden abgefragt…'], consultado: 'Abfrage abgeschlossen', conclusoes: ['Sie wissen, wo sich die Arbeit staut.', 'Der Monatswert, ohne eine Tabelle anzulegen.', 'Sie wissen, wie viele Aufträge noch zu liefern sind.'],
  enviar: 'Beispielfrage senden', proxima: 'Stellen Sie eine weitere Frage…', final: 'Drei Fragen. Mehr Überblick über Ihren Betrieb.',
  protecaoConvite: 'Verfolgen Sie eine Abfrage von Anfang bis Ende.', protecaoTitulo: 'Wohin gehen Ihre Daten?', mesmaPergunta: 'Verfolgen wir diese Frage.', acompanhe: 'Sehen Sie, was NeoGlass verlässt und was bleibt.', caminho: 'Der Weg dieser Abfrage', suaTela: 'Ihr Bildschirm', suaEmpresa: 'Ihre Firma', etapasLabel: 'Schutzschritte erkunden',
  protecao: [
    { rotulo: '01 · Ihre Frage', titulo: 'Es beginnt mit Ihrer Frage.', texto: 'Wie viele Aufträge sind noch zu liefern?' },
    { rotulo: '02 · Interpretation · Google Gemini', titulo: 'Die KI erhält die Frage.', texto: 'Frage und Gesprächskontext gehen an Gemini, um die passende Abfrage zu bestimmen.' },
    { rotulo: '03 · Zugriffskontrolle · NeoGlass', titulo: 'NeoGlass prüft Ihren Zugriff.', texto: 'Vor dem Abruf prüft das System die Abfrage und die Rechte des Benutzers.' },
    { rotulo: '04 · Datenbank · NeoGlass', titulo: 'Die Firmendaten werden abgefragt.', texto: 'Die Datenbank liefert nur Firmendatensätze, die Ihr Benutzer sehen darf.' },
    { rotulo: '05 · Antwort · Ihr Bildschirm', titulo: 'Die Zahlen erreichen Sie.', texto: 'Das Ergebnis geht aus der Datenbank direkt an Ihren NeoGlass-Bildschirm.' },
    { rotulo: '06 · Geschütztes Ergebnis in diesem Ablauf', titulo: 'Diese Zahlen gehen nicht zurück zur KI.', texto: 'Gemini interpretiert die Frage. Das Ergebnis dieser Abfrage wird nicht an das Modell gesendet.' },
  ],
}
pt.visual = { pergunta: 'Sua pergunta', contexto: '+ contexto da conversa', interpreta: 'Entende o pedido', instrucao: 'Indica qual consulta usar', acesso: 'Acesso verificado', banco: 'Banco de dados', direto: 'Resultado direto', naoEnvia: 'O resultado não é enviado ao Gemini.', legendas: ['A pergunta vai à IA para ser interpretada.', 'O NeoGlass verifica a consulta e o seu acesso.', 'A consulta busca os registros permitidos da sua empresa.', 'Os números vêm do banco direto para a sua tela.', 'Pergunta na IA. Resultado da consulta no NeoGlass.'] }
en.visual = { pergunta: 'Your question', contexto: '+ conversation context', interpreta: 'Understands the request', instrucao: 'Identifies which query to use', acesso: 'Access checked', banco: 'Database', direto: 'Direct result', naoEnvia: 'The result is not sent to Gemini.', legendas: ['The question goes to AI for interpretation.', 'NeoGlass checks the query and your access.', 'The query retrieves permitted company records.', 'Numbers go directly from the database to your screen.', 'Question to AI. Query result in NeoGlass.'] }
es.visual = { pergunta: 'Tu pregunta', contexto: '+ contexto de la conversación', interpreta: 'Entiende lo que pides', instrucao: 'Indica qué consulta utilizar', acesso: 'Acceso verificado', banco: 'Base de datos', direto: 'Resultado directo', naoEnvia: 'El resultado no se envía a Gemini.', legendas: ['La pregunta va a la IA para interpretarla.', 'NeoGlass verifica la consulta y tu acceso.', 'La consulta busca los registros permitidos de tu empresa.', 'Los números van de la base directamente a tu pantalla.', 'Pregunta en la IA. Resultado de la consulta en NeoGlass.'] }
de.visual = { pergunta: 'Ihre Frage', contexto: '+ Gesprächskontext', interpreta: 'Versteht die Anfrage', instrucao: 'Bestimmt die passende Abfrage', acesso: 'Zugriff geprüft', banco: 'Datenbank', direto: 'Direktes Ergebnis', naoEnvia: 'Das Ergebnis wird nicht an Gemini gesendet.', legendas: ['Die Frage geht zur Interpretation an die KI.', 'NeoGlass prüft Abfrage und Zugriffsrechte.', 'Die Abfrage lädt erlaubte Datensätze Ihrer Firma.', 'Die Zahlen kommen direkt aus der Datenbank auf Ihren Bildschirm.', 'Frage an die KI. Abfrageergebnis in NeoGlass.'] }
export default { pt, en, es, de }
