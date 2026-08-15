# NeoGlass Website — Blueprint V3

**Documento de passagem.** Substitui o V2. Contém: o que já está no código, o que falta,
as decisões que não devem ser rediscutidas, e o que foi tentado e falhou — para ninguém
repetir os mesmos erros.

Data do corte: agosto de 2026. Estado do repositório: build passando, 20 páginas geradas,
sem erro de JS, sincronizado em `~/Documents/Neo Glass - Website`.

---

## 0. Como ler este documento

- **§ com ✅** — já implementado. Não refazer.
- **§ com ⬜** — pendente. É este o trabalho.
- **§ com ⛔** — foi removido de propósito por decisão do dono. Não reintroduzir.
- **§ com 🔒** — decisão travada, já testada em tela. Não rediscutir.

Onde o V2 conflita com uma decisão travada, **a decisão travada vence**. Elas foram tomadas
com o site aberto na mão, o V2 foi escrito antes dessas telas existirem.

---

## 1. Objetivo do projeto

Inalterado em relação ao V2. O site deve responder rápido a sete perguntas:

1. Quem é a NeoGlass?
2. Isso é para mim?
3. O que exatamente o software faz?
4. Qual problema resolve?
5. Devo clicar aqui?
6. Sou vidraceiro ou indústria?
7. Por que deveria usar/comprar?

Funil de compreensão e conversão, não vitrine. A estética atual é vantagem competitiva:
**não redesenhar genericamente, não virar SaaS visualmente genérico.**

## 2. Posicionamento central 🔒

**A operação do vidro em um só fluxo.**

O diferencial não são os sete módulos. É: **um pedido entra uma vez e acompanha toda a
operação.**

- Vidraçaria: obra → orçamento → projeto → pedido → produção/compra → entrega → margem
- Indústria: pedido → otimização → corte → produção → expedição → financeiro

Já está expresso no `Fluxo.jsx` (Plataforma) e nas subheadlines das quatro aberturas.

## 3. Regras globais de UX 🔒

Toda seção deve cumprir ao menos uma função: identificar, explicar, demonstrar, provar,
reduzir objeção, gerar desejo, gerar ação. Nunca "mostrar uma funcionalidade".

Entre explicar a funcionalidade e mostrar a consequência econômica, **sempre a consequência**.

### 3.1 O padrão de frase que o dono elegeu 🔒

Duas frases foram escolhidas por ele entre dezenas, e definem o registro de todo o site:

> Todo orçamento que você mandou fica salvo. Você abre e vê o que foi combinado, quando e por quanto.

> Antes de cortar chapa nova, o sistema procura nas sobras. Só vai para chapa nova o que não coube em sobra nenhuma.

**A fórmula:** primeira frase diz o que o sistema faz sozinho no momento que importa;
segunda fecha com a garantia — o que nunca mais dá errado. A segunda frase **não acrescenta
funcionalidade**, ela fecha o laço.

O que ele **rejeitou explicitamente**: frases de efeito, "nome do conceito: explicação",
descrição de interface ("você filtra a lista", "o sistema mostra a porcentagem"). O critério
dele, textual: *"como se estivesse explicando para um idiota, ele tem que ler e saber o que é"*.

---

## 4. HOME — hero e escolha ✅

Implementado:

- Eyebrow: *Software para quem trabalha com vidro*
- H1: **Vidro que você não compra é lucro.** 🔒 (não trocar)
- Subheadline: *Software para vidraçarias e fábricas de vidro. Orçamento, produção, corte, retalhos e pedidos conectados em um só sistema.*
- Hierarquia visual 🔒: **frase → duas portas → painel do produto.** Tudo centralizado.
- Card 1 — *Tenho uma vidraçaria* / "Eu meço o vão, faço o orçamento, compro o vidro e instalo." / CTA *Ver como funciona para minha vidraçaria* / ícone **trena medindo a chapa**
- Card 2 — *Tenho uma fábrica de vidro* / "Eu corto, beneficio, tempero e entrego para outras empresas." / CTA *Ver como funciona para minha fábrica* / ícone **chapas + engrenagem**
- Terceira saída: *Ainda tenho dúvidas* → Plataforma
- Cor por lado 🔒: **verde `#0e8c6a` = vidraçaria**, **azul `#0e7b9c` = indústria**. Vale no site inteiro.
- Memória de 30 dias em `localStorage` (`lib/lado.js`): quem já escolheu é desviado ao voltar
  em `/`, com tarja *"Você está vendo a versão para… · Trocar"* no rodapé da tela no celular.

