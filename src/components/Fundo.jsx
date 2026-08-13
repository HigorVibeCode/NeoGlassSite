import { useEffect, useRef } from 'react'
import { useMedia } from '../lib/scroll.js'
import { semMovimento } from '../lib/dispositivo.js'

/**
 * O prisma da marca virou o plano de fundo do site inteiro.
 *
 * Antes ele era um desenho dentro da abertura, redesenhado pelo React sessenta
 * vezes por segundo — o que derrubava aparelho fraco. Agora é o oposto: o
 * desenho é montado uma única vez e nunca mais passa pelo React. O que se mexe
 * é responsabilidade do navegador:
 *
 *   · os impulsos correm pelas ligações com `stroke-dashoffset` em CSS;
 *   · os nós respiram com `opacity` em CSS, cada um no seu tempo;
 *   · o parallax escreve UMA transformação por quadro, numa camada própria.
 *
 * Em aparelho modesto (data-fraco) ou com movimento reduzido, tudo isso desliga
 * no CSS e sobra o prisma parado — que continua bonito.
 *
 * O feixe que saía pela direita foi removido: num plano de fundo ele brigava
 * com o texto e não acrescentava nada.
 */

const AZUL = '#c6d8ff'
const PESSEGO = '#ffcaa4'
const SALMAO = '#ffa0a0'

const ruido = (i) => {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453
  return x - Math.floor(x)
}

/**
 * Monta a geometria inteira a partir do quadro e do triângulo. Roda uma vez
 * por formato (deitado e em pé) e o resultado fica em memória.
 */
function montar({ W, H, apice, altura, meia, densidade }) {
  const A = apice
  const E = { x: A.x - meia, y: A.y + altura }
  const D = { x: A.x + meia, y: A.y + altura }
  const tri = `M ${A.x} ${A.y} L ${D.x} ${D.y} H ${E.x} Z`

  const nos = []
  for (let l = 0; l < densidade; l++) {
    const y = A.y + ((l + 0.62) / densidade) * altura
    const m = ((y - A.y) / altura) * meia
    const n = 2 + l
    for (let c = 0; c < n; c++) {
      nos.push({
        x: A.x - m + ((c + 0.5) / n) * m * 2 + (ruido(l * 20 + c) - 0.5) * m * 0.28,
        y: y + (ruido(l * 20 + c + 7) - 0.5) * (altura / densidade) * 0.5,
        r: 2 + ruido(l * 31 + c) * 3,
      })
    }
  }

  const limite = altura * 0.17
  const ligacoes = []
  for (let i = 0; i < nos.length; i++) {
    for (let j = i + 1; j < nos.length; j++) {
      const d = Math.hypot(nos[i].x - nos[j].x, nos[i].y - nos[j].y)
      if (d < limite) ligacoes.push({ a: nos[i], b: nos[j], d })
    }
  }

  // Só um punhado de ligações carrega impulso. São elas — e só elas — que o
  // navegador precisa repintar o tempo todo.
  const trilhos = ligacoes
    .filter((l) => l.d > limite * 0.55)
    .filter((_, i) => i % 7 === 0)
    .slice(0, 10)
    .map((l, i) => ({ ...l, atraso: (i * 0.83) % 5, tempo: 3.4 + (i % 4) * 0.7 }))

  // As três listras do ícone, entrando pela face esquerda. Discretas: aqui elas
  // passam por baixo de texto, e listra grossa sobre título é ilegível.
  const listras = [0.44, 0.6, 0.76].map((k, i) => {
    const y = A.y + altura * k
    const x = A.x - ((y - A.y) / altura) * meia
    const dx = W * 0.9
    return {
      cor: [AZUL, PESSEGO, SALMAO][i],
      x1: x - dx,
      y1: y - dx * 0.2,
      x2: x,
      y2: y,
    }
  })

  return { W, H, A, E, D, altura, meia, tri, nos, ligacoes, trilhos, listras }
}

const DEITADO = montar({
  W: 1600,
  H: 1000,
  apice: { x: 1046, y: 84 },
  altura: 772,
  meia: 448,
  densidade: 11,
})

const EM_PE = montar({
  W: 760,
  H: 1240,
  apice: { x: 430, y: 250 },
  altura: 622,
  meia: 361,
  densidade: 9,
})

