import Abertura from '../components/Abertura.jsx'
import Contraste from '../components/Contraste.jsx'
import Faq from '../components/Faq.jsx'
import Orcamento from '../ferramentas/Orcamento.jsx'
import Preco from './Preco.jsx'
import { Chamada, Origem, Secao } from '../components/Comum.jsx'
import { CONFIG, acaoComecar, precoVidracaria } from '../config.js'
import { destinoComecar } from '../lib/paginasSeo.js'
import { useIdioma } from '../i18n/idioma.jsx'
import { evento } from '../lib/rastreio.js'

export default function Vidracaria() {
  const { idioma, c } = useIdioma()
  const t = c.vidracaria
  const preco = precoVidracaria(idioma)
  const { diasTeste } = CONFIG.vidracaria
  const folhas = preco ? '09' : '08'
  const acao = preco ? destinoComecar(acaoComecar(idioma, c), idioma) : undefined

  return (
    <>
      <Abertura
        tela="design"
        acao={
          acao
            ? { rotulo: acao.rotulo, href: acao.href, externo: acao.externo }
            : { rotulo: t.hero.verOrcamento, href: '#orcamento', externo: false, fantasma: true, evento: 'ver' }
        }
        acaoSecundaria={{
          rotulo: t.hero.verSistema,
          href: '#orcamento',
          externo: false,
          evento: 'ver',
        }}
        zap={false}
        rotulo={t.hero.rotulo}
        folha={`FL. 01/${folhas}`}
        origem="abertura-vidracaria"
        etiqueta={t.hero.etiqueta}
        titulo={
          <>
            {t.hero.titulo.antes} <span className="marca">{t.hero.titulo.destaque}</span>
          </>
        }
        texto={t.hero.texto}
      />

      <Secao titulo={t.memoria.titulo} texto={t.memoria.texto} />

      <Secao
        id="orcamento"
        rotulo={t.demo.rotulo}
        folha={`FL. 02/${folhas}`}
        titulo={t.demo.titulo}
        texto={t.demo.texto}
        nota={t.demo.micro}
        largo
      >
        <div className="mx-auto mt-10 w-full max-w-[1040px]">
          <Orcamento />
        </div>
        {preco && acao && (
          <div className="coluna">
            <div className="cartao mt-8 px-6 py-6">
              <a
                href={acao.href}
                onClick={() => evento('comecar', { origem: 'apos-orcamento' })}
                className="botao-marca w-full"
              >
                {acao.rotulo}
              </a>
              <p className="cota mt-3 normal-case">{c.comecar.formulario.aviso}</p>
            </div>
          </div>
        )}
      </Secao>

      <Contraste
        rotulo={t.contraste.rotulo}
        folha={`FL. 03/${folhas}`}
        titulo={t.contraste.titulo}
        hoje={t.contraste.hoje}
        pares={t.contraste.pares}
      />

      <Secao rotulo={t.dia.rotulo} folha={`FL. 04/${folhas}`} titulo={t.dia.titulo}>
        <ol className="mt-10 space-y-8 text-left">
          {t.dia.horas.map(([hora, titulo, texto]) => (
            <li key={hora} className="relative pl-6">
              <span aria-hidden="true" className="absolute bottom-0 left-0 top-1 w-px bg-line" />
              <span aria-hidden="true" className="absolute left-0 top-1 h-3 w-px" style={{ background: '#0e8c6a' }} />
              <p className="cota uppercase" style={{ color: '#0e8c6a', opacity: 1 }}>
                {hora}
              </p>
              <h3 className="titulo-bloco mt-2">{titulo}</h3>
              <p className="texto-bloco mt-2">{texto}</p>
            </li>
          ))}
        </ol>
      </Secao>

      <Secao rotulo={t.resultados.rotulo} folha={`FL. 05/${folhas}`} titulo={t.resultados.titulo}>
        <ul className="cartao mt-10 overflow-hidden">
          {t.resultados.itens.map(([nome, texto], i) => (
            <li key={nome} className={`px-6 py-6 ${i ? 'border-t border-line' : ''}`}>
              <p className="titulo-bloco">{nome}</p>
              <p className="texto-bloco mx-auto mt-2 max-w-[36ch]">{texto}</p>
            </li>
          ))}
        </ul>
      </Secao>

      <Origem folha={`FL. 06/${folhas}`} />
      <Preco folha={`FL. 07/${folhas}`} />
      <Faq rotulo={t.faq.rotulo} folha={`FL. 08/${folhas}`} titulo={t.faq.titulo} itens={t.faq.itens} />

      {preco ? (
        <Chamada
          rotulo={t.chamada.rotulo}
          folha={`FL. 09/${folhas}`}
          titulo={t.chamada.titulo}
          texto={t.chamada.texto(diasTeste)}
          passos={t.chamada.passos}
          zap={false}
          convite={acao && { href: acao.href, rotulo: acao.rotulo, nota: c.comecar.formulario.aviso }}
        />
      ) : (
        <Chamada
          rotulo={t.chamadaDemo.rotulo}
          folha={`FL. 08/${folhas}`}
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
