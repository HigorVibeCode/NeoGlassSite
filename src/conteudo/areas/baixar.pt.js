/**
 * A página de instalar o NeoGlass.
 *
 * O que se instala é o SISTEMA (app.neoglass.online), não o site institucional
 * — ver Baixar.jsx. Por isso não há botão de "instalar num toque" aqui: a
 * página abre o app e ensina a deixá-lo como ícone, no caminho de verdade de
 * cada aparelho. Instalar não cria nada novo: é o mesmo NeoGlass na tela.
 */
export default {
  rotulo: 'INSTALAR',
  titulo: { antes: 'Leve o NeoGlass', destaque: 'para a sua tela.' },
  subtitulo:
    'O NeoGlass roda no navegador — e você pode deixá-lo como um app, com ícone na tela, tela cheia e carregando mais rápido. Abra o sistema e siga o passo a passo do seu aparelho.',

  // O botão que abre o app (onde a instalação de fato acontece).
  abrirInstalar: 'Abrir o NeoGlass',
  abrirNota: 'Abre app.neoglass.online numa nova aba — é onde o sistema mora.',

  // Já instalado (rodando em tela cheia).
  abrir: 'Abrir o NeoGlass',
  jaInstalado: 'Já está instalado neste aparelho.',

  // O passo a passo de deixar como app, por aparelho.
  comoTitulo: 'Depois de abrir, deixe como app:',
  passos: {
    ios: [
      'Toque em Compartilhar, na barra do Safari.',
      'Escolha “Adicionar à Tela de Início”.',
      'Confirme em “Adicionar” — o ícone aparece na sua tela.',
    ],
    android: [
      'No Chrome, toque no menu ⋮ (canto superior direito).',
      'Escolha “Instalar app” ou “Adicionar à tela inicial”.',
      'Confirme — o ícone aparece na sua tela.',
    ],
    desktop: [
      'No Chrome ou Edge, toque no ícone de instalar na barra de endereço.',
      'Ou abra o menu ⋮ e escolha “Instalar NeoGlass”.',
      'Confirme — o app abre em janela própria.',
    ],
  },
  iosNota:
    'Só funciona pelo Safari. Se você abriu por outro navegador ou por dentro de um app, toque nos três pontos e escolha “Abrir no Safari”.',

  motivos: [
    { nome: 'Abre como app', texto: 'Um ícone na tela, em tela cheia, sem a barra do navegador no caminho.' },
    { nome: 'Sempre atualizado', texto: 'Nada para baixar de novo. A versão mais nova entra sozinha.' },
    { nome: 'Carrega rápido', texto: 'Guarda o essencial no aparelho e abre mesmo com a internet ruim da obra.' },
  ],

  mesmaConta:
    'É a mesma conta. Instalar não cria nada novo — é o mesmo NeoGlass, com o mesmo login, num ícone na sua tela.',
}
