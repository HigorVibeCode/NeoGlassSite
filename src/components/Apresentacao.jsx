import { useState } from 'react'
import Telas from './Telas.jsx'
import { useTextos } from '../i18n/idioma.jsx'

/**
 * A abertura da /plataforma — a seção 01.
 *
 * A vidraçaria ensinou o eixo: uma coluna, tudo no centro, sem carimbo de
 * prancha brigando com a margem. O leque mostra o tamanho do que foi
 * construído — pedidos, produção, corte, design — com os nomes à vista.
 *
 * O vídeo de takes da fábrica entra em `/midia/plataforma-fabrica.mp4`
 * quando o dono entregar. Até lá a foto segura o quadro.
 *
 * Sem CTA. A página apresenta; não vende.
 */

const LEQUE = ['pedidos', 'producao', 'corte', 'design']

export default function Apresentacao() {
  const t = useTextos().plataforma
  const [videoOk, setVideoOk] = useState(false)

  return (
    <section id="topo" className="apresentacao-plataforma relative min-h-[100svh] overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <img
          src="/midia/plataforma-fabrica.jpg"
          alt=""
          className={`absolute inset-0 h-full w-full object-cover ${videoOk ? 'opacity-0' : 'kenburns'}`}
        />
        <video
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            videoOk ? 'opacity-100' : 'opacity-0'
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/midia/plataforma-fabrica.jpg"
          onCanPlay={() => setVideoOk(true)}
        >
          <source src="/midia/plataforma-fabrica.mp4" type="video/mp4" />
        </video>
        <div className="apresentacao-velo absolute inset-0" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-[1240px] flex-col justify-center px-5 pb-16 pt-[136px] sm:px-8 lg:pt-[116px]">
        <div className="mx-auto mt-2 flex w-full min-w-0 max-w-[680px] flex-col items-center gap-8 overflow-x-clip text-center sm:gap-10">
          <div>
            <h1 className="display mx-auto max-w-[16ch] text-[clamp(28px,4.3vw,54px)] leading-[1.04] text-white">
              {t.hero.titulo.antes} <span className="marca">{t.hero.titulo.destaque}</span>
            </h1>
            <p className="mx-auto mt-5 max-w-[28ch] text-[16px] leading-[1.5] text-white/60">{t.hero.linha}</p>
          </div>

          <div className="flex w-full min-w-0 flex-col items-center overflow-x-clip">
            <Telas variantes={LEQUE} pistasClaras largura="mx-auto max-w-[540px]" />
          </div>
        </div>
      </div>
    </section>
  )
}
