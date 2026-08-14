import { useTextos } from '../i18n/idioma.jsx'
import { empacotar } from '../lib/empacotar.js'

/**
 * O produto, desenhado.
 *
 * O prisma dizia "vidro". Não dizia "software" — e é software que está à venda.
 * Este componente põe uma janela de aplicativo na abertura de cada página,
 * redesenhada a partir das telas reais do NeoGlass: a lista de pedidos com
 * prazo e fase, o fluxo de produção com a fila de cada máquina, e o 3D do box
 * antes de cortar.
 *
 * É vetor, não captura de tela: tudo aqui é texto e forma de verdade. Pesa
 * poucos quilobytes, fica nítido em qualquer densidade de tela, traduz junto
 * com o resto do site e nunca desatualiza junto com uma versão antiga do
 * produto. O preço disso é fidelidade aproximada — a alma da tela está certa,
 * o pixel não.
 *
 * Os números e nomes vêm do conteúdo, não estão presos no código, e são
 * genéricos de propósito: nome de cliente real não entra em vitrine.
 */

const TONS = {
  pedidos: { cor: '#4f46e5', claro: '#eef2ff' },
  producao: { cor: '#0e8c6a', claro: '#e7f6f1' },
  design: { cor: '#e11d48', claro: '#ffe9ee' },
  corte: { cor: '#0e7b9c', claro: '#e8f4f9' },
}

/* O plano de corte do palco da indústria.
   As peças NÃO estão posicionadas na mão: o mesmo empacotador que roda na
   demonstração calcula o encaixe aqui também. Assim o desenho da abertura e a
   ferramenta lá embaixo contam a mesma história, e nenhum retângulo aparece
   sobreposto a outro por descuido de quem desenhou. */
const CHAPA_CORTE = { l: 3210, a: 2250 }
const PLANO = empacotar({
  chapa: CHAPA_CORTE,
  pecas: [
    { chave: 'porta', l: 800, a: 1850, qtd: 3 },
    { chave: 'fixo', l: 600, a: 1850, qtd: 1 },
    { chave: 'prateleira', l: 880, a: 350, qtd: 3 },
    { chave: 'espelho', l: 700, a: 900, qtd: 1 },
  ],
  serra: 4,
}).recipientes[0]
const CORES_CORTE = ['#0e8c6a', '#0e7b9c', '#7c6ad6', '#b8862c']

