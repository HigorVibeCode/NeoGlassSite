/**
 * O símbolo oficial: o prisma branco sobre o arco-íris, com os três raios
 * refratados entrando pela esquerda. As cores vieram do arquivo oficial da
 * marca, amostradas ponto a ponto — o fundo é um gradiente cônico, não linear.
 */
const ARCO =
  'conic-gradient(from 0deg at 50% 50%, #9fd9bb 0deg, #cfd587 26deg, #d4bf71 45deg, #e59659 92deg, #dd7a5f 118deg, #d1626b 140deg, #a75f8c 165deg, #8663a6 185deg, #6168b8 208deg, #4b6fc4 228deg, #4479a8 252deg, #3f837e 274deg, #4f9a8a 296deg, #64b298 316deg, #82c6ab 336deg, #9fd9bb 360deg)'

const CLAREIA = 'radial-gradient(circle at 50% 46%, rgba(255,255,255,.26), rgba(255,255,255,0) 52%)'

export function Simbolo({ className = '' }) {
  return (
    <span
      className={`relative inline-block overflow-hidden align-middle ${className}`}
      style={{ borderRadius: '23%', backgroundImage: `${CLAREIA}, ${ARCO}` }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 block h-full w-full">
        {/* o prisma */}
        <path
          d="M48.5 33.1 L68.2 67.4 H28.4 Z"
          fill="#fff"
          stroke="#fff"
          strokeWidth="3.4"
          strokeLinejoin="round"
        />
        {/* a luz entrando, já decomposta */}
        <g strokeWidth="5" strokeLinecap="round">
          <line x1="23" y1="43" x2="46" y2="51.5" stroke="#cad8fc" />
          <line x1="25.5" y1="50" x2="45" y2="57.5" stroke="#f7cca9" />
          <line x1="28.5" y1="57" x2="42.5" y2="62" stroke="#f2a5a2" />
        </g>
      </svg>
    </span>
  )
}

export default function Marca({ className = '', tamanho = 'h-8 w-8 sm:h-9 sm:w-9', claro = false }) {
  return (
    <div className={`flex items-center gap-2 sm:gap-2.5 ${className}`}>
      <Simbolo className={tamanho} />
      <span className={`display text-[19px] sm:text-[21px] ${claro ? 'text-white' : ''}`}>
        Neo
        <span
          className={claro ? '' : 'marca'}
          style={
            claro
              ? {
                  background: 'linear-gradient(90deg,#7fe0c8,#9fd9bb 50%,#6f9fd0)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }
              : undefined
          }
        >
          Glass
        </span>
      </span>
    </div>
  )
}
