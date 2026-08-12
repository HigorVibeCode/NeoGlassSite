import { useEffect, useRef, useState } from 'react'
import { clamp, useMedia, useReducedMotion } from '../lib/scroll.js'
import { quadrosPorSegundo } from '../lib/dispositivo.js'
import Palco from './Palco.jsx'
import { CENAS, PALCO, PALCO_MOVEL } from './cenas.js'
import { Feed, FeedAntigo, Antes, Simulacao, Checagem, FatiaChapa, Tela } from './conteudos.jsx'
import {
  PainelProducao,
  Etiqueta,
  Expedicao,
  NotaFiscal,
  Recebimento,
  Margem,
} from './conteudos2.jsx'

/**
 * As cenas que não dependem do relógio são criadas UMA vez, aqui fora. Assim o
 * React recebe exatamente o mesmo elemento a cada quadro, reconhece que nada
 * mudou e não desce naquele ramo — e são justamente os ramos mais pesados do
 * filme (o notebook, o tablet, o celular). Foi o que tirou o engasgo.
 */
const PARADOS = {
  feedAntigo1: <FeedAntigo nivel={1} />,
  feedAntigo2: <FeedAntigo nivel={2} />,
  antes: <Antes />,
  navegador: <Tela tipo="navegador" />,
  tablet: <Tela tipo="tablet" />,
  celular: <Tela tipo="celular" />,
}

function conteudoDe(chave, t) {
  if (PARADOS[chave]) return PARADOS[chave]
  switch (chave) {
    case 'feed':
      return <Feed t={t} />
    case 'simulacao':
      return <Simulacao t={t} />
    case 'checagem':
      return <Checagem t={t} />
    case 'chapa0':
      return <FatiaChapa t={t} indice={0} />
    case 'chapa1':
      return <FatiaChapa t={t} indice={1} />
    case 'chapa2':
      return <FatiaChapa t={t} indice={2} />
    case 'painel':
      return <PainelProducao t={t} />
    case 'etiqueta':
      return <Etiqueta t={t} />
    case 'expedicao':
      return <Expedicao t={t} />
    case 'nota':
      return <NotaFiscal t={t} />
    case 'recebimento':
      return <Recebimento t={t} />
    case 'margem':
      return <Margem t={t} />
    default:
      return null
  }
}

/** Liga quando a seção entra na tela e desliga quando sai. */
function useNaTela(ref, fatia = 0.35) {
  const [dentro, setDentro] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver((e) => setDentro(e[0].isIntersecting), {
      threshold: fatia,
    })
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref, fatia])
  return dentro
}

/**
 * O compasso de cada cena. Toda cena tem a mesma forma, independentemente de
 * quanto dura:
 *
 *   CHEGADA   as chapas se reorganizam. Nada acontece dentro delas ainda —
 *             conteúdo animando enquanto a chapa ainda voa vira sopa.
 *   AÇÃO      é aqui que a cena acontece. É este trecho que `t` percorre de
 *             0 a 1, então cada desenho corre no mesmo compasso.
 *   DESCANSO  o resultado fica parado antes do corte, para dar tempo de ler.
 */
const CHEGADA = 600
const DESCANSO = 450

/**
 * O filme. Ele toca sozinho: entrou na tela, começa da primeira cena e vai até
 * a última — e recomeça. Sai da tela, pausa onde estava. Clicar numa etapa
 * salta para ela.
 */
function useFilme(duracoes, ligado, reduzido) {
  const [{ i, ms }, setEstado] = useState({ i: 0, ms: 0 })
  const atual = useRef({ i, ms })
  atual.current = { i, ms }

  useEffect(() => {
    if (reduzido) return setEstado({ i: duracoes.length - 1, ms: duracoes[duracoes.length - 1] })
    if (!ligado) return

    // O filme é um desenho vetorial grande sendo remontado a cada quadro. A
    // sessenta quadros por segundo isso derruba celular antigo — e ninguém
    // percebe a diferença entre 60 e 30 num movimento deste tamanho. Então o
    // relógio avança o tempo real, mas só avisa o React na cadência que o
    // aparelho aguenta.
    const passoMinimo = 1000 / quadrosPorSegundo()
    let raf = 0
    let anterior = performance.now()
    let guardado = 0

    const passo = (agora) => {
      raf = requestAnimationFrame(passo)
      const dt = Math.min(120, agora - anterior)
      anterior = agora
      guardado += dt
      if (guardado < passoMinimo) return

      const salto = guardado
      guardado = 0
      const e = atual.current
      const avanco = e.ms + salto
      if (avanco >= duracoes[e.i]) {
        // fim da última cena: volta para a primeira e roda de novo
        setEstado({ i: (e.i + 1) % duracoes.length, ms: 0 })
      } else {
        setEstado({ i: e.i, ms: avanco })
      }
    }
    raf = requestAnimationFrame(passo)
    return () => cancelAnimationFrame(raf)
  }, [ligado, reduzido, duracoes])

  const duracao = duracoes[i]
  // `t` percorre só a janela de ação; `barra` percorre a cena inteira.
  const t = clamp((ms - CHEGADA) / Math.max(1, duracao - CHEGADA - DESCANSO))
  const barra = clamp(ms / duracao)

  return { i, t, barra, ir: (n) => setEstado({ i: n, ms: 0 }) }
}

