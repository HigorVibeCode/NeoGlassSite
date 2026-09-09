import { registrarCadastroGoogle } from '../lib/googleAds.js'
import { useEffect, useState } from 'react'
import { Revelar } from '../components/Comum.jsx'
import { CONFIG, linkEmail, paisProvavel } from '../config.js'
import { esquecerOrigem, origemGuardada, resolverCodigo } from '../lib/indicacao.js'
import { evento } from '../lib/rastreio.js'
import { useIdioma, useTextos } from '../i18n/idioma.jsx'

const campo =
  'w-full rounded-[11px] border border-line bg-card px-4 py-3 text-[16px] text-ink outline-none transition-colors placeholder:text-dim/70 focus:border-verde'

const SENHA_MIN = 8

/**
 * A página de cadastro — a única do site onde o visitante digita para valer.
 *
 * O que mudou (a pedido do dono): a conta é criada AQUI, com a senha que a
 * pessoa escolhe, e ela entra na hora. Antes o site só capturava o lead e a
 * função mandava um convite por e-mail; a senha nascia num segundo passo, num
 * link. Agora são seis campos — nome, vidraçaria, e-mail, telefone, senha e
 * confirmação — e o desfecho é login automático: a função devolve um endereço
 * de entrada (`entrar_url`) e o navegador vai direto para dentro do sistema.
 *
 * A LÓGICA DE REDE não mudou de forma: continua um POST para `cadastroApi`. O
 * que mudou é o corpo (agora leva a senha) e o sucesso (agora redireciona em
 * vez de mostrar "confira seu e-mail").
 *
 * A senha NUNCA entra na saída por e-mail de emergência: se a função cair, o
 * e-mail de socorro leva só nome, empresa e e-mail — o resto a gente combina.
 *
 * No celular não é o desktop empilhado: o cartão perde a moldura e vira a
 * própria página (borda e sombra só entram a partir de `sm`).
 */
