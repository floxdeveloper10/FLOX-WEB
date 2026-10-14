import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'
import { CHAKANA_OUTLINE } from './brand/geometry.js'
import { howWeWork } from '../data/site.js'
import './HowWeWork.css'

// Tramo de pista entre un paso y el siguiente. Se llena según el avance del scroll:
// el tramo i ocupa la parte [i/n, (i+1)/n] del recorrido total.
function Track({ progress, index, total }) {
  const fill = useTransform(progress, [index / total, (index + 1) / total], [0, 1])

  return (
    <span className="step__track" aria-hidden="true">
      <motion.span className="step__track-fill" style={{ '--fill': fill }} />
    </span>
  )
}

export default function HowWeWork() {
  const headingId = `${howWeWork.id}-titulo`
  const listRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 85%', 'end 95%'] })
  const segments = howWeWork.steps.length - 1

  return (
    <section id={howWeWork.id} className="section section--crema how" aria-labelledby={headingId}>
      <div className="container">
        <SectionHeading id={headingId} eyebrow={howWeWork.eyebrow} title={howWeWork.title} />

        <ol ref={listRef} className="steps">
          {howWeWork.steps.map((step, i) => (
            <li key={step.title} className="step">
              {i < segments && <Track progress={scrollYProgress} index={i} total={segments} />}

              <Reveal className="step__body" delay={i * 0.12}>
                <span className="step__badge">
                  <svg viewBox="-4 -4 72 72" aria-hidden="true" focusable="false">
                    <path d={CHAKANA_OUTLINE} />
                  </svg>
                  <span className="step__number">{i + 1}</span>
                </span>

                <div className="step__text">
                  <h3 className="step__title">{step.title}</h3>
                  <p className="step__desc">{step.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
