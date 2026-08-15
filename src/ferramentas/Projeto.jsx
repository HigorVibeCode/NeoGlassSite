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

/* Isto NÃO é um desenho inventado por semelhança. É a projeção do próprio
   NeoGlass, portada de `src/tools/Design/CriarProjeto2D/vao/AnimacaoAbertura.jsx`
   da plataforma: mesma câmera (yaw 0.55, pitch 0.2), mesma perspectiva
   (D = maior lado × 2.6, divisão f = D/(D−z)), mesma ordenação de pintor, e as
   mesmas cores e espessuras.

   As constantes vêm de lá com o nome que têm lá, para quem for comparar os dois
   arquivos achar na hora:
     E     45   espessura visual das paredes
     DEPTH 100  profundidade das paredes
     ESPV  8    espessura do vidro
     z=0        trilho de trás (as fixas)   ·   z=34  trilho da frente (as móveis)
   e a folha móvel corre 82% da própria largura em direção à fixa vizinha. */
const CAM = { yaw: 0.55, pitch: 0.2 }
const E = 45
const DEPTH = 100
const ESPV = 8
const VAO3D = { L: 1800, A: 1100 }
const FOLHA = VAO3D.L / 4
const CURSO = FOLHA * 0.82

const COR = {
  vidro: 'rgba(150,180,225,.16)',
  borda: '#9db4e8',
  paredeF: 'rgba(148,163,196,.20)',
  paredeL: 'rgba(148,163,196,.10)',
  ferrF: '#b9c4de',
  ferrL: '#7f8cb0',
}

/** As quatro folhas: duas fixas nas pontas, duas móveis no meio, correndo para fora. */
const FOLHAS = [
  { i: 0, papel: 'fixa', z: 0, dir: 0 },
  { i: 1, papel: 'movel', z: 34, dir: -1 },
  { i: 2, papel: 'movel', z: 34, dir: 1 },
  { i: 3, papel: 'fixa', z: 0, dir: 0 },
]

/* Constrói a lista de faces do quadro atual. `fase` é 0 fechado / 1 aberto e
   `separa` é 0 montado / 1 explodido — a explosão empurra cada camada ao longo
   do MESMO eixo z do desenho, que é o que faz ela se ler. */
