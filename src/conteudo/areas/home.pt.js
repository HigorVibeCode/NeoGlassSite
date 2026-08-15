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
  /* O título é uma frase só com o miolo em gradiente. Por isso vem
     partido em três: cada idioma escolhe onde o verde entra. */
  titulo: { antes: 'Mais', destaque: 'dinheiro e segurança', depois: 'para quem trabalha com vidro.' },
  /* A frase da marca desceu do topo: virou legenda discreta do título. */
  legenda: 'Vidro que você não compra é lucro.',
  pergunta: 'Qual é o seu negócio?',
  portas: [
    { id: 'vidracaria', rotulo: 'Tenho uma vidraçaria', texto: 'Orçamentos, projetos e instalação' },
    { id: 'industria', rotulo: 'Tenho uma indústria', texto: 'Produção, corte e beneficiamento' },
  ],
  painel: 'O sistema por dentro',
  duvida: 'Ainda tenho dúvidas',
  lembrete: {
    vidracaria: 'Você está vendo a versão para vidraçaria.',
    industria: 'Você está vendo a versão para fábrica de vidro.',
    trocar: 'Trocar',
  },
}
