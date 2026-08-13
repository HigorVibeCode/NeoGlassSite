import { useEffect, useRef, useState } from 'react'
import { empacotar } from '../lib/empacotar.js'
import { Simbolo } from '../components/Marca.jsx'
import { ehExterno, linkAgendar } from '../config.js'
import { evento } from '../lib/rastreio.js'
import { semMovimento } from '../lib/dispositivo.js'
import { useIdioma, useTextos } from '../i18n/idioma.jsx'

/**
 * A demonstração da indústria: três cliques até a chapa que você não abriu.
 *
 * Não é uma calculadora — é o sistema fingindo de sistema. O visitante não
 * preenche nada e não decide nada: ele aperta "Otimizar", vê o plano nascer,
 * o sistema avisa que achou retalho no cavalete, ele aperta "Usar" e recebe a
 * conta da economia. Todo o resto é dele: quantos pedidos por semana.
 *
 * Os números NÃO são inventados. O cenário passa pelo mesmo empacotador de
 * verdade (`lib/empacotar.js`), duas vezes — com e sem os retalhos — e a
 * narrativa lê o resultado. Se o algoritmo mudar, o texto muda junto.
 *
 * Nada aqui roda por quadro: cada fase é um `setTimeout` e as peças aparecem
 * com `animation-delay` escalonado, trabalho do navegador.
 */

const CHAPA = { l: 3210, a: 2250 }

const RETALHOS = [
  { l: 2100, a: 1300 },
  { l: 1480, a: 1200 },
]

// `chave` é o nome da peça no módulo de textos: a medida é a mesma em todo
// idioma, o nome do produto não.
const PECAS = [
  { chave: 'portaBox', l: 800, a: 1850, qtd: 4 },
  { chave: 'fixoLateral', l: 600, a: 1850, qtd: 4 },
  { chave: 'prateleira', l: 880, a: 350, qtd: 6 },
  { chave: 'espelho', l: 700, a: 900, qtd: 4 },
  { chave: 'tampo', l: 1100, a: 600, qtd: 2 },
]

const CORES = ['#0e8c6a', '#0e7b9c', '#7c6ad6', '#b8862c', '#c2557c']

const R = empacotar({ chapa: CHAPA, retalhos: RETALHOS, pecas: PECAS, serra: 4 })

const AREA_CHAPA = (CHAPA.l * CHAPA.a) / 1e6
const APROVEITAMENTO_ANTES = R.m2Pedido / (R.chapasSemRetalho * AREA_CHAPA)
const M2_CHAPA = AREA_CHAPA

const mm = (n) => n.toLocaleString('pt-BR')
const m2 = (n) => n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const pct = (n) => `${Math.round(n * 100)}%`

/* ── o desenho de uma chapa (ou retalho) ─────────────────────────────────── */

function Folha({ rec, revelar = false, atraso = 0, fantasma = false, riscada = false }) {
  const t = useTextos().demos.retalho.desenho
  const retalho = rec.tipo === 'retalho'
  const cor = retalho ? '#0e7b9c' : '#b3bfcd'
  return (
    <svg
      viewBox={`-24 -24 ${CHAPA.l + 48} ${CHAPA.a + 48}`}
      className="block w-full"
      style={fantasma ? { opacity: 0.42 } : undefined}
      role="img"
      aria-label={t.aria(retalho ? t.retalho : t.chapa, rec.id, rec.pecas.length)}
    >
      {(rec.l < CHAPA.l || rec.a < CHAPA.a) && (
        <rect
          x="0"
          y="0"
          width={CHAPA.l}
          height={CHAPA.a}
          fill="none"
          stroke="#d7dee7"
          strokeWidth="6"
          strokeDasharray="18 16"
        />
      )}
      <rect
        x="0"
        y="0"
        width={rec.l}
        height={rec.a}
        fill={retalho ? '#eef7fb' : '#f7f9fc'}
        stroke={cor}
        strokeWidth="9"
        strokeDasharray={retalho ? '34 22' : undefined}
      />
      {rec.pecas.map((p, i) => (
        <g
          key={i}
          className={revelar ? 'surge' : undefined}
          style={revelar ? { animationDelay: `${atraso + i * 62}ms` } : undefined}
        >
          <rect
            x={p.x}
            y={p.y}
            width={p.w}
            height={p.h}
            fill={CORES[p.ref % CORES.length]}
            fillOpacity="0.17"
            stroke={CORES[p.ref % CORES.length]}
            strokeWidth="8"
          />
          {p.w > 330 && p.h > 190 && (
            <text
              x={p.x + p.w / 2}
              y={p.y + p.h / 2}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={Math.min(120, Math.max(66, Math.min(p.w, p.h) * 0.2))}
              fontFamily="IBM Plex Mono, monospace"
              fontWeight="600"
              fill={CORES[p.ref % CORES.length]}
            >
              {p.w}×{p.h}
            </text>
          )}
        </g>
      ))}
      {riscada && (
        <g stroke="#ee6a45" strokeWidth="14" strokeLinecap="round">
          <line x1="90" y1="90" x2={rec.l - 90} y2={rec.a - 90} />
          <line x1={rec.l - 90} y1="90" x2="90" y2={rec.a - 90} />
        </g>
      )}
    </svg>
  )
}

