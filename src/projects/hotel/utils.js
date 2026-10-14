import { USD_TO_PEN } from './hotel.data.js'

// ─── Fechas (como texto 'AAAA-MM-DD', en la hora local del visitante) ───
const pad = (n) => String(n).padStart(2, '0')

export function toISODate(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

export function todayISO() {
  return toISODate(new Date())
}

export function addDays(iso, days) {
  const [y, m, d] = iso.split('-').map(Number)
  return toISODate(new Date(y, m - 1, d + days))
}

// Noches entre llegada y salida (0 si faltan datos o el orden no es válido)
export function nightsBetween(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0
  const [y1, m1, d1] = checkIn.split('-').map(Number)
  const [y2, m2, d2] = checkOut.split('-').map(Number)
  const diff = Math.round((Date.UTC(y2, m2 - 1, d2) - Date.UTC(y1, m1 - 1, d1)) / 86400000)
  return Math.max(0, diff)
}

function parseISO(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

// "vie 14 nov 2026" / "Fri, Nov 14, 2026"
export function formatDate(iso, locale) {
  if (!iso) return ''
  return new Intl.DateTimeFormat(locale, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }).format(parseISO(iso))
}

// "14 – 17 nov" / "Nov 14 – 17"
export function formatRange(checkIn, checkOut, locale) {
  if (!checkIn || !checkOut) return ''
  return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short' }).formatRange(parseISO(checkIn), parseISO(checkOut))
}

// Aplica un cambio a la búsqueda. Amable: si la llegada queda en o después de la salida,
// la salida se mueve al día siguiente de la llegada.
export function applySearchPatch(search, patch) {
  const next = { ...search, ...patch }
  if (patch.checkIn && next.checkOut <= next.checkIn) next.checkOut = addDays(next.checkIn, 1)
  return next
}

// Valida las fechas. Devuelve la clave del error o null.
export function validateDates(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 'missing'
  if (checkIn < todayISO()) return 'past'
  if (nightsBetween(checkIn, checkOut) < 1) return 'order'
  return null
}

// ─── Precios (los precios base están en USD) ───────────────
export function formatPrice(usd, currency, locale) {
  const amount = currency === 'PEN' ? usd * USD_TO_PEN : usd
  const number = new Intl.NumberFormat(locale, {
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount)
  return currency === 'PEN' ? `S/ ${number}` : `US$ ${number}`
}

// ─── Mensaje de WhatsApp con todos los datos de la reserva ───
export function bookingMessage({ t, room, lang, checkIn, checkOut, nights, guests, currency, name, country }) {
  const m = t.message
  const total = room.price * nights
  const other = currency === 'USD' ? 'PEN' : 'USD'
  return [
    m.greeting,
    '',
    `• ${m.room}: ${room.name[lang]}`,
    `• ${m.checkIn}: ${formatDate(checkIn, t.locale)}`,
    `• ${m.checkOut}: ${formatDate(checkOut, t.locale)}`,
    `• ${m.nights}: ${nights}`,
    `• ${m.guests}: ${guests}`,
    `• ${m.total}: ${formatPrice(total, currency, t.locale)} (${formatPrice(total, other, t.locale)})`,
    `• ${m.name}: ${name.trim()}`,
    `• ${m.country}: ${country.trim()}`,
    '',
    m.footer,
  ].join('\n')
}
