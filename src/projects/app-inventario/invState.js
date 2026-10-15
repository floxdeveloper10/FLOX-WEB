import { createContext, useContext } from 'react'

// Estado de Stock Andino (useInventario) + navegación y avisos de la app
export const InvContext = createContext(null)

export function useInv() {
  return useContext(InvContext)
}
