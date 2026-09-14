import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {capturarOrigem,origemGuardada,esquecerOrigem} from '../src/lib/indicacao.js'
import {CONFIG,moedaDe} from '../src/config.js'
import {textosDe} from '../src/conteudo/index.js'
import {todasAsPaginas} from '../src/lib/paginasSeo.js'
const store=()=>{const m=new Map();return {getItem:k=>m.get(k),setItem:(k,v)=>m.set(k,v),removeItem:k=>m.delete(k)}}
globalThis.document={referrer:''}
globalThis.window={localStorage:store(),sessionStorage:store(),history:{replaceState(...args){window.cleaned=args[2]}}}
const requests=[]
globalThis.fetch=async(url,options)=>{requests.push(JSON.parse(options.body));return {ok:false,json:async()=>({})}}
const visit=(pathname,search='',hash='')=>{window.location={pathname,search,hash};return capturarOrigem()}
esquecerOrigem()
visit('/industria','?ref=primeiro-partner&utm_source=google&keep=1','#intelligence-demo')
assert.equal(window.cleaned,'/industria?keep=1#intelligence-demo')
for(const route of todasAsPaginas()){
  visit(route.caminho)
  assert.equal(origemGuardada().codigo,'primeiro-partner',route.caminho)
  assert.equal(origemGuardada().utm_source,'google')
}
visit('/partner','?ref=segundo-partner&utm_source=meta')
assert.equal(origemGuardada().codigo,'primeiro-partner');assert.equal(origemGuardada().utm_source,'google')
esquecerOrigem();visit('/p/nome-valido');assert.equal(origemGuardada().codigo,'nome-valido')
esquecerOrigem();assert.doesNotThrow(()=>visit('/p/%E0%A4%A'));assert.equal(origemGuardada(),null)
window.localStorage={getItem(){throw Error('blocked')},setItem(){throw Error('blocked')},removeItem(){}}
visit('/vidracaria','?ref=storage-fallback');visit('/de/starten')
assert.equal(origemGuardada().codigo,'storage-fallback')
assert.ok(window.sessionStorage.getItem('ng_origem'))
esquecerOrigem();assert.equal(origemGuardada(),null)
for(const [pais,moeda,preco] of [['br','BRL',197],['ch','CHF',39],['de','EUR',39],['us','USD',39]]){
  assert.equal(moedaDe('pt',pais),moeda);assert.equal(CONFIG.vidracaria.precos[moeda],preco)
}
for(const lang of ['pt','en','es','de']){
  const page=todasAsPaginas().find(p=>p.id==='partnerCadastro'&&p.idioma===lang)
  assert.ok(readFileSync(`dist/${page.arquivo}`,'utf8').includes(textosDe(lang).paginas.partnerCadastro.titulo))
}
assert.ok(readFileSync('src/paginas/Comecar.jsx','utf8').includes('origem?.codigo'))
const redirects=JSON.parse(readFileSync('vercel.json','utf8')).redirects
assert.equal(redirects.find(r=>r.source==='/p/:codigo').destination,'/?ref=:codigo')
console.log('PASSA: indicação e campanha em todas as rotas/idiomas, primeiro toque, falha do resolvedor, storage alternativo, hash, links antigos e quatro moedas.')