## 5. HOME — sistema por dentro ✅ / ⬜ parcial

**Feito:** o leque de três telas do produto (`Telas.jsx` + `Tela.jsx`) — Pedidos, Otimização
(plano de corte), Design (box 3D) — trocando a cada 4 s, com os nomes dos módulos clicáveis
embaixo. Resolve o risco do V2 de a home parecer "sistema de projetos".

**Falta ⬜:** o V2 pede a visualização do fluxo do pedido também na home. O componente
**já existe** (`components/Fluxo.jsx`) e está na Plataforma. Colocá-lo na home é uma linha.

⚠️ **Contrapeso:** a home tem hoje **2,4 telas de celular** e o dono reclamou várias vezes de
páginas longas. Adicionar o fluxo a leva para ~4. Decidir com ele antes.

## 6. HOME — problema ⬜

Não feito. Seção curta:

> **Seu problema não é falta de planilha. É informação espalhada.**

Mostrar o hoje (WhatsApp, Excel, PDF, caderno, telefone, ordens impressas) e depois:
NeoGlass — um pedido, uma informação, um fluxo. **Curta.**

## 7. HOME — diferencial ⬜

Não feito.

> **Feito para quem trabalha com vidro. Não adaptado para isso.**
> A NeoGlass foi construída em torno da operação do vidro: medidas, projetos, corte,
> retalhos, produção, entrega e margem.

## 8. HOME — prova ⬜ **BLOQUEADO POR DADOS**

Prioridade máxima do V2 e **não pode ser feito sem o dono**.

O que ele autorizou até agora: existe uma empresa cliente em **Unterseen, Suíça**, a ser
citada **sem o nome**, em formato anônimo.

**O que ainda falta ele fornecer**, por cliente:
- tipo de operação (vidraçaria ou fábrica)
- porte aproximado
- **o que era antes** (quantas ferramentas separadas, o que se perdia)
- **o que é agora**

Sem isso não escrever nada. Regra dele: **nunca inventar números, logos ou depoimentos.**

## 9. HOME — CTA final ⬜

Não feito.

> **Veja o que a NeoGlass muda na sua operação.**
> [Tenho uma vidraçaria →] [Tenho uma fábrica →]

---

## 10–11. VIDRAÇARIA — hero ✅ (com desvio deliberado)

Implementado:

- H1: **Você mede. A NeoGlass organiza o resto.**
- Subheadline: *Da medida na obra ao orçamento, do pedido à entrega — sem perder informação no caminho.*

⛔ **O V2 pedia "Começar grátis por 14 dias" como CTA primário do hero. Foi rejeitado pelo
dono**, com a razão: *"se o cara já clicar, ele não viu valor ainda no aplicativo"*.

🔒 **Regra travada — valor antes da oferta:** o hero tem um botão **em contorno, sem o verde
da marca**, *Ver o orçamento nascer*, que rola até a animação. O **primeiro botão verde da
página** aparece só **depois** da animação do vão. Não reverter.

## 12. VIDRAÇARIA — primeiro benefício ✅

Bloco logo abaixo do hero, antes da demonstração:

> **Todo orçamento que você mandou fica salvo.**
> Você abre e vê o que foi combinado, quando e por quanto.

## 13. VIDRAÇARIA — demonstração do vão ✅ / ⬜ microcopy

**Feito** (`ferramentas/Orcamento.jsx`), cinco tempos, um play só:

1. o vão vazio na parede
2. a cota se desenha e o número sobe até 1600 × 1200
3. *"Que peça vai neste vão?"* — três cartões: Porta, Janela, Box (o sistema escolhe **Janela**)
4. *"De quantas folhas?"* — 2, 3, 4 (escolhe **2**)
5. o vidro se monta → orçamento peça a peça → **PDF com a logo**

Ao lado, a **ficha do serviço** se preenchendo sozinha: Vão → Peça → Folhas.

⚠️ **Coerência obrigatória:** `TIPO_ESCOLHIDO = 1` (Janela) e `FOLHAS_ESCOLHIDAS = 0` (2 folhas)
**não são escolha estética** — o vidro montado e o PDF final dizem "janela de correr 2 folhas".
Mudar um sem o outro faz a demonstração se desmentir três telas depois.

