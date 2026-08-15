import { useEffect, useRef, useState } from 'react'
import { evento } from '../lib/rastreio.js'
import { semMovimento } from '../lib/dispositivo.js'
import { useTextos } from '../i18n/idioma.jsx'
import { Simbolo } from '../components/Marca.jsx'

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
const ABRINDO = 1800 // o respiro antes de a folha subir
const ATO = 3500 // cada passo do assistente
const BEATS = { dedo: 620, toque: 1560, confirma: 2650 }
const MONTAGEM = 7000 // a janela sendo construída, e então aberta
const TOTAL = ABRINDO + ATO * 4 + MONTAGEM

/* A montagem: a janela aparece pronta, as peças se afastam, seguram um
   instante e voltam a se encaixar. Depois ela abre.

   Cheguei a trocar isto por uma construção em etapas, com legenda a cada
   família de peça. O dono não gostou e mandou voltar — o que ele queria era só
   uma expansão um pouco maior. Fica registrado para não se tentar de novo. */
const EXPLODE_EM = 700
const EXPLODE_DUR = 1500
const VOLTA_EM = 3100
const VOLTA_DUR = 1400
const ABRE_EM = 5000
const ABRE_DUR = 1800

/* A mesma curva que a plataforma usa em `AnimacaoAbertura.jsx`. Sem ela, a
   janela SALTAVA de fechada para aberta e de montada para explodida: os dois
   estados existiam, o caminho entre eles não. É o caminho que o visitante
   precisa ver — é dele que sai a leitura de "isto se move de verdade". */
const suave = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)

const PASSOS = ['vao', 'medida', 'tipo', 'folhas']

/* O cursor NÃO tem mais posições escritas à mão. Ele mede o elemento no DOM e
   vai até o centro dele.

   As porcentagens fixas erravam o alvo toda vez que o layout mudava — e ele
   mudou umas seis vezes nesta peça. Pior: erravam de um jeito silencioso, sem
   quebrar nada, então só se via olhando. Agora quem manda é `data-alvo`: se o
   cartão sair do lugar, o cursor vai junto. */
/* Qual opção acende em cada passo, e qual traço da barra de sete.
   Os traços NÃO são cinco: o assistente do produto tem sete passos e nós
   pulamos dois. Mostrar sete e acender 1, 2, 3 e 5 é dizer a verdade sobre o
   app em vez de inventar um fluxo mais curto do que ele é. */
const ESCOLHA = { vao: 0, tipo: 2, folhas: 2 }
const TRACO = { vao: 1, medida: 2, tipo: 3, folhas: 5 }

const AZUL = '#3d51d6'
const LARANJA = '#e8873a'
const MEDIDA = { largura: '1800', altura: '1100' }
const TECLA = 110 // o intervalo entre um algarismo e o seguinte

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
/* As medidas dos perfis são as que o dono passou, e não escolha de desenho:
     trilho superior  55 mm  — é ele que carrega as roldanas, por isso é o largo
     soleira          20 mm
     montantes        20 mm
   O perfil PISA 5 mm sobre o vidro em toda a volta: o vidro fixo começa onde o
   trilho termina e entra 5 mm por baixo dele. É essa sobreposição que segura a
   peça na obra, e é ela que faz a junta parecer junta em vez de dois retângulos
   encostados. */
const TRILHO = 55
const SOLEIRA = 20
const MONTANTE = 20
const PISA = 5

const VAO3D = { L: 1800, A: 1100 }
/* O campo de vidro não é o vão inteiro: ele começa depois dos montantes, com a
   sobreposição de 5 mm. As quatro folhas dividem ESSE campo, não o vão. */
const VIDRO_X0 = MONTANTE - PISA
const VIDRO_X1 = VAO3D.L - (MONTANTE - PISA)
const FOLHA = (VIDRO_X1 - VIDRO_X0) / 4
const CURSO = FOLHA * 0.82

/* O alumínio é OPACO de propósito. Toda a cena é translúcida — parede, vidro —
   e num conjunto todo translúcido nada tem peso. O perfil sólido é o que dá
   estrutura ao desenho e o que faz o vidro parecer vidro por contraste. */