function Legenda({ rec, sufixo, cor }) {
  const usado = rec.pecas.reduce((s, p) => s + p.w * p.h, 0) / (rec.l * rec.a)
  return (
    <div className="mb-1.5 flex items-baseline justify-between gap-3">
      <span className="cota uppercase" style={cor ? { color: cor, opacity: 1 } : undefined}>
        {sufixo} · {mm(rec.l)}×{mm(rec.a)}
      </span>
      <span className="cota shrink-0">{pct(usado)}</span>
    </div>
  )
}

/* ── a chapa vazia, antes de tudo ────────────────────────────────────────── */

function FolhaVazia({ varrendo }) {
  return (
    <div className="relative">
      <svg viewBox={`-24 -24 ${CHAPA.l + 48} ${CHAPA.a + 48}`} className="block w-full" aria-hidden="true">
        <rect
          x="0"
          y="0"
          width={CHAPA.l}
          height={CHAPA.a}
          fill="#f7f9fc"
          stroke="#b3bfcd"
          strokeWidth="9"
        />
        <g stroke="#dde4ec" strokeWidth="4">
          {Array.from({ length: 9 }, (_, i) => (
            <line
              key={i}
              x1={((i + 1) * CHAPA.l) / 10}
              y1="0"
              x2={((i + 1) * CHAPA.l) / 10}
              y2={CHAPA.a}
            />
          ))}
        </g>
        <text
          x={CHAPA.l / 2}
          y={CHAPA.a / 2}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="150"
          fontFamily="IBM Plex Mono, monospace"
          fontWeight="600"
          fill="#a9b6c4"
        >
          {mm(CHAPA.l)} × {mm(CHAPA.a)}
        </text>
      </svg>
      {varrendo && (
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <span
            className="varre absolute inset-y-0 w-[16%]"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(14,140,106,.16), rgba(127,224,200,.5), rgba(14,140,106,.16), transparent)',
            }}
          />
        </span>
      )}
    </div>
  )
}

/* ── as sobras encostadas na parede ─────────────────────────────────────── */

/**
 * O cavalete de verdade: as sobras não ficam empilhadas em cima de uma chapa
 * imaginária, ficam encostadas na parede, tortas. Desenhar assim custa o mesmo
 * e economiza meia tela de espaço vazio.
 */
