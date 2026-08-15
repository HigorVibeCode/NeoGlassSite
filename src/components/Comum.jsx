import { useEffect, useRef, useState } from 'react'
import Marca from './Marca.jsx'
import Formulario from './Formulario.jsx'
import Agenda from './Agenda.jsx'
import Idiomas from './Idiomas.jsx'
import { CONFIG, acaoComecar, ehExterno, linkAgendar, precoVidracaria } from '../config.js'
import { evento } from '../lib/rastreio.js'
import { useIdioma, useTextos } from '../i18n/idioma.jsx'
import { ROTAS_MENU, caminhoDe, destinoComecar } from '../lib/paginasSeo.js'

/** As seções sobem de leve quando entram na tela. */
export function Revelar({ children, atraso = 0, className = '', as: Tag = 'div', ...resto }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.style.transitionDelay = `${atraso}ms`
          el.classList.add('dentro')
          io.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [atraso])
  return (
    // `...resto` importa: sem ele o `id` das seções era engolido aqui, e as
    // âncoras (#preco, #agendar) não levavam a lugar nenhum.
    <Tag ref={ref} className={`revelar ${className}`} {...resto}>
      {children}
    </Tag>
  )
}

/**
 * O carimbo da prancha. Numa fábrica de vidro todo desenho tem um: o que é,
 * qual folha, de quantas. Aqui ele abre cada seção — é o índice do documento,
 * não enfeite.
 */
export function Bloco({ rotulo, folha, escuro = false }) {
  return (
    <div
      className={`flex items-baseline justify-between gap-6 border-t pt-3 ${
        escuro ? 'border-white/20' : 'border-line'
      }`}
    >
      <p className={`cota uppercase ${escuro ? 'text-menta/85' : ''}`}>{rotulo}</p>
      <p className={`cota shrink-0 ${escuro ? 'text-white/35' : 'opacity-70'}`}>{folha}</p>
    </div>
  )
}

export function Titulo({ children, className = '' }) {
  return (
    <h2 className={`display mt-7 text-[clamp(30px,4.4vw,54px)] ${className}`}>{children}</h2>
  )
}

