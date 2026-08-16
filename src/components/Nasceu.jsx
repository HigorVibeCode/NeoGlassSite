import { useEffect, useRef, useState } from 'react'
import { Revelar } from './Comum.jsx'
import { useTextos } from '../i18n/idioma.jsx'
import { ALTURA, ARCOS, LARGURA, ORIGEM, TERRA } from '../lib/continentes.js'
import { semMovimento } from '../lib/dispositivo.js'

/**
 * Nasceu dentro da fábrica. Não de um escritório.
 *
 * Arcos contínuos, traço fino. O fluxo vai e volta sem cadência:
 * cada linha no seu tempo, na sua direção.
 */

function ruido(i, k) {
  const x = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453
  return x - Math.floor(x)
}

function fluxosDoArco(i) {
  const sai = ruido(i, 1) > 0.5
  const itens = [
    {
      dir: sai ? 'alternate' : 'alternate-reverse',
      dur: 5.6 + ruido(i, 2) * 7.8,
      atraso: 1400 + ruido(i, 3) * 5600,
      cor: sai ? '#7fe0c8' : '#0e8c6a',
    },
  ]
  if (ruido(i, 4) > 0.4) {
    itens.push({
      dir: sai ? 'alternate-reverse' : 'alternate',
      dur: 6.4 + ruido(i, 5) * 8.2,
      atraso: 1400 + ruido(i, 6) * 6800,
      cor: sai ? '#0e8c6a' : '#7fe0c8',
    })
  }
  return itens
}

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
          key={`halo-${i}`}
          d={arco.d}
          fill="none"
          stroke="#0e8c6a"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.1"
        />
      ))}

      {ARCOS.map((arco, i) => (
        <path
          key={`linha-${i}`}
          d={arco.d}
          fill="none"
          stroke="url(#mapa-marca)"
          strokeWidth="1.4"
          strokeLinecap="round"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={desenhar ? 0 : 1}
          style={{
            transition: semMovimento()
              ? 'none'
              : `stroke-dashoffset 1400ms cubic-bezier(0.22, 1, 0.36, 1) ${100 + i * 80}ms`,
          }}
        />
      ))}

      {desenhar &&
        !semMovimento() &&
        ARCOS.flatMap((arco, i) =>
          fluxosDoArco(i).map((f, k) => (
            <path
              key={`f-${i}-${k}`}
              className="mapa-fluxo"
              d={arco.d}
              fill="none"
              stroke={f.cor}
              strokeWidth="1.35"
              strokeLinecap="round"
              style={{
                '--fluxo-dur': `${f.dur}s`,
                '--fluxo-atraso': `${f.atraso}ms`,
                animationDirection: f.dir,
              }}
            />
          )),
        )}

      {ARCOS.map((arco, i) => (
        <g key={`p-${i}`}>
          <circle cx={arco.x} cy={arco.y} r="5" fill="#0e8c6a" fillOpacity="0.16" />
          <circle cx={arco.x} cy={arco.y} r="2.3" fill="#0e8c6a" />
        </g>
      ))}

      <circle className={desenhar ? 'mapa-pulso' : ''} cx={ORIGEM.x} cy={ORIGEM.y} r="16" fill="#0e8c6a" fillOpacity="0.2" />
      <circle cx={ORIGEM.x} cy={ORIGEM.y} r="9" fill="none" stroke="#0e8c6a" strokeWidth="1.2" opacity="0.55" />
      <circle cx={ORIGEM.x} cy={ORIGEM.y} r="4.2" fill="#0e8c6a" />
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
        <h2 className="display text-[clamp(26px,3.8vw,44px)] leading-[1.08]">
          {t.titulo}
          <span className="marca mt-2 block">{t.linha}</span>
        </h2>
      </div>

      <div ref={ref} className="mx-auto mt-10 max-w-[860px] sm:mt-12">
        <Mapa desenhar={desenhar} />
      </div>
    </Revelar>
  )
}
