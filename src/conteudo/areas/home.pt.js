/**
 * A porta de entrada do site.
 *
 * Ela existe por um motivo só: até hoje quem digitava neoglass.online caía na
 * página da indústria. Um vidraceiro com dois funcionários lia sobre chapa,
 * beneficiamento e rastreio de peça, não se reconhecia, e ia embora.
 *
 * O desenho segue o que a pesquisa de usabilidade recomenda: NÃO cobrar a
 * escolha antes de entregar valor. Primeiro uma promessa que os dois lados
 * entendem, depois as duas portas. Uma tela que só pergunta "quem é você?" é
 * justamente o padrão que faz gente ir embora.
 */
export default {
  etiqueta: 'Software para quem trabalha com vidro',
  titulo: { antes: 'Vidro que você não compra', destaque: 'é lucro.' },
  texto:
    'Software para vidraçarias e fábricas de vidro. Orçamento, produção, corte, retalhos e pedidos conectados em um só sistema.',
  portas: [
    {
      id: 'vidracaria',
      rotulo: 'Tenho uma vidraçaria',
      texto: 'Eu meço o vão, faço o orçamento, compro o vidro e instalo.',
      marcas: ['Orçamento em PDF na obra', 'Preço fixo por mês', '14 dias grátis'],
      acao: 'Ver como funciona para minha vidraçaria',
    },
    {
      id: 'industria',
      rotulo: 'Tenho uma fábrica de vidro',
      texto: 'Eu corto, beneficio, tempero e entrego para outras empresas.',
      marcas: ['Otimização com retalho', 'Rastreio de peça', 'Apresentação com o seu pedido'],
      acao: 'Ver como funciona para minha fábrica',
    },
  ],
  painel: 'O sistema por dentro',
  duvida: 'Ainda tenho dúvidas',
  // A tarja que aparece quando o site lembra o lado escolhido.
  lembrete: {
    vidracaria: 'Você está vendo a versão para vidraçaria.',
    industria: 'Você está vendo a versão para fábrica de vidro.',
    trocar: 'Trocar',
  },
}
