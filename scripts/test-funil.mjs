import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { urlDaAgenda, reservaConfirmada, EVENTOS_META } from '../src/lib/funil.js'
import { textosDe } from '../src/conteudo/index.js'
import { caminhoDe, todasAsPaginas, imagemDe } from '../src/lib/paginasSeo.js'
import { capturarOrigem, origemGuardada } from '../src/lib/indicacao.js'

let checks = 0
function check(nome, teste) { teste(); checks++; console.log(`OK ${nome}`) }
const base = 'https://calendly.com/higorlucas2/30min'
const janela = {}

check('UTMs chegam à agenda sem dados de contato', () => {
  const u = new URL(urlDaAgenda(base, { utm_source: 'whatsapp', utm_campaign: 'primeiro_orcamento_v1', email: 'privado@example.com', codigo: 'parceiro' }))
  assert.equal(u.searchParams.get('utm_source'), 'whatsapp')
  assert.equal(u.searchParams.get('utm_campaign'), 'primeiro_orcamento_v1')
  assert.equal(u.searchParams.has('email'), false)
  assert.equal(u.searchParams.has('codigo'), false)
})
check('query preexistente e caracteres são preservados', () => {
  const u = new URL(urlDaAgenda(`${base}?locale=pt`, { utm_content: 'box & espelho', utm_term: 3 }))
  assert.equal(u.searchParams.get('locale'), 'pt')
  assert.equal(u.searchParams.get('utm_content'), 'box & espelho')
  assert.equal(u.searchParams.has('utm_term'), false)
  assert.equal(urlDaAgenda(''), '')
})
check('reserva real aceita somente iframe e origem corretos', () => {
  assert.equal(reservaConfirmada({ source: janela, origin: 'https://calendly.com', data: { event: 'calendly.event_scheduled' } }, janela, base), true)
})
check('mensagens de outra janela, domínio ou fase são rejeitadas', () => {
  for (const dado of [
    { source: {}, origin: 'https://calendly.com', data: { event: 'calendly.event_scheduled' } },
    { source: janela, origin: 'https://calendly.com.attacker.example', data: { event: 'calendly.event_scheduled' } },
    { source: janela, origin: 'https://calendly.com', data: { event: 'calendly.date_and_time_selected' } },
    { source: janela, origin: 'https://calendly.com', data: null },
  ]) assert.equal(reservaConfirmada(dado, janela, base), false)
  assert.equal(reservaConfirmada({}, null, base), false)
})
check('clique não vira reserva e cadastro não vira compra', () => {
  assert.equal(EVENTOS_META.agendar, undefined)
  assert.equal(EVENTOS_META.agendamento_confirmado, 'Schedule')
  assert.equal(EVENTOS_META.cadastro, 'CompleteRegistration')
  assert.equal(Object.values(EVENTOS_META).includes('Purchase'), false)
})
for (const lang of ['pt', 'en', 'es', 'de']) check(`rota, textos, preço e SEO ${lang}`, () => {
  const t = textosDe(lang).primeiro
  assert.deepEqual(Object.keys(t).sort(), Object.keys(textosDe('pt').primeiro).sort())
  assert.equal(t.etapas.length, 3)
  assert.equal(t.itens.length, 3)
  assert.equal(t.faq.length, 3)
  assert.match(t.preco('VALOR', 14), /VALOR/)
  assert.match(t.preco('VALOR', 14), /14/)
  const rota = todasAsPaginas().find(p => p.id === 'primeiro' && p.idioma === lang)
  const html = readFileSync(`dist/${rota.arquivo}`, 'utf8')
  assert.ok(html.includes(t.seo.titulo))
  assert.ok(html.includes(`https://neoglass.online${caminhoDe('primeiro', lang)}`))
  assert.ok(html.includes('og-vidracaria.jpg'))
  assert.ok(rota.oferta.preco)
})
check('imagem compartilhável existe', () => assert.equal(imagemDe('primeiro'), 'https://neoglass.online/og-vidracaria.jpg'))

check('origem da campanha sobrevive à ida para cadastro', () => {
  const dados = new Map()
  const requisicoes = []
  globalThis.document = { referrer: '' }
  globalThis.window = {
    location: { pathname: '/primeiro-orcamento', search: '?utm_source=whatsapp&utm_medium=organic&utm_campaign=primeiro_orcamento_v1', hash: '' },
    localStorage: { getItem: k => dados.get(k), setItem: (k, v) => dados.set(k, v), removeItem: k => dados.delete(k) },
    history: { replaceState() {} },
  }
  globalThis.fetch = async (url, options) => { requisicoes.push(JSON.parse(options.body)); return { ok: true, json: async () => ({}) } }
  capturarOrigem()
  window.location = { pathname: '/comecar', search: '', hash: '' }
  capturarOrigem()
  assert.equal(origemGuardada().utm_source, 'whatsapp')
  assert.equal(origemGuardada().landing, '/primeiro-orcamento')
  assert.equal(requisicoes.length, 1)
  assert.equal(requisicoes[0].acao, 'clique')
})
console.log(`\n${checks} verificações passaram. Sem reserva, cadastro ou mensagem real.`)
