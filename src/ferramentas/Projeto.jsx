import { useEffect, useRef, useState } from 'react'
import { evento } from '../lib/rastreio.js'
import { semMovimento } from '../lib/dispositivo.js'
import { useTextos } from '../i18n/idioma.jsx'

/**
 * O assistente do NeoGlass sendo usado, do vão à janela montada.
 *
 * A primeira versão desta peça foi jogada fora, e vale registrar por quê: era
 * desenho técnico abstrato — um vão de linhas, cotas azuis, uma vista explodida
 * chapada em cores que o produto não usa. Parecia gambiarra porque ERA outra
 * coisa: ninguém reconhece o próprio sistema num diagrama.
 *
 * O que convence é ver o app funcionando: a folha do assistente, os cartões de
 * verdade com as palavras de verdade, o dedo encostando, o cartão acendendo, a
 * barra de sete passos andando, o Continuar sendo apertado.
 *
 * Três decisões de composição:
 *   · sem moldura de celular nem de navegador — a tela do app ocupa o quadrado
 *     inteiro, e assim o texto continua legível num telefone;
 *   · o toque tem TRÊS sinais ao mesmo tempo: o dedo chega, sai uma onda do
 *     ponto tocado, e o cartão ganha a borda azul. Um sinal só passa
 *     despercebido em quadro pequeno;
 *   · a legenda que existia embaixo saiu. O passo do próprio assistente já diz
 *     o que está acontecendo — repetir aquilo em outras palavras era texto
 *     sobrando.
 *
 * O ato final é o "Testar abertura" em perspectiva de verdade: o vão tem
 * profundidade, as fixas correm num trilho e as móveis no outro, e é ao longo
 * DESSE eixo que as camadas se afastam. Explosão em profundidade num desenho
 * que já tem profundidade se lê sozinha; foi a explosão plana que estragou a
 * tentativa anterior.
 *
 * Nenhuma especificação de ferragem é escrita. É regra do produto: o NeoGlass
 * não crava bitola nem capacidade de roldana. A peça é desenhada; o número dela
 * não é inventado.
 */

/* O compasso. Cada ato tem a mesma batida — conteúdo entra, dedo viaja, toca,
   confirma — e é a repetição dessa batida que faz o visitante aprender o ritmo
   e conseguir acompanhar. */
const ATO = 3200
const BEATS = { dedo: 560, toque: 1400, confirma: 2400 }
const MONTAGEM = 5800
const TOTAL = ATO * 4 + MONTAGEM

const PASSOS = ['vao', 'medida', 'tipo', 'folhas']

/* Onde o dedo encosta em cada ato, em porcentagem do quadro: primeiro o cartão
   escolhido, depois o Continuar. */
const ALVO = {
  vao: { x: 72, y: 44 },
  medida: { x: 50, y: 40 },
  tipo: { x: 50, y: 62 },
  folhas: { x: 50, y: 70 },
}
const ALVO_CONFIRMA = { x: 76, y: 90 }

/* Qual opção acende em cada passo, e qual traço da barra de sete.
   Os traços NÃO são cinco: o assistente do produto tem sete passos e nós
   pulamos dois. Mostrar sete e acender 1, 2, 3 e 5 é dizer a verdade sobre o
   app em vez de inventar um fluxo mais curto do que ele é. */
const ESCOLHA = { vao: 1, tipo: 2, folhas: 2 }
const TRACO = { vao: 1, medida: 2, tipo: 3, folhas: 5 }

const AZUL = '#3d51d6'
const LARANJA = '#e8873a'
const MEDIDA = { largura: '1800', altura: '1100' }

/* ── os desenhinhos dos cartões ──────────────────────────────────────────── */

const PAREDE = { fill: '#c9d2de' }
const VIDRO = { fill: 'rgba(61,81,214,.16)', stroke: AZUL, strokeWidth: 1.6 }
const FIXO = { fill: 'rgba(150,165,185,.16)', stroke: '#9fb0c4', strokeWidth: 1.3 }

const Seta = ({ x, y, para = 1 }) => (
  <path
    d={`M${x} ${y} h${11 * para} m${-4 * para} -4 l${4 * para} 4 l${-4 * para} 4`}
    fill="none"
    stroke={LARANJA}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
)

