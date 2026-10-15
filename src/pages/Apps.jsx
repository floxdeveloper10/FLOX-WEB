import AppsHero from '../components/apps/AppsHero.jsx'
import AppIdeas from '../components/apps/AppIdeas.jsx'
import AppShowcase from '../components/apps/AppShowcase.jsx'
import AppProcess from '../components/apps/AppProcess.jsx'
import AppFaq from '../components/apps/AppFaq.jsx'
import Reveal from '../components/Reveal.jsx'
import WhatsAppIcon from '../components/WhatsAppIcon.jsx'
import useDocumentTitle from '../hooks/useDocumentTitle.js'
import { appsPage } from '../data/apps.js'
import { whatsappLink } from '../data/site.js'
import './Apps.css'

// FLOX Apps: apps móviles a medida para cualquier negocio
export default function Apps() {
  useDocumentTitle(appsPage.title)
  const { closing } = appsPage

  return (
    <>
      <AppsHero />
      <AppIdeas />
      <AppShowcase />
      <AppProcess />
      <AppFaq />

      <section className="section section--blanco apps-closing" aria-labelledby="apps-cierre">
        <Reveal className="container apps-closing__inner">
          <h2 id="apps-cierre" className="apps-closing__title">
            {closing.title}
          </h2>
          <p className="apps-closing__text">{closing.text}</p>
          <a
            className="btn btn--primary apps-closing__btn"
            href={whatsappLink(closing.message)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon />
            {closing.button}
          </a>
        </Reveal>
      </section>
    </>
  )
}
