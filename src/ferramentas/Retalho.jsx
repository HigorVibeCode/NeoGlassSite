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

/* O retalho tem IDENTIDADE, não só medida.
   Era esse o buraco da demonstração: dois retângulos tracejados com uma medida
   dentro parecem sobra achada por acaso. O que convence dono de fábrica é o
   contrário — que a sobra virou item de estoque, com código, endereço e data,
   e que por isso o otimizador consegue contar com ela. `codigo` e `posicao`
   fazem esse trabalho; `origem` e `dias` mostram que o registro nasceu sozinho
   de um pedido anterior, e não de alguém lembrando de cadastrar. */
const RETALHOS = [
  { l: 2100, a: 1300, codigo: 'RT-0412', posicao: 'B · 03', origem: '25-1180', dias: 12 },
  { l: 1480, a: 1200, codigo: 'RT-0389', posicao: 'B · 07', origem: '25-1147', dias: 26 },
]

/* O cavalete inteiro, e não só o que serve para este pedido. É a diferença
   entre "achamos duas sobras" e "o seu estoque está sob controle": o visitante
   vê seis peças catalogadas, e o sistema escolhendo duas. As outras quatro
   existem para ele reconhecer o próprio cavalete. */
const ESTOQUE = [
  ...RETALHOS,
  { l: 980, a: 1450, codigo: 'RT-0401', posicao: 'B · 05', origem: '25-1166', dias: 18 },
  { l: 1620, a: 640, codigo: 'RT-0377', posicao: 'A · 02', origem: '25-1131', dias: 31 },
  { l: 740, a: 700, codigo: 'RT-0420', posicao: 'A · 09', origem: '25-1192', dias: 6 },
  { l: 2260, a: 480, codigo: 'RT-0355', posicao: 'A · 11', origem: '25-1104', dias: 44 },
]
const SERVE = new Set(RETALHOS.map((r) => r.codigo))

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

/* Os separadores de número acompanham o idioma da página, e não o português.
   Português, espanhol e alemão escrevem 2.100 e 2,73; inglês escreve 2,100 e
   2.73 — trocado, um leitor inglês lê "2,73 m²" como dois mil e setecentos.

   O idioma fica numa variável do módulo, e não num parâmetro, porque `mm` é
   chamado lá dentro do desenho de cada folha — passar o idioma por seis níveis
   de componente para formatar um número não pagaria o barulho. Cada página
   renderiza um idioma só, então não há duas leituras concorrentes. */
const LOCAIS = { pt: 'pt-BR', en: 'en-US', es: 'es-ES', de: 'de-DE' }
let local = LOCAIS.pt
const mm = (n) => n.toLocaleString(local)
const m2 = (n) => n.toLocaleString(local, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
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
          {/* O código vem ANTES da medida, e maior. É o que separa "sobra
              encostada" de "item de estoque": no cavalete de verdade essa é a
              etiqueta colada na peça, e é por ela que o encarregado acha o
              vidro sem medir nada. A medida vira a legenda. */}
          <text
            x={x + r.l / 2}
            y={CHAO - r.a / 2 - 90}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="165"
            fontFamily="IBM Plex Mono, monospace"
            fontWeight="700"
            fill="#0e7b9c"
          >
            {r.codigo}
          </text>
          <text
            x={x + r.l / 2}
            y={CHAO - r.a / 2 + 105}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="120"
            fontFamily="IBM Plex Mono, monospace"
            fontWeight="600"
            fill="#0e7b9c"
            opacity="0.75"
          >
            {mm(r.l)}×{mm(r.a)}
          </text>
        </g>
      ))}
    </svg>
  )
}

/* ── o cavalete inteiro, desenhado ──────────────────────────────────────────
   A primeira versão desta tela era uma TABELA com código, medida, posição e
   dias. Estava correta e era ilegível: número em coluna não conta história, e
   quem abre o site não está auditando estoque — está tentando entender numa
   olhada se aquilo serve para ele.

   Aqui o mesmo dado vira desenho. As seis peças aparecem em escala real, umas
   maiores que as outras, encostadas no cavalete como ficam na fábrica. As duas
   que servem para o pedido acendem em verde e ganham um visto; as outras quatro
   ficam apagadas, e é o contraste entre acesas e apagadas que diz "o sistema
   escolheu" sem precisar de uma frase explicando.

   O código continua na peça, porque é ele que faz a sobra virar item de
   estoque — mas agora ele está numa etiqueta desenhada, como a de verdade. */