function IconeVao({ qual }) {
  return (
    <svg viewBox="0 0 60 44" className="h-[30px] w-[42px] sm:h-[36px] sm:w-[50px]" aria-hidden="true">
      {qual === 0 && (
        <>
          <rect x="6" y="4" width="48" height="6" {...PAREDE} />
          <rect x="6" y="4" width="6" height="36" {...PAREDE} />
          <rect x="48" y="4" width="6" height="36" {...PAREDE} />
          <rect x="15" y="13" width="30" height="27" {...VIDRO} />
        </>
      )}
      {qual === 1 && (
        <>
          <rect x="6" y="4" width="7" height="36" {...PAREDE} />
          <rect x="47" y="4" width="7" height="36" {...PAREDE} />
          <rect x="17" y="9" width="26" height="31" {...VIDRO} />
        </>
      )}
      {qual === 2 && (
        <>
          <rect x="11" y="4" width="7" height="36" {...PAREDE} />
          <rect x="22" y="9" width="27" height="31" {...VIDRO} />
        </>
      )}
      {qual === 3 && <rect x="17" y="9" width="26" height="31" {...VIDRO} />}
    </svg>
  )
}

function IconeTipo({ qual }) {
  return (
    <svg viewBox="0 0 56 40" className="h-[32px] w-[46px] shrink-0" aria-hidden="true">
      {qual === 0 && (
        <>
          <rect x="2" y="4" width="5" height="32" {...PAREDE} />
          <rect x="49" y="4" width="5" height="32" {...PAREDE} />
          <rect x="10" y="7" width="20" height="28" {...FIXO} />
          <rect x="26" y="7" width="21" height="28" {...VIDRO} />
          <Seta x={31} y={21} />
        </>
      )}
      {qual === 1 && (
        <>
          <rect x="16" y="4" width="24" height="32" {...VIDRO} />
          <path d="M40 4 A24 24 0 0 1 40 36" fill="none" stroke={LARANJA} strokeWidth="1.4" strokeDasharray="4 3" />
          <circle cx="36" cy="20" r="1.8" fill={AZUL} />
        </>
      )}
      {qual === 2 && (
        <>
          <rect x="6" y="7" width="22" height="26" {...FIXO} />
          <rect x="26" y="7" width="24" height="26" {...VIDRO} />
          <Seta x={31} y={20} />
          <path d="M4 36 h48" stroke="#9fb0c4" strokeWidth="1.3" strokeDasharray="3 3" />
        </>
      )}
      {qual === 3 && (
        <>
          <rect x="16" y="7" width="24" height="26" {...FIXO} />
          <path d="M4 36 h48" stroke="#9fb0c4" strokeWidth="1.3" strokeDasharray="3 3" />
        </>
      )}
    </svg>
  )
}

function IconeModelo({ folhas }) {
  const l = 44 / folhas
  const movel = folhas === 4 ? [1, 2] : [1]
  return (
    <svg viewBox="0 0 56 40" className="h-[32px] w-[46px] shrink-0" aria-hidden="true">
      {Array.from({ length: folhas }, (_, i) => (
        <rect
          key={i}
          x={6 + i * l}
          y="7"
          width={l}
          height="26"
          {...(movel.includes(i) ? VIDRO : FIXO)}
        />
      ))}
      {folhas === 4 ? (
        <>
          <Seta x={25} y={20} para={-1} />
          <Seta x={31} y={20} />
        </>
      ) : (
        <Seta x={27} y={20} />
      )}
    </svg>
  )
}

/* ── o ato final: o vão em perspectiva ───────────────────────────────────── */

/* A câmera do "Testar abertura": o vão é uma caixa vista de frente, com a
   profundidade indo para trás e para cima. `D` é esse vetor — todo o resto do
   desenho é ele multiplicado por um fator de profundidade. */
const D = { x: 46, y: -22 }
const F = { x0: 40, x1: 250, y0: 50, y1: 178 }
const LARG = (F.x1 - F.x0) / 4

/** Um retângulo do desenho, empurrado `f` para dentro da profundidade. */
const plano = (xa, xb, f) => {
  const dx = D.x * f
  const dy = D.y * f
  return `${xa + dx},${F.y0 + dy} ${xb + dx},${F.y0 + dy} ${xb + dx},${F.y1 + dy} ${xa + dx},${F.y1 + dy}`
}

/* Cada camada tem uma profundidade em repouso e um empurrão a mais quando a
   janela explode. É o MESMO eixo do desenho — por isso a explosão se lê: as
   peças se afastam para dentro do vão, e não para um lado qualquer. */
