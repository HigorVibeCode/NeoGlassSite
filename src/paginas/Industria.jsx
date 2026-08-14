import Abertura from '../components/Abertura.jsx'
import Jornada from '../jornada/Jornada.jsx'
import Retalho from '../ferramentas/Retalho.jsx'
import { Bloco, Chamada, Origem, Revelar } from '../components/Comum.jsx'
import { useTextos } from '../i18n/idioma.jsx'

export default function Industria() {
  // Toda a copy desta página mora em `conteudo/areas/industria.<idioma>.js`.
  // Aqui fica só a arquitetura: qual seção vem antes de qual, e o que é
  // numeração de prancha (FL. 0x/06), que não muda de idioma.
  const t = useTextos().industria

  return (
    <>
      <Abertura
        telas={['corte', 'producao']}
        zap={false}
        /* O botão da abertura NÃO abre mais a agenda.
           Pedir reunião a quem acabou de chegar é cobrar antes de entregar: o
           visitante ainda não viu nada que prove que vale a pena. Agora ele
           desce para a demonstração — três chapas virando duas, com o dinheiro
           no fim — e a agenda espera lá embaixo, depois da prova. */
        acao={{ rotulo: t.hero.verOtimizacao, href: '#otimizador', externo: false }}
        rotulo={t.hero.rotulo}
        folha="FL. 01/04"
        origem="abertura-industria"
        etiqueta={t.hero.etiqueta}
        /* O título é uma frase só com metade em gradiente, e a divisão fica no
           conteúdo, não aqui: em português o destaque cai em "é lucro", em
           alemão a mesma força só existe no fim da frase, depois da oração
           relativa. Montar o JSX aqui, com as duas chaves, é o que deixa cada
           idioma escolher onde o verde entra. */
        titulo={
          <>
            {t.hero.titulo.antes} <span className="marca">{t.hero.titulo.destaque}</span>
          </>
        }
        texto={t.hero.texto}
        marcas={t.hero.marcas}
      />

      {/* A demonstração vem ANTES do filme de propósito. Ela era a quarta
          tela de rolagem: o visitante tinha que atravessar a abertura e
          vinte e cinco segundos de filme para só então poder tocar em
          alguma coisa. O momento em que ele aperta um botão e vê três
          chapas virarem duas é o único ponto da página que arranca um
          "isso é para mim" — e ele estava enterrado. O filme continua
          logo abaixo, para quem já quer o resto da história. */}
      <Revelar
        as="section"
        id="otimizador"
        className="secao mx-auto max-w-[1240px] px-5 pb-24 sm:px-8 sm:pb-32"
      >
        <Bloco rotulo={t.demo.rotulo} folha="FL. 02/04" />
        <h2 className="display mx-auto mt-7 max-w-[20ch] text-center text-[clamp(28px,4vw,50px)]">{t.demo.titulo}</h2>
        <p className="mx-auto mt-5 max-w-[58ch] text-center text-[16.5px] leading-[1.55] text-dim">{t.demo.texto}</p>

        <div className="mt-10">
          <Retalho />
        </div>
      </Revelar>


      {/* `comNeoGlass` não vai daqui: o cabeçalho da coluna da direita é o
          mesmo nas duas páginas que usam este componente, e o padrão dele sai
          do tronco comum do idioma. Ver Contraste.jsx. */}

      <Origem folha="FL. 03/04" />

      <Chamada
        rotulo={t.chamada.rotulo}
        folha="FL. 04/04"
        titulo={t.chamada.titulo}
        texto={t.chamada.texto}
        passos={t.chamada.passos}
        agenda
      />
    </>
  )
}
