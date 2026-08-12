import Abertura from '../components/Abertura.jsx'
import Contraste from '../components/Contraste.jsx'
import Jornada from '../jornada/Jornada.jsx'
import Retalho from '../ferramentas/Retalho.jsx'
import { Bloco, Chamada, Origem, Revelar } from '../components/Comum.jsx'

const PARES = [
  ['A sobra boa encosta no cavalete e some do controle', 'Volta ao estoque com medida, cor e cavalete'],
  ['“Onde está meu pedido?” — alguém desce até a fábrica', 'Fase, hora e responsável na tela'],
  ['O preço sai da experiência do vendedor', 'O preço sai da tabela; a margem fecha por pedido'],
  ['A medida errada aparece com o vidro já temperado', 'O sistema acusa o fora de esquadro antes de cortar'],
  ['O plano é redesenhado no CAD, com a mesa parada', 'Sai em DXF, G-code, ASC ou CNI+FBT'],
]

export default function Industria() {
  return (
    <>
      <Abertura
        rotulo="NeoGlass · indústria do vidro plano"
        folha="FL. 01/06"
        origem="abertura-industria"
        etiqueta="Uma tela do sistema, ao vivo"
        titulo={
          <>
            A chapa entra inteira. <span className="marca">Nada dela se perde.</span>
          </>
        }
        texto="Do orçamento tirado na obra ao plano que entra na mesa de corte. E o pedaço que sobra volta ao cavalete com medida, cor e endereço — para disputar a próxima chapa."
        marcas={[
          ['90,8%', 'de aproveitamento no plano'],
          ['6', 'etapas, da obra à margem'],
          ['0', 'licença por posto'],
        ]}
      />

      <Jornada />

      <Revelar as="section" className="secao mx-auto max-w-[1240px] px-5 pb-24 sm:px-8 sm:pb-32">
        <Bloco rotulo="Demonstração · o cavalete antes da chapa" folha="FL. 03/06" />
        <h2 className="display mt-7 max-w-[18ch] text-[clamp(30px,4.4vw,54px)]">
          Antes de abrir vidro novo, olhe o que já está encostado.
        </h2>
        <p className="mt-5 max-w-[62ch] text-[16.5px] leading-[1.55] text-dim">
          Três cliques, um pedido real de 20 peças. Você aperta otimizar, o plano nasce — e é aí
          que o sistema avisa que achou retalho no cavalete que serve. Aperte o segundo botão e
          veja a conta. Tudo roda aqui no seu navegador, com um otimizador de verdade.
        </p>

        <div className="mt-10">
          <Retalho />
        </div>
      </Revelar>

      <Contraste
        rotulo="O que muda no chão de fábrica"
        folha="FL. 04/06"
        titulo="A diferença aparece na segunda-feira."
        hoje="Hoje, sem sistema de vidro"
        pares={PARES}
      />

      <Origem folha="FL. 05/06" />

      <Chamada
        rotulo="Agendar a apresentação"
        folha="FL. 06/06"
        titulo="Traga um pedido seu. A gente monta na sua frente."
        texto="A apresentação é com o sistema aberto, não com slide. Se no fim não fizer sentido para a sua operação, você perdeu quarenta minutos e ganhou um diagnóstico."
        passos={[
          'Você mostra um pedido seu, real',
          'A gente monta ele no sistema, ao vivo',
          'Você vê o plano de corte sair no fim',
        ]}
      />
    </>
  )
}
