import { useEffect } from 'react'
import Telas from '../components/Telas.jsx'
import { Revelar } from '../components/Comum.jsx'
import { gravarLado, lerLado } from '../lib/lado.js'
import { caminhoDe } from '../lib/paginasSeo.js'
import { evento } from '../lib/rastreio.js'
import { useIdioma, useTextos } from '../i18n/idioma.jsx'

/**
 * A porta de entrada.
 *
 * A hierarquia é a regra desta página, e ela tem uma ordem exata:
 *
 *   1º  a promessa — "vidro que você não compra é lucro";
 *   2º  as duas portas — é a única decisão que esta tela pede;
 *   3º  o produto — a prova de que existe software por trás.
 *
 * A versão anterior errava o segundo e o terceiro: o painel do sistema ficava
 * à direita do título, colorido, e roubava o olho das portas, que eram dois
 * retângulos de texto. Agora tudo é centralizado, as portas vêm logo abaixo da
 * promessa com ícone e cor próprias, e o painel entra ATRÁS delas, inclinado e
 * cortado pela borda de baixo — presente, e claramente em terceiro lugar.
 */

/* Cada lado tem a sua cor no site inteiro, e ela nasce aqui.
   Verde é a obra: quem mede o vão e instala. Azul é o chão de fábrica: quem
   corta a chapa. Não é enfeite — é o que faz o visitante reconhecer "esse sou
   eu" antes de ler qualquer palavra. */
const LADOS = {
  vidracaria: { cor: '#0e8c6a', claro: 'rgba(14,140,106,.09)' },
  industria: { cor: '#0e7b9c', claro: 'rgba(14,123,156,.09)' },
}

/**
 * Vidraçaria: a chapa e a trena.
 *
 * Redesenhado com traço único e pontas arredondadas. A versão anterior
 * misturava três espessuras e picotava a fita em marcações minúsculas — no
 * tamanho de 60 px isso vira sujeira. Aqui são duas formas limpas: a chapa com
 * um reflexo, e a trena com corpo redondo e quatro marcas espaçadas.
 */
function IconeVidracaria({ cor }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className="h-full w-full">
      <g stroke={cor} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
        {/* a chapa */}
        <rect x="15" y="7" width="34" height="29" rx="4" fill={cor} fillOpacity=".10" />
        <path d="M23 31 L34 14" opacity=".5" />

        {/* a trena, claramente separada da chapa: corpo redondo, fita reta,
            quatro marcas espaçadas — não um pente de riscos */}
        <circle cx="13" cy="51" r="6" fill={cor} fillOpacity=".14" />
        <path d="M19 51 H52" />
        <path d="M27 51 v-5M35 51 v-5M43 51 v-5" strokeWidth="2.8" opacity=".75" />
      </g>
    </svg>
  )
}

/**
 * Indústria: a chapa e a engrenagem.
 *
 * A engrenagem antes era feita de riscos soltos em volta de um círculo e lia
 * como um sol. Agora os dentes são parte do contorno, no mesmo traço da chapa.
 */
function IconeIndustria({ cor }) {
  // oito dentes desenhados como trapézios sobre o círculo
  const dentes = Array.from({ length: 8 }, (_, k) => k * 45)
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className="h-full w-full">
      <g stroke={cor} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
        {/* a chapa, em pé */}
        <rect x="6" y="15" width="19" height="34" rx="4" fill={cor} fillOpacity=".12" />
        <path d="M11 43 L20 22" opacity=".5" />

        {/* a engrenagem */}
        <g>
          {dentes.map((g) => (
            <path
              key={g}
              d="M40.6 19 h4.8 l-0.7 4.6 h-3.4 z"
              fill={cor}
              stroke={cor}
              strokeWidth="2.4"
              transform={`rotate(${g} 43 32)`}
            />
          ))}
          <circle cx="43" cy="32" r="10" fill="#fff" />
          <circle cx="43" cy="32" r="10" fill={cor} fillOpacity=".12" />
          <circle cx="43" cy="32" r="3.8" />
        </g>
      </g>
    </svg>
  )
}

const ICONES = { vidracaria: IconeVidracaria, industria: IconeIndustria }

