import { useEffect, useRef, useState } from 'react'
import { useTextos } from '../i18n/idioma.jsx'
import { semMovimento } from '../lib/dispositivo.js'

/**
 * O laço do topo da /industria — o gancho de cinco segundos.
 *
 * Espelha a fala em laço da vidraçaria, mas para o outro público. Lá, a
 * pessoa fala e a ficha se preenche; aqui, uma chapa é cortada, sobra um
 * pedaço, e uma etiqueta se imprime nele — Código, Medida, Prateleira —, e a
 * sobra deixa de ser um caco encostado na parede e vira item de estoque.
 *
 * É o "agora ele existe no sistema" da indústria. Curto, em laço, sem a conta
 * da economia — essa é a recompensa do botão que leva à demonstração completa
 * lá embaixo, do mesmo jeito que a janela e o orçamento são a recompensa na
 * vidraçaria.
 *
 * Os números não são inventados: são o retalho RT-0412 do próprio
 * demonstrador (`ferramentas/Retalho.jsx`), o mesmo que a prova usa. Quem vê o
 * laço e depois a demonstração reencontra a mesma sobra.
 */

const AZUL = '#0e7b9c'
const VERDE = '#0e8c6a'
const BRASA = '#e8873a'

/* O retalho que a demonstração de baixo também usa. Uma verdade só. */
const RETALHO = { l: 2100, a: 1300, codigo: 'RT-0412', posicao: 'B · 03' }

/* A chapa de onde ele sai, e as peças que já foram cortadas dela — desenho
   esquemático, não o empacotador de verdade (esse roda na prova). O que
   importa aqui é ler, num segundo: cortaram, sobrou um pedaço grande. */
const CHAPA = { l: 3210, a: 2250 }
const CORTADAS = [
  { x: 0, y: 0, l: 1100, a: 2250, cor: VERDE },
  { x: 1100, y: 0, l: 1010, a: 950, cor: AZUL },
  { x: 1100, y: 950, l: 1010, a: 1300, cor: '#7c6ad6' },
]
// a sobra é o resto da chapa à direita — o retângulo que vira RT-0412
const SOBRA = { x: 2110, y: 0, l: CHAPA.l - 2110, a: CHAPA.a }

