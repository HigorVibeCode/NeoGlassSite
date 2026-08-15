import { useEffect, useRef, useState } from 'react'
import { evento } from '../lib/rastreio.js'
import { semMovimento } from '../lib/dispositivo.js'
import { useTextos } from '../i18n/idioma.jsx'

/**
 * Um projeto nascendo, do vão à janela montada.
 *
 * É a resposta ao "projeto em menos de um minuto": em vez de escrever a
 * promessa, a página mostra a coisa acontecendo. Um clique, cinco atos, e
 * pronto — o visitante não decide nada e não preenche nada.
 *
 * A regra de composição, que já custou três tentativas ruins para ser
 * aprendida: UMA COISA POR ATO, grande, ocupando o quadrado inteiro. Nada de
 * dois elementos disputando atenção, nada de balão em cima de desenho. O texto
 * entra, cumpre a função e SAI — no fim da sequência não sobrou palavra nenhuma
 * na tela além da legenda do ato corrente.
 *
 * Os cinco atos, e o que cada um prova:
 *   1. o vão se transforma      → aqui se começa pelo VÃO, não por uma folha em branco
 *   2. as cotas se escrevem     → a medida é a da obra, digitada por quem mediu
 *   3. o que vai nesse vão      → o mesmo vão serve para box, porta ou janela
 *   4. o vão se divide          → o modelo vem da biblioteca, não do desenho à mão
 *   5. explode e remonta        → o projeto sabe das peças: alumínio, vedação,
 *                                 roldana, trinco, transpasse e folga
 *
 * O ato 5 é o desfecho de propósito. Vista explodida é a única forma de mostrar
 * vedação e transpasse sem escrever o nome de nada — assim que a camada de cima
 * assenta, as de baixo somem de vista para sempre.
 *
 * NENHUMA especificação de ferragem é escrita aqui. É regra do produto: o
 * NeoGlass não crava bitola nem capacidade de roldana, porque errar isso é
 * responsabilidade que não se assume por um cliente. A peça é desenhada; o
 * número dela não é inventado.
 *
 * Nada roda por quadro: cada ato é um `setTimeout` e o movimento é CSS. Quem
 * pediu menos movimento no sistema recebe o quadro final, parado.
 */

/* O compasso. Foi calibrado para leitura, não para pressa: o ato mais curto
   ainda dá tempo de ler a legenda inteira antes de trocar. */
const TEMPO = {
  vao: 3200, // três configurações de parede, ~1,05 s cada
  medida: 3000, // as cotas se escrevem, ficam 1,4 s e somem
  tipo: 2800, // quatro usos piscando dentro do vão
  folhas: 3400, // 2 → 3 → 4 folhas
  montagem: 5600, // explode, segura, remonta, abre
}
const TOTAL = Object.values(TEMPO).reduce((a, b) => a + b, 0)

/* A medida do exemplo. Proporção de janela de correr de quatro folhas de
   verdade — mais larga que alta, que é o que faz um vidraceiro reconhecer a
   peça em vez de ver um quadrado. */
const VAO = { largura: 1800, altura: 1100 }

/* O palco é quadrado (400 × 400) e o vão vive no meio dele, com folga em volta
   para as paredes do ato 1 e para as cotas do ato 2 caberem sem apertar. */
const Q = 400
const V = { x: 76, y: 128, l: 248, a: 152 }
const VD = V.x + V.l
const VB = V.y + V.a

/** As três configurações de parede do ato 1, na ordem em que aparecem. */
const PAREDES = [
  { id: 'fechado', cima: true, baixo: true, esq: true, dir: true },
  { id: 'uma', cima: false, baixo: true, esq: true, dir: false },
  { id: 'duas', cima: false, baixo: true, esq: true, dir: true },
]

/** Os quatro usos do ato 3. Desenhados dentro do próprio vão, como sombra. */
const USOS = ['box', 'porta', 'janela', 'fixo']

const AZUL = '#4f6bf6'
const TRACO = '#8aa0b8'

/* ── as peças do palco ───────────────────────────────────────────────────── */

