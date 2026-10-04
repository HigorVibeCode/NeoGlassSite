import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'

/* Mesmo ambiente do googleAds.test.mjs, com a opção de preencher os IDs. */
const base = readFileSync(new URL('../src/lib/googleAds.js', import.meta.url), 'utf8').replace(/export /g, '')
function ambiente({ ga4 = '', lead = '' } = {}) {
  const source = base
    .replace(/const GA4_ID = '[^']*'/, `const GA4_ID = '${ga4}'`)
    .replace(/const LEAD_TEMPERA_DESTINO = '[^']*'/, `const LEAD_TEMPERA_DESTINO = '${lead}'`)
  const scripts = [], storage = new Map()
  const window = {}
  const context = vm.createContext({ window, Date, Promise,
    localStorage: { getItem: k => storage.get(k) ?? null, setItem: (k, v) => storage.set(k, v) },
    document: { createElement: () => ({}), head: { appendChild: s => scripts.push(s) } },
    setTimeout: () => 0, clearTimeout: () => {},
  })
  vm.runInContext(source + '\nthis.api = { definirMedicao, medirEvento, registrarLeadGoogle }', context)
  return { ...context.api, scripts, calls: () => (window.dataLayer || []).map(x => Array.from(x)) }
}

test('sem IDs: eventos e lead não geram nada, mesmo com aceite', () => {
  const a = ambiente(); a.definirMedicao(true)
  const antes = a.calls().length
  a.medirEvento('tempera_etapa', { etapa: 'prod' }); a.registrarLeadGoogle()
  assert.equal(a.calls().length, antes)
  assert.ok(!a.calls().some(c => c[0] === 'config' && String(c[1]).startsWith('G-')))
})

test('sem aceite: nada sai, mesmo com IDs', () => {
  const a = ambiente({ ga4: 'G-TESTE123', lead: 'AW-1/abc' })
  a.medirEvento('lead', {}); a.registrarLeadGoogle()
  assert.equal(a.calls().length, 0); assert.equal(a.scripts.length, 0)
})

test('com aceite e IDs: GA4 configurado, analytics liberado, evento e uma conversão de lead', () => {
  const a = ambiente({ ga4: 'G-TESTE123', lead: 'AW-1/abc' }); a.definirMedicao(true)
  assert.ok(a.calls().some(c => c[0] === 'config' && c[1] === 'G-TESTE123'))
  assert.equal(a.calls().find(c => c[0] === 'consent' && c[1] === 'update')[2].analytics_storage, 'granted')
  a.medirEvento('tempera_etapa', { etapa: 'prod' })
  const ev = a.calls().find(c => c[0] === 'event' && c[1] === 'tempera_etapa')
  assert.equal(ev[2].send_to, 'G-TESTE123'); assert.equal(ev[2].etapa, 'prod')
  a.registrarLeadGoogle(); a.registrarLeadGoogle()
  const conv = a.calls().filter(c => c[0] === 'event' && c[1] === 'conversion')
  assert.equal(conv.length, 1); assert.equal(conv[0][2].send_to, 'AW-1/abc')
})

test('recusa depois do aceite: analytics volta a negado', () => {
  const a = ambiente({ ga4: 'G-TESTE123' }); a.definirMedicao(true); a.definirMedicao(false)
  assert.equal(a.calls().at(-1)[2].analytics_storage, 'denied')
})
