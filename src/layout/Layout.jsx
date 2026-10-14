import { Suspense } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import WhatsAppFloat from '../components/WhatsAppFloat.jsx'
import ScrollManager from './ScrollManager.jsx'
import { pageKeyFromPath } from './paths.js'
import { isProjectSitePath } from '../projects/registry.js'

const pageMotion = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: 'easeIn' } },
}

// Mientras carga una página (Nosotros y Proyectos se descargan aparte), un fondo morado
// del mismo alto que su portada evita saltos.
function PageFallback() {
  return <div className="page-fallback" aria-hidden="true" />
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
      {floxChrome && <Header />}
      <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo({ top: 0, behavior: 'instant' })}>
        <motion.main key={pageKey} id="contenido" {...pageMotion}>
          <Suspense fallback={<PageFallback />}>{outlet}</Suspense>
        </motion.main>
      </AnimatePresence>
      {floxChrome && <Footer />}
      {floxChrome && <WhatsAppFloat />}
    </MotionConfig>
  )
}
