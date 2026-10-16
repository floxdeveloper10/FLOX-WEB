import { Link } from 'react-router-dom'
import LogoFlox from './brand/LogoFlox.jsx'
import StepBand from './brand/StepBand.jsx'
import { footer, headerUi, nav, site } from '../data/site.js'
import { openCookieSettings } from '../lib/consent.js'
import './Footer.css'

const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="footer">
      {/* Franja andina animada: las pirámides se apoyan en el pie de página */}
      <div className="footer__band">
        <StepBand animated />
      </div>

      <div className="container footer__inner">
        <Link to="/" className="footer__brand" aria-label={`${site.name}, ir al inicio`}>
          <LogoFlox layout="horizontal" variant="white" title={site.name} className="footer__logo" />
        </Link>

        <nav aria-label={footer.navLabel}>
          <ul className="footer__nav">
            {nav
              .filter((item) => item.id !== 'inicio' && item.id !== 'soluciones')
              .map((item) => (
                <li key={item.id}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            <li>
              <Link to="/cotizar">{headerUi.quote}</Link>
            </li>
          </ul>
        </nav>

        <div className="footer__end">
          <ul className="footer__legal">
            <li>
              <Link to="/privacidad">{footer.privacy}</Link>
            </li>
            <li>
              {/* Vuelve a mostrar el aviso para cambiar la elección */}
              <button type="button" onClick={openCookieSettings}>
                {footer.cookies}
              </button>
            </li>
          </ul>
          <p className="footer__copy">
            © {YEAR} {site.name} · {footer.madeIn}
          </p>
        </div>
      </div>
    </footer>
  )
}
