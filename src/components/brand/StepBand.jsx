import { useId } from 'react'
import './StepBand.css'

const COLORS = ['#E8185D', '#FF6B1A', '#FFC21A', '#00B8A9']
const STEP = 8
const STEPS = 4
const PYRAMID_W = STEP * 2 * STEPS // 64
const PERIOD = PYRAMID_W * COLORS.length // 256: un ciclo completo de colores
const HEIGHT = STEP * STEPS // 32

// Pirámide escalonada de 4 escalones de 8 px apoyada en la base.
function pyramidPath(x0) {
  let d = `M${x0} ${HEIGHT}`
  for (let i = 1; i <= STEPS; i++) d += ` V${HEIGHT - STEP * i} H${x0 + STEP * i}`
  d += ` H${x0 + PYRAMID_W - STEP * STEPS}`
  for (let i = STEPS - 1; i >= 0; i--) d += ` V${HEIGHT - STEP * i} H${x0 + PYRAMID_W - STEP * i}`
  return `${d} Z`
}

/**
 * Franja andina: pirámides escalonadas fucsia → naranja → amarillo → turquesa.
 * - animated: se desplaza lentamente (pie de página)
 */
export default function StepBand({ animated = false, className = '' }) {
  const patternId = `stepband-${useId().replace(/:/g, '')}`

  return (
    <div
      className={`stepband ${animated ? 'stepband--animated' : ''} ${className}`.trim()}
      style={{ '--stepband-period': `${PERIOD}px`, '--stepband-h': `${HEIGHT}px` }}
      aria-hidden="true"
    >
      <svg className="stepband__track" height={HEIGHT} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={patternId} width={PERIOD} height={HEIGHT} patternUnits="userSpaceOnUse">
            {COLORS.map((color, i) => (
              <path key={color} d={pyramidPath(i * PYRAMID_W)} fill={color} />
            ))}
          </pattern>
        </defs>
        <rect width="100%" height={HEIGHT} fill={`url(#${patternId})`} />
      </svg>
    </div>
  )
}
