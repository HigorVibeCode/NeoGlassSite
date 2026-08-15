import Abertura from '../components/Abertura.jsx'
import Faq from '../components/Faq.jsx'
import Retalho from '../ferramentas/Retalho.jsx'
import { Chamada, Origem, Secao } from '../components/Comum.jsx'
import { useTextos } from '../i18n/idioma.jsx'

export default function Industria() {
  const t = useTextos().industria

  return (
    <>
      <Abertura
        telas={['corte', 'producao']}
        zap={false}
        acao={{ rotulo: t.hero.verOtimizacao, href: '#otimizador', externo: false, evento: 'ver' }}
        rotulo={t.hero.rotulo}
        folha="FL. 01/08"
        origem="abertura-industria"
        etiqueta={t.hero.etiqueta}
        titulo={
          <>
            {t.hero.titulo.antes} <span className="marca">{t.hero.titulo.destaque}</span>
          </>
        }
        texto={t.hero.texto}
      />

      <Secao
        id="otimizador"
        rotulo={t.demo.rotulo}
        folha="FL. 02/08"
        titulo={t.demo.titulo}
        texto={t.demo.texto}
        nota={t.demo.nota}
      >
        <div className="mt-10">
          <Retalho />
        </div>
      </Secao>

      <Secao rotulo={t.producao.rotulo} folha="FL. 03/08" titulo={t.producao.titulo}>
        <ol className="mt-10 text-left">
          {t.producao.etapas.map((nome, i) => (
            <li key={nome} className="relative pl-12 pb-8 last:pb-0">
              {i < t.producao.etapas.length - 1 && (
                <span aria-hidden="true" className="absolute bottom-0 left-[15px] top-10 w-px bg-line" />
              )}
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-soft font-mono text-[13px] font-bold text-verde"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="titulo-bloco pt-1">{nome}</p>
            </li>
          ))}
        </ol>
      </Secao>

      <Secao rotulo={t.rastreio.rotulo} folha="FL. 04/08" titulo={t.rastreio.titulo}>
        <dl className="cartao mt-10 overflow-hidden text-left">
          {t.rastreio.campos.map(([rotulo, valor], i) => (
            <div key={rotulo} className={`flex items-baseline justify-between gap-6 px-5 py-4 ${i ? 'border-t border-line' : ''}`}>
              <dt className="cota uppercase">{rotulo}</dt>
              <dd className="text-[16px] font-extrabold text-ink">{valor}</dd>
            </div>
          ))}
        </dl>
      </Secao>

      <Secao rotulo={t.financeiro.rotulo} folha="FL. 05/08" titulo={t.financeiro.titulo}>
        <ul className="cartao mt-10 overflow-hidden">
          {t.financeiro.linhas.map(([nome, texto], i) => (
            <li key={nome} className={`px-6 py-5 ${i ? 'border-t border-line' : ''}`}>
              <p className="titulo-bloco">{nome}</p>
              <p className="texto-bloco mt-1">{texto}</p>
            </li>
          ))}
        </ul>
      </Secao>

      <Origem folha="FL. 06/08" />
      <Faq rotulo={t.faq.rotulo} folha="FL. 07/08" titulo={t.faq.titulo} itens={t.faq.itens} />
      <Chamada
        rotulo={t.chamada.rotulo}
        folha="FL. 08/08"
        titulo={t.chamada.titulo}
        texto={t.chamada.texto}
        passos={t.chamada.passos}
        agenda
      />
    </>
  )
}
