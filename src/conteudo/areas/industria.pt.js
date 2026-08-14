/**
 * Os textos da aba Indústria em português — a fonte das outras três versões.
 *
 * A árvore segue a ordem em que o visitante lê a página (abertura, demo,
 * contraste, chamada) e não a ordem alfabética: quem for mexer numa frase
 * daqui a seis meses vai procurar por onde ela aparece na tela.
 *
 * O título da abertura vem quebrado em `antes` e `destaque` porque no JSX ele
 * é uma frase só com um pedaço em gradiente (`<span className="marca">`).
 * Guardar o JSX aqui prenderia o gradiente ao mesmo lugar em todos os idiomas
 * — e o pedaço que merece o destaque não cai na mesma palavra em alemão.
 */
export default {
  // ── A abertura (FL. 01/06) ────────────────────────────────────────────
  hero: {
    rotulo: 'NeoGlass · indústria do vidro plano',
    etiqueta: 'Uma tela do sistema, ao vivo',
    // Desperdício é o assunto, e é o único grande que o sistema sustenta de
    // ponta a ponta: estoque de retalho, otimização em três níveis e a
    // demonstração logo abaixo, que prova o número na tela. "Lucro
    // instantâneo" vira isto: margem que não exige vender mais nada. É a
    // mesma promessa, sem a palavra que ninguém acredita.
    // (Passaram por aqui, e caíram: "A chapa entra inteira, nada dela se
    // perde" — prometia o impossível; e duas versões sobre checagem de
    // pedido — descreviam uma ferramenta que não existe no sistema. Esta
    // história fica aqui, junto da copy, para não voltar por engano numa
    // tradução.)
    titulo: {
      antes: 'Vidro que você não compra',
      destaque: 'é lucro.',
    },
    // Duas frases e ponto. O anterior tinha quatro linhas no desktop e oito
    // no celular — ninguém lê oito linhas antes de decidir se fica. O número
    // saiu daqui porque ele já está três vezes na mesma tela: na régua de
    // marcas, no cartão e na demonstração.
    texto:
      /* "margem que entra sem vender nada a mais" dizia a verdade pelo lado
       fraco — pela ausência de uma venda. Fábrica de vidro não cresce vendendo
       mais: cresce parando de jogar fora, porque o insumo é caro, o refugo é
       irrecuperável e o metro quadrado perdido já foi pago. Dito assim, é a
       lógica que o dono já usa para tomar decisão. */
      'A otimização procura no seu cavalete antes de abrir chapa nova. Fábrica de vidro não lucra vendendo mais — lucra desperdiçando menos.',
    // Números e unidades não se traduzem; só a vírgula decimal vira ponto em
    // inglês, que é como o leitor de lá lê 3,42 sem tropeçar.
    // ("6 etapas, da obra à margem" saiu daqui: seis etapas não é bom nem
    // ruim, é uma contagem sem nada em jogo.)
    /* A terceira marca era "0 licença por posto". Saiu em 13/08 pelo mesmo
       motivo que as outras promessas sobre cobrança: a regra de usuários do
       sistema não está definida, e prometer o que a fatura não cumpre é a
       forma mais cara de perder a confiança que a página constrói. */
    marcas: [
      ['87,4%', 'de aproveitamento no plano de corte'],
      /* A segunda marca dizia "de vidro que não foi comprado" — descrevia uma
         compra que deixou de acontecer, que é uma ideia de duas etapas. Numa
         fábrica, matéria-prima economizada é a linha do orçamento dele: chega
         inteira, sem o leitor precisar montar a conta. */
      ['3,42 m²', 'de matéria-prima economizada'],
      ['0', 'planilha para manter'],
    ],
  },

  // ── A demonstração do retalho (FL. 02/06) ─────────────────────────────
  demo: {
    rotulo: 'Demonstração · o cavalete antes da chapa',
    /* O título dizia "Antes de abrir vidro novo, olhe o que já está encostado"
       — que é a mesma frase do hero, duas telas acima, com outras palavras. E o
       texto tinha quatro frases explicando um botão. Agora o título é o
       resultado (o que ele vai VER acontecer) e o texto cabe em duas linhas: o
       resto ele descobre apertando, que é o ponto de existir uma demonstração. */
    titulo: 'Três chapas viram duas. Na sua frente.',
    texto:
      'Um pedido real de 20 peças, com o otimizador de verdade rodando aqui no seu navegador. Aperte e veja onde a matéria-prima deixa de ser comprada.',
  },

  // ── O contraste em duas colunas (FL. 04/06) ───────────────────────────
  contraste: {
    rotulo: 'O que muda no chão de fábrica',
    titulo: 'A diferença aparece na segunda-feira.',
    hoje: 'Hoje, sem sistema de vidro',
    // Cada par é [antes, depois] e a ordem é de leitura: a linha da esquerda
    // é o prejuízo que o leitor reconhece, a da direita é a resposta.
    pares: [
      [
        'A sobra boa encosta no cavalete e some do controle',
        'Volta ao estoque com medida, cor e cavalete',
      ],
      ['“Onde está meu pedido?” — alguém desce até a fábrica', 'Fase, hora e responsável na tela'],
      ['O preço sai da experiência do vendedor', 'O preço sai da tabela; a margem fecha por pedido'],
      [
        'A medida errada aparece com o vidro já temperado',
        'Sai em DXF, CNI e FBT — ou direto para o Opty-Way e o Perfect Cut',
      ],
      ['O plano é redesenhado no CAD, com a mesa parada esperando', 'O plano nasce pronto e vai direto para a mesa'],
    ],
  },

  // ── A chamada final (FL. 06/06) ───────────────────────────────────────
  chamada: {
    rotulo: 'Agendar a apresentação',
    /* "A gente monta na sua frente" soava a mágica de vendedor. A promessa
       forte não é montar rápido: é ele sair com o plano de corte do PEDIDO
       DELE na mão, tendo gastado quarenta minutos. */
    titulo: 'Traga um pedido seu. Você sai com o plano de corte dele.',
    texto:
      'A apresentação é com o sistema aberto, não com slide. Se no fim não fizer sentido para a sua operação, você perdeu quarenta minutos e ganhou um diagnóstico.',
    passos: [
      'Você mostra um pedido seu, real',
      'A gente monta ele no sistema, ao vivo',
      'Você vê o plano de corte sair no fim',
    ],
  },
}
