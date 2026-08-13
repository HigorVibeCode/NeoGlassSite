import { useEffect, useRef, useState } from 'react'
import { Simbolo } from '../components/Marca.jsx'
import { CONFIG, acaoComecar, ehExterno, linkAgendar, linkWhatsapp, precoVidracaria, valorMensal } from '../config.js'
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

/* ── o desenho: a parede, o vão e a janela ───────────────────────────────── */

const P = { W: 2680, H: 1880, x: 400, y: 340 }

function Parede({ comJanela, medindo }) {
  const t = useTextos().demos.orcamento.desenho
  return (
    <svg viewBox={`0 0 ${P.W} ${P.H}`} className="block w-full" role="img" aria-label={t.aria}>
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
            {t.janela}
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
            {t.medindo}
          </text>
        </g>
      )}
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

const TEMPO = { montando: 1700, preenchendo: 1500, gerando: 1200 }

// Só a chave e a cor: a frase de cada uma vem do módulo de textos.
const NAO_COBRAMOS = ['implantacao', 'orcamento', 'fidelidade']

const CANAIS = [
  ['whatsapp', '#0e8c6a'],
  ['email', '#0e7b9c'],
  ['pdf', '#7c6ad6'],
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
  const { idioma, c } = useIdioma()
  const t = c.demos.orcamento
  const preco = precoVidracaria(idioma)
  const { diasTeste } = CONFIG.vidracaria
  const comecar = acaoComecar(idioma, c)
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
    fase === 'vao' || fase === 'montando'
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

      <div className="grid lg:grid-cols-[minmax(0,1.12fr)_minmax(0,1fr)]">
        {/* ── o palco ─────────────────────────────────────────────────── */}
        <div className="demo-palco border-b border-line bg-soft/30 px-5 py-6 sm:px-7 lg:border-b-0 lg:border-r">
          {(fase === 'vao' || fase === 'montando') && (
            <>
              <p className="cota mb-2 uppercase">
                {fase === 'vao' ? t.desenho.vaoMedido : t.desenho.montando}
              </p>
              <Parede comJanela={fase === 'montando'} medindo={fase === 'montando'} />
            </>
          )}

          {(fase === 'orcamento' || fase === 'gerando') && (
            <>
              <p className="cota mb-2 uppercase">{t.desenho.janelaDoVao}</p>
              <Parede comJanela />
            </>
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
                  [t.vao.ficha.vao, `${VAO.l} × ${VAO.a} mm`],
                  [t.vao.ficha.parede, t.obra.parede],
                  [t.vao.ficha.esquadro, t.vao.ficha.esquadroValor],
                  [t.vao.ficha.foto, t.vao.ficha.fotoValor],
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

        {(fase === 'montando' || fase === 'gerando') && (
          <span className="botao-marca inline-flex items-center gap-2.5 px-7 py-3.5 text-[15px] opacity-70">
            <i
              aria-hidden="true"
              className="h-2 w-2 animate-pulse rounded-full"
              style={{ background: '#fff' }}
            />
            {fase === 'montando' ? t.botoes.montando : t.botoes.gerando}
          </span>
        )}

        {fase === 'orcamento' && (
          <button
            type="button"
            onClick={gerarPdf}
            className="botao-marca px-7 py-3.5 text-[15px]"
            style={{ background: 'linear-gradient(90deg,#0e7b9c,#0e8c6a)' }}
          >
            {t.botoes.gerarPdf}
          </button>
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
