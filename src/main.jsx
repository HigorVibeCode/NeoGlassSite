import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { capturarOrigem } from './lib/indicacao.js'
import './styles.css'

/**
 * De onde veio a visita — lido ANTES de o React montar, e não dentro de um
 * efeito.
 *
 * Isto não é preciosismo: a Home tem a memória do público (lib/lado.js) e, ao
 * montar, redireciona quem já escolheu um lado para /vidracaria ou /industria.
 * Em React os efeitos dos FILHOS rodam antes dos do pai, então esse redirect
 * acontecia primeiro e levava embora o `?ref=` da URL — a indicação do parceiro
 * se perdia antes de alguém conseguir lê-la. Aqui em cima nada disso existe
 * ainda: o endereço está intacto.
 */
capturarOrigem()

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
