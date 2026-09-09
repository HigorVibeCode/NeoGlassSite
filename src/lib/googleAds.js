// IDs públicos da conta NeoGlass. O evento representa cadastro, não pagamento.
export const GOOGLE_ADS_ID = 'AW-18439071018'
export const CADASTRO_DESTINO = 'AW-18439071018/5-EFCIna6fEcEKrKt9hE'
const CHAVE = 'neoglass-medicao-v1'
let escolhaMemoria
let iniciado = false
let cadastroEnviado = false

export function escolhaMedicao() {
  if (escolhaMemoria !== undefined) return escolhaMemoria
  try { return localStorage.getItem(CHAVE) } catch { return null }
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
  window.gtag('consent', 'update', { ad_storage: 'granted', ad_user_data: 'granted' })
  window.gtag('js', new Date())
  window.gtag('config', GOOGLE_ADS_ID, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    allow_enhanced_conversions: false,
  })
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`
  document.head.appendChild(script)
}

export function definirMedicao(aceitar) {
  escolhaMemoria = aceitar ? 'sim' : 'nao'
  try { localStorage.setItem(CHAVE, escolhaMemoria) } catch { /* Escolha ainda vale nesta página. */ }
  if (aceitar) {
    if (iniciado && window.gtag) window.gtag('consent', 'update', { ad_storage: 'granted', ad_user_data: 'granted' })
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
