import { useEffect } from 'react'
import Fundo from './components/Fundo.jsx'
import { Rodape, Topo } from './components/Comum.jsx'
import Industria from './paginas/Industria.jsx'
import Vidracaria from './paginas/Vidracaria.jsx'
import Plataforma from './paginas/Plataforma.jsx'
import Comecar from './paginas/Comecar.jsx'
import Home from './paginas/Home.jsx'
import { esquecerLado } from './lib/lado.js'
import { useRota } from './lib/rota.js'
import { marcarAparelho } from './lib/dispositivo.js'
import { ligarPixel, evento } from './lib/rastreio.js'
import { ProvedorIdioma } from './i18n/idioma.jsx'
import { textosDe } from './conteudo/index.js'

const PAGINAS = {
  home: Home,
  industria: Industria,
  vidracaria: Vidracaria,
  plataforma: Plataforma,
  comecar: Comecar,
}

/**
 * A tarja de "você está vendo a versão para X".
 *
 * Só aparece quando o visitante chegou àquela página pela memória do site, e
 * não por um clique. Sem ela, lembrar a escolha vira sequestro: a pessoa digita
 * o endereço, cai num lugar que não pediu, e não entende por quê.
 */
function Lembrete({ rota }) {
  const c = rota.textos?.home?.lembrete
  if (!rota.lembrado || !c?.[rota.id]) return null
  // No celular a tarja vai para o RODAPÉ da tela. Em cima ela tapava alguma
  // coisa em qualquer altura que eu escolhesse — primeiro as abas, depois a
  // linha da prancha. Embaixo é onde o polegar está e onde não há conteúdo
  // sendo lido. No computador, onde sobra espaço, ela continua no alto.
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 lg:bottom-auto lg:top-[76px]">
      <p className="pointer-events-auto flex max-w-full items-center gap-2.5 rounded-full border border-line bg-card px-3.5 py-2 text-[12.5px] font-semibold text-dim shadow-[0_10px_30px_-14px_rgba(20,55,80,.5)] sm:text-[13px]">
        {c[rota.id]}
        <button
          type="button"
          onClick={() => {
            esquecerLado()
            rota.ir('home')
          }}
          className="font-extrabold text-verde underline underline-offset-4"
        >
          {c.trocar}
        </button>
      </p>
    </div>
  )
}

export default function App() {
  // O idioma sai da URL, então ele já está resolvido antes do primeiro desenho
  // — não existe o piscar de conteúdo em português antes de virar alemão.
  const rota = useRota(textosDe)
  const { textos } = rota

  useEffect(() => {
    marcarAparelho()
    ligarPixel()
  }, [])

  useEffect(() => {
    evento('aba', { aba: rota.id, idioma: rota.idioma })
  }, [rota.id, rota.idioma])

  const Pagina = PAGINAS[rota.id] ?? Home

  return (
    <ProvedorIdioma idioma={rota.idioma} conteudo={textos}>
      <Fundo />
      <Topo rota={rota} />
      <Lembrete rota={rota} />
      <main key={`${rota.id}-${rota.idioma}`} className="pagina">
        <Pagina rota={rota} />
      </main>
      <Rodape rota={rota} />
    </ProvedorIdioma>
  )
}
