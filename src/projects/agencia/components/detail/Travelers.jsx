import AgenciaIcon from '../AgenciaIcon.jsx'
import { useAgencia } from '../../agenciaState.js'
import { travelerTypes } from '../../agencia.data.js'
import { totalTravelers } from '../../utils.js'

// Selector de viajeros: adultos (mínimo 1), estudiantes y niños, con + y −
export default function Travelers({ tour, travelers, onChange }) {
  const { t, lang, price } = useAgencia()
  const total = totalTravelers(travelers)
  const full = total >= tour.groupSize

  return (
    <div className="atrav">
      <ul className="atrav__list">
        {travelerTypes.map((type) => {
          const value = travelers[type.id]
          const min = type.id === 'adults' ? 1 : 0
          const label = type.label[lang].toLowerCase()
          return (
            <li key={type.id} className="atrav__row">
              <span className="atrav__info">
                <span className="atrav__label">{type.label[lang]}</span>
                <span className="atrav__hint">
                  {type.hint[lang]} · {price(tour.price * (1 - type.discount))}
                </span>
              </span>
              <span className="atrav__stepper" role="group" aria-label={type.label[lang]}>
                <button type="button" onClick={() => onChange({ ...travelers, [type.id]: value - 1 })} disabled={value <= min} aria-label={t.booking.less(label)}>
                  <AgenciaIcon name="minus" />
                </button>
                <output aria-live="polite">{value}</output>
                <button type="button" onClick={() => onChange({ ...travelers, [type.id]: value + 1 })} disabled={full} aria-label={t.booking.more(label)}>
                  <AgenciaIcon name="plus" />
                </button>
              </span>
            </li>
          )
        })}
      </ul>
      {travelers.adults <= 1 && <p className="atrav__note">{t.booking.minAdult}</p>}
      {full && <p className="atrav__note">{t.booking.maxGroup(tour.groupSize)}</p>}
    </div>
  )
}
