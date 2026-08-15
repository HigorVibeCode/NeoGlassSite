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
export default function Telas({ variantes, intervalo = 4000 }) {
  const t = useTextos().tela
  const [frente, setFrente] = useState(0)
  const n = variantes.length

  useEffect(() => {
    if (n < 2 || semMovimento()) return
    const id = setInterval(() => setFrente((f) => (f + 1) % n), intervalo)
    return () => clearInterval(id)
  }, [n, intervalo])

  return (
    <div className="w-full">
      {/* A pilha. A altura vem da tela da frente; as de trás são posicionadas
          por cima dela, deslocadas, então não empurram nada. */}
      <div className="relative">
        {variantes.map((v, i) => {
          // 0 = na frente, 1 = logo atrás, 2 = no fundo
          const pos = (i - frente + n) % n
          const naFrente = pos === 0
          return (
            <div
              key={v}
              aria-hidden={!naFrente}
              className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                naFrente ? 'relative' : 'pointer-events-none absolute inset-x-0 top-0'
              }`}
              style={{
                transform: `translate3d(${pos * 26}px, ${pos * -18}px, 0) scale(${1 - pos * 0.05})`,
                opacity: naFrente ? 1 : 0.5 - (pos - 1) * 0.18,
                zIndex: n - pos,
                filter: naFrente ? undefined : 'saturate(.7)',
              }}
            >
              <Tela variante={v} />
            </div>
          )
        })}
      </div>

      {/* Os nomes dos módulos, que também são o controle: quem quiser ver o
          plano de corte agora não precisa esperar a vez dele chegar. */}
      {n > 1 && (
        <div className="mt-5 flex flex-wrap items-center justify-center gap-1.5">
          {variantes.map((v, i) => (
            <button
              key={v}
              type="button"
              onClick={() => setFrente(i)}
              aria-current={i === frente ? 'true' : undefined}
              className={`rounded-full px-3 py-1.5 text-[12.5px] font-bold transition-colors ${
                i === frente
                  ? 'bg-soft text-ink'
                  : 'text-dim hover:text-ink'
              }`}
            >
              {t[v].modulo}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
