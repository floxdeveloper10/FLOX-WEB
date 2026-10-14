import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import AgenciaIcon from '../components/AgenciaIcon.jsx'
import AgenciaLogo from '../components/AgenciaLogo.jsx'
import { session } from '../../shared/safeStorage.js'
import { useAgencia, useAgenciaTitle } from '../agenciaState.js'
import { extrasSummary, findTour, formatDate, formatPrice, itemTotal, to, travelersSummary } from '../utils.js'
import { LAST_ORDER_KEY } from './Reserva.jsx'

// Check animado: el círculo y la marca se dibujan
function SuccessCheck() {
  return (
    <svg viewBox="0 0 96 96" className="asuccess__check" aria-hidden="true" focusable="false">
      <motion.circle cx="48" cy="48" r="42" fill="none" stroke="#2F5D50" strokeWidth="6" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }} />
      <motion.path d="M30 50 L43 63 L67 36" fill="none" stroke="#2F5D50" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.5 }} />
    </svg>
  )
}

// Comprobante con el diseño de la agencia (se imprime solo esto, ver styles/print.css)
function Receipt({ order }) {
  const { t, lang } = useAgencia()
  const s = t.success
  // Los importes se muestran en la moneda elegida al confirmar
  const money = (usd) => formatPrice(usd, order.currency, t.locale)
  const total = order.items.reduce((sum, item) => sum + itemTotal(item), 0)
  const issued = new Intl.DateTimeFormat(t.locale, { dateStyle: 'long', timeStyle: 'short' }).format(new Date(order.issued))

  return (
    <article className="areceipt" aria-labelledby="areceipt-title">
      <header className="areceipt__head">
        <AgenciaLogo />
        <div className="areceipt__doc">
          <h2 id="areceipt-title" className="areceipt__title">
            {s.receipt}
          </h2>
          <p className="areceipt__code">{order.code}</p>
          <p className="areceipt__issued">
            {s.issued} {issued}
          </p>
        </div>
      </header>

      <dl className="areceipt__client">
        <div>
          <dt>{s.client}</dt>
          <dd>
            {order.form.name}
            <br />
            {order.form.email} · {order.form.whatsapp}
            <br />
            {order.form.country}
            {order.form.hotel && ` · ${order.form.hotel}`}
          </dd>
        </div>
        <div>
          <dt>{s.status}</dt>
          <dd>
            <span className="areceipt__status">{s.pending}</span>
          </dd>
        </div>
      </dl>

      <table className="areceipt__table">
        <thead>
          <tr>
            <th scope="col">{s.tour}</th>
            <th scope="col">{s.date}</th>
            <th scope="col">{s.travelers}</th>
            <th scope="col" className="is-num">
              {s.amount}
            </th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item) => {
            const tour = findTour(item.tourId)
            return (
              <tr key={item.key}>
                <td>
                  <strong>{tour.name[lang]}</strong>
                  {item.extras.length > 0 && <span className="areceipt__extras">+ {extrasSummary(item.extras, lang)}</span>}
                </td>
                <td>{formatDate(item.date, t.locale, { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                <td>{travelersSummary(item.travelers, t)}</td>
                <td className="is-num">{money(itemTotal(item))}</td>
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row" colSpan={3}>
              {s.total}
            </th>
            <td className="is-num">
              <strong>{money(total)}</strong>
            </td>
          </tr>
        </tfoot>
      </table>

      <footer className="areceipt__foot">
        <p>{s.note}</p>
      </footer>
    </article>
  )
}

export default function ReservaConfirmada() {
  const { t } = useAgencia()
  useAgenciaTitle(t.pageTitle2.success)
  const [order] = useState(() => session.get(LAST_ORDER_KEY, null))
  const s = t.success

  if (!order?.code) {
    return (
      <section className="a-section asuccess" aria-labelledby="asuccess-title">
        <div className="a-container asuccess__inner">
          <h1 id="asuccess-title" className="a-title">
            {s.none}
          </h1>
          <Link to={to('/tours')} className="a-btn a-btn--primary">
            {t.cart.explore}
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="a-section asuccess" aria-labelledby="asuccess-title">
      <div className="a-container asuccess__inner">
        <SuccessCheck />
        <h1 id="asuccess-title" className="a-title">
          {s.title}
        </h1>
        <p className="a-lead">{s.text}</p>
        <p className="asuccess__code">
          {s.code}: <strong>{order.code}</strong>
        </p>
        <div className="asuccess__actions">
          <button type="button" className="a-btn a-btn--primary" onClick={() => window.print()}>
            <AgenciaIcon name="printer" />
            {s.print}
          </button>
          <Link to={to()} className="a-btn a-btn--outline">
            {s.home}
          </Link>
        </div>
        <Receipt order={order} />
      </div>
    </section>
  )
}
