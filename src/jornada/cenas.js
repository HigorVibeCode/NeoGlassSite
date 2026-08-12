import { range, ease } from '../lib/scroll.js'
import { APROVEITAMENTO } from './conteudos.jsx'

/**
 * A jornada. Três chapas de vidro atravessam a página inteira e nunca somem —
 * a cada cena elas se reorganizam e mostram outra coisa.
 *
 * Espaço de desenho: 1180 × 700 no computador, 380 × 560 no celular. As chapas
 * são posicionadas nesse espaço e o palco inteiro é escalado para caber na tela.
 *
 *   formacao(t, compacto)  posição das três chapas; t é o tempo da cena (0 a 1)
 *   conteudo               o que cada chapa mostra
 *   medidor(t)             o chip de progresso que fica embaixo do texto
 *
 * A ordem conta uma história: o pedido entra, é aprovado, é cortado, atravessa
 * a fábrica, vira dinheiro — e tudo isso de qualquer tela.
 */

export const PALCO = { largura: 1180, altura: 700 }
export const PALCO_MOVEL = { largura: 380, altura: 560 }

// A abertura tem palco próprio: ela divide a tela com o texto, não ocupa
// a largura inteira como as cenas.
export const PALCO_HERO = { largura: 660, altura: 420 }
export const PALCO_HERO_MOVEL = { largura: 380, altura: 250 }

export const FORMACAO_ABERTURA = (compacto) =>
  compacto
    ? [
        { x: 4, y: 36, w: 118, h: 168, rot: -6, z: 1 },
        { x: 114, y: 12, w: 150, h: 216, rot: 3, z: 3 },
        { x: 256, y: 48, w: 120, h: 152, rot: -3, z: 2 },
      ]
    : [
        // pouca sobreposição: cada tela precisa poder ser lida
        { x: 26, y: 104, w: 196, h: 279, rot: -6, z: 1 },
        { x: 216, y: 22, w: 250, h: 360, rot: 3, z: 3 },
        { x: 460, y: 122, w: 198, h: 250, rot: -3, z: 2 },
      ]

export const CONTEUDO_ABERTURA = ['fantasmaFeed', 'fantasmaPlano', 'fantasmaTela']

