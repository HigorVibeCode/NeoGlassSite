/**
 * As três páginas do site, com tudo que o Google e o WhatsApp precisam saber
 * sobre cada uma. Este arquivo é lido em dois lugares:
 *
 *   · pelo roteador (`rota.js`), que troca título e canônica na navegação;
 *   · pelo script `paginas-seo.mjs`, que roda depois do build e escreve um
 *     .html de verdade para cada rota.
 *
 * O segundo é o que importa de fato. Antes, /vidracaria e /plataforma eram o
 * mesmo index.html: o título só mudava depois que o JavaScript rodava. O
 * Google roda JavaScript e via o certo — mas WhatsApp, LinkedIn, Facebook e os
 * robôs de IA não rodam. Quem colava o link da vidraçaria num grupo de
 * vidraceiros via a prévia da indústria.
 *
 * Por isso ele mora fora de `rota.js`: aquele arquivo importa React, e um
 * script de build em Node puro não consegue lê-lo.
 */

export const SITE = 'https://neoglass.online'

export const PAGINAS = [
  {
    id: 'industria',
    caminho: '/',
    arquivo: 'index.html',
    nome: 'Indústria',
    titulo: 'NeoGlass · Software para a indústria do vidro plano',
    descricao:
      'Do orçamento tirado na obra ao plano de corte que entra na mesa. Otimização de chapa com reaproveitamento de retalho, checagem com IA e rastreio de peça.',
    ogTitulo: 'NeoGlass · Software para a indústria do vidro plano',
    ogDescricao:
      'Do orçamento na obra ao plano de corte que entra na mesa. Aproveite cada retalho.',
  },
  {
    id: 'vidracaria',
    caminho: '/vidracaria',
    arquivo: 'vidracaria.html',
    nome: 'Vidraçaria',
    titulo: 'NeoGlass para vidraçaria · Profissional desde o primeiro orçamento',
    descricao:
      'Orçamento fechado na obra, pedido acompanhado do corte à entrega e retalho no lugar certo. Sem planilha, sem caderno, sem curso.',
    ogTitulo: 'NeoGlass para vidraçaria · o orçamento sai antes de você voltar para a loja',
    ogDescricao:
      'Meça o vão, monte o orçamento no celular e mande o PDF com a sua marca. Preço fixo por vidraçaria, sem taxa de implantação.',
    // O preço só entra no dado estruturado desta página, porque é a única onde
    // ele aparece na tela. Tem que bater com `CONFIG.vidracaria.precoMensal`.
    oferta: { preco: '197.00', moeda: 'BRL' },
  },
  {
    id: 'plataforma',
    caminho: '/plataforma',
    arquivo: 'plataforma.html',
    nome: 'Plataforma',
    titulo: 'A plataforma NeoGlass · O que ela faz pelo seu mês',
    descricao:
      'Os módulos que já rodam, a IA por dentro, o app no bolso do vidraceiro e o que vem a seguir.',
    ogTitulo: 'A plataforma NeoGlass, por dentro',
    ogDescricao:
      'Do orçamento à nota, sem trocar de sistema: os módulos que já rodam e o que vem a seguir.',
  },
]

/** A URL absoluta e canônica de uma rota. */
export const urlDe = (caminho) => (caminho === '/' ? `${SITE}/` : `${SITE}${caminho}`)