export default function RetalhoLaco() {
  const t = useTextos().industria.laco
  const palco = useRef(null)
  // 0 nada · 1 chapa cortada · 2 sobra destacada · 3+ linhas da etiqueta
  const [passo, setPasso] = useState(0)
  const relogios = useRef([])

  useEffect(() => {
    const el = palco.current
    if (!el) return

    const parar = () => {
      relogios.current.forEach(clearTimeout)
      relogios.current = []
    }
    const marcar = (ms, fn) => relogios.current.push(setTimeout(fn, ms))

    if (semMovimento()) {
      setPasso(6)
      return
    }

    let vivo = false
    const rodar = () => {
      parar()
      setPasso(0)
      marcar(500, () => setPasso(1)) // a chapa aparece cortada
      marcar(1300, () => setPasso(2)) // a sobra acende
      marcar(2100, () => setPasso(3)) // Código
      marcar(2800, () => setPasso(4)) // Medida
      marcar(3500, () => setPasso(5)) // Prateleira
      marcar(4200, () => setPasso(6)) // ✓ cadastrado
      marcar(6200, () => vivo && rodar()) // segura e recomeça
    }

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !vivo) {
          vivo = true
          rodar()
        } else if (!e.isIntersecting && vivo) {
          vivo = false
          parar()
        }
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => {
      vivo = false
      io.disconnect()
      parar()
    }
  }, [])

  const sobraAcesa = passo >= 2
  // escala do desenho: viewBox em mm
  const esc = 0.09
  const W = CHAPA.l * esc
  const H = CHAPA.a * esc

  const linhas = [
    ['codigo', t.codigo, RETALHO.codigo],
    ['medida', t.medida, `${RETALHO.l} × ${RETALHO.a} mm`],
    ['prateleira', t.prateleira, RETALHO.posicao],
  ]

  return (
    <div className="mx-auto w-full max-w-[520px]">
      <div className="overflow-hidden rounded-[24px] border border-line bg-card shadow-[0_40px_80px_-50px_rgba(20,55,80,.5)]">
        <div ref={palco} className="flex flex-col bg-white">
          <div className="flex items-center gap-2.5 border-b border-line px-5 py-3.5 sm:px-6">
            <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-[8px]" style={{ background: BRASA }}>
              <svg viewBox="0 0 24 24" className="h-[15px] w-[15px]" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 7h16M4 12h10M4 17h7" />
              </svg>
            </span>
            <span className="min-w-0 leading-tight">
              <b className="block truncate text-[14px] font-extrabold text-ink sm:text-[15px]">{t.modulo}</b>
              <b className="block text-[11px] font-semibold" style={{ color: BRASA }}>{t.rotulo}</b>
            </span>
          </div>

          <div className="flex flex-col items-center gap-4 px-5 py-6 sm:px-6 sm:flex-row sm:items-center sm:gap-6">
            {/* a chapa cortada, com a sobra acendendo */}
            <svg viewBox={`0 0 ${W} ${H}`} className="w-[150px] shrink-0 sm:w-[180px]" aria-hidden="true">
              <rect x="0" y="0" width={W} height={H} rx="2" fill="#eef2f5" stroke="#d7dee6" strokeWidth="1" />
              {CORTADAS.map((p, i) => (
                <rect
                  key={i}
                  x={p.x * esc}
                  y={p.y * esc}
                  width={p.l * esc - 1.2}
                  height={p.a * esc - 1.2}
                  rx="1.5"
                  fill={p.cor}
                  fillOpacity={passo >= 1 ? 0.16 : 0}
                  stroke={p.cor}
                  strokeOpacity={passo >= 1 ? 0.5 : 0}
                  strokeWidth="1"
                  style={{ transition: `all 500ms ease ${i * 120}ms` }}
                />
              ))}
              {/* a sobra */}
              <rect
                x={SOBRA.x * esc}
                y={SOBRA.y * esc}
                width={SOBRA.l * esc - 1.2}
                height={SOBRA.a * esc - 1.2}
                rx="1.5"
                fill={BRASA}
                fillOpacity={sobraAcesa ? 0.2 : 0.05}
                stroke={BRASA}
                strokeWidth={sobraAcesa ? 2 : 1}
                style={{ transition: 'all 500ms ease' }}
              />
            </svg>

            {/* a etiqueta, preenchendo */}
            <div className="w-full min-w-0 flex-1">
              <div
                className="rounded-[12px] border p-3 transition-all duration-500 sm:p-3.5"
                style={{
                  borderColor: sobraAcesa ? 'rgba(232,135,58,.4)' : '#e4e9ee',
                  background: sobraAcesa ? 'rgba(232,135,58,.05)' : '#fff',
                }}
              >
                <div className="flex items-center justify-between gap-2 border-b border-line pb-2">
                  <span className="cota uppercase" style={{ color: BRASA, opacity: 1 }}>{t.etiqueta}</span>
                  <span
                    className="flex items-center gap-1 text-[11px] font-bold transition-opacity duration-300"
                    style={{ color: VERDE, opacity: passo >= 6 ? 1 : 0 }}
                  >
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 12l6 6L20 6" />
                    </svg>
                    {t.feito}
                  </span>
                </div>
                <dl className="mt-2 grid gap-[5px]">
                  {linhas.map(([chave, rotulo, valor], i) => {
                    const cheio = passo >= 3 + i
                    return (
                      <div key={chave} className="flex items-baseline justify-between gap-3">
                        <dt className="cota shrink-0 uppercase">{rotulo}</dt>
                        <dd
                          className={`min-w-0 truncate text-right font-mono text-[13px] font-bold sm:text-[14px] ${cheio ? 'campo-cheio' : ''}`}
                          style={{ color: cheio ? '#0f2530' : '#c3cad4' }}
                        >
                          {cheio ? valor : '—'}
                        </dd>
                      </div>
                    )
                  })}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
