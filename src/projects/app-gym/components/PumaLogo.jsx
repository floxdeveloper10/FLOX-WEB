import { motion } from 'framer-motion'

// Cabeza de puma geométrica (facetada). animated: se dibuja el contorno y luego se rellena.
const HEAD = 'M18 14 L36 29 L50 25 L64 29 L82 14 L80 44 L71 63 L58 81 L50 87 L42 81 L29 63 L20 44 Z'
const FACETS = 'M50 25 L43 40 L50 47 L57 40 Z M20 44 L37 55 L29 63 M80 44 L63 55 L71 63 M43 40 L37 55 L45 62 M57 40 L63 55 L55 62 M50 69 V75 M50 75 L43 79 M50 75 L57 79'
const EARS = 'M24 23 L33 32 L26 37 Z M76 23 L67 32 L74 37 Z'
const EYES = 'M32 45 L44 48.5 L37.5 53 Z M68 45 L56 48.5 L62.5 53 Z'
const NOSE = 'M44.5 62 H55.5 L50 69 Z'

export default function PumaLogo({ className = '', animated = false, title }) {
  const draw = animated
    ? { initial: { pathLength: 0, fillOpacity: 0 }, animate: { pathLength: 1, fillOpacity: 1 } }
    : {}
  const appear = (delay) =>
    animated ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay, duration: 0.4 } } : {}

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <motion.path
        d={HEAD}
        fill="var(--puma-fill, #B6F24A)"
        stroke="var(--puma-fill, #B6F24A)"
        strokeWidth="3"
        strokeLinejoin="round"
        {...draw}
        transition={{ pathLength: { duration: 1.1, ease: 'easeInOut' }, fillOpacity: { delay: 0.9, duration: 0.4 } }}
      />
      <motion.g {...appear(1.1)}>
        <path d={EARS} fill="var(--puma-ink, #0F0F10)" opacity="0.85" />
        <path d={FACETS} fill="none" stroke="var(--puma-ink, #0F0F10)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.55" />
        <path d={EYES} fill="var(--puma-ink, #0F0F10)" />
        <path d={NOSE} fill="var(--puma-ink, #0F0F10)" />
      </motion.g>
    </svg>
  )
}
