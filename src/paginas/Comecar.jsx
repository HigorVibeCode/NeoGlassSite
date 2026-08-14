import { useState } from 'react'
import { Bloco, Revelar } from '../components/Comum.jsx'
import { CONFIG, linkWhatsapp, precoVidracaria } from '../config.js'
import { evento } from '../lib/rastreio.js'
import { useIdioma, useTextos } from '../i18n/idioma.jsx'

const campo =
  'w-full rounded-[11px] border border-line bg-card px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-dim/70 focus:border-verde'

/**
 * A página de cadastro — a única do site onde o visitante digita para valer.
 *
 * Ela chama a função `site-cadastro` do Supabase, que cria a empresa com o
 * prazo de teste e convida o dono por e-mail. Nenhuma chave acompanha a
 * chamada: a função roda sem autenticação de propósito, porque quem se
 * cadastra ainda não tem usuário nenhum.
 *
 * Se o endereço não estiver configurado, ou se a rede cair, o formulário NÃO
 * vira um beco sem saída — ele abre o WhatsApp com os dados já preenchidos.
 * Perder o lead porque a função caiu seria o pior desfecho possível de uma
 * página que o visitante levou dez minutos para alcançar.
 */
export default function Comecar() {
  const { idioma } = useIdioma()
  const c = useTextos()
  const t = c.comecar
  const f = t.formulario
  const dias = CONFIG.vidracaria.diasTeste
  const preco = precoVidracaria(idioma)

  const [dados, setDados] = useState({ nome: '', empresa: '', email: '', whatsapp: '', site: '' })
  const [estado, setEstado] = useState('parado') // parado · enviando · pronto
  const [erro, setErro] = useState('')

  const muda = (k) => (e) => setDados((d) => ({ ...d, [k]: e.target.value }))

  const mensagemWhatsapp = () =>
    `${f.titulo} — ${dados.nome || '—'} · ${dados.empresa || '—'} · ${dados.email || '—'}`

  function pelaMao(motivo) {
    evento('whatsapp', { origem: `cadastro-${motivo}` })
    window.open(linkWhatsapp(mensagemWhatsapp()), '_blank', 'noopener')
    setEstado('parado')
  }

  async function enviar(e) {
    e.preventDefault()
    if (estado === 'enviando') return

    const nome = dados.nome.trim()
    const empresa = dados.empresa.trim()
    const email = dados.email.trim()

    if (!nome) return setErro(f.erros.nome)
    if (!empresa) return setErro(f.erros.empresa)
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(email)) return setErro(f.erros.email)

    setErro('')
    setEstado('enviando')

    // Sem endereço configurado: o cadastro vira conversa, e ninguém se perde.
    if (!CONFIG.cadastroApi) return pelaMao('sem-api')

    try {
      const r = await fetch(CONFIG.cadastroApi, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          empresa,
          email,
          whatsapp: dados.whatsapp.trim(),
          idioma,
          site: dados.site, // isca: preenchida só por robô
          origem:
            typeof document !== 'undefined' ? document.referrer || 'direto' : 'direto',
        }),
      })

      if (!r.ok) {
        const corpo = await r.json().catch(() => ({}))
        setEstado('parado')
        setErro(corpo.error || f.erros.geral)
        return
      }

      evento('cadastro', { idioma })
      setEstado('pronto')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      // Rede caiu no meio. O visitante não paga por isso.
      setEstado('parado')
      setErro(f.erros.rede)
    }
  }

  if (estado === 'pronto') {
    return (
      <Revelar as="section" className="secao mx-auto max-w-[1240px] px-5 pb-28 pt-[120px] sm:px-8">
        <div className="mx-auto max-w-[560px] rounded-[24px] border border-line bg-card px-7 py-12 text-center sm:px-12">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-verde/12">
            <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
              <path
                d="M5 12.5l4.5 4.5L19 7.5"
                fill="none"
                stroke="#0e8c6a"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="cota mt-6 uppercase opacity-70">{t.pronto.rotulo}</p>
          <h1 className="display mt-3 text-[clamp(28px,4vw,42px)]">{t.pronto.titulo}</h1>
          <p className="mx-auto mt-4 max-w-[42ch] text-[16px] leading-[1.6] text-dim">
            {t.pronto.texto(dados.email.trim())}
          </p>
          <p className="mx-auto mt-5 max-w-[42ch] text-[13.5px] leading-[1.6] text-dim">
            {t.pronto.dica}
          </p>
          <a
            href={linkWhatsapp(mensagemWhatsapp())}
            target="_blank"
            rel="noreferrer"
            onClick={() => evento('whatsapp', { origem: 'pos-cadastro' })}
            className="mt-7 inline-block rounded-[13px] border border-line px-6 py-3 text-[15px] font-bold text-ink transition-colors hover:border-verde hover:text-verde"
          >
            {t.pronto.whatsapp}
          </a>
        </div>
      </Revelar>
    )
  }

  return (
    <Revelar as="section" className="secao mx-auto max-w-[1240px] px-5 pb-28 pt-[120px] sm:px-8">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] lg:items-start lg:gap-16">
        <div>
          <Bloco rotulo={t.rotulo} folha="FL. 01/01" />

          <p className="mt-7 inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-verde" aria-hidden="true" />
            <span className="cota normal-case">{t.etiqueta(dias)}</span>
          </p>

          <h1 className="display mt-5 max-w-[16ch] text-[clamp(32px,5vw,58px)]">
            {t.titulo.antes} <span className="marca">{t.titulo.destaque}</span>
          </h1>

          <p className="mt-5 max-w-[46ch] text-[16.5px] leading-[1.55] text-dim">{t.texto}</p>

          <ol className="mt-9 space-y-3">
            {t.passos.map((p, i) => (
              <li key={p} className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-soft font-mono text-[11px] font-bold text-verde"
                >
                  {i + 1}
                </span>
                <span className="text-[15.5px] font-semibold text-ink">{p}</span>
              </li>
            ))}
          </ol>

          {preco && (
            <div className="mt-10 max-w-[46ch] border-t border-line pt-6">
              <p className="text-[15px] font-extrabold tracking-[-0.015em] text-ink">
                {t.depois.titulo(dias)}
              </p>
              <p className="mt-2 text-[14.5px] leading-[1.6] text-dim">{t.depois.texto(preco)}</p>
            </div>
          )}
        </div>

        <form
          onSubmit={enviar}
          noValidate
          className="rounded-[22px] border border-line bg-card px-6 py-8 sm:px-8"
        >
          <h2 className="display text-[22px]">{f.titulo}</h2>

          <div className="mt-7 grid gap-4">
            <label className="grid gap-1.5">
              <span className="text-[13px] font-bold text-ink">{f.campos.nome.rotulo}</span>
              <input
                className={campo}
                placeholder={f.campos.nome.exemplo}
                value={dados.nome}
                onChange={muda('nome')}
                autoComplete="name"
              />
            </label>

            <label className="grid gap-1.5">
              <span className="text-[13px] font-bold text-ink">{f.campos.empresa.rotulo}</span>
              <input
                className={campo}
                placeholder={f.campos.empresa.exemplo}
                value={dados.empresa}
                onChange={muda('empresa')}
                autoComplete="organization"
              />
            </label>

            <label className="grid gap-1.5">
              <span className="text-[13px] font-bold text-ink">{f.campos.email.rotulo}</span>
              <input
                className={campo}
                type="email"
                inputMode="email"
                placeholder={f.campos.email.exemplo}
                value={dados.email}
                onChange={muda('email')}
                autoComplete="email"
              />
              <span className="text-[12.5px] text-dim">{f.campos.email.dica}</span>
            </label>

            <label className="grid gap-1.5">
              <span className="text-[13px] font-bold text-ink">
                {f.campos.whatsapp.rotulo}{' '}
                <span className="font-semibold text-dim">· {f.campos.whatsapp.opcional}</span>
              </span>
              <input
                className={campo}
                inputMode="tel"
                placeholder={f.campos.whatsapp.exemplo}
                value={dados.whatsapp}
                onChange={muda('whatsapp')}
                autoComplete="tel"
              />
            </label>

            {/* A isca. Fica fora da tela e fora da ordem de tabulação: humano
                nunca chega nela, robô que preenche tudo, sim. */}
            <input
              type="text"
              name="site"
              value={dados.site}
              onChange={muda('site')}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute left-[-9999px] h-0 w-0 opacity-0"
            />
          </div>

          <button
            type="submit"
            disabled={estado === 'enviando'}
            className="botao-marca mt-7 w-full px-6 py-4 text-[15.5px] transition-transform duration-200 hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-70"
          >
            {estado === 'enviando' ? f.enviando : f.enviar(dias)}
          </button>

          {erro && (
            <p className="mt-3 text-[13px] font-semibold text-ember" role="alert">
              {erro}
            </p>
          )}

          <p className="mt-4 text-[12.5px] leading-[1.5] text-dim">{f.aviso}</p>
        </form>
      </div>
    </Revelar>
  )
}
