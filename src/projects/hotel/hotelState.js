import { createContext, useContext } from 'react'

// Estado compartido de la web del hotel: idioma, moneda, búsqueda y reserva.
export const HotelContext = createContext(null)

export function useHotel() {
  const value = useContext(HotelContext)
  if (!value) throw new Error('useHotel debe usarse dentro de HotelSite')
  return value
}
