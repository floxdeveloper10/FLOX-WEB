// Genera la imagen para compartir en redes (Open Graph / Twitter Card), 1200×630:
// logo FLOX blanco sobre morado, la frase de la portada y la franja andina abajo.
// Primero arma el SVG (scripts/og-image.svg) y luego lo exporta a public/og-image.png.
//
// Uso: npm run og
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { Resvg } from '@resvg/resvg-js'
import {
  CHAKANA_CONTACTS,
  CHAKANA_OUTLINE,
  CHAKANA_TRACES,
  F_PATH,
  L_PATH,
  LETTER_X,
  LOGO_LAYOUTS,
  O_PATH,
  PYRAMID_W,
  STEP_COLORS,
  STEP_HEIGHT,
  X_SQUARES,
  pyramidPath,
} from '../src/components/brand/geometry.js'

const W = 1200
const H = 630
const MORADO = '#2D1450'
const AMARILLO = '#FFC21A'
const BLANCO = '#FFFFFF'
const root = (p) => fileURLToPath(new URL(`../${p}`, import.meta.url))

// Logo vertical en blanco (misma geometría que LogoFlox.jsx)
function logoWhite({ x, y, width }) {
  const { viewBox, scale, x: lx, y: ly } = LOGO_LAYOUTS.vertical
  const [, , vw, vh] = viewBox.split(' ').map(Number)
  const height = (width * vh) / vw
  const [xF, xL, xO, xX] = LETTER_X
  return `
  <svg x="${x}" y="${y}" width="${width}" height="${height}" viewBox="${viewBox}">
    <path fill="none" stroke="${BLANCO}" stroke-width="5" d="${CHAKANA_OUTLINE}"/>
    <path fill="none" stroke="${BLANCO}" stroke-width="3.5" d="${CHAKANA_TRACES.join(' ')}"/>
    ${CHAKANA_CONTACTS.map(([cx, cy]) => `<circle cx="${cx}" cy="${cy}" r="4" fill="${BLANCO}"/>`).join('')}
    <rect x="24" y="24" width="16" height="16" rx="2" fill="${BLANCO}"/>
    <g transform="translate(${lx} ${ly}) scale(${scale})" fill="${BLANCO}">
      <path transform="translate(${xF} 0)" d="${F_PATH}"/>
      <path transform="translate(${xL} 0)" d="${L_PATH}"/>
      <g transform="translate(${xO} 0)">
        <path fill-rule="evenodd" d="${O_PATH}"/>
        <circle cx="32" cy="32" r="5"/>
      </g>
      <g transform="translate(${xX} 0)">
        ${X_SQUARES.map(([sx, sy]) => `<rect x="${sx}" y="${sy}" width="16" height="16"/>`).join('')}
      </g>
    </g>
  </svg>`
}

// Franja andina a lo ancho, apoyada en el borde inferior
function stepBand({ scale }) {
  const h = STEP_HEIGHT * scale
  const count = Math.ceil(W / (PYRAMID_W * scale)) + 1
  const pyramids = Array.from({ length: count }, (_, i) => {
    const color = STEP_COLORS[i % STEP_COLORS.length]
    return `<path d="${pyramidPath(i * PYRAMID_W)}" fill="${color}"/>`
  }).join('')
  return `<g transform="translate(0 ${H - h}) scale(${scale})">${pyramids}</g>`
}

// Cuadrícula sutil, como en la portada
function grid() {
  const lines = []
  for (let x = 40; x < W; x += 40) lines.push(`M${x} 0V${H}`)
  for (let y = 40; y < H; y += 40) lines.push(`M0 ${y}H${W}`)
  return `<path d="${lines.join('')}" stroke="${BLANCO}" stroke-opacity="0.045" stroke-width="1"/>`
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="brilloFucsia" cx="0.2" cy="0.45" r="0.45">
      <stop offset="0" stop-color="#E8185D" stop-opacity="0.35"/>
      <stop offset="1" stop-color="#E8185D" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="brilloTurquesa" cx="0.85" cy="0.2" r="0.5">
      <stop offset="0" stop-color="#00B8A9" stop-opacity="0.22"/>
      <stop offset="1" stop-color="#00B8A9" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="${MORADO}"/>
  ${grid()}
  <rect width="${W}" height="${H}" fill="url(#brilloFucsia)"/>
  <rect width="${W}" height="${H}" fill="url(#brilloTurquesa)"/>
  ${logoWhite({ x: 96, y: 96, width: 330 })}
  <g font-family="Space Grotesk" font-weight="700">
    <text x="500" y="200" fill="${AMARILLO}" font-size="24" letter-spacing="6">TECNOLOGÍA HECHA EN CUSCO</text>
    <text x="496" y="300" fill="${BLANCO}" font-size="92" letter-spacing="-3">Vende más y</text>
    <text x="496" y="398" fill="${AMARILLO}" font-size="92" letter-spacing="-3">pierde menos</text>
    <text x="500" y="462" fill="${BLANCO}" fill-opacity="0.85" font-size="30">Webs, apps y WhatsApp</text>
    <text x="500" y="502" fill="${BLANCO}" fill-opacity="0.85" font-size="30">para negocios en Cusco</text>
  </g>
  ${stepBand({ scale: 1.5 })}
</svg>
`

writeFileSync(root('scripts/og-image.svg'), svg)

const png = new Resvg(svg, {
  fitTo: { mode: 'width', value: W },
  font: {
    fontFiles: [root('scripts/fonts/SpaceGrotesk-Bold.ttf')],
    loadSystemFonts: false,
    defaultFontFamily: 'Space Grotesk',
  },
}).render().asPng()

writeFileSync(root('public/og-image.png'), png)
const size = readFileSync(root('public/og-image.png')).length
console.log(`public/og-image.png listo (${W}×${H}, ${Math.round(size / 1024)} KB)`)
