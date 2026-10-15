import { membership } from './gym.data.js'

const LOCALE = 'es-PE'
const SHORT_DAYS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

// "miércoles, 15 de octubre"
export function longDate(date) {
  return new Intl.DateTimeFormat(LOCALE, { weekday: 'long', day: 'numeric', month: 'long' }).format(date)
}

// "Hoy", "Mañana" o "Vie 17"
export function dayName(dayIndex, date) {
  if (dayIndex === 0) return 'Hoy'
  if (dayIndex === 1) return 'Mañana'
  return `${SHORT_DAYS[date.getDay()]} ${date.getDate()}`
}

// Para las fichas del selector de días: arriba el día de la semana, abajo el número
export function dayChip(dayIndex, date) {
  return { top: dayIndex === 0 ? 'Hoy' : SHORT_DAYS[date.getDay()], bottom: date.getDate() }
}

export function classWhen(c, days) {
  const day = days.find((d) => d.iso === c.iso)
  return `${dayName(c.dayIndex, day?.date ?? new Date())} · ${c.time}`
}

// Fecha de vencimiento de la membresía ("7 de noviembre")
export function membershipEnd(today = new Date()) {
  const end = new Date(today.getFullYear(), today.getMonth(), today.getDate() + membership.daysLeft)
  return new Intl.DateTimeFormat(LOCALE, { day: 'numeric', month: 'long' }).format(end)
}

export function monthTitle(date) {
  const text = new Intl.DateTimeFormat(LOCALE, { month: 'long', year: 'numeric' }).format(date)
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function kg(value) {
  return `${value.toLocaleString(LOCALE, { minimumFractionDigits: 1, maximumFractionDigits: 1 })} kg`
}

export function soles(value) {
  return `S/ ${value.toLocaleString(LOCALE)}`
}
