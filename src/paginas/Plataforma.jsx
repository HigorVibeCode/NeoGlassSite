import Abertura from '../components/Abertura.jsx'
import { Bloco, Chamada, Origem, Revelar } from '../components/Comum.jsx'
import { Tela } from '../jornada/conteudos.jsx'

const DEVOLVE = [
  [
    'A chapa que não abriu',
    'Todo retalho reservado é vidro que já foi pago uma vez. Enquanto ele não tem medida, cor e endereço de cavalete, ninguém consegue vendê-lo de novo — e ele vira lixo caro.',
  ],
  [
    'O telefone que não tocou',
    'Quando o cliente enxerga a fase do pedido, ele para de ligar. E quando ele para de ligar, alguém dentro da fábrica para de descer até a produção para descobrir a resposta.',
  ],
  [
    'O vidro que não voltou',
    'Vão fora de esquadro, espessura que não aguenta o peso, ferragem que não existe para aquela medida: tudo isso é barato de corrigir antes da mesa e caro depois da têmpera.',
  ],
  [
    'A margem que apareceu',
    'Não a do mês — a de cada pedido. Matéria-prima, produção e receita fecham na mesma tela, então dá para saber qual tipo de serviço vale a pena repetir.',
  ],
]

const MODULOS = [
  ['01', 'Orçamento e proposta', 'Feed com foto da obra, medida e assinatura na tela do cliente'],
  ['02', 'Simulação com IA', 'O vidro no ambiente do cliente antes de a peça existir'],
  ['03', 'Checagem do pedido', 'Segura o que está errado antes de virar corte'],
  ['04', 'Otimização de corte', 'Plano com retalho primeiro; saída em DXF, G-code, ASC e CNI+FBT'],
  ['05', 'Estoque e retalhos', 'Cada sobra com medida, cor, espessura e endereço de cavalete'],
  ['06', 'Produção e rastreio', 'Etiqueta e código por peça, com fase, hora e responsável'],
  ['07', 'Expedição e entrega', 'Leitura na saída, carga conferida peça a peça'],
  ['08', 'Financeiro por pedido', 'Nota, recebimento e margem real do pedido, não do mês'],
]

const APARELHOS = [
  ['celular', 'Na obra', 'Mede, fotografa, orça e colhe a assinatura — de pé, na casa do cliente.'],
  ['tablet', 'Na bancada', 'A ordem de produção e a etiqueta da peça, onde o vidro está sendo cortado.'],
  ['navegador', 'No escritório', 'O plano de corte, a fila da mesa e o fechamento do pedido.'],
]

const ADIANTE = [
  ['Modo obra sem internet', 'Medir e orçar em obra com sinal ruim, sincronizando quando voltar.'],
  ['Painel do cliente', 'O comprador acompanha o pedido dele sem precisar de conta no sistema.'],
  ['Mais saídas de máquina', 'Cada mesa de corte fala um dialeto; a lista cresce conforme a fábrica pede.'],
]

