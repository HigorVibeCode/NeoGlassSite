import Abertura from '../components/Abertura.jsx'
import IntelligenceIndustria, { EVENTO_INTELLIGENCE } from '../components/IntelligenceIndustria.jsx'
import { Chamada, Revelar } from '../components/Comum.jsx'
import { useTextos } from '../i18n/idioma.jsx'

/** Intelligence é a entrada industrial; a demonstração expõe o fluxo real das consultas. */
export default function Industria() {
  const t = useTextos().industria

  return (
    <>
      <Abertura
        palco={<IntelligenceIndustria />}
        centro
        zap={false}
        acao={{
          rotulo: t.hero.verProjeto,
          href: '#intelligence-demo',
          externo: false,
          fantasma: true,
          dispara: EVENTO_INTELLIGENCE,
        }}
        rotulo={t.hero.rotulo}
        folha="FL. 01/03"
        origem="abertura-industria"
        etiqueta={t.hero.etiqueta}
        titulo={
          <>
            {t.hero.titulo.antes} <span className="marca">{t.hero.titulo.destaque}</span>
          </>
        }
        texto={t.hero.texto}
      />

      <Revelar as="section" className="secao mx-auto max-w-[1240px] px-5 pb-20 sm:px-8 sm:pb-24">
        <div className="mx-auto mt-8 max-w-[58ch] text-center">
          <p className="cota uppercase">{t.diferenciais.rotulo}</p>
          <h2 className="display mt-5 text-[clamp(26px,3.8vw,44px)] leading-[1.08]">{t.diferenciais.titulo}</h2>
        </div>
        <div className="mx-auto mt-10 grid max-w-[1020px] gap-4 md:grid-cols-3">
          {t.diferenciais.itens.map((item) => (
            <article key={item.nome} className="rounded-[20px] border border-line bg-card px-6 py-7 shadow-[0_18px_45px_-35px_rgba(15,37,48,.35)]">
              <span aria-hidden="true" className="mb-5 block h-[3px] w-9 rounded-full bg-verde" />
              <h3 className="display text-[20px] leading-tight">{item.nome}</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-dim">{item.texto}</p>
            </article>
          ))}
        </div>
      </Revelar>

      {/* ── CHAMADA ────────────────────────────────────────────────────── */}
      <Chamada
        rotulo={t.chamada.rotulo}
        folha="FL. 03/03"
        titulo={t.chamada.titulo}
        texto={t.chamada.texto}
        passos={t.chamada.passos}
        agenda
      />
    </>
  )
}
