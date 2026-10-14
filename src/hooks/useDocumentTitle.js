import { useEffect } from 'react'

const BASE_TITLE = 'FLOX | Webs, cartas digitales y WhatsApp para negocios en Cusco'

// Título de la pestaña por página: "Nosotros | FLOX". Con null usa el título del inicio.
// Con undefined no toca el título (lo maneja la página interna, por ejemplo la agencia).
export default function useDocumentTitle(title) {
  useEffect(() => {
    if (title === undefined) return
    document.title = title ? `${title} | FLOX` : BASE_TITLE
  }, [title])
}