export default function Plataforma() {
  return (
    <>
      <Abertura
        rotulo="A plataforma · por dentro"
        folha="FL. 01/06"
        origem="abertura-plataforma"
        etiqueta="Uma tela do sistema, ao vivo"
        titulo={
          <>
            Do orçamento à nota, <span className="marca">sem trocar de sistema.</span>
          </>
        }
        texto="Não são módulos que conversam por integração. É um pedido só atravessando o comercial, a produção, a expedição e o financeiro — com o mesmo número, do primeiro clique ao fechamento."
        marcas={[
          ['8', 'módulos, um pedido só'],
          ['4', 'formatos de saída para a mesa'],
          ['0', 'planilha entre uma etapa e outra'],
        ]}
      />

      <Revelar as="section" className="secao mx-auto max-w-[1240px] px-5 pb-24 sm:px-8 sm:pb-32">
        <Bloco rotulo="O que ela devolve no mês" folha="FL. 02/06" />
        <h2 className="display mt-7 max-w-[19ch] text-[clamp(30px,4.4vw,54px)]">
          O ganho não está numa tela. Está no que deixa de acontecer.
        </h2>

        <dl className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2">
          {DEVOLVE.map(([t, d], i) => (
            <div key={t} className="border-t border-line pt-6">
              <p className="cota uppercase opacity-70">{String(i + 1).padStart(2, '0')}</p>
              <dt className="display mt-3 text-[clamp(22px,2.4vw,30px)]">{t}</dt>
              <dd className="mt-3 max-w-[46ch] text-[15.5px] leading-[1.6] text-dim">{d}</dd>
            </div>
          ))}
        </dl>
      </Revelar>

      <Revelar as="section" className="secao mx-auto max-w-[1240px] px-5 pb-24 sm:px-8 sm:pb-32">
        <Bloco rotulo="Índice dos módulos" folha="FL. 03/06" />
        <h2 className="display mt-7 max-w-[17ch] text-[clamp(30px,4.4vw,54px)]">
          Oito módulos. Todos abertos na mesma fábrica, todo dia.
        </h2>

        <ul className="mt-12 overflow-hidden rounded-[22px] border border-line bg-card">
          {MODULOS.map(([n, nome, oque], i) => (
            <li
              key={n}
              className={`flex flex-wrap items-baseline gap-x-6 gap-y-1 px-6 py-5 sm:flex-nowrap sm:px-8 ${
                i ? 'border-t border-line' : ''
              }`}
            >
              <span className="cota w-8 shrink-0 opacity-60">{n}</span>
              <span className="w-full shrink-0 text-[16px] font-extrabold tracking-[-0.015em] text-ink sm:w-[236px]">
                {nome}
              </span>
              <span className="min-w-0 flex-1 text-[15px] leading-[1.5] text-dim">{oque}</span>
              <span className="cota shrink-0 uppercase" style={{ color: '#0e8c6a', opacity: 1 }}>
                em produção
              </span>
            </li>
          ))}
        </ul>
      </Revelar>

      <Revelar as="section" className="secao mx-auto max-w-[1240px] px-5 pb-24 sm:px-8 sm:pb-32">
        <Bloco rotulo="Onde ele abre" folha="FL. 04/06" />
        <h2 className="display mt-7 max-w-[18ch] text-[clamp(30px,4.4vw,54px)]">
          O mesmo pedido, do bolso do vidraceiro à mesa de corte.
        </h2>

        <div className="mt-14 grid gap-12 sm:grid-cols-3 sm:gap-8">
          {APARELHOS.map(([tipo, titulo, texto]) => (
            <div key={tipo} className="min-w-0">
              <div className="h-[210px] sm:h-[230px]" aria-hidden="true">
                <Tela tipo={tipo} />
              </div>
              <h3 className="display mt-6 text-[20px]">{titulo}</h3>
              <p className="mt-2 max-w-[34ch] text-[15px] leading-[1.55] text-dim">{texto}</p>
            </div>
          ))}
        </div>
      </Revelar>

      <Revelar as="section" className="secao mx-auto max-w-[1240px] px-5 pb-24 sm:px-8 sm:pb-32">
        <Bloco rotulo="O que vem a seguir" folha="FL. 05/06" />
        <h2 className="display mt-7 max-w-[20ch] text-[clamp(30px,4.4vw,54px)]">
          O que ainda não está pronto — e a gente prefere dizer.
        </h2>
        <ul className="mt-12 grid gap-px overflow-hidden rounded-[20px] bg-line sm:grid-cols-3">
          {ADIANTE.map(([t, d]) => (
            <li key={t} className="bg-card px-7 py-8">
              <p className="cota uppercase opacity-70">a caminho</p>
              <p className="mt-3 text-[17px] font-extrabold tracking-[-0.015em] text-ink">{t}</p>
              <p className="mt-3 text-[15px] leading-[1.55] text-dim">{d}</p>
            </li>
          ))}
        </ul>
      </Revelar>

      <Origem folha="FL. 06/06" />

      <Chamada
        rotulo="Agendar a apresentação"
        folha="FL. 06/06"
        titulo="A melhor demonstração é o seu próprio pedido."
        texto="Quarenta minutos, sistema aberto, sem slide. Você escolhe o módulo que mais te interessa e a gente começa por ele."
        passos={[
          'Você diz onde dói mais hoje',
          'A gente abre o módulo que resolve aquilo',
          'Você vê o pedido inteiro atravessar o sistema',
        ]}
      />
    </>
  )
}