const CAMADA = {
  aluminio: { repouso: 0, extra: 0.66 },
  vedacao: { repouso: 0.58, extra: 0.3 },
  fixas: { repouso: 0.58, extra: 0 },
  moveis: { repouso: 0.2, extra: -0.34 },
  ferragem: { repouso: 0.2, extra: -0.7 },
}

function Perspectiva({ explode, abre }) {
  const empurra = (extra) => ({
    transform: explode ? `translate(${D.x * extra}px, ${D.y * extra}px)` : 'none',
    transition: 'transform 1200ms cubic-bezier(.4,0,.2,1)',
  })
  const corre = (i) => ({
    transform: `translateX(${i === 1 ? -abre : abre}px)`,
    transition: 'transform 1100ms ease-in-out',
  })
  const claro = '#e8f0ff'

  return (
    <svg viewBox="0 0 320 230" className="mx-auto w-full" aria-hidden="true">
      <defs>
        <linearGradient id="pj-vidro" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a9c8ff" stopOpacity=".26" />
          <stop offset="1" stopColor="#dbe9ff" stopOpacity=".10" />
        </linearGradient>
      </defs>

      {/* a caixa do vão: fundo, teto, chão e a lateral esquerda dão a profundidade */}
      <polygon points={plano(F.x0, F.x1, 1)} fill="#0a1128" />
      <polygon
        points={`${F.x0},${F.y0} ${F.x1},${F.y0} ${F.x1 + D.x},${F.y0 + D.y} ${F.x0 + D.x},${F.y0 + D.y}`}
        fill="#16204a"
      />
      <polygon
        points={`${F.x0},${F.y1} ${F.x1},${F.y1} ${F.x1 + D.x},${F.y1 + D.y} ${F.x0 + D.x},${F.y1 + D.y}`}
        fill="#1c2856"
      />
      <polygon
        points={`${F.x0},${F.y0} ${F.x0 + D.x},${F.y0 + D.y} ${F.x0 + D.x},${F.y1 + D.y} ${F.x0},${F.y1}`}
        fill="#131c3e"
      />

      {/* ── alumínio: os dois trilhos e os montantes ─────────────────────── */}
      <g style={empurra(CAMADA.aluminio.extra)}>
        <g stroke={claro} strokeWidth="2.4" fill="none" strokeLinejoin="round" opacity=".9">
          <path
            d={`M${F.x0} ${F.y0} L${F.x1} ${F.y0} L${F.x1 + D.x} ${F.y0 + D.y} L${F.x0 + D.x} ${F.y0 + D.y} Z`}
          />
          <path
            d={`M${F.x0} ${F.y1} L${F.x1} ${F.y1} L${F.x1 + D.x} ${F.y1 + D.y} L${F.x0 + D.x} ${F.y1 + D.y} Z`}
          />
          <path d={`M${F.x0} ${F.y0} L${F.x0} ${F.y1}`} strokeWidth="2.2" />
          <path d={`M${F.x1} ${F.y0} L${F.x1} ${F.y1}`} strokeWidth="2.2" />
        </g>
        {/* os dois sulcos do trilho: um para as fixas, um para as móveis */}
        <g stroke={claro} strokeWidth="1.4" opacity=".45" fill="none">
          <path d={`M${F.x0 + D.x * 0.2} ${F.y0 + D.y * 0.2} L${F.x1 + D.x * 0.2} ${F.y0 + D.y * 0.2}`} />
          <path d={`M${F.x0 + D.x * 0.58} ${F.y0 + D.y * 0.58} L${F.x1 + D.x * 0.58} ${F.y0 + D.y * 0.58}`} />
        </g>
      </g>

      {/* ── vedação: escova nos montantes e no encontro das móveis ───────── */}
      <g style={empurra(CAMADA.vedacao.extra)} stroke="#9fd8c8" strokeWidth="2.6" strokeLinecap="round" opacity=".8">
        <path
          d={`M${F.x0 + D.x * 0.58} ${F.y0 + D.y * 0.58} L${F.x0 + D.x * 0.58} ${F.y1 + D.y * 0.58}`}
        />
        <path
          d={`M${F.x1 + D.x * 0.58} ${F.y0 + D.y * 0.58} L${F.x1 + D.x * 0.58} ${F.y1 + D.y * 0.58}`}
        />
      </g>

      {/* ── as fixas, no trilho de trás ──────────────────────────────────── */}
      <g style={empurra(CAMADA.fixas.extra)}>
        {[0, 3].map((i) => (
          <polygon
            key={i}
            points={plano(F.x0 + i * LARG, F.x0 + (i + 1) * LARG, CAMADA.fixas.repouso)}
            fill="url(#pj-vidro)"
            stroke={claro}
            strokeWidth="1.3"
            strokeOpacity=".5"
          />
        ))}
      </g>

      {/* ── as móveis, no trilho da frente. O transpasse é a sobra de 9 px
             além do módulo: é ela que cobre a folga quando fecha. ────────── */}
      <g style={empurra(CAMADA.moveis.extra)}>
        {[1, 2].map((i) => (
          <g key={i} style={corre(i)}>
            <polygon
              points={plano(
                F.x0 + i * LARG - (i === 2 ? 9 : 0),
                F.x0 + (i + 1) * LARG + (i === 1 ? 9 : 0),
                CAMADA.moveis.repouso,
              )}
              fill="url(#pj-vidro)"
              stroke={claro}
              strokeWidth="1.9"
              strokeOpacity=".95"
            />
          </g>
        ))}
      </g>

      {/* ── ferragem: roldanas no topo e no pé de cada móvel, e o trinco ─── */}
      <g style={empurra(CAMADA.ferragem.extra)} fill={claro}>
        {[1, 2].map((i) => {
          const ex = D.x * CAMADA.ferragem.repouso
          const ey = D.y * CAMADA.ferragem.repouso
          const a = F.x0 + i * LARG + 14 + ex
          const b = F.x0 + (i + 1) * LARG - 14 + ex
          return (
            <g key={i} style={corre(i)}>
              <circle cx={a} cy={F.y0 + 9 + ey} r="3.4" />
              <circle cx={b} cy={F.y0 + 9 + ey} r="3.4" />
              <circle cx={a} cy={F.y1 - 9 + ey} r="2.6" opacity=".7" />
              <circle cx={b} cy={F.y1 - 9 + ey} r="2.6" opacity=".7" />
              {i === 1 && (
                <rect
                  x={F.x0 + LARG * 2 - 3 + ex}
                  y={(F.y0 + F.y1) / 2 - 11 + ey}
                  width="6"
                  height="22"
                  rx="3"
                />
              )}
            </g>
          )
        })}
      </g>
    </svg>
  )
}

