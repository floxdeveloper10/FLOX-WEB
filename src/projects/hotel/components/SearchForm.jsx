import { useEffect, useId, useRef, useState } from 'react'
import HotelIcon from './HotelIcon.jsx'
import { useHotel } from '../hotelState.js'
import { MAX_GUESTS } from '../hotel.data.js'
import { addDays, applySearchPatch, todayISO, validateDates } from '../utils.js'
import './SearchForm.css'

// Buscador de la portada: llegada, salida, huéspedes y "Ver disponibilidad".
// Las fechas se guardan al instante (los totales se recalculan solos).
export default function SearchForm() {
  const { t, search, setSearch, setSearched, scrollToSection, reduceMotion } = useHotel()
  const [error, setError] = useState(null)
  const [searching, setSearching] = useState(false)
  const timer = useRef(null)
  const uid = useId()
  const today = todayISO()

  useEffect(() => () => clearTimeout(timer.current), [])

  const update = (patch) => {
    setError(null)
    setSearch((s) => applySearchPatch(s, patch))
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const problem = validateDates(search.checkIn, search.checkOut)
    if (problem) {
      setError(problem)
      return
    }
    const finish = () => {
      setSearching(false)
      setSearched(true)
      scrollToSection('habitaciones')
    }
    if (reduceMotion) {
      finish()
      return
    }
    setSearching(true)
    timer.current = setTimeout(finish, 1100)
  }

  return (
    <form className="hsearch" onSubmit={onSubmit} aria-label={t.search.label} noValidate>
      <div className="h-field hsearch__field">
        <label className="h-label" htmlFor={`${uid}-in`}>
          {t.search.checkIn}
        </label>
        <input
          id={`${uid}-in`}
          className="h-input hsearch__input"
          type="date"
          min={today}
          value={search.checkIn}
          aria-invalid={error === 'past' || error === 'missing'}
          aria-describedby={error ? `${uid}-error` : undefined}
          onChange={(e) => update({ checkIn: e.target.value })}
        />
      </div>
      <div className="h-field hsearch__field">
        <label className="h-label" htmlFor={`${uid}-out`}>
          {t.search.checkOut}
        </label>
        <input
          id={`${uid}-out`}
          className="h-input hsearch__input"
          type="date"
          min={search.checkIn ? addDays(search.checkIn, 1) : addDays(today, 1)}
          value={search.checkOut}
          aria-invalid={error === 'order' || error === 'missing'}
          aria-describedby={error ? `${uid}-error` : undefined}
          onChange={(e) => update({ checkOut: e.target.value })}
        />
      </div>
      <div className="h-field hsearch__field hsearch__field--guests">
        <label className="h-label" htmlFor={`${uid}-guests`}>
          {t.search.guests}
        </label>
        <select
          id={`${uid}-guests`}
          className="h-input hsearch__input"
          value={search.guests}
          onChange={(e) => update({ guests: Number(e.target.value) })}
        >
          {Array.from({ length: MAX_GUESTS }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {t.search.guestsOption(n)}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="h-btn h-btn--gold hsearch__submit" disabled={searching} aria-live="polite">
        {searching ? (
          <>
            <span className="hsearch__spinner" aria-hidden="true" />
            {t.search.searching}
          </>
        ) : (
          <>
            <HotelIcon name="calendar" />
            {t.search.button}
          </>
        )}
      </button>
      {error && (
        <p id={`${uid}-error`} className="h-error hsearch__error" role="alert">
          {t.errors[error]}
        </p>
      )}
    </form>
  )
}
