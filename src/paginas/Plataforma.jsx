import Abertura from '../components/Abertura.jsx'
import Fluxo from '../components/Fluxo.jsx'
import { Chamada, Origem, Secao } from '../components/Comum.jsx'
import { Tela } from '../jornada/conteudos.jsx'
import { useTextos } from '../i18n/idioma.jsx'

export default function Plataforma() {
  const t = useTextos().plataforma

  return (
    <>
      <Abertura
        tela="pedidos"
        rotulo={t.hero.rotulo}
        folha="FL. 01/08"
        origem="abertura-plataforma"
        etiqueta={t.hero.etiqueta}
        acao={{ rotulo: t.hero.verSistema, href: '#fluxo', externo: false, evento: 'ver' }}
        titulo={
          <>
            {t.hero.titulo.antes} <span className="marca">{t.hero.titulo.destaque}</span>
          </>
        }
        texto={t.hero.texto}
      />

      <Fluxo folha="FL. 02/08" />

      <Secao rotulo={t.devolve.rotulo} folha="FL. 03/08" titulo={t.devolve.titulo}>
        <dl className="mt-10 grid gap-8">
          {t.devolve.itens.map(([titulo, d], i) => (
            <div key={titulo} className="border-t border-line pt-6">
              <p className="cota uppercase opacity-70">{String(i + 1).padStart(2, '0')}</p>
              <dt className="titulo-bloco mt-3">{titulo}</dt>
              <dd className="texto-secao mt-3">{d}</dd>
            </div>
          ))}
        </dl>
      </Secao>

      <Secao rotulo={t.modulos.rotulo} folha="FL. 04/08" titulo={t.modulos.titulo} texto={t.modulos.texto}>
        <ul className="cartao mt-10 overflow-hidden">
          {t.modulos.lista.map(([n, nome, oque], i) => (
            <li key={n} className={`px-6 py-6 ${i ? 'border-t border-line' : ''}`}>
              <p className="cota uppercase opacity-60">{n}</p>
              <p className="titulo-bloco mt-2">{nome}</p>
              <p className="texto-bloco mx-auto mt-2 max-w-[36ch]">{oque}</p>
              <p className="cota mt-2 uppercase" style={{ color: '#0e8c6a', opacity: 1 }}>
                {t.modulos.selo}
              </p>
            </li>
          ))}
        </ul>
      </Secao>

      <Secao rotulo={t.aparelhos.rotulo} folha="FL. 05/08" titulo={t.aparelhos.titulo} texto={t.aparelhos.texto}>
        <div className="mt-10 grid gap-12">
          {t.aparelhos.lista.map(([tipo, titulo, texto]) => (
            <div key={tipo}>
              <div className="mx-auto h-[210px]" aria-hidden="true">
                <Tela tipo={tipo} />
              </div>
              <h3 className="titulo-bloco mt-6">{titulo}</h3>
              <p className="texto-bloco mx-auto mt-2 max-w-[32ch]">{texto}</p>
            </div>
          ))}
        </div>
      </Secao>

      <Secao rotulo={t.adiante.rotulo} folha="FL. 06/08" titulo={t.adiante.titulo}>
        <div className="mt-10 grid gap-8">
          {t.adiante.grupos.map((grupo) => (
            <div key={grupo.selo}>
              <p className="cota uppercase">{grupo.selo}</p>
              <ul className="cartao mt-3 overflow-hidden">
                {grupo.itens.map(([titulo, d]) => (
                  <li key={titulo} className="border-t border-line px-6 py-6 first:border-t-0">
                    <p className="titulo-bloco">{titulo}</p>
                    <p className="texto-bloco mx-auto mt-2 max-w-[36ch]">{d}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Secao>

      <Origem folha="FL. 07/08" />
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