/** A moldura: barra do navegador, barra lateral e o palco do conteúdo. */
function Janela({ variante, t, children }) {
  const tom = TONS[variante]
  const v = t[variante]

  return (
    <div className="w-full max-w-[540px] select-none" aria-hidden="true">
      <div className="overflow-hidden rounded-[18px] border border-line bg-white shadow-[0_34px_90px_-34px_rgba(15,37,48,0.42)]">
        {/* barra do navegador — dois segundos de leitura, e o visitante já sabe
            que está olhando para um sistema que roda no navegador dele */}
        <div className="flex items-center gap-2 border-b border-line bg-[#f4f6f7] px-3.5 py-2.5">
          <span className="flex gap-1.5">
            <i className="h-[7px] w-[7px] rounded-full bg-[#ff5f57]" />
            <i className="h-[7px] w-[7px] rounded-full bg-[#febc2e]" />
            <i className="h-[7px] w-[7px] rounded-full bg-[#28c840]" />
          </span>
          <span className="ml-1.5 flex-1 truncate rounded-full border border-line bg-white px-3 py-[3px] font-mono text-[9.5px] text-dim">
            {t.endereco}
          </span>
        </div>

        <div className="flex min-h-[318px]">
          {/* barra lateral */}
          <aside className="hidden w-[126px] shrink-0 flex-col border-r border-line px-2 py-3 min-[420px]:flex">
            <div className="flex items-center gap-1.5 px-1">
              <span
                className="flex h-[19px] w-[19px] items-center justify-center rounded-[6px]"
                style={{ background: tom.cor }}
              >
                <svg viewBox="0 0 24 24" className="h-3 w-3">
                  <path d="M12 4l8 15H4z" fill="#fff" opacity=".92" />
                </svg>
              </span>
              <span className="leading-none">
                <b className="block text-[10.5px] font-extrabold text-ink">NeoGlass</b>
                <b className="block text-[8.5px] font-bold" style={{ color: tom.cor }}>
                  {v.modulo}
                </b>
              </span>
            </div>

            <p className="mt-4 px-1 font-mono text-[7.5px] font-bold uppercase tracking-[0.14em] text-dim">
              {t.ferramentas}
            </p>

            <ul className="mt-1.5 space-y-[3px]">
              {v.itens.map((item, i) => (
                <li
                  key={item}
                  className="flex items-center gap-1.5 rounded-[7px] px-1.5 py-[6px]"
                  style={i === 0 ? { background: tom.claro } : undefined}
                >
                  <i
                    className="h-[11px] w-[11px] shrink-0 rounded-[3.5px]"
                    style={{ background: i === 0 ? tom.cor : '#dfe5e8' }}
                  />
                  <span
                    className={`truncate text-[9px] ${i === 0 ? 'font-extrabold text-ink' : 'font-semibold text-dim'}`}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-auto flex items-center gap-1.5 rounded-[9px] border border-line px-1.5 py-1.5">
              <span
                className="flex h-[17px] w-[17px] items-center justify-center rounded-full text-[7.5px] font-extrabold text-white"
                style={{ background: tom.cor }}
              >
                HB
              </span>
              <span className="min-w-0 leading-tight">
                <b className="block truncate text-[8.5px] font-bold text-ink">{t.usuario}</b>
                <b className="block truncate text-[7.5px] font-semibold text-dim">{t.papel}</b>
              </span>
            </div>
          </aside>

          <div className="min-w-0 flex-1 bg-[#fbfcfc] px-3 py-3">{children}</div>
        </div>
      </div>
    </div>
  )
}

/** Cabeçalho comum ao conteúdo: migalha, título e linha de apoio. */
function Cabeca({ tom, migalha, titulo, sub }) {
  return (
    <>
      <p className="font-mono text-[8px] font-bold uppercase tracking-[0.12em] text-dim">
        {migalha}
      </p>
      <div className="mt-2 flex items-center gap-2">
        <span
          className="flex h-[22px] w-[22px] items-center justify-center rounded-[7px]"
          style={{ background: tom.cor }}
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5">
            <rect x="5" y="4" width="14" height="16" rx="2" fill="#fff" opacity=".9" />
            <path d="M8 9h8M8 12.5h8M8 16h5" stroke={tom.cor} strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
        <span>
          <b className="block text-[14px] font-extrabold leading-none text-ink">{titulo}</b>
          <b className="mt-1 block text-[8.5px] font-semibold leading-none text-dim">{sub}</b>
        </span>
      </div>
    </>
  )
}

/** A lista de pedidos: quem pediu, que vidro, em que fase, para quando. */
function Pedidos({ t }) {
  const tom = TONS.pedidos
  const v = t.pedidos
  return (
    <>
      <Cabeca tom={tom} migalha={v.migalha} titulo={v.titulo} sub={v.subtitulo} />

      <div className="mt-3 flex gap-1.5">
        <span className="flex flex-1 items-center gap-1.5 rounded-full border border-line bg-white px-2.5 py-[5px]">
          <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 shrink-0">
            <circle cx="11" cy="11" r="6" fill="none" stroke="#8fa3ab" strokeWidth="2.4" />
            <path d="M15.5 15.5L20 20" stroke="#8fa3ab" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
          <span className="truncate text-[8.5px] font-semibold text-dim">{v.busca}</span>
        </span>
        <span className="flex shrink-0 items-center gap-1 rounded-full border border-line bg-white px-2.5 py-[5px] text-[8.5px] font-bold text-ink">
          {v.filtro}
          <svg viewBox="0 0 24 24" className="h-2 w-2">
            <path d="M6 9l6 6 6-6" fill="none" stroke="#0f2530" strokeWidth="2.6" strokeLinecap="round" />
          </svg>
        </span>
      </div>

      <ul className="mt-2 space-y-[5px]">
        {v.linhas.map((l) => {
          const atrasado = l.tom === 'atraso'
          const espera = l.fase === 'espera'
          return (
            <li
              key={l.n}
              className="relative flex items-center gap-2 overflow-hidden rounded-[9px] border border-line bg-white py-[7px] pl-2.5 pr-2"
              style={espera ? undefined : { background: 'linear-gradient(90deg,#f1faf6,#fff 42%)' }}
            >
              {!espera && (
                <i className="absolute inset-y-0 left-0 w-[2.5px]" style={{ background: '#0e8c6a' }} />
              )}
              <span className="w-[38px] shrink-0">
                <b className="block font-mono text-[8.5px] font-bold" style={{ color: espera ? '#8fa3ab' : '#0e8c6a' }}>
                  {l.n}
                </b>
              </span>
              <span className="min-w-0 flex-1">
                <b className="block truncate text-[9.5px] font-extrabold text-ink">{l.cliente}</b>
                <b className="block truncate text-[8px] font-semibold text-dim">{l.vidro}</b>
              </span>
              <span
                className="hidden shrink-0 rounded-[5px] px-1.5 py-[2px] text-[7.5px] font-bold min-[520px]:block"
                style={
                  espera
                    ? { background: '#fef6e7', color: '#9a6b13' }
                    : { background: '#e7f6f1', color: '#0b6b52' }
                }
              >
                {espera ? v.fase.espera : v.fase.ok}
              </span>
              <span className="w-[52px] shrink-0 text-right">
                <b
                  className="block text-[9px] font-extrabold leading-tight"
                  style={{ color: atrasado ? '#c0392b' : espera ? '#8fa3ab' : '#0f2530' }}
                >
                  {l.prazo}
                </b>
                <b className="block text-[7.5px] font-semibold leading-tight text-dim">{l.selo}</b>
              </span>
            </li>
          )
        })}
      </ul>
    </>
  )
}

/** O chão de fábrica: cada máquina, quantas horas de fila, quem é o gargalo. */
function Producao({ t }) {
  const tom = TONS.producao
  const v = t.producao
  return (
    <>
      <Cabeca tom={tom} migalha={v.migalha} titulo={v.titulo} sub={v.subtitulo} />

      <div className="mt-3 flex gap-2">
        <div className="relative min-w-0 flex-1 rounded-[10px] border border-line bg-white p-2">
          {/* as ligações entre as máquinas, tracejadas como no sistema */}
          <svg viewBox="0 0 200 132" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
            <path
              d="M46 92 C 70 92, 74 44, 104 44"
              fill="none"
              stroke="#0e8c6a"
              strokeWidth="1.2"
              strokeDasharray="3 3"
              opacity=".55"
            />
            <path
              d="M46 96 C 78 100, 86 108, 108 108"
              fill="none"
              stroke="#0e8c6a"
              strokeWidth="1.2"
              strokeDasharray="3 3"
              opacity=".55"
            />
          </svg>

          <div className="relative grid grid-cols-2 gap-2">
            {v.maquinas.map((m, i) => (
              <div
                key={m.nome}
                className={`rounded-[8px] border bg-white px-2 py-1.5 ${i === 0 ? 'border-ember/60' : 'border-line'}`}
                style={i === 0 ? { boxShadow: '0 0 0 2px rgba(192,57,43,.12)' } : undefined}
              >
                <span className="block h-[2px] w-full rounded-full" style={{ background: tom.cor }} />
                <b className="mt-1.5 block truncate text-[8.5px] font-extrabold text-ink">{m.nome}</b>
                <b className="block text-[15px] font-extrabold leading-none text-ink">{m.fila}</b>
                <b className="block text-[7.5px] font-semibold text-dim">{v.unidade}</b>
                <span
                  className="mt-1 inline-block rounded-[4px] px-1 py-[1px] text-[7px] font-bold"
                  style={
                    i === 0
                      ? { background: '#fdecea', color: '#c0392b' }
                      : { background: '#e7f6f1', color: '#0b6b52' }
                  }
                >
                  {i === 0 ? v.gargalo : v.folga}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden w-[104px] shrink-0 space-y-1.5 min-[520px]:block">
          <div className="rounded-[9px] border border-line bg-white p-2">
            <b className="block text-[8.5px] font-extrabold text-ink">{v.agora.titulo}</b>
            <div className="mt-1.5 rounded-[6px] px-1.5 py-1" style={{ background: '#fef6e7' }}>
              <b className="block text-[7px] font-bold uppercase tracking-wide" style={{ color: '#9a6b13' }}>
                {v.agora.rotulo}
              </b>
              <b className="block text-[8.5px] font-extrabold text-ink">{v.agora.maquina}</b>
            </div>
          </div>
          <div className="rounded-[9px] border border-line bg-white p-2">
            <b className="block text-[8.5px] font-extrabold text-ink">{v.margem.titulo}</b>
            <div className="mt-1.5 flex flex-wrap gap-1">
              {v.margem.faixas.map((f, i) => (
                <span
                  key={f}
                  className="rounded-[4px] px-1 py-[1px] text-[6.5px] font-bold"
                  style={
                    [
                      { background: '#e7f6f1', color: '#0b6b52' },
                      { background: '#fef6e7', color: '#9a6b13' },
                      { background: '#fdecea', color: '#c0392b' },
                    ][i]
                  }
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

/** O box em três dimensões, girando antes de qualquer vidro ser cortado. */
function Design({ t }) {
  const v = t.design
  return (
    <div className="rounded-[12px] bg-[#111a33] p-3">
      <div className="flex items-baseline gap-1.5">
        <b className="text-[11px] font-extrabold text-white">{v.titulo}</b>
        <b className="truncate text-[8px] font-semibold text-white/55">{v.sub}</b>
      </div>
      <p className="mt-2 text-center text-[8px] font-semibold text-white/45">{v.dica}</p>

      {/* O box de canto, em L, com proporção de box de verdade.
          O desenho anterior era um caixote: panos quase quadrados e altura
          menor que a largura. Box de canto real tem cerca de 1900 mm de altura
          para uns 900 de cada lado — é MAIS ALTO que largo, e é isso que faz um
          vidraceiro reconhecer a peça em vez de ver um cubo. Aqui a razão está
          respeitada, com trilho superior, rodapé, o montante do canto, a folha
          que corre sobrepondo o fixo e a cota que dá escala. */}
      <svg viewBox="0 0 260 210" className="mx-auto mt-1 h-[176px] w-full">
        <defs>
          <linearGradient id="vidroE" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#a9c8ff" stopOpacity=".10" />
            <stop offset="1" stopColor="#dbe9ff" stopOpacity=".26" />
          </linearGradient>
          <linearGradient id="vidroD" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#dbe9ff" stopOpacity=".26" />
            <stop offset="1" stopColor="#a9c8ff" stopOpacity=".10" />
          </linearGradient>
        </defs>

        <ellipse cx="130" cy="193" rx="82" ry="7" fill="#000" opacity=".3" />

        <path d="M64 48 L130 32 L130 183 L64 193 Z" fill="url(#vidroE)" />
        <path d="M130 32 L196 48 L196 193 L130 183 Z" fill="url(#vidroD)" />

        <path d="M98 40 L130 32 L130 183 L98 188 Z" fill="#cfe3ff" opacity=".16" />
        <path d="M130 32 L162 40 L162 188 L130 183 Z" fill="#cfe3ff" opacity=".09" />

        <g stroke="#e8f0ff" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M64 48 L130 32 L196 48" strokeWidth="4" opacity=".95" />
          <path d="M64 193 L130 183 L196 193" strokeWidth="3.4" opacity=".8" />
          <path d="M130 32 L130 183" strokeWidth="2.4" opacity=".9" />
          <path d="M64 48 L64 193 M196 48 L196 193" strokeWidth="2.2" opacity=".7" />
          <path d="M98 40 L98 188 M162 40 L162 188" strokeWidth="1" opacity=".45" />
        </g>

        {/* puxadores na altura da mão, não no meio do vidro */}
        <g fill="#eef4ff" opacity=".95">
          <rect x="104" y="104" width="3.6" height="22" rx="1.8" />
          <rect x="153" y="106" width="3.6" height="22" rx="1.8" />
        </g>

        {/* a cota lateral: é ela que diz ao olho que isto tem 1,90 m */}
        <g stroke="#8fb6ff" strokeWidth="1" opacity=".6">
          <path d="M208 36 L208 189" />
          <path d="M204 36 L212 36 M204 189 L212 189" />
        </g>
        <text
          x="215"
          y="112"
          fontSize="9"
          fontFamily="IBM Plex Mono, monospace"
          fill="#a9c8ff"
          dominantBaseline="central"
        >
          1900
        </text>

        <path d="M71 57 L93 52 L93 181 L71 185 Z" fill="#fff" opacity=".05" />
        <path d="M167 53 L190 58 L190 183 L167 179 Z" fill="#fff" opacity=".05" />
      </svg>

      <div className="mt-2 flex items-center gap-1.5">
        <span className="flex gap-1">
          {['#8fb6ff', '#7fe0c8', '#dfe5e8', '#f0b978'].map((c, i) => (
            <i
              key={c}
              className="h-[11px] w-[11px] rounded-full"
              style={{ background: c, boxShadow: i === 0 ? '0 0 0 1.5px #fff' : undefined }}
            />
          ))}
        </span>
        <span className="flex overflow-hidden rounded-[5px] border border-white/20 text-[7.5px] font-bold">
          <i className="px-1.5 py-[3px] not-italic text-white/55">2D</i>
          <i className="bg-[#4f6bf6] px-1.5 py-[3px] not-italic text-white">3D</i>
        </span>
        <span className="flex items-center gap-1 rounded-full border border-white/20 px-1.5 py-[2px]">
          <i className="h-[9px] w-[15px] rounded-full bg-[#4f6bf6]" />
          <b className="text-[7.5px] font-bold text-white/80">{v.ferragens}</b>
        </span>
        <span className="ml-auto flex gap-1">
          <i className="rounded-[5px] bg-white px-2 py-[3px] text-[7.5px] font-bold not-italic text-[#111a33]">
            {v.cancelar}
          </i>
          <i className="rounded-[5px] bg-[#e11d48] px-2 py-[3px] text-[7.5px] font-bold not-italic text-white">
            {v.abrir}
          </i>
        </span>
      </div>
    </div>
  )
}

/** O plano de corte: a imagem que todo dono de fábrica reconhece em meio segundo. */
function Corte({ t }) {
  const tom = TONS.corte
  const v = t.corte
  const usado = PLANO.pecas.reduce((s, p) => s + p.w * p.h, 0) / (PLANO.l * PLANO.a)
  return (
    <>
      <Cabeca tom={tom} migalha={v.migalha} titulo={v.titulo} sub={v.subtitulo} />

      <div className="mt-3 rounded-[10px] border border-line bg-white p-2">
        <div className="flex items-baseline justify-between">
          <b className="font-mono text-[8px] font-bold uppercase tracking-[0.1em] text-dim">
            {v.chapa} · {CHAPA_CORTE.l}×{CHAPA_CORTE.a}
          </b>
          <b className="font-mono text-[9px] font-extrabold" style={{ color: tom.cor }}>
            {Math.round(usado * 100)}% {v.aproveitamento}
          </b>
        </div>
        <svg
          viewBox={`-30 -30 ${CHAPA_CORTE.l + 60} ${CHAPA_CORTE.a + 60}`}
          className="mt-1.5 block w-full"
          aria-hidden="true"
        >
          <rect
            x="0"
            y="0"
            width={CHAPA_CORTE.l}
            height={CHAPA_CORTE.a}
            fill="#f8fafb"
            stroke="#b3bfcd"
            strokeWidth="14"
          />
          {PLANO.pecas.map((p, i) => (
            <g key={i}>
              <rect
                x={p.x}
                y={p.y}
                width={p.w}
                height={p.h}
                fill={CORES_CORTE[p.ref % CORES_CORTE.length]}
                fillOpacity="0.16"
                stroke={CORES_CORTE[p.ref % CORES_CORTE.length]}
                strokeWidth="14"
              />
              {p.w > 700 && p.h > 420 && (
                <text
                  x={p.x + p.w / 2}
                  y={p.y + p.h / 2}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="115"
                  fontFamily="IBM Plex Mono, monospace"
                  fontWeight="600"
                  fill={CORES_CORTE[p.ref % CORES_CORTE.length]}
                >
                  {p.w}×{p.h}
                </text>
              )}
            </g>
          ))}
        </svg>
      </div>

      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
        {v.legenda.map((l, i) => (
          <span key={l} className="flex items-center gap-1">
            <i
              className="h-[7px] w-[7px] rounded-[2px]"
              style={{ background: CORES_CORTE[i % CORES_CORTE.length] }}
            />
            <b className="text-[8px] font-bold text-dim">{l}</b>
          </span>
        ))}
      </div>
    </>
  )
}

const CORPO = { pedidos: Pedidos, producao: Producao, design: Design, corte: Corte }

export default function Tela({ variante = 'pedidos' }) {
  const t = useTextos().tela
  const Corpo = CORPO[variante] ?? Pedidos
  return (
    <Janela variante={variante} t={t}>
      <Corpo t={t} />
    </Janela>
  )
}
