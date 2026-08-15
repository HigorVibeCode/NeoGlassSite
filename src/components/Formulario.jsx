import { useState } from 'react'
import { CONFIG, linkEmail, linkWhatsapp } from '../config.js'
import { evento } from '../lib/rastreio.js'
import { useTextos } from '../i18n/idioma.jsx'

const campo =
  'w-full min-h-12 rounded-[14px] border border-line bg-card px-4 py-3 text-[16px] text-ink outline-none transition-colors placeholder:text-dim/70 focus:border-verde'

/**
 * O texto deste formulário mora em `conteudo/areas/plataforma.<idioma>.js`,
 * na chave `formulario` — o arquivo é compartilhado pelas três abas, mas
 * pertence à área da plataforma, e a árvore de textos é carregada inteira.
 *
 * `zap` decide qual é a saída quando não há banco configurado e qual é o botão
 * da tela de sucesso. Na vidraçaria ela é `false`: o contato vira e-mail, nunca
 * WhatsApp. Uma saída tem que existir de qualquer jeito — sem ela, uma falha de
 * rede apaga o lead sem deixar rastro.
 *
 * O perfil vai para o banco no idioma em que o visitante leu a página: é o
 * que ele escolheu, e traduzir de volta na hora de gravar só criaria um valor
 * que ninguém digitou.
 */
export default function Formulario({ zap = true }) {
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

    // Sem banco configurado, o lead sai pelo canal daquele público, com tudo
    // já preenchido — WhatsApp na indústria, e-mail na vidraçaria.
    if (!url || !chaveAnon) {
      const recado = t.mensagem(dados)
      evento(zap ? 'whatsapp' : 'email', { origem: 'formulario' })
      window.open(
        zap ? linkWhatsapp(recado) : linkEmail(t.titulo, recado),
        '_blank',
        'noopener',
      )
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
      <div className="cartao px-7 py-9 text-center">
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
        <h3 className="titulo-bloco mt-5">{t.sucesso.titulo}</h3>
        <p className="texto-secao mt-3">{t.sucesso.texto}</p>
        {zap && (
          <a
            href={linkWhatsapp(t.sucesso.whatsapp)}
            onClick={() => evento('whatsapp', { origem: 'pos-formulario' })}
            className="botao-fantasma mt-6"
          >
            {t.sucesso.botao}
          </a>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={enviar} className="cartao px-6 py-7">
      <p className="cota uppercase">{t.rotulo}</p>
      <h3 className="titulo-bloco mt-2">{t.titulo}</h3>

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
        className="botao-marca mt-5 w-full disabled:opacity-70"
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
