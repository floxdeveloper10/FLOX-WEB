import { Link, useParams } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import LogoFlox from '../components/brand/LogoFlox.jsx'
import useDocumentTitle from '../hooks/useDocumentTitle.js'
import { projects, projectsPage } from '../data/proyectos.js'
import NotFound from './NotFound.jsx'
import './Proyecto.css'

// /proyectos/:slug → por ahora una página "En construcción" con el logo y un botón para volver.
export default function Proyecto() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)
  // Si el proyecto no existe se muestra la 404, con su título
  useDocumentTitle(project?.name ?? 'Página no encontrada')

  if (!project) return <NotFound />

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
