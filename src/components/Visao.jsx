import FraseAto, { Ato, AtoLinha } from './FraseAto.jsx'
import { useTextos } from '../i18n/idioma.jsx'

/**
 * A plataforma continua. Abre o horizonte.
 */
export default function Visao() {
  const t = useTextos().plataforma.visao

  return (
    <Ato abre>
      <div className="ato-palco">
        <FraseAto>
          <AtoLinha>
            {t.titulo.antes} <span className="marca">{t.titulo.destaque}</span>
          </AtoLinha>
        </FraseAto>
      </div>
    </Ato>
  )
}
