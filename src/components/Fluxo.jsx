import { useEffect, useRef, useState } from 'react'
import { Revelar } from './Comum.jsx'
import { useTextos } from '../i18n/idioma.jsx'
import { semMovimento } from '../lib/dispositivo.js'

/**
 * Um vidro. Um código.
 *
 * Quatro objetos. O código é o mesmo nos quatro: nasce no vão, corta na
 * chapa, sai no caminhão, cai no boleto.
 */

const ESTACOES = ['vao', 'otimizacao', 'expedicao', 'financeiro']

const BARRAS = Array.from({ length: 42 }, (_, i) => ((i * 7) % 3 === 0 ? 3.2 : 1.5))

function Vao({ t }) {
  return (
    <svg viewBox="0 0 320 200" className="block h-full w-full" aria-hidden="true">
      <defs>
        <pattern id="fluxo-tijolo" width="24" height="14" patternUnits="userSpaceOnUse">
          <rect width="24" height="14" fill="#dce2e8" />
          <path d="M0 7h24M0 14h24M12 0v7M0 7v7M24 7v7" stroke="#c4ccd5" strokeWidth="0.85" />
        </pattern>
        <linearGradient id="fluxo-vao-fundo" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d7e4ea" />
          <stop offset="1" stopColor="#eef4f6" />
        </linearGradient>
      </defs>
      <rect width="320" height="200" fill="url(#fluxo-tijolo)" />
      <rect x="88" y="36" width="144" height="128" fill="url(#fluxo-vao-fundo)" />
      <rect x="88" y="36" width="144" height="128" fill="none" stroke="#6d7b88" strokeWidth="5" />
      <rect x="93" y="41" width="134" height="118" fill="none" stroke="#9aa8b6" strokeWidth="1.4" />
      <path d="M88 22h144M88 18v8M232 18v8" fill="none" stroke="#737e8e" strokeWidth="1" />
      <text
        x="160"
        y="18"
        textAnchor="middle"
        fill="#737e8e"
        fontSize="10"
        fontWeight="600"
        fontFamily="IBM Plex Mono, monospace"
      >
        {t.largura}
      </text>
      <path d="M74 36v128M70 36h8M70 164h8" fill="none" stroke="#737e8e" strokeWidth="1" />
      <text
        x="66"
        y="100"
        textAnchor="middle"
        fill="#737e8e"
        fontSize="10"
        fontWeight="600"
        fontFamily="IBM Plex Mono, monospace"
        transform="rotate(-90 66 100)"
      >
        {t.altura}
      </text>
    </svg>
  )
}

function Chapa({ t }) {
  return (
    <svg viewBox="0 0 320 200" className="block h-full w-full" aria-hidden="true">
      <rect x="18" y="18" width="284" height="164" fill="#fbfdfd" stroke="#b3bfcd" strokeWidth="2" />
      <rect x="100" y="36" width="120" height="128" fill="rgba(14,123,156,.16)" stroke="#0e7b9c" strokeWidth="1.6" />
      <text
        x="110"
        y="52"
        fill="#0e7b9c"
        fontSize="10"
        fontWeight="800"
        fontFamily="IBM Plex Mono, monospace"
      >
        {t.peca}
      </text>
      <rect x="26" y="26" width="66" height="72" fill="rgba(14,140,106,.12)" stroke="#0e8c6a" strokeWidth="1.2" />
      <rect x="26" y="106" width="66" height="66" fill="rgba(14,140,106,.12)" stroke="#0e8c6a" strokeWidth="1.2" />
      <rect x="228" y="26" width="64" height="52" fill="rgba(14,140,106,.12)" stroke="#0e8c6a" strokeWidth="1.2" />
      <rect x="228" y="86" width="64" height="40" fill="rgba(14,140,106,.12)" stroke="#0e8c6a" strokeWidth="1.2" />
      <rect
        x="228"
        y="134"
        width="64"
        height="38"
        fill="rgba(238,106,69,.12)"
        stroke="#ee6a45"
        strokeWidth="1.2"
        strokeDasharray="3 2"
      />
    </svg>
  )
}

