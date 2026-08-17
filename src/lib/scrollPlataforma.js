import { aparelhoFraco, semMovimento } from './dispositivo.js'

/**
 * O scroll da /plataforma: um quadro só.
 *
 * O vídeo da capa anda mais devagar que a página. As frases dos atos
 * ganham foco no centro — opacidade e um desvio curto. O React não
 * participa: o laço escreve CSS e sai.
 */

const TETO_VIDEO = 180
const FATOR_VIDEO = 0.48

export function ligarScrollPlataforma() {
  if (semMovimento() || aparelhoFraco()) return () => {}

  const fundo = document.querySelector('.apresentacao-fundo')
  const palcos = [...document.querySelectorAll('.ato-palco')]
  if (!fundo && palcos.length === 0) return () => {}

  let raf = 0
  const escrever = () => {
    raf = 0
    if (fundo) {
      const y = Math.min(window.scrollY * FATOR_VIDEO, TETO_VIDEO)
      fundo.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`
    }
    if (palcos.length === 0) return
    const vh = window.innerHeight
    const centro = vh * 0.44
    const alcance = vh * 0.58
    for (const el of palcos) {
      const caixa = el.getBoundingClientRect()
      const meio = caixa.top + caixa.height * 0.5
      let t = (meio - centro) / alcance
      if (t > 1) t = 1
      else if (t < -1) t = -1
      el.style.setProperty('--foco', (1 - Math.abs(t) ** 1.45).toFixed(3))
      el.style.setProperty('--desvio', t.toFixed(3))
    }
  }
  const on = () => {
    if (!raf) raf = requestAnimationFrame(escrever)
  }
  on()
  window.addEventListener('scroll', on, { passive: true })
  window.addEventListener('resize', on, { passive: true })
  return () => {
    window.removeEventListener('scroll', on)
    window.removeEventListener('resize', on)
    cancelAnimationFrame(raf)
  }
}
