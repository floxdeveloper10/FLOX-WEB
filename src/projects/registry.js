import { lazy } from 'react'

// Sitios demo completos (con su propio diseño, sin el encabezado ni el pie de FLOX).
// Para agregar otro: slug de src/data/proyectos.js → componente cargado aparte.
export const projectSites = {
  hotel: lazy(() => import('./hotel/HotelSite.jsx')),
}

// ¿La ruta es un sitio demo completo? (/proyectos/hotel)
export function isProjectSitePath(pathname) {
  const match = pathname.match(/^\/proyectos\/([^/]+)\/?$/)
  return Boolean(match && projectSites[match[1]])
}
