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
    const on = () => setPreso(window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
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
      <div className="mx-auto flex h-[68px] max-w-[1240px] items-center justify-between gap-2 px-5 sm:gap-6 sm:px-8">
        <a
          href={caminhoDe('industria', idioma)}
          onClick={(e) => abrir(e, 'industria')}
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
          {/* Na página de cadastro o botão do topo sai de cena. Ele levaria para
              o Calendly — ou seja, tiraria da tela do formulário alguém que já
              está com o dedo no formulário. Duas saídas competindo no mesmo
              momento é como se perde a que interessa. */}
          {id !== 'comecar' && (
            <a
              href={alvo}
              target={ehExterno(alvo) ? '_blank' : undefined}
              rel={ehExterno(alvo) ? 'noreferrer' : undefined}
              onClick={() => evento(comecar ? 'comecar' : 'agendar', { origem: 'topo' })}
              className="botao-marca whitespace-nowrap px-3.5 py-2.5 text-[13.5px] transition-transform duration-200 hover:-translate-y-0.5 sm:px-5 sm:text-[14px]"
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
            className={`cota flex min-h-[46px] items-center justify-center whitespace-nowrap border-b-2 px-1.5 text-center uppercase transition-colors ${
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
 */
export function Chamada({ rotulo, folha = 'FL. 05/05', titulo, texto, passos, agenda = false }) {
  const c = useTextos()
  return (
    <Revelar
      as="section"
      id="agendar"
      className="secao mx-auto max-w-[1240px] px-5 pb-24 sm:px-8 sm:pb-32"
    >
      <div className="relative overflow-hidden rounded-[26px] border border-line bg-card">
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
        <div className="relative grid gap-10 px-7 py-14 sm:px-14 sm:py-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-16">
          <div>
            <Bloco rotulo={rotulo} folha={folha} />
            <h2 className="display mt-7 max-w-[16ch] text-[clamp(29px,4vw,50px)]">{titulo}</h2>
            <p className="mt-5 max-w-[46ch] text-[16px] text-dim">{texto}</p>

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
          </div>

          {agenda && CONFIG.agendar ? <Agenda /> : <Formulario />}
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
