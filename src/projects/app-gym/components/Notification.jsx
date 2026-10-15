import { AnimatePresence, motion } from 'framer-motion'
import PumaLogo from './PumaLogo.jsx'
import GymIcon from './GymIcon.jsx'

/**
 * Notificación que baja desde arriba, como las del celular.
 * Se cierra sola, con la X o deslizándola hacia arriba. Al tocarla abre las clases.
 */
export default function Notification({ notice, onOpen, onClose }) {
  return (
    <div className="gnotice-region" role="status" aria-live="polite">
      <AnimatePresence>
        {notice && (
          <motion.div
            key="notice"
            className="gnotice"
            initial={{ y: -140, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -140, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0.6, bottom: 0.1 }}
            onDragEnd={(_, info) => {
              if (info.offset.y < -24) onClose()
            }}
          >
            <button type="button" className="gnotice__body" onClick={onOpen}>
              <span className="gnotice__app">
                <PumaLogo className="gnotice__logo" />
              </span>
              <span className="gnotice__text">
                <span className="gnotice__top">
                  <strong>Puma Fit</strong>
                  <span>ahora</span>
                </span>
                <span className="gnotice__title">{notice.title}</span>
                <span className="gnotice__msg">{notice.text}</span>
              </span>
            </button>
            <button type="button" className="gnotice__close" aria-label="Cerrar notificación" onClick={onClose}>
              <GymIcon name="x" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
