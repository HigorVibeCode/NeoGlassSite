/**
 * O prisma da marca — monumental, e sobre fundo claro como o resto do site.
 *
 * É a figura exata do símbolo, ampliada até ocupar o quadro: as três listras
 * diagonais entrando pela esquerda, o prisma branco no meio, e do outro lado
 * as MESMAS três cores da marca saindo abertas em feixe. Não é arco-íris de
 * banco de imagem: o que sai é o que entrou, só que aberto e ordenado — que é
 * exatamente o que o sistema faz com um pedido.
 *
 * Dentro do prisma mora uma malha de nós; o pedido não só atravessa, ele é
 * decomposto.
 *
 * `t` vai de 0 a 1 e recomeça.
 */

const W = 1040
const H = 760

// O triângulo tem a proporção do ícone (largura ≈ 1,16 × altura) e é grande:
// ocupa três quartos da altura do quadro em qualquer tela.
const APICE = { x: 556, y: 60 }
const BASE_E = { x: 220, y: 640 }
const BASE_D = { x: 892, y: 640 }
const ALTURA = BASE_E.y - APICE.y
const MEIA = APICE.x - BASE_E.x

const SAIDA = { x: 730, y: 360 }
const FIM = 1160 // o feixe sai do quadro, não termina nele

const ruido = (i) => {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453
  return x - Math.floor(x)
}

// As três cores são as do ícone, sem inventar nenhuma.
const AZUL = '#c6d8ff'
const PESSEGO = '#ffcaa4'
const SALMAO = '#ffa0a0'

// As três listras entrando: mesma inclinação e mesma ordem do símbolo.
const LISTRAS = [
  { id: 'a', x1: -60, y1: 60, x2: 492, y2: 170, cor: AZUL, forte: '#8fa9e8' },
  { id: 'b', x1: -60, y1: 145, x2: 448, y2: 246, cor: PESSEGO, forte: '#e6a061' },
  { id: 'c', x1: -60, y1: 228, x2: 405, y2: 320, cor: SALMAO, forte: '#de7d7a' },
]

// Do outro lado, as mesmas três — abertas em feixe largo.
const FEIXES = [
  { id: 'a', cor: AZUL, forte: '#8fa9e8', y1: 34, y2: 246 },
  { id: 'b', cor: PESSEGO, forte: '#e6a061', y1: 286, y2: 470 },
  { id: 'c', cor: SALMAO, forte: '#de7d7a', y1: 510, y2: 728 },
]

// filamentos finos dentro de cada feixe
const FIOS = FEIXES.flatMap((f, b) =>
  Array.from({ length: 7 }, (_, i) => ({
    b,
    cor: f.forte,
    y: f.y1 + ((i + 0.5) / 7) * (f.y2 - f.y1) + (ruido(b * 40 + i) - 0.5) * 14,
    forca: 0.35 + ruido(b * 40 + i + 11) * 0.65,
  })),
)

// a luz de fundo entrando, quase paralela
const ENTRADAS = Array.from({ length: 34 }, (_, i) => {
  const y = 110 + (i / 33) * 470
  const bater = APICE.x - ((y - APICE.y) / ALTURA) * MEIA
  return { y, x: bater, forca: 0.25 + ruido(i) * 0.75 }
})

const NOS = (() => {
  const fora = []
  for (let l = 0; l < 10; l++) {
    const y = APICE.y + ((l + 0.6) / 10) * ALTURA
    const meia = ((y - APICE.y) / ALTURA) * MEIA
    const n = 2 + l
    for (let c = 0; c < n; c++) {
      const jx = (ruido(l * 20 + c) - 0.5) * 34
      const jy = (ruido(l * 20 + c + 7) - 0.5) * 30
      fora.push({
        x: APICE.x - meia + ((c + 0.5) / n) * meia * 2 + jx,
        y: y + jy,
        r: 2 + ruido(l * 31 + c) * 2.8,
      })
    }
  }
  return fora
})()

const LIGACOES = (() => {
  const fora = []
  for (let i = 0; i < NOS.length; i++) {
    for (let j = i + 1; j < NOS.length; j++) {
      const d = Math.hypot(NOS[i].x - NOS[j].x, NOS[i].y - NOS[j].y)
      if (d < 92) fora.push([NOS[i], NOS[j], d])
    }
  }
  return fora
})()

const TRI = `M ${APICE.x} ${APICE.y} L ${BASE_D.x} ${BASE_D.y} H ${BASE_E.x} Z`

