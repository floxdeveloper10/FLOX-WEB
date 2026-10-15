import { useId } from 'react'
import { motion } from 'framer-motion'
import GymIcon from './GymIcon.jsx'
import { TABS, tabId } from '../tabs.js'

/**
 * Barra inferior de 5 pestañas (como en una app nativa).
 * Teclado: flechas izquierda/derecha, Inicio y Fin cambian de pestaña.
 */
export default function TabBar({ prefix, panelId, active, onChange }) {
  const labelId = useId()

  const onKeyDown = (event) => {
    const index = TABS.findIndex((t) => t.id === active)
    let next = null
    if (event.key === 'ArrowRight') next = (index + 1) % TABS.length
    else if (event.key === 'ArrowLeft') next = (index - 1 + TABS.length) % TABS.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = TABS.length - 1
    if (next === null) return
    event.preventDefault()
    onChange(TABS[next].id)
    document.getElementById(tabId(prefix, TABS[next].id))?.focus()
  }

  return (
    <nav className="gtabs" aria-labelledby={labelId}>
      <span id={labelId} className="g-hidden">
        Secciones de Puma Fit
      </span>
      <div className="gtabs__list" role="tablist" aria-labelledby={labelId} onKeyDown={onKeyDown}>
        {TABS.map((tab) => {
          const selected = tab.id === active
          return (
            <button
              key={tab.id}
              id={tabId(prefix, tab.id)}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={panelId}
              aria-label={tab.label}
              tabIndex={selected ? 0 : -1}
              className={`gtabs__tab ${selected ? 'is-active' : ''}`}
              onClick={() => onChange(tab.id)}
            >
              {selected && <motion.span layoutId={`${prefix}-pill`} className="gtabs__pill" transition={{ type: 'spring', stiffness: 500, damping: 36 }} />}
              <GymIcon name={tab.icon} className="gtabs__icon" />
              <span className="gtabs__label" aria-hidden="true">
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
