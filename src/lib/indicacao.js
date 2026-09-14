import { CONFIG } from '../config.js'

/**
 * De onde veio esta visita — o parceiro que indicou e/ou a campanha que pagou.
 *
 * Uma camada só, dois usos:
 *
 *   · ATRIBUIÇÃO DE PARCEIRO — quem entra por `neoglass.online/p/higorlucas`
 *     tem o código guardado e, ao se cadastrar, o cliente cai na carteira
 *     daquele parceiro (a comissão sai pelo motor que já existe).
 *   · MEDIÇÃO DE MARKETING — qualquer visita com `utm_*` guarda a campanha, o
 *     referrer e a página de entrada. É o que dá conversão por campanha e, com
 *     isso, o denominador do CAC.
 *
 * As duas são dimensões PARALELAS: um cadastro pode ter parceiro e campanha ao
 * mesmo tempo, e uma coisa não interfere na outra.
 *
 * PRIMEIRO TOQUE VENCE, por 30 dias. Se já existe um registro dentro da janela,
 * um segundo link NÃO o substitui — quem apresentou o cliente é quem leva. Isso
 * é decisão comercial, não detalhe técnico: premia quem abriu a porta, e não
 * quem apareceu no último clique.
 *
 * Nada aqui pode derrubar o site: `localStorage` estoura em aba anônima e em
 * navegador com dados bloqueados, e a rede falha. Tudo é try/catch com queda
 * silenciosa — no pior caso a visita simplesmente não é atribuída.
 */

const CHAVE = 'ng_origem'
const JANELA_DIAS = 30
const JANELA_MS = JANELA_DIAS * 24 * 60 * 60 * 1000
let memoria = null

/** O código do parceiro tem a mesma forma no site e no banco. */
const CODIGO_OK = /^[a-z0-9][a-z0-9-]{2,30}$/

const UTMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']

function ler() {
  for (const tipo of ['localStorage','sessionStorage']) {
    try {
      const o = JSON.parse(window[tipo]?.getItem(CHAVE) || 'null')
      if (o && typeof o === 'object' && o.ts && Date.now()-o.ts<=JANELA_MS) return o
    } catch { /* Tenta o armazenamento da sessão antes de desistir. */ }
  }
  return memoria?.ts && Date.now()-memoria.ts<=JANELA_MS ? memoria : null
}

function gravar(o) {
  memoria = o
  for(const tipo of ['localStorage','sessionStorage']) {
    try { window[tipo]?.setItem(CHAVE,JSON.stringify(o)) } catch { /* Fallback de sessão/memória. */ }
  }
}

/** O que está guardado, já dentro da janela. `null` quando não há nada. */
export function origemGuardada() {
  if (typeof window === 'undefined') return null
  return ler()
}

/** O código do parceiro guardado, se houver. */
export function codigoGuardado() {
  return origemGuardada()?.codigo ?? null
}

/**
 * Apaga o que está guardado. É o "não fui indicado" do formulário — a pessoa
 * tem que poder desfazer uma atribuição que não reconhece.
 */
export function esquecerOrigem() {
  memoria = null
  for(const tipo of ['localStorage','sessionStorage']) {
    try { window[tipo]?.removeItem(CHAVE) } catch { /* Armazenamento bloqueado. */ }
  }
}

/** Pergunta ao servidor de quem é o código. `null` = não existe ou inativo. */
export async function resolverCodigo(codigo) {
  if (!CONFIG.indicacaoApi || !CODIGO_OK.test(codigo ?? '')) return null
  try {
    const r = await fetch(CONFIG.indicacaoApi, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ acao: 'resolver', codigo }),
    })
    if (!r.ok) return null
    const corpo = await r.json()
    return corpo?.nome ? { codigo, nome: corpo.nome } : null
  } catch {
    return null
  }
}

/** Conta a visita. Dispara e esquece — nunca segura a página. */
function registrarClique(dados) {
  if (!CONFIG.indicacaoApi) return
  try {
    fetch(CONFIG.indicacaoApi, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ acao: 'clique', ...dados }),
      keepalive: true,
    }).catch(() => {})
  } catch {
    /* silêncio */
  }
}

/**
 * Lê o endereço de entrada, guarda a origem e limpa a URL.
 *
 * Chamada uma vez, no início do app. Duas coisas podem estar no endereço:
 *
 *   ?ref=<codigo> → o link do parceiro
 *   ?utm_*        → a campanha (em QUALQUER página, porque anúncio cai na home
 *                   ou numa página de público, não em /p/)
 *
 * O link divulgado é `neoglass.online/p/<codigo>`, mas ele NÃO chega até aqui
 * como caminho: a Vercel o redireciona para `/?ref=<codigo>`. O motivo é
 * concreto — o index.html referencia os assets por caminho RELATIVO
 * (`./assets/…`), então servir o SPA sob `/p/algo` faria o navegador buscar
 * `/p/assets/…` e a página viria em branco. O redirecionamento resolve isso sem
 * mexer no gerador de páginas. Aceitamos `/p/` aqui mesmo assim, para o caso de
 * o redirecionamento não estar de pé (ambiente local, outro host).
 *
 * A limpeza da URL (`replaceState`) é para o visitante não ficar com
 * `/p/higorlucas` na barra e não compartilhar um endereço que, para ele, não
 * significa nada.
 */
