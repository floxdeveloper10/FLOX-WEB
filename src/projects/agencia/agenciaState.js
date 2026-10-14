import { createContext, useContext, useEffect } from 'react'

// Estado compartido de la web de la agencia: idioma, moneda y favoritos.
export const AgenciaContext = createContext(null)

export function useAgencia() {
  const value = useContext(AgenciaContext)
  if (!value) throw new Error('useAgencia debe usarse dentro de AgenciaSite')
  return value
}

// Título de la pestaña de cada página de la agencia
export function useAgenciaTitle(title) {
  useEffect(() => {
    document.title = `${title ? `${title} · ` : ''}Andes Ruta Travel · Proyecto demo | FLOX`
  }, [title])
}
