import { createContext, useContext } from 'react'

// Estado compartido de la app Puma Fit (lo crea useGymStore)
export const GymContext = createContext(null)

export function useGym() {
  return useContext(GymContext)
}
