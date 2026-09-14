import { useId, useState } from 'react'
import { CONFIG, moedaDe } from '../config.js'
import { useIdioma } from '../i18n/idioma.jsx'
import textos from '../conteudo/areas/partner-simulacao.js'
import { simularPartner } from '../lib/simulacaoPartner.js'
import './simulador-partner.css'

export default function SimuladorPartner({ contato, aoContatar }) {
  const { idioma } = useIdioma()
  const t = textos[idioma] || textos.pt
  const [clientes, setClientes] = useState(5)
  const [todoMes, setTodoMes] = useState(false)
  const [escolhaMoeda, setEscolhaMoeda] = useState(null)
  const moeda = escolhaMoeda?.idioma === idioma ? escolhaMoeda.moeda : moedaDe(idioma)
  const id = useId()
  const s = simularPartner(clientes, todoMes, 12, moeda)
  const fmt = n => new Intl.NumberFormat(moeda === 'CHF' ? 'de-CH' : {pt:'pt-BR',en:'en-US',es:'es-ES',de:'de-DE'}[idioma] || 'pt-BR', {style:'currency',currency:moeda}).format(n / 100)
  const max = Math.max(...s.meses.map(m => m.total), 1)
  return <section className="ngp-sim" id="simular-comissao">
    <header><p className="cota uppercase">{t.rotulo}</p><h2 className="display">{t.titulo}</h2><p>{t.texto}</p></header>
    <div className="ngp-calculator">
      <div className="ngp-config">
        <div className="ngp-modes" role="group" aria-label={t.rotulo}>{t.modos.map((nome,i)=><button type="button" key={nome} aria-pressed={todoMes === Boolean(i)} onClick={()=>setTodoMes(Boolean(i))}>{nome}</button>)}</div>
        <div className="ngp-range-label"><label htmlFor={id}>{t.quantidade[Number(todoMes)]}</label><output htmlFor={id}>{clientes}</output></div>
        <input id={id} type="range" min="1" max="20" step="1" value={clientes} onChange={e=>setClientes(Number(e.target.value))}/>
        <div className="ngp-range-ends" aria-hidden="true"><span>1</span><span>20</span></div>
        <label className="ngp-base" style={{display:'block'}}>{t.moeda} <select value={moeda} onChange={e=>setEscolhaMoeda({idioma,moeda:e.target.value})} style={{minHeight:44,fontSize:16,padding:'0 12px',border:'1px solid #d1e1de',borderRadius:8}}>{Object.keys(CONFIG.vidracaria.precos).map(m=><option key={m} value={m}>{m}</option>)}</select></label>
        <p className="ngp-base">{t.base(fmt(s.mensalidade))} {t.regras}</p>
      </div>
      <div className="ngp-outcome" aria-live="polite">
        <p className="ngp-scenario">{t.cenario(clientes,todoMes)}</p>
        <div className="ngp-months">{[[0,t.mes1],[1,t.mes2],[11,t.mes12]].map(([i,label])=><div key={i}><span>{label}</span><strong>{fmt(s.meses[i].total)}</strong><small>{i===0?t.primeira:todoMes?t.acumulando:t.mesmaTurma}</small></div>)}</div>
        <div className="ngp-total"><span>{t.total}</span><strong>{fmt(s.total)}</strong></div>
        <p className="ngp-summary">{todoMes ? t.resumoMensal(clientes,fmt(s.meses[11].total)) : t.resumo(clientes,fmt(s.meses[1].total))}</p>
      </div>
      <div className="ngp-chart" aria-hidden="true">{s.meses.map(m=><div key={m.mes}><div className="ngp-column"><i style={{height:`${m.continuidade/max*100}%`}}/><b style={{height:`${m.entrada/max*100}%`}}/></div><span>{m.mes}</span></div>)}</div>
      <details className="ngp-details"><summary>{t.detalhes}</summary><div className="ngp-table-scroll"><table><caption>{t.cenario(clientes,todoMes)}</caption><thead><tr>{[t.mes,t.entrada,t.recorrencia,t.soma].map(h=><th key={h} scope="col">{h}</th>)}</tr></thead><tbody>{s.meses.map(m=><tr key={m.mes}><th scope="row">{m.mes}</th><td>{fmt(m.entrada)}</td><td>{fmt(m.continuidade)}</td><td>{fmt(m.total)}</td></tr>)}</tbody></table></div></details>
      <p className="ngp-conditions">{t.condicao}</p>
      <a className="botao-marca ngp-cta" href={contato} onClick={aoContatar}>{t.acao}</a>
    </div>
  </section>
}
