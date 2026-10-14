import { HOME_SECTIONS } from '../data/site.js'

// '/precios' → 'precios' (si es una sección del inicio); si no, null
export function sectionFromPath(pathname) {
  const id = pathname.replace(/^\/+|\/+$/g, '')
  return HOME_SECTIONS.includes(id) ? id : null
}

// Las secciones del inicio son la misma página: así moverse entre ellas no repite la transición
export function pageKeyFromPath(pathname) {
  if (pathname === '/' || sectionFromPath(pathname)) return 'inicio'
  if (pathname.startsWith('/proyectos/')) return pathname
  return pathname.replace(/\/+$/, '') || '/'
}
