import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import AgenciaIcon from './AgenciaIcon.jsx'

/**
 * Aviso flotante ("Tour añadido · Ver carrito", "Enlace copiado").
 * Se anuncia a lectores de pantalla y se oculta solo a los 5 segundos.
 * toast: { id, message, action?: { label, onClick } }
 */
export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return undefined
    const timer = setTimeout(onClose, 5000)
    return () => clearTimeout(timer)
  }, [toast, onClose])

  return (
    <div className="atoast-region" role="status" aria-live="polite">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            className="atoast"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
          >
            <span className="atoast__icon" aria-hidden="true">
              <AgenciaIcon name="check" />
            </span>
            <span className="atoast__text">{toast.message}</span>
            {toast.action && (
              <button
                type="button"
                className="atoast__action"
                onClick={(e) => {
                  toast.action.onClick(e)
                  onClose()
                }}
              >
                {toast.action.label}
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
