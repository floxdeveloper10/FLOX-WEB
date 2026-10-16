import { useEffect, useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * Enlace del menú con desplegable (Soluciones, Proyectos).
 * - items: [{ key, to, name, desc, visual }] (visual: ícono o muestra de color)
 * - all: { to, label } enlace final ("Ver todos"), opcional
 * Se abre con clic, Enter, flecha abajo o pasando el mouse; se cierra con Escape,
 * al hacer clic afuera, al salir con Tab o al elegir una opción.
 */
export default function NavDropdown({ label, active, items: entries, all, className = '' }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const buttonRef = useRef(null)
  const hoverTimer = useRef(null)
  const lastPointer = useRef(null)
  const listId = useId()

  const items = () => [...(rootRef.current?.querySelectorAll('.dropdown__link') ?? [])]

  useEffect(() => {
    if (!open) return undefined
    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  useEffect(() => () => clearTimeout(hoverTimer.current), [])

  const openAndFocus = (index) => {
    setOpen(true)
    requestAnimationFrame(() => {
      const list = items()
      list.at(index)?.focus()
    })
  }

  const onButtonKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      openAndFocus(0)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      openAndFocus(-1)
    }
  }

  const onMenuKeyDown = (event) => {
    const list = items()
    const index = list.indexOf(document.activeElement)
    if (event.key === 'Escape') {
      event.preventDefault()
      setOpen(false)
      buttonRef.current?.focus()
    } else if (event.key === 'ArrowDown' && index >= 0) {
      event.preventDefault()
      list[(index + 1) % list.length].focus()
    } else if (event.key === 'ArrowUp' && index >= 0) {
      event.preventDefault()
      list[(index - 1 + list.length) % list.length].focus()
    }
  }

  // Al salir con Tab fuera del menú, se cierra
  const onBlur = (event) => {
    if (!rootRef.current?.contains(event.relatedTarget)) setOpen(false)
  }

  // Con mouse se abre al pasar por encima (con un pequeño margen para no cerrarse al moverlo)
  const onPointerEnter = (event) => {
    if (event.pointerType !== 'mouse') return
    clearTimeout(hoverTimer.current)
    setOpen(true)
  }
  const onPointerLeave = (event) => {
    if (event.pointerType !== 'mouse') return
    hoverTimer.current = setTimeout(() => setOpen(false), 180)
  }

  return (
    <div
      ref={rootRef}
      className={`dropdown ${className}`.trim()}
      onKeyDown={onMenuKeyDown}
      onBlur={onBlur}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      <button
        ref={buttonRef}
        type="button"
        className={`header__link dropdown__toggle ${active ? 'is-active' : ''}`}
        aria-expanded={open}
        aria-controls={listId}
        aria-current={active ? 'page' : undefined}
        onPointerDown={(event) => {
          lastPointer.current = event.pointerType
        }}
        onClick={() => {
          // Con mouse ya se abrió al pasar por encima: el clic no debe cerrarlo.
          // Con teclado o pantalla táctil, el clic abre y cierra.
          if (lastPointer.current === 'mouse') setOpen(true)
          else setOpen((o) => !o)
          lastPointer.current = null
        }}
        onKeyDown={onButtonKeyDown}
      >
        {label}
        <svg className="dropdown__chevron" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={listId}
            className="dropdown__panel"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
          >
            <ul className="dropdown__list">
              {entries.map((entry) => (
                <li key={entry.key}>
                  <Link className="dropdown__link" to={entry.to} onClick={() => setOpen(false)}>
                    {entry.visual}
                    <span className="dropdown__text">
                      <span className="dropdown__name">{entry.name}</span>
                      <span className="dropdown__type">{entry.desc}</span>
                    </span>
                  </Link>
                </li>
              ))}
              {all && (
                <li>
                  <Link className="dropdown__link dropdown__link--all" to={all.to} onClick={() => setOpen(false)}>
                    {all.label}
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                      <path d="M5 12h14m-5-5 5 5-5 5" />
                    </svg>
                  </Link>
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
