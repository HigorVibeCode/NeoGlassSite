import { range, ease } from '../lib/scroll.js'

/**
 * As duas últimas cenas: a peça atravessando a fábrica, e o que sobra do
 * pedido no fim. Mesma régua da camada anterior — cartão branco, borda
 * #e8edf3, sombra baixa, texto 15/13/11.
 */

const LINHA = '#e8edf3'
const TINTA = '#0f2530'
const APAGADO = '#8b98a8'
const VERDE = '#0e8c6a'
const AZUL = '#4a6ae0'
const EMBER = '#ee6a45'
const OURO = '#b8862c'
const VIOLETA = '#7c6ad6'

const Svg = ({ vb, children, ...rest }) => (
  <svg viewBox={vb} preserveAspectRatio="xMidYMid slice" className="block h-full w-full" {...rest}>
    <defs>
      <filter id="s2-baixa" x="-30%" y="-30%" width="160%" height="180%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#14374f" floodOpacity="0.08" />
      </filter>
    </defs>
    {children}
  </svg>
)

const Cartao = ({ x, y, w, h, r = 10, ...rest }) => (
  <rect
    x={x}
    y={y}
    width={w}
    height={h}
    rx={r}
    fill="#fff"
    stroke={LINHA}
    strokeWidth="1"
    filter="url(#s2-baixa)"
    {...rest}
  />
)

/* ─────────── cena 4 · a fábrica ─────────── */

const FASES = [
  { nome: 'Corte', cor: VERDE, pecas: ['P6', 'P7'] },
  { nome: 'Lapidação', cor: AZUL, pecas: ['P4', 'P5'] },
  { nome: 'Têmpera', cor: EMBER, pecas: ['P3'] },
  { nome: 'Expedição', cor: VIOLETA, pecas: ['P1', 'P2'] },
]

export function PainelProducao({ t }) {
  const W = 520
  const H = 380
  const colW = 118
  const colX = (i) => 16 + i * (colW + 8)

  // uma peça atravessa da têmpera para a expedição enquanto a cena roda
  const anda = ease(range(t, 0.34, 0.62))
  const origem = { x: colX(2) + 8, y: 108 }
  const destino = { x: colX(3) + 8, y: 160 }

  return (
    <Svg vb={`0 0 ${W} ${H}`} role="img" aria-label="Painel de produção com as peças por fase">
      <rect x="0" y="0" width={W} height={H} fill="#f6f8fb" />
      <rect x="0" y="0" width={W} height="54" fill="#fff" />
      <line x1="0" y1="54" x2={W} y2="54" stroke={LINHA} />
      <text x="16" y="26" fill={TINTA} fontSize="14" fontWeight="800">
        Painel de produção
      </text>
      <text x="16" y="43" fill={APAGADO} fontSize="10.5" fontWeight="600">
        12 pedidos abertos · 38 peças em fase
      </text>
      <g>
        <circle cx={W - 62} cy="30" r="4" fill={VERDE} />
        <text x={W - 52} y="34" fill={APAGADO} fontSize="10" fontWeight="700">
          ao vivo
        </text>
      </g>

      {FASES.map((f, i) => (
        <g key={f.nome}>
          <rect x={colX(i)} y="70" width={colW} height={H - 86} rx="12" fill="#eef2f6" />
          <circle cx={colX(i) + 14} cy="88" r="3.5" fill={f.cor} />
          <text x={colX(i) + 24} y="92" fill={TINTA} fontSize="10.5" fontWeight="700">
            {f.nome}
          </text>
          <text
            x={colX(i) + colW - 12}
            y="92"
            textAnchor="end"
            fill={APAGADO}
            fontSize="10"
            fontWeight="700"
          >
            {f.pecas.length + (i === 3 && anda > 0.5 ? 1 : 0) - (i === 2 && anda > 0.5 ? 1 : 0)}
          </text>

          {f.pecas.map((p, j) => {
            const escondida = i === 2 && j === 0
            if (escondida) return null
            const y = 108 + j * 52
            return (
              <g key={p}>
                <Cartao x={colX(i) + 8} y={y} w={colW - 16} h={42} r={8} />
                <rect
                  x={colX(i) + 8}
                  y={y}
                  width="3"
                  height="42"
                  rx="1.5"
                  fill={f.cor}
                  fillOpacity="0.8"
                />
                <text x={colX(i) + 18} y={y + 18} fill={TINTA} fontSize="10.5" fontWeight="700">
                  26-0431 · {p}
                </text>
                <text x={colX(i) + 18} y={y + 32} fill={APAGADO} fontSize="9" fontWeight="600">
                  10 mm incolor
                </text>
              </g>
            )
          })}
        </g>
      ))}

      {/* a peça em trânsito */}
      <g
        transform={`translate(${origem.x + (destino.x - origem.x) * anda} ${origem.y + (destino.y - origem.y) * anda})`}
        style={{ filter: 'drop-shadow(0 6px 10px rgba(20,55,80,.18))' }}
      >
        <rect x="0" y="0" width={colW - 16} height="42" rx="8" fill="#fff" stroke={VIOLETA} />
        <rect x="0" y="0" width="3" height="42" rx="1.5" fill={VIOLETA} />
        <text x="10" y="18" fill={TINTA} fontSize="10.5" fontWeight="700">
          26-0431 · P3
        </text>
        <text x="10" y="32" fill={VIOLETA} fontSize="9" fontWeight="700">
          saiu da têmpera
        </text>
      </g>
    </Svg>
  )
}

