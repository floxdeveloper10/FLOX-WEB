import { useEffect, useId, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import LogoFlox from './brand/LogoFlox.jsx'
import MenuButton from './nav/MenuButton.jsx'
import MobileMenu from './nav/MobileMenu.jsx'
import NavDropdown from './nav/NavDropdown.jsx'
import { dropdownItems } from './nav/dropdownItems.jsx'
import { headerUi, nav, site } from '../data/site.js'
import { pageKeyFromPath } from '../layout/paths.js'
import './Header.css'

const SECTION_IDS = nav.filter((item) => item.section).map((item) => item.id)

// En el inicio: la sección del menú que cruza la franja central de la pantalla.
// Espera a que las secciones existan (aparecen después de la transición de página).
function useActiveSection(enabled) {
  const [active, setActive] = useState(null)

  useEffect(() => {
    if (!enabled) return undefined
    const visible = new Set()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }
        setActive(SECTION_IDS.filter((id) => visible.has(id)).at(-1) ?? null)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    let frame
    const started = performance.now()
    const attach = () => {
      const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean)
      if (elements.length === SECTION_IDS.length) elements.forEach((el) => observer.observe(el))
      else if (performance.now() - started < 3000) frame = requestAnimationFrame(attach)
    }
    attach()
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      setActive(null)
    }
  }, [enabled])

  return enabled ? active : null
}

export default function Header() {
  const { pathname } = useLocation()
  const page = pageKeyFromPath(pathname)
  const onHome = page === 'inicio'
  const activeSection = useActiveSection(onHome)
  const [solid, setSolid] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef(null)
  const menuId = useId()

  // Sobre las portadas moradas el encabezado es transparente con logo blanco;
  // al bajar se vuelve crema con el logo a color.
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Qué resaltar: la página, o en el inicio la sección visible
  let activeId = null
  if (onHome) activeId = activeSection ?? 'inicio'
  else if (pathname.startsWith('/proyectos')) activeId = 'proyectos'
  else if (pathname.startsWith('/nosotros')) activeId = 'nosotros'
  else if (pathname.startsWith('/apps')) activeId = 'apps'
  else if (pathname.startsWith('/soluciones')) activeId = 'soluciones'

  const closeMenu = () => {
    setMenuOpen(false)
    requestAnimationFrame(() => menuButtonRef.current?.focus({ preventScroll: true }))
  }

  return (
    <>
      <header className={`header ${solid ? 'header--solid' : ''}`}>
        <div className="container header__inner">
          <Link to="/" className="header__brand" aria-label={headerUi.home}>
            <LogoFlox layout="horizontal" variant={solid ? 'color' : 'white'} title={site.name} className="header__logo" />
          </Link>

          <nav className="header__nav" aria-label={headerUi.mainNav}>
            <ul>
              {nav.filter((item) => !item.mobileOnly).map((item) => (
                <li key={item.id}>
                  {item.dropdown ? (
                    <NavDropdown
                      label={item.label}
                      active={activeId === item.id}
                      className={`dropdown--${item.dropdown}`}
                      {...dropdownItems(item.dropdown)}
                    />
                  ) : (
                    <Link
                      to={item.to}
                      className={`header__link ${activeId === item.id ? 'is-active' : ''}`}
                      aria-current={activeId === item.id ? (item.section ? 'location' : 'page') : undefined}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <Link
            to="/cotizar"
            className={`btn btn--ghost btn--sm header__quote ${pathname.startsWith('/cotizar') ? 'is-active' : ''}`}
            aria-current={pathname.startsWith('/cotizar') ? 'page' : undefined}
          >
            {headerUi.quote}
          </Link>
          <a className="btn btn--primary btn--sm header__cta" data-origen="encabezado" href={site.whatsapp.link} target="_blank" rel="noopener noreferrer">
            {headerUi.cta}
          </a>

          <MenuButton
            ref={menuButtonRef}
            open={menuOpen}
            label={headerUi.openMenu}
            controls={menuId}
            onClick={() => setMenuOpen(true)}
            className="header__menu-button"
          />
        </div>
      </header>

      <AnimatePresence>{menuOpen && <MobileMenu id={menuId} activeId={activeId} onClose={closeMenu} />}</AnimatePresence>
    </>
  )
}
