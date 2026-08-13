import { useState } from 'react'
import { CONFIG, linkWhatsapp } from '../config.js'
import { evento } from '../lib/rastreio.js'
import { useTextos } from '../i18n/idioma.jsx'

const campo =
  'w-full rounded-[11px] border border-line bg-card px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-dim/70 focus:border-verde'

/**
 * O texto deste formulário mora em `conteudo/areas/plataforma.<idioma>.js`,
 * na chave `formulario` — o arquivo é compartilhado pelas três abas, mas
 * pertence à área da plataforma, e a árvore de textos é carregada inteira.
 *
 * O perfil vai para o banco no idioma em que o visitante leu a página: é o
 * que ele escolheu, e traduzir de volta na hora de gravar só criaria um valor
 * que ninguém digitou.
 */
export default function Formulario() {
  const t = useTextos().plataforma.formulario
  const [dados, setDados] = useState({
    nome: '',
    empresa: '',
    whatsapp: '',
    perfil: t.perfis[0],
  })
  const [estado, setEstado] = useState('parado') // parado · enviando · pronto · erro
  const [erro, setErro] = useState('')

  const muda = (campo) => (e) => setDados((d) => ({ ...d, [campo]: e.target.value }))

  async function enviar(e) {
    e.preventDefault()
    if (estado === 'enviando') return
    setErro('')
    setEstado('enviando')

    const { url, chaveAnon, tabela } = CONFIG.supabase

    // Sem banco configurado, o lead vai pelo WhatsApp com tudo preenchido.
    if (!url || !chaveAnon) {
      evento('whatsapp', { origem: 'formulario' })
      window.open(linkWhatsapp(t.mensagem(dados)), '_blank', 'noopener')
      setEstado('pronto')
      return
    }

    try {
      const r = await fetch(`${url}/rest/v1/${tabela}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: chaveAnon,
          Authorization: `Bearer ${chaveAnon}`,
          Prefer: 'return=minimal',
        },
        body: JSON.stringify([
          {
            nome: dados.nome,
            empresa: dados.empresa,
            whatsapp: dados.whatsapp,
            perfil: dados.perfil,
            origem: typeof document !== 'undefined' ? document.referrer || 'direto' : 'direto',
          },
        ]),
      })
      if (!r.ok) throw new Error(`status ${r.status}`)
      evento('lead', { perfil: dados.perfil })
      setEstado('pronto')
    } catch (err) {
      setEstado('erro')
      setErro(t.erro)
    }
  }

  if (estado === 'pronto') {
    return (
      <div className="rounded-[20px] border border-line bg-card px-7 py-9 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-verde/12">
          <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
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
        <h3 className="display mt-5 text-[22px]">{t.sucesso.titulo}</h3>
        <p className="mx-auto mt-3 max-w-[34ch] text-[15px] text-dim">{t.sucesso.texto}</p>
        <a
          href={linkWhatsapp(t.sucesso.whatsapp)}
          onClick={() => evento('whatsapp', { origem: 'pos-formulario' })}
          className="mt-6 inline-block rounded-[13px] border border-line px-6 py-3 text-[15px] font-bold text-ink transition-colors hover:border-verde hover:text-verde"
        >
          {t.sucesso.botao}
        </a>
      </div>
    )
  }

  return (
    <form onSubmit={enviar} className="rounded-[20px] border border-line bg-card px-6 py-7 sm:px-7">
      <p className="font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-dim">
        {t.rotulo}
      </p>
      <h3 className="display mt-2.5 text-[21px]">{t.titulo}</h3>

      <div className="mt-6 grid gap-3">
        <input
          className={campo}
          placeholder={t.nome}
          value={dados.nome}
          onChange={muda('nome')}
          required
          autoComplete="name"
        />
        <input
          className={campo}
          placeholder={t.empresa}
          value={dados.empresa}
          onChange={muda('empresa')}
          required
          autoComplete="organization"
        />
        <input
          className={campo}
          placeholder={t.whatsapp}
          value={dados.whatsapp}
          onChange={muda('whatsapp')}
          required
          inputMode="tel"
          autoComplete="tel"
        />
        <select className={campo} value={dados.perfil} onChange={muda('perfil')}>
          {t.perfis.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={estado === 'enviando'}
        className="botao-marca mt-5 w-full px-6 py-3.5 text-[15px] transition-transform duration-200 hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-70"
      >
        {estado === 'enviando' ? t.enviando : t.botao}
      </button>

      {erro && (
        <p className="mt-3 text-[13px] font-semibold text-ember" role="alert">
          {erro}
        </p>
      )}

      <p className="mt-4 text-[12.5px] leading-[1.5] text-dim">{t.nota}</p>
    </form>
  )
}
