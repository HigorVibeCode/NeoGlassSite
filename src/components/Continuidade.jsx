import FraseAto, { Ato, AtoLinha, AtoNota } from './FraseAto.jsx'
import { useTextos } from '../i18n/idioma.jsx'

/**
 * Segurança e nuvem. Fecha o movimento do que o sistema faz.
 */
export default function Continuidade() {
  const t = useTextos().plataforma.continuidade

  return (
    <Ato fecha>
      <div className="ato-palco">
        <FraseAto>
          <AtoLinha>{t.titulo}</AtoLinha>
          <AtoLinha marca atrasar>
            {t.linha}
          </AtoLinha>
        </FraseAto>
        <AtoNota>{t.camadas}</AtoNota>
        <AtoNota>{t.nuvem}</AtoNota>
      </div>
    </Ato>
  )
}
