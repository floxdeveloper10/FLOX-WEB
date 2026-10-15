import { Link, useParams } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import LogoFlox from '../components/brand/LogoFlox.jsx'
import usePageMeta from '../hooks/usePageMeta.js'
import { demoSeo, seo } from '../data/seo.js'
import { projects, projectsPage } from '../data/proyectos.js'
import NotFound from './NotFound.jsx'
import { projectSites } from '../projects/registry.js'
import './Proyecto.css'

// /proyectos/:slug → el sitio demo del proyecto si ya existe; si no, "En construcción".
export default function Proyecto() {
  const { slug, '*': rest = '' } = useParams()
  const project = projects.find((p) => p.slug === slug)
  const entry = projectSites[slug]
  // Subrutas solo en los sitios que tienen varias páginas (la agencia)
  const validPath = !rest || entry?.nested
  const Site = validPath ? entry?.Site : null
  // Título y descripción: los del demo; "En construcción" usa el nombre del proyecto.
  // Los sitios con varias páginas (la agencia) ponen el título de cada página.
  let meta = project ? { title: `${project.name} · Demo FLOX`, description: project.description } : seo.notFound
  if (Site) meta = { ...demoSeo[slug], ...(entry.nested ? { title: undefined } : {}) }
  usePageMeta(meta)

  if (!project || !validPath) return <NotFound />
  // Proyecto con sitio demo completo (diseño propio)
  if (Site) return <Site />

  const { building } = projectsPage

  return (
    <PageHero
      className="building"
      titleId="proyecto-titulo"
      eyebrow={project.type}
      title={project.name}
      art={<LogoFlox variant="white" className="building__logo" />}
    >
      <div className="building__box">
        <span className="building__badge">
          <span className="building__cone" aria-hidden="true" />
          {building.title}
        </span>
        <p className="building__text">{building.text}</p>
        <div className="building__actions">
          <Link to="/proyectos" className="btn btn--primary">
            {building.back}
          </Link>
          {project.link && (
            <Link to={project.link} className="btn btn--ghost">
              {building.demo}
            </Link>
          )}
        </div>
      </div>
    </PageHero>
  )
}
