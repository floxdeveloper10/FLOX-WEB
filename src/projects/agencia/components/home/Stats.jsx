import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { useAgencia } from '../../agenciaState.js'
import { stats } from '../../agencia.data.js'

// Número que cuenta hacia arriba cuando aparece en pantalla (una vez)
function Counter({ value, decimals = 0, suffix = '', locale, start }) {
  const { reduceMotion } = useAgencia()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!start || reduceMotion) return undefined
    let frame
    const began = performance.now()
    const duration = 1600
    const tick = (now) => {
      const p = Math.min(1, (now - began) / duration)
      const eased = 1 - (1 - p) ** 3
      setCurrent(value * eased)
      if (p < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [start, value, reduceMotion])

  const shown = reduceMotion ? value : current
  const formatted = new Intl.NumberFormat(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(
    decimals ? shown : Math.round(shown),
  )
  return (
    <span className="astats__value">
      {formatted}
      {suffix && <span className="astats__suffix">{suffix}</span>}
    </span>
  )
}

export default function Stats() {
  const { t, lang } = useAgencia()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })

  return (
    <section className="astats" aria-labelledby="astats-title">
      <div className="a-container">
        <div className="astats__head">
          <h2 id="astats-title" className="a-visually-hidden">
            {t.stats.title}
          </h2>
          <span className="a-sample">{t.stats.note}</span>
        </div>
        <ul ref={ref} className="astats__list">
          {stats.map((s) => (
            <li key={s.label.es} className="astats__item">
              <Counter value={s.value} decimals={s.decimals} suffix={s.suffix} locale={t.locale} start={inView} />
              <span className="astats__label">{s.label[lang]}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
