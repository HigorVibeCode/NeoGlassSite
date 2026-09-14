// Adaptado do Intelligence oficial; origem: src/tools/Assistente/v2/TrianguloVivo.jsx.
// A demo conserva a geometria oficial e usa ondas contínuas, com pausa sem recriar a malha.
// tools/Assistente/v2/TrianguloVivo.jsx
// A marca NeoGlass como MALHA — não como traço.
//
// A primeira versão punha 200 pontos em cima da linha do contorno. Lida de
// perto virava um fio pontilhado: "amontoado", nas palavras dele (12/set). Um
// traço não tem o que olhar. Uma malha tem.
//
// O desenho agora tem três camadas concêntricas do mesmo contorno, em escalas
// diferentes, ligadas por arestas entre vizinhos. As camadas derivam a
// velocidades distintas — é daí que vem a PROFUNDIDADE: o olho lê paralaxe e
// entende volume, sem 3D nenhum, sem biblioteca nenhuma, num canvas 2D.
//
// Por que reusar `orbe/motor.js`: o contorno da marca (cantos arredondados a
// 6,43% de cada aresta) já está lá, medido do arquivo original. Redesenhar o
// triângulo aqui daria um triângulo PARECIDO, e parecido é errado quando se
// trata da marca.
//
// Quatro regras que este arquivo cumpre:
//   1. NÃO É UM LOOP AUTÔNOMO. O estado vem do pipeline de voz de verdade.
//      Sem estado novo, ele respira; não inventa atividade.
//   2. AS ARESTAS SÃO PRÉ-CALCULADAS. Vizinhança medida uma vez, nos ALVOS
//      (que não mudam), não a cada quadro. Vizinhança por quadro seria O(n²)
//      sessenta vezes por segundo — é o que derruba este tipo de tela.
//   3. QUANDO A RESPOSTA CHEGA, ELE VIRA A RESPOSTA. `alvoMorph` retarget a
//      nuvem inteira para outro contorno; os mesmos pontos viajam.
//   4. `prefers-reduced-motion` CONGELA. Não desacelera: para, num quadro
//      montado, que continua sendo a marca.
import { useEffect, useRef } from 'react'
import { contornoMarca } from './motor.js'

// Três camadas de PROFUNDIDADE — não três anéis.
//
// A primeira tentativa punha cada camada num raio próprio (0,74 / 1,00 / 1,24)
// e o resultado lia como três triângulos concêntricos: os três vizinhos mais
// próximos de qualquer ponto caíam sempre no MESMO anel, e nenhuma aresta
// atravessava. Três contornos não são uma malha.
//
// Agora as camadas partilham a banda: cada ponto senta a uma distância própria
// da linha da marca (`BANDA`), e a camada decide só a velocidade da paralaxe e
// o peso do traço. Com os pontos entrelaçados, a vizinhança é de verdade
// bidimensional e a teia fecha em todas as direções.
const CAMADAS = [
  { pontos: 66, deriva: -0.00050, peso: 0.62, dentro: -1 },
  { pontos: 86, deriva: 0.00000, peso: 1.00, dentro: 0 },
  { pontos: 68, deriva: 0.00036, peso: 0.70, dentro: 1 },
]
const TOTAL = CAMADAS.reduce((s, c) => s + c.pontos, 0)

/** Espessura da banda em que os pontos se espalham, em torno do contorno. */
const BANDA = 0.085
/** Vizinhos por ponto. 3 é o ponto em que a malha fecha sem virar borrão. */
const VIZINHOS = 3
/** Aresta mais longa que isto não é vizinhança, é atalho: não liga. */
const ALCANCE = 0.235

/**
 * O que cada estado faz com a malha.
 *   mola    — o quanto puxa para o alvo (convergência)
 *   tremor  — dispersão; é a INCERTEZA desenhada
 *   brilho  — opacidade geral
 *   teia    — força das arestas (0 = só pontos)
 *   pulso   — velocidade da onda que percorre a malha
 *   giro    — paralaxe entre camadas (multiplica a deriva de cada uma)
 */
const ESTADOS = {
  idle:        { mola: 0.055, tremor: 0, brilho: 0.95, teia: 1.10, pulso: 0.014, giro: 0.7 },
  listening:   { mola: 0.062, tremor: 0.85, brilho: 1.00, teia: 1.00, pulso: 0.030, giro: 2.4 },
  transcribing:{ mola: 0.095, tremor: 0.55, brilho: 0.95, teia: 0.70, pulso: 0.020, giro: 1.8 },
  interpreting:{ mola: 0.165, tremor: 0.30, brilho: 1.00, teia: 1.15, pulso: 0.045, giro: 3.2 },
  generating:  { mola: 0.125, tremor: 0.42, brilho: 1.00, teia: 1.05, pulso: 0.038, giro: 2.6 },
  success:     { mola: 0.230, tremor: 0.07, brilho: 1.00, teia: 1.25, pulso: 0.010, giro: 0.6 },
  error:       { mola: 0.045, tremor: 1.30, brilho: 0.92, teia: 0.35, pulso: 0.055, giro: 1.2 },
}