function Prisma({ g, marca }) {
  return (
    <svg
      viewBox={`0 0 ${g.W} ${g.H}`}
      preserveAspectRatio="xMidYMid slice"
      className="block h-full w-full"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id={`${marca}-luz`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="0.55" stopColor="#eaf5f3" stopOpacity="0.42" />
          <stop offset="1" stopColor="#eaf5f3" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${marca}-vidro`} x1="0.05" y1="0" x2="0.95" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.92" />
          <stop offset="0.55" stopColor="#fbfefe" stopOpacity="0.8" />
          <stop offset="1" stopColor="#e4f0f3" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id={`${marca}-aresta`} x1="0" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor="#9fb6ea" />
          <stop offset="0.5" stopColor="#e8a86f" />
          <stop offset="1" stopColor="#de7f7c" />
        </linearGradient>
        {g.listras.map((l, i) => (
          <linearGradient
            key={i}
            id={`${marca}-listra-${i}`}
            gradientUnits="userSpaceOnUse"
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
          >
            <stop offset="0" stopColor={l.cor} stopOpacity="0" />
            <stop offset="0.72" stopColor={l.cor} stopOpacity="0.34" />
            <stop offset="1" stopColor={l.cor} stopOpacity="0.6" />
          </linearGradient>
        ))}
        <clipPath id={`${marca}-dentro`}>
          <path d={g.tri} />
        </clipPath>
      </defs>

      <ellipse
        cx={g.A.x}
        cy={g.A.y + g.altura * 0.55}
        rx={g.meia * 2.1}
        ry={g.altura * 0.95}
        fill={`url(#${marca}-luz)`}
      />

      <g strokeLinecap="round">
        {g.listras.map((l, i) => (
          <line
            key={i}
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            stroke={`url(#${marca}-listra-${i})`}
            strokeWidth={g.W * 0.012}
          />
        ))}
      </g>

      <path d={g.tri} fill={`url(#${marca}-vidro)`} />

      <g clipPath={`url(#${marca}-dentro)`}>
        <g stroke="#3c7a86" strokeOpacity="0.15" strokeWidth="1">
          {g.ligacoes.map((l, i) => (
            <line key={i} x1={l.a.x} y1={l.a.y} x2={l.b.x} y2={l.b.y} />
          ))}
        </g>

        {/* os impulsos: o que faz a rede parecer viva */}
        <g className="pulso" stroke="#0e8c6a" strokeWidth="2.6" strokeLinecap="round" fill="none">
          {g.trilhos.map((l, i) => (
            <line
              key={i}
              x1={l.a.x}
              y1={l.a.y}
              x2={l.b.x}
              y2={l.b.y}
              style={{
                strokeDasharray: `${Math.max(10, l.d * 0.18)} ${l.d}`,
                animationDuration: `${l.tempo}s`,
                animationDelay: `${l.atraso}s`,
                ['--corrida']: `${-l.d * 1.2}px`,
              }}
            />
          ))}
        </g>

        {g.nos.map((n, i) => (
          <g key={i}>
            <circle
              cx={n.x}
              cy={n.y}
              r={n.r * 3.5}
              fill="#7fe0c8"
              className={i % 3 === 0 ? 'respira' : undefined}
              fillOpacity="0.13"
              style={i % 3 === 0 ? { animationDelay: `${(ruido(i) * 6).toFixed(2)}s` } : undefined}
            />
            <circle cx={n.x} cy={n.y} r={n.r * 0.85} fill="#14606b" fillOpacity="0.38" />
          </g>
        ))}
      </g>

      <path
        d={g.tri}
        fill="none"
        stroke={`url(#${marca}-aresta)`}
        strokeWidth="3"
        strokeLinejoin="round"
        strokeOpacity="0.55"
      />
    </svg>
  )
}

/** Uma transformação por quadro, numa camada só. Nada mais. */
function useParallax(fator) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || semMovimento()) return
    let raf = 0
    let alvo = 0
    const escrever = () => {
      raf = 0
      el.style.transform = `translate3d(0, ${alvo.toFixed(1)}px, 0)`
    }
    const on = () => {
      alvo = -Math.min(window.scrollY * fator, 340)
      if (!raf) raf = requestAnimationFrame(escrever)
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => {
      window.removeEventListener('scroll', on)
      cancelAnimationFrame(raf)
    }
  }, [fator])
  return ref
}

export default function Fundo() {
  const estreito = useMedia('(max-width: 1023px)')
  const prisma = useParallax(0.14)
  const brilho = useParallax(0.05)

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div ref={brilho} className="absolute inset-0 will-change-transform">
        <div
          className="absolute -left-[18%] -top-[24%] h-[900px] w-[900px] rounded-full opacity-[0.13]"
          style={{ background: 'radial-gradient(circle, #0e8c6a, transparent 66%)' }}
        />
        <div
          className="absolute bottom-[-18%] left-[18%] h-[780px] w-[780px] rounded-full opacity-[0.1]"
          style={{ background: 'radial-gradient(circle, #4a6ae0, transparent 66%)' }}
        />
      </div>

      <div
        ref={prisma}
        className="absolute inset-0 will-change-transform"
        style={{ opacity: estreito ? 0.34 : 0.5 }}
      >
        <Prisma g={estreito ? EM_PE : DEITADO} marca={estreito ? 'fp' : 'fd'} />
      </div>

      <div className="grao absolute inset-0" />
    </div>
  )
}
