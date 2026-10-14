import { useId, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useAgencia } from '../../agenciaState.js'

const W = 640
const H = 240
const PAD = { left: 48, right: 24, top: 36, bottom: 32 }

// Perfil de altitud de la subida: línea que se dibuja al aparecer, con los puntos clave
export default function AltitudeProfile({ tour }) {
  const { t, lang } = useAgencia()
  const uid = useId().replace(/:/g, '')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const points = tour.profile
  const alts = points.map((p) => p.alt)
  const min = Math.floor((Math.min(...alts) - 200) / 500) * 500
  const max = Math.ceil((Math.max(...alts) + 100) / 500) * 500
  const x = (at) => PAD.left + (at / 100) * (W - PAD.left - PAD.right)
  const y = (alt) => PAD.top + (1 - (alt - min) / (max - min)) * (H - PAD.top - PAD.bottom)
  const fmt = new Intl.NumberFormat(t.locale)

  // Curva suave entre puntos
  const path = points.reduce((d, p, i) => {
    if (i === 0) return `M${x(p.at)} ${y(p.alt)}`
    const prev = points[i - 1]
    const mx = (x(prev.at) + x(p.at)) / 2
    return `${d} C${mx} ${y(prev.alt)} ${mx} ${y(p.alt)} ${x(p.at)} ${y(p.alt)}`
  }, '')
  const area = `${path} L${x(100)} ${H - PAD.bottom} L${x(0)} ${H - PAD.bottom} Z`
  const gridLines = []
  for (let alt = min; alt <= max; alt += 500) gridLines.push(alt)
  const highest = Math.max(...alts)

  return (
    <figure className="aprofile" ref={ref}>
      <figcaption className="aprofile__title">{t.tour.profileTitle}</figcaption>
      <svg viewBox={`0 0 ${W} ${H}`} className="aprofile__chart" role="img" aria-label={t.tour.profileLabel(tour.name[lang], fmt.format(highest))}>
        <defs>
          <linearGradient id={`relleno-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#C2502E" stopOpacity="0.35" />
            <stop offset="1" stopColor="#C2502E" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {gridLines.map((alt) => (
          <g key={alt}>
            <path d={`M${PAD.left} ${y(alt)} H${W - PAD.right}`} stroke="#1E1E1E" strokeOpacity="0.1" />
            <text x={PAD.left - 8} y={y(alt) + 4} textAnchor="end" fontSize="11" fill="#5A554E">
              {fmt.format(alt)}
            </text>
          </g>
        ))}
        <motion.path d={area} fill={`url(#relleno-${uid})`} initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }} transition={{ duration: 0.6, delay: 0.6 }} />
        <motion.path
          d={path}
          fill="none"
          stroke="#C2502E"
          strokeWidth="3.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: inView ? 1 : 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />
        {points.map((p, i) => (
          <motion.g key={p.at} initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }} transition={{ delay: 0.3 + i * 0.12 }}>
            <circle cx={x(p.at)} cy={y(p.alt)} r={p.alt === highest ? 7 : 5} fill={p.alt === highest ? '#F2B33D' : '#FFFFFF'} stroke="#C2502E" strokeWidth="2.5" />
            <text x={x(p.at)} y={y(p.alt) - 12} textAnchor={i === 0 ? 'start' : i === points.length - 1 ? 'end' : 'middle'} fontSize="12" fontWeight="700" fill="#1E1E1E">
              {fmt.format(p.alt)} m
            </text>
          </motion.g>
        ))}
      </svg>
      {/* Lista legible de los puntos (también sirve en pantallas chicas y para lectores de pantalla) */}
      <ol className="aprofile__list">
        {points.map((p) => (
          <li key={p.at} className={p.alt === highest ? 'is-top' : ''}>
            <span>{p.label[lang]}</span>
            <strong>{fmt.format(p.alt)} m</strong>
          </li>
        ))}
      </ol>
    </figure>
  )
}
