/**
 * O cartão que flutua sobre o prisma. Ele troca sozinho e cada face é outra
 * coisa do sistema — não é o mesmo cartão com o texto trocado: uma traz lista
 * de conferência, outra um plano de corte, outra a leitura de código na
 * expedição, a última o fechamento em dinheiro.
 *
 * Os nomes daqui levam prefixo de propósito: `Checagem` e `Expedicao` também
 * existem nas telas do filme, e nomes repetidos entre módulos se atropelavam
 * no pacote de produção.
 */

import { useEffect, useRef, useState } from 'react'
import { semMovimento } from '../lib/dispositivo.js'
import { useTextos } from '../i18n/idioma.jsx'

const CT_VERDE = '#0e8c6a'
const CT_PETROLEO = '#0e7b9c'
const CT_EMBER = '#ee6a45'
const CT_VIOLETA = '#7c6ad6'
const CT_OURO = '#b8862c'

function CtSelo({ texto, cor }) {
  const t = useTextos().demos.cartao
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="cota uppercase" style={{ color: cor, opacity: 1 }}>
        {texto}
      </span>
      <span className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-dim">
        <i className="h-1.5 w-1.5 rounded-full" style={{ background: cor }} aria-hidden="true" />
        {t.ia}
      </span>
    </div>
  )
}

