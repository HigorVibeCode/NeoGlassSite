import Abertura from '../components/Abertura.jsx'
import RetalhoLaco from '../components/RetalhoLaco.jsx'
import Retalho, { EVENTO_OTIMIZAR } from '../ferramentas/Retalho.jsx'
import { Chamada, Revelar } from '../components/Comum.jsx'
import { useTextos } from '../i18n/idioma.jsx'

/**
 * A página da indústria.
 *
 * Mesma arquitetura da vidraçaria, para o outro público:
 *
 *   HERO           — a promessa, com o laço da sobra rodando no alto
 *   RECONHECIMENTO — "esse é o meu prejuízo"
 *   PROVA          — o retalho reaproveitado, num clique só
 *   RESULTADO      — o que muda depois
 *   CHAMADA        — a apresentação, no fim, depois de tudo
 *
 * O que a vidraçaria vende é criar um projeto; o que a indústria vende é não
 * comprar chapa que já está no cavalete. A âncora saiu da calculadora de ROI
 * do próprio sistema: o retalho que ganha etiqueta e cadastro automáticos é o
 * único argumento com prêmio máximo e marcado como exclusivo — porque o
 * otimizador, o estoque e a etiqueta são o mesmo sistema.
 *
 * A "origem" (nasceu dentro de uma fábrica) saiu daqui: essa história agora
 * mora inteira na /plataforma, e repeti-la aqui seria dizer duas vezes.
 */
export default function Industria() {
  const t = useTextos().industria

  return (
    <>
      <Abertura
        /* No alto roda só o laço da sobra ganhando etiqueta — o gancho de cinco
           segundos. A conta da economia é a recompensa do botão, lá embaixo. */
        palco={<RetalhoLaco />}
        centro
        zap={false}
        /* O botão desce até a demonstração E dispara a otimização, no mesmo
           clique. Em contorno, sem o verde da marca: guia sem competir. */
        acao={{
          rotulo: t.hero.verOtimizacao,
          href: '#otimizador',
          externo: false,
          fantasma: true,
          dispara: EVENTO_OTIMIZAR,
        }}
        rotulo={t.hero.rotulo}
        folha="FL. 01/04"
        origem="abertura-industria"
        etiqueta={t.hero.etiqueta}
        titulo={
          <>
            {t.hero.titulo.antes} <span className="marca">{t.hero.titulo.destaque}</span>
          </>
        }
        texto={t.hero.texto}
      />

      {/* ── RECONHECIMENTO ─────────────────────────────────────────────── */}
      <Revelar as="section" className="secao mx-auto max-w-[1240px] px-5 pb-20 sm:px-8 sm:pb-24">
        <div className="mx-auto mt-8 max-w-[46ch] text-center">
          <h2 className="display text-[clamp(26px,3.8vw,44px)] leading-[1.08]">
            {t.reconhecimento.titulo}
          </h2>
          <p className="mt-5 text-[16.5px] leading-[1.55] text-dim">{t.reconhecimento.texto}</p>
          <p
            className="mt-7 rounded-[16px] border px-6 py-5 text-[15.5px] font-bold leading-snug text-ink"
            style={{ borderColor: 'rgba(14,140,106,.3)', background: 'rgba(14,140,106,.07)' }}
          >
            {t.reconhecimento.destaque}
          </p>
        </div>
      </Revelar>

      {/* ── PROVA ──────────────────────────────────────────────────────── */}
      <Revelar
        as="section"
        id="otimizador"
        className="secao mx-auto max-w-[1240px] px-5 pb-20 sm:px-8 sm:pb-24"
      >
        <div className="mx-auto mt-8 max-w-[50ch] text-center">
          <h2 className="display text-[clamp(26px,3.8vw,44px)] leading-[1.08]">{t.demo.titulo}</h2>
        </div>

        <div className="mt-10">
          <Retalho />
        </div>
      </Revelar>

      {/* ── RESULTADO ──────────────────────────────────────────────────── */}
      <Revelar as="section" className="secao mx-auto max-w-[1240px] px-5 pb-20 sm:px-8 sm:pb-24">
        <h2 className="display mx-auto mt-8 max-w-[22ch] text-center text-[clamp(26px,3.8vw,44px)] leading-[1.08]">
          {t.resultado.titulo}
        </h2>

        <dl className="mx-auto mt-10 grid max-w-[900px] gap-4 sm:grid-cols-3 sm:gap-5">
          {t.resultado.itens.map((item) => (
            <div key={item.nome} className="rounded-[18px] border border-line bg-card px-6 py-7 text-center">
              <span
                aria-hidden="true"
                className="mx-auto mb-4 block h-[3px] w-8 rounded-full"
                style={{ background: '#0e8c6a' }}
              />
              <dt className="display text-[19px] leading-tight">{item.nome}</dt>
              <dd className="mt-3 text-[14.5px] leading-[1.5] text-dim">{item.texto}</dd>
            </div>
          ))}
        </dl>
      </Revelar>

      {/* ── CHAMADA ────────────────────────────────────────────────────── */}
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
