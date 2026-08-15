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
  escolha: 'Qual é o seu negócio?',
  duvida: 'Ainda tenho dúvidas',
  fluxo: {
    rotulo: 'O pedido em um só fluxo',
    titulo: 'Um pedido. Uma informação. Toda a operação.',
    texto: 'O mesmo pedido acompanha a empresa do orçamento à produção, da produção à entrega.',
  },
  problema: {
    rotulo: 'O problema',
    titulo: 'Seu problema não é falta de planilha. É informação espalhada.',
    itens: ['WhatsApp', 'Excel', 'PDF', 'caderno', 'telefone', 'mensagens', 'ordens impressas'],
    depoisTitulo: 'NeoGlass',
    depois: ['Um pedido', 'Uma informação', 'Um fluxo'],
  },
  diferencial: {
    rotulo: 'O diferencial',
    titulo: 'Feito para quem trabalha com vidro. Não adaptado para isso.',
    texto:
      'A NeoGlass foi construída em torno da operação do vidro: medidas, projetos, corte, retalhos, produção, entrega e margem.',
  },
  prova: {
    rotulo: 'Por que confiar',
    titulo: 'Construído na operação. Em produção. Na Suíça.',
    itens: [
      ['Desenvolvido na Suíça', 'Onde prazo e esquadro não são negociáveis.'],
      ['Nasceu na operação de vidro', 'Nenhuma tela veio de reunião de agência.'],
      ['Em produção', 'Fábricas cortam e entregam com ele hoje.'],
    ],
  },
  chamada: {
    titulo: 'Veja o que a NeoGlass muda na sua operação.',
    vidracaria: 'Tenho uma vidraçaria →',
    industria: 'Tenho uma fábrica →',
  },
  lembrete: {
    vidracaria: 'Você está vendo a versão para vidraçaria.',
    industria: 'Você está vendo a versão para fábrica de vidro.',
    trocar: 'Trocar',
  },
}
