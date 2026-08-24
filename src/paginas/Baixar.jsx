import { useEffect, useState } from 'react'
import { Revelar } from '../components/Comum.jsx'
import { CONFIG } from '../config.js'
import { evento } from '../lib/rastreio.js'
import { useTextos } from '../i18n/idioma.jsx'

/**
 * A página de instalar o NeoGlass.
 *
 * A VERDADE QUE ESTA PÁGINA RESPEITA: o site institucional (neoglass.online)
 * NÃO é um PWA e não se instala — de propósito (ver public/sw.js, o coveiro do
 * worker antigo). O que se instala é o SISTEMA, a plataforma em
 * app.neoglass.online, que é o PWA de verdade. Instalar o site daria à pessoa
 * um ícone que abre uma página de vendas — não o programa.
 *
 * Por isso NÃO existe aqui um botão de "instalar num toque": o evento
 * `beforeinstallprompt` do navegador só nasce no domínio do app, não neste.
 * Prometer esse botão aqui e ele nunca aparecer é o tipo de coisa que derruba a
 * confiança. Então a página é honesta:
 *
 *   1. um botão que abre o NeoGlass (o app), que é onde a instalação mora;
 *   2. o passo a passo de "deixar como app", específico do aparelho —
 *      iPhone/iPad (Safari), Android (Chrome) ou computador (Chrome/Edge).
 *
 * Quem já está com o app instalado (rodando em tela cheia) vê só o botão de
 * abrir. A conta é a mesma: instalar não cria nada novo.
 */

function detectar() {
  if (typeof navigator === 'undefined') return 'desktop'
  const ua = navigator.userAgent || ''
  const standalone =
    window.matchMedia?.('(display-mode: standalone)')?.matches || navigator.standalone === true
  if (standalone) return 'instalado'
  // iPadOS 13+ se disfarça de Mac: só o toque o entrega.
  const iOS = /iphone|ipad|ipod/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  if (iOS) return 'ios'
  const android = /android/i.test(ua)
  return android ? 'android' : 'desktop'
}

export default function Baixar() {
  const c = useTextos()
  const t = c.baixar
  const [aparelho, setAparelho] = useState('desktop')

  useEffect(() => {
    setAparelho(detectar())
  }, [])

  const instalado = aparelho === 'instalado'
  // A qual conjunto de passos mostrar. 'instalado' não mostra passos.
  const passos = t.passos[aparelho === 'instalado' ? 'desktop' : aparelho]

  return (
    <Revelar
      as="section"
      className="secao mx-auto max-w-[1240px] px-5 pb-24 pt-[112px] sm:px-8 sm:pt-[136px]"
    >
      <div className="mx-auto w-full max-w-[560px] text-center">
        {/* o ícone do app, o mesmo que vai para a tela */}
        <img
          src="/brand/neoglass-mark-180.png"
          alt="NeoGlass"
          width="72"
          height="72"
          className="mx-auto h-[72px] w-[72px] rounded-[18px] shadow-[0_18px_40px_-18px_rgba(20,55,80,.5)]"
        />

        <p className="cota mt-6 uppercase opacity-70">{t.rotulo}</p>
        <h1 className="display mt-3 text-balance text-[clamp(30px,5.4vw,48px)] leading-[1.06]">
          {t.titulo.antes} <span className="marca">{t.titulo.destaque}</span>
        </h1>
        <p className="mx-auto mt-5 max-w-[46ch] text-[16.5px] leading-[1.55] text-dim">{t.subtitulo}</p>

        {/* ── o botão que abre o app (onde a instalação mora) ──────────────── */}
        <div className="mx-auto mt-9 max-w-[420px]">
          <a
            href={CONFIG.app}
            target="_blank"
            rel="noopener"
            onClick={() => evento('pwa', { passo: instalado ? 'abrir-instalado' : 'abrir-app', aparelho })}
            className="botao-marca inline-block w-full px-7 py-4 text-[16px] transition-transform duration-200 hover:-translate-y-0.5"
          >
            {instalado ? t.abrir : t.abrirInstalar}
          </a>
          <p className={`mt-3 text-[13px] font-semibold ${instalado ? 'text-verde' : 'text-dim'}`}>
            {instalado ? t.jaInstalado : t.abrirNota}
          </p>
        </div>

        {/* ── o passo a passo de deixar como app, conforme o aparelho ──────── */}
        {!instalado && (
          <div className="mx-auto mt-8 max-w-[420px] rounded-[18px] border border-line bg-card px-6 py-6 text-left">
            <p className="text-center text-[14px] font-bold text-ink">{t.comoTitulo}</p>
            <ol className="mt-4 grid gap-3">
              {passos.map((p, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-verde/12 text-[12px] font-bold text-verde">
                    {i + 1}
                  </span>
                  <span className="text-[14.5px] leading-snug text-ink">{p}</span>
                </li>
              ))}
            </ol>
            {aparelho === 'ios' && (
              <p className="mt-4 rounded-[12px] bg-soft px-4 py-3 text-[12.5px] leading-snug text-dim">
                {t.iosNota}
              </p>
            )}
          </div>
        )}

        {/* três razões, curtas — por que deixar como app em vez de só abrir no site */}
        <dl className="mx-auto mt-12 grid max-w-[520px] gap-4 text-left sm:grid-cols-3 sm:gap-5 sm:text-center">
          {t.motivos.map((m) => (
            <div key={m.nome} className="flex items-start gap-3 sm:block">
              <span
                aria-hidden="true"
                className="mt-1.5 block h-2 w-2 shrink-0 rounded-full sm:mx-auto sm:mt-0 sm:mb-3"
                style={{ background: '#0e8c6a' }}
              />
              <div>
                <dt className="text-[14.5px] font-bold text-ink sm:mt-0">{m.nome}</dt>
                <dd className="mt-1 text-[13.5px] leading-snug text-dim">{m.texto}</dd>
              </div>
            </div>
          ))}
        </dl>

        <p className="mx-auto mt-10 max-w-[42ch] text-[13.5px] leading-snug text-dim">
          {t.mesmaConta}
        </p>
      </div>
    </Revelar>
  )
}
