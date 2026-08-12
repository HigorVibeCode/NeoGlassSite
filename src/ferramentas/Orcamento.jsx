import { useEffect, useRef, useState } from 'react'
import { Simbolo } from '../components/Marca.jsx'
import { CONFIG, acaoComecar, ehExterno, linkAgendar, linkWhatsapp, precoVidracaria } from '../config.js'
import { evento } from '../lib/rastreio.js'
import { semMovimento } from '../lib/dispositivo.js'

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

const VAO = { l: 1600, a: 1200, nome: 'Janela de sala', parede: 'alvenaria' }

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

const ITENS = [
  {
    nome: 'Vidro temperado 6 mm incolor',
    detalhe: `2 folhas · ${FOLHA.l} × ${FOLHA.a} mm · ${M2.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} m²`,
    valor: Math.round(M2 * PRECO_M2),
  },
  {
    nome: 'Kit de correr',
    detalhe: 'trilho superior e inferior, roldanas, fecho',
    valor: 285,
  },
  { nome: 'Perfil, borracha e acabamento', detalhe: 'vedação e arremate do vão', valor: 95 },
  { nome: 'Instalação e vedação', detalhe: 'mão de obra, 1 diária · deslocamento', valor: 380 },
]

const TOTAL = ITENS.reduce((s, i) => s + i.valor, 0)

/** O total do orçamento de exemplo. A seção de preço compara contra ele. */
export const ORCAMENTO_EXEMPLO = TOTAL

const brl = (n) =>
  n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
const num = (n, c = 2) =>
  n.toLocaleString('pt-BR', { minimumFractionDigits: c, maximumFractionDigits: c })

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

/* ── o desenho: a parede, o vão e a janela ───────────────────────────────── */

const P = { W: 2680, H: 1880, x: 400, y: 340 }

