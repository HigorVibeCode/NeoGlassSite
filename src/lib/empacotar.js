/**
 * O empacotador.
 *
 * Faz, em miniatura, o que o sistema faz na fábrica: antes de abrir chapa
 * nova, tenta caber o pedido no que já está encostado no cavalete. Só o que
 * não couber em retalho nenhum é que manda abrir vidro novo.
 *
 * O método é MaxRects com melhor-encaixe-pelo-lado-curto e giro de peça,
 * descontando a lâmina. Não é o otimizador do produto — aquele é guilhotinado,
 * respeita veio, cor, espessura e a sequência da mesa. Este aqui é honesto o
 * bastante para a conta bater, e roda em milissegundos no navegador.
 */

const area = (r) => r.l * r.a

function novoRecipiente(id, tipo, l, a) {
  return { id, tipo, l, a, pecas: [], livres: [{ x: 0, y: 0, w: l, h: a }] }
}

/** O melhor buraco livre para esta peça: o que sobra menos no lado curto. */
function melhorLugar(livres, l, a) {
  const giros = l === a ? [[l, a]] : [[l, a], [a, l]]
  let melhor = null
  for (const f of livres) {
    for (const [w, h] of giros) {
      if (w > f.w || h > f.h) continue
      const curto = Math.min(f.w - w, f.h - h)
      const longo = Math.max(f.w - w, f.h - h)
      if (!melhor || curto < melhor.curto || (curto === melhor.curto && longo < melhor.longo)) {
        melhor = { x: f.x, y: f.y, w, h, curto, longo }
      }
    }
  }
  return melhor
}

/** Tira o retângulo ocupado (mais a lâmina) de todos os buracos livres. */
function recortar(livres, p, serra) {
  const alvo = { x: p.x, y: p.y, w: p.w + serra, h: p.h + serra }
  const novos = []
  for (const f of livres) {
    const cruza =
      alvo.x < f.x + f.w && alvo.x + alvo.w > f.x && alvo.y < f.y + f.h && alvo.y + alvo.h > f.y
    if (!cruza) {
      novos.push(f)
      continue
    }
    if (alvo.y > f.y) novos.push({ x: f.x, y: f.y, w: f.w, h: alvo.y - f.y })
    if (alvo.y + alvo.h < f.y + f.h)
      novos.push({
        x: f.x,
        y: alvo.y + alvo.h,
        w: f.w,
        h: f.y + f.h - (alvo.y + alvo.h),
      })
    if (alvo.x > f.x) novos.push({ x: f.x, y: f.y, w: alvo.x - f.x, h: f.h })
    if (alvo.x + alvo.w < f.x + f.w)
      novos.push({
        x: alvo.x + alvo.w,
        y: f.y,
        w: f.x + f.w - (alvo.x + alvo.w),
        h: f.h,
      })
  }

  // poda: buraco contido dentro de outro não serve para nada
  const dentro = (a, b) =>
    a.x >= b.x && a.y >= b.y && a.x + a.w <= b.x + b.w && a.y + a.h <= b.y + b.h
  return novos.filter((a, i) => {
    if (a.w <= 0 || a.h <= 0) return false
    return !novos.some((b, j) => {
      if (j === i || b.w <= 0 || b.h <= 0) return false
      if (!dentro(a, b)) return false
      const ea = a.w * a.h
      const eb = b.w * b.h
      return eb > ea || (eb === ea && j < i)
    })
  })
}

function encher(rec, fila, serra) {
  for (let i = 0; i < fila.length; ) {
    const lugar = melhorLugar(rec.livres, fila[i].l, fila[i].a)
    if (lugar) {
      const p = { ...fila[i], x: lugar.x, y: lugar.y, w: lugar.w, h: lugar.h }
      rec.pecas.push(p)
      rec.livres = recortar(rec.livres, p, serra)
      fila.splice(i, 1)
    } else {
      i++
    }
  }
}

/**
 * @param chapa    {l, a} da chapa nova, em mm
 * @param retalhos [{l, a}] o que já está no cavalete
 * @param pecas    [{l, a, qtd, nome}] o pedido
 * @param serra    espessura da lâmina, em mm
 */
export function empacotar({ chapa, retalhos = [], pecas = [], serra = 4 }) {
  const fila = []
  pecas.forEach((p, i) => {
    const n = Math.max(0, Math.min(120, Math.round(p.qtd || 0)))
    if (p.l > 0 && p.a > 0) for (let k = 0; k < n; k++) fila.push({ ref: i, l: p.l, a: p.a })
  })
  fila.sort((x, y) => area(y) - area(x) || Math.max(y.l, y.a) - Math.max(x.l, x.a) || x.ref - y.ref)

  const areaPedido = fila.reduce((s, p) => s + area(p), 0)

  const rodar = (comRetalhos) => {
    const restam = fila.map((p) => ({ ...p }))
    const usados = []

    if (comRetalhos) {
      // o retalho menor primeiro: é ele que some do cavalete se ninguém usar
      const ordem = retalhos
        .map((r, i) => ({ ...r, i }))
        .filter((r) => r.l > 0 && r.a > 0)
        .sort((a, b) => area(a) - area(b))
      for (const r of ordem) {
        const rec = novoRecipiente(`R${r.i + 1}`, 'retalho', r.l, r.a)
        encher(rec, restam, serra)
        if (rec.pecas.length) usados.push(rec)
      }
    }

    let n = 0
    let seguranca = 0
    while (restam.length && seguranca++ < 40) {
      const rec = novoRecipiente(`C${++n}`, 'chapa', chapa.l, chapa.a)
      const antes = restam.length
      encher(rec, restam, serra)
      if (restam.length === antes) {
        n--
        break // peça maior que a chapa inteira
      }
      usados.push(rec)
    }

    return { usados, sobraram: restam, chapasNovas: n }
  }

  const com = rodar(true)
  const sem = rodar(false)

  const deRetalho = com.usados.filter((r) => r.tipo === 'retalho')
  const emRetalho = deRetalho.reduce((s, r) => s + r.pecas.reduce((k, p) => k + p.w * p.h, 0), 0)
  const pecasEmRetalho = deRetalho.reduce((s, r) => s + r.pecas.length, 0)

  const areaAberta = com.chapasNovas * area(chapa)
  const aproveitamento = areaAberta > 0 ? (areaPedido - emRetalho) / areaAberta : 0

  // Para desenhar, a ordem é a do cavalete: retalho 1, 2, 3… e só depois as
  // chapas novas. A ordem em que o empacotador os encheu não interessa a
  // ninguém, e trocada na tela ela confunde.
  const paraDesenhar = [...com.usados].sort(
    (a, b) =>
      (a.tipo === 'retalho' ? 0 : 1) - (b.tipo === 'retalho' ? 0 : 1) ||
      Number(a.id.slice(1)) - Number(b.id.slice(1)),
  )

  return {
    recipientes: paraDesenhar,
    recipientesSemRetalho: sem.usados,
    naoCoube: com.sobraram.length,
    chapasNovas: com.chapasNovas,
    chapasSemRetalho: sem.chapasNovas,
    chapasEvitadas: Math.max(0, sem.chapasNovas - com.chapasNovas),
    retalhosUsados: deRetalho.length,
    pecasEmRetalho,
    pecasTotal: fila.length,
    m2Recuperados: emRetalho / 1e6,
    m2Pedido: areaPedido / 1e6,
    aproveitamento: Math.min(1, Math.max(0, aproveitamento)),
  }
}
