import { Link } from 'react-router-dom'
import AgenciaIcon from '../AgenciaIcon.jsx'
import TourImage from '../TourImage.jsx'
import { useAgencia } from '../../agenciaState.js'
import { cartTotal, extrasSummary, findTour, formatDate, itemTotal, to, travelersSummary } from '../../utils.js'

// Lista de reservas del carrito (paso 2 y paso 3)
export function OrderItems({ items, editable = false }) {
  const { t, lang, price } = useAgencia()
  return (
    <ul className="aorder">
      {items.map((item) => {
        const tour = findTour(item.tourId)
        return (
          <li key={item.key} className="aorder__item">
            <div className="aorder__thumb">
              <TourImage tour={tour} lang={lang} className="afav__img" />
            </div>
            <div className="aorder__info">
              <p className="aorder__name">{tour.name[lang]}</p>
              <p className="aorder__line">
                <AgenciaIcon name="calendar" />
                {formatDate(item.date, t.locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
              <p className="aorder__line">
                <AgenciaIcon name="users" />
                {travelersSummary(item.travelers, t)}
              </p>
              {item.extras.length > 0 && (
                <p className="aorder__line">
                  <AgenciaIcon name="plus" />
                  {extrasSummary(item.extras, lang)}
                </p>
              )}
            </div>
            <div className="aorder__side">
              <strong>{price(itemTotal(item))}</strong>
              {editable && (
                <Link to={`${to(`/tours/${tour.id}`)}?editar=${item.key}`} className="acart__link" aria-label={t.cart.editLabel(tour.name[lang])}>
                  {t.checkout.editTour}
                </Link>
              )}
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export function OrderTotal({ items, label }) {
  const { price } = useAgencia()
  return (
    <p className="aorder__total">
      <span>{label}</span>
      <strong>{price(cartTotal(items))}</strong>
    </p>
  )
}

// Paso 2 · Revisión: tours, datos del viajero y total, con "Editar" en cada parte
export default function OrderReview({ items, form, onEditData, onBack, onNext }) {
  const { t } = useAgencia()
  const c = t.checkout
  return (
    <div className="acheck__review">
      <section className="acheck__card" aria-labelledby="areview-tours">
        <div className="acheck__card-head">
          <h2 id="areview-tours" className="acheck__card-title">
            {c.tours}
          </h2>
        </div>
        <OrderItems items={items} editable />
        <OrderTotal items={items} label={t.cart.total} />
      </section>

      <section className="acheck__card" aria-labelledby="areview-data">
        <div className="acheck__card-head">
          <h2 id="areview-data" className="acheck__card-title">
            {c.yourData}
          </h2>
          <button type="button" className="acart__link" onClick={onEditData}>
            {c.editData}
          </button>
        </div>
        <dl className="acheck__data">
          <div>
            <dt>{c.name}</dt>
            <dd>{form.name}</dd>
          </div>
          <div>
            <dt>{c.email}</dt>
            <dd>{form.email}</dd>
          </div>
          <div>
            <dt>{c.country}</dt>
            <dd>{form.country}</dd>
          </div>
          <div>
            <dt>{c.whatsapp}</dt>
            <dd>{form.whatsapp}</dd>
          </div>
          {form.hotel.trim() && (
            <div>
              <dt>{c.hotel}</dt>
              <dd>{form.hotel}</dd>
            </div>
          )}
          {form.comments.trim() && (
            <div>
              <dt>{c.comments}</dt>
              <dd>{form.comments}</dd>
            </div>
          )}
        </dl>
      </section>

      <div className="acheck__nav">
        <button type="button" className="a-btn a-btn--outline" onClick={onBack}>
          <AgenciaIcon name="back" />
          {c.back}
        </button>
        <button type="button" className="a-btn a-btn--primary" onClick={onNext}>
          {c.next}
          <AgenciaIcon name="arrow" />
        </button>
      </div>
    </div>
  )
}
