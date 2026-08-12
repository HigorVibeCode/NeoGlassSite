import { range, ease } from '../lib/scroll.js'

/**
 * O que aparece dentro de cada chapa. Todo conteúdo é um SVG que preenche a
 * chapa inteira, e recebe t de 0 a 1 — o tempo da cena. A régua é sempre a
 * mesma: cartão branco, borda #e8edf3, sombra baixa, texto 15/13/11.
 */

const LINHA = '#e8edf3'
const TINTA = '#0f2530'
const APAGADO = '#8b98a8'
const VERDE = '#0e8c6a'
const AZUL = '#4a6ae0'
const EMBER = '#ee6a45'

// ajuste="meet" para conteúdo que muda de proporção durante o movimento: em vez
// de cortar a imagem no meio da transição, ele encolhe inteiro e fica centrado.
const Svg = ({ vb, children, ajuste = 'slice', ...rest }) => (
  <svg
    viewBox={vb}
    preserveAspectRatio={`xMidYMid ${ajuste}`}
    className="block h-full w-full"
    {...rest}
  >
    <defs>
      <filter id="sombra-baixa" x="-30%" y="-30%" width="160%" height="180%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#14374f" floodOpacity="0.08" />
      </filter>
      <filter id="sombra-media" x="-30%" y="-30%" width="160%" height="180%">
        <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#14374f" floodOpacity="0.14" />
      </filter>
    </defs>
    {children}
  </svg>
)

const Cartao = ({ x, y, w, h, r = 12, ...rest }) => (
  <rect
    x={x}
    y={y}
    width={w}
    height={h}
    rx={r}
    fill="#fff"
    stroke={LINHA}
    strokeWidth="1"
    filter="url(#sombra-baixa)"
    {...rest}
  />
)

const Pilula = ({ x, y, texto, cor, fundo, tam = 9.5 }) => {
  const w = texto.length * tam * 0.62 + 18
  return (
    <g>
      <rect x={x} y={y} width={w} height={tam + 9} rx={(tam + 9) / 2} fill={fundo} />
      <text
        x={x + w / 2}
        y={y + tam + 1.5}
        textAnchor="middle"
        fill={cor}
        fontSize={tam}
        fontWeight="700"
        letterSpacing="0.4"
      >
        {texto}
      </text>
    </g>
  )
}

const Avatar = ({ x, y, r, iniciais, cor = VERDE }) => (
  <g>
    <circle cx={x} cy={y} r={r} fill={cor} fillOpacity="0.14" />
    <text
      x={x}
      y={y + r * 0.36}
      textAnchor="middle"
      fill={cor}
      fontSize={r * 0.95}
      fontWeight="800"
    >
      {iniciais}
    </text>
  </g>
)

/* ─────────── o ambiente do cliente, usado em várias cenas ─────────── */

/**
 * O ambiente do cliente. É o mesmo cômodo nas duas chapas da cena 2 — na
 * primeira sem vidro nenhum, na segunda com o vidro sendo montado pela IA.
 *
 *   vidro     0 a 1 · quanto do vidro já foi revelado, da esquerda para a direita
 *   luz       0 a 1 · o brilho que corre pelo vidro depois de pronto
 *   id        sufixo dos gradientes, porque as duas chapas convivem na tela
 */
