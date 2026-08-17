import FraseAto, { Ato, AtoLinha, AtoNota } from './FraseAto.jsx'
import { useTextos } from '../i18n/idioma.jsx'

/**
 * A IA como utilidade. Uma afirmação, a nota, o fecho — um só palco.
 */
export default function Inteligencia() {
  const t = useTextos().plataforma.inteligencia

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
          <AtoLinha>{t.nao}</AtoLinha>
          <AtoLinha marca atrasar>
            {t.sim}
          </AtoLinha>
        </FraseAto>
      </div>
    </Ato>
  )
}
