# NeoGlass — plano de conversão e SEO

Revisão de 14 de setembro de 2026. O objetivo é fazer cada rota cumprir uma função clara, sem descaracterizar a página de Vidraçaria, que passa a ser a referência de linguagem e acabamento.

## Atualização da Indústria e Partner — 14/09/2026

A Indústria agora abre com Intelligence, substituindo a demonstração de
orçamento. Duas animações mostram consultas a produção/vendas/expedição e o
caminho protegido dos resultados do banco. Dados são fictícios; as consultas
existem no catálogo, mas um resumo financeiro global automático não foi
confirmado. A pergunta/contexto podem ir ao Gemini; resultados retornam direto
à tela. Não se promete sandbox nem ausência absoluta de transmissão externa.

A página Partner apresenta público-alvo, papéis na venda, fluxo da indicação,
condições brasileiras de comissão, sem pagamento por apresentação. A sequência
é indicar/compartilhar → contratar → receber. Há link no rodapé de todas
as páginas. A publicação do site e a confirmação individual dos contratos
continuam como passos separados.

## Função de cada página

- `/`: identificar o visitante e encaminhá-lo. A mensagem externa é “software para quem trabalha com vidro”.
- `/vidracaria`: converter diretamente para teste. Mantém a estrutura atual.
- `/industria`: provar valor com um problema industrial concreto e converter para uma demonstração de 20 minutos.
- `/plataforma`: criar confiança na empresa e no produto, depois encaminhar para Vidraçaria, Indústria ou demonstração.

## Corrigido no código local, ainda não publicado

- Títulos, descrições e cartões de compartilhamento próprios para Home, Vidraçaria, Indústria e Plataforma.
- Nova imagem neutra para a Home e imagem exclusiva para Indústria.
- “Vidro que você não compra é lucro” removido da prévia da Home.
- Promessa de demonstração padronizada em 20 minutos nos quatro idiomas.
- Dados estruturados agora usam a URL, o idioma e a descrição da página correta.
- A agenda tem uma saída direta para WhatsApp quando o visitante não encontra horário.
- A página de Vidraçaria não teve sua estrutura visual alterada.
- A Home passou a explicar em uma linha que o NeoGlass é software para orçamento, projeto, corte e produção.
- A Indústria apresenta Intelligence com duas animações: consultas da empresa e proteção do acesso aos dados.
- A Plataforma mantém o hero de orgulho, mas já define o produto, oferece os dois caminhos comerciais e mostra as áreas do sistema antes da história da marca.
- O manifesto da Plataforma foi reduzido de dez para quatro provas de confiança; as frases deixaram de desbotar durante a rolagem.
- O botão fixo de Indústria e Plataforma diz “Agendar demonstração de 20 min” e leva à chamada interna, em vez de chamar um agendamento de “Ver demo”.

## Revisão de copy, hierarquia, UI e conversão

Conferi o site publicado no computador (1280 × 720) e no celular (390 × 844), percorri as seções, acionei a demonstração da Indústria e segui os destinos até cadastro e agenda. Também comparei o conteúdo publicado com o código local. Não concluí um cadastro de produção nem uma reserva de teste nesta rodada. A página de Vidraçaria é a referência visual: preservá-la e corrigir o que atrapalha a venda nas outras rotas.