function facesDoVao(fase, separa) {
  const { L, A } = VAO3D
  const cxw = L / 2
  const cyw = A / 2
  const D = Math.max(L, A) * 2.6
  const { yaw, pitch } = CAM

  const proj = (x, y, z) => {
    const dx = x - cxw
    const dy = y - cyw
    const x1 = dx * Math.cos(yaw) + z * Math.sin(yaw)
    const z1 = -dx * Math.sin(yaw) + z * Math.cos(yaw)
    const y2 = dy * Math.cos(pitch) - z1 * Math.sin(pitch)
    const z2 = dy * Math.sin(pitch) + z1 * Math.cos(pitch)
    const f = D / (D - z2)
    return [x1 * f, -y2 * f, z2]
  }

  const faces = []
  const zAvg = (arr) => arr.reduce((s, p) => s + p[2], 0) / arr.length

  const addBox = (x1, x2, y1, y2, z1, z2, frente, lado, map) => {
    let pts = [
      [x1, y1, z1], [x2, y1, z1], [x2, y2, z1], [x1, y2, z1],
      [x1, y1, z2], [x2, y1, z2], [x2, y2, z2], [x1, y2, z2],
    ]
    if (map) pts = pts.map(map)
    const P = pts.map((q) => proj(q[0], q[1], q[2]))
    const F = [
      { i: [0, 1, 2, 3], f: true }, { i: [4, 5, 6, 7], f: true },
      { i: [0, 1, 5, 4] }, { i: [3, 2, 6, 7] }, { i: [0, 3, 7, 4] }, { i: [1, 2, 6, 5] },
    ]
    for (const fd of F) {
      faces.push({
        z: fd.i.reduce((s, i) => s + P[i][2], 0) / 4,
        pts: fd.i.map((i) => P[i]),
        fill: fd.f ? frente : lado,
      })
    }
  }

  const addPrisma = (pontos, z1, z2, frente, lado, map) => {
    const m = map || ((q) => q)
    const Pb = pontos.map(([x, y]) => proj(...m([x, y, z1])))
    const Pf = pontos.map(([x, y]) => proj(...m([x, y, z2])))
    faces.push({ z: zAvg(Pb), pts: Pb, fill: frente })
    faces.push({ z: zAvg(Pf), pts: Pf, fill: frente, borda: true })
    for (let i = 0; i < pontos.length; i++) {
      const j = (i + 1) % pontos.length
      const quad = [Pb[i], Pb[j], Pf[j], Pf[i]]
      faces.push({ z: zAvg(quad), pts: quad, fill: lado })
    }
  }

  const addDisco = (dcx, dcy, raio, z1, z2, frente, lado, map, n = 14) => {
    const pts = []
    for (let i = 0; i < n; i++) {
      const ang = (i / n) * Math.PI * 2
      pts.push([dcx + raio * Math.cos(ang), dcy + raio * Math.sin(ang)])
    }
    addPrisma(pts, z1, z2, frente, lado, map)
  }

  // ── as paredes do nicho: piso, teto e as duas laterais ─────────────────
  const recuo = separa * 300
  const pd = (v) => v - recuo
  addBox(-E, L + E, -E, 0, pd(-DEPTH), pd(DEPTH), COR.paredeF, COR.paredeL)
  addBox(-E, L + E, A, A + E, pd(-DEPTH), pd(DEPTH), COR.paredeF, COR.paredeL)
  addBox(-E, 0, 0, A, pd(-DEPTH), pd(DEPTH), COR.paredeF, COR.paredeL)
  addBox(L, L + E, 0, A, pd(-DEPTH), pd(DEPTH), COR.paredeF, COR.paredeL)

  // ── as folhas ──────────────────────────────────────────────────────────
  for (const f of FOLHAS) {
    // explodida, a fixa recua e a móvel avança: elas se separam no eixo em que
    // já correm de verdade
    const zb = f.z + separa * (f.papel === 'fixa' ? -150 : 150)
    const x1 = f.i * FOLHA
    const x2 = x1 + FOLHA
    const desloca = f.dir * fase * CURSO
    const map = ([x, y, z]) => [x + desloca, y, z]

    addPrisma(
      [[x1, 0], [x2, 0], [x2, A], [x1, A]],
      zb, zb + ESPV, COR.vidro, COR.borda, map,
    )

    if (f.papel === 'movel') {
      const zf = zb + separa * 170
      // roldanas: um disco por furo, 10 mm maior que ele no diâmetro — a regra
      // do produto (furo Ø14 → rodinha Ø24)
      for (const fx of [x1 + 90, x2 - 90]) {
        addDisco(fx, A - 60, 12, zf + ESPV + 2, zf + ESPV + 10, COR.ferrF, COR.ferrL, map, 16)
        addDisco(fx, A - 60, 5, zf + ESPV + 10, zf + ESPV + 13, COR.ferrL, COR.ferrL, map, 10)
      }
      // puxador redondo de um furo, dupla face e discreto
      const px = f.i === 1 ? x2 - 70 : x1 + 70
      addDisco(px, A / 2, 6, zf - 8, zf + ESPV + 8, COR.ferrL, COR.ferrL, map, 10)
      addDisco(px, A / 2, 17, zf + ESPV + 8, zf + ESPV + 18, COR.ferrF, COR.ferrL, map, 16)
      addDisco(px, A / 2, 17, zf - 18, zf - 8, COR.ferrF, COR.ferrL, map, 16)
    }
  }

  faces.sort((a, b) => a.z - b.z)

  // enquadramento estável: os cantos do cenário, não do quadro corrente — sem
  // isto a caixa "pula" de tamanho quando as folhas correm
  const ext = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity }
  for (const x of [-E, L + E]) for (const y of [-E, A + E]) for (const z of [-DEPTH - 300, DEPTH + 320]) {
    const p = proj(x, y, z)
    ext.minX = Math.min(ext.minX, p[0]); ext.maxX = Math.max(ext.maxX, p[0])
    ext.minY = Math.min(ext.minY, p[1]); ext.maxY = Math.max(ext.maxY, p[1])
  }
  const mg = Math.max(L, A) * 0.04
  return {
    faces,
    vb: `${ext.minX - mg} ${ext.minY - mg} ${ext.maxX - ext.minX + mg * 2} ${ext.maxY - ext.minY + mg * 2}`,
  }
}

