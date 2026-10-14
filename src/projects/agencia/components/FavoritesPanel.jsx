import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import AgenciaIcon from './AgenciaIcon.jsx'
import TourImage from './TourImage.jsx'
import WhatsAppIcon from '../../../components/WhatsAppIcon.jsx'
import { useAgencia } from '../agenciaState.js'
import { durationLabel, findTour, to } from '../utils.js'
// En la demo, las consultas llegan al WhatsApp de FLOX (src/data/site.js).
// En la web de una agencia real, aquí iría el número de WhatsApp de la agencia.
import { whatsappLink } from '../../../data/site.js'

function Panel({ onClose }) {
  const { t, lang, price, favorites, toggleFavorite } = useAgencia()
  const ref = useRef(null)
  const list = favorites.map(findTour).filter(Boolean)

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

  // Al quitar un tour, el foco pasa al siguiente botón "Quitar" (o a "Cerrar" si no quedan)
  const remove = (tourId, index) => {
    toggleFavorite(tourId)
    requestAnimationFrame(() => {
      const buttons = [...ref.current.querySelectorAll('.afav__remove')].filter((b) => b.dataset.id !== tourId)
      ;(buttons[index] ?? buttons[index - 1] ?? ref.current.querySelector('.afav__close'))?.focus()
    })
  }

  const message = [t.favorites.message, '', ...list.map((tour) => `• ${tour.name[lang]} — ${t.card.from} ${price(tour.price)}`)].join('\n')

  return (
    <>
      <motion.div className="afav__backdrop" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
      <motion.aside
        ref={ref}
        className="afav"
        role="dialog"
        aria-modal="true"
        aria-labelledby="afav-title"
        onKeyDown={onKeyDown}
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 320, damping: 36 }}
      >
        <header className="afav__head">
          <h2 id="afav-title" className="afav__title">
            <AgenciaIcon name="heart" filled />
            {t.favorites.title}
            <span className="afav__count">{list.length}</span>
          </h2>
          <button type="button" className="afav__close" onClick={onClose} aria-label={t.favorites.close} data-autofocus>
            <AgenciaIcon name="close" />
          </button>
        </header>

        {list.length === 0 ? (
          <div className="afav__empty">
            <AgenciaIcon name="heart" />
            <p>{t.favorites.empty}</p>
          </div>
        ) : (
          <ul className="afav__list">
            <AnimatePresence initial={false}>
              {list.map((tour, index) => (
                <motion.li key={tour.id} layout exit={{ opacity: 0, x: 40 }} className="afav__item">
                  <div className="afav__thumb">
                    <TourImage tour={tour} lang={lang} className="afav__img" />
                  </div>
                  <div className="afav__info">
                    <Link to={to(`/tours/${tour.id}`)} className="afav__name" onClick={onClose}>
                      {tour.name[lang]}
                    </Link>
                    <span className="afav__meta">
                      {durationLabel(tour, t)} · {t.card.from} <strong>{price(tour.price)}</strong>
                    </span>
                  </div>
                  <button
                    type="button"
                    className="afav__remove"
                    data-id={tour.id}
                    onClick={() => remove(tour.id, index)}
                    aria-label={t.favorites.remove(tour.name[lang])}
                  >
                    <AgenciaIcon name="trash" />
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}

        {list.length > 0 && (
          <footer className="afav__foot">
            <a className="a-btn a-btn--whatsapp afav__consult" href={whatsappLink(message)} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              {t.favorites.consult}
            </a>
          </footer>
        )}
      </motion.aside>
    </>
  )
}

// Panel lateral con los tours guardados y "Consultar por WhatsApp"
export default function FavoritesPanel({ open, onClose }) {
  return <AnimatePresence>{open && <Panel onClose={onClose} />}</AnimatePresence>
}
