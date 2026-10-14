// Colores del logo por versión. Sobre morado se usa "white".
const mono = (hex) => ({
  outline: hex,
  trace: hex,
  contact: hex,
  chip: hex,
  f: hex,
  l: hex,
  o: hex,
  oDot: hex,
  x: hex,
})

export const LOGO_PALETTES = {
  color: {
    outline: '#00B8A9',
    trace: '#FF6B1A',
    contact: '#FFC21A',
    chip: '#E8185D',
    f: '#E8185D',
    l: '#FF6B1A',
    o: '#2D1450',
    oDot: '#FFC21A',
    x: '#00B8A9',
  },
  white: mono('#FFFFFF'),
  black: mono('#141414'),
}

export function getPalette(variant) {
  return LOGO_PALETTES[variant] ?? LOGO_PALETTES.color
}
