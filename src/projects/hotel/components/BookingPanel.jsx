import { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import HotelIcon from './HotelIcon.jsx'
import HotelImage from './HotelImage.jsx'
import Toggle from './Toggle.jsx'
import WhatsAppIcon from '../../../components/WhatsAppIcon.jsx'
import { useHotel } from '../hotelState.js'
import { CURRENCY_OPTIONS } from '../hotel.data.js'
import { addDays, applySearchPatch, bookingMessage, formatDate, nightsBetween, todayISO, validateDates } from '../utils.js'
// En la demo, la reserva llega al WhatsApp de FLOX (src/data/site.js).
// En la web de un hotel real, aquí iría el número de WhatsApp del hotel.
import { whatsappLink } from '../../../data/site.js'
import './BookingPanel.css'

const isWide = () => typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches

function Panel({ room, onClose }) {
  const { t, lang, currency, setCurrency, price, search, setSearch } = useHotel()
  const [name, setName] = useState('')
  const [country, setCountry] = useState('')
  const [submitted, setSubmitted] = useState(false)
  // Si se buscó para más huéspedes de los que caben, se ajusta y se avisa con amabilidad
  const [capacityNotice, setCapacityNotice] = useState(() => search.guests > room.capacity)
  const [wide] = useState(isWide)
  const ref = useRef(null)
  const uid = useId()

  const nights = nightsBetween(search.checkIn, search.checkOut)
  const dateError = validateDates(search.checkIn, search.checkOut)
  const total = room.price * nights
  const otherCurrency = currency === 'USD' ? 'PEN' : 'USD'
  const nameError = submitted && !name.trim()
  const countryError = submitted && !country.trim()

  // Al abrir: foco en el panel, página quieta y huéspedes dentro de la capacidad
  useEffect(() => {
    const root = document.documentElement
    const previous = root.style.overflow
    root.style.overflow = 'hidden'
    ref.current?.querySelector('[data-autofocus]')?.focus({ preventScroll: true })
    return () => {
      root.style.overflow = previous
    }
  }, [])

  useEffect(() => {
    if (search.guests > room.capacity) setSearch((s) => ({ ...s, guests: room.capacity }))
  }, [search.guests, room.capacity, setSearch])

  const onKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
    } else if (event.key === 'Tab') {
      const items = [...ref.current.querySelectorAll('button:not([disabled]), input, select, a[href]')]
      const first = items[0]
      const last = items.at(-1)
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
  }

  const setGuests = (n) => {
    setCapacityNotice(false)
    setSearch((s) => ({ ...s, guests: Math.min(room.capacity, Math.max(1, n)) }))
  }

  const onConfirm = (event) => {
    event.preventDefault()
    setSubmitted(true)
    // Llevar el foco al primer dato que falta
    const firstInvalid = dateError ? `${uid}-in` : !name.trim() ? `${uid}-name` : !country.trim() ? `${uid}-country` : null
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus()
      return
    }
    const message = bookingMessage({ t, room, lang, ...search, nights, currency, name, country })
    window.open(whatsappLink(message), '_blank', 'noopener,noreferrer')
  }

  const slide = wide
    ? { initial: { x: '100%' }, animate: { x: 0 }, exit: { x: '100%' } }
    : { initial: { y: '100%' }, animate: { y: 0 }, exit: { y: '100%' } }

  return (
    <>
      <motion.div
        className="hbook__backdrop"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        ref={ref}
        className="hbook"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${uid}-title`}
        onKeyDown={onKeyDown}
        {...slide}
        transition={{ type: 'spring', stiffness: 320, damping: 36 }}
      >
        <header className="hbook__head">
          <div>
            <p className="hbook__eyebrow">{t.booking.title}</p>
            <h2 id={`${uid}-title`} className="hbook__title">
              {room.name[lang]}
            </h2>
          </div>
          <button type="button" className="hbook__close" onClick={onClose} aria-label={t.booking.close} data-autofocus>
            <HotelIcon name="close" />
          </button>
        </header>

        <form className="hbook__body" onSubmit={onConfirm} noValidate>
          <div className="hbook__media">
            <HotelImage image={room.image} lang={lang} className="hbook__img" />
          </div>

          <div className="hbook__dates">
            <div className="h-field">
              <label className="h-label" htmlFor={`${uid}-in`}>
                {t.search.checkIn}
              </label>
              <input
                id={`${uid}-in`}
                className="h-input"
                type="date"
                min={todayISO()}
                value={search.checkIn}
                aria-invalid={dateError === 'past' || dateError === 'missing'}
                onChange={(e) => setSearch((s) => applySearchPatch(s, { checkIn: e.target.value }))}
              />
            </div>
            <div className="h-field">
              <label className="h-label" htmlFor={`${uid}-out`}>
                {t.search.checkOut}
              </label>
              <input
                id={`${uid}-out`}
                className="h-input"
                type="date"
                min={search.checkIn ? addDays(search.checkIn, 1) : addDays(todayISO(), 1)}
                value={search.checkOut}
                aria-invalid={dateError === 'order' || dateError === 'missing'}
                onChange={(e) => setSearch((s) => applySearchPatch(s, { checkOut: e.target.value }))}
              />
            </div>
          </div>
          {dateError && (
            <p className="h-error" role="alert">
              {t.errors[dateError]}
            </p>
          )}

          <div className="hbook__guests">
            <span className="h-label" id={`${uid}-guests`}>
              {t.booking.guests}
              <span className="hbook__cap"> · {t.rooms.upTo(room.capacity)}</span>
            </span>
            <div className="hbook__stepper" role="group" aria-labelledby={`${uid}-guests`}>
              <button type="button" onClick={() => setGuests(search.guests - 1)} disabled={search.guests <= 1} aria-label={t.booking.less}>
                <HotelIcon name="minus" />
              </button>
              <output aria-live="polite">{search.guests}</output>
              <button
                type="button"
                onClick={() => setGuests(search.guests + 1)}
                disabled={search.guests >= room.capacity}
                aria-label={t.booking.more}
              >
                <HotelIcon name="plus" />
              </button>
            </div>
          </div>
          {capacityNotice && (
            <p className="h-notice" role="status">
              {t.errors.capacity(room.capacity)}
            </p>
          )}

          <div className="hbook__summary" aria-live="polite">
            <div className="hbook__row">
              <span>{t.booking.dates}</span>
              <span>
                {formatDate(search.checkIn, t.locale)} → {formatDate(search.checkOut, t.locale)}
              </span>
            </div>
            <div className="hbook__row">
              <span>{t.booking.nights}</span>
              <span>
                {price(room.price)} × {nights}
              </span>
            </div>
            <div className="hbook__row hbook__row--total">
              <span>{t.booking.total}</span>
              <strong>{nights > 0 ? price(total) : '—'}</strong>
            </div>
            <div className="hbook__currency">
              <span>
                {nights > 0 && (
                  <>
                    {t.booking.approx} {price(total, otherCurrency)}
                  </>
                )}
              </span>
              <Toggle label={t.nav.currency} options={CURRENCY_OPTIONS} value={currency} onChange={setCurrency} tone="dark" />
            </div>
          </div>

          <div className="h-field">
            <label className="h-label" htmlFor={`${uid}-name`}>
              {t.booking.name}
            </label>
            <input
              id={`${uid}-name`}
              className="h-input"
              type="text"
              autoComplete="name"
              placeholder={t.booking.namePlaceholder}
              value={name}
              aria-invalid={nameError}
              aria-describedby={nameError ? `${uid}-name-error` : undefined}
              onChange={(e) => setName(e.target.value)}
            />
            {nameError && (
              <p id={`${uid}-name-error`} className="h-error">
                {t.errors.name}
              </p>
            )}
          </div>
          <div className="h-field">
            <label className="h-label" htmlFor={`${uid}-country`}>
              {t.booking.country}
            </label>
            <input
              id={`${uid}-country`}
              className="h-input"
              type="text"
              autoComplete="country-name"
              list={`${uid}-countries`}
              placeholder={t.booking.countryPlaceholder}
              value={country}
              aria-invalid={countryError}
              aria-describedby={countryError ? `${uid}-country-error` : undefined}
              onChange={(e) => setCountry(e.target.value)}
            />
            <datalist id={`${uid}-countries`}>
              {t.countries.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
            {countryError && (
              <p id={`${uid}-country-error`} className="h-error">
                {t.errors.country}
              </p>
            )}
          </div>

          <button type="submit" className="h-btn h-btn--gold hbook__confirm">
            <WhatsAppIcon />
            {t.booking.confirm}
          </button>
          <p className="hbook__note">{t.booking.note}</p>
        </form>
      </motion.div>
    </>
  )
}

// Panel lateral (hoja inferior en el celular) con el resumen y el formulario de reserva.
export default function BookingPanel({ room, onClose }) {
  return <AnimatePresence>{room && <Panel key={room.id} room={room} onClose={onClose} />}</AnimatePresence>
}
