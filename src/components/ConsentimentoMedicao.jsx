import { useEffect, useState } from 'react'
import { definirMedicao, escolhaMedicao, iniciarGoogleAds, GA4_ID } from '../lib/googleAds.js'

const TEXTOS = {
  pt: { titulo: 'Medição de anúncios', textoGa: 'Podemos usar cookies do Google (Ads e Analytics) para saber quais anúncios e páginas levam a cadastros e contatos? Não enviamos nome, e-mail ou senha nessa medição. Você pode mudar sua escolha aqui no rodapé.', texto: 'Podemos usar cookies do Google Ads para saber quais anúncios levam a cadastros? Não enviamos nome, e-mail ou senha nessa medição. Você pode mudar sua escolha aqui no rodapé.', sim: 'Permitir medição', nao: 'Agora não', preferencias: 'Preferências de medição', privacidade: 'Como o Google usa os dados' },
  en: { titulo: 'Ad measurement', textoGa: 'May we use Google cookies (Ads and Analytics) to learn which ads and pages lead to sign-ups and contacts? We do not send your name, email or password for this measurement. You can change your choice here in the footer.', texto: 'May we use Google Ads cookies to learn which ads lead to sign-ups? We do not send your name, email or password for this measurement. You can change your choice here in the footer.', sim: 'Allow measurement', nao: 'Not now', preferencias: 'Measurement preferences', privacidade: 'How Google uses data' },
  es: { titulo: 'Medición de anuncios', textoGa: '¿Podemos usar cookies de Google (Ads y Analytics) para saber qué anuncios y páginas generan registros y contactos? No enviamos nombre, correo ni contraseña para esta medición. Puedes cambiar tu decisión aquí en el pie de página.', texto: '¿Podemos usar cookies de Google Ads para saber qué anuncios generan registros? No enviamos nombre, correo ni contraseña para esta medición. Puedes cambiar tu decisión aquí en el pie de página.', sim: 'Permitir medición', nao: 'Ahora no', preferencias: 'Preferencias de medición', privacidade: 'Cómo usa Google los datos' },
  de: { titulo: 'Anzeigenmessung', textoGa: 'Dürfen wir Google-Cookies (Ads und Analytics) nutzen, um zu sehen, welche Anzeigen und Seiten zu Registrierungen und Kontakten führen? Namen, E-Mail-Adressen und Passwörter werden dafür nicht gesendet. Die Auswahl kann hier im Footer geändert werden.', texto: 'Dürfen wir Google-Ads-Cookies nutzen, um zu sehen, welche Anzeigen zu Registrierungen führen? Namen, E-Mail-Adressen und Passwörter werden dafür nicht gesendet. Die Auswahl kann hier im Footer geändert werden.', sim: 'Messung erlauben', nao: 'Jetzt nicht', preferencias: 'Messeinstellungen', privacidade: 'So nutzt Google Daten' },
}

/* `compacto`: em página que ocupa a tela inteira sem rolar (a /tempera), o
   link de preferências vira um canto fixo em vez de um bloco no fim da página. */
export default function ConsentimentoMedicao({ idioma, compacto = false }) {
  const [aberto, setAberto] = useState(() => !escolhaMedicao())
  const t = TEXTOS[idioma] || TEXTOS.en
  useEffect(() => { iniciarGoogleAds() }, [])
  const escolher = (aceitar) => { definirMedicao(aceitar); setAberto(false) }
  return <>
    {compacto
      ? <button className="fixed bottom-1 right-2 z-10 min-h-8 px-2 text-[11px] text-dim underline underline-offset-4" onClick={() => setAberto(true)}>{t.preferencias}</button>
      : <div className="py-4 text-center"><button className="min-h-11 px-4 text-sm text-ink underline underline-offset-4" onClick={() => setAberto(true)}>{t.preferencias}</button></div>}
    {aberto && <section aria-label={t.titulo} className="fixed inset-x-0 bottom-0 z-[100] border-t border-line bg-card p-4 text-ink sm:p-5">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4">
        <div className="min-w-0 flex-1 basis-72"><strong>{t.titulo}</strong><p className="mt-1 text-sm leading-relaxed">{GA4_ID ? t.textoGa : t.texto} <a className="underline underline-offset-2" href="https://business.safety.google/privacy/" target="_blank" rel="noopener noreferrer">{t.privacidade}</a></p></div>
        <div className="flex w-full gap-3 sm:w-auto">
          <button className="min-h-11 flex-1 rounded-lg border border-ink px-4 text-sm font-semibold sm:flex-none" onClick={() => escolher(false)}>{t.nao}</button>
          <button className="min-h-11 flex-1 rounded-lg border border-ink px-4 text-sm font-semibold sm:flex-none" onClick={() => escolher(true)}>{t.sim}</button>
        </div>
      </div>
    </section>}
  </>
}