export default function Comecar() {
  const { idioma } = useIdioma()
  const c = useTextos()
  const t = c.comecar
  const f = t.formulario
  const dias = CONFIG.vidracaria.diasTeste

  const [dados, setDados] = useState({
    nome: '',
    empresa: '',
    email: '',
    telefone: '',
    // O país decide a moeda da cobrança e a ficha fiscal. Deduzido do fuso do
    // aparelho (Zürich = ch), e a pessoa corrige se estiver errado. Sem isto
    // o servidor deduzia pelo idioma — e 'de' fazia todo suíço nascer alemão.
    pais: paisProvavel(idioma),
    senha: '',
    senha2: '',
    site: '',
  })
  const [estado, setEstado] = useState('parado') // parado · enviando · entrando · pronto
  const [erro, setErro] = useState('')
  const [verSenha, setVerSenha] = useState(false)
  const [saida, setSaida] = useState(false)
  // 409: a conta já existe. A única coisa útil é o caminho de entrar.
  const [jaExiste, setJaExiste] = useState(false)

  // De onde a pessoa veio. `indicado` é o parceiro CONFIRMADO pelo servidor —
  // por isso vira um selo, e não um campo editável: o visitante não digita o
  // nome de quem o indicou, ele apenas confirma (ou remove). `codigoManual` é
  // a porta para quem recebeu o código na conversa e não pelo link.
  const [origem, setOrigem] = useState(null)
  const [indicado, setIndicado] = useState(null) // { codigo, nome }
  const [codigoManual, setCodigoManual] = useState('')

  useEffect(() => {
    const guardada = origemGuardada()
    setOrigem(guardada)
    const codigo = guardada?.codigo
    if (!codigo) return

    // O código veio do link, então ele JÁ VALE — mesmo antes de sabermos o nome
    // de quem indicou. Deixamos o campo preenchido desde já: se a confirmação
    // não vier (rede fora, endpoint indisponível), a indicação continua à vista
    // e continua sendo enviada. Quem decide se ela é válida é o servidor, no
    // cadastro; perder a atribuição por não ter conseguido exibir um nome seria
    // punir o parceiro por um problema nosso.
    setCodigoManual(codigo)

    if (guardada.nome) {
      setIndicado({ codigo, nome: guardada.nome })
      return
    }
    let vivo = true
    resolverCodigo(codigo).then((r) => {
      if (vivo && r) setIndicado(r)
    })
    return () => {
      vivo = false
    }
  }, [])

  // "Não fui indicado": apaga tudo — o selo, o guardado e o campo. Quem clica
  // aqui está dizendo que a atribuição não é dele; deixar o código no campo
  // faria a negativa não valer nada.
  const removerIndicacao = () => {
    esquecerOrigem()
    setIndicado(null)
    setOrigem(null)
    setCodigoManual('')
  }

  const muda = (k) => (e) => setDados((d) => ({ ...d, [k]: e.target.value }))

  // A senha jamais viaja no e-mail de socorro.
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
    if (estado === 'enviando' || estado === 'entrando') return

    const nome = dados.nome.trim()
    const empresa = dados.empresa.trim()
    const email = dados.email.trim()
    const senha = dados.senha

    if (!nome) return setErro(f.erros.nome)
    if (!empresa) return setErro(f.erros.empresa)
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(email)) return setErro(f.erros.email)
    if (senha.length < SENHA_MIN) return setErro(f.erros.senha)
    if (senha !== dados.senha2) return setErro(f.erros.senha2)

    setErro('')
    setSaida(false)
    setJaExiste(false)
    setEstado('enviando')

    if (!CONFIG.cadastroApi) return pelaMao('sem-api')

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 30000)
    try {
      const r = await fetch(CONFIG.cadastroApi, {
        signal: controller.signal,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          empresa,
          email,
          telefone: dados.telefone.trim(),
          pais: dados.pais || null,
          senha,
          idioma,
          site: dados.site, // isca: preenchida só por robô
          origem: typeof document !== 'undefined' ? document.referrer || 'direto' : 'direto',
          // Quem indicou, na ordem: o parceiro confirmado, o que a pessoa
          // digitou, e — por último — o código guardado do link mesmo sem
          // confirmação (a confirmação é enfeite; o código é o dado). O
          // SERVIDOR revalida: isto aqui é só o que dizemos ter.
          indicacao:
            indicado?.codigo ||
            codigoManual.trim().toLowerCase() ||
            origem?.codigo ||
            null,
          // A campanha que trouxe a visita, para medir tráfego pago. Dimensão
          // paralela à indicação: um cadastro pode ter as duas.
          marketing: origem
            ? {
                utm_source: origem.utm_source ?? null,
                utm_medium: origem.utm_medium ?? null,
                utm_campaign: origem.utm_campaign ?? null,
                utm_content: origem.utm_content ?? null,
                utm_term: origem.utm_term ?? null,
                referrer: origem.referrer ?? null,
                landing: origem.landing ?? null,
              }
            : null,
        }),
      })

      if (!r.ok) {
        const corpo = await r.json().catch(() => ({}))
        setEstado('parado')
        // Nunca o texto cru do servidor: ele vem em português para um suíço.
        // Cada status tem a sua frase e a sua saída.
        if (r.status === 409) {
          setErro(f.erros.jaExiste)
          setJaExiste(true)
          setSaida(false)
        } else if (r.status === 429) {
          setErro(f.erros.muitasTentativas)
          setSaida(false)
        } else {
          setErro(f.erros.geral)
          setSaida(true)
        }
        return
      }

      const corpo = await r.json().catch(() => ({}))
      evento('cadastro', { idioma })
      await registrarCadastroGoogle()

      // Login automático: a função devolve o endereço de entrada e o navegador
      // vai direto para dentro do sistema, já logado.
      if (corpo.entrar_url) {
        setEstado('entrando')
        window.location.href = corpo.entrar_url
        return
      }

      // Sem endereço de entrada (função antiga, ou auto-login desligado): a
      // conta existe, então mostramos o desfecho com o botão para o app.
      setEstado('pronto')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      setEstado('parado')
      setErro(f.erros.rede)
      setSaida(true)
    } finally {
      clearTimeout(timeout)
    }
  }

  if (estado === 'pronto') {
    return (
      <Revelar as="section" className="secao mx-auto max-w-[1240px] px-5 pb-28 pt-[120px] sm:px-8">
        <div className="mx-auto max-w-[560px] rounded-[24px] border border-line bg-card px-7 py-12 text-center sm:px-12">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-verde/12">
            <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
              <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="#0e8c6a" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="cota mt-6 uppercase opacity-70">{t.pronto.rotulo}</p>
          <h1 className="display mt-3 text-[clamp(28px,4vw,42px)]">{t.pronto.titulo}</h1>
          <p className="mx-auto mt-4 max-w-[42ch] text-[16px] leading-[1.6] text-dim">{t.pronto.texto}</p>
          <a
            href={CONFIG.login}
            onClick={() => evento('entrar', { origem: 'pos-cadastro' })}
            className="botao-marca mt-7 inline-block px-7 py-3.5 text-[15px] transition-transform duration-200 hover:-translate-y-0.5"
          >
            {t.pronto.entrar}
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
        <h1 className="display text-balance text-center text-[clamp(30px,6.2vw,42px)] leading-[1.08]">
          {t.titulo.antes} <span className="marca">{t.titulo.destaque}</span>
        </h1>
        <p className="mt-3 text-center text-[15.5px] font-semibold text-dim">{t.subtitulo(dias)}</p>

        <form
          onSubmit={enviar}
          noValidate
          className="mt-8 rounded-[22px] sm:border sm:border-line sm:bg-card sm:px-8 sm:py-9 sm:shadow-[0_36px_70px_-46px_rgba(20,55,80,.4)]"
        >
          <div className="grid gap-4">
            <label className="grid gap-1.5">
              <span className="text-[13px] font-bold text-ink">{f.campos.nome.rotulo}</span>
              <input className={campo} placeholder={f.campos.nome.exemplo} value={dados.nome} onChange={muda('nome')} autoComplete="name" />
            </label>

            <label className="grid gap-1.5">
              <span className="text-[13px] font-bold text-ink">{f.campos.empresa.rotulo}</span>
              <input className={campo} placeholder={f.campos.empresa.exemplo} value={dados.empresa} onChange={muda('empresa')} autoComplete="organization" />
            </label>

            <label className="grid gap-1.5">
              <span className="text-[13px] font-bold text-ink">{f.campos.email.rotulo}</span>
              <input className={campo} type="email" inputMode="email" placeholder={f.campos.email.exemplo} value={dados.email} onChange={muda('email')} autoComplete="email" />
            </label>

            <label className="grid gap-1.5">
              <span className="text-[13px] font-bold text-ink">
                {f.campos.telefone.rotulo}{' '}
                <span className="font-semibold text-dim">· {f.campos.telefone.opcional}</span>
              </span>
              <input className={campo} inputMode="tel" placeholder={f.campos.telefone.exemplo} value={dados.telefone} onChange={muda('telefone')} autoComplete="tel" />
            </label>

            <label className="grid gap-1.5">
              <span className="text-[13px] font-bold text-ink">{f.campos.pais.rotulo}</span>
              <select className={campo} value={dados.pais} onChange={muda('pais')} autoComplete="country">
                {f.campos.pais.opcoes.map(([codigo, nome]) => (
                  <option key={codigo} value={codigo}>{nome}</option>
                ))}
              </select>
            </label>

            {/* senha + mostrar; a confirmação vem logo abaixo */}
            <label className="grid gap-1.5">
              <span className="text-[13px] font-bold text-ink">{f.campos.senha.rotulo}</span>
              <span className="relative block">
                <input
                  className={`${campo} pr-16`}
                  type={verSenha ? 'text' : 'password'}
                  placeholder={f.campos.senha.exemplo}
                  value={dados.senha}
                  onChange={muda('senha')}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setVerSenha((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[12.5px] font-bold text-dim transition-colors hover:text-ink"
                >
                  {verSenha ? f.campos.senha.ocultar : f.campos.senha.mostrar}
                </button>
              </span>
            </label>

            <label className="grid gap-1.5">
              <span className="text-[13px] font-bold text-ink">{f.campos.senha2.rotulo}</span>
              <input
                className={campo}
                type={verSenha ? 'text' : 'password'}
                placeholder={f.campos.senha2.exemplo}
                value={dados.senha2}
                onChange={muda('senha2')}
                autoComplete="new-password"
              />
            </label>

            {/* ── Quem indicou ──────────────────────────────────────────
                Com link: um selo de confirmação (não um campo), porque o dado
                já veio conferido e um input só convidaria a adulterar.
                Sem link: um campo opcional, para quem recebeu o código na
                conversa. */}
            {indicado ? (
              <div
                className="flex items-start gap-3 rounded-[12px] border px-4 py-3"
                style={{ borderColor: 'rgba(14,140,106,.32)', background: 'rgba(14,140,106,.06)' }}
              >
                <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true">
                  <path
                    d="M5 12.5l4.5 4.5L19 7.5"
                    fill="none"
                    stroke="#0e8c6a"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="min-w-0 text-[13px] leading-snug text-ink">
                  <b className="font-bold">{f.indicacao.selo(indicado.nome)}</b>
                  <button
                    type="button"
                    onClick={removerIndicacao}
                    className="ml-2 font-semibold text-dim underline underline-offset-2 transition-colors hover:text-ink"
                  >
                    {f.indicacao.remover}
                  </button>
                </span>
              </div>
            ) : (
              <label className="grid gap-1.5">
                <span className="text-[13px] font-bold text-ink">
                  {f.indicacao.rotulo}{' '}
                  <span className="font-semibold text-dim">· {f.campos.telefone.opcional}</span>
                </span>
                <input
                  className={campo}
                  placeholder={f.indicacao.exemplo}
                  value={codigoManual}
                  onChange={(e) => setCodigoManual(e.target.value)}
                  autoComplete="off"
                  autoCapitalize="none"
                  spellCheck="false"
                />
              </label>
            )}

            {/* A isca. Fora da tela e fora da ordem de tabulação. */}
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
            disabled={estado === 'enviando' || estado === 'entrando'}
            className="botao-marca mt-6 w-full px-6 py-4 text-[15.5px] transition-transform duration-200 hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-70"
          >
            {estado === 'entrando' ? f.entrando : estado === 'enviando' ? f.enviando : f.enviar()}
          </button>

          <p className="mt-3 text-center text-[13px] font-semibold text-dim">{f.rapido}</p>

          {erro && (
            <div role="alert" className="mt-4 text-center">
              <p className="text-[13px] font-semibold text-ember">{erro}</p>
              {(jaExiste || saida) && (
                <p className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[14px] font-bold">
                  <a href={CONFIG.login} className="text-verde hover:underline">{f.entrar}</a>
                  <a href={CONFIG.login} className="text-ink hover:underline">{f.esqueci}</a>
                </p>
              )}
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
