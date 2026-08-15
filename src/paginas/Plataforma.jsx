import Abertura from '../components/Abertura.jsx'
import Fluxo from '../components/Fluxo.jsx'
import { Bloco, Chamada, Origem, Revelar } from '../components/Comum.jsx'
import { Tela } from '../jornada/conteudos.jsx'
import { useTextos } from '../i18n/idioma.jsx'

/**
 * O texto desta página mora em `conteudo/areas/plataforma.<idioma>.js`. Aqui
 * fica só a forma: o que é lista, o que é título, onde entra o gradiente da
 * marca.
 */
export default function Plataforma() {
  const t = useTextos().plataforma

  return (
    <>
      {/* O leque de telas veio da home, a pedido do dono. Ele estava lá embaixo
          de uma bifurcação — antes de a pessoa ter dito quem é. Aqui ele chega
          na hora certa: esta é a página de quem clicou em "ainda tenho
          dúvidas", e a primeira dúvida é "isso existe mesmo?". Três telas de
          verdade, trocando sozinhas, respondem isso antes de qualquer frase.
          Entra no lugar da tela parada de pedidos — que é a primeira do leque,
          então nada se perdeu. */}
      <Abertura
        telas={['pedidos', 'corte', 'design']}
        rotulo={t.hero.rotulo}
        folha="FL. 01/08"
        origem="abertura-plataforma"
        etiqueta={t.hero.etiqueta}
        titulo={
          <>
            {t.hero.titulo.antes} <span className="marca">{t.hero.titulo.destaque}</span>
          </>
        }
        texto={t.hero.texto}
        marcas={t.hero.marcas}
      />

      {/* O filme de seis telas veio da Indústria. Ele conta um pedido andando
          de ponta a ponta — que é justamente o que esta página vende, e o que
          a Indústria já mostrava de outro jeito no otimizador. */}
      <Fluxo folha="FL. 02/08" />


      <Revelar as="section" className="secao mx-auto max-w-[1240px] px-5 pb-24 sm:px-8 sm:pb-32">
        <Bloco rotulo={t.devolve.rotulo} folha="FL. 03/08" />
        <h2 className="display mt-7 max-w-[19ch] text-[clamp(30px,4.4vw,54px)]">
          {t.devolve.titulo}
        </h2>

        <dl className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2">
          {t.devolve.itens.map(([titulo, d], i) => (
            <div key={titulo} className="border-t border-line pt-6">
              <p className="cota uppercase opacity-70">{String(i + 1).padStart(2, '0')}</p>
              <dt className="display mt-3 text-[clamp(22px,2.4vw,30px)]">{titulo}</dt>
              <dd className="mt-3 max-w-[46ch] text-[15.5px] leading-[1.6] text-dim">{d}</dd>
            </div>
          ))}
        </dl>
      </Revelar>

      <Revelar as="section" className="secao mx-auto max-w-[1240px] px-5 pb-24 sm:px-8 sm:pb-32">
        <Bloco rotulo={t.modulos.rotulo} folha="FL. 04/08" />
        <h2 className="display mt-7 max-w-[17ch] text-[clamp(30px,4.4vw,54px)]">
          {t.modulos.titulo}
        </h2>

        <ul className="mt-12 overflow-hidden rounded-[22px] border border-line bg-card">
          {t.modulos.lista.map(([n, nome, oque], i) => (
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
                {t.modulos.selo}
              </span>
            </li>
          ))}
        </ul>
      </Revelar>

      <Revelar as="section" className="secao mx-auto max-w-[1240px] px-5 pb-24 sm:px-8 sm:pb-32">
        <Bloco rotulo={t.aparelhos.rotulo} folha="FL. 05/08" />
        <h2 className="display mt-7 max-w-[18ch] text-[clamp(30px,4.4vw,54px)]">
          {t.aparelhos.titulo}
        </h2>

        <div className="mt-14 grid gap-12 sm:grid-cols-3 sm:gap-8">
          {t.aparelhos.lista.map(([tipo, titulo, texto]) => (
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
        <Bloco rotulo={t.adiante.rotulo} folha="FL. 06/08" />
        <h2 className="display mt-7 max-w-[20ch] text-[clamp(30px,4.4vw,54px)]">
          {t.adiante.titulo}
        </h2>
        <ul className="mt-12 grid gap-px overflow-hidden rounded-[20px] bg-line sm:grid-cols-3">
          {t.adiante.itens.map(([titulo, d]) => (
            <li key={titulo} className="bg-card px-7 py-8">
              <p className="cota uppercase opacity-70">{t.adiante.selo}</p>
              <p className="mt-3 text-[17px] font-extrabold tracking-[-0.015em] text-ink">
                {titulo}
              </p>
              <p className="mt-3 text-[15px] leading-[1.55] text-dim">{d}</p>
            </li>
          ))}
        </ul>
      </Revelar>

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
