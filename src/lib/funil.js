const UTMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']

/** O Calendly recebe somente a origem da campanha, nunca os dados do cadastro. */
export function urlDaAgenda(base, origem = {}) {
  if (!base) return ''
  const url = new URL(base)
  url.searchParams.set('primary_color', '0e8c6a')
  for (const chave of UTMS) {
    const valor = origem?.[chave]
    if (typeof valor === 'string' && valor.trim()) url.searchParams.set(chave, valor.slice(0, 120))
  }
  return url.toString()
}

/** Clique e abertura do widget não provam reserva; só a mensagem do iframe certo. */
export function reservaConfirmada(evento, janelaAgenda, base) {
  if (!janelaAgenda || !base || evento.source !== janelaAgenda) return false
  try {
    return evento.origin === new URL(base).origin &&
      evento.data?.event === 'calendly.event_scheduled'
  } catch { return false }
}

export const EVENTOS_META = {
  agendamento_confirmado: 'Schedule',
  cadastro: 'CompleteRegistration',
  whatsapp: 'Contact',
  lead: 'Lead',
}
