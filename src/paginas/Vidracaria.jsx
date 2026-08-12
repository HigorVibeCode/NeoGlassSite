import Abertura from '../components/Abertura.jsx'
import Contraste from '../components/Contraste.jsx'
import Orcamento from '../ferramentas/Orcamento.jsx'
import Preco from './Preco.jsx'
import { Bloco, Chamada, Origem, Revelar } from '../components/Comum.jsx'
import { CONFIG, linkWhatsapp, precoVidracaria } from '../config.js'

const DIA = [
  [
    '08:40',
    'Na obra',
    'Você mede o vão pelo celular, fotografa, escolhe espessura e cor. O preço monta com a sua tabela e o cliente assina ali, na tela.',
  ],
  [
    '11:20',
    'Na fábrica',
    'O pedido chega com as medidas de corte já descontadas das folgas. Ninguém redigita, ninguém liga para confirmar espessura.',
  ],
  [
    '15:00',
    'Na bancada',
    'Cada peça sai com etiqueta. O que sobrou da chapa volta ao estoque com medida — e disputa o próximo serviço em vez de encostar na parede.',
  ],
  [
    'sexta',
    'No fim da semana',
    'Você vê quais serviços deram margem e quais só deram trabalho. Um número, não uma planilha.',
  ],
]

const PARES = [
  ['O orçamento sai no caderno e some até segunda', 'Sai do celular com foto do vão e assinatura'],
  ['O cliente liga três vezes perguntando se ficou pronto', 'Ele acompanha o pedido por um link, sem ligar'],
  ['A sobra encosta atrás da bancada e vira lixo', 'Volta ao estoque com medida — e entra no próximo corte'],
  ['A medida errada só aparece na hora de instalar', 'O sistema acusa o fora de esquadro antes de cortar'],
  ['No fim do mês ninguém sabe qual serviço deu lucro', 'A margem de cada serviço fica na tela'],
]

function Dia({ folha }) {
  return (
    <Revelar as="section" className="secao mx-auto max-w-[1240px] px-5 pb-24 sm:px-8 sm:pb-32">
      <Bloco rotulo="Um dia, do começo ao fim" folha={folha} />
      <h2 className="display mt-7 max-w-[19ch] text-[clamp(30px,4.4vw,54px)]">
        Nada de novo no seu dia. Só o retrabalho que sai dele.
      </h2>

      <ol className="mt-14 grid gap-y-10 lg:grid-cols-4 lg:gap-x-8">
        {DIA.map(([hora, titulo, texto]) => (
          <li key={hora} className="relative min-w-0 pl-6 lg:pl-0 lg:pt-8">
            {/* a régua: horizontal no computador, vertical no celular */}
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-0 top-1 w-px bg-line lg:inset-x-0 lg:bottom-auto lg:top-0 lg:h-px lg:w-auto"
            />
            <span
              aria-hidden="true"
              className="absolute left-0 top-1 h-3 w-px lg:left-0 lg:top-0 lg:h-3 lg:w-px"
              style={{ background: '#0e8c6a' }}
            />
            <p className="cota uppercase" style={{ color: '#0e8c6a', opacity: 1 }}>
              {hora}
            </p>
            <h3 className="display mt-3 text-[21px]">{titulo}</h3>
            <p className="mt-2.5 max-w-[38ch] text-[15px] leading-[1.55] text-dim">{texto}</p>
          </li>
        ))}
      </ol>
    </Revelar>
  )
}

export default function Vidracaria() {
  // O preço só entra na página no dia em que ele existir no config. Enquanto
  // não existir, a aba volta a ser a de antes — nada quebra, nada some.
  const preco = precoVidracaria()
  const { diasTeste, cadastro } = CONFIG.vidracaria
  const folhas = preco ? '07' : '06'

  const acao = preco
    ? {
        rotulo: diasTeste > 0 ? `Começar grátis · ${diasTeste} dias` : 'Começar agora',
        href: cadastro || linkWhatsapp('Olá! Quero começar a usar o NeoGlass na minha vidraçaria.'),
        externo: !cadastro,
      }
    : undefined

  const nota = preco
    ? `${preco} por mês, por vidraçaria. Sem taxa de implantação, sem cobrança por usuário e sem fidelidade.`
    : undefined

  return (
    <>
      <Abertura
        rotulo="NeoGlass · para a vidraçaria"
        folha={`FL. 01/${folhas}`}
        origem="abertura-vidracaria"
        etiqueta="Uma tela do app, ao vivo"
        acao={acao}
        nota={nota}
        titulo={
          <>
            Se profissionalizar <span className="marca">sem complicar nada.</span>
          </>
        }
        texto="Você mede na obra, o cliente vê o preço na hora e assina na tela. O pedido nasce certo, a fábrica recebe a lista de corte pronta e, no fim do mês, você sabe qual serviço deu margem. Sem planilha, sem caderno, sem curso."
        marcas={[
          ['1 tarde', 'para estar rodando de verdade'],
          ['0', 'planilha para manter'],
          ['1', 'app — obra, bancada e escritório'],
        ]}
      />

      <Revelar as="section" className="secao mx-auto max-w-[1240px] px-5 pb-24 sm:px-8 sm:pb-32">
        <Bloco rotulo="Demonstração · do vão ao PDF, em 3 toques" folha={`FL. 02/${folhas}`} />
        <h2 className="display mt-7 max-w-[20ch] text-[clamp(30px,4.4vw,54px)]">
          Meça o vão. O orçamento sai antes de você voltar para a loja.
        </h2>
        <p className="mt-5 max-w-[62ch] text-[16.5px] leading-[1.55] text-dim">
          Tem um vão de janela já medido esperando por você. Aperte o botão e acompanhe: a janela
          se monta sobre a medida, o orçamento se preenche sozinho e o PDF sai com a sua marca. No
          fim, o próprio site diz quantos segundos aquilo levou.
        </p>

        <div className="mt-10">
          <Orcamento />
        </div>
      </Revelar>

      <Dia folha={`FL. 03/${folhas}`} />

      <Contraste
        rotulo="O que muda na sua semana"
        folha={`FL. 04/${folhas}`}
        titulo="Mesma equipe. Menos telefone."
        hoje="Hoje, no caderno e no WhatsApp"
        pares={PARES}
      />

      <Preco folha={`FL. 05/${folhas}`} />

      <Origem folha={preco ? 'FL. 06/07' : 'FL. 05/06'} />

      {preco ? (
        <Chamada
          rotulo="Começar"
          folha="FL. 07/07"
          titulo="Comece pelo próximo orçamento que entrar."
          texto={`Você cria a conta, põe a sua tabela de preços e monta o primeiro orçamento hoje mesmo. ${
            diasTeste > 0
              ? `São ${diasTeste} dias sem cartão e sem compromisso.`
              : 'Sem fidelidade: se não servir, você sai.'
          } Se preferir que a gente monte junto, é só chamar no WhatsApp.`}
          passos={[
            'Você cria a conta e põe o seu preço do m²',
            'Monta o próximo orçamento no app, na obra',
            'O cliente assina e o pedido nasce certo',
          ]}
        />
      ) : (
        <Chamada
          rotulo="Agendar a apresentação"
          folha="FL. 06/06"
          titulo="Traga um orçamento seu. A gente monta junto."
          texto="São quarenta minutos com o sistema aberto. Você mede um serviço de verdade, a gente monta na sua frente e você decide se aquilo cabe no seu dia."
          passos={[
            'Você traz um serviço que está em aberto',
            'A gente monta o orçamento no app, ao vivo',
            'Você vê o pedido chegar pronto na produção',
          ]}
        />
      )}
    </>
  )
}