export default function Prisma({ t }) {
  const frente = -300 + t * 1900
  const onda = (x) => Math.exp(-((x - frente) ** 2) / 38000)

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className="block h-full w-full"
      role="img"
      aria-label="O prisma do NeoGlass: as três luzes da marca entram e saem abertas em feixe"
    >
      <defs>
        <radialGradient id="pr-luz" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="0.58" stopColor="#e9f4f2" stopOpacity="0.5" />
          <stop offset="1" stopColor="#e9f4f2" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pr-vidro" x1="0.05" y1="0" x2="0.95" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="0.5" stopColor="#fbfefe" stopOpacity="0.99" />
          <stop offset="1" stopColor="#e6f1f4" stopOpacity="0.97" />
        </linearGradient>
        <radialGradient id="pr-brasa" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="0.45" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pr-brilho" x1="0" y1="0" x2="1" y2="0.4">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <filter id="pr-sombra" x="-30%" y="-30%" width="180%" height="180%">
          <feDropShadow dx="6" dy="26" stdDeviation="26" floodColor="#1d4a5e" floodOpacity="0.16" />
        </filter>
        <linearGradient id="pr-aresta" x1="0" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor="#9fb6ea" />
          <stop offset="0.5" stopColor="#e8a86f" />
          <stop offset="1" stopColor="#de7f7c" />
        </linearGradient>
        {FEIXES.map((f) => (
          <linearGradient
            key={f.id}
            id={`pr-feixe-${f.id}`}
            gradientUnits="userSpaceOnUse"
            x1={SAIDA.x}
            y1="0"
            x2={FIM}
            y2="0"
          >
            <stop offset="0" stopColor={f.forte} stopOpacity="0.92" />
            <stop offset="0.3" stopColor={f.cor} stopOpacity="0.72" />
            <stop offset="1" stopColor={f.cor} stopOpacity="0.1" />
          </linearGradient>
        ))}
        {LISTRAS.map((l) => (
          <linearGradient
            key={l.id}
            id={`pr-listra-${l.id}`}
            gradientUnits="userSpaceOnUse"
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
          >
            <stop offset="0" stopColor={l.cor} stopOpacity="0.15" />
            <stop offset="0.45" stopColor={l.cor} stopOpacity="0.9" />
            <stop offset="1" stopColor={l.forte} stopOpacity="1" />
          </linearGradient>
        ))}
        <clipPath id="pr-dentro">
          <path d={TRI} />
        </clipPath>
      </defs>

      <ellipse cx={APICE.x + 60} cy={H * 0.5} rx={W * 0.46} ry={H * 0.52} fill="url(#pr-luz)" />

      {/* o feixe que sai — as três cores da marca, abertas */}
      {FEIXES.map((f, i) => {
        const b = 0.55 + 0.45 * onda((SAIDA.x + FIM) / 2 - i * 30)
        return (
          <path
            key={f.id}
            d={`M ${SAIDA.x} ${SAIDA.y} L ${FIM} ${f.y1} L ${FIM} ${f.y2} Z`}
            fill={`url(#pr-feixe-${f.id})`}
            fillOpacity={b}
          />
        )
      })}

      <g strokeLinecap="round">
        {FIOS.map((s, i) => {
          const b = s.forca * (0.5 + 0.5 * onda((SAIDA.x + FIM) / 2 + (i - 10) * 6))
          return (
            <line
              key={i}
              x1={SAIDA.x}
              y1={SAIDA.y}
              x2={FIM}
              y2={s.y}
              stroke={s.cor}
              strokeOpacity={b * 0.75}
              strokeWidth="2"
            />
          )
        })}
      </g>

      {/* a luz de fundo entrando */}
      <g strokeLinecap="round">
        {ENTRADAS.map((e, i) => (
          <line
            key={i}
            x1="0"
            y1={e.y}
            x2={e.x}
            y2={e.y}
            stroke="#9fb8c0"
            strokeOpacity={e.forca * (0.05 + 0.14 * onda(e.x - 240))}
            strokeWidth="1.1"
          />
        ))}
      </g>

      <path d={TRI} fill="url(#pr-vidro)" filter="url(#pr-sombra)" />
      <path
        d={`M ${APICE.x} ${APICE.y} L ${BASE_E.x + 34} ${BASE_E.y - 6} L ${APICE.x - 34} ${APICE.y + 44} Z`}
        fill="url(#pr-brilho)"
      />

      <g clipPath="url(#pr-dentro)">
        {LIGACOES.map(([a, b, d], i) => (
          <line
            key={i}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="#3c7a86"
            strokeOpacity={(1 - d / 92) * (0.14 + 0.34 * onda((a.x + b.x) / 2)) * 0.7}
            strokeWidth="1"
          />
        ))}
        {NOS.map((n, i) => {
          const b = 0.5 + 0.5 * onda(n.x)
          return (
            <g key={i}>
              <circle cx={n.x} cy={n.y} r={n.r * 3.4} fill="#7fe0c8" fillOpacity={b * 0.24} />
              <circle cx={n.x} cy={n.y} r={n.r} fill="#14606b" fillOpacity={0.32 + b * 0.52} />
            </g>
          )
        })}
      </g>

      {/* as três listras do ícone, chegando na face esquerda */}
      <g strokeLinecap="round">
        {LISTRAS.map((l) => {
          const b = 0.6 + 0.4 * onda((l.x1 + l.x2) / 2)
          return (
            <g key={l.id}>
              <line
                x1={l.x1}
                y1={l.y1}
                x2={l.x2}
                y2={l.y2}
                stroke={l.cor}
                strokeOpacity={b * 0.26}
                strokeWidth="40"
              />
              <line
                x1={l.x1}
                y1={l.y1}
                x2={l.x2}
                y2={l.y2}
                stroke={`url(#pr-listra-${l.id})`}
                strokeOpacity={b}
                strokeWidth="17"
              />
            </g>
          )
        })}
      </g>

      <path d={TRI} fill="none" stroke="url(#pr-aresta)" strokeWidth="3" strokeLinejoin="round" />

      <circle cx={SAIDA.x} cy={SAIDA.y} r="54" fill="url(#pr-brasa)" />
      <circle cx={SAIDA.x} cy={SAIDA.y} r="4.5" fill="#ffffff" />
    </svg>
  )
}
