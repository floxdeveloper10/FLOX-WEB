import Hero from '../components/Hero.jsx'
import Problems from '../components/Problems.jsx'
import Services from '../components/Services.jsx'
import TryIt from '../components/TryIt.jsx'
import HowWeWork from '../components/HowWeWork.jsx'
import ProjectsStrip from '../components/projects/ProjectsStrip.jsx'
import Pricing from '../components/Pricing.jsx'
import WhyFlox from '../components/WhyFlox.jsx'
import Contact from '../components/Contact.jsx'
import useDocumentTitle from '../hooks/useDocumentTitle.js'

// Página de inicio: las mismas secciones de siempre, más la franja de proyectos antes de Precios.
export default function Home() {
  useDocumentTitle(null)

  return (
    <>
      <Hero />
      <Problems />
      <Services />
      <TryIt />
      <HowWeWork />
      <ProjectsStrip />
      <Pricing />
      <WhyFlox />
      <Contact />
    </>
  )
}
