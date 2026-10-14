import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import HotelIcon from './HotelIcon.jsx'
import HotelImage from './HotelImage.jsx'
import { useHotel } from '../hotelState.js'

/**
 * Imagen en grande con flechas. Teclado: ← → para cambiar, Escape para cerrar.
 * El foco queda dentro mientras está abierta. Usar dentro de <AnimatePresence>.
 */
export default function Lightbox({ images, index, onChange, onClose }) {
  const { t, lang } = useHotel()
  const ref = useRef(null)
  const touchX = useRef(null)
  const image = images[index]
  const go = (step) => onChange((index + step + images.length) % images.length)

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

  // Deslizar con el dedo para cambiar de imagen
  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e) => {
    if (touchX.current === null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
    touchX.current = null
  }

  return (
    <motion.div
      ref={ref}
      className="hlight"
      role="dialog"
      aria-modal="true"
      aria-label={image.alt[lang]}
      onKeyDown={onKeyDown}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <button type="button" className="hlight__close" onClick={onClose} aria-label={t.gallery.close} data-autofocus>
        <HotelIcon name="close" />
      </button>

      <figure className="hlight__figure" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div className="hlight__frame">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={index}
              className="hlight__slide"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <HotelImage image={image} lang={lang} className="hlight__img" eager />
            </motion.div>
          </AnimatePresence>
        </div>
        <figcaption className="hlight__caption">
          <span>{image.alt[lang]}</span>
          <span className="hlight__counter" aria-live="polite">
            {t.gallery.counter(index + 1, images.length)}
          </span>
        </figcaption>
      </figure>

      <button type="button" className="hlight__nav hlight__nav--prev" onClick={() => go(-1)} aria-label={t.gallery.prev}>
        <HotelIcon name="prev" />
      </button>
      <button type="button" className="hlight__nav hlight__nav--next" onClick={() => go(1)} aria-label={t.gallery.next}>
        <HotelIcon name="next" />
      </button>
    </motion.div>
  )
}