⛔ Removidas da ficha: **"Diagonais 1.947 e 1.951 mm"** e **"2 imagens anexadas"**. Eram a tela
mais complexa do site e apareciam no celular **antes** de qualquer coisa se mexer.

**Falta ⬜:** a microcopy do V2 — *"Menos digitação. Menos erro. Menos tempo entre a obra e o
orçamento."* — e as headlines de seção sugeridas.

## 14. VIDRAÇARIA — antes/depois ⛔ **NÃO REINTRODUZIR**

O V2 manda adicionar. **O dono mandou remover**, das duas páginas, depois de ver no site.
Já foi removida. Não voltar sem pedido explícito dele.

## 15. VIDRAÇARIA — funcionalidades por resultado ⬜

Não feito. Organizar por resultado, nunca como lista de recursos:

| Bloco | Frase |
|---|---|
| Orçamento | Você registra a obra e o cliente sem começar do zero. |
| Projeto | Transforme a medida em uma proposta mais rápida. |
| Pedido | Tudo que foi combinado permanece associado ao serviço. |
| Produção | O pedido segue para quem precisa produzir. |
| Entrega | Acompanhe o que saiu, o que está em andamento e o que falta. |
| Margem | Veja quanto cada serviço realmente deixou. |

## 16. VIDRAÇARIA — prova ⬜ **BLOQUEADO POR DADOS** (ver §8)

## 17. VIDRAÇARIA — preço ⬜ parcial

A seção existe com R$ 197/mês, 14 dias grátis, sem cartão. **Falta** a headline do V2:

> **Um serviço pode pagar vários meses do sistema.**

## 18. VIDRAÇARIA — FAQ ⬜

Não feito. **É a próxima tarefa mais fácil de executar sem depender do dono** — as respostas
saem do que já está no site e no `config.js`.

1. O que acontece depois dos 14 dias?
2. Preciso instalar alguma coisa?
3. Funciona no celular?
4. Posso usar para quantos orçamentos quiser?
5. Meus dados são meus?
6. Posso cancelar quando quiser?
7. A NeoGlass calcula preço automaticamente?
8. A NeoGlass substitui meu atual controle de pedidos?

---

## 19–20. INDÚSTRIA — hero ✅

> **Antes de cortar chapa nova, o sistema procura nas sobras.**
> Só vai para chapa nova o que não coube em sobra nenhuma.

⚠️ O V2 propunha trocar a subheadline por *"Otimização de corte, retalhos, produção, rastreio
e expedição conectados ao mesmo pedido"* — que é **exatamente a lista de funcionalidades que
o próprio §37 do V2 manda evitar**. A frase eleita ficou. Não trocar.

CTA: **Ver a otimização funcionando** → rola até `#otimizador`. 🔒 **Não abre o Calendly.**
Razão do dono: pedir reunião antes de mostrar valor.

⛔ **"Falar no WhatsApp" foi removido do hero.** O WhatsApp não é canal da vidraçaria em
nenhum ponto do site (decisão dele), e saiu também da abertura da indústria.

## 21. INDÚSTRIA — demonstração ✅ / ⬜ **A REESCRITA PENDENTE**

**Feito** (`ferramentas/Retalho.jsx`), um clique roda tudo:

1. **o cavalete cheio primeiro** 🔒 — seis retalhos com código, medida e endereço de prateleira
2. a varredura acende os dois que servem
3. o plano sem retalho — três chapas novas
4. a realocação
5. o placar

Uma **peça laranja** (porta de box 800×1850) é marcada com cor própria e um indicador
apontando, e **nunca sai da tela** — é o personagem que o visitante acompanha.

🔒 **A ordem importa:** a cena abre no cavalete, não na chapa vazia. O argumento não é
"compre menos chapa", é "você já tem o que precisa e não sabe".

### ⬜ O que falta — e é o item mais importante deste documento

A **especificação está fechada** com o dono (quatro respostas dele):

1. **Ritmo ~14 s**, com pausa de respiro entre os atos — ✅ feito (15,4 s medidos)
2. **Uma coisa só por ato, grande, preenchendo o quadrado** — ⬜ **NÃO FEITO**
3. **Balão apontando, um por vez** — ✅ feito (movido para o rodapé do palco, rabicho para cima)
4. **Botão para disparar, resultado permanece no fim** — ✅ feito

