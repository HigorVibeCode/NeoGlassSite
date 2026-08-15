import CartaoIA from './CartaoIA.jsx'
import Tela from './Tela.jsx'
import Telas from './Telas.jsx'
import { useIdioma } from '../i18n/idioma.jsx'
import { Bloco } from './Comum.jsx'
import { ehExterno, linkAgendar, linkWhatsapp } from '../config.js'
import { evento } from '../lib/rastreio.js'

/**
 * A abertura de cada aba. Mesma coluna, mesmo título, mesmo botão da Home.
 * Se o hero de uma página for maior que o da outra, o visitante acha que
 * caiu em outro site.
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
  acaoSecundaria,
  nota,
  zap = true,
  tela,
  telas,
}) {
  const { c } = useIdioma()
  const t = c.plataforma.abertura
  const padrao = linkAgendar(c.whatsapp.demonstracao)
  const principal = acao ?? {
    rotulo: t.verDemonstracao,
    href: padrao,
    externo: ehExterno(padrao),
  }
  const secundaria = acaoSecundaria

  return (
    <section id="topo" className="relative faixa flex min-h-[100svh] flex-col justify-center pb-16 pt-[136px] lg:pt-[116px]">
      <div className="coluna">
        <Bloco rotulo={rotulo} folha={folha} />

        <h1 className="titulo-hero mt-8">{titulo}</h1>

        <p className="texto-secao mt-6">{texto}</p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href={principal.href}
            target={principal.externo ? '_blank' : undefined}
            rel={principal.externo ? 'noreferrer' : undefined}
            onClick={() => evento(principal.evento ?? (acao ? 'comecar' : 'agendar'), { origem })}
            className={principal.fantasma ? 'botao-fantasma' : 'botao-marca'}
          >
            {principal.rotulo}
          </a>
          {secundaria ? (
            <a
              href={secundaria.href}
              target={secundaria.externo ? '_blank' : undefined}
              rel={secundaria.externo ? 'noreferrer' : undefined}
              onClick={() =>
                evento(secundaria.evento ?? 'ver', { origem: origem ? `${origem}-sec` : 'abertura' })
              }
              className="botao-fantasma"
            >
              {secundaria.rotulo}
            </a>
          ) : (
            zap && (
              <a
                href={linkWhatsapp(t.whatsapp)}
                target="_blank"
                rel="noreferrer"
                onClick={() => evento('whatsapp', { origem })}
                className="botao-fantasma"
              >
                {c.chrome.falarWhatsapp}
              </a>
            )
          )}
        </div>

        {nota && <p className="cota mt-4 normal-case">{nota}</p>}

        {(marcas ?? []).length > 0 && (
          <dl className="mt-10 grid gap-6">
            {marcas.map(([n, d]) => (
              <div key={d}>
                <dt className="titulo-bloco">{n}</dt>
                <dd className="cota mt-2 normal-case">{d}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>

      <div className="coluna mt-12 flex flex-col items-center gap-3">
        <p className="cota flex items-center gap-2 uppercase">
          <i aria-hidden="true" className="h-1.5 w-1.5 rounded-full" style={{ background: '#0e8c6a' }} />
          {etiqueta}
        </p>
        {telas ? <Telas variantes={telas} /> : tela ? <Tela variante={tela} /> : <CartaoIA />}
      </div>
    </section>
  )
}