/** A parede: hachura curta, do jeito que se marca alvenaria em planta. */
function Parede({ x, y, l, a, mostra }) {
  const traços = []
  const passo = 9
  const diagonal = l > a ? l : a
  for (let i = -a; i < diagonal + a; i += passo) traços.push(i)
  return (
    <g style={{ opacity: mostra ? 1 : 0, transition: 'opacity 460ms ease' }}>
      <rect x={x} y={y} width={l} height={a} fill="#eef1f5" />
      <clipPath id={`p-${x}-${y}`}>
        <rect x={x} y={y} width={l} height={a} />
      </clipPath>
      <g clipPath={`url(#p-${x}-${y})`} stroke="#c3ccd8" strokeWidth="1">
        {traços.map((i) => (
          <path key={i} d={`M${x + i} ${y + a} L${x + i + a} ${y}`} />
        ))}
      </g>
      <rect x={x} y={y} width={l} height={a} fill="none" stroke={TRACO} strokeWidth="1.6" />
    </g>
  )
}

/** Uma folha de vidro. `corre` desloca a móvel; `abre` é o quanto ela correu. */
function Folha({ x, l, movel = false, abre = 0, transpasse = 0 }) {
  return (
    <g style={{ transform: `translateX(${abre}px)`, transition: 'transform 900ms ease-in-out' }}>
      <rect
        x={x}
        y={V.y}
        width={l + transpasse}
        height={V.a}
        fill={movel ? 'rgba(79,107,246,.16)' : 'rgba(138,160,184,.12)'}
        stroke={movel ? AZUL : TRACO}
        strokeWidth={movel ? 2.2 : 1.4}
      />
      {/* o reflexo, que é o que faz o retângulo virar vidro */}
      <path
        d={`M${x + 6} ${VB - 8} L${x + l * 0.55} ${V.y + 8}`}
        stroke="#fff"
        strokeWidth="6"
        opacity=".5"
        strokeLinecap="round"
      />
      {movel && (
        <rect x={x + l - 12} y={V.y + V.a / 2 - 11} width="4" height="22" rx="2" fill={AZUL} />
      )}
    </g>
  )
}

/* ── ato 1 · o vão se transforma ─────────────────────────────────────────── */

function AtoVao({ passo }) {
  const p = PAREDES[Math.min(passo, PAREDES.length - 1)]
  const E = 26
  return (
    <g>
      <Parede x={V.x - E} y={V.y - E} l={V.l + E * 2} a={E} mostra={p.cima} />
      <Parede x={V.x - E} y={VB} l={V.l + E * 2} a={E} mostra={p.baixo} />
      <Parede x={V.x - E} y={V.y} l={E} a={V.a} mostra={p.esq} />
      <Parede x={VD} y={V.y} l={E} a={V.a} mostra={p.dir} />
      <rect x={V.x} y={V.y} width={V.l} height={V.a} fill="#fff" />
      <rect
        x={V.x}
        y={V.y}
        width={V.l}
        height={V.a}
        fill="none"
        stroke={AZUL}
        strokeWidth="2"
        strokeDasharray="7 5"
      />
    </g>
  )
}

/* ── ato 2 · as cotas ────────────────────────────────────────────────────── */

function Cota({ de, para, valor, vertical = false, some }) {
  const meio = { x: (de.x + para.x) / 2, y: (de.y + para.y) / 2 }
  return (
    <g
      style={{ opacity: some ? 0 : 1, transition: 'opacity 520ms ease' }}
      stroke={AZUL}
      fill="none"
      strokeWidth="1.4"
    >
      <path d={`M${de.x} ${de.y} L${para.x} ${para.y}`} pathLength="1" className="cota-traco" />
      {vertical ? (
        <>
          <path d={`M${de.x - 5} ${de.y} L${de.x + 5} ${de.y}`} />
          <path d={`M${para.x - 5} ${para.y} L${para.x + 5} ${para.y}`} />
        </>
      ) : (
        <>
          <path d={`M${de.x} ${de.y - 5} L${de.x} ${de.y + 5}`} />
          <path d={`M${para.x} ${para.y - 5} L${para.x} ${para.y + 5}`} />
        </>
      )}
      <text
        x={vertical ? meio.x + 24 : meio.x}
        y={vertical ? meio.y : meio.y - 9}
        textAnchor="middle"
        dominantBaseline={vertical ? 'central' : 'auto'}
        fontSize="17"
        fontFamily="IBM Plex Mono, monospace"
        fontWeight="600"
        fill={AZUL}
        stroke="none"
        /* o número se escreve: entra letra por letra pelo recorte da largura */
        className="cota-escreve"
      >
        {valor}
      </text>
    </g>
  )
}

