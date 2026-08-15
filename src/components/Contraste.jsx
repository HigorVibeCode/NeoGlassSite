import { Secao } from './Comum.jsx'
import { useTextos } from '../i18n/idioma.jsx'

export default function Contraste({ rotulo, folha, titulo, hoje, pares, comNeoGlass }) {
  const c = useTextos()
  const comMarca = comNeoGlass ?? c.chrome.comNeoGlass

  return (
    <Secao rotulo={rotulo} folha={folha} titulo={titulo}>
      <ul className="mt-10 space-y-3 text-left">
        {pares.map(([antes, depois]) => (
          <li key={antes} className="cartao overflow-hidden">
            <div className="px-5 py-5">
              <p className="cota uppercase">{hoje}</p>
              <p className="texto-bloco mt-2">{antes}</p>
            </div>
            <div className="border-t border-line bg-verde/[0.05] px-5 py-5">
              <p className="cota uppercase text-verde">{comMarca}</p>
              <p className="mt-2 text-[16px] font-semibold leading-[1.5] text-ink">{depois}</p>
            </div>
          </li>
        ))}
      </ul>
    </Secao>
  )
}
