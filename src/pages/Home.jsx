import { Suspense, lazy } from 'react'
import Hero from '../components/Hero.jsx'
import RubroPicker from '../components/RubroPicker.jsx'
import Problems from '../components/Problems.jsx'
import Services from '../components/Services.jsx'
import HowWeWork from '../components/HowWeWork.jsx'
import Pricing from '../components/Pricing.jsx'
import WhyFlox from '../components/WhyFlox.jsx'
import Contact from '../components/Contact.jsx'
import usePageMeta from '../hooks/usePageMeta.js'
import { seo } from '../data/seo.js'

// Secciones pesadas y más abajo (demos interactivas y franja de proyectos): se descargan
// aparte, en paralelo, para que lo primero que se ve cargue más rápido.
const TryIt = lazy(() => import('../components/TryIt.jsx'))
const ProjectsStrip = lazy(() => import('../components/projects/ProjectsStrip.jsx'))

// Espacio reservado mientras llega una sección (ScrollManager espera a que no quede ninguno)
function Pending() {
  return <div className="lazy-section" data-lazy-pending aria-hidden="true" />
}

// Página de inicio: las mismas secciones de siempre, más la franja de proyectos antes de Precios.
export default function Home() {
  usePageMeta(seo.home)

  return (
    <>
      <Hero />
      <RubroPicker />
      <Problems />
      <Services />
      <Suspense fallback={<Pending />}>
        <TryIt />
      </Suspense>
      <HowWeWork />
      <Suspense fallback={<Pending />}>
        <ProjectsStrip />
      </Suspense>
      <Pricing />
      <WhyFlox />
      <Contact />
    </>
  )
}
