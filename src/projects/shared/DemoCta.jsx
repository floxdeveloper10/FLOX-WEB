import { Link } from 'react-router-dom'
import WhatsAppIcon from '../../components/WhatsAppIcon.jsx'
import { whatsappLink } from '../../data/site.js'
import './DemoParts.css'

// Llamado al final de cada demo de app: WhatsApp a FLOX y enlace a las demás apps
export default function DemoCta({ id, title, text, button, message, moreLabel = 'Ver más apps de ejemplo' }) {
  return (
    <section className="dcta" aria-labelledby={id}>
      <h2 id={id} className="dcta__title">
        {title}
      </h2>
      {text && <p className="dcta__text">{text}</p>}
      <div className="dcta__actions">
        <a className="dcta__btn" href={whatsappLink(message)} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon />
          {button}
        </a>
        <Link className="dcta__link" to="/apps">
          {moreLabel}
        </Link>
      </div>
    </section>
  )
}
