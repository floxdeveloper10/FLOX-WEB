import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './styles/variables.css'
import './styles/global.css'
import App from './App.jsx'
import { captureUtm } from './lib/analytics.js'
import { initConsent } from './lib/consent.js'

// Antes de todo: guardar los UTM con los que llegó la visita y, si ya aceptó las cookies antes,
// cargar la medición
captureUtm()
initConsent()

// HashRouter: las páginas viven después del # (…/flox-web/#/nosotros), así GitHub Pages
// no da error 404 al recargar.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
