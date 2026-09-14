import {useEffect, useRef, useState} from 'react'
import './marca-intelligence.css'

// Geometria e seis cores oficiais. Sem Tailwind ou dependências do site.
export default function MarcaIntelligence({estado='idle',pausado=false,tamanho=220,className=''}){
  const raiz=useRef(null),fundo=useRef(null),giro=useRef(null)
  const [disponivel,setDisponivel]=useState(false)
  const fase=['thinking','interpreting','generating'].includes(estado)?'thinking':estado==='success'?'success':'idle'
  const parado=pausado||!disponivel
  useEffect(()=>{
    const media=window.matchMedia('(prefers-reduced-motion: reduce)')
    let visivel=true
    const atualizar=()=>setDisponivel(!media.matches&&!document.hidden&&visivel)
    const observador=new IntersectionObserver(([e])=>{visivel=e.isIntersecting;atualizar()})
    observador.observe(raiz.current)
    media.addEventListener('change',atualizar);document.addEventListener('visibilitychange',atualizar)
    // O compositor mantém o ângulo ao trocar de velocidade ou pausar.
    giro.current=fundo.current.animate([{transform:'rotate(0deg)'},{transform:'rotate(360deg)'}],{duration:40000,iterations:Infinity})
    giro.current.pause();atualizar()
    return()=>{observador.disconnect();media.removeEventListener('change',atualizar);document.removeEventListener('visibilitychange',atualizar);giro.current?.cancel()}
  },[])
  useEffect(()=>{
    const anim=giro.current;if(!anim)return
    if(parado||fase==='success')anim.pause()
    else {anim.updatePlaybackRate(fase==='thinking'?5:1);anim.play()}
  },[parado,fase])
  return <div ref={raiz} className={`ngi-brand-ai ${className}`} style={{'--ngi-logo-size':`${tamanho}px`}} data-state={fase} data-paused={parado} aria-hidden="true">
    <div className="ngi-brand-aura"/>
    <div className="ngi-brand-core">
      <div className="ngi-brand-color" ref={fundo}/>
      <svg className="ngi-brand-glyph" viewBox="0 0 860 684" fill="none">
        <path d="M452.5,78.9 L757.5,606.1 Q780,645 735,645 L125,645 Q80,645 102.5,606.1 L407.5,78.9 Q430,40 452.5,78.9 Z" fill="#fff"/>
        <g strokeLinecap="round" strokeWidth="52">
          <line className="ngi-brand-ray" x1="20" y1="235" x2="396" y2="372" stroke="#c6d8ff"/>
          <line className="ngi-brand-ray" x1="45" y1="330" x2="355" y2="443" stroke="#ffcaa4"/>
          <line className="ngi-brand-ray" x1="100" y1="448" x2="302" y2="522" stroke="#ffa0a0"/>
        </g>
      </svg><i className="ngi-brand-shine"/>
    </div>
    <svg className="ngi-brand-track" viewBox="0 0 160 160" fill="none"><rect x="13" y="13" width="134" height="134" rx="40" pathLength="100"/></svg>
    <span className="ngi-brand-done"><svg viewBox="0 0 24 24" fill="none"><path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
  </div>
}
