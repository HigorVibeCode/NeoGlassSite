import { useCallback, useEffect, useState } from 'react'

/**
 * Um roteador de 40 linhas. O site tem três endereços de verdade — cada
 * público merece a sua URL, o seu título e o seu lugar no Google — mas não
 * merece uma biblioteca de rotas inteira no pacote.
 *
 * A Vercel já devolve o index.html para qualquer caminho (rewrites), então
 * abrir /vidracaria direto funciona.
 */

export const ABAS = [
  {
    id: 'industria',
    caminho: '/',
    nome: 'Indústria',
    titulo: 'NeoGlass · Software para a indústria do vidro plano',
    descricao:
      'Do orçamento tirado na obra ao plano de corte que entra na mesa. Otimização de chapa com reaproveitamento de retalho, checagem com IA e rastreio de peça.',
  },
  {
    id: 'vidracaria',
    caminho: '/vidracaria',
    nome: 'Vidraçaria',
    titulo: 'NeoGlass para vidraçaria · Profissional desde o primeiro orçamento',
    descricao:
      'Orçamento fechado na obra, pedido acompanhado do corte à entrega e retalho no lugar certo. Sem planilha, sem caderno, sem curso.',
  },
  {
    id: 'plataforma',
    caminho: '/plataforma',
    nome: 'Plataforma',
    titulo: 'A plataforma NeoGlass · O que ela faz pelo seu mês',
    descricao:
      'Os módulos que já rodam, a IA por dentro, o app no bolso do vidraceiro e o que vem a seguir.',
  },
]

const normalizar = (p) => {
  const limpo = (p || '/').replace(/\/+$/, '') || '/'
  return ABAS.some((a) => a.caminho === limpo) ? limpo : '/'
}

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

  // Título e descrição acompanham a aba — quem compartilha o link da vidraçaria
  // compartilha a página da vidraçaria.
  useEffect(() => {
    document.title = aba.titulo
    document.querySelector('meta[name="description"]')?.setAttribute('content', aba.descricao)
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute('href', `https://neoglass.online${aba.caminho === '/' ? '/' : aba.caminho}`)
  }, [aba])

  return { aba, ir }
}
