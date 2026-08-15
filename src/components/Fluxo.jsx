import { useEffect, useRef, useState } from 'react'
import { Revelar } from './Comum.jsx'
import { useTextos } from '../i18n/idioma.jsx'
import { semMovimento } from '../lib/dispositivo.js'

/**
 * Um vidro. Um código.
 *
 * Um quadro só — como o assistente da vidraçaria. O código mora no topo e
 * não sai. O que muda embaixo é o lugar do sistema que está olhando para
 * ele. Sem carimbo, sem celular, sem trocar de janela.
 */

const ESTACOES = ['pedidos', 'producao', 'corte', 'financeiro']

function Pedido({ t }) {
  return (
    <div className="rounded-[16px] border border-line bg-white px-5 py-6">
      <p className="cota uppercase text-dim">{t.estacoes.pedidos}</p>
      <p className="display mt-3 text-[32px] leading-none">{t.pedido}</p>
      <p className="mt-3 text-[15px] font-semibold text-dim">{t.vidro}</p>
      <p className="mt-5 font-mono text-[13px] font-extrabold tracking-wider text-verde">{t.codigo}</p>
    </div>
  )
}

function Producao({ t }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {t.fases.map((fase, i) => (
        <div
          key={fase}
          className="rounded-[14px] border px-3 py-4"
          style={
            i === 2
              ? { borderColor: '#0e8c6a', background: 'rgba(14,140,106,.08)' }
              : { borderColor: '#e7ebf1', background: '#fff' }
          }
        >
          <p className="text-[12px] font-bold text-dim">{fase}</p>
          {i === 2 ? (
            <p className="mt-3 font-mono text-[11px] font-extrabold tracking-wider text-verde">{t.codigo}</p>
          ) : (
            <p className="mt-3 text-[18px] font-extrabold leading-none text-ink">✓</p>
          )}
        </div>
      ))}
    </div>
  )
}

function Corte({ t }) {
  return (
    <div className="rounded-[16px] border border-line bg-white p-4">
      <svg viewBox="0 0 320 168" className="block w-full" aria-hidden="true">
        <rect x="2" y="2" width="316" height="164" fill="#f8fafb" stroke="#b3bfcd" strokeWidth="2" />
        <rect x="14" y="14" width="132" height="140" fill="rgba(14,123,156,.16)" stroke="#0e7b9c" strokeWidth="1.6" />
        <rect x="156" y="14" width="88" height="88" fill="rgba(14,140,106,.12)" stroke="#0e8c6a" strokeWidth="1.4" />
        <rect x="254" y="14" width="52" height="52" fill="rgba(184,134,44,.12)" stroke="#b8862c" strokeWidth="1.2" />
        <text
          x="80"
          y="88"
          textAnchor="middle"
          fill="#0e7b9c"
          fontSize="11"
          fontWeight="800"
          fontFamily="IBM Plex Mono, monospace"
        >
          {t.codigo}
        </text>
      </svg>
    </div>
  )
}

function Financeiro({ t }) {
  return (
    <div className="rounded-[16px] border border-line bg-white px-5 py-6">
      <p className="cota uppercase text-dim">{t.margemRotulo}</p>
      <p className="display mt-3 text-[44px] leading-none" style={{ color: '#8a6317' }}>
        {t.margem}
      </p>
      <p className="mt-4 font-mono text-[13px] font-extrabold tracking-wider text-verde">{t.codigo}</p>
      <p className="mt-5 inline-block rounded-full bg-[rgba(14,140,106,.12)] px-3 py-1.5 text-[12px] font-extrabold text-verde">
        {t.conferida}
      </p>
    </div>
  )
}

function Corpo({ estacao, t }) {
  if (estacao === 'pedidos') return <Pedido t={t} />
  if (estacao === 'producao') return <Producao t={t} />
  if (estacao === 'corte') return <Corte t={t} />
  return <Financeiro t={t} />
}

export default function Fluxo() {
  const t = useTextos().plataforma.caso
  const [etapa, setEtapa] = useState(0)
  const n = ESTACOES.length
  const ref = useRef(null)
  const [dentro, setDentro] = useState(false)
  const estacao = ESTACOES[etapa]

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setDentro(e.isIntersecting), { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!dentro || semMovimento()) return
    const id = setInterval(() => setEtapa((e) => (e + 1) % n), 3200)
    return () => clearInterval(id)
  }, [dentro, n])

  return (
    <Revelar as="section" className="secao mx-auto max-w-[1240px] px-5 pb-20 sm:px-8 sm:pb-24">
      <div className="mx-auto mt-8 max-w-[50ch] text-center">
        <h2 className="display text-[clamp(26px,3.8vw,44px)] leading-[1.08]">{t.titulo}</h2>
      </div>

      <div ref={ref} className="mx-auto mt-10 w-full max-w-[540px]">
        <div className="overflow-hidden rounded-[22px] border border-line bg-[#fbfcfc] shadow-[0_34px_90px_-34px_rgba(15,37,48,0.42)]">
          <div className="flex items-center justify-between gap-4 border-b border-line bg-white px-5 py-4">
            <p className="cota uppercase text-dim">{t.estacoes[estacao]}</p>
            <p className="font-mono text-[13px] font-extrabold tracking-wider text-verde">{t.codigo}</p>
          </div>
          <div className="min-h-[248px] px-5 py-5">
            <div key={estacao} className="sobe">
              <Corpo estacao={estacao} t={t} />
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-1.5">
          {ESTACOES.map((chave, i) => (
            <button
              key={chave}
              type="button"
              onClick={() => setEtapa(i)}
              aria-current={i === etapa ? 'true' : undefined}
              className={`rounded-full px-3.5 py-1.5 text-[12.5px] font-bold transition-colors ${
                i === etapa ? 'bg-soft text-ink' : 'text-dim hover:text-ink'
              }`}
            >
              {t.estacoes[chave]}
            </button>
          ))}
        </div>
      </div>
    </Revelar>
  )
}
