import { CONFIG } from '../config.js'

// Referência mensal brasileira exibida na página Partner; valores em centavos.
export const REGRAS_PARTNER = { primeira: 1, recorrente: 0.15, meses: 12 }
export function simularPartner(clientes = 5, todoMes = false, horizonte = 12, moeda = 'BRL') {
  if (!Object.hasOwn(CONFIG.vidracaria.precos, moeda)) throw new Error('Moeda não suportada')
  const quantidade = Math.max(0, Math.min(20, Math.trunc(Number(clientes) || 0)))
  const mensalidade = Math.round(CONFIG.vidracaria.precos[moeda] * 100)
  const primeira = Math.round(mensalidade * REGRAS_PARTNER.primeira)
  const recorrente = Math.round(mensalidade * REGRAS_PARTNER.recorrente)
  const meses = Array.from({ length: horizonte }, (_, i) => {
    const novos = todoMes || i === 0 ? quantidade : 0
    const anteriores = todoMes ? quantidade * Math.min(i, REGRAS_PARTNER.meses - 1) : i > 0 && i < REGRAS_PARTNER.meses ? quantidade : 0
    return { mes: i + 1, entrada: novos * primeira, continuidade: anteriores * recorrente, total: novos * primeira + anteriores * recorrente }
  })
  return { quantidade, moeda, mensalidade, meses, total: meses.reduce((s, m) => s + m.total, 0) }
}
