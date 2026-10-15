import { createContext, useContext } from 'react'

// Estado compartido por la app del cliente y la del restaurante (lo crea usePedidos)
export const PedidosContext = createContext(null)

export function usePedidosContext() {
  return useContext(PedidosContext)
}
