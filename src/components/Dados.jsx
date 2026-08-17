import FraseAto, { Ato, AtoLinha, AtoNota } from './FraseAto.jsx'
import { useTextos } from '../i18n/idioma.jsx'

/**
 * A operação gera dados. Afirmação, nota, fecho — um só palco.
 */
export default function Dados() {
  const t = useTextos().plataforma.dados

  return (
    <Ato>
      <div className="ato-palco">
        <FraseAto>
          <AtoLinha>{t.titulo}</AtoLinha>
          <AtoLinha marca atrasar>
            {t.linha}
          </AtoLinha>
        </FraseAto>
        <AtoNota>{t.texto}</AtoNota>
        <FraseAto tom="fecho">
          <AtoLinha marca>{t.fecho}</AtoLinha>
        </FraseAto>
      </div>
    </Ato>
  )
}
