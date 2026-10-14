import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import AgenciaIcon from './AgenciaIcon.jsx'
import { useAgencia } from '../agenciaState.js'

/**
 * Imagen en grande. Flechas (o ← →) para cambiar, deslizar con el dedo en el celular
 * y Escape para cerrar. El foco queda dentro mientras está abierta.
 * renderImage(index) devuelve la imagen a mostrar. Usar dentro de <AnimatePresence>.
 */
export default function Lightbox({ count, index, onChange, onClose, renderImage, caption }) {
  const { t } = useAgencia()
  const ref = useRef(null)
  const touchX = useRef(null)
  const go = (step) => onChange((index + step + count) % count)

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
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      go(1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      go(-1)
    } else if (event.key === 'Tab') {
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
  }

  return (
    <motion.div
      ref={ref}
      className="alight"
      role="dialog"
      aria-modal="true"
      aria-label={caption}
      onKeyDown={onKeyDown}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button type="button" className="alight__btn alight__close" onClick={onClose} aria-label={t.gallery.close} data-autofocus>
        <AgenciaIcon name="close" />
      </button>
      <figure
        className="alight__figure"
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX
        }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return
          const dx = e.changedTouches[0].clientX - touchX.current
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
          touchX.current = null
        }}
      >
        <div className="alight__frame">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={index} className="alight__slide" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
              {renderImage(index)}
            </motion.div>
          </AnimatePresence>
        </div>
        <figcaption className="alight__caption">
          <span>{caption}</span>
          <span aria-live="polite">{t.gallery.counter(index + 1, count)}</span>
        </figcaption>
      </figure>
      <button type="button" className="alight__btn alight__nav alight__nav--prev" onClick={() => go(-1)} aria-label={t.gallery.prev}>
        <AgenciaIcon name="prev" />
      </button>
      <button type="button" className="alight__btn alight__nav alight__nav--next" onClick={() => go(1)} aria-label={t.gallery.next}>
        <AgenciaIcon name="next" />
      </button>
    </motion.div>
  )
}
