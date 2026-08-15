import Tela from './Tela.jsx'
import { Bloco } from './Comum.jsx'
import { useTextos } from '../i18n/idioma.jsx'

/**
 * A abertura da /plataforma — a seção 01 da direção do dono.
 *
 * Por que ela NÃO usa o componente `Abertura`, que as outras três páginas
 * dividem: aquele é título, parágrafo, botão e três números — a gramática de
 * landing page, e a direção proíbe exatamente isso. Aqui a pessoa não deve
 * LER o que o NeoGlass é; ela deve VER. Então a seção tem uma linha de texto,
 * o carimbo de prancha, e o resto é produto.
 *
 * A identidade fica inteira — Archivo no título, o mono das cotas, o verde da
 * marca, a folha FL. no alto. O que muda é o ritmo: uma seção, uma ideia, e
 * espaço em volta.
 *
 * O CTA não existe aqui de propósito. A direção é explícita: o pedido vem
 * depois de toda a apresentação, na seção 06.
 *
 * ── O campo de profundidade ──────────────────────────────────────────────
 *
 * O leque de telas sozinho mostra três janelas. Três janelas não dão a
 * sensação de um sistema grande — dão a sensação de três telas. Atrás dele
 * entra um campo de placas: molduras de janela sem conteúdo, recuando, cada
 * uma na cor de um tema real do produto.
 *
 * Elas são honestas justamente por serem vazias. Uma placa com conteúdo
 * inventado seria uma tela que não existe; uma placa vazia é o que é —
 * profundidade. Ninguém pode ler nelas uma promessa que o sistema não cumpre.
 *
 * As cores não são escolha minha. São os temas que o NeoGlass já tem por
 * dentro: um por ambiente, e é o que a pessoa vê quando abre o sistema de
 * verdade.
 */

/* Os temas reais do produto, na ordem em que recuam. O primeiro é o que fica
   logo atrás do leque, o último é o mais fundo. */
const TEMAS = [
  { cor: '#0e8c6a', nome: 'jade' },
  { cor: '#4f46e5', nome: 'indigo' },
  { cor: '#0e7b9c', nome: 'safira' },
  { cor: '#b8862c', nome: 'ouro' },
  { cor: '#e11d48', nome: 'rubi' },
]

/**
 * Uma chapa recuando atrás da janela.
 *
 * A primeira versão eram molduras de janela vazias, brancas. Não funcionou, e
 * o motivo é simples: branco sobre um fundo quase branco não faz
 * profundidade — as placas sumiam e sobrava um cartão solto no meio da página.
 *
 * Estas são chapas de vidro. Translúcidas, tingidas na cor de um tema real do
 * produto, com o fio de luz na aresta de cima. Resolvem as duas coisas de uma
 * vez: aparecem contra o fundo claro, e são a matéria-prima de quem vai ler a
 * página. Uma plataforma de vidro que abre com chapas empilhadas está falando
 * a língua de quem está do outro lado.
 *
 * E continuam honestas: uma chapa não afirma nada. Não tem tela inventada
 * dentro, não promete módulo que não existe. É profundidade, e só.
 */
function Placa({ cor, i }) {
  // cada placa recua um degrau: menor, mais alta, mais para a direita e mais
  // apagada. O desfoque cresce junto — é o que separa os planos sem precisar
  // de sombra em cima de sombra.
  const recuo = i + 1
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 origin-top"
      style={{
        transform: `translate3d(${recuo * 6.5}%, ${recuo * -6}%, 0) rotate(${recuo * -0.55}deg) scale(${1 - recuo * 0.03})`,
        opacity: 0.92 - recuo * 0.13,
        filter: `blur(${recuo * 0.45}px)`,
        zIndex: -recuo,
      }}
    >
      <div
        className="h-[358px] w-full rounded-[16px] sm:h-[382px]"
        style={{
          background: `linear-gradient(152deg, ${cor}2e, ${cor}0f 46%, ${cor}22)`,
          border: `1px solid ${cor}4d`,
          // o fio de luz na aresta de cima é o que faz a chapa parecer chapa e
          // não retângulo colorido — é a mesma aresta do utilitário `.chapa`
          boxShadow: `inset 0 1px 0 ${cor}80, 0 30px 60px -40px ${cor}66`,
        }}
      />
    </div>
  )
}

/* A parede. `z: 0` é a tela da frente — a única que fica no fluxo e portanto a
   única que define a altura do bloco. As outras são posicionadas por cima
   dela, recuando para a direita e para cima, e a borda do quadro corta o que
   passar. */
