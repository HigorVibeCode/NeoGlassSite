import { useEffect } from 'react'
import Fundo from './components/Fundo.jsx'
import { Rodape, Topo } from './components/Comum.jsx'
import Industria from './paginas/Industria.jsx'
import Vidracaria from './paginas/Vidracaria.jsx'
import Plataforma from './paginas/Plataforma.jsx'
import { useRota } from './lib/rota.js'
import { marcarAparelho } from './lib/dispositivo.js'
import { ligarPixel, evento } from './lib/rastreio.js'

const PAGINAS = {
  industria: Industria,
  vidracaria: Vidracaria,
  plataforma: Plataforma,
}

export default function App() {
  const { aba, ir } = useRota()

  useEffect(() => {
    marcarAparelho()
    ligarPixel()
  }, [])

  useEffect(() => {
    evento('aba', { aba: aba.id })
  }, [aba.id])

  const Pagina = PAGINAS[aba.id] ?? Industria

  return (
    <>
      <Fundo />
      <Topo aba={aba} ir={ir} />
      <main key={aba.id}>
        <Pagina />
      </main>
      <Rodape ir={ir} />
    </>
  )
}
