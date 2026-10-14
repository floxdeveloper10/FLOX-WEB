import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import AgenciaIcon from './AgenciaIcon.jsx'

/**
 * Acordeón accesible: cada encabezado es un botón con aria-expanded que abre su panel.
 * items: [{ id, title, content, aside? }] · defaultOpen: ids abiertos al inicio
 */
export default function Accordion({ items, defaultOpen = [], className = '', headingLevel = 'h3', renderMarker }) {
  const [open, setOpen] = useState(() => new Set(defaultOpen))
  const uid = useId()
  const Heading = headingLevel

  const toggle = (id) =>
    setOpen((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  return (
    <ul className={`aacc ${className}`.trim()}>
      {items.map((item, i) => {
        const isOpen = open.has(item.id)
        const panelId = `${uid}-panel-${i}`
        const buttonId = `${uid}-button-${i}`
        return (
          <li key={item.id} className={`aacc__item ${isOpen ? 'is-open' : ''}`}>
            {renderMarker?.(item, i)}
            <Heading className="aacc__heading">
              <button id={buttonId} type="button" className="aacc__button" aria-expanded={isOpen} aria-controls={panelId} onClick={() => toggle(item.id)}>
                {item.aside && <span className="aacc__aside">{item.aside}</span>}
                <span className="aacc__title">{item.title}</span>
                <AgenciaIcon name="chevron" className="aacc__chevron" />
              </button>
            </Heading>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="aacc__panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="aacc__content">{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        )
      })}
    </ul>
  )
}
