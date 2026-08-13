import { useCallback, useEffect, useState } from 'react'
import { PAGINAS, urlDe } from './paginasSeo.js'

/**
 * Um roteador de 40 linhas. O site tem três endereços de verdade — cada
 * público merece a sua URL, o seu título e o seu lugar no Google — mas não
 * merece uma biblioteca de rotas inteira no pacote.
 *
 * Os títulos e descrições moram em `paginasSeo.js`, porque o script que gera
 * um .html por rota depois do build também precisa deles, e aquele script roda
 * em Node puro (não consegue importar nada que traga React junto).
 */

export const ABAS = PAGINAS

const normalizar = (p) => {
  // O `.html` some porque cada rota agora tem um arquivo próprio no build
  // (/vidracaria.html). Quem cair no arquivo direto tem que ver a página certa,
  // e não a da indústria com o título da vidraçaria.
  const limpo = (p || '/').replace(/\.html$/, '').replace(/\/+$/, '') || '/'
  return ABAS.some((a) => a.caminho === limpo) ? limpo : '/'
}

/** Troca o conteúdo de uma meta que já existe no HTML servido. */
const meta = (seletor, valor) =>
  document.querySelector(seletor)?.setAttribute('content', valor)

export function useRota() {
  const [caminho, setCaminho] = useState(() =>
    normalizar(typeof window === 'undefined' ? '/' : window.location.pathname),
  )

  useEffect(() => {
    const on = () => setCaminho(normalizar(window.location.pathname))
    window.addEventListener('popstate', on)
    return () => window.removeEventListener('popstate', on)
  }, [])

  const ir = useCallback(
    (destino) => {
      const alvo = normalizar(destino)
      if (alvo === caminho) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
      // No arquivo único (aquele .html que vai por WhatsApp) o navegador não
      // deixa mexer no endereço. A navegação continua funcionando mesmo assim.
      try {
        window.history.pushState({}, '', alvo)
      } catch {
        /* file:// — segue só com o estado */
      }
      setCaminho(alvo)
      window.scrollTo({ top: 0 })
    },
    [caminho],
  )

  const aba = ABAS.find((a) => a.caminho === caminho) ?? ABAS[0]

  // Cada aba tem o seu título, a sua descrição e a sua canônica. Isto aqui só
  // cobre a navegação DENTRO do site — quem chega direto em /vidracaria já
  // recebe o HTML certo do servidor, que é o que importa para quem não roda
  // JavaScript (WhatsApp, LinkedIn, robôs de IA).
  useEffect(() => {
    const url = urlDe(aba.caminho)
    document.title = aba.titulo
    meta('meta[name="description"]', aba.descricao)
    meta('meta[property="og:title"]', aba.ogTitulo)
    meta('meta[property="og:description"]', aba.ogDescricao)
    meta('meta[property="og:url"]', url)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', url)
  }, [aba])

  return { aba, ir }
}
