import { useEffect, useRef, useState } from 'react'
import { IDIOMAS, idiomaDe } from '../i18n/idioma.jsx'
import { caminhoDe } from '../lib/paginasSeo.js'

/**
 * O seletor de idioma do topo.
 *
 * Três decisões que não são óbvias:
 *
 * · Código, não bandeira. Bandeira representa país, e idioma não é país —
 *   espanhol não é a Espanha, alemão não é a Alemanha, e um suíço não se vê
 *   numa bandeira alemã. Além disso "DE" cabe em 26 px, o que resolve o
 *   problema do topo do celular, onde a marca, o Entrar e o botão verde já
 *   disputam espaço abaixo de 380 px.
 *
 * · As opções são links de verdade (`<a href>`), com o endereço final de cada
 *   idioma. O robô do Google segue links; ele não clica em botão que troca
 *   estado no React. Sem isso as versões em inglês, espanhol e alemão só
 *   existiriam para quem chegasse por fora.
 *
 * · Nada de redirecionar sozinho pelo idioma do navegador. Redirecionamento
 *   automático esconde as outras versões do robô e irrita quem escolheu de
 *   propósito. Quem quiser trocar, troca aqui — em um toque.
 */
export default function Idiomas({ idioma, pagina, aoTrocar, claro = false }) {
  const [aberto, setAberto] = useState(false)
  const ref = useRef(null)
  const atual = idiomaDe(idioma)

  useEffect(() => {
    if (!aberto) return
    const fora = (e) => {
      if (!ref.current?.contains(e.target)) setAberto(false)
    }
    const esc = (e) => e.key === 'Escape' && setAberto(false)
    document.addEventListener('pointerdown', fora)
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('pointerdown', fora)
      document.removeEventListener('keydown', esc)
    }
  }, [aberto])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setAberto((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={aberto}
        aria-label={`Idioma: ${atual.nome}`}
        className={`flex min-h-[38px] items-center gap-1.5 rounded-[11px] px-2.5 text-[13.5px] font-bold transition-colors ${
          claro ? 'text-white/70 hover:text-white' : 'text-dim hover:text-ink'
        }`}
      >
        <svg viewBox="0 0 20 20" className="h-[15px] w-[15px] shrink-0" aria-hidden="true">
          <circle cx="10" cy="10" r="7.4" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M2.6 10h14.8M10 2.6c3.4 3.6 3.4 11.2 0 14.8M10 2.6c-3.4 3.6-3.4 11.2 0 14.8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
        {atual.curto}
      </button>

      {aberto && (
        <ul
          role="listbox"
          className="absolute right-0 top-[calc(100%+6px)] z-50 min-w-[164px] overflow-hidden rounded-[14px] border border-line bg-card py-1 shadow-[0_24px_48px_-24px_rgba(20,55,80,.4)]"
        >
          {IDIOMAS.map((i) => (
            <li key={i.codigo}>
              <a
                href={caminhoDe(pagina, i.codigo)}
                hrefLang={i.codigo}
                aria-selected={i.codigo === idioma}
                onClick={(e) => {
                  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
                  e.preventDefault()
                  setAberto(false)
                  aoTrocar(i.codigo)
                }}
                className={`flex min-h-[42px] items-center justify-between gap-3 px-4 text-[14.5px] transition-colors ${
                  i.codigo === idioma
                    ? 'bg-soft font-bold text-ink'
                    : 'font-semibold text-dim hover:bg-soft/60 hover:text-ink'
                }`}
              >
                {i.nome}
                <span className="cota shrink-0">{i.curto}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