export function Topo({ rota }) {
  const [preso, setPreso] = useState(false)
  // O botão do topo é um pedido, e pedido antes de entregar valor afasta. Ele
  // só entra em cena depois que o visitante passa da primeira tela — quando
  // já leu a promessa e começou a descer por vontade própria.
  const [passouCapa, setPassouCapa] = useState(false)
  // ...e ele some de novo quando o botão de verdade entra na tela. O botão do
  // topo existe para levar até o cadastro; com o cadastro à vista ele vira o
  // mesmo "Começar grátis · 14 dias" duas vezes na mesma tela.
  const [ctaAVista, setCtaAVista] = useState(false)
  const { id, idioma, ir, trocarIdioma } = rota
  const c = useTextos()

  // Na aba da vidraçaria o produto tem preço fixo e cadastro automático — o
  // botão do topo não pode continuar pedindo reunião. Nas outras abas a venda
  // é consultiva e o botão continua sendo o de sempre.
  const preco = precoVidracaria(idioma)
  const comecar =
    id === 'vidracaria' && preco ? destinoComecar(acaoComecar(idioma, c), idioma) : null
  const alvo = comecar ? comecar.href : linkAgendar(c.whatsapp.demonstracao)
  const rotuloCurto = comecar ? comecar.curto : c.chrome.verDemoCurto
  const rotuloLongo = comecar ? comecar.rotulo : c.chrome.verDemo

  useEffect(() => {
    const on = () => {
      setPreso(window.scrollY > 40)
      setPassouCapa(window.scrollY > window.innerHeight * 0.62)
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  // O alvo é o cartão final — preço na vidraçaria, chamada nas outras abas.
  // Refeito a cada troca de página, senão o observador ficaria olhando um
  // elemento que já saiu do documento.
  const [demoComCta, setDemoComCta] = useState(false)
  useEffect(() => {
    setCtaAVista(false)
    setDemoComCta(false)
    const alvo = document.querySelector('#preco') || document.querySelector('#agendar')
    if (!alvo) return
    const io = new IntersectionObserver(([e]) => setCtaAVista(e.isIntersecting), {
      rootMargin: '-90px 0px -20% 0px',
    })
    io.observe(alvo)
    return () => io.disconnect()
  }, [id, idioma])

  /* A demonstração da vidraçaria termina mostrando o próprio botão verde. Ela
     avisa por evento, e o botão do topo sai de cena enquanto aquele estiver
     lá — dois "Começar grátis" na mesma tela é o defeito que já foi corrigido
     uma vez e que renasceria aqui. O topo não teria como descobrir isso
     sozinho: o botão da demonstração só existe no último quadro. */
  useEffect(() => {
    const ouvir = (e) => setDemoComCta(Boolean(e.detail?.visivel))
    window.addEventListener('neoglass:cta-demo', ouvir)
    return () => window.removeEventListener('neoglass:cta-demo', ouvir)
  }, [])

  const abrir = (e, destino) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    ir(destino)
  }

  return (
    <header
      className={`vidro-topo fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        preso ? 'border-b border-line bg-bg/85 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-[56px] max-w-[1240px] items-center justify-between gap-2 px-5 sm:h-[68px] sm:gap-6 sm:px-8">
        <a
          href={caminhoDe('home', idioma)}
          onClick={(e) => abrir(e, 'home')}
          aria-label={c.chrome.inicio}
        >
          <Marca />
        </a>

        <nav aria-label={c.chrome.publicos} className="hidden items-center gap-1 lg:flex">
          {ROTAS_MENU.map((r) => (
            <a
              key={r.id}
              href={caminhoDe(r.id, idioma)}
              onClick={(e) => abrir(e, r.id)}
              aria-current={r.id === id ? 'page' : undefined}
              className={`rounded-[11px] px-3.5 py-2 text-[14.5px] font-bold transition-colors ${
                r.id === id ? 'bg-soft text-ink' : 'text-dim hover:text-ink'
              }`}
            >
              {c.paginas[r.id].nome}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-3">
          {comecar && (
            <a
              href="#preco"
              className="hidden items-center px-1 py-3 text-[14px] font-semibold text-dim transition-colors hover:text-ink md:flex"
            >
              {c.chrome.preco}
            </a>
          )}
          {/* O seletor entra antes do Entrar: quem caiu no idioma errado precisa
              resolver isso antes de qualquer outra coisa. Ele custa 26 px porque
              mostra o código, não a bandeira — ver Idiomas.jsx. */}
          <Idiomas idioma={idioma} pagina={id} aoTrocar={trocarIdioma} />
          <a
            href={CONFIG.login}
            className="hidden items-center px-1 py-3 text-[14px] font-semibold text-dim transition-colors hover:text-ink min-[420px]:flex"
          >
            {c.chrome.entrar}
          </a>
          {/* Na porta de entrada e na página de cadastro o botão do topo sai de
              cena. Nas duas ele competiria com a única coisa que aquela tela
              precisa que aconteça: escolher um lado, ou preencher o formulário.
              Duas saídas no mesmo momento é como se perde a que interessa. */}
          {id !== 'comecar' && id !== 'home' && passouCapa && !ctaAVista && !demoComCta && (
            <a
              href={alvo}
              target={ehExterno(alvo) ? '_blank' : undefined}
              rel={ehExterno(alvo) ? 'noreferrer' : undefined}
              onClick={() => evento(comecar ? 'comecar' : 'agendar', { origem: 'topo' })}
              className="botao-marca surge whitespace-nowrap px-3.5 py-2.5 text-[13.5px] transition-transform duration-200 hover:-translate-y-0.5 sm:px-5 sm:text-[14px]"
            >
              <span className="lg:hidden">{rotuloCurto}</span>
              <span className="hidden lg:inline">{rotuloLongo}</span>
            </a>
          )}
        </div>
      </div>

      {/* no celular as abas ganham a própria linha, largura cheia */}
      <nav
        aria-label={c.chrome.publicos}
        className={`grid grid-cols-3 border-t lg:hidden ${
          preso ? 'border-line' : 'border-line/60'
        }`}
      >
        {ROTAS_MENU.map((r) => (
          <a
            key={r.id}
            href={caminhoDe(r.id, idioma)}
            onClick={(e) => abrir(e, r.id)}
            aria-current={r.id === id ? 'page' : undefined}
            className={`cota flex min-h-[38px] items-center justify-center whitespace-nowrap border-b-2 px-1.5 text-center uppercase transition-colors ${
              r.id === id ? 'border-verde text-verde' : 'border-transparent'
            }`}
            style={r.id === id ? { opacity: 1 } : undefined}
          >
            {c.paginas[r.id].nome}
          </a>
        ))}
      </nav>
    </header>
  )
}

export function Origem({ folha = 'FL. 04/05' }) {
  const { origem } = useTextos()
  return (
    <section className="secao relative overflow-hidden bg-[#0f2530] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[8%] -top-[40%] h-[680px] w-[680px] rounded-full opacity-25"
        style={{ background: 'radial-gradient(circle, #0e8c6a, transparent 65%)' }}
      />
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #7fe0c8, transparent)' }}
      />

      <Revelar className="relative mx-auto max-w-[1240px] px-5 py-20 sm:px-8 sm:py-24">
        <Bloco rotulo={origem.rotulo} folha={folha} escuro />
        {/* A segunda metade era "e isso muda o que ele pergunta" — verdadeira,
            mas abstrata: o visitante não sabe o que um sistema pergunta a ele.
            Trocada por uma consequência que ele reconhece na hora, porque já
            perdeu tarde ensinando fábrica de vidro para fornecedor. */}
        <h2 className="display mt-7 max-w-[22ch] text-[clamp(30px,4.4vw,54px)] text-white">
          {origem.titulo}
        </h2>

        <dl className="mt-16 grid gap-px overflow-hidden rounded-[20px] bg-white/[0.12] sm:grid-cols-3">
          {origem.fatos.map(([t, d]) => (
            <div key={t} className="bg-[#0f2530] px-7 py-8">
              <dt className="text-[17px] font-extrabold tracking-[-0.015em] text-white">{t}</dt>
              <dd className="mt-3 text-[15px] leading-[1.55] text-white/60">{d}</dd>
            </div>
          ))}
        </dl>
      </Revelar>
    </section>
  )
}

/**
 * `agenda` liga o Calendly embutido no lugar do formulário. É o que a aba da
 * indústria quer: ali a venda é consultiva e o passo seguinte é uma reunião,
 * não deixar um telefone para alguém retornar depois. O formulário continua
 * existindo para onde ele fizer mais sentido.
 *
 * `agendaBotao` segura o widget: o visitante vê um botão, e o clique abre a
 * agenda no mesmo cartão. A /plataforma usa isso. A indústria não — lá o
 * calendário já é o objeto da seção.
 */
export function Chamada({
  rotulo,
  folha = 'FL. 05/05',
  titulo,
  texto,
  passos,
  agenda = false,
  agendaBotao = false,
  botao,
  zap = true,
  convite,
  centro = false,
}) {
  const c = useTextos()
  const [agendaAberta, setAgendaAberta] = useState(false)
  const mostrarAgenda = agenda && CONFIG.agendar && (!agendaBotao || agendaAberta)
  const cartaoLargo = centro && (mostrarAgenda || (agenda && !agendaBotao))

  return (
    <Revelar
      as="section"
      id="agendar"
      className={`secao mx-auto max-w-[1240px] px-5 ${
        centro ? 'pb-20 sm:px-8 sm:pb-24' : 'pb-24 sm:px-8 sm:pb-32'
      }`}
    >
      {/* Centralizado, o cartão tem a MESMA largura do cartão do preço
          (460 px). Eles são as duas últimas caixas da página, uma embaixo da
          outra: com larguras diferentes a coluna parece torta, e a mais larga
          é a que lê como bloco solto. */}
      <div
        className={`relative overflow-hidden rounded-[26px] border border-line bg-card ${
          centro ? (cartaoLargo ? 'mx-auto max-w-[680px]' : 'mx-auto max-w-[460px]') : ''
        }`}
      >
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, #7fe0c8, transparent)' }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[10%] -top-[70%] h-[620px] w-[620px] rounded-full opacity-[0.13]"
          style={{ background: 'radial-gradient(circle, #0e8c6a, transparent 66%)' }}
        />
        <div
          className={
            centro
              ? 'relative flex flex-col items-center gap-7 px-6 py-12 text-center sm:px-8 sm:py-14'
              : 'relative grid gap-10 px-7 py-14 sm:px-14 sm:py-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-16'
          }
        >
          {/* No modo centralizado esta seção é só o pedido: título, uma linha e
              o botão. Os três passos numerados e a linha de horários saíram —
              eles repetiam, em rodapé, o que a página inteira já explicou, e
              faziam este bloco ter três vezes a altura das outras seções. */}
          <div className={centro ? 'w-full' : ''}>
            {!centro && <Bloco rotulo={rotulo} folha={folha} />}
            {/* Dentro de um cartão de 460 px, 50 px de título viram cinco
                linhas de duas palavras. No modo centralizado ele para em 32. */}
            <h2
              className={
                centro
                  ? 'display mx-auto max-w-[18ch] text-[clamp(25px,3vw,32px)] leading-[1.12]'
                  : 'display mt-7 max-w-[16ch] text-[clamp(29px,4vw,50px)]'
              }
            >
              {titulo}
            </h2>
            <p className={`mt-4 max-w-[46ch] text-[16px] leading-[1.55] text-dim ${centro ? 'mx-auto' : 'mt-5'}`}>{texto}</p>

            {!centro && (
              <>
                <ol className="mt-8 space-y-3">
                  {passos.map((t, i) => (
                    <li key={t} className="flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-soft font-mono text-[11px] font-bold text-verde"
                      >
                        {i + 1}
                      </span>
                      <span className="text-[15.5px] font-semibold text-ink">{t}</span>
                    </li>
                  ))}
                </ol>

                <p className="mt-8 text-[13.5px] font-semibold text-dim">{c.chrome.horarios}</p>
              </>
            )}
          </div>

          {/* `convite` troca o formulário inteiro por um botão.
              Na vidraçaria o cadastro já foi oferecido logo depois da
              demonstração; repetir os quatro campos no rodapé fazia a mesma
              pergunta duas vezes na mesma página e custava 800 px. Quem chegou
              até aqui já decidiu — um clique a mais não é atrito.

              Centralizado ele perde a caixa própria: uma moldura dentro de
              outra moldura, com o mesmo fundo, é o "quadro branco" que não diz
              nada. Fica só o botão e a nota. */}
          {convite ? (
            centro ? (
              <div className="flex w-full flex-col items-center gap-3">
                <a
                  href={convite.href}
                  onClick={() => evento('comecar', { origem: 'chamada' })}
                  className="botao-marca px-8 py-3.5 text-[15px] transition-transform duration-200 hover:-translate-y-0.5"
                >
                  {convite.rotulo}
                </a>
                <p className="cota max-w-[34ch] normal-case leading-snug">{convite.nota}</p>
              </div>
            ) : (
              <div className="flex flex-col items-start justify-center gap-4 rounded-[20px] border border-line bg-card px-7 py-9">
                <a
                  href={convite.href}
                  onClick={() => evento('comecar', { origem: 'chamada' })}
                  className="botao-marca px-7 py-3.5 text-[15px] transition-transform duration-200 hover:-translate-y-0.5"
                >
                  {convite.rotulo}
                </a>
                <p className="cota max-w-[34ch] normal-case leading-snug">{convite.nota}</p>
              </div>
            )
          ) : mostrarAgenda ? (
            <Agenda />
          ) : agenda && agendaBotao && CONFIG.agendar ? (
            <div className="flex w-full flex-col items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setAgendaAberta(true)
                  evento('agendar', { origem: 'chamada-botao' })
                }}
                className="botao-marca px-8 py-3.5 text-[15px] transition-transform duration-200 hover:-translate-y-0.5"
              >
                {botao}
              </button>
            </div>
          ) : (
            <Formulario zap={zap} />
          )}
        </div>
      </div>
    </Revelar>
  )
}

export function Rodape({ rota }) {
  const { idioma, ir, trocarIdioma } = rota
  const c = useTextos()
  return (
    <footer className="relative border-t border-line">
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #7fe0c8, transparent)' }}
      />
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-start justify-between gap-8 px-5 py-10 sm:px-8">
        <div>
          <Marca />
          <p className="mt-2 max-w-[36ch] text-[13px] text-dim">{c.chrome.rodapeTexto}</p>
          {/* O seletor aparece aqui também, e não é redundância: no celular o
              topo é apertado e o visitante que não achou lá encontra aqui, no
              lugar onde todo site guarda idioma há vinte anos. */}
          <div className="mt-4 -ml-2.5">
            <Idiomas idioma={idioma} pagina={rota.id} aoTrocar={trocarIdioma} />
          </div>
        </div>
        <div className="flex flex-wrap gap-x-10 gap-y-4">
          <nav className="flex flex-col gap-2">
            <p className="cota uppercase">{c.chrome.paraQuem}</p>
            {ROTAS_MENU.map((r) => (
              <a
                key={r.id}
                href={caminhoDe(r.id, idioma)}
                onClick={(e) => {
                  if (e.metaKey || e.ctrlKey) return
                  e.preventDefault()
                  ir(r.id)
                }}
                className="inline-flex min-h-[34px] items-center text-[14px] font-semibold text-dim transition-colors hover:text-ink"
              >
                {c.paginas[r.id].nome}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-2">
            <p className="cota uppercase">{c.chrome.contato}</p>
            <a
              href={CONFIG.login}
              className="inline-flex min-h-[34px] items-center text-[14px] font-semibold text-dim transition-colors hover:text-ink"
            >
              {c.chrome.entrar}
            </a>
            <a
              href={`mailto:${CONFIG.email}`}
              className="inline-flex min-h-[34px] items-center text-[14px] font-semibold text-dim transition-colors hover:text-ink"
            >
              {CONFIG.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