const COR = {
  vidro: 'rgba(150,180,225,.16)',
  borda: '#9db4e8',
  aluF: '#aab7d2',
  aluL: '#7885a8',
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
   `separa` é 0 montado / 1 explodido. As camadas se afastam ao longo do MESMO
   eixo z do desenho — é por isso que a explosão se lê. */
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
  const recuo = separa * 430
  const pd = (v) => v - recuo
  addBox(-E, L + E, -E, 0, pd(-DEPTH), pd(DEPTH), COR.paredeF, COR.paredeL)
  addBox(-E, L + E, A, A + E, pd(-DEPTH), pd(DEPTH), COR.paredeF, COR.paredeL)
  addBox(-E, 0, 0, A, pd(-DEPTH), pd(DEPTH), COR.paredeF, COR.paredeL)
  addBox(L, L + E, 0, A, pd(-DEPTH), pd(DEPTH), COR.paredeF, COR.paredeL)

  /* ── o alumínio: trilho superior, soleira e os dois montantes ──────────
     Faltava, e faz falta: sem o marco, o vidro parecia flutuar dentro de um
     buraco na parede. O perfil é OPACO — é esse contraste com o vidro
     transparente que faz o olho ler "metal" sem precisar de legenda.

     O trilho tem DOIS canais, e eles não são enfeite: um recebe as fixas
     (z = 0) e o outro as móveis (z = 34). São as duas cordinhas na soleira, e
     é por elas que se entende de cara por que uma folha passa na frente da
     outra. */
  const alu = -separa * 260
  const z1a = -12 + alu
  const z2a = 54 + alu
  addBox(0, L, A - TRILHO, A, z1a, z2a, COR.aluF, COR.aluL) // trilho superior · 55
  addBox(0, L, 0, SOLEIRA, z1a, z2a, COR.aluF, COR.aluL) // soleira · 20
  addBox(0, MONTANTE, SOLEIRA, A - TRILHO, z1a, z2a, COR.aluF, COR.aluL) // montante esq. · 20
  addBox(L - MONTANTE, L, SOLEIRA, A - TRILHO, z1a, z2a, COR.aluF, COR.aluL) // montante dir. · 20
  // os dois canais em relevo sobre a soleira: um para as fixas (z 0), outro
  // para as móveis (z 34) — é por eles que se entende por que uma passa na
  // frente da outra
  for (const zc of [0, 34]) {
    addBox(MONTANTE, L - MONTANTE, SOLEIRA - 4, SOLEIRA + 3, zc - 4 + alu, zc + ESPV + 4 + alu, COR.aluL, COR.aluL)
  }

  // ── as folhas ──────────────────────────────────────────────────────────
  for (const f of FOLHAS) {
    // explodida, a fixa recua e a móvel avança: elas se separam no eixo em que
    // já correm de verdade
    const zb = f.z + separa * (f.papel === 'fixa' ? -110 : 235)
    const x1 = VIDRO_X0 + f.i * FOLHA
    const x2 = x1 + FOLHA
    const desloca = f.dir * fase * CURSO
    const map = ([x, y, z]) => [x + desloca, y, z]

    // o vidro entra POR BAIXO dos perfis: a soleira e o trilho cobrem a borda,
    // como na obra. A fixa ainda para mais baixo, e é por isso que sobra o
    // rasgo do trilho vazio acima dela.
    const base = SOLEIRA - PISA
    // A fixa termina exatamente onde o trilho começa, entrando PISA por baixo
    // dele. A móvel sobe mais: ela pendura nas roldanas lá em cima, e é essa
    // diferença que deixa o rasgo do trilho aparecendo sobre a fixa.
    const topo = f.papel === 'fixa' ? A - TRILHO + PISA : A - 14
    addPrisma(
      [[x1, base], [x2, base], [x2, topo], [x1, topo]],
      zb, zb + ESPV, COR.vidro, COR.borda, map,
    )

    if (f.papel === 'movel') {
      const zf = zb + separa * 265
      /* As roldanas correm DENTRO do trilho — é lá que elas rodam. Por isso
         ficam a 18 mm do topo da folha, o que as põe dentro da faixa dos 55 mm
         do perfil, e não abaixo dela.

         A consequência é a certa e não precisa de truque nenhum para
         acontecer: com a janela montada, o alumínio é opaco e está na frente
         delas, então elas somem. Quando as peças se afastam, o perfil recua e
         a ferragem avança — e aí elas aparecem, que é justamente o momento em
         que interessa mostrá-las. */
      const yRoldana = topo - 18
      for (const fx of [x1 + 90, x2 - 90]) {
        addDisco(fx, yRoldana, 12, zf + ESPV + 2, zf + ESPV + 10, COR.ferrF, COR.ferrL, map, 12)
        addDisco(fx, yRoldana, 5, zf + ESPV + 10, zf + ESPV + 13, COR.ferrL, COR.ferrL, map, 8)
      }
      // puxador redondo de um furo, dupla face e discreto
      const px = f.i === 1 ? x2 - 70 : x1 + 70
      addDisco(px, A / 2, 6, zf - 8, zf + ESPV + 8, COR.ferrL, COR.ferrL, map, 8)
      addDisco(px, A / 2, 17, zf + ESPV + 8, zf + ESPV + 18, COR.ferrF, COR.ferrL, map, 12)
      addDisco(px, A / 2, 17, zf - 18, zf - 8, COR.ferrF, COR.ferrL, map, 12)
    }
  }

  faces.sort((a, b) => a.z - b.z)

  // enquadramento estável: os cantos do cenário, não do quadro corrente — sem
  // isto a caixa "pula" de tamanho quando as folhas correm
  const ext = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity }
  for (const x of [-E, L + E]) for (const y of [-E, A + E]) for (const z of [-DEPTH - 440, DEPTH + 520]) {
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

/* O cursor. Duas mãos desenhadas foram jogadas fora — uma tinha o polegar solto
   no ar, a outra lia como outro gesto. O problema é que mão é uma forma difícil:
   qualquer proporção fora do lugar muda o que ela significa, e num boneco de
   46 px não sobra margem para errar.

   A seta não tem esse risco. É a mesma forma que todo mundo vê o dia inteiro,
   são sete pontos, e a ponta superior esquerda é o ponto de contato — não
   precisa de convenção nenhuma para se entender. */
const SETA = 'M5 3 L5 29.5 L11.4 23.2 L15.6 33.4 L19.8 31.6 L15.7 21.6 L24.6 21.2 Z'

function Dedo({ em, tocando }) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute z-20"
      style={{
        left: `${em.x}%`,
        top: `${em.y}%`,
        // a ponta da seta é o ponto de contato: ela é que encosta no cartão
        transform: `translate(-16%, -7%) scale(${tocando ? 0.86 : 1})`,
        transformOrigin: '16% 7%',
        transition:
          'left 600ms cubic-bezier(.4,0,.2,1), top 600ms cubic-bezier(.4,0,.2,1), transform 160ms ease',
      }}
    >
      {tocando && <span className="onda" />}
      <svg
        viewBox="0 0 32 40"
        className="relative h-[34px] w-[27px]"
        style={{ filter: 'drop-shadow(0 4px 7px rgba(20,55,80,.4))' }}
      >
        <path d={SETA} fill="#fff" stroke="#26384a" strokeWidth="3.2" strokeLinejoin="round" />
        <path d={SETA} fill="#fff" />
      </svg>
    </span>
  )
}

