import { useEffect, useRef, useState } from 'react'
import { Bloco } from './Comum.jsx'
import { useTextos } from '../i18n/idioma.jsx'
import { semMovimento } from '../lib/dispositivo.js'

/**
 * A seção 02 da /plataforma — o que foi construído.
 *
 * A direção proíbe duas coisas em letras grandes: não pode ser uma lista comum
 * de funcionalidades, e cada área tem de parecer PARTE DE UM PRODUTO MAIOR.
 * Uma grade de cartões com nome e ícone falha nas duas — é uma lista com
 * animação por cima, e cada cartão vira uma coisa separada.
 *
 * Então os ambientes não são cartões. São chapas num cavalete.
 *
 * Um cavalete é uma coisa só, e as chapas encostadas nele são partes dela —
 * é literalmente a imagem que a direção pede. E é a imagem que quem lê esta
 * página vê todo dia, porque é assim que o vidro fica guardado numa fábrica,
 * cada folha com a sua etiqueta na lateral.
 *
 * As chapas entram uma a uma quando a seção aparece. Isso não é enfeite: é o
 * que transforma "cinco retângulos" em "isto foi sendo construído". A pessoa
 * vê o conjunto se formar, e o tamanho aparece no fim, quando o cavalete está
 * cheio — não numa contagem escrita.
 *
 * ── As cores ─────────────────────────────────────────────────────────────
 *
 * Nenhuma foi escolhida por mim. São os temas que cada módulo já tem por
 * dentro do NeoGlass: cristal no Admin, indigo nos Pedidos, jade na Produção,
 * rubi no Design, ouro no Financeiro. Quem abrir o sistema depois de ver esta
 * página encontra exatamente estas cores, no mesmo lugar.
 *
 * ── O que ainda não está aqui ────────────────────────────────────────────
 *
 * Marketplace, Academy e Partner existem no sistema e têm tema próprio
 * (brasa, cobre e partner, já anotados abaixo). Ficam de fora até o dono
 * confirmar em que pé cada um está: esta seção existe para causar admiração
 * pelo que foi construído, e uma chapa a mais que não se sustenta na
 * demonstração destrói a seção inteira. Entram tirando o comentário.
 */
const AMBIENTES = [
  { chave: 'admin', cor: '#0e9c8e' }, // tema cristal
  { chave: 'pedidos', cor: '#3656d6' }, // tema indigo
  { chave: 'producao', cor: '#0e9c6e' }, // tema jade
  { chave: 'design', cor: '#cf3a52' }, // tema rubi
  { chave: 'financeiro', cor: '#a9831c' }, // tema ouro
  // { chave: 'marketplace', cor: '#ee6a45' },  // tema brasa
  // { chave: 'academy',     cor: '#b06f3c' },  // tema cobre
  // { chave: 'partner',     cor: '#0e8c6a' },  // tema partner
]

export default function Ambientes() {
  const t = useTextos().plataforma.construimos
  const [montado, setMontado] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (semMovimento()) {
      setMontado(true)
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setMontado(true)
          io.disconnect()
        }
      },
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const n = AMBIENTES.length

  return (
    <section className="secao mx-auto max-w-[1240px] px-5 pb-24 sm:px-8 sm:pb-32">
      <Bloco rotulo={t.rotulo} folha="FL. 02/06" />

      <h2 className="display mt-7 max-w-[18ch] text-[clamp(26px,3.4vw,44px)] leading-[1.06]">
        {t.titulo}
      </h2>

      {/* O cavalete. A perspectiva vive no pai; sem ela as chapas são
          retângulos lado a lado, e o conjunto não tem corpo. */}
      <div ref={ref} className="cavalete mt-14 sm:mt-16">
        <div className="cavalete-vao">
          {AMBIENTES.map((a, i) => (
            <div
              key={a.chave}
              className={`chapa-ambiente ${montado ? 'posta' : ''}`}
              style={{
                // as chapas encostam levemente inclinadas, como no cavalete de
                // verdade: a de trás mais em pé, a da frente mais deitada
                '--giro': `${-5.2 + i * 0.9}deg`,
                '--cor': a.cor,
                '--atraso': `${i * 115}ms`,
                zIndex: n - i,
              }}
            >
              <span className="chapa-vidro" />
              <span className="chapa-nome">{t.ambientes[a.chave]}</span>
            </div>
          ))}
        </div>
        {/* o trilho do cavalete: a linha em que todas as chapas se apoiam. É
            ele que faz cinco chapas lerem como UM objeto e não como cinco. */}
        <span aria-hidden="true" className="cavalete-trilho" />
      </div>
    </section>
  )
}
