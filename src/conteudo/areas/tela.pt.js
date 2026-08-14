/**
 * As palavras que aparecem DENTRO da janela do produto, na abertura de cada
 * página. Nomes de cliente são genéricos de propósito: cliente real não vira
 * vitrine sem autorização, e um nome inventado que pareça real é pior ainda.
 */
export default {
  endereco: 'app.neoglass.online',
  ferramentas: 'Ferramentas',
  usuario: 'Seu nome',
  papel: 'NeoGlass · Usuário',

  pedidos: {
    modulo: 'Pedidos',
    itens: ['Painel', 'Orçamentos', 'Pedidos', 'Reposição'],
    migalha: 'NeoGlass Pedidos › Painel',
    titulo: 'Pedidos',
    subtitulo: 'Todos os pedidos · prazos e fases',
    busca: 'Buscar por cliente, número do pedido…',
    filtro: 'Em andamento',
    fase: { ok: 'Autorizado', espera: 'Não autorizado' },
    linhas: [
      { n: '2600073', cliente: 'Vidraçaria Central', vidro: 'Incolor 6 mm temperado · 6 peças', fase: 'ok', prazo: 'em 9d', selo: 'no prazo', tom: 'ok' },
      { n: '2600072', cliente: 'Obra Jardim Norte', vidro: 'Incolor 6 mm temperado · 4 peças', fase: 'ok', prazo: 'em 1d', selo: 'urgente', tom: 'ok' },
      { n: '2600071', cliente: 'Construtora Aurora', vidro: 'Fumê 8 mm temperado · 1 peça', fase: 'ok', prazo: '8d atrasado', selo: 'vencido', tom: 'atraso' },
      { n: '2600068', cliente: 'Vidros do Vale', vidro: 'Incolor 4 mm comum · 1 peça', fase: 'espera', prazo: 'sem prazo', selo: 'aguarda aprovação', tom: 'espera' },
    ],
  },

  producao: {
    modulo: 'Produção',
    itens: ['Painel', 'Fluxo', 'Expedição', 'Máquinas'],
    migalha: 'NeoGlass Produção › Fluxo',
    titulo: 'Fluxo de produção',
    subtitulo: 'A fila de cada máquina, em horas',
    unidade: 'h de fila',
    gargalo: 'Limite da produção',
    folga: 'Com folga',
    maquinas: [
      { nome: 'Mesa de corte', fila: '6.4' },
      { nome: 'Lapidadora', fila: '2.1' },
      { nome: 'Lavadora', fila: '0.8' },
      { nome: 'Têmpera', fila: '3.2' },
    ],
    agora: { titulo: 'O que fazer agora', rotulo: 'Gargalo de hoje', maquina: 'Mesa de corte' },
    margem: { titulo: 'Margem de prazo', faixas: ['No ritmo', 'Atenção', 'Estourada'] },
  },

  design: {
    modulo: 'Design',
    itens: ['Projetos', 'Biblioteca', 'Imagem 2D', 'Ferragens'],
    titulo: 'Testar abertura',
    sub: 'Box de canto · correr',
    dica: 'Arraste para girar a câmera',
    ferragens: 'Ferragens',
    cancelar: 'Cancelar',
    abrir: 'Abrir',
  },

  corte: {
    modulo: 'Otimização',
    itens: ['Painel', 'Otimização', 'Retalhos', 'Máquinas'],
    migalha: 'NeoGlass Produção › Otimização',
    titulo: 'Plano de corte',
    subtitulo: 'Uma chapa, o pedido inteiro encaixado',
    chapa: 'Chapa',
    aproveitamento: 'de aproveitamento',
    legenda: ['Porta de box', 'Fixo lateral', 'Prateleira', 'Espelho'],
  },
}
