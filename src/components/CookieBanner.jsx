import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { setConsent, useConsent } from '../lib/consent.js'
import './CookieBanner.css'

// Mientras el aviso está visible, su alto queda en --cookie-h: el botón del asistente y su panel
// suben esa medida para no quedar tapados. Se mide antes de pintar: así el botón no "salta".
function useBannerHeight(ref, open) {
  useLayoutEffect(() => {
    const root = document.documentElement
    const el = ref.current
    if (!open || !el) return undefined
    const update = () => root.style.setProperty('--cookie-h', `${Math.ceil(el.getBoundingClientRect().height) + 12}px`)
    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => {
      observer.disconnect()
      root.style.removeProperty('--cookie-h')
    }
  }, [ref, open])
}

// Aviso de cookies discreto, abajo. La elección se recuerda; se cambia desde "Cookies" en el pie.
export default function CookieBanner() {
  const { bannerOpen, choice } = useConsent()
  const ref = useRef(null)
  useBannerHeight(ref, bannerOpen)

  return (
    <AnimatePresence>
      {bannerOpen && (
        <motion.section
          ref={ref}
          className="cookies"
          aria-label="Aviso de cookies"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="cookies__text">
            Usamos cookies para medir las visitas y mejorar la web.{' '}
            <Link to="/privacidad" className="cookies__more">
              Más información
            </Link>
            {choice && (
              <span className="cookies__current">
                {' '}
                Ahora: {choice === 'all' ? 'aceptadas' : 'solo necesarias'}.
              </span>
            )}
          </p>
          <div className="cookies__actions">
            <button type="button" className="cookies__btn cookies__btn--ghost" onClick={() => setConsent('necessary')}>
              Solo necesarias
            </button>
            <button type="button" className="cookies__btn cookies__btn--primary" onClick={() => setConsent('all')}>
              Aceptar
            </button>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}
