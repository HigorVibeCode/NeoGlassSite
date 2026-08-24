/**
 * A página de cadastro. É a última tela antes do produto, e a única do site
 * onde o visitante digita alguma coisa — então cada palavra aqui trabalha
 * contra o abandono, não a favor da beleza.
 *
 * O que esta tela diz, na ordem: o que ela é, quanto custa (nada), quatro
 * campos, e um botão. Nada mais.
 *
 * O que saiu, e por quê:
 *   · a pílula "14 dias · sem cartão" no topo — a mesma informação já está,
 *     em frase inteira, logo abaixo do título;
 *   · o parágrafo "você preenche quatro campos e recebe o convite" — os quatro
 *     campos estão à vista; descrever o que a pessoa está vendo é ruído;
 *   · a lista de três etapas — ela transformava "preencher um formulário" num
 *     processo de três passos. Faz o começo parecer maior do que é;
 *   · o bloco "E depois dos 14 dias?" — explicar cobrança no exato momento em
 *     que a pessoa vai clicar reabre a decisão que ela já tinha tomado. Isso é
 *     assunto do e-mail de aviso, e ele existe.
 *
 * Continuam de pé, e não se mexe neles: os nomes dos campos, as mensagens de
 * erro, a saída por e-mail quando a função falha, e a tela de "pronto".
 */
export default {
  rotulo: 'CRIAR CONTA',
  subtitulo: (dias) => `${dias} dias grátis. Sem cartão de crédito.`,
  titulo: { antes: 'Crie sua conta e', destaque: 'comece a usar.' },

  formulario: {
    titulo: 'Criar minha conta',
    campos: {
      nome: { rotulo: 'Seu nome', exemplo: 'Higor' },
      empresa: { rotulo: 'Nome da vidraçaria', exemplo: 'Flash Vidros' },
      email: { rotulo: 'E-mail', exemplo: 'voce@suavidracaria.com.br' },
      telefone: { rotulo: 'Telefone', exemplo: '(27) 99999-9999', opcional: 'opcional' },
      senha: { rotulo: 'Senha', exemplo: 'mínimo 8 caracteres', mostrar: 'mostrar', ocultar: 'ocultar' },
      senha2: { rotulo: 'Confirmar senha', exemplo: 'repita a senha' },
    },
    enviar: () => 'Criar minha conta grátis',
    rapido: 'Leva menos de 1 minuto.',
    enviando: 'Criando sua conta…',
    entrando: 'Entrando…',
    saida: 'Mandar meus dados por e-mail',
    aviso: 'Sem cartão de crédito. Sem taxa de implantação. Sem instalação.',
    erros: {
      nome: 'Falta o seu nome.',
      empresa: 'Falta o nome da vidraçaria.',
      email: 'Confira o e-mail — parece que falta alguma coisa.',
      senha: 'A senha precisa de pelo menos 8 caracteres.',
      senha2: 'As duas senhas não são iguais.',
      rede: 'A conexão falhou no meio do caminho. Tente de novo.',
      geral: 'Não foi possível concluir agora. Mande seus dados por e-mail que a gente cria a conta na mão.',
    },
  },

  pronto: {
    rotulo: 'PRONTO',
    titulo: 'Sua conta está de pé.',
    texto: 'Entre em app.neoglass.online com o seu e-mail e a senha que você acabou de criar — o sistema inteiro já está liberado.',
    entrar: 'Entrar no sistema',
  },
}
