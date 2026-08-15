/**
 * O coveiro do service worker antigo.
 *
 * Este site NÃO é um PWA e não quer worker nenhum. Este arquivo existe por um
 * motivo só: a plataforma (que é PWA) já morou neste domínio e registrava um
 * worker exatamente aqui, em /sw.js, com escopo `/`. Quem abriu a plataforma
 * naquela época continua com esse worker vivo no navegador, e ele segue
 * respondendo às navegações com a cópia velha que guardou — o site
 * institucional aparece em branco, e só para essas pessoas. O servidor entrega
 * tudo certo o tempo todo; o sequestro é dentro do navegador.
 *
 * Não dá para consertar isso pela página: o worker responde a navegação ANTES
 * de o HTML novo existir, então nenhum script que a gente coloque no
 * index.html chega a rodar. Testei — não funciona.
 *
 * O caminho que funciona é este arquivo. O navegador rebusca o script do
 * worker direto da rede, por fora do próprio worker, para checar se mudou.
 * Quando ele receber ISTO no lugar do worker da plataforma, o novo assume,
 * se desregistra, apaga os caches e manda cada aba aberta recarregar. Depois
 * disso não sobra worker nenhum, e o site volta ao normal sozinho.
 *
 * NÃO APAGUE este arquivo achando que é lixo. Ele precisa continuar sendo
 * servido enquanto existir alguém por aí com o worker antigo guardado — e não
 * há como saber quando isso acaba.
 */

self.addEventListener('install', () => {
  // Não espera a aba ser fechada para assumir: quem está vendo tela branca
  // agora não vai fechar e voltar depois.
  self.skipWaiting()
})

self.addEventListener('activate', (evento) => {
  evento.waitUntil(
    (async () => {
      // 1. some com os caches que o worker da plataforma deixou para trás
      try {
        const nomes = await caches.keys()
        await Promise.all(nomes.map((n) => caches.delete(n)))
      } catch (e) {}

      // 2. some consigo mesmo
      try {
        await self.registration.unregister()
      } catch (e) {}

      // 3. recarrega as abas que estavam presas na tela branca. Sem isto elas
      //    continuam em branco até a pessoa recarregar na mão — e ela não vai:
      //    ela vai embora achando que o site está fora do ar.
      try {
        const abas = await self.clients.matchAll({ type: 'window' })
        abas.forEach((aba) => aba.navigate(aba.url))
      } catch (e) {}
    })(),
  )
})

// Sem `fetch`: nada é interceptado. Toda requisição vai direto para a rede,
// como se worker nenhum existisse — que é o estado que este site quer.
