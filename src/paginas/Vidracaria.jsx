import Abertura from '../components/Abertura.jsx'
import Projeto, { EVENTO_TOCAR } from '../ferramentas/Projeto.jsx'
import Preco from './Preco.jsx'
import { Revelar } from '../components/Comum.jsx'
import { CONFIG, acaoComecar, precoVidracaria } from '../config.js'
import { destinoComecar } from '../lib/paginasSeo.js'
import { useIdioma } from '../i18n/idioma.jsx'

/**
 * A página da vidraçaria.
 *
 * Cinco blocos e nada mais, na ordem que o dono desenhou:
 *
 *   HERO           — a promessa, com a objeção respondida na mesma frase
 *   RECONHECIMENTO — "isso é o meu problema"
 *   PROVA          — o projeto nascendo, num clique só
 *   RESULTADO      — o que muda depois
 *   PREÇO + CTA    — o pedido, no fim, depois de tudo
 *
 * O que saiu e por quê:
 *   · a animação antiga do vão — o dono a considerou ruim, e ela era a peça
 *     mais longa da página. A que está aqui agora é outra coisa: cinco atos,
 *     um por vez, grandes, e o botão da abertura toca ela de longe;
 *   · "nasceu dentro de uma fábrica de vidro" — história de empresa, vive
 *     melhor na página da indústria;
 *   · o antes/depois e "o seu dia" — cortados em rodadas anteriores.
 *
 * O bloco RESULTADO ganhou uma linha concreta embaixo de cada palavra.
 * "Mais organização / segurança / controle" sozinho serve para qualquer
 * software do mundo; com a linha embaixo, passa a servir só para esta.
 */
export default function Vidracaria() {
  const { idioma, c } = useIdioma()
  const t = c.vidracaria
  const preco = precoVidracaria(idioma)
  const { diasTeste } = CONFIG.vidracaria
  const folhas = preco ? '05' : '04'
  // o mesmo destino do botão verde do preço: a demonstração termina pedindo
  const acao = preco ? destinoComecar(acaoComecar(idioma, c), idioma) : undefined

  return (
    <>
      <Abertura
        tela="design"
        centro
        /* O botão da abertura desce até a prova, em contorno e sem o verde da
           marca: ele guia sem competir com o título. O verde — o teste grátis —
           só aparece depois de a pessoa ter visto o produto. */
        acao={{
          rotulo: t.hero.verOrcamento,
          href: '#prova',
          externo: false,
          fantasma: true,
          // desce E toca, no mesmo clique
          dispara: EVENTO_TOCAR,
        }}
        zap={false}
        rotulo={t.hero.rotulo}
        folha={`FL. 01/${folhas}`}
        origem="abertura-vidracaria"
        etiqueta={t.hero.etiqueta}
        titulo={
          <>
            {t.hero.titulo.antes} <span className="marca">{t.hero.titulo.destaque}</span>
          </>
        }
        texto={t.hero.texto}
      />

      {/* ── RECONHECIMENTO ─────────────────────────────────────────────── */}
      <Revelar as="section" className="secao mx-auto max-w-[1240px] px-5 pb-20 sm:px-8 sm:pb-24">
        <div className="mx-auto mt-8 max-w-[46ch] text-center">
          <h2 className="display text-[clamp(26px,3.8vw,44px)] leading-[1.08]">
            {t.reconhecimento.titulo}
          </h2>
          <p className="mt-5 text-[16.5px] leading-[1.55] text-dim">{t.reconhecimento.texto}</p>
          <p
            className="mt-7 rounded-[16px] border px-6 py-5 text-[15.5px] font-bold leading-snug text-ink"
            style={{ borderColor: 'rgba(14,140,106,.3)', background: 'rgba(14,140,106,.07)' }}
          >
            {t.reconhecimento.destaque}
          </p>
        </div>
      </Revelar>

      {/* ── PROVA ──────────────────────────────────────────────────────── */}
      <Revelar
        as="section"
        id="prova"
        className="secao mx-auto max-w-[1240px] px-5 pb-20 sm:px-8 sm:pb-24"
      >
        <div className="mx-auto mt-8 max-w-[50ch] text-center">
          <h2 className="display text-[clamp(26px,3.8vw,44px)] leading-[1.08]">{t.prova.titulo}</h2>
          <p className="mt-5 text-[16.5px] leading-[1.55] text-dim">{t.prova.texto}</p>
        </div>

        {/* A demonstração. Aqui a tela parada não bastava: a promessa da página
            é "projeto em menos de um minuto", e promessa se mostra, não se
            escreve. O hero mantém a tela parada — ela prova em um segundo que
            isto é software; esta prova como se usa. */}
        <div className="mt-10">
          <Projeto acao={acao} />
        </div>

        <ul className="mx-auto mt-8 grid max-w-[860px] gap-4 sm:grid-cols-3 sm:gap-6">
          {t.prova.legendas.map((l) => (
            <li key={l} className="flex items-start gap-2.5 text-center sm:flex-col sm:items-center">
              <span
                aria-hidden="true"
                className="mt-1.5 h-2 w-2 shrink-0 rounded-full sm:mt-0"
                style={{ background: '#0e8c6a' }}
              />
              <span className="text-left text-[14.5px] leading-snug text-dim sm:text-center">
                {l}
              </span>
            </li>
          ))}
        </ul>
      </Revelar>

      {/* ── RESULTADO ──────────────────────────────────────────────────── */}
      <Revelar as="section" className="secao mx-auto max-w-[1240px] px-5 pb-20 sm:px-8 sm:pb-24">
        <h2 className="display mx-auto mt-8 max-w-[22ch] text-center text-[clamp(26px,3.8vw,44px)] leading-[1.08]">
          {t.resultado.titulo}
        </h2>

        <dl className="mx-auto mt-10 grid max-w-[900px] gap-4 sm:grid-cols-3 sm:gap-5">
          {t.resultado.itens.map((item) => (
            <div
              key={item.nome}
              className="rounded-[18px] border border-line bg-card px-6 py-7 text-center"
            >
              <span
                aria-hidden="true"
                className="mx-auto mb-4 block h-[3px] w-8 rounded-full"
                style={{ background: '#0e8c6a' }}
              />
              <dt className="display text-[19px] leading-tight">{item.nome}</dt>
              <dd className="mt-3 text-[14.5px] leading-[1.5] text-dim">{item.texto}</dd>
            </div>
          ))}
        </dl>
      </Revelar>

      {/* PREÇO + CTA num bloco só. O cadastro tinha seção própria, com o mesmo
          botão verde do cartão de preço logo acima — no computador os dois
          apareciam na mesma tela, e com o botão fixo do topo davam três
          "Começar grátis" simultâneos. O texto do cadastro não se perdeu: ele
          entra no rodapé do próprio cartão, onde responde a última objeção
          antes do clique. */}
      {preco && (
        <Preco
          centro
          fecho={{ titulo: t.chamada.titulo, texto: t.chamada.texto(diasTeste) }}
        />
      )}
    </>
  )
}
