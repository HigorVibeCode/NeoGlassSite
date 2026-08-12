# NeoGlass — site

Site institucional do NeoGlass (`neoglass.online`). Projeto separado da plataforma.

## As três abas

O site atende dois públicos com dores diferentes, então são três endereços de verdade
— cada um com o próprio título, a própria descrição e o próprio lugar no Google.

| rota | público | arquivo |
| --- | --- | --- |
| `/` | indústria do vidro plano | `src/paginas/Industria.jsx` |
| `/vidracaria` | vidraçaria | `src/paginas/Vidracaria.jsx` |
| `/plataforma` | quem já se interessou e quer profundidade | `src/paginas/Plataforma.jsx` |

O roteador é `src/lib/rota.js` — quarenta linhas sobre a History API. A lista `ABAS`
mora lá: mexer nela muda a navegação, o rodapé, o `<title>`, a `<meta description>` e
o canonical de uma vez só. A Vercel já devolve o `index.html` para qualquer caminho
(`rewrites` no `vercel.json`), então abrir `/vidracaria` direto funciona.

Na página da indústria continua a **jornada**: três chapas de vidro que nunca somem e,
a cada cena, se reorganizam para mostrar outra parte do sistema.

## As duas demonstrações

Não são calculadoras: são o sistema fingindo de sistema. O visitante **não preenche
nada e não decide nada** — ele aperta um botão de cada vez e cada aperto entrega um
pedaço da história. Nada é enviado para lugar nenhum.

**`src/ferramentas/Retalho.jsx`** (indústria) — três cliques:

1. `pronto` — um pedido real de 20 peças, a chapa nova e duas sobras encostadas no
   cavalete. Botão: **Otimizar corte**.
2. `otimizando` → `plano` — a linha de leitura varre a chapa, o plano nasce com as
   peças surgindo escalonadas: 3 chapas, 74% de aproveitamento. Aí entra o aviso —
   *o sistema achou 2 retalhos que servem*. Botão: **Usar os 2 retalhos**.
3. `realocando` → `economia` — o desfecho: **1 chapa inteira que não vai ser aberta**,
   3,42 m² recuperados, 74% → 87%, e a chapa 3 desenhada riscada ao lado das outras.
   Fecha com a pergunta que faz a conta virar dele: *"isso foi um pedido — quantos a
   sua fábrica fecha por semana?"*

Os números **não são escritos à mão**. O cenário passa pelo empacotador de verdade
(`src/lib/empacotar.js`, MaxRects com giro e desconto de lâmina) duas vezes — com e sem
os retalhos — e o texto lê o resultado. Mexer no algoritmo muda a narrativa junto.

**`src/ferramentas/Orcamento.jsx`** (vidraçaria) — três toques:

1. `vao` — um vão de janela já medido na parede, com as cotas. Botão: **Usar este vão**.
2. `montando` → `orcamento` — a janela de correr se monta sobre a medida e o orçamento
   se preenche item a item, com o total subindo até o valor. Botão: **Gerar PDF**.
3. `gerando` → `pdf` → `enviar` — o documento sai com a marca da vidraçaria (logo,
   validade, prazo, linha de assinatura) e o fecho conta quantos segundos aquilo levou.

O cronômetro é real (começa no primeiro toque) e tem guarda: acima de 90 segundos o
título troca para "3 toques, zero digitação", para a frase nunca ficar ridícula se o
visitante sair para o café. Os valores são **de exemplo e marcados como tal** — são o
preço que a vidraçaria cobra do cliente dela; nenhum preço do NeoGlass aparece.

Ambas as demonstrações rodam sem nenhum trabalho por quadro: cada fase é um
`setTimeout` e tudo o que se move são `animation-delay` escalonados em CSS
(`.surge`, `.sobe`, `.enche`, `.varre`, `.imprime`, `.bate`).

## O preço da vidraçaria

É o único produto com preço no site — preço fixo vendido por tráfego pago, e esconder
preço fixo só gera desconfiança. A indústria continua sem preço nenhum, porque lá a
venda é consultiva.

Tudo mora em `CONFIG.vidracaria`, em `src/config.js`:

