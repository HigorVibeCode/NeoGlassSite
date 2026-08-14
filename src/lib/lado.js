/**
 * De que lado o visitante disse que está — vidraçaria ou fábrica.
 *
 * Guardado por 30 dias, e usado num lugar só: quem já escolheu não precisa
 * escolher de novo ao digitar o endereço. A porta de entrada continua existindo
 * para quem chega pela primeira vez, e a tarja no topo da página deixa a saída
 * sempre visível — lembrar da escolha é conveniência, prender é armadilha.
 *
 * Não é cookie: é `localStorage`. Não vai para o servidor, não entra em
 * requisição nenhuma, e por isso não pede aviso de cookies. É uma preferência de
 * navegação, não um rastreador.
 */
const CHAVE = 'neoglass:lado'
const DIAS = 30

export const LADOS = ['vidracaria', 'industria']

export function lerLado() {
  try {
    const cru = window.localStorage.getItem(CHAVE)
    if (!cru) return null
    const { lado, em } = JSON.parse(cru)
    if (!LADOS.includes(lado)) return null
    if (Date.now() - em > DIAS * 86400_000) {
      window.localStorage.removeItem(CHAVE)
      return null
    }
    return lado
  } catch {
    // Navegação anônima, armazenamento bloqueado, arquivo único aberto do
    // disco: em todos esses casos o site funciona igual, só não lembra.
    return null
  }
}

export function gravarLado(lado) {
  if (!LADOS.includes(lado)) return
  try {
    window.localStorage.setItem(CHAVE, JSON.stringify({ lado, em: Date.now() }))
  } catch {
    /* sem memória, sem problema */
  }
}

export function esquecerLado() {
  try {
    window.localStorage.removeItem(CHAVE)
  } catch {
    /* idem */
  }
}
