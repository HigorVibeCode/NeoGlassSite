const pt = {
  rotulo: 'Simule sua renda com o NeoGlass', titulo: 'Você indica uma vez. A comissão pode continuar por 12 meses.',
  texto: 'Receba pela primeira mensalidade e continue participando dos pagamentos seguintes do cliente indicado.',
  modos: ['Uma turma de clientes', 'Novos clientes todo mês'], quantidade: ['Clientes que contratam e pagam', 'Novos clientes pagantes por mês'],
  base: p => `Exemplo com o plano Vidraçaria de ${p}/mês, no Brasil.`,
  cenario: (n, repetido) => repetido ? `${n} novas contratações por mês` : `${n} clientes contratando no primeiro mês`,
  mes1: 'No 1º mês', mes2: 'No 2º mês', mes12: 'No 12º mês', total: 'Total nos primeiros 12 meses',
  primeira: '100% da primeira mensalidade', acumulando: 'Novas contratações + comissões anteriores', mesmaTurma: 'Comissão dos mesmos clientes',
  resumo: (n, v) => `Sem novas indicações, os mesmos ${n} clientes podem gerar ${v} por mês, do 2º ao 12º mês.`,
  resumoMensal: (n, v) => `Com ${n} novos clientes pagantes por mês, a comissão mensal pode chegar a ${v} no 12º mês.`,
  condicao: 'Simulação de comissão bruta, sem descontar impostos ou custos do parceiro. Supõe contratações no início de cada mês, preço constante e todos os clientes ativos e em dia. Cada cliente gera comissão até a 12ª mensalidade. Não é garantia de renda. Aprovação e contrato de parceria definem as condições finais.',
  detalhes: 'Ver a conta mês a mês', mes: 'Mês', entrada: 'Primeiras mensalidades', recorrencia: 'Continuidade', soma: 'Comissão do mês',
  acao: 'Quero indicar o NeoGlass',
}
const en = {
  rotulo: 'Estimate your NeoGlass income', titulo: 'Refer once. Commission can continue for 12 months.', texto: 'Earn on the first monthly payment and keep receiving commission on later payments from the referred customer.',
  modos: ['One group of customers', 'New customers every month'], quantidade: ['Customers who subscribe and pay', 'New paying customers per month'], base: p => `Example using the ${p}/month Glazier plan in Brazil.`, cenario: (n, r) => r ? `${n} new subscriptions per month` : `${n} customers subscribing in month one`,
  mes1: 'Month 1', mes2: 'Month 2', mes12: 'Month 12', total: 'Total in the first 12 months', primeira: '100% of the first monthly payment', acumulando: 'New subscriptions + earlier commissions', mesmaTurma: 'Commission from the same customers',
  resumo: (n,v) => `Without new referrals, the same ${n} customers can generate ${v} per month from month 2 to month 12.`, resumoMensal: (n,v) => `With ${n} new paying customers each month, monthly commission can reach ${v} in month 12.`,
  condicao: 'Gross commission illustration, before partner taxes or costs. Assumes subscriptions at the start of each month, constant pricing and all customers active and paying on time. Each customer earns commission through their 12th monthly payment. Income is not guaranteed. Approval and the partnership contract define final terms.', detalhes: 'View the monthly calculation', mes: 'Month', entrada: 'First monthly payments', recorrencia: 'Ongoing commission', soma: 'Monthly commission', acao: 'I want to refer NeoGlass',
}
const es = {
  rotulo: 'Simula tus ingresos con NeoGlass', titulo: 'Recomiendas una vez. La comisión puede continuar 12 meses.', texto: 'Recibe por la primera mensualidad y sigue participando en los siguientes pagos del cliente recomendado.',
  modos: ['Un grupo de clientes', 'Nuevos clientes cada mes'], quantidade: ['Clientes que contratan y pagan', 'Nuevos clientes de pago por mes'], base: p => `Ejemplo con el plan Cristalería de ${p}/mes, en Brasil.`, cenario: (n,r) => r ? `${n} nuevas contrataciones al mes` : `${n} clientes contratando en el primer mes`,
  mes1: 'Mes 1', mes2: 'Mes 2', mes12: 'Mes 12', total: 'Total en los primeros 12 meses', primeira: '100% de la primera mensualidad', acumulando: 'Nuevas contrataciones + comisiones anteriores', mesmaTurma: 'Comisión de los mismos clientes',
  resumo: (n,v) => `Sin nuevas recomendaciones, los mismos ${n} clientes pueden generar ${v} al mes, del mes 2 al 12.`, resumoMensal: (n,v) => `Con ${n} nuevos clientes de pago cada mes, la comisión mensual puede alcanzar ${v} en el mes 12.`,
  condicao: 'Simulación de comisión bruta, antes de impuestos o costes del socio. Supone contrataciones al inicio de cada mes, precio constante y todos los clientes activos y al corriente de pago. Cada cliente genera comisión hasta su mensualidad 12. No garantiza ingresos. La aprobación y el contrato definen las condiciones finales.', detalhes: 'Ver el cálculo mes a mes', mes: 'Mes', entrada: 'Primeras mensualidades', recorrencia: 'Continuidad', soma: 'Comisión mensual', acao: 'Quiero recomendar NeoGlass',
}
const de = {
  rotulo: 'NeoGlass-Einnahmen berechnen', titulo: 'Einmal empfehlen. Bis zu 12 Monate Provision erhalten.', texto: 'Verdienen Sie an der ersten Monatszahlung und anschließend an weiteren Zahlungen des empfohlenen Kunden.',
  modos: ['Eine Kundengruppe', 'Jeden Monat neue Kunden'], quantidade: ['Kunden, die buchen und bezahlen', 'Neue zahlende Kunden pro Monat'], base: p => `Beispiel mit dem Glaserei-Tarif für ${p}/Monat in Brasilien.`, cenario: (n,r) => r ? `${n} neue Abschlüsse pro Monat` : `${n} Kunden mit Abschluss im ersten Monat`,
  mes1: 'Im 1. Monat', mes2: 'Im 2. Monat', mes12: 'Im 12. Monat', total: 'Summe der ersten 12 Monate', primeira: '100 % der ersten Monatszahlung', acumulando: 'Neue Abschlüsse + laufende Provision', mesmaTurma: 'Provision derselben Kunden',
  resumo: (n,v) => `Ohne weitere Empfehlungen können dieselben ${n} Kunden vom 2. bis 12. Monat jeweils ${v} einbringen.`, resumoMensal: (n,v) => `Bei ${n} neuen zahlenden Kunden pro Monat kann die Monatsprovision im 12. Monat ${v} erreichen.`,
  condicao: 'Beispiel einer Bruttoprovision vor Steuern und Partnerkosten. Annahmen: Abschluss jeweils am Monatsanfang, unveränderter Preis und alle Kunden aktiv mit pünktlicher Zahlung. Jeder Kunde erzeugt Provision bis zur 12. Monatszahlung. Keine Einkommensgarantie. Zulassung und Partnervertrag bestimmen die endgültigen Bedingungen.', detalhes: 'Monatliche Berechnung ansehen', mes: 'Monat', entrada: 'Erste Monatszahlungen', recorrencia: 'Laufende Provision', soma: 'Monatsprovision', acao: 'NeoGlass empfehlen',
}
Object.assign(pt, { moeda: 'Moeda do cliente', base: p => `Plano Vidraçaria: ${p}/mês.`, regras: 'Percentuais de referência do programa brasileiro; confirme as condições do seu contrato.' })
Object.assign(en, { moeda: 'Customer currency', base: p => `Glazier plan: ${p}/month.`, regras: 'Reference rates from the Brazilian programme; confirm your contract terms.' })
Object.assign(es, { moeda: 'Moneda del cliente', base: p => `Plan Cristalería: ${p}/mes.`, regras: 'Porcentajes de referencia del programa brasileño; confirma las condiciones de tu contrato.' })
Object.assign(de, { moeda: 'Währung des Kunden', base: p => `Glaserei-Tarif: ${p}/Monat.`, regras: 'Referenzsätze des brasilianischen Programms; maßgeblich sind Ihre Vertragsbedingungen.' })
export default { pt, en, es, de }
