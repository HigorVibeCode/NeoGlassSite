import pt from './pt.js'
import en from './en.js'
import es from './es.js'
import de from './de.js'

import industriaPt from './areas/industria.pt.js'
import industriaEn from './areas/industria.en.js'
import industriaEs from './areas/industria.es.js'
import industriaDe from './areas/industria.de.js'

import vidracariaPt from './areas/vidracaria.pt.js'
import vidracariaEn from './areas/vidracaria.en.js'
import vidracariaEs from './areas/vidracaria.es.js'
import vidracariaDe from './areas/vidracaria.de.js'

import plataformaPt from './areas/plataforma.pt.js'
import plataformaEn from './areas/plataforma.en.js'
import plataformaEs from './areas/plataforma.es.js'
import plataformaDe from './areas/plataforma.de.js'

import filmePt from './areas/filme.pt.js'
import filmeEn from './areas/filme.en.js'
import filmeEs from './areas/filme.es.js'
import filmeDe from './areas/filme.de.js'

import comecarPt from './areas/comecar.pt.js'
import comecarEn from './areas/comecar.en.js'
import comecarEs from './areas/comecar.es.js'
import comecarDe from './areas/comecar.de.js'

import demosPt from './areas/demos.pt.js'
import demosEn from './areas/demos.en.js'
import demosEs from './areas/demos.es.js'
import demosDe from './areas/demos.de.js'

/**
 * Os quatro idiomas montados: o tronco comum (topo, rodapé, SEO, de onde vem)
 * mais as cinco áreas, cada uma no seu arquivo.
 *
 * A divisão em áreas não é organização por organização: um único arquivo com os
 * ~2.500 textos do site seria impossível de revisar, e principalmente
 * impossível de traduzir sem alguém perder o fio. Separado, dá para reler a
 * página da vidraçaria inteira em alemão sem esbarrar no filme.
 *
 * Tudo é importado de forma estática, sem carregamento sob demanda: os quatro
 * idiomas juntos somam menos que uma foto, e cada .html gerado no build já
 * nasce num idioma só. Dividir em pedaços custaria uma ida à rede no meio do
 * carregamento para economizar quase nada.
 *
 * `textosDe` nunca devolve vazio — idioma desconhecido cai em português, para
 * uma chave errada na URL não derrubar a página inteira.
 */
const montar = (base, industria, vidracaria, plataforma, filme, demos, comecar) => ({
  ...base,
  industria,
  vidracaria,
  plataforma,
  filme,
  demos,
  comecar,
})

const TEXTOS = {
  pt: montar(pt, industriaPt, vidracariaPt, plataformaPt, filmePt, demosPt, comecarPt),
  en: montar(en, industriaEn, vidracariaEn, plataformaEn, filmeEn, demosEn, comecarEn),
  es: montar(es, industriaEs, vidracariaEs, plataformaEs, filmeEs, demosEs, comecarEs),
  de: montar(de, industriaDe, vidracariaDe, plataformaDe, filmeDe, demosDe, comecarDe),
}

export const textosDe = (idioma) => TEXTOS[idioma] ?? TEXTOS.pt

export default TEXTOS
