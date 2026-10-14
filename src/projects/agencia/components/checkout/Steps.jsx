import { motion } from 'framer-motion'
import AgenciaIcon from '../AgenciaIcon.jsx'
import { useAgencia } from '../../agenciaState.js'

// Barra de progreso de la reserva en 3 pasos
export default function Steps({ step }) {
  const { t } = useAgencia()
  const labels = t.checkout.steps
  return (
    <div className="asteps">
      <p className="a-visually-hidden" aria-live="polite">
        {t.checkout.stepOf(step, labels.length)}: {labels[step - 1]}
      </p>
      <div className="asteps__bar" aria-hidden="true">
        <motion.span className="asteps__fill" initial={false} animate={{ scaleX: (step - 1) / (labels.length - 1) }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} />
      </div>
      <ol className="asteps__list">
        {labels.map((label, i) => {
          const n = i + 1
          const state = n < step ? 'done' : n === step ? 'current' : 'next'
          return (
            <li key={label} className={`asteps__item is-${state}`} aria-current={state === 'current' ? 'step' : undefined}>
              <span className="asteps__dot">{state === 'done' ? <AgenciaIcon name="check" /> : n}</span>
              <span className="asteps__label">{label}</span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
