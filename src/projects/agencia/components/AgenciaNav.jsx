import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import AgenciaIcon from './AgenciaIcon.jsx'
import AgenciaLogo from './AgenciaLogo.jsx'
import Toggle from './Toggle.jsx'
import { useAgencia } from '../agenciaState.js'
import { CURRENCY_OPTIONS, LANG_OPTIONS } from '../agencia.data.js'
import { to } from '../utils.js'

const LINKS = [
  { path: '', key: 'home', end: true },
  { path: '/tours', key: 'tours' },
  { path: '/nosotros', key: 'about' },
  { path: '/contacto', key: 'contact' },
]

// Carrito con contador que rebota suavemente al añadir algo
function CartButton() {
  const { t, cart, openCart } = useAgencia()
  return (
    <button type="button" className="anav__fav anav__cart" aria-label={t.cart.label(cart.length)} onClick={(e) => openCart(e.currentTarget)}>
      <AgenciaIcon name="cart" />
      <AnimatePresence>
        {cart.length > 0 && (
          <motion.span
            key={cart.length}
            className="anav__fav-count anav__cart-count"
            initial={{ scale: 0.3, y: -6 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0 }}
            transition={{ type: 'spring', stiffness: 520, damping: 12 }}
            aria-hidden="true"
          >
            {cart.length}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}

function FavoritesButton({ className = '' }) {
  const { t, favorites, openFavorites } = useAgencia()
  return (
    <button
      type="button"
      className={`anav__fav ${className}`.trim()}
      aria-label={t.nav.favoritesCount(favorites.length)}
      onClick={(e) => openFavorites(e.currentTarget)}
    >
      <AgenciaIcon name="heart" filled={favorites.length > 0} />
      <AnimatePresence>
        {favorites.length > 0 && (
          <motion.span
            key={favorites.length}
            className="anav__fav-count"
            initial={{ scale: 0.4 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 20 }}
            aria-hidden="true"
          >
            {favorites.length}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}

// Panel del celular: foco atrapado, Escape para cerrar y página quieta
function MobilePanel({ onClose }) {
  const { t, lang, setLang, currency, setCurrency } = useAgencia()
  const ref = useRef(null)

  useEffect(() => {
    const root = document.documentElement
    const previous = root.style.overflow
    root.style.overflow = 'hidden'
    ref.current?.querySelector('a')?.focus({ preventScroll: true })
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

  return (
    <motion.div
      ref={ref}
      className="anav-panel"
      role="dialog"
      aria-modal="true"
      aria-label={t.nav.main}
      onKeyDown={onKeyDown}
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.22 }}
    >
      <nav aria-label={t.nav.main}>
        <ul className="anav-panel__links">
          {LINKS.map((link, i) => (
            <motion.li key={link.key} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + i * 0.05 }}>
              <NavLink to={to(link.path)} end={link.end} className="anav-panel__link" onClick={onClose}>
                {t.nav[link.key]}
              </NavLink>
            </motion.li>
          ))}
        </ul>
      </nav>
      <div className="anav-panel__toggles">
        <Toggle label={t.nav.language} options={LANG_OPTIONS} value={lang} onChange={setLang} />
        <Toggle label={t.nav.currency} options={CURRENCY_OPTIONS} value={currency} onChange={setCurrency} />
      </div>
      <Link to={to('/tours')} className="a-btn a-btn--primary anav-panel__book" onClick={onClose}>
        {t.nav.book}
      </Link>
      <button type="button" className="anav-panel__close" onClick={onClose} aria-label={t.nav.closeMenu}>
        <AgenciaIcon name="close" />
      </button>
    </motion.div>
  )
}

export default function AgenciaNav() {
  const { t, lang, setLang, currency, setCurrency } = useAgencia()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const burgerRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => {
    setOpen(false)
    requestAnimationFrame(() => burgerRef.current?.focus({ preventScroll: true }))
  }

  return (
    <header className={`anav ${scrolled ? 'anav--scrolled' : ''}`}>
      <div className="a-container anav__inner">
        <Link to={to()} className="anav__brand" onClick={() => setOpen(false)}>
          <AgenciaLogo />
          <span className="a-visually-hidden">{t.nav.logoHome}</span>
        </Link>

        <nav className="anav__nav" aria-label={t.nav.main}>
          <ul>
            {LINKS.map((link) => (
              <li key={link.key}>
                <NavLink to={to(link.path)} end={link.end} className="anav__link">
                  {t.nav[link.key]}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="anav__toggles">
          <Toggle label={t.nav.language} options={LANG_OPTIONS} value={lang} onChange={setLang} />
          <Toggle label={t.nav.currency} options={CURRENCY_OPTIONS} value={currency} onChange={setCurrency} />
        </div>

        <FavoritesButton />
        <CartButton />

        <Link to={to('/tours')} className="a-btn a-btn--primary anav__book" onClick={() => setOpen(false)}>
          {t.nav.book}
        </Link>

        <button
          ref={burgerRef}
          type="button"
          className="anav__burger"
          aria-label={t.nav.openMenu}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <AgenciaIcon name={open ? 'close' : 'menu'} />
        </button>
      </div>

      <AnimatePresence>{open && <MobilePanel onClose={close} />}</AnimatePresence>
    </header>
  )
}
