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
      'A otimização procura no seu cavalete antes de abrir chapa nova. É margem que entra sem você vender nada a mais.',
    // Números e unidades não se traduzem; só a vírgula decimal vira ponto em
    // inglês, que é como o leitor de lá lê 3,42 sem tropeçar.
    // ("6 etapas, da obra à margem" saiu daqui: seis etapas não é bom nem
    // ruim, é uma contagem sem nada em jogo.)
    /* A terceira marca era "0 licença por posto". Saiu em 13/08 pelo mesmo
       motivo que as outras promessas sobre cobrança: a regra de usuários do
       sistema não está definida, e prometer o que a fatura não cumpre é a
       forma mais cara de perder a confiança que a página constrói. */
    marcas: [
      ['87,4%', 'de aproveitamento no plano'],
      ['3,42 m²', 'de vidro que não foi comprado'],
      ['0', 'planilha para manter'],
    ],
  },

  // ── A demonstração do retalho (FL. 02/06) ─────────────────────────────
  demo: {
    rotulo: 'Demonstração · o cavalete antes da chapa',
    titulo: 'Antes de abrir vidro novo, olhe o que já está encostado.',
    texto:
      'Três cliques, um pedido real de 20 peças. Você aperta otimizar, o plano nasce — e é aí que o sistema avisa que achou retalho no cavalete que serve. Aperte o segundo botão e veja a conta. Tudo roda aqui no seu navegador, com um otimizador de verdade.',
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
        'O sistema acusa o fora de esquadro antes de cortar',
      ],
      ['O plano é redesenhado no CAD, com a mesa parada', 'Sai em DXF, G-code, ASC ou CNI+FBT'],
    ],
  },

  // ── A chamada final (FL. 06/06) ───────────────────────────────────────
  chamada: {
    rotulo: 'Agendar a apresentação',
    titulo: 'Traga um pedido seu. A gente monta na sua frente.',
    texto:
      'A apresentação é com o sistema aberto, não com slide. Se no fim não fizer sentido para a sua operação, você perdeu quarenta minutos e ganhou um diagnóstico.',
    passos: [
      'Você mostra um pedido seu, real',
      'A gente monta ele no sistema, ao vivo',
      'Você vê o plano de corte sair no fim',
    ],
  },
}
