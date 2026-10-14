import { Link } from 'react-router-dom'
import Chakana from '../../components/brand/Chakana.jsx'
import { whatsappLink } from '../../data/site.js'
import './DemoBar.css'

/**
 * Barra delgada de FLOX encima de un sitio demo: deja claro que es un negocio ficticio
 * y ofrece volver a proyectos o pedir una web así.
 */
export default function DemoBar({ message }) {
  return (
    <div className="demobar" role="region" aria-label="Proyecto demo de FLOX">
      <Link to="/proyectos" className="demobar__back">
        <span aria-hidden="true">←</span>
        <span className="demobar__long">Volver a proyectos</span>
        <span className="demobar__short">Volver</span>
      </Link>

      <p className="demobar__label">
        <Chakana className="demobar__chakana" />
        <span className="demobar__long">
          Proyecto demo hecho por <strong>FLOX</strong> · negocio ficticio
        </span>
        <span className="demobar__short">
          Demo <strong>FLOX</strong>
        </span>
      </p>

      <a className="demobar__cta" href={whatsappLink(message)} target="_blank" rel="noopener noreferrer">
        <span className="demobar__long">Quiero una web así</span>
        <span className="demobar__short">Quiero una así</span>
      </a>
    </div>
  )
}
