import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import SectionHeading from '../SectionHeading.jsx'
import Reveal from '../Reveal.jsx'
import AppsIcon from './AppsIcon.jsx'
import { appsPage } from '../../data/apps.js'

// Pistas de circuito entre los pasos (con quiebres, como en una placa electrónica)
const TRACK_H = 'M0 36 H38 L50 22 H86 L100 36 H138 L150 50 H186 L200 36 H238 L250 22 H286 L300 36'
// En el celular: un tramo vertical entre cada paso y el siguiente
const SEGMENTS = ['M36 0 V35 L22 50 V100', 'M22 0 V50 L36 65 V100', 'M36 0 V35 L50 50 V100']

function Track({ d, viewBox, className, progress }) {
  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio="none"
      className={`apps-process__track ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <path d={d} className="apps-process__track-base" vectorEffect="non-scaling-stroke" />
      <motion.path d={d} className="apps-process__track-fill" vectorEffect="non-scaling-stroke" style={{ pathLength: progress }} />
    </svg>
  )
}

// "Cómo creamos tu app": 4 pasos unidos por una línea de circuito que se dibuja al bajar
export default function AppProcess() {
  const { process } = appsPage
  const headingId = `${process.id}-titulo`
  const wrapRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start 85%', 'end 55%'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  // Con "reducir movimiento" la línea aparece completa
  const progress = reduceMotion ? 1 : smooth

  return (
    <section id={process.id} className="section section--morado apps-process" aria-labelledby={headingId}>
      <div className="container">
        <SectionHeading id={headingId} eyebrow={process.eyebrow} title={process.title} tone="dark" />
        <div className="apps-process__wrap" ref={wrapRef}>
          <Track d={TRACK_H} viewBox="0 0 300 72" className="apps-process__track--h" progress={progress} />
          <ol className="apps-process__list">
            {process.steps.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 0.12} className="apps-step">
                {i < SEGMENTS.length && (
                  <svg viewBox="0 0 72 100" preserveAspectRatio="none" className="apps-step__segment" aria-hidden="true" focusable="false">
                    <path d={SEGMENTS[i]} className="apps-process__track-base" vectorEffect="non-scaling-stroke" />
                    <motion.path
                      d={SEGMENTS[i]}
                      className="apps-process__track-fill"
                      vectorEffect="non-scaling-stroke"
                      initial={reduceMotion ? false : { pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 0.8, ease: 'easeInOut' }}
                    />
                  </svg>
                )}
                <span className="apps-step__node">
                  <AppsIcon name={step.icon} />
                </span>
                <div className="apps-step__body">
                  <p className="apps-step__num">Paso {i + 1}</p>
                  <h3 className="apps-step__title">{step.title}</h3>
                  <p className="apps-step__text">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
