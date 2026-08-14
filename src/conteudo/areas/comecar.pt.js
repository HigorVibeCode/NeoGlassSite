/**
 * A página de cadastro. É a última tela antes do produto, e a única do site
 * onde o visitante digita alguma coisa — então cada palavra aqui trabalha
 * contra o abandono, não a favor da beleza.
 *
 * Três decisões de texto que valem explicação:
 *   · nenhum campo pede "cargo", "quantos funcionários" ou "faturamento". Cada
 *     pergunta a mais é gente que desiste no meio, e nada disso é necessário
 *     para criar a conta;
 *   · o preço aparece DEPOIS do formulário, não antes. Quem chegou até aqui já
 *     decidiu experimentar; repetir o preço na frente do botão só reabre a
 *     conversa que a página anterior já ganhou;
 *   · "sem cartão" é dito duas vezes, porque é a objeção que mata este passo.
 */
export default {
  rotulo: 'CRIAR CONTA',
  etiqueta: (dias) => `${dias} dias · sem cartão`,
  titulo: { antes: 'Comece pelo próximo', destaque: 'orçamento que entrar.' },
  texto:
    'Você preenche quatro campos e recebe o convite por e-mail. Não pedimos cartão para experimentar — nem agora, nem no meio do caminho.',
  passos: [
    'Preencha os quatro campos aqui do lado',
    'O convite chega no seu e-mail em instantes',
    'Você entra e monta o primeiro orçamento',
  ],

  formulario: {
    titulo: 'Criar minha conta',
    campos: {
      nome: { rotulo: 'Seu nome', exemplo: 'Higor' },
      empresa: { rotulo: 'Nome da vidraçaria', exemplo: 'Flash Vidros' },
      email: { rotulo: 'E-mail', exemplo: 'voce@suavidracaria.com.br', dica: 'É para lá que vai o convite.' },
      whatsapp: { rotulo: 'WhatsApp', exemplo: '(27) 99999-9999', opcional: 'opcional' },
    },
    enviar: (dias) => `Começar grátis · ${dias} dias`,
    enviando: 'Criando sua conta…',
    saida: 'Me chamar no WhatsApp',
    aviso: 'Sem cartão de crédito. Sem taxa de implantação. Sem instalação.',
    erros: {
      nome: 'Falta o seu nome.',
      empresa: 'Falta o nome da vidraçaria.',
      email: 'Confira o e-mail — parece que falta alguma coisa.',
      rede: 'A conexão falhou no meio do caminho. Tente de novo.',
      geral: 'Não foi possível concluir agora. Fale com a gente pelo WhatsApp que resolvemos na hora.',
    },
  },

  pronto: {
    rotulo: 'PRONTO',
    titulo: 'Confira seu e-mail.',
    texto: (email) =>
      `O convite foi para ${email}. É só clicar nele para criar sua senha e entrar — a conta já está de pé, com o sistema inteiro liberado.`,
    dica: 'Não chegou em dois minutos? Olhe na caixa de spam. Se não estiver lá, me chama no WhatsApp que eu libero na mão.',
    whatsapp: 'Falar no WhatsApp',
  },

  depois: {
    titulo: (dias) => `E depois dos ${dias} dias?`,
    texto: (preco) =>
      `Você recebe um aviso por e-mail antes de acabar, com o link para colocar a forma de pagamento. Se não colocar, a conta simplesmente pausa — nada é cobrado, nada vira dívida. Se colocar, são ${preco} por mês pela empresa inteira, com quantos usuários você quiser.`,
  },
}