O item 2 é o que continua quebrado. Hoje a fase do plano mostra **três chapas lado a lado**,
cada uma com metade da largura do palco. Precisa mostrar **uma chapa por vez**, escalada para
preencher o quadrado, com um contador (*"chapa 1 de 3"*).

**Isso não é ajuste de CSS.** Mexe na máquina de fases: cada ato precisa ter um único
protagonista visual. Três tentativas de resolver por CSS falharam — ver §44.

## 22. INDÚSTRIA — economia ✅ / ⬜ parcial

**Feito:** o placar fecha em dinheiro —

> **A chapa que você não comprou · R$ 80**
> Considerando chapa de referência a R$ 80. O valor real muda com espessura, cor e região.

Preço em `config.js` → `CONFIG.industria.chapa = { BRL: 80, EUR: null, USD: null }`.
🔒 **Em EUR e USD a linha de dinheiro simplesmente não aparece** — preferiu-se omitir a
converter um preço brasileiro. Preencher quando os valores existirem.

A conta sai do mesmo empacotador (`lib/empacotar.js`) que roda na tela — não é número escrito.

**Falta ⬜:** rotular explicitamente **"simulação"** em cada número, como o V2 exige.
Hoje há uma nota discreta *"Simulação com um pedido real"* no rodapé da demonstração; o V2
quer isso explícito ao lado dos números. E os três números soltos da abertura da indústria
(**87,4% · 3,42 m² · 0 planilha para manter**) continuam lá — o dono já mandou remover os
equivalentes da vidraçaria por serem crípticos, e não decidiu sobre estes.

## 23. INDÚSTRIA — sequência de produção ⬜

Não feito. Pedido → Otimização → Corte → Beneficiamento → Produção → Expedição.

> **A matéria-prima entra uma vez. A informação acompanha a peça inteira.**

⚠️ Antes de construir: o `Fluxo.jsx` já faz algo muito parecido. **Reaproveitar o componente**
com outras etapas em vez de criar um segundo. Ver §45 — duplicação foi um problema real aqui.

## 24. INDÚSTRIA — rastreabilidade ⬜

Não feito. Código da peça, pedido, fase, responsável, hora, destino.

> **Saiba onde cada peça está sem perguntar para três pessoas.**

## 25. INDÚSTRIA — financeiro ⬜

Não feito. Receita, matéria-prima, produção, custos, resultado.

> **Não veja apenas o faturamento. Veja a margem por pedido.**

## 26. INDÚSTRIA — origem ✅ / ⬜ parcial

A seção *"Nasceu dentro de uma fábrica de vidro"* **existe e o dono mandou manter** (ela
chegou a estar na lista de corte e foi retirada da lista por ordem dele).

**Falta ⬜:** reforçar a narrativa como o V2 pede —

> **Não nasceu em uma agência de software. Nasceu na operação.**

E confirmar com o dono se **"Desenvolvido na Suíça"** é verdade antes de imprimir. Ele ainda
não respondeu isso.

## 27. INDÚSTRIA — CTA ⬜

Não feito. Trocar por:

> **Trazer um pedido real para a demonstração**

O site já usa "Traga um pedido seu" — manter essa estratégia.

---

## 28–29. PLATAFORMA — hero ✅

> **Um pedido. Do orçamento à nota. Sem trocar de sistema.**
> Cada etapa trabalha com a mesma informação, do primeiro contato à entrega.

## 30. PLATAFORMA — fluxo ✅

**Feito** — `components/Fluxo.jsx`, logo abaixo da abertura.

> **Ninguém redigita o mesmo pedido duas vezes.**

Cinco etapas (Orçamento, Aprovação, Produção, Expedição, Financeiro) avançando sozinhas a
cada 2,8 s, clicáveis. O **cartão do pedido 26-0918 nunca sai da tela e o número nunca muda** —
só a linha de estado troca. 🔒 Se o cartão sumisse entre etapas, o desenho contradiria a frase.

O V2 pede seis etapas (com Corte separado); estão cinco. Ajustar se quiser fidelidade total.

## 31. PLATAFORMA — resultados ✅

*"O ganho não está numa tela. Está no que deixa de acontecer."* — permanece.

## 32. PLATAFORMA — módulos ⬜

Não feito. Os sete módulos existem, mas falta mudar a hierarquia: introduzir com
**"Tudo trabalha sobre o mesmo pedido"** e dar a cada módulo nome + **benefício** + status.

