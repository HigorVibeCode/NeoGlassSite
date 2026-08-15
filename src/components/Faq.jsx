import { Bloco, Revelar } from './Comum.jsx'

/**
 * A lista de perguntas.
 *
 * Este arquivo estava importando `Secao` do Comum.jsx — um componente que
 * existiu numa versão intermediária e não existe mais. Enquanto a Indústria
 * ainda o importava, o build quebrava com `"Secao" is not exported`, e foi
 * exatamente esse o erro do deploy do commit "Vidv1". Agora ele se monta com
 * as peças que existem de fato: `Bloco` para o carimbo e `Revelar` para a
 * entrada — as mesmas de todas as outras seções.
 *
 * A FAQ está fora das páginas no momento. O arquivo fica porque ela volta:
 * é item do blueprint. Enquanto isso, ele compila.
 */
export default function Faq({ rotulo, folha, titulo, itens, centro = false }) {
  return (
    <Revelar as="section" className="secao mx-auto max-w-[1240px] px-5 pb-20 sm:px-8 sm:pb-24">
      {!centro && <Bloco rotulo={rotulo} folha={folha} />}
      <h2
        className={`display max-w-[20ch] text-[clamp(28px,4vw,48px)] leading-[1.08] ${
          centro ? 'mx-auto text-center' : 'mt-7'
        }`}
      >
        {titulo}
      </h2>

      <dl
        className={`mt-8 overflow-hidden rounded-[20px] border border-line bg-card text-left ${
          centro ? 'mx-auto max-w-[620px]' : 'max-w-[820px]'
        }`}
      >
        {itens.map(([pergunta, resposta], i) => (
          <details key={pergunta} className={`group px-5 py-5 ${i ? 'border-t border-line' : ''}`}>
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[16.5px] font-extrabold leading-snug text-ink [&::-webkit-details-marker]:hidden">
              {pergunta}
              <span
                aria-hidden="true"
                className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-[18px] leading-none text-dim transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <dd className="mt-3 text-[15px] leading-[1.55] text-dim">{resposta}</dd>
          </details>
        ))}
      </dl>
    </Revelar>
  )
}