function CavaleteCheio({ acesos, rotulos }) {
  /* Dois níveis, e não uma fileira só.
     Em fila única as seis peças davam um desenho de 4600 × 1400 — largo e raso,
     que no cartão vira uma tira de vidros minúsculos. Empilhado em dois
     cavaletes o quadro fica quase quadrado e cada peça cresce três vezes. E é
     como a fábrica guarda de verdade: um cavalete por lado do corredor. */
  /* Cada nível tem a altura da SUA peça mais alta, e não uma altura fixa: com
     altura fixa sobrava vazio embaixo do cavalete das peças baixas e o rótulo
     do de cima saía fora do quadro. */
  const ROTULO = 190
  const RESPIRO = 210
  const GAP = 150
  const niveis = ['B', 'A'].map((letra) => {
    const pecas = ESTOQUE.filter((r) => r.posicao.startsWith(letra))
    // O rótulo do nível fica ACIMA da peça mais alta daquele cavalete, e não
    // numa altura fixa: com altura fixa ele caía dentro do vidro de 1.450.
    return { letra, pecas, maisAlta: Math.max(...pecas.map((r) => r.a)) }
  })
  const largura = Math.max(
    ...niveis.map((n) => n.pecas.reduce((soma, r) => soma + r.l, 0) + GAP * (n.pecas.length + 1)),
  )

  // A linha de chão de cada nível, empilhando de cima para baixo.
  let acumulado = 0
  const chaos = niveis.map((nivel) => {
    acumulado += ROTULO + nivel.maisAlta
    const chao = acumulado
    acumulado += RESPIRO
    return chao
  })

  return (
    <svg
      viewBox={`0 0 ${largura} ${acumulado}`}
      className="block w-full"
      aria-hidden="true"
    >
      {niveis.map((nivel, n) => {
        const chao = chaos[n]
        let x = GAP
        return (
          <g key={nivel.letra}>
            <text
              x={GAP}
              y={chao - nivel.maisAlta - 70}
              fontSize="105"
              fontFamily="IBM Plex Mono, monospace"
              fontWeight="600"
              letterSpacing="14"
              fill="#96a4b4"
            >
              {rotulos.cavalete} {nivel.letra}
            </text>
            <line x1="0" y1={chao} x2={largura} y2={chao} stroke="#b6c2d1" strokeWidth="22" />
            {nivel.pecas.map((r, i) => {
              const on = acesos.has(r.codigo)
              const meu = x
              x += r.l + GAP
              const giro = i % 2 ? 1.2 : -1.4
              return (
                <g
                  key={r.codigo}
                  transform={`rotate(${giro} ${meu + r.l / 2} ${chao})`}
                  className="sobe"
                  style={{ animationDelay: `${140 + (n * 3 + i) * 130}ms` }}
                >
                  <rect
                    x={meu}
                    y={chao - r.a}
                    width={r.l}
                    height={r.a}
                    rx="18"
                    fill={on ? 'rgba(14,140,106,.17)' : 'rgba(182,194,209,.2)'}
                    stroke={on ? '#0e8c6a' : '#b6c2d1'}
                    strokeWidth={on ? 20 : 11}
                  />
                  {/* a etiqueta colada na peça — é ela que faz a sobra virar item */}
                  <g transform={`translate(${meu + r.l / 2} ${chao - r.a + 130})`}>
                    <rect
                      x="-235"
                      y="-78"
                      width="470"
                      height="156"
                      rx="40"
                      fill={on ? '#0e8c6a' : '#ffffff'}
                      stroke={on ? '#0e8c6a' : '#b6c2d1'}
                      strokeWidth="10"
                    />
                    <text
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize="104"
                      fontFamily="IBM Plex Mono, monospace"
                      fontWeight="700"
                      fill={on ? '#ffffff' : '#5c7280'}
                    >
                      {r.codigo}
                    </text>
                  </g>
                  <text
                    x={meu + r.l / 2}
                    y={chao - r.a / 2 + 60}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize="112"
                    fontFamily="IBM Plex Mono, monospace"
                    fontWeight="600"
                    fill={on ? '#0e8c6a' : '#96a4b4'}
                  >
                    {mm(r.l)}×{mm(r.a)}
                  </text>
                  {on && (
                    <g transform={`translate(${meu + r.l / 2} ${chao - r.a / 2 + 290})`}>
                      <circle r="92" fill="#0e8c6a" />
                      <path
                        d="M-40 4 L-12 34 L40 -28"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  )}
                </g>
              )
            })}
          </g>
        )
      })}
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

const FASES = ['pronto', 'otimizando', 'plano', 'catalogo', 'realocando', 'economia']
const TEMPO = { otimizando: 2400, realocando: 1800 }

export default function Retalho() {
  const { c, idioma } = useIdioma()
  local = LOCAIS[idioma] ?? LOCAIS.pt
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

  const verEstoque = () => {
    evento('ferramenta', { qual: 'retalho', passo: 'ver-estoque' })
    setFase('catalogo')
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
  const passo =
    fase === 'pronto' || fase === 'otimizando'
      ? 1
      : fase === 'plano'
        ? 2
        : fase === 'economia'
          ? 4
          : 3

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
        <span className="cota ml-auto uppercase">{t.barra.passo(passo, 4)}</span>
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

          {fase === 'catalogo' && (
            <div className="mx-auto w-full max-w-[620px]">
              <p className="cota uppercase" style={{ color: '#0e7b9c', opacity: 1 }}>
                {t.catalogo.selo}
              </p>
              <div className="mt-4">
                <CavaleteCheio acesos={SERVE} rotulos={t.catalogo} />
              </div>
              <p className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] font-semibold text-dim">
                <span className="flex items-center gap-2">
                  <i aria-hidden="true" className="h-2.5 w-2.5 rounded-[3px]" style={{ background: '#0e8c6a' }} />
                  {t.catalogo.legendaServe}
                </span>
                <span className="flex items-center gap-2">
                  <i aria-hidden="true" className="h-2.5 w-2.5 rounded-[3px]" style={{ background: '#b6c2d1' }} />
                  {t.catalogo.legendaEspera}
                </span>
              </p>
            </div>
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
                {/* Antes eram duas linhas de texto corrido, e cada uma repetia
                    "vidro que você já comprou" por extenso — o olho lia a mesma
                    frase duas vezes e o cérebro parava de ler na segunda. Agora
                    a medida é o dado, e o que ela vale vem em pílula ao lado:
                    a área em m² (calculada, não escrita) e o carimbo de que
                    aquilo já é matéria-prima paga. */}
                <ul className="mt-3 space-y-2">
                  {RETALHOS.map((r) => (
                    <li key={r.l} className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
                      <span className="font-mono text-[13.5px] font-bold text-ink">
                        {mm(r.l)} × {mm(r.a)}
                      </span>
                      <span
                        className="rounded-full px-2 py-0.5 font-mono text-[11.5px] font-bold"
                        style={{ background: 'rgba(14,123,156,.1)', color: '#0e7b9c' }}
                      >
                        {m2((r.l * r.a) / 1e6)} m²
                      </span>
                      <span
                        className="rounded-full px-2 py-0.5 text-[11.5px] font-bold"
                        style={{ background: 'rgba(14,140,106,.1)', color: '#0e8c6a' }}
                      >
                        {t.plano.jaPago}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-5 text-[13.5px] leading-snug text-dim">{t.plano.parados}</p>
            </>
          )}

          {fase === 'catalogo' && (
            <>
              <p className="cota uppercase">{t.catalogo.painel.selo}</p>
              <h3 className="display mt-2 text-[24px]">{t.catalogo.painel.titulo(ESTOQUE.length)}</h3>

              {/* A frase do Higor, e ela é o argumento inteiro: o corte de hoje
                  já é calculado pensando no pedido de amanhã. Fica em destaque
                  porque nada mais nesta tela precisa ser lido com atenção. */}
              <p
                className="bate mt-6 rounded-[16px] border px-5 py-4 text-[15px] font-bold leading-snug text-ink"
                style={{
                  borderColor: 'rgba(14,140,106,.3)',
                  background: 'rgba(14,140,106,.07)',
                  animationDelay: '520ms',
                }}
              >
                {t.catalogo.painel.frase}
              </p>

              <dl className="mt-7 space-y-4">
                {t.catalogo.painel.pontos.map(([titulo, detalhe], i) => (
                  <div
                    key={titulo}
                    className="sobe flex items-start gap-3"
                    style={{ animationDelay: `${680 + i * 140}ms` }}
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                      style={{ background: 'rgba(14,140,106,.12)' }}
                    >
                      <svg viewBox="0 0 16 16" className="h-3 w-3">
                        <path
                          d="M3 8.5l3.2 3.2L13 5"
                          fill="none"
                          stroke="#0e8c6a"
                          strokeWidth="2.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[14px] font-bold text-ink">{titulo}</span>
                      <span className="block text-[13.5px] leading-snug text-dim">{detalhe}</span>
                    </span>
                  </div>
                ))}
              </dl>
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
            onClick={verEstoque}
            className="botao-marca px-7 py-3.5 text-[15px]"
            style={{ background: 'linear-gradient(90deg,#0e7b9c,#0e8c6a)' }}
          >
            {t.botoes.verEstoque}
          </button>
        )}

        {fase === 'catalogo' && (
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
