import { ChakanaShapes } from './Chakana.jsx'
import { getPalette } from './palette.js'
import { F_PATH, L_PATH, LETTER_X, LOGO_LAYOUTS, O_PATH, X_SQUARES } from './geometry.js'

// Letras FLOX con los SVG del brief, una al lado de la otra.
function FloxLetters({ variant }) {
  const c = getPalette(variant)
  const [xF, xL, xO, xX] = LETTER_X

  return (
    <>
      <path transform={`translate(${xF} 0)`} fill={c.f} d={F_PATH} />
      <path transform={`translate(${xL} 0)`} fill={c.l} d={L_PATH} />
      <g transform={`translate(${xO} 0)`}>
        <path fillRule="evenodd" fill={c.o} d={O_PATH} />
        <circle cx="32" cy="32" r="5" fill={c.oDot} />
      </g>
      <g transform={`translate(${xX} 0)`} fill={c.x}>
        {X_SQUARES.map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="16" height="16" />
        ))}
      </g>
    </>
  )
}

/**
 * Logo completo de FLOX.
 * - layout: 'vertical' (chakana arriba, letras abajo) | 'horizontal' (encabezado)
 * - variant: 'color' | 'white' | 'black'
 */
export default function LogoFlox({ layout = 'vertical', variant = 'color', title = 'FLOX', className = '', ...rest }) {
  const { viewBox, scale, x, y } = LOGO_LAYOUTS[layout] ?? LOGO_LAYOUTS.vertical

  return (
    <svg
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
      className={`logo-flox logo-flox--${layout} ${className}`.trim()}
      {...rest}
    >
      <ChakanaShapes variant={variant} />
      <g transform={`translate(${x} ${y}) scale(${scale})`}>
        <FloxLetters variant={variant} />
      </g>
    </svg>
  )
}
