import { Link } from 'react-router-dom'
import Reveal from '../Reveal.jsx'
import SectionHeading from '../SectionHeading.jsx'
import ProjectCard from './ProjectCard.jsx'
import { projects, projectsPage } from '../../data/proyectos.js'
import './ProjectsStrip.css'

// Franja del inicio "Mira nuestros proyectos": las tarjetas en pequeño y un botón a /proyectos.
export default function ProjectsStrip() {
  const { strip } = projectsPage
  const headingId = 'proyectos-destacados-titulo'

  return (
    <section id="proyectos-destacados" className="section section--morado strip" aria-labelledby={headingId}>
      <div className="container">
        <SectionHeading id={headingId} eyebrow={strip.eyebrow} title={strip.title} tone="dark" />

        <ul className="strip__list">
          {projects.map((project, i) => (
            <Reveal as="li" key={project.slug} delay={i * 0.08} className="strip__item">
              <ProjectCard project={project} size="sm" />
            </Reveal>
          ))}
        </ul>

        <Reveal className="strip__actions">
          <Link to="/proyectos" className="btn btn--primary">
            {strip.button}
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