const PAREDE = [
  /* `design` vai para o fundo, e não para o meio, por um motivo prático: é a
     única tela com palco ESCURO. No meio da parede ela virava uma laje cinza
     encostada na borda direita — lia como falha de recorte, não como tela.
     No plano mais fundo, desfocada e apagada, ela vira sombra de profundidade,
     que é o papel dela aqui. */
  { tela: 'design', z: 3, x: 54, y: -27, e: 0.71, o: 0.5, desfoque: 1.6 },
  { tela: 'corte', z: 2, x: 40, y: -15, e: 0.83, o: 0.82, desfoque: 0.55 },
  { tela: 'producao', z: 1, x: 22, y: -5, e: 0.93, o: 0.94 },
  { tela: 'pedidos', z: 0 },
]

export default function Apresentacao() {
  const t = useTextos().plataforma

  return (
    <section
      id="topo"
      className="relative mx-auto flex min-h-[100svh] w-full max-w-[1240px] flex-col justify-center overflow-x-clip px-5 pb-16 pt-[124px] sm:px-8 lg:pt-[104px]"
    >
      <Bloco rotulo={t.hero.rotulo} folha="FL. 01/06" />

      {/* A hierarquia é o assunto desta seção. Na primeira tentativa o título
          ocupava quatro linhas gigantes e o produto entrava pequeno embaixo —
          ou seja, uma página de texto com uma captura de tela de ilustração,
          exatamente o que a direção proíbe. Invertido: o texto é uma coluna
          estreita e discreta, e o produto ocupa o resto e vaza pela direita.
          Quem fala aqui é a interface. */}
      <div className="mt-9 grid items-center gap-10 lg:mt-10 lg:grid-cols-[minmax(0,38%)_minmax(0,62%)] lg:gap-6">
        <h1 className="display max-w-[15ch] text-[clamp(26px,3.1vw,40px)] leading-[1.08]">
          {t.hero.titulo.antes} <span className="marca">{t.hero.titulo.destaque}</span>
        </h1>

        {/* O palco. `deriva` é uma flutuação lenta e contínua: sem ela a
            composição fica correta e morta. Com ela, a página respira mesmo
            parada — e é o que separa "captura de tela numa moldura" de
            "produto vivo".

            O vazamento pela direita (-mr) é o que dá tamanho: uma janela que
            termina dentro da margem é um cartão; uma que sai do quadro sugere
            que existe mais do que cabe na tela. Quem pediu menos movimento no
            sistema não recebe nenhuma deriva. */}
        {/* O vazamento começa só no tablet. No celular ele cortava a tela da
            FRENTE no meio do conteúdo — "em 9d / no prazo" ficava pela metade.
            Vazar é bom quando o que sai do quadro é o fundo; quando é a única
            tela legível da composição, é só defeito. */}
        <div className="palco-plataforma esvai w-full sm:-mr-[10%] sm:w-[110%] lg:-mr-[16%] lg:w-[116%]">
          <div className="deriva relative w-full">
            {TEMAS.map((tema, i) => (
              <Placa key={tema.nome} cor={tema.cor} i={i} />
            ))}

            {/* Uma tela só, com retângulos coloridos atrás, continuava lendo
                como "captura de tela decorada". O que dá tamanho é ver MUITA
                COISA DE VERDADE ao mesmo tempo — então as quatro telas
                desenhadas aparecem juntas, recuando, cortadas pela borda do
                quadro. Cortadas de propósito: o que sai do enquadramento diz
                que existe mais do que cabe aqui. */}
            {PAREDE.map((p) => (
              <div
                key={p.tela}
                aria-hidden={p.z > 0 ? 'true' : undefined}
                /* Os dois planos mais fundos somem no celular. Lá a coluna é
                   estreita e eles subiam POR CIMA do título — a parede
                   comendo a única frase da seção. Sobram a tela da frente e
                   uma atrás, que é o que cabe com dignidade em 390 px. */
                className={
                  p.z === 0
                    ? 'relative'
                    : `pointer-events-none absolute inset-x-0 top-0 origin-top-left ${
                        p.z >= 2 ? 'hidden sm:block' : ''
                      }`
                }
                style={
                  p.z > 0
                    ? {
                        transform: `translate3d(${p.x}%, ${p.y}%, 0) scale(${p.e})`,
                        opacity: p.o,
                        filter: p.desfoque ? `blur(${p.desfoque}px)` : undefined,
                        zIndex: -p.z,
                      }
                    : { zIndex: 1 }
                }
              >
                <Tela variante={p.tela} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
