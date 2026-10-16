import { useParams } from 'react-router-dom'
import Faq from '../components/Faq.jsx'
import Testimonios from '../components/Testimonios.jsx'
import RubroDemo from '../components/soluciones/RubroDemo.jsx'
import { RubroCta, RubroHero, RubroProblems, RubroServices } from '../components/soluciones/RubroSections.jsx'
import usePageMeta from '../hooks/usePageMeta.js'
import { rubroBySlug, solucionesUi } from '../data/rubros.js'
import { seo } from '../data/seo.js'
import NotFound from './NotFound.jsx'
import './Solucion.css'

// /soluciones/:rubro — una sola plantilla para los 6 rubros (datos en src/data/rubros.js)
export default function Solucion() {
  const { rubro: slug } = useParams()
  const rubro = rubroBySlug[slug]
  usePageMeta(rubro ? rubro.seo : seo.notFound)

  if (!rubro) return <NotFound />

  return (
    <div className={`rubro rubro--${rubro.slug}`}>
      <RubroHero rubro={rubro} />
      <RubroProblems rubro={rubro} />
      <RubroServices rubro={rubro} />
      <RubroDemo rubro={rubro} />
      {/* Testimonios de clientes de este rubro (si hay) */}
      <Testimonios rubro={rubro.slug} />
      <Faq id="rubro-preguntas" eyebrow={solucionesUi.faqEyebrow} title={solucionesUi.faqTitle} items={rubro.faqs} />
      <RubroCta rubro={rubro} />
    </div>
  )
}
