import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useReducedMotion } from 'framer-motion'
import { pageKeyFromPath, sectionFromPath } from './paths.js'

// Espera a que exista un elemento (la página nueva aparece después de la transición)
function waitForElement(id, onFound) {
  let frame
  const started = performance.now()
  const check = () => {
    const el = document.getElementById(id)
    if (el) onFound(el)
    else if (performance.now() - started < 3000) frame = requestAnimationFrame(check)
  }
  check()
  return () => cancelAnimationFrame(frame)
}

/**
 * Maneja el scroll al navegar:
 * - a una sección del inicio (#/precios): baja suavemente hasta ella, venga de donde venga;
 * - a "Inicio" estando ya en el inicio: sube suavemente;
 * - a otra página: el salto arriba lo hace Layout cuando termina la transición de salida.
 */
export default function ScrollManager() {
  const { pathname, key } = useLocation()
  const reduceMotion = useReducedMotion()
  const previousPage = useRef(null)

  useEffect(() => {
    const page = pageKeyFromPath(pathname)
    const samePage = previousPage.current === page
    const firstLoad = previousPage.current === null
    previousPage.current = page

    const section = sectionFromPath(pathname)
    const behavior = reduceMotion || firstLoad ? 'auto' : 'smooth'

    if (section) {
      // Desde otra página, esperar a que el inicio termine de aparecer
      let cancel = () => {}
      const timer = setTimeout(
        () => {
          cancel = waitForElement(section, (el) => el.scrollIntoView({ behavior, block: 'start' }))
        },
        samePage || firstLoad ? 0 : 420,
      )
      return () => {
        clearTimeout(timer)
        cancel()
      }
    }

    if (samePage && pathname === '/') window.scrollTo({ top: 0, behavior })
    return undefined
  }, [pathname, key, reduceMotion])

  return null
}
