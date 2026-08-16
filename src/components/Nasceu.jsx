import { useEffect, useRef, useState } from 'react'
import { Revelar } from './Comum.jsx'
import { useTextos } from '../i18n/idioma.jsx'
import { ALTURA, ARCOS, LARGURA, ORIGEM, TERRA } from '../lib/continentes.js'
import { semMovimento } from '../lib/dispositivo.js'

/**
 * De uma fábrica de vidro, para o mundo.
 *
 * Mapa de rede. Origem: Suíça. Silhueta simplificada e arredondada.
 * As linhas são círculos máximos.
 */

function Mapa({ desenhar }) {
  return (
    <svg
      viewBox={`0 0 ${LARGURA} ${ALTURA}`}
      className="mx-auto block w-full max-w-[860px]"
      role="img"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="mapa-terra" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1a2433" />
          <stop offset="1" stopColor="#0f2530" />
        </linearGradient>
        <linearGradient id="mapa-marca" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0e8c6a" />
          <stop offset="1" stopColor="#0e7b9c" />
        </linearGradient>
      </defs>

      <path d={TERRA} fill="url(#mapa-terra)" />

      {ARCOS.map((arco, i) => (
        <path
          key={`fundo-${i}`}
          d={arco.d}
          fill="none"
          stroke="#0e8c6a"
          strokeWidth="5"
          strokeLinecap="round"
          opacity="0.16"
        />
      ))}

      {ARCOS.map((arco, i) => (
        <path
          key={`linha-${i}`}
          d={arco.d}
          fill="none"
          stroke="url(#mapa-marca)"
          strokeWidth="2.2"
          strokeLinecap="round"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={desenhar ? 0 : 1}
          style={{
            transition: semMovimento()
              ? 'none'
              : `stroke-dashoffset 1400ms cubic-bezier(0.22, 1, 0.36, 1) ${120 + i * 90}ms`,
          }}
        />
      ))}

      {desenhar &&
        !semMovimento() &&
        ARCOS.flatMap((arco, i) => [
          <path
            key={`ida-${i}`}
            className="mapa-fluxo-ida"
            d={arco.d}
            fill="none"
            stroke="#7fe0c8"
            strokeWidth="1.8"
            strokeLinecap="round"
            style={{
              '--fluxo-dur': `${arco.ida}s`,
              '--fluxo-atraso': `${1600 + i * 90 + arco.atrasoIda * 1000}ms`,
            }}
          />,
          <path
            key={`volta-${i}`}
            className="mapa-fluxo-volta"
            d={arco.d}
            fill="none"
            stroke="#0e8c6a"
            strokeWidth="1.8"
            strokeLinecap="round"
            style={{
              '--fluxo-dur': `${arco.volta}s`,
              '--fluxo-atraso': `${1800 + i * 90 + arco.atrasoVolta * 1000}ms`,
            }}
          />,
        ])}

      {ARCOS.map((arco, i) => (
        <circle key={`p-${i}`} cx={arco.x} cy={arco.y} r="3.6" fill="#0e8c6a" />
      ))}

      <circle className={desenhar ? 'mapa-pulso' : ''} cx={ORIGEM.x} cy={ORIGEM.y} r="18" fill="#0e8c6a" fillOpacity="0.28" />
      <circle cx={ORIGEM.x} cy={ORIGEM.y} r="6.5" fill="#0e8c6a" />
      <circle cx={ORIGEM.x} cy={ORIGEM.y} r="11" fill="none" stroke="#0e8c6a" strokeWidth="2" />
    </svg>
  )
}

export default function Nasceu() {
  const t = useTextos().plataforma.nasceu
  const ref = useRef(null)
  const [desenhar, setDesenhar] = useState(semMovimento())

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (semMovimento()) {
      setDesenhar(true)
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        setDesenhar(true)
        io.disconnect()
      },
      { threshold: 0.32 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Revelar as="section" className="secao mx-auto max-w-[1240px] px-5 pb-20 sm:px-8 sm:pb-24">
      <div className="mx-auto mt-8 max-w-[50ch] text-center">
        <h2 className="display text-[clamp(26px,3.8vw,44px)] leading-[1.08]">{t.titulo}</h2>
      </div>

      <div ref={ref} className="mx-auto mt-10 max-w-[860px] sm:mt-12">
        <Mapa desenhar={desenhar} />
      </div>
    </Revelar>
  )
}
