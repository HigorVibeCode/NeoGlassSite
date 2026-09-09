import { useEffect, useState } from 'react'
import { definirMedicao, escolhaMedicao, iniciarGoogleAds } from '../lib/googleAds.js'

const TEXTOS = {
  pt: { titulo: 'Medição de anúncios', texto: 'Podemos usar cookies do Google Ads para saber quais anúncios levam a cadastros? Não enviamos nome, e-mail ou senha nessa medição. Você pode mudar sua escolha aqui no rodapé.', sim: 'Permitir medição', nao: 'Agora não', preferencias: 'Preferências de medição', privacidade: 'Como o Google usa os dados' },
  en: { titulo: 'Ad measurement', texto: 'May we use Google Ads cookies to learn which ads lead to sign-ups? We do not send your name, email or password for this measurement. You can change your choice here in the footer.', sim: 'Allow measurement', nao: 'Not now', preferencias: 'Measurement preferences', privacidade: 'How Google uses data' },
  es: { titulo: 'Medición de anuncios', texto: '¿Podemos usar cookies de Google Ads para saber qué anuncios generan registros? No enviamos nombre, correo ni contraseña para esta medición. Puedes cambiar tu decisión aquí en el pie de página.', sim: 'Permitir medición', nao: 'Ahora no', preferencias: 'Preferencias de medición', privacidade: 'Cómo usa Google los datos' },
  de: { titulo: 'Anzeigenmessung', texto: 'Dürfen wir Google-Ads-Cookies nutzen, um zu sehen, welche Anzeigen zu Registrierungen führen? Namen, E-Mail-Adressen und Passwörter werden dafür nicht gesendet. Die Auswahl kann hier im Footer geändert werden.', sim: 'Messung erlauben', nao: 'Jetzt nicht', preferencias: 'Messeinstellungen', privacidade: 'So nutzt Google Daten' },
}

export default function ConsentimentoMedicao({ idioma }) {
  const [aberto, setAberto] = useState(() => !escolhaMedicao())
  const t = TEXTOS[idioma] || TEXTOS.en
  useEffect(() => { iniciarGoogleAds() }, [])
  const escolher = (aceitar) => { definirMedicao(aceitar); setAberto(false) }
  return <>
    <div className="py-4 text-center"><button className="min-h-11 px-4 text-sm text-ink underline underline-offset-4" onClick={() => setAberto(true)}>{t.preferencias}</button></div>
    {aberto && <section aria-label={t.titulo} className="fixed inset-x-0 bottom-0 z-[100] border-t border-line bg-card p-4 text-ink sm:p-5">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4">
        <div className="min-w-0 flex-1 basis-72"><strong>{t.titulo}</strong><p className="mt-1 text-sm leading-relaxed">{t.texto} <a className="underline underline-offset-2" href="https://business.safety.google/privacy/" target="_blank" rel="noopener noreferrer">{t.privacidade}</a></p></div>
        <div className="flex w-full gap-3 sm:w-auto">
          <button className="min-h-11 flex-1 rounded-lg border border-ink px-4 text-sm font-semibold sm:flex-none" onClick={() => escolher(false)}>{t.nao}</button>
          <button className="min-h-11 flex-1 rounded-lg border border-ink px-4 text-sm font-semibold sm:flex-none" onClick={() => escolher(true)}>{t.sim}</button>
        </div>
      </div>
    </section>}
  </>
}