function CtVisto({ cor = CT_VERDE }) {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0" aria-hidden="true">
      <path
        d="M3 8.5l3.2 3.2L13 5"
        fill="none"
        stroke={cor}
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const CT_ITENS = [
  ['Espessura', '10 mm · vão de 1175', true],
  ['Ferragem', 'roldana 100 kg · folha 42 kg', true],
  ['Esquadro', '4 mm no topo — confirmar', false],
]

function FaceChecagem() {
  return (
    <>
      <CtSelo texto="Checagem do pedido" cor={CT_VERDE} />
      <p className="mt-3 text-[15px] font-extrabold text-ink">Pedido 26-0431</p>
      <ul className="mt-3 space-y-2">
        {CT_ITENS.map(([t, d, ok]) => (
          <li
            key={t}
            className="flex items-start gap-2.5 rounded-[10px] px-2.5 py-2"
            style={{ background: ok ? 'rgba(14,140,106,.07)' : 'rgba(238,106,69,.09)' }}
          >
            {ok ? (
              <CtVisto />
            ) : (
              <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0" aria-hidden="true">
                <path d="M8 4.2v4.4M8 11.4v.2" stroke={CT_EMBER} strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            )}
            <span className="min-w-0">
              <span className="block text-[12.5px] font-bold leading-tight text-ink">{t}</span>
              <span className="block text-[11.5px] leading-tight text-dim">{d}</span>
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[12px] font-bold" style={{ color: CT_EMBER }}>
        1 pendência — retido antes de cortar
      </p>
    </>
  )
}

const CT_PLANO = [
  [4, 4, 42, 32],
  [4, 38, 42, 32],
  [4, 72, 42, 16],
  [48, 4, 44, 40],
  [48, 46, 21, 42],
  [71, 46, 21, 42],
  [94, 4, 28, 50],
]

function FaceOtimizacao() {
  const t = useTextos().demos.cartao.otimizacao
  return (
    <>
      <CtSelo texto={t.selo} cor={CT_PETROLEO} />
      <p className="mt-3 text-[15px] font-extrabold text-ink">{t.plano}</p>
      <svg viewBox="0 0 126 92" className="mt-3 w-full rounded-[10px] bg-soft" aria-hidden="true">
        {CT_PLANO.map(([x, y, w, h], i) => (
          <rect
            key={i}
            x={x}
            y={y}
            width={w}
            height={h}
            rx="2"
            fill="#0e8c6a"
            fillOpacity="0.14"
            stroke="#0e8c6a"
            strokeOpacity="0.5"
            strokeWidth="0.8"
          />
        ))}
        <rect
          x="94"
          y="56"
          width="28"
          height="32"
          rx="2"
          fill={CT_EMBER}
          fillOpacity="0.14"
          stroke={CT_EMBER}
          strokeWidth="0.9"
          strokeDasharray="3 2"
        />
      </svg>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-[12.5px] font-semibold text-dim">{t.resumo}</span>
        <span
          className="rounded-full px-3 py-1 text-[12.5px] font-extrabold"
          style={{ background: 'rgba(14,140,106,.12)', color: CT_VERDE }}
        >
          87,4%
        </span>
      </div>
    </>
  )
}

const CT_QR = Array.from({ length: 49 }, (_, i) => {
  const x = Math.sin(i * 4.71 + 1.3) * 1000
  return x - Math.floor(x) > 0.45
})

function FaceExpedicao() {
  const t = useTextos().demos.cartao.expedicao
  return (
    <>
      <CtSelo texto={t.selo} cor={CT_VIOLETA} />
      <div className="mt-3 flex items-center gap-4">
        <svg viewBox="0 0 7 7" className="h-[74px] w-[74px] shrink-0 rounded-[8px] bg-soft" aria-hidden="true">
          {CT_QR.map((on, i) =>
            on ? (
              <rect key={i} x={i % 7} y={Math.floor(i / 7)} width="1" height="1" fill="#0f2530" />
            ) : null,
          )}
        </svg>
        <div className="min-w-0">
          <p className="text-[15px] font-extrabold leading-tight text-ink">{t.peca}</p>
          <p className="mt-1 text-[12px] text-dim">{t.medida}</p>
          <span
            className="mt-2 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[12px] font-bold"
            style={{ background: 'rgba(124,106,214,.12)', color: CT_VIOLETA }}
          >
            <CtVisto cor={CT_VIOLETA} />
            {t.conferidas}
          </span>
        </div>
      </div>
      <span aria-hidden="true" className="mt-3.5 block h-[3px] overflow-hidden rounded-full bg-line">
        <span className="block h-full w-[71%] rounded-full" style={{ background: CT_VIOLETA }} />
      </span>
    </>
  )
}

const CT_PARTES = [
  [1180, CT_PETROLEO],
  [640, CT_VIOLETA],
  [210, '#b6c1c9'],
  [1450, CT_OURO],
]

function FaceFechamento() {
  const t = useTextos().demos.cartao.fechamento
  return (
    <>
      <CtSelo texto={t.selo} cor={CT_OURO} />
      {/* O valor em reais é escrito aqui, não no módulo de textos: moeda é
          assunto de outra frente, e nenhum idioma escreve símbolo à mão. */}
      <p className="mt-3 text-[15px] font-extrabold text-ink">{t.receita('R$ 3.480')}</p>
      <span aria-hidden="true" className="mt-3 flex h-[9px] overflow-hidden rounded-full">
        {CT_PARTES.map(([v, cor], i) => (
          <span key={i} style={{ width: `${(v / 3480) * 100}%`, background: cor }} />
        ))}
      </span>
      <div className="mt-3 space-y-1">
        {[
          [t.materia, 'R$ 1.180'],
          [t.producao, 'R$ 850'],
        ].map(([a, b]) => (
          <p key={a} className="flex justify-between text-[12px] text-dim">
            <span>{a}</span>
            <span className="font-semibold text-ink">− {b}</span>
          </p>
        ))}
      </div>
      <div
        className="mt-3 flex items-baseline justify-between rounded-[12px] px-3.5 py-3"
        style={{ background: 'rgba(184,134,44,.1)' }}
      >
        <span>
          <span className="cota block uppercase" style={{ color: '#8a6317', opacity: 1 }}>
            {t.margem}
          </span>
          <span className="display mt-1 block text-[24px] leading-none" style={{ color: '#8a6317' }}>
            R$ 1.450
          </span>
        </span>
        <span className="display text-[18px]" style={{ color: '#8a6317' }}>
          41,7%
        </span>
      </div>
    </>
  )
}

/* FaceChecagem saiu daqui em 13/08. O cartão anunciava uma "checagem do pedido
   com IA" que retinha o pedido antes do corte — e essa ferramenta não existe no
   sistema: não há uma única ocorrência de "checagem" no repositório da
   plataforma. Era invenção minha de uma sessão anterior, e ela contaminou a
   copy do hero, o módulo 03 da página Plataforma e uma cena inteira do filme.
   A função continua no arquivo, sem uso, para o dia em que a ferramenta existir
   de verdade. */
const CT_FACES = [FaceOtimizacao, FaceExpedicao, FaceFechamento]

/**
 * Antes este cartão trocava de face lendo um relógio que corria a sessenta
 * quadros por segundo — o React redesenhava tudo o tempo todo por causa de
 * uma troca a cada quatro segundos. Agora ele tem o próprio relógio, que bate
 * uma vez a cada quatro segundos e só quando o cartão está na tela. A entrada
 * é uma animação de CSS, não uma conta.
 */
export default function CartaoIA({ intervalo = 4200 }) {
  const ref = useRef(null)
  const [i, setI] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (semMovimento()) return
    let relogio = 0
    const io = new IntersectionObserver(
      ([e]) => {
        clearInterval(relogio)
        if (e.isIntersecting) {
          relogio = setInterval(() => setI((n) => (n + 1) % CT_FACES.length), intervalo)
        }
      },
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      clearInterval(relogio)
    }
  }, [intervalo])

  const Face = CT_FACES[i] ?? FaceOtimizacao

  return (
    <div
      ref={ref}
      /* A altura é fixa para o cartão não pular de tamanho a cada troca de
         face. Subiu de 318/330 quando a checagem saiu: a otimização é a face
         mais alta das três, e com a altura antiga o rodapé dela ("7 peças ·
         1 retalho · 87,4%") ficava cortado pela borda. */
      className="h-[342px] w-full max-w-[300px] overflow-hidden rounded-[18px] border border-line bg-card px-5 py-4 sm:h-[356px] sm:max-w-[340px]"
      style={{
        boxShadow: '0 30px 60px -32px rgba(20,55,80,.45), 0 2px 10px -4px rgba(20,55,80,.14)',
      }}
    >
      <div key={i} className="entra">
        <Face />
      </div>
    </div>
  )
}
