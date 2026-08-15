import { useEffect } from 'react'
import Fluxo from '../components/Fluxo.jsx'
import { Revelar, Secao } from '../components/Comum.jsx'
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
 * Vidraçaria: a trena medindo a chapa.
 *
 * O desenho anterior era um vão de janela com uma cota embaixo — e vão de
 * janela é vocabulário de construção civil, não de vidro. Martelo, furadeira e
 * janela ficaram de fora pelo mesmo motivo. O que identifica este ofício é o
 * gesto de medir o vidro: a chapa com o reflexo, e a trena aberta por baixo
 * dela, com o gancho na ponta.
 */
function IconeVidracaria({ cor }) {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
      {/* a chapa, com dois reflexos que é o que faz o olho ler "vidro" */}
      <g transform="rotate(-3 32 24)">
        <rect
          x="15"
          y="7"
          width="34"
          height="31"
          rx="1.5"
          fill={cor}
          fillOpacity=".10"
          stroke={cor}
          strokeWidth="3"
        />
        <path d="M21 34 L33 11" stroke={cor} strokeWidth="2.2" opacity=".5" strokeLinecap="round" />
        <path d="M29 35 L41 12" stroke={cor} strokeWidth="2.2" opacity=".3" strokeLinecap="round" />
      </g>

      {/* a trena: corpo, fita esticada, marcações e o gancho na ponta */}
      <rect
        x="5"
        y="45"
        width="13"
        height="13"
        rx="3.5"
        fill={cor}
        fillOpacity=".18"
        stroke={cor}
        strokeWidth="2.8"
      />
      <path d="M18 51.5 H55" stroke={cor} strokeWidth="3.4" strokeLinecap="round" />
      <g stroke={cor} strokeWidth="2.2" strokeLinecap="round" opacity=".75">
        <path d="M26 51.5v-5M34 51.5v-3.5M42 51.5v-5M49 51.5v-3.5" />
      </g>
      <path d="M56.5 46v11" stroke={cor} strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  )
}

/**
 * Indústria: a chapa entrando na linha de produção.
 *
 * Duas chapas empilhadas à esquerda, a seta do processo, e a engrenagem à
 * direita. É a leitura mais direta de "fábrica de vidro" — matéria-prima
 * entrando em beneficiamento — e não depende de reconhecer uma mesa de corte
 * ou um forno, que variam de fábrica para fábrica.
 */