```js
vidracaria: {
  precoMensal: 0,    // R$ por mês, por vidraçaria
  diasTeste: 14,     // 0 desliga a menção ao teste grátis
  cadastro: '',      // URL da tela de cadastro; vazio cai no WhatsApp
}
```

**Enquanto `precoMensal` for 0, o preço não existe no site.** A seção some, a linha do
topo some, o botão do cabeçalho volta a ser "Ver demonstração" e a chamada final volta
a ser a de agendamento — a aba fica exatamente como era. No dia em que o número estiver
decidido, mudar essa linha liga tudo de uma vez:

- **um quarto passo na demonstração**: "Quero isso na minha obra" deixa de ser link e
  vira degrau — abre a tela do preço com o orçamento de R$ 1.169 ainda ao lado, e a
  conta de quantos meses aquele serviço paga (`Math.floor(TOTAL / precoMensal)`);
- linha discreta sob os botões da abertura, com o valor e os três "não cobramos";
- seção `#preco` (`src/paginas/Preco.jsx`) depois da demonstração e do contraste;
- botão do cabeçalho vira "Começar grátis · N dias" **só na aba da vidraçaria**;
- link "Preço" no cabeçalho, para os anúncios poderem cair em `/vidracaria#preco`;
- chamada final trocada de "agendar" para "começar".

A âncora do preço vem **depois** da demonstração de propósito: quando o visitante chega
lá, ele acabou de ver um orçamento de janela fechar em R$ 1.169 na tela dele, e a
mensalidade é comparada contra a receita dele — não contra outro software.

## Onde este site mora (e por que não dentro da plataforma)

**Repositórios separados, mesmo domínio.** O site não entra no repositório
`NeoGlass` da plataforma — e não é preferência, são três impedimentos concretos:

1. **Tailwind.** Este site usa Tailwind v4; a plataforma não usa Tailwind nenhum,
   são 570 arquivos de CSS escrito à mão. O *preflight* do Tailwind é um reset
   global — entrar naquele repositório significa passar um reset por cima do
   visual do sistema inteiro.
2. **Versões.** Aqui é React 19 + Vite 8; lá é React 18 + Vite 6. Um repositório
   comporta uma versão de cada.
3. **Deploy acoplado.** Com anúncio rodando, corrigir uma frase da landing não
   pode depender de publicar o sistema onde os clientes estão logados — nem o
   contrário.

O domínio, sim, é o mesmo: autoridade de SEO num lugar só, e a conversão do
pixel (o cadastro acontece no app) fica no mesmo domínio registrável.

```
neoglass.online         → este site        (projeto Vercel novo)
app.neoglass.online     → a plataforma     (o projeto Vercel que já existe)
```

### A ordem importa

1. Acrescentar `app.neoglass.online` ao projeto Vercel da plataforma. Ela passa a
   responder nos dois endereços, sem sair do ar.
2. Supabase → Authentication → URL Configuration: acrescentar a nova origem às
   *Redirect URLs*. **Não precisa mexer no código da plataforma** — ela monta os
   redirects com `window.location.origin`.
3. Testar login, redefinição de senha e um link `/obra/<token>` na nova origem.
4. Só então apontar o apex (`neoglass.online`) para este projeto.

### Os redirects que salvam os links antigos

Estão em `vercel.json`, e existem por um motivo específico: a plataforma gera os
links de obra com `window.location.origin`, então **todo link `/obra/<token>` já
enviado para cliente aponta para `neoglass.online`**. No dia em que o apex virar
site institucional, esses links cairiam numa landing page. Os redirects mandam
`/login`, `/redefinir-senha`, `/obra/*` e `/preview/*` para o subdomínio — nada do
que já saiu por WhatsApp quebra.

Depois da mudança, atualizar `CONFIG.login` em `src/config.js` para
`https://app.neoglass.online/login`.

## Desempenho

O site precisa abrir bem em celular fraco de vidraceiro, não em MacBook. As regras:

- **Nada de React a 60 quadros por segundo.** O prisma do fundo é montado uma vez e
  nunca mais passa pelo React; o que se mexe é CSS (`stroke-dashoffset` nos impulsos,
  `opacity` nos nós). O cartão da abertura troca de face com um `setInterval` de
  quatro segundos, não com um relógio por quadro.
