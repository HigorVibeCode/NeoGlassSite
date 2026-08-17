import { useEffect, useRef } from 'react'
import { semMovimento } from '../lib/dispositivo.js'
import { useTextos } from '../i18n/idioma.jsx'

/**
 * A abertura da /plataforma — a seção 01.
 *
 * A frase é a evidência. O vídeo fica atrás, filtrado, em paralaxe.
 * As telas moram depois de “A plataforma continua.”
 */

const VIDEO = '/midia/plataforma-fabrica.mp4'
const POSTER = '/midia/plataforma-fabrica.jpg'

export default function Apresentacao() {
  const t = useTextos().plataforma
  const video = useRef(null)
  const parado = semMovimento()

  useEffect(() => {
    if (parado) return
    video.current?.play().catch(() => {})
  }, [parado])

  return (
    <section id="topo" className="apresentacao-plataforma relative min-h-[80svh] overflow-hidden">
      <div className="apresentacao-fundo pointer-events-none" aria-hidden="true">
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

      <div className="relative mx-auto flex min-h-[80svh] w-full max-w-[1240px] flex-col items-center justify-center px-5 pb-16 pt-[120px] sm:px-8">
        <h1 className="apresentacao-frase display mx-auto max-w-[10ch] text-center text-[clamp(30px,5vw,56px)] leading-[1.02] text-white">
          {t.hero.titulo.antes} <span className="marca">{t.hero.titulo.destaque}</span>
        </h1>
        <p className="apresentacao-linha mx-auto mt-6 max-w-[28ch] text-center">
          {t.hero.linha}
        </p>
      </div>
    </section>
  )
}
