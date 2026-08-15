import { useEffect, useRef, useState } from 'react'
import { Simbolo } from '../components/Marca.jsx'
import { CONFIG, acaoComecar, ehExterno, linkAgendar, linkWhatsapp, precoVidracaria, valorMensal } from '../config.js'
import { destinoComecar } from '../lib/paginasSeo.js'
import { evento } from '../lib/rastreio.js'
import { semMovimento } from '../lib/dispositivo.js'
import { useIdioma, useTextos } from '../i18n/idioma.jsx'

/**
 * A demonstração da vidraçaria: do vão medido ao PDF na mão do cliente.
 *
 * O visitante não preenche nada. Ele aperta "Usar este vão" e a janela se
 * monta sozinha em cima da medida; aperta de novo e o orçamento se preenche
 * na frente dele; aperta a terceira vez e sai o PDF com a marca dele. No fim,
 * o site diz quanto tempo aquilo levou — e é o próprio cronômetro que prova o
 * argumento da página: profissionalizar não precisa ser complicado.
 *
 * Os valores do orçamento são de exemplo e estão marcados como tal: são o
 * preço que a vidraçaria cobra do cliente dela.
 *
 * A mensalidade do NeoGlass é o quarto e último passo, e só existe se
 * `CONFIG.vidracaria.precoMensal` estiver preenchido. Ela aparece exatamente
 * aqui de propósito — é o pico de valor da página, com o orçamento de R$ 1.169
 * ainda na tela. A comparação se faz sozinha, e a conta de quantos meses aquele
 * único serviço paga é aritmética, não promessa.
 */

// O nome do serviço e o tipo de parede moram no módulo de textos: aqui ficam
// só as medidas, que são as mesmas em qualquer idioma.
const VAO = { l: 1600, a: 1200 }

const CLIENTE = 'Marcos Ribeiro'
const NUMERO = '26-0918'

// A janela: duas folhas de correr, com as folgas de sempre.
const FOLGA_LARGURA = 10
const FOLGA_ALTURA = 20
const SOBREPOSICAO = 30

const FOLHA = {
  l: Math.round((VAO.l - FOLGA_LARGURA) / 2 + SOBREPOSICAO),
  a: VAO.a - FOLGA_ALTURA,
}
const M2 = (FOLHA.l / 1000) * (FOLHA.a / 1000) * 2

const PRECO_M2 = 210

// `chave` aponta para o nome e o detalhe da linha no módulo de textos; aqui
// fica só o dinheiro, que é o que a conta usa.
const ITENS = [
  { chave: 'vidro', valor: Math.round(M2 * PRECO_M2) },
  { chave: 'kit', valor: 285 },
  { chave: 'perfil', valor: 95 },
  { chave: 'instalacao', valor: 380 },
]

const TOTAL = ITENS.reduce((s, i) => s + i.valor, 0)

/** O total do orçamento de exemplo. A seção de preço compara contra ele. */
export const ORCAMENTO_EXEMPLO = TOTAL

const brl = (n) =>
  n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
const num = (n, c = 2) =>
  n.toLocaleString('pt-BR', { minimumFractionDigits: c, maximumFractionDigits: c })

/**
 * O detalhe de cada linha do orçamento. Só o do vidro carrega medida e m², e
 * por isso chega do módulo de textos como função; os outros três são frase
 * fixa. Medida e área não se traduzem — vão prontas daqui.
 */
const detalheDe = (t, item) => {
  const d = t.itens[item.chave].detalhe
  return typeof d === 'function' ? d(`${FOLHA.l} × ${FOLHA.a}`, num(M2)) : d
}

/** Um número que sobe até o valor. Vinte e seis passos, não sessenta por segundo. */
function useContagem(alvo, ligado, duracao = 950, atraso = 0) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!ligado) {
      setV(0)
      return
    }
    if (semMovimento()) {
      setV(alvo)
      return
    }
    const passos = 26
    let n = 0
    let id = 0
    const espera = setTimeout(() => {
      id = setInterval(() => {
        n += 1
        setV(Math.round(alvo * (1 - (1 - n / passos) ** 3)))
        if (n >= passos) clearInterval(id)
      }, duracao / passos)
    }, atraso)
    return () => {
      clearTimeout(espera)
      clearInterval(id)
    }
  }, [alvo, ligado, duracao, atraso])
  return v
}

/* ── o desenho: o vão é o assunto, não a parede ──────────────────────────── */

const S = { W: 1940, H: 1400, x: 100, y: 160, w: 1480, h: 1060 }

