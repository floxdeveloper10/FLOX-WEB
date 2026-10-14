// QR decorativo (no escaneable): 25×25 módulos con los tres cuadros de posición,
// las líneas de sincronización y el cuadro de alineación, como un QR real.
const N = 25

function buildModules() {
  const grid = Array.from({ length: N }, () => Array(N).fill(false))
  const reserved = Array.from({ length: N }, () => Array(N).fill(false))
  const mark = (x, y, dark) => {
    if (x < 0 || y < 0 || x >= N || y >= N) return
    grid[y][x] = dark
    reserved[y][x] = true
  }

  // Cuadros de posición (7×7) con su borde blanco de separación
  for (const [ox, oy] of [[0, 0], [N - 7, 0], [0, N - 7]]) {
    for (let y = -1; y <= 7; y++) {
      for (let x = -1; x <= 7; x++) {
        const ring = x === 0 || x === 6 || y === 0 || y === 6
        const core = x >= 2 && x <= 4 && y >= 2 && y <= 4
        const inside = x >= 0 && x <= 6 && y >= 0 && y <= 6
        mark(ox + x, oy + y, inside && (ring || core))
      }
    }
  }

  // Líneas de sincronización
  for (let i = 8; i < N - 8; i++) {
    mark(i, 6, i % 2 === 0)
    mark(6, i, i % 2 === 0)
  }

  // Cuadro de alineación (5×5)
  const a = N - 9
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {
      mark(a + x, a + y, x === 0 || x === 4 || y === 0 || y === 4 || (x === 2 && y === 2))
    }
  }

  // Datos de relleno: pseudoaleatorios pero siempre iguales (semilla fija)
  let seed = 20260
  const random = () => {
    seed = (seed * 1103515245 + 12345) % 2147483648
    return seed / 2147483648
  }
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      if (!reserved[y][x]) grid[y][x] = random() > 0.52
    }
  }

  let d = ''
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      if (grid[y][x]) d += `M${x} ${y}h1v1h-1z`
    }
  }
  return d
}

const MODULES_PATH = buildModules()

export default function QrCode({ className = '' }) {
  return (
    <svg
      viewBox="-2 -2 29 29"
      className={className}
      aria-hidden="true"
      focusable="false"
      shapeRendering="crispEdges"
    >
      <rect x="-2" y="-2" width="29" height="29" rx="1.5" fill="#fff" />
      <path d={MODULES_PATH} fill="#2D1450" />
    </svg>
  )
}
