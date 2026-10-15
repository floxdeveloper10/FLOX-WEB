// Formatos de Stock Andino
const SHORT_DAYS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

export function soles(n) {
  return `S/ ${n.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export function weekday(date) {
  return SHORT_DAYS[date.getDay()]
}

// "15 oct., 09:15"
export function dateTime(ts) {
  return new Intl.DateTimeFormat('es-PE', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date(ts))
}

// "2026-10-20" → "20 oct. 2026"
export function shortDate(iso) {
  if (!iso) return '—'
  const [y, m, d] = iso.split('-').map(Number)
  return new Intl.DateTimeFormat('es-PE', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(y, m - 1, d))
}

// "Vence hoy", "Vence en 3 días", "Venció hace 2 días"
export function expiryText(left) {
  if (left === null) return 'No vence'
  if (left === 0) return 'Vence hoy'
  if (left < 0) return `Venció hace ${-left} ${left === -1 ? 'día' : 'días'}`
  return `Vence en ${left} ${left === 1 ? 'día' : 'días'}`
}