function QR({ x, y, tam, seed = 7 }) {
  const n = 11
  const c = tam / n
  const celulas = []
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const cantoA = i < 3 && j < 3
      const cantoB = i < 3 && j > n - 4
      const cantoC = i > n - 4 && j < 3
      if (cantoA || cantoB || cantoC) continue
      if ((i * seed + j * 3 + ((i * j) % 5)) % 3 === 0) {
        celulas.push(<rect key={`${i}-${j}`} x={x + j * c} y={y + i * c} width={c} height={c} />)
      }
    }
  }
  const Marca = ({ mx, my }) => (
    <g>
      <rect x={mx} y={my} width={c * 3} height={c * 3} fill={TINTA} />
      <rect x={mx + c * 0.6} y={my + c * 0.6} width={c * 1.8} height={c * 1.8} fill="#fff" />
      <rect x={mx + c} y={my + c} width={c} height={c} fill={TINTA} />
    </g>
  )
  return (
    <g fill={TINTA}>
      {celulas}
      <Marca mx={x} my={y} />
      <Marca mx={x + c * (n - 3)} my={y} />
      <Marca mx={x} my={y + c * (n - 3)} />
    </g>
  )
}

export function Etiqueta({ t }) {
  const W = 230
  const H = 330
  const k = ease(range(t, 0.1, 0.4))
  return (
    <Svg vb={`0 0 ${W} ${H}`} role="img" aria-label="A etiqueta da peça, com código de barras">
      <rect x="0" y="0" width={W} height={H} fill="#fff" />
      <rect x="0" y="0" width={W} height="6" fill={VIOLETA} />
      <text x="16" y="34" fill={APAGADO} fontSize="9" fontWeight="800" letterSpacing="1.6">
        NEOGLASS · ETIQUETA
      </text>
      <text x="16" y="60" fill={TINTA} fontSize="24" fontWeight="800">
        P3
      </text>
      <text x="16" y="78" fill={TINTA} fontSize="12" fontWeight="700">
        600 × 1150 mm
      </text>
      <text x="16" y="94" fill={APAGADO} fontSize="10" fontWeight="600">
        10 mm incolor · têmpera
      </text>
      <line x1="16" y1="108" x2={W - 16} y2="108" stroke={LINHA} />

      <g style={{ opacity: k }}>
        <QR x={W / 2 - 66} y={124} tam={132} />
      </g>

      <text x={W / 2} y={278} textAnchor="middle" fill={TINTA} fontSize="11" fontWeight="700">
        Pedido 26-0431
      </text>
      <text x={W / 2} y={294} textAnchor="middle" fill={APAGADO} fontSize="9.5" fontWeight="600">
        Marina Duarte · Ap. 142
      </text>
      <rect x="16" y={H - 22} width={W - 32} height="8" rx="4" fill="#eef2f6" />
    </Svg>
  )
}

const ENTREGA = ['P1', 'P2', 'P4', 'P5', 'P6']