export default function Home({ rota }) {
  const { idioma } = useIdioma()
  const t = useTextos().home

  // Quem já escolheu um lado nos últimos 30 dias não precisa escolher de novo.
  // O desvio é só no cliente: robô de busca nunca tem essa memória, então o
  // Google continua enxergando esta página como ela é.
  useEffect(() => {
    const lado = lerLado()
    if (lado) rota.ir(lado, { lembrado: true })
  }, [rota])

  const escolher = (id) => (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    gravarLado(id)
    evento('porta', { lado: id, idioma })
    rota.ir(id)
  }

  return (
    <Revelar as="section" className="secao mx-auto max-w-[1240px] px-5 pb-14 pt-[92px] sm:px-8 sm:pt-[104px]">
      {/* ── 1º: a promessa ─────────────────────────────────────────────── */}
      <div className="mx-auto max-w-[860px] text-center">
        <p className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-verde" aria-hidden="true" />
          <span className="cota normal-case">{t.etiqueta}</span>
        </p>

        <h1 className="display mx-auto mt-5 max-w-[17ch] text-[clamp(27px,5vw,58px)] leading-[1.06]">
          {t.titulo.antes} <span className="marca">{t.titulo.destaque}</span> {t.titulo.depois}
        </h1>

        {/* A frase da marca desceu para cá: pequena, discreta, como assinatura
            do título. No topo ela competia com a promessa; aqui ela confirma. */}
        <p className="mt-4 text-[14px] font-semibold text-dim sm:text-[15px]">{t.legenda}</p>
      </div>

      {/* ── 2º: a escolha ──────────────────────────────────────────────── */}
      <p className="mt-9 text-center text-[16px] font-extrabold text-ink sm:mt-11 sm:text-[18px]">
        {t.pergunta}
      </p>

      {/* Dois por linha TAMBÉM no celular. É o que mantém a página numa tela
          só — e o que obriga cada cartão a caber em ~170 px: uma palavra de
          título, três de apoio, e o cartão inteiro como área de clique. Uma
          linha de "ver como funciona" não caberia aqui, e não faz falta: o
          cartão já é o botão. */}
      <div className="mx-auto mt-5 grid max-w-[720px] grid-cols-2 gap-3 sm:mt-6 sm:gap-5">
        {t.portas.map((porta) => {
          const lado = LADOS[porta.id]
          const Icone = ICONES[porta.id]
          return (
            <a
              key={porta.id}
              href={caminhoDe(porta.id, idioma)}
              onClick={escolher(porta.id)}
              className="group relative flex flex-col items-center overflow-hidden rounded-[20px] border bg-card px-3 pb-6 pt-7 text-center transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-30px_rgba(20,55,80,.45)] sm:px-6 sm:pb-8 sm:pt-9"
              style={{ borderColor: 'var(--line, #e4e9ee)' }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = lado.cor)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = '')}
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[5px]"
                style={{ background: lado.cor }}
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                style={{ background: lado.claro }}
              />

              <span
                className="relative flex h-[62px] w-[62px] items-center justify-center rounded-[18px] p-3 transition-transform duration-200 group-hover:scale-105 sm:h-[74px] sm:w-[74px] sm:p-3.5"
                style={{ background: lado.claro }}
              >
                <Icone cor={lado.cor} />
              </span>

              <h2 className="display relative mt-4 max-w-[12ch] text-[clamp(16px,3.9vw,24px)] leading-[1.12]">
                {porta.rotulo}
              </h2>
              <span
                aria-hidden="true"
                className="relative mt-3 block h-[3px] w-8 rounded-full"
                style={{ background: lado.cor }}
              />
              <p className="relative mt-3 max-w-[22ch] text-[13px] leading-[1.45] text-dim sm:text-[14.5px]">
                {porta.texto}
              </p>
            </a>
          )
        })}
      </div>

      {/* A terceira saída, agora como pílula: no celular ela era um link de
          texto solto e ninguém percebia que era clicável. */}
      <p className="mt-5 text-center sm:mt-6">
        <a
          href={caminhoDe('plataforma', idioma)}
          onClick={(e) => {
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
            e.preventDefault()
            evento('porta', { lado: 'duvida', idioma })
            rota.ir('plataforma')
          }}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-5 py-2.5 text-[14px] font-bold text-dim transition-colors hover:border-verde hover:text-ink"
        >
          {t.duvida}
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
            <path
              d="M5 12h13m-5-6l6 6-6 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </p>

      {/* ── 3º: o produto, menor e ao fundo ────────────────────────────── */}
      <div className="mt-12 sm:mt-16">
        <p className="cota mb-4 text-center uppercase">{t.painel}</p>
        <div className="flex justify-center">
          <div
            className="w-full max-w-[440px] origin-top"
            style={{ transform: 'perspective(1600px) rotateX(7deg)' }}
          >
            <Telas variantes={['pedidos', 'corte', 'design']} />
          </div>
        </div>
      </div>
    </Revelar>
  )
}
