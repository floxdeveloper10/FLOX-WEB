import { Link } from 'react-router-dom'
import ProjectPreview from './ProjectPreview.jsx'
import { projectHref, projectsPage } from '../../data/proyectos.js'
import './ProjectCard.css'

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" className="project-card__arrow" aria-hidden="true" focusable="false">
      <path d="M5 12h14m-5-5 5 5-5 5" />
    </svg>
  )
}

/**
 * Tarjeta de un proyecto. Toda la tarjeta es un enlace.
 * - size 'lg': galería de /proyectos (vista previa, etiquetas, descripción y servicios)
 * - size 'sm': franja del inicio (vista previa, nombre y tipo)
 */
export default function ProjectCard({ project, size = 'lg', headingLevel = 'h3' }) {
  const Heading = headingLevel
  const soon = project.status === 'construccion'

  return (
    <Link to={projectHref(project)} className={`card project-card project-card--${size} project-link`}>
      <ProjectPreview project={project} size={size} overlay={size === 'lg' ? projectsPage.view : null} />

      <div className="project-card__body">
        <div className="project-card__labels">
          <span className="project-card__label">{projectsPage.demoLabel}</span>
          {soon && <span className="project-card__label project-card__label--soon">{projectsPage.soonLabel}</span>}
        </div>

        <Heading className="project-card__name">{project.name}</Heading>
        <p className="project-card__type" style={{ '--type-color': project.colors.primary }}>
          {project.type}
        </p>

        {size === 'lg' && (
          <>
            <p className="project-card__desc">{project.description}</p>
            <ul className="project-card__services">
              {project.services.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </>
        )}

        <span className="project-card__view">
          {projectsPage.view}
          <Arrow />
        </span>
      </div>
    </Link>
  )
}