export function Expedicao({ t }) {
  const W = 300
  const H = 430
  const leu = ease(range(t, 0.2, 0.44))
  return (
    <Svg vb={`0 0 ${W} ${H}`} role="img" aria-label="A expedição confere a entrega lendo o código">
      <rect x="0" y="0" width={W} height={H} fill="#f6f8fb" />
      <rect x="0" y="0" width={W} height="48" fill="#fff" />
      <line x1="0" y1="48" x2={W} y2="48" stroke={LINHA} />
      <text x="16" y="24" fill={TINTA} fontSize="13.5" fontWeight="800">
        Expedição
      </text>
      <text x="16" y="39" fill={APAGADO} fontSize="10" fontWeight="600">
        Carga 118 · saída 14:20
      </text>

      {/* leitor */}
      <rect x="16" y="62" width={W - 32} height="118" rx="12" fill="#0f2530" fillOpacity="0.05" />
      <g stroke={VIOLETA} strokeWidth="2.4" fill="none" strokeLinecap="round">
        {[
          [30, 76, 1, 1],
          [W - 30, 76, -1, 1],
          [30, 166, 1, -1],
          [W - 30, 166, -1, -1],
        ].map(([x, y, sx, sy], i) => (
          <path key={i} d={`M ${x + 16 * sx} ${y} H ${x} V ${y + 16 * sy}`} />
        ))}
      </g>
      <g style={{ opacity: 1 - leu * 0.75 }}>
        <line
          x1="34"
          y1={80 + 82 * leu}
          x2={W - 34}
          y2={80 + 82 * leu}
          stroke={VIOLETA}
          strokeWidth="2"
        />
      </g>
      <g style={{ opacity: leu }}>
        <QR x={W / 2 - 32} y={90} tam={64} seed={5} />
      </g>

      <text x="16" y="204" fill={APAGADO} fontSize="9.5" fontWeight="800" letterSpacing="1.2">
        CONFERIDAS
      </text>
      {ENTREGA.map((p, i) => {
        const k = ease(range(t, 0.46 + i * 0.08, 0.58 + i * 0.08))
        const y = 216 + i * 34
        return (
          <g key={p} style={{ opacity: k }}>
            <Cartao x={16} y={y} w={W - 32} h={26} r={8} />
            <circle cx="32" cy={y + 13} r="7" fill={VERDE} fillOpacity="0.14" />
            <path
              d={`M 28.5 ${y + 13} l 2.4 2.6 l 4.6 -5.2`}
              fill="none"
              stroke={VERDE}
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text x="48" y={y + 17} fill={TINTA} fontSize="10.5" fontWeight="700">
              Peça {p} · conferida
            </text>
          </g>
        )
      })}

      <g style={{ opacity: ease(range(t, 0.86, 0.98)) }}>
        <rect x="16" y={H - 42} width={W - 32} height="30" rx="10" fill={VIOLETA} fillOpacity="0.1" />
        <text x={W / 2} y={H - 22} textAnchor="middle" fill="#5a49ab" fontSize="11" fontWeight="700">
          Entrega parcial · 5 de 7 peças
        </text>
      </g>
    </Svg>
  )
}

/* ─────────── cena 5 · o dinheiro ─────────── */