/* ── ato 3 · o que vai nesse vão ─────────────────────────────────────────── */

function Uso({ qual }) {
  const m = 14
  const x = V.x + m
  const y = V.y + m
  const l = V.l - m * 2
  const a = V.a - m * 2
  const comum = { fill: 'rgba(79,107,246,.13)', stroke: AZUL, strokeWidth: 2 }
  if (qual === 'box')
    return (
      <g {...comum}>
        <rect x={x} y={y} width={l * 0.48} height={a} />
        <rect x={x + l * 0.44} y={y} width={l * 0.56} height={a} strokeWidth="2.6" />
        <path d={`M${x + l * 0.7} ${y + a / 2} L${x + l * 0.92} ${y + a / 2}`} fill="none" />
      </g>
    )
  if (qual === 'porta')
    return (
      <g {...comum}>
        <rect x={x + l * 0.28} y={y} width={l * 0.44} height={a} />
        <path
          d={`M${x + l * 0.72} ${y} A${l * 0.44} ${l * 0.44} 0 0 1 ${x + l * 0.72} ${y + a}`}
          fill="none"
          strokeDasharray="6 5"
          opacity=".7"
        />
      </g>
    )
  if (qual === 'janela')
    return (
      <g {...comum}>
        <rect x={x} y={y} width={l} height={a} />
        <path d={`M${x + l / 2} ${y} L${x + l / 2} ${y + a}`} fill="none" />
        <path
          d={`M${x + l * 0.56} ${y + a / 2} L${x + l * 0.86} ${y + a / 2} M${x + l * 0.78} ${y + a / 2 - 6} L${x + l * 0.86} ${y + a / 2} L${x + l * 0.78} ${y + a / 2 + 6}`}
          fill="none"
        />
      </g>
    )
  return (
    <g {...comum}>
      <rect x={x} y={y} width={l} height={a} />
      <path d={`M${x + 10} ${y + a - 10} L${x + l * 0.5} ${y + 10}`} fill="none" opacity=".45" />
    </g>
  )
}

/* ── ato 4 · o vão se divide ─────────────────────────────────────────────── */

function AtoFolhas({ quantas, abre = 0 }) {
  const l = V.l / quantas
  const folhas = Array.from({ length: quantas }, (_, i) => i)
  // Com quatro folhas as móveis são as duas do meio, e elas correm para fora.
  const movel = (i) => quantas === 4 && (i === 1 || i === 2)
  return (
    <g>
      <rect x={V.x} y={V.y} width={V.l} height={V.a} fill="#fff" stroke={TRACO} strokeWidth="1.4" />
      {folhas.map((i) => (
        <Folha
          key={i}
          x={V.x + i * l}
          l={l}
          movel={movel(i)}
          abre={movel(i) ? (i === 1 ? -abre : abre) : 0}
        />
      ))}
      {quantas === 4 && (
        <g stroke={AZUL} strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d={`M${V.x + V.l / 2 - 8} ${VB + 20} L${V.x + V.l / 2 - 34} ${VB + 20}`} />
          <path
            d={`M${V.x + V.l / 2 - 27} ${VB + 14} L${V.x + V.l / 2 - 34} ${VB + 20} L${V.x + V.l / 2 - 27} ${VB + 26}`}
          />
          <path d={`M${V.x + V.l / 2 + 8} ${VB + 20} L${V.x + V.l / 2 + 34} ${VB + 20}`} />
          <path
            d={`M${V.x + V.l / 2 + 27} ${VB + 14} L${V.x + V.l / 2 + 34} ${VB + 20} L${V.x + V.l / 2 + 27} ${VB + 26}`}
          />
        </g>
      )}
    </g>
  )
}

/* ── ato 5 · explode e remonta ───────────────────────────────────────────── */

/* As camadas da janela montada, de baixo para cima. `sobe` é o quanto cada uma
   se afasta na vista explodida — é a ordem real de montagem, e é ela que conta
   a história: o alumínio embaixo, a vedação entre o alumínio e o vidro, o vidro
   por cima, e a ferragem por último. */
const CAMADAS = [
  { id: 'aluminio', sobe: 0 },
  { id: 'vedacao', sobe: 38 },
  { id: 'vidro', sobe: 80 },
  { id: 'ferragem', sobe: 122 },
]

