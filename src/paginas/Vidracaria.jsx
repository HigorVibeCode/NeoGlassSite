import Abertura from '../components/Abertura.jsx'
import Orcamento from '../ferramentas/Orcamento.jsx'
import Preco from './Preco.jsx'
import { Bloco, Chamada, Origem, Revelar } from '../components/Comum.jsx'
import { CONFIG, acaoComecar, precoVidracaria } from '../config.js'
import { destinoComecar } from '../lib/paginasSeo.js'
import { useIdioma } from '../i18n/idioma.jsx'
import { evento } from '../lib/rastreio.js'

function Dia({ folha, t }) {
  return (
    <Revelar as="section" className="secao mx-auto max-w-[1240px] px-5 pb-24 sm:px-8 sm:pb-32">
      <Bloco rotulo={t.rotulo} folha={folha} />
      <h2 className="display mt-7 max-w-[19ch] text-[clamp(30px,4.4vw,54px)]">{t.titulo}</h2>

      <ol className="mt-14 grid gap-y-10 lg:grid-cols-4 lg:gap-x-8">
        {t.horas.map(([hora, titulo, texto]) => (
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
  const { idioma, c } = useIdioma()
  const t = c.vidracaria
  const preco = precoVidracaria(idioma)
  const { diasTeste } = CONFIG.vidracaria
  const folhas = preco ? '05' : '04'

  const acao = preco ? destinoComecar(acaoComecar(idioma, c), idioma) : undefined

  /* O preço NÃO aparece mais na abertura.
     Ele ficava numa linha discreta logo abaixo dos botões — ou seja, o
     visitante via o número antes de ver uma única coisa que o sistema faz. Não
     dá para achar caro ou barato o que ainda não tem valor associado; a única
     leitura possível era "mais um software com mensalidade". Agora ele aparece
     na seção de preço, depois da demonstração, do dia inteiro e do contraste —
     quando já existe algo contra o que comparar. */
  const nota = undefined

  return (
    <>
      <Abertura
        tela="design"
        /* A abertura não pede nada. O botão desce até a animação do vão, em
           contorno e sem o verde da marca: ele guia sem disputar com o título.
           O teste grátis — esse sim em verde — só aparece DEPOIS da animação,
           quando a pessoa acabou de ver o PDF sair com a logo dela. */
        acao={{ rotulo: t.hero.verOrcamento, href: '#orcamento', externo: false, fantasma: true }}
        // O WhatsApp não é canal da vidraçaria — ver Abertura.jsx.
        zap={false}
        rotulo={t.hero.rotulo}
        folha={`FL. 01/${folhas}`}
        origem="abertura-vidracaria"
        etiqueta={t.hero.etiqueta}
        nota={nota}
        // O gradiente da marca não cai na mesma palavra em todo idioma, então o
        // título vem partido do conteúdo e é remontado aqui.
        titulo={
          <>
            {t.hero.titulo.antes} <span className="marca">{t.hero.titulo.destaque}</span>
          </>
        }
        texto={t.hero.texto}
      />

      {/* A memória da venda: o primeiro argumento da página, antes da
          demonstração. Bloco curto de propósito — ele existe para ser lido de
          uma vez, não para ser estudado. */}
      <Revelar as="section" className="secao mx-auto max-w-[1240px] px-5 pb-16 sm:px-8">
        <div className="mx-auto max-w-[42ch] border-t border-line pt-8 text-center">
          <h2 className="display text-[clamp(24px,3.4vw,38px)] leading-[1.1]">
            {t.memoria.titulo}
          </h2>
          <p className="mt-4 text-[16.5px] leading-[1.55] text-dim">{t.memoria.texto}</p>
        </div>
      </Revelar>

      <Revelar
        as="section"
        id="orcamento"
        className="secao mx-auto max-w-[1240px] px-5 pb-24 sm:px-8 sm:pb-32"
      >
        <Bloco rotulo={t.demo.rotulo} folha={`FL. 02/${folhas}`} />
        <h2 className="display mt-7 max-w-[20ch] text-[clamp(30px,4.4vw,54px)]">{t.demo.titulo}</h2>
        {/* O parágrafo de apoio saiu daqui. Ele repetia o que o próprio botão
            já anuncia e ainda prometia um cronômetro que ninguém pediu. O
            título entrega a promessa e a demonstração faz o resto — quem chega
            até aqui quer apertar, não ler mais um parágrafo. */}

        <div className="mt-10">
          <Orcamento />
        </div>

        {/* A oferta, agora que ela foi merecida. Este é o primeiro botão verde
            da página: antes daqui o visitante não tinha visto nada que
            justificasse cadastrar-se. */}
        {preco && acao && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 rounded-[20px] border border-line bg-soft/50 px-6 py-6 text-center">
            <a
              href={acao.href}
              onClick={() => evento('comecar', { origem: 'apos-orcamento' })}
              className="botao-marca px-7 py-3.5 text-[15px] transition-transform duration-200 hover:-translate-y-0.5"
            >
              {acao.rotulo}
            </a>
            <p className="cota max-w-[38ch] normal-case leading-snug">
              {c.comecar.formulario.aviso}
            </p>
          </div>
        )}
      </Revelar>



      <Preco folha={`FL. 03/${folhas}`} />

      <Origem folha={preco ? 'FL. 04/05' : 'FL. 03/04'} />

      {preco ? (
        <Chamada
          rotulo={t.chamada.rotulo}
          folha="FL. 05/05"
          titulo={t.chamada.titulo}
          // A emenda entre o parágrafo e a frase do teste é diferente em cada
          // idioma, então o `if` mora no conteúdo e daqui só vai o número.
          texto={t.chamada.texto(diasTeste)}
          passos={t.chamada.passos}
          zap={false}
          convite={
            acao && { href: acao.href, rotulo: acao.rotulo, nota: c.comecar.formulario.aviso }
          }
        />
      ) : (
        <Chamada
          rotulo={t.chamadaDemo.rotulo}
          folha="FL. 04/04"
          titulo={t.chamadaDemo.titulo}
          texto={t.chamadaDemo.texto}
          passos={t.chamadaDemo.passos}
          zap={false}
          agenda
        />
      )}
    </>
  )
}
