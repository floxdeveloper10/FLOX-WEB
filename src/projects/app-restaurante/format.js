// Formatos de hora para Qhapaq Pedidos
const two = (n) => String(n).padStart(2, '0')

// "19:42"
export function clock(ts) {
  const d = new Date(ts)
  return `${two(d.getHours())}:${two(d.getMinutes())}`
}

// Tiempo transcurrido "07:35" (minutos:segundos); desde 60 min, "60+ min"
export function elapsed(ms) {
  const s = Math.max(0, Math.floor(ms / 1000))
  if (s >= 3600) return '60+ min'
  return `${two(Math.floor(s / 60))}:${two(s % 60)}`
}

// "Hoy, 19:42" o "12 oct., 19:42"
export function when(ts) {
  const d = new Date(ts)
  const today = new Date()
  const sameDay = d.toDateString() === today.toDateString()
  const day = sameDay ? 'Hoy' : new Intl.DateTimeFormat('es-PE', { day: 'numeric', month: 'short' }).format(d)
  return `${day}, ${clock(ts)}`
}