function Medidor({ cena, t }) {
  if (!cena?.medidor) return null
  const { texto, k } = cena.medidor(t)
  return (
    <div className="inline-flex flex-col gap-2">
      <span
        className="inline-flex items-center gap-2 self-start rounded-full border px-3.5 py-1.5 font-mono text-[11.5px] font-bold tracking-[0.04em]"
        style={{ borderColor: `${cena.cor}33`, color: cena.cor, background: `${cena.cor}0f` }}
      >
        <i className="h-1.5 w-1.5 rounded-full" style={{ background: cena.cor }} aria-hidden="true" />
        {texto}
      </span>
      <span aria-hidden="true" className="h-[3px] w-[188px] overflow-hidden rounded-full bg-line">
        <span
          className="block h-full origin-left rounded-full"
          style={{ background: cena.cor, transform: `scaleX(${k})` }}
        />
      </span>
    </div>
  )
}

/**
 * A régua de etapas. Grade fixa — 2 colunas no celular, 3 no tablet, 6 no
 * computador — porque uma quebra automática deixava 4 em cima e 2 embaixo,
 * com as barras desalinhadas.
 */
function Trilha({ indice, t, ir }) {
  return (
    <ol className="grid grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-3 lg:grid-cols-6">
      {CENAS.map((c, n) => {
        const ativa = n === indice
        const passada = n < indice
        return (
          <li key={c.id} className="min-w-0">
            <button
              type="button"
              onClick={() => ir(n)}
              aria-current={ativa ? 'step' : undefined}
              className="group block w-full pb-2 pt-1 text-left"
            >
              <span aria-hidden="true" className="block h-[2px] w-full bg-line">
                <span
                  className="block h-full origin-left"
                  style={{
                    background: passada ? `${c.cor}59` : c.cor,
                    transform: `scaleX(${ativa ? t : passada ? 1 : 0})`,
                  }}
                />
              </span>
              <span
                className="cota mt-2.5 block truncate uppercase transition-colors"
                style={ativa ? { color: c.cor, opacity: 1 } : undefined}
              >
                <span className={ativa ? '' : 'group-hover:text-ink'}>
                  {String(n + 1).padStart(2, '0')} {c.etapa}
                </span>
              </span>
            </button>
          </li>
        )
      })}
    </ol>
  )
}

export default function Jornada() {
  const ref = useRef(null)
  const compacto = useMedia('(max-width: 767px)')
  const reduzido = useReducedMotion()
  const naTela = useNaTela(ref)
  const duracoes = useRef(CENAS.map((c) => c.duracao)).current
  const { i, t, barra, ir } = useFilme(duracoes, naTela, reduzido)

  const cena = CENAS[i]
  const espaco = compacto ? PALCO_MOVEL : PALCO
  const chapas = cena.formacao(t, compacto)

  return (
    <section
      ref={ref}
      data-jornada=""
      aria-label="Um pedido atravessando o sistema"
      className="mx-auto flex min-h-[100svh] w-full max-w-[1240px] flex-col gap-5 px-5 py-14 sm:px-8"
    >
      <div className="shrink-0">
        <div className="flex items-baseline justify-between gap-6 border-t border-line pt-3">
          <p className="cota uppercase">Um pedido, seis etapas · toca sozinho</p>
          <p className="cota shrink-0 opacity-70">FL. 02/06</p>
        </div>
        <h2 className="display mt-4 max-w-[26ch] text-[clamp(21px,3vw,38px)]">
          Um pedido inteiro, do celular na obra até a margem na tela.
        </h2>
      </div>

      <div className="shrink-0">
        <Trilha indice={i} t={barra} ir={ir} />
      </div>

      {/* o palco: as três chapas, sempre no centro. Altura mínima garantida —
          espremido entre o cabeçalho e o texto, o desenho ficava minúsculo. */}
      <div className="flex min-h-[360px] flex-1 sm:min-h-[420px]">
        <Palco
          espaco={espaco}
          chapas={chapas}
          chave={cena.id}
          nu={cena.nu ?? false}
          conteudo={(n) => conteudoDe(cena.conteudo[n], t)}
        />
      </div>

      {/* o que está acontecendo agora, embaixo do desenho */}
      <div className="flex shrink-0 flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
        <div className="relative h-[172px] shrink-0 sm:h-[104px] lg:h-[92px] lg:flex-1">
          {CENAS.map((c, n) => (
            <div
              key={c.id}
              aria-hidden={n !== i}
              className={`absolute inset-0 transition-all duration-500 ${
                n === i ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
              }`}
            >
              <h3 className="display text-[clamp(20px,2.2vw,28px)]">{c.titulo}</h3>
              <p className="mt-2 max-w-[74ch] text-[14.5px] leading-[1.5] text-dim sm:text-[15.5px]">
                {c.sub}
              </p>
            </div>
          ))}
        </div>

        <Medidor cena={cena} t={t} />
      </div>
    </section>
  )
}

export { CENAS }
