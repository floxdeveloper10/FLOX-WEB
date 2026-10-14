// Formas de la marca FLOX (SVG del brief). JavaScript puro: lo usan los componentes
// React y también scripts/generate-og.mjs para la imagen al compartir.

// ─── Chakana tecnológica (viewBox -6 -6 76 76) ──────────────
export const CHAKANA_VIEWBOX = '-6 -6 76 76'
export const CHAKANA_OUTLINE =
  'M24 0 H40 V8 H48 V16 H56 V24 H64 V40 H56 V48 H48 V56 H40 V64 H24 V56 H16 V48 H8 V40 H0 V24 H8 V16 H16 V8 H24 Z'
// Pistas del chip hacia cada punta (el mismo trazo del brief, separado en 4)
export const CHAKANA_TRACES = ['M32 24 V8', 'M32 40 V56', 'M24 32 H8', 'M40 32 H56']
export const CHAKANA_CONTACTS = [
  [32, 8],
  [32, 56],
  [8, 32],
  [56, 32],
]

// ─── Letras FLOX (cada una de 64 de alto) ───────────────────
export const F_PATH = 'M0 0 H48 V8 H40 V16 H16 V24 H36 V32 H32 V40 H16 V64 H0 Z'
export const L_PATH = 'M0 0 H16 V48 H40 V56 H48 V64 H0 Z'
export const O_PATH =
  'M24 0 H40 V8 H48 V16 H56 V24 H64 V40 H56 V48 H48 V56 H40 V64 H24 V56 H16 V48 H8 V40 H0 V24 H8 V16 H16 V8 H24 Z M32 21 A11 11 0 1 0 32 43 A11 11 0 1 0 32 21 Z'
export const X_SQUARES = [
  [0, 0], [8, 8], [16, 16], [24, 24], [32, 32], [40, 40], [48, 48],
  [48, 0], [40, 8], [32, 16], [16, 32], [8, 40], [0, 48],
]

// Separación entre letras en unidades de letra (64 = alto de una letra),
// medida sobre docs/logo-referencia.png.
export const LETTER_GAP = 12
export const LETTERS_WIDTH = 48 + 48 + 64 + 64 + LETTER_GAP * 3 // 260
// Posición x de cada letra: F, L, O, X
export const LETTER_X = [0, 48 + LETTER_GAP, 96 + LETTER_GAP * 2, 160 + LETTER_GAP * 3]

/*
 * Proporciones tomadas de la referencia (en unidades de la chakana, contorno = 64):
 * - vertical: letras a escala 0.33 (cada una ≈ 1/4 del ancho de la chakana),
 *   centradas debajo con 15 unidades de aire.
 * - horizontal: chakana a la izquierda y letras a escala 0.42, centradas en alto.
 */
export const LOGO_LAYOUTS = {
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

// ─── Franja andina ──────────────────────────────────────────
export const STEP_COLORS = ['#E8185D', '#FF6B1A', '#FFC21A', '#00B8A9']
export const STEP = 8
export const STEPS = 4
export const PYRAMID_W = STEP * 2 * STEPS // 64
export const STEP_PERIOD = PYRAMID_W * STEP_COLORS.length // 256: un ciclo completo de colores
export const STEP_HEIGHT = STEP * STEPS // 32

// Pirámide escalonada de 4 escalones de 8 px apoyada en la base.
export function pyramidPath(x0) {
  let d = `M${x0} ${STEP_HEIGHT}`
  for (let i = 1; i <= STEPS; i++) d += ` V${STEP_HEIGHT - STEP * i} H${x0 + STEP * i}`
  d += ` H${x0 + PYRAMID_W - STEP * STEPS}`
  for (let i = STEPS - 1; i >= 0; i--) d += ` V${STEP_HEIGHT - STEP * i} H${x0 + PYRAMID_W - STEP * i}`
  return `${d} Z`
}
