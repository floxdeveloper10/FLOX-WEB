import { useId } from 'react'
import { pyramidPath, PYRAMID_W, STEP_COLORS as COLORS, STEP_HEIGHT as HEIGHT, STEP_PERIOD as PERIOD } from './geometry.js'
import './StepBand.css'

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