| Rota | O que funciona | Problema de conversão observado | Decisão |
|---|---|---|---|
| `/` | Escolha entre dois públicos clara, cartões grandes e legíveis no celular. | O título promete “mais dinheiro e segurança” sem dizer que se trata de software; quem veio por um link genérico precisa inferir o produto pelos cartões. | Manter a bifurcação e acrescentar uma linha curta sob o título: “Software para orçamentos, projetos e produção no setor do vidro.” |
| `/vidracaria` | Hero, demonstração interativa, preço e teste formam um percurso coerente. O botão “Ver como funciona” leva à prova; o preço leva a `/comecar`. | O formulário final exige nome, empresa, e-mail, país, senha e confirmação; no celular, a ação fica depois de uma rolagem longa. Não há dado de abandono para justificar redesenhar a página de venda agora. | Manter a copy e estrutura da página. Medir a passagem prova → preço → cadastro antes de mexer nela; simplificar o formulário apenas se o abandono aparecer ali. |
| `/industria` | A perda de retalhos é um problema concreto e a otimização executa no navegador. | A página repete a mesma ideia em hero, reconhecimento, demonstração e resultado. O visitante pode concluir que NeoGlass é apenas otimizador, apesar de o produto também atender pedido, produção e expedição. O botão fixo “Ver demo” abre agendamento, embora o mesmo termo no hero signifique ver a demonstração. | Preservar o gancho e a prova; depois deles, mostrar um pedido atravessando as áreas do produto. Renomear o CTA fixo para “Agendar 20 min” e levá-lo à mesma agenda da página. |
| `/plataforma` | O vídeo de fábrica e a frase “Temos orgulho do que construímos” dão personalidade real à marca. | O hero não explica o que o sistema faz nem tem CTA. Dez blocos e cerca de 6 mil pixels de rolagem no computador falam de intenção, IA, dados e futuro, mas quase não mostram uma tela ou saída do produto. No celular o texto perde contraste com opacidade de 0,34 fora do centro; em rolagem rápida há trechos quase vazios. | Manter a frase e o vídeo. Acrescentar uma definição e dois caminhos logo no primeiro quadro; antecipar a prova de um pedido dentro do sistema; reduzir repetições e deixar texto sempre legível. |
| `/comecar` | Benefício e “14 dias grátis, sem cartão” estão claros. O botão cria a conta diretamente. | Há sete campos visíveis antes do botão, mais código de indicação opcional. No celular o CTA fica abaixo da primeira tela. A frase “Leva menos de 1 minuto” deve ser validada com usuários. | Não introduzir outro passo. Ocultar ou deslocar opcionais se a medição mostrar abandono; verificar criação de conta e primeiro orçamento com uma conta de teste. |

`/primeiro-orcamento` existe no código, mas a URL pública mostrou a Home nesta revisão. Não enviar anúncios para esse endereço antes de verificar o deploy e a rota. `/app` é uma página de instalação para quem já decidiu; não deve substituir uma landing de aquisição.

### Hierarquia e textos propostos

**Home:** título atual, seguido da definição curta do produto; depois a pergunta e as duas portas. Não inserir um carrossel ou lista de funcionalidades antes da escolha. O cartão “Indústria” deve dizer pedido, corte e produção, que representam melhor a solução inteira.

**Indústria:** 1) “Antes de cortar chapa nova...” + linha “Do pedido ao corte e à entrega, tudo no mesmo sistema”; 2) demonstração dos retalhos; 3) trilha visual de um único pedido: orçamento/pedido → plano de corte → produção/beneficiamento → expedição → margem; 4) prova com telas reais e uma saída gerada pelo app; 5) convite “Traga um pedido seu. Veja o plano de corte em uma conversa de 20 minutos.” A proposta não deve prometer economia universal a partir do exemplo simulado de 20 peças. Os números 87,4% e 3,42 m² precisam estar visivelmente ligados à simulação, não parecer resultados médios de clientes.

**Plataforma:** manter “Temos orgulho do que construímos.” Logo abaixo: “NeoGlass reúne orçamento, projeto, corte, produção e entrega em um só sistema para quem trabalha com vidro.” Ações no primeiro quadro: “Tenho uma vidraçaria” e “Tenho uma indústria”. Em seguida, mostrar o mesmo pedido em quatro momentos com capturas reais e rótulos curtos. Manter origem na fábrica, IA aplicada e continuidade como três provas de confiança, em vez de dez capítulos de manifesto. O convite de 20 minutos fica no final e também acessível pelo topo com nome de ação inequívoco.

**Cadastro:** preservar a promessa de teste sem cartão. Antes de remover confirmação de senha ou mudar campos obrigatórios, medir conclusão e erros; ocultar telefone e código de indicação opcionais é a primeira redução de ruído possível. A moeda e o país escolhidos precisam continuar claros antes da criação da conta.

### Direção visual e movimento

Usar a mesma tipografia, escala, largura, cartões e linguagem de interface da Vidraçaria. A Indústria pode manter o azul como sinal de público, mas o caminho visual deve ser do pedido real para a saída real do software; telas e documentos valem mais que mais uma animação abstrata. Na Plataforma, o vídeo de fábrica é o momento marcante. As transições seguintes devem apenas acompanhar a leitura. Remover o desbotamento das frases e garantir que todo conteúdo apareça em rolagem rápida e com movimento reduzido. Não acrescentar efeitos sem uma função no percurso de venda.