## 33. PLATAFORMA — dispositivos ⬜ parcial

*Na obra / Na bancada / No escritório* existe. Falta explicitar:
**A mesma informação, em lugares diferentes.**

## 34. PLATAFORMA — roadmap ⬜

Não feito. Renomear para **"O que está chegando"**, dividir em *Em desenvolvimento* e
*Planejado*, e mover para posição secundária.

## 35. PROVA E CONFIANÇA — global ⬜ **BLOQUEADO** (ver §8)

---

## 36. CTA global ⬜ parcial

**Feito 🔒:** o botão do topo **só aparece depois que o visitante passa de ~60% da primeira
tela**. Decisão do dono: pedido antes de entregar valor afasta. Não reverter para sempre-visível.

**Falta ⬜:** o texto contextual por página —
Home *Escolher meu perfil* · Vidraçaria *Começar grátis — 14 dias* ·
Indústria *Solicitar demonstração* · Plataforma *Ver o sistema funcionando*.

## 37. Princípios de copy 🔒

Problema → consequência → solução. Nunca feature → feature → feature. Ver §3.1 para a
fórmula exata que o dono elegeu.

## 38. Internacionalização

**Estado:** PT, EN, ES, DE — quatro idiomas, **20 páginas geradas**, slug traduzido por idioma,
`hreflang` + `x-default`, um `.html` real por combinação (o build roda `paginas-seo.mjs`).

⬜ **FR e IT não entram agora** — decisão do dono: *"primeiro acertar o português"*. O conteúdo
ainda vai mudar muito; traduzir agora significa refazer a cada rodada.

⚠️ **Regra de layout:** o alemão é sempre a frase mais longa e é ele quem define o tamanho
máximo dos títulos. *"Bevor eine neue Tafel geschnitten wird, sucht das System in den
Reststücken"* foi o que obrigou o H1 a cair de 68 px para 54 px.

## 39. Microcopy dos CTAs 🔒

Proibido: *Saiba mais, Clique aqui, Conheça, Ver detalhes*.
Usar: *Ver como funciona, Ver a otimização funcionando, Começar grátis — 14 dias,
Trazer meu pedido, Solicitar demonstração*.

## 40. Critério de sucesso

Inalterado do V2. 10 s = o que é · 15 s = meu caminho · 30 s = o que resolve ·
60 s = por que é diferente · antes do CTA = por que confiar · no CTA = o que acontece.

---

## 41. Ordem das páginas — estado real

**Home** (2,4 telas de celular) — hero → portas → painel de telas.
Faltam: fluxo, problema, diferencial, prova, CTA final.

**Vidraçaria** (~8,6 telas) — hero → "fica salvo" → demonstração do vão → **convite de teste**
→ preço → origem → cadastro.
Faltam: funcionalidades, prova, FAQ.

**Indústria** (~6,2 telas) — hero → otimizador → origem → cadastro.
Faltam: economia rotulada, produção, rastreabilidade, financeiro, FAQ, CTA novo.

**Plataforma** (~11,4 telas — **a mais longa do site**) — hero → fluxo → resultados → módulos →
dispositivos → roadmap → origem → cadastro.

⚠️ **Investigar:** medindo no celular aparecem **cinco blocos de ~1.196 px seguidos, sem título**.
São eles que fazem o tamanho da página. O dono suspeita de conteúdo duplicado e **isso não foi
diagnosticado**. É a maior gordura restante do site.

## 42. O que NÃO fazer

Tudo do V2, mais:

- Não reintroduzir o **antes/depois** (§14) nem o **WhatsApp na vidraçaria**.
- Não pôr **CTA de teste grátis antes da demonstração** em nenhuma página.
- Não devolver o **botão fixo do topo** para a primeira tela.
- Não usar `aspect-ratio` no palco das demonstrações — ver §44.
- Não tratar problema estrutural de animação com CSS — ver §44.

---

## 43. Estado técnico

