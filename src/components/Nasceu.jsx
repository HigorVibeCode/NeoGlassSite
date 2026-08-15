import { Revelar } from './Comum.jsx'
import { useTextos } from '../i18n/idioma.jsx'

/**
 * Dentro de uma fábrica de vidro.
 *
 * As fotos são o argumento. O título só nomeia o que já está à vista.
 */

const FOTOS = [
  { src: '/midia/fabrica-cavalete.jpg', classe: 'nasceu-a' },
  { src: '/midia/fabrica-mesa.jpg', classe: 'nasceu-b' },
  { src: '/midia/fabrica-pessoas.jpg', classe: 'nasceu-c' },
]

export default function Nasceu() {
  const t = useTextos().plataforma.nasceu

  return (
    <section className="secao relative overflow-hidden bg-[#0f2530] text-white">
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #7fe0c8, transparent)' }}
      />

      <Revelar className="relative mx-auto max-w-[1240px] px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-[50ch] text-center">
          <h2 className="display text-[clamp(26px,3.8vw,44px)] leading-[1.08] text-white">{t.titulo}</h2>
        </div>

        <div className="nasceu-grade mt-10 sm:mt-12">
          {FOTOS.map((f) => (
            <figure key={f.src} className={`nasceu-foto ${f.classe}`}>
              <img src={f.src} alt="" className="h-full w-full object-cover" />
            </figure>
          ))}
        </div>
      </Revelar>
    </section>
  )
}
