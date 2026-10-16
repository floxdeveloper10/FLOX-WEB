import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Icon from '../Icon.jsx'
import Reveal from '../Reveal.jsx'
import SectionHeading from '../SectionHeading.jsx'
import WhatsAppIcon from '../WhatsAppIcon.jsx'
import StepBand from '../brand/StepBand.jsx'
import RubroIcon from './RubroIcon.jsx'
import { whatsappLink } from '../../data/site.js'
import { fromLabel, serviceById } from '../../data/precios.js'
import { quoteHref, solucionesUi as ui } from '../../data/rubros.js'
import '../PageHero.css'
import '../Problems.css'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

// Ícono de cada servicio en las tarjetas
const SERVICE_ICON = { carta: 'qr', web1: 'web', webPlus: 'web', maps: 'mapa', chatbot: 'chat', citas: 'calendario', tienda: 'tienda', app: 'app' }
const ACCENTS = ['fucsia', 'naranja', 'turquesa']

// Portada: el dolor del rubro y los dos caminos (demo gratis o cotizar)
export function RubroHero({ rubro }) {
  return (
    <section className="page-hero rubro-hero" aria-labelledby="rubro-titulo">
      <div className="container page-hero__inner">
        <motion.div className="page-hero__copy" variants={container} initial="hidden" animate="show">
          <motion.span className="rubro-hero__icon" variants={item}>
            <RubroIcon name={rubro.icon} />
          </motion.span>
          <motion.p className="page-hero__eyebrow" variants={item}>
            {rubro.hero.eyebrow}
          </motion.p>
          {/* El título se ve desde el inicio (solo se desliza) */}
          <motion.h1 id="rubro-titulo" className="page-hero__title" initial={{ y: 18 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}>
            {rubro.hero.title}
          </motion.h1>
          <motion.p className="page-hero__lead" variants={item}>
            {rubro.hero.lead}
          </motion.p>
          <motion.div className="rubro-hero__actions" variants={item}>
            <a className="btn btn--primary" href={whatsappLink(rubro.demoMessage)} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              {ui.heroCta}
            </a>
            <Link className="btn btn--ghost rubro-hero__quote" to={quoteHref(rubro)}>
              {ui.quoteCta}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// 3 problemas típicos del rubro, con su solución en una línea
export function RubroProblems({ rubro }) {
  return (
    <section className="section section--crema problems" aria-labelledby="rubro-problemas">
      <div className="problems__band">
        <StepBand />
      </div>
      <div className="container">
        <SectionHeading id="rubro-problemas" eyebrow={ui.problemsEyebrow} title={ui.problemsTitle} />
        <ul className="card-grid">
          {rubro.problems.map((p, i) => (
            <Reveal as="li" key={p.question} delay={i * 0.1}>
              <article className={`card problem-card accent--${ACCENTS[i % ACCENTS.length]}`}>
                <span className="problem-card__icon">
                  <Icon name={p.icon} />
                </span>
                <h3 className="problem-card__question">{p.question}</h3>
                <p className="problem-card__solution">
                  <Icon name="flecha" className="problem-card__arrow" />
                  <span>{p.solution}</span>
                </p>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

// Soluciones FLOX que aplican al rubro (con su precio "desde", del archivo de precios)
export function RubroServices({ rubro }) {
  return (
    <section className="section section--blanco rubro-services" aria-labelledby="rubro-soluciones">
      <div className="container">
        <SectionHeading id="rubro-soluciones" eyebrow={ui.servicesEyebrow} title={ui.servicesTitle} />
        <ul className="rubro-services__grid" style={{ '--cols': rubro.services.length }}>
          {rubro.services.map((s, i) => {
            const service = serviceById[s.id]
            return (
              <Reveal as="li" key={s.id} delay={(i % 4) * 0.08}>
                <article className={`rubro-service accent--${service.quote ? 'amarillo' : ACCENTS[i % ACCENTS.length]}`}>
                  <span className="rubro-service__icon">
                    <Icon name={SERVICE_ICON[s.id]} />
                  </span>
                  <h3 className="rubro-service__name">{service.name}</h3>
                  <p className="rubro-service__text">{s.text}</p>
                  <p className="rubro-service__price">{fromLabel(service)}</p>
                </article>
              </Reveal>
            )
          })}
        </ul>

        <Reveal className="rubro-quote">
          <div>
            <h3 className="rubro-quote__title">{ui.quoteTitle}</h3>
            <p className="rubro-quote__text">{ui.quoteText}</p>
          </div>
          <Link className="btn btn--primary" to={quoteHref(rubro)}>
            <Icon name="moneda" />
            {ui.quoteCta}
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

// Llamado final a WhatsApp con un mensaje que nombra el rubro
export function RubroCta({ rubro }) {
  return (
    <section className="section section--morado rubro-cta" aria-labelledby="rubro-cta">
      <Reveal className="container rubro-cta__inner">
        <h2 id="rubro-cta" className="rubro-cta__title">
          {rubro.cta.title}
        </h2>
        <p className="rubro-cta__text">{rubro.cta.text}</p>
        <div className="rubro-cta__actions">
          <a className="btn btn--primary rubro-cta__btn" href={whatsappLink(rubro.cta.message)} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon />
            {ui.ctaButton}
          </a>
          <Link className="btn btn--ghost rubro-cta__quote" to={quoteHref(rubro)}>
            {ui.quoteCta}
          </Link>
        </div>
      </Reveal>
    </section>
  )
}