function Montagem({ aberto, explode, abre }) {
  // A perspectiva é um paralelogramo: cada camada desliza na diagonal, e a
  // profundidade vem do deslocamento, não de matemática 3D.
  const dx = (n) => -n * 0.62
  const dy = (n) => -n
  const l = V.l / 4

  /* Cada camada tem a SUA cor, e não é enfeite: separadas sobre o painel
     escuro, quatro planos no mesmo cinza viram uma mancha só — foi o que
     aconteceu na primeira montagem. As quatro cores são as que o painel 3D do
     próprio sistema já usa, então isto não inventa paleta nenhuma:

       alumínio  cinza claro   o perfil, o que sustenta
       vedação   menta         a borracha e a escova, inclusive no transpasse
       vidro     azul          as quatro folhas
       ferragem  âmbar         roldanas e trinco — metal, e o olho lê como metal
  */
  const camada = (id, n) => {
    const t = explode ? n : 0
    const estilo = {
      transform: `translate(${dx(t)}px, ${dy(t)}px)`,
      transition: 'transform 1100ms cubic-bezier(.4,0,.2,1)',
      filter: explode ? 'drop-shadow(0 8px 14px rgba(0,0,0,.6))' : 'none',
    }

    if (id === 'aluminio')
      return (
        <g key={id} style={estilo}>
          <rect x={V.x - 8} y={V.y - 12} width={V.l + 16} height={12} rx="3" fill="#dfe5e8" />
          <rect x={V.x - 8} y={VB} width={V.l + 16} height={12} rx="3" fill="#c2ccd4" />
          <rect x={V.x - 8} y={V.y} width={8} height={V.a} fill="#dfe5e8" />
          <rect x={VD} y={V.y} width={8} height={V.a} fill="#dfe5e8" />
          {/* o rasgo do trilho, que é o que faz o perfil parecer perfil */}
          <rect x={V.x} y={V.y - 8} width={V.l} height="2.4" fill="#8e9aa6" opacity=".9" />
          <rect x={V.x} y={VB + 4} width={V.l} height="2.4" fill="#8e9aa6" opacity=".9" />
        </g>
      )

    if (id === 'vedacao')
      return (
        <g key={id} style={estilo} stroke="#7fe0c8" strokeLinecap="round" fill="none">
          <path d={`M${V.x + 2} ${V.y} L${V.x + 2} ${VB}`} strokeWidth="5" />
          <path d={`M${VD - 2} ${V.y} L${VD - 2} ${VB}`} strokeWidth="5" />
          {/* O encontro das duas móveis: é aqui que mora o transpasse. Ele
              some quando a janela abre, porque essa vedação viaja com a folha
              — deixá-la parada no vazio é o tipo de erro que um vidraceiro vê
              na hora. */}
          <path
            d={`M${V.x + V.l / 2} ${V.y} L${V.x + V.l / 2} ${VB}`}
            strokeWidth="5"
            style={{ opacity: abre ? 0 : 1, transition: 'opacity 500ms ease' }}
          />
          <path d={`M${V.x} ${VB - 2} L${VD} ${VB - 2}`} strokeWidth="3.4" opacity=".75" />
          <path d={`M${V.x} ${V.y + 2} L${VD} ${V.y + 2}`} strokeWidth="3.4" opacity=".75" />
        </g>
      )

    if (id === 'vidro')
      return (
        <g key={id} style={estilo}>
          {[0, 1, 2, 3].map((i) => {
            const movel = i === 1 || i === 2
            // O transpasse: a móvel é mais larga que o módulo, e é essa sobra
            // que cobre a folga quando a janela fecha.
            const transpasse = movel ? 11 : 0
            const desloca = movel ? (i === 1 ? -abre : abre) : 0
            const px = V.x + i * l - (i === 2 ? transpasse : 0)
            return (
              <g
                key={i}
                style={{
                  transform: `translateX(${desloca}px)`,
                  transition: 'transform 1000ms ease-in-out',
                }}
              >
                <rect
                  x={px}
                  y={V.y + 3}
                  width={l + transpasse}
                  height={V.a - 6}
                  fill="#8fb6ff"
                  fillOpacity={movel ? 0.3 : 0.16}
                  stroke="#8fb6ff"
                  strokeWidth={movel ? 2 : 1.2}
                  strokeOpacity={movel ? 0.95 : 0.55}
                />
                <path
                  d={`M${px + 9} ${VB - 12} L${px + l * 0.62} ${V.y + 12}`}
                  stroke="#fff"
                  strokeWidth="5"
                  opacity=".3"
                  strokeLinecap="round"
                />
              </g>
            )
          })}
        </g>
      )

    return (
      <g key={id} style={estilo}>
        {[1, 2].map((i) => {
          const desloca = i === 1 ? -abre : abre
          return (
            <g
              key={i}
              style={{
                transform: `translateX(${desloca}px)`,
                transition: 'transform 1000ms ease-in-out',
              }}
            >
              {/* roldanas: duas em cima e duas embaixo de cada folha móvel */}
              {[V.x + i * l + 13, V.x + (i + 1) * l - 13].map((cx) => (
                <g key={cx}>
                  <circle cx={cx} cy={V.y + 8} r="5" fill="#f0b978" />
                  <circle cx={cx} cy={V.y + 8} r="1.8" fill="#111a33" />
                  <circle cx={cx} cy={VB - 8} r="4" fill="#f0b978" opacity=".85" />
                </g>
              ))}
              {/* o trinco, no encontro das duas móveis */}
              {i === 1 && (
                <g>
                  <rect
                    x={V.x + l * 2 - 6}
                    y={V.y + V.a / 2 - 11}
                    width="12"
                    height="22"
                    rx="4"
                    fill="#f0b978"
                  />
                  <rect
                    x={V.x + l * 2 - 2}
                    y={V.y + V.a / 2 - 4}
                    width="4"
                    height="8"
                    rx="2"
                    fill="#111a33"
                    opacity=".7"
                  />
                </g>
              )}
            </g>
          )
        })}
      </g>
    )
  }

  return (
    <g style={{ opacity: aberto ? 1 : 0, transition: 'opacity 600ms ease' }}>
      <rect x="14" y="14" width={Q - 28} height={Q - 28} rx="18" fill="#111a33" />
      {/* Aberta, a pilha ocupa 122 px a mais para cima e para a esquerda — ela
          saía pela borda do painel escuro. Em vez de encolher a separação (que
          é o que faz as camadas se lerem), o conjunto inteiro recua e desce
          enquanto está explodido, e volta ao lugar ao remontar. */}
      <g
        style={{
          transform: explode ? 'translate(38px, 56px) scale(.82)' : 'none',
          transformOrigin: 'center',
          transformBox: 'fill-box',
          transition: 'transform 1100ms cubic-bezier(.4,0,.2,1)',
        }}
      >
        <ellipse
          cx={Q / 2}
          cy={VB + 54}
          rx="118"
          ry="9"
          fill="#000"
          style={{ opacity: explode ? 0 : 0.35, transition: 'opacity 700ms ease' }}
        />
        {CAMADAS.map((c) => camada(c.id, c.sobe))}
      </g>
    </g>
  )
}

