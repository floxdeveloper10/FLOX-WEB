import { Link } from 'react-router-dom'
import Reveal from '../Reveal.jsx'
import SectionHeading from '../SectionHeading.jsx'
import LiveAppPhone, { StaticAppPhone } from './LiveAppPhone.jsx'
import AppsIcon from './AppsIcon.jsx'
import { appsPage } from '../../data/apps.js'
import { projects } from '../../data/proyectos.js'

const apps = projects.filter((p) => p.category === 'apps')

// "Prueba nuestras apps de ejemplo": las apps listas funcionan dentro del celular
export default function AppShowcase() {
  const { showcase } = appsPage
  const headingId = `${showcase.id}-titulo`

  return (
    <section id={showcase.id} className="section section--blanco apps-show" aria-labelledby={headingId}>
      <div className="container">
        <SectionHeading id={headingId} eyebrow={showcase.eyebrow} title={showcase.title} lead={showcase.lead} />
        <ul className="apps-show__list">
          {apps.map((app, i) => {
            const live = app.status === 'listo'
            return (
              <Reveal as="li" key={app.slug} delay={i * 0.1} className={`apps-show__item ${live ? '' : 'is-soon'}`}>
                <div className="apps-show__device">
                  {live ? <LiveAppPhone app={app.slug} /> : <StaticAppPhone app={app.slug} />}
                  {!live && (
                    <span className="apps-show__soon" aria-hidden="true">
                      {showcase.soon}
                    </span>
                  )}
                </div>
                <div className="apps-show__body">
                  <p className="apps-show__type">{app.type}</p>
                  <h3 className="apps-show__name">{app.name}</h3>
                  <p className="apps-show__desc">{app.description}</p>
                  {live ? (
                    <Link to={`/proyectos/${app.slug}`} className="btn btn--primary apps-show__cta">
                      {showcase.open}
                      <AppsIcon name="arrow" />
                    </Link>
                  ) : (
                    <p className="apps-show__badge">{showcase.soon}</p>
                  )}
                </div>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
