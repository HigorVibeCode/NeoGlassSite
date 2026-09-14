import { Revelar } from '../components/Comum.jsx'
import { useIdioma } from '../i18n/idioma.jsx'
import { caminhoDe } from '../lib/paginasSeo.js'
import { evento } from '../lib/rastreio.js'
import SimuladorPartner from '../components/SimuladorPartner.jsx'

export default function Partner() {
  const { idioma, c } = useIdioma()
  const t = c.partner
  const contato = caminhoDe('partnerCadastro', idioma)

  const aoContatar = () => evento('partner_cadastro_inicio', { origem: 'partner' })

  return (
    <>
      <section className="mx-auto grid min-h-[min(760px,100svh)] max-w-[1240px] items-center gap-12 px-5 pb-20 pt-[150px] sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(360px,.8fr)] lg:gap-20 lg:pt-[115px]">
        <div>
          <p className="cota uppercase">NeoGlass Partner · {t.hero.rotulo}</p>
          <h1 className="display mt-6 max-w-[16ch] text-[clamp(34px,5.3vw,68px)] leading-[1.02]">
            {t.hero.titulo} <span className="marca">{t.hero.destaque}</span>
          </h1>
          <p className="mt-7 max-w-[48ch] text-[17px] leading-relaxed text-dim">{t.hero.texto}</p>
          <a href={contato} onClick={aoContatar} className="botao-marca mt-9 inline-flex px-7 py-3.5 text-[15px]">
            {t.hero.acao}
          </a>
          <p className="mt-4 max-w-[49ch] text-[13px] leading-relaxed text-dim">{t.hero.nota}</p>
        </div>

        <div className="relative overflow-hidden rounded-[24px] border border-line bg-card p-6 shadow-[0_35px_75px_-50px_rgba(15,37,48,.55)] sm:p-9">
          <span aria-hidden="true" className="absolute -right-14 -top-14 h-52 w-52 rounded-full border border-verde/15" />
          <p className="cota uppercase">{t.mapa.rotulo}</p>
          <ol className="mt-8 border-l-2 border-verde/25 pl-7">
            {t.mapa.etapas.map((etapa, i) => (
              <li key={etapa.nome} className="relative pb-8 last:pb-0">
                <span aria-hidden="true" className="absolute -left-[36px] top-0 flex h-4 w-4 items-center justify-center rounded-full border-[3px] border-card bg-verde" />
                <p className="font-mono text-[11px] font-bold tracking-wider text-verde">{String(i + 1).padStart(2, '0')}</p>
                <h2 className="mt-1 text-[17px] font-extrabold text-ink">{etapa.nome}</h2>
                <p className="mt-1 text-[13.5px] leading-relaxed text-dim">{etapa.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Revelar as="section" className="mx-auto max-w-[1240px] px-5 pb-10 sm:px-8 sm:pb-16">
        <div className="mx-auto max-w-[62ch] text-center">
          <p className="cota uppercase">{t.oferta.rotulo}</p>
          <h2 className="display mt-5 text-[clamp(28px,4vw,46px)] leading-[1.08]">{t.oferta.titulo}</h2>
          <p className="mt-5 text-[16px] leading-relaxed text-dim">{t.oferta.texto}</p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {t.oferta.publicos.map((publico) => (
            <a key={publico.rota} href={caminhoDe(publico.rota, idioma)} className="group rounded-[20px] border border-line bg-card px-6 py-7 transition-colors hover:border-verde/50 sm:px-8">
              <p className="cota uppercase">{publico.rotulo}</p>
              <h3 className="display mt-4 text-[22px] leading-tight">{publico.nome}</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-dim">{publico.texto}</p>
              <span className="mt-5 inline-block text-[13px] font-extrabold text-verde group-hover:underline">{t.oferta.verPagina} ↗</span>
            </a>
          ))}
        </div>
        <p className="mx-auto mt-7 max-w-[75ch] text-center text-[14px] leading-relaxed text-dim">{t.oferta.apoio}</p>
      </Revelar>

      <SimuladorPartner contato={contato} aoContatar={aoContatar}/>

      <Revelar as="section" className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-[64ch] text-center">
          <p className="cota uppercase">{t.modelo.rotulo}</p>
          <h2 className="display mt-5 text-[clamp(28px,4vw,48px)] leading-[1.08]">{t.modelo.titulo}</h2>
          <p className="mt-5 text-[16px] leading-relaxed text-dim">{t.modelo.texto}</p>
        </div>
        <div className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.modelo.itens.map((item) => (
            <article key={item.valor} className="rounded-[19px] border border-line bg-card px-6 py-7">
              <p className="display text-[clamp(30px,3.4vw,42px)] leading-none text-verde">{item.valor}</p>
              <h3 className="mt-5 text-[16px] font-extrabold text-ink">{item.nome}</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-dim">{item.texto}</p>
            </article>
          ))}
        </div>
        <p className="mx-auto mt-7 max-w-[83ch] text-center text-[13px] leading-relaxed text-dim">{t.modelo.condicoes}</p>
      </Revelar>

      <Revelar as="section" id="partner-contato" className="mx-auto max-w-[1240px] px-5 pb-24 pt-12 sm:px-8 sm:pb-28">
        <div className="rounded-[26px] border border-line bg-card px-6 py-10 text-center shadow-[0_30px_70px_-55px_rgba(15,37,48,.45)] sm:px-10 sm:py-16">
          <p className="cota uppercase">{t.fecho.rotulo}</p>
          <h2 className="display mx-auto mt-5 max-w-[22ch] text-[clamp(28px,4vw,46px)] leading-[1.08]">{t.fecho.titulo}</h2>
          <p className="mx-auto mt-5 max-w-[51ch] text-[16px] leading-relaxed text-dim">{t.fecho.texto}</p>
          <a href={contato} onClick={aoContatar} className="botao-marca mt-8 inline-flex px-7 py-3.5 text-[15px]">
            {t.fecho.acao}
          </a>
        </div>
      </Revelar>
    </>
  )
}