function Caminhao({ t }) {
  return (
    <svg viewBox="0 0 320 200" className="block h-full w-full" aria-hidden="true">
      <line x1="36" y1="168" x2="284" y2="168" stroke="#d0d6de" strokeWidth="1.4" />
      <rect x="100" y="62" width="148" height="76" rx="4" fill="#0e7b9c" />
      <rect x="108" y="70" width="18" height="60" rx="1.5" fill="#7fe0c8" fillOpacity="0.55" />
      <rect x="132" y="70" width="18" height="60" rx="1.5" fill="#e8f7f2" fillOpacity="0.7" />
      <rect x="156" y="70" width="18" height="60" rx="1.5" fill="#7fe0c8" fillOpacity="0.45" />
      <text
        x="230"
        y="104"
        textAnchor="middle"
        fill="#f4fbfc"
        fontSize="8"
        fontWeight="700"
        fontFamily="IBM Plex Mono, monospace"
      >
        {t.carga}
      </text>
      <path d="M100 86H62l-16 28v24h54Z" fill="#1a2433" />
      <rect x="68" y="90" width="28" height="20" rx="2" fill="#7fe0c8" fillOpacity="0.75" />
      <rect x="48" y="132" width="14" height="6" rx="1" fill="#ee6a45" />
      <circle cx="92" cy="154" r="15" fill="#1a2433" />
      <circle cx="92" cy="154" r="6" fill="#eef1f6" />
      <circle cx="214" cy="154" r="15" fill="#1a2433" />
      <circle cx="214" cy="154" r="6" fill="#eef1f6" />
    </svg>
  )
}

function Boleto({ t }) {
  return (
    <svg viewBox="0 0 320 200" className="block h-full w-full" aria-hidden="true">
      <rect x="48" y="18" width="224" height="164" rx="8" fill="#fff" stroke="#e7ebf1" strokeWidth="1.4" />
      <path d="M48 18h224a8 8 0 0 1 8 8v18H40V26a8 8 0 0 1 8-8Z" fill="#0f2530" />
      <text x="62" y="38" fill="#f6f9fa" fontSize="11" fontWeight="800" fontFamily="Archivo, Inter, sans-serif">
        {t.boleto}
      </text>
      <line x1="62" y1="18" x2="62" y2="182" stroke="#c5cdd6" strokeWidth="1" strokeDasharray="3 3" />
      <g>
        {BARRAS.map((w, i) => (
          <rect key={i} x={70 + i * 4.4} y="142" width={w} height="26" fill="#0f2530" fillOpacity="0.82" />
        ))}
      </g>
    </svg>
  )
}

const CENAS = {
  vao: Vao,
  otimizacao: Chapa,
  expedicao: Caminhao,
  financeiro: Boleto,
}

export default function Fluxo() {
  const t = useTextos().plataforma.caso
  const [etapa, setEtapa] = useState(0)
  const [volta, setVolta] = useState(false)
  const n = ESTACOES.length
  const ref = useRef(null)
  const [dentro, setDentro] = useState(false)
  const parado = semMovimento()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setDentro(e.isIntersecting), { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!dentro || parado) return
    const id = setInterval(() => {
      setEtapa((e) => {
        if (e === n - 1) {
          setVolta(true)
          return 0
        }
        setVolta(false)
        return e + 1
      })
    }, 4400)
    return () => clearInterval(id)
  }, [dentro, n, parado])

  useEffect(() => {
    if (!volta) return
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setVolta(false))
    })
    return () => cancelAnimationFrame(id)
  }, [volta])

  const ir = (i) => {
    setVolta(false)
    setEtapa(i)
  }

  return (
    <Revelar as="section" className="secao mx-auto max-w-[1240px] px-5 pb-20 sm:px-8 sm:pb-24">
      <div className="mx-auto mt-8 max-w-[50ch] text-center">
        <h2 className="display text-[clamp(26px,3.8vw,44px)] leading-[1.08]">{t.titulo}</h2>
      </div>

      <div ref={ref} className="fluxo-palco mx-auto mt-12 w-full max-w-[560px]" data-volta={volta ? '' : undefined}>
        <ol className="fluxo-estacoes grid grid-cols-4">
          {ESTACOES.map((chave, i) => (
            <li key={chave} className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => ir(i)}
                aria-current={i === etapa ? 'true' : undefined}
                className="flex flex-col items-center gap-2"
              >
                <span
                  className={`fluxo-pip ${i === etapa ? 'fluxo-pip-agora' : ''} ${i < etapa ? 'fluxo-pip-feito' : ''}`}
                />
                <span className={`cota text-center uppercase ${i === etapa ? 'text-ink' : 'text-dim'}`}>
                  {t.estacoes[chave]}
                </span>
              </button>
            </li>
          ))}
        </ol>

        <div className="fluxo-trilho">
          {ESTACOES.map((chave) => {
            const Cena = CENAS[chave]
            return (
              <div key={chave} className="fluxo-cena" data-agora={ESTACOES[etapa] === chave ? '' : undefined}>
                <Cena t={t} />
              </div>
            )
          })}
          <p
            className={`fluxo-codigo chapa rounded-md px-2 py-1 font-mono text-[11px] font-extrabold tracking-wider text-verde ${etapa === 0 && !volta ? 'bate' : ''}`}
          >
            {t.codigo}
          </p>
        </div>
      </div>
    </Revelar>
  )
}