/* ── as peças da folha do assistente ─────────────────────────────────────── */

function Cartao({ aceso, alvo, className = '', children }) {
  return (
    <div
      data-alvo={alvo}
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
/* Quando a demonstração termina ela mostra o próprio botão verde. Nesse
   instante o botão fixo do topo precisa sair de cena: dois "Começar grátis"
   na mesma tela é o defeito que o dono já mandou corrigir uma vez, e agora
   ele nasceria aqui. O aviso vai por evento porque quem decide é esta peça —
   o topo não tem como saber em que ponto da sequência ela está. */
export const EVENTO_CTA = 'neoglass:cta-demo'

/* ── a peça inteira ──────────────────────────────────────────────────────── */

export default function Projeto({ acao }) {
  const t = useTextos().demos.projeto
  const [ato, setAto] = useState('parado')
  const [beat, setBeat] = useState('entra')
  // quantos algarismos já foram digitados em cada campo, e qual está em foco
  const [digitos, setDigitos] = useState({ l: 0, a: 0 })
  const [foco, setFoco] = useState(null)
  const palco = useRef(null)
  const [dedoEm, setDedoEm] = useState({ x: 50, y: 46 })
  // 0 montada .. 1 explodida  ·  0 fechada .. 1 aberta — números, não bandeiras
  const [separa, setSepara] = useState(0)
  const [fase, setFase] = useState(0)
  const relogios = useRef([])
  const quadros = useRef([])

  const parar = () => {
    relogios.current.forEach(clearTimeout)
    relogios.current = []
    quadros.current.forEach(cancelAnimationFrame)
    quadros.current = []
  }

  /* Percorre um valor de `de` até `para` em `dur`, quadro a quadro. Cada quadro
     reprojeta a cena inteira — é o preço de ter 3D de verdade em SVG, e é o
     mesmo preço que a plataforma paga. */
  const percorrer = (setter, de, para, dur) => {
    const inicio = performance.now()
    const passo = (agora) => {
      const t = Math.min(1, (agora - inicio) / dur)
      setter(de + (para - de) * suave(t))
      if (t < 1) quadros.current.push(requestAnimationFrame(passo))
    }
    quadros.current.push(requestAnimationFrame(passo))
  }
  useEffect(() => parar, [])
  const marcar = (ms, fn) => relogios.current.push(setTimeout(fn, ms))

  function tocar() {
    parar()
    evento('demo', { qual: 'projeto' })
    window.dispatchEvent(new CustomEvent(EVENTO_CTA, { detail: { visivel: false } }))
    setSepara(0)
    setFase(0)
    setDigitos({ l: 0, a: 0 })
    setFoco(null)

    // Quem pediu menos movimento recebe o desfecho, parado. Não é versão
    // pobre: é o quadro que a sequência inteira existe para entregar.
    if (semMovimento()) {
      setAto('fim')
      setSepara(0)
      setFase(1)
      window.dispatchEvent(new CustomEvent(EVENTO_CTA, { detail: { visivel: true } }))
      return
    }

    // Um instante de tela do app antes de qualquer coisa. Sem ele a folha do
    // assistente aparecia do nada, e o visitante não tinha como saber de onde
    // ela saiu — era um corte seco logo depois do clique.
    setAto('abrindo')
    setBeat('entra')
    marcar(320, () => setBeat('dedo'))
    marcar(1050, () => setBeat('toque'))

    PASSOS.forEach((passo, i) => {
      const base = ABRINDO + ATO * i
      marcar(base, () => {
        setAto(passo)
        setBeat('entra')
      })
      marcar(base + BEATS.dedo, () => setBeat('dedo'))
      marcar(base + BEATS.toque, () => setBeat('toque'))
      marcar(base + BEATS.confirma, () => setBeat('confirma'))
      /* A medida é DIGITADA, e não colada. O cursor vai até o campo, ele
         acende, e os algarismos entram um a um — é assim que o vidraceiro põe
         a medida que tirou na obra, e é isso que a demonstração precisa
         mostrar. Aparecer "1800" inteiro de uma vez era o mesmo que dizer que
         o sistema adivinha o vão. */
      if (passo === 'medida') {
        marcar(base + 420, () => setFoco('l'))
        for (let d = 1; d <= MEDIDA.largura.length; d++) {
          marcar(base + 620 + d * TECLA, () => setDigitos((v) => ({ ...v, l: d })))
        }
        marcar(base + 1320, () => setFoco('a'))
        for (let d = 1; d <= MEDIDA.altura.length; d++) {
          marcar(base + 1520 + d * TECLA, () => setDigitos((v) => ({ ...v, a: d })))
        }
        marcar(base + 2100, () => setFoco(null))
      }
    })

    const fim = ABRINDO + ATO * 4
    marcar(fim, () => setAto('montagem'))
    // as peças se afastam, seguram um instante, e voltam a se encaixar
    marcar(fim + EXPLODE_EM, () => percorrer(setSepara, 0, 1, EXPLODE_DUR))
    marcar(fim + VOLTA_EM, () => percorrer(setSepara, 1, 0, VOLTA_DUR))
    // e então a janela abre, no mesmo compasso do sistema
    marcar(fim + ABRE_EM, () => percorrer(setFase, 0, 1, ABRE_DUR))
    marcar(TOTAL, () => {
      setAto('fim')
      window.dispatchEvent(new CustomEvent(EVENTO_CTA, { detail: { visivel: true } }))
    })
  }

  useEffect(() => {
    const ouvir = () => tocar()
    window.addEventListener(EVENTO_TOCAR, ouvir)
    return () => window.removeEventListener(EVENTO_TOCAR, ouvir)
  })

  /* `mira` e `confirmando` moram AQUI, antes dos efeitos, e não junto do
     resto do render. A lista de dependências de um `useEffect` é avaliada no
     momento do render — se a constante estiver declarada mais abaixo, o
     navegador para com "Cannot access before initialization" e a página inteira
     fica em branco. Aconteceu. */
  const noAssistente = PASSOS.includes(ato)
  const confirmando = beat === 'confirma'
  const mira = ato === 'abrindo'
    ? 'abrir'
    : confirmando
    ? 'confirmar'
    : ato === 'medida'
      ? foco === 'a'
        ? 'campo-a'
        : 'campo-l'
      : 'escolha'

  /* Mede o alvo e leva o cursor até o centro dele. Roda depois da pintura
     (`requestAnimationFrame`) porque o elemento do passo novo ainda não existe
     no instante em que o ato troca. */
  useEffect(() => {
    if (!noAssistente && ato !== 'abrindo') return
    let vivo = true
    const medir = () => {
      if (!vivo || !palco.current) return
      const el = palco.current.querySelector(`[data-alvo="${mira}"]`)
      if (!el) return
      const c = palco.current.getBoundingClientRect()
      const r = el.getBoundingClientRect()
      setDedoEm({
        x: ((r.left + r.width / 2 - c.left) / c.width) * 100,
        y: ((r.top + r.height / 2 - c.top) / c.height) * 100,
      })
    }
    const id = requestAnimationFrame(medir)
    /* A segunda medição não é redundância. No primeiro passo a folha do
       assistente ainda está SUBINDO quando o alvo é medido, e a régua pega o
       cartão 18% abaixo de onde ele vai parar — o cursor ia para o lugar
       errado e ficava lá. Medir de novo depois que a entrada assenta corrige
       isso, e nos outros passos custa nada. */
    const t = setTimeout(medir, 540)
    return () => {
      vivo = false
      cancelAnimationFrame(id)
      clearTimeout(t)
    }
  }, [mira, ato, noAssistente])

  const escuro = ato === 'montagem' || ato === 'fim'
  const p = noAssistente ? t.passos[ato] : null
  const aceso = beat === 'toque' || beat === 'confirma'

  return (
    <div className="mx-auto w-full max-w-[520px]">
      <div className="overflow-hidden rounded-[24px] border border-line bg-card shadow-[0_40px_80px_-50px_rgba(20,55,80,.5)]">
        <div ref={palco} className="demo-palco palco-app relative">
          {/* ── a abertura ────────────────────────────────────────────────
              Duas tentativas anteriores morreram aqui. A primeira mostrava a
              tela do app inteira — cabeçalho, quatro botões, prancheta vazia —
              e era uma SEGUNDA interface para decifrar antes da que interessa.
              A segunda mostrava a marca acendendo, que é bonito e não diz nada.

              Esta diz: um botão "Adicionar vão", o cursor vai até ele e clica.
              Em dois segundos o visitante entende de onde a folha saiu, e a
              gramática do toque já começa aqui — é a mesma dos quatro passos
              seguintes. */}
          {(ato === 'abrindo' || noAssistente) && (
            <div className="absolute inset-0 flex items-center justify-center bg-soft/40">
              <span
                data-alvo="abrir"
                className="inline-flex items-center gap-2.5 rounded-[14px] px-6 py-3.5 text-[15px] font-bold text-white transition-transform duration-200"
                style={{
                  background: AZUL,
                  boxShadow: '0 14px 30px -14px rgba(61,81,214,.7)',
                  transform: ato === 'abrindo' && beat === 'toque' ? 'scale(.95)' : 'none',
                }}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                  <path
                    d="M12 5v14M5 12h14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                  />
                </svg>
                {t.titulo}
              </span>
            </div>
          )}

          {/* o cursor existe desde a abertura: ele clica no botão e só então a
              folha sobe */}
          {ato === 'abrindo' && <Dedo em={dedoEm} tocando={beat === 'toque'} />}

          {/* ── a folha do assistente, subindo por cima ──────────────────── */}
          {noAssistente && (
            <div className="folha-sobe relative flex h-full w-full flex-col bg-white">
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
                      <Cartao
                        key={o}
                        aceso={aceso && i === ESCOLHA.vao}
                        alvo={i === ESCOLHA.vao ? 'escolha' : undefined}
                        className="flex-col gap-1 px-2 py-2.5 text-center"
                      >
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
                      [p.largura, MEDIDA.largura, digitos.l, 'l'],
                      [p.altura, MEDIDA.altura, digitos.a, 'a'],
                    ].map(([rotulo, valor, n, chave]) => (
                      <span key={rotulo} className="grid gap-1.5">
                        <span className="text-[12.5px] font-bold text-ink">{rotulo}</span>
                        <span
                          data-alvo={`campo-${chave}`}
                          className="flex items-center justify-between rounded-[12px] border-2 bg-white px-4 py-3 transition-colors duration-200"
                          style={{
                            borderColor: foco === chave ? AZUL : n ? '#c7cfda' : '#e4e9ee',
                            boxShadow: foco === chave ? '0 0 0 3px rgba(61,81,214,.12)' : 'none',
                          }}
                        >
                          <b className="font-mono text-[19px] font-bold text-ink">
                            {valor.slice(0, n)}
                            {foco === chave && <i className="cursor-pisca" />}
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
                      <Cartao
                        key={nome}
                        aceso={aceso && i === ESCOLHA[ato]}
                        alvo={i === ESCOLHA[ato] ? 'escolha' : undefined}
                        className="gap-2.5 px-3 py-2"
                      >
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
                  data-alvo="confirmar"
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
            <div className="surge-3d flex h-full w-full flex-col bg-[#111a33] px-5 py-5 sm:px-6">
              <p className="flex flex-wrap items-baseline gap-x-2">
                <b className="text-[17px] font-extrabold text-white sm:text-[19px]">
                  {t.passos.montagem.rotulo}
                </b>
                <b className="text-[12px] font-semibold text-white/55">{t.passos.montagem.sub}</b>
              </p>
              <div className="flex flex-1 items-center">
                <Perspectiva fase={fase} separa={separa} />
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
              {/* Quem acabou de ver o projeto nascer em vinte segundos está no
                  ponto mais quente da página. O pedido vem aqui, e não três
                  seções abaixo. */}
              {acao && (
                <a
                  href={acao.href}
                  onClick={() => evento('comecar', { origem: 'demo-projeto' })}
                  className="botao-marca sobe px-7 py-3.5 text-[15px] transition-transform duration-200 hover:-translate-y-0.5"
                >
                  {acao.rotulo}
                </a>
              )}
              <button
                type="button"
                onClick={tocar}
                className="text-[13.5px] font-bold text-dim underline underline-offset-4 transition-colors hover:text-ink"
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
