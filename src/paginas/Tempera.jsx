import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Marca from '../components/Marca.jsx'
import { CONFIG, precoVidracaria } from '../config.js'
import { caminhoDe } from '../lib/paginasSeo.js'
import { origemGuardada } from '../lib/indicacao.js'
import { urlDaAgenda } from '../lib/funil.js'
import { evento } from '../lib/rastreio.js'
import { useIdioma } from '../i18n/idioma.jsx'
import './tempera.css'

/**
 * A calculadora da têmpera: destino do filme e do anúncio do YouTube.
 *
 * Sete telas, uma pergunta por tela, e a régua do topo anda uma marca a cada
 * resposta. Quem é vidraçaria sai na primeira tela para o cadastro que já
 * existe (/comecar). Quem é têmpera responde produção, dados, testes, início
 * e quem participa da conversa, e deixa o contato.
 *
 * Nenhuma tela rola: depois de desenhar, a página mede e, se não couber,
 * compacta por níveis (`data-c`) até caber.
 *
 * O envio vai para a Edge Function `site-tempera`, que grava e avisa por
 * e-mail. Se ela falhar, o WhatsApp abre com tudo preenchido: o contato nunca
 * se perde.
 */

const T = CONFIG.tempera
const ORDEM = ['neg', 'prod', 'dad', 'teste', 'ini', 'quem', 'contato']
/* Envio que não chegou ao servidor fica guardado no aparelho e é reenviado na
   próxima visita: o WhatsApp que abre na hora pode não ser enviado, e esse
   contato veio de um anúncio pago. */
const PENDENTE = 'ng_tempera_pendente'
const guardarPendente = (corpo) => { try { localStorage.setItem(PENDENTE, JSON.stringify(corpo)) } catch { /* sem armazenamento: fica o WhatsApp */ } }
const lerPendente = () => { try { return JSON.parse(localStorage.getItem(PENDENTE) || 'null') } catch { return null } }
const limparPendente = () => { try { localStorage.removeItem(PENDENTE) } catch { /* nada a limpar */ } }
async function postar(corpo, ms = 20000) {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), ms)
  try {
    return await fetch(CONFIG.temperaApi, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(corpo), signal: ctrl.signal })
  } finally {
    clearTimeout(timer)
  }
}

const ESP = [[74, 106, 224], [14, 140, 106], [127, 224, 200], [251, 176, 59], [224, 85, 106]]

export function mensalTempera(m2) {
  if (m2 > T.limite) return null
  if (m2 <= T.ateBase) return T.base
  return T.base + T.porPasso * Math.ceil((m2 - T.ateBase) / T.passo)
}

function limites(m2) {
  if (m2 <= T.ateBase) return [0, T.ateBase]
  if (m2 > T.limite) return [T.limite + 1, Infinity]
  const n = Math.ceil((m2 - T.ateBase) / T.passo)
  const a = T.ateBase + (n - 1) * T.passo
  return [a + 1, a + T.passo]
}

/** A cor do espectro do filme num ponto de 0 a 1. */
function corEm(k) {
  const x = Math.min(0.999, Math.max(0, k)) * (ESP.length - 1)
  const i = Math.floor(x)
  const f = x - i
  return ESP[i].map((v, j) => Math.round(v + (ESP[i + 1][j] - v) * f))
}
const hex = (c) => '#' + c.map((v) => v.toString(16).padStart(2, '0')).join('')
/* versão escura da mesma cor, para texto legível sobre o fundo claro */
const escura = (c) => hex(c.map((v) => Math.round(v * 0.62)))

const brl = (n) => 'R$ ' + Math.round(n).toLocaleString('pt-BR')

function Opcao({ grupo, valor, titulo, descricao, preco, precoClasse = '', escolhido, onEscolher }) {
  return (
    <button type="button" className="tp-op" aria-pressed={escolhido === valor} onClick={() => onEscolher(grupo, valor)}>
      <span className="tp-bola" aria-hidden="true" />
      <span className="t">{titulo}</span>
      <span className={`p ${precoClasse}`}>{preco}</span>
      {descricao && <span className="d">{descricao}</span>}
    </button>
  )
}

function Chapa({ cheia, children }) {
  return (
    <div className={`chapa tp-chapa ${cheia ? 'cheia' : ''}`}>
      <span className="brilho" aria-hidden="true" />
      {children}
    </div>
  )
}

