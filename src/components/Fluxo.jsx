import { useEffect, useState } from 'react'
import { Bloco, Revelar } from './Comum.jsx'
import { useTextos } from '../i18n/idioma.jsx'
import { semMovimento } from '../lib/dispositivo.js'

/**
 * O mesmo pedido atravessando a operação inteira.
 *
 * Esta é a peça central do posicionamento: a NeoGlass não vende sete módulos,
 * vende o fato de que um pedido entra uma vez e acompanha tudo. Por isso o
 * cartão do pedido NUNCA some da tela nem troca de número — o que muda é só a
 * linha de estado embaixo dele e a etapa acesa em cima.
 *
 * Se o cartão desaparecesse entre uma etapa e outra, o desenho estaria dizendo
 * o contrário do que a frase diz.
 */
export default function Fluxo({ folha }) {
  const t = useTextos().fluxo
  const [etapa, setEtapa] = useState(0)
  const n = t.etapas.length

  useEffect(() => {
    if (semMovimento()) return
    const id = setInterval(() => setEtapa((e) => (e + 1) % n), 2800)
    return () => clearInterval(id)
  }, [n])

  const atual = t.etapas[etapa]

  return (
    <Revelar as="section" className="secao mx-auto max-w-[1240px] px-5 pb-24 sm:px-8 sm:pb-32">
      <Bloco rotulo={t.rotulo} folha={folha} />
      <h2 className="display mt-7 max-w-[20ch] text-[clamp(28px,4vw,50px)] leading-[1.06]">
        {t.titulo}
      </h2>
      <p className="mt-5 max-w-[58ch] text-[16.5px] leading-[1.55] text-dim">{t.texto}</p>

      {/* a trilha das etapas — no celular ela rola na horizontal em vez de
          espremer cinco palavras em 390 px */}
      <div className="-mx-5 mt-10 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0">
        <ol className="flex min-w-max gap-2 sm:min-w-0 sm:gap-3">
          {t.etapas.map((e, i) => {
            const aceso = i === etapa
            const passou = i < etapa
            return (
              <li key={e.nome} className="flex-1">
                <button
                  type="button"
                  onClick={() => setEtapa(i)}
                  aria-current={aceso ? 'step' : undefined}
                  className="w-full text-left"
                >
                  <span
                    className="block h-[3px] w-full rounded-full transition-colors duration-500"
                    style={{ background: aceso || passou ? '#0e8c6a' : '#e0e6ea' }}
                  />
                  <span
                    className={`mt-2.5 block font-mono text-[10.5px] font-bold uppercase tracking-[0.1em] transition-colors duration-300 ${
                      aceso ? 'text-verde' : 'text-dim'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`mt-1 block whitespace-nowrap pr-4 text-[14px] font-bold transition-colors duration-300 sm:whitespace-normal sm:pr-0 ${
                      aceso ? 'text-ink' : 'text-dim'
                    }`}
                  >
                    {e.nome}
                  </span>
                </button>
              </li>
            )
          })}
        </ol>
      </div>

      {/* o pedido. O número não muda nunca — é esse o argumento. */}
      <div className="mt-8 overflow-hidden rounded-[20px] border border-line bg-card">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-line bg-soft/50 px-5 py-3.5 sm:px-7">
          <span className="font-mono text-[15px] font-bold text-verde">{t.pedido.numero}</span>
          <span className="text-[15px] font-extrabold text-ink">{t.pedido.cliente}</span>
          <span className="cota ml-auto normal-case">{t.pedido.vidro}</span>
        </div>

        <div className="px-5 py-6 sm:px-7 sm:py-8">
          <p className="cota uppercase">{t.estadoRotulo}</p>
          {/* a chave força o texto a renascer a cada etapa, e a animação de
              entrada é o que dá a sensação de que o pedido andou */}
          <p key={etapa} className="sobe mt-2 text-[clamp(19px,2.6vw,26px)] font-extrabold leading-snug text-ink">
            {atual.estado}
          </p>
          <p key={`d-${etapa}`} className="sobe mt-3 max-w-[52ch] text-[15px] leading-[1.55] text-dim">
            {atual.detalhe}
          </p>
        </div>
      </div>

      <p className="cota mt-5 max-w-[52ch] normal-case leading-snug">{t.nota}</p>
    </Revelar>
  )
}
