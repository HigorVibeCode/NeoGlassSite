/**
 * A gramática dos atos da /plataforma.
 *
 *   Ato      — o bloco. O padding diz se começa ou fecha um movimento.
 *   FraseAto — a afirmação (claim) ou o fecho, nunca os dois no mesmo tamanho.
 *   AtoNota  — o parágrafo que sustenta. Nunca compete com o título.
 */

export function Ato({ children, abre = false, fecha = false, mapa = false }) {
  const classe = [
    'ato secao mx-auto max-w-[1240px] px-5 sm:px-8',
    abre ? 'ato--abre' : '',
    fecha ? 'ato--fecha' : '',
    mapa ? 'ato--mapa' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return <section className={classe}>{children}</section>
}

export default function FraseAto({ children, className = '', tom = 'claim' }) {
  const Tag = tom === 'fecho' ? 'p' : 'h2'
  return (
    <Tag
      className={`ato-frase ato-frase--${tom} display mx-auto text-center leading-[1.08]${className ? ` ${className}` : ''}`}
    >
      {children}
    </Tag>
  )
}

export function AtoLinha({ children, marca = false, atrasar = false }) {
  return (
    <span className={`${marca ? 'marca ' : ''}ato-frase-linha${atrasar ? ' ato-frase-linha-2' : ''}`}>
      {children}
    </span>
  )
}

export function AtoNota({ children }) {
  return <p className="ato-nota">{children}</p>
}