export default function TrianguloVivo({
  estado = 'idle',
  pausado = false,
  /** 0..1 — amplitude real do microfone; modula o tremor em `listening`.
   *  Prefira `amplitudeRef`: a amplitude muda 60 vezes por segundo, e passá-la
   *  como prop obrigaria a árvore React a re-renderizar na mesma cadência. */
  amplitude = 0,
  /** ref com a amplitude viva — lido dentro do laço, sem re-render nenhum */
  amplitudeRef = null,
  /** ref com o alvo do morph: [[x,y], …] em espaço de circunraio 1, ou null.
   *  Quando aparece, a nuvem inteira viaja para lá — os MESMOS pontos. É por
   *  isso que a transição lê como transformação e não como troca de tela. */
  morphRef = null,
  tamanho = 260,
  cor = '#0e9c8c',
  corAlerta = '#ee6a45',
}) {
  const canvasRef = useRef(null)
  const retomar = useRef(null)
  // O estado muda a cada palavra dita; relê-lo por ref evita remontar o laço.
  const vivo = useRef({ estado, amplitude, cor, corAlerta, amplitudeRef, morphRef })
  vivo.current = { estado, amplitude, cor, corAlerta, amplitudeRef, morphRef, pausado }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    let reduz = media.matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    // ── a nuvem ────────────────────────────────────────────────────────────
    // Cada ponto guarda o alvo da MARCA (bx,by) separado do alvo CORRENTE
    // (ax,ay). O morph mexe só no corrente; a marca continua sabida, e o
    // caminho de volta é imediato.
    const pts = []
    CAMADAS.forEach((cam, ci) => {
      const alvos = contornoMarca(cam.pontos, 1)
      alvos.forEach(([lx, ly], i) => {
        // Empurra o ponto para fora ou para dentro DA LINHA, ao longo do raio.
        // A camada dá o lado; o sorteio dá a espessura. É isto que faz a banda.
        const d = Math.hypot(lx, ly) || 1
        const off = (cam.dentro * 0.55 + (Math.random() - 0.5) * 0.9) * BANDA
        const bx = lx * (1 + off / d)
        const by = ly * (1 + off / d)
        pts.push({
          x: bx, y: by, vx: 0, vy: 0,
          bx, by, ax: bx, ay: by,
          camada: ci,
          peso: cam.peso,
          // ordem ao longo do contorno, 0..1 — é o que faz a onda ANDAR em vez
          // de piscar tudo ao mesmo tempo, e é por ela que o morph reamostra
          u: i / cam.pontos,
          fase: Math.random() * Math.PI * 2,
          // um em cada seis é NÓ: maior, mais vivo, e é onde o pulso acende
          no: i % 6 === 2,
        })
      })
    })

    // ── as arestas, medidas UMA vez ────────────────────────────────────────
    // Vizinhança calculada nos alvos da marca, que não mudam. Ligar por
    // distância a cada quadro custaria O(n²) sessenta vezes por segundo.
    const arestas = []
    for (let i = 0; i < pts.length; i += 1) {
      const a = pts[i]
      const perto = []
      for (let j = 0; j < pts.length; j += 1) {
        if (i === j) continue
        const b = pts[j]
        const d = Math.hypot(a.bx - b.bx, a.by - b.by)
        if (d > ALCANCE) continue
        perto.push({ j, d })
      }
      // Vizinho de OUTRA camada conta como mais perto do que é. Sem este
      // empurrão as arestas voltam a correr só ao longo do contorno, e a
      // malha volta a ler como linha — foi o defeito da primeira versão.
      perto.sort((p, q) => p.d * (pts[p.j].camada === a.camada ? 1.35 : 1)
                         - q.d * (pts[q.j].camada === a.camada ? 1.35 : 1))
      for (const { j, d } of perto.slice(0, VIZINHOS)) {
        if (j < i) continue // cada par uma vez só
        arestas.push({ a: i, b: j, base: 1 - d / ALCANCE })
      }
    }

    let raf = 0
    let t = 0
    let giroAcum = 0
    let ondaFase = 0
    const suave = { ...ESTADOS.idle }
    let anterior = performance.now()
    let dt = 1
    // Mistura para o morph: sobe para 1 quando há alvo, volta a 0 quando sai.
    // Rampa, não salto — é a rampa que faz a transição ser LINEAR, que é o que
    // ele pediu ("transformando o triângulo de forma muito linear").
    let mix = 0
    let alvoAtual = null

    function medir() {
      const lado = tamanho
      canvas.width = Math.round(lado * dpr)
      canvas.height = Math.round(lado * dpr)
    }

    function aplicarMorph() {
      const alvo = vivo.current.morphRef?.current || null
      if (alvo !== alvoAtual) {
        alvoAtual = alvo
        if (alvo && alvo.length) {
          // Reamostra o contorno de destino para o número de pontos de cada
          // camada, mantendo a ORDEM. Pontos vizinhos no triângulo continuam
          // vizinhos no destino — sem isso a nuvem embaralha e a viagem vira
          // confete em vez de transformação.
          for (const p of pts) {
            const k = Math.min(alvo.length - 1, Math.round(p.u * (alvo.length - 1)))
            const [mx, my] = alvo[k]
            p.mx = mx; p.my = my
          }
        }
      }
      const quer = alvoAtual ? 1 : 0
      mix += (quer - mix) * (1 - Math.exp(-dt / 7))
      if (mix < 0.002) mix = 0
      for (const p of pts) {
        if (mix > 0 && p.mx != null) {
          p.ax = p.bx + (p.mx - p.bx) * mix
          p.ay = p.by + (p.my - p.by) * mix
        } else {
          p.ax = p.bx; p.ay = p.by
        }
      }
    }

    function quadro(agora = performance.now()) {
      dt = Math.min(2, Math.max(0.1, (agora - anterior) / (1000 / 60)))
      anterior = agora
      const { estado: e, cor: c, corAlerta: ca } = vivo.current
      // o ref vence a prop: é ele que traz a voz de verdade, quadro a quadro
      const amp = vivo.current.amplitudeRef
        ? Number(vivo.current.amplitudeRef.current) || 0
        : vivo.current.amplitude
      const alvoCfg = ESTADOS[e] || ESTADOS.idle
      const parado = reduz || vivo.current.pausado
      for (const chave of Object.keys(suave)) suave[chave] += (alvoCfg[chave] - suave[chave]) * (1 - Math.exp(-dt / 24))
      const cfg = suave
      const lado = canvas.width
      // Conserva a espessura visual enquanto o mesmo canvas encolhe para o cabeçalho.
      const nitidez = Math.min(3.4, tamanho / (canvas.clientWidth || tamanho))
      const centro = lado / 2
      // O centro geométrico do equilátero deixa a silhueta alta no quadrado.
      const centroY = centro + lado * 0.10 * (1 - mix)
      // a banda chega a ~1,09 do raio da marca; 0,40 do lado deixa-a dentro.
      const escala = lado * 0.40

      ctx.clearRect(0, 0, lado, lado)
      if (!parado) t += dt
      aplicarMorph()

      // A voz alta espalha e acelera. `amplitude` só entra onde faz sentido:
      // se o tremor reagisse fora do microfone, a tela mentiria sobre ouvir.
      const voz = e === 'listening' ? Math.min(1, Math.max(0, amp)) : 0
      const tremor = cfg.tremor * (1 + voz * 1.9)
      // A malha INCHA com a voz. É o movimento que ele não estava a ver: o
      // tremor sozinho é ruído fino, e ruído fino de longe parece parado.
      const sopro = 1 + voz * 0.16
      if (!parado) { giroAcum += cfg.giro * dt; ondaFase += cfg.pulso * dt }

      const respiracao = Math.sin(t * Math.PI * 2 / (5.8 * 60))
      for (const p of pts) {
        if (reduz) { p.x = p.ax; p.y = p.ay; continue }
        if (vivo.current.pausado) continue
        // Ondas coerentes substituem o ruído aleatório: a marca flutua sem tremedeira.
        const g = (Math.sin(t * 0.011) * 0.085 + Math.sin(giroAcum * 0.003) * CAMADAS[p.camada].deriva * 100) * (1 - mix)
        const cs = Math.cos(g), sn = Math.sin(g)
        const gx = (p.ax * cs - p.ay * sn) * sopro
        const gy = (p.ax * sn + p.ay * cs) * sopro
        const resp = 1 + respiracao * 0.035 + Math.sin(p.u * Math.PI * 4 - t * 0.019 + p.camada * 0.8) * 0.024
        const fx = (gx * resp - p.x) * cfg.mola
        const fy = (gy * resp - p.y) * cfg.mola
        p.vx = (p.vx + fx) * 0.78 + Math.sin(t * 0.022 + p.u * 12) * 0.0008 * tremor
        p.vy = (p.vy + fy) * 0.78 + Math.cos(t * 0.019 + p.u * 12) * 0.0008 * tremor
        p.x += p.vx
        p.y += p.vy
      }

      const base = e === 'error' ? ca : c
      // A onda que percorre a malha: `u` é a posição ao longo do contorno, e a
      // fase anda com o tempo. É o que dá a leitura de sinal a viajar, em vez
      // de um brilho uniforme que não conta nada.
      const onda = p => 0.5 + 0.5 * Math.sin(p.u * Math.PI * 4 - ondaFase)

      // ── arestas ────────────────────────────────────────────────────────
      // Três baldes de opacidade em vez de um stroke por aresta: 500 chamadas
      // de stroke por quadro é o que trava; 3 não travam nada.
      if (cfg.teia > 0.01) {
        const baldes = [[], [], []]
        for (const ar of arestas) {
          const a = pts[ar.a], b = pts[ar.b]
          const dx = a.x - b.x, dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 > 0.075) continue // esticou demais: partiu
          const brilho = ar.base * (1 - d2 * 9) * (0.45 + onda(a) * 0.55)
          if (brilho <= 0.02) continue
          const k = brilho > 0.55 ? 2 : brilho > 0.28 ? 1 : 0
          baldes[k].push(a, b)
        }
        const alfas = [0.18, 0.30, 0.50]
        for (let k = 0; k < 3; k += 1) {
          const lista = baldes[k]
          if (!lista.length) continue
          ctx.strokeStyle = tinta(base, alfas[k] * cfg.teia * cfg.brilho)
          ctx.lineWidth = Math.max(0.6, dpr * (0.45 + k * 0.14)) * nitidez
          ctx.beginPath()
          for (let i = 0; i < lista.length; i += 2) {
            ctx.moveTo(centro + lista[i].x * escala, centroY + lista[i].y * escala)
            ctx.lineTo(centro + lista[i + 1].x * escala, centroY + lista[i + 1].y * escala)
          }
          ctx.stroke()
        }
      }

      // ── pontos ─────────────────────────────────────────────────────────
      for (const p of pts) {
        // Ponto longe do alvo = incerteza: desenha menor e mais apagado.
        const gx = p.ax, gy = p.ay
        const d = Math.hypot(p.x - gx, p.y - gy)
        const perto = Math.max(0, 1 - d * 1.6)
        const acende = p.no ? onda(p) : 0
        const r = (p.no ? 0.92 : 0.48) * (0.75 + perto * 1.1 + acende * 0.5) * p.peso * dpr * nitidez
        const a = (0.20 + perto * 0.62 + acende * 0.30) * cfg.brilho * p.peso
        ctx.fillStyle = tinta(base, a)
        ctx.beginPath()
        ctx.arc(centro + p.x * escala, centroY + p.y * escala, Math.max(0.5, r), 0, Math.PI * 2)
        ctx.fill()
      }

      if (!reduz && !vivo.current.pausado && !document.hidden) raf = requestAnimationFrame(quadro)
    }

    function acordar() {
      cancelAnimationFrame(raf)
      reduz = media.matches
      anterior = performance.now()
      quadro()
    }
    media.addEventListener('change', acordar)
    document.addEventListener('visibilitychange', acordar)
    retomar.current = acordar
    medir()
    // O bitmap é estável; tamanho e posição da apresentação interpolam pelo CSS.
    quadro()

    return () => {
      cancelAnimationFrame(raf)
      retomar.current = null
      media.removeEventListener('change', acordar)
      document.removeEventListener('visibilitychange', acordar)
    }
  }, [tamanho])

  useEffect(() => { retomar.current?.() }, [pausado])

  return (
    <canvas
      ref={canvasRef}
      className="ia2-triangulo"
      style={{ width: tamanho, height: tamanho, display: 'block' }}
      aria-hidden="true"
    />
  )
}

/** Quantos pontos a malha tem ao todo — usado pelas provas de render. */
export const PONTOS_DA_MALHA = TOTAL

/** '#rrggbb' + alfa → rgba(). Aceita já-rgba de volta sem estragar. */
function tinta(cor, alfa) {
  const m = /^#?([0-9a-f]{6})$/i.exec(String(cor).trim())
  if (!m) return cor
  const n = parseInt(m[1], 16)
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${Math.min(1, Math.max(0, alfa)).toFixed(3)})`
}
