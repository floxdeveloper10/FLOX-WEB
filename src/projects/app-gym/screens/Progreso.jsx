import { useState } from 'react'
import { motion } from 'framer-motion'
import GymIcon from '../components/GymIcon.jsx'
import { achievements, attendanceDays, routine, weightHistory } from '../gym.data.js'
import { useGym } from '../gymState.js'
import { kg, monthTitle } from '../utils.js'

// Gráfico de peso de las últimas 8 semanas (SVG propio)
function WeightChart() {
  const W = 300
  const H = 150
  const pad = { l: 30, r: 12, t: 14, b: 24 }
  const min = Math.floor(Math.min(...weightHistory)) - 0.5
  const max = Math.ceil(Math.max(...weightHistory)) + 0.5
  const x = (i) => pad.l + (i * (W - pad.l - pad.r)) / (weightHistory.length - 1)
  const y = (v) => pad.t + ((max - v) * (H - pad.t - pad.b)) / (max - min)
  const line = weightHistory.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ')
  const area = `${line} L${x(weightHistory.length - 1)} ${H - pad.b} L${x(0)} ${H - pad.b} Z`
  const ticks = [max - 0.5, (max + min) / 2, min + 0.5]
  const first = weightHistory[0]
  const last = weightHistory.at(-1)

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="gchart"
      role="img"
      aria-label={`Peso en las últimas 8 semanas: de ${kg(first)} a ${kg(last)}`}
    >
      <defs>
        <linearGradient id="gchart-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="var(--g-accent)" stopOpacity="0.35" />
          <stop offset="1" stopColor="var(--g-accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {ticks.map((t) => (
        <g key={t}>
          <line x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} stroke="var(--g-line)" strokeDasharray="3 4" />
          <text x={pad.l - 6} y={y(t) + 3.5} textAnchor="end" className="gchart__tick">
            {Math.round(t)}
          </text>
        </g>
      ))}
      {weightHistory.map((_, i) => (
        <text key={i} x={x(i)} y={H - 6} textAnchor="middle" className="gchart__tick">
          S{i + 1}
        </text>
      ))}
      <motion.path d={area} fill="url(#gchart-fill)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }} />
      <motion.path
        d={line}
        fill="none"
        stroke="var(--g-accent-line)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      />
      {weightHistory.map((v, i) => (
        <circle key={i} cx={x(i)} cy={y(v)} r={i === weightHistory.length - 1 ? 5 : 3} fill="var(--g-surface)" stroke="var(--g-accent-line)" strokeWidth="2.5" />
      ))}
    </svg>
  )
}

// Calendario del mes con un punto en cada día que fue a entrenar
function AttendanceCalendar() {
  const [today] = useState(() => new Date())
  const year = today.getFullYear()
  const month = today.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const offset = (new Date(year, month, 1).getDay() + 6) % 7 // semana empieza el lunes
  const attended = new Set(attendanceDays(today))
  const cells = [...Array(offset).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)]

  return (
    <section className="gcard gcal" aria-labelledby="gcal-title">
      <div className="gcal__head">
        <h3 id="gcal-title" className="gcard__title">
          {monthTitle(today)}
        </h3>
        <p className="gcal__count">
          <strong>{attended.size}</strong> asistencias
        </p>
      </div>
      <div className="gcal__grid" aria-hidden="true">
        {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, i) => (
          <span key={i} className="gcal__dow">
            {d}
          </span>
        ))}
        {cells.map((d, i) => (
          <span key={i} className={`gcal__day ${d === today.getDate() ? 'is-today' : ''} ${attended.has(d) ? 'is-on' : ''}`}>
            {d}
          </span>
        ))}
      </div>
      <p className="g-hidden">
        Este mes entrenaste {attended.size} días: {[...attended].join(', ')}.
      </p>
    </section>
  )
}

export default function Progreso() {
  const { done, booked } = useGym()
  const first = weightHistory[0]
  const last = weightHistory.at(-1)
  const diff = (first - last).toLocaleString('es-PE', { maximumFractionDigits: 1 })

  const unlocked = (a) => {
    if (a.dynamic === 'routine') return routine.exercises.every((e) => done.includes(e.id))
    if (a.dynamic === 'bookings') return booked.length >= 3
    return a.unlocked
  }
  const unlockedCount = achievements.filter(unlocked).length

  return (
    <div className="gscreen__inner">
      <header className="ghead">
        <div>
          <p className="ghead__date">Últimas 8 semanas</p>
          <h2 className="gscreen__title">Progreso</h2>
        </div>
      </header>

      <section className="gcard gweight" aria-labelledby="gweight-title">
        <div className="gweight__head">
          <div>
            <h3 id="gweight-title" className="glabel">
              Peso actual
            </h3>
            <p className="gweight__value">{kg(last)}</p>
          </div>
          <p className="gweight__diff">−{diff} kg</p>
        </div>
        <WeightChart />
      </section>

      <AttendanceCalendar />

      <section className="gcard" aria-labelledby="gbadges-title">
        <div className="gcal__head">
          <h3 id="gbadges-title" className="gcard__title">
            Logros
          </h3>
          <p className="gcal__count">
            <strong>{unlockedCount}</strong> de {achievements.length}
          </p>
        </div>
        <ul className="gbadges">
          {achievements.map((a) => {
            const on = unlocked(a)
            return (
              <li key={a.id} className={`gbadge ${on ? 'is-on' : ''}`}>
                <span className="gbadge__medal" aria-hidden="true">
                  <GymIcon name={on ? a.icon : 'lock'} />
                </span>
                <span className="gbadge__name">{a.name}</span>
                <span className="g-hidden">
                  {on ? 'Desbloqueado' : 'Bloqueado'}: {a.detail}
                </span>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}
