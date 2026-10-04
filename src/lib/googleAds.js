// IDs públicos da conta NeoGlass. O evento representa cadastro, não pagamento.
export const GOOGLE_ADS_ID = 'AW-18439071018'
export const CADASTRO_DESTINO = 'AW-18439071018/5-EFCIna6fEcEKrKt9hE'
/* Google Analytics 4: propriedade "NeoGlass", fluxo "Site NeoGlass" (Administrador › Fluxos de dados).
   VAZIO É SEGURO: sem ele nada de Analytics é configurado nem enviado. */
export const GA4_ID = 'G-X72B1M761F'
/* Conversão "Lead da têmpera" do Google Ads (o "send_to" que o Google mostra
   ao criar a ação: "AW-18439071018/xxxxxxxx"). Vazio: o envio da /tempera não
   vira conversão no Ads, e nada mais muda. */
export const LEAD_TEMPERA_DESTINO = ''
const CHAVE = 'neoglass-medicao-v1'
let escolhaMemoria
let iniciado = false
let cadastroEnviado = false
let leadEnviado = false

export function escolhaMedicao() {
  if (escolhaMemoria !== undefined) return escolhaMemoria
  try { return localStorage.getItem(CHAVE) } catch { return null }
}

/* O que o aceite libera: anúncios sempre; Analytics só se houver GA4. */
function concedido() {
  return GA4_ID
    ? { ad_storage: 'granted', ad_user_data: 'granted', analytics_storage: 'granted' }
    : { ad_storage: 'granted', ad_user_data: 'granted' }
}

export function iniciarGoogleAds() {
  if (typeof window === 'undefined' || escolhaMedicao() !== 'sim' || iniciado) return
  iniciado = true
  window.dataLayer = window.dataLayer || []
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments) }
  window.gtag('consent', 'default', {
    ad_storage: 'denied', analytics_storage: 'denied',
    ad_user_data: 'denied', ad_personalization: 'denied',
  })
  window.gtag('set', 'ads_data_redaction', true)
  window.gtag('consent', 'update', concedido())
  window.gtag('js', new Date())
  window.gtag('config', GOOGLE_ADS_ID, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    allow_enhanced_conversions: false,
  })
  if (GA4_ID) window.gtag('config', GA4_ID, { allow_google_signals: false, allow_ad_personalization_signals: false })
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`
  document.head.appendChild(script)
}

export function definirMedicao(aceitar) {
  escolhaMemoria = aceitar ? 'sim' : 'nao'
  try { localStorage.setItem(CHAVE, escolhaMemoria) } catch { /* Escolha ainda vale nesta página. */ }
  if (aceitar) {
    if (iniciado && window.gtag) window.gtag('consent', 'update', concedido())
    else iniciarGoogleAds()
  } else if (iniciado && window.gtag) window.gtag('consent', 'update', {
    ad_storage: 'denied', analytics_storage: 'denied',
    ad_user_data: 'denied', ad_personalization: 'denied',
  })
}

export function registrarCadastroGoogle() {
  if (typeof window === 'undefined' || escolhaMedicao() !== 'sim' || cadastroEnviado) return Promise.resolve()
  iniciarGoogleAds()
  cadastroEnviado = true
  // O login automático não deve perder o evento nem depender da rede do Google.
  return new Promise(resolve => {
    const timer = setTimeout(resolve, 1200)
    const concluir = () => { clearTimeout(timer); resolve() }
    try {
      window.gtag('event', 'conversion', {
        send_to: CADASTRO_DESTINO,
        value: 0,
        currency: 'BRL',
        event_callback: concluir,
        event_timeout: 1000,
      })
    } catch { concluir() }
  })
}

/** Etapas e envios do site no GA4. Sem aceite ou sem GA4: nada sai. */
export function medirEvento(nome, dados = {}) {
  if (typeof window === 'undefined' || !GA4_ID || escolhaMedicao() !== 'sim') return
  iniciarGoogleAds()
  try { window.gtag('event', nome, { ...dados, send_to: GA4_ID }) } catch { /* medição nunca derruba a página */ }
}

/** O envio da /tempera como conversão do Google Ads. Uma vez por página. */
export function registrarLeadGoogle() {
  if (typeof window === 'undefined' || !LEAD_TEMPERA_DESTINO || escolhaMedicao() !== 'sim' || leadEnviado) return
  iniciarGoogleAds()
  leadEnviado = true
  try {
    window.gtag('event', 'conversion', { send_to: LEAD_TEMPERA_DESTINO, value: 0, currency: 'BRL' })
  } catch { /* idem */ }
}
