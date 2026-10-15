import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

// Confirmación dentro de la app (en lugar del confirm() del navegador).
// Usar dentro de <AnimatePresence>. Escape o tocar afuera cancela.
export default function ConfirmSheet({ title, text, confirmLabel, cancelLabel = 'Cancelar', onConfirm, onCancel, tone = 'danger' }) {
  const ref = useRef(null)

  useEffect(() => {
    ref.current?.querySelector('.qconfirm__cancel')?.focus({ preventScroll: true })
  }, [])

  const onKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.stopPropagation()
      onCancel()
      return
    }
    if (event.key !== 'Tab') return
    const items = [...ref.current.querySelectorAll('button')]
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

  return (
    <motion.div className="qsheet-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onCancel}>
      <motion.div
        ref={ref}
        className="qconfirm"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="qconfirm-title"
        aria-describedby="qconfirm-text"
        onKeyDown={onKeyDown}
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
      >
        <h3 id="qconfirm-title" className="qconfirm__title">
          {title}
        </h3>
        <p id="qconfirm-text" className="qconfirm__text">
          {text}
        </p>
        <div className="qconfirm__actions">
          <button type="button" className="qbtn qbtn--ghost qconfirm__cancel" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button type="button" className={`qbtn qbtn--${tone}`} onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