function Cena({ medindo, medido, preview, montando, montada }) {
  const t = useTextos().demos.orcamento.desenho
  const l = useContagem(VAO.l, medindo, 900, 80)
  const a = useContagem(VAO.a, medindo, 900, 420)
  const travada = medido || montando || montada
  const largura = medindo ? l : travada ? VAO.l : 0
  const altura = medindo ? a : travada ? VAO.a : 0
  const mostraCota = medindo || travada
  const comVidro = montando || montada
  const ox = S.x
  const oy = S.y
  const ow = S.w
  const oh = S.h
  const folhaW = ow * 0.52
  const folhaH = oh - 64

  return (
    <svg viewBox={`0 0 ${S.W} ${S.H}`} className="block h-full w-full" role="img" aria-label={t.aria}>
      <defs>
        <pattern id="orc-tijolo" width="140" height="68" patternUnits="userSpaceOnUse">
          <rect width="140" height="68" fill="#dfe4ea" />
          <path d="M0 34 H140 M70 34 V68 M0 68 H140" stroke="#c8d0d8" strokeWidth="4" />
        </pattern>
        <pattern id="orc-ticks" width="36" height="22" patternUnits="userSpaceOnUse">
          <path d="M0 0 V11 M18 0 V6" stroke="#3a2f12" strokeWidth="2" />
        </pattern>
        <linearGradient id="orc-buraco" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#24343c" />
          <stop offset="1" stopColor="#0b1418" />
        </linearGradient>
        <linearGradient id="orc-sombra" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0.35" />
          <stop offset="0.45" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.22" />
        </linearGradient>
        <linearGradient id="orc-vidro" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e8f6f8" stopOpacity="0.97" />
          <stop offset="0.45" stopColor="#f7fcfd" stopOpacity="0.78" />
          <stop offset="1" stopColor="#c5e4ee" stopOpacity="0.92" />
        </linearGradient>
        <linearGradient id="orc-reflexo" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0.58" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="orc-fita" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6e06a" />
          <stop offset="1" stopColor="#e2c43a" />
        </linearGradient>
        <clipPath id="orc-vao">
          <rect x={ox} y={oy} width={ow} height={oh} />
        </clipPath>
      </defs>

      <rect width={S.W} height={S.H} fill="url(#orc-tijolo)" />

      {/* peitoril — o vão tem profundidade, não é um retângulo no meio da parede */}
      <rect x={ox - 22} y={oy + oh} width={ow + 44} height="26" rx="3" fill="#c5ccd4" />

      <rect x={ox} y={oy} width={ow} height={oh} fill="url(#orc-buraco)" />
      <rect x={ox} y={oy} width={ow} height={oh} fill="url(#orc-sombra)" />
      <rect x={ox - 16} y={oy - 16} width={ow + 32} height={oh + 32} fill="none" stroke="#bcc4cc" strokeWidth="32" />
      <rect x={ox} y={oy} width={ow} height={oh} fill="none" stroke="#7f8b96" strokeWidth="8" />

      {preview && !comVidro && (
        <g clipPath="url(#orc-vao)" opacity="0.5">
          <line
            x1={ox + ow / 2}
            y1={oy + 20}
            x2={ox + ow / 2}
            y2={oy + oh - 20}
            stroke="#7fe0c8"
            strokeWidth="10"
            strokeDasharray="18 16"
          />
        </g>
      )}

      {medindo && (
        <rect className="flash-foto" x={ox} y={oy} width={ow} height={oh} fill="#fff" />
      )}

      {comVidro && (
        <g clipPath="url(#orc-vao)">
          <rect
            x={ox + 12}
            y={oy + 14}
            width={ow - 24}
            height={oh - 28}
            fill="none"
            stroke="#3f4c56"
            strokeWidth="30"
            pathLength="1"
            className={montando ? 'marco-nasce' : undefined}
          />
          <g className={montando ? 'folha-e' : undefined}>
            <rect
              x={ox + 30}
              y={oy + 32}
              width={folhaW - 42}
              height={folhaH}
              fill="url(#orc-vidro)"
              stroke="#65727c"
              strokeWidth="14"
            />
            <rect x={ox + 72} y={oy + 72} width="34" height={folhaH - 86} fill="url(#orc-reflexo)" opacity="0.55" />
          </g>
          <g className={montando ? 'folha-d' : undefined}>
            <rect
              x={ox + ow - folhaW - 10}
              y={oy + 44}
              width={folhaW - 36}
              height={folhaH - 22}
              fill="url(#orc-vidro)"
              stroke="#334047"
              strokeWidth="16"
            />
            <rect
              x={ox + ow - folhaW + 30}
              y={oy + oh / 2 - 68}
              width="22"
              height="148"
              rx="11"
              fill="#334047"
            />
          </g>
        </g>
      )}

      {comVidro && (
        <text
          x={ox + ow / 2}
          y={oy + oh + 78}
          textAnchor="middle"
          fontSize="48"
          fontFamily="IBM Plex Mono, monospace"
          fontWeight="600"
          fill="#0e8c6a"
        >
          {t.janela}
        </text>
      )}

      {mostraCota && (
        <g>
          {/* corpo da trena — largura */}
          <rect x={ox - 78} y={oy - 124} width="78" height="62" rx="14" fill="#0a5c46" />
          <rect x={ox - 70} y={oy - 116} width="62" height="46" rx="10" fill="#0e8c6a" />
          <circle cx={ox - 39} cy={oy - 93} r="8" fill="#0a5c46" />
          <g className={medindo ? 'trena-x' : undefined}>
            <rect x={ox} y={oy - 104} width={ow} height="22" fill="url(#orc-fita)" />
            <rect x={ox} y={oy - 104} width={ow} height="22" fill="url(#orc-ticks)" />
          </g>
          <text
            x={ox + ow / 2}
            y={oy - 93}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="28"
            fontFamily="IBM Plex Mono, monospace"
            fontWeight="700"
            fill="#2a2410"
          >
            {largura || '—'}
          </text>
          <path d={`M${ox + ow} ${oy - 110} h12 v34 h-12`} fill="#c5ccd4" stroke="#8b97a3" strokeWidth="3" />

          {/* corpo da trena — altura */}
          <rect x={ox + ow + 66} y={oy - 78} width="62" height="78" rx="14" fill="#0a5c46" />
          <rect x={ox + ow + 74} y={oy - 70} width="46" height="62" rx="10" fill="#0e8c6a" />
          <g className={medindo ? 'trena-y' : undefined}>
            <rect x={ox + ow + 85} y={oy} width="22" height={oh} fill="url(#orc-fita)" />
            <rect x={ox + ow + 85} y={oy} width="22" height={oh} fill="url(#orc-ticks)" />
          </g>
          <path d={`M${ox + ow + 78} ${oy + oh} v12 h34 v-12`} fill="#c5ccd4" stroke="#8b97a3" strokeWidth="3" />
          <text
            x={ox + ow + 168}
            y={oy + oh / 2}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="42"
            fontFamily="IBM Plex Mono, monospace"
            fontWeight="700"
            fill="#0e8c6a"
          >
            {altura || '—'}
          </text>
        </g>
      )}
    </svg>
  )
}

