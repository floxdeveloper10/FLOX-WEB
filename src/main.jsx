import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './styles/variables.css'
import './styles/global.css'
import App from './App.jsx'

// HashRouter: las páginas viven después del # (…/flox-web/#/nosotros), así GitHub Pages
// no da error 404 al recargar.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