- **O filme roda a 24 quadros por segundo** (16 em aparelho modesto) — `useFilme` em
  `src/jornada/Jornada.jsx` avança o tempo real mas só avisa o React nessa cadência.
- **As cenas que não dependem do relógio são criadas uma vez só** (`PARADOS`, no mesmo
  arquivo). O React recebe o mesmo elemento e não desce naquele ramo.
- **`src/lib/dispositivo.js`** decide o que o aparelho aguenta e marca o `<html>` com
  `data-fraco` / `data-parado`. O CSS usa isso para desligar as animações do fundo, o
  grão e o desfoque do cabeçalho sem precisar de JavaScript espalhado.
- **Sem `background-attachment: fixed` e sem `mix-blend-mode` de tela cheia** — os dois
  obrigavam o navegador a repintar tudo a cada rolagem.
- **`.secao` usa `content-visibility: auto`**: o que está fora da tela não é pintado.

Medido com a CPU estrangulada em 6× (celular de entrada): rolagem da página inteira
sem nenhuma *long task*, entre 56 e 59 quadros por segundo.

## Rodar

```bash
npm install
npm run dev
```

| comando | o que faz |
| --- | --- |
| `npm run dev` | servidor de desenvolvimento |
| `npm run build` | build normal, sai em `dist/` |
| `npm run solo` | build de arquivo único (um `.html` sozinho), sai em `dist-solo/` — serve para mandar por WhatsApp/e-mail sem publicar |
| `npm run preview` | serve o `dist/` para conferir antes de publicar |

## Como a jornada funciona

Tudo que aparece no meio da página vem de **um array só**: `src/jornada/cenas.js`.

```js
export const CENAS = [
  {
    id: 'corte',
    etapa: 'Corte',              // rótulo curto que aparece no índice
    cor: '#0e7b9c',              // cor de acento da cena
    duracao: 7000,               // quanto tempo a cena roda sozinha (ms)
    titulo: 'Corta certo. Sobra vira estoque.',
    sub: '…',
    conteudo: ['chapa0', 'chapa1', 'chapa2'],   // o que cada uma das 3 chapas mostra
    medidor: (t) => ({ texto: `Aproveitamento · …`, k: … }),
    formacao: (t, compacto) => [ /* posição das 3 chapas */ ],
  },
]
```

- `formacao(t, compacto)` devolve **sempre três** retângulos `{x, y, w, h, rot, z, op}`
  no espaço de desenho (1180×700 no computador, 380×560 no celular). O palco inteiro
  é escalado para caber na tela, então nada precisa saber o tamanho do monitor.
- `t` vai de 0 a 1 dentro da cena. Ele vem de um relógio, não do scroll: a animação
  **roda sozinha** quando a seção entra na tela (`IntersectionObserver`). Quem tem
  "reduzir movimento" ligado no sistema recebe o estado final direto.
- `conteudo` são chaves resolvidas em `src/jornada/Palco.jsx` para os desenhos de
  `conteudos.jsx` (cenas 1–3 e 6) e `conteudos2.jsx` (cenas 4–5).

### Acrescentar, tirar ou reordenar uma cena

1. Se precisar de desenho novo, exporte um componente SVG em `conteudos.jsx` /
   `conteudos2.jsx` e registre a chave no mapa do `Palco.jsx`.
2. Coloque (ou remova) um objeto em `CENAS`, na posição desejada.

Nenhuma cena conhece as outras. O índice, a altura da seção e a barra de progresso
se ajustam sozinhos ao tamanho do array.

### Detalhe que não pode se perder

Na cena do corte, as três chapas são as **colunas reais** do plano (1200 / 1230 / 780
de uma chapa de 3210). É por isso que nenhuma peça aparece cortada na divisa entre
duas chapas. Se mexer nessas larguras, refaça a conta.

## Textos

Os títulos e subtítulos das cenas ficam em `src/jornada/cenas.js`. O resto da página
(abertura, contraste, origem, chamada, rodapé) está em `src/App.jsx`. É texto comum —
dá para editar direto, sem tocar em lógica.

## Configuração

Tudo que muda quando o negócio muda mora em **`src/config.js`**:

