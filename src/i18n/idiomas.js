
/**
 * O idioma do site — os dados, sem uma linha de React.
 *
 * Este arquivo é .js e não .jsx de propósito: o gerador de páginas
 * (`paginas-seo.mjs`) roda em Node puro depois do build, e o Node não sabe
 * importar .jsx. Tudo que os dois lados precisam saber sobre idioma mora aqui;
 * o provedor e o hook ficam em `idioma.jsx`, que só o navegador carrega.
 *
 *
 * Os quatro idiomas são os mesmos da plataforma (`src/i18n/` no repositório do
 * sistema): português, inglês, espanhol e alemão. Se um dia entrar um quinto
 * lá, ele entra aqui — e não o contrário.
 *
 * Duas decisões que valem explicar, porque elas moldam o resto:
 *
 * 1. O idioma vem da URL, não de um estado que o React guarda. `/en/plataforma`
 *    é inglês porque o endereço diz que é, e nada mais. Isso importa porque o
 *    site é gerado em HTML estático por rota (ver `paginas-seo.mjs`): o Google e
 *    o WhatsApp precisam receber a página já no idioma certo, sem rodar uma
 *    linha de JavaScript. Idioma em `localStorage` seria invisível para eles.
 *
 * 2. Português não tem prefixo. A raiz `/` é o site em português, e os outros
 *    moram em `/en`, `/es` e `/de`. É o padrão que o Google recomenda para um
 *    site com idioma principal, e evita um redirecionamento na home — que é
 *    justamente a página que recebe o tráfego pago.
 */

export const IDIOMAS = [
  { codigo: 'pt', prefixo: '', htmlLang: 'pt-BR', ogLocale: 'pt_BR', nome: 'Português', curto: 'PT' },
  { codigo: 'en', prefixo: '/en', htmlLang: 'en', ogLocale: 'en_US', nome: 'English', curto: 'EN' },
  { codigo: 'es', prefixo: '/es', htmlLang: 'es', ogLocale: 'es_ES', nome: 'Español', curto: 'ES' },
  { codigo: 'de', prefixo: '/de', htmlLang: 'de', ogLocale: 'de_DE', nome: 'Deutsch', curto: 'DE' },
]

export const IDIOMA_PADRAO = 'pt'

export const idiomaDe = (codigo) =>
  IDIOMAS.find((i) => i.codigo === codigo) ?? IDIOMAS[0]

/**
 * Separa o prefixo de idioma do resto do caminho.
 * `/de/plataforma` → { idioma: 'de', resto: '/plataforma' }
 * `/vidracaria`    → { idioma: 'pt', resto: '/vidracaria' }
 */
export function partirCaminho(caminho) {
  const limpo = (caminho || '/').replace(/\.html$/, '').replace(/\/+$/, '') || '/'
  for (const i of IDIOMAS) {
    if (!i.prefixo) continue
    if (limpo === i.prefixo) return { idioma: i.codigo, resto: '/' }
    if (limpo.startsWith(`${i.prefixo}/`)) {
      return { idioma: i.codigo, resto: limpo.slice(i.prefixo.length) }
    }
  }
  return { idioma: IDIOMA_PADRAO, resto: limpo }
}

/** Monta a URL de um caminho interno num idioma. `/plataforma` + `de` → `/de/plataforma` */
export const comIdioma = (resto, codigo) => {
  const { prefixo } = idiomaDe(codigo)
  if (resto === '/' || !resto) return prefixo || '/'
  return `${prefixo}${resto}`
}

/**
 * O idioma que o navegador prefere, entre os quatro que existem. Só é usado
 * numa situação: o visitante caiu na raiz, nunca escolheu idioma nesta máquina,
 * e o navegador dele não fala português. Aí o site oferece a troca — sem
 * redirecionar sozinho, porque redirecionamento automático por idioma esconde
 * as outras versões do robô do Google e irrita quem escolheu de propósito.
 */
export function idiomaDoNavegador() {
  if (typeof navigator === 'undefined') return null
  for (const tag of navigator.languages ?? [navigator.language]) {
    const base = String(tag || '').slice(0, 2).toLowerCase()
    if (IDIOMAS.some((i) => i.codigo === base)) return base
  }
  return null
}

