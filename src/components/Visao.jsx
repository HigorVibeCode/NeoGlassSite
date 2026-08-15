import { useEffect, useRef, useState } from 'react'
import { Revelar } from './Comum.jsx'
import { useTextos } from '../i18n/idioma.jsx'
import { semMovimento } from '../lib/dispositivo.js'

/**
 * A plataforma continua.
 *
 * Quatro nomes, um eixo. Sem mapa, sem diagrama, sem benefício.
 * A tipografia carrega o peso — é para onde o produto segue.
 */

const CAPACIDADES = ['ia', 'automacao', 'visao', 'dados']

export default function Visao() {
  const t = useTextos().plataforma.visao
  const ref = useRef(null)
  const [passo, setPasso] = useState(semMovimento() ? CAPACIDADES.length : 0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (semMovimento()) {
      setPasso(CAPACIDADES.length)
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        io.disconnect()
        CAPACIDADES.forEach((_, i) => {
          window.setTimeout(() => setPasso(i + 1), 160 + i * 280)
        })
      },
      { threshold: 0.35 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Revelar as="section" className="secao mx-auto max-w-[1240px] px-5 pb-20 sm:px-8 sm:pb-24">
      <div className="mx-auto mt-8 max-w-[50ch] text-center">
        <h2 className="display text-[clamp(26px,3.8vw,44px)] leading-[1.08]">{t.titulo}</h2>
      </div>

      <ol ref={ref} className="visao-eixo mx-auto mt-12 max-w-[420px]">
        {CAPACIDADES.map((chave, i) => (
          <li
            key={chave}
            className="visao-linha"
            style={{
              opacity: passo > i ? 1 : 0.22,
              transform: passo > i ? 'none' : 'translateY(8px)',
            }}
          >
            <span className="visao-marca" aria-hidden="true" />
            <span className="display text-[clamp(22px,3vw,32px)] leading-[1.15]">{t.capacidades[chave]}</span>
          </li>
        ))}
      </ol>
    </Revelar>
  )
}
