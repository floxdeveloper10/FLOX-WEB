import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import RubroIcon from './soluciones/RubroIcon.jsx'
import StepBand from './brand/StepBand.jsx'
import './Problems.css'
import { pickerUi as ui, rubrosMenu as rubros } from '../data/rubrosMenu.js'
import './RubroPicker.css'

// "¿Qué negocio tienes?": 6 botones grandes, justo debajo de la portada.
// Al tocar uno, el botón late un instante y se abre la página de ese rubro.
export default function RubroPicker() {
  const navigate = useNavigate()
  const reduceMotion = useReducedMotion()
  const [picked, setPicked] = useState(null)

  const pick = (event, slug) => {
    // Con Ctrl/Cmd o clic central se respeta "abrir en otra pestaña"
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button === 1) return
    event.preventDefault()
    if (reduceMotion) {
      navigate(`/soluciones/${slug}`)
      return
    }
    setPicked(slug)
    setTimeout(() => navigate(`/soluciones/${slug}`), 320)
  }

  return (
    <section className="picker" aria-labelledby="picker-titulo">
      {/* Franja andina como unión con la portada morada */}
      <div className="problems__band picker__band">
        <StepBand />
      </div>
      <div className="container">
        <h2 id="picker-titulo" className="picker__title">
          {ui.title}
        </h2>
        <p className="picker__lead">{ui.lead}</p>
        <ul className="picker__grid">
          {rubros.map((r, i) => (
            <motion.li
              key={r.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link to={`/soluciones/${r.slug}`} className={`picker__item ${picked === r.slug ? 'is-picked' : ''}`} onClick={(e) => pick(e, r.slug)}>
                <motion.span
                  className="picker__icon"
                  animate={picked === r.slug ? { scale: [1, 1.25, 1], rotate: [0, -8, 0] } : { scale: 1 }}
                  transition={{ duration: 0.32 }}
                >
                  <RubroIcon name={r.icon} />
                </motion.span>
                <span className="picker__name">{r.menuName}</span>
                <span className="picker__desc">{r.menuDesc}</span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
