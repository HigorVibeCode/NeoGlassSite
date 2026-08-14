import { useEffect, useRef, useState } from 'react'
import { CONFIG } from '../config.js'
import { evento } from '../lib/rastreio.js'
import { useIdioma } from '../i18n/idioma.jsx'

/**
 * A agenda do Calendly, embutida na própria página.
 *
 * Por que embutida e não um botão que abre outra aba: quem clica em "agendar" e
 * vai parar num site com outra cara perde metade do caminho. Aqui ele escolhe o
 * horário sem sair da página que acabou de convencê-lo.
 *
 * O script do Calendly pesa e vem de fora, então ele só é baixado quando a
 * seção CHEGA NA TELA — não no carregamento. Numa página que o visitante
 * abandona antes de rolar até o fim, ele nunca é baixado. É a mesma razão pela
 * qual o filme só começa a rodar quando entra no campo de visão.
 *
 * E existe um caminho de fuga: se o script não carregar (bloqueador de anúncio,
 * rede da fábrica, extensão de privacidade), o visitante não fica olhando para
 * um retângulo vazio — aparece um link direto para o Calendly.
 */
export default function Agenda() {
  const { c } = useIdioma()
  const ref = useRef(null)
  const caixa = useRef(null)
  const [estado, setEstado] = useState('esperando') // esperando · carregando · pronto · falhou

  // A cor da marca vai na URL: o widget é um iframe, e CSS daqui não o alcança.
  const url = `${CONFIG.agendar}?primary_color=0e8c6a&hide_gdpr_banner=1`

  useEffect(() => {
    if (!CONFIG.agendar) return
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        io.disconnect()
        setEstado('carregando')

        // O script é global e pode já ter sido carregado por outra seção.
        const jaTem = document.querySelector('script[data-calendly]')
        if (jaTem && window.Calendly) return setEstado('pronto')

        const s = jaTem ?? document.createElement('script')
        s.src = 'https://assets.calendly.com/assets/external/widget.js'
        s.async = true
        s.dataset.calendly = ''
        s.addEventListener('load', () => setEstado('pronto'))
        s.addEventListener('error', () => setEstado('falhou'))
        if (!jaTem) document.head.appendChild(s)

        // Rede lenta demais é a mesma coisa que rede quebrada, para quem espera.
        setTimeout(() => setEstado((v) => (v === 'carregando' ? 'falhou' : v)), 9000)
      },
      { rootMargin: '300px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  /* O Calendly monta os widgets uma vez só, quando o script dele carrega. Quem
     entra pela página da indústria e depois clica em "Plataforma" não recarrega
     nada — o React desmonta esta seção e monta outra igual, e o script, que já
     está na página, não fica sabendo. O resultado seria uma moldura vazia. Por
     isso, quando o script já existe, a montagem é pedida na mão; o `if` do
     iframe evita a segunda agenda em cima da primeira. */
  useEffect(() => {
    if (estado !== 'pronto') return
    const alvo = caixa.current
    if (!alvo || alvo.querySelector('iframe') || !window.Calendly) return
    window.Calendly.initInlineWidget({ url, parentElement: alvo })
  }, [estado, url])

  if (!CONFIG.agendar) return null

  return (
    /* A margem negativa no celular não é enfeite: o widget do Calendly quebra
       o próprio layout abaixo de 320px de largura, e dentro do cartão sobravam
       294. Os dois lados de volta dão 326. */
    <div ref={ref} className="-mx-4 min-w-0 sm:mx-0">
      {estado === 'falhou' ? (
        <div className="flex min-h-[420px] flex-col items-start justify-center gap-4 rounded-[20px] border border-line bg-soft/40 px-7 py-10">
          <p className="text-[15.5px] font-bold text-ink">{c.agenda.semScript}</p>
          <a
            href={CONFIG.agendar}
            target="_blank"
            rel="noreferrer"
            onClick={() => evento('agendar', { origem: 'agenda-fallback' })}
            className="botao-marca px-6 py-3 text-[15px]"
          >
            {c.agenda.abrirFora}
          </a>
        </div>
      ) : (
        <>
          <div
            ref={caixa}
            className="calendly-inline-widget overflow-hidden rounded-[20px] border border-line bg-card"
            data-url={url}
            style={{ minWidth: '320px', height: 'clamp(560px, 72vh, 720px)' }}
            onClick={() => evento('agendar', { origem: 'calendly' })}
          />
          {estado !== 'pronto' && (
            <p className="cota mt-3 normal-case">{c.agenda.carregando}</p>
          )}
        </>
      )}
    </div>
  )
}
