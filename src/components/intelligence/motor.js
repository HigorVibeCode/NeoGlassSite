/* ===========================================================================
   orbe/motor.js — a geometria da marca como sólido animável.

   A esfera da lib `thinking-orbs` pinta cada ponto em rgba(v,v,v,a), onde v é
   a PROFUNDIDADE do ponto. É dessa rampa de cinza que o filtro SVG do
   Espera.jsx tira a cor do tema. Este motor mantém exatamente esse contrato —
   troca só o SÓLIDO sobre o qual os pontos vivem. Assim o filtro colore os
   orbes triangulares sem uma linha de mudança.

   Três sólidos, porque "triângulo" tem três leituras possíveis em 3D:
     tetra   — tetraedro regular; de frente o contorno É o triângulo da marca
     prisma  — a marca extrudada, um caco de vidro girando no eixo vertical
     plano   — o triângulo chapado, sem profundidade nenhuma
=========================================================================== */

/* ── A marca ──────────────────────────────────────────────────────────────
   Do path oficial (Icon.jsx / neoglass-mark.svg):
     M452.5,78.9 L757.5,606.1 Q780,645 735,645 L125,645 Q80,645 102.5,606.1
     L407.5,78.9 Q430,40 452.5,78.9 Z
   Vértices reais: ápice (430,40), inferior-direito (780,645), inferior-
   esquerdo (80,645). Base 700, altura 605 — equilátero exigiria 606,2.
   É equilátero, ápice para cima, circunraio 403,6.
   O canto arredondado come 45 de cada aresta de 700 → 6,43%.            */
export const TRI = [
  [0, -1],                       // ápice        (-90°)
  [Math.sqrt(3) / 2, 0.5],       // inf. direito ( 30°)
  [-Math.sqrt(3) / 2, 0.5],      // inf. esquerdo(150°)
]
export const CORTE_CANTO = 0.0643   // fração da aresta comida pelo arredondamento

const TAU = Math.PI * 2
const lerp = (a, b, p) => a + (b - a) * p
const clamp = (v, a, b) => (v < a ? a : v > b ? b : v)
const mix2 = (p, q, t) => [lerp(p[0], q[0], t), lerp(p[1], q[1], t)]

/** Contorno da marca com os cantos arredondados, amostrado em `n` pontos. */
export function contornoMarca(n, escala = 1) {
  // Cada canto vira uma quadrática cujo ponto de controle é o próprio vértice.
  const trechos = []
  for (let i = 0; i < 3; i++) {
    const v = TRI[i], ant = TRI[(i + 2) % 3], prox = TRI[(i + 1) % 3]
    trechos.push({
      de: mix2(v, ant, CORTE_CANTO),   // fim do arredondamento anterior
      ctrl: v,
      para: mix2(v, prox, CORTE_CANTO),
    })
  }
  // amostragem: arco do canto + reta até o próximo canto, proporcional ao
  // comprimento de cada um, para os pontos saírem espaçados por igual
  const compArco = 0.16, compReta = 1 - 2 * CORTE_CANTO
  const totalPorLado = compArco + compReta
  const pts = []
  for (let i = 0; i < n; i++) {
    const u = (i / n) * 3            // 0..3, um por lado
    const lado = Math.floor(u) % 3
    const f = (u - Math.floor(u)) * totalPorLado
    const c = trechos[lado]
    let p
    if (f < compArco) {              // dentro do canto
      const t = f / compArco
      const a = mix2(c.de, c.ctrl, t), b = mix2(c.ctrl, c.para, t)
      p = mix2(a, b, t)
    } else {                         // reta até o canto seguinte
      const t = (f - compArco) / compReta
      p = mix2(c.para, trechos[(lado + 1) % 3].de, t)
    }
    pts.push([p[0] * escala, p[1] * escala])
  }
  return pts
}

/* ── Sólidos ────────────────────────────────────────────────────────────── */

// Tetraedro regular cuja face frontal é o triângulo da marca (circunraio 1).
// Altura face→vértice oposto de um tetra de circunraio de face R é R·√2.
// O baricentro fica a 1/4 dessa altura a partir da face.
const ZF = Math.SQRT2 / 4            //  0.3536 — plano da face frontal
const ZT = -3 * Math.SQRT2 / 4       // -1.0607 — vértice de trás

export const SOLIDOS = {
  tetra: {
    profundidade: true,
    vertices: [
      [TRI[0][0], TRI[0][1], ZF],
      [TRI[1][0], TRI[1][1], ZF],
      [TRI[2][0], TRI[2][1], ZF],
      [0, 0, ZT],
    ],
    faces: [[0, 1, 2], [0, 3, 1], [1, 3, 2], [2, 3, 0]],
    raio: 1.0607,
  },
  prisma: {
    profundidade: true,
    espessura: 0.26,
    get vertices() {
      const d = 0.26
      return [
        [TRI[0][0], TRI[0][1], d], [TRI[1][0], TRI[1][1], d], [TRI[2][0], TRI[2][1], d],
        [TRI[0][0], TRI[0][1], -d], [TRI[1][0], TRI[1][1], -d], [TRI[2][0], TRI[2][1], -d],
      ]
    },
    faces: [[0, 1, 2], [5, 4, 3], [0, 1, 4, 3], [1, 2, 5, 4], [2, 0, 3, 5]],
    raio: 1.034,
  },
  plano: {
    profundidade: false,
    vertices: [
      [TRI[0][0], TRI[0][1], 0], [TRI[1][0], TRI[1][1], 0], [TRI[2][0], TRI[2][1], 0],
    ],
    faces: [[0, 1, 2]],
    raio: 1,
  },
}

