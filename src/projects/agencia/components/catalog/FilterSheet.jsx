import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import AgenciaIcon from '../AgenciaIcon.jsx'
import Filters from './Filters.jsx'
import { useAgencia } from '../../agenciaState.js'

/**
 * Panel "Filtros" del celular: sube desde abajo con los filtros, "Limpiar" y "Ver N tours".
 * Foco atrapado, Escape para cerrar y la página de fondo quieta. Usar dentro de <AnimatePresence>.
 */
export default function FilterSheet({ filters, update, count, onClear, onClose }) {
  const { t } = useAgencia()
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
      const items = [...ref.current.querySelectorAll('button, input')]
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
      <motion.div className="asheet__backdrop" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
      <motion.div
        ref={ref}
        className="asheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="asheet-title"
        onKeyDown={onKeyDown}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 340, damping: 36 }}
      >
        <header className="asheet__head">
          <h2 id="asheet-title" className="asheet__title">
            {t.catalog.filters}
          </h2>
          <button type="button" className="asheet__close" onClick={onClose} aria-label={t.catalog.close} data-autofocus>
            <AgenciaIcon name="close" />
          </button>
        </header>
        <div className="asheet__body">
          <Filters filters={filters} update={update} idPrefix="sheet" />
        </div>
        <footer className="asheet__foot">
          <button type="button" className="a-btn a-btn--outline" onClick={onClear}>
            {t.catalog.clear}
          </button>
          <button type="button" className="a-btn a-btn--primary" onClick={onClose}>
            {t.catalog.show(count)}
          </button>
        </footer>
      </motion.div>
    </>
  )
}
