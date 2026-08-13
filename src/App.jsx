import { useEffect } from 'react'
import Fundo from './components/Fundo.jsx'
import { Rodape, Topo } from './components/Comum.jsx'
import Industria from './paginas/Industria.jsx'
import Vidracaria from './paginas/Vidracaria.jsx'
import Plataforma from './paginas/Plataforma.jsx'
import { useRota } from './lib/rota.js'
import { marcarAparelho } from './lib/dispositivo.js'
import { ligarPixel, evento } from './lib/rastreio.js'
import { ProvedorIdioma } from './i18n/idioma.jsx'
import { textosDe } from './conteudo/index.js'

const PAGINAS = {
  industria: Industria,
  vidracaria: Vidracaria,
  plataforma: Plataforma,
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

  const Pagina = PAGINAS[rota.id] ?? Industria

  return (
    <ProvedorIdioma idioma={rota.idioma} conteudo={textos}>
      <Fundo />
      <Topo rota={rota} />
      <main key={`${rota.id}-${rota.idioma}`}>
        <Pagina />
      </main>
      <Rodape rota={rota} />
    </ProvedorIdioma>
  )
}