export const CENAS = [
  {
    id: 'orcamento',
    etapa: 'Orçamento',
    cor: '#0e8c6a',
    duracao: 3900,
    titulo: 'Foto na obra, orçamento pronto.',
    sub: 'Cada visita, medida e mudança do cliente entra na linha do tempo. As fotos viram carrossel — a versão de agora na frente, as anteriores logo atrás.',
    conteudo: ['feedAntigo2', 'feedAntigo1', 'feed'],
    medidor: (t) => {
      const n = Math.min(4, Math.floor(ease(range(t, 0.06, 0.72)) * 4.6))
      return { texto: `Registros no orçamento · ${n}/4`, k: n / 4 }
    },
    formacao: (t, compacto) =>
      compacto
        ? [
            { x: 30, y: 68, w: 264, h: 466, rot: -9, z: 1, op: 0.5 },
            { x: 44, y: 56, w: 264, h: 466, rot: -4.5, z: 2, op: 0.78 },
            { x: 58, y: 44, w: 264, h: 466, rot: 0, z: 3, op: 1 },
          ]
        : [
            { x: 356, y: 29, w: 380, h: 670, rot: -9, z: 1, op: 0.5 },
            { x: 378, y: 22, w: 380, h: 670, rot: -4.5, z: 2, op: 0.78 },
            { x: 400, y: 15, w: 380, h: 670, rot: 0, z: 3, op: 1 },
          ],
  },
  {
    id: 'simulacao',
    etapa: 'Aprovação',
    cor: '#e4586f',
    duracao: 3900,
    titulo: 'Ele aprova antes de existir.',
    sub: 'A IA monta o vidro no ambiente do próprio cliente. E confere o pedido — espessura, ferragem, prazo — antes de ele descer para a fábrica.',
    conteudo: ['antes', 'simulacao', 'checagem'],
    medidor: (t) => {
      const n = Math.min(4, Math.floor(ease(range(t, 0.24, 0.82)) * 4.6))
      return { texto: `Conferindo o pedido · ${n}/4`, k: n / 4 }
    },
    formacao: (t, compacto) =>
      compacto
        ? [
            // no celular as laterais espiam por trás da do meio, mas inteiras
            // dentro da tela — cortadas na borda, pareciam quebradas
            { x: 2, y: 196, w: 136, h: 169, rot: -4, z: 1, op: 0.92 },
            { x: 64, y: 96, w: 252, h: 350, rot: 0, z: 3, op: 1 },
            { x: 242, y: 196, w: 136, h: 169, rot: 4, z: 2, op: 0.92 },
          ]
        : [
            { x: 40, y: 148, w: 352, h: 434, rot: -1.5, z: 1, op: 1 },
            { x: 400, y: 88, w: 380, h: 528, rot: 0, z: 3, op: 1 },
            { x: 788, y: 148, w: 352, h: 434, rot: 1.5, z: 2, op: 1 },
          ],
  },
  {
    id: 'corte',
    etapa: 'Corte',
    cor: '#0e7b9c',
    duracao: 5200,
    titulo: 'Corta certo. Sobra vira estoque.',
    sub: 'O plano sai pronto para a mesa. E o pedaço que restou volta ao cavalete com medida, cor e endereço, para disputar a próxima otimização.',
    conteudo: ['chapa0', 'chapa1', 'chapa2'],
    medidor: (t) => {
      const k = ease(range(t, 0.32, 0.58))
      if (t > 0.82) return { texto: 'Retalho reservado · cavalete A-03', k: 1 }
      return { texto: `Aproveitamento · ${(APROVEITAMENTO * k).toFixed(1)}%`, k }
    },
    /**
     * Três atos. Primeiro as chapas encostam e viram uma chapa só — sem canto
     * arredondado no meio, senão o olho lê três cartões. Depois o plano é
     * riscado e preenchido. Só então as colunas se afastam e o retalho sai.
     *
     * Cada estado é um degrau, nunca uma rampa calculada quadro a quadro: quem
     * faz o movimento é a transição do CSS, numa curva contínua.
     */
    formacao: (t, compacto) => {
      const solto = t > 0.74
      if (compacto) {
        // largura total 348, dividida como as colunas reais: 1200 / 1230 / 780
        return solto
          ? [
              { x: 8, y: 158, w: 130, h: 244, rot: 0, z: 1, op: 1, raio: '8px' },
              { x: 146, y: 158, w: 133, h: 244, rot: 0, z: 1, op: 1, raio: '8px' },
              { x: 287, y: 158, w: 85, h: 244, rot: 0, z: 2, op: 1, raio: '8px' },
            ]
          : [
              { x: 16, y: 158, w: 130, h: 244, z: 1, op: 1, raio: '8px 0 0 8px', semBorda: 'd' },
              { x: 146, y: 158, w: 133, h: 244, z: 1, op: 1, raio: '0', semBorda: 'ed' },
              { x: 279, y: 158, w: 85, h: 244, z: 2, op: 1, raio: '0 8px 8px 0', semBorda: 'e' },
            ]
      }
      // largura total 960, dividida como as colunas reais: 1200 / 1230 / 780
      return solto
        ? [
            { x: 92, y: 14, w: 359, h: 673, rot: 0, z: 1, op: 1, raio: '10px' },
            { x: 469, y: 14, w: 368, h: 673, rot: 0, z: 1, op: 1, raio: '10px' },
            { x: 855, y: 14, w: 233, h: 673, rot: 0, z: 2, op: 1, raio: '10px' },
          ]
        : [
            { x: 110, y: 14, w: 359, h: 673, z: 1, op: 1, raio: '10px 0 0 10px', semBorda: 'd' },
            { x: 469, y: 14, w: 368, h: 673, z: 1, op: 1, raio: '0', semBorda: 'ed' },
            { x: 837, y: 14, w: 233, h: 673, z: 2, op: 1, raio: '0 10px 10px 0', semBorda: 'e' },
          ]
    },
  },
  {
    id: 'fabrica',
    etapa: 'Produção',
    cor: '#7c6ad6',
    duracao: 4600,
    titulo: 'A peça tem endereço.',
    sub: 'Cada peça sai com etiqueta e código. Ela atravessa as fases na tela, e a entrega é dada pela leitura do código — não pela memória de quem carregou.',
    conteudo: ['painel', 'etiqueta', 'expedicao'],
    medidor: (t) => {
      const n = Math.min(5, Math.floor(ease(range(t, 0.46, 0.94)) * 5.6))
      return { texto: `Peças conferidas na saída · ${n}/5`, k: n / 5 }
    },
    formacao: (t, compacto) =>
      compacto
        ? [
            { x: 4, y: 96, w: 300, h: 219, rot: -2, z: 2, op: 1 },
            { x: 24, y: 330, w: 140, h: 201, rot: 3, z: 1, op: 1 },
            { x: 190, y: 292, w: 172, h: 246, rot: 0, z: 3, op: 1 },
          ]
        : [
            { x: 30, y: 172, w: 520, h: 380, rot: -1, z: 2, op: 1 },
            { x: 580, y: 190, w: 230, h: 330, rot: 2, z: 1, op: 1 },
            { x: 840, y: 138, w: 300, h: 430, rot: 0, z: 3, op: 1 },
          ],
  },
  {
    id: 'dinheiro',
    etapa: 'Dinheiro',
    cor: '#b8862c',
    duracao: 4400,
    titulo: 'No fim, você sabe quanto sobrou.',
    sub: 'Nota emitida, boleto na rua e o fechamento do pedido: matéria-prima, produção e gastos até a margem real daquele pedido — não a média do mês.',
    conteudo: ['nota', 'recebimento', 'margem'],
    medidor: (t) => {
      const k = ease(range(t, 0.66, 0.88))
      return { texto: `Margem deste pedido · ${(41.7 * k).toFixed(1).replace('.', ',')}%`, k }
    },
    formacao: (t, compacto) =>
      compacto
        ? [
            { x: 4, y: 330, w: 152, h: 211, rot: -4, z: 1, op: 1 },
            { x: 178, y: 372, w: 196, h: 138, rot: 3, z: 2, op: 1 },
            { x: 56, y: 44, w: 268, h: 316, rot: 0, z: 3, op: 1 },
          ]
        : [
            { x: 56, y: 148, w: 310, h: 430, rot: -1.5, z: 1, op: 1 },
            { x: 400, y: 252, w: 300, h: 212, rot: 1, z: 2, op: 1 },
            { x: 730, y: 120, w: 390, h: 460, rot: 0, z: 3, op: 1 },
          ],
  },
  {
    id: 'onde-roda',
    etapa: 'Em qualquer tela',
    cor: '#4a6ae0',
    duracao: 2900,
    // aqui as chapas viram aparelhos: sem o acabamento de vidro por cima
    nu: true,
    titulo: 'Abre onde você estiver.',
    sub: 'Escritório no computador, encarregado no tablet ao lado da mesa, vendedor no celular na obra. Mesmo pedido, mesma hora — sem instalar e sem licença por posto.',
    conteudo: ['navegador', 'tablet', 'celular'],
    medidor: (t) => {
      const n = Math.min(3, Math.floor(ease(range(t, 0.1, 0.8)) * 3.6))
      return { texto: `Telas abertas ao mesmo tempo · ${n}/3`, k: n / 3 }
    },
    formacao: (t, compacto) =>
      compacto
        ? [
            // proporções dos aparelhos: 1,60 · 0,72 · 0,50
            { x: 30, y: 96, w: 320, h: 200, rot: 0, z: 3, op: 1 },
            { x: 76, y: 330, w: 132, h: 182, rot: 0, z: 2, op: 1 },
            { x: 238, y: 352, w: 80, h: 160, rot: 0, z: 1, op: 1 },
          ]
        : [
            // Os três lado a lado, sem se cobrir: a cena é sobre as três telas
            // abertas ao mesmo tempo — uma escondida atrás da outra nega a ideia.
            { x: 8, y: 132, w: 680, h: 425, rot: 0, z: 3, op: 1 },
            { x: 726, y: 64, w: 290, h: 401, rot: 0, z: 2, op: 1 },
            { x: 1042, y: 245, w: 130, h: 260, rot: 0, z: 1, op: 1 },
          ],
  },
]
