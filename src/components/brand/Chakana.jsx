import { motion, useReducedMotion } from 'framer-motion'
import { getPalette } from './palette.js'
import './Chakana.css'

export const CHAKANA_OUTLINE =
  'M24 0 H40 V8 H48 V16 H56 V24 H64 V40 H56 V48 H48 V56 H40 V64 H24 V56 H16 V48 H8 V40 H0 V24 H8 V16 H16 V8 H24 Z'

// Pistas del chip hacia cada punta (el mismo trazo del brief, separado en 4)
const TRACES = ['M32 24 V8', 'M32 40 V56', 'M24 32 H8', 'M40 32 H56']
const CONTACTS = [
  [32, 8],
  [32, 56],
  [8, 32],
  [56, 32],
]

// Chakana estática. También se usa dentro de LogoFlox.
export function ChakanaShapes({ variant = 'color' }) {
  const c = getPalette(variant)
  return (
    <>
      <path fill="none" stroke={c.outline} strokeWidth="5" d={CHAKANA_OUTLINE} />
      <path fill="none" stroke={c.trace} strokeWidth="3.5" d={TRACES.join(' ')} />
      {CONTACTS.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" fill={c.contact} />
      ))}
      <rect x="24" y="24" width="16" height="16" rx="2" fill={c.chip} />
    </>
  )
}

// Secuencia "placa que se enciende": contorno → chip → pistas → contactos que laten.
const T = { outline: 1.3, chip: 1.15, traces: 1.45, contacts: 2.0 }
const FILL_BOX = { transformBox: 'fill-box', transformOrigin: 'center' }

function AnimatedShapes({ variant }) {
  const c = getPalette(variant)

  return (
    <>
      <motion.path
        fill="none"
        stroke={c.outline}
        strokeWidth="5"
        d={CHAKANA_OUTLINE}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          pathLength: { duration: T.outline, ease: [0.65, 0, 0.35, 1] },
          opacity: { duration: 0.15 },
        }}
      />

      {/* Pistas apagadas: se ven tenues antes de que pase la corriente */}
      <path
        fill="none"
        stroke={c.trace}
        strokeWidth="3.5"
        d={TRACES.join(' ')}
        className="chakana__trace-base"
      />
      {TRACES.map((d) => (
        <motion.path
          key={d}
          fill="none"
          stroke={c.trace}
          strokeWidth="3.5"
          d={d}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            pathLength: { delay: T.traces, duration: 0.55, ease: 'easeOut' },
            opacity: { delay: T.traces, duration: 0.05 },
          }}
        />
      ))}

      {CONTACTS.map(([cx, cy]) => (
        <motion.g
          key={`${cx}-${cy}`}
          style={FILL_BOX}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: T.contacts, type: 'spring', stiffness: 420, damping: 14 }}
        >
          <circle cx={cx} cy={cy} r="4" fill={c.contact} className="chakana__contact" />
        </motion.g>
      ))}

      <motion.rect
        x="24"
        y="24"
        width="16"
        height="16"
        rx="2"
        fill={c.chip}
        style={FILL_BOX}
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: T.chip, type: 'spring', stiffness: 300, damping: 16 }}
      />
    </>
  )
}

/**
 * Chakana tecnológica.
 * - variant: 'color' | 'white' | 'black'
 * - animated: se enciende como una placa electrónica (portada)
 * - title: si se pasa, se anuncia como imagen; si no, es decorativa
 */
export default function Chakana({ variant = 'color', animated = false, title, className = '', ...rest }) {
  const reduceMotion = useReducedMotion()
  const playing = animated && !reduceMotion
  const a11y = title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true, focusable: 'false' }

  return (
    <svg
      viewBox="-6 -6 76 76"
      xmlns="http://www.w3.org/2000/svg"
      className={`chakana ${playing ? 'chakana--animated' : ''} ${className}`.trim()}
      {...a11y}
      {...rest}
    >
      {playing ? <AnimatedShapes variant={variant} /> : <ChakanaShapes variant={variant} />}
    </svg>
  )
}
