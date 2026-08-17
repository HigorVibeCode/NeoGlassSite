import { useEffect } from 'react'
import Apresentacao from '../components/Apresentacao.jsx'
import Lugar from '../components/Lugar.jsx'
import Proposito from '../components/Proposito.jsx'
import Fluxo from '../components/Fluxo.jsx'
import Inteligencia from '../components/Inteligencia.jsx'
import Dados from '../components/Dados.jsx'
import Continuidade from '../components/Continuidade.jsx'
import Visao from '../components/Visao.jsx'
import Futuro from '../components/Futuro.jsx'
import Nasceu from '../components/Nasceu.jsx'
import { Chamada } from '../components/Comum.jsx'
import { useTextos } from '../i18n/idioma.jsx'
import { ligarScrollPlataforma } from '../lib/scrollPlataforma.js'

/**
 * A página /plataforma.
 *
 *   01  orgulho      — a promessa
 *   02  origem       — lugar + propósito
 *   03  o que faz    — código, IA, dados, continuidade
 *   04  horizonte    — continua, a indústria, o mundo
 *   05  ver aberto
 */
export default function Plataforma() {
  const t = useTextos().plataforma

  useEffect(() => ligarScrollPlataforma(), [])

  return (
    <>
      <Apresentacao />
      <Lugar />
      <Proposito />
      <Fluxo />
      <Inteligencia />
      <Dados />
      <Continuidade />
      <Visao />
      <Futuro />
      <Nasceu />
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
