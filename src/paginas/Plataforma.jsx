import Apresentacao from '../components/Apresentacao.jsx'
import Lugar from '../components/Lugar.jsx'
import Fluxo from '../components/Fluxo.jsx'
import Inteligencia from '../components/Inteligencia.jsx'
import Continuidade from '../components/Continuidade.jsx'
import Telas from '../components/Telas.jsx'
import { Chamada } from '../components/Comum.jsx'
import { useTextos } from '../i18n/idioma.jsx'

/**
 * A página /plataforma.
 *
 *   01  orgulho      — a promessa
 *   02  prova        — as áreas do sistema, antes do manifesto
 *   03  confiança   — origem na fábrica, código, IA e continuidade
 *   04  ver aberto
 */
export default function Plataforma() {
  const t = useTextos().plataforma

  return (
    <>
      <Apresentacao />
      <section className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-[58ch] text-center">
          <h2 className="display text-[clamp(27px,4vw,46px)] leading-[1.08]">{t.prova.titulo}</h2>
          <p className="mt-5 text-[16px] leading-relaxed text-dim">{t.prova.texto}</p>
        </div>
        <div className="mx-auto mt-10 max-w-[580px] overflow-x-clip px-1">
          <Telas variantes={['pedidos', 'corte', 'producao']} estatico />
          <p className="mt-5 text-center text-[12px] leading-relaxed text-dim">{t.prova.nota}</p>
        </div>
      </section>
      <Lugar />
      <Fluxo />
      <Inteligencia />
      <Continuidade />
      <Chamada
        titulo={t.chamada.titulo}
        texto={t.chamada.texto}
        botao={t.chamada.botao}
        agenda
        agendaBotao
        centro
      />
    </>
  )
}
