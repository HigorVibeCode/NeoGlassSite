import { useEffect, useState } from 'react'
import Tela from './Tela.jsx'
import { useTextos } from '../i18n/idioma.jsx'
import { semMovimento } from '../lib/dispositivo.js'

/**
 * As telas do sistema empilhadas em leque, trocando sozinhas.
 *
 * Uma tela só dizia pouco: mostrava que existe software, mas não que existem
 * três módulos. O leque resolve isso sem ocupar mais espaço — as três ficam
 * sobrepostas como cartas na mão, e a da frente troca a cada quatro segundos,
 * levando o nome do módulo junto.
 *
 * Quatro segundos é de propósito: menos que isso vira pisca-pisca e ninguém lê
 * o que está na tela; mais que isso e o visitante vai embora sem descobrir que
 * havia outras. Quem pediu para reduzir movimento no sistema operacional vê a
 * primeira parada, sem troca nenhuma.
 */
export default function Telas({
  variantes,
  intervalo = 4000,
  pistas = true,
  pistasClaras = false,
  largura = 'max-w-[540px]',
  nomes,
  larga = false,
  estatico = false,
}) {
  const t = useTextos().tela
  const [frente, setFrente] = useState(0)
  const n = variantes.length

  useEffect(() => {
    if (estatico || n < 2 || semMovimento()) return
    const id = setInterval(() => setFrente((f) => (f + 1) % n), intervalo)
    return () => clearInterval(id)
  }, [estatico, n, intervalo])

  return (
    <div className={`w-full ${largura}`}>
      {/* A pilha. As três telas ocupam a MESMA célula de grade — é o que faz a
          altura do bloco ser sempre a da tela mais alta, e não a da que está
          na frente. Antes a de trás era `absolute` sobre a da frente: quando a
          de trás era a mais alta (o plano de corte tem 449 px, o painel de
          pedidos tem 371), ela sobrava por baixo e o rodapé dela aparecia
          cortando o cartão da frente. E a cada quatro segundos a página inteira
          pulava, porque a altura mudava junto com a troca. Uma célula só
          resolve as duas coisas. */}
      <div className="grid items-start">
        {variantes.map((v, i) => {
          // 0 = na frente, 1 = logo atrás, 2 = no fundo
          const pos = (i - frente + n) % n
          const naFrente = pos === 0
          return (
            <div
              key={v}
              aria-hidden={!naFrente}
              className={`${estatico ? '' : 'transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] '}${
                naFrente ? '' : 'pointer-events-none'
              }`}
              style={{
                gridArea: '1 / 1',
                transform: `translate3d(${pos * (larga ? 34 : 26)}px, ${pos * (larga ? -24 : -18)}px, 0) scale(${1 - Math.min(pos, 4) * (larga ? 0.04 : 0.05)})`,
                opacity: naFrente ? 1 : Math.max(0, 0.48 - (pos - 1) * 0.14),
                zIndex: n - pos,
                filter: naFrente ? undefined : 'saturate(.7)',
              }}
            >
              <Tela variante={v} larga={larga} />
            </div>
          )
        })}
      </div>

      {/* Os nomes dos módulos, que também são o controle: quem quiser ver o
          plano de corte agora não precisa esperar a vez dele chegar. */}
      {pistas && n > 1 && (
        <div className="mt-5 flex flex-wrap items-center justify-center gap-1.5">
          {variantes.map((v, i) => (
            <button
              key={v}
              type="button"
              onClick={() => setFrente(i)}
              aria-current={i === frente ? 'true' : undefined}
              className={`rounded-full px-3 py-1.5 text-[12.5px] font-bold transition-colors ${
                pistasClaras
                  ? i === frente
                    ? 'bg-white/20 text-white'
                    : 'text-white/55 hover:text-white/85'
                  : i === frente
                    ? 'bg-soft text-ink'
                    : 'text-dim hover:text-ink'
              }`}
            >
              {nomes?.[v] ?? t[v].modulo}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
