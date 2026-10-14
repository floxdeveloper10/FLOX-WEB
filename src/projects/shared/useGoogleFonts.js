import { useEffect } from 'react'

// Carga una hoja de Google Fonts solo cuando se entra al sitio demo que la usa
// (así las fuentes de cada proyecto no pesan en el resto de la web de FLOX).
export default function useGoogleFonts(id, href) {
  useEffect(() => {
    if (document.getElementById(id)) return
    const link = document.createElement('link')
    link.id = id
    link.rel = 'stylesheet'
    link.href = href
    document.head.appendChild(link)
  }, [id, href])
}
