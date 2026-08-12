/**
 * Tudo que muda quando o negócio muda mora aqui. Nenhum componente tem
 * endereço, número ou chave escrito dentro dele.
 */
export const CONFIG = {
  // ── Contato ────────────────────────────────────────────────────────────
  // Link do seu agendamento (Cal.com, Calendly, Google Agenda…).
  // VAZIO É SEGURO: todos os botões de agendar caem no WhatsApp com a mensagem
  // pronta. Endereço errado aqui derruba o site inteiro num 404 — foi o que
  // aconteceu com o `cal.com/neoglass/apresentacao` que estava aqui de exemplo.
  agendar: '',
  // Só os números, com país e DDD. Ex.: 5511999998888
  whatsappNumero: '41782439213',
  email: 'contato@neoglass.online',
  login: 'https://neoglass.online/login',
  horarios: 'seg a sex, 14h–20h · sáb, 8h–17h (horário de Brasília)',
  site: 'https://neoglass.online',

  // ── Onde o lead do formulário vai parar ────────────────────────────────
  // Com as chaves preenchidas, o formulário grava no Supabase.
  // Sem elas, ele abre o WhatsApp com a mensagem pronta — nada se perde.
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL ?? '',
    chaveAnon: import.meta.env.VITE_SUPABASE_ANON_KEY ?? '',
    tabela: 'leads_site',
  },

  // ── O módulo da vidraçaria ─────────────────────────────────────────────
  // É o único produto com preço no site: preço fixo, vendido por tráfego
  // pago, e esconder preço fixo só gera desconfiança. A indústria continua
  // sem preço nenhum — venda consultiva, valor variável.
  //
  // IMPORTANTE: enquanto `precoMensal` for 0, a seção de preço e a linha do
  // topo simplesmente não aparecem. O site pode ir ao ar assim sem quebrar
  // nada — e no dia em que o número estiver decidido, é só preencher aqui.
  vidracaria: {
    precoMensal: 0, // ⚠️ ponha o seu valor aqui — com 0 o preço não aparece no site
    diasTeste: 14, // 0 desliga a menção ao teste
    // Para onde vai o botão de começar (a tela de cadastro do sistema).
    // Vazio: o botão cai no WhatsApp, para nada ficar quebrado.
    cadastro: '',
  },

  // ── Medição ────────────────────────────────────────────────────────────
  // ID do pixel do Meta. Vazio = nenhum script de rastreio é carregado.
  pixelMeta: import.meta.env.VITE_PIXEL_META ?? '',
}

/** O preço já formatado, ou vazio enquanto ninguém decidiu. */
export const precoVidracaria = () =>
  CONFIG.vidracaria.precoMensal > 0
    ? CONFIG.vidracaria.precoMensal.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        maximumFractionDigits: 0,
      })
    : ''

/**
 * Para onde vai um botão de agendar. Nenhum botão do site pode levar a lugar
 * nenhum: sem link de agenda configurado, ele cai no WhatsApp — que funciona
 * sempre e converte melhor com vidraceiro do que uma agenda mesmo.
 */
export const linkAgendar = (texto = 'Olá! Vim pelo site do NeoGlass e quero ver uma demonstração.') =>
  CONFIG.agendar || linkWhatsapp(texto)

/** Verdadeiro quando o link sai do site (WhatsApp) e precisa de aba nova. */
export const ehExterno = (url) => /^https?:\/\/(wa\.me|api\.whatsapp)/.test(url || '')

export const linkWhatsapp = (texto) => {
  const n = CONFIG.whatsappNumero.replace(/\D/g, '')
  const t = texto ? `?text=${encodeURIComponent(texto)}` : ''
  return n ? `https://wa.me/${n}${t}` : `mailto:${CONFIG.email}`
}
