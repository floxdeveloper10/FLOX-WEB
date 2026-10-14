import { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import AgenciaIcon from './AgenciaIcon.jsx'
import TourImage from './TourImage.jsx'
import { useAgencia } from '../agenciaState.js'
import { cartTotal, extrasSummary, findTour, formatDate, itemTotal, to, travelersSummary } from '../utils.js'

// Ilustración del carrito vacío: una mochila esperando su próximo viaje
function EmptyArt() {
  return (
    <svg viewBox="0 0 160 140" className="acart__empty-art" aria-hidden="true" focusable="false">
      <circle cx="80" cy="74" r="62" fill="#EADCC7" />
      <path d="M48 58 a32 32 0 0 1 64 0 V118 a8 8 0 0 1 -8 8 H56 a8 8 0 0 1 -8 -8 Z" fill="#C2502E" />
      <path d="M62 40 a18 18 0 0 1 36 0" fill="none" stroke="#9E3D20" strokeWidth="6" />
      <rect x="60" y="78" width="40" height="28" rx="6" fill="#9E3D20" />
      <rect x="60" y="78" width="40" height="8" fill="#F2B33D" />
      <path d="M36 120 h88" stroke="#2F5D50" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

function Panel({ onClose }) {
  const { t, lang, price, cart, removeFromCart } = useAgencia()
  const navigate = useNavigate()
  const ref = useRef(null)

  useEffect(() => {
    const root = document.documentElement
    const previous = root.style.overflow
    root.style.overflow = 'hidden'
    ref.current?.querySelector('[data-autofocus]')?.focus({ preventScroll: true })
    return () => {
      root.style.overflow = previous
    }
  }, [])

  const onKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
    } else if (event.key === 'Tab') {
      const items = [...ref.current.querySelectorAll('a[href], button')]
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

  // Al quitar, el foco pasa a la reserva siguiente (o al botón de cerrar)
  const remove = (key, index) => {
    removeFromCart(key)
    requestAnimationFrame(() => {
      const buttons = [...ref.current.querySelectorAll('.acart__remove')].filter((b) => b.dataset.key !== key)
      ;(buttons[index] ?? buttons[index - 1] ?? ref.current.querySelector('.acart__close'))?.focus()
    })
  }

  const go = (path) => {
    onClose()
    navigate(path)
  }

  return (
    <>
      <motion.div className="afav__backdrop" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
      <motion.aside
        ref={ref}
        className="afav acart"
        role="dialog"
        aria-modal="true"
        aria-labelledby="acart-title"
        onKeyDown={onKeyDown}
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 320, damping: 36 }}
      >
        <header className="afav__head">
          <h2 id="acart-title" className="afav__title">
            <AgenciaIcon name="cart" />
            {t.cart.title}
            <span className="afav__count">{cart.length}</span>
          </h2>
          <button type="button" className="afav__close acart__close" onClick={onClose} aria-label={t.cart.close} data-autofocus>
            <AgenciaIcon name="close" />
          </button>
        </header>

        {cart.length === 0 ? (
          <div className="acart__empty">
            <EmptyArt />
            <p className="acart__empty-title">{t.cart.empty}</p>
            <p>{t.cart.emptyText}</p>
            <Link to={to('/tours')} className="a-btn a-btn--primary" onClick={onClose}>
              {t.cart.explore}
            </Link>
          </div>
        ) : (
          <>
            <ul className="acart__list">
              <AnimatePresence initial={false}>
                {cart.map((item, index) => {
                  const tour = findTour(item.tourId)
                  const name = tour.name[lang]
                  return (
                    <motion.li key={item.key} layout exit={{ opacity: 0, x: 40 }} className="acart__item">
                      <div className="acart__thumb">
                        <TourImage tour={tour} lang={lang} className="afav__img" />
                      </div>
                      <div className="acart__info">
                        <p className="acart__name">{name}</p>
                        <p className="acart__line">
                          <AgenciaIcon name="calendar" />
                          {formatDate(item.date, t.locale, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                        <p className="acart__line">
                          <AgenciaIcon name="users" />
                          {travelersSummary(item.travelers, t)}
                        </p>
                        {item.extras.length > 0 && (
                          <p className="acart__line">
                            <AgenciaIcon name="plus" />
                            {extrasSummary(item.extras, lang)}
                          </p>
                        )}
                        <div className="acart__row">
                          <span>
                            {t.cart.subtotal}: <strong>{price(itemTotal(item))}</strong>
                          </span>
                          <span className="acart__actions">
                            <button type="button" className="acart__link" onClick={() => go(`${to(`/tours/${tour.id}`)}?editar=${item.key}`)} aria-label={t.cart.editLabel(name)}>
                              {t.cart.edit}
                            </button>
                            <button type="button" className="acart__link acart__remove" data-key={item.key} onClick={() => remove(item.key, index)} aria-label={t.cart.removeLabel(name)}>
                              {t.cart.remove}
                            </button>
                          </span>
                        </div>
                      </div>
                    </motion.li>
                  )
                })}
              </AnimatePresence>
            </ul>
            <footer className="afav__foot acart__foot">
              <p className="acart__total">
                <span>{t.cart.total}</span>
                <strong>{price(cartTotal(cart))}</strong>
              </p>
              <button type="button" className="a-btn a-btn--primary acart__checkout" onClick={() => go(to('/reserva'))}>
                {t.cart.checkout}
                <AgenciaIcon name="arrow" />
              </button>
            </footer>
          </>
        )}
      </motion.aside>
    </>
  )
}

// Panel lateral del carrito
export default function CartPanel({ open, onClose }) {
  return <AnimatePresence>{open && <Panel onClose={onClose} />}</AnimatePresence>
}
