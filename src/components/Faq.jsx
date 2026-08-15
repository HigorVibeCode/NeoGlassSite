import { Secao } from './Comum.jsx'

export default function Faq({ rotulo, folha, titulo, itens }) {
  return (
    <Secao rotulo={rotulo} folha={folha} titulo={titulo}>
      <dl className="cartao mt-10 overflow-hidden text-left">
        {itens.map(([pergunta, resposta], i) => (
          <details key={pergunta} className={`group px-5 py-5 ${i ? 'border-t border-line' : ''}`}>
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[17px] font-extrabold leading-snug text-ink [&::-webkit-details-marker]:hidden">
              {pergunta}
              <span
                aria-hidden="true"
                className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-[18px] leading-none text-dim transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <dd className="texto-bloco mt-3">{resposta}</dd>
          </details>
        ))}
      </dl>
    </Secao>
  )
}
