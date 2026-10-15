import { Suspense, lazy, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useInView } from 'framer-motion'
import Phone from '../demo/Phone.jsx'
import Reveal from '../Reveal.jsx'
import SectionHeading from '../SectionHeading.jsx'
import AppScreen from './AppScreens.jsx'
import AppsIcon from './AppsIcon.jsx'
import { appsPage } from '../../data/apps.js'
import { projects } from '../../data/proyectos.js'

// La app Puma Fit real se descarga solo cuando su celular está por aparecer en pantalla
const PumaFitPhone = lazy(() => import('../../projects/app-gym/PumaFitPhone.jsx'))

const apps = projects.filter((p) => p.category === 'apps')

function StaticPhone({ app, tone }) {
  return (
    <Phone decorative statusTone={tone}>
      <AppScreen app={app} className="apps-screen" />
    </Phone>
  )
}

function LiveDemo() {
  const ref = useRef(null)
  const near = useInView(ref, { once: true, margin: '400px 0px' })
  const placeholder = <StaticPhone app="app-gym" tone="#0F0F10" />

  return (
    <div ref={ref}>
      {near ? <Suspense fallback={placeholder}><PumaFitPhone /></Suspense> : placeholder}
    </div>
  )
}

// "Prueba nuestras apps de ejemplo": Puma Fit funciona; las otras, muy pronto
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
                  {live ? <LiveDemo /> : <StaticPhone app={app.slug} tone={app.colors.primary} />}
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
