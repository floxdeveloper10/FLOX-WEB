import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import AgenciaIcon from '../AgenciaIcon.jsx'
import AnimatedPrice from '../AnimatedPrice.jsx'
import BookingForm from './BookingForm.jsx'
import { useAgencia } from '../../agenciaState.js'
import { useMediaQuery } from '../../useBooking.js'
import { bookingPrice } from '../../utils.js'

function Header({ tour }) {
  const { t, price } = useAgencia()
  return (
    <div className="abook__head">
      <p className="abook__from">
        {t.booking.from} <strong>{price(tour.price)}</strong> {tour.oldPrice && <del>{price(tour.oldPrice)}</del>}
      </p>
      <p className="abook__per">{t.booking.perPerson}</p>
    </div>
  )
}

// Celular: barra inferior fija que se expande en un panel con el formulario completo
function MobileBooking(props) {
  const { tour, booking } = props
  const { t } = useAgencia()
  const [open, setOpen] = useState(Boolean(props.editing))
  const sheetRef = useRef(null)
  const barButton = useRef(null)
  const total = bookingPrice(tour, booking.travelers, booking.extras).total

  useEffect(() => {
    if (!open) return undefined
    const root = document.documentElement
    const previous = root.style.overflow
    root.style.overflow = 'hidden'
    sheetRef.current?.querySelector('[data-autofocus]')?.focus({ preventScroll: true })
    return () => {
      root.style.overflow = previous
    }
  }, [open])

  const close = () => {
    setOpen(false)
    requestAnimationFrame(() => barButton.current?.focus({ preventScroll: true }))
  }

  const onKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      close()
    } else if (event.key === 'Tab') {
      const items = [...sheetRef.current.querySelectorAll('button:not([disabled]), input, [tabindex="0"]')]
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

  return (
    <>
      <div className="abook-bar">
        <div className="abook-bar__price">
          {booking.date ? (
            <>
              <span className="abook-bar__label">{t.booking.total}</span>
              <AnimatedPrice usd={total} className="abook-bar__amount" />
            </>
          ) : (
            <Header tour={tour} />
          )}
        </div>
        <button ref={barButton} type="button" className="a-btn a-btn--primary abook-bar__open" onClick={() => setOpen(true)} aria-haspopup="dialog" aria-expanded={open}>
          {t.booking.open}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div className="asheet__backdrop" onClick={close} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <motion.div
              ref={sheetRef}
              className="asheet abook-sheet"
              role="dialog"
              aria-modal="true"
              aria-labelledby="abook-sheet-title"
              onKeyDown={onKeyDown}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 340, damping: 36 }}
            >
              <header className="asheet__head">
                <h2 id="abook-sheet-title" className="asheet__title">
                  {t.booking.title}
                </h2>
                <button type="button" className="asheet__close" onClick={close} aria-label={t.booking.close} data-autofocus>
                  <AgenciaIcon name="close" />
                </button>
              </header>
              <div className="asheet__body">
                <Header tour={tour} />
                <BookingForm {...props} onDone={close} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

/**
 * Caja de reserva: en escritorio, columna fija al costado (sticky);
 * en el celular, barra inferior fija que se expande al tocarla.
 */
export default function BookingBox(props) {
  const { t } = useAgencia()
  const desktop = useMediaQuery('(min-width: 1000px)')

  if (!desktop) return <MobileBooking {...props} />
  return (
    <aside className="abook" aria-labelledby="abook-title">
      <h2 id="abook-title" className="abook__title">
        {t.booking.title}
      </h2>
      <Header tour={props.tour} />
      <BookingForm {...props} />
    </aside>
  )
}
