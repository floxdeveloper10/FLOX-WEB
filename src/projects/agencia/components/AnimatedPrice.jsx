import { useEffect, useRef, useState } from 'react'
import { animate } from 'framer-motion'
import { useAgencia } from '../agenciaState.js'

// Precio que cuenta hasta el nuevo valor al cambiar (sin animación si se pidió reducir movimiento)
export default function AnimatedPrice({ usd, className = '' }) {
  const { price, currency, reduceMotion } = useAgencia()
  const [shown, setShown] = useState(usd)
  const [bump, setBump] = useState(0)
  const from = useRef(usd)

  useEffect(() => {
    if (reduceMotion || from.current === usd) {
      from.current = usd
      setShown(usd)
      return undefined
    }
    setBump((b) => b + 1)
    const controls = animate(from.current, usd, {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setShown(Math.round(v * 100) / 100),
    })
    from.current = usd
    return () => controls.stop()
  }, [usd, reduceMotion])

  return (
    <span key={`${bump}-${currency}`} className={`aprice ${bump ? 'aprice--bump' : ''} ${className}`.trim()}>
      {price(shown)}
    </span>
  )
}
