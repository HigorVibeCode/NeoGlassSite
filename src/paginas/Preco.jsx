import { Bloco, Revelar } from '../components/Comum.jsx'
import { CONFIG, acaoComecar, precoVidracaria } from '../config.js'
import { destinoComecar } from '../lib/paginasSeo.js'
import { evento } from '../lib/rastreio.js'
import { useIdioma } from '../i18n/idioma.jsx'

/**
 * O preço da vidraçaria.
 *
 * Esta seção é hoje um cartão e nada mais: selo do plano, o número, a linha do
 * preço fixo, as três coisas que NÃO são cobradas, o botão e o aviso do teste.
 *
 * O que saiu, e por quê:
 *   · o parágrafo de abertura citava "a janela que você acabou de orçar deu
 *     R$ 1.169". A demonstração do vão saiu da página — a frase passou a
 *     apontar para uma coisa que o visitante nunca viu;
 *   · a lista "Está tudo incluído" (sete itens), a caixa de comparação e as
 *     duas notas de rodapé: o dono as leu na tela e a seção tinha 2.400 px,
 *     duas telas e meia de celular só para dizer um preço;
 *   · "Sem taxa de implantação e sem cobrança por orçamento feito" dizia, em
 *     parágrafo, exatamente o que as três linhas de baixo dizem em lista.
 *
 * Para um vidraceiro o medo não é a mensalidade: é a taxa de implantação que
 * aparece depois e a fidelidade de doze meses. É por isso que, de tudo o que
 * havia aqui, o que ficou foi justamente a lista do que não se cobra.
 *
 * Enquanto `CONFIG.vidracaria.precoMensal` for 0, esta seção não existe.
 */

/* "Por usuário — ponha a equipe toda" saiu daqui em 13/08: o Higor avisou que
   é mentira. O mesmo valia para "usuários à vontade, sem custo por cabeça" na
   lista do que está incluído. Enquanto a regra real de usuários não estiver
   definida, esta seção não fala de usuário nenhum — melhor não dizer nada do
   que prometer o que a cobrança não cumpre. Vale para os quatro idiomas. */

export default function Preco({ centro = false, folha = 'FL. 05/07' }) {
  const { idioma, c } = useIdioma()
  const t = c.vidracaria.preco
  const preco = precoVidracaria(idioma)
  if (!preco) return null

  const { diasTeste } = CONFIG.vidracaria
  const temTeste = diasTeste > 0
  const comecar = destinoComecar(acaoComecar(idioma, c), idioma)

  return (
    <Revelar
      as="section"
      id="preco"
      className="secao mx-auto max-w-[1240px] scroll-mt-[124px] px-5 pb-20 sm:px-8 sm:pb-24"
    >
      {!centro && <Bloco rotulo={t.rotulo} folha={folha} />}
      <h2
        className={`display max-w-[17ch] text-[clamp(28px,4vw,48px)] leading-[1.08] ${
          centro ? 'mx-auto text-center' : 'mt-7'
        }`}
      >
        {t.titulo}
      </h2>

      <div
        className={`mt-8 overflow-hidden rounded-[26px] border border-line bg-card shadow-[0_36px_70px_-46px_rgba(20,55,80,.4)] ${
          centro ? 'mx-auto max-w-[460px]' : ''
        }`}
      >
        <div className="relative overflow-hidden px-6 pb-9 pt-8 sm:px-8">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-[30%] -top-[60%] h-[420px] w-[420px] rounded-full opacity-[0.16]"
            style={{ background: 'radial-gradient(circle, #0e8c6a, transparent 66%)' }}
          />
          <div className={centro ? 'relative flex flex-col items-center text-center' : 'relative'}>
            {/* O nome do plano num selo, não numa linha de texto: é a primeira
                coisa que o olho pega ao chegar aqui, e responde antes da
                pergunta "isso vale para a minha fábrica também?" */}
            <span
              className="cota inline-flex items-center rounded-full px-3 py-1.5 uppercase"
              style={{ background: 'rgba(14,140,106,.1)', color: '#0e8c6a', opacity: 1 }}
            >
              {t.cota}
            </span>

            <p className={`mt-4 flex items-baseline gap-2 ${centro ? 'justify-center' : ''}`}>
              <span className="display text-[clamp(44px,6vw,64px)] leading-none">{preco}</span>
              <span className="text-[16px] font-bold text-dim">{t.porMes}</span>
            </p>

            <p className="mt-3 max-w-[26ch] text-[15px] font-bold leading-snug text-ink">
              {t.fixo}
            </p>

            {/* As três coisas que não se cobra. Em linha única cada uma: com o
                cartão em 460 px elas cabem sem quebrar, e a lista lê como
                lista — não como três parágrafos curtos. */}
            <div className="mt-7 grid w-full gap-px overflow-hidden rounded-[16px] bg-line text-left">
              {t.naoCobramos.map(([rotulo, detalhe]) => (
                <div key={rotulo} className="flex items-center gap-3 bg-card px-4 py-3">
                  <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0" aria-hidden="true">
                    <circle cx="8" cy="8" r="6.4" fill="none" stroke="#c3ccd8" strokeWidth="1.6" />
                    <path d="M4.6 11.4L11.4 4.6" stroke="#c3ccd8" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                  <span className="min-w-0 text-[13.5px] leading-snug">
                    <span className="font-bold text-ink">{rotulo}</span>
                    <span className="text-dim"> — {detalhe}</span>
                  </span>
                </div>
              ))}
            </div>

            <a
              href={comecar.href}
              target={comecar.externo ? '_blank' : undefined}
              rel={comecar.externo ? 'noreferrer' : undefined}
              onClick={() => evento('comecar', { origem: 'preco' })}
              className="botao-marca mt-7 inline-block px-7 py-3.5 text-[15px] transition-transform duration-200 hover:-translate-y-0.5"
            >
              {comecar.rotulo}
            </a>
            {temTeste && (
              <p className="cota mt-3 max-w-[30ch] normal-case leading-snug">
                {t.semCartao(diasTeste)}
              </p>
            )}
          </div>
        </div>
      </div>
    </Revelar>
  )
}
