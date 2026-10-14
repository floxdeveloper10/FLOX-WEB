import { ChakanaShapes } from './Chakana.jsx'
import { getPalette } from './palette.js'

const F_PATH = 'M0 0 H48 V8 H40 V16 H16 V24 H36 V32 H32 V40 H16 V64 H0 Z'
const L_PATH = 'M0 0 H16 V48 H40 V56 H48 V64 H0 Z'
const O_PATH =
  'M24 0 H40 V8 H48 V16 H56 V24 H64 V40 H56 V48 H48 V56 H40 V64 H24 V56 H16 V48 H8 V40 H0 V24 H8 V16 H16 V8 H24 Z M32 21 A11 11 0 1 0 32 43 A11 11 0 1 0 32 21 Z'
const X_SQUARES = [
  [0, 0], [8, 8], [16, 16], [24, 24], [32, 32], [40, 40], [48, 48],
  [48, 0], [40, 8], [32, 16], [16, 32], [8, 40], [0, 48],
]

// Separación entre letras en unidades de letra (64 = alto de una letra),
// medida sobre docs/logo-referencia.png.
const LETTER_GAP = 12
const LETTERS_WIDTH = 48 + 48 + 64 + 64 + LETTER_GAP * 3 // 260

// Letras FLOX con los SVG del brief, una al lado de la otra.
function FloxLetters({ variant }) {
  const c = getPalette(variant)
  const xF = 0
  const xL = xF + 48 + LETTER_GAP
  const xO = xL + 48 + LETTER_GAP
  const xX = xO + 64 + LETTER_GAP

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

/*
 * Proporciones tomadas de la referencia (en unidades de la chakana, contorno = 64):
 * - vertical: letras a escala 0.33 (cada una ≈ 1/4 del ancho de la chakana),
 *   centradas debajo con 15 unidades de aire.
 * - horizontal: chakana a la izquierda y letras a escala 0.42, centradas en alto.
 */
const LAYOUTS = {
  vertical: {
    viewBox: '-13 -5 90 110',
    scale: 0.33,
    x: 32 - (LETTERS_WIDTH * 0.33) / 2,
    y: 81.5,
  },
  horizontal: {
    viewBox: '-3 -3 196 70',
    scale: 0.42,
    x: 80,
    y: 32 - (64 * 0.42) / 2,
  },
}

/**
 * Logo completo de FLOX.
 * - layout: 'vertical' (chakana arriba, letras abajo) | 'horizontal' (encabezado)
 * - variant: 'color' | 'white' | 'black'
 */
export default function LogoFlox({ layout = 'vertical', variant = 'color', title = 'FLOX', className = '', ...rest }) {
  const { viewBox, scale, x, y } = LAYOUTS[layout] ?? LAYOUTS.vertical

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
