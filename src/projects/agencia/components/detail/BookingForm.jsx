import { useId, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AgenciaIcon from '../AgenciaIcon.jsx'
import AnimatedPrice from '../AnimatedPrice.jsx'
import Calendar from './Calendar.jsx'
import Travelers from './Travelers.jsx'
import { useAgencia } from '../../agenciaState.js'
import { extras as EXTRAS, travelerTypes } from '../../agencia.data.js'
import { bookingPrice, formatDate, soldOutDates, to } from '../../utils.js'

/**
 * Formulario de reserva: calendario, viajeros, extras, precio total y botones.
 * Lo usan la caja lateral (escritorio) y el panel inferior (celular).
 */
export default function BookingForm({ tour, booking, setBooking, editing, onDone }) {
  const { t, lang, price, addToCart, updateCartItem, showToast, openCart } = useAgencia()
  const navigate = useNavigate()
  const uid = useId()
  const calendarRef = useRef(null)
  const [error, setError] = useState(null)
  const soldOut = useMemo(() => soldOutDates(tour), [tour])
  const { lines, total } = bookingPrice(tour, booking.travelers, booking.extras)

  const valid = () => {
    if (!booking.date) {
      setError(t.booking.errorDate)
      calendarRef.current?.querySelector('.acal__day[tabindex="0"]')?.focus()
      return false
    }
    setError(null)
    return true
  }

  const data = () => ({ tourId: tour.id, date: booking.date, travelers: booking.travelers, extras: booking.extras })

  const save = () => {
    if (editing) {
      updateCartItem(editing.key, data())
      return editing.key
    }
    return addToCart(data())
  }

  const onAdd = () => {
    if (!valid()) return
    save()
    showToast({ message: editing ? t.cart.updated : t.cart.added, action: { label: t.cart.view, onClick: (e) => openCart(e.currentTarget) } })
    onDone?.()
    // Al terminar de editar, se quita el ?editar de la dirección
    if (editing) navigate(to(`/tours/${tour.id}`), { replace: true })
  }

  const onBookNow = () => {
    if (!valid()) return
    save()
    onDone?.()
    navigate(to('/reserva'))
  }

  const toggleExtra = (id) =>
    setBooking((b) => ({ ...b, extras: b.extras.includes(id) ? b.extras.filter((x) => x !== id) : [...b.extras, id] }))

  return (
    <div className="abook__form">
      {editing && (
        <p className="abook__editing">
          <AgenciaIcon name="edit" />
          {t.booking.editing}
        </p>
      )}

      <section className="abook__block" ref={calendarRef}>
        <h3 id={`${uid}-date`} className="abook__label">
          {t.booking.date}
        </h3>
        <Calendar
          tour={tour}
          value={booking.date}
          soldOut={soldOut}
          labelledBy={`${uid}-date`}
          invalid={Boolean(error)}
          onChange={(date) => {
            setError(null)
            setBooking((b) => ({ ...b, date }))
          }}
        />
        <p className="abook__chosen" aria-live="polite">
          {booking.date ? (
            <>
              <AgenciaIcon name="calendar" />
              {t.booking.selectedDate}: <strong>{formatDate(booking.date, t.locale, { weekday: 'long', day: 'numeric', month: 'long' })}</strong>
            </>
          ) : (
            t.booking.chooseDate
          )}
        </p>
        {error && (
          <p className="abook__error" role="alert">
            {error}
          </p>
        )}
      </section>

      <section className="abook__block">
        <h3 className="abook__label">{t.booking.travelers}</h3>
        <Travelers tour={tour} travelers={booking.travelers} onChange={(travelers) => setBooking((b) => ({ ...b, travelers }))} />
      </section>

      {tour.extras.length > 0 && (
        <fieldset className="abook__block abook__extras">
          <legend className="abook__label">{t.booking.extras}</legend>
          {tour.extras.map((id) => {
            const extra = EXTRAS[id]
            return (
              <label key={id} className="abook__extra">
                <input type="checkbox" checked={booking.extras.includes(id)} onChange={() => toggleExtra(id)} />
                <span className="abook__extra-name">{extra.label[lang]}</span>
                <span className="abook__extra-price">
                  +{price(extra.price)} {extra.per === 'persona' ? t.booking.perPersonShort : t.booking.perGroup}
                </span>
              </label>
            )
          })}
        </fieldset>
      )}

      <section className="abook__block abook__summary" aria-label={t.booking.summary}>
        <ul className="abook__lines">
          {lines.map((line) => (
            <li key={`${line.kind}-${line.id}`}>
              <span>
                {line.kind === 'traveler' ? travelerTypes.find((x) => x.id === line.id).label[lang] : EXTRAS[line.id].label[lang]} × {line.qty}
              </span>
              <span>{price(line.amount)}</span>
            </li>
          ))}
        </ul>
        <p className="abook__total">
          <span>{t.booking.total}</span>
          <AnimatedPrice usd={total} className="abook__total-price" />
        </p>
      </section>

      <div className="abook__actions">
        {editing ? (
          <>
            <button type="button" className="a-btn a-btn--primary" onClick={onAdd}>
              {t.booking.save}
            </button>
            <button type="button" className="a-btn a-btn--outline" onClick={() => navigate(to(`/tours/${tour.id}`), { replace: true })}>
              {t.booking.cancelEdit}
            </button>
          </>
        ) : (
          <>
            <button type="button" className="a-btn a-btn--outline" onClick={onAdd}>
              <AgenciaIcon name="cart" />
              {t.booking.add}
            </button>
            <button type="button" className="a-btn a-btn--primary" onClick={onBookNow}>
              {t.booking.bookNow}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
