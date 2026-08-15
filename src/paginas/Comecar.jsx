import { useState } from 'react'
import { Revelar } from '../components/Comum.jsx'
import { CONFIG, linkEmail } from '../config.js'
import { evento } from '../lib/rastreio.js'
import { useIdioma, useTextos } from '../i18n/idioma.jsx'

const campo =
  'w-full rounded-[11px] border border-line bg-card px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-dim/70 focus:border-verde'

/**
 * A página de cadastro — a única do site onde o visitante digita para valer.
 *
 * O desenho é uma coluna só, do celular ao computador: título, uma linha, quatro
 * campos, um botão. A versão anterior era duas colunas — texto à esquerda,
 * formulário à direita — e no celular virava uma pilha: a pessoa lia três
 * parágrafos e uma lista de etapas ANTES de ver o primeiro campo. Quem chega
 * aqui já decidiu; o que resta é não atrapalhar.
 *
 * No celular não é o desktop empilhado: o cartão perde a moldura e vira a
 * própria página (borda e sombra só entram a partir de `sm`), o respiro do topo
 * encolhe, e tudo cabe numa tela — os quatro campos e o botão ficam visíveis
 * juntos, sem rolar.
 *
 * A LÓGICA NÃO MUDOU. Ela chama a função `site-cadastro` do Supabase, que cria
 * a empresa com o prazo de teste e convida o dono por e-mail. Nenhuma chave
 * acompanha a chamada: a função roda sem autenticação de propósito, porque quem
 * se cadastra ainda não tem usuário nenhum.
 *
 * Se o endereço não estiver configurado, ou se a rede cair, o formulário NÃO
 * vira um beco sem saída — ele abre o e-mail com os dados já preenchidos.
 * Perder o lead porque a função caiu seria o pior desfecho possível de uma
 * página que o visitante levou dez minutos para alcançar.
 *
 * A saída é e-mail, e não WhatsApp, de propósito: esta página é o funil da
 * vidraçaria, e o número de WhatsApp é atendimento da indústria.
 */
export default function Comecar() {
  const { idioma } = useIdioma()
  const c = useTextos()
  const t = c.comecar
  const f = t.formulario
  const dias = CONFIG.vidracaria.diasTeste

  const [dados, setDados] = useState({ nome: '', empresa: '', email: '', whatsapp: '', site: '' })
  const [estado, setEstado] = useState('parado') // parado · enviando · pronto
  const [erro, setErro] = useState('')
  // Quando o erro não é culpa do visitante (rede caiu, função fora do ar), a
  // mensagem sozinha não basta: some com o lead. Aparece junto um botão de
  // e-mail com tudo já digitado, para ele não ter que escrever de novo.
  const [saida, setSaida] = useState(false)

  const muda = (k) => (e) => setDados((d) => ({ ...d, [k]: e.target.value }))

  const recado = () =>
    `${f.titulo} — ${dados.nome || '—'} · ${dados.empresa || '—'} · ${dados.email || '—'}`

  const saidaEmail = () => linkEmail(f.titulo, recado())

  function pelaMao(motivo) {
    evento('email', { origem: `cadastro-${motivo}` })
    window.open(saidaEmail(), '_blank', 'noopener')
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
    setSaida(false)
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
        // 429 é o visitante insistindo — ele resolve esperando. Qualquer outro
        // erro é do nosso lado, e aí ele merece um caminho que funcione agora.
        setSaida(r.status !== 429)
        return
      }

      evento('cadastro', { idioma })
      setEstado('pronto')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      // "Failed to fetch" cobre tudo o que o navegador não sabe distinguir:
      // internet caída, CORS, função fora do ar. Do lado de cá o efeito é o
      // mesmo — o cadastro não foi — e a única coisa inaceitável é o visitante
      // ir embora sem deixar contato.
      setEstado('parado')
      setErro(f.erros.rede)
      setSaida(true)
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
            href={saidaEmail()}
            onClick={() => evento('email', { origem: 'pos-cadastro' })}
            className="mt-7 inline-block rounded-[13px] border border-line px-6 py-3 text-[15px] font-bold text-ink transition-colors hover:border-verde hover:text-verde"
          >
            {t.pronto.contato}
          </a>
        </div>
      </Revelar>
    )
  }

  return (
    <Revelar
      as="section"
      className="secao mx-auto max-w-[1240px] px-5 pb-20 pt-[104px] sm:px-8 sm:pb-28 sm:pt-[128px]"
    >
      <div className="mx-auto w-full max-w-[440px]">
        {/* `text-balance` reparte as linhas sozinho. Sem ele o título quebrava
            depois da conjunção, e ela ficava órfã no fim da primeira linha —
            já em verde, porque o destaque começa ali. */}
        <h1 className="display text-balance text-center text-[clamp(30px,6.2vw,42px)] leading-[1.08]">
          {t.titulo.antes} <span className="marca">{t.titulo.destaque}</span>
        </h1>
        <p className="mt-3 text-center text-[15.5px] font-semibold text-dim">
          {t.subtitulo(dias)}
        </p>

        {/* No celular o cartão não tem moldura: a página INTEIRA é o
            formulário, e uma borda em volta de algo que já ocupa a tela toda
            só rouba 48 px de largura útil. A partir de `sm` a moldura volta,
            porque aí ela é o que segura a coluna no meio da tela. */}
        <form
          onSubmit={enviar}
          noValidate
          className="mt-8 rounded-[22px] sm:border sm:border-line sm:bg-card sm:px-8 sm:py-9 sm:shadow-[0_36px_70px_-46px_rgba(20,55,80,.4)]"
        >
          <div className="grid gap-4">
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

            {/* A dica "é para lá que vai o convite" saiu de baixo do campo: o
                rótulo já diz e-mail, e cada linha a mais aqui é uma linha entre
                o visitante e o botão. */}
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
            className="botao-marca mt-6 w-full px-6 py-4 text-[15.5px] transition-transform duration-200 hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-70"
          >
            {estado === 'enviando' ? f.enviando : f.enviar()}
          </button>

          <p className="mt-3 text-center text-[13px] font-semibold text-dim">{f.rapido}</p>

          {erro && (
            <div role="alert" className="mt-4 text-center">
              <p className="text-[13px] font-semibold text-ember">{erro}</p>
              {saida && (
                <a
                  href={saidaEmail()}
                  onClick={() => evento('email', { origem: 'cadastro-falhou' })}
                  className="mt-3 inline-block rounded-[13px] border border-line px-5 py-2.5 text-[14px] font-bold text-ink transition-colors hover:border-verde hover:text-verde"
                >
                  {f.saida}
                </a>
              )}
            </div>
          )}
        </form>
      </div>
    </Revelar>
  )
}
