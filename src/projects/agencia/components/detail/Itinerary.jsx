import { useId, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll } from 'framer-motion'
import AgenciaIcon from '../AgenciaIcon.jsx'
import { useAgencia } from '../../agenciaState.js'

// Itinerario: línea de tiempo vertical que se dibuja al hacer scroll; cada parada se despliega
export default function Itinerary({ tour }) {
  const { t, lang, reduceMotion } = useAgencia()
  const listRef = useRef(null)
  const uid = useId()
  const [open, setOpen] = useState(() => new Set([0]))
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 60%'] })

  const toggle = (i) =>
    setOpen((current) => {
      const next = new Set(current)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })

  return (
    <div className="aitin">
      <span className="aitin__track" aria-hidden="true">
        <motion.span className="aitin__fill" style={{ scaleY: reduceMotion ? 1 : scrollYProgress }} />
      </span>
      <ol ref={listRef} className="aitin__list">
        {tour.itinerary.map((stop, i) => {
          const isOpen = open.has(i)
          const marker = stop.day ? t.tour.day(stop.day) : stop.time
          return (
            <li key={i} className={`aitin__stop ${isOpen ? 'is-open' : ''}`}>
              <span className="aitin__dot" aria-hidden="true" />
              <h3 className="aitin__heading">
                <button
                  id={`${uid}-b${i}`}
                  type="button"
                  className="aitin__button"
                  aria-expanded={isOpen}
                  aria-controls={`${uid}-p${i}`}
                  onClick={() => toggle(i)}
                >
                  <span className="aitin__marker">{marker}</span>
                  <span className="aitin__title">{stop.title[lang]}</span>
                  <AgenciaIcon name="chevron" className="aitin__chevron" />
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`${uid}-p${i}`}
                    role="region"
                    aria-labelledby={`${uid}-b${i}`}
                    className="aitin__panel"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p>{stop.text[lang]}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
