import { categories, difficulties, durations, sorts, tours, USD_TO_PEN } from './agencia.data.js'

export const BASE = '/proyectos/agencia'
export const to = (path = '') => `${BASE}${path}`

// ─── Precios (los precios base están en USD) ───────────────
export function formatPrice(usd, currency, locale) {
  const amount = currency === 'PEN' ? usd * USD_TO_PEN : usd
  const number = new Intl.NumberFormat(locale, {
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount)
  return currency === 'PEN' ? `S/ ${number}` : `US$ ${number}`
}

export const MIN_PRICE = Math.min(...tours.map((t) => t.price))
export const MAX_PRICE = Math.max(...tours.map((t) => t.price))

// ─── Fechas ('AAAA-MM-DD' en la hora local del visitante) ───
const pad = (n) => String(n).padStart(2, '0')
export function todayISO() {
  const d = new Date()
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

function parseISO(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

// Día de la semana de una fecha (0 domingo … 6 sábado)
export const weekdayOf = (iso) => parseISO(iso).getDay()

export function formatDate(iso, locale, opts = { weekday: 'short', day: 'numeric', month: 'short' }) {
  if (!iso) return ''
  return new Intl.DateTimeFormat(locale, opts).format(parseISO(iso))
}

// Nombres cortos de los días de salida: "lun, mié, vie"
export function formatDepartures(days, locale) {
  if (days.length === 7) return null
  const fmt = new Intl.DateTimeFormat(locale, { weekday: 'short' })
  // 2023-01-01 fue domingo: sirve de base para nombrar cada día
  return days.map((d) => fmt.format(new Date(2023, 0, 1 + d))).join(', ')
}

// ─── Duración ───────────────────────────────────────────────
export function durationLabel(tour, t) {
  const { days, hours } = tour.duration
  if (days > 1) return t.card.days(days)
  if (hours <= 8) return t.card.hours(hours)
  return `${t.card.days(1)} · ${t.card.hours(hours)}`
}

const totalHours = (tour) => (tour.duration.days > 1 ? tour.duration.days * 24 : tour.duration.hours)

// ─── Filtros ↔ URL (?categoria=aventura&dificultad=facil&precio=150…) ───
const ids = (list) => list.map((x) => x.id)
const listParam = (value, valid) => (value ? value.split(',').filter((v) => valid.includes(v)) : [])

export function parseFilters(params) {
  const precio = Number(params.get('precio'))
  const personas = Number(params.get('personas'))
  const fecha = params.get('fecha') ?? ''
  const orden = params.get('orden')
  return {
    q: params.get('q') ?? '',
    categoria: listParam(params.get('categoria'), ids(categories)),
    duracion: ids(durations).includes(params.get('duracion')) ? params.get('duracion') : '',
    dificultad: listParam(params.get('dificultad'), ids(difficulties)),
    precio: precio >= MIN_PRICE && precio < MAX_PRICE ? precio : null,
    fecha: /^\d{4}-\d{2}-\d{2}$/.test(fecha) ? fecha : '',
    personas: personas >= 1 && personas <= 12 ? personas : null,
    orden: ids(sorts).includes(orden) ? orden : 'recomendados',
  }
}

export function filtersToParams(f) {
  const p = new URLSearchParams()
  if (f.q.trim()) p.set('q', f.q)
  if (f.categoria.length) p.set('categoria', f.categoria.join(','))
  if (f.duracion) p.set('duracion', f.duracion)
  if (f.dificultad.length) p.set('dificultad', f.dificultad.join(','))
  if (f.precio) p.set('precio', String(f.precio))
  if (f.fecha) p.set('fecha', f.fecha)
  if (f.personas) p.set('personas', String(f.personas))
  if (f.orden !== 'recomendados') p.set('orden', f.orden)
  return p
}

export const EMPTY_FILTERS = parseFilters(new URLSearchParams())

// Búsqueda sin tildes ni mayúsculas: "laguna" encuentra "Laguna", "valle" encuentra "Valle Sagrado"
const normalize = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

export function filterTours(list, f) {
  const words = normalize(f.q).split(/\s+/).filter(Boolean)
  return list.filter((tour) => {
    if (words.length) {
      const haystack = normalize([tour.name.es, tour.name.en, tour.summary.es, tour.summary.en, tour.id].join(' '))
      if (!words.every((w) => haystack.includes(w))) return false
    }
    if (f.categoria.length && !f.categoria.includes(tour.category)) return false
    if (f.duracion === '1dia' && tour.duration.days > 1) return false
    if (f.duracion === 'varios' && tour.duration.days === 1) return false
    if (f.dificultad.length && !f.dificultad.includes(tour.difficulty)) return false
    if (f.precio && tour.price > f.precio) return false
    if (f.fecha && !tour.departures.includes(weekdayOf(f.fecha))) return false
    return true
  })
}

export function sortTours(list, orden) {
  const sorted = [...list]
  if (orden === 'precio-asc') sorted.sort((a, b) => a.price - b.price)
  else if (orden === 'precio-desc') sorted.sort((a, b) => b.price - a.price)
  else if (orden === 'duracion') sorted.sort((a, b) => totalHours(a) - totalHours(b))
  else sorted.sort((a, b) => a.rank - b.rank)
  return sorted
}

export const findTour = (id) => tours.find((t) => t.id === id)
export const categoryOf = (id) => categories.find((c) => c.id === id)
export const difficultyOf = (id) => difficulties.find((d) => d.id === id)

export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())
