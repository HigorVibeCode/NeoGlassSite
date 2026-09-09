import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'
const source = readFileSync(new URL('../src/lib/googleAds.js', import.meta.url), 'utf8').replace(/export /g, '')
function ambiente({ blockedStorage = false } = {}) {
  const scripts = [], storage = new Map(), timers = new Map()
  let timerId = 0
  const window = {}
  const context = vm.createContext({ window, Date, Promise,
    localStorage: { getItem: k => { if(blockedStorage) throw Error(); return storage.get(k) ?? null }, setItem: (k,v) => { if(blockedStorage) throw Error(); storage.set(k,v) } },
    document: { createElement: () => ({}), head: { appendChild: s => scripts.push(s) } },
    setTimeout: (fn, ms) => { const id = ++timerId; timers.set(id, { fn, ms }); return id },
    clearTimeout: id => timers.delete(id),
  })
  vm.runInContext(source + '\nthis.api = { iniciarGoogleAds, definirMedicao, registrarCadastroGoogle, escolhaMedicao }', context)
  return { ...context.api, scripts, timers, window, calls: () => (window.dataLayer || []).map(x => Array.from(x)) }
}
test('sem consentimento ou com recusa: nenhuma carga nem conversão', async () => {
  const a = ambiente(); a.iniciarGoogleAds(); await a.registrarCadastroGoogle();
  a.definirMedicao(false); a.iniciarGoogleAds(); await a.registrarCadastroGoogle();
  assert.equal(a.scripts.length, 0); assert.equal(a.calls().length, 0)
})
test('aceite carrega uma vez; recusa e novo aceite atualizam consentimento', () => {
  const a = ambiente(); a.definirMedicao(true); a.iniciarGoogleAds();
  assert.equal(a.scripts.length, 1); assert.match(a.scripts[0].src,/AW-18439071018/)
  assert.equal(a.calls()[0][0], 'consent'); assert.equal(a.calls()[0][2].ad_storage, 'denied')
  a.definirMedicao(false); assert.equal(a.calls().at(-1)[2].ad_storage,'denied')
  a.definirMedicao(true); assert.equal(a.calls().at(-1)[2].ad_storage,'granted'); assert.equal(a.scripts.length,1)
})
test('cadastro tem destino correto, sem receita ou PII; callback e deduplicação', async () => {
  const a = ambiente(); a.definirMedicao(true); const p = a.registrarCadastroGoogle();
  const e = a.calls().find(x => x[0] === 'event');
  assert.equal(e[1],'conversion'); assert.equal(e[2].send_to,'AW-18439071018/5-EFCIna6fEcEKrKt9hE'); assert.equal(e[2].value,0)
  assert.deepEqual(Object.keys(e[2]).sort(), ['currency','event_callback','event_timeout','send_to','value'])
  e[2].event_callback(); await p; assert.equal(a.timers.size,0)
  await a.registrarCadastroGoogle(); assert.equal(a.calls().filter(x=>x[0]==='event').length,1)
})
test('script bloqueado não prende login e storage bloqueado não perde escolha', async () => {
  const a = ambiente({blockedStorage:true}); a.definirMedicao(true)
  const p = a.registrarCadastroGoogle(); const timer = [...a.timers.values()][0]
  assert.equal(timer.ms,1200); timer.fn(); await p
  assert.equal(a.escolhaMedicao(),'sim'); a.definirMedicao(false); assert.equal(a.escolhaMedicao(),'nao')
})
test('recusar depois de aceitar impede cadastro publicitário', async () => {
 const a=ambiente();a.definirMedicao(true);a.definirMedicao(false);await a.registrarCadastroGoogle();assert.equal(a.calls().filter(x=>x[0]==='event').length,0)
})