/* ── o dedo ──────────────────────────────────────────────────────────────── */

function Dedo({ em, tocando }) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute z-20"
      style={{
        left: `${em.x}%`,
        top: `${em.y}%`,
        transform: `translate(-16%, -10%) scale(${tocando ? 0.9 : 1})`,
        transition:
          'left 600ms cubic-bezier(.4,0,.2,1), top 600ms cubic-bezier(.4,0,.2,1), transform 180ms ease',
      }}
    >
      {tocando && <span className="onda" />}
      <svg
        viewBox="0 0 44 52"
        className="relative h-[44px] w-[36px]"
        style={{ filter: 'drop-shadow(0 6px 10px rgba(20,55,80,.35))' }}
      >
        <path
          d="M15 27V9a5 5 0 0 1 10 0v14M25 23v-4a4.5 4.5 0 0 1 9 0v4M34 23a4.5 4.5 0 0 1 9 0v11c0 9-6 15-14 15h-6c-5 0-8-2-11-6L6 33a4.5 4.5 0 0 1 7-6l2 3"
          fill="#fff"
          stroke="#26384a"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

/* ── as peças da folha do assistente ─────────────────────────────────────── */

function Cartao({ aceso, className = '', children }) {
  return (
    <div
      className={`flex items-center rounded-[14px] border-2 px-3 py-2.5 transition-all duration-300 ${className}`}
      style={{
        borderColor: aceso ? AZUL : '#e4e9ee',
        background: aceso ? 'rgba(61,81,214,.06)' : '#fff',
        boxShadow: aceso ? '0 0 0 3px rgba(61,81,214,.12)' : 'none',
      }}
    >
      {children}
    </div>
  )
}

export const EVENTO_TOCAR = 'neoglass:tocar-projeto'

/* ── a peça inteira ──────────────────────────────────────────────────────── */

