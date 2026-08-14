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
  etiqueta: 'Software para o vidro plano',
  titulo: { antes: 'Vidro que você não compra', destaque: 'é lucro.' },
  texto:
    'Orçamento, plano de corte, controle de retalho e produção no mesmo sistema. Escolha por onde você entra:',
  portas: [
    {
      id: 'vidracaria',
      rotulo: 'Tenho uma vidraçaria',
      texto: 'Eu meço o vão, mando o orçamento, compro a chapa e instalo.',
      marcas: ['Orçamento em PDF na obra', 'Preço fixo por mês', '14 dias grátis'],
      acao: 'Ver o que muda para mim',
    },
    {
      id: 'industria',
      rotulo: 'Tenho uma fábrica de vidro',
      texto: 'Eu corto chapa, beneficio e entrego para outras empresas.',
      marcas: ['Otimização com retalho', 'Rastreio de peça', 'Apresentação com o seu pedido'],
      acao: 'Ver o que muda para mim',
    },
  ],
  painel: 'O sistema por dentro',
  duvida: 'Não sei em qual eu me encaixo',
  // A tarja que aparece quando o site lembra o lado escolhido.
  lembrete: {
    vidracaria: 'Você está vendo a versão para vidraçaria.',
    industria: 'Você está vendo a versão para fábrica de vidro.',
    trocar: 'Trocar',
  },
}