export function NotaFiscal({ t }) {
  const W = 310
  const H = 430
  const autorizada = ease(range(t, 0.24, 0.46))
  const linhas = [
    ['IBS', 'R$ 187,20'],
    ['CBS', 'R$ 312,00'],
    ['IS', '—'],
  ]
  return (
    <Svg vb={`0 0 ${W} ${H}`} role="img" aria-label="A nota fiscal emitida pelo sistema">
      <rect x="0" y="0" width={W} height={H} fill="#fff" />
      <rect x="0" y="0" width={W} height="66" fill="#f6f8fb" />
      <line x1="0" y1="66" x2={W} y2="66" stroke={LINHA} />
      <text x="16" y="28" fill={TINTA} fontSize="13.5" fontWeight="800">
        NF-e 12.487
      </text>
      <text x="16" y="45" fill={APAGADO} fontSize="10" fontWeight="600">
        série 1 · pedido 26-0431
      </text>
      <text x="16" y="58" fill={APAGADO} fontSize="9.5" fontWeight="600">
        Marina Duarte · CPF 000.000.000-00
      </text>

      <g style={{ opacity: autorizada }}>
        <rect x={W - 96} y="20" width="80" height="22" rx="11" fill="#e4f2ee" />
        <circle cx={W - 84} cy="31" r="3.4" fill={VERDE} />
        <text x={W - 76} y="35" fill={VERDE} fontSize="9.5" fontWeight="800">
          Autorizada
        </text>
      </g>

      <text x="16" y="92" fill={APAGADO} fontSize="9" fontWeight="800" letterSpacing="1.2">
        ITENS
      </text>
      {[
        ['Porta de correr 10 mm', 'R$ 3.120,00'],
        ['Kit roldana 100 kg', 'R$ 360,00'],
      ].map(([nome, valor], i) => (
        <g key={nome}>
          <text x="16" y={114 + i * 26} fill={TINTA} fontSize="11" fontWeight="600">
            {nome}
          </text>
          <text
            x={W - 16}
            y={114 + i * 26}
            textAnchor="end"
            fill={TINTA}
            fontSize="11"
            fontWeight="700"
          >
            {valor}
          </text>
        </g>
      ))}
      <line x1="16" y1="152" x2={W - 16} y2="152" stroke={LINHA} />

      <text x="16" y="176" fill={APAGADO} fontSize="9" fontWeight="800" letterSpacing="1.2">
        TRIBUTOS · MODELO NOVO
      </text>
      {linhas.map(([nome, valor], i) => {
        const k = ease(range(t, 0.4 + i * 0.1, 0.56 + i * 0.1))
        return (
          <g key={nome} style={{ opacity: k }}>
            <rect x="16" y={188 + i * 32} width={W - 32} height="26" rx="8" fill="#f6f8fb" />
            <text x="28" y={205 + i * 32} fill={TINTA} fontSize="10.5" fontWeight="700">
              {nome}
            </text>
            <text
              x={W - 28}
              y={205 + i * 32}
              textAnchor="end"
              fill={APAGADO}
              fontSize="10.5"
              fontWeight="700"
            >
              {valor}
            </text>
          </g>
        )
      })}

      <line x1="16" y1="300" x2={W - 16} y2="300" stroke={LINHA} />
      <text x="16" y="324" fill={APAGADO} fontSize="10.5" fontWeight="700">
        Total da nota
      </text>
      <text x={W - 16} y="326" textAnchor="end" fill={TINTA} fontSize="18" fontWeight="800">
        R$ 3.480,00
      </text>

      <g style={{ opacity: autorizada }}>
        <text x="16" y="358" fill={APAGADO} fontSize="9" fontWeight="600">
          protocolo 135260004871234 · 04/08 14:31
        </text>
        <rect x="16" y="372" width={W - 32} height="34" rx="10" fill="#f6f8fb" />
        <text x="28" y="393" fill={APAGADO} fontSize="9.5" fontWeight="700">
          DANFE enviado por e-mail ao cliente
        </text>
      </g>
    </Svg>
  )
}

export function Recebimento({ t }) {
  const W = 300
  const H = 212
  const emitido = ease(range(t, 0.3, 0.5))
  return (
    <Svg vb={`0 0 ${W} ${H}`} role="img" aria-label="O boleto emitido e o recebimento previsto">
      <rect x="0" y="0" width={W} height={H} fill="#fff" />
      <text x="16" y="28" fill={TINTA} fontSize="13" fontWeight="800">
        Recebimento
      </text>
      <g style={{ opacity: emitido }}>
        <rect x={W - 92} y="14" width="76" height="21" rx="10.5" fill="#fdf3e3" />
        <circle cx={W - 80} cy="24.5" r="3.2" fill={OURO} />
        <text x={W - 72} y="28" fill={OURO} fontSize="9.5" fontWeight="800">
          Em aberto
        </text>
      </g>

      <rect x="16" y="46" width={W - 32} height="1" fill={LINHA} />

      <text x="16" y="72" fill={APAGADO} fontSize="10" fontWeight="700">
        Boleto 26-0431/1
      </text>
      <text x="16" y="96" fill={TINTA} fontSize="20" fontWeight="800">
        R$ 3.480,00
      </text>
      <text x="16" y="114" fill={APAGADO} fontSize="10" fontWeight="600">
        vence em 12/09 · 1 parcela
      </text>

      {/* código de barras */}
      <g style={{ opacity: emitido }}>
        {Array.from({ length: 46 }).map((_, i) => (
          <rect
            key={i}
            x={16 + i * 6}
            y="132"
            width={(i * 7) % 3 === 0 ? 3.4 : 1.6}
            height="34"
            fill={TINTA}
            fillOpacity="0.82"
          />
        ))}
      </g>
      <text x="16" y="184" fill={APAGADO} fontSize="8.5" fontWeight="600">
        34191.79001 01043.510047 91020.15000 8
      </text>
    </Svg>
  )
}

