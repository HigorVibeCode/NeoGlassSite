import { useEffect, useId, useRef, useState } from 'react'
import { useTextos } from '../i18n/idioma.jsx'
import { evento } from '../lib/rastreio.js'
import MarcaIntelligence from './intelligence/MarcaIntelligence.jsx'
import './intelligence-industria.css'

export const EVENTO_INTELLIGENCE = 'neoglass:demo-intelligence'
const CICLO = 9600
const DIGITADO = 3200
const RESPOSTA = 5000
const FIM_EMPRESA = CICLO * 3 - 600
const TEMPOS = [0, 3200, 8400, 13600]
const FIM_SEGURANCA = 22500
const TRANSICAO = 2800

function Icone({ tipo, ...props }) {
  const paths = {
    enviar: 'M12 19V5m-6 6 6-6 6 6',
    check: 'm5 12 4 4L19 6',
    banco: 'M4 6c0-4 16-4 16 0s-16 4-16 0Zm0 0v12c0 4 16 4 16 0V6M4 12c0 4 16 4 16 0',
    escudo: 'M12 3 3 7v6c0 5 9 9 9 9s9-4 9-9V7l-9-4Zm-4 9 3 3 5-6',
    tela: 'M3 4h18v13H3V4Zm5 17h8m-4-4v4',
    pergunta: 'M4 4h16v12H9l-5 4V4Zm4 4h8m-8 4h5',
  }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d={paths[tipo] || paths.check}/></svg>
}

