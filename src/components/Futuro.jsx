import FraseAto, { Ato, AtoLinha } from './FraseAto.jsx'
import { useTextos } from '../i18n/idioma.jsx'

/**
 * O rumo: a indústria do vidro.
 */
export default function Futuro() {
  const t = useTextos().plataforma.futuro

  return (
    <Ato>
      <div className="ato-palco">
        <FraseAto>
          <AtoLinha>{t.titulo}</AtoLinha>
          <AtoLinha marca atrasar>
            {t.linha}
          </AtoLinha>
        </FraseAto>
      </div>
    </Ato>
  )
}
