import { useEffect, useRef } from 'react'
import { aparelhoFraco, semMovimento } from '../lib/dispositivo.js'
import { useTextos } from '../i18n/idioma.jsx'

/**
 * A abertura da /plataforma — a seção 01.
 *
 * A frase é a evidência. O vídeo fica atrás: filtrado, em paralaxe, sem
 * competir. As telas moram depois de “A plataforma continua.”
 */

const VIDEO = '/midia/plataforma-fabrica.mp4'
const POSTER = '/midia/plataforma-fabrica.jpg'

export default function Apresentacao() {
  const t = useTextos().plataforma
  const video = useRef(null)
  const fundo = useRef(null)
  const parado = semMovimento()

  useEffect(() => {
    if (parado) return
    video.current?.play().catch(() => {})
  }, [parado])

  useEffect(() => {
    const el = fundo.current
    if (!el || parado || aparelhoFraco()) return
    let raf = 0
    let alvo = 0
    const escrever = () => {
      raf = 0
      el.style.transform = `translate3d(0, ${alvo.toFixed(1)}px, 0)`
    }
    const on = () => {
      alvo = Math.min(window.scrollY * 0.22, 80)
      if (!raf) raf = requestAnimationFrame(escrever)
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => {
      window.removeEventListener('scroll', on)
      cancelAnimationFrame(raf)
    }
  }, [parado])

  return (
    <section id="topo" className="apresentacao-plataforma relative min-h-[70svh] overflow-hidden">
      <div ref={fundo} className="apresentacao-fundo pointer-events-none" aria-hidden="true">
        {parado ? (
          <img src={POSTER} alt="" className="apresentacao-midia" />
        ) : (
          <video
            ref={video}
            className="apresentacao-midia"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={POSTER}
          >
            <source src={VIDEO} type="video/mp4" />
          </video>
        )}
      </div>
      <div className="apresentacao-velo pointer-events-none absolute inset-0" />

      <div className="relative mx-auto flex min-h-[70svh] w-full max-w-[1240px] flex-col items-center justify-center px-5 pb-16 pt-[120px] sm:px-8">
        <h1 className="apresentacao-frase display mx-auto max-w-[10ch] text-center text-[clamp(30px,5vw,56px)] leading-[1.02] text-white">
          {t.hero.titulo.antes} <span className="marca">{t.hero.titulo.destaque}</span>
        </h1>
      </div>
    </section>
  )
}
