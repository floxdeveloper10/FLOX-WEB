import { useEffect } from 'react'

const BASE_TITLE = 'FLOX | Webs, cartas digitales y WhatsApp para negocios en Cusco'

// Título de la pestaña por página: "Nosotros | FLOX". Con null usa el título del inicio.
export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | FLOX` : BASE_TITLE
  }, [title])
}