function Cavalete() {
  const CHAO = 1440
  // Mesmo quadro da chapa nova: assim o retalho aparece do tamanho que ele tem
  // de verdade, e não do tamanho que daria jeito. Eles se sobrepõem porque é
  // assim que ficam encostados — uma chapa na frente da outra.
  const postos = [
    { r: RETALHOS[0], x: 90, giro: -2.4 },
    { r: RETALHOS[1], x: 1620, giro: 1.8 },
  ]
  return (
    <svg viewBox={`0 0 ${CHAPA.l} 1560`} className="block w-full" aria-hidden="true">
      <line x1="40" y1={CHAO} x2={CHAPA.l - 40} y2={CHAO} stroke="#b6c2d1" strokeWidth="16" />
      {postos.map(({ r, x, giro }, i) => (
        <g key={i} transform={`rotate(${giro} ${x + r.l / 2} ${CHAO})`}>
          <rect
            x={x}
            y={CHAO - r.a}
            width={r.l}
            height={r.a}
            fill="#eaf5fa"
            stroke="#0e7b9c"
            strokeWidth="11"
            strokeDasharray="38 24"
          />
          <text
            x={x + r.l / 2}
            y={CHAO - r.a / 2}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="140"
            fontFamily="IBM Plex Mono, monospace"
            fontWeight="600"
            fill="#0e7b9c"
          >
            {mm(r.l)}×{mm(r.a)}
          </text>
        </g>
      ))}
    </svg>
  )
}

/* ── as linhas que o sistema "pensa" ─────────────────────────────────────── */

function Registro({ linhas, passo = 420 }) {
  return (
    <ul className="mt-5 space-y-2.5">
      {linhas.map((t, i) => (
        <li
          key={t}
          className="sobe flex items-center gap-2.5 text-[14px] text-dim"
          style={{ animationDelay: `${i * passo}ms` }}
        >
          <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0" aria-hidden="true">
            <path
              d="M3 8.5l3.2 3.2L13 5"
              fill="none"
              stroke="#0e8c6a"
              strokeWidth="2.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {t}
        </li>
      ))}
    </ul>
  )
}

function Barra({ duracao }) {
  return (
    <span aria-hidden="true" className="mt-6 block h-[5px] overflow-hidden rounded-full bg-line">
      <span
        className="enche block h-full rounded-full"
        style={{ background: 'linear-gradient(90deg,#0e8c6a,#0e7b9c)', ['--dur']: `${duracao}ms` }}
      />
    </span>
  )
}

/* ── o quadro ────────────────────────────────────────────────────────────── */

const FASES = ['pronto', 'otimizando', 'plano', 'realocando', 'economia']
const TEMPO = { otimizando: 2400, realocando: 1800 }