export function capturarOrigem() {
  if (typeof window === 'undefined') return null

  let codigo = null
  const caminho = window.location.pathname || '/'
  const casou = caminho.match(/^\/p\/([^/?#]+)\/?$/i)
  if (casou) {
    try {
      const bruto = decodeURIComponent(casou[1]).toLowerCase()
      if (CODIGO_OK.test(bruto)) codigo = bruto
    } catch { /* Um endereço malformado não pode impedir a abertura do site. */ }
  }

  const busca = new URLSearchParams(window.location.search || '')
  const campanha = {}
  for (const k of UTMS) {
    const v = busca.get(k)
    if (v) campanha[k] = v.slice(0, 120)
  }
  const temCampanha = Object.keys(campanha).length > 0

  // Também aceitamos ?ref=codigo — é o formato que a maioria das pessoas tenta
  // colar por instinto, e recusá-lo só perderia atribuição de graça.
  if (!codigo) {
    const ref = (busca.get('ref') || '').toLowerCase()
    if (CODIGO_OK.test(ref)) codigo = ref
  }

  if (!codigo && !temCampanha) return ler()

  // Conta a visita SEMPRE que ela veio de um link identificado — mesmo que a
  // atribuição não vá ser gravada (primeiro toque já existe). Sem isso o
  // parceiro veria menos cliques do que realmente teve.
  registrarClique({
    codigo,
    ...campanha,
    referrer: (document.referrer || '').slice(0, 300),
    landing: caminho.slice(0, 200),
  })

  // PRIMEIRO TOQUE VENCE — mas POR DIMENSÃO.
  //
  // O comentário no topo deste arquivo sempre disse que parceiro e campanha são
  // dimensões paralelas; o código não fazia isso. Guardava tudo num registro só
  // e, se JÁ existisse qualquer registro na janela, o segundo link era
  // inteiramente ignorado. Num teste de 04/set deu o pior caso: uma visita ao
  // link do parceiro e, depois, uma entrada por `?utm_campaign=vidraceiros-es`
  // — o cadastro saiu com o parceiro e SEM campanha nenhuma. Quem anuncia fica
  // sem saber o que converteu, e o efeito dura os 30 dias da janela.
  //
  // Agora cada dimensão tem o seu primeiro toque: o parceiro guardado nunca é
  // trocado por outro parceiro, a campanha guardada nunca é trocada por outra
  // campanha, e uma dimensão vazia é preenchida pela visita que a trouxer.
  const anterior = ler()
  const jaTemCampanha = anterior ? UTMS.some((k) => anterior[k]) : false

  const novoCodigo = anterior?.codigo ?? codigo
  const novaCampanha = jaTemCampanha
    ? Object.fromEntries(UTMS.filter((k) => anterior[k]).map((k) => [k, anterior[k]]))
    : campanha

  const ganhouCodigo = Boolean(codigo) && !anterior?.codigo
  const ganhouCampanha = temCampanha && !jaTemCampanha

  if (!anterior || ganhouCodigo || ganhouCampanha) {
    gravar({
      ...(anterior ?? {}),
      codigo: novoCodigo ?? null,
      // O nome do parceiro acompanha o CÓDIGO: trocou de código, o nome antigo
      // não vale mais (é resolvido logo abaixo).
      nome: ganhouCodigo ? null : (anterior?.nome ?? null),
      ...novaCampanha,
      referrer: anterior?.referrer ?? (document.referrer || '').slice(0, 300),
      landing: anterior?.landing ?? caminho.slice(0, 200),
      ts: anterior?.ts ?? Date.now(),
    })

    // O nome do parceiro é resolvido em segundo plano, só para o selo do
    // formulário. Se falhar, o código continua valendo — quem decide de quem é
    // a indicação é o servidor, no cadastro, nunca esta tela.
    if (codigo && ganhouCodigo) {
      resolverCodigo(codigo).then((r) => {
        if (!r) return
        const atual = ler()
        if (atual?.codigo === codigo) gravar({ ...atual, nome: r.nome })
      })
    }
  }

  // Tira o /p/<codigo> (e os utm_*) da barra de endereço.
  if (casou || temCampanha || busca.get('ref')) {
    try {
      busca.delete('ref')
      for(const k of UTMS) busca.delete(k)
      const resto=busca.toString()
      window.history.replaceState({}, '', (casou ? '/' : window.location.pathname)+(resto?'?'+resto:'')+(window.location.hash||''))
    } catch {
      /* file:// não deixa mexer no endereço */
    }
  }

  return ler()
}
