import { Secao } from '../components/Comum.jsx'
import { CONFIG, acaoComecar, precoVidracaria, valorMensal } from '../config.js'
import { destinoComecar } from '../lib/paginasSeo.js'
import { ORCAMENTO_EXEMPLO } from '../ferramentas/Orcamento.jsx'
import { evento } from '../lib/rastreio.js'
import { useIdioma } from '../i18n/idioma.jsx'

/**
 * O preço da vidraçaria.
 *
 * Ele vem DEPOIS da demonstração de propósito: quando o visitante chega aqui,
 * ele acabou de ver um orçamento de janela fechar em R$ 1.169 na tela dele. É
 * contra esse número que a mensalidade é comparada — contra a receita dele, e
 * não contra outro software.
 *
 * Esse total é um número em REAL: sai do preço de m² e da ferragem do Brasil
 * que estão em `Orcamento.jsx`. Ele não tem versão em euro nem em dólar, e a
 * conta de "quantos meses aquele serviço paga" só fecha em real. Por isso ele
 * é passado como argumento para o texto, e não escrito nele: em português as
 * duas frases usam o número, e nos outros três idiomas as mesmas chaves
 * ignoram o argumento e dizem outra coisa, que não depende de moeda nenhuma.
 *
 * Metade desta seção é sobre o que NÃO é cobrado. Para um vidraceiro, o medo
 * não é a mensalidade: é a taxa de implantação que aparece depois e a
 * fidelidade de doze meses. Responder isso de cara vale mais que qualquer
 * lista de funcionalidades.
 *
 * Enquanto `CONFIG.vidracaria.precoMensal` for 0, esta seção não existe.
 */

/* "Por usuário — ponha a equipe toda" saiu daqui em 13/08: o Higor avisou que
   é mentira. O mesmo valia para "usuários à vontade, sem custo por cabeça" na
   lista do que está incluído. Enquanto a regra real de usuários não estiver
   definida, esta seção não fala de usuário nenhum — melhor não dizer nada do
   que prometer o que a cobrança não cumpre. Vale para os quatro idiomas. */

export default function Preco({ folha = 'FL. 05/07' }) {
  const { idioma, c } = useIdioma()
  const t = c.vidracaria.preco
  const preco = precoVidracaria(idioma)
  if (!preco) return null

  const { diasTeste } = CONFIG.vidracaria
  const precoMensal = valorMensal(idioma)
  const temTeste = diasTeste > 0
  const comecar = destinoComecar(acaoComecar(idioma, c), idioma)
  // A conta é feita, não escrita: se o preço mudar, a frase muda junto. Só o
  // português usa este par — ver o comentário do topo do arquivo.
  const meses = Math.floor(ORCAMENTO_EXEMPLO / precoMensal)
  const reais = (n) =>
    n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
  const exemplo = reais(ORCAMENTO_EXEMPLO)

  return (
    <Secao id="preco" rotulo={t.rotulo} folha={folha} titulo={t.titulo} texto={t.texto(exemplo)}>
      <div className="cartao mt-10 overflow-hidden text-left">
        <div className="grid">
          {/* ── o número ───────────────────────────────────────────────── */}
          <div className="relative overflow-hidden border-b border-line bg-soft/50 px-6 py-8">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-[30%] -top-[60%] h-[420px] w-[420px] rounded-full opacity-[0.16]"
              style={{ background: 'radial-gradient(circle, #0e8c6a, transparent 66%)' }}
            />
            <div className="relative">
              {/* O nome do plano num selo, não numa linha de texto: é a
                  primeira coisa que o olho pega ao chegar aqui, e responde
                  antes da pergunta "isso vale para a minha fábrica também?" */}
              <span
                className="cota inline-flex items-center rounded-full px-3 py-1.5 uppercase"
                style={{ background: 'rgba(14,140,106,.1)', color: '#0e8c6a', opacity: 1 }}
              >
                {t.cota}
              </span>
              <p className="mt-4 flex items-baseline gap-2">
                <span className="titulo-hero">{preco}</span>
                <span className="text-[16px] font-bold text-dim">{t.porMes}</span>
              </p>
              {/* Aqui também dizia "por vidraçaria, não por pessoa", com o
                  instalador e o balconista usando de graça. Mesma mentira das
                  listas acima, dita de outro jeito. Volta quando a regra real
                  de usuários estiver definida. */}
              <p className="mt-3 text-[15px] font-bold text-ink">{t.fixo}</p>
              <p className="mt-2 max-w-[34ch] text-[14.5px] leading-[1.5] text-dim">{t.semTaxa}</p>

              <div className="mt-8 grid gap-px overflow-hidden rounded-[16px] bg-line">
                {t.naoCobramos.map(([rotulo, detalhe]) => (
                  <div key={rotulo} className="flex items-center gap-3 bg-card px-4 py-3">
                    <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0" aria-hidden="true">
                      <circle cx="8" cy="8" r="6.4" fill="none" stroke="#c3ccd8" strokeWidth="1.6" />
                      <path d="M4.6 11.4L11.4 4.6" stroke="#c3ccd8" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                    <span className="min-w-0">
                      <span className="text-[14px] font-bold text-ink">{rotulo}</span>
                      <span className="text-[14px] text-dim"> — {detalhe}</span>
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <a
                  href={comecar.href}
                  target={comecar.externo ? '_blank' : undefined}
                  rel={comecar.externo ? 'noreferrer' : undefined}
                  onClick={() => evento('comecar', { origem: 'preco' })}
                  className="botao-marca w-full"
                >
                  {comecar.rotulo}
                </a>
                {temTeste && <p className="cota mt-3 normal-case">{t.semCartao(diasTeste)}</p>}
                {/* A separação entre os dois produtos, dita onde ela importa:
                    ao lado do número. Sem isto, um dono de fábrica lê R$ 197 e
                    conclui que é esse o preço do sistema inteiro. */}
                <p className="mt-5 border-t border-line pt-4 text-[13.5px] leading-[1.5] text-dim">
                  {t.soParaVidracaria}
                </p>
              </div>
            </div>
          </div>

          {/* ── o que vem junto ────────────────────────────────────────── */}
          <div className="px-6 py-8">
            <p className="cota uppercase">{t.tudoIncluido}</p>
            <ul className="mt-4 space-y-2.5">
              {t.incluso.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg viewBox="0 0 16 16" className="mt-[3px] h-4 w-4 shrink-0" aria-hidden="true">
                    <path
                      d="M3 8.5l3.2 3.2L13 5"
                      fill="none"
                      stroke="#0e8c6a"
                      strokeWidth="2.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-[15px] leading-[1.45] text-ink">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-[16px] border border-line bg-soft/60 px-5 py-4">
              <p className="text-[15px] font-bold leading-snug text-ink">
                {t.caixaTitulo(exemplo, meses)}
              </p>
              <p className="mt-2 text-[14px] leading-[1.5] text-dim">{t.caixaTexto}</p>
            </div>

            <dl className="mt-7 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {t.extras.map(([rotulo, detalhe]) => (
                <div key={rotulo}>
                  <dt className="cota uppercase">{rotulo}</dt>
                  <dd className="mt-1 text-[13.5px] leading-snug text-dim">{detalhe}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </Secao>
  )
}
