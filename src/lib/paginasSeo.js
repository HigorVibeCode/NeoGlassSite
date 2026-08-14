/**
 * As três páginas do site × quatro idiomas, com tudo que o Google e o WhatsApp
 * precisam saber. Este arquivo é lido em dois lugares:
 *
 *   · pelo roteador (`rota.js`), que troca título e canônica na navegação;
 *   · pelo script `paginas-seo.mjs`, que roda depois do build e escreve um
 *     .html de verdade para cada rota de cada idioma — treze arquivos.
 *
 * O segundo é o que importa de fato: WhatsApp, LinkedIn, Facebook e os robôs de
 * IA não rodam JavaScript. Quem cola o link alemão num grupo precisa ver a
 * prévia em alemão, e o Google precisa receber cada versão já pronta, com
 * `hreflang` apontando para as irmãs — senão ele trata as quatro como conteúdo
 * duplicado, que é pior do que não ter tradução nenhuma.
 *
 * O `slug` é traduzido de propósito: `/de/glasereien` vale mais que
 * `/de/vidracaria` na busca alemã, e é o endereço que um alemão consegue
 * digitar. Português não tem prefixo — a raiz é o site em português.
 */
import { IDIOMAS, comIdioma } from '../i18n/idiomas.js'
import { CONFIG } from '../config.js'

export const SITE = 'https://neoglass.online'

/** As rotas, com o endereço de cada uma em cada idioma. */
export const ROTAS = [
  {
    id: 'industria',
    slug: { pt: '/', en: '/', es: '/', de: '/' },
  },
  {
    id: 'vidracaria',
    slug: { pt: '/vidracaria', en: '/glaziers', es: '/cristalerias', de: '/glasereien' },
    // Só esta página mostra preço, e por isso só ela declara oferta no dado
    // estruturado. Declarar valor numa página onde ele não aparece é motivo de
    // penalidade — o schema tem que refletir o que o visitante enxerga.
    temPreco: true,
  },
  {
    id: 'plataforma',
    slug: { pt: '/plataforma', en: '/platform', es: '/plataforma', de: '/plattform' },
  },
  {
    id: 'comecar',
    slug: { pt: '/comecar', en: '/start', es: '/empezar', de: '/starten' },
    // Fora do menu de propósito. O topo lista os PÚBLICOS do site — indústria,
    // vidraçaria, plataforma. Cadastro não é público, é destino: chega-se nele
    // por um botão, depois de a página ter convencido. Um quarto item no menu
    // rouba clique dos três que fazem a venda.
    menu: false,
  },
]

/** As rotas que aparecem no menu do topo e no rodapé. */
export const ROTAS_MENU = ROTAS.filter((r) => r.menu !== false)

export const rotaDe = (id) => ROTAS.find((r) => r.id === id)

/**
 * O botão de começar, já com o endereço do idioma resolvido.
 *
 * `acaoComecar` mora em config.js e não pode importar este arquivo — este aqui
 * já importa aquele, e o círculo quebraria o build. Então config decide O QUÊ
 * (rota interna, endereço externo ou WhatsApp) e esta função traduz para ONDE.
 */
export const destinoComecar = (acao, idioma) =>
  acao?.rota ? { ...acao, href: caminhoDe(acao.rota, idioma) } : acao

/** O caminho completo de uma rota num idioma: ('vidracaria','de') → '/de/glasereien' */
export const caminhoDe = (id, idioma) => comIdioma(rotaDe(id)?.slug[idioma] ?? '/', idioma)

/** A URL absoluta e canônica. */
export const urlDe = (id, idioma) => {
  const caminho = caminhoDe(id, idioma)
  return caminho === '/' ? `${SITE}/` : `${SITE}${caminho}`
}

/** O nome do arquivo gerado no build. A home de cada idioma é o index daquela pasta. */
export const arquivoDe = (id, idioma) => {
  const caminho = caminhoDe(id, idioma)
  return caminho === '/' ? 'index.html' : `${caminho.replace(/^\//, '')}.html`
}

/** A imagem de prévia — uma por página, a mesma nos quatro idiomas por enquanto. */
export const imagemDe = (id) => (id === 'industria' ? `${SITE}/og.jpg` : `${SITE}/og-${id}.jpg`)

/** O preço declarado no dado estruturado daquele idioma. */
export const ofertaDe = (idioma) => {
  const moeda = CONFIG.vidracaria.moedaPorIdioma[idioma] ?? 'BRL'
  const valor = CONFIG.vidracaria.precos[moeda]
  return valor ? { preco: valor.toFixed(2), moeda } : null
}

/** Todas as combinações página × idioma, que é o que o build percorre. */
export const todasAsPaginas = () =>
  ROTAS.flatMap((r) =>
    IDIOMAS.map((i) => ({
      id: r.id,
      idioma: i.codigo,
      caminho: caminhoDe(r.id, i.codigo),
      arquivo: arquivoDe(r.id, i.codigo),
      url: urlDe(r.id, i.codigo),
      htmlLang: i.htmlLang,
      ogLocale: i.ogLocale,
      imagem: imagemDe(r.id),
      oferta: r.temPreco ? ofertaDe(i.codigo) : null,
    })),
  )
