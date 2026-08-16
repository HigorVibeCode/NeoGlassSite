import { Revelar } from './Comum.jsx'
import Telas from './Telas.jsx'
import { useTextos } from '../i18n/idioma.jsx'

/**
 * A plataforma continua.
 *
 * O leque junta o que já existia com o que vem: os quatro módulos,
 * depois IA, automação, visão e dados.
 */

const LEQUE = ['pedidos', 'producao', 'corte', 'design', 'ia', 'automacao', 'visao', 'dados']

export default function Visao() {
  const t = useTextos().plataforma.visao

  return (
    <Revelar as="section" className="secao mx-auto max-w-[1240px] px-5 pb-20 sm:px-8 sm:pb-24">
      <div className="mx-auto mt-8 max-w-[50ch] text-center">
        <h2 className="display text-[clamp(26px,3.8vw,44px)] leading-[1.08]">
          {t.titulo.antes} <span className="marca">{t.titulo.destaque}</span>
        </h2>
      </div>

      <div className="mx-auto mt-10 w-full min-w-0 max-w-[720px] sm:mt-12">
        <Telas variantes={LEQUE} nomes={t.capacidades} larga largura="max-w-[720px]" />
      </div>
    </Revelar>
  )
}