```js
agendar: 'https://cal.com/neoglass/apresentacao',  // seu link de agenda
whatsappNumero: '',                                 // só números: 5511999998888
email: 'contato@neoglass.online',
login: 'https://neoglass.online/login',
horarios: 'seg a sex, 14h–20h · sáb, 8h–17h (horário de Brasília)',
```

> Enquanto `whatsappNumero` estiver vazio, todo botão de WhatsApp cai no e-mail.
> **Preencher isso é o primeiro passo antes de publicar.**

### Variáveis de ambiente

Copie `.env.example` para `.env.local` (e repita os mesmos valores no painel da
Vercel, em *Settings → Environment Variables*):

| variável | para quê |
| --- | --- |
| `VITE_SUPABASE_URL` | onde o formulário grava o lead |
| `VITE_SUPABASE_ANON_KEY` | chave pública do mesmo projeto |
| `VITE_PIXEL_META` | ID do pixel do Meta. **Vazio = nenhum script de rastreio é carregado** |

Se as duas primeiras ficarem vazias, o formulário continua funcionando: ele abre o
WhatsApp com nome, empresa e perfil já escritos na mensagem. Nada se perde.

## Onde o lead cai (Supabase)

No SQL Editor do projeto, uma vez:

```sql
create table public.leads_site (
  id          uuid primary key default gen_random_uuid(),
  criado_em   timestamptz not null default now(),
  nome        text not null,
  empresa     text not null,
  whatsapp    text not null,
  perfil      text,
  origem      text
);

alter table public.leads_site enable row level security;

-- O site só pode ESCREVER. Ninguém lê a tabela com a chave pública.
create policy "site pode inserir"
  on public.leads_site for insert
  to anon
  with check (true);
```

A política é só de `insert` de propósito: a chave anônima vai dentro do JavaScript
da página, e qualquer pessoa consegue lê-la. Com essa política, o pior que alguém
pode fazer é mandar um lead falso — nunca ler a sua lista de clientes.

Para ver os leads, use o painel do Supabase (*Table Editor → leads_site*) ou uma
consulta com a chave de serviço, que não sai do servidor.

## Medição

`src/lib/rastreio.js` expõe `evento(nome, dados)` com vocabulário nosso:

| nome | vira, no Meta |
| --- | --- |
| `agendar` | `Schedule` |
| `whatsapp` | `Contact` |
| `lead` | `Lead` |

Sem `VITE_PIXEL_META`, `evento()` não faz nada e o script do Meta nem é baixado —
a página fica sem cookie de rastreio nenhum.

## Publicar na Vercel

1. Suba o repositório no GitHub.
2. Na Vercel: *Add New → Project* → escolha o repositório. Ela detecta Vite sozinha
   (`npm run build`, saída `dist`); o `vercel.json` já traz reescrita de rota,
   cache dos assets e cabeçalhos de segurança.
3. *Settings → Environment Variables*: as três variáveis acima, em **Production** e
   **Preview**.
4. *Settings → Domains*: `neoglass.online`. Como o domínio já atende a plataforma,
   confira antes qual serviço responde na raiz — o site vai na raiz e no `www`,
   a plataforma continua onde está (`/login` e o resto).
5. Deploy.

Depois de publicar, vale abrir uma vez `https://neoglass.online/robots.txt`,
`/sitemap.xml` e `/og.png` — essa última é a imagem que aparece quando o link é
mandado no WhatsApp.

## Identidade

As cores, o gradiente da marca, a pílula e o vidro vêm da tela de login da
plataforma e estão em `src/styles.css`, no bloco `@theme`. A marca é SVG inline em
`src/components/Marca.jsx` — o prisma com as cores oficiais, não uma imagem.

Duas regras que a página respeita de propósito:

- **Sem preço.** A página mostra o que o sistema faz; preço é conversa.
- **Sem cruz suíça e sem brasão.** A lei suíça (*Swissness*) protege esses símbolos.
  A página diz apenas "desenvolvido na Suíça", que é fato e é permitido.

## Stack

React 19 + Vite + Tailwind v4. Nenhuma biblioteca de animação: o movimento é SVG,
CSS e um relógio. O bundle inteiro cabe em um arquivo (`npm run solo`).
