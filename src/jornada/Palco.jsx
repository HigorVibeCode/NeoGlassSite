import { useEffect, useRef, useState } from 'react'

/**
 * O palco. Três chapas de vidro num espaço de desenho fixo, escalado para caber
 * onde for colocado. Elas nunca são criadas nem destruídas — só mudam de lugar,
 * e o navegador anima a diferença.
 *
 * A caixa de fora cuida de posição e tamanho; a de dentro cuida da inclinação.
 * Assim a chapa pode boiar de leve sem brigar com a transição da formação.
 */
/**
 * `nu` tira o acabamento de vidro da chapa. É para a última cena, em que as três
 * chapas viram aparelhos: um notebook dentro de um cartão de vidro ficaria com
 * duas molduras, uma dentro da outra.
 */
export default function Palco({
  espaco,
  chapas,
  conteudo,
  chave,
  boiando = false,
  nu = false,
  mouse,
}) {
  const caixa = useRef(null)
  const [escala, setEscala] = useState(0)

  useEffect(() => {
    const el = caixa.current
    if (!el) return
    const medir = () => {
      const r = el.getBoundingClientRect()
      if (!r.width || !r.height) return
      setEscala(Math.min(r.width / espaco.largura, r.height / espaco.altura))
    }
    medir()
    const ro = new ResizeObserver(medir)
    ro.observe(el)
    return () => ro.disconnect()
  }, [espaco])

  const atuais = chapas.map((_, i) => (conteudo ? conteudo(i) : null))

  const ultimos = useRef([])
  const chaveAnterior = useRef(chave)
  const [saindo, setSaindo] = useState(null)

  // Ordem importa: este efeito precisa ver os elementos do quadro anterior.
  useEffect(() => {
    if (chaveAnterior.current === chave) return
    setSaindo({ chave: chaveAnterior.current, elementos: ultimos.current })
    chaveAnterior.current = chave
    const id = setTimeout(() => setSaindo(null), 460)
    return () => clearTimeout(id)
  }, [chave])

  useEffect(() => {
    ultimos.current = atuais
  })

  return (
    <div ref={caixa} className="relative min-h-0 flex-1">
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          width: espaco.largura,
          height: espaco.altura,
          transform: `translate(-50%, -50%) scale(${escala || 0.001})`,
        }}
      >
        {chapas.map((f, i) => {
          const puxa = mouse ? { x: mouse.x * (6 + i * 4), y: mouse.y * (5 + i * 3) } : null
          return (
            <div
              key={i}
              className={`absolute ${boiando ? 'boia' : ''}`}
              style={{
                left: f.x,
                top: f.y,
                width: f.w,
                height: f.h,
                zIndex: f.z ?? 1,
                opacity: f.op ?? 1,
                animationDelay: boiando ? `${i * 0.9}s` : undefined,
                transition:
                  'left .6s cubic-bezier(.22,.9,.24,1), top .6s cubic-bezier(.22,.9,.24,1), width .6s cubic-bezier(.22,.9,.24,1), height .6s cubic-bezier(.22,.9,.24,1), opacity .38s ease',
              }}
            >
              <div
                className={`entrada relative h-full w-full ${
                  nu ? '' : 'chapa overflow-hidden rounded-[22px]'
                }`}
                style={{
                  // `raio` tira o canto arredondado do meio e `semBorda` tira a
                  // borda da emenda: é o que faz as três lerem como uma chapa só.
                  borderRadius: nu ? undefined : (f.raio ?? undefined),
                  borderLeftWidth: f.semBorda?.includes('e') ? 0 : undefined,
                  borderRightWidth: f.semBorda?.includes('d') ? 0 : undefined,
                  animationDelay: `${0.15 + i * 0.13}s`,
                  transform: puxa
                    ? `rotate(${f.rot ?? 0}deg) translate3d(${puxa.x}px, ${puxa.y}px, 0)`
                    : `rotate(${f.rot ?? 0}deg)`,
                  transition: `transform ${mouse ? '.5s' : '.6s'} cubic-bezier(.22,.9,.24,1), border-radius .38s ease`,
                }}
              >
                {saindo?.elementos?.[i] && (
                  <div key={`${saindo.chave}-${i}`} className="sai absolute inset-0">
                    {saindo.elementos[i]}
                  </div>
                )}
                {atuais[i] && (
                  <div key={`${chave}-${i}`} className="entra absolute inset-0">
                    {atuais[i]}
                  </div>
                )}
                {!nu && <span aria-hidden="true" className="brilho" />}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
