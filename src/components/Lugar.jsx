import FraseAto, { Ato, AtoLinha } from './FraseAto.jsx'
import { useTextos } from '../i18n/idioma.jsx'

/**
 * O lugar. Primeiro movimento: de onde isso veio.
 */
export default function Lugar() {
  const t = useTextos().plataforma.lugar

  return (
    <Ato abre>
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
