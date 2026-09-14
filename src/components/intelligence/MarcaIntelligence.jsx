import {Simbolo} from '../Marca.jsx'
import './marca-intelligence.css'

// O mesmo glifo e gradiente do cabeçalho/login; só a luz e o movimento mudam.
export default function MarcaIntelligence({estado='idle',pausado=false}){
  return <div className="ia2-triangulo ngi-brand-ai" data-state={estado} data-paused={pausado} aria-hidden="true">
    <div className="ngi-brand-aura"/>
    <div className="ngi-brand-core"><Simbolo className="ngi-brand-icon"/><i className="ngi-brand-shine"/></div>
    <svg className="ngi-brand-track" viewBox="0 0 160 160" fill="none"><rect x="13" y="13" width="134" height="134" rx="40" pathLength="100"/></svg>
  </div>
}