function Ambiente({ w, h, vidro = 0, luz = 0, id = 'a' }) {
  const piso = h * 0.775
  const rodape = piso - h * 0.028
  const vao = { x: w * 0.235, y: h * 0.115, w: w * 0.53 }
  vao.h = piso - vao.y

  const g = (n) => `${n}-${id}`
  const revelado = vidro > 0.001
  const varrendo = vidro > 0.001 && vidro < 0.999
  const xVarre = vao.x - 10 + (vao.w + 20) * vidro

  // duas folhas de correr; a da frente encosta na de trás
  const folha = vao.w * 0.53
  const folhas = [
    { x: vao.x + 4, w: folha, frente: false },
    { x: vao.x + vao.w - folha - 4, w: folha, frente: true },
  ]

  return (
    <g>
      <defs>
        <linearGradient id={g('parede')} x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0" stopColor="#f2f5f5" />
          <stop offset="1" stopColor="#dfe7e7" />
        </linearGradient>
        <linearGradient id={g('piso')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d8cfc2" />
          <stop offset="1" stopColor="#c9c0b2" />
        </linearGradient>
        <linearGradient id={g('fundo')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b8c8cd" />
          <stop offset="1" stopColor="#93a8b0" />
        </linearGradient>
        <linearGradient id={g('vidro')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#eaf7f4" stopOpacity="0.86" />
          <stop offset="0.55" stopColor="#cfe6ea" stopOpacity="0.58" />
          <stop offset="1" stopColor="#b9d6e6" stopOpacity="0.72" />
        </linearGradient>
        <linearGradient id={g('reflexo')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#cfe6ea" stopOpacity="0.5" />
          <stop offset="1" stopColor="#cfe6ea" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={g('varre')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0e8c6a" stopOpacity="0" />
          <stop offset="0.75" stopColor="#0e8c6a" stopOpacity="0.16" />
          <stop offset="1" stopColor="#0e8c6a" stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id={g('brilho')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.6" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={g('luzsol')} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fff6e2" stopOpacity="0.85" />
          <stop offset="1" stopColor="#fff6e2" stopOpacity="0" />
        </radialGradient>
        <clipPath id={g('corta')}>
          <rect x="0" y="0" width={Math.max(0, xVarre)} height={h} />
        </clipPath>
      </defs>

      {/* parede, rodapé e piso */}
      <rect x="0" y="0" width={w} height={h} fill={`url(#${g('parede')})`} />
      <ellipse cx={w * 0.84} cy={h * 0.3} rx={w * 0.4} ry={h * 0.3} fill={`url(#${g('luzsol')})`} />
      <rect x="0" y={piso} width={w} height={h - piso} fill={`url(#${g('piso')})`} />
      <rect x="0" y={rodape} width={w} height={piso - rodape} fill="#e8eeee" />
      <line x1="0" y1={rodape} x2={w} y2={rodape} stroke="#ccd6d6" strokeWidth="1" />
      {[0.24, 0.52, 0.8].map((k) => (
        <line
          key={k}
          x1={w * k}
          y1={piso}
          x2={w * k - w * 0.06}
          y2={h}
          stroke="#bdb3a4"
          strokeWidth="1"
          strokeOpacity="0.55"
        />
      ))}

      {/* o vão: o cômodo continua do outro lado */}
      <rect x={vao.x} y={vao.y} width={vao.w} height={vao.h} fill={`url(#${g('fundo')})`} />
      {/* piso do outro cômodo e sombra das ombreiras, para o vão ter fundo */}
      <rect
        x={vao.x}
        y={vao.y + vao.h * 0.84}
        width={vao.w}
        height={vao.h * 0.16}
        fill="#7f949c"
      />
      <rect x={vao.x} y={vao.y} width={vao.w * 0.07} height={vao.h} fill="#0f2530" fillOpacity="0.14" />
      <rect x={vao.x} y={vao.y} width={vao.w} height={vao.h * 0.05} fill="#0f2530" fillOpacity="0.12" />
      <rect
        x={vao.x + vao.w * 0.18}
        y={vao.y + vao.h * 0.14}
        width={vao.w * 0.36}
        height={vao.h * 0.4}
        fill="#c9dbdd"
        fillOpacity="0.85"
      />
      <rect
        x={vao.x + vao.w * 0.18}
        y={vao.y + vao.h * 0.14}
        width={vao.w * 0.36}
        height={vao.h * 0.4}
        fill="none"
        stroke="#8ea3a9"
        strokeWidth="2"
      />
      <line
        x1={vao.x + vao.w * 0.36}
        y1={vao.y + vao.h * 0.14}
        x2={vao.x + vao.w * 0.36}
        y2={vao.y + vao.h * 0.54}
        stroke="#8ea3a9"
        strokeWidth="2"
      />
      <rect
        x={vao.x - 4}
        y={vao.y - 4}
        width={vao.w + 8}
        height={vao.h + 4}
        fill="none"
        stroke="#b3c1c4"
        strokeWidth="3"
      />

      {/* planta, à esquerda */}
      <g>
        <path
          d={`M ${w * 0.09} ${piso} l ${w * 0.015} ${h * 0.075} h ${w * 0.055} l ${w * 0.015} ${-h * 0.075} Z`}
          fill="#b9857a"
        />
        <path
          d={`M ${w * 0.087} ${piso} h ${w * 0.096} v ${h * 0.012} h ${-w * 0.096} Z`}
          fill="#c99a8e"
        />
        {[
          [-0.055, -0.1, -22],
          [0.005, -0.135, 4],
          [0.05, -0.095, 26],
        ].map(([dx, dy, rot], i) => (
          <ellipse
            key={i}
            cx={w * (0.135 + dx)}
            cy={piso + h * dy}
            rx={w * 0.026}
            ry={h * 0.056}
            fill={i === 1 ? '#5f9a7d' : '#6ea98a'}
            transform={`rotate(${rot} ${w * (0.135 + dx)} ${piso + h * dy})`}
          />
        ))}
        <ellipse
          cx={w * 0.135}
          cy={piso + h * 0.09}
          rx={w * 0.075}
          ry={h * 0.012}
          fill="#0f2530"
          fillOpacity="0.1"
        />
      </g>

      {/* quadro, à direita */}
      <g>
        <rect
          x={w * 0.82}
          y={h * 0.2}
          width={w * 0.13}
          height={h * 0.17}
          fill="#fff"
          stroke="#c6cfd0"
          strokeWidth="2"
        />
        <rect
          x={w * 0.835}
          y={h * 0.215}
          width={w * 0.1}
          height={h * 0.14}
          fill="#dbe6e4"
        />
        <path
          d={`M ${w * 0.835} ${h * 0.355} l ${w * 0.03} ${-h * 0.055} l ${w * 0.025} ${h * 0.03} l ${w * 0.02} ${-h * 0.04} l ${w * 0.025} ${h * 0.065} Z`}
          fill="#a8c0bb"
        />
      </g>

      {/* o vidro, revelado da esquerda para a direita */}
      {revelado && (
        <g clipPath={`url(#${g('corta')})`}>
          {/* reflexo no chão */}
          <rect
            x={vao.x}
            y={piso}
            width={vao.w}
            height={h * 0.075}
            fill={`url(#${g('reflexo')})`}
          />
          {/* trilho de cima */}
          <rect
            x={vao.x - 10}
            y={vao.y - 14}
            width={vao.w + 20}
            height="13"
            rx="3"
            fill="#2b363c"
          />
          <rect
            x={vao.x - 10}
            y={vao.y - 14}
            width={vao.w + 20}
            height="4"
            rx="2"
            fill="#48565d"
          />

          {folhas.map((f, i) => (
            <g key={i}>
              <rect
                x={f.x}
                y={vao.y}
                width={f.w}
                height={vao.h - 2}
                fill={`url(#${g('vidro')})`}
                stroke={i ? '#8fb9c6' : '#9cc4c2'}
                strokeWidth="2"
              />
              <path
                d={`M ${f.x + f.w * 0.14} ${vao.y + vao.h - 6} L ${f.x + f.w * 0.66} ${vao.y + 8} L ${f.x + f.w * 0.86} ${vao.y + 8} L ${f.x + f.w * 0.34} ${vao.y + vao.h - 6} Z`}
                fill="#fff"
                fillOpacity="0.3"
              />
              <path
                d={`M ${f.x + f.w * 0.04} ${vao.y + vao.h - 6} L ${f.x + f.w * 0.3} ${vao.y + 8} L ${f.x + f.w * 0.38} ${vao.y + 8} L ${f.x + f.w * 0.12} ${vao.y + vao.h - 6} Z`}
                fill="#fff"
                fillOpacity="0.18"
              />
              <rect
                x={f.x}
                y={vao.y}
                width="3"
                height={vao.h - 2}
                fill="#fff"
                fillOpacity="0.5"
              />
            </g>
          ))}

          {/* puxador da folha da frente */}
          <rect
            x={folhas[1].x + folhas[1].w - w * 0.045}
            y={vao.y + vao.h * 0.42}
            width={w * 0.013}
            height={vao.h * 0.16}
            rx={w * 0.0065}
            fill="#2b363c"
          />
          <ellipse
            cx={vao.x + vao.w / 2}
            cy={piso + 3}
            rx={vao.w * 0.54}
            ry={h * 0.012}
            fill="#0f2530"
            fillOpacity="0.16"
          />

          {/* o brilho que corre pelo vidro quando fica pronto */}
          {luz > 0 && luz < 1 && (
            <rect
              x={vao.x - vao.w * 0.3 + vao.w * 1.5 * luz}
              y={vao.y}
              width={vao.w * 0.24}
              height={vao.h}
              fill={`url(#${g('brilho')})`}
              transform={`skewX(-12)`}
              style={{ transformOrigin: 'center' }}
            />
          )}
        </g>
      )}

      {/* a linha que varre enquanto a IA monta */}
      {varrendo && (
        <g>
          <rect
            x={Math.max(0, xVarre - w * 0.16)}
            y={vao.y - 18}
            width={w * 0.16}
            height={vao.h + 24}
            fill={`url(#${g('varre')})`}
          />
          <rect x={xVarre - 1.5} y={vao.y - 18} width="3" height={vao.h + 24} fill="#0e8c6a" />
          <circle cx={xVarre} cy={vao.y - 18} r="4.5" fill="#0e8c6a" />
        </g>
      )}
    </g>
  )
}

/**
 * A segunda foto do orçamento: o detalhe da ferragem, fotografado de perto.
 * Precisa ser outra imagem — duas fotos iguais no feed matam a ideia de que
 * cada visita rende um registro novo.
 */
function Ferragem({ w, h, id = 'f' }) {
  const g = (n) => `${n}-${id}`
  const trilho = { y: h * 0.2, alt: h * 0.11 }
  const vidro = h * 0.46
  const rodas = [w * 0.16, w * 0.5]

  return (
    <g>
      <defs>
        <linearGradient id={g('fundo')} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#eef3f4" />
          <stop offset="1" stopColor="#dde5e7" />
        </linearGradient>
        <linearGradient id={g('metal')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4a565d" />
          <stop offset="0.35" stopColor="#252f35" />
          <stop offset="1" stopColor="#161d21" />
        </linearGradient>
        <linearGradient id={g('folha')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#dcefec" stopOpacity="0.97" />
          <stop offset="1" stopColor="#a9c8d8" stopOpacity="0.92" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width={w} height={h} fill={`url(#${g('fundo')})`} />
      {/* fundo desfocado da obra, atrás do trilho */}
      <circle cx={w * 0.18} cy={h * 0.08} r={h * 0.22} fill="#fff" fillOpacity="0.5" />
      <circle cx={w * 0.86} cy={h * 0.04} r={h * 0.18} fill="#fff" fillOpacity="0.4" />
      <rect x="0" y={h * 0.06} width={w} height={h * 0.03} fill="#cdd7d9" fillOpacity="0.7" />

      {/* segunda folha, atrás — é uma porta de correr */}
      <rect
        x={w * 0.52}
        y={h * 0.5}
        width={w * 0.52}
        height={h * 0.5}
        fill="#cfe0e6"
        fillOpacity="0.55"
      />

      {/* trilho, sangrando nas duas bordas como numa foto de perto */}
      <rect x={-4} y={trilho.y} width={w + 8} height={trilho.alt} fill={`url(#${g('metal')})`} />
      <rect x={-4} y={trilho.y} width={w + 8} height={h * 0.02} fill="#5d6a71" />
      <rect
        x={-4}
        y={trilho.y + trilho.alt}
        width={w + 8}
        height={h * 0.04}
        fill="#0f2530"
        fillOpacity="0.14"
      />

      {/* roldanas e presilhas */}
      {rodas.map((cx, i) => (
        <g key={i}>
          <rect
            x={cx - w * 0.02}
            y={trilho.y + trilho.alt * 0.55}
            width={w * 0.04}
            height={vidro - trilho.y - trilho.alt * 0.55 + h * 0.03}
            fill="#1d262b"
          />
          <circle cx={cx} cy={trilho.y + trilho.alt * 0.5} r={h * 0.05} fill="#7c8a92" />
          <circle cx={cx} cy={trilho.y + trilho.alt * 0.5} r={h * 0.022} fill="#20292e" />
          <rect
            x={cx - w * 0.062}
            y={vidro - h * 0.025}
            width={w * 0.124}
            height={h * 0.15}
            rx={h * 0.018}
            fill="#20292e"
          />
          <circle cx={cx - w * 0.03} cy={vidro + h * 0.05} r={h * 0.013} fill="#5d6a71" />
          <circle cx={cx + w * 0.03} cy={vidro + h * 0.05} r={h * 0.013} fill="#5d6a71" />
        </g>
      ))}

      {/* a folha da frente, também sangrando */}
      <rect
        x={-4}
        y={vidro}
        width={w * 0.62}
        height={h - vidro}
        fill={`url(#${g('folha')})`}
        stroke="#a9cbd4"
        strokeWidth="1.6"
      />
      <path
        d={`M ${w * 0.02} ${h} L ${w * 0.26} ${vidro} L ${w * 0.35} ${vidro} L ${w * 0.11} ${h} Z`}
        fill="#fff"
        fillOpacity="0.45"
      />
      <path
        d={`M ${w * 0.3} ${h} L ${w * 0.48} ${vidro} L ${w * 0.53} ${vidro} L ${w * 0.35} ${h} Z`}
        fill="#fff"
        fillOpacity="0.26"
      />
      <rect x={-4} y={vidro} width={w * 0.62} height={h * 0.014} fill="#fff" fillOpacity="0.75" />
      <rect x={w * 0.62 - 3} y={vidro} width="3" height={h - vidro} fill="#fff" fillOpacity="0.6" />
    </g>
  )
}

/* ─────────── cena 1 · o orçamento em feed ─────────── */

const POSTS = [
  {
    tipo: 'foto',
    autor: 'MR',
    nome: 'Marcos Ribeiro',
    papel: 'vendedor',
    hora: 'ter 09:20',
    legenda: 'Vão da sala · 1180 × 2100 mm',
    imagem: 'ambiente',
    versoes: 3,
    h: 250,
  },
  {
    tipo: 'nota',
    autor: 'MD',
    nome: 'Marina Duarte',
    papel: 'cliente',
    hora: 'ter 15:44',
    cor: AZUL,
    rotulo: 'Observação',
    texto: 'Prefiro de correr, não de abrir.',
    h: 112,
  },
  {
    tipo: 'foto',
    autor: 'AS',
    nome: 'Ana Silveira',
    papel: 'escritório',
    hora: 'qua 08:05',
    legenda: 'Ferragem preta · roldana aparente',
    imagem: 'ferragem',
    versoes: 2,
    h: 250,
  },
  {
    tipo: 'nota',
    autor: 'MR',
    nome: 'Marcos Ribeiro',
    papel: 'vendedor',
    hora: 'qua 11:38',
    cor: EMBER,
    rotulo: 'Alteração de medida',
    texto: '1180 → 1175 mm de largura',
    h: 112,
  },
]

export function Feed({ t }) {
  const W = 340
  const H = 600
  const TOPO = 104
  const GAP = 10

  const ys = []
  let acc = TOPO + 12
  for (const p of POSTS) {
    ys.push(acc)
    acc += p.h + GAP
  }
  const rolagem = ease(range(t, 0.22, 0.8)) * Math.max(0, acc - H + 20)

  return (
    <Svg vb={`0 0 ${W} ${H}`} role="img" aria-label="O orçamento em feed, no celular do vendedor">
      <rect x="0" y="0" width={W} height={H} fill="#f3f6f9" />

      <g clipPath="url(#cl-feed)">
        <g transform={`translate(12 ${-rolagem})`}>
          {POSTS.map((p, i) => {
            const k = ease(range(t, 0.08 + i * 0.13, 0.22 + i * 0.13))
            const y = ys[i]
            return (
              <g key={i} style={{ opacity: k, transform: `translateY(${(1 - k) * 10}px)` }}>
                <Cartao x={0} y={y} w={316} h={p.h} />
                <Avatar x={22} y={y + 24} r={11} iniciais={p.autor} cor={p.cor ?? VERDE} />
                <text x={40} y={y + 21} fill={TINTA} fontSize="11.5" fontWeight="700">
                  {p.nome}
                </text>
                <text x={40} y={y + 33} fill={APAGADO} fontSize="9.5" fontWeight="600">
                  {p.papel} · {p.hora}
                </text>

                {p.tipo === 'foto' ? (
                  <>
                    <g clipPath={`url(#cl-foto-${i})`}>
                      <g transform={`translate(10 ${y + 44})`}>
                        {p.imagem === 'ferragem' ? (
                          <Ferragem w={296} h={p.h - 88} id={`feed${i}`} />
                        ) : (
                          <Ambiente w={296} h={p.h - 88} id={`feed${i}`} />
                        )}
                      </g>
                    </g>
                    <rect
                      x="10"
                      y={y + 44}
                      width="296"
                      height={p.h - 88}
                      rx="8"
                      fill="none"
                      stroke={LINHA}
                    />
                    <g transform={`translate(${306 - 16 - p.versoes * 10} ${y + p.h - 56})`}>
                      {Array.from({ length: p.versoes }).map((_, j) => (
                        <circle
                          key={j}
                          cx={j * 10}
                          cy="0"
                          r="2.8"
                          fill="#fff"
                          fillOpacity={j === p.versoes - 1 ? 1 : 0.55}
                        />
                      ))}
                    </g>
                    <text x="12" y={y + p.h - 15} fill={TINTA} fontSize="11" fontWeight="600">
                      {p.legenda}
                    </text>
                    <text
                      x="304"
                      y={y + p.h - 15}
                      textAnchor="end"
                      fill={APAGADO}
                      fontSize="9.5"
                      fontWeight="700"
                    >
                      {p.versoes} versões
                    </text>
                    <defs>
                      <clipPath id={`cl-foto-${i}`}>
                        <rect x="10" y={y + 44} width="296" height={p.h - 88} rx="8" />
                      </clipPath>
                    </defs>
                  </>
                ) : (
                  <>
                    <rect
                      x="12"
                      y={y + 46}
                      width="292"
                      height="50"
                      rx="8"
                      fill={p.cor}
                      fillOpacity="0.07"
                    />
                    <rect x="12" y={y + 46} width="2.5" height="50" rx="1.25" fill={p.cor} />
                    <text
                      x="24"
                      y={y + 63}
                      fill={p.cor}
                      fontSize="8.5"
                      fontWeight="800"
                      letterSpacing="0.7"
                    >
                      {p.rotulo.toUpperCase()}
                    </text>
                    <text x="24" y={y + 83} fill={TINTA} fontSize="12.5" fontWeight="600">
                      {p.texto}
                    </text>
                  </>
                )}
              </g>
            )
          })}
        </g>
      </g>

      {/* cabeçalho fixo */}
      <rect x="0" y="0" width={W} height={TOPO} fill="#fff" />
      <line x1="0" y1={TOPO} x2={W} y2={TOPO} stroke={LINHA} />
      <path
        d="M 20 24 l -6 6 l 6 6"
        fill="none"
        stroke={APAGADO}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text x="34" y="34" fill={TINTA} fontSize="14.5" fontWeight="800">
        Orçamento 26-0431
      </text>
      <Pilula x={244} y={20} texto="Em andamento" cor={VERDE} fundo="#e4f2ee" tam={8.5} />

      <Avatar x={26} y={62} r={11} iniciais="MD" cor={AZUL} />
      <text x={44} y={59} fill={TINTA} fontSize="11.5" fontWeight="700">
        Marina Duarte
      </text>
      <text x={44} y={71} fill={APAGADO} fontSize="9.5" fontWeight="600">
        Ap. 142 · Ed. Aurora
      </text>

      <g fontSize="10.5" fontWeight="700">
        <text x="20" y="95" fill={VERDE}>
          Feed
        </text>
        <text x="66" y="95" fill={APAGADO}>
          Itens
        </text>
        <text x="106" y="95" fill={APAGADO}>
          Proposta
        </text>
      </g>
      <rect x="18" y="100" width="30" height="2" rx="1" fill={VERDE} />

      {/* botão flutuante */}
      <g filter="url(#sombra-media)">
        <circle cx={302} cy={562} r="21" fill={VERDE} />
        <path
          d="M 302 553 v 18 M 293 562 h 18"
          stroke="#fff"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </g>

      <defs>
        <clipPath id="cl-feed">
          <rect x="0" y={TOPO} width={W} height={H - TOPO} />
        </clipPath>
      </defs>
    </Svg>
  )
}

// As versões anteriores, atrás da atual no carrossel.
export function FeedAntigo({ nivel = 1 }) {
  const W = 340
  const H = 600
  const c = nivel === 1 ? '#e7ecf2' : '#eef1f6'
  return (
    <Svg vb={`0 0 ${W} ${H}`} aria-hidden="true">
      <rect x="0" y="0" width={W} height={H} fill="#f7f9fc" />
      <rect x="0" y="0" width={W} height="104" fill="#fff" />
      <rect x="20" y="24" width="150" height="10" rx="5" fill={c} />
      <rect x="20" y="52" width="22" height="22" rx="11" fill={c} />
      <rect x="50" y="55" width="90" height="8" rx="4" fill={c} />
      <rect x="50" y="68" width="60" height="6" rx="3" fill={c} />
      {[128, 200, 322, 394, 516].map((y, i) => (
        <rect key={i} x="12" y={y} width="316" height={i % 2 ? 112 : 60} rx="12" fill={c} />
      ))}
    </Svg>
  )
}

/* ─────────── cena 2 · antes, simulação e checagem ─────────── */

function Abas({ w, ativo }) {
  const itens = ['Antes', 'Depois']
  return (
    <g>
      <rect x={w / 2 - 62} y="14" width="124" height="26" rx="13" fill="#fff" fillOpacity="0.94" />
      {itens.map((it, i) => {
        const cx = w / 2 - 31 + i * 62
        const on = i === ativo
        return (
          <g key={it}>
            {on && <rect x={cx - 29} y="17" width="58" height="20" rx="10" fill={VERDE} />}
            <text
              x={cx}
              y="31"
              textAnchor="middle"
              fill={on ? '#fff' : APAGADO}
              fontSize="10.5"
              fontWeight="700"
            >
              {it}
            </text>
          </g>
        )
      })}
    </g>
  )
}

export function Antes() {
  const W = 340
  const H = 420
  return (
    <Svg vb={`0 0 ${W} ${H}`} role="img" aria-label="O ambiente do cliente hoje, sem o vidro">
      <Ambiente w={W} h={H} id="antes" />
      <Abas w={W} ativo={0} />
      <g filter="url(#sombra-baixa)">
        <rect x="14" y={H - 44} width="118" height="28" rx="14" fill="#fff" fillOpacity="0.95" />
      </g>
      <text x="30" y={H - 25} fill={APAGADO} fontSize="10" fontWeight="700" letterSpacing="0.6">
        FOTO DA OBRA
      </text>
      <circle cx="24" cy={H - 29} r="3" fill={APAGADO} />
    </Svg>
  )
}

export function Simulacao({ t }) {
  const W = 360
  const H = 500
  // A IA varre o vão da esquerda para a direita e o vidro nasce atrás da linha.
  const vidro = ease(range(t, 0.14, 0.56))
  const luz = ease(range(t, 0.58, 0.86))
  const pronto = vidro > 0.999
  const barra = ease(range(t, 0.6, 0.76))
  const pontos = Math.floor(ease(range(t, 0.14, 0.56)) * 3.99)

  return (
    <Svg vb={`0 0 ${W} ${H}`} role="img" aria-label="O mesmo ambiente com o vidro montado pela IA">
      <Ambiente w={W} h={H} vidro={vidro} luz={luz} id="sim" />
      <Abas w={W} ativo={1} />

      {/* o selo: enquanto monta, mostra o progresso; depois, o carimbo */}
      <g filter="url(#sombra-media)">
        <rect
          x="14"
          y="52"
          width={pronto ? 136 : 182}
          height="28"
          rx="14"
          fill={pronto ? VERDE : '#0f2530'}
        />
      </g>
      <g transform="translate(30 66)">
        <path
          d="M0 -6.5 L1.7 -1.7 L6.5 0 L1.7 1.7 L0 6.5 L-1.7 1.7 L-6.5 0 L-1.7 -1.7 Z"
          fill="#fff"
        />
      </g>
      <text x="44" y="70" fill="#fff" fontSize="10.5" fontWeight="700" letterSpacing="0.6">
        {pronto ? 'GERADO POR IA' : `MONTANDO O VIDRO${'.'.repeat(pontos)}`}
      </text>

      {/* a medida que a IA leu do vão, cotada no chão para não brigar com o selo */}
      <g style={{ opacity: Math.min(1, vidro * 1.6) }}>
        <line
          x1={W * 0.235}
          y1={H * 0.82}
          x2={W * 0.765}
          y2={H * 0.82}
          stroke={VERDE}
          strokeWidth="1.6"
        />
        {[0.235, 0.765].map((k) => (
          <line
            key={k}
            x1={W * k}
            y1={H * 0.805}
            x2={W * k}
            y2={H * 0.835}
            stroke={VERDE}
            strokeWidth="1.6"
          />
        ))}
        <rect x={W / 2 - 34} y={H * 0.82 - 9} width="68" height="18" rx="9" fill="#fff" />
        <text
          x={W / 2}
          y={H * 0.82 + 4}
          textAnchor="middle"
          fill={VERDE}
          fontSize="10"
          fontWeight="800"
        >
          1175 mm
        </text>
      </g>

      {/* barra de ação, como no app */}
      <g style={{ opacity: barra, transform: `translateY(${(1 - barra) * 14}px)` }}>
        <g filter="url(#sombra-media)">
          <rect x="14" y={H - 62} width={W - 28} height="48" rx="14" fill="#fff" />
        </g>
        <rect x={W - 152} y={H - 51} width="126" height="26" rx="13" fill={VERDE} />
        <text
          x={W - 89}
          y={H - 33}
          textAnchor="middle"
          fill="#fff"
          fontSize="11.5"
          fontWeight="700"
        >
          Aprovar projeto
        </text>
        <text x="30" y={H - 40} fill={TINTA} fontSize="11.5" fontWeight="700">
          Porta de correr
        </text>
        <text x="30" y={H - 27} fill={APAGADO} fontSize="9.5" fontWeight="600">
          10 mm incolor · 1175 × 2100
        </text>
      </g>
    </Svg>
  )
}

const CHECAGEM = [
  ['Espessura', '10 mm · vão de 1175', true],
  ['Ferragem', 'roldana 100 kg · folha 42 kg', true],
  ['Esquadro', '4 mm no topo · confirmar', false],
  ['Prazo', 'têmpera cabe em 5 dias', true],
]

export function Checagem({ t }) {
  const W = 340
  const H = 420
  const n = Math.min(4, Math.floor(ease(range(t, 0.22, 0.8)) * 4.6))
  const rodape = ease(range(t, 0.78, 0.92))

  return (
    <Svg vb={`0 0 ${W} ${H}`} role="img" aria-label="A IA confere o pedido antes da produção">
      <rect x="0" y="0" width={W} height={H} fill="#fbfcfe" />

      <rect x="0" y="0" width={W} height="74" fill="#fff" />
      <line x1="0" y1="74" x2={W} y2="74" stroke={LINHA} />
      <text x="18" y="28" fill={TINTA} fontSize="14" fontWeight="800">
        Checagem do pedido
      </text>
      <text x="18" y="44" fill={APAGADO} fontSize="10.5" fontWeight="600">
        26-0431 · antes de descer para a fábrica
      </text>
      <Pilula x={244} y={16} texto="IA · ativo" cor={AZUL} fundo="#ecefff" tam={8.5} />
      <rect x="18" y="58" width={W - 36} height="3" rx="1.5" fill="#eef1f6" />
      <rect x="18" y="58" width={(W - 36) * (n / 4)} height="3" rx="1.5" fill={VERDE} />

      {CHECAGEM.map(([titulo, valor, ok], i) => {
        const y = 96 + i * 62
        const k = ease(range(t, 0.24 + i * 0.13, 0.4 + i * 0.13))
        const cor = ok ? VERDE : EMBER
        return (
          <g key={i} style={{ opacity: k, transform: `translateY(${(1 - k) * 6}px)` }}>
            <Cartao x={14} y={y} w={W - 28} h={50} r={10} />
            <circle cx="38" cy={y + 25} r="11" fill={cor} fillOpacity="0.13" />
            {ok ? (
              <path
                d={`M 33 ${y + 25} l 3.6 4 l 7 -8`}
                fill="none"
                stroke={cor}
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              <>
                <line
                  x1="38"
                  y1={y + 19}
                  x2="38"
                  y2={y + 26}
                  stroke={cor}
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <circle cx="38" cy={y + 31} r="1.6" fill={cor} />
              </>
            )}
            <text x="60" y={y + 22} fill={ok ? TINTA : '#c4491f'} fontSize="12" fontWeight="700">
              {titulo}
            </text>
            <text x="60" y={y + 37} fill={APAGADO} fontSize="10" fontWeight="600">
              {valor}
            </text>
          </g>
        )
      })}

      <g style={{ opacity: rodape }}>
        <rect x="14" y={H - 58} width={W - 28} height="42" rx="12" fill="#fdeee8" />
        <text x="30" y={H - 38} fill="#c4491f" fontSize="11" fontWeight="700">
          1 pendência antes de liberar
        </text>
        <text x="30" y={H - 25} fill="#c4491f" fontSize="9.5" fontWeight="600" fillOpacity="0.8">
          confirmar o esquadro com o instalador
        </text>
      </g>
    </Svg>
  )
}

/* ─────────── cena 3 · a chapa sendo cortada ─────────── */

export const CHAPA = { w: 3210, h: 2250 }
export const PECAS = [
  { id: 'P1', x: 0, y: 0, w: 1200, h: 900 },
  { id: 'P2', x: 0, y: 900, w: 1200, h: 900 },
  { id: 'P3', x: 0, y: 1800, w: 1200, h: 450 },
  { id: 'P4', x: 1200, y: 0, w: 1230, h: 1100 },
  { id: 'P5', x: 1200, y: 1100, w: 600, h: 1150 },
  { id: 'P6', x: 1800, y: 1100, w: 630, h: 1150 },
  { id: 'P7', x: 2430, y: 0, w: 780, h: 1400 },
]
export const SOBRA = { x: 2430, y: 1400, w: 780, h: 850 }

const CORTES = [
  [1200, 0, 1200, 2250],
  [2430, 0, 2430, 2250],
  [0, 900, 1200, 900],
  [0, 1800, 1200, 1800],
  [1200, 1100, 2430, 1100],
  [1800, 1100, 1800, 2250],
  [2430, 1400, 3210, 1400],
]

const AREA = PECAS.reduce((a, q) => a + q.w * q.h, 0)
export const APROVEITAMENTO = (AREA / (CHAPA.w * CHAPA.h)) * 100

export const FATIAS = [
  { x: 0, w: 1200 },
  { x: 1200, w: 1230 },
  { x: 2430, w: 780 },
]

// Paleta do plano de corte, a mesma no palco e dentro dos aparelhos.
const PLANO = {
  chapa: '#fbfdfd',
  borda: '#dde5e7',
  peca: '#e4f4ec',
  pecaBorda: '#6fbb9c',
  rotulo: '#3a8d72',
  cota: '#587680',
  corte: '#0e7b9c',
  sobra: '#fdeae1',
  sobraBorda: '#e2683f',
}

/**
 * O plano desenhado em unidades da chapa (3210 × 2250). `px` converte pixels de
 * tela em unidades de chapa, para que a espessura do traço saia igual no palco
 * e dentro de um celular — era o que fazia as linhas parecerem grossas.
 *
 *   mostra(i)  0 a 1 · quanto da peça i já apareceu
 *   corte(i)   0 a 1 · quanto do risco i já foi traçado
 *   sobra      0 a 1 · o retalho
 *   levanta    0 a 1 · o retalho se descolando da chapa, no fim da cena
 */
function DesenhoPlano({
  px,
  mostra = () => 1,
  corte = () => 1,
  sobra = 1,
  levanta = 0,
  comCotas = true,
  id = 'p',
}) {
  const folga = px(2.2)
  const raio = px(2.5)
  // sobe para a esquerda: no canto da chapa, descolar para o outro lado
  // jogaria o retalho para fora do desenho
  const desloca = -px(6) * levanta

  return (
    <g>
      {PECAS.map((q, i) => {
        const k = mostra(i)
        if (k <= 0) return null
        // a cota só entra se o texto couber dentro da peça, com folga
        const cota = `${q.w} × ${q.h}`
        const larguraCota = cota.length * px(12.5) * 0.58
        const cabe = comCotas && q.w > larguraCota * 1.3 && q.h > px(42)
        return (
          <g key={q.id} style={{ opacity: k }}>
            <rect
              x={q.x + folga}
              y={q.y + folga}
              width={q.w - folga * 2}
              height={q.h - folga * 2}
              rx={raio}
              fill={PLANO.peca}
              stroke={PLANO.pecaBorda}
              strokeOpacity="0.75"
              strokeWidth={px(1)}
            />
            {comCotas && (
              <text
                x={q.x + px(8)}
                y={q.y + px(17)}
                fill={PLANO.rotulo}
                fontSize={px(9.5)}
                fontWeight="700"
              >
                {q.id}
              </text>
            )}
            {cabe && (
              <text
                x={q.x + q.w / 2}
                y={q.y + q.h / 2 + px(4.5)}
                textAnchor="middle"
                fill={PLANO.cota}
                fontSize={px(12.5)}
                fontWeight="600"
              >
                {q.w} × {q.h}
              </text>
            )}
          </g>
        )
      })}

      {/* os riscos de corte, entre as peças */}
      {CORTES.map((c, i) => {
        const k = corte(i)
        if (k <= 0) return null
        const len = Math.hypot(c[2] - c[0], c[3] - c[1])
        return (
          <line
            key={i}
            x1={c[0]}
            y1={c[1]}
            x2={c[2]}
            y2={c[3]}
            stroke={PLANO.corte}
            strokeWidth={px(1.1)}
            strokeOpacity="0.35"
            strokeDasharray={len}
            strokeDashoffset={len * (1 - k)}
          />
        )
      })}

      {/* o retalho: no fim ele se descola da chapa e ganha endereço */}
      <g
        style={{
          opacity: sobra,
          transform: `translate(${desloca}px, ${desloca}px)`,
        }}
      >
        {levanta > 0 && (
          <rect
            x={SOBRA.x + folga}
            y={SOBRA.y + folga}
            width={SOBRA.w - folga * 2}
            height={SOBRA.h - folga * 2}
            rx={raio}
            fill="#0f2530"
            opacity={0.1 * levanta}
            transform={`translate(${px(4)} ${px(6)})`}
          />
        )}
        <rect
          x={SOBRA.x + folga}
          y={SOBRA.y + folga}
          width={SOBRA.w - folga * 2}
          height={SOBRA.h - folga * 2}
          rx={raio}
          fill={PLANO.sobra}
          stroke={PLANO.sobraBorda}
          strokeWidth={px(1.3 + levanta * 0.5)}
          // tracejado enquanto é só sobra; contínuo quando vira retalho reservado
          strokeDasharray={levanta > 0.6 ? undefined : `${px(6)} ${px(4)}`}
        />
        {comCotas && SOBRA.w > px(112) && (
          <g textAnchor="middle" fill={PLANO.sobraBorda}>
            <text
              x={SOBRA.x + SOBRA.w / 2}
              y={SOBRA.y + SOBRA.h / 2 - px(16)}
              fontSize={px(9.5)}
              fontWeight="800"
              letterSpacing={px(1.6)}
            >
              {levanta > 0.6 ? 'RETALHO RESERVADO' : 'RETALHO'}
            </text>
            <text
              x={SOBRA.x + SOBRA.w / 2}
              y={SOBRA.y + SOBRA.h / 2 + px(4)}
              fontSize={px(15)}
              fontWeight="800"
            >
              780 × 850
            </text>
            <text
              x={SOBRA.x + SOBRA.w / 2}
              y={SOBRA.y + SOBRA.h / 2 + px(18)}
              fontSize={px(9)}
              fontWeight="600"
              fillOpacity="0.85"
            >
              8 mm · incolor
            </text>
            {levanta > 0.01 && (
              <g style={{ opacity: levanta }}>
                <rect
                  x={SOBRA.x + SOBRA.w / 2 - px(52)}
                  y={SOBRA.y + SOBRA.h / 2 + px(28)}
                  width={px(104)}
                  height={px(19)}
                  rx={px(9.5)}
                  fill={PLANO.sobraBorda}
                  fillOpacity="0.18"
                />
                <g transform={`translate(${SOBRA.x + SOBRA.w / 2 - px(41)} ${SOBRA.y + SOBRA.h / 2 + px(37.5)})`}>
                  <path
                    d={`M ${-px(3.4)} 0 L ${-px(1)} ${px(2.6)} L ${px(3.6)} ${-px(3)}`}
                    fill="none"
                    stroke={PLANO.sobraBorda}
                    strokeWidth={px(1.7)}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <text
                  x={SOBRA.x + SOBRA.w / 2 + px(6)}
                  y={SOBRA.y + SOBRA.h / 2 + px(41)}
                  fontSize={px(8.5)}
                  fontWeight="700"
                >
                  CAVALETE A-03
                </text>
              </g>
            )}
          </g>
        )}
      </g>
    </g>
  )
}

export function FatiaChapa({ t, indice }) {
  const { x: x0, w: larguraFatia } = FATIAS[indice]
  // largura da fatia no palco, em pixels: é a régua da espessura do traço
  const noPalco = [359, 368, 233][indice]
  const px = (n) => (n * larguraFatia) / noPalco

  const corte = (i) => ease(range(t, 0.12 + i * 0.04, 0.12 + i * 0.04 + 0.08))
  const mostra = (i) => ease(range(t, 0.3 + i * 0.018, 0.45 + i * 0.018))
  const sobra = ease(range(t, 0.5, 0.62))
  const levanta = ease(range(t, 0.76, 0.94))

  return (
    <Svg vb={`${x0} 0 ${larguraFatia} ${CHAPA.h}`} aria-hidden="true">
      <rect x={x0} y="0" width={larguraFatia} height={CHAPA.h} fill={PLANO.chapa} />

      <DesenhoPlano
        px={px}
        mostra={mostra}
        corte={corte}
        sobra={sobra}
        levanta={levanta}
        id={`fatia${indice}`}
      />
    </Svg>
  )
}

/* ─────────── cena 4 · o mesmo plano em qualquer tela ─────────── */

/**
 * O plano dentro da tela do aparelho. Mesmo desenho do palco, na mesma régua:
 * `px` devolve unidades de chapa a partir de pixels de tela, então o traço sai
 * com a mesma espessura no notebook e no celular.
 */
function MiniPlano({ x, y, w, h, cotas = true }) {
  const s = Math.min((w - 4) / CHAPA.w, (h - 4) / CHAPA.h)
  const px = (n) => n / s
  const largura = CHAPA.w * s
  const altura = CHAPA.h * s
  const ox = x + (w - largura) / 2
  const oy = y + (h - altura) / 2

  return (
    <g>
      {/* a mesa de trabalho atrás da chapa */}
      <rect x={x} y={y} width={w} height={h} fill="#f7f9fa" />
      <g transform={`translate(${ox} ${oy}) scale(${s})`}>
        <rect
          x="0"
          y="0"
          width={CHAPA.w}
          height={CHAPA.h}
          fill="#fff"
          stroke="#dde5e7"
          strokeWidth={px(1)}
        />
        <DesenhoPlano px={px} comCotas={cotas && largura > 260} />
      </g>
    </g>
  )
}

const CARCACA = '#28333a'
const CARCACA_CLARA = '#3d4a52'

/** O símbolo da marca dentro de um SVG, para aparecer nas telas dos aparelhos. */
function MarcaSvg({ x, y, tam, id }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${tam / 100})`}>
      <defs>
        <linearGradient id={`ma-${id}`} x1="0" y1="0" x2="1" y2="0.4">
          <stop offset="0" stopColor="#64b298" />
          <stop offset="0.5" stopColor="#c9d38c" />
          <stop offset="1" stopColor="#e59659" />
        </linearGradient>
        <linearGradient id={`mb-${id}`} x1="0" y1="1" x2="1" y2="0.5">
          <stop offset="0" stopColor="#4b6fc4" />
          <stop offset="0.5" stopColor="#8663a6" />
          <stop offset="1" stopColor="#d1626b" />
        </linearGradient>
        <linearGradient id={`mc-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" stopOpacity="1" />
        </linearGradient>
        <mask id={`mm-${id}`}>
          <rect width="100" height="100" fill={`url(#mc-${id})`} />
        </mask>
        <clipPath id={`mk-${id}`}>
          <rect width="100" height="100" rx="23" />
        </clipPath>
      </defs>
      <g clipPath={`url(#mk-${id})`}>
        <rect width="100" height="100" fill={`url(#ma-${id})`} />
        <rect width="100" height="100" fill={`url(#mb-${id})`} mask={`url(#mm-${id})`} />
        <path
          d="M48.5 33.1 L68.2 67.4 H28.4 Z"
          fill="#fff"
          stroke="#fff"
          strokeWidth="4"
          strokeLinejoin="round"
        />
      </g>
    </g>
  )
}

const NAV = [
  // ícones da barra lateral, desenhados em 16 × 16
  'M2 4h12M2 8h12M2 12h8',
  'M2 3h12v10H2z M2 6.5h12',
  'M3 13V6l5-3 5 3v7z',
  'M2.5 8.5l3.5 3.5 7-7',
  'M8 2v12M2 8h12',
]

/** A tela do sistema, desenhada dentro do vidro de qualquer aparelho. */
function Interface({ w, h, tipo, id }) {
  const eCelular = tipo === 'celular'
  const eNavegador = tipo === 'navegador'
  const comLateral = eNavegador
  const lateral = comLateral ? 42 : 0
  const barra = eNavegador ? 26 : 0 // barra do navegador
  const topo = eCelular ? 46 : 34 // cabeçalho do app
  const rodape = eCelular ? 42 : 30
  const p = eCelular ? 8 : 10
  const fonte = eCelular ? 6.5 : 8.5

  const appY = barra
  const appH = h - barra

  return (
    <g>
      <rect x="0" y="0" width={w} height={h} fill="#fff" />

      {/* barra do navegador */}
      {eNavegador && (
        <g>
          <rect x="0" y="0" width={w} height={barra} fill="#eef2f5" />
          <circle cx="14" cy={barra / 2} r="3" fill="#d6dee6" />
          <circle cx="24" cy={barra / 2} r="3" fill="#d6dee6" />
          <circle cx="34" cy={barra / 2} r="3" fill="#d6dee6" />
          <rect
            x="46"
            y={barra / 2 - 7}
            width={w - 60}
            height="14"
            rx="7"
            fill="#fff"
            stroke={LINHA}
          />
          <text x="55" y={barra / 2 + 3} fill={APAGADO} fontSize="7.5" fontWeight="600">
            neoglass.online/otimizacao
          </text>
        </g>
      )}

      {/* barra lateral do sistema */}
      {comLateral && (
        <g>
          <rect x="0" y={appY} width={lateral} height={appH} fill="#f4f7f8" />
          <line x1={lateral} y1={appY} x2={lateral} y2={h} stroke={LINHA} />
          <MarcaSvg x={11} y={appY + 12} tam={20} id={`${id}-lat`} />
          {NAV.map((d, i) => (
            <g key={i} transform={`translate(${lateral / 2 - 8} ${appY + 48 + i * 26})`}>
              {i === 1 && (
                <rect x="-5" y="-4" width="26" height="24" rx="7" fill={VERDE} fillOpacity="0.12" />
              )}
              <path
                d={d}
                fill="none"
                stroke={i === 1 ? VERDE : '#a9b6bf'}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          ))}
        </g>
      )}

      {/* cabeçalho do sistema */}
      <g>
        <rect x={lateral} y={appY} width={w - lateral} height={topo} fill="#fff" />
        <line x1={lateral} y1={appY + topo} x2={w} y2={appY + topo} stroke={LINHA} />
        {!comLateral && <MarcaSvg x={p} y={appY + (topo - 18) / 2} tam={18} id={`${id}-cab`} />}
        <text
          x={lateral + p + (comLateral ? 0 : 24)}
          y={appY + topo / 2 - 1}
          fill={TINTA}
          fontSize={eCelular ? 8 : 10}
          fontWeight="800"
        >
          Otimização
        </text>
        <text
          x={lateral + p + (comLateral ? 0 : 24)}
          y={appY + topo / 2 + 9}
          fill={APAGADO}
          fontSize={fonte}
          fontWeight="600"
        >
          26-0431 · 8 mm incolor
        </text>

        {!eCelular && (
          <g>
            {eNavegador && (
              <>
                <rect
                  x={w - p - 152}
                  y={appY + topo / 2 - 9}
                  width="62"
                  height="18"
                  rx="9"
                  fill="#fff"
                  stroke={LINHA}
                />
                <text
                  x={w - p - 121}
                  y={appY + topo / 2 + 3}
                  textAnchor="middle"
                  fill={TINTA}
                  fontSize={fonte}
                  fontWeight="700"
                >
                  Exportar
                </text>
              </>
            )}
            <rect
              x={w - p - 84}
              y={appY + topo / 2 - 9}
              width="84"
              height="18"
              rx="9"
              fill={VERDE}
            />
            <text
              x={w - p - 42}
              y={appY + topo / 2 + 3}
              textAnchor="middle"
              fill="#fff"
              fontSize={fonte}
              fontWeight="700"
            >
              Gerar arquivos
            </text>
          </g>
        )}
        {eCelular && (
          <circle cx={w - p - 8} cy={appY + topo / 2} r="9" fill={VERDE} fillOpacity="0.12" />
        )}
      </g>

      {/* a mesa com o plano */}
      <MiniPlano
        x={lateral}
        y={appY + topo}
        w={w - lateral}
        h={appH - topo - rodape}
        cotas={!eCelular}
      />

      {/* rodapé com os números */}
      <g>
        <rect x={lateral} y={h - rodape} width={w - lateral} height={rodape} fill="#fff" />
        <line x1={lateral} y1={h - rodape} x2={w} y2={h - rodape} stroke={LINHA} />
        {[
          ['Aproveitamento', '90,8%', VERDE],
          ['Peças', '7', TINTA],
          ['Retalho', '1', EMBER],
        ]
          .slice(0, eCelular ? 2 : 3)
          .map(([rot, val, cor], i) => (
            <g key={rot} transform={`translate(${lateral + p + i * (eCelular ? 74 : 96)} 0)`}>
              <text
                x="0"
                y={h - rodape + (eCelular ? 15 : 12)}
                fill={APAGADO}
                fontSize={fonte - 1}
                fontWeight="600"
              >
                {rot}
              </text>
              <text
                x="0"
                y={h - rodape + (eCelular ? 27 : 24)}
                fill={cor}
                fontSize={eCelular ? 9 : 11}
                fontWeight="800"
              >
                {val}
              </text>
            </g>
          ))}
        {eCelular && (
          <g>
            <rect
              x={w - p - 72}
              y={h - rodape + 9}
              width="72"
              height="20"
              rx="10"
              fill={VERDE}
            />
            <text
              x={w - p - 36}
              y={h - rodape + 22}
              textAnchor="middle"
              fill="#fff"
              fontSize={fonte}
              fontWeight="700"
            >
              Gerar
            </text>
          </g>
        )}
      </g>
    </g>
  )
}

/**
 * Os aparelhos. Cada chapa da última cena vira um deles — notebook, tablet e
 * celular — com carcaça, moldura e sombra no apoio, para ler como objeto e não
 * como janela flutuando.
 */
const APARELHO = { navegador: [640, 400], tablet: [340, 470], celular: [190, 380] }

export function Tela({ tipo }) {
  const [W, H] = APARELHO[tipo]

  if (tipo === 'navegador') {
    const tampaX = 62
    const tampaW = W - tampaX * 2
    const tampaH = 322
    const m = 13
    const telaW = tampaW - m * 2
    const telaH = tampaH - m * 2 - 8
    return (
      <Svg
        vb={`0 0 ${W} ${H}`}
        ajuste="meet"
        role="img"
        aria-label="O plano de corte aberto no computador"
      >
        <ellipse cx={W / 2} cy={H - 12} rx={W * 0.44} ry="10" fill="#0f2530" fillOpacity="0.11" />
        <rect x={tampaX} y="0" width={tampaW} height={tampaH} rx="13" fill={CARCACA} />
        <rect
          x={tampaX + 1.5}
          y="1.5"
          width={tampaW - 3}
          height={tampaH - 3}
          rx="11.5"
          fill="none"
          stroke={CARCACA_CLARA}
          strokeWidth="1.5"
        />
        <circle cx={W / 2} cy={m / 2 + 1} r="2.2" fill="#5c6c75" />
        <g clipPath="url(#tela-note)">
          <g transform={`translate(${tampaX + m} ${m})`}>
          <Interface w={telaW} h={telaH} tipo={tipo} id="note" />
          </g>
        </g>
        <defs>
          <clipPath id="tela-note">
            <rect x={tampaX + m} y={m} width={telaW} height={telaH} rx="3" />
          </clipPath>
        </defs>

        <path
          d={`M ${tampaX - 4} ${tampaH} H ${W - tampaX + 4} L ${W - 14} ${H - 22} H 14 Z`}
          fill="#c8d2d8"
        />
        <path
          d={`M ${tampaX - 4} ${tampaH} H ${W - tampaX + 4} L ${W - tampaX + 10} ${tampaH + 7} H ${tampaX - 10} Z`}
          fill="#aab7bf"
        />
        <rect x="14" y={H - 22} width={W - 28} height="9" rx="4.5" fill="#b6c2c9" />
        <rect x={W / 2 - 56} y={H - 22} width="112" height="4.5" rx="2.25" fill="#9daab2" />
      </Svg>
    )
  }

  if (tipo === 'tablet') {
    const m = 15
    const telaW = W - m * 2
    const telaH = H - 10 - m * 2
    return (
      <Svg
        vb={`0 0 ${W} ${H}`}
        ajuste="meet"
        role="img"
        aria-label="O plano de corte aberto no tablet"
      >
        <ellipse cx={W / 2} cy={H - 4} rx={W * 0.42} ry="8" fill="#0f2530" fillOpacity="0.1" />
        <rect x="0" y="0" width={W} height={H - 10} rx="26" fill={CARCACA} />
        <rect
          x="1.6"
          y="1.6"
          width={W - 3.2}
          height={H - 13.2}
          rx="24.5"
          fill="none"
          stroke={CARCACA_CLARA}
          strokeWidth="1.6"
        />
        <circle cx={W / 2} cy={m / 2 + 2} r="2.4" fill="#5c6c75" />
        <g clipPath="url(#tela-tablet)">
          <g transform={`translate(${m} ${m})`}>
          <Interface w={telaW} h={telaH} tipo={tipo} id="tab" />
          </g>
        </g>
        <defs>
          <clipPath id="tela-tablet">
            <rect x={m} y={m} width={telaW} height={telaH} rx="12" />
          </clipPath>
        </defs>
        <rect x={W - 1.5} y="52" width="3.5" height="34" rx="1.75" fill={CARCACA_CLARA} />
      </Svg>
    )
  }

  const m = 9
  const telaW = W - m * 2
  const telaH = H - 8 - m * 2
  return (
    <Svg
      vb={`0 0 ${W} ${H}`}
      ajuste="meet"
      role="img"
      aria-label="O plano de corte aberto no celular"
    >
      <ellipse cx={W / 2} cy={H - 3} rx={W * 0.4} ry="7" fill="#0f2530" fillOpacity="0.1" />
      <rect x="0" y="0" width={W} height={H - 8} rx="28" fill={CARCACA} />
      <rect
        x="1.5"
        y="1.5"
        width={W - 3}
        height={H - 11}
        rx="26.5"
        fill="none"
        stroke={CARCACA_CLARA}
        strokeWidth="1.5"
      />
      <g clipPath="url(#tela-celular)">
          <g transform={`translate(${m} ${m})`}>
        <Interface w={telaW} h={telaH} tipo={tipo} id="cel" />
        </g>
      </g>
      <defs>
        <clipPath id="tela-celular">
          <rect x={m} y={m} width={telaW} height={telaH} rx="20" />
        </clipPath>
      </defs>
      <rect x={W / 2 - 21} y={m + 5} width="42" height="10" rx="5" fill={CARCACA} />
      <rect x={W / 2 - 24} y={H - 8 - m - 7} width="48" height="3.4" rx="1.7" fill="#c2ccd2" />
      <rect x={W - 1.4} y="86" width="3.4" height="30" rx="1.7" fill={CARCACA_CLARA} />
      <rect x={-2} y="70" width="3.4" height="20" rx="1.7" fill={CARCACA_CLARA} />
    </Svg>
  )
}


/* ─────────── abertura · o que já está dentro do vidro ─────────── */

/**
 * As três chapas da abertura. Não são esboço nem enfeite: são três telas de
 * verdade do sistema, legíveis, com os mesmos números que aparecem no filme
 * logo abaixo — o orçamento que entra, o plano que sai e o dinheiro que sobra.
 */
export function Vitrine({ tipo }) {
  if (tipo === 'plano') {
    const W = 258
    const H = 372
    return (
      <Svg vb={`0 0 ${W} ${H}`} role="img" aria-label="Plano de corte otimizado">
        <rect x="0" y="0" width={W} height={H} fill="#fff" />
        <rect x="0" y="0" width={W} height="40" fill="#fbfcfd" />
        <line x1="0" y1="40" x2={W} y2="40" stroke={LINHA} />
        <MarcaSvg x={12} y={11} tam={18} id="vit-plano" />
        <text x="36" y="21" fill={TINTA} fontSize="10" fontWeight="800">
          Otimização
        </text>
        <text x="36" y="31" fill={APAGADO} fontSize="7" fontWeight="600">
          26-0431 · 8 mm incolor
        </text>
        <rect x={W - 60} y="12" width="48" height="17" rx="8.5" fill={VERDE} />
        <text
          x={W - 36}
          y="24"
          textAnchor="middle"
          fill="#fff"
          fontSize="8"
          fontWeight="800"
        >
          90,8%
        </text>

        <MiniPlano x={0} y={40} w={W} h={H - 40 - 34} cotas={false} />

        <line x1="0" y1={H - 34} x2={W} y2={H - 34} stroke={LINHA} />
        <circle cx="17" cy={H - 18} r="2.6" fill={VERDE} />
        <text x="25" y={H - 15} fill={TINTA} fontSize="8" fontWeight="700">
          7 peças cortadas
        </text>
        <circle cx={W - 74} cy={H - 18} r="2.6" fill={EMBER} />
        <text x={W - 66} y={H - 15} fill={TINTA} fontSize="8" fontWeight="700">
          1 retalho
        </text>
      </Svg>
    )
  }

  if (tipo === 'margem') {
    const W = 212
    const H = 268
    const linhas = [
      ['Matéria-prima', 'R$ 1.180'],
      ['Produção', 'R$ 640'],
      ['Gastos do pedido', 'R$ 210'],
    ]
    return (
      <Svg vb={`0 0 ${W} ${H}`} role="img" aria-label="Fechamento financeiro do pedido">
        <rect x="0" y="0" width={W} height={H} fill="#fff" />
        <rect x="0" y="0" width={W} height="36" fill="#fbfcfd" />
        <line x1="0" y1="36" x2={W} y2="36" stroke={LINHA} />
        <text x="14" y="18" fill={TINTA} fontSize="9.5" fontWeight="800">
          Fechamento do pedido
        </text>
        <text x="14" y="29" fill={APAGADO} fontSize="7" fontWeight="600">
          26-0431 · Marina Duarte
        </text>

        <text x="14" y="55" fill={APAGADO} fontSize="7" fontWeight="700" letterSpacing="0.5">
          RECEITA
        </text>
        <text x={W - 14} y="55" textAnchor="end" fill={TINTA} fontSize="9.5" fontWeight="800">
          R$ 3.480
        </text>
        <line x1="14" y1="63" x2={W - 14} y2="63" stroke={LINHA} />

        {linhas.map(([rot, val], i) => (
          <g key={rot}>
            <text x="14" y={82 + i * 20} fill={APAGADO} fontSize="8" fontWeight="600">
              {rot}
            </text>
            <text
              x={W - 14}
              y={82 + i * 20}
              textAnchor="end"
              fill={TINTA}
              fontSize="8.5"
              fontWeight="700"
            >
              − {val}
            </text>
          </g>
        ))}

        <rect x="14" y="152" width={W - 28} height="9" rx="4.5" fill="#eef2f4" />
        {[
          [1180, '#0e7b9c'],
          [640, '#7c6ad6'],
          [210, '#b6c1c9'],
          [1450, '#b8862c'],
        ].reduce(
          (acc, [v, cor], i) => {
            const largura = ((W - 28) * v) / 3480
            acc.nos.push(
              <rect
                key={i}
                x={14 + acc.x}
                y="152"
                width={largura}
                height="9"
                fill={cor}
                rx={i === 0 || i === 3 ? 4.5 : 0}
              />,
            )
            acc.x += largura
            return acc
          },
          { x: 0, nos: [] },
        ).nos}

        <rect
          x="14"
          y="178"
          width={W - 28}
          height="58"
          rx="10"
          fill="#b8862c"
          fillOpacity="0.09"
        />
        <text x="26" y="198" fill="#8a6317" fontSize="7.5" fontWeight="700" letterSpacing="0.6">
          MARGEM DESTE PEDIDO
        </text>
        <text x="26" y="220" fill="#8a6317" fontSize="18" fontWeight="800">
          R$ 1.450
        </text>
        <text x={W - 26} y="220" textAnchor="end" fill="#8a6317" fontSize="13" fontWeight="800">
          41,7%
        </text>
        <text x="14" y="253" fill={APAGADO} fontSize="7" fontWeight="600">
          Nota emitida · boleto na rua · entregue em 5 dias
        </text>
      </Svg>
    )
  }

  // o orçamento em feed
  const W = 205
  const H = 292
  return (
    <Svg vb={`0 0 ${W} ${H}`} role="img" aria-label="Orçamento em linha do tempo">
      <rect x="0" y="0" width={W} height={H} fill="#f7f9fb" />
      <rect x="0" y="0" width={W} height="38" fill="#fff" />
      <line x1="0" y1="38" x2={W} y2="38" stroke={LINHA} />
      <text x="13" y="18" fill={TINTA} fontSize="9.5" fontWeight="800">
        Orçamento 26-0431
      </text>
      <text x="13" y="29" fill={APAGADO} fontSize="7" fontWeight="600">
        Marina Duarte · Ap. 142
      </text>
      <rect x={W - 56} y="11" width="44" height="15" rx="7.5" fill={VERDE} fillOpacity="0.12" />
      <text
        x={W - 34}
        y="21.5"
        textAnchor="middle"
        fill={VERDE}
        fontSize="6.5"
        fontWeight="700"
      >
        Em andamento
      </text>

      {/* o post com foto da obra */}
      <g>
        <Cartao x={9} y={48} w={W - 18} h={124} r={9} />
        <Avatar x={24} y={64} r={8} iniciais="MR" />
        <text x={38} y={61} fill={TINTA} fontSize="7.5" fontWeight="700">
          Marcos Ribeiro
        </text>
        <text x={38} y={70} fill={APAGADO} fontSize="6" fontWeight="600">
          vendedor · ter 09:20
        </text>
        <clipPath id="vit-foto">
          <rect x="17" y="78" width={W - 34} height="60" rx="6" />
        </clipPath>
        <g clipPath="url(#vit-foto)">
          <g transform="translate(17 78)">
            <Ambiente w={W - 34} h={60} id="vitrine" />
          </g>
        </g>
        <text x="17" y="152" fill={TINTA} fontSize="7.5" fontWeight="600">
          Vão da sala · 1180 × 2100 mm
        </text>
        <text x="17" y="163" fill={APAGADO} fontSize="6.5" fontWeight="600">
          3 versões nesta foto
        </text>
      </g>

      {/* a observação do cliente */}
      <g>
        <Cartao x={9} y={180} w={W - 18} h={46} r={9} />
        <rect x="17" y="188" width="2.5" height="30" rx="1.25" fill={AZUL} />
        <text x="26" y="198" fill={AZUL} fontSize="6" fontWeight="700" letterSpacing="0.5">
          OBSERVAÇÃO
        </text>
        <text x="26" y="211" fill={TINTA} fontSize="7.5" fontWeight="700">
          Prefiro de correr, não de abrir.
        </text>
      </g>

      {/* a mudança de medida */}
      <g>
        <Cartao x={9} y={234} w={W - 18} h={46} r={9} />
        <rect x="17" y="242" width="2.5" height="30" rx="1.25" fill={EMBER} />
        <text x="26" y="252" fill={EMBER} fontSize="6" fontWeight="700" letterSpacing="0.5">
          ALTERAÇÃO DE MEDIDA
        </text>
        <text x="26" y="265" fill={TINTA} fontSize="7.5" fontWeight="700">
          1180 → 1175 mm de largura
        </text>
      </g>
    </Svg>
  )
}

/* ─────────── abertura · uma chapa, cortada uma vez ─────────── */

/**
 * A chapa da abertura. Não é ilustração: é o plano de corte real de uma chapa
 * jumbo 3210 × 2250, riscado uma vez quando a página abre. É a coisa mais
 * característica do mundo de quem vai ler esta página.
 */
export function ChapaAbertura({ t }) {
  const px = (n) => (n * CHAPA.w) / 660
  const corte = (i) => ease(range(t, 0.08 + i * 0.05, 0.08 + i * 0.05 + 0.1))
  const mostra = (i) => ease(range(t, 0.34 + i * 0.022, 0.5 + i * 0.022))
  const sobra = ease(range(t, 0.6, 0.74))
  const levanta = ease(range(t, 0.8, 0.97))

  return (
    <Svg
      vb={`0 0 ${CHAPA.w} ${CHAPA.h}`}
      role="img"
      aria-label="Plano de corte de uma chapa 3210 × 2250: sete peças e um retalho"
    >
      <rect x="0" y="0" width={CHAPA.w} height={CHAPA.h} fill={PLANO.chapa} />
      <DesenhoPlano px={px} mostra={mostra} corte={corte} sobra={sobra} levanta={levanta} />
    </Svg>
  )
}
