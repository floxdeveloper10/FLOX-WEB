import { useCallback, useEffect, useMemo, useState } from 'react'
import { local } from '../shared/safeStorage.js'
import { buildSchedule, defaultBookingId, routine } from './gym.data.js'

// Estado de la demo guardado en el navegador (con try/catch en safeStorage):
// reservas, lista de espera, ejercicios hechos y tema. Así se mantiene al recargar.
const STORE_KEY = 'puma-fit:demo'

function initialState() {
  return { entered: false, bookings: [defaultBookingId()], waitlist: [], done: [], theme: 'dark' }
}

const strings = (list) => (Array.isArray(list) ? list.filter((x) => typeof x === 'string') : [])

function loadState() {
  const saved = local.get(STORE_KEY, null)
  if (!saved || typeof saved !== 'object') return initialState()
  const exerciseIds = new Set(routine.exercises.map((e) => e.id))
  return {
    entered: saved.entered === true,
    bookings: strings(saved.bookings),
    waitlist: strings(saved.waitlist),
    done: strings(saved.done).filter((id) => exerciseIds.has(id)),
    theme: saved.theme === 'light' ? 'light' : 'dark',
  }
}

// Vibración ligera en los celulares que la soportan (en otros no pasa nada)
export function vibrate(pattern) {
  try {
    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') navigator.vibrate(pattern)
  } catch {
    // Algunos navegadores la bloquean: se ignora
  }
}

const toggle = (list, id) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id])

export default function useGymStore() {
  const [state, setState] = useState(loadState)
  const schedule = useMemo(() => buildSchedule(), [])

  useEffect(() => local.set(STORE_KEY, state), [state])

  const update = useCallback((fn) => setState((s) => ({ ...s, ...fn(s) })), [])

  const enter = useCallback(() => update(() => ({ entered: true })), [update])
  const logout = useCallback(() => update(() => ({ entered: false })), [update])
  const toggleBooking = useCallback((id) => update((s) => ({ bookings: toggle(s.bookings, id) })), [update])
  const toggleWaitlist = useCallback((id) => update((s) => ({ waitlist: toggle(s.waitlist, id) })), [update])
  const toggleDone = useCallback((id) => update((s) => ({ done: toggle(s.done, id) })), [update])
  const setTheme = useCallback((theme) => update(() => ({ theme })), [update])
  const reset = useCallback(() => setState(initialState()), [])

  // Clases con los cupos que quedan (contando las reservas del socio)
  const days = useMemo(
    () =>
      schedule.map((day) => ({
        ...day,
        classes: day.classes.map((c) => {
          const booked = state.bookings.includes(c.id)
          const left = Math.max(0, c.capacity - c.taken - (booked ? 1 : 0))
          return { ...c, booked, waiting: state.waitlist.includes(c.id), left, full: !booked && c.capacity - c.taken <= 0 }
        }),
      })),
    [schedule, state.bookings, state.waitlist],
  )

  const booked = useMemo(() => days.flatMap((d) => d.classes.filter((c) => c.booked)), [days])

  return {
    ...state,
    days,
    booked,
    nextClass: booked[0] ?? null,
    enter,
    logout,
    toggleBooking,
    toggleWaitlist,
    toggleDone,
    setTheme,
    reset,
  }
}
