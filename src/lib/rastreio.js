import { CONFIG } from '../config.js'

/**
 * Medição. Nada é carregado se o pixel não estiver configurado — página sem
 * ID de pixel não baixa script de rastreio nenhum.
 */

let ligado = false

export function ligarPixel() {
  if (ligado || !CONFIG.pixelMeta) return
  if (typeof window === 'undefined') return
  ligado = true

  /* eslint-disable */
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
    }
    if (!f._fbq) f._fbq = n
    n.push = n
    n.loaded = !0
    n.version = '2.0'
    n.queue = []
    t = b.createElement(e)
    t.async = !0
    t.src = v
    s = b.getElementsByTagName(e)[0]
    s.parentNode.insertBefore(t, s)
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
  /* eslint-enable */

  window.fbq('init', CONFIG.pixelMeta)
  window.fbq('track', 'PageView')
}

// Um evento só, com nome nosso, para não depender do vocabulário de ninguém.
export function evento(nome, dados = {}) {
  if (typeof window === 'undefined') return
  if (window.fbq) {
    const padrao = { agendar: 'Schedule', whatsapp: 'Contact', lead: 'Lead' }[nome]
    if (padrao) window.fbq('track', padrao, dados)
    else window.fbq('trackCustom', nome, dados)
  }
  if (import.meta.env.DEV) console.info('[evento]', nome, dados)
}
