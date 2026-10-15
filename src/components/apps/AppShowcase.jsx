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

// Cada app real se descarga solo cuando su celular está por aparecer en pantalla
const LIVE = {
  'app-gym': lazy(() => import('../../projects/app-gym/PumaFitPhone.jsx')),
  'app-restaurante': lazy(() => import('../../projects/app-restaurante/QhapaqPhone.jsx')),
  'app-inventario': lazy(() => import('../../projects/app-inventario/InventarioPhone.jsx')),
}
const TONES = { 'app-gym': '#0F0F10', 'app-restaurante': '#FFF4E2', 'app-inventario': '#0E4C5A' }

const apps = projects.filter((p) => p.category === 'apps')

function StaticPhone({ app }) {
  return (
    <Phone decorative statusTone={TONES[app]} statusText={app === 'app-restaurante' ? 'dark' : 'light'}>
      <AppScreen app={app} className="apps-screen" />
    </Phone>
  )
}

function LiveDemo({ app }) {
  const ref = useRef(null)
  const near = useInView(ref, { once: true, margin: '400px 0px' })
  const App = LIVE[app]
  const placeholder = <StaticPhone app={app} />

  return (
    <div ref={ref}>
      {near && App ? (
        <Suspense fallback={placeholder}>
          <App />
        </Suspense>
      ) : (
        placeholder
      )}
    </div>
  )
}

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
                  {live ? <LiveDemo app={app.slug} /> : <StaticPhone app={app.slug} />}
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
