import { useEffect, useRef, useState } from 'react'
import Marca from '../components/Marca.jsx'
import Agenda from '../components/Agenda.jsx'
import Projeto from '../ferramentas/Projeto.jsx'
import { CONFIG, linkEmail, precoVidracaria } from '../config.js'
import { caminhoDe } from '../lib/paginasSeo.js'
import { origemGuardada } from '../lib/indicacao.js'
import { evento } from '../lib/rastreio.js'
import { useIdioma } from '../i18n/idioma.jsx'

export default function PrimeiroOrcamento() {
  const { idioma, c } = useIdioma()
  const t = c.primeiro
  const [confirmado, setConfirmado] = useState(false)
  const [agendaVisivel, setAgendaVisivel] = useState(false)
  const [principalVisivel, setPrincipalVisivel] = useState(true)
  const botaoPrincipal = useRef(null)
  const [mostrarDemo, setMostrarDemo] = useState(false)
  const secaoAgenda = useRef(null)
  const [campanha] = useState(() => ({ utm_source: 'site', utm_medium: 'organic', utm_campaign: 'primeiro_orcamento_v1', ...origemGuardada() }))
  const cadastro = caminhoDe('comecar', idioma)

  useEffect(() => {
    const io = new IntersectionObserver(entradas => {
      for (const e of entradas) {
        if (e.target === secaoAgenda.current) setAgendaVisivel(e.isIntersecting)
        if (e.target === botaoPrincipal.current) setPrincipalVisivel(e.isIntersecting)
      }
    }, { threshold: 0 })
    if (secaoAgenda.current) io.observe(secaoAgenda.current)
    if (botaoPrincipal.current) io.observe(botaoPrincipal.current)
    return () => io.disconnect()
  }, [])

  function agendar() {
    evento('agendar', { origem: 'primeiro-orcamento' })
    secaoAgenda.current?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
    secaoAgenda.current?.focus({ preventScroll: true })
  }

  return (
    <div className="pb-24 sm:pb-0">
      <header className="mx-auto flex max-w-[1120px] items-center justify-between gap-5 px-5 py-6 sm:px-8">
        <a href={caminhoDe('home', idioma)} aria-label={c.chrome.inicio}><Marca /></a>
        <a href={CONFIG.login} className="inline-flex min-h-11 items-center text-sm font-bold underline underline-offset-4">{t.entrar}</a>
      </header>

      <section className="mx-auto grid max-w-[1120px] gap-10 px-5 pb-14 pt-10 sm:px-8 lg:grid-cols-[1.3fr_1fr] lg:gap-16 lg:py-20">
        <div>
          <p className="cota mb-5 uppercase">{t.rotulo}</p>
          <h1 className="display max-w-[18ch] text-[clamp(36px,5vw,58px)]">{t.titulo}</h1>
          <p className="mt-6 max-w-[49ch] text-base leading-relaxed">{t.texto}</p>
          <p className="mt-5 text-sm font-semibold">{t.pessoa}</p>
          <button ref={botaoPrincipal} type="button" onClick={agendar} className="botao-marca mt-8 min-h-12 w-full px-5 py-4 text-base sm:w-auto">{t.cta}</button>
          <p className="mt-3 text-sm">{t.condicoes}</p>
          <p className="mt-5 max-w-[48ch] text-sm leading-relaxed">{t.preco(precoVidracaria(idioma), CONFIG.vidracaria.diasTeste)}</p>
        </div>
        <aside className="self-center rounded-2xl border border-line bg-card p-7 sm:p-9">
          <h2 className="display text-2xl">{t.preparar}</h2>
          <ul className="mt-6 list-disc space-y-4 pl-5 text-base">{t.itens.map(item => <li key={item}>{item}</li>)}</ul>
          <p className="mt-7 border-t border-line pt-5 text-sm leading-relaxed">{t.limite}</p>
        </aside>
      </section>

      <section className="mx-auto max-w-[1120px] px-5 py-12 sm:px-8">
        <h2 className="display max-w-[28ch] text-[30px]">{t.resultado}</h2>
        <ol className="mt-8 grid gap-7 sm:grid-cols-3">{t.etapas.map(([titulo, texto], i) => <li key={titulo} className="border-t border-line pt-5"><p className="cota mb-3">{i + 1}/3</p><h3 className="text-lg font-extrabold">{titulo}</h3><p className="mt-3 text-base leading-relaxed">{texto}</p></li>)}</ol>
        <button type="button" aria-expanded={mostrarDemo} aria-controls="demonstracao" onClick={() => setMostrarDemo(!mostrarDemo)} className="mt-8 min-h-11 text-sm font-bold underline underline-offset-4">{t.prova}</button>
        {mostrarDemo && <div id="demonstracao" className="mt-5"><p className="mb-4 text-sm">{t.legenda}</p><Projeto /></div>}
      </section>

      <section id="agendar" ref={secaoAgenda} tabIndex={-1} className="mx-auto max-w-[940px] scroll-mt-5 px-4 py-12 sm:px-8">
        <h2 className="display text-[32px]">{t.agenda}</h2>
        <p className="mb-7 mt-4 max-w-[60ch] text-base">{t.agendaTexto}</p>
        <Agenda origem="primeiro-orcamento" campanha={campanha} onConfirmado={() => setConfirmado(true)} />
        {confirmado && <div role="status" className="mt-6 rounded-2xl border border-line bg-card p-7"><h3 className="display text-2xl">{t.confirmado}</h3><p className="mt-3 text-base">{t.proximo}</p><a href={cadastro} className="botao-marca mt-5 inline-flex min-h-12 items-center px-6 py-3">{t.criar}</a><a href={CONFIG.login} className="ml-5 inline-flex min-h-11 items-center text-sm font-bold underline">{t.jaConta}</a></div>}
        <p className="mt-6 text-sm">{t.contato} <a href={linkEmail(t.assunto, t.corpo)} className="font-bold underline underline-offset-4">{t.email}</a></p>
      </section>

      <section className="mx-auto max-w-[940px] px-5 py-10 sm:px-8">
        <h2 className="display mb-5 text-2xl">{t.duvidas}</h2>
        {t.faq.map(([q, a]) => <details key={q} className="border-t border-line py-4"><summary className="min-h-11 cursor-pointer py-2 text-base font-bold">{q}</summary><p className="pb-3 text-base">{a}</p></details>)}
        <a href={cadastro} onClick={() => evento('teste_sozinho', { origem: 'primeiro-orcamento' })} className="mt-6 inline-flex min-h-11 items-center font-bold underline underline-offset-4">{t.sozinho}</a>
      </section>
      <footer className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-4 border-t border-line px-5 py-8 text-sm sm:px-8"><a href={caminhoDe('vidracaria', idioma)} className="inline-flex min-h-11 items-center underline">{t.ver}</a><a href={linkEmail(t.assunto)} className="inline-flex min-h-11 items-center underline">{CONFIG.email}</a></footer>
      {!agendaVisivel && !principalVisivel && !confirmado && <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-card p-3 pb-[max(12px,env(safe-area-inset-bottom))] sm:hidden"><button type="button" onClick={agendar} className="botao-marca min-h-12 w-full px-4 py-3 text-base">{t.curto}</button></div>}
    </div>
  )
}
