import { motion } from 'framer-motion'
import HotelIcon from './HotelIcon.jsx'
import HotelImage from './HotelImage.jsx'
import { useHotel } from '../hotelState.js'
import { amenityLabels, rooms } from '../hotel.data.js'
import { formatRange, nightsBetween } from '../utils.js'
import './Rooms.css'

function RoomCard({ room, index, nights }) {
  const { t, lang, price, search, searched, openBooking } = useHotel()
  const showTotal = searched && nights > 0
  const tooSmall = searched && search.guests > room.capacity

  return (
    <motion.li
      className="hroom"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="hroom__media">
        <HotelImage image={room.image} lang={lang} className="hroom__img" />
      </div>
      <div className="hroom__body">
        <h3 className="hroom__name">{room.name[lang]}</h3>
        <p className="hroom__desc">{room.description[lang]}</p>

        <p className="hroom__meta">
          <span>
            <HotelIcon name="guests" />
            {t.rooms.upTo(room.capacity)}
          </span>
          <span>
            <HotelIcon name="size" />
            {room.size} m²
          </span>
        </p>

        <ul className="hroom__amenities">
          {room.amenities.map((a) => (
            <li key={a}>
              <HotelIcon name={a} />
              {amenityLabels[a][lang]}
            </li>
          ))}
        </ul>

        <div className="hroom__footer">
          <div className="hroom__price">
            <p>
              <span className="hroom__amount">{price(room.price)}</span>
              <span className="hroom__per"> {t.rooms.perNight}</span>
            </p>
            {showTotal && (
              <p className="hroom__total">
                {t.rooms.nights(nights)} · {t.rooms.total} <strong>{price(room.price * nights)}</strong>
              </p>
            )}
          </div>
          <button type="button" className="h-btn h-btn--navy hroom__book" onClick={(e) => openBooking(room.id, e.currentTarget)}>
            {t.rooms.book}
          </button>
        </div>
        {tooSmall && <p className="h-notice hroom__notice">{t.rooms.tooSmall(search.guests)}</p>}
      </div>
    </motion.li>
  )
}

export default function Rooms() {
  const { t, search, searched } = useHotel()
  const nights = nightsBetween(search.checkIn, search.checkOut)

  return (
    <section id="habitaciones" className="h-section h-section--stone hrooms" aria-labelledby="hrooms-title">
      <div className="h-container">
        <header className="h-heading">
          <p className="h-eyebrow">{t.rooms.eyebrow}</p>
          <h2 id="hrooms-title" className="h-title">
            {t.rooms.title}
          </h2>
          <p className="h-lead">{t.rooms.lead}</p>
        </header>

        {searched && nights > 0 && (
          <div className="hrooms__summary" role="status">
            <HotelIcon name="calendar" />
            <span>
              {t.rooms.summary(t.rooms.nights(nights), formatRange(search.checkIn, search.checkOut, t.locale), t.search.guestsOption(search.guests))}
            </span>
            <button
              type="button"
              className="hrooms__change"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
                document.querySelector('.hsearch input')?.focus({ preventScroll: true })
              }}
            >
              {t.rooms.changeDates}
            </button>
          </div>
        )}

        <ul className="hrooms__list">
          {rooms.map((room, i) => (
            <RoomCard key={room.id} room={room} index={i} nights={nights} />
          ))}
        </ul>
      </div>
    </section>
  )
}
