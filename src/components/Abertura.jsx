import CartaoIA from './CartaoIA.jsx'
import { Bloco } from './Comum.jsx'
import { ehExterno, linkAgendar, linkWhatsapp } from '../config.js'
import { evento } from '../lib/rastreio.js'

/**
 * A abertura de cada aba. A mesma arquitetura, o mesmo compasso — o que muda é
 * quem está do outro lado da tela.
 *
 * O prisma saiu daqui: agora ele é o plano de fundo do site inteiro, e o
 * cartão flutua sobre ele.
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
}) {
  const padrao = linkAgendar()
  const principal = acao ?? { rotulo: 'Ver demonstração', href: padrao, externo: ehExterno(padrao) }

  return (
    <section
      id="topo"
      className="relative mx-auto flex min-h-[100svh] w-full max-w-[1240px] flex-col justify-center px-5 pb-16 pt-[136px] sm:px-8 lg:pt-[116px]"
    >
      <Bloco rotulo={rotulo} folha={folha} />

      <div className="mt-8 grid min-w-0 items-center gap-12 lg:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)] lg:gap-8">
        <div>
          <h1 className="display max-w-[13ch] text-[clamp(31px,5.6vw,68px)]">{titulo}</h1>

          <p className="mt-7 max-w-[46ch] text-[17px] leading-[1.55] text-dim">{texto}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={principal.href}
              target={principal.externo ? '_blank' : undefined}
              rel={principal.externo ? 'noreferrer' : undefined}
              onClick={() => evento(acao ? 'comecar' : 'agendar', { origem })}
              className="botao-marca px-7 py-3.5 text-[15px] transition-transform duration-200 hover:-translate-y-0.5"
            >
              {principal.rotulo}
            </a>
            <a
              href={linkWhatsapp('Olá! Vim pelo site do NeoGlass.')}
              target="_blank"
              rel="noreferrer"
              onClick={() => evento('whatsapp', { origem })}
              className="rounded-[13px] border border-line bg-card px-6 py-3.5 text-[15px] font-bold text-ink transition-colors hover:border-verde hover:text-verde"
            >
              Falar no WhatsApp
            </a>
          </div>

          {nota && <p className="cota mt-4 max-w-[46ch] normal-case leading-snug">{nota}</p>}

          <dl className="mt-11 flex flex-wrap gap-x-10 gap-y-5">
            {marcas.map(([n, d]) => (
              <div key={d}>
                <dt className="display text-[28px] leading-none">{n}</dt>
                <dd className="cota mt-2 max-w-[20ch] normal-case">{d}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex min-w-0 flex-col items-start gap-3 lg:items-center">
          <p className="cota flex items-center gap-2 uppercase">
            <i
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: '#0e8c6a' }}
            />
            {etiqueta}
          </p>
          <CartaoIA />
        </div>
      </div>
    </section>
  )
}
