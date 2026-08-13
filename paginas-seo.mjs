/**
 * Roda depois do `vite build` e escreve um .html de verdade para cada rota.
 *
 * O problema que ele resolve: o site é uma página só. Abrir /vidracaria
 * funcionava porque a Vercel devolvia o index.html e o JavaScript trocava o
 * título depois. O Google roda JavaScript e via o título certo — mas WhatsApp,
 * LinkedIn, Facebook, X e os robôs de IA NÃO rodam. Quem colava o link da
 * vidraçaria num grupo de vidraceiros via a prévia da indústria, com o título
 * da indústria, e a canônica dizendo que aquela página era a home. Ou seja: o
 * sitemap declarava três páginas e o HTML dizia que era tudo a mesma.
 *
 * Aqui não há renderização de React — só a cabeça do documento. É o que muda o
 * resultado: o corpo o Google monta sozinho, a prévia do WhatsApp não.
 *
 * Também sai daqui o 404.html. Sem ele, qualquer endereço inventado devolvia a
 * home com status 200 — o que o Google chama de soft 404 e trata como página
 * de baixa qualidade.
 */
import { readFileSync, writeFileSync } from 'fs'
import { PAGINAS, SITE, urlDe } from './src/lib/paginasSeo.js'

const DIR = 'dist'
const base = readFileSync(`${DIR}/index.html`, 'utf8')

/** Troca o conteúdo de uma tag da cabeça, sem tocar no resto do documento. */
const trocar = (html, padrao, novo) => {
  if (!padrao.test(html)) throw new Error(`tag não encontrada: ${padrao}`)
  return html.replace(padrao, novo)
}

const montar = (p) => {
  const url = urlDe(p.caminho)
  const imagem = p.caminho === '/' ? `${SITE}/og.jpg` : `${SITE}/og-${p.id}.jpg`
  let h = base
  h = trocar(h, /<title>[^<]*<\/title>/, `<title>${p.titulo}</title>`)
  h = trocar(h, /(<meta name="description" content=")[^"]*(")/, `$1${p.descricao}$2`)
  h = trocar(h, /(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
  h = trocar(h, /(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
  h = trocar(h, /(<meta property="og:title" content=")[^"]*(")/, `$1${p.ogTitulo}$2`)
  h = trocar(h, /(<meta property="og:description" content=")[^"]*(")/, `$1${p.ogDescricao}$2`)
  h = trocar(h, /(<meta property="og:image" content=")[^"]*(")/, `$1${imagem}$2`)
  h = trocar(h, /(<meta property="og:image:alt" content=")[^"]*(")/, `$1${p.ogTitulo}$2`)
  h = trocar(h, /(<meta name="twitter:title" content=")[^"]*(")/, `$1${p.ogTitulo}$2`)
  h = trocar(h, /(<meta name="twitter:description" content=")[^"]*(")/, `$1${p.ogDescricao}$2`)
  h = trocar(h, /(<meta name="twitter:image" content=")[^"]*(")/, `$1${imagem}$2`)

  // Só a página da vidraçaria tem preço, e só ela declara o preço no schema.
  // Declarar um valor numa página onde ele não aparece é motivo de penalidade —
  // o dado estruturado tem que refletir o que o visitante enxerga.
  if (p.oferta) {
    h = h.replace(
      '"operatingSystem": "Web",',
      `"operatingSystem": "Web",
        "offers": {
          "@type": "Offer",
          "price": "${p.oferta.preco}",
          "priceCurrency": "${p.oferta.moeda}",
          "url": "${url}",
          "availability": "https://schema.org/InStock",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "${p.oferta.preco}",
            "priceCurrency": "${p.oferta.moeda}",
            "referenceQuantity": {
              "@type": "QuantitativeValue",
              "value": 1,
              "unitCode": "MON"
            }
          }
        },`,
    )
  }
  return h
}

for (const p of PAGINAS) {
  writeFileSync(`${DIR}/${p.arquivo}`, montar(p))
  console.log(`${p.arquivo.padEnd(18)} ${p.caminho}`)
}

// O 404 não deve ser indexado e não deve reivindicar nenhuma canônica.
const naoAchou = montar(PAGINAS[0])
  .replace(/<title>[^<]*<\/title>/, '<title>Página não encontrada · NeoGlass</title>')
  .replace(/<link rel="canonical"[^>]*>/, '<meta name="robots" content="noindex" />')
writeFileSync(`${DIR}/404.html`, naoAchou)
console.log('404.html')
