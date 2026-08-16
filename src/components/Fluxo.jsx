import { Revelar } from './Comum.jsx'
import { useTextos } from '../i18n/idioma.jsx'

/**
 * Cada vidro nasce com um código único.
 *
 * O código aparece uma vez — a peça. As fotos são o percurso dela.
 */

const QUADROS = [
  { chave: 'vao', src: '/midia/fabrica-vao.jpg?v=2' },
  { chave: 'otimizacao', src: '/midia/fabrica-mesa.jpg' },
  { chave: 'expedicao', src: '/midia/fabrica-cavalete.jpg' },
  { chave: 'financeiro', src: '/midia/fabrica-financeiro.jpg?v=2' },
]

export default function Fluxo() {
  const t = useTextos().plataforma.caso

  return (
    <Revelar as="section" className="secao mx-auto max-w-[1240px] px-5 pb-20 sm:px-8 sm:pb-24">
      <div className="mx-auto mt-8 max-w-[50ch] text-center">
        <h2 className="display text-[clamp(26px,3.8vw,44px)] leading-[1.08]">
          {t.titulo}
          <span className="marca mt-2 block">{t.linha}</span>
        </h2>
        <div className="fluxo-etiqueta">
          <img src="/midia/peca-qr.svg" alt="" width="48" height="48" className="fluxo-qr" />
          <span>
            <b>{t.codigo}</b>
            <small className="cota">{t.vidro}</small>
          </span>
        </div>
      </div>

      <ol className="fluxo-trilho mx-auto mt-10 max-w-[920px] sm:mt-12">
        {QUADROS.map((q, i) => (
          <li key={q.chave} className="fluxo-estacao">
            <div className="fluxo-quadro">
              <img src={q.src} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="fluxo-no-linha" aria-hidden="true">
              <span className="fluxo-no">{String(i + 1).padStart(2, '0')}</span>
            </div>
            <p className="cota text-center uppercase text-ink">{t.estacoes[q.chave]}</p>
          </li>
        ))}
      </ol>
    </Revelar>
  )
}
