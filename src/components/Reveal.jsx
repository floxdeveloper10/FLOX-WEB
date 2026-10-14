import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

/**
 * Aparece con un movimiento suave cuando entra en pantalla (una sola vez).
 * - as: etiqueta HTML ('div', 'li', 'header'…)
 * - delay: para escalonar elementos hermanos (index * 0.1)
 * Con "reducir movimiento" se muestra directamente, sin animar.
 */
export default function Reveal({ as = 'div', delay = 0, y = 28, children, ...rest }) {
  const reduceMotion = useReducedMotion()
  const Tag = motion[as]

  if (reduceMotion) return <Tag {...rest}>{children}</Tag>

  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