```
src/
  App.jsx                 rotas, tarja de lembrete, transição de página
  config.js               preços, contato, CONFIG.industria.chapa (R$ 80)
  lib/
    paginasSeo.js         5 rotas × 4 idiomas = 20 páginas
    rota.js               roteador; endereço desconhecido cai na home
    lado.js               memória de 30 dias (localStorage, não é cookie)
    empacotar.js          o empacotador real (MaxRects) — alimenta demo e hero
  components/
    Tela.jsx              telas do produto em vetor: pedidos, producao, design, corte
    Telas.jsx             o leque que troca sozinho
    Fluxo.jsx             o pedido atravessando 5 etapas
    Abertura.jsx          hero compartilhado (props: tela, telas, zap, acao.fantasma)
    Comum.jsx             Topo, Chamada (prop `convite`), Rodape
  ferramentas/
    Retalho.jsx           demonstração do otimizador   ← reescrita pendente
    Orcamento.jsx         demonstração do vão          ← reescrita pendente
  conteudo/
    pt|en|es|de.js        tronco comum + fluxo
    areas/*.{pt,en,es,de}.js
```

Comandos: `npm run build` (gera as 20 páginas), `npm run solo` (arquivo único),
`PORTA=4400 node verificar.mjs` (valida as 20).

**Bateria de teste que deve rodar antes de cada entrega** — foi criada depois de um pacote
quebrado ir ao ar:

- 12 páginas × 2 larguras (390 e 1380): sem rolagem lateral, conteúdo renderizado, sem erro de JS
- porta da home → página certa
- botão de âncora rola e o alvo **não fica sob o cabeçalho fixo**
- a tarja de lembrete **não cobre as abas** e as abas continuam clicáveis
- as duas animações correm até o fim (PDF / R$)
- o leque da home troca (verificar por `aria-current`, **não por texto** — as três telas ficam
  sempre no HTML)

---

## 44. O que foi tentado e falhou — não repetir

**Três tentativas de consertar as animações por CSS.** Todas falharam, porque o problema é
estrutural: os componentes nasceram para um layout de duas colunas largas.

1. **Uma chapa por linha** (`grid gap-6`) — as chapas ficaram grandes e o palco explodiu para
   **941 px de altura no celular**, com as três empilhadas. O quadrado deixou de existir e o
   balão passou a ser cortado. Revertido.
2. **`aspect-ratio: 1/1` no palco** — a caixa encolheu a **largura** para casar com a altura e
   sobrou um vazio de 300 px à direita. O quadrado vem de `min-height`, não de forçar proporção.
3. **Balão flutuando no canto superior** — tapou o RT-0401 no cavalete e a parede no vão.
   Movido para o rodapé do palco com o rabicho para cima. Resolvido.

**Um pacote quebrado foi ao ar.** O cabeçalho mudou de 68 px para 56+38 px e a tarja de
lembrete, posicionada contra a altura antiga, caiu **em cima das abas e bloqueou os cliques**.
Lição: componente posicionado contra medida de outro componente precisa ser reconferido
sempre que aquela medida muda — e a bateria do §43 precisa rodar antes de entregar.

**Testes que mentem.** Comparar `innerText` para detectar troca de tela deu falso negativo:
as três telas do leque ficam sempre no DOM. Verificar por atributo, não por texto.

## 45. Duplicação — histórico

O filme de seis telas (`jornada/Jornada.jsx`) saiu da Indústria, foi para a Plataforma, e
**foi removido de lá** porque contava a mesma história do `Fluxo.jsx`. O componente continua
no repositório, sem uso.

Antes de criar qualquer sequência de etapas nova (§23), **verificar se o `Fluxo.jsx` não serve**.

## 46. Pendências que dependem só do dono

1. **Prova** (§8, §16, §35): antes/depois da empresa de Unterseen, sem nome.
2. **"Desenvolvido na Suíça"**: confirmar se é verdade.
3. **Preço da chapa em EUR e USD** (§22): hoje `null`, a linha de dinheiro não aparece nesses idiomas.
4. **Os três números da abertura da indústria** (87,4% · 3,42 m² · 0 planilha): remover, trocar por frases, ou manter.
5. **O fluxo do pedido na home** (§5): entra e leva a home para ~4 telas, ou não entra.

## 47. Ordem sugerida de execução

1. **Reescrever a fase do plano do otimizador** — uma peça por vez preenchendo o quadrado (§21). É o que ele mais cobrou.
2. **Aplicar o mesmo padrão ao vão** (§13).
3. **Diagnosticar os cinco blocos sem título da Plataforma** (§41).
4. **FAQ da vidraçaria** (§18) — não depende de ninguém.
5. **CTA contextual no topo** (§36) — barato.
6. **Funcionalidades por resultado** (§15), **produção/rastreio/financeiro da indústria** (§23–25).
7. **Prova** (§8), assim que os dados chegarem.