/**
 * Os dois passos de escolha — que peça é, e de quantas folhas.
 *
 * São cartões grandes com desenho e não uma lista suspensa, porque é assim
 * que o sistema pergunta de verdade: na obra, com uma mão só e o celular na
 * outra, ninguém acerta um <select>. Na animação o sistema escolhe sozinho —
 * o cartão certo sobe e ganha o anel verde — e é isso que o visitante precisa
 * ver: que a decisão existe e é de UM toque.
 */
function Escolha({ rotulo, opcoes, escolhida, desenho }) {
  return (
    <div>
      <p className="cota uppercase">{rotulo}</p>
      <div className="mt-2.5 grid grid-cols-3 gap-2">
        {opcoes.map((op, i) => (
          <div
            key={op.rotulo ?? op}
            className={`rounded-[14px] border bg-card px-1.5 py-2.5 text-center sm:px-2.5 ${
              i === escolhida ? 'escolhido border-verde' : 'border-line'
            }`}
          >
            <div className="mx-auto w-full max-w-[72px]">{desenho(i, i === escolhida)}</div>
            <p
              className={`mt-1.5 text-[12px] font-extrabold leading-tight sm:text-[13px] ${
                i === escolhida ? 'text-verde' : 'text-dim'
              }`}
            >
              {op.rotulo ?? op}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

const traco = (aceso) => ({
  fill: aceso ? 'rgba(14,140,106,.10)' : '#f2f5f7',
  stroke: aceso ? '#0e8c6a' : '#b6c2d1',
  strokeWidth: 5,
})

/** Porta, janela e box — o desenho de cada tipo, em três traços. */
function DesenhoTipo(i, aceso) {
  const p = traco(aceso)
  return (
    <svg viewBox="0 0 100 88" className="block w-full" aria-hidden="true">
      {i === 0 && (
        <>
          <rect x="26" y="6" width="48" height="76" rx="2" {...p} />
          <circle cx="66" cy="46" r="3.4" fill={p.stroke} />
        </>
      )}
      {i === 1 && (
        <>
          <rect x="10" y="18" width="80" height="52" rx="2" {...p} />
          <line x1="50" y1="18" x2="50" y2="70" stroke={p.stroke} strokeWidth="5" />
        </>
      )}
      {i === 2 && (
        <>
          <path d="M14 26 L52 14 L52 82 L14 76 Z" {...p} />
          <path d="M52 14 L88 26 L88 76 L52 82 Z" {...p} />
        </>
      )}
    </svg>
  )
}

/** Duas, três ou quatro folhas dentro do mesmo vão. */
function DesenhoFolhas(i, aceso) {
  const p = traco(aceso)
  const n = i + 2
  return (
    <svg viewBox="0 0 100 88" className="block w-full" aria-hidden="true">
      <rect x="8" y="14" width="84" height="60" rx="2" {...p} />
      {Array.from({ length: n - 1 }, (_, k) => (
        <line
          key={k}
          x1={8 + (84 / n) * (k + 1)}
          y1="14"
          x2={8 + (84 / n) * (k + 1)}
          y2="74"
          stroke={p.stroke}
          strokeWidth="5"
        />
      ))}
    </svg>
  )
}

/* ── o PDF que o cliente recebe ──────────────────────────────────────────── */

function Documento({ compacto = false }) {
  const c = useTextos()
  const t = c.demos.orcamento
  return (
    <div
      className={`imprime mx-auto w-full max-w-[440px] rounded-[10px] border border-line bg-white ${
        compacto ? 'px-5 py-5' : 'px-6 py-6'
      }`}
      style={{ boxShadow: '0 30px 60px -34px rgba(20,55,80,.45)' }}
    >
      <div className="flex items-start justify-between gap-4 border-b border-line pb-4">
        <div className="flex items-center gap-2.5">
          <Simbolo className="h-8 w-8 rounded-[9px]" />
          <div>
            <p className="text-[13px] font-extrabold leading-tight text-ink">
              {t.documento.empresa}
            </p>
            <p className="cota normal-case leading-tight">{t.documento.marca}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="cota uppercase">{t.documento.orcamento}</p>
          <p className="font-mono text-[13px] font-bold text-ink">{NUMERO}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap justify-between gap-3">
        <div>
          <p className="cota uppercase">{t.documento.cliente}</p>
          <p className="text-[13px] font-bold text-ink">{CLIENTE}</p>
        </div>
        <div>
          <p className="cota uppercase">{t.documento.servico}</p>
          <p className="text-[13px] font-bold text-ink">
            {t.documento.servicoValor(t.obra.vao, `${VAO.l}×${VAO.a}`)}
          </p>
        </div>
      </div>

      <table className="mt-4 w-full border-collapse">
        <tbody>
          {ITENS.map((i) => (
            <tr key={i.chave} className="border-t border-line">
              <td className="py-2 pr-3 align-top">
                <span className="block text-[12.5px] font-bold leading-tight text-ink">
                  {t.itens[i.chave].nome}
                </span>
                <span className="cota block normal-case leading-tight">{detalheDe(t, i)}</span>
              </td>
              <td className="whitespace-nowrap py-2 text-right align-top font-mono text-[12.5px] font-bold text-ink">
                {brl(i.valor)}
              </td>
            </tr>
          ))}
          <tr className="border-t-2 border-ink/15">
            <td className="pt-3 text-[13px] font-extrabold text-ink">{t.documento.total}</td>
            <td className="pt-3 text-right">
              <span className="display text-[22px] leading-none text-verde">{brl(TOTAL)}</span>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="mt-4 flex flex-wrap items-end justify-between gap-4 border-t border-line pt-3">
        <p className="cota max-w-[24ch] normal-case leading-snug">{t.documento.validade}</p>
        <span className="min-w-[110px]">
          <span aria-hidden="true" className="block border-b border-ink/30 pb-4" />
          <span className="cota mt-1 block text-center normal-case">
            {t.documento.assinatura}
          </span>
        </span>
      </div>
    </div>
  )
}

/* ── o quadro ────────────────────────────────────────────────────────────── */

/* Um play só: medir, escolher, montar, precificar, imprimir.
   A montagem é o payoff — leva mais tempo que a pergunta. ~12 s até o PDF. */
const TEMPO = {
  medindo: 2200,
  tipo: 1800,
  folhas: 1600,
  montando: 2800,
  orcamento: 2200,
  gerando: 1400,
}

/* O que o sistema escolhe sozinho na animação: janela, duas folhas.
   NÃO é escolha de gosto — é o que o resto da demonstração já conta. O vidro
   que se monta no vão é uma janela de correr de duas folhas, e o PDF no fim
   lista "janela de correr 2 folhas". Marcar "box" aqui faria a animação
   contradizer o próprio documento três telas depois. */
const TIPO_ESCOLHIDO = 1
const FOLHAS_ESCOLHIDAS = 0

// Só a chave e a cor: a frase de cada uma vem do módulo de textos.
const NAO_COBRAMOS = ['implantacao', 'orcamento', 'fidelidade']

const CANAIS = [
  ['whatsapp', '#0e8c6a'],
  ['email', '#0e7b9c'],
  ['pdf', '#7c6ad6'],
]

/**
 * A ficha do serviço, preenchendo-se sozinha.
 *
 * Enquanto o palco mostra o gesto — a trena, os cartões —, esta coluna mostra
 * o resultado do gesto virando dado. Sem ela metade da tela ficava vazia
 * durante os três primeiros tempos, e o visitante não tinha para onde olhar
 * enquanto esperava.
 */
function Ficha({ t, fase }) {
  const ordem = ['medindo', 'tipo', 'folhas', 'montando', 'orcamento', 'gerando', 'pdf']
  const em = ordem.indexOf(fase)
  const linhas = [
    [t.ficha.vao, `${VAO.l} × ${VAO.a} mm`, 0],
    [t.ficha.peca, t.escolhas.tipo.opcoes[TIPO_ESCOLHIDO], 1],
    [t.ficha.folhas, t.escolhas.folhas.opcoes[FOLHAS_ESCOLHIDAS], 2],
  ]
  return (
    <>
      <p className="cota uppercase">{t.ficha.rotulo}</p>
      <h3 className="display mt-2 text-[24px]">{t.ficha.titulo}</h3>
      <dl className="mt-6 divide-y divide-line border-y border-line">
        {linhas.map(([rotulo, valor, quando]) => {
          const cheio = em >= quando
          return (
            <div key={rotulo} className="flex items-baseline justify-between gap-4 py-3.5">
              <dt className="cota uppercase">{rotulo}</dt>
              <dd
                className={`font-mono text-[15px] font-bold ${cheio ? 'sobe text-ink' : 'text-dim/50'}`}
              >
                {cheio ? valor : t.ficha.esperando}
              </dd>
            </div>
          )
        })}
      </dl>
      <p className="mt-5 text-[13.5px] leading-[1.55] text-dim">{t.ficha.nota}</p>
    </>
  )
}

/** Um balão por fase, com o rabicho apontando para o desenho. */
function Balao({ texto }) {
  if (!texto) return null
  return (
    <div className="balao pointer-events-none absolute inset-x-3 bottom-3 z-10 flex justify-center sm:inset-x-6 sm:bottom-5">
      <span className="w-full max-w-[34rem]">
        {/* o rabicho aponta para CIMA, para o desenho.
            Antes o balão flutuava no canto superior e tapava justamente a peça
            que ele estava explicando — aconteceu no cavalete e no vão. Embaixo,
            o palco fica inteiro livre e a frase continua colada à cena. */}
        <svg viewBox="0 0 26 16" className="ml-8 -mb-px h-3 w-5" aria-hidden="true">
          <path d="M7 0 L26 16 H0 Z" fill="var(--card, #fff)" stroke="rgba(14,140,106,.35)" strokeWidth="1" />
        </svg>
        <p className="rounded-[14px] border border-verde/35 bg-card px-4 py-3 text-[13.5px] font-bold leading-snug text-ink shadow-[0_14px_34px_-18px_rgba(20,55,80,.55)]">
          {texto}
        </p>
      </span>
    </div>
  )
}

export default function Orcamento() {
  const [fase, setFase] = useState('vao')
  const [segundos, setSegundos] = useState(0)
  const relogios = useRef([])
  const inicio = useRef(0)

  const parar = () => {
    relogios.current.forEach(clearTimeout)
    relogios.current = []
  }

  useEffect(() => parar, [])

  /* Um clique, e ela corre do vão até o PDF. Os botões do meio saíram: quem
     está avaliando um software não quer operar a demonstração, quer ver o
     serviço acontecer. As decisões que sobram no fim — enviar, ver preço — são
     de verdade, e essas continuam com o visitante. */
  const usarVao = () => {
    evento('ferramenta', { qual: 'orcamento', passo: 'usar-vao' })
    inicio.current = Date.now()
    parar()
    if (semMovimento()) return setFase('pdf')
    setFase('medindo')
    let soma = 0
    ;[
      ['tipo', TEMPO.medindo],
      ['folhas', TEMPO.tipo],
      ['montando', TEMPO.folhas],
      ['orcamento', TEMPO.montando],
      ['gerando', TEMPO.orcamento],
      ['pdf', TEMPO.gerando],
    ].forEach(([qual, espera]) => {
      soma += espera
      relogios.current.push(setTimeout(() => setFase(qual), soma))
    })
  }

  const enviar = () => {
    evento('ferramenta', { qual: 'orcamento', passo: 'enviar' })
    setSegundos(Math.max(1, Math.round((Date.now() - inicio.current) / 1000)))
    setFase('enviar')
  }

  const recomecar = () => {
    parar()
    setSegundos(0)
    setFase('vao')
  }

  // O quarto degrau. Enquanto não houver preço decidido, ele não existe e o
  // botão volta a ser o link de sempre.
  const { idioma, c } = useIdioma()
  const t = c.demos.orcamento
  const preco = precoVidracaria(idioma)
  const { diasTeste } = CONFIG.vidracaria
  const comecar = destinoComecar(acaoComecar(idioma, c), idioma)
  const mesesPagos = preco ? Math.floor(TOTAL / valorMensal(idioma)) : 0
  const verPreco = () => {
    evento('ferramenta', { qual: 'orcamento', passo: 'ver-preco' })
    setFase('preco')
  }


  // No celular o painel fica embaixo do desenho, e o desenho é alto: sem isto,
  // o visitante aperta o botão e o resultado nasce a meia tela de distância,
  // fora do campo de visão. Só no empilhado — no computador as duas colunas já
  // estão lado a lado.
  const painel = useRef(null)
  useEffect(() => {
    if (fase !== 'preco') return
    if (typeof window === 'undefined' || window.innerWidth >= 1024) return
    const id = requestAnimationFrame(() =>
      painel.current?.scrollIntoView({
        behavior: semMovimento() ? 'auto' : 'smooth',
        block: 'start',
      }),
    )
    return () => cancelAnimationFrame(id)
  }, [fase])

  const noOrcamento = fase === 'orcamento'
  const total = useContagem(TOTAL, noOrcamento, 1100, 900)

  // O cronômetro só entra na frase quando o visitante levou menos de 90
  // segundos: acima disso ele foi olhar outra coisa no meio, e o número mente.
  const noTempo = segundos > 0 && segundos <= 90

  const passos = preco ? 4 : 3
  const passo =
    fase === 'vao' || fase === 'medindo' || fase === 'tipo' || fase === 'folhas' || fase === 'montando'
      ? 1
      : fase === 'orcamento' || fase === 'gerando'
        ? 2
        : fase === 'preco'
          ? 4
          : 3

  const resumoZap = [
    t.whatsapp.titulo(NUMERO, t.obra.vao, `${VAO.l}×${VAO.a} mm`),
    ...ITENS.map((i) => t.whatsapp.item(t.itens[i.chave].nome, brl(i.valor))),
    t.whatsapp.total(brl(TOTAL)),
    '',
    t.whatsapp.rodape,
  ].join('\n')

  return (
    <div className="demo rounded-[24px] lg:overflow-hidden border border-line bg-card shadow-[0_36px_70px_-46px_rgba(20,55,80,.4)]">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-line bg-soft/60 px-5 py-3 sm:px-7">
        <span className="flex items-center gap-2.5">
          <Simbolo className="h-6 w-6 rounded-[7px]" />
          <span className="text-[14px] font-extrabold tracking-[-0.015em] text-ink">
            {t.barra.titulo}
          </span>
        </span>
        <span className="cota rounded-full border border-line bg-card px-3 py-1 uppercase">
          {t.barra.cliente(CLIENTE)}
        </span>
        <span className="cota ml-auto uppercase">{t.barra.passo(passo, passos)}</span>
      </div>

      {/* Uma coluna só, centralizada.
          Duas colunas obrigavam o olho a escolher entre o desenho e o texto, e
          no celular viravam uma pilha onde o painel aparecia antes de o
          visitante ver qualquer coisa se mexer. Centralizado, a leitura é uma
          só: primeiro o que acontece, depois o que aquilo significa. */}
      <div className="mx-auto w-full">
        {/* ── o palco ─────────────────────────────────────────────────── */}
        <div
          className={`demo-palco relative border-b border-line bg-soft/30 px-4 py-5 sm:px-7 ${
            fase === 'pdf' || fase === 'enviar' || fase === 'preco' ? '' : 'demo-palco-vao'
          }`}
        >
          <Balao key={fase} texto={t.baloes?.[fase]} />

          {(fase === 'vao' ||
            fase === 'medindo' ||
            fase === 'tipo' ||
            fase === 'folhas' ||
            fase === 'montando' ||
            fase === 'orcamento' ||
            fase === 'gerando') && (
            <>
              <p className="cota relative z-[1] mb-2 uppercase">
                {fase === 'vao'
                  ? t.desenho.vaoVazio
                  : fase === 'montando'
                    ? t.desenho.montando
                    : fase === 'orcamento' || fase === 'gerando'
                      ? t.desenho.janelaDoVao
                      : t.desenho.vaoMedido}
              </p>
              <Cena
                medindo={fase === 'medindo'}
                medido={fase === 'tipo' || fase === 'folhas'}
                preview={fase === 'tipo' || fase === 'folhas'}
                montando={fase === 'montando'}
                montada={fase === 'orcamento' || fase === 'gerando'}
              />
            </>
          )}

          {fase === 'tipo' && (
            <div className="escolha-sobre">
              <Escolha
                rotulo={t.escolhas.tipo.rotulo}
                opcoes={t.escolhas.tipo.opcoes}
                escolhida={TIPO_ESCOLHIDO}
                desenho={DesenhoTipo}
              />
            </div>
          )}

          {fase === 'folhas' && (
            <div className="escolha-sobre">
              <Escolha
                rotulo={t.escolhas.folhas.rotulo}
                opcoes={t.escolhas.folhas.opcoes}
                escolhida={FOLHAS_ESCOLHIDAS}
                desenho={DesenhoFolhas}
              />
            </div>
          )}

          {(fase === 'pdf' || fase === 'enviar' || fase === 'preco') && (
            <>
              <p className="cota mb-3 uppercase">
                {fase === 'pdf'
                  ? t.desenho.pdfGerado
                  : fase === 'enviar'
                    ? t.desenho.prontoCliente
                    : t.desenho.oOrcamento}
              </p>
              <Documento />
            </>
          )}
        </div>

        {/* ── o painel ────────────────────────────────────────────────── */}
        <div ref={painel} className="flex scroll-mt-[118px] flex-col justify-center px-5 py-7 sm:px-7">
          {fase === 'vao' && (
            <>
              <p className="cota uppercase">{t.vao.selo}</p>
              <h3 className="display mt-2 text-[24px]">
                {t.vao.titulo(t.obra.vao, `${VAO.l} × ${VAO.a} mm`)}
              </h3>
              <p className="mt-3 text-[14.5px] leading-[1.55] text-dim">{t.vao.texto}</p>
              <ul className="mt-6 space-y-2.5">
                {[
                  /* Sobraram duas linhas.
                     "Diagonais 1.947 e 1.951 mm" e "2 imagens anexadas" eram
                     a tela mais complexa do site, e no celular apareciam ANTES
                     de qualquer coisa se mexer. Quem é do ramo entende
                     diagonal; quem está decidindo se testa um software, não —
                     e esta é a primeira tela que ele encontra. */
                  [t.vao.ficha.vao, `${VAO.l} × ${VAO.a} mm`],
                  [t.vao.ficha.parede, t.obra.parede],
                ].map(([a, b]) => (
                  <li key={a} className="flex items-baseline justify-between gap-4">
                    <span className="text-[14px] text-dim">{a}</span>
                    <span className="font-mono text-[13px] font-bold text-ink">{b}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[14px] font-bold leading-snug text-ink">{t.vao.chamada}</p>
            </>
          )}

          {(fase === 'medindo' || fase === 'tipo' || fase === 'folhas') && (
            <Ficha t={t} fase={fase} />
          )}

          {fase === 'montando' && (
            <>
              <p className="cota uppercase">{t.montando.selo}</p>
              <h3 className="display mt-2 text-[24px]">{t.montando.titulo}</h3>
              <ul className="mt-5 space-y-2.5">
                {[
                  t.montando.linhas.folhas,
                  t.montando.linhas.folga(FOLGA_LARGURA, SOBREPOSICAO),
                  t.montando.linhas.somando,
                  t.montando.linhas.precos,
                ].map((linha, i) => (
                  <li
                    key={linha}
                    className="sobe flex items-center gap-2.5 text-[14px] text-dim"
                    style={{ animationDelay: `${i * 380}ms` }}
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
                    {linha}
                  </li>
                ))}
              </ul>
              <span aria-hidden="true" className="mt-6 block h-[5px] overflow-hidden rounded-full bg-line">
                <span
                  className="enche block h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg,#0e8c6a,#0e7b9c)',
                    ['--dur']: `${TEMPO.montando}ms`,
                  }}
                />
              </span>
            </>
          )}

          {(fase === 'orcamento' || fase === 'gerando') && (
            <>
              <p className="cota uppercase">{t.lista.selo(NUMERO)}</p>
              <h3 className="display mt-2 text-[24px]">{t.lista.titulo}</h3>

              <ul className="mt-5 divide-y divide-line border-y border-line">
                {ITENS.map((i, n) => (
                  <li
                    key={i.chave}
                    className="sobe flex items-baseline justify-between gap-4 py-2.5"
                    style={{ animationDelay: `${140 + n * 190}ms` }}
                  >
                    <span className="min-w-0">
                      <span className="block text-[13.5px] font-bold leading-tight text-ink">
                        {t.itens[i.chave].nome}
                      </span>
                      <span className="cota block normal-case leading-tight">
                        {detalheDe(t, i)}
                      </span>
                    </span>
                    <span className="shrink-0 font-mono text-[13.5px] font-bold text-ink">
                      {brl(i.valor)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex items-baseline justify-between gap-4">
                <span className="cota uppercase">{t.lista.total}</span>
                <span className="display text-[30px] leading-none text-verde">
                  {brl(fase === 'orcamento' ? total : TOTAL)}
                </span>
              </div>

              <p className="mt-5 text-[13.5px] leading-snug text-dim">
                {t.lista.rodape(num(M2), ITENS.length)}
              </p>
            </>
          )}

          {fase === 'gerando' && (
            <span aria-hidden="true" className="mt-5 block h-[5px] overflow-hidden rounded-full bg-line">
              <span
                className="enche block h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg,#0e8c6a,#0e7b9c)',
                  ['--dur']: `${TEMPO.gerando}ms`,
                }}
              />
            </span>
          )}

          {fase === 'pdf' && (
            <>
              <p className="cota uppercase">{t.pdf.selo}</p>
              <h3 className="display mt-2 text-[24px]">{t.pdf.titulo}</h3>
              <p className="mt-3 text-[14.5px] leading-[1.55] text-dim">{t.pdf.texto}</p>
              <ul className="mt-6 space-y-2.5">
                {[
                  t.pdf.linhas.logo,
                  t.pdf.linhas.prazo,
                  t.pdf.linhas.assinatura,
                  t.pdf.linhas.via,
                ].map((linha, i) => (
                  <li
                    key={linha}
                    className="sobe flex items-center gap-2.5 text-[14px] text-dim"
                    style={{ animationDelay: `${i * 130}ms` }}
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
                    {linha}
                  </li>
                ))}
              </ul>
            </>
          )}

          {fase === 'enviar' && (
            <>
              <p className="cota uppercase" style={{ color: '#0e8c6a', opacity: 1 }}>
                {t.enviar.selo}
              </p>
              <p className="display bate mt-2 text-[clamp(32px,4.2vw,44px)] leading-[1.04]">
                {t.enviar.toques}
                <span className="marca">
                  {noTempo ? t.enviar.segundos(segundos) : t.enviar.semTempo}
                </span>
              </p>
              <p className="mt-3 text-[14.5px] leading-[1.55] text-dim">
                {noTempo ? t.enviar.textoTempo : t.enviar.textoSemTempo}
              </p>

              <p className="cota mt-7 uppercase">{t.enviar.escolha}</p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {CANAIS.map(([chave, cor], i) => (
                  <span
                    key={chave}
                    className="sobe rounded-full border px-4 py-2 text-[13px] font-bold"
                    style={{
                      borderColor: `${cor}44`,
                      color: cor,
                      background: `${cor}0f`,
                      animationDelay: `${140 + i * 110}ms`,
                    }}
                  >
                    {t.enviar.canais[chave]}
                  </span>
                ))}
              </div>

              <p
                className="sobe mt-7 text-[15.5px] font-bold leading-[1.45] text-ink"
                style={{ animationDelay: '520ms' }}
              >
                {t.enviar.aprovar}
              </p>
              <p
                className="sobe mt-3 text-[14px] leading-[1.55] text-dim"
                style={{ animationDelay: '620ms' }}
              >
                {t.enviar.ninguem}
              </p>
            </>
          )}

          {fase === 'preco' && (
            <>
              <p className="cota uppercase">{t.preco.selo}</p>
              <p className="bate mt-2 flex items-baseline gap-2">
                <span className="display text-[clamp(44px,5.6vw,60px)] leading-none">{preco}</span>
                <span className="text-[16px] font-bold text-dim">{t.preco.porMes}</span>
              </p>
              <p className="mt-3 text-[15px] font-bold text-ink">{t.preco.porVidracaria}</p>

              {/* A conta que o visitante faz sozinho, feita para ele. */}
              <div
                className="sobe mt-6 rounded-[16px] px-5 py-4"
                style={{ background: 'rgba(14,140,106,.08)', animationDelay: '260ms' }}
              >
                {/* O valor chega formatado: a frase não escreve moeda. */}
                <p className="text-[15px] leading-[1.5] text-ink">
                  {t.preco.conta(brl(TOTAL))}{' '}
                  <strong className="font-extrabold">{t.preco.contaEnfase}</strong>
                </p>
                {mesesPagos >= 2 && (
                  <p className="display mt-2.5 text-[19px] leading-tight text-verde">
                    {t.preco.pagaMeses(mesesPagos)}
                  </p>
                )}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {NAO_COBRAMOS.map((chave, i) => (
                  <span
                    key={chave}
                    className="sobe rounded-full border border-line px-3.5 py-1.5 text-[12.5px] font-bold text-dim"
                    style={{ animationDelay: `${380 + i * 100}ms` }}
                  >
                    {t.preco.naoCobramos[chave]}
                  </span>
                ))}
              </div>

              <p
                className="sobe mt-6 text-[14px] leading-[1.55] text-dim"
                style={{ animationDelay: '700ms' }}
              >
                {diasTeste > 0 ? t.preco.teste(diasTeste) : t.preco.semTeste}
              </p>
            </>
          )}
        </div>
      </div>

      {/* ── a barra de ação ─────────────────────────────────────────────── */}
      <div className="demo-acao flex flex-wrap items-center gap-3 border-t border-line bg-soft/40 px-5 py-4 sm:px-7">
        {fase === 'vao' && (
          <button type="button" onClick={usarVao} className="botao-marca px-7 py-3.5 text-[15px]">
            {t.botoes.usarVao}
          </button>
        )}

        {(fase === 'medindo' ||
          fase === 'tipo' ||
          fase === 'folhas' ||
          fase === 'montando' ||
          fase === 'orcamento' ||
          fase === 'gerando') && (
          <span className="botao-marca inline-flex items-center gap-2.5 px-7 py-3.5 text-[15px] opacity-70">
            <i
              aria-hidden="true"
              className="h-2 w-2 animate-pulse rounded-full"
              style={{ background: '#fff' }}
            />
            {fase === 'gerando' ? t.botoes.gerando : t.botoes.montando}
          </span>
        )}

        {fase === 'pdf' && (
          <button type="button" onClick={enviar} className="botao-marca px-7 py-3.5 text-[15px]">
            {t.botoes.enviar}
          </button>
        )}

        {fase === 'enviar' &&
          (preco ? (
            <button
              type="button"
              onClick={verPreco}
              className="botao-marca px-7 py-3.5 text-[15px]"
            >
              {t.botoes.naObra}
            </button>
          ) : (
            <a
              href={linkAgendar(c.whatsapp.demonstracao)}
              target={ehExterno(linkAgendar(c.whatsapp.demonstracao)) ? '_blank' : undefined}
              rel={ehExterno(linkAgendar(c.whatsapp.demonstracao)) ? 'noreferrer' : undefined}
              onClick={() => evento('agendar', { origem: 'ferramenta-orcamento' })}
              className="botao-marca px-7 py-3.5 text-[15px]"
            >
              {t.botoes.naObra}
            </a>
          ))}

        {fase === 'preco' && (
          <>
            <a
              href={comecar.href}
              target={comecar.externo ? '_blank' : undefined}
              rel={comecar.externo ? 'noreferrer' : undefined}
              onClick={() => evento('comecar', { origem: 'ferramenta-orcamento' })}
              className="botao-marca px-7 py-3.5 text-[15px]"
            >
              {comecar.rotulo}
            </a>
            <a
              href="#preco"
              className="rounded-[13px] border border-line bg-card px-6 py-3.5 text-[14.5px] font-bold text-ink transition-colors hover:border-verde hover:text-verde"
            >
              {t.botoes.incluido}
            </a>
            <button
              type="button"
              onClick={recomecar}
              className="cota uppercase underline decoration-line underline-offset-4 transition-colors hover:text-verde"
            >
              {t.botoes.denovo}
            </button>
          </>
        )}

        {fase === 'enviar' && (
          <>
            <a
              href={linkWhatsapp(resumoZap)}
              target="_blank"
              rel="noreferrer"
              onClick={() => evento('whatsapp', { origem: 'ferramenta-orcamento' })}
              className="rounded-[13px] border border-line bg-card px-6 py-3.5 text-[14.5px] font-bold text-ink transition-colors hover:border-verde hover:text-verde"
            >
              {t.botoes.zap}
            </a>
            <button
              type="button"
              onClick={recomecar}
              className="cota uppercase underline decoration-line underline-offset-4 transition-colors hover:text-verde"
            >
              {t.botoes.denovo}
            </button>
          </>
        )}

        {/* Na tela do preço a ressalva tem que mudar: senão o visitante lê
            "valores de exemplo" e acha que a mensalidade também é chute. */}
        <p className="cota ml-auto max-w-[32ch] normal-case leading-snug">
          {fase === 'preco' ? t.nota.preco : t.nota.padrao}
        </p>
      </div>
    </div>
  )
}
