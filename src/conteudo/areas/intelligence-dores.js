const pt = {
  heroTexto: 'Encontre vendas paradas, pedidos prontos para sair e o setor que concentra a fila. Pergunte ao NeoGlass Intelligence e veja onde agir, com os dados da sua empresa.',
  fases: ['Vendas paradas', 'Entregas', 'Gargalo'],
  perguntas: ['Quais orçamentos estão parados há mais de 3 dias?', 'Quais pedidos já estão prontos para entregar?', 'Qual setor concentra a maior fila de produção?'],
  respostas: [
    {valor:'8',unidade:'orçamentos sem resposta',detalhe:'Enviados ou visualizados há mais de 3 dias, ainda sem retorno.',origem:'Fonte: orçamentos'},
    {valor:'6',unidade:'pedidos prontos para entregar',detalhe:'Pedidos na fase “Pronto”, aguardando a saída.',origem:'Fonte: expedição'},
    {valor:'18',unidade:'peças na fila da lapidação',detalhe:'A lapidação concentra a maior fila de peças pendentes nesta consulta.',origem:'Fonte: produção'},
  ],
  consultando:['Buscando orçamentos sem resposta…','Buscando pedidos prontos…','Comparando as filas da produção…'],
  conclusoes:['Retome essas conversas para tentar fechar as vendas.','Organize as saídas e avise os clientes.','Confira essa fila antes de redistribuir o trabalho.'],
  diferenciais:[{nome:'Retome vendas paradas',texto:'Encontre orçamentos enviados que ainda não receberam resposta. Saiba quais conversas retomar com o cliente.'},{nome:'Libere pedidos prontos',texto:'Veja o que já pode sair para entrega. Organize a expedição e mantenha o cliente informado.'},{nome:'Encontre a maior fila',texto:'Descubra qual setor concentra peças pendentes. Use esse dado para avaliar onde agir primeiro.'}],
  nota:'Consultas existentes com dados fictícios. As sugestões de ação ilustram o uso das respostas; não são previsão de lucro, caixa ou atraso.',
  fluxo:[
    {onde:'Google Gemini · fora do NeoGlass',titulo:'A IA entende sua pergunta.',texto:'Recebe a pergunta e o contexto para identificar a consulta.'},
    {onde:'Dentro do NeoGlass',titulo:'O NeoGlass busca seus dados.',texto:'Acessa só os registros da empresa que seu usuário pode ver.'},
    {onde:'Na sua tela',titulo:'Você recebe a resposta.',texto:'O resultado vem direto do banco, sem passar pelo Gemini.'},
  ],
}
const en = {
  heroTexto:'Find stalled sales, orders ready to leave and the department with the largest queue. Ask NeoGlass Intelligence where to act, using your company’s data.',
  fases:['Stalled sales','Deliveries','Bottleneck'], perguntas:['Which quotes have had no reply for over 3 days?','Which orders are ready for delivery?','Which department has the largest production queue?'],
  respostas:[{valor:'8',unidade:'quotes without a reply',detalhe:'Sent or viewed over 3 days ago, with no reply yet.',origem:'Source: quotes'},{valor:'6',unidade:'orders ready for delivery',detalhe:'Orders in the Ready stage, waiting to leave.',origem:'Source: dispatch'},{valor:'18',unidade:'pieces waiting at edging',detalhe:'Edging has the largest queue of pending pieces in this query.',origem:'Source: production'}],
  consultando:['Finding unanswered quotes…','Finding ready orders…','Comparing production queues…'],conclusoes:['Follow up on these conversations to try to close the sales.','Arrange dispatch and let customers know.','Check this queue before reallocating work.'],
  diferenciais:[{nome:'Follow up stalled sales',texto:'Find sent quotes without a reply. See which customer conversations to resume.'},{nome:'Dispatch ready orders',texto:'See what is ready for delivery. Organize dispatch and keep the customer informed.'},{nome:'Find the largest queue',texto:'Discover which department has the most pending pieces. Use the figures to assess where to act first.'}],
  nota:'Existing queries with fictional data. Suggested actions illustrate how to use the answers; they are not profit, cash-flow or delay forecasts.',
  fluxo:[{onde:'Google Gemini · outside NeoGlass',titulo:'AI understands your question.',texto:'Receives the question and context to identify the query.'},{onde:'Inside NeoGlass',titulo:'NeoGlass retrieves your data.',texto:'Accesses only company records your user is allowed to see.'},{onde:'On your screen',titulo:'You receive the answer.',texto:'The result comes directly from the database, without passing through Gemini.'}],
}
const es = {
  heroTexto:'Encuentra ventas paradas, pedidos listos para salir y el sector con la mayor cola. Pregunta a NeoGlass Intelligence dónde actuar, con los datos de tu empresa.',
  fases:['Ventas paradas','Entregas','Cuello de botella'],perguntas:['¿Qué presupuestos llevan más de 3 días sin respuesta?','¿Qué pedidos están listos para entregar?','¿Qué sector concentra la mayor cola de producción?'],
  respostas:[{valor:'8',unidade:'presupuestos sin respuesta',detalhe:'Enviados o vistos hace más de 3 días, todavía sin respuesta.',origem:'Fuente: presupuestos'},{valor:'6',unidade:'pedidos listos para entregar',detalhe:'Pedidos en la fase Listo, pendientes de salida.',origem:'Fuente: expedición'},{valor:'18',unidade:'piezas en la cola de canteado',detalhe:'Canteado tiene la mayor cola de piezas pendientes en esta consulta.',origem:'Fuente: producción'}],
  consultando:['Buscando presupuestos sin respuesta…','Buscando pedidos listos…','Comparando colas de producción…'],conclusoes:['Retoma estas conversaciones para intentar cerrar las ventas.','Organiza las salidas y avisa a los clientes.','Revisa esta cola antes de redistribuir el trabajo.'],
  diferenciais:[{nome:'Retoma ventas paradas',texto:'Encuentra presupuestos enviados sin respuesta. Identifica las conversaciones que debes retomar.'},{nome:'Libera pedidos listos',texto:'Mira qué puede salir a entrega. Organiza la expedición y mantén informado al cliente.'},{nome:'Encuentra la mayor cola',texto:'Descubre qué sector acumula piezas pendientes. Usa ese dato para evaluar dónde actuar primero.'}],
  nota:'Consultas existentes con datos ficticios. Las acciones sugeridas ilustran el uso de las respuestas; no son previsiones de beneficio, caja o retrasos.',
  fluxo:[{onde:'Google Gemini · fuera de NeoGlass',titulo:'La IA entiende tu pregunta.',texto:'Recibe la pregunta y el contexto para identificar la consulta.'},{onde:'Dentro de NeoGlass',titulo:'NeoGlass busca tus datos.',texto:'Accede solo a los registros de la empresa que tu usuario puede ver.'},{onde:'En tu pantalla',titulo:'Recibes la respuesta.',texto:'El resultado viene directamente de la base, sin pasar por Gemini.'}],
}
const de = {
  heroTexto:'Finden Sie offene Angebote, lieferbereite Aufträge und die Abteilung mit der längsten Warteschlange. Fragen Sie NeoGlass Intelligence, wo Sie ansetzen können – mit Ihren Firmendaten.',
  fases:['Offene Angebote','Lieferungen','Engpass'],perguntas:['Welche Angebote sind seit über 3 Tagen unbeantwortet?','Welche Aufträge sind lieferbereit?','Welche Abteilung hat die längste Produktionswarteschlange?'],
  respostas:[{valor:'8',unidade:'unbeantwortete Angebote',detalhe:'Vor mehr als 3 Tagen versendet oder angesehen, noch ohne Antwort.',origem:'Quelle: Angebote'},{valor:'6',unidade:'lieferbereite Aufträge',detalhe:'Aufträge in der Phase Fertig, vor dem Versand.',origem:'Quelle: Versand'},{valor:'18',unidade:'wartende Teile im Kantenschliff',detalhe:'Der Kantenschliff hat in dieser Abfrage die längste Warteschlange.',origem:'Quelle: Produktion'}],
  consultando:['Unbeantwortete Angebote werden gesucht…','Lieferbereite Aufträge werden gesucht…','Produktionswarteschlangen werden verglichen…'],conclusoes:['Fassen Sie nach, um diese Angebote zum Abschluss zu bringen.','Organisieren Sie den Versand und informieren Sie die Kunden.','Prüfen Sie diese Warteschlange vor einer Neuverteilung der Arbeit.'],
  diferenciais:[{nome:'Offene Angebote nachfassen',texto:'Finden Sie versendete Angebote ohne Antwort. Erkennen Sie, welche Kundengespräche Sie fortsetzen können.'},{nome:'Fertige Aufträge ausliefern',texto:'Sehen Sie, was lieferbereit ist. Organisieren Sie den Versand und informieren Sie die Kunden.'},{nome:'Die längste Warteschlange finden',texto:'Erkennen Sie, welche Abteilung die meisten offenen Teile hat. Nutzen Sie die Daten zur Priorisierung.'}],
  nota:'Vorhandene Abfragen mit fiktiven Daten. Handlungsvorschläge zeigen mögliche Anwendungen der Antworten; sie sind keine Gewinn-, Liquiditäts- oder Verzögerungsprognosen.',
  fluxo:[{onde:'Google Gemini · außerhalb von NeoGlass',titulo:'Die KI versteht Ihre Frage.',texto:'Sie erhält Frage und Kontext, um die Abfrage zu bestimmen.'},{onde:'Innerhalb von NeoGlass',titulo:'NeoGlass ruft Ihre Daten ab.',texto:'Nur Firmendatensätze, die Ihr Benutzer sehen darf, werden abgerufen.'},{onde:'Auf Ihrem Bildschirm',titulo:'Sie erhalten die Antwort.',texto:'Das Ergebnis kommt direkt aus der Datenbank, ohne Gemini zu durchlaufen.'}],
}
export default {pt,en,es,de}
