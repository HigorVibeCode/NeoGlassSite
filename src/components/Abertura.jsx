import CartaoIA from './CartaoIA.jsx'
import Tela from './Tela.jsx'
import Telas from './Telas.jsx'
import { useIdioma } from '../i18n/idioma.jsx'
import { Bloco } from './Comum.jsx'
import { ehExterno, linkAgendar, linkWhatsapp } from '../config.js'
import { evento } from '../lib/rastreio.js'
import { semMovimento } from '../lib/dispositivo.js'

/**
 * A abertura de cada aba. A mesma arquitetura, o mesmo compasso — o que muda é
 * quem está do outro lado da tela.
 *
 * O prisma saiu daqui: agora ele é o plano de fundo do site inteiro, e o
 * cartão flutua sobre ele.
 *
 * `zap` controla o botão secundário de WhatsApp: a vidraçaria manda `false`.
 * `telas` recebe uma lista e monta o leque que troca sozinho; `tela` recebe
 * uma só. Um dos dois escolhe o que ocupa o palco à direita — é ela que
 * responde, antes de qualquer texto, à pergunta "isso aqui é o quê?".
 *
 * Rótulo, título, texto e marcas continuam chegando por prop — cada aba manda
 * os seus. O que está escrito aqui dentro (o botão padrão e a mensagem pronta
 * do WhatsApp) vem de `c.plataforma.abertura`, porque este arquivo pertence à
 * área da plataforma; a árvore de textos é carregada inteira, então as três
 * abas leem essa chave sem problema.
 */
export default function Abertura({
  rotulo,
  folha,
  titulo,
  texto,
  marcas,
  etiqueta,
  origem,
  acao,
  nota,
  zap = true,
  tela,
  telas,
  centro = false,
}) {
  const { c } = useIdioma()
  const t = c.plataforma.abertura
  const padrao = linkAgendar(c.whatsapp.demonstracao)
  const principal = acao ?? {
    rotulo: t.verDemonstracao,
    href: padrao,
    externo: ehExterno(padrao),
  }

  return (
    <section
      id="topo"
      className="relative mx-auto flex min-h-[100svh] w-full max-w-[1240px] flex-col justify-center px-5 pb-16 pt-[136px] sm:px-8 lg:pt-[116px]"
    >
      {/* O carimbo de prancha some no modo centralizado: ele é um elemento
          alinhado à esquerda por natureza e brigava com o eixo central. */}
      {!centro && <Bloco rotulo={rotulo} folha={folha} />}

      <div
        className={
          centro
            ? 'mx-auto mt-2 flex w-full min-w-0 max-w-[680px] flex-col items-center gap-10 overflow-x-clip text-center'
            : 'mt-8 grid min-w-0 items-center gap-12 lg:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)] lg:gap-8'
        }
      >
        <div className={centro ? 'flex flex-col items-center' : undefined}>
          <h1 className={`display max-w-[19ch] text-[clamp(28px,4.3vw,54px)] leading-[1.04] ${centro ? 'mx-auto' : ''}`}>{titulo}</h1>

          <p className={`mt-7 max-w-[46ch] text-[17px] leading-[1.55] text-dim ${centro ? 'mx-auto' : ''}`}>{texto}</p>

          <div className={`mt-9 flex flex-wrap items-center gap-3 ${centro ? 'justify-center' : ''}`}>
            <a
              href={principal.href}
              target={principal.externo ? '_blank' : undefined}
              rel={principal.externo ? 'noreferrer' : undefined}
              onClick={() => {
                evento(acao ? 'comecar' : 'agendar', { origem })
                // Um clique, uma coisa. Este botão desce até a prova E toca a
                // demonstração — se fossem dois cliques, o segundo quase
                // ninguém dá, e a animação morreria parada na tela.
                if (principal.dispara)
                  requestAnimationFrame(() =>
                    setTimeout(
                      () => window.dispatchEvent(new CustomEvent(principal.dispara)),
                      semMovimento() ? 0 : 620,
                    ),
                  )
              }}
              className={
                principal.fantasma
                  ? 'group inline-flex items-center gap-3 rounded-full border-[1.5px] border-ink/15 bg-card py-2 pl-6 pr-2 text-[15px] font-bold text-ink shadow-[0_10px_28px_-18px_rgba(20,55,80,.55)] transition-all duration-200 hover:-translate-y-0.5 hover:border-verde hover:text-verde'
                  : 'botao-marca px-7 py-3.5 text-[15px] transition-transform duration-200 hover:-translate-y-0.5'
              }
            >
              {principal.rotulo}
              {/* A seta para BAIXO, e não para a direita: este botão não leva a
                  outra página, ele desce até a prova. Numa pílula branca sem
                  nada dentro ninguém sabia o que ia acontecer ao clicar — e
                  ela lia como caixa de texto, não como botão. */}
              {principal.fantasma && (
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-soft text-verde transition-transform duration-200 group-hover:translate-y-0.5"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4">
                    <path
                      d="M12 5v13m-6-6l6 6 6-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              )}
            </a>
            {/* A vidraçaria não recebe este botão (`zap={false}`). O WhatsApp
                é o atendimento da indústria; oferecê-lo aqui prometeria um
                canal que não existe para esse público — e ainda roubaria o
                clique do único botão que interessa, o do teste grátis. */}
            {zap && (
              <a
                href={linkWhatsapp(t.whatsapp)}
                target="_blank"
                rel="noreferrer"
                onClick={() => evento('whatsapp', { origem })}
                className="rounded-[13px] border border-line bg-card px-6 py-3.5 text-[15px] font-bold text-ink transition-colors hover:border-verde hover:text-verde"
              >
                {c.chrome.falarWhatsapp}
              </a>
            )}
          </div>

          {nota && <p className="cota mt-4 max-w-[46ch] normal-case leading-snug">{nota}</p>}

          <dl className="mt-11 flex flex-wrap gap-x-10 gap-y-5">
            {(marcas ?? []).map(([n, d]) => (
              <div key={d}>
                <dt className="display text-[28px] leading-none">{n}</dt>
                <dd className="cota mt-2 max-w-[20ch] normal-case">{d}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* `overflow-x-clip` aqui pelo mesmo motivo do modo centralizado: as
            cartas de trás do leque ficam deslocadas 26 px para a direita cada
            uma, e no celular esses pixels viravam rolagem horizontal na página
            inteira. Elas são enfeite — podem ser aparadas na borda; a página
            balançando de lado, não. */}
        <div className={`flex min-w-0 flex-col gap-3 overflow-x-clip ${centro ? 'w-full items-center' : 'items-start lg:items-center'}`}>
          <p className="cota flex items-center gap-2 uppercase">
            <i
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: '#0e8c6a' }}
            />
            {etiqueta}
          </p>
          {telas ? <Telas variantes={telas} /> : tela ? <Tela variante={tela} /> : <CartaoIA />}
        </div>
      </div>
    </section>
  )
}