export default function Projeto() {
  const t = useTextos().demos.projeto
  const [ato, setAto] = useState('parado')
  const [beat, setBeat] = useState('entra')
  const [digitou, setDigitou] = useState(0)
  const [explode, setExplode] = useState(false)
  const [abre, setAbre] = useState(0)
  const relogios = useRef([])

  const parar = () => {
    relogios.current.forEach(clearTimeout)
    relogios.current = []
  }
  useEffect(() => parar, [])
  const marcar = (ms, fn) => relogios.current.push(setTimeout(fn, ms))

  function tocar() {
    parar()
    evento('demo', { qual: 'projeto' })
    setExplode(false)
    setAbre(0)
    setDigitou(0)

    // Quem pediu menos movimento recebe o desfecho, parado. Não é versão
    // pobre: é o quadro que a sequência inteira existe para entregar.
    if (semMovimento()) {
      setAto('fim')
      setAbre(LARG)
      return
    }

    PASSOS.forEach((passo, i) => {
      const base = ATO * i
      marcar(base, () => {
        setAto(passo)
        setBeat('entra')
      })
      marcar(base + BEATS.dedo, () => setBeat('dedo'))
      marcar(base + BEATS.toque, () => setBeat('toque'))
      marcar(base + BEATS.confirma, () => setBeat('confirma'))
      if (passo === 'medida') {
        marcar(base + 520, () => setDigitou(1))
        marcar(base + 1180, () => setDigitou(2))
      }
    })

    const fim = ATO * 4
    marcar(fim, () => setAto('montagem'))
    marcar(fim + 900, () => setExplode(true))
    marcar(fim + 3100, () => setExplode(false))
    marcar(fim + 4400, () => setAbre(LARG))
    marcar(TOTAL, () => setAto('fim'))
  }

  useEffect(() => {
    const ouvir = () => tocar()
    window.addEventListener(EVENTO_TOCAR, ouvir)
    return () => window.removeEventListener(EVENTO_TOCAR, ouvir)
  })

  const noAssistente = PASSOS.includes(ato)
  const escuro = ato === 'montagem' || ato === 'fim'
  const p = noAssistente ? t.passos[ato] : null
  const aceso = beat === 'toque' || beat === 'confirma'
  const confirmando = beat === 'confirma'
  const dedoEm = confirmando ? ALVO_CONFIRMA : noAssistente ? ALVO[ato] : ALVO.vao

  return (
    <div className="mx-auto w-full max-w-[520px]">
      <div className="overflow-hidden rounded-[24px] border border-line bg-card shadow-[0_40px_80px_-50px_rgba(20,55,80,.5)]">
        <div className="demo-palco palco-app relative">
          {/* ── a folha do assistente ─────────────────────────────────── */}
          {noAssistente && (
            <div className="relative flex h-full w-full flex-col bg-white">
              <div className="shrink-0 border-b border-line px-5 pt-4 sm:px-6 sm:pt-5">
                <p className="display text-[17px] leading-none sm:text-[21px]">{t.titulo}</p>
                <p key={ato} className="sobe mt-1.5 text-[13.5px] text-dim sm:text-[14.5px]">
                  {p.rotulo}
                </p>
                {/* os sete traços do assistente de verdade */}
                <div className="mt-4 flex gap-1.5 pb-4">
                  {Array.from({ length: 7 }, (_, i) => (
                    <span
                      key={i}
                      className="h-[3px] flex-1 rounded-full transition-colors duration-500"
                      style={{ background: i < TRACO[ato] ? AZUL : '#e4e9ee' }}
                    />
                  ))}
                </div>
              </div>

              {/* `min-h-0` é o que impede o miolo de empurrar o rodapé para fora do
                  quadro: sem ele, o passo com quatro linhas cortava os botões
                  Cancelar e Continuar pela metade. */}
              <div key={ato} className="sobe flex min-h-0 flex-1 flex-col justify-center overflow-hidden px-4 py-2 sm:px-6 sm:py-4">
                {ato === 'vao' && (
                  <div className="grid grid-cols-2 gap-2">
                    {p.opcoes.map((o, i) => (
                      <Cartao key={o} aceso={aceso && i === ESCOLHA.vao} className="flex-col gap-1 px-2 py-2.5 text-center">
                        <IconeVao qual={i} />
                        <span className="text-[11.5px] font-bold leading-tight text-ink sm:text-[13px]">
                          {o}
                        </span>
                      </Cartao>
                    ))}
                  </div>
                )}

                {ato === 'medida' && (
                  <div className="grid gap-3">
                    {[
                      [p.largura, MEDIDA.largura, 1],
                      [p.altura, MEDIDA.altura, 2],
                    ].map(([rotulo, valor, ordem]) => (
                      <span key={rotulo} className="grid gap-1.5">
                        <span className="text-[12.5px] font-bold text-ink">{rotulo}</span>
                        <span
                          className="flex items-center justify-between rounded-[12px] border-2 bg-white px-4 py-3 transition-colors duration-300"
                          style={{ borderColor: digitou >= ordem ? AZUL : '#e4e9ee' }}
                        >
                          <b className="font-mono text-[19px] font-bold text-ink">
                            {digitou >= ordem ? valor : <i className="cursor-pisca" />}
                          </b>
                          <span className="text-[12px] font-semibold text-dim">mm</span>
                        </span>
                      </span>
                    ))}
                  </div>
                )}

                {(ato === 'tipo' || ato === 'folhas') && (
                  <div className="grid gap-2">
                    {p.opcoes.map(([nome, sub], i) => (
                      <Cartao key={nome} aceso={aceso && i === ESCOLHA[ato]} className="gap-2.5 px-3 py-2">
                        <span className="min-w-0 flex-1">
                          <b className="block text-[13px] font-extrabold leading-tight text-ink sm:text-[14.5px]">
                            {nome}
                          </b>
                          <span className="mt-0.5 block truncate text-[11px] text-dim sm:text-[12px]">
                            {sub}
                          </span>
                        </span>
                        {ato === 'tipo' ? <IconeTipo qual={i} /> : <IconeModelo folhas={i + 2} />}
                      </Cartao>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex shrink-0 items-center gap-2.5 border-t border-line px-5 py-3 sm:px-6 sm:py-4">
                <span className="rounded-[12px] border-2 border-line px-4 py-2.5 text-[13.5px] font-bold text-dim">
                  {t.cancelar}
                </span>
                <span
                  className="ml-auto rounded-[12px] px-6 py-2.5 text-[13.5px] font-bold text-white transition-all duration-200"
                  style={{
                    background: AZUL,
                    transform: confirmando ? 'scale(.95)' : 'none',
                    boxShadow: confirmando ? '0 0 0 4px rgba(61,81,214,.2)' : 'none',
                  }}
                >
                  {t.continuar}
                </span>
              </div>

              <Dedo em={dedoEm} tocando={beat === 'toque' || confirmando} />
            </div>
          )}

          {/* ── o painel de testar abertura ───────────────────────────── */}
          {escuro && (
            <div className="sobe flex h-full w-full flex-col bg-[#111a33] px-5 py-5 sm:px-6">
              <p className="flex flex-wrap items-baseline gap-x-2">
                <b className="text-[17px] font-extrabold text-white sm:text-[19px]">
                  {t.passos.montagem.rotulo}
                </b>
                <b className="text-[12px] font-semibold text-white/55">{t.passos.montagem.sub}</b>
              </p>
              <p className="mt-1 text-[11.5px] font-semibold text-white/40">
                {t.passos.montagem.dica}
              </p>
              <div className="flex flex-1 items-center">
                <Perspectiva explode={explode} abre={abre} />
              </div>
            </div>
          )}

          {/* ── o repouso: o desfecho, apagado, esperando o play ──────── */}
          {ato === 'parado' && (
            <div className="flex h-full w-full items-center bg-[#111a33] px-5 sm:px-6">
              <div className="w-full opacity-60">
                <Perspectiva explode={false} abre={0} />
              </div>
            </div>
          )}
        </div>

        <div className="flex min-h-[84px] flex-col items-center justify-center gap-3 border-t border-line px-5 py-5 text-center">
          {ato === 'parado' ? (
            <button
              type="button"
              onClick={tocar}
              className="botao-marca inline-flex items-center gap-2.5 px-7 py-3.5 text-[15px] transition-transform duration-200 hover:-translate-y-0.5"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
              </svg>
              {t.tocar}
            </button>
          ) : ato === 'fim' ? (
            <>
              <p className="sobe text-[15.5px] font-bold leading-snug text-ink">{t.pronto}</p>
              <button
                type="button"
                onClick={tocar}
                className="text-[13.5px] font-bold text-verde underline underline-offset-4"
              >
                {t.denovo}
              </button>
            </>
          ) : (
            <span className="block h-[3px] w-full max-w-[220px] overflow-hidden rounded-full bg-line">
              <span
                className="block h-full rounded-full bg-verde"
                style={{ animation: `correr ${TOTAL}ms linear forwards` }}
              />
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
