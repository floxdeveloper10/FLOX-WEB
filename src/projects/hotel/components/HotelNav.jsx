import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import HotelLogo from './HotelLogo.jsx'
import HotelIcon from './HotelIcon.jsx'
import Toggle from './Toggle.jsx'
import { CURRENCY_OPTIONS, LANG_OPTIONS } from '../hotel.data.js'
import { useHotel } from '../hotelState.js'
import './HotelNav.css'

const LINKS = [
  { id: 'habitaciones', key: 'rooms' },
  { id: 'experiencias', key: 'experiences' },
  { id: 'galeria', key: 'gallery' },
  { id: 'ubicacion', key: 'location' },
]

// Panel del celular: foco atrapado, Escape para cerrar y la página de fondo quieta
function MobilePanel({ onClose, onGo }) {
  const { t, lang, setLang, currency, setCurrency } = useHotel()
  const ref = useRef(null)

  useEffect(() => {
    const root = document.documentElement
    const previous = root.style.overflow
    root.style.overflow = 'hidden'
    ref.current?.querySelector('button')?.focus({ preventScroll: true })
    return () => {
      root.style.overflow = previous
    }
  }, [])

  const onKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
    } else if (event.key === 'Tab') {
      const items = [...ref.current.querySelectorAll('button, a[href]')]
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
      className="hnav-panel"
      role="dialog"
      aria-modal="true"
      aria-label={t.nav.main}
      onKeyDown={onKeyDown}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="h-container hnav-panel__top">
        <HotelLogo />
        <button type="button" className="hnav__burger" aria-label={t.nav.closeMenu} onClick={onClose}>
          <HotelIcon name="close" />
        </button>
      </div>
      <motion.ul
        className="h-container hnav-panel__links"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } } }}
      >
        {LINKS.map((link) => (
          <motion.li
            key={link.id}
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
          >
            <button type="button" className="hnav-panel__link" onClick={() => onGo(link.id)}>
              {t.nav[link.key]}
            </button>
          </motion.li>
        ))}
      </motion.ul>
      <div className="h-container hnav-panel__bottom">
        <div className="hnav-panel__toggles">
          <Toggle label={t.nav.language} options={LANG_OPTIONS} value={lang} onChange={setLang} />
          <Toggle label={t.nav.currency} options={CURRENCY_OPTIONS} value={currency} onChange={setCurrency} />
        </div>
        <button type="button" className="h-btn h-btn--gold hnav-panel__book" onClick={() => onGo('habitaciones')}>
          {t.nav.book}
        </button>
      </div>
    </motion.div>
  )
}

export default function HotelNav() {
  const { t, lang, setLang, currency, setCurrency, scrollToSection } = useHotel()
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const burgerRef = useRef(null)

  // Transparente sobre la portada; sólido (azul noche) al bajar
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => {
    setOpen(false)
    requestAnimationFrame(() => burgerRef.current?.focus({ preventScroll: true }))
  }

  const go = (id) => {
    setOpen(false)
    // Esperar a que el panel libere el scroll de la página
    requestAnimationFrame(() => scrollToSection(id))
  }

  return (
    <>
      <header className={`hnav ${solid ? 'hnav--solid' : ''}`}>
        <div className="h-container hnav__inner">
          <button
            type="button"
            className="hnav__brand"
            aria-label={t.nav.home}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <HotelLogo />
          </button>

          <nav className="hnav__nav" aria-label={t.nav.main}>
            <ul>
              {LINKS.map((link) => (
                <li key={link.id}>
                  <button type="button" className="hnav__link" onClick={() => scrollToSection(link.id)}>
                    {t.nav[link.key]}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hnav__toggles">
            <Toggle label={t.nav.language} options={LANG_OPTIONS} value={lang} onChange={setLang} />
            <Toggle label={t.nav.currency} options={CURRENCY_OPTIONS} value={currency} onChange={setCurrency} />
          </div>

          <button type="button" className="h-btn h-btn--gold hnav__book" onClick={() => scrollToSection('habitaciones')}>
            {t.nav.book}
          </button>

          <button
            ref={burgerRef}
            type="button"
            className="hnav__burger"
            aria-label={t.nav.openMenu}
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M4 7h16M8 12h12M4 17h16" />
            </svg>
          </button>
        </div>
      </header>

      <AnimatePresence>{open && <MobilePanel onClose={close} onGo={go} />}</AnimatePresence>
    </>
  )
}
