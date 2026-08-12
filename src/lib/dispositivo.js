/**
 * O que o aparelho aguenta.
 *
 * O site rodava mal em celular antigo porque tudo aqui era caro ao mesmo
 * tempo: dois laços de animação re-renderizando React a 60 quadros, fundo
 * fixo com mistura de camadas, desfoque atrás do cabeçalho. Agora cada peça
 * pergunta antes: dá para gastar isso aqui?
 *
 * A leitura é feita uma vez só, no carregamento — não é coisa que muda.
 */

const janela = typeof window !== 'undefined'

const consulta = (q) => (janela && window.matchMedia ? window.matchMedia(q).matches : false)

/** O visitante pediu menos movimento no sistema operacional. */
export const semMovimento = () => consulta('(prefers-reduced-motion: reduce)')

/**
 * Aparelho modesto: poucos núcleos, pouca memória, ou tela de toque estreita.
 * Não é ciência exata — é o suficiente para decidir entre gastar e não gastar.
 */
export const aparelhoFraco = (() => {
  let cache = null
  return () => {
    if (cache !== null) return cache
    if (!janela) return (cache = false)
    const nav = window.navigator || {}
    const nucleos = nav.hardwareConcurrency ?? 8
    const memoria = nav.deviceMemory ?? 8
    const toque = consulta('(pointer: coarse)')
    const estreita = window.innerWidth < 900
    cache = nucleos <= 4 || memoria <= 4 || (toque && estreita && nucleos <= 6)
    return cache
  }
})()

/**
 * Quantos quadros por segundo o filme pode gastar neste aparelho.
 * Vinte e quatro é a cadência do cinema — e ninguém repara a diferença num
 * movimento deste tamanho. Em aparelho modesto, dezesseis.
 */
export const quadrosPorSegundo = () => (aparelhoFraco() ? 16 : 24)

/**
 * Marca o <html> com o que foi decidido, para o CSS poder desligar efeitos
 * caros sem precisar de JavaScript em cada componente.
 */
export function marcarAparelho() {
  if (!janela) return
  const raiz = document.documentElement
  if (aparelhoFraco()) raiz.dataset.fraco = ''
  if (semMovimento()) raiz.dataset.parado = ''
}