function Parede({ comJanela, medindo }) {
  return (
    <svg viewBox={`0 0 ${P.W} ${P.H}`} className="block w-full" role="img" aria-label="O vão medido na obra">
      <defs>
        <pattern id="orc-tijolo" width="150" height="150" patternUnits="userSpaceOnUse">
          <rect width="150" height="150" fill="#eef0f3" />
          <path d="M0 150 L150 0 M-40 40 L40 -40 M110 190 L190 110" stroke="#e0e4ea" strokeWidth="9" />
        </pattern>
        <linearGradient id="orc-vidro" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#dff0f4" stopOpacity="0.92" />
          <stop offset="0.5" stopColor="#f4fbfc" stopOpacity="0.8" />
          <stop offset="1" stopColor="#cfe6ee" stopOpacity="0.88" />
        </linearGradient>
      </defs>

      <rect width={P.W} height={P.H} fill="url(#orc-tijolo)" />

      {/* o vão */}
      <rect x={P.x} y={P.y} width={VAO.l} height={VAO.a} fill="#fbfdfd" />
      <rect
        x={P.x}
        y={P.y}
        width={VAO.l}
        height={VAO.a}
        fill="none"
        stroke="#9aa8b6"
        strokeWidth="12"
      />

      {comJanela && (
        <g className="surge">
          {/* marco */}
          <rect
            x={P.x + 5}
            y={P.y + 10}
            width={VAO.l - 10}
            height={VAO.a - 20}
            fill="none"
            stroke="#5d6b78"
            strokeWidth="26"
          />
          {/* folha fixa */}
          <g className="surge" style={{ animationDelay: '160ms' }}>
            <rect
              x={P.x + 18}
              y={P.y + 23}
              width={FOLHA.l - 26}
              height={FOLHA.a - 26}
              fill="url(#orc-vidro)"
              stroke="#7d8b98"
              strokeWidth="14"
            />
          </g>
          {/* folha móvel, sobreposta */}
          <g className="surge" style={{ animationDelay: '340ms' }}>
            <rect
              x={P.x + VAO.l - FOLHA.l - 8}
              y={P.y + 34}
              width={FOLHA.l - 26}
              height={FOLHA.a - 26}
              fill="url(#orc-vidro)"
              stroke="#5d6b78"
              strokeWidth="16"
            />
            <rect
              x={P.x + VAO.l - FOLHA.l + 30}
              y={P.y + VAO.a / 2 - 90}
              width="22"
              height="180"
              rx="11"
              fill="#5d6b78"
            />
          </g>
          <text
            x={P.x + VAO.l / 2}
            y={P.y + VAO.a + 130}
            textAnchor="middle"
            fontSize="86"
            fontFamily="IBM Plex Mono, monospace"
            fontWeight="600"
            fill="#0e8c6a"
          >
            2 folhas de correr · 6 mm
          </text>
        </g>
      )}

      {/* as cotas */}
      <g stroke="#0e8c6a" strokeWidth="7" fill="none">
        <line x1={P.x} y1={P.y - 130} x2={P.x + VAO.l} y2={P.y - 130} />
        <line x1={P.x} y1={P.y - 175} x2={P.x} y2={P.y - 85} />
        <line x1={P.x + VAO.l} y1={P.y - 175} x2={P.x + VAO.l} y2={P.y - 85} />
        <line x1={P.x + VAO.l + 130} y1={P.y} x2={P.x + VAO.l + 130} y2={P.y + VAO.a} />
        <line x1={P.x + VAO.l + 85} y1={P.y} x2={P.x + VAO.l + 175} y2={P.y} />
        <line x1={P.x + VAO.l + 85} y1={P.y + VAO.a} x2={P.x + VAO.l + 175} y2={P.y + VAO.a} />
      </g>
      <text
        x={P.x + VAO.l / 2}
        y={P.y - 175}
        textAnchor="middle"
        fontSize="96"
        fontFamily="IBM Plex Mono, monospace"
        fontWeight="600"
        fill="#0e8c6a"
      >
        {VAO.l}
      </text>
      <text
        x={P.x + VAO.l + 200}
        y={P.y + VAO.a / 2}
        dominantBaseline="central"
        fontSize="96"
        fontFamily="IBM Plex Mono, monospace"
        fontWeight="600"
        fill="#0e8c6a"
      >
        {VAO.a}
      </text>

      {medindo && (
        <g className="surge" style={{ animationDelay: '120ms' }}>
          <rect
            x={P.x + VAO.l / 2 - 470}
            y={P.y + VAO.a / 2 - 78}
            width="940"
            height="156"
            rx="78"
            fill="#ffffff"
            fillOpacity="0.94"
            stroke="#0e8c6a"
            strokeWidth="8"
          />
          <text
            x={P.x + VAO.l / 2}
            y={P.y + VAO.a / 2}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="86"
            fontFamily="IBM Plex Mono, monospace"
            fontWeight="600"
            fill="#0e8c6a"
          >
            conferindo esquadro…
          </text>
        </g>
      )}
    </svg>
  )
}

/* ── o PDF que o cliente recebe ──────────────────────────────────────────── */

function Documento({ compacto = false }) {
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
            <p className="text-[13px] font-extrabold leading-tight text-ink">Sua Vidraçaria</p>
            <p className="cota normal-case leading-tight">a sua marca, o seu telefone</p>
          </div>
        </div>
        <div className="text-right">
          <p className="cota uppercase">Orçamento</p>
          <p className="font-mono text-[13px] font-bold text-ink">26-0918</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap justify-between gap-3">
        <div>
          <p className="cota uppercase">Cliente</p>
          <p className="text-[13px] font-bold text-ink">Marcos Ribeiro</p>
        </div>
        <div>
          <p className="cota uppercase">Serviço</p>
          <p className="text-[13px] font-bold text-ink">
            {VAO.nome} · {VAO.l}×{VAO.a}
          </p>
        </div>
      </div>

      <table className="mt-4 w-full border-collapse">
        <tbody>
          {ITENS.map((i) => (
            <tr key={i.nome} className="border-t border-line">
              <td className="py-2 pr-3 align-top">
                <span className="block text-[12.5px] font-bold leading-tight text-ink">
                  {i.nome}
                </span>
                <span className="cota block normal-case leading-tight">{i.detalhe}</span>
              </td>
              <td className="whitespace-nowrap py-2 text-right align-top font-mono text-[12.5px] font-bold text-ink">
                {brl(i.valor)}
              </td>
            </tr>
          ))}
          <tr className="border-t-2 border-ink/15">
            <td className="pt-3 text-[13px] font-extrabold text-ink">Total</td>
            <td className="pt-3 text-right">
              <span className="display text-[22px] leading-none text-verde">{brl(TOTAL)}</span>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="mt-4 flex flex-wrap items-end justify-between gap-4 border-t border-line pt-3">
        <p className="cota max-w-[24ch] normal-case leading-snug">
          Validade de 10 dias · prazo de 7 dias úteis após aprovação
        </p>
        <span className="min-w-[110px]">
          <span aria-hidden="true" className="block border-b border-ink/30 pb-4" />
          <span className="cota mt-1 block text-center normal-case">assinatura do cliente</span>
        </span>
      </div>
    </div>
  )
}

