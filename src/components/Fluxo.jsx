import { useEffect, useState } from 'react'
import { Bloco, Revelar } from './Comum.jsx'
import { useTextos } from '../i18n/idioma.jsx'
import { semMovimento } from '../lib/dispositivo.js'

export default function Fluxo({ folha, titulo, texto, rotulo }) {
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
    <Revelar as="section" id="fluxo" className="secao faixa">
      <div className="coluna">
        {folha ? (
          <Bloco rotulo={rotulo ?? t.rotulo} folha={folha} />
        ) : (
          <p className="cota uppercase">{rotulo ?? t.rotulo}</p>
        )}
        <h2 className="titulo-secao mt-7">{titulo ?? t.titulo}</h2>
        <p className="texto-secao mt-5">{texto ?? t.texto}</p>

        <ol className="mt-10 grid grid-cols-1 gap-2">
          {t.etapas.map((e, i) => {
            const aceso = i === etapa
            const passou = i < etapa
            return (
              <li key={e.nome}>
                <button
                  type="button"
                  onClick={() => setEtapa(i)}
                  aria-current={aceso ? 'step' : undefined}
                  className="cartao flex min-h-14 w-full items-center gap-4 px-5 py-3 text-left"
                  style={{
                    borderColor: aceso ? '#0e8c6a' : undefined,
                    background: aceso ? 'rgba(14,140,106,.06)' : undefined,
                  }}
                >
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-[13px] font-bold"
                    style={{
                      background: aceso || passou ? '#0e8c6a' : '#e7ebf1',
                      color: aceso || passou ? '#fff' : '#737e8e',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className={`text-[17px] font-extrabold ${aceso ? 'text-ink' : 'text-dim'}`}>
                    {e.nome}
                  </span>
                </button>
              </li>
            )
          })}
        </ol>

        <div className="cartao mt-8 overflow-hidden text-center">
          <div className="border-b border-line bg-soft/50 px-5 py-4">
            <p className="font-mono text-[16px] font-bold text-verde">{t.pedido.numero}</p>
            <p className="mt-1 text-[17px] font-extrabold text-ink">{t.pedido.cliente}</p>
            <p className="cota mt-1 normal-case">{t.pedido.vidro}</p>
          </div>
          <div className="px-5 py-7">
            <p className="cota uppercase">{t.estadoRotulo}</p>
            <p key={etapa} className="sobe titulo-bloco mt-3">
              {atual.estado}
            </p>
            <p key={`d-${etapa}`} className="sobe texto-secao mt-3">
              {atual.detalhe}
            </p>
          </div>
        </div>

        <p className="cota mt-5 normal-case">{t.nota}</p>
      </div>
    </Revelar>
  )
}
