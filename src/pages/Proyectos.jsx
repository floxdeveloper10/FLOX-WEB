import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import WhatsAppIcon from '../components/WhatsAppIcon.jsx'
import ProjectCard from '../components/projects/ProjectCard.jsx'
import useDocumentTitle from '../hooks/useDocumentTitle.js'
import { projectCategories, projects, projectsPage } from '../data/proyectos.js'
import { whatsappLink } from '../data/site.js'
import './Proyectos.css'

export default function Proyectos() {
  useDocumentTitle(projectsPage.title)
  const [filter, setFilter] = useState('todos')
  const visible = filter === 'todos' ? projects : projects.filter((p) => p.category === filter)

  return (
    <>
      <PageHero titleId="proyectos-titulo" title={projectsPage.title} lead={projectsPage.lead} />

      <section className="section section--crema gallery" aria-labelledby="proyectos-titulo">
        <div className="container">
          <div className="gallery__filters" role="group" aria-label={projectsPage.filtersLabel}>
            {projectCategories.map((c) => (
              <button
                key={c.id}
                type="button"
                className="gallery__filter"
                aria-pressed={filter === c.id}
                onClick={() => setFilter(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>

          <motion.ul className="gallery__list" layout>
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((project) => (
                <motion.li
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.97, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProjectCard project={project} size="lg" headingLevel="h2" />
                  {project.highlights && (
                    <ul className="gallery__highlights" aria-label={`${projectsPage.includesLabel} ${project.name}`}>
                      {project.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  )}
                </motion.li>
              ))}
            </AnimatePresence>
            {visible.length === 0 && <li className="gallery__empty">{projectsPage.empty}</li>}
          </motion.ul>
        </div>
      </section>

      <section className="section section--blanco gallery-cta" aria-labelledby="proyectos-cta">
        <Reveal className="container gallery-cta__inner">
          <h2 id="proyectos-cta" className="gallery-cta__title">
            {projectsPage.cta.title}
          </h2>
          <a className="btn btn--primary" href={whatsappLink(projectsPage.cta.message)} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon />
            {projectsPage.cta.button}
          </a>
        </Reveal>
      </section>
    </>
  )
}
