import { Suspense } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import WhatsAppFloat from '../components/WhatsAppFloat.jsx'
import SkipLink from '../components/SkipLink.jsx'
import Chakana from '../components/brand/Chakana.jsx'
import ScrollManager from './ScrollManager.jsx'
import ErrorBoundary from './ErrorBoundary.jsx'
import { pageKeyFromPath } from './paths.js'
import { resetPage } from './resetPage.js'
import { isProjectSitePath } from '../projects/registry.js'

const pageMotion = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: 'easeIn' } },
}

// Mientras se descarga una página o un proyecto demo (se cargan aparte): la chakana late
// sobre un fondo morado del alto de una portada, para evitar saltos.
function PageFallback() {
  return (
    <div className="page-fallback" role="status">
      <Chakana className="page-fallback__chakana" />
      <span className="visually-hidden">Cargando…</span>
    </div>
  )
}

// Estructura común a todas las páginas: encabezado, contenido con transición, pie y botón flotante.
// Los sitios demo completos (/proyectos/hotel) traen su propio diseño: sin el encabezado,
// el pie ni el botón flotante de FLOX.
export default function Layout() {
  const { pathname } = useLocation()
  const outlet = useOutlet()
  const pageKey = pageKeyFromPath(pathname)
  const floxChrome = !isProjectSitePath(pathname)

  return (
    <MotionConfig reducedMotion="user">
      <ScrollManager />
      {/* Al cambiar de página el foco vuelve aquí: el siguiente Tab es "Saltar al contenido" */}
      <span id="inicio-pagina" tabIndex={-1} className="page-top" />
      <SkipLink />
      {floxChrome && <Header />}
      <AnimatePresence mode="wait" initial={false} onExitComplete={resetPage}>
        <motion.main key={pageKey} id="contenido" tabIndex={-1} {...pageMotion}>
          <ErrorBoundary key={pageKey}>
            <Suspense fallback={<PageFallback />}>{outlet}</Suspense>
          </ErrorBoundary>
        </motion.main>
      </AnimatePresence>
      {floxChrome && <Footer />}
      {floxChrome && <WhatsAppFloat />}
    </MotionConfig>
  )
}
