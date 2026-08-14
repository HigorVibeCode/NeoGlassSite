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

/** O vão com a trena: quem mede na obra. */
function IconeVidracaria({ cor }) {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
      <rect x="9" y="11" width="46" height="38" rx="2" fill="none" stroke={cor} strokeWidth="3.4" />
      <rect x="15" y="17" width="34" height="26" rx="1" fill={cor} fillOpacity=".12" />
      <path d="M32 17v26" stroke={cor} strokeWidth="2.6" />
      <g stroke={cor} strokeWidth="2.6" strokeLinecap="round">
        <path d="M9 56h46" />
        <path d="M9 52.5v7M55 52.5v7" />
      </g>
    </svg>
  )
}

/** A chapa sobre a mesa de corte: quem beneficia e entrega. */
function IconeIndustria({ cor }) {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
      {/* a chapa, com o pedido já encaixado e a sobra em claro */}
      <rect x="7" y="17" width="50" height="30" rx="1.5" fill="none" stroke={cor} strokeWidth="3.2" />
      <rect x="12" y="22" width="15" height="20" fill={cor} fillOpacity=".18" />
      <rect x="30" y="22" width="12" height="9" fill={cor} fillOpacity=".18" />
      <rect x="30" y="34" width="12" height="8" fill={cor} fillOpacity=".18" />
      <rect x="45" y="22" width="7" height="20" fill={cor} fillOpacity=".06" />
      {/* o cabeçote de corte, descendo sobre a chapa */}
      <path d="M32 5v7" stroke={cor} strokeWidth="3" strokeLinecap="round" />
      <path d="M28 12h8l-4 5z" fill={cor} />
      {/* a mesa */}
      <g stroke={cor} strokeWidth="2.6" strokeLinecap="round">
        <path d="M4 52h56" />
        <path d="M16 52v6M48 52v6" />
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
    <Revelar as="section" className="secao mx-auto max-w-[1240px] px-5 pb-16 pt-[104px] sm:px-8">
      {/* ── 1º: a promessa ─────────────────────────────────────────────── */}
      <div className="mx-auto max-w-[900px] text-center">
        <p className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-verde" aria-hidden="true" />
          <span className="cota normal-case">{t.etiqueta}</span>
        </p>

        <h1 className="display mx-auto mt-6 max-w-[15ch] text-[clamp(36px,6.2vw,74px)] leading-[1]">
          {t.titulo.antes} <span className="marca">{t.titulo.destaque}</span>
        </h1>
      </div>

      <p className="mx-auto mt-6 max-w-[52ch] text-center text-[17px] leading-[1.55] text-dim">
        {t.texto}
      </p>

      {/* ── 2º: as duas portas ─────────────────────────────────────────── */}
      <div className="mx-auto mt-11 grid max-w-[900px] gap-4 sm:grid-cols-2 sm:gap-5">
        {t.portas.map((porta) => {
          const lado = LADOS[porta.id]
          const Icone = ICONES[porta.id]
          return (
            <a
              key={porta.id}
              href={caminhoDe(porta.id, idioma)}
              onClick={escolher(porta.id)}
              className="group relative flex flex-col overflow-hidden rounded-[22px] border-2 bg-card px-6 py-7 text-center transition-all duration-200 hover:-translate-y-1.5 sm:px-8 sm:py-9"
              style={{ borderColor: 'var(--line, #e4e9ee)' }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = lado.cor)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = '')}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                style={{ background: lado.claro }}
              />

              <span
                className="relative mx-auto flex h-[68px] w-[68px] items-center justify-center rounded-[18px] p-3.5 transition-transform duration-200 group-hover:scale-105"
                style={{ background: lado.claro }}
              >
                <Icone cor={lado.cor} />
              </span>

              <h2 className="display relative mt-5 text-[clamp(22px,2.6vw,30px)] leading-[1.12]">
                {porta.rotulo}
              </h2>
              <p className="relative mx-auto mt-2.5 max-w-[32ch] text-[15px] leading-[1.5] text-dim">
                {porta.texto}
              </p>

              <span
                className="relative mx-auto mt-auto inline-flex items-center gap-2 pt-6 text-[15px] font-extrabold"
                style={{ color: lado.cor }}
              >
                {porta.acao}
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  <path
                    d="M5 12h13m-5-6l6 6-6 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
          )
        })}
      </div>

      {/* A terceira saída. Existe porque a pesquisa é clara: obrigado a escolher
          entre duas caixas, quem não se reconhece em nenhuma vai embora. */}
      <p className="mt-7 text-center">
        <a
          href={caminhoDe('plataforma', idioma)}
          onClick={(e) => {
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
            e.preventDefault()
            evento('porta', { lado: 'duvida', idioma })
            rota.ir('plataforma')
          }}
          className="text-[14.5px] font-semibold text-dim underline decoration-line underline-offset-4 transition-colors hover:text-ink"
        >
          {t.duvida}
        </a>
      </p>

      {/* ── 3º: o produto, ao fundo ────────────────────────────────────── */}
      <div className="relative mt-14 sm:mt-16">
        <p className="cota mb-5 text-center uppercase">{t.painel}</p>
        {/* Inclinado e um pouco menor: o desenho fica presente sem disputar com
            as portas. Quem quiser olhar de perto tem os três nomes embaixo. */}
        <div className="flex justify-center">
          <div
            className="w-full max-w-[560px] origin-top"
            style={{ transform: 'perspective(1600px) rotateX(7deg)' }}
          >
            <Telas variantes={['pedidos', 'corte', 'design']} />
          </div>
        </div>
      </div>
    </Revelar>
  )
}