export default function IntelligenceIndustria() {
  const t = useTextos().industria.intelligence
  const a = t.animacao
  const [modo, setModo] = useState(0)
  const [tempo, setTempo] = useState(0)
  const [rodando, setRodando] = useState(true)
  const [visivel, setVisivel] = useState(false)
  const [reduzir, setReduzir] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [abaVisivel, setAbaVisivel] = useState(!document.hidden)
  const raiz = useRef(null)
  const abas = useRef([])
  const id = useId()
  const fim = modo === 0 ? FIM_EMPRESA : FIM_SEGURANCA
  const terminou = tempo >= fim
  const ativo = rodando && visivel && abaVisivel && !reduzir
  const transicao = terminou && !reduzir
  const consulta = modo === 0 ? Math.min(2, Math.floor(tempo / CICLO)) : 1
  const local = modo === 0 ? Math.min(tempo, FIM_EMPRESA) % CICLO : tempo
  const digitando = local < DIGITADO
  const respondeu = modo === 0 ? local >= RESPOSTA : tempo >= TEMPOS[3]
  const passo = modo === 0 ? digitando ? 0 : respondeu ? 2 : 1 : TEMPOS.reduce((n, inicio, i) => tempo >= inicio ? i : n, 0)
  const pergunta = t.perguntas[consulta]
  const r = t.respostas[consulta]
  const digitacao = reduzir ? pergunta : pergunta.slice(0, Math.floor(pergunta.length * Math.min(1, Math.max(0, (local - 350) / 2350))))
  const s = t.seguranca

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const atualizar = () => setReduzir(media.matches)
    media.addEventListener('change', atualizar)
    const io = new IntersectionObserver(([e]) => setVisivel(e.isIntersecting), { threshold: 0.15 })
    if (raiz.current) io.observe(raiz.current)
    const visibilidade = () => setAbaVisivel(!document.hidden)
    document.addEventListener('visibilitychange', visibilidade)
    return () => { media.removeEventListener('change', atualizar); io.disconnect(); document.removeEventListener('visibilitychange', visibilidade) }
  }, [])

  useEffect(() => {
    if (reduzir) { setTempo(fim); setRodando(false) }
  }, [reduzir, fim])

  useEffect(() => {
    if (!ativo) return
    // Um relógio governa digitação, envio, consulta e resposta; pausar congela tudo.
    let anterior = performance.now()
    const timer = setInterval(() => {
      const agora = performance.now()
      const delta = Math.min(250, agora - anterior)
      anterior = agora
      setTempo(v => Math.min(fim + TRANSICAO, v + delta))
    }, 40)
    return () => clearInterval(timer)
  }, [ativo, fim])

  useEffect(() => {
    if (reduzir || tempo < fim + TRANSICAO) return
    // Troca as duas partes no mesmo quadro; não há estado final esperando clique.
    setModo(m => 1 - m)
    setTempo(0)
  }, [tempo, fim, reduzir])

  useEffect(() => {
    const iniciar = () => { setModo(0); setTempo(reduzir ? FIM_EMPRESA : 0); setRodando(!reduzir) }
    window.addEventListener(EVENTO_INTELLIGENCE, iniciar)
    return () => window.removeEventListener(EVENTO_INTELLIGENCE, iniciar)
  }, [reduzir])

  const trocar = valor => {
    setModo(valor); setTempo(reduzir ? valor === 0 ? FIM_EMPRESA : FIM_SEGURANCA : 0); setRodando(!reduzir)
    evento('intelligence_demo', { modo: valor === 0 ? 'empresa' : 'protecao' })
  }
  const escolher = i => { setTempo(i * CICLO + (reduzir ? RESPOSTA + 1 : 0)); setRodando(!reduzir) }
  const etapa = i => { setTempo(TEMPOS[i]); setRodando(!reduzir) }
  const status = modo === 0 ? a.etapas[passo] : a.protecao[passo].titulo

  const saidaConsulta = modo === 0 && local > CICLO - 650 && !terminou
  return <div className="ng-intelligence" id="intelligence-demo" ref={raiz} data-playing={ativo} data-mode={modo} data-transition={transicao}>
    <div className="ngi-tabs" role="tablist" aria-label="NeoGlass Intelligence">
      {t.tabs.map((nome, i) => <button key={nome} ref={el => { abas.current[i] = el }} id={`${id}-tab-${i}`} type="button" role="tab" aria-selected={modo === i} aria-controls={`${id}-panel`} tabIndex={modo === i ? 0 : -1} onClick={() => trocar(i)} onKeyDown={e => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return
        e.preventDefault(); const destino = e.key === 'Home' ? 0 : e.key === 'End' ? 1 : 1 - i
        trocar(destino); abas.current[destino]?.focus()
      }}><Icone tipo={i === 0 ? 'pergunta' : 'escudo'}/>{nome}</button>)}
    </div>

    <div className="ngi-window" id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${modo}`}>
      <div className="ngi-bar"><span className="ngi-wordmark">Neo<span className="marca">Glass</span> <b>Intelligence</b></span><span className="ngi-demo-label">{a.demo}</span></div>
      <div className="ngi-film" key={modo}>
      <div className="ngi-story-heading"><span>{modo === 0 ? a.convite : a.protecaoConvite}</span><h3>{modo === 0 ? a.titulo : a.protecaoTitulo}</h3></div>
      <div className="ngi-choices" aria-label={modo === 0 ? a.escolha : undefined}>
        {modo === 0 ? t.fases.map((nome, i) => <button type="button" key={nome} aria-pressed={consulta === i} onClick={() => escolher(i)}><span>{i + 1}</span>{nome}{tempo >= i * CICLO + RESPOSTA && <Icone tipo="check"/>}</button>) : <p className="ngi-auto-path"><Icone tipo="escudo"/>{a.caminho}</p>}
      </div>

      <div className={`ngi-stage ${respondeu ? 'ngi-answered' : ''} ${modo === 1 ? 'ngi-stage-security' : ''} ${saidaConsulta ? 'ngi-stage-leaving' : ''}`}>
        <div className={`ngi-organism ${digitando ? 'ngi-organism-large' : ''}`}>
          <MarcaIntelligence estado={digitando ? 'idle' : respondeu ? 'success' : 'interpreting'} pausado={!ativo}/>
          {!digitando && <span>{modo === 0 ? respondeu ? a.consultado : a.consultando[consulta] : a.caminho}</span>}
        </div>
        {digitando ? <div className="ngi-invitation"><strong>{modo === 0 ? a.pergunte : a.mesmaPergunta}</strong><p>{modo === 0 ? a.semTelas : a.acompanhe}</p></div> : <p className="ngi-sent"><Icone tipo="pergunta"/>{pergunta}<span aria-hidden="true">✓</span></p>}

        {!digitando && modo === 0 && (respondeu ? <div className="ngi-answer" key={consulta}>
          <div className="ngi-answer-source"><Icone tipo="banco"/>{r.origem}<span><Icone tipo="check"/>{a.consultado}</span></div>
          <p className="ngi-answer-value">{r.valor}</p><h4>{r.unidade}</h4><p className="ngi-answer-detail">{r.detalhe}</p>
          <div className="ngi-answer-takeaway"><Icone tipo="check"/><span>{a.conclusoes[consulta]}</span></div>
        </div> : <div className="ngi-searching"><div className="ngi-scan"><Icone tipo="banco"/><span>{a.consultando[consulta]}</span><i/></div><div className="ngi-loading-lines" aria-hidden="true"><i/><i/><i/></div></div>)}

        {!digitando && modo === 1 && <ol className="ngi-simple-flow" aria-label={a.protecaoTitulo}>
          {a.fluxo.map((p,i)=><li key={p.titulo} className={`${passo>=i+1?'ngi-step-seen':''} ${passo===i+1?'ngi-step-active':''}`} aria-current={passo===i+1?'step':undefined}>
            <span className="ngi-step-number">{i+1}</span>
            <div className="ngi-step-copy"><small>{p.onde}</small><h4>{p.titulo}</h4><p>{p.texto}</p>
              {i===0 && <div className="ngi-step-transfer"><Icone tipo="pergunta"/><span>{a.visual.pergunta}</span><span className="ngi-transfer-arrow" aria-hidden="true">→</span><b>Gemini</b></div>}
              {i===1 && <div className="ngi-step-transfer"><Icone tipo="escudo"/><span>{s.permissao}</span><Icone tipo="check"/></div>}
              {i===2 && <div className="ngi-step-answer" aria-hidden={passo<3}><strong>{r.valor}</strong><span>{r.unidade}</span><Icone tipo="tela"/></div>}
            </div>
          </li>)}
          <li className={`ngi-simple-conclusion ${passo===3?'ngi-conclusion-seen':''}`} aria-hidden={passo<3}><Icone tipo="escudo"/><div><strong>{a.visual.naoEnvia}</strong><p>{a.visual.limite}</p><span className="ngi-wordmark">Neo<span className="marca">Glass</span></span></div></li>
        </ol>}

        <div className={`ngi-composer ${digitando ? 'ngi-typing' : ''}`}>
          <div className="ngi-input" aria-label={digitando ? pergunta : a.proxima} role="group"><span aria-hidden="true">{digitando ? digitacao : a.proxima}{digitando && <i className="ngi-caret"/>}</span></div>
          <button type="button" aria-label={digitando ? a.enviar : t.replay} onClick={() => { setTempo(reduzir ? modo === 0 ? consulta * CICLO + RESPOSTA : FIM_SEGURANCA : digitando ? modo === 0 ? consulta * CICLO + DIGITADO : DIGITADO : modo === 0 ? consulta * CICLO : 0); setRodando(!reduzir) }}>{digitando ? <Icone tipo="enviar"/> : <span aria-hidden="true">↻</span>}</button>
        </div>
      </div>
      </div>

      {transicao && <div className="ngi-interlude" role="status">
        <span className="ngi-interlude-label">{a.automatico}</span>
        <Icone tipo={modo === 0 ? 'escudo' : 'pergunta'}/>
        <h3>{modo === 0 ? a.ponteSeguranca : a.ponteEmpresa}</h3>
        <p>{modo === 0 ? a.protecaoConvite : a.convite}</p>
        <span className="ngi-interlude-track" aria-hidden="true"><i/></span>
      </div>}

      <div className="ngi-status" role="status"><span className={ativo ? 'ngi-status-dot ngi-status-active' : 'ngi-status-dot'}/><span>{terminou ? modo === 0 ? a.final : a.protecao.at(-1).titulo : status}</span></div>
      <div className="ngi-controls">
        {modo === 0 ? <div className="ngi-timeline" aria-hidden="true">{[0,1,2].map(i => <span key={i}><i style={{width: `${Math.min(100,Math.max(0,(tempo-i*CICLO)/CICLO*100))}%`}}/></span>)}</div> : <div className="ngi-step-buttons" aria-label={a.etapasLabel}>{a.fluxo.map((p,i) => <button type="button" key={i} aria-label={`${i+1}. ${p.titulo}`} aria-current={passo===i+1 ? 'step' : undefined} onClick={()=>etapa(i+1)}>{i+1}</button>)}</div>}
        {!reduzir && <button className="ngi-play" type="button" onClick={() => setRodando(v => !v)}><span aria-hidden="true">{rodando ? 'Ⅱ' : '▷'}</span>{rodando ? t.pause : t.play}</button>}
      </div>
    </div>
    <p className="ngi-caption">{t.rotulo}</p>
    <p className="ngi-note">{modo === 0 ? t.nota : s.nota}</p>
  </div>
}
