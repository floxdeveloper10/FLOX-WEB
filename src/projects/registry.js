import { lazy } from 'react'

// Sitios demo completos (con su propio diseño, sin el encabezado ni el pie de FLOX).
// Para agregar otro: slug de src/data/proyectos.js → componente cargado aparte.
// nested: el sitio tiene sus propias páginas (/proyectos/agencia/tours…)
export const projectSites = {
  hotel: { Site: lazy(() => import('./hotel/HotelSite.jsx')), nested: false },
  agencia: { Site: lazy(() => import('./agencia/AgenciaSite.jsx')), nested: true },
}

// Si la ruta pertenece a un sitio demo, devuelve su slug; si no, null.
// /proyectos/hotel → 'hotel' · /proyectos/agencia/tours/vinicunca → 'agencia'
export function projectSiteSlug(pathname) {
  const match = pathname.match(/^\/proyectos\/([^/]+)(\/.*)?$/)
  if (!match) return null
  const site = projectSites[match[1]]
  const rest = (match[2] ?? '').replace(/\/+$/, '')
  if (!site || (rest && !site.nested)) return null
  return match[1]
}

export function isProjectSitePath(pathname) {
  return projectSiteSlug(pathname) !== null
}