const CUSTOS = [
  ['Matéria-prima', 'R$ 1.180', 1180, '#0e7b9c'],
  ['Produção', 'R$ 640', 640, VIOLETA],
  ['Gastos do pedido', 'R$ 210', 210, APAGADO],
]

export function Margem({ t }) {
  const W = 390
  const H = 460
  const total = 3480
  const custo = 2030
  const margem = total - custo
  const perc = (margem / total) * 100

  const cresce = ease(range(t, 0.34, 0.72))
  const fecha = ease(range(t, 0.66, 0.88))

  let acumulado = 0
  const barra = CUSTOS.map(([, , valor, cor]) => {
    const inicio = acumulado
    acumulado += valor
    return { inicio, valor, cor }
  })

  return (
    <Svg vb={`0 0 ${W} ${H}`} role="img" aria-label="O fechamento do pedido, com a margem real">
      <rect x="0" y="0" width={W} height={H} fill="#fff" />
      <rect x="0" y="0" width={W} height="70" fill="#fbfaf6" />
      <line x1="0" y1="70" x2={W} y2="70" stroke={LINHA} />
      <text x="20" y="30" fill={TINTA} fontSize="15" fontWeight="800">
        Fechamento do pedido
      </text>
      <text x="20" y="48" fill={APAGADO} fontSize="10.5" fontWeight="600">
        26-0431 · entregue em 04/08
      </text>
      <g>
        <rect x={W - 106} y="20" width="86" height="22" rx="11" fill="#f4ede0" />
        <circle cx={W - 94} cy="31" r="3.4" fill={OURO} />
        <text x={W - 86} y="35" fill={OURO} fontSize="9.5" fontWeight="800">
          Fechado
        </text>
      </g>

      {/* a barra de composição */}
      <g>
        <rect x="20" y="94" width={W - 40} height="26" rx="8" fill="#f2f5f8" />
        {barra.map((b, i) => (
          <rect
            key={i}
            x={20 + ((W - 40) * b.inicio) / total}
            y="94"
            width={(((W - 40) * b.valor) / total) * cresce}
            height="26"
            fill={b.cor}
            fillOpacity="0.85"
          />
        ))}
        <rect
          x={20 + ((W - 40) * custo) / total}
          y="94"
          width={(((W - 40) * margem) / total) * fecha}
          height="26"
          fill={OURO}
        />
      </g>

      {CUSTOS.map(([nome, valor, , cor], i) => {
        const k = ease(range(t, 0.34 + i * 0.1, 0.5 + i * 0.1))
        const y = 152 + i * 42
        return (
          <g key={nome} style={{ opacity: k }}>
            <circle cx="28" cy={y - 5} r="4" fill={cor} />
            <text x="42" y={y} fill={TINTA} fontSize="12" fontWeight="600">
              {nome}
            </text>
            <text x={W - 20} y={y} textAnchor="end" fill={TINTA} fontSize="12.5" fontWeight="700">
              {valor}
            </text>
            <line x1="20" y1={y + 16} x2={W - 20} y2={y + 16} stroke={LINHA} />
          </g>
        )
      })}

      <g style={{ opacity: ease(range(t, 0.62, 0.76)) }}>
        <text x="42" y="320" fill={APAGADO} fontSize="11.5" fontWeight="700">
          Custo total
        </text>
        <text x={W - 20} y="320" textAnchor="end" fill={APAGADO} fontSize="12.5" fontWeight="700">
          R$ 2.030
        </text>
        <text x="42" y="346" fill={APAGADO} fontSize="11.5" fontWeight="700">
          Venda
        </text>
        <text x={W - 20} y="346" textAnchor="end" fill={TINTA} fontSize="12.5" fontWeight="700">
          R$ 3.480
        </text>
      </g>

      <g style={{ opacity: fecha }}>
        <rect x="20" y="366" width={W - 40} height="74" rx="14" fill="#fbf4e6" />
        <text x="38" y="392" fill={OURO} fontSize="10.5" fontWeight="800" letterSpacing="1">
          MARGEM DESTE PEDIDO
        </text>
        <text x="38" y="424" fill={OURO} fontSize="26" fontWeight="800">
          R$ {margem.toLocaleString('pt-BR')}
        </text>
        <text x={W - 38} y="424" textAnchor="end" fill={OURO} fontSize="20" fontWeight="800">
          {perc.toFixed(1).replace('.', ',')}%
        </text>
      </g>
    </Svg>
  )
}
