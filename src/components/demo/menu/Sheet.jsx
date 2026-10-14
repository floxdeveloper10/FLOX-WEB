import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import MenuIcon from './MenuIcon.jsx'

// Panel que sube desde abajo dentro del celular (ficha del plato, pedido).
// Usar dentro de <AnimatePresence> para que también se anime al cerrar.
export default function Sheet({ labelledBy, closeLabel, onClose, className = '', children }) {
  const ref = useRef(null)

  // Al abrir, el foco va al botón de cerrar; al cerrar, vuelve a donde estaba.
  // preventScroll evita que la página salte hasta el celular.
  useEffect(() => {
    const previous = document.activeElement
    ref.current?.querySelector('[data-autofocus]')?.focus({ preventScroll: true })
    return () => previous?.focus?.({ preventScroll: true })
  }, [])

  const onKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.stopPropagation()
      onClose()
    }
  }

  return (
    <>
      <motion.div
        className="sheet__backdrop"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className={`sheet ${className}`.trim()}
        onKeyDown={onKeyDown}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 380, damping: 36 }}
      >
        <span className="sheet__handle" aria-hidden="true" />
        <button type="button" className="sheet__close" onClick={onClose} aria-label={closeLabel} data-autofocus>
          <MenuIcon name="close" />
        </button>
        <div className="sheet__content">{children}</div>
      </motion.div>
    </>
  )
}
