import { Bloco, Revelar } from '../components/Comum.jsx'
import { CONFIG, linkWhatsapp, precoVidracaria } from '../config.js'
import { evento } from '../lib/rastreio.js'

/**
 * O preço da vidraçaria.
 *
 * Ele vem DEPOIS da demonstração de propósito: quando o visitante chega aqui,
 * ele acabou de ver um orçamento de janela fechar em R$ 1.169 na tela dele. É
 * contra esse número que a mensalidade é comparada — contra a receita dele, e
 * não contra outro software.
 *
 * Metade desta seção é sobre o que NÃO é cobrado. Para um vidraceiro, o medo
 * não é a mensalidade: é a taxa de implantação que aparece depois, o preço por
 * usuário que sobe quando ele contrata alguém, e a fidelidade de doze meses.
 * Responder isso de cara vale mais que qualquer lista de funcionalidades.
 *
 * Enquanto `CONFIG.vidracaria.precoMensal` for 0, esta seção não existe.
 */

const INCLUSO = [
  'Orçamento na obra pelo celular, com foto e assinatura',
  'Lista de corte já com as folgas, direto para a produção',
  'Estoque de retalhos com medida, cor e endereço',
  'Acompanhamento do pedido, do corte à entrega',
  'PDF com a sua marca, o seu prazo e a sua validade',
  'Margem de cada serviço no fim do mês',
  'Usuários à vontade — a equipe inteira, sem custo por cabeça',
  'Suporte por WhatsApp, com gente que conhece vidro',
]

const NAO_COBRAMOS = [
  ['Implantação', 'nada para começar a usar'],
  ['Por usuário', 'ponha a equipe toda'],
  ['Por orçamento', 'faça quantos quiser'],
  ['Fidelidade', 'cancela quando quiser'],
]

export default function Preco({ folha = 'FL. 05/07' }) {
  const preco = precoVidracaria()
  if (!preco) return null

  const { diasTeste, cadastro } = CONFIG.vidracaria
  const temTeste = diasTeste > 0
  const destino = cadastro || linkWhatsapp('Olá! Quero começar a usar o NeoGlass na minha vidraçaria.')

  return (
    <Revelar
      as="section"
      id="preco"
      className="secao mx-auto max-w-[1240px] scroll-mt-[124px] px-5 pb-24 sm:px-8 sm:pb-32"
    >
      <Bloco rotulo="Preço · sem letra miúda" folha={folha} />
      <h2 className="display mt-7 max-w-[17ch] text-[clamp(30px,4.4vw,54px)]">
        Um número só. E ele cabe numa janela.
      </h2>
      <p className="mt-5 max-w-[58ch] text-[16.5px] leading-[1.55] text-dim">
        O orçamento que você montou aqui em cima fechou em R$ 1.169 — e era uma janela de sala.
        Guarde esse número enquanto lê o de baixo.
      </p>

      <div className="mt-11 overflow-hidden rounded-[26px] border border-line bg-card shadow-[0_36px_70px_-46px_rgba(20,55,80,.4)]">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          {/* ── o número ───────────────────────────────────────────────── */}
          <div className="relative overflow-hidden border-b border-line bg-soft/50 px-7 py-9 sm:px-9 lg:border-b-0 lg:border-r">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-[30%] -top-[60%] h-[420px] w-[420px] rounded-full opacity-[0.16]"
              style={{ background: 'radial-gradient(circle, #0e8c6a, transparent 66%)' }}
            />
            <div className="relative">
              <p className="cota uppercase">NeoGlass para vidraçaria</p>
              <p className="mt-4 flex items-baseline gap-2">
                <span className="display text-[clamp(46px,6.4vw,68px)] leading-none">{preco}</span>
                <span className="text-[16px] font-bold text-dim">/mês</span>
              </p>
              <p className="mt-3 text-[15px] font-bold text-ink">
                Por vidraçaria — não por pessoa.
              </p>
              <p className="mt-2 max-w-[34ch] text-[14.5px] leading-[1.5] text-dim">
                Você, o instalador e quem atende o balcão usam o mesmo sistema, e a conta não muda.
              </p>

              <div className="mt-8 grid gap-px overflow-hidden rounded-[16px] bg-line">
                {NAO_COBRAMOS.map(([t, d]) => (
                  <div key={t} className="flex items-center gap-3 bg-card px-4 py-3">
                    <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0" aria-hidden="true">
                      <circle cx="8" cy="8" r="6.4" fill="none" stroke="#c3ccd8" strokeWidth="1.6" />
                      <path d="M4.6 11.4L11.4 4.6" stroke="#c3ccd8" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                    <span className="min-w-0">
                      <span className="text-[14px] font-bold text-ink">{t}</span>
                      <span className="text-[14px] text-dim"> — {d}</span>
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <a
                  href={destino}
                  target={cadastro ? undefined : '_blank'}
                  rel={cadastro ? undefined : 'noreferrer'}
                  onClick={() => evento('comecar', { origem: 'preco' })}
                  className="botao-marca inline-block px-7 py-3.5 text-[15px] transition-transform duration-200 hover:-translate-y-0.5"
                >
                  {temTeste ? `Começar grátis · ${diasTeste} dias` : 'Começar agora'}
                </a>
                {temTeste && (
                  <p className="cota mt-3 normal-case">
                    Sem cartão. No fim dos {diasTeste} dias você decide — e se não decidir, nada é
                    cobrado.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ── o que vem junto ────────────────────────────────────────── */}
          <div className="px-7 py-9 sm:px-9">
            <p className="cota uppercase">Está tudo incluído</p>
            <ul className="mt-4 space-y-2.5">
              {INCLUSO.map((t) => (
                <li key={t} className="flex items-start gap-3">
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
                  <span className="text-[15px] leading-[1.45] text-ink">{t}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-[16px] border border-line bg-soft/60 px-5 py-4">
              <p className="text-[15px] font-bold leading-snug text-ink">
                Um box a mais no mês já paga o ano inteiro.
              </p>
              <p className="mt-2 text-[14px] leading-[1.5] text-dim">
                Não é discurso: é a conta de quem deixa de perder um orçamento por demora, ou de
                cortar uma peça errada, uma única vez.
              </p>
            </div>

            <dl className="mt-7 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {[
                ['Os dados são seus', 'exporta tudo quando quiser, sem pedir'],
                ['Sai quando quiser', 'cancelamento pela tela, sem ligar para ninguém'],
              ].map(([t, d]) => (
                <div key={t}>
                  <dt className="cota uppercase">{t}</dt>
                  <dd className="mt-1 text-[13.5px] leading-snug text-dim">{d}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </Revelar>
  )
}
