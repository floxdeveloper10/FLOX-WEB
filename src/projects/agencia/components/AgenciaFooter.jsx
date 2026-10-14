import { Link } from 'react-router-dom'
import AgenciaIcon from './AgenciaIcon.jsx'
import AgenciaLogo from './AgenciaLogo.jsx'
import PaymentIcons from './PaymentIcons.jsx'
import Chakana from '../../../components/brand/Chakana.jsx'
import { useAgencia } from '../agenciaState.js'
import { agency } from '../agencia.data.js'
import { to } from '../utils.js'

const SOCIAL_NAMES = { facebook: 'Facebook', instagram: 'Instagram', tiktok: 'TikTok', youtube: 'YouTube' }
const YEAR = new Date().getFullYear()

export default function AgenciaFooter() {
  const { t, lang } = useAgencia()
  const links = [
    { path: '', label: t.nav.home },
    { path: '/tours', label: t.nav.tours },
    { path: '/nosotros', label: t.nav.about },
    { path: '/contacto', label: t.nav.contact },
  ]

  return (
    <footer className="afoot">
      <div className="a-container afoot__grid">
        <div className="afoot__brand">
          <AgenciaLogo tone="light" />
          <p className="afoot__tagline">{t.footer.tagline}</p>
          <p className="afoot__contact">
            <AgenciaIcon name="pin" />
            {agency.contact.address[lang]}
          </p>
        </div>

        <nav aria-label={t.footer.explore}>
          <h2 className="afoot__title">{t.footer.explore}</h2>
          <ul className="afoot__links">
            {links.map((l) => (
              <li key={l.path}>
                <Link to={to(l.path)}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="afoot__title">{t.footer.follow}</h2>
          {/* Redes ficticias: íconos sin enlace real */}
          <ul className="afoot__socials">
            {agency.socials.map((s) => (
              <li key={s}>
                <span className="afoot__social" role="img" aria-label={`${SOCIAL_NAMES[s]} (${t.footer.exampleNote.toLowerCase()})`}>
                  <AgenciaIcon name={s} />
                </span>
              </li>
            ))}
          </ul>
          <p className="afoot__note">{t.footer.exampleNote}</p>
        </div>

        <div>
          <h2 className="afoot__title">{t.footer.payments}</h2>
          <PaymentIcons />
        </div>
      </div>

      <div className="afoot__bottom">
        <div className="a-container afoot__bottom-inner">
          <p>
            © {YEAR} {t.footer.rights}
          </p>
          <Link to="/" className="afoot__flox">
            {t.footer.madeBy}
            <Chakana className="afoot__chakana" />
            <strong>FLOX</strong>
          </Link>
        </div>
      </div>
    </footer>
  )
}
