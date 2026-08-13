/**
 * O símbolo oficial — o mesmo do sistema, não uma reconstrução.
 *
 * O que estava aqui antes era um arco-íris amostrado à mão de um PNG da marca,
 * com dezesseis paradas de cor. O ícone verdadeiro é bem mais simples: um
 * cônico de seis cores tiradas dos gradientes dos módulos (`src/data/modules.js`
 * no repositório da plataforma), começando em 210°. É exatamente o
 * `--logo-conic` da tela de login. Qualquer diferença entre os dois vira
 * desconfiança na hora em que o visitante sai do site e cai no login.
 *
 * Ordem: Pedidos → Produção → Admin → Marketplace → Design → Pedidos.
 */
const ARCO =
  'conic-gradient(from 210deg, #4a6ae0, #0e8c6a, #7fe0c8, #fbb03b, #e0556a, #4a6ae0)'

/** O prisma e os três raios, com as coordenadas e as cores do app. */
export function MarcaGlifo({ className = '' }) {
  return (
    <svg viewBox="0 0 860 684" preserveAspectRatio="xMidYMid meet" className={className} aria-hidden="true">
      <path
        d="M452.5,78.9 L757.5,606.1 Q780,645 735,645 L125,645 Q80,645 102.5,606.1 L407.5,78.9 Q430,40 452.5,78.9 Z"
        fill="#ffffff"
      />
      <g fill="none" strokeLinecap="round" strokeWidth="52">
        <line x1="20" y1="235" x2="396" y2="372" stroke="#c6d8ff" />
        <line x1="45" y1="330" x2="355" y2="443" stroke="#ffcaa4" />
        <line x1="100" y1="448" x2="302" y2="522" stroke="#ffa0a0" />
      </g>
    </svg>
  )
}

export function Simbolo({ className = '' }) {
  return (
    <span
      className={`relative inline-flex items-center justify-center overflow-hidden align-middle ${className}`}
      // 28,6% é o mesmo raio do login (16px numa caixa de 56px), e o anel
      // branco por dentro é o mesmo `inset 0 0 0 1.5px rgba(255,255,255,.55)`,
      // proporcional ao tamanho menor que o ícone tem aqui.
      style={{
        borderRadius: '28.6%',
        backgroundImage: ARCO,
        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.55)',
      }}
      aria-hidden="true"
    >
      <MarcaGlifo className="block h-[43%] w-[52%] drop-shadow-[0_1px_3px_rgba(15,55,70,.18)]" />
    </span>
  )
}

export default function Marca({ className = '', tamanho = 'h-8 w-8 sm:h-9 sm:w-9', claro = false }) {
  return (
    <div className={`flex items-center gap-2 sm:gap-2.5 ${className}`}>
      <Simbolo className={tamanho} />
      {/* A palavra NeoGlass é Inter 800 com -0.03em, igual à tela de login do
          sistema — não a Archivo expandida dos títulos. A marca tem que ser a
          mesma letra nos dois lugares; os títulos do site é que têm voz
          própria. */}
      <span
        className={`text-[19px] font-extrabold sm:text-[21px] ${claro ? 'text-white' : ''}`}
        style={{ fontFamily: 'Inter, system-ui, sans-serif', letterSpacing: '-0.03em' }}
      >
        Neo
        <span
          className={claro ? '' : 'marca'}
          style={
            claro
              ? {
                  // sobre fundo escuro, os mesmos dois tons clareados
                  background: 'linear-gradient(90deg,#83e6c2,#7fe0c8)',
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