function IconeIndustria({ cor }) {
  const dentes = [0, 45, 90, 135, 180, 225, 270, 315]
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
      {/* as chapas empilhadas, uma atrás da outra */}
      <rect
        x="3"
        y="19"
        width="22"
        height="30"
        rx="1.5"
        fill={cor}
        fillOpacity=".07"
        stroke={cor}
        strokeWidth="2.4"
      />
      <rect
        x="9"
        y="14"
        width="22"
        height="30"
        rx="1.5"
        fill={cor}
        fillOpacity=".16"
        stroke={cor}
        strokeWidth="3"
      />
      <path d="M14 40 L24 19" stroke={cor} strokeWidth="2" opacity=".45" strokeLinecap="round" />

      {/* a passagem para a produção */}
      <g stroke={cor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M33 29 H39" />
        <path d="M36 26 L39.5 29 L36 32" />
      </g>

      {/* a engrenagem */}
      <g stroke={cor} strokeWidth="2.8" strokeLinecap="round" fill="none">
        {dentes.map((g) => (
          <path key={g} d="M53 19 V14.5" transform={`rotate(${g} 53 29)`} />
        ))}
      </g>
      <circle cx="53" cy="29" r="8.5" fill={cor} fillOpacity=".14" stroke={cor} strokeWidth="3" />
      <circle cx="53" cy="29" r="2.8" fill={cor} />
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
    <>
      <Revelar as="section" className="secao faixa pt-[104px]">
        <div className="coluna">
          <p className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-verde" aria-hidden="true" />
            <span className="cota normal-case">{t.etiqueta}</span>
          </p>

          <h1 className="titulo-hero mt-6">
            {t.titulo.antes} <span className="marca">{t.titulo.destaque}</span>
          </h1>

          <p className="texto-secao mt-6">{t.texto}</p>

          <p id="portas" className="pergunta mt-12 scroll-mt-[124px]">
            {t.escolha}
          </p>

          <div className="mt-6 grid gap-4">
            {t.portas.map((porta) => {
              const lado = LADOS[porta.id]
              const Icone = ICONES[porta.id]
              return (
                <a
                  key={porta.id}
                  href={caminhoDe(porta.id, idioma)}
                  onClick={escolher(porta.id)}
                  className="cartao group relative flex min-h-[88px] flex-col overflow-hidden px-6 py-8 text-center"
                  style={{ borderWidth: 2, borderColor: 'var(--line, #e4e9ee)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = lado.cor)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = '')}
                >
                  <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[5px]" style={{ background: lado.cor }} />
                  <span
                    className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-[16px] p-2.5"
                    style={{ background: lado.claro }}
                  >
                    <Icone cor={lado.cor} />
                  </span>
                  <h2 className="titulo-bloco relative mt-4">{porta.rotulo}</h2>
                  <p className="texto-bloco relative mx-auto mt-2 max-w-[32ch]">{porta.texto}</p>
                  <span
                    className="relative mx-auto mt-5 inline-flex items-center gap-2 text-[16px] font-extrabold"
                    style={{ color: lado.cor }}
                  >
                    {porta.acao}
                    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
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

          <a
            href={caminhoDe('plataforma', idioma)}
            onClick={(e) => {
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
              e.preventDefault()
              evento('porta', { lado: 'duvida', idioma })
              rota.ir('plataforma')
            }}
            className="botao-fantasma mt-4 w-full"
          >
            {t.duvida}
          </a>
        </div>
      </Revelar>

      <Fluxo titulo={t.fluxo.titulo} texto={t.fluxo.texto} rotulo={t.fluxo.rotulo} />

      <Secao rotulo={t.problema.rotulo} titulo={t.problema.titulo}>
        <ul className="mt-8 grid gap-2">
          {t.problema.itens.map((item) => (
            <li key={item} className="cartao px-5 py-3 text-[16px] font-semibold text-dim">
              {item}
            </li>
          ))}
        </ul>
        <p className="cota mt-8 uppercase" style={{ color: '#0e8c6a', opacity: 1 }}>
          {t.problema.depoisTitulo}
        </p>
        <ul className="mt-3 grid gap-2">
          {t.problema.depois.map((item) => (
            <li
              key={item}
              className="rounded-[20px] px-5 py-3 text-[16px] font-extrabold text-verde"
              style={{ background: 'rgba(14,140,106,.1)' }}
            >
              {item}
            </li>
          ))}
        </ul>
      </Secao>

      <Secao rotulo={t.diferencial.rotulo} titulo={t.diferencial.titulo} texto={t.diferencial.texto} />

      <Secao rotulo={t.prova.rotulo} titulo={t.prova.titulo}>
        <ul className="mt-10 grid gap-3">
          {t.prova.itens.map(([titulo, texto]) => (
            <li key={titulo} className="cartao px-6 py-6">
              <p className="titulo-bloco">{titulo}</p>
              <p className="texto-bloco mx-auto mt-2 max-w-[36ch]">{texto}</p>
            </li>
          ))}
        </ul>
      </Secao>

      <Secao titulo={t.chamada.titulo}>
        <div className="mt-8 grid gap-3">
          <a href={caminhoDe('vidracaria', idioma)} onClick={escolher('vidracaria')} className="botao-marca w-full">
            {t.chamada.vidracaria}
          </a>
          <a
            href={caminhoDe('industria', idioma)}
            onClick={escolher('industria')}
            className="botao-fantasma w-full"
            style={{ borderColor: '#0e7b9c', color: '#0e7b9c' }}
          >
            {t.chamada.industria}
          </a>
        </div>
      </Secao>
    </>
  )
}
