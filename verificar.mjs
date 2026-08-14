/**
 * Passa nas doze páginas em navegador de verdade e procura: texto que ficou em
 * português onde não devia, erro de JavaScript, rolagem horizontal no celular e
 * chave de tradução que não resolveu (o clássico "undefined" na tela).
 */
import { chromium } from 'playwright'

const PORTA = process.env.PORTA || 4400
const PAGINAS = [
  ['pt', '/'],
  ['pt', '/vidracaria.html'],
  ['pt', '/plataforma.html'],
  ['en', '/en.html'],
  ['en', '/en/glaziers.html'],
  ['en', '/en/platform.html'],
  ['es', '/es.html'],
  ['es', '/es/cristalerias.html'],
  ['es', '/es/plataforma.html'],
  ['de', '/de.html'],
  ['de', '/de/glasereien.html'],
  ['de', '/de/plattform.html'],
  ['pt', '/comecar.html'],
  ['en', '/en/start.html'],
  ['es', '/es/empezar.html'],
  ['de', '/de/starten.html'],
]

/* Como se detecta texto que escapou da extração: pelos sinais gráficos que só
   o português tem entre os quatro idiomas do site — ç, ã e õ. Nem o espanhol,
   nem o inglês, nem o alemão usam qualquer um dos três.

   A primeira versão desta checagem procurava PALAVRAS portuguesas, e acusou
   seis falsos positivos por página em espanhol: "obra", "corte", "pedido",
   "fábrica" e "semana" são as mesmas nas duas línguas. Sinal gráfico não tem
   esse problema. */
const SO_PORTUGUES = /[çãõ]/

const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' })
const relatorio = []

for (const [idioma, rota] of PAGINAS) {
  const p = await b.newPage({ viewport: { width: 1280, height: 900 } })
  const erros = []
  p.on('pageerror', (e) => erros.push(e.message))
  await p.goto(`http://localhost:${PORTA}${rota}`, { waitUntil: 'domcontentloaded' })
  await p.waitForTimeout(1500)

  const r = await p.evaluate((re) => {
    const texto = document.body.innerText
    const linhas = texto.split('\n').map((l) => l.trim()).filter((l) => l.length > 3)
    const rx = new RegExp(re, 'i')
    return {
      undef: (texto.match(/undefined|\[object Object\]|NaN/g) || []).length,
      suspeitas: linhas.filter((l) => rx.test(l)).slice(0, 6),
      palavras: texto.split(/\s+/).length,
    }
  }, SO_PORTUGUES.source)

  // celular: rolagem horizontal
  await p.setViewportSize({ width: 360, height: 780 })
  await p.waitForTimeout(400)
  const rola = await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)

  relatorio.push({ idioma, rota, ...r, rola, erros })
  await p.close()
}

let ruim = 0
for (const r of relatorio) {
  const problemas = []
  if (r.erros.length) problemas.push(`JS: ${r.erros[0]}`)
  if (r.undef) problemas.push(`${r.undef} undefined/NaN`)
  if (r.rola) problemas.push('rolagem horizontal a 360px')
  if (r.idioma !== 'pt' && r.suspeitas.length) problemas.push(`${r.suspeitas.length} linha(s) em português`)
  if (problemas.length) ruim++
  console.log(
    `${problemas.length ? '✗' : '✓'} ${r.idioma}  ${r.rota.padEnd(26)} ${r.palavras} palavras  ${problemas.join(' · ') || 'ok'}`,
  )
  if (r.idioma !== 'pt') for (const s of r.suspeitas) console.log(`      ↳ ${s.slice(0, 110)}`)
}
console.log(ruim ? `\n${ruim} de ${relatorio.length} páginas com problema` : `\nas ${PAGINAS.length} páginas passaram`)
await b.close()
