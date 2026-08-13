/**
 * Roda depois do `vite build` e escreve um .html de verdade para cada rota de
 * cada idioma — doze páginas mais o 404.
 *
 * Por que a cabeça do documento não pode depender de JavaScript: WhatsApp,
 * LinkedIn, Facebook, X e os robôs de IA não executam nada. Quem cola o link
 * alemão num grupo tem que ver a prévia em alemão. E o Google precisa receber
 * cada versão já pronta, com `hreflang` apontando para as irmãs — sem isso ele
 * trata as quatro como conteúdo duplicado, que é pior do que não traduzir.
 *
 * `hreflang` tem três regras que quase todo mundo erra, e as três estão aqui:
 *   · é RECÍPROCO — cada página lista todas as outras E a si mesma;
 *   · usa URL absoluta, sempre;
 *   · precisa de um `x-default`, que é para onde vai quem não fala nenhum dos
 *     quatro idiomas. Aqui é o inglês, que é o maior denominador comum — e não
 *     o português, que só serviria a quem já está no Brasil.
 *
 * Também sai daqui o 404.html. Sem ele, endereço inventado devolvia a home com
 * status 200 — o soft 404 que o Google trata como página de baixa qualidade.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { dirname } from 'path'
import { todasAsPaginas, SITE } from './src/lib/paginasSeo.js'
import { textosDe } from './src/conteudo/index.js'
import { IDIOMAS } from './src/i18n/idiomas.js'

const DIR = 'dist'
const base = readFileSync(`${DIR}/index.html`, 'utf8')
const paginas = todasAsPaginas()

/** Troca o conteúdo de uma tag da cabeça, sem tocar no resto do documento. */
const trocar = (html, padrao, novo) => {
  if (!padrao.test(html)) throw new Error(`tag não encontrada: ${padrao}`)
  return html.replace(padrao, novo)
}

const escapar = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

/** As irmãs de uma página: a mesma rota nos outros idiomas. */
const alternativas = (id) =>
  paginas.filter((p) => p.id === id).sort((a, b) => a.idioma.localeCompare(b.idioma))

const blocoHreflang = (id) => {
  const irmas = alternativas(id)
  const linhas = irmas.map(
    (p) => `    <link rel="alternate" hrefLang="${p.htmlLang}" href="${p.url}" />`,
  )
  const ingles = irmas.find((p) => p.idioma === 'en') ?? irmas[0]
  linhas.push(`    <link rel="alternate" hrefLang="x-default" href="${ingles.url}" />`)
  return linhas.join('\n').replace(/hrefLang/g, 'hreflang')
}

const montar = (p) => {
  const c = textosDe(p.idioma)
  const t = c.paginas[p.id]
  let h = base

  h = h.replace(/<html lang="[^"]*"/, `<html lang="${p.htmlLang}"`)
  h = trocar(h, /<title>[^<]*<\/title>/, `<title>${escapar(t.titulo)}</title>`)
  h = trocar(h, /(<meta name="description" content=")[^"]*(")/, `$1${escapar(t.descricao)}$2`)
  h = trocar(h, /(<link rel="canonical" href=")[^"]*(")/, `$1${p.url}$2`)
  h = trocar(h, /(<meta property="og:url" content=")[^"]*(")/, `$1${p.url}$2`)
  h = trocar(h, /(<meta property="og:title" content=")[^"]*(")/, `$1${escapar(t.ogTitulo)}$2`)
  h = trocar(
    h,
    /(<meta property="og:description" content=")[^"]*(")/,
    `$1${escapar(t.ogDescricao)}$2`,
  )
  h = trocar(h, /(<meta property="og:image" content=")[^"]*(")/, `$1${p.imagem}$2`)
  h = trocar(h, /(<meta property="og:image:alt" content=")[^"]*(")/, `$1${escapar(t.ogTitulo)}$2`)
  h = trocar(h, /(<meta name="twitter:title" content=")[^"]*(")/, `$1${escapar(t.ogTitulo)}$2`)
  h = trocar(
    h,
    /(<meta name="twitter:description" content=")[^"]*(")/,
    `$1${escapar(t.ogDescricao)}$2`,
  )
  h = trocar(h, /(<meta name="twitter:image" content=")[^"]*(")/, `$1${p.imagem}$2`)

  // og:locale e as irmãs entram logo depois da canônica
  h = h.replace(
    /(<link rel="canonical"[^>]*>)/,
    `$1\n    <meta property="og:locale" content="${p.ogLocale}" />\n${blocoHreflang(p.id)}`,
  )

  // Só a página com preço declara oferta, e só na moeda daquele idioma.
  if (p.oferta) {
    h = h.replace(
      '"operatingSystem": "Web",',
      `"operatingSystem": "Web",
        "offers": {
          "@type": "Offer",
          "price": "${p.oferta.preco}",
          "priceCurrency": "${p.oferta.moeda}",
          "url": "${p.url}",
          "availability": "https://schema.org/InStock",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "${p.oferta.preco}",
            "priceCurrency": "${p.oferta.moeda}",
            "referenceQuantity": { "@type": "QuantitativeValue", "value": 1, "unitCode": "MON" }
          }
        },`,
    )
  }

  // O caminho dos assets: /en/glaziers.html está um nível abaixo da raiz, e o
  // build sai com caminhos relativos (base: './' no vite.config).
  const fundo = p.arquivo.split('/').length - 1
  if (fundo > 0) h = h.replace(/(src|href)="\.\//g, `$1="${'../'.repeat(fundo)}`)

  return h
}

for (const p of paginas) {
  const destino = `${DIR}/${p.arquivo}`
  mkdirSync(dirname(destino), { recursive: true })
  writeFileSync(destino, montar(p))
  console.log(`${p.idioma}  ${p.caminho.padEnd(16)} → ${p.arquivo}`)
}

// O 404 não é indexado e não reivindica canônica nenhuma.
const naoAchou = montar(paginas.find((p) => p.id === 'industria' && p.idioma === 'en'))
  .replace(/<title>[^<]*<\/title>/, '<title>Page not found · NeoGlass</title>')
  .replace(/<link rel="canonical"[^>]*>/, '<meta name="robots" content="noindex" />')
  .replace(/<link rel="alternate"[^>]*>\n?/g, '')
writeFileSync(`${DIR}/404.html`, naoAchou)
console.log('    404.html')

// O sitemap declara as doze páginas, cada uma com as irmãs — é o segundo lugar
// onde o Google procura a relação entre os idiomas.
const urls = paginas
  .map(
    (p) => `  <url>
    <loc>${p.url}</loc>
${alternativas(p.id)
  .map((a) => `    <xhtml:link rel="alternate" hreflang="${a.htmlLang}" href="${a.url}" />`)
  .join('\n')}
    <lastmod>${process.env.LASTMOD || new Date().toISOString().slice(0, 10)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${p.id === 'industria' ? '1.0' : '0.8'}</priority>
  </url>`,
  )
  .join('\n')

writeFileSync(
  `${DIR}/sitemap.xml`,
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`,
)
console.log('    sitemap.xml  ·', paginas.length, 'endereços')
console.log(`    hreflang     · ${IDIOMAS.length} idiomas + x-default`)
console.log(`    site         · ${SITE}`)