export default function Tempera() {
  const { idioma, c } = useIdioma()
  const t = c.tempera
  const comPreco = idioma === 'pt'
  const n0 = (n) => n.toLocaleString(idioma === 'pt' ? 'pt-BR' : idioma)

  const [tela, setTela] = useState('neg')
  const [dir, setDir] = useState(1)
  const [S, setS] = useState({ neg: null, m2: 4000, dad: null, teste: null, ini: null, quem: null })
  const [ct, setCt] = useState({ nome: '', empresa: '', whatsapp: '', encNome: '', encWhatsapp: '', site: '' })
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [campanha] = useState(() => ({ utm_source: 'site', utm_medium: 'organic', utm_campaign: 'tempera_v1', ...origemGuardada() }))
  const palco = useRef(null)
  const regua = useRef(null)
  const raiz = useRef(null)

  const idx = tela === 'feito' ? ORDEM.length - 1 : tela === 'vidracaria' ? 0 : ORDEM.indexOf(tela)
  const k = idx / (ORDEM.length - 1)
  const cor = corEm(k)
  const mensal = mensalTempera(S.m2)
  const [a, b] = limites(S.m2)
  const faixaTxt = b === Infinity ? t.prod.maisDe(n0(T.limite)) : a === 0 ? t.prod.ateFaixa(n0(b)) : t.prod.faixa(n0(a), n0(b))
  const unica = S.dad === 'neoglass' ? T.migracao : 0
  const mostraVals = S.neg === 'tempera' && idx >= 1 && tela !== 'contato' && tela !== 'feito'

  /* nunca rolar: mede e compacta até caber */
  const encaixa = useCallback(() => {
    const p = palco.current
    if (!p) return
    raiz.current?.classList.toggle('curto', window.innerHeight < 720)
    regua.current?.style.setProperty('--tp-rw', regua.current.offsetWidth + 'px')
    const sc = document.scrollingElement || document.documentElement
    for (let n = 0; n <= 3; n++) {
      p.dataset.c = n
      if (sc.scrollHeight <= window.innerHeight + 1) break
    }
  }, [])
  useLayoutEffect(encaixa, [tela, erro, S.quem, encaixa])
  useEffect(() => {
    const pendente = CONFIG.temperaApi && lerPendente()
    if (pendente) postar(pendente).then((r) => { if (r.ok || r.status === 400) limparPendente() }).catch(() => {})
  }, [])
  useEffect(() => {
    window.addEventListener('resize', encaixa)
    return () => window.removeEventListener('resize', encaixa)
  }, [encaixa])

  function ir(nome, d = 1) {
    setDir(d)
    setTela(nome)
    setErro('')
    window.scrollTo({ top: 0 })
    if (ORDEM.includes(nome)) evento('tempera_etapa', { etapa: nome })
  }
  const proxima = () => ir(ORDEM[ORDEM.indexOf(tela) + 1], 1)
  const anterior = () => ir(tela === 'vidracaria' ? 'neg' : ORDEM[Math.max(0, ORDEM.indexOf(tela) - 1)], -1)

  /* um toque responde e já avança: a pessoa vê a marca e a tela segue */
  function escolher(grupo, valor) {
    setS((s) => ({ ...s, [grupo]: valor }))
    const calmo = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setTimeout(() => {
      if (grupo === 'neg') ir(valor === 'tempera' ? 'prod' : 'vidracaria', 1)
      else ir(ORDEM[ORDEM.indexOf(grupo) + 1], 1)
    }, calmo ? 0 : 260)
  }

  const rotulos = () => ({
    empresa: ct.empresa,
    nome: ct.nome,
    faixa: faixaTxt,
    dados: S.dad === 'neoglass' ? t.dad.neoglass[0] : t.dad.sozinho[0],
    testes: S.teste === 'presencial' ? t.teste.presencial[0] : t.teste.remoto[0],
    inicio: t.ini[S.ini] ?? '',
    quem: t.feito.quemV[S.quem] ?? '',
  })
  const abrirWhatsapp = () =>
    window.open(`https://wa.me/${CONFIG.whatsappNumero}?text=${encodeURIComponent(t.whatsapp(rotulos()))}`, '_blank', 'noopener')

  async function enviar() {
    const falta = ['nome', 'empresa', 'whatsapp'].find((campo) => !ct[campo].trim())
    if (falta) {
      setErro(t.contato.falta[falta])
      document.getElementById(`tp-${falta}`)?.focus()
      return
    }
    if (!CONFIG.temperaApi) {
      abrirWhatsapp()
      evento('whatsapp', { origem: 'tempera' })
      return ir('feito')
    }
    setEnviando(true)
    const corpo = {
      nome: ct.nome,
      empresa: ct.empresa,
      whatsapp: ct.whatsapp,
      enc_nome: S.quem === 'ambos' ? ct.encNome : '',
      enc_whatsapp: S.quem === 'ambos' ? ct.encWhatsapp : '',
      producao_m2: S.m2,
      dados: S.dad,
      testes: S.teste,
      inicio: S.ini,
      participantes: S.quem,
      idioma,
      origem: campanha.utm_source,
      marketing: campanha,
      site: ct.site,
    }
    try {
      const r = await postar(corpo)
      if (r.status === 429) {
        setErro(t.contato.muitas)
        return
      }
      if (!r.ok) throw new Error(String(r.status))
      limparPendente()
      evento('lead', { origem: 'tempera' })
      ir('feito')
    } catch {
      guardarPendente(corpo)
      setErro(t.contato.erro)
      abrirWhatsapp()
      evento('whatsapp', { origem: 'tempera' })
    } finally {
      setEnviando(false)
    }
  }

  const bloco = (rot) => (
    <div className="tp-bloco">
      <span className="cota uppercase">{rot}</span>
      <span className="cota">FL. 0{idx + 1}/07</span>
    </div>
  )
  const titulo = ([antes, destaque]) => (
    <h1 className="display">
      {antes} <span className="marca">{destaque}</span>
    </h1>
  )
  const acoes = (principal) => (
    <div className="tp-acoes">
      {principal}
      {tela !== 'neg' && (
        <button type="button" className="tp-voltar" onClick={anterior}>
          {t.voltar}
        </button>
      )}
    </div>
  )
  const op = (grupo, valor, [tt, dd], preco, precoClasse) => (
    <Opcao grupo={grupo} valor={valor} titulo={tt} descricao={dd} preco={preco} precoClasse={precoClasse} escolhido={S[grupo]} onEscolher={escolher} />
  )

  const telas = {
    neg: () => (
      <>
        {bloco(t.neg.rot)}
        {titulo(t.neg.titulo)}
        <p className="tp-texto">{t.neg.texto}</p>
        <Chapa>
          {op('neg', 'tempera', t.neg.tempera)}
          {op('neg', 'vidracaria', t.neg.vidracaria)}
        </Chapa>
      </>
    ),
    vidracaria: () => (
      <>
        {bloco(t.vid.rot)}
        {titulo(t.vid.titulo)}
        <p className="tp-texto">{t.vid.texto(precoVidracaria(idioma) ?? '')}</p>
        {acoes(
          <a className="botao-marca tp-botao" href={caminhoDe('comecar', idioma)} onClick={() => evento('comecar', { origem: 'tempera' })}>
            {t.vid.acao}
          </a>,
        )}
      </>
    ),
    prod: () => {
      const kk = (Math.min(S.m2, 16000) - 1000) / 15000
      return (
        <>
          {bloco(t.prod.rot)}
          {titulo(t.prod.titulo)}
          <Chapa cheia>
            <div className="tp-faixa">
              {b === Infinity ? (
                <>+{n0(T.limite)}<small>m²</small></>
              ) : a === 0 ? (
                <><span className="a">{t.prod.ate}</span>{n0(b)}<small>m²</small></>
              ) : (
                <>{n0(a)}<span className="a">{t.prod.a}</span>{n0(b)}<small>m²</small></>
              )}
            </div>
            <input
              type="range"
              min="1000"
              max="16000"
              step="1000"
              value={Math.min(S.m2, 16000)}
              aria-label={t.prod.titulo.join(' ')}
              aria-valuetext={faixaTxt}
              style={{ '--p': `${kk * 100}%`, '--tp-polegar': hex(corEm(kk)) }}
              onChange={(e) => setS((s) => ({ ...s, m2: Number(e.target.value) }))}
            />
            <div className="tp-esc" aria-hidden="true">
              <span className="cota">{t.prod.min}</span>
              <span className="cota">{t.prod.max}</span>
            </div>
            {comPreco ? (
              <div className="tp-preco">
                <b>{mensal == null ? t.prod.sobConsulta : brl(mensal)}</b>
                {mensal != null && <span>{t.prod.porMes}</span>}
              </div>
            ) : null}
            <p className="tp-explica">{mensal == null ? t.prod.acima : comPreco ? t.prod.dentro : t.prod.semPreco}</p>
          </Chapa>
          {acoes(
            <button type="button" className="botao-marca tp-botao" onClick={proxima}>
              {t.continuar}
            </button>,
          )}
        </>
      )
    },
    dad: () => (
      <>
        {bloco(t.dad.rot)}
        {titulo(t.dad.titulo)}
        <p className="tp-texto">{t.dad.texto}</p>
        <Chapa>
          {op('dad', 'sozinho', t.dad.sozinho, t.gratis, 'gratis')}
          {op('dad', 'neoglass', t.dad.neoglass, comPreco ? '+ ' + brl(T.migracao) : '')}
        </Chapa>
        {acoes()}
      </>
    ),
    teste: () => (
      <>
        {bloco(t.teste.rot)}
        {titulo(t.teste.titulo)}
        <p className="tp-texto">{t.teste.texto}</p>
        <Chapa>
          {op('teste', 'remoto', t.teste.remoto, t.incluso, 'gratis')}
          {op('teste', 'presencial', t.teste.presencial, comPreco ? brl(T.diaria) + t.porDia : '')}
        </Chapa>
        {acoes()}
      </>
    ),
    ini: () => (
      <>
        {bloco(t.ini.rot)}
        {titulo(t.ini.titulo)}
        <Chapa>
          {op('ini', 'ja', [t.ini.ja])}
          {op('ini', 'mes', [t.ini.mes])}
          {op('ini', 'depois', [t.ini.depois])}
        </Chapa>
        {acoes()}
      </>
    ),
    quem: () => (
      <>
        {bloco(t.quem.rot)}
        {titulo(t.quem.titulo)}
        <p className="tp-texto">{t.quem.texto}</p>
        <Chapa>
          {op('quem', 'dono', t.quem.dono)}
          {op('quem', 'enc', t.quem.enc)}
          {op('quem', 'ambos', t.quem.ambos, t.recomendado)}
        </Chapa>
        {acoes()}
      </>
    ),
    contato: () => {
      const campo = (id, rot, extra = {}) => (
        <label className={extra.largo ? 'largo' : undefined}>
          <span className="cota uppercase">{rot}</span>
          <input
            className="campo"
            id={`tp-${id}`}
            value={ct[id]}
            onChange={(e) => setCt((v) => ({ ...v, [id]: e.target.value }))}
            {...extra.attrs}
          />
        </label>
      )
      const fone = { type: 'tel', inputMode: 'tel', autoComplete: 'tel', placeholder: t.contato.placeholder }
      return (
        <>
          {bloco(t.contato.rot)}
          {titulo(t.contato.titulo)}
          <p className="tp-texto">{t.contato.texto}</p>
          <Chapa cheia>
            <form className="tp-campos" noValidate onSubmit={(e) => { e.preventDefault(); enviar() }}>
              {campo('nome', t.contato.nome, { attrs: { autoComplete: 'name' } })}
              {campo('empresa', t.contato.empresa, { attrs: { autoComplete: 'organization' } })}
              {campo('whatsapp', t.contato.whatsapp, { largo: true, attrs: fone })}
              {S.quem === 'ambos' && (
                <>
                  <div className="tp-sep"><span className="cota uppercase">{t.contato.encarregado}</span></div>
                  {campo('encNome', t.contato.encNome)}
                  {campo('encWhatsapp', t.contato.whatsapp, { attrs: { ...fone, autoComplete: 'off' } })}
                </>
              )}
              {/* isca: humano não vê, robô preenche */}
              <input type="text" name="site" tabIndex={-1} autoComplete="off" aria-hidden="true" value={ct.site}
                onChange={(e) => setCt((v) => ({ ...v, site: e.target.value }))}
                style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />
              <button type="submit" hidden />
            </form>
          </Chapa>
          {acoes(
            <button type="button" className="botao-marca tp-botao" onClick={enviar} disabled={enviando}>
              {enviando ? t.enviando : t.enviar}
            </button>,
          )}
          {erro && <p className="tp-nota tp-erro" role="alert">{erro}</p>}
        </>
      )
    },
    feito: () => {
      const agenda = urlDaAgenda(CONFIG.agendar, origemGuardada())
      const primeiro = ct.nome.trim().split(/\s+/)[0] || ''
      const enc = S.quem === 'ambos' ? ct.encNome.trim().split(/\s+/)[0] : ''
      const linhas = [
        [t.feito.producao, faixaTxt],
        ...(comPreco ? [[t.feito.mensalidade, mensal == null ? t.naConversa : brl(mensal)]] : []),
        [t.feito.dados, S.dad === 'neoglass' ? t.feito.dadosV.neoglass(comPreco ? brl(T.migracao) : '') : t.feito.dadosV.sozinho],
        [t.feito.testes, S.teste === 'presencial' ? t.feito.testesV.presencial(comPreco ? brl(T.diaria) : '') : t.feito.testesV.remoto],
        [t.feito.comecar, t.ini[S.ini]],
        [t.feito.conversa, t.feito.quemV[S.quem]],
      ]
      return (
        <>
          <svg className="tp-feito" viewBox="0 0 100 100" aria-hidden="true">
            <defs>
              <linearGradient id="tp-arco" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#4a6ae0" />
                <stop offset=".3" stopColor="#0e8c6a" />
                <stop offset=".55" stopColor="#7fe0c8" />
                <stop offset=".8" stopColor="#fbb03b" />
                <stop offset="1" stopColor="#e0556a" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="45" />
            <path d="M30 52 l14 14 l27 -30" />
          </svg>
          {titulo(t.feito.titulo(primeiro))}
          <p className="tp-texto">{agenda ? t.feito.textoAgenda(enc) : t.feito.texto(enc)}</p>
          <Chapa cheia>
            <div className="tp-resumo">
              {linhas.map(([rot, val]) => (
                <div key={rot}><span>{rot}</span><b>{val}</b></div>
              ))}
            </div>
          </Chapa>
          {/* A agenda vem DEPOIS do contato: quem marca já disse quem é e quanto
              produz. Abre em outra aba porque o Calendly não cabe numa tela que
              não rola — e o contato já está gravado, não se perde se ele fechar. */}
          {agenda && (
            <div className="tp-acoes">
              <a
                className="botao-marca tp-botao"
                href={agenda}
                target="_blank"
                rel="noreferrer"
                onClick={() => evento('agendar', { origem: 'tempera-feito' })}
              >
                {t.feito.agendar}
              </a>
            </div>
          )}
        </>
      )
    },
  }

  const posEtapa = (i) => ({ '--x': `${(i / (ORDEM.length - 1)) * 100}%`, '--t': i === 0 ? '0' : i === ORDEM.length - 1 ? '-100%' : '-50%' })

  return (
    <div ref={raiz} className="tp" style={{ '--tp-cor': hex(cor), '--tp-cor-txt': escura(cor) }}>
      <header className="tp-topo">
        <div className="tp-l1">
          <a href={caminhoDe('home', idioma)} aria-label={c.chrome?.inicio ?? 'NeoGlass'}><Marca /></a>
          {mostraVals ? (
            <div className="tp-vals">
              <div><span>{t.mensal}</span><b>{comPreco ? (mensal == null ? t.naConversa : brl(mensal)) : t.naConversa}</b></div>
              <div>
                <span>{S.teste === 'presencial' ? t.unicaDiarias : t.unica}</span>
                <b>{comPreco ? (unica ? brl(unica) : 'R$ 0') : t.naConversa}</b>
              </div>
            </div>
          ) : (
            <span className="tp-fl">{tela === 'feito' ? t.concluido : `FL. 0${idx + 1}/07`}</span>
          )}
        </div>
        <div className="tp-regua" ref={regua} aria-hidden="true">
          <i className="tp-marcas" />
          <i className="tp-base" />
          <i className="tp-cheio" style={{ width: `${k * 100}%` }} />
          <i className="tp-ponto" style={{ left: `${k * 100}%` }} />
          <div className="tp-etapas">
            {t.etapas.map((nome, i) => (
              <span key={nome} className={i < idx ? 'feita' : i === idx ? 'agora' : ''} style={posEtapa(i)}>
                {nome}
              </span>
            ))}
          </div>
        </div>
      </header>
      <div className="tp-palco" ref={palco} aria-live="polite">
        <div key={tela} className={`tp-tela ${dir < 0 ? 'volta' : ''}`}>
          {telas[tela]()}
        </div>
      </div>
    </div>
  )
}