function Perspectiva({ fase, separa }) {
  const { faces, vb } = facesDoVao(fase, separa)
  return (
    <svg viewBox={vb} className="mx-auto h-full w-full" aria-hidden="true">
      {faces.map((f, i) => (
        <polygon
          key={i}
          points={f.pts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')}
          fill={f.fill}
          stroke={f.borda ? COR.borda : 'none'}
          strokeWidth={f.borda ? 3 : 0}
          strokeOpacity=".55"
        />
      ))}
    </svg>
  )
}

/* ── o dedo ──────────────────────────────────────────────────────────────── */

/* As formas da mão, declaradas uma vez e desenhadas DUAS: primeiro todas em
   traço grosso escuro (a união delas vira a silhueta), depois as mesmas em
   branco por cima (o preenchimento). É esse truque que faz a mão ter um
   contorno só.

   Era exatamente isso que estava errado antes: cada forma tinha o próprio
   contorno, então o polegar virava um gancho solto no ar e os dois dedos
   dobrados liam como a letra "B". */
const MAO = (
  <>
    <rect x="8" y="26" width="32" height="28" rx="13" />
    <rect x="16" y="6" width="11" height="26" rx="5.5" />
    <rect x="26" y="28" width="14" height="11" rx="5.5" />
    <rect x="26" y="37" width="12" height="11" rx="5.5" />
    <rect x="4" y="31" width="11" height="17" rx="5.5" transform="rotate(-18 9.5 39.5)" />
  </>
)

function Dedo({ em, tocando }) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute z-20"
      style={{
        left: `${em.x}%`,
        top: `${em.y}%`,
        // a PONTA do indicador é que encosta no cartão, não o canto do desenho
        transform: `translate(-45%, -9%) scale(${tocando ? 0.9 : 1})`,
        transformOrigin: '45% 9%',
        transition:
          'left 600ms cubic-bezier(.4,0,.2,1), top 600ms cubic-bezier(.4,0,.2,1), transform 180ms ease',
      }}
    >
      {tocando && <span className="onda" />}
      <svg
        viewBox="0 0 48 60"
        className="relative h-[48px] w-[38px]"
        style={{ filter: 'drop-shadow(0 5px 9px rgba(20,55,80,.35))' }}
      >
        <g fill="#26384a" stroke="#26384a" strokeWidth="6" strokeLinejoin="round">
          {MAO}
        </g>
        <g fill="#fff">{MAO}</g>
        {/* duas dobras discretas, só para a mão não ficar um borrão branco */}
        <g stroke="#26384a" strokeWidth="1.6" strokeLinecap="round" opacity=".45">
          <path d="M28 33h8" />
          <path d="M28 42h6" />
        </g>
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
      setAbre(1)
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
    marcar(fim + 4400, () => setAbre(1))
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
                <Perspectiva fase={abre} separa={explode ? 1 : 0} />
              </div>
            </div>
          )}

          {/* ── o repouso: o desfecho, apagado, esperando o play ──────── */}
          {ato === 'parado' && (
            <div className="flex h-full w-full items-center bg-[#111a33] px-5 sm:px-6">
              <div className="w-full opacity-60">
                <Perspectiva fase={0} separa={0} />
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