/** Grade baricêntrica dentro de um triângulo — `k` passos por lado. */
function gradeTriangulo(a, b, c, k, saida, face) {
  for (let i = 0; i <= k; i++) {
    for (let j = 0; j <= k - i; j++) {
      const u = i / k, v = j / k, w = 1 - u - v
      saida.push({
        x: a[0] * w + b[0] * u + c[0] * v,
        y: a[1] * w + b[1] * u + c[1] * v,
        z: a[2] * w + b[2] * u + c[2] * v,
        face,
        // coordenada de altura normalizada, útil para varreduras e ondas
        h: (a[1] * w + b[1] * u + c[1] * v),
      })
    }
  }
}

function gradeQuadrilatero(a, b, c, d, k, saida, face) {
  for (let i = 0; i <= k; i++) {
    for (let j = 0; j <= k; j++) {
      const u = i / k, v = j / k
      const p = [
        lerp(lerp(a[0], b[0], u), lerp(d[0], c[0], u), v),
        lerp(lerp(a[1], b[1], u), lerp(d[1], c[1], u), v),
        lerp(lerp(a[2], b[2], u), lerp(d[2], c[2], u), v),
      ]
      saida.push({ x: p[0], y: p[1], z: p[2], face, h: p[1] })
    }
  }
}

/** Nuvem de pontos sobre a superfície do sólido. Determinística. */
export function superficie(nomeSolido, passos) {
  const S = SOLIDOS[nomeSolido]
  const V = S.vertices
  const pts = []
  S.faces.forEach((f, i) => {
    if (f.length === 3) gradeTriangulo(V[f[0]], V[f[1]], V[f[2]], passos, pts, i)
    // As faces laterais do prisma são vistas quase de perfil na maior parte
    // do giro; com a mesma densidade das tampas viram listras. Metade resolve.
    else gradeQuadrilatero(V[f[0]], V[f[1]], V[f[2]], V[f[3]], Math.max(2, Math.round(passos * 0.5)), pts, i)
  })
  return pts
}

/** As arestas do sólido, sem repetir. */
export function arestas(nomeSolido) {
  const S = SOLIDOS[nomeSolido]
  const vistas = new Set(), out = []
  S.faces.forEach((f) => {
    for (let i = 0; i < f.length; i++) {
      const a = f[i], b = f[(i + 1) % f.length]
      const k = a < b ? `${a}-${b}` : `${b}-${a}`
      if (vistas.has(k)) return
      vistas.add(k)
      out.push([a, b])
    }
  })
  return out
}

/* ── Câmera ───────────────────────────────────────────────────────────────
   Rotação em Y (giro) e X (inclinação), depois projeção com um pouco de
   perspectiva. A perspectiva importa: sem ela um tetraedro girando lê como
   um triângulo que se deforma, não como um sólido.                        */
const DIST = 3.4

export function camera(rx, ry) {
  const cx = Math.cos(rx), sx = Math.sin(rx)
  const cy = Math.cos(ry), sy = Math.sin(ry)
  return (x, y, z) => {
    const x1 = x * cy + z * sy
    const z1 = -x * sy + z * cy
    const y2 = y * cx - z1 * sx
    const z2 = y * sx + z1 * cx
    return [x1, y2, z2]
  }
}

/**
 * Converte um ponto 3D já rotacionado em algo pintável.
 * `desbotar` (0 = tinta cheia, 1 = some no fundo) é o que a lib chama `white`.
 */
export function projetar(p, raio, cxPx, cyPx, escalaPx) {
  const k = DIST / (DIST - p[2])
  const nz = clamp(p[2] / raio, -1, 1)          // -1 = fundo, +1 = frente
  return {
    x: cxPx + p[0] * escalaPx * k,
    y: cyPx + p[1] * escalaPx * k,
    z: p[2],
    prox: (nz + 1) / 2,                          // 0..1, 1 = mais perto
    escalaK: k,
  }
}

export const desbotarPorProfundidade = (prox) => 0.06 + 0.80 * (1 - prox)

/* ── Pintor — idêntico ao da lib ─────────────────────────────────────────
   Ordena por z (algoritmo do pintor) e converte `desbotar` em cinza. Em tema
   claro a tinta é escura; em palco escuro, clara. É essa rampa que o
   feComponentTransfer do Espera.jsx remapeia canal a canal.              */
export function pintarPontos(ctx, pontos, escuro, rMin = 0.3) {
  pontos.sort((a, b) => a.z - b.z)
  for (const p of pontos) {
    const a = p.a ?? 1
    if (a < 0.02) continue
    const d = clamp(p.desbotar, 0, 1)
    const v = Math.round((escuro ? 1 - d : d) * 255)
    ctx.fillStyle = `rgba(${v},${v},${v},${a})`
    ctx.beginPath()
    ctx.arc(p.x, p.y, Math.max(rMin, p.r), 0, TAU)
    ctx.fill()
  }
}

/** O sólido que o app usa. Os outros dois ficam para experimento. */
export const SOLIDO_PADRAO = 'tetra'

export { TAU, lerp, clamp, mix2 }
