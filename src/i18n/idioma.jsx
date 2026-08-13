import { createContext, useContext } from 'react'
import { IDIOMA_PADRAO } from './idiomas.js'

/**
 * O lado React do idioma: o provedor e os dois hooks. Os dados e as funções de
 * caminho estão em `idiomas.js`, que também é lido pelo gerador de páginas em
 * Node — por isso a separação.
 */
export * from './idiomas.js'

const Ctx = createContext({ idioma: IDIOMA_PADRAO, c: null })

export function ProvedorIdioma({ idioma, conteudo, children }) {
  return <Ctx.Provider value={{ idioma, c: conteudo }}>{children}</Ctx.Provider>
}

/** `const { c } = useIdioma()` — `c` é a árvore de textos daquele idioma. */
export const useIdioma = () => useContext(Ctx)

/** Só os textos, que é o que 90% dos componentes querem. */
export const useTextos = () => useContext(Ctx).c
