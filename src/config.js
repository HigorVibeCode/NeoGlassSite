/**
 * Tudo que muda quando o negócio muda mora aqui. Nenhum componente tem
 * endereço, número ou chave escrito dentro dele.
 */
/* `import.meta.env?.` com a interrogação, e não sem: este arquivo agora também
   é importado pelo gerador de páginas, que roda em Node puro depois do build.
   No navegador o Vite substitui a expressão inteira; no Node ela é undefined, e
   sem a interrogação a leitura da chave derruba o build inteiro. */
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
  login: 'https://app.neoglass.online/login',
  horarios: 'seg a sex, 14h–20h · sáb, 8h–17h (horário de Brasília)',
  site: 'https://neoglass.online',

  // ── Onde o lead do formulário vai parar ────────────────────────────────
  // Com as chaves preenchidas, o formulário grava no Supabase.
  // Sem elas, ele abre o WhatsApp com a mensagem pronta — nada se perde.
  supabase: {
    url: import.meta.env?.VITE_SUPABASE_URL ?? '',
    chaveAnon: import.meta.env?.VITE_SUPABASE_ANON_KEY ?? '',
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
    // Um preço por moeda, e a moeda vem do idioma da página.
    //
    // Os valores de fora do Brasil saíram de uma varredura de 45 concorrentes
    // em 13/08/2026, com preço lido na página (nada estimado, nada convertido):
    //   · Europa, software setorial de vidraçaria, plano de entrada mensal —
    //     mínimo € 19,50 (FactuServia/ES), mediana € 49,40 (Verial/ES),
    //     máximo € 85 (eCOUNT/AT, e por usuário). Topo de linha ~€ 100.
    //     Reino Unido é outro patamar: Smart Glazier £100–200.
    //   · EUA, por usuário — mediana US$ 67,48. O concorrente mais direto,
    //     GlassManager, cobra US$ 65/usuário com mínimo de 2 e US$ 495 de
    //     implantação, ou seja US$ 625 no primeiro mês.
    //
    // € 79 fica acima da mediana de propósito: € 49 é a faixa de ferramenta de
    // orçamento leve, e aqui tem otimização de corte, retalho e produção junto.
    // US$ 89 fechado bate o GlassManager de frente.
    //
    // 60% dos europeus escondem o preço, e na Alemanha não achei um único
    // software de Glaserei com preço publicado. Publicar é a vantagem.
    precos: {
      BRL: 197,
      EUR: 79,
      USD: 89,
    },
    // Qual moeda cada idioma vê.
    moedaPorIdioma: { pt: 'BRL', en: 'USD', es: 'EUR', de: 'EUR' },
    diasTeste: 14, // 0 desliga a menção ao teste
    // Para onde vai o botão de começar (a tela de cadastro do sistema).
    // Vazio: o botão cai no WhatsApp, para nada ficar quebrado.
    cadastro: '',
  },

  // ── Medição ────────────────────────────────────────────────────────────
  // ID do pixel do Meta. Vazio = nenhum script de rastreio é carregado.
  pixelMeta: import.meta.env?.VITE_PIXEL_META ?? '',
}

/** A moeda daquele idioma, e quanto custa nela. */
export const moedaDe = (idioma = 'pt') =>
  CONFIG.vidracaria.moedaPorIdioma[idioma] ?? 'BRL'

export const valorMensal = (idioma = 'pt') =>
  CONFIG.vidracaria.precos[moedaDe(idioma)] ?? 0

/**
 * O preço já formatado no idioma da página, ou vazio enquanto ninguém decidiu.
 * O formato acompanha o idioma, não só a moeda: alemão escreve "79 €" com o
 * símbolo depois, inglês escreve "$89" com ele antes. Escrever "€79" para um
 * alemão é o tipo de detalhe que faz o site parecer traduzido por máquina.
 */
export const precoVidracaria = (idioma = 'pt') => {
  const valor = valorMensal(idioma)
  if (!valor) return ''
  const local = { pt: 'pt-BR', en: 'en-US', es: 'es-ES', de: 'de-DE' }[idioma] ?? 'pt-BR'
  return valor.toLocaleString(local, {
    style: 'currency',
    currency: moedaDe(idioma),
    maximumFractionDigits: 0,
  })
}

/**
 * Para onde vai um botão de agendar. Nenhum botão do site pode levar a lugar
 * nenhum: sem link de agenda configurado, ele cai no WhatsApp — que funciona
 * sempre e converte melhor com vidraceiro do que uma agenda mesmo.
 */
export const linkAgendar = (texto) =>
  CONFIG.agendar || linkWhatsapp(texto || 'NeoGlass')

/** Verdadeiro quando o link sai do site (WhatsApp) e precisa de aba nova. */
export const ehExterno = (url) => /^https?:\/\/(wa\.me|api\.whatsapp)/.test(url || '')

/**
 * O botão de começar da vidraçaria, num lugar só — o cabeçalho, a abertura, a
 * demonstração e a seção de preço leem daqui.
 *
 * O rótulo muda conforme existe ou não tela de cadastro. Sem ela, o botão NÃO
 * promete "começar grátis": ele diz "quero começar" e abre o WhatsApp. Prometer
 * autoatendimento e entregar conversa é o tipo de detalhe que queima a
 * confiança que a página inteira passou meia hora construindo.
 */
export const acaoComecar = (idioma = 'pt', c) => {
  const { diasTeste, cadastro } = CONFIG.vidracaria
  const t = c?.chrome
  if (cadastro) {
    return {
      rotulo: diasTeste > 0 ? t.comecarGratis(diasTeste) : t.comecarAgora,
      curto: t.comecarCurto,
      href: cadastro,
      externo: false,
      autoatendimento: true,
    }
  }
  return {
    rotulo: t.queroComecar,
    curto: t.comecarCurto,
    href: linkWhatsapp(c.whatsapp.comecar),
    externo: true,
    autoatendimento: false,
  }
}

export const linkWhatsapp = (texto) => {
  const n = CONFIG.whatsappNumero.replace(/\D/g, '')
  const t = texto ? `?text=${encodeURIComponent(texto)}` : ''
  return n ? `https://wa.me/${n}${t}` : `mailto:${CONFIG.email}`
}
