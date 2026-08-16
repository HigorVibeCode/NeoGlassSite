import Apresentacao from '../components/Apresentacao.jsx'
import Fluxo from '../components/Fluxo.jsx'
import Nasceu from '../components/Nasceu.jsx'
import Visao from '../components/Visao.jsx'
import { Chamada } from '../components/Comum.jsx'
import { useTextos } from '../i18n/idioma.jsx'

/**
 * A página /plataforma. Quatro atos depois da abertura — e nada mais.
 *
 *   01  orgulho — o que é, o tamanho (leque)
 *   02  origem — mapa de rede, da fábrica para o mundo
 *   03  um vidro, um código — as partes juntas
 *   04  a plataforma continua — as quatro frentes
 *   05  ver o NeoGlass aberto
 *
 * A hero já mostrou o produto. O resto não o repete.
 */
export default function Plataforma() {
  const t = useTextos().plataforma

  return (
    <>
      <Apresentacao />
      <Nasceu />
      <Fluxo />
      <Visao />
      <Chamada
        titulo={t.chamada.titulo}
        texto={t.chamada.texto}
        botao={t.chamada.botao}
        agenda
        agendaBotao
        centro
      />
    </>
  )
}
