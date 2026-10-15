import { Link } from 'react-router-dom'
import Chakana from '../../components/brand/Chakana.jsx'
import { whatsappLink } from '../../data/site.js'
import './DemoBar.css'

/**
 * Barra delgada de FLOX encima de un sitio demo: deja claro que es un negocio ficticio
 * ("Proyecto demo · negocio ficticio", visible en todos los tamaños) y ofrece volver
 * a proyectos o pedir algo así por WhatsApp.
 * - kind: 'web' | 'app' (cambia el texto del botón)
 */
export default function DemoBar({ message, kind = 'web' }) {
  const cta = kind === 'app' ? 'una app así' : 'una web así'

  return (
    <div className="demobar" role="region" aria-label="Proyecto demo de FLOX">
      <Link to="/proyectos" className="demobar__back" aria-label="Volver a proyectos de FLOX">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M19 12H5m6-6-6 6 6 6" />
        </svg>
        <span className="demobar__long">Volver a proyectos</span>
      </Link>

      <p className="demobar__label">
        <Chakana className="demobar__chakana" />
        <span className="demobar__text">
          <strong>Proyecto demo</strong>
          <span className="demobar__sep" aria-hidden="true">
            {' · '}
          </span>
          <span>negocio ficticio</span>
          <span className="demobar__long"> · hecho por FLOX</span>
        </span>
      </p>

      <a className="demobar__cta" href={whatsappLink(message)} target="_blank" rel="noopener noreferrer">
        <span className="demobar__long">Quiero {cta}</span>
        <span className="demobar__short">Quiero {kind === 'app' ? 'una app' : 'una web'}</span>
      </a>
    </div>
  )
}