## Implementação concluída nesta rodada — prioridade 1

### Indústria

O hero e a demonstração de retalhos foram preservados. Logo depois da demonstração, a página agora explica o percurso por pedido, corte, produção e expedição com prévias do produto. A próxima evolução só deve acrescentar margem e provas reais quando houver material verificável.

O objetivo é manter o gancho financeiro dos retalhos e deixar claro que o NeoGlass atende a fábrica inteira. Hoje a página pode ser entendida como um otimizador isolado.

### Plataforma

O hero “Temos orgulho do que construímos” foi preservado, com definição clara do produto e os dois caminhos para Vidraçaria e Indústria. O visitante que já sabe seu perfil não precisa percorrer o manifesto para chegar à página de venda.

Os trechos abstratos foram reduzidos, e a prova com as áreas do sistema foi antecipada. No celular, a perda de opacidade e o deslocamento das frases foram removidos; as seções remanescentes ficam sempre pintadas.

## Antes de mandar mais tráfego — prioridade 0

- Publicar as correções locais de metadados e da promessa de 20 minutos. O site ao vivo ainda exibiu “Quarenta minutos” em `/plataforma` em 14/09, enquanto o widget Calendly mostra 20 min.
- Corrigir a disponibilidade do evento público no Calendly. Após o widget concluir o carregamento, os dias de setembro mostrados na página ficaram desativados com “Não há horários disponíveis”. O estado intermediário mostrou dias clicáveis; a verificação válida é o estado final.
- Confirmar que nenhuma campanha leva a `/primeiro-orcamento` enquanto a URL pública cair na Home. Conferir todos os destinos dos anúncios e UTMs.
- Verificar a medição de cadastro e agendamento até o Google Ads. O código do site contém eventos para o Pixel da Meta, mas não contém uma tag de conversão do Google; sem uma medição confirmada no destino, o Ads pode otimizar por clique em vez de novo cliente.

## Próxima implementação — prioridade 2

- Separar o JavaScript por página. O pacote atual tem cerca de 610 kB, 200 kB comprimidos, e carrega código de páginas que o visitante não abriu.
- Comprimir o vídeo de 4,2 MB da Plataforma e manter o poster como primeira pintura.
- Pré-renderizar o conteúdo principal das páginas se o Google continuar sem indexá-las depois da submissão no Search Console.
- Medir `demo_iniciada`, `demo_concluida`, `cta_agenda`, `agendamento_confirmado` e `cadastro` por página e campanha.

## SEO operacional

O site já gera canônicas, `hreflang`, sitemap e metadados por rota. A busca pública `site:neoglass.online` não retornou páginas durante esta revisão, mas o Search Console confirmou que `/vidracaria` está no Google e indexada. O sitemap foi processado, teve última leitura em 13 de setembro e encontrou 24 páginas; o relatório geral ainda estava processando dados. Depois da publicação desta rodada, inspecionar `/`, `/vidracaria`, `/industria` e `/plataforma` e solicitar nova indexação.

Não criar dezenas de páginas ou repetir palavras-chave. Primeiro indexar estas quatro páginas, medir impressões e consultas reais e só então ampliar o conteúdo.

## Critério de conclusão

- Cada link gera no WhatsApp um título, uma descrição e uma imagem específicos.
- Em até cinco segundos, o visitante entende para quem é a página, o resultado prometido e a próxima ação.
- A Plataforma mantém conteúdo visível durante rolagem rápida no celular.
- Vidraçaria leva ao teste; Indústria e Plataforma levam à agenda de 20 minutos.
- As quatro páginas aparecem como indexadas no Search Console e começam a registrar impressões.

## Bloqueios de conversão observados ao vivo

O evento público “NeoGlass Product Demo” mostra duração de 20 minutos, apesar do endereço `/30min`. Em 14 de setembro, os dias de setembro apareceram desativados após o carregamento final do calendário. A página local já oferece WhatsApp como saída, mas essa alteração ainda não estava publicada. Corrigir a disponibilidade e selecionar um horário em um teste sem concluir a reserva.

A Plataforma publicada ainda promete 40 minutos. O código local já diz 20; essa diferença só desaparece depois da publicação. A URL pública `/primeiro-orcamento` mostrou a Home, apesar de a rota existir no código local.
