/**
 * Um servidor que imita o `cleanUrls` da Vercel, para poder TESTAR o contrato
 * de rotas antes de publicar. O `vite preview` não serve: ele resolve
 * /comecar sozinho, e foi por isso que o 404 em produção passou batido.
 *
 * Regra da Vercel com cleanUrls: /foo → foo.html; sem arquivo → 404.html com
 * status 404. Nada de cair na home.
 */
import { createServer } from 'node:http'
import { readFileSync, existsSync, statSync } from 'node:fs'

const DIR = 'dist'
const TIPO = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml',
  '.xml': 'application/xml', '.txt': 'text/plain', '.ico': 'image/x-icon' }

createServer((req, res) => {
  const caminho = decodeURIComponent(req.url.split('?')[0])
  const tentativas =
    caminho === '/' ? [`${DIR}/index.html`]
      : [`${DIR}${caminho}`, `${DIR}${caminho}.html`, `${DIR}${caminho}/index.html`]
  for (const t of tentativas) {
    if (existsSync(t) && statSync(t).isFile()) {
      const ext = t.slice(t.lastIndexOf('.'))
      res.writeHead(200, { 'Content-Type': TIPO[ext] || 'application/octet-stream' })
      return res.end(readFileSync(t))
    }
  }
  res.writeHead(404, { 'Content-Type': 'text/html' })
  res.end(readFileSync(`${DIR}/404.html`))
}).listen(4500, () => console.log('imitando a Vercel em :4500'))
