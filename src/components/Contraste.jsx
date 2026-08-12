import { Bloco, Revelar } from './Comum.jsx'

/**
 * O argumento em duas colunas: cada linha da esquerda tem a resposta na
 * direita. No celular a tabela vira par empilhado — coluna dupla em 360 px de
 * largura não se lê.
 */
export default function Contraste({ rotulo, folha, titulo, hoje, pares }) {
  return (
    <Revelar as="section" className="secao mx-auto max-w-[1240px] px-5 pb-24 sm:px-8 sm:pb-32">
      <Bloco rotulo={rotulo} folha={folha} />
      <h2 className="display mt-7 max-w-[16ch] text-[clamp(30px,4.4vw,54px)]">{titulo}</h2>

      <div className="mt-12 overflow-hidden rounded-[22px] border border-line bg-card">
        <div className="hidden grid-cols-2 border-b border-line bg-soft/60 lg:grid">
          <p className="cota px-7 py-4 uppercase">{hoje}</p>
          <p className="cota border-l border-line px-7 py-4 uppercase text-verde">Com o NeoGlass</p>
        </div>

        <ul>
          {pares.map(([antes, depois], i) => (
            <li key={antes} className={`lg:grid lg:grid-cols-2 ${i ? 'border-t border-line' : ''}`}>
              <div className="px-6 pb-4 pt-5 sm:px-7 lg:py-5">
                {i === 0 && <p className="cota mb-2 uppercase lg:hidden">{hoje}</p>}
                <div className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-[11px] hidden h-px w-4 shrink-0 bg-dim/45 lg:block"
                  />
                  <span className="text-[15.5px] leading-[1.5] text-dim">{antes}</span>
                </div>
              </div>

              <div className="bg-verde/[0.045] px-6 pb-5 pt-4 sm:px-7 lg:border-l lg:border-line lg:bg-transparent lg:py-5">
                {i === 0 && <p className="cota mb-2 uppercase text-verde lg:hidden">Com o NeoGlass</p>}
                <div className="flex gap-3">
                  <svg viewBox="0 0 16 16" className="mt-1 h-4 w-4 shrink-0" aria-hidden="true">
                    <path
                      d="M3 8.5l3.2 3.2L13 5"
                      fill="none"
                      stroke="#0e8c6a"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-[15.5px] font-semibold leading-[1.5] text-ink">{depois}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Revelar>
  )
}
