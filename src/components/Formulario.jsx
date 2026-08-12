import { useState } from 'react'
import { CONFIG, linkWhatsapp } from '../config.js'
import { evento } from '../lib/rastreio.js'

const PERFIS = [
  'Indústria de vidro (mesa de corte e forno)',
  'Vidraçaria',
  'Distribuidora / vidraçaria com corte',
  'Outro',
]

const campo =
  'w-full rounded-[11px] border border-line bg-card px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-dim/70 focus:border-verde'

export default function Formulario() {
  const [dados, setDados] = useState({ nome: '', empresa: '', whatsapp: '', perfil: PERFIS[0] })
  const [estado, setEstado] = useState('parado') // parado · enviando · pronto · erro
  const [erro, setErro] = useState('')

  const muda = (campo) => (e) => setDados((d) => ({ ...d, [campo]: e.target.value }))

  const mensagem = () =>
    `Olá! Quero ver o NeoGlass.\n\nNome: ${dados.nome}\nEmpresa: ${dados.empresa}\nPerfil: ${dados.perfil}`

  async function enviar(e) {
    e.preventDefault()
    if (estado === 'enviando') return
    setErro('')
    setEstado('enviando')

    const { url, chaveAnon, tabela } = CONFIG.supabase

    // Sem banco configurado, o lead vai pelo WhatsApp com tudo preenchido.
    if (!url || !chaveAnon) {
      evento('whatsapp', { origem: 'formulario' })
      window.open(linkWhatsapp(mensagem()), '_blank', 'noopener')
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
      setErro('Não deu para enviar agora. Chame no WhatsApp que eu respondo direto.')
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
        <h3 className="display mt-5 text-[22px]">Recebido.</h3>
        <p className="mx-auto mt-3 max-w-[34ch] text-[15px] text-dim">
          Eu retorno no WhatsApp para combinar o horário. Se preferir adiantar, o número está aqui
          embaixo.
        </p>
        <a
          href={linkWhatsapp('Olá! Acabei de preencher o formulário no site do NeoGlass.')}
          onClick={() => evento('whatsapp', { origem: 'pos-formulario' })}
          className="mt-6 inline-block rounded-[13px] border border-line px-6 py-3 text-[15px] font-bold text-ink transition-colors hover:border-verde hover:text-verde"
        >
          Falar agora no WhatsApp
        </a>
      </div>
    )
  }

  return (
    <form onSubmit={enviar} className="rounded-[20px] border border-line bg-card px-6 py-7 sm:px-7">
      <p className="font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-dim">
        Agendar apresentação
      </p>
      <h3 className="display mt-2.5 text-[21px]">Deixe o contato, eu retorno.</h3>

      <div className="mt-6 grid gap-3">
        <input
          className={campo}
          placeholder="Seu nome"
          value={dados.nome}
          onChange={muda('nome')}
          required
          autoComplete="name"
        />
        <input
          className={campo}
          placeholder="Empresa"
          value={dados.empresa}
          onChange={muda('empresa')}
          required
          autoComplete="organization"
        />
        <input
          className={campo}
          placeholder="WhatsApp com DDD"
          value={dados.whatsapp}
          onChange={muda('whatsapp')}
          required
          inputMode="tel"
          autoComplete="tel"
        />
        <select className={campo} value={dados.perfil} onChange={muda('perfil')}>
          {PERFIS.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={estado === 'enviando'}
        className="botao-marca mt-5 w-full px-6 py-3.5 text-[15px] transition-transform duration-200 hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-70"
      >
        {estado === 'enviando' ? 'Enviando…' : 'Quero ver funcionando'}
      </button>

      {erro && (
        <p className="mt-3 text-[13px] font-semibold text-ember" role="alert">
          {erro}
        </p>
      )}

      <p className="mt-4 text-[12.5px] leading-[1.5] text-dim">
        Sem cadastro, sem lista de e-mail. O contato é usado só para marcar a apresentação.
      </p>
    </form>
  )
}
