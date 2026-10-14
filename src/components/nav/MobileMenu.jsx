import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import LogoFlox from '../brand/LogoFlox.jsx'
import StepBand from '../brand/StepBand.jsx'
import WhatsAppIcon from '../WhatsAppIcon.jsx'
import MenuButton from './MenuButton.jsx'
import { headerUi, nav, site } from '../../data/site.js'
import { projectHref, projects } from '../../data/proyectos.js'
import './MobileMenu.css'

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
}
const itemVariants = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
}

/**
 * Panel a pantalla completa del celular. Mientras está abierto:
 * el foco no sale del panel, la página de fondo no hace scroll y Escape lo cierra.
 * Usar dentro de <AnimatePresence>.
 */
export default function MobileMenu({ id, activeId, onClose }) {
  const panelRef = useRef(null)

  useEffect(() => {
    const root = document.documentElement
    const previousOverflow = root.style.overflow
    root.style.overflow = 'hidden'
    panelRef.current?.querySelector('.mobile-menu__link')?.focus({ preventScroll: true })
    return () => {
      root.style.overflow = previousOverflow
    }
  }, [])

  const onKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
      return
    }
    if (event.key !== 'Tab') return
    // Mantener el foco dentro del panel
    const focusables = [...panelRef.current.querySelectorAll('a[href], button:not([disabled])')]
    const first = focusables[0]
    const last = focusables.at(-1)
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return (
    <motion.div
      ref={panelRef}
      id={id}
      className="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label={headerUi.mainNav}
      onKeyDown={onKeyDown}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      transition={{ duration: 0.25 }}
    >
      <div className="mobile-menu__top container">
        <Link to="/" className="mobile-menu__brand" onClick={onClose} aria-label={headerUi.home}>
          <LogoFlox layout="horizontal" variant="white" title={site.name} className="mobile-menu__logo" />
        </Link>
        <MenuButton open label={headerUi.closeMenu} controls={id} onClick={onClose} className="menu-button--light" />
      </div>

      <nav className="mobile-menu__nav container" aria-label={headerUi.mainNav}>
        <motion.ul className="mobile-menu__list" variants={listVariants} initial="hidden" animate="show">
          {nav.map((item) => (
            <motion.li key={item.id} variants={itemVariants}>
              <Link
                to={item.to}
                className={`mobile-menu__link ${activeId === item.id ? 'is-active' : ''}`}
                aria-current={activeId === item.id ? (item.section ? 'location' : 'page') : undefined}
                onClick={onClose}
              >
                {item.label}
              </Link>
              {item.dropdown && (
                <ul className="mobile-menu__sublist">
                  {projects.map((p) => (
                    <li key={p.slug}>
                      <Link to={projectHref(p)} className="mobile-menu__sublink" onClick={onClose}>
                        <span className="mobile-menu__dot" style={{ background: p.colors.accent }} aria-hidden="true" />
                        {p.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </motion.li>
          ))}
        </motion.ul>
      </nav>

      <motion.div
        className="mobile-menu__bottom container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.35 }}
      >
        <a className="mobile-menu__whatsapp" href={site.whatsapp.link} target="_blank" rel="noopener noreferrer" onClick={onClose}>
          <WhatsAppIcon />
          {headerUi.mobileCta}
        </a>
      </motion.div>
      <StepBand className="mobile-menu__band" />
    </motion.div>
  )
}