/* ── o quadro ────────────────────────────────────────────────────────────── */

const TEMPO = { montando: 1700, preenchendo: 1500, gerando: 1200 }

const NAO_COBRAMOS = ['Sem implantação', 'Sem custo por usuário', 'Sem fidelidade']

const CANAIS = [
  ['WhatsApp', '#0e8c6a'],
  ['E-mail', '#0e7b9c'],
  ['Baixar PDF', '#7c6ad6'],
]

export default function Orcamento() {
  const [fase, setFase] = useState('vao')
  const [segundos, setSegundos] = useState(0)
  const relogio = useRef(0)
  const inicio = useRef(0)

  useEffect(() => () => clearTimeout(relogio.current), [])

  const daqui = (proxima, espera) => {
    clearTimeout(relogio.current)
    if (semMovimento()) return setFase(proxima)
    relogio.current = setTimeout(() => setFase(proxima), espera)
  }

  const usarVao = () => {
    evento('ferramenta', { qual: 'orcamento', passo: 'usar-vao' })
    inicio.current = Date.now()
    setFase('montando')
    daqui('orcamento', TEMPO.montando)
  }

  const gerarPdf = () => {
    evento('ferramenta', { qual: 'orcamento', passo: 'gerar-pdf' })
    setFase('gerando')
    daqui('pdf', TEMPO.gerando)
  }

  const enviar = () => {
    evento('ferramenta', { qual: 'orcamento', passo: 'enviar' })
    setSegundos(Math.max(1, Math.round((Date.now() - inicio.current) / 1000)))
    setFase('enviar')
  }

  const recomecar = () => {
    clearTimeout(relogio.current)
    setSegundos(0)
    setFase('vao')
  }

  // O quarto degrau. Enquanto não houver preço decidido, ele não existe e o
  // botão volta a ser o link de sempre.
  const preco = precoVidracaria()
  const { diasTeste } = CONFIG.vidracaria
  const comecar = acaoComecar()
  const mesesPagos = preco ? Math.floor(TOTAL / CONFIG.vidracaria.precoMensal) : 0
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

  const passos = preco ? 4 : 3
  const passo =
    fase === 'vao' || fase === 'montando'
      ? 1
      : fase === 'orcamento' || fase === 'gerando'
        ? 2
        : fase === 'preco'
          ? 4
          : 3

  const resumoZap = [
    `Orçamento 26-0918 — ${VAO.nome} ${VAO.l}×${VAO.a} mm`,
    ...ITENS.map((i) => `• ${i.nome}: ${brl(i.valor)}`),
    `Total: ${brl(TOTAL)}`,
    '',
    'Montado na demonstração do site do NeoGlass.',
  ].join('\n')

  return (
    <div className="demo rounded-[24px] lg:overflow-hidden border border-line bg-card shadow-[0_36px_70px_-46px_rgba(20,55,80,.4)]">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-line bg-soft/60 px-5 py-3 sm:px-7">
        <span className="flex items-center gap-2.5">
          <Simbolo className="h-6 w-6 rounded-[7px]" />
          <span className="text-[14px] font-extrabold tracking-[-0.015em] text-ink">
            NeoGlass no celular · na obra
          </span>
        </span>
        <span className="cota rounded-full border border-line bg-card px-3 py-1 uppercase">
          Cliente Marcos Ribeiro
        </span>
        <span className="cota ml-auto uppercase">Passo {passo} de {passos}</span>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1.12fr)_minmax(0,1fr)]">
        {/* ── o palco ─────────────────────────────────────────────────── */}
        <div className="demo-palco border-b border-line bg-soft/30 px-5 py-6 sm:px-7 lg:border-b-0 lg:border-r">
          {(fase === 'vao' || fase === 'montando') && (
            <>
              <p className="cota mb-2 uppercase">
                {fase === 'vao' ? 'Vão medido na obra' : 'Montando a janela no vão'}
              </p>
              <Parede comJanela={fase === 'montando'} medindo={fase === 'montando'} />
            </>
          )}

          {(fase === 'orcamento' || fase === 'gerando') && (
            <>
              <p className="cota mb-2 uppercase">A janela deste vão</p>
              <Parede comJanela />
            </>
          )}

          {(fase === 'pdf' || fase === 'enviar' || fase === 'preco') && (
            <>
              <p className="cota mb-3 uppercase">
                {fase === 'pdf'
                  ? 'PDF gerado'
                  : fase === 'enviar'
                    ? 'Pronto para o cliente'
                    : 'O orçamento que você acabou de montar'}
              </p>
              <Documento />
            </>
          )}
        </div>

        {/* ── o painel ────────────────────────────────────────────────── */}
        <div ref={painel} className="flex scroll-mt-[118px] flex-col justify-center px-5 py-7 sm:px-7">
          {fase === 'vao' && (
            <>
              <p className="cota uppercase">O que você fez na obra</p>
              <h3 className="display mt-2 text-[24px]">
                {VAO.nome} · {VAO.l} × {VAO.a} mm
              </h3>
              <p className="mt-3 text-[14.5px] leading-[1.55] text-dim">
                Foto do vão, duas medidas, o tipo de parede. Trinta segundos com o celular na mão —
                é tudo o que o sistema pede de você.
              </p>
              <ul className="mt-6 space-y-2.5">
                {[
                  ['Vão', `${VAO.l} × ${VAO.a} mm`],
                  ['Parede', VAO.parede],
                  ['Esquadro', 'conferido no ato'],
                  ['Foto', '2 imagens anexadas'],
                ].map(([a, b]) => (
                  <li key={a} className="flex items-baseline justify-between gap-4">
                    <span className="text-[14px] text-dim">{a}</span>
                    <span className="font-mono text-[13px] font-bold text-ink">{b}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[14px] font-bold leading-snug text-ink">
                Agora aperte o botão. Você não vai digitar mais nada.
              </p>
            </>
          )}

          {fase === 'montando' && (
            <>
              <p className="cota uppercase">Montando</p>
              <h3 className="display mt-2 text-[24px]">Cabendo a janela na sua medida…</h3>
              <ul className="mt-5 space-y-2.5">
                {[
                  'Escolhendo 2 folhas de correr para este vão',
                  `Descontando ${FOLGA_LARGURA} mm de folga e ${SOBREPOSICAO} mm de sobreposição`,
                  'Somando trilho, roldanas, fecho e vedação',
                  'Puxando os preços da sua tabela',
                ].map((t, i) => (
                  <li
                    key={t}
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
                    {t}
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
              <p className="cota uppercase">Orçamento 26-0918</p>
              <h3 className="display mt-2 text-[24px]">Pronto, sem você digitar nada.</h3>

              <ul className="mt-5 divide-y divide-line border-y border-line">
                {ITENS.map((i, n) => (
                  <li
                    key={i.nome}
                    className="sobe flex items-baseline justify-between gap-4 py-2.5"
                    style={{ animationDelay: `${140 + n * 190}ms` }}
                  >
                    <span className="min-w-0">
                      <span className="block text-[13.5px] font-bold leading-tight text-ink">
                        {i.nome}
                      </span>
                      <span className="cota block normal-case leading-tight">{i.detalhe}</span>
                    </span>
                    <span className="shrink-0 font-mono text-[13.5px] font-bold text-ink">
                      {brl(i.valor)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex items-baseline justify-between gap-4">
                <span className="cota uppercase">Total para o cliente</span>
                <span className="display text-[30px] leading-none text-verde">
                  {brl(fase === 'orcamento' ? total : TOTAL)}
                </span>
              </div>

              <p className="mt-5 text-[13.5px] leading-snug text-dim">
                {num(M2)} m² de vidro, 4 itens, nenhuma conta feita de cabeça. Os preços vêm da sua
                tabela — estes aqui são só exemplo.
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
              <p className="cota uppercase">Documento pronto</p>
              <h3 className="display mt-2 text-[24px]">Com a sua marca, não com a nossa.</h3>
              <p className="mt-3 text-[14.5px] leading-[1.55] text-dim">
                Logo, telefone, validade, prazo e a linha da assinatura. É este papel que faz o
                cliente enxergar empresa em vez de improviso — e ele saiu sozinho.
              </p>
              <ul className="mt-6 space-y-2.5">
                {[
                  'A sua logo e os seus dados no cabeçalho',
                  'Validade e prazo de entrega escritos',
                  'Assinatura na tela ou no papel',
                  'Uma via arquivada no pedido, para sempre',
                ].map((t, i) => (
                  <li
                    key={t}
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
                    {t}
                  </li>
                ))}
              </ul>
            </>
          )}

          {fase === 'enviar' && (
            <>
              <p className="cota uppercase" style={{ color: '#0e8c6a', opacity: 1 }}>
                Simples assim
              </p>
              <p className="display bate mt-2 text-[clamp(32px,4.2vw,44px)] leading-[1.04]">
                3 toques
                <span className="marca">
                  {segundos > 0 && segundos <= 90 ? ` e ${segundos} segundos` : ', zero digitação'}
                </span>
              </p>
              <p className="mt-3 text-[14.5px] leading-[1.55] text-dim">
                {segundos > 0 && segundos <= 90
                  ? 'Foi o tempo que você levou agora, do vão ao orçamento pronto. Na obra é o mesmo caminho — com o cliente olhando.'
                  : 'Do vão ao orçamento pronto você não digitou uma medida sequer. Na obra é o mesmo caminho — com o cliente olhando.'}
              </p>

              <p className="cota mt-7 uppercase">Escolha por onde vai</p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {CANAIS.map(([nome, cor], i) => (
                  <span
                    key={nome}
                    className="sobe rounded-full border px-4 py-2 text-[13px] font-bold"
                    style={{
                      borderColor: `${cor}44`,
                      color: cor,
                      background: `${cor}0f`,
                      animationDelay: `${140 + i * 110}ms`,
                    }}
                  >
                    {nome}
                  </span>
                ))}
              </div>

              <p
                className="sobe mt-7 text-[15.5px] font-bold leading-[1.45] text-ink"
                style={{ animationDelay: '520ms' }}
              >
                E quando ele aprovar, o pedido já entra na produção com as medidas de corte.
              </p>
              <p
                className="sobe mt-3 text-[14px] leading-[1.55] text-dim"
                style={{ animationDelay: '620ms' }}
              >
                Ninguém redigita, ninguém liga para confirmar espessura, e o retalho que sobrar
                dessa chapa já volta para o seu estoque com medida.
              </p>
            </>
          )}

          {fase === 'preco' && (
            <>
              <p className="cota uppercase">Quanto custa</p>
              <p className="bate mt-2 flex items-baseline gap-2">
                <span className="display text-[clamp(44px,5.6vw,60px)] leading-none">{preco}</span>
                <span className="text-[16px] font-bold text-dim">/mês</span>
              </p>
              <p className="mt-3 text-[15px] font-bold text-ink">Por vidraçaria — não por pessoa.</p>

              {/* A conta que o visitante faz sozinho, feita para ele. */}
              <div
                className="sobe mt-6 rounded-[16px] px-5 py-4"
                style={{ background: 'rgba(14,140,106,.08)', animationDelay: '260ms' }}
              >
                <p className="text-[15px] leading-[1.5] text-ink">
                  O orçamento que você acabou de montar foi de{' '}
                  <strong className="font-extrabold">{brl(TOTAL)}</strong>. Era{' '}
                  <strong className="font-extrabold">uma janela</strong>.
                </p>
                {mesesPagos >= 2 && (
                  <p className="display mt-2.5 text-[19px] leading-tight text-verde">
                    Esse serviço sozinho paga {mesesPagos} meses de sistema.
                  </p>
                )}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {NAO_COBRAMOS.map((t, i) => (
                  <span
                    key={t}
                    className="sobe rounded-full border border-line px-3.5 py-1.5 text-[12.5px] font-bold text-dim"
                    style={{ animationDelay: `${380 + i * 100}ms` }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              <p
                className="sobe mt-6 text-[14px] leading-[1.55] text-dim"
                style={{ animationDelay: '700ms' }}
              >
                {diasTeste > 0
                  ? `São ${diasTeste} dias grátis, sem cartão. Você monta os orçamentos da semana e decide depois — se não decidir, nada é cobrado.`
                  : 'Sem fidelidade: se não servir para o seu dia, você cancela pela própria tela.'}
              </p>
            </>
          )}
        </div>
      </div>

      {/* ── a barra de ação ─────────────────────────────────────────────── */}
      <div className="demo-acao flex flex-wrap items-center gap-3 border-t border-line bg-soft/40 px-5 py-4 sm:px-7">
        {fase === 'vao' && (
          <button type="button" onClick={usarVao} className="botao-marca px-7 py-3.5 text-[15px]">
            Usar este vão
          </button>
        )}

        {(fase === 'montando' || fase === 'gerando') && (
          <span className="botao-marca inline-flex items-center gap-2.5 px-7 py-3.5 text-[15px] opacity-70">
            <i
              aria-hidden="true"
              className="h-2 w-2 animate-pulse rounded-full"
              style={{ background: '#fff' }}
            />
            {fase === 'montando' ? 'Montando…' : 'Gerando o PDF…'}
          </span>
        )}

        {fase === 'orcamento' && (
          <button
            type="button"
            onClick={gerarPdf}
            className="botao-marca px-7 py-3.5 text-[15px]"
            style={{ background: 'linear-gradient(90deg,#0e7b9c,#0e8c6a)' }}
          >
            Gerar PDF para o cliente
          </button>
        )}

        {fase === 'pdf' && (
          <button type="button" onClick={enviar} className="botao-marca px-7 py-3.5 text-[15px]">
            Enviar para o cliente
          </button>
        )}

        {fase === 'enviar' &&
          (preco ? (
            <button
              type="button"
              onClick={verPreco}
              className="botao-marca px-7 py-3.5 text-[15px]"
            >
              Quero isso na minha obra
            </button>
          ) : (
            <a
              href={linkAgendar()}
              target={ehExterno(linkAgendar()) ? '_blank' : undefined}
              rel={ehExterno(linkAgendar()) ? 'noreferrer' : undefined}
              onClick={() => evento('agendar', { origem: 'ferramenta-orcamento' })}
              className="botao-marca px-7 py-3.5 text-[15px]"
            >
              Quero isso na minha obra
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
              Ver tudo o que está incluído
            </a>
            <button
              type="button"
              onClick={recomecar}
              className="cota uppercase underline decoration-line underline-offset-4 transition-colors hover:text-verde"
            >
              rodar de novo
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
              Receber este orçamento no meu WhatsApp
            </a>
            <button
              type="button"
              onClick={recomecar}
              className="cota uppercase underline decoration-line underline-offset-4 transition-colors hover:text-verde"
            >
              rodar de novo
            </button>
          </>
        )}

        {/* Na tela do preço a ressalva tem que mudar: senão o visitante lê
            "valores de exemplo" e acha que a mensalidade também é chute. */}
        <p className="cota ml-auto max-w-[32ch] normal-case leading-snug">
          {fase === 'preco'
            ? 'Este é o preço, não uma faixa. Os valores do orçamento acima é que são de exemplo.'
            : 'Valores de exemplo. No sistema eles saem da sua tabela.'}
        </p>
      </div>
    </div>
  )
}
