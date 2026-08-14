import { useCallback, useEffect, useState } from 'react'
import { IDIOMA_PADRAO, idiomaDe, partirCaminho } from '../i18n/idioma.jsx'
import { ROTAS, caminhoDe, urlDe } from './paginasSeo.js'

/**
 * Um roteador de sessenta linhas, para três páginas em quatro idiomas.
 *
 * O endereço carrega as duas informações — qual página e qual idioma — e nada
 * mais. `/de/glasereien` é a vidraçaria em alemão porque a URL diz isso; não há
 * estado escondido, nem preferência salva que contradiga o que está na barra de
 * endereço. Isso importa porque cada combinação vira um .html de verdade no
 * build: quem chega direto recebe a página certa sem rodar JavaScript.
 */

/** Descobre página e idioma a partir de um caminho qualquer. */
function resolver(caminho) {
  const { idioma, resto } = partirCaminho(caminho)
  const rota = ROTAS.find((r) => r.slug[idioma] === resto)
  // Endereço que não existe naquele idioma cai na porta de entrada DAQUELE
  // idioma — não na portuguesa. Quem digitou /de/coisa-errada é alemão.
  return { idioma, id: rota?.id ?? 'home' }
}

/** Troca o conteúdo de uma meta que já existe no HTML servido. */
const meta = (seletor, valor) => document.querySelector(seletor)?.setAttribute('content', valor)

/**
 * Recebe a FUNÇÃO que resolve os textos, não os textos prontos. O idioma sai da
 * URL, que este hook é quem lê — então quem chama não teria como saber o idioma
 * antes de chamar. Passar a função quebra esse ovo-e-galinha sem precisar de
 * dois estados que podem divergir na navegação.
 */
export function useRota(obterTextos) {
  const [estado, setEstado] = useState(() =>
    resolver(typeof window === 'undefined' ? '/' : window.location.pathname),
  )

  useEffect(() => {
    const on = () => setEstado(resolver(window.location.pathname))
    window.addEventListener('popstate', on)
    return () => window.removeEventListener('popstate', on)
  }, [])

  const irPara = useCallback(
    (id, idioma, opcoes) => {
      const alvo = caminhoDe(id, idioma)
      if (id === estado.id && idioma === estado.idioma) {
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
      // `lembrado` conta à página que ela foi aberta pela memória do visitante,
      // e não por um clique dele. É o que autoriza a tarja "você está vendo a
      // versão para vidraçaria — trocar" a aparecer.
      setEstado({ id, idioma, lembrado: Boolean(opcoes?.lembrado) })
      window.scrollTo({ top: 0 })
    },
    [estado],
  )

  /** Ir para outra página, mantendo o idioma. */
  const ir = useCallback(
    (id, opcoes) => irPara(id, estado.idioma, opcoes),
    [irPara, estado.idioma],
  )

  /** Trocar de idioma, ficando na mesma página. É o que o seletor do topo faz. */
  const trocarIdioma = useCallback((idioma) => irPara(estado.id, idioma), [irPara, estado.id])

  // Título, descrição e canônica acompanham a navegação DENTRO do site. Quem
  // chega direto já recebeu o HTML certo do servidor, que é o que importa para
  // quem não roda JavaScript.
  const textos = obterTextos(estado.idioma)

  useEffect(() => {
    const p = textos?.paginas?.[estado.id]
    if (!p) return
    const url = urlDe(estado.id, estado.idioma)
    const info = idiomaDe(estado.idioma)
    document.title = p.titulo
    document.documentElement.lang = info.htmlLang
    meta('meta[name="description"]', p.descricao)
    meta('meta[property="og:title"]', p.ogTitulo)
    meta('meta[property="og:description"]', p.ogDescricao)
    meta('meta[property="og:url"]', url)
    meta('meta[property="og:locale"]', info.ogLocale)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', url)
  }, [estado, textos])

  return { ...estado, textos, ir, trocarIdioma, padrao: IDIOMA_PADRAO }
}
