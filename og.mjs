/**
 * Gera a imagem de prévia de cada página.
 *
 * A antiga era uma miniatura da própria home: título em corpo pequeno e três
 * telas do sistema desenhadas em cinza. Num grupo de WhatsApp isso aparece com
 * 90 px de largura — nada daquilo se lê. E ela pesava 415 kB, acima do ponto em
 * que o WhatsApp desiste do cartão grande e cai no quadradinho.
 *
 * A regra aqui é uma só: tem que funcionar a 15% do tamanho. Por isso o texto é
 * enorme, são no máximo seis palavras, e o arquivo sai em JPEG abaixo de 200 kB.
 */
import { chromium } from 'playwright'

const ICONE = `<svg viewBox="0 0 860 684" preserveAspectRatio="xMidYMid meet">
  <path d="M452.5,78.9 L757.5,606.1 Q780,645 735,645 L125,645 Q80,645 102.5,606.1 L407.5,78.9 Q430,40 452.5,78.9 Z" fill="#ffffff"/>
  <g fill="none" stroke-linecap="round" stroke-width="52">
    <line x1="20" y1="235" x2="396" y2="372" stroke="#c6d8ff"/>
    <line x1="45" y1="330" x2="355" y2="443" stroke="#ffcaa4"/>
    <line x1="100" y1="448" x2="302" y2="522" stroke="#ffa0a0"/>
  </g></svg>`

const PAGINAS = [
  {
    arquivo: 'public/og.jpg',
    chapeu: 'Indústria do vidro plano',
    titulo: 'Do orçamento na obra<br><em>à nota fiscal</em>.',
    rodape: 'Otimização de corte com retalho · rastreio de peça · checagem com IA',
  },
  {
    arquivo: 'public/og-vidracaria.jpg',
    chapeu: 'Para a vidraçaria',
    titulo: 'O orçamento sai<br><em>antes de você voltar</em>.',
    rodape: 'Meça o vão no celular · PDF com a sua marca · preço fixo por vidraçaria',
  },
  {
    arquivo: 'public/og-plataforma.jpg',
    chapeu: 'A plataforma, por dentro',
    titulo: 'Um sistema só,<br><em>do vão à entrega</em>.',
    rodape: 'Orçamento · produção · expedição · financeiro — sem trocar de sistema',
  },
]

// As fontes vêm do node_modules embutidas em base64: este contêiner não alcança
// o fonts.googleapis.com, e uma página criada por setContent() não tem origem —
// então nem file:// ela consegue carregar. Sem isto a imagem sai em Helvetica.
import { readFileSync } from 'fs'
const b64 = (c) => readFileSync(new URL(c, import.meta.url)).toString('base64')
const FONTES = `
@font-face{font-family:Archivo;font-weight:100 900;font-stretch:62% 125%;
  src:url(data:font/woff2;base64,${b64('./node_modules/@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2')}) format('woff2-variations')}
@font-face{font-family:Inter;font-weight:100 900;
  src:url(data:font/woff2;base64,${b64('./node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2')}) format('woff2-variations')}
@font-face{font-family:'IBM Plex Mono';font-weight:600;
  src:url(data:font/woff2;base64,${b64('./node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-600-normal.woff2')}) format('woff2')}
`

const pagina = (p) => `<!doctype html><meta charset="utf-8">
<style>${FONTES}
  *{margin:0;box-sizing:border-box}
  body{width:1200px;height:630px;overflow:hidden;
       font-family:Inter,system-ui,sans-serif;color:#0f2530;
       background:radial-gradient(120% 130% at 82% -10%, #ffffff 0%, #eef5f8 48%, #e4eef2 100%);
       position:relative}
  /* a mesma aurora da tela de login, bem de leve */
  .aurora{position:absolute;inset:-20%;filter:blur(96px);opacity:.55}
  .aurora i{position:absolute;border-radius:50%;display:block}
  .a1{width:640px;height:640px;left:-8%;top:-22%;background:radial-gradient(circle,#83e6c2,transparent 66%)}
  .a2{width:560px;height:560px;right:-6%;top:-16%;background:radial-gradient(circle,#7fe0c8,transparent 66%)}
  .a3{width:600px;height:600px;right:6%;bottom:-40%;background:radial-gradient(circle,#4a6ae0,transparent 68%)}
  .fio{position:absolute;inset-inline:0;top:0;height:5px;
       background:linear-gradient(90deg,#4a6ae0,#0e8c6a,#7fe0c8,#fbb03b,#e0556a)}
  .quadro{position:relative;height:100%;padding:64px 76px;display:flex;flex-direction:column;justify-content:space-between}
  .topo{display:flex;align-items:center;gap:18px}
  .ic{width:76px;height:76px;border-radius:22px;flex:none;display:flex;align-items:center;justify-content:center;
      background:conic-gradient(from 210deg,#4a6ae0,#0e8c6a,#7fe0c8,#fbb03b,#e0556a,#4a6ae0);
      box-shadow:inset 0 0 0 2px rgba(255,255,255,.55), 0 14px 30px rgba(14,123,156,.28)}
  .ic svg{width:39px;height:33px;filter:drop-shadow(0 2px 6px rgba(15,55,70,.18))}
  .nome{font-size:40px;font-weight:800;letter-spacing:-.03em}
  .nome span{background:linear-gradient(90deg,#0e8c6a,#0e7b9c);-webkit-background-clip:text;background-clip:text;color:transparent}
  .chapeu{margin-left:auto;font-family:'IBM Plex Mono',monospace;font-size:19px;font-weight:600;
          letter-spacing:.14em;text-transform:uppercase;color:#5c7280}
  h1{font-family:Archivo,Inter,sans-serif;font-weight:800;font-stretch:112%;
     font-size:82px;line-height:1.03;letter-spacing:-.025em;max-width:19ch}
  h1 em{font-style:normal;background:linear-gradient(90deg,#0e8c6a,#0e7b9c);
        -webkit-background-clip:text;background-clip:text;color:transparent}
  .pe{display:flex;align-items:center;justify-content:space-between;gap:32px;
      border-top:1px solid rgba(15,55,70,.14);padding-top:22px}
  .pe p{font-size:22px;font-weight:600;color:#2c4451}
  .selo{flex:none;font-size:20px;font-weight:700;color:#0f2530;
        background:rgba(255,255,255,.82);border:1px solid rgba(15,55,70,.12);
        border-radius:999px;padding:12px 22px;white-space:nowrap;
        box-shadow:0 10px 26px rgba(10,35,45,.10)}
</style>
<div class="aurora"><i class="a1"></i><i class="a2"></i><i class="a3"></i></div>
<span class="fio"></span>
<div class="quadro">
  <div class="topo">
    <span class="ic">${ICONE}</span>
    <span class="nome">Neo<span>Glass</span></span>
    <span class="chapeu">${p.chapeu}</span>
  </div>
  <h1>${p.titulo}</h1>
  <div class="pe">
    <p>${p.rodape}</p>
    <span class="selo">Desenvolvido na Suíça</span>
  </div>
</div>`

const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' })
for (const p of PAGINAS) {
  const page = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
  await page.setContent(pagina(p))
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(400)
  await page.screenshot({ path: p.arquivo, type: 'jpeg', quality: 86 })
  await page.close()
  console.log(p.arquivo)
}
await b.close()