export default function Retalho() {
  const { c } = useIdioma()
  const t = c.demos.retalho
  const [fase, setFase] = useState('pronto')
  const relogio = useRef(0)

  useEffect(() => () => clearTimeout(relogio.current), [])

  const avancar = (proxima, espera) => {
    clearTimeout(relogio.current)
    if (!espera || semMovimento()) return setFase(proxima)
    relogio.current = setTimeout(() => setFase(proxima), espera)
  }

  const otimizar = () => {
    evento('ferramenta', { qual: 'retalho', passo: 'otimizar' })
    setFase('otimizando')
    avancar('plano', TEMPO.otimizando)
  }

  const usarRetalhos = () => {
    evento('ferramenta', { qual: 'retalho', passo: 'usar-retalhos' })
    setFase('realocando')
    avancar('economia', TEMPO.realocando)
  }

  const recomecar = () => {
    clearTimeout(relogio.current)
    setFase('pronto')
  }


  // No celular o painel fica embaixo do desenho, e o desenho é alto: sem isto,
  // o visitante aperta o botão e o resultado nasce a meia tela de distância,
  // fora do campo de visão. Só no empilhado — no computador as duas colunas já
  // estão lado a lado.
  const painel = useRef(null)
  useEffect(() => {
    if (fase !== 'economia') return
    if (typeof window === 'undefined' || window.innerWidth >= 1024) return
    const id = requestAnimationFrame(() =>
      painel.current?.scrollIntoView({
        behavior: semMovimento() ? 'auto' : 'smooth',
        block: 'start',
      }),
    )
    return () => cancelAnimationFrame(id)
  }, [fase])

  const trabalhando = fase === 'otimizando' || fase === 'realocando'
  const passo = fase === 'pronto' || fase === 'otimizando' ? 1 : fase === 'economia' ? 3 : 2

  const semRetalho = R.recipientesSemRetalho
  const comRetalho = R.recipientes
  const soRetalhos = comRetalho.filter((x) => x.tipo === 'retalho')
  const soChapas = comRetalho.filter((x) => x.tipo === 'chapa')

  return (
    <div className="demo rounded-[24px] lg:overflow-hidden border border-line bg-card shadow-[0_36px_70px_-46px_rgba(20,55,80,.4)]">
      {/* a barra do sistema */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-line bg-soft/60 px-5 py-3 sm:px-7">
        <span className="flex items-center gap-2.5">
          <Simbolo className="h-6 w-6 rounded-[7px]" />
          <span className="text-[14px] font-extrabold tracking-[-0.015em] text-ink">
            {t.barra.titulo}
          </span>
        </span>
        <span className="cota rounded-full border border-line bg-card px-3 py-1 uppercase">
          {t.barra.pedido}
        </span>
        <span className="cota ml-auto uppercase">{t.barra.passo(passo, 3)}</span>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
        {/* ── o palco ─────────────────────────────────────────────────── */}
        <div className="demo-palco border-b border-line bg-soft/30 px-5 py-6 sm:px-7 lg:border-b-0 lg:border-r">
          {(fase === 'pronto' || fase === 'otimizando') && (
            <>
              <div className="mx-auto w-full max-w-[560px]">
                <p className="cota mb-2 uppercase">{t.desenho.chapaNova}</p>
                <FolhaVazia varrendo={fase === 'otimizando'} />

                <p className="cota mb-2 mt-7 uppercase" style={{ color: '#0e7b9c', opacity: 1 }}>
                  {t.desenho.cavalete}
                </p>
                <Cavalete />
              </div>
            </>
          )}

          {(fase === 'plano' || fase === 'realocando') && (
            <>
              <p className="cota mb-3 uppercase">{t.desenho.plano(R.chapasSemRetalho)}</p>
              <div className="grid gap-x-4 gap-y-5 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
                {semRetalho.map((rec, i) => (
                  <div key={rec.id}>
                    <Legenda rec={rec} sufixo={t.desenho.chapaN(i + 1)} />
                    <Folha rec={rec} revelar={fase === 'plano'} atraso={140 + i * 260} />
                  </div>
                ))}
              </div>
            </>
          )}

          {fase === 'economia' && (
            <>
              <p className="cota mb-3 uppercase" style={{ color: '#0e7b9c', opacity: 1 }}>
                {t.desenho.cavaletePrimeiro(R.pecasEmRetalho)}
              </p>
              <div className="grid gap-x-4 gap-y-5 sm:grid-cols-3">
                {soRetalhos.map((rec, i) => (
                  <div key={rec.id} className="surge" style={{ animationDelay: `${i * 180}ms` }}>
                    <Legenda rec={rec} sufixo={t.desenho.retalhoN(i + 1)} cor="#0e7b9c" />
                    <Folha rec={rec} />
                  </div>
                ))}
              </div>

              <p className="cota mb-3 mt-7 uppercase">
                {t.desenho.entaoChapaNova(R.chapasNovas, R.chapasSemRetalho)}
              </p>
              <div className="grid gap-x-4 gap-y-5 sm:grid-cols-3">
                {soChapas.map((rec, i) => (
                  <div
                    key={rec.id}
                    className="surge"
                    style={{ animationDelay: `${380 + i * 180}ms` }}
                  >
                    <Legenda rec={rec} sufixo={t.desenho.chapaN(i + 1)} />
                    <Folha rec={rec} />
                  </div>
                ))}
                <div className="surge" style={{ animationDelay: '760ms' }}>
                  <div className="mb-1.5 flex items-baseline justify-between gap-3">
                    <span className="cota uppercase" style={{ color: '#ee6a45', opacity: 1 }}>
                      {t.desenho.naoAberta(R.chapasSemRetalho)}
                    </span>
                  </div>
                  <Folha
                    rec={semRetalho[semRetalho.length - 1]}
                    fantasma
                    riscada
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* ── o painel ────────────────────────────────────────────────── */}
        <div ref={painel} className="flex scroll-mt-[118px] flex-col justify-center px-5 py-7 sm:px-7">
          {fase === 'pronto' && (
            <>
              <p className="cota uppercase">{t.pronto.selo}</p>
              <h3 className="display mt-2 text-[24px]">
                {t.pronto.titulo(R.pecasTotal, PECAS.length)}
              </h3>
              <ul className="mt-5 space-y-2">
                {PECAS.map((p, i) => (
                  <li key={p.chave} className="flex items-center justify-between gap-3">
                    <span className="flex min-w-0 items-center gap-2.5">
                      <i
                        aria-hidden="true"
                        className="h-3 w-3 shrink-0 rounded-[3px]"
                        style={{ background: CORES[i % CORES.length] }}
                      />
                      <span className="truncate text-[14px] font-semibold text-ink">
                        {t.pecas[p.chave]}
                      </span>
                    </span>
                    <span className="shrink-0 font-mono text-[12.5px] font-bold text-dim">
                      {p.qtd}× {p.l}×{p.a}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[14.5px] leading-[1.55] text-dim">{t.pronto.texto}</p>
            </>
          )}

          {fase === 'otimizando' && (
            <>
              <p className="cota uppercase">{t.otimizando.selo}</p>
              <h3 className="display mt-2 text-[24px]">{t.otimizando.titulo}</h3>
              <Registro
                linhas={[
                  t.otimizando.linhas.lendo(R.pecasTotal),
                  t.otimizando.linhas.respeitando,
                  t.otimizando.linhas.testando,
                  t.otimizando.linhas.ordenando,
                ]}
                passo={520}
              />
              <Barra duracao={TEMPO.otimizando} />
            </>
          )}

          {fase === 'plano' && (
            <>
              <p className="cota uppercase">{t.plano.selo}</p>
              <h3 className="display mt-2 text-[24px]">
                {t.plano.titulo(R.chapasSemRetalho, pct(APROVEITAMENTO_ANTES))}
              </h3>
              <p className="mt-3 text-[14.5px] leading-[1.55] text-dim">{t.plano.texto}</p>

              <div
                className="bate mt-7 rounded-[16px] border px-5 py-4"
                style={{
                  borderColor: 'rgba(14,123,156,.3)',
                  background: 'rgba(14,123,156,.07)',
                  animationDelay: '620ms',
                }}
              >
                <p className="cota flex items-center gap-2 uppercase" style={{ color: '#0e7b9c', opacity: 1 }}>
                  <i
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: '#0e7b9c' }}
                  />
                  {t.plano.achou}
                </p>
                <p className="mt-2.5 text-[15px] font-bold leading-snug text-ink">
                  {t.plano.servem(RETALHOS.length)}
                </p>
                <ul className="mt-2.5 space-y-1">
                  {RETALHOS.map((r) => (
                    <li key={r.l} className="font-mono text-[13px] font-semibold text-dim">
                      {t.plano.medida(`${mm(r.l)} × ${mm(r.a)}`)}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-5 text-[13.5px] leading-snug text-dim">{t.plano.parados}</p>
            </>
          )}

          {fase === 'realocando' && (
            <>
              <p className="cota uppercase">{t.realocando.selo}</p>
              <h3 className="display mt-2 text-[24px]">{t.realocando.titulo}</h3>
              <Registro
                linhas={[
                  t.realocando.linhas.medindo(RETALHOS.length),
                  t.realocando.linhas.movendo(R.pecasEmRetalho),
                  t.realocando.linhas.refazendo,
                  t.realocando.linhas.baixa,
                ]}
                passo={400}
              />
              <Barra duracao={TEMPO.realocando} />
            </>
          )}

          {fase === 'economia' && (
            <>
              <p className="cota uppercase" style={{ color: '#0e8c6a', opacity: 1 }}>
                {t.economia.selo}
              </p>
              <p className="display bate mt-2 text-[clamp(34px,4.4vw,46px)] leading-[1.02] text-verde">
                {t.economia.titulo}
                <span className="block text-ink">{t.economia.subtitulo}</span>
              </p>

              <dl className="mt-7 grid gap-px overflow-hidden rounded-[16px] bg-line">
                {[
                  [t.economia.placar.m2(m2(R.m2Recuperados)), t.economia.placar.m2Texto],
                  [
                    t.economia.placar.pecas(R.pecasEmRetalho, R.pecasTotal),
                    t.economia.placar.pecasTexto,
                  ],
                  [
                    t.economia.placar.aproveitamento(
                      pct(APROVEITAMENTO_ANTES),
                      pct(R.aproveitamento),
                    ),
                    t.economia.placar.aproveitamentoTexto,
                  ],
                  [t.economia.placar.retalhos(RETALHOS.length), t.economia.placar.retalhosTexto],
                ].map(([n, d], i) => (
                  <div
                    key={d}
                    className="sobe flex items-baseline justify-between gap-4 bg-card px-4 py-3.5"
                    style={{ animationDelay: `${240 + i * 110}ms` }}
                  >
                    <dt className="display shrink-0 text-[19px] leading-none">{n}</dt>
                    <dd className="cota max-w-[26ch] text-right normal-case leading-snug">{d}</dd>
                  </div>
                ))}
              </dl>

              <p
                className="sobe mt-6 text-[15.5px] font-bold leading-[1.45] text-ink"
                style={{ animationDelay: '720ms' }}
              >
                {t.economia.pergunta.antes} <span className="marca">{t.economia.pergunta.destaque}</span>{' '}
                {t.economia.pergunta.depois}
              </p>
              <p
                className="sobe mt-3 text-[14px] leading-[1.55] text-dim"
                style={{ animationDelay: '820ms' }}
              >
                {t.economia.sozinho}
              </p>
            </>
          )}
        </div>
      </div>

      {/* ── a barra de ação ─────────────────────────────────────────────── */}
      <div className="demo-acao flex flex-wrap items-center gap-3 border-t border-line bg-soft/40 px-5 py-4 sm:px-7">
        {fase === 'pronto' && (
          <button type="button" onClick={otimizar} className="botao-marca px-7 py-3.5 text-[15px]">
            {t.botoes.otimizar}
          </button>
        )}

        {trabalhando && (
          <span className="botao-marca inline-flex items-center gap-2.5 px-7 py-3.5 text-[15px] opacity-70">
            <i
              aria-hidden="true"
              className="h-2 w-2 animate-pulse rounded-full"
              style={{ background: '#fff' }}
            />
            {fase === 'otimizando' ? t.botoes.otimizando : t.botoes.realocando}
          </span>
        )}

        {fase === 'plano' && (
          <button
            type="button"
            onClick={usarRetalhos}
            className="botao-marca px-7 py-3.5 text-[15px]"
            style={{ background: 'linear-gradient(90deg,#0e7b9c,#0e8c6a)' }}
          >
            {t.botoes.usarRetalhos(RETALHOS.length)}
          </button>
        )}

        {fase === 'economia' && (
          <>
            <a
              href={linkAgendar(c.whatsapp.demonstracao)}
              target={ehExterno(linkAgendar(c.whatsapp.demonstracao)) ? '_blank' : undefined}
              rel={ehExterno(linkAgendar(c.whatsapp.demonstracao)) ? 'noreferrer' : undefined}
              onClick={() => evento('agendar', { origem: 'ferramenta-retalho' })}
              className="botao-marca px-7 py-3.5 text-[15px]"
            >
              {t.botoes.agendar}
            </a>
            <button
              type="button"
              onClick={recomecar}
              className="rounded-[13px] border border-line bg-card px-6 py-3.5 text-[14.5px] font-bold text-ink transition-colors hover:border-verde hover:text-verde"
            >
              {t.botoes.denovo}
            </button>
          </>
        )}

        <p className="cota ml-auto max-w-[38ch] normal-case leading-snug">
          {fase === 'economia' ? t.nota.economia : t.nota.padrao}
        </p>
      </div>
    </div>
  )
}
