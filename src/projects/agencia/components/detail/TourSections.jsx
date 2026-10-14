import { useEffect, useState } from 'react'
import Accordion from '../Accordion.jsx'
import AgenciaIcon from '../AgenciaIcon.jsx'
import AltitudeProfile from './AltitudeProfile.jsx'
import Itinerary from './Itinerary.jsx'
import { useAgencia } from '../../agenciaState.js'
import { faqs } from '../../agencia.data.js'
import { durationLabel, formatDepartures } from '../../utils.js'

const SECTIONS = ['resumen', 'itinerario', 'incluye', 'llevar', 'preguntas']

// Sección en pantalla (para resaltar su pestaña)
function useActiveSection() {
  const [active, setActive] = useState(SECTIONS[0])
  useEffect(() => {
    const visible = new Set()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id)))
        const first = SECTIONS.find((id) => visible.has(id))
        if (first) setActive(first)
      },
      { rootMargin: '-30% 0px -60% 0px' },
    )
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])
  return active
}

// Pestañas que funcionan como índice: llevan a cada sección de la página
function SectionNav() {
  const { t, reduceMotion } = useAgencia()
  const active = useActiveSection()

  const go = (id) => {
    const el = document.getElementById(id)
    const nav = document.querySelector('.adnav')
    const offset = (nav?.getBoundingClientRect().bottom ?? 0) + 8
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: reduceMotion ? 'auto' : 'smooth' })
    el.focus({ preventScroll: true })
  }

  return (
    <nav className="adnav" aria-label={t.tour.sectionsLabel}>
      <ul className="adnav__list">
        {SECTIONS.map((id) => (
          <li key={id}>
            <button type="button" className={`adnav__tab ${active === id ? 'is-active' : ''}`} aria-current={active === id ? 'true' : undefined} onClick={() => go(id)}>
              {t.tour.sections[id]}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default function TourSections({ tour }) {
  const { t, lang } = useAgencia()
  const departures = formatDepartures(tour.departures, t.locale) ?? t.tour.everyDay

  return (
    <div className="adsections">
      <SectionNav />

      <section id="resumen" className="adsec" tabIndex={-1} aria-labelledby="adsec-resumen">
        <h2 id="adsec-resumen" className="adsec__title">
          {t.tour.sections.resumen}
        </h2>
        <p className="adsec__lead">{tour.summary[lang]}</p>
        <ul className="adsec__quick">
          <li>
            <AgenciaIcon name="calendar" />
            <span>
              <strong>{t.tour.departures}</strong>
              {departures}
            </span>
          </li>
          <li>
            <AgenciaIcon name="pin" />
            <span>
              <strong>{t.tour.pickup}</strong>
              {t.tour.pickupText}
            </span>
          </li>
          <li>
            <AgenciaIcon name="clock" />
            <span>
              <strong>{t.tour.duration}</strong>
              {durationLabel(tour, t)}
            </span>
          </li>
        </ul>
        {tour.profile && <AltitudeProfile tour={tour} />}
      </section>

      <section id="itinerario" className="adsec" tabIndex={-1} aria-labelledby="adsec-itinerario">
        <h2 id="adsec-itinerario" className="adsec__title">
          {t.tour.itineraryTitle}
        </h2>
        <Itinerary tour={tour} />
      </section>

      <section id="incluye" className="adsec" tabIndex={-1} aria-labelledby="adsec-incluye">
        <h2 id="adsec-incluye" className="adsec__title">
          {t.tour.includesTitle}
        </h2>
        <div className="adinc">
          <div className="adinc__col adinc__col--yes">
            <h3 className="adinc__title">{t.tour.includes}</h3>
            <ul>
              {tour.includes[lang].map((item) => (
                <li key={item}>
                  <AgenciaIcon name="check" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="adinc__col adinc__col--no">
            <h3 className="adinc__title">{t.tour.excludes}</h3>
            <ul>
              {tour.excludes[lang].map((item) => (
                <li key={item}>
                  <AgenciaIcon name="x" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="llevar" className="adsec" tabIndex={-1} aria-labelledby="adsec-llevar">
        <h2 id="adsec-llevar" className="adsec__title">
          {t.tour.bringTitle}
        </h2>
        <ul className="adbring">
          {tour.bring[lang].map((item) => (
            <li key={item}>
              <AgenciaIcon name="check" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section id="preguntas" className="adsec" tabIndex={-1} aria-labelledby="adsec-preguntas">
        <h2 id="adsec-preguntas" className="adsec__title">
          {t.tour.faqTitle}
        </h2>
        <Accordion items={faqs.map((f, i) => ({ id: i, title: f.q[lang], content: <p>{f.a[lang]}</p> }))} className="adfaq" />
      </section>
    </div>
  )
}
