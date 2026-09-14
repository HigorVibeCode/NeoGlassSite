import {useEffect, useRef, useState} from 'react'
import {CONFIG, linkEmail, paisProvavel} from '../config.js'
import {useIdioma} from '../i18n/idioma.jsx'
import textos from '../conteudo/areas/partner-cadastro.js'
import {origemGuardada} from '../lib/indicacao.js'
import {evento} from '../lib/rastreio.js'

const campo='w-full rounded-xl border border-line bg-card px-4 py-3 text-base outline-none focus:border-verde'
export default function PartnerCadastro(){
  const {idioma,c}=useIdioma(), t=textos[idioma], f=c.comecar.formulario
  const [dados,setDados]=useState({nome:'',email:'',pais:paisProvavel(idioma),senha:'',site:''})
  const [estado,setEstado]=useState('parado'),[erro,setErro]=useState(''),[lento,setLento]=useState(false),[mostrar,setMostrar]=useState(false)
  const enviando=useRef(false)
  useEffect(()=>{if(estado!=='enviando')return;const timer=setTimeout(()=>setLento(true),10000);return()=>clearTimeout(timer)},[estado])
  const alterar=e=>setDados(v=>({...v,[e.target.name]:e.target.value}))
  async function enviar(e){
    e.preventDefault();if(enviando.current)return
    enviando.current=true;setErro('');setLento(false);setEstado('enviando')
    const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),45000)
    try{
      const origem=origemGuardada()
      const resposta=await fetch(CONFIG.cadastroApi,{method:'POST',headers:{'Content-Type':'application/json'},signal:controller.signal,
        body:JSON.stringify({...dados,perfil:'partner',idioma,origem:'partner-site',marketing:origem})})
      const corpo=await resposta.json().catch(()=>({}))
      if(!resposta.ok)throw new Error(resposta.status===409?f.erros.jaExiste:resposta.status===429?f.erros.muitasTentativas:t.erro)
      // Não aceitar sucesso de uma versão antiga que provisionaria uma vidraçaria.
      if(!corpo.ok||corpo.perfil!=='partner')throw new Error(t.erro)
      evento('partner_cadastro_concluido',{idioma})
      setDados(v=>({...v,senha:''}));setEstado('pronto')
      if(corpo.entrar_url){
        const url=new URL(corpo.entrar_url)
        if(url.origin===new URL(CONFIG.cadastroApi).origin&&url.pathname.startsWith('/auth/v1/verify')){
          setEstado('entrando');window.location.assign(url.href)
        }
      }
    }catch(err){setErro(err.name==='AbortError'?f.erros.rede:err.message);setEstado('parado')}
    finally{clearTimeout(timer);enviando.current=false}
  }
  const pronto=estado==='pronto'||estado==='entrando'
  return <section className="mx-auto max-w-[600px] px-5 pb-24 pt-[150px]">
    <p className="cota uppercase">NeoGlass Partner</p>
    <h1 className="display mt-5 text-[clamp(30px,5vw,44px)] leading-tight">{pronto?t.pronto:t.titulo}</h1>
    <p className="mt-5 text-dim leading-relaxed">{pronto?t.retorno:t.texto}</p>
    {!pronto&&<form onSubmit={enviar} className="mt-8 space-y-5" aria-busy={estado==='enviando'}>
      <fieldset disabled={estado==='enviando'} className="space-y-5">
        {['nome','email'].map(key=><label key={key} className="block text-sm font-semibold">{f.campos[key].rotulo}<input className={`${campo} mt-2`} name={key} type={key==='email'?'email':'text'} autoComplete={key==='email'?'email':'name'} required maxLength={key==='email'?160:120} value={dados[key]} onChange={alterar}/></label>)}
        <label className="block text-sm font-semibold">{f.campos.pais.rotulo}<select className={`${campo} mt-2`} name="pais" value={dados.pais} onChange={alterar}>{f.campos.pais.opcoes.map(([id,nome])=><option key={id} value={id}>{nome}</option>)}</select></label>
        <label className="block text-sm font-semibold">{f.campos.senha.rotulo}<input className={`${campo} mt-2`} name="senha" type={mostrar?'text':'password'} autoComplete="new-password" required minLength={8} maxLength={128} placeholder={f.campos.senha.exemplo} value={dados.senha} onChange={alterar}/></label>
        <button type="button" className="min-h-11 text-sm underline" aria-pressed={mostrar} onClick={()=>setMostrar(v=>!v)}>{mostrar?f.campos.senha.ocultar:f.campos.senha.mostrar}</button>
        <div hidden aria-hidden="true"><input name="site" tabIndex={-1} autoComplete="off" value={dados.site} onChange={alterar}/></div>
      </fieldset>
      {erro&&<p role="alert" className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-900">{erro}</p>}
      <p className="text-xs leading-relaxed text-dim">{t.nota}</p>
      <button disabled={estado==='enviando'} className="botao-marca min-h-12 w-full px-6 py-3 disabled:opacity-60">{estado==='enviando'?f.enviando:t.acao}</button>
      <p role="status" className="text-sm text-dim">{lento&&estado==='enviando'?t.aguardando:''}</p>
    </form>}
    <div className="mt-6 flex flex-wrap gap-5 text-sm"><a className="inline-flex min-h-11 items-center font-semibold underline" href={CONFIG.login}>{c.comecar.pronto.entrar}</a><a className="inline-flex min-h-11 items-center underline" href={linkEmail('NeoGlass Partner')}>{t.suporte}</a></div>
  </section>
}
