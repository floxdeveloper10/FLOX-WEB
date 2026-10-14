import { useEffect, useState } from 'react'
import { useAgencia } from './agenciaState.js'

// ¿Coincide una media query? (para mostrar la caja de reserva lateral o la barra inferior)
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])
  return matches
}

const DEFAULT_TRAVELERS = { adults: 2, students: 0, children: 0 }

/**
 * Estado de la reserva de un tour (fecha, viajeros y extras).
 * Si se edita una reserva del carrito (?editar=<id>), empieza con sus datos.
 */
export function useBooking(tour, editKey) {
  const { cart } = useAgencia()
  const editing = cart.find((item) => item.key === editKey && item.tourId === tour.id) ?? null
  const [booking, setBooking] = useState(() =>
    editing
      ? { date: editing.date, travelers: { ...editing.travelers }, extras: [...editing.extras] }
      : { date: '', travelers: { ...DEFAULT_TRAVELERS }, extras: [] },
  )
  return { booking, setBooking, editing }
}
