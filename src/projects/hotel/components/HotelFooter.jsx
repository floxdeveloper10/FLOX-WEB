import { Link } from 'react-router-dom'
import HotelIcon from './HotelIcon.jsx'
import HotelLogo from './HotelLogo.jsx'
import Chakana from '../../../components/brand/Chakana.jsx'
import { useHotel } from '../hotelState.js'
import { hotel } from '../hotel.data.js'
import './HotelFooter.css'

const SOCIAL_NAMES = { facebook: 'Facebook', instagram: 'Instagram', tripadvisor: 'Tripadvisor' }
const YEAR = new Date().getFullYear()

export default function HotelFooter() {
  const { t } = useHotel()

  return (
    <footer className="hfoot">
      <div className="h-container hfoot__top">
        <div className="hfoot__brand">
          <HotelLogo />
          <p className="hfoot__tagline">{t.footer.tagline}</p>
        </div>

        <div>
          <h2 className="hfoot__title">{t.footer.contact}</h2>
          {/* Datos de ejemplo: texto sin enlace */}
          <ul className="hfoot__list">
            <li>
              <HotelIcon name="phone" />
              {hotel.contact.phone}
            </li>
            <li>
              <HotelIcon name="mail" />
              {hotel.contact.email}
            </li>
            <li>
              <HotelIcon name="pin" />
              {hotel.place}
            </li>
          </ul>
        </div>

        <div>
          <h2 className="hfoot__title">{t.footer.follow}</h2>
          {/* Redes ficticias: íconos sin enlace real */}
          <ul className="hfoot__socials">
            {hotel.socials.map((s) => (
              <li key={s}>
                <span className="hfoot__social" role="img" aria-label={`${SOCIAL_NAMES[s]} (${t.footer.exampleNote.toLowerCase()})`}>
                  <HotelIcon name={s} />
                </span>
              </li>
            ))}
          </ul>
          <p className="hfoot__note">{t.footer.exampleNote}</p>
        </div>
      </div>

      <div className="hfoot__bottom">
        <div className="h-container hfoot__bottom-inner">
          <p>
            © {YEAR} {t.footer.rights}
          </p>
          <Link to="/" className="hfoot__flox">
            {t.footer.madeBy}
            <Chakana className="hfoot__chakana" />
            <strong>FLOX</strong>
          </Link>
        </div>
      </div>
    </footer>
  )
}
