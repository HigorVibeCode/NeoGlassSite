import FraseAto, { Ato, AtoLinha } from './FraseAto.jsx'
import { useTextos } from '../i18n/idioma.jsx'

/**
 * O propósito. Fecha o primeiro movimento: não parecer moderno, gerar resultado.
 */
export default function Proposito() {
  const t = useTextos().plataforma.proposito

  return (
    <Ato fecha>
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
