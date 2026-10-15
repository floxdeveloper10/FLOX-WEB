import { motion } from 'framer-motion'
import AgenciaIcon from '../AgenciaIcon.jsx'
import WhatsAppIcon from '../../../../components/WhatsAppIcon.jsx'
import { useAgencia } from '../../agenciaState.js'
import { reasons, testimonials } from '../../agencia.data.js'
import { findTour } from '../../utils.js'
// En la demo, el WhatsApp es el de FLOX (src/data/site.js).
// En la web de una agencia real, aquí iría el número de WhatsApp de la agencia.
import { whatsappLink } from '../../../../data/site.js'

const reveal = (i) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
})

// Por qué elegirnos
export function WhyUs() {
  const { t, lang } = useAgencia()
  return (
    <section className="a-section a-section--green awhy" aria-labelledby="awhy-title">
      <div className="a-container">
        <div className="a-heading a-heading--center">
          <p className="a-eyebrow">{t.why.eyebrow}</p>
          <h2 id="awhy-title" className="a-title">
            {t.why.title}
          </h2>
        </div>
        <ul className="awhy__list">
          {reasons.map((r, i) => (
            <motion.li key={r.icon} className="awhy__item" {...reveal(i)}>
              <span className="awhy__icon">
                <AgenciaIcon name={r.icon} />
              </span>
              <h3 className="awhy__title">{r.title[lang]}</h3>
              <p className="awhy__text">{r.text[lang]}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// Opiniones (de ejemplo, marcadas como tales)
export function Testimonials() {
  const { t, lang } = useAgencia()
  return (
    <section className="a-section areviews" aria-labelledby="areviews-title">
      <div className="a-container">
        <div className="a-heading a-heading--center">
          <p className="a-eyebrow">{t.reviews.eyebrow}</p>
          <h2 id="areviews-title" className="a-title">
            {t.reviews.title}
          </h2>
          <p className="areviews__note">
            <span className="a-sample">{t.reviews.note}</span>
          </p>
        </div>
        <ul className="areviews__list">
          {testimonials.map((r, i) => (
            <motion.li key={r.name} className="areview" {...reveal(i)}>
              <p className="areview__stars" role="img" aria-label={t.reviews.rating}>
                {[0, 1, 2, 3, 4].map((n) => (
                  <AgenciaIcon key={n} name="star" filled />
                ))}
              </p>
              <blockquote className="areview__text">“{r.text[lang]}”</blockquote>
              <footer className="areview__who">
                <span className="areview__avatar" style={{ background: r.color }} aria-hidden="true">
                  {r.name[0]}
                </span>
                <span>
                  <strong>{r.name}</strong> · {r.country[lang]}
                  <span className="areview__tour">{findTour(r.tour).name[lang]}</span>
                </span>
              </footer>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// Llamado final a WhatsApp
export function CtaBanner() {
  const { t } = useAgencia()
  return (
    <section className="acta" aria-labelledby="acta-title">
      <div className="a-container acta__inner">
        <div>
          <h2 id="acta-title" className="acta__title">
            {t.cta.title}
          </h2>
          <p className="acta__text">{t.cta.text}</p>
        </div>
        <a className="a-btn a-btn--whatsapp acta__btn" href={whatsappLink(t.cta.message)} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon />
          {t.cta.button}
        </a>
      </div>
    </section>
  )
}