/* O disparo de fora: o botão "Ver como funciona" da abertura desce até aqui e
   toca a sequência no mesmo clique. */
export const EVENTO_TOCAR = 'neoglass:tocar-projeto'

/* ── a peça inteira ──────────────────────────────────────────────────────── */

export default function Projeto() {
  const t = useTextos().demos.projeto
  const [ato, setAto] = useState('parado') // parado · vao · medida · tipo · folhas · montagem · fim
  const [passo, setPasso] = useState(0)
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
    setPasso(0)

    // Quem pediu menos movimento recebe o desfecho, parado. Não é versão
    // pobre: é o quadro que a sequência inteira existe para entregar.
    if (semMovimento()) {
      setAto('montagem')
      setAbre(V.l / 4 - 14)
      return marcar(60, () => setAto('fim'))
    }

    setAto('vao')
    // ato 1 — as paredes trocam três vezes
    marcar(TEMPO.vao / 3, () => setPasso(1))
    marcar((TEMPO.vao / 3) * 2, () => setPasso(2))

    let soma = TEMPO.vao
    marcar(soma, () => {
      setAto('medida')
      setPasso(0)
    })
    // as cotas somem antes de o ato acabar, para o vão entrar limpo no ato 3
    marcar(soma + TEMPO.medida - 700, () => setPasso(1))

    soma += TEMPO.medida
    marcar(soma, () => {
      setAto('tipo')
      setPasso(0)
    })
    // os quatro usos, e a janela é a que fica
    USOS.forEach((_, i) => {
      if (i) marcar(soma + (TEMPO.tipo / 4.6) * i, () => setPasso(i))
    })

    soma += TEMPO.tipo
    marcar(soma, () => {
      setAto('folhas')
      setPasso(0)
    })
    marcar(soma + TEMPO.folhas * 0.3, () => setPasso(1))
    marcar(soma + TEMPO.folhas * 0.6, () => setPasso(2))

    soma += TEMPO.folhas
    marcar(soma, () => {
      setAto('montagem')
      setPasso(0)
    })
    marcar(soma + 500, () => setExplode(true)) // separa as camadas
    marcar(soma + 2900, () => setExplode(false)) // e as encaixa de volta
    marcar(soma + 4100, () => setAbre(V.l / 4 - 14)) // as móveis correm do centro

    marcar(TOTAL, () => setAto('fim'))
  }

  // O botão da abertura desce até aqui e toca no mesmo clique. Sem isto seriam
  // dois cliques para uma coisa só — e o segundo, quase ninguém dá.
  useEffect(() => {
    const ouvir = () => tocar()
    window.addEventListener(EVENTO_TOCAR, ouvir)
    return () => window.removeEventListener(EVENTO_TOCAR, ouvir)
  })

  const rodando = ato !== 'parado' && ato !== 'fim'
  const legenda = t.atos[ato === 'fim' ? 'montagem' : ato]

  return (
    <div className="mx-auto w-full max-w-[560px]">
      <div className="overflow-hidden rounded-[22px] border border-line bg-card">
        <div className="demo-palco relative bg-soft/30 px-4 py-4 sm:px-6">
          <svg viewBox={`0 0 ${Q} ${Q}`} className="mx-auto w-full" aria-hidden="true">
            {ato === 'vao' && <AtoVao passo={passo} />}

            {ato === 'medida' && (
              <>
                <AtoVao passo={2} />
                <Cota
                  de={{ x: V.x, y: V.y - 40 }}
                  para={{ x: VD, y: V.y - 40 }}
                  valor={VAO.largura}
                  some={passo > 0}
                />
                {/* A cota da altura vive em VD+22, e não mais em VD+42: com o
                    número deslocado 24 à direita, o "1100" terminava em 405
                    num quadro de 400 e o último algarismo era cortado fora. */}
                <Cota
                  de={{ x: VD + 22, y: V.y }}
                  para={{ x: VD + 22, y: VB }}
                  valor={VAO.altura}
                  vertical
                  some={passo > 0}
                />
              </>
            )}

            {ato === 'tipo' && (
              <>
                <AtoVao passo={2} />
                <g key={passo} className="uso-surge">
                  <Uso qual={USOS[Math.min(passo, USOS.length - 1)]} />
                </g>
              </>
            )}

            {ato === 'folhas' && (
              <>
                <AtoVao passo={2} />
                <AtoFolhas quantas={[2, 3, 4][Math.min(passo, 2)]} />
              </>
            )}

            {(ato === 'montagem' || ato === 'fim') && (
              <Montagem aberto explode={explode} abre={abre} />
            )}

            {/* o quadro de repouso: a janela pronta, parada, convidando ao play */}
            {ato === 'parado' && (
              <>
                <AtoVao passo={2} />
                <AtoFolhas quantas={4} />
              </>
            )}
          </svg>
        </div>

        {/* a legenda: UMA linha, embaixo, trocando a cada ato. Nunca em cima do
            desenho, nunca duas ao mesmo tempo. */}
        <div className="flex min-h-[92px] flex-col items-center justify-center gap-3 border-t border-line px-5 py-5 text-center">
          {rodando ? (
            <>
              <p key={ato} className="sobe text-[15.5px] font-bold leading-snug text-ink">
                {legenda}
              </p>
              <Barra total={TOTAL} />
            </>
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
          )}
        </div>
      </div>
    </div>
  )
}

/** A régua do tempo: diz quanto falta sem escrever número nenhum. */
function Barra({ total }) {
  return (
    <span className="block h-[3px] w-full max-w-[220px] overflow-hidden rounded-full bg-line">
      <span
        className="block h-full rounded-full bg-verde"
        style={{ animation: `correr ${total}ms linear forwards` }}
      />
    </span>
  )
}

