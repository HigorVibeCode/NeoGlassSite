import assert from 'node:assert/strict'
import { simularPartner } from '../src/lib/simulacaoPartner.js'

const turma = simularPartner(5, false, 13)
assert.equal(turma.mensalidade, 19700)
assert.equal(turma.meses[0].total, 98500)
assert.equal(turma.meses[1].total, 14775)
assert.equal(turma.meses[11].total, 14775)
assert.equal(turma.meses[12].total, 0, 'A comissão de uma turma termina após 12 pagamentos')
assert.equal(turma.total, 261025)
const mensal = simularPartner(5, true)
assert.equal(mensal.meses[1].total, 113275)
assert.equal(mensal.meses[11].total, 261025)
assert.equal(mensal.total, 2157150)
assert.equal(simularPartner(5, true, 24).meses[23].total, 261025, 'Coortes com mais de 12 pagamentos deixam de gerar comissão')
assert.equal(simularPartner(0, true).total, 0)
assert.equal(simularPartner(1).total, 52205)
for(const moeda of ['EUR','USD','CHF']){
  const s=simularPartner(5,false,12,moeda)
  assert.equal(s.mensalidade,3900);assert.equal(s.meses[0].total,19500)
  assert.equal(s.meses[1].total,2925);assert.equal(s.total,51675)
  assert.equal(simularPartner(5,true,12,moeda).total,427050)
}
assert.throws(()=>simularPartner(5,false,12,'XXX'))
console.log('Simulação Partner: valores, acumulação e expiração de comissões conferidos.')
